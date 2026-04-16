<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchProducts } from "../services/api";
import type { Product } from "../types/products";

import ProductList from "../components/ProductList.vue";

const products = ref<Product[]>([]);

onMounted(async () => {
    const data = await fetchProducts();
  console.log("API DATA:", data);
  products.value = await fetchProducts();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Products</h1>

    <ProductList :products="products" />
  </div>
</template>