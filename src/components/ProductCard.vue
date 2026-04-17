<script setup lang="ts">
import type { Product } from "../types/products";
import { useCart } from "../composables/useCart";

defineProps<{
  product: Product;
}>();

const { addToCart } = useCart();
</script>

<template>
  <div class="border p-4 rounded-lg shadow hover:shadow-lg transition">
    <img :src="product.thumbnail" class="w-full h-40 object-cover mb-2" />

    <h2 class="font-bold">{{ product.title }}</h2>
    <p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
    
    <button
      @click="addToCart(product)"
      class="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      Add to Cart
    </button>
  </div>
</template>