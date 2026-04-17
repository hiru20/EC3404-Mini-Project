<script setup lang="ts">
import { useCart } from "../composables/useCart";

const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

const formatPrice = (price: number) => {
  return price.toFixed(2);
};
</script>

<template>
  <div v-if="cartItems.length === 0" class="text-center py-8 text-gray-500">
    <p class="text-lg">Your cart is empty</p>
    <p class="text-sm">Add some products to get started!</p>
  </div>
  <div v-else class="bg-white p-4 rounded-lg shadow mt-4">
    <h2 class="text-xl font-bold mb-4">Shopping Cart</h2>
    
    <div class="space-y-4">
      <div
        v-for="item in cartItems"
        :key="item.product.id"
        class="flex items-center justify-between border-b pb-2"
      >
        <div class="flex items-center gap-3">
          <img
            :src="item.product.thumbnail"
            :alt="item.product.title"
            class="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 class="font-medium">{{ item.product.title }}</h3>
            <p class="text-gray-600">${{ formatPrice(item.product.price) }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <button
            @click="updateQuantity(item.product.id, item.quantity - 1)"
            class="px-2 py-1 border rounded hover:bg-gray-100"
          >
            -
          </button>
          <span class="w-8 text-center">{{ item.quantity }}</span>
          <button
            @click="updateQuantity(item.product.id, item.quantity + 1)"
            class="px-2 py-1 border rounded hover:bg-gray-100"
          >
            +
          </button>
          <button
            @click="removeFromCart(item.product.id)"
            class="ml-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    
    <div class="mt-4 pt-4 border-t">
      <div class="flex justify-between text-lg font-bold">
        <span>Total:</span>
        <span>${{ formatPrice(cartTotal) }}</span>
      </div>
    </div>
  </div>
</template>     