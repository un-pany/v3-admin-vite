---
title: beforeRouteEnter Cannot Access Component Instance
impact: MEDIUM
impactDescription: The beforeRouteEnter guard runs before component creation, so 'this' is undefined; use the next callback to access the instance
type: gotcha
tags: [vue3, vue-router, navigation-guards, lifecycle, this]
---

# beforeRouteEnter Cannot Access Component Instance

**Impact: MEDIUM** - The `beforeRouteEnter` in-component navigation guard executes BEFORE the component is created, meaning you cannot access `this` or any component instance properties. This is the ONLY navigation guard that supports a callback in the `next()` function to access the component instance after navigation.

## Task Checklist

- [ ] Use next(vm => ...) callback to access component instance
- [ ] Or use composition API guards which have different patterns
- [ ] Move data fetching logic appropriately based on timing needs
- [ ] Consider using global guards for data that doesn't need component access

## The Problem

```javascript
// Options API - WRONG: this is undefined
export default {
  data() {
    return { user: null }
  },
  beforeRouteEnter(to, from, next) {
    // BUG: this is undefined here - component doesn't exist yet!
    this.user = await fetchUser(to.params.id)  // ERROR!
    next()
  }
}
```

## Solution: Use next() Callback (Options API)

```javascript
// Options API - CORRECT: Use callback to access vm
export default {
  data() {
    return {
      user: null,
      loading: true
    }
  },

  beforeRouteEnter(to, from, next) {
    // Fetch data before component exists
    fetchUser(to.params.id)
      .then(user => {
        // Pass callback to next() - receives component instance as 'vm'
        next(vm => {
          vm.user = user
          vm.loading = false
        })
      })
      .catch(error => {
        next(vm => {
          vm.error = error
          vm.loading = false
        })
      })
  }
}
```

## Solution: Async beforeRouteEnter (Options API)

```javascript
export default {
  data() {
    return { userData: null }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const user = await fetchUser(to.params.id)

      // Still need callback for component access
      next(vm => {
        vm.userData = user
      })
    } catch (error) {
      // Redirect on error
      next('/error')
    }
  }
}
```

## Composition API Alternative

In Composition API with `<script setup>`, you cannot use `beforeRouteEnter` directly because the component instance is being set up. Use different patterns instead:

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const user = ref(null)
const loading = ref(true)

// Option 1: Fetch in onMounted (after component exists)
onMounted(async () => {
  user.value = await fetchUser(route.params.id)
  loading.value = false
})

// Option 2: Handle subsequent param changes
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    loading.value = true
    user.value = await fetchUser(to.params.id)
    loading.value = false
  }
})
</script>
```

## Route-Level Data Fetching

For data that should load BEFORE navigation, use route-level guards:

```javascript
// router.js
const routes = [
  {
    path: '/users/:id',
    component: () => import('./UserProfile.vue'),
    beforeEnter: async (to, from) => {
      try {
        // Store data for component to access
        const user = await fetchUser(to.params.id)
        to.meta.user = user  // Attach to route meta
      } catch (error) {
        return '/error'
      }
    }
  }
]
```

```vue
<!-- UserProfile.vue -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
// Access pre-fetched data from meta
const user = route.meta.user
</script>
```

## Comparison of Navigation Guards

| Guard | Has `this`/component? | Can delay navigation? | Use case |
|-------|----------------------|----------------------|----------|
| beforeRouteEnter | NO (use next callback) | YES | Pre-fetch, redirect if data missing |
| beforeRouteUpdate | YES | YES | React to param changes |
| beforeRouteLeave | YES | YES | Unsaved changes warning |
| Global beforeEach | NO | YES | Auth checks |
| Route beforeEnter | NO | YES | Route-specific validation |

## Key Points

1. **beforeRouteEnter runs before component creation** - No access to `this`
2. **Use next(vm => ...) callback** - Only way to access component instance
3. **Composition API has limitations** - Use onMounted or global guards instead
4. **Consider route meta for pre-fetched data** - Clean separation of concerns
5. **beforeRouteUpdate and beforeRouteLeave have component access** - They run when component exists

## Reference
- [Vue Router In-Component Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards)
- [Vue Router Navigation Resolution Flow](https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow)
