<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { decodeBase64Json } from '@/lib/encoding'
import { getImage, getImageResult, getImageReview, retryImage, submitImageReview } from '@/api/ledgerApi'
import OcrFieldCard from '@/components/OcrFieldCard.vue'

const route = useRoute()
const imageId = route.params.imageId

const image = ref(null)
const result = ref(null)
const decodedFields = ref(null)
const decodedConfidences = ref(null)
const decodedRawText = ref('')
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
const typesOfPurchase = ref('5')
const unitOfMeasurement = ref('')
const correctedFieldsJson = ref('{}')
const reviewNotes = ref('')

const canRetry = computed(() => {
  const status = image.value?.ocr_status
  return status === 'failed' || status === 'needs_review'
})

const fieldsWithConfidence = computed(() => {
  if (!decodedFields.value) return []
  return Object.entries(decodedFields.value)
    .map(([key, rawVal]) => {
      let val = rawVal
      let confidence = decodedConfidences.value?.[key]

      // If the backend returned an object for the field value
      if (rawVal && typeof rawVal === 'object' && !Array.isArray(rawVal)) {
        if ('value' in rawVal) val = rawVal.value
        if ('confidence' in rawVal && typeof rawVal.confidence === 'number') {
          confidence = rawVal.confidence
        }
      }

      return {
        key,
        val,
        confidence: typeof confidence === 'number' ? Math.round(confidence * 100) : null,
      }
    })
    .filter((f) => {
      if (f.val === null || f.val === undefined) return false
      if (typeof f.val === 'string' && !f.val.trim()) return false
      return true
    })
})

const itemsTable = computed(() => {
  if (!Array.isArray(decodedItems.value)) return null
  if (decodedItems.value.length === 0) return null
  const first = decodedItems.value[0]
  if (!first || typeof first !== 'object' || Array.isArray(first)) return null
  return decodedItems.value
})

const itemsJson = computed(() => {
  if (!decodedItems.value) return ''
  try {
    return JSON.stringify(decodedItems.value, null, 2)
  } catch {
    return String(decodedItems.value)
  }
})

async function load() {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const [img, res] = await Promise.all([getImage(imageId), getImageResult(imageId)])
    image.value = img
    result.value = res

    decodedFields.value = decodeBase64Json(res?.fields_json) || {}
    decodedConfidences.value = decodeBase64Json(res?.confidences_json) || {}
    decodedRawText.value = res?.raw_text || ''
    decodedItems.value = decodeBase64Json(res?.items_json) || []
    decodedWarnings.value = decodeBase64Json(res?.warnings_json) || []

    // Fetch review data if already reviewed
    console.log('Image review status:', image.value?.review_status)
    if (image.value?.review_status !== 'pending') {
      try {
        const review = await getImageReview(imageId)
        console.log('Fetched review data:', review)
        if (review && review.corrected_fields_json) {
           const corrected = decodeBase64Json(review.corrected_fields_json) || {}
           console.log('Parsed corrected fields:', corrected)
           typesOfPurchase.value = corrected.types_of_purchase || '5'
           unitOfMeasurement.value = corrected.unit_of_measurement || ''
        }
      } catch (err) {
        console.error('Failed to fetch review data:', err)
      }
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load image'
    image.value = null
    result.value = null
    decodedFields.value = null
    decodedConfidences.value = null
    decodedRawText.value = ''
    decodedItems.value = null
    decodedWarnings.value = null
  } finally {
    isLoading.value = false
  }
}

