<template>
  <div class="min-h-[75vh] flex items-center justify-center px-4">
    <div class="w-full max-w-sm sm:max-w-md">
      <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 sm:p-8">

        <div class="text-center mb-6 sm:mb-8">
          <span class="text-4xl sm:text-5xl">🔐</span>
          <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
            Welcome back
          </h1>
          <p class="text-gray-400 text-xs sm:text-sm mt-1">Sign in to manage your cart and orders</p>
        </div>

        <!-- Demo hint -->
        <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-xl p-3 mb-5 text-xs text-orange-700 dark:text-orange-300">
          <p class="font-bold mb-1">Demo credentials:</p>
          <p>Username: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 rounded">emilys</code></p>
          <p class="mt-0.5">Password: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 rounded">emilyspass</code></p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Username
            </label>
            <input
              v-model="credentials.username"
              type="text"
              placeholder="e.g. emilys"
              @keyup.enter="handleLogin"
              class="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400"
            />
          </div>

          <div>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <input
              v-model="credentials.password"
              type="password"
              placeholder="••••••••"
              @keyup.enter="handleLogin"
              class="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400"
            />
          </div>

          <!-- Error -->
          <p v-if="errorMsg"
            class="text-red-500 text-xs sm:text-sm bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg px-3 py-2">
            {{ errorMsg }}
          </p>

          <button
            @click="handleLogin"
            :disabled="isLoading"
            class="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-2.5 sm:py-3 rounded-xl transition-all duration-150 active:scale-95 text-sm sm:text-base mt-1"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import type { LoginCredentials } from '@/types'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const credentials = reactive<LoginCredentials>({ username: '', password: '' })
const isLoading = ref<boolean>(false)
const errorMsg = ref<string>('')

async function handleLogin(): Promise<void> {
  if (!credentials.username || !credentials.password) {
    errorMsg.value = 'Please enter both username and password.'
    return
  }
  isLoading.value = true
  errorMsg.value = ''
  try {
    await authStore.login(credentials)
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch {
    errorMsg.value = 'Invalid credentials. Try: emilys / emilyspass'
  } finally {
    isLoading.value = false
  }
}
</script>