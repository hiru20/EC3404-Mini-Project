<template>
  <div :class="{ dark: isDark }">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <NavBar :is-dark="isDark" @toggle-dark="toggleDark" />
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const isDark = ref<boolean>(false)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggleDark(): void {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>