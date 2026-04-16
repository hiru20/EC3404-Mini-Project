<script setup lang="ts">
import type { Product } from "../types/products";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="border p-4 rounded-lg shadow hover:shadow-lg transition">
    <img :src="product.thumbnail" class="w-full h-40 object-cover mb-2" />

    <h2 class="font-bold">{{ product.title }}</h2>
    <p class="text-gray-600">${{ product.price }}</p>
  </div>
</template>