<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getDashboardSummary, listGroups } from '@/api/ledgerApi'

const router = useRouter()

const summary = ref(null)
const recentGroups = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const isLoadingFallbackGroups = ref(false)

async function load() {
  errorMessage.value = ''
  isLoading.value = true
  try {
    summary.value = await getDashboardSummary()
    recentGroups.value = Array.isArray(summary.value?.recent_groups) ? summary.value.recent_groups : []

    if (recentGroups.value.length === 0 && (summary.value?.total_groups || 0) > 0) {
      isLoadingFallbackGroups.value = true
      try {
        const groups = await listGroups({ limit: 5, offset: 0 })
        recentGroups.value = Array.isArray(groups) ? groups : []
      } finally {
        isLoadingFallbackGroups.value = false
      }
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load dashboard'
    recentGroups.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="wrap">
    <div class="header">
      <h2>Dashboard</h2>
      <button class="refresh" :disabled="isLoading" @click="load">Refresh</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-else-if="isLoading" class="muted">Loading summary…</p>

    <div v-else-if="summary" class="grid">
      <div class="card">
        <div class="label">Total Groups</div>
        <div class="value">{{ summary.total_groups ?? 0 }}</div>
      </div>
      <div class="card">
        <div class="label">Total Scans</div>
        <div class="value">{{ summary.total_scans ?? 0 }}</div>
      </div>
      <div class="card">
        <div class="label">Successful</div>
        <div class="value">{{ summary.successful_scans ?? 0 }}</div>
      </div>
      <div class="card">
        <div class="label">Failed</div>
        <div class="value">{{ summary.failed_scans ?? 0 }}</div>
      </div>
      <div class="card">
        <div class="label">Needs Review</div>
        <div class="value">{{ summary.needs_review_scans ?? 0 }}</div>
      </div>
      <div class="card">
        <div class="label">Avg Confidence</div>
        <div class="value">{{ summary.average_confidence ?? '—' }}</div>
      </div>

      <div class="panel">
        <div class="panelHeader">
          <h3>Recent Groups</h3>
          <button class="link" @click="router.push('/app/groups')">View all</button>
        </div>
        <div v-if="isLoadingFallbackGroups" class="muted">Loading groups…</div>
        <div v-else-if="!recentGroups || recentGroups.length === 0" class="muted">
          No groups yet. Create your first group to start scanning receipts.
        </div>
        <ul v-else class="list">
          <li v-for="group in recentGroups" :key="group.id" class="row">
            <div class="name">{{ group.name }}</div>
            <div class="pill">{{ group.status }}</div>
            <button class="smallLink" @click="router.push(`/app/groups/${group.id}`)">Open</button>
          </li>
        </ul>
      </div>

      <div class="panel">
        <div class="panelHeader">
          <h3>Recent Images</h3>
        </div>
        <div v-if="!summary.recent_images || summary.recent_images.length === 0" class="muted">
          No recent uploads.
        </div>
        <ul v-else class="list">
          <li v-for="img in summary.recent_images" :key="img.id" class="row">
            <div class="name">{{ img.original_filename || img.id }}</div>
            <div class="pill">{{ img.ocr_status }}</div>
            <button class="smallLink" @click="router.push(`/app/images/${img.id}`)">Open</button>
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
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  color: #005b51;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.card {
  padding: 14px;
  border-radius: 12px;
  background: #f2f4f5;
}

.label {
  font-size: 11px;
  color: #51606d;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.value {
  margin-top: 8px;
  font-size: 24px;
  font-weight: 900;
  color: #191c1d;
}

.panel {
  grid-column: span 3;
  padding: 14px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
}

.panelHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  color: #191c1d;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f8f9fa;
}

.name {
  font-weight: 800;
  color: #191c1d;
  font-size: 13px;
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
}

.link {
  border: none;
  background: transparent;
  color: #005b51;
  font-weight: 900;
  cursor: pointer;
}

.smallLink {
  border: none;
  background: transparent;
  color: #005b51;
  font-weight: 900;
  cursor: pointer;
  font-size: 12px;
}

.muted {
  margin: 0;
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

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .panel {
    grid-column: span 1;
  }
  .row {
    grid-template-columns: 1fr;
    align-items: start;
  }
}
</style>
