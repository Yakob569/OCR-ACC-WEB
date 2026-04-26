function base64ToUtf8(value) {
  if (typeof value !== 'string' || !value) return ''
  try {
    if (typeof globalThis.atob === 'function') return globalThis.atob(value)
  } catch {
    // fall through
  }
  try {
    // Node-like fallback (used only if present)
    // eslint-disable-next-line no-undef
    if (typeof Buffer !== 'undefined') return Buffer.from(value, 'base64').toString('utf8')
  } catch {
    // ignore
  }
  return ''
}

export function decodeBase64Json(value) {
  const utf8 = base64ToUtf8(value)
  if (!utf8) return null
  try {
    return JSON.parse(utf8)
  } catch {
    return null
  }
}

