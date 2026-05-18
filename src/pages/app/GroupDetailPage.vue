<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGroup, listGroupImages, uploadGroupImages, deleteImage } from '@/api/ledgerApi'
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
const activeStagedFileId = ref(null)

const activeStagedFile = computed(() => {
  return selectedFiles.value.find(sf => sf.id === activeStagedFileId.value) || null
})

function clearSelectedFiles() {
  selectedFiles.value = []
  activeStagedFileId.value = null
}

function removeStagedFile(id) {
  const index = selectedFiles.value.findIndex(sf => sf.id === id)
  if (index !== -1) {
    selectedFiles.value.splice(index, 1)
    if (activeStagedFileId.value === id) {
      activeStagedFileId.value = selectedFiles.value[0]?.id || null
    }
  }
}

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

async function handleDeleteImage(event, image) {
  event.stopPropagation()
  if (!confirm(`Are you sure you want to delete the image "${image.original_filename || image.id}"?`)) return
  try {
    await deleteImage(image.id)
    await load()
  } catch (err) {
    alert(err.message || 'Failed to delete image')
  }
}

function onFilesChanged(event) {
  const fileList = event?.target?.files
  if (fileList && fileList.length > 0) {
    const newFiles = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      typesOfPurchase: '5',
      unitOfMeasurement: ''
    }))
    const wasEmpty = selectedFiles.value.length === 0
    selectedFiles.value = [...selectedFiles.value, ...newFiles]
    if (wasEmpty) {
      activeStagedFileId.value = newFiles[0].id
    }
  }
}

function onDrop(event) {
  const fileList = event?.dataTransfer?.files
  if (fileList && fileList.length > 0) {
    const imageFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'))
    if (imageFiles.length > 0) {
      const newFiles = imageFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file: file,
        typesOfPurchase: '5',
        unitOfMeasurement: ''
      }))
      const wasEmpty = selectedFiles.value.length === 0
      selectedFiles.value = [...selectedFiles.value, ...newFiles]
      if (wasEmpty) {
        activeStagedFileId.value = newFiles[0].id
      }
    }
  }
}

async function onUpload() {
  uploadError.value = ''
  if (!selectedFiles.value.length) return
  isUploading.value = true
  try {
    await uploadGroupImages(groupId.value, selectedFiles.value)
    clearSelectedFiles()
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

        <div class="upload-layout" :class="{ 'split': selectedFiles.length > 0 }">
          <div class="upload-left">
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
              
              <div v-else class="selected-files-preview" @click.stop>
                <div class="preview-header">
                  <span>{{ selectedFiles.length }} files selected</span>
                  <button class="clear-btn" @click.stop="clearSelectedFiles">Clear</button>
                </div>
                <ul class="file-list">
                  <li 
                    v-for="sf in selectedFiles" 
                    :key="sf.id" 
                    class="file-item clickable-file"
                    :class="{ 'active-file': sf.id === activeStagedFileId }"
                    @click.stop="activeStagedFileId = sf.id"
                  >
                    <span class="file-name">{{ sf.file.name }}</span>
                    <div class="file-actions">
                      <span class="file-size">{{ (sf.file.size / 1024).toFixed(0) }} KB</span>
                      <button class="remove-btn" title="Remove receipt" @click.stop="removeStagedFile(sf.id)">✕</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <button class="primary" :disabled="isUploading || selectedFiles.length === 0" @click="onUpload">
              {{ isUploading ? 'Uploading…' : 'Start Upload' }}
            </button>
          </div>

          <div v-if="selectedFiles.length > 0 && activeStagedFile" class="upload-right">
            <h4>Pre-Review Receipt</h4>
            <div class="staged-filename">{{ activeStagedFile.file.name }}</div>

            <div class="formRow">
              <label class="label">Types of purchase</label>
              <select v-model="activeStagedFile.typesOfPurchase" class="input">
                <option v-for="i in 6" :key="i" :value="String(i)">{{ i }}</option>
              </select>
            </div>

            <div class="formRow">
              <label class="label">Unit of measurement</label>
              <select v-model="activeStagedFile.unitOfMeasurement" class="input">
                <option value="">Select unit</option>
                <option value="2">KG</option>
                <option value="3">ML</option>
                <option value="4">GM</option>
                <option value="5">LIT</option>
                <option value="6">MT</option>
                <option value="7">PCS</option>
                <option value="8">CT</option>
                <option value="9">OTHER</option>
                <option value="10">PC</option>
              </select>
            </div>
            <p class="helper-text">Click a file in the list on the left to set its values.</p>
          </div>
        </div>
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
            <button class="deleteBtn" @click="handleDeleteImage($event, img)">🗑</button>
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
  max-height: 180px;
  overflow-y: auto;
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

.clickable-file {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.clickable-file:hover {
  background: rgba(0, 91, 81, 0.05);
  border-color: rgba(0, 91, 81, 0.15);
}

.clickable-file.active-file {
  background: rgba(0, 91, 81, 0.08);
  border-color: rgba(0, 91, 81, 0.3);
  font-weight: 800;
}

.upload-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.upload-layout.split {
  flex-direction: row;
  align-items: stretch;
}

.upload-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
}

.upload-right {
  flex: 1;
  border-left: 1px solid rgba(190, 201, 200, 0.4);
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upload-right h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 900;
  color: #005b51;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.staged-filename {
  font-size: 12px;
  font-weight: 800;
  color: #51606d;
  word-break: break-all;
  background: #f2f4f5;
  padding: 6px 10px;
  border-radius: 6px;
}

.formRow {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.formRow .label {
  font-size: 11px;
  color: #51606d;
  font-weight: 900;
  text-transform: uppercase;
}

.formRow .input {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(190, 201, 200, 0.8);
  background: #ffffff;
  color: #191c1d;
  font-size: 13px;
  font-weight: 600;
  outline: none;
  transition: border-color 0.2s;
}

.formRow .input:focus {
  border-color: #005b51;
}

.helper-text {
  font-size: 11px;
  color: #51606d;
  font-style: italic;
  margin: 4px 0 0;
  line-height: 1.4;
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
  grid-template-columns: 1fr auto auto auto auto;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.2s ease;
}

.deleteBtn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #ba1a1a;
  font-size: 16px;
  transition: background 0.2s;
}

.deleteBtn:hover {
  background: rgba(186, 26, 26, 0.1);
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
  .upload-layout.split {
    flex-direction: column;
  }
  .upload-right {
    border-left: none;
    border-top: 1px solid rgba(190, 201, 200, 0.4);
    padding-left: 0;
    padding-top: 16px;
  }
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

.file-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ba1a1a;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.remove-btn:hover {
  background: rgba(186, 26, 26, 0.1);
  opacity: 1;
}
</style>
