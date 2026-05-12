<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createGroup, listGroups } from '@/api/ledgerApi'

const router = useRouter()

const groups = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const limit = ref(20)
const offset = ref(0)
const hasMore = ref(true)

const search = ref('')

const isCreating = ref(false)
const createError = ref('')
const newName = ref('')
const newDescription = ref('')

const filteredGroups = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return groups.value
  return groups.value.filter((g) => {
    const name = (g?.name || '').toLowerCase()
    const description = (g?.description || '').toLowerCase()
    return name.includes(q) || description.includes(q)
  })
})

async function loadFirstPage() {
  errorMessage.value = ''
  isLoading.value = true
  offset.value = 0
  hasMore.value = true
  try {
    const data = await listGroups({ limit: limit.value, offset: 0 })
    groups.value = Array.isArray(data) ? data : []
    hasMore.value = groups.value.length === limit.value
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load groups'
    groups.value = []
    hasMore.value = false
  } finally {
    isLoading.value = false
  }
}

async function loadMore() {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    const nextOffset = offset.value + limit.value
    const data = await listGroups({ limit: limit.value, offset: nextOffset })
    const next = Array.isArray(data) ? data : []
    offset.value = nextOffset
    groups.value = [...groups.value, ...next]
    hasMore.value = next.length === limit.value
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load more groups'
  } finally {
    isLoading.value = false
  }
}

async function onCreate() {
  createError.value = ''
  isCreating.value = true
  try {
    const created = await createGroup({ name: newName.value.trim(), description: newDescription.value.trim() })
    newName.value = ''
    newDescription.value = ''
    await loadFirstPage()
    if (created?.id) router.push(`/app/groups/${created.id}`)
  } catch (error) {
    createError.value = error instanceof Error ? error.message : 'Failed to create group'
  } finally {
    isCreating.value = false
  }
}

onMounted(loadFirstPage)
</script>

<template>
  <div class="wrap">
    <div class="header">
      <h2>Groups</h2>
      <button class="refresh" :disabled="isLoading" @click="loadFirstPage">Refresh</button>
    </div>

    <div class="createCard">
      <h3>New Group</h3>
      <p class="muted">Create a batch (group) to upload multiple receipt images.</p>

      <p v-if="createError" class="error">{{ createError }}</p>

      <div class="formRow">
        <label class="label">Name</label>
        <input v-model="newName" class="input" placeholder="cafe-23" required />
      </div>
      <div class="formRow">
        <label class="label">Description</label>
        <input v-model="newDescription" class="input" placeholder="Cafe receipts" />
      </div>
      <button class="primary" :disabled="isCreating || !newName.trim()" @click="onCreate">
        {{ isCreating ? 'Creating…' : 'Create Group' }}
      </button>
    </div>

    <div class="listCard">
      <div class="listHeader">
        <h3>All Groups</h3>
        <input v-model="search" class="search" placeholder="Search groups…" />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-else-if="isLoading && groups.length === 0" class="muted">Loading groups…</p>
      <p v-else-if="filteredGroups.length === 0" class="muted">No groups found.</p>

      <ul v-else class="list">
        <li 
          v-for="group in filteredGroups" 
          :key="group.id" 
          class="row clickable-row" 
          @click="router.push(`/app/groups/${group.id}`)"
        >
          <div class="name">{{ group.name }}</div>
          <div class="desc">{{ group.description || '—' }}</div>
          <div class="pill">{{ group.status }}</div>
          <div class="chevron">󰅂</div>
        </li>
      </ul>

      <div class="footer">
        <button v-if="hasMore" class="secondary" :disabled="isLoading" @click="loadMore">
          {{ isLoading ? 'Loading…' : 'Load more' }}
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

h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  color: #191c1d;
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

.createCard,
.listCard {
  padding: 14px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
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
.search {
  padding: 12px 12px;
  border-radius: 10px;
  border: 1px solid rgba(190, 201, 200, 0.6);
  outline: none;
  font-weight: 700;
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

.secondary {
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
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

.search {
  width: 260px;
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
  grid-template-columns: 1.1fr 1.4fr auto auto;
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

.desc {
  font-weight: 700;
  color: #51606d;
  font-size: 13px;
}

.chevron {
  color: #005b51;
  font-size: 16px;
  opacity: 0.5;
  font-weight: 900;
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

.footer {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

@media (max-width: 900px) {
  .listHeader {
    flex-direction: column;
    align-items: stretch;
  }
  .search {
    width: 100%;
  }
  .row {
    grid-template-columns: 1fr;
  }
  .clickable-row:hover {
    transform: none;
  }
}
</style>
