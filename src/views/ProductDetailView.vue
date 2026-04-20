<template>
  <div class="bg-white dark:bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 px-4 sm:px-6 lg:px-8 pt-4 pb-10 min-h-screen">
    <div class="max-w-6xl mx-auto">

      <!-- Breadcrumb -->
      <nav class="text-xs text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-1 flex-wrap">
        <RouterLink to="/" class="hover:underline">ShopVue</RouterLink>
        <span class="text-gray-400">›</span>
        <span v-if="product" class="text-gray-500 capitalize">{{ product.category }}</span>
        <span class="text-gray-400">›</span>
        <span class="text-gray-700 dark:text-gray-300 line-clamp-1 max-w-xs">{{ product?.title }}</span>
      </nav>

      <!-- Loading -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        <div class="aspect-square bg-gray-100 dark:bg-gray-800 rounded" />
        <div class="lg:col-span-2 space-y-4">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>
      </div>

      <!-- Not found -->
      <div v-else-if="!product" class="text-center py-20">
        <p class="text-5xl mb-4">😕</p>
        <p class="text-gray-500 mb-4">We couldn't find that product.</p>
        <RouterLink to="/" class="text-blue-600 hover:underline font-semibold text-sm">← Back to results</RouterLink>
      </div>

      <!-- Product -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">

        <!-- Left: Images -->
        <div class="space-y-3">
          <!-- Main image -->
          <div class="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 aspect-square flex items-center justify-center p-4 overflow-hidden">
            <img :src="activeImage" :alt="product.title"
              class="w-full h-full object-contain transition-all duration-300" />
          </div>
          <!-- Thumbnails -->
          <div class="flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="(img, i) in product.images" :key="i"
              @click="activeImage = img"
              class="flex-shrink-0 w-14 h-14 border-2 rounded transition-all overflow-hidden bg-white dark:bg-gray-800"
              :class="activeImage === img
                ? 'border-orange-500'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 opacity-70 hover:opacity-100'"
            >
              <img :src="img" class="w-full h-full object-contain p-1" />
            </button>
          </div>
        </div>

        <!-- Middle: Info -->
        <div class="flex flex-col gap-3 lg:border-r border-gray-200 dark:border-gray-700 lg:pr-6">
          <h1 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-snug">
            {{ product.title }}
          </h1>
          <p class="text-sm text-blue-600 dark:text-blue-400">by <span class="hover:underline cursor-pointer">{{ product.brand }}</span></p>

          <!-- Rating -->
          <div class="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
            <div class="flex">
              <span v-for="star in 5" :key="star" class="text-sm"
                :class="star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'">★</span>
            </div>
            <span class="text-sm text-blue-600 dark:text-blue-400">{{ product.rating.toFixed(1) }}</span>
            <span class="text-xs text-gray-400">{{ product.stock }} ratings</span>
          </div>

          <!-- Price -->
          <div class="border-b border-gray-100 dark:border-gray-800 pb-3">
            <div class="flex items-baseline gap-2 flex-wrap">
              <span class="text-xs text-gray-500">$</span>
              <span class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                {{ Math.floor(product.price) }}<span class="text-base align-super font-bold">.{{ (product.price % 1).toFixed(2).slice(2) }}</span>
              </span>
              <span v-if="product.discountPercentage >= 5"
                class="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                -{{ Math.round(product.discountPercentage) }}%
              </span>
            </div>
            <p v-if="product.discountPercentage > 0" class="text-xs text-gray-500 mt-1">
              List Price: <span class="line-through">${{ originalPrice }}</span>
              &nbsp;You Save: <span class="text-red-600 font-semibold">${{ savings }}</span>
            </p>
            <p class="text-sm text-blue-700 dark:text-blue-400 font-semibold mt-1">🚚 FREE delivery <span class="font-black">Tomorrow</span></p>
          </div>

          <!-- Description -->
          <div class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-b border-gray-100 dark:border-gray-800 pb-3">
            {{ product.description }}
          </div>

          <!-- Category & Stock -->
          <div class="text-sm space-y-1">
            <div class="flex gap-2">
              <span class="text-gray-500 w-20 flex-shrink-0">Category</span>
              <span class="text-blue-600 dark:text-blue-400 capitalize">{{ product.category }}</span>
            </div>
            <div class="flex gap-2">
              <span class="text-gray-500 w-20 flex-shrink-0">Status</span>
              <span :class="product.stock < 10 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'">
                {{ product.stock < 10 ? `Only ${product.stock} left!` : 'In Stock' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Buy box (Amazon's right panel) -->
        <div class="lg:col-span-1">
          <div class="border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col gap-3 sticky top-20">
            <div class="flex items-baseline gap-1">
              <span class="text-xs text-gray-500">$</span>
              <span class="text-2xl font-black text-gray-900 dark:text-white">
                {{ Math.floor(product.price) }}<span class="text-sm align-super">.{{ (product.price % 1).toFixed(2).slice(2) }}</span>
              </span>
            </div>

            <p class="text-sm text-blue-700 dark:text-blue-400 font-semibold">🚚 FREE delivery <strong>Tomorrow</strong></p>

            <div class="text-sm" :class="product.stock < 10 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'">
              {{ product.stock < 10 ? `Only ${product.stock} left in stock` : 'In Stock' }}
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-2 text-sm">
              <label class="text-gray-600 dark:text-gray-400">Qty:</label>
              <select v-model="qty"
                class="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-yellow-400">
                <option v-for="n in Math.min(product.stock, 10)" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>

            <button
              @click="handleAddToCart"
              class="w-full py-2 rounded-full font-semibold text-sm transition-all active:scale-95"
              :class="addedMsg ? 'bg-green-400 text-gray-900' : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'">
              {{ addedMsg ? '✓ Added to Cart' : 'Add to Cart' }}
            </button>

            <button
              class="w-full py-2 rounded-full font-semibold text-sm bg-orange-400 hover:bg-orange-500 text-gray-900 transition active:scale-95">
              Buy Now
            </button>

            <div class="text-xs text-gray-500 dark:text-gray-400 space-y-1 border-t border-gray-100 dark:border-gray-800 pt-3">
              <p>🔒 Secure transaction</p>
              <p>🏭 Sold by <span class="text-blue-600 dark:text-blue-400">ShopVue Store</span></p>
              <p>📦 Ships from <span class="font-medium text-gray-700 dark:text-gray-300">ShopVue Warehouse</span></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product } from '@/types'
import { useProducts } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps<{ id: string }>()
const cartStore = useCartStore()
const { fetchProductById } = useProducts()

const product = ref<Product | null>(null)
const isLoading = ref<boolean>(true)
const activeImage = ref<string>('')
const addedMsg = ref<boolean>(false)
const qty = ref<number>(1)

const originalPrice = computed<string>(() => {
  if (!product.value) return '0'
  return (product.value.price / (1 - product.value.discountPercentage / 100)).toFixed(2)
})

const savings = computed<string>(() => {
  if (!product.value) return '0'
  return (Number(originalPrice.value) - product.value.price).toFixed(2)
})

onMounted(async () => {
  product.value = await fetchProductById(Number(props.id))
  if (product.value) activeImage.value = product.value.thumbnail
  isLoading.value = false
})

function handleAddToCart(): void {
  if (!product.value) return
  for (let i = 0; i < qty.value; i++) cartStore.addToCart(product.value)
  addedMsg.value = true
  setTimeout(() => { addedMsg.value = false }, 2000)
}
</script>