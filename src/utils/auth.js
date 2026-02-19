// src/utils/auth.js

export const TOKEN_KEY = 'uf_token'
export const USER_KEY  = 'uf_user'

export function saveSession(email) {
  const token = `dummy_token_${Date.now()}`
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify({ email, name: email.split('@')[0] }))
  return token
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || {}
  } catch {
    return {}
  }
}

// Validation helpers
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateRequired(value) {
  return value && value.trim().length > 0
}
