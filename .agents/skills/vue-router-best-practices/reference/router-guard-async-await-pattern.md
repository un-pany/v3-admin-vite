---
title: Async Navigation Guards Require Proper Promise Handling
impact: MEDIUM
impactDescription: Unawaited promises in guards cause navigation to complete before async checks finish, allowing unauthorized access or missing data
type: gotcha
tags: [vue3, vue-router, navigation-guards, async, promises]
---

# Async Navigation Guards Require Proper Promise Handling

**Impact: MEDIUM** - Navigation guards that perform async operations (API calls, auth checks) must properly handle promises. If you don't await async operations or return the promise, navigation completes before your check finishes, potentially allowing unauthorized access or navigating with incomplete data.

## Task Checklist

- [ ] Use async/await in navigation guards
- [ ] Return the promise if not using async/await
- [ ] Add loading states for long async operations
- [ ] Implement timeouts for slow API calls
- [ ] Handle errors to prevent navigation hanging

## The Problem

```javascript
// WRONG: Not awaiting - navigation proceeds immediately
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    checkAuth()  // This returns a Promise but we're not waiting!
    // Navigation continues before checkAuth completes
  }
})

// WRONG: Async function but forgot return
router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const isValid = await checkAuth()
    if (!isValid) {
      // This redirect might happen after navigation already completed!
      return '/login'
    }
  }
  // Missing return - implicitly returns undefined, allowing navigation
})
```

## Solution: Proper Async/Await Pattern

```javascript
// CORRECT: Async function with proper returns
router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    try {
      const isAuthenticated = await checkAuth()

      if (!isAuthenticated) {
        return { name: 'Login', query: { redirect: to.fullPath } }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      return { name: 'Error', params: { message: 'Authentication failed' } }
    }
  }
  // Explicitly return nothing to proceed
  return true
})
```

## Solution: Promise-Based Pattern (Alternative)

```javascript
// CORRECT: Return promise explicitly
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    return checkAuth()
      .then(isAuthenticated => {
        if (!isAuthenticated) {
          return { name: 'Login' }
        }
      })
      .catch(error => {
        console.error('Auth check failed:', error)
        return { name: 'Error' }
      })
  }
})
```

## Loading State During Async Guards

```javascript
// app/composables/useNavigationLoading.js
import { ref } from 'vue'

const isNavigating = ref(false)

export function useNavigationLoading() {
  return { isNavigating }
}

export function setupNavigationLoading(router) {
  router.beforeEach(() => {
    isNavigating.value = true
  })

  router.afterEach(() => {
    isNavigating.value = false
  })

  router.onError(() => {
    isNavigating.value = false
  })
}
```

```vue
<!-- App.vue -->
<script setup>
import { useNavigationLoading } from '@/composables/useNavigationLoading'

const { isNavigating } = useNavigationLoading()
</script>

<template>
  <LoadingBar v-if="isNavigating" />
  <router-view />
</template>
```

## Timeout Pattern for Slow APIs

```javascript
// CORRECT: Add timeout to prevent indefinite waiting
function withTimeout(promise, ms = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), ms)
    )
  ])
}

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    try {
      const isValid = await withTimeout(checkAuth(), 5000)
      if (!isValid) {
        return '/login'
      }
    } catch (error) {
      if (error.message === 'Request timeout') {
        // Let user through but show warning
        console.warn('Auth check timed out')
      } else {
        return '/login'
      }
    }
  }
})
```

## Multiple Async Checks

```javascript
// CORRECT: Run independent checks in parallel
router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth && to.meta.requiresSubscription) {
    try {
      const [isAuthenticated, hasSubscription] = await Promise.all([
        checkAuth(),
        checkSubscription()
      ])

      if (!isAuthenticated) {
        return '/login'
      }

      if (!hasSubscription) {
        return '/subscribe'
      }
    } catch (error) {
      return '/error'
    }
  }
})
```

## Error Handling Best Practices

```javascript
router.beforeEach(async (to, from) => {
  try {
    // Your async logic here
    await performChecks(to)
  } catch (error) {
    // Always handle errors to prevent navigation from hanging

    if (error.response?.status === 401) {
      return '/login'
    }

    if (error.response?.status === 403) {
      return '/forbidden'
    }

    if (error.code === 'NETWORK_ERROR') {
      // Offline - maybe allow navigation but show warning
      return true
    }

    // Unknown error - redirect to error page
    console.error('Navigation guard error:', error)
    return { name: 'Error', state: { error: error.message } }
  }
})
```

## Key Points

1. **Always await async operations** - Otherwise navigation proceeds immediately
2. **Return values matter** - Return route to redirect, false to cancel, true/undefined to proceed
3. **Handle all error cases** - Uncaught errors can hang navigation
4. **Add timeouts** - Slow APIs shouldn't block navigation indefinitely
5. **Show loading state** - Users need feedback during async checks
6. **Parallelize independent checks** - Use Promise.all for better performance

## Reference
- [Vue Router Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Vue Router Navigation Failures](https://router.vuejs.org/guide/advanced/navigation-failures.html)
