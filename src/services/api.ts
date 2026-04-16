import type { Product } from "../types/products";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products;
}