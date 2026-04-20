<template>
  <div class="bg-gray-100 dark:bg-gray-950 -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 px-4 sm:px-6 lg:px-8 pt-6 pb-10 min-h-screen">
    <div class="max-w-5xl mx-auto">

      <h1 class="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
        Shopping Cart
      </h1>

      <!-- Empty -->
      <div v-if="cartStore.items.length === 0"
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-8 text-center">
        <p class="text-3xl mb-3">🛒</p>
        <p class="text-gray-500 dark:text-gray-400 font-semibold mb-1">Your ShopVue Cart is empty</p>
        <p class="text-xs text-gray-400 mb-4">Your shopping cart lives here. Add items by clicking "Add to Cart" on any product.</p>
        <RouterLink to="/"
          class="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full transition text-sm">
          Continue Shopping
        </RouterLink>
      </div>

      <!-- Cart layout: items left, summary right -->
      <div v-else class="flex flex-col lg:flex-row gap-4 items-start">

        <!-- Items -->
        <div class="flex-1 w-full space-y-0">
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">

            <!-- Header -->
            <div class="hidden sm:flex justify-end px-6 py-2 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500">
              <span class="w-24 text-right">Price</span>
            </div>

            <!-- Items list -->
            <div v-for="(item, index) in cartStore.items" :key="item.product.id"
              class="flex gap-3 sm:gap-4 p-4 sm:p-6"
              :class="index < cartStore.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''">

              <!-- Image -->
              <RouterLink :to="`/product/${item.product.id}`" class="flex-shrink-0">
                <img :src="item.product.thumbnail" :alt="item.product.title"
                  class="w-20 h-20 sm:w-28 sm:h-28 object-contain border border-gray-100 dark:border-gray-800 rounded bg-white dark:bg-gray-800 p-1" />
              </RouterLink>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <RouterLink :to="`/product/${item.product.id}`"
                  class="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 transition-colors">
                  {{ item.product.title }}
                </RouterLink>
                <p class="text-xs text-green-600 font-semibold mt-1">In Stock</p>
                <p class="text-xs text-blue-600 dark:text-blue-400 mt-0.5">🚚 FREE Delivery</p>

                <!-- Controls -->
                <div class="flex items-center gap-3 mt-3 flex-wrap">
                  <div class="flex items-center border border-gray-300 dark:border-gray-700 rounded overflow-hidden text-sm">
                    <button
                      @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                      class="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold transition border-r border-gray-300 dark:border-gray-700">
                      −
                    </button>
                    <span class="px-3 py-1 font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-900 min-w-[2rem] text-center">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                      class="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold transition border-l border-gray-300 dark:border-gray-700">
                      +
                    </button>
                  </div>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  <button @click="cartStore.removeFromCart(item.product.id)"
                    class="text-xs text-blue-600 dark:text-blue-400 hover:text-red-500 hover:underline transition">
                    Delete
                  </button>
                  <span class="text-gray-300 dark:text-gray-600 hidden sm:block">|</span>
                  <button class="text-xs text-blue-600 dark:text-blue-400 hover:underline hidden sm:block">Save for later</button>
                </div>
              </div>

              <!-- Price -->
              <div class="hidden sm:block text-right flex-shrink-0 w-24">
                <span class="font-black text-gray-900 dark:text-white text-base">
                  ${{ (item.product.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- Subtotal bottom -->
            <div class="px-4 sm:px-6 py-4 border-t border-gray-100 dark:border-gray-800 text-right">
              <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Subtotal ({{ cartStore.totalItems }} items):
                <span class="font-black text-gray-900 dark:text-white text-base sm:text-lg ml-1">
                  ${{ cartStore.totalPrice.toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Order Summary sidebar -->
        <div class="w-full lg:w-72 flex-shrink-0">
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-4 sm:p-5 sticky top-20">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Subtotal ({{ cartStore.totalItems }} items):
            </p>
            <p class="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1">
              ${{ cartStore.totalPrice.toFixed(2) }}
            </p>
            <p class="text-xs text-green-600 font-semibold mb-4">✓ Your order qualifies for FREE Shipping</p>

            <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 rounded-full transition active:scale-95 text-sm mb-2">
              Proceed to Checkout
            </button>
            <button @click="cartStore.clearCart()"
              class="w-full text-xs text-blue-600 dark:text-blue-400 hover:underline py-1">
              Clear Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>