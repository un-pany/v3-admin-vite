---
title: Route Param Changes Do Not Trigger Lifecycle Hooks
impact: HIGH
impactDescription: Navigating between routes with different params reuses the component instance, skipping created/mounted hooks and leaving stale data
type: gotcha
tags: [vue3, vue-router, lifecycle, params, reactivity]
---

# Route Param Changes Do Not Trigger Lifecycle Hooks

**Impact: HIGH** - When navigating between routes that use the same component (e.g., `/users/1` to `/users/2`), Vue Router reuses the existing component instance for performance. This means `onMounted`, `created`, and other lifecycle hooks do NOT fire, leaving you with stale data from the previous route.

## Task Checklist

- [ ] Use `watch` on route params for data fetching
- [ ] Or use `onBeforeRouteUpdate` in-component guard
- [ ] Or use `:key="route.params.id"` to force re-creation (less efficient)
- [ ] Never rely solely on `onMounted` for route-param-dependent data

## The Problem

```vue
<!-- UserProfile.vue - Used for /users/:id -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(null)

// BUG: Only runs once when component first mounts!
// Navigating from /users/1 to /users/2 does NOT trigger this
onMounted(async () => {
  user.value = await fetchUser(route.params.id)
})
</script>

<template>
  <div>
    <!-- Still shows User 1 data when navigating to /users/2! -->
    <h1>{{ user?.name }}</h1>
  </div>
</template>
```

**Scenario:**
1. Visit `/users/1` - Component mounts, fetches User 1 data
2. Navigate to `/users/2` - Component is REUSED, onMounted doesn't run
3. UI still shows User 1's data!

## Solution 1: Watch Route Params (Recommended)

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(null)
const loading = ref(false)

// Watch for param changes - handles both initial load and navigation
watch(
  () => route.params.id,
  async (newId) => {
    loading.value = true
    user.value = await fetchUser(newId)
    loading.value = false
  },
  { immediate: true }  // Run immediately for initial load
)
</script>
```

## Solution 2: Use onBeforeRouteUpdate Guard

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const user = ref(null)

async function loadUser(id) {
  user.value = await fetchUser(id)
}

// Initial load
onMounted(() => loadUser(route.params.id))

// Handle param changes within same route
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await loadUser(to.params.id)
  }
})
</script>
```

## Solution 3: Force Component Re-creation with Key

```vue
<!-- App.vue or parent component -->
<template>
  <router-view :key="$route.fullPath" />
</template>
```

**Tradeoffs:**
- Simple but less performant
- Destroys and recreates component on every param change
- Loses component state
- Use only when component state should reset completely

## Solution 4: Composable for Route-Reactive Data

```javascript
// composables/useRouteData.js
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteData(paramName, fetcher) {
  const route = useRoute()
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  watch(
    () => route.params[paramName],
    async (id) => {
      if (!id) return

      loading.value = true
      error.value = null

      try {
        data.value = await fetcher(id)
      } catch (e) {
        error.value = e
      } finally {
        loading.value = false
      }
    },
    { immediate: true }
  )

  return { data, loading, error }
}
```

```vue
<!-- Usage in component -->
<script setup>
import { useRouteData } from '@/composables/useRouteData'
import { fetchUser } from '@/api/users'

const { data: user, loading, error } = useRouteData('id', fetchUser)
</script>
```

## What Triggers vs. What Doesn't

| Navigation Type | Lifecycle Hooks | beforeRouteUpdate | Watch on params |
|----------------|-----------------|-------------------|-----------------|
| `/users/1` to `/posts/1` | YES | NO | YES |
| `/users/1` to `/users/2` | NO | YES | YES |
| `/users/1?tab=a` to `/users/1?tab=b` | NO | YES | NO (different watch) |
| `/users/1` to `/users/1` (same) | NO | NO | NO |

## Key Points

1. **Same route, different params = same component instance** - This is a performance optimization
2. **Lifecycle hooks only fire once** - When component first mounts
3. **Use `watch` with `immediate: true`** - Covers both initial load and updates
4. **`onBeforeRouteUpdate` is navigation-aware** - Good for data that must load before view updates
5. **`:key="route.fullPath"` is a sledgehammer** - Use only when necessary

## Reference
- [Vue Router Dynamic Route Matching](https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes)
- [Vue School: Reacting to Param Changes](https://vueschool.io/lessons/reacting-to-param-changes)
