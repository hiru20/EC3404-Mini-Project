# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


A modern e-commerce Single Page Application built with Vue 3, TypeScript, Tailwind CSS, and Pinia.

## Tech Stack

- **Vue 3** (Composition API)
- **TypeScript** (strict, no `any`)
- **Vite** (build tool)
- **Tailwind CSS v4** (utility-first styling)
- **Pinia** (global state management)
- **Vue Router** (dynamic routing)
- **DummyJSON API** (data source)

## Features

- Browse 100 products in a responsive grid
- Search products by name (real-time)
- Filter by category
- Sort by price or rating
- Click any product for a full detail page (`/product/:id`)
- Add to Cart with quantity controls (persists across reloads)
- Login / Logout via DummyJSON Auth API (JWT stored in localStorage)
- Dark Mode toggle (persists across reloads)
- Protected `/cart` route (requires login)

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone or extract the project
cd shopvue-spa

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Demo Credentials

The app uses DummyJSON's auth endpoint. Use these to log in:

| Username | Password    |
|----------|-------------|
| emilys   | emilyspass  |
| michaelw | michaelwpass|

## Project Structure

```
src/
├── components/
│   ├── NavBar.vue          # Sticky nav with auth state, cart badge, dark toggle
│   ├── FilterBar.vue       # Search input, category dropdown, sort select
│   └── ProductCard.vue     # Reusable product card with add-to-cart
├── composables/
│   └── useProducts.ts      # Data fetching, filtering, sorting logic
├── router/
│   └── index.ts            # Vue Router with navigation guard
├── stores/
│   ├── authStore.ts        # Pinia auth store (JWT + localStorage)
│   └── cartStore.ts        # Pinia cart store (items + localStorage)
├── types/
│   └── index.ts            # All TypeScript interfaces
├── views/
│   ├── HomeView.vue        # Product grid + filters
│   ├── ProductDetailView.vue # Dynamic /product/:id route
│   ├── LoginView.vue       # Auth form
│   └── CartView.vue        # Cart management
├── App.vue                 # Root + dark mode logic
├── main.ts                 # App entry point
└── style.css               # Tailwind imports
```
