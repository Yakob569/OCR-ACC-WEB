<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGroup, listGroupExports, listGroupImages, listGroupResults, uploadGroupImages } from '@/api/ledgerApi'
import { decodeBase64Json } from '@/lib/encoding'

const router = useRouter()
const route = useRoute()
const groupId = computed(() => route.params.groupId)

const group = ref(null)
const images = ref([])
const results = ref([])
const exportsList = ref([])

const isLoading = ref(false)
const isUploading = ref(false)
const errorMessage = ref('')
const uploadError = ref('')

const selectedFiles = ref([])

async function load() {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const [g, imgs, res, exps] = await Promise.all([
      getGroup(groupId.value),
      listGroupImages(groupId.value, { limit: 50, offset: 0 }),
      listGroupResults(groupId.value, { limit: 50, offset: 0 }),
      listGroupExports(groupId.value, { limit: 50, offset: 0 }),
    ])
    group.value = g
    images.value = Array.isArray(imgs) ? imgs : []
    results.value = Array.isArray(res) ? res : []
    exportsList.value = Array.isArray(exps) ? exps : []
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load group'
    group.value = null
    images.value = []
    results.value = []
    exportsList.value = []
  } finally {
    isLoading.value = false
  }
}

function onFilesChanged(event) {
  const fileList = event?.target?.files
  selectedFiles.value = fileList ? Array.from(fileList) : []
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

function getResultImageId(r) {
  return r?.receipt_image_id || r?.receiptImageId || r?.image_id || r?.imageId || ''
}

function previewFields(r) {
  const decoded = decodeBase64Json(r?.fields_json)
  if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)) return null
  const merchant = decoded.merchant || decoded.merchant_name || decoded.vendor || decoded.store
  const date = decoded.date || decoded.transaction_date
  const total = decoded.total || decoded.amount_total || decoded.grand_total
  return { merchant, date, total }
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
        <h3>Upload receipts</h3>
        <p class="muted">Select multiple images. They will be uploaded under form-data key <b>`files`</b>.</p>
        <p v-if="uploadError" class="error">{{ uploadError }}</p>

        <input class="file" type="file" accept="image/*" multiple @change="onFilesChanged" />

        <div v-if="selectedFiles.length" class="selected">
          <div class="selectedTitle">Selected ({{ selectedFiles.length }})</div>
          <ul class="selectedList">
            <li v-for="f in selectedFiles" :key="f.name">{{ f.name }}</li>
          </ul>
        </div>

        <button class="primary" :disabled="isUploading || selectedFiles.length === 0" @click="onUpload">
          {{ isUploading ? 'Uploading…' : 'Upload' }}
        </button>

        <button class="secondary" @click="router.push(`/app/exports?groupId=${group.id}`)">Create export</button>
      </div>

      <div class="images">
        <div class="imagesHeader">
          <h3>Images</h3>
          <div class="muted">{{ images.length }} loaded</div>
        </div>

        <p v-if="images.length === 0" class="muted">No images uploaded yet.</p>

        <ul v-else class="list">
          <li v-for="img in images" :key="img.id" class="row">
            <div class="name">{{ img.original_filename || img.id }}</div>
            <div class="pill">{{ statusLabel(img) }}</div>
            <div class="pill">{{ img.review_status || '—' }}</div>
            <button class="smallLink" @click="router.push(`/app/images/${img.id}`)">Open</button>
          </li>
        </ul>
      </div>

      <div class="results">
        <div class="imagesHeader">
          <h3>Results</h3>
          <div class="muted">{{ results.length }} loaded</div>
        </div>

        <p v-if="results.length === 0" class="muted">No results yet.</p>

        <ul v-else class="list">
          <li v-for="r in results" :key="r.id" class="row rowWide">
            <div class="name">{{ getResultImageId(r) || r.id }}</div>
            <div class="pill">{{ r.success ? 'success' : 'failed' }}</div>
            <div class="desc" v-if="previewFields(r)">
              {{ previewFields(r).merchant || '—' }} · {{ previewFields(r).date || '—' }} ·
              {{ previewFields(r).total || '—' }}
            </div>
            <div class="desc" v-else>—</div>
            <button
              class="smallLink"
              :disabled="!getResultImageId(r)"
              @click="router.push(`/app/images/${getResultImageId(r)}`)"
            >
              Open
            </button>
          </li>
        </ul>
      </div>

      <div class="exports">
        <div class="imagesHeader">
          <h3>Exports</h3>
          <div class="muted">{{ exportsList.length }} loaded</div>
        </div>

        <p v-if="exportsList.length === 0" class="muted">No exports yet.</p>

        <ul v-else class="list">
          <li v-for="exp in exportsList" :key="exp.id" class="row rowWide">
            <div class="name">{{ exp.format || 'csv' }}</div>
            <div class="pill">{{ exp.row_count ?? '—' }} rows</div>
            <div class="desc">{{ exp.created_at || '' }}</div>
            <a v-if="exp.storage_url" class="smallLink" :href="exp.storage_url" target="_blank" rel="noreferrer"
              >Download</a
            >
            <span v-else class="pill">Not ready</span>
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
.images,
.results,
.exports {
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

.file {
  margin-top: 12px;
}

.selected {
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #f8f9fa;
}

.selectedTitle {
  font-weight: 900;
  color: #191c1d;
  font-size: 13px;
}

.selectedList {
  margin: 8px 0 0;
  padding-left: 18px;
  color: #51606d;
  font-weight: 700;
  font-size: 13px;
}

.primary {
  margin-top: 12px;
  width: 100%;
  padding: 12px 12px;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  background: linear-gradient(135deg, #005148, #006b5f);
  font-weight: 900;
  cursor: pointer;
}

.secondary {
  margin-top: 10px;
  width: 100%;
  padding: 12px 12px;
  border-radius: 10px;
  border: none;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
  font-weight: 900;
  cursor: pointer;
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
}

.name {
  font-weight: 900;
  color: #191c1d;
  font-size: 13px;
}

.desc {
  font-weight: 800;
  color: #51606d;
  font-size: 13px;
  word-break: break-word;
}

.rowWide {
  grid-template-columns: 1fr auto 1.3fr auto;
}

.smallLink {
  border: none;
  background: transparent;
  color: #005b51;
  font-weight: 900;
  cursor: pointer;
  font-size: 12px;
}

@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .row {
    grid-template-columns: 1fr;
    align-items: start;
  }
}
</style>
