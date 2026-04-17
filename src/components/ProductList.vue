<script setup lang="ts">
import type { Product } from "../types/products.ts";
import ProductCard from "./ProductCard.vue";

defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>