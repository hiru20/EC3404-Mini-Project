import { ref, computed } from 'vue'
import type { Product, ProductsResponse, Category } from '@/types'

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const searchQuery = ref<string>('')
  const selectedCategory = ref<string>('')
  const sortBy = ref<'price-asc' | 'price-desc' | 'rating' | 'default'>('default')

  const filteredProducts = computed<Product[]>(() => {
    let result = products.value.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value
        ? p.category === selectedCategory.value
        : true
      return matchesSearch && matchesCategory
    })

    if (sortBy.value === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    else if (sortBy.value === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    else if (sortBy.value === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)

    return result
  })

  async function fetchProducts(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100')
      if (!res.ok) throw new Error('Failed to fetch products')
      const data: ProductsResponse = await res.json()
      products.value = data.products
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCategories(): Promise<void> {
    try {
      const res = await fetch('https://dummyjson.com/products/categories')
      if (!res.ok) throw new Error('Failed to fetch categories')
      categories.value = await res.json()
    } catch (e) {
      console.error('Category fetch failed:', e)
    }
  }

  async function fetchProductById(id: number): Promise<Product | null> {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      if (!res.ok) throw new Error('Product not found')
      return await res.json() as Product
    } catch {
      return null
    }
  }

  return {
    products,
    filteredProducts,
    categories,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    sortBy,
    fetchProducts,
    fetchCategories,
    fetchProductById
  }
}