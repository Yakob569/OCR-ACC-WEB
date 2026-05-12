<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGroup, listGroupImages, uploadGroupImages } from '@/api/ledgerApi'
import { decodeBase64Json } from '@/lib/encoding'

const router = useRouter()
const route = useRoute()
const groupId = computed(() => route.params.groupId)

const group = ref(null)
const images = ref([])

const isLoading = ref(false)
const isUploading = ref(false)
const errorMessage = ref('')
const uploadError = ref('')

const selectedFiles = ref([])

async function load() {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const [g, imgs] = await Promise.all([
      getGroup(groupId.value),
      listGroupImages(groupId.value, { limit: 50, offset: 0 }),
    ])
    group.value = g
    images.value = Array.isArray(imgs) ? imgs : []
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load group'
    group.value = null
    images.value = []
  } finally {
    isLoading.value = false
  }
}

function onFilesChanged(event) {
  const fileList = event?.target?.files
  selectedFiles.value = fileList ? Array.from(fileList) : []
}

function onDrop(event) {
  const fileList = event?.dataTransfer?.files
  if (fileList) {
    selectedFiles.value = Array.from(fileList).filter(f => f.type.startsWith('image/'))
  }
}

async function onUpload() {
  uploadError.value = ''
  if (!selectedFiles.value.length) return
  isUploading.value = true
  try {
    await uploadGroupImages(groupId.value, selectedFiles.value)
    selectedFiles.value = []
    await load()
  } catch (error) {
    uploadError.value = error instanceof Error ? error.message : 'Upload failed'
  } finally {
    isUploading.value = false
  }
}

function statusLabel(img) {
  if (!img) return 'unknown'
  if (img.ocr_status) return img.ocr_status
  if (img.upload_status) return img.upload_status
  return 'unknown'
}

onMounted(load)
</script>

<template>
  <div class="wrap">
    <div class="header">
      <div>
        <h2>{{ group?.name || 'Group' }}</h2>
        <p class="muted">{{ group?.description || '—' }}</p>
      </div>
      <button class="refresh" :disabled="isLoading" @click="load">Refresh</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-else-if="isLoading && !group" class="muted">Loading group…</p>

    <div v-else-if="group" class="grid">
      <div class="stats">
        <div class="stat">
          <div class="label">Status</div>
          <div class="pill">{{ group.status }}</div>
        </div>
        <div class="stat">
          <div class="label">Total</div>
          <div class="value">{{ group.total_images }}</div>
        </div>
        <div class="stat">
          <div class="label">Queued</div>
          <div class="value">{{ group.queued_images }}</div>
        </div>
        <div class="stat">
          <div class="label">Processing</div>
          <div class="value">{{ group.processing_images }}</div>
        </div>
        <div class="stat">
          <div class="label">Completed</div>
          <div class="value">{{ group.completed_images }}</div>
        </div>
        <div class="stat">
          <div class="label">Failed</div>
          <div class="value">{{ group.failed_images }}</div>
        </div>
      </div>

      <div class="upload">
        <div class="uploadHeader">
          <h3>Upload receipts</h3>
          <button class="secondary small" @click="router.push(`/app/exports?groupId=${group.id}`)">Manage Exports</button>
        </div>
        
        <p v-if="uploadError" class="error">{{ uploadError }}</p>

        <div 
          class="dropzone" 
          :class="{ 'has-files': selectedFiles.length > 0 }"
          @click="$refs.fileInput.click()"
          @dragover.prevent
          @drop.prevent="onDrop"
        >
          <input 
            ref="fileInput"
            class="hidden-file-input" 
            type="file" 
            accept="image/*" 
            multiple 
            @change="onFilesChanged" 
          />
          
          <div v-if="selectedFiles.length === 0" class="drop-prompt">
            <div class="icon">󰄵</div>
            <div class="text">Click or drag images here to upload</div>
            <div class="sub">PNG, JPG, WEBP supported</div>
          </div>
          
          <div v-else class="selected-files-preview">
            <div class="preview-header">
              <span>{{ selectedFiles.length }} files selected</span>
              <button class="clear-btn" @click.stop="selectedFiles = []">Clear</button>
            </div>
            <ul class="file-list">
              <li v-for="f in selectedFiles.slice(0, 5)" :key="f.name" class="file-item">
                <span class="file-name">{{ f.name }}</span>
                <span class="file-size">{{ (f.size / 1024).toFixed(0) }} KB</span>
              </li>
              <li v-if="selectedFiles.length > 5" class="file-more">
                and {{ selectedFiles.length - 5 }} more...
              </li>
            </ul>
          </div>
        </div>

        <button class="primary" :disabled="isUploading || selectedFiles.length === 0" @click="onUpload">
          {{ isUploading ? 'Uploading…' : 'Start Upload' }}
        </button>
      </div>

      <div class="images">
        <div class="imagesHeader">
          <h3>Images</h3>
          <div class="muted">{{ images.length }} loaded</div>
        </div>

        <p v-if="images.length === 0" class="muted">No images uploaded yet.</p>

        <ul v-else class="list">
          <li 
            v-for="img in images" 
            :key="img.id" 
            class="row clickable-row" 
            @click="router.push(`/app/images/${img.id}`)"
          >
            <div class="name">{{ img.original_filename || img.id }}</div>
            <div class="pill">{{ statusLabel(img) }}</div>
            <div class="pill">{{ img.review_status || '—' }}</div>
            <div class="chevron">󰅂</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  color: #005b51;
}

h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  color: #191c1d;
}

.muted {
  margin: 6px 0 0;
  color: #51606d;
  font-weight: 600;
  font-size: 13px;
}

.error {
  margin: 0;
  color: #ba1a1a;
  font-weight: 700;
  font-size: 13px;
}

.refresh {
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  background: rgba(0, 91, 81, 0.08);
  color: #005b51;
  font-weight: 900;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.stats,
.upload,
.images {
  padding: 14px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
}

.stats {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.stat {
  padding: 12px;
  border-radius: 12px;
  background: #f2f4f5;
}

.label {
  font-size: 11px;
  color: #51606d;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.value {
  margin-top: 8px;
  font-size: 22px;
  font-weight: 900;
  color: #191c1d;
}

.pill {
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.uploadHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.dropzone {
  border: 2px dashed rgba(190, 201, 200, 0.6);
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8f9fa;
  margin-bottom: 16px;
}

.dropzone:hover {
  border-color: #005b51;
  background: rgba(0, 91, 81, 0.02);
}

.dropzone.has-files {
  border-style: solid;
  border-color: rgba(0, 91, 81, 0.3);
  background: #ffffff;
}

.hidden-file-input {
  display: none;
}

.drop-prompt .icon {
  font-size: 32px;
  margin-bottom: 8px;
  color: #005b51;
  opacity: 0.5;
}

.drop-prompt .text {
  font-weight: 800;
  color: #191c1d;
  font-size: 14px;
}

.drop-prompt .sub {
  font-size: 11px;
  color: #51606d;
  margin-top: 4px;
  font-weight: 600;
}

.selected-files-preview {
  text-align: left;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 800;
  color: #005b51;
}

.clear-btn {
  background: none;
  border: none;
  color: #ba1a1a;
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;
  text-transform: uppercase;
}

.file-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
}

.file-name {
  font-weight: 700;
  color: #191c1d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.file-size {
  color: #51606d;
  font-weight: 600;
}

.file-more {
  font-size: 11px;
  color: #51606d;
  font-style: italic;
  margin-top: 4px;
  padding-left: 4px;
}

.primary {
  width: 100%;
  padding: 12px 12px;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  background: linear-gradient(135deg, #005148, #006b5f);
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 81, 72, 0.2);
}

.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.secondary {
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
  font-weight: 900;
  cursor: pointer;
}

.secondary.small {
  padding: 6px 10px;
  font-size: 11px;
}

.imagesHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.2s ease;
}

.clickable-row {
  cursor: pointer;
  border: 1px solid transparent;
}

.clickable-row:hover {
  background: #ffffff;
  border-color: rgba(0, 91, 81, 0.2);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.name {
  font-weight: 900;
  color: #191c1d;
  font-size: 13px;
}

.chevron {
  color: #005b51;
  font-size: 16px;
  opacity: 0.5;
  font-weight: 900;
}

@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .row {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .clickable-row:hover {
    transform: none;
  }
}
</style>
