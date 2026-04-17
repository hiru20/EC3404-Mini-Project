<!--<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>
-->

<script setup lang="ts">
import { useCart } from "./composables/useCart";
import { ref } from "vue";
import Cart from "./components/Cart.vue";

const { cartCount } = useCart();
const showCart = ref(false);
</script>

<template>
  <div>
    <!-- Navigation -->
    <nav class="bg-gray-800 text-white p-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">My Store</router-link>
        <div class="flex gap-4">
          <router-link to="/" class="hover:text-gray-300">Home</router-link>
          <router-link to="/about" class="hover:text-gray-300">About</router-link>
          <button
            @click="showCart = !showCart"
            class="relative px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
          >
            Cart ({{ cartCount }})
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view />

    <!-- Cart Sidebar -->
    <div
      v-if="showCart"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="showCart = false"
    ></div>
    <div
      v-if="showCart"
      class="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-4 overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Shopping Cart</h2>
        <button @click="showCart = false" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <Cart />
    </div>
  </div>
</template>