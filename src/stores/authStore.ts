import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser, LoginCredentials } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(
    JSON.parse(localStorage.getItem('auth_user') ?? 'null')
  )

  const isLoggedIn = computed(() => !!user.value)
  const token = computed(() => user.value?.token ?? null)

  async function login(credentials: LoginCredentials): Promise<void> {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...credentials, expiresInMins: 60 })
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data: AuthUser = await res.json()
    user.value = data
    localStorage.setItem('auth_user', JSON.stringify(data))
  }

  function logout(): void {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return { user, isLoggedIn, token, login, logout }
})