import { ref, computed } from 'vue';
import type { Product } from '../types/products';

const cartItems = ref<{ product: Product; quantity: number }[]>([]);

export function useCart() {
  const addToCart = (product: Product) => {
    const existing = cartItems.value.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cartItems.value.push({ product, quantity: 1 });
    }
  };

  const removeFromCart = (productId: number) => {
    const index = cartItems.value.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const cartCount = computed(() => 
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  };
}