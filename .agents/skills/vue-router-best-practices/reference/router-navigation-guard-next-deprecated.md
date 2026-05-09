---
title: Vue Router Navigation Guard next() Function Deprecated
impact: HIGH
impactDescription: Using the deprecated next() function incorrectly causes navigation to hang, infinite loops, or silent failures
type: gotcha
tags: [vue3, vue-router, navigation-guards, migration, async]
---

# Vue Router Navigation Guard next() Function Deprecated

**Impact: HIGH** - The third `next()` argument in navigation guards is deprecated in Vue Router 4. While still supported for backward compatibility, using it incorrectly is one of the most common sources of bugs: calling it multiple times, forgetting to call it, or calling it conditionally without proper logic.

## Task Checklist

- [ ] Refactor guards to use return-based syntax instead of next()
- [ ] Remove all next() calls from navigation guards
- [ ] Use async/await pattern for asynchronous checks
- [ ] Return false to cancel, return route to redirect, return nothing to proceed

## The Problem

```javascript
// WRONG: Using deprecated next() function
router.beforeEach((to, from, next) => {
  if (!isAuthenticated) {
    next('/login')  // Easy to forget this call
  }
  // BUG: next() not called when authenticated - navigation hangs!
})

// WRONG: Multiple next() calls
router.beforeEach((to, from, next) => {
  if (!isAuthenticated) {
    next('/login')
  }
  next()  // BUG: Called twice when not authenticated!
})

// WRONG: next() in async code without proper handling
router.beforeEach(async (to, from, next) => {
  const user = await fetchUser()
  if (!user) {
    next('/login')
  }
  next()  // Still gets called even after redirect!
})
```

## Solution: Use Return-Based Guards

```javascript
// CORRECT: Return-based syntax (modern Vue Router 4+)
router.beforeEach((to, from) => {
  if (!isAuthenticated) {
    return '/login'  // Redirect
  }
  // Return nothing (undefined) to proceed
})

// CORRECT: Return false to cancel navigation
router.beforeEach((to, from) => {
  if (hasUnsavedChanges) {
    return false  // Cancel navigation
  }
})

// CORRECT: Async with return-based syntax
router.beforeEach(async (to, from) => {
  const user = await fetchUser()
  if (!user) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  // Proceed with navigation
})
```

## Return Values Explained

```javascript
router.beforeEach((to, from) => {
  // Return nothing/undefined - allow navigation
  return

  // Return false - cancel navigation, stay on current route
  return false

  // Return string path - redirect to path
  return '/login'

  // Return route object - redirect with full control
  return { name: 'Login', query: { redirect: to.fullPath } }

  // Return Error - cancel and trigger router.onError()
  return new Error('Navigation cancelled')
})
```

## If You Must Use next() (Legacy Code)

If maintaining legacy code that uses `next()`, follow these rules strictly:

```javascript
// CORRECT: Exactly one next() call per code path
router.beforeEach((to, from, next) => {
  if (!isAuthenticated) {
    next('/login')
    return  // CRITICAL: Exit after calling next()
  }

  if (!hasPermission(to)) {
    next('/forbidden')
    return  // CRITICAL: Exit after calling next()
  }

  next()  // Only reached if all checks pass
})
```

## Error Handling Pattern

```javascript
router.beforeEach(async (to, from) => {
  try {
    await validateAccess(to)
    // Proceed
  } catch (error) {
    if (error.status === 401) {
      return '/login'
    }
    if (error.status === 403) {
      return '/forbidden'
    }
    // Log error and proceed anyway (or return false)
    console.error('Access validation failed:', error)
    return false
  }
})
```

## Key Points

1. **Prefer return-based syntax** - Cleaner, less error-prone, modern standard
2. **next() must be called exactly once** - If using legacy syntax, ensure single call per path
3. **Always return/exit after redirect** - Prevent multiple navigation actions
4. **Async guards work naturally** - Just return the redirect route or nothing
5. **Test all code paths** - Each branch must result in either return or next()

## Reference
- [Vue Router Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [RFC: Remove next() from Navigation Guards](https://github.com/vuejs/rfcs/discussions/302)
