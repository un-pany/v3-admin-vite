---
title: Per-Route beforeEnter Guards Ignore Param/Query Changes
impact: MEDIUM
impactDescription: Route-level beforeEnter guards don't fire when only params, query, or hash change, causing unexpected bypasses of validation logic
type: gotcha
tags: [vue3, vue-router, navigation-guards, params, query]
---

# Per-Route beforeEnter Guards Ignore Param/Query Changes

**Impact: MEDIUM** - The `beforeEnter` guard defined in route configuration only triggers when entering a route from a DIFFERENT route. Changes to params, query strings, or hash within the same route do NOT trigger `beforeEnter`, potentially bypassing important validation logic.

## Task Checklist

- [ ] Use in-component `onBeforeRouteUpdate` for param/query changes
- [ ] Or use global `beforeEach` with route.params/query checks
- [ ] Document which guards protect which scenarios
- [ ] Test navigation between same route with different params

## The Problem

```javascript
// router.js
const routes = [
  {
    path: '/orders/:id',
    component: OrderDetail,
    beforeEnter: async (to, from) => {
      // This runs when entering from /products
      // But NOT when navigating from /orders/1 to /orders/2!
      const order = await checkOrderAccess(to.params.id)
      if (!order.canView) {
        return '/unauthorized'
      }
    }
  }
]
```

**Scenario:**
1. User navigates from `/products` to `/orders/1` - beforeEnter runs, access checked
2. User navigates from `/orders/1` to `/orders/2` - beforeEnter DOES NOT run!
3. User might access order they don't have permission for!

## What Triggers beforeEnter vs. What Doesn't

| Navigation | beforeEnter fires? |
|------------|-------------------|
| `/products` → `/orders/1` | YES |
| `/orders/1` → `/orders/2` | NO |
| `/orders/1` → `/orders/1?tab=details` | NO |
| `/orders/1#section` → `/orders/1#other` | NO |
| `/orders/1` → `/products` → `/orders/2` | YES (leaving and re-entering) |

## Solution 1: Add In-Component Guard

```vue
<!-- OrderDetail.vue -->
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'

// Handle param changes within the same route
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    const order = await checkOrderAccess(to.params.id)
    if (!order.canView) {
      return '/unauthorized'
    }
  }
})
</script>
```

## Solution 2: Use Global beforeEach Instead

```javascript
// router.js
router.beforeEach(async (to, from) => {
  // Handle all order access checks globally
  if (to.name === 'OrderDetail') {
    // This runs on EVERY navigation to this route, including param changes
    const order = await checkOrderAccess(to.params.id)
    if (!order.canView) {
      return '/unauthorized'
    }
  }
})
```

## Solution 3: Combine Both Guards

```javascript
// router.js - For entering from different route
const routes = [
  {
    path: '/orders/:id',
    component: OrderDetail,
    beforeEnter: (to) => validateOrderAccess(to.params.id)
  }
]

// In component - For param changes within route
// OrderDetail.vue
onBeforeRouteUpdate((to) => validateOrderAccess(to.params.id))

// Shared validation function
async function validateOrderAccess(orderId) {
  const order = await checkOrderAccess(orderId)
  if (!order.canView) {
    return '/unauthorized'
  }
}
```

## Solution 4: Use beforeEnter with Array of Guards

```javascript
// guards/orderGuards.js
export const orderAccessGuard = async (to) => {
  const order = await checkOrderAccess(to.params.id)
  if (!order.canView) {
    return '/unauthorized'
  }
}

// router.js
const routes = [
  {
    path: '/orders/:id',
    component: OrderDetail,
    beforeEnter: [orderAccessGuard]  // Can add multiple guards
  }
]

// Still need in-component guard for param changes!
```

## Full Navigation Guard Execution Order

Understanding when each guard type fires:

```
1. beforeRouteLeave (in-component, leaving component)
2. beforeEach (global)
3. beforeEnter (per-route, ONLY when entering from different route)
4. beforeRouteEnter (in-component, entering component)
5. beforeResolve (global)
6. afterEach (global, after navigation confirmed)

For param/query changes on same route:
1. beforeRouteUpdate (in-component) - ONLY this fires!
2. beforeEach (global)
3. beforeResolve (global)
4. afterEach (global)
```

## Key Points

1. **beforeEnter is for route ENTRY only** - Not for within-route changes
2. **Use onBeforeRouteUpdate for param changes** - This is the in-component solution
3. **Global beforeEach always runs** - Good for centralized validation
4. **Test param change scenarios** - Easy to miss during development
5. **Consider security implications** - Param-based access control needs both guards

## Reference
- [Vue Router Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Vue Router Per-Route Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard)
