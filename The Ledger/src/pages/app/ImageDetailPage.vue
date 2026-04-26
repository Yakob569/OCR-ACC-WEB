<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { decodeBase64Json } from '@/lib/encoding'
import { getImage, getImageResult, retryImage, submitImageReview } from '@/api/ledgerApi'

const route = useRoute()
const imageId = route.params.imageId

const image = ref(null)
const result = ref(null)
const decodedFields = ref(null)
const decodedItems = ref(null)
const decodedWarnings = ref(null)

const isLoading = ref(false)
const errorMessage = ref('')

const isRetrying = ref(false)
const retryError = ref('')

const isSubmittingReview = ref(false)
const reviewError = ref('')
const reviewSuccess = ref('')

const qualityLabel = ref('good')
const isAccepted = ref(true)
const correctedFieldsJson = ref('{}')
const reviewNotes = ref('')

async function load() {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const [img, res] = await Promise.all([getImage(imageId), getImageResult(imageId)])
    image.value = img
    result.value = res

    decodedFields.value = decodeBase64Json(res?.fields_json) || {}
    decodedItems.value = decodeBase64Json(res?.items_json) || []
    decodedWarnings.value = decodeBase64Json(res?.warnings_json) || []
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load image'
    image.value = null
    result.value = null
    decodedFields.value = null
    decodedItems.value = null
    decodedWarnings.value = null
  } finally {
    isLoading.value = false
  }
}

async function onRetry() {
  retryError.value = ''
  isRetrying.value = true
  try {
    await retryImage(imageId)
    await load()
  } catch (error) {
    retryError.value = error instanceof Error ? error.message : 'Retry failed'
  } finally {
    isRetrying.value = false
  }
}

function safeParseCorrectedFields() {
  try {
    const parsed = JSON.parse(correctedFieldsJson.value || '{}')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return parsed
  } catch {
    return null
  }
}

