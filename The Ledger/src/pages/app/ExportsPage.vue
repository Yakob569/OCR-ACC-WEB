<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { createGroupCsvExport, listGroupExports, listGroups } from '@/api/ledgerApi'
import { decodeBase64Json } from '@/lib/encoding'

const route = useRoute()

const groups = ref([])
const isLoadingGroups = ref(false)
const groupsError = ref('')

const selectedGroupId = ref('')

const exportsList = ref([])
const isLoadingExports = ref(false)
const exportsError = ref('')

const isCreating = ref(false)
const createError = ref('')

const includeCorrectedValues = ref(true)

const groupIdFromQuery = computed(() => (typeof route.query.groupId === 'string' ? route.query.groupId : ''))

async function loadGroups() {
  groupsError.value = ''
  isLoadingGroups.value = true
  try {
    const data = await listGroups({ limit: 200, offset: 0 })
    groups.value = Array.isArray(data) ? data : []
    if (!selectedGroupId.value) {
      selectedGroupId.value = groupIdFromQuery.value || (groups.value[0]?.id || '')
    }
  } catch (error) {
    groupsError.value = error instanceof Error ? error.message : 'Failed to load groups'
    groups.value = []
  } finally {
    isLoadingGroups.value = false
  }
}

async function loadExports() {
  exportsError.value = ''
  exportsList.value = []
  if (!selectedGroupId.value) return
  isLoadingExports.value = true
  try {
    const data = await listGroupExports(selectedGroupId.value, { limit: 50, offset: 0 })
    exportsList.value = Array.isArray(data) ? data : []
  } catch (error) {
    exportsError.value = error instanceof Error ? error.message : 'Failed to load exports'
  } finally {
    isLoadingExports.value = false
  }
}

async function onCreateExport() {
  createError.value = ''
  if (!selectedGroupId.value) return
  isCreating.value = true
  try {
    await createGroupCsvExport(selectedGroupId.value, {
      selectedColumns: [],
      includeCorrectedValues: includeCorrectedValues.value,
    })
    await loadExports()
  } catch (error) {
    createError.value = error instanceof Error ? error.message : 'Failed to create export'
  } finally {
    isCreating.value = false
  }
}

function decodeColumns(exp) {
  const decoded = decodeBase64Json(exp?.selected_columns_json)
  if (Array.isArray(decoded)) return decoded
  return null
}

watch(selectedGroupId, loadExports)

onMounted(async () => {
  await loadGroups()
  await loadExports()
})
</script>

<template>
  <div class="wrap">
    <div class="header">
      <h2>Exports</h2>
    </div>

    <div class="card">
      <h3>Create export</h3>
      <p class="muted">Generate a CSV export for a selected group.</p>

      <p v-if="groupsError" class="error">{{ groupsError }}</p>
      <p v-else-if="isLoadingGroups" class="muted">Loading groups…</p>

      <div class="formRow">
        <label class="label">Group</label>
        <select v-model="selectedGroupId" class="input">
          <option value="" disabled>Select group</option>
          <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
        </select>
      </div>

      <div class="formRow">
        <label class="check">
          <input v-model="includeCorrectedValues" type="checkbox" />
          <span>Include corrected values</span>
        </label>
      </div>

      <p v-if="createError" class="error">{{ createError }}</p>
      <button
        class="primary"
        :disabled="isCreating || !selectedGroupId"
        @click="onCreateExport"
      >
        {{ isCreating ? 'Generating…' : 'Generate VAT Purchase CSV' }}
      </button>
    </div>

    <div class="card">
      <div class="listHeader">
        <h3>Export history</h3>
        <button class="refresh" :disabled="isLoadingExports || !selectedGroupId" @click="loadExports">Refresh</button>
      </div>
      <p class="muted">
        Note: downloads may be unavailable until the backend returns a `storage_url` (some exports can show as “Not ready”).
      </p>

      <p v-if="exportsError" class="error">{{ exportsError }}</p>
      <p v-else-if="isLoadingExports" class="muted">Loading exports…</p>
      <p v-else-if="exportsList.length === 0" class="muted">No exports yet.</p>

      <ul v-else class="list">
        <li v-for="exp in exportsList" :key="exp.id" class="row">
          <div class="name">{{ exp.format || 'csv' }}</div>
          <div class="desc">Rows: {{ exp.row_count ?? '—' }}</div>
          <div class="desc">
            Columns:
            <span v-if="decodeColumns(exp)">{{ decodeColumns(exp).join(', ') }}</span>
            <span v-else>—</span>
          </div>
          <div class="desc">{{ exp.created_at || '' }}</div>
          <a v-if="exp.storage_url" class="smallLink" :href="exp.storage_url" target="_blank" rel="noreferrer"
            >Download</a
          >
          <span v-else class="pill">Not ready</span>
        </li>
      </ul>
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
  align-items: center;
  justify-content: space-between;
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
  margin: 10px 0 0;
  color: #ba1a1a;
  font-weight: 700;
  font-size: 13px;
}

.card {
  padding: 14px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
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

.input {
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

.cols {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 8px 10px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
  font-weight: 900;
  font-size: 12px;
}

.chip.active {
  background: rgba(0, 91, 81, 0.12);
  color: #005b51;
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

.listHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
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
  grid-template-columns: 120px 1fr 1.4fr 200px auto auto;
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
  font-weight: 700;
  color: #51606d;
  font-size: 13px;
  word-break: break-word;
}

.pill {
  padding: 6px 8px;
  border-radius: 999px;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  justify-self: start;
}

.smallLink {
  border: none;
  background: transparent;
  color: #005b51;
  font-weight: 900;
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;
}

@media (max-width: 1000px) {
  .row {
    grid-template-columns: 1fr;
    align-items: start;
  }
}
</style>
