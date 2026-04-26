import { computed, ref } from 'vue'
import { apiFetch } from '@/lib/api'

const STORAGE_KEY = 'ledger.auth.session.v1'

function safeJsonParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function loadSession() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  const parsed = safeJsonParse(raw)
  if (!parsed || typeof parsed !== 'object') return null
  return parsed
}

const initial = loadSession() || {}

const accessToken = ref(initial.accessToken || '')
const refreshToken = ref(initial.refreshToken || '')
const expiresAt = ref(typeof initial.expiresAt === 'number' ? initial.expiresAt : 0)
const profile = ref(null)

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
      expiresAt: expiresAt.value,
    }),
  )
}

function setTokens(tokens) {
  accessToken.value = tokens.accessToken || ''
  refreshToken.value = tokens.refreshToken || ''
  expiresAt.value = typeof tokens.expiresAt === 'number' ? tokens.expiresAt : 0
  persist()
}

function clearSession() {
  accessToken.value = ''
  refreshToken.value = ''
  expiresAt.value = 0
  profile.value = null
  localStorage.removeItem(STORAGE_KEY)
}

export const isAuthenticated = computed(() => Boolean(accessToken.value))

export function getAccessToken() {
  return accessToken.value
}

async function parseJsonResponse(response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function toErrorMessage(data, fallback) {
  if (data && typeof data === 'object' && typeof data.error === 'string' && data.error.trim()) {
    return data.error
  }
  return fallback
}

export async function login({ email, password }) {
  const response = await apiFetch('/api/v1/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await parseJsonResponse(response)
  if (!response.ok || !data || data.status !== true) {
    throw new Error(toErrorMessage(data, 'Login failed'))
  }

  setTokens({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
  })
}

export async function register({ email, password, fullName, phone }) {
  const response = await apiFetch('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
      phone,
    }),
  })

  const data = await parseJsonResponse(response)
  if (!response.ok || !data || data.status !== true) {
    throw new Error(toErrorMessage(data, 'Registration failed'))
  }

  const tokens = data.tokens || {}
  setTokens({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt: tokens.expires_at,
  })
}

export async function refresh() {
  if (!refreshToken.value) throw new Error('No refresh token')

  const response = await apiFetch('/api/v1/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken.value }),
  })

  const data = await parseJsonResponse(response)
  if (!response.ok || !data || data.status !== true) {
    clearSession()
    throw new Error(toErrorMessage(data, 'Session refresh failed'))
  }

  setTokens({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
  })
}

export async function logout() {
  const token = refreshToken.value
  try {
    if (token) {
      await apiFetch('/api/v1/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: token }),
      })
    }
  } finally {
    clearSession()
  }
}

export async function authedFetch(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = accessToken.value
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await apiFetch(path, { ...options, headers })
  if (response.status !== 401) return response

  await refresh()

  const retryHeaders = new Headers(options.headers || {})
  const newToken = accessToken.value
  if (newToken) retryHeaders.set('Authorization', `Bearer ${newToken}`)

  return apiFetch(path, { ...options, headers: retryHeaders })
}

export async function loadProfile() {
  const response = await authedFetch('/api/v1/profile', { method: 'GET' })
  const data = await parseJsonResponse(response)
  if (!response.ok || !data || data.status !== true) {
    throw new Error(toErrorMessage(data, 'Failed to load profile'))
  }
  profile.value = data.data || null
  return profile.value
}

export function useProfile() {
  return profile
}

