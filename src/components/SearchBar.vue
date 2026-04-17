<script setup lang="ts">
defineEmits<{
  (e: 'search', value: string): void;
}>();

defineProps<{
  modelValue: string;
}>();
</script>

<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('search', ($event.target as HTMLInputElement).value)"
      placeholder="Search products..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <svg
      class="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</template>