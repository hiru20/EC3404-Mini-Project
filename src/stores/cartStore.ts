import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(
    JSON.parse(localStorage.getItem('cart') ?? '[]')
  )

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  )

  function persist(): void {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function addToCart(product: Product): void {
    const existing = items.value.find(i => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    persist()
  }

  function removeFromCart(productId: number): void {
    items.value = items.value.filter(i => i.product.id !== productId)
    persist()
  }

  function updateQuantity(productId: number, quantity: number): void {
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        persist()
      }
    }
  }

  function clearCart(): void {
    items.value = []
    persist()
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart }
})