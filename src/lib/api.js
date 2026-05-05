const DEFAULT_API_BASE_URL = 'https://ocr-acc-user-module.onrender.com'

function normalizeBaseUrl(value) {
  const raw = (value || '').trim()
  if (!raw) return DEFAULT_API_BASE_URL
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

export function getApiBaseUrl() {
  return normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
}

export async function apiFetch(path, options = {}) {
  const { headers, ...rest } = options
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
  return fetch(url, { headers: headers || {}, ...rest })
}

