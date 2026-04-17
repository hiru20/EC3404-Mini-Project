<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchProducts } from "../services/api";
import type { Product } from "../types/products";

import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import CategoryFilter from "../components/CategoryFilter.vue";

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref("");
const selectedCategory = ref("");

const categories = computed(() => {
  const cats = new Set(products.value.map(p => p.category));
  return Array.from(cats).sort();
});

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || 
      product.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const loadProducts = async () => {
  try {
    loading.value = true;
    products.value = await fetchProducts();
  } catch (e) {
    error.value = "Failed to load products. Please try again.";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(loadProducts);
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Products</h1>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1">
        <SearchBar v-model="searchQuery" @search="searchQuery = $event" />
      </div>
      <div class="sm:w-48">
        <CategoryFilter
          :categories="categories"
          :selected="selectedCategory"
          @select="selectedCategory = $event"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button
        @click="loadProducts"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>

    <!-- Products -->
    <ProductList v-else :products="filteredProducts" />

    <!-- Empty State -->
    <div
      v-if="!loading && !error && filteredProducts.length === 0"
      class="text-center py-12 text-gray-500"
    >
      No products found matching your criteria.
    </div>
  </div>
</template>