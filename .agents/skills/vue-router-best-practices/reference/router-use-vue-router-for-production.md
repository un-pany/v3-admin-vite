---
title: Use Vue Router Library for Production Applications
impact: LOW
impactDescription: Simple hash routing lacks essential features for production SPAs; Vue Router provides navigation guards, lazy loading, and proper history management
type: best-practice
tags: [vue3, vue-router, spa, production, architecture]
---

# Use Vue Router Library for Production Applications

**Impact: LOW** - While you can implement basic routing with hash changes and dynamic components, the official Vue Router library should be used for any production single-page application. It provides essential features like navigation guards, nested routes, lazy loading, and proper browser history integration that are tedious and error-prone to implement manually.

## Task Checklist

- [ ] Install Vue Router for production SPAs
- [ ] Use simple routing only for learning or tiny prototypes
- [ ] Leverage built-in features: guards, lazy loading, meta fields
- [ ] Consider router-based state and data loading patterns

## When Simple Routing is Acceptable

```vue
<!-- Only for: learning, prototypes, or micro-apps with 2-3 pages -->
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'

const routes = { '/': Home, '/about': About }
const currentPath = ref(window.location.hash.slice(1) || '/')

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash.slice(1) || '/'
})

const currentView = computed(() => routes[currentPath.value])
</script>

<template>
  <nav>
    <a href="#/">Home</a>
    <a href="#/about">About</a>
  </nav>
  <component :is="currentView" />
</template>
```

## Why Vue Router for Production

### Features You'd Have to Implement Manually

| Feature | Simple Routing | Vue Router |
|---------|---------------|------------|
| Navigation guards | Manual, error-prone | Built-in, composable |
| Nested routes | Complex to implement | Native support |
| Route params | Parse manually | Automatic extraction |
| Lazy loading | DIY with dynamic imports | Built-in with code splitting |
| History mode (clean URLs) | Requires server config + manual | Built-in |
| Scroll behavior | Manual | Configurable |
| Route transitions | DIY | Integrated with Transition |
| Active link styling | Manual class toggling | `router-link-active` class |
| Programmatic navigation | `location.hash = ...` | `router.push()`, `router.replace()` |
| Route meta fields | N/A | Built-in |

## Production Setup with Vue Router

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),  // Lazy loaded
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue')
      }
    ]
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue'),
    props: true  // Pass params as props
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// Global navigation guard
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})

export default router
```

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
  </nav>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
```

## Modern Vue Router Features (2025+)

```javascript
// Data Loading API (Vue Router 4.2+)
const routes = [
  {
    path: '/users/:id',
    component: UserProfile,
    // Load data at route level
    loader: async (route) => {
      return { user: await fetchUser(route.params.id) }
    }
  }
]

// View Transitions API integration
const router = createRouter({
  // Enable native browser view transitions
  // Requires browser support (Chrome 111+)
})
```

## Key Points

1. **Use Vue Router for any app beyond a prototype** - The features are essential
2. **Simple routing is for learning** - Understand the concepts, then use the library
3. **Lazy loading is critical for bundle size** - Vue Router makes it trivial
4. **Navigation guards prevent security issues** - Hard to get right manually
5. **History mode requires Vue Router** - Clean URLs need proper handling
6. **New features keep coming** - Data Loading API, View Transitions

## Reference
- [Vue.js Routing Guide](https://vuejs.org/guide/scaling-up/routing.html)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vue Router Getting Started](https://router.vuejs.org/guide/)