async function onSubmitReview() {
  reviewError.value = ''
  reviewSuccess.value = ''
  isSubmittingReview.value = true
  try {
    const correctedFields = safeParseCorrectedFields()
    if (correctedFields === null) throw new Error('Corrected fields must be valid JSON object')
    await submitImageReview(imageId, {
      qualityLabel: qualityLabel.value,
      isAccepted: isAccepted.value,
      correctedFields,
      reviewNotes: reviewNotes.value,
    })
    reviewSuccess.value = 'Review submitted'
    await load()
  } catch (error) {
    reviewError.value = error instanceof Error ? error.message : 'Review failed'
  } finally {
    isSubmittingReview.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="wrap">
    <div class="header">
      <div>
        <h2>Image detail</h2>
        <p class="muted">{{ image?.original_filename || imageId }}</p>
      </div>
      <button class="refresh" :disabled="isLoading" @click="load">Refresh</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-else-if="isLoading && !image" class="muted">Loading image…</p>

    <div v-else class="grid">
      <div class="panel">
        <h3>Metadata</h3>
        <div v-if="image" class="kv">
          <div><span class="k">OCR status</span><span class="v">{{ image.ocr_status }}</span></div>
          <div><span class="k">Review status</span><span class="v">{{ image.review_status }}</span></div>
          <div><span class="k">Attempts</span><span class="v">{{ image.ocr_attempt_count }}</span></div>
          <div><span class="k">Confidence</span><span class="v">{{ image.overall_confidence ?? '—' }}</span></div>
          <div v-if="image.last_error_message"><span class="k">Last error</span><span class="v">{{ image.last_error_message }}</span></div>
        </div>
        <p v-else class="muted">No metadata.</p>

        <div class="actions">
          <p v-if="retryError" class="error">{{ retryError }}</p>
          <button class="secondary" :disabled="isRetrying" @click="onRetry">
            {{ isRetrying ? 'Retrying…' : 'Retry OCR' }}
          </button>
        </div>
      </div>

      <div class="panel">
        <h3>OCR fields</h3>
        <p v-if="!decodedFields" class="muted">No fields yet.</p>
        <div v-else class="fields">
          <div v-for="(val, key) in decodedFields" :key="key" class="fieldRow">
            <div class="fieldKey">{{ key }}</div>
            <div class="fieldVal">{{ val }}</div>
          </div>
        </div>

        <h3 style="margin-top: 16px;">Warnings</h3>
        <p v-if="!decodedWarnings || decodedWarnings.length === 0" class="muted">No warnings.</p>
        <ul v-else class="warn">
          <li v-for="(w, i) in decodedWarnings" :key="i">{{ w }}</li>
        </ul>
      </div>

      <div class="panel">
        <h3>Line items</h3>
        <p v-if="!decodedItems || decodedItems.length === 0" class="muted">No items.</p>
        <div v-else class="items">
          <pre class="json">{{ decodedItems }}</pre>
        </div>
      </div>

      <div class="panel">
        <h3>Review</h3>
        <p v-if="reviewError" class="error">{{ reviewError }}</p>
        <p v-if="reviewSuccess" class="success">{{ reviewSuccess }}</p>

        <div class="formRow">
          <label class="label">Quality</label>
          <select v-model="qualityLabel" class="input">
            <option value="good">good</option>
            <option value="ok">ok</option>
            <option value="bad">bad</option>
          </select>
        </div>

        <div class="formRow">
          <label class="label">Accepted</label>
          <label class="check">
            <input v-model="isAccepted" type="checkbox" />
            <span>Accept OCR result</span>
          </label>
        </div>

        <div class="formRow">
          <label class="label">Corrected fields (JSON)</label>
          <textarea v-model="correctedFieldsJson" class="textarea" rows="6" spellcheck="false"></textarea>
        </div>

        <div class="formRow">
          <label class="label">Notes</label>
          <textarea v-model="reviewNotes" class="textarea" rows="3"></textarea>
        </div>

        <button class="primary" :disabled="isSubmittingReview" @click="onSubmitReview">
          {{ isSubmittingReview ? 'Submitting…' : 'Submit review' }}
        </button>
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

.success {
  margin: 0;
  color: #005b51;
  font-weight: 800;
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
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.panel {
  padding: 14px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
}

.kv {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.kv > div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f8f9fa;
}

.k {
  font-size: 11px;
  color: #51606d;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.v {
  font-weight: 900;
  color: #191c1d;
  font-size: 12px;
}

.actions {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.secondary {
  width: 100%;
  padding: 12px 12px;
  border-radius: 10px;
  border: none;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
  font-weight: 900;
  cursor: pointer;
}

.fields {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fieldRow {
  padding: 10px 12px;
  border-radius: 10px;
  background: #f8f9fa;
}

.fieldKey {
  font-size: 11px;
  color: #51606d;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.fieldVal {
  margin-top: 6px;
  font-weight: 800;
  color: #191c1d;
  font-size: 13px;
  word-break: break-word;
}

.warn {
  margin: 10px 0 0;
  padding-left: 18px;
  color: #51606d;
  font-weight: 700;
  font-size: 13px;
}

.json {
  margin: 10px 0 0;
  padding: 12px;
  border-radius: 10px;
  background: #f8f9fa;
  overflow: auto;
  font-size: 12px;
  font-weight: 700;
  color: #191c1d;
}

.formRow {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
}

.label {
  font-size: 11px;
  color: #51606d;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.input,
.textarea {
  padding: 12px 12px;
  border-radius: 10px;
  border: 1px solid rgba(190, 201, 200, 0.6);
  outline: none;
  font-weight: 700;
  color: #191c1d;
}

.check {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  color: #191c1d;
}

.primary {
  margin-top: 14px;
  width: 100%;
  padding: 12px 12px;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  background: linear-gradient(135deg, #005148, #006b5f);
  font-weight: 900;
  cursor: pointer;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