async function onRetry() {
  retryError.value = ''
  if (!canRetry.value) return
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
    const correctedFields = {
      types_of_purchase: typesOfPurchase.value,
      unit_of_measurement: unitOfMeasurement.value
    }
    
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

function confidenceClass(val) {
  if (val >= 90) return 'high'
  if (val >= 70) return 'medium'
  return 'low'
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
      <div class="column">
        <div class="panel imagePanel">
          <div class="panelHeader">
            <h3>Receipt Image</h3>
            <a v-if="image?.storage_url" :href="image.storage_url" target="_blank" class="smallLink">View Full</a>
          </div>
          <div class="imageContainer">
            <img v-if="image?.storage_url" :src="image.storage_url" class="receiptImg" alt="Receipt" />
            <div v-else class="noImage">No image preview available</div>
          </div>
        </div>

        <div class="panel">
          <h3>Metadata</h3>
          <div v-if="image" class="kv">
            <div><span class="k">OCR status</span><span class="v pill" :class="image.ocr_status">{{ image.ocr_status }}</span></div>
            <div><span class="k">Review status</span><span class="v">{{ image.review_status }}</span></div>
            <div><span class="k">Attempts</span><span class="v">{{ image.ocr_attempt_count }}</span></div>
            <div><span class="k">Confidence</span><span class="v">{{ image.overall_confidence ?? '—' }}</span></div>
            <div v-if="image.last_error_message"><span class="k">Last error</span><span class="v">{{ image.last_error_message }}</span></div>
          </div>
          <div class="actions">
            <p v-if="retryError" class="error">{{ retryError }}</p>
            <button v-if="canRetry" class="secondary" :disabled="isRetrying" @click="onRetry">
              {{ isRetrying ? 'Retrying…' : 'Retry OCR' }}
            </button>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="panel">
          <h3>OCR fields</h3>
          <p v-if="fieldsWithConfidence.length === 0" class="muted">No fields yet.</p>
          <div v-else class="ocrGrid">
            <OcrFieldCard
              v-for="f in fieldsWithConfidence"
              :key="f.key"
              :label="f.key"
              :value="f.val"
              :confidence="f.confidence"
            />
          </div>
        </div>

        <div class="panel" style="margin-top: 14px;">
          <h3>Raw Text</h3>
          <p v-if="!decodedRawText" class="muted">No raw text extracted.</p>
          <div v-else class="rawText">
            {{ decodedRawText }}
          </div>
        </div>

        <div class="panel" style="margin-top: 14px;">
          <h3>Warnings</h3>
          <p v-if="!decodedWarnings || decodedWarnings.length === 0" class="muted">No warnings.</p>
          <ul v-else class="warn">
            <li v-for="(w, i) in decodedWarnings" :key="i">{{ w }}</li>
          </ul>
        </div>
      </div>

      <div class="column">
        <div class="panel">
          <h3>Line items</h3>
          <p v-if="!decodedItems || decodedItems.length === 0" class="muted">No items.</p>
          <div v-else-if="itemsTable" class="itemsTable">
            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(it, idx) in itemsTable" :key="idx">
                  <td>{{ it.description || it.name || it.item || '—' }}</td>
                  <td>{{ it.quantity ?? it.qty ?? '—' }}</td>
                  <td>{{ it.total ?? it.amount ?? it.line_total ?? '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="items">
            <pre class="json">{{ itemsJson }}</pre>
          </div>
        </div>

        <div class="panel" style="margin-top: 14px;">
          <h3>Review</h3>
          <p v-if="reviewError" class="error">{{ reviewError }}</p>
          <p v-if="reviewSuccess" class="success">{{ reviewSuccess }}</p>

          <div class="formRow">
            <label class="label">Quality</label>
            <select v-model="qualityLabel" class="input">
              <option value="accurate">Accurate</option>
              <option value="partially_accurate">Partially Accurate</option>
              <option value="inaccurate">Inaccurate</option>
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
            <label class="label">Types of purchase</label>
            <select v-model="typesOfPurchase" class="input">
              <option v-for="i in 6" :key="i" :value="String(i)">{{ i }}</option>
            </select>
          </div>
          <div class="formRow">
            <label class="label">Unit of measurement</label>
            <select v-model="unitOfMeasurement" class="input">
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

          <div class="formRow">
            <label class="label">Notes</label>
            <textarea v-model="reviewNotes" class="textarea" rows="2"></textarea>
          </div>

          <button class="primary" :disabled="isSubmittingReview" @click="onSubmitReview">
            {{ isSubmittingReview ? 'Submitting…' : 'Submit review' }}
          </button>
        </div>
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
  grid-template-columns: 1.2fr 1.1fr 1fr;
  gap: 14px;
  align-items: start;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel {
  padding: 14px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
}

.panelHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.imageContainer {
  width: 100%;
  border-radius: 10px;
  background: #f8f9fa;
  overflow: hidden;
  border: 1px solid rgba(190, 201, 200, 0.35);
  display: flex;
  justify-content: center;
}

.receiptImg {
  max-width: 100%;
  height: auto;
  display: block;
}

.noImage {
  padding: 40px 20px;
  color: #51606d;
  font-weight: 700;
  font-size: 13px;
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
  align-items: center;
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

.v.pill {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  background: rgba(81, 96, 109, 0.1);
}

.v.pill.completed, .v.pill.success { background: #e6f4ea; color: #1e8e3e; }
.v.pill.failed { background: #fce8e6; color: #d93025; }
.v.pill.processing { background: #e8f0fe; color: #1967d2; }

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

.ocrGrid {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rawText {
  margin-top: 10px;
  padding: 12px;
  border-radius: 10px;
  background: #f8f9fa;
  font-size: 12px;
  font-weight: 600;
  color: #51606d;
  white-space: pre-wrap;
  line-height: 1.5;
  max-height: 300px;
  overflow-y: auto;
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

.itemsTable {
  margin-top: 10px;
  overflow: auto;
  border-radius: 10px;
  background: #f8f9fa;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.table th {
  text-align: left;
  font-size: 11px;
  color: #51606d;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 12px;
}

.table td {
  padding: 10px 12px;
  font-weight: 800;
  color: #191c1d;
  border-top: 1px solid rgba(190, 201, 200, 0.35);
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
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(190, 201, 200, 0.6);
  outline: none;
  font-weight: 700;
  color: #191c1d;
  font-size: 13px;
}

.check {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  color: #191c1d;
  font-size: 13px;
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

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
