import { authedFetch } from '@/stores/auth'

async function parseJson(response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function apiError(data, fallback) {
  if (data && typeof data === 'object' && typeof data.error === 'string' && data.error.trim()) {
    return new Error(data.error)
  }
  return new Error(fallback)
}

async function okJson(response, fallbackErrorMessage) {
  const data = await parseJson(response)
  if (!response.ok || !data || data.status !== true) {
    throw apiError(data, fallbackErrorMessage)
  }
  return data
}

export async function getDashboardSummary() {
  const response = await authedFetch('/api/v1/dashboard/summary', { method: 'GET' })
  const data = await okJson(response, 'Failed to load dashboard summary')
  return data.data
}

export async function listGroups({ limit = 20, offset = 0 } = {}) {
  const response = await authedFetch(`/api/v1/groups?limit=${limit}&offset=${offset}`, { method: 'GET' })
  const data = await okJson(response, 'Failed to list groups')
  return data.data
}

export async function createGroup({ name, description }) {
  const response = await authedFetch('/api/v1/groups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  })
  const data = await okJson(response, 'Failed to create group')
  return data.data
}

export async function getGroup(groupId) {
  const response = await authedFetch(`/api/v1/groups/${groupId}`, { method: 'GET' })
  const data = await okJson(response, 'Failed to load group')
  return data.data
}

export async function uploadGroupImages(groupId, files) {
  const form = new FormData()
  for (const file of files) form.append('files', file)

  const response = await authedFetch(`/api/v1/groups/${groupId}/images`, {
    method: 'POST',
    body: form,
  })
  const data = await okJson(response, 'Failed to upload images')
  return data.data
}

export async function listGroupImages(groupId, { limit = 20, offset = 0 } = {}) {
  const response = await authedFetch(
    `/api/v1/groups/${groupId}/images?limit=${limit}&offset=${offset}`,
    { method: 'GET' },
  )
  const data = await okJson(response, 'Failed to list group images')
  return data.data
}

export async function listGroupResults(groupId, { limit = 20, offset = 0 } = {}) {
  const response = await authedFetch(
    `/api/v1/groups/${groupId}/results?limit=${limit}&offset=${offset}`,
    { method: 'GET' },
  )
  const data = await okJson(response, 'Failed to list group results')
  return data.data
}

export async function listGroupExports(groupId, { limit = 20, offset = 0 } = {}) {
  const response = await authedFetch(
    `/api/v1/groups/${groupId}/exports?limit=${limit}&offset=${offset}`,
    { method: 'GET' },
  )
  const data = await okJson(response, 'Failed to list group exports')
  return data.data
}

export async function createGroupCsvExport(groupId, { selectedColumns, includeCorrectedValues }) {
  const response = await authedFetch(`/api/v1/groups/${groupId}/exports/csv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      selected_columns: selectedColumns,
      include_corrected_values: includeCorrectedValues,
    }),
  })
  const data = await okJson(response, 'Failed to create export')
  return data.data
}

export async function getImage(imageId) {
  const response = await authedFetch(`/api/v1/images/${imageId}`, { method: 'GET' })
  const data = await okJson(response, 'Failed to load image')
  return data.data
}

export async function getImageResult(imageId) {
  const response = await authedFetch(`/api/v1/images/${imageId}/result`, { method: 'GET' })
  const data = await okJson(response, 'Failed to load image result')
  return data.data
}

export async function submitImageReview(imageId, { qualityLabel, isAccepted, correctedFields, reviewNotes }) {
  const response = await authedFetch(`/api/v1/images/${imageId}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quality_label: qualityLabel,
      is_accepted: isAccepted,
      corrected_fields: correctedFields,
      review_notes: reviewNotes,
    }),
  })
  const data = await okJson(response, 'Failed to submit review')
  return data.data
}

export async function retryImage(imageId) {
  const response = await authedFetch(`/api/v1/images/${imageId}/retry`, { method: 'POST' })
  const data = await okJson(response, 'Failed to retry image')
  return data.data
}

