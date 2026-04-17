<script setup lang="ts">
defineProps<{
  categories: string[];
  selected: string;
}>();

defineEmits<{
  (e: 'select', category: string): void;
}>();
</script>

<template>
  <select
    :value="selected"
    @change="$emit('select', ($event.target as HTMLSelectElement).value)"
    class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
  >
    <option value="">All Categories</option>
    <option v-for="category in categories" :key="category" :value="category">
      {{ category }}
    </option>
  </select>
</template>