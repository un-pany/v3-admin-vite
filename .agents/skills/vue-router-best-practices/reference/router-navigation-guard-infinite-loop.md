---
title: Navigation Guard Infinite Redirect Loops
impact: HIGH
impactDescription: Misconfigured navigation guards can trap users in infinite redirect loops, crashing the browser or making the app unusable
type: gotcha
tags: [vue3, vue-router, navigation-guards, redirect, debugging]
---

# Navigation Guard Infinite Redirect Loops

**Impact: HIGH** - A common mistake in navigation guards is creating conditions that cause infinite redirects. Vue Router will detect this and show a warning, but in production, it can crash the browser or create a broken user experience.

## Task Checklist

- [ ] Always check if already on target route before redirecting
- [ ] Test guard logic with all possible navigation scenarios
- [ ] Add route meta to control which routes need protection
- [ ] Use Vue Router devtools to debug redirect chains

## The Problem

```javascript
// WRONG: Infinite loop - always redirects to login, even when on login!
router.beforeEach((to, from) => {
  if (!isAuthenticated()) {
    return '/login'  // Redirects to /login, which triggers guard again...
  }
})

// WRONG: Circular redirect between two routes
router.beforeEach((to, from) => {
  if (to.path === '/dashboard' && !hasProfile()) {
    return '/profile'
  }
  if (to.path === '/profile' && !isVerified()) {
    return '/dashboard'  // Back to dashboard, which goes to profile...
  }
})
```

**Error you'll see:**
```
[Vue Router warn]: Detected an infinite redirection in a navigation guard when going from "/" to "/login". Aborting to avoid a Stack Overflow.
```

## Solution 1: Exclude Target Route

```javascript
// CORRECT: Don't redirect if already going to login
router.beforeEach((to, from) => {
  if (!isAuthenticated() && to.path !== '/login') {
    return '/login'
  }
})

// CORRECT: Use route name for cleaner check
router.beforeEach((to, from) => {
  const publicPages = ['Login', 'Register', 'ForgotPassword']

  if (!isAuthenticated() && !publicPages.includes(to.name)) {
    return { name: 'Login' }
  }
})
```

## Solution 2: Use Route Meta Fields

```javascript
// router.js
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/public',
    name: 'PublicPage',
    component: PublicPage,
    meta: { requiresAuth: false }
  }
]

// Guard checks meta field
router.beforeEach((to, from) => {
  // Only redirect if route requires auth
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})
```

## Solution 3: Handle Redirect Chains Carefully

```javascript
// CORRECT: Break potential circular redirects
router.beforeEach((to, from) => {
  // Prevent redirect loops by tracking redirect depth
  const redirectCount = to.query._redirectCount || 0

  if (redirectCount > 3) {
    console.error('Too many redirects, stopping at:', to.path)
    return '/error'  // Escape hatch
  }

  if (needsRedirect(to)) {
    return {
      path: getRedirectTarget(to),
      query: { ...to.query, _redirectCount: redirectCount + 1 }
    }
  }
})
```

## Solution 4: Centralized Redirect Logic

```javascript
// guards/auth.js
export function createAuthGuard(router) {
  const publicRoutes = new Set(['Login', 'Register', 'ForgotPassword', 'ResetPassword'])
  const guestOnlyRoutes = new Set(['Login', 'Register'])

  router.beforeEach((to, from) => {
    const isPublic = publicRoutes.has(to.name)
    const isGuestOnly = guestOnlyRoutes.has(to.name)
    const isLoggedIn = isAuthenticated()

    // Not logged in, trying to access protected route
    if (!isLoggedIn && !isPublic) {
      return { name: 'Login', query: { redirect: to.fullPath } }
    }

    // Logged in, trying to access guest-only route (like login page)
    if (isLoggedIn && isGuestOnly) {
      return { name: 'Dashboard' }
    }

    // All other cases: proceed
  })
}
```

## Debugging Redirect Loops

```javascript
// Add logging to understand the redirect chain
router.beforeEach((to, from) => {
  console.log(`Navigation: ${from.path} -> ${to.path}`)
  console.log('Auth state:', isAuthenticated())
  console.log('Route meta:', to.meta)

  // Your guard logic here
})

// Or use afterEach for confirmed navigations
router.afterEach((to, from) => {
  console.log(`Navigated: ${from.path} -> ${to.path}`)
})
```

## Common Redirect Loop Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| Auth check without exclusion | Login redirects to login | Exclude `/login` from check |
| Role-based with circular deps | Admin -> User -> Admin | Use single source of truth for role requirements |
| Onboarding flow | Step 1 -> Step 2 -> Step 1 | Track completion state properly |
| Redirect query handling | Reading redirect creates new redirect | Process redirect only once |

## Key Points

1. **Always exclude the target route** - Never redirect to a route that would trigger the same redirect
2. **Use route meta fields** - Cleaner than path string comparisons
3. **Test edge cases** - Direct URL access, refresh, back button
4. **Add logging during development** - Helps trace redirect chains
5. **Have an escape hatch** - Error page or max redirect count

## Reference
- [Vue Router Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Vue Router Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)
