---
title: Simple Hash Routing Requires Event Listener Cleanup
impact: MEDIUM
impactDescription: When implementing basic routing without Vue Router, forgetting to remove hashchange listeners causes memory leaks and multiple handler execution
type: gotcha
tags: [vue3, routing, events, memory-leak, cleanup]
---

# Simple Hash Routing Requires Event Listener Cleanup

**Impact: MEDIUM** - When implementing basic client-side routing without Vue Router (using hash-based routing with `hashchange` events), you must clean up event listeners when the component unmounts. Failure to do so causes memory leaks and can result in multiple handlers firing after the component is recreated.

## Task Checklist

- [ ] Store event listener reference for cleanup
- [ ] Use onUnmounted to remove event listener
- [ ] Consider using Vue Router instead for production apps
- [ ] Test component mount/unmount cycles

## The Problem

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

// BUG: Event listener is never removed!
// Each time this component mounts, a NEW listener is added
// After mounting 5 times, you have 5 listeners running
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>
```

**What happens:**
1. Component mounts, adds listener
2. Component unmounts (e.g., route change, v-if toggle)
3. Component mounts again, adds ANOTHER listener
4. Now TWO listeners respond to each hash change
5. Eventually causes performance issues and memory leaks

## Solution: Proper Cleanup with onUnmounted

```vue
<script setup>
import { ref, computed, onUnmounted } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

// Store handler reference for cleanup
function handleHashChange() {
  currentPath.value = window.location.hash
}

// Add listener
window.addEventListener('hashchange', handleHashChange)

// CRITICAL: Remove listener on unmount
onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
```

## Solution: Using Options API

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },

  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },

  mounted() {
    // Store bound handler for cleanup
    this.hashHandler = () => {
      this.currentPath = window.location.hash
    }
    window.addEventListener('hashchange', this.hashHandler)
  },

  beforeUnmount() {
    // Clean up
    window.removeEventListener('hashchange', this.hashHandler)
  }
}
</script>
```

## Solution: Composable for Reusable Hash Routing

```javascript
// composables/useHashRouter.js
import { ref, computed, onUnmounted } from 'vue'

export function useHashRouter(routes, notFoundComponent = null) {
  const currentPath = ref(window.location.hash)

  function handleHashChange() {
    currentPath.value = window.location.hash
  }

  // Setup
  window.addEventListener('hashchange', handleHashChange)

  // Cleanup - handled automatically when component unmounts
  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHashChange)
  })

  const currentView = computed(() => {
    const path = currentPath.value.slice(1) || '/'
    return routes[path] || notFoundComponent
  })

  function navigate(path) {
    window.location.hash = path
  }

  return {
    currentPath,
    currentView,
    navigate
  }
}
```

```vue
<!-- Usage -->
<script setup>
import { useHashRouter } from '@/composables/useHashRouter'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const { currentView } = useHashRouter({
  '/': Home,
  '/about': About
}, NotFound)
</script>

<template>
  <component :is="currentView" />
</template>
```

## When to Use Simple Routing vs Vue Router

| Use Simple Hash Routing | Use Vue Router |
|------------------------|----------------|
| Learning/prototyping | Production apps |
| Very simple apps (2-3 pages) | Nested routes needed |
| No build step available | Navigation guards needed |
| Bundle size critical | Lazy loading needed |
| Static hosting only | History mode (clean URLs) |

## Key Points

1. **Always clean up event listeners** - Use onUnmounted or beforeUnmount
2. **Store handler reference** - Anonymous functions can't be removed
3. **Consider Vue Router for real apps** - It handles cleanup automatically
4. **Test unmount scenarios** - v-if toggling, hot module replacement
5. **Composables help encapsulate cleanup logic** - Reusable and automatic

## Reference
- [Vue.js Routing Documentation](https://vuejs.org/guide/scaling-up/routing.html)
- [Vue Router Official Library](https://router.vuejs.org/)
