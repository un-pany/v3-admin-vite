---
name: v3-upsert-route
description: Create or update route entries in the v3-admin-vite project. Use when the user wants to add a new page/route, modify route configuration, change route permissions, update route icons, or manage the routing structure in this Vue3 + Element Plus admin template.
---

# v3-upsert-route

Create or update route entries in the v3-admin-vite project.

## When to Use

Use this skill when:
- User wants to add a new page or route
- User wants to create a menu entry in the sidebar
- User wants to modify existing route configuration (title, icon, permissions)
- User wants to delete or remove a route
- User wants to change route permissions (roles)
- User wants to enable/disable route caching (keepAlive)
- User wants to show/hide a route from sidebar

Do NOT use this skill when:
- User is asking about route configuration without wanting to change it
- User wants to modify Vue Router core configuration (history mode, base path)
- User wants to change the layout component structure

## Input

```typescript
interface RouteInput {
  path: string              // Route path, e.g., "/school/list"
  title: string             // Menu title (Chinese), e.g., "学校管理"
  routeType: "constant" | "dynamic"  // constantRoutes or dynamicRoutes
  roles?: string[]          // Required roles (only for dynamic), e.g., ["admin"]
  children?: RouteInput[]   // Child routes (for nested routes)
  icon?: string             // Icon name (elIcon or svgIcon)
  iconType?: "elIcon" | "svgIcon"  // Icon type
  hidden?: boolean          // Hide from sidebar
  keepAlive?: boolean       // Enable component caching
}
```

## Output

```typescript
interface RouteOutput {
  success: boolean
  filesCreated: string[]    // List of created page component files
  routeConfig: object       // The route configuration added to router/index.ts
  warnings?: string[]       // Validation warnings
}
```

## Steps

### Step 1: Gather Requirements

Ask the user for these details if not provided:

1. **Route path**: Where should the route be accessible? (e.g., `/school/list`)
2. **Page title**: What is the Chinese menu title? (e.g., `学校管理`)
3. **Route type**:
   - **Public route** (constantRoutes): Accessible by all logged-in users
   - **Permission route** (dynamicRoutes) ⭐ Recommended: Requires role-based access control
4. **Roles** (for permission routes): Which roles can access? (e.g., `["admin"]`)
5. **Children count**:
   - Single page: Icon goes on `children[0].meta`
   - Multiple pages: Icon goes on parent `meta` with `alwaysShow: true`
6. **Icon**: Which icon to use? (Element Plus icon name or SVG icon name)

### Step 2: Create Page Components

Create Vue components at `src/pages/{module}/{page}/index.vue`:

**Template for single page:**

```vue
<script setup lang="ts">
defineOptions({
  name: "PageName"
})
</script>

<template>
  <div class="page-name">
    <!-- Page content here -->
  </div>
</template>

<style scoped lang="scss">
.page-name {
  padding: 20px;
}
</style>
```

### Step 3: Update Router Configuration

Add route to `src/router/index.ts`:

**For public routes (single child):**

```typescript
{
  path: "/example",
  component: Layouts,
  name: "Example",
  meta: { title: "示例" },
  children: [
    {
      path: "",
      component: () => import("@/pages/example/index.vue"),
      name: "ExampleIndex",
      meta: {
        title: "示例",
        elIcon: "Document"
      }
    }
  ]
}
```

**For permission routes (multiple children):**

```typescript
{
  path: "/example",
  component: Layouts,
  redirect: "/example/page1",
  name: "Example",
  meta: {
    title: "示例",
    elIcon: "Document",
    roles: ["admin"],
    alwaysShow: true
  },
  children: [
    {
      path: "page1",
      component: () => import("@/pages/example/page1/index.vue"),
      name: "ExamplePage1",
      meta: { title: "页面1" }
    },
    {
      path: "page2",
      component: () => import("@/pages/example/page2/index.vue"),
      name: "ExamplePage2",
      meta: { title: "页面2" }
    }
  ]
}
```

### Step 4: Verify Configuration

Run validation checks:

```bash
# TypeScript type check
npx vue-tsc --noEmit

# ESLint check
npx eslint src/router/index.ts
```

Check for:
- [ ] Route `name` is unique
- [ ] `roles` is an array (not a string)
- [ ] Children paths are relative (no leading `/`)
- [ ] Icon placement follows the rules (single vs multiple children)
- [ ] Multiple children have `alwaysShow: true`

### Step 5: Post-Creation Checklist (Permission Routes Only)

If this is a permission route, remind the user to:

- [ ] Verify the `roles` array is correct (e.g., `["admin"]` not `"admin"`)
- [ ] Check if parent and child routes have consistent permission settings
- [ ] Test the route with different user roles

## Icon Placement Rules

| Children Count | Icon Location | Additional Config |
|----------------|---------------|-------------------|
| Single | `children[0].meta` | None |
| Multiple | Parent `meta` | `alwaysShow: true` |

## Meta Fields Reference

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Menu title (Chinese) |
| `hidden` | boolean | Hide from sidebar menu |
| `elIcon` | string | Element Plus icon name |
| `svgIcon` | string | SVG icon name from `src/common/assets/icons/` |
| `roles` | string[] | Required roles (dynamic routes only) |
| `keepAlive` | boolean | Enable component caching |
| `affix` | boolean | Pin to tags view |
| `alwaysShow` | boolean | Always show in sidebar even with one child |

## Examples

### Example 1: Single Page (Public Route)

**User request:** "Add a help center page, all users can access"

**Execution:**

1. Create `src/pages/help/index.vue`
2. Add to `constantRoutes`:
```typescript
{
  path: "/help",
  component: Layouts,
  name: "Help",
  meta: { title: "帮助中心" },
  children: [
    {
      path: "",
      component: () => import("@/pages/help/index.vue"),
      name: "HelpIndex",
      meta: {
        title: "帮助中心",
        elIcon: "QuestionFilled"
      }
    }
  ]
}
```

### Example 2: Multiple Pages (Permission Route)

**User request:** "Add school management with school list, grade management, and class management. Admin only."

**Execution:**

1. Create pages:
   - `src/pages/school/list/index.vue`
   - `src/pages/school/grade/index.vue`
   - `src/pages/school/class/index.vue`

2. Add to `dynamicRoutes`:
```typescript
{
  path: "/school",
  component: Layouts,
  redirect: "/school/list",
  name: "School",
  meta: {
    title: "学校管理",
    elIcon: "School",
    roles: ["admin"],
    alwaysShow: true
  },
  children: [
    {
      path: "list",
      component: () => import("@/pages/school/list/index.vue"),
      name: "SchoolList",
      meta: { title: "学校列表" }
    },
    {
      path: "grade",
      component: () => import("@/pages/school/grade/index.vue"),
      name: "SchoolGrade",
      meta: { title: "年级管理" }
    },
    {
      path: "class",
      component: () => import("@/pages/school/class/index.vue"),
      name: "SchoolClass",
      meta: { title: "班级管理" }
    }
  ]
}
```

## On Failure

| Failure Scenario | Handling |
|-----------------|----------|
| Duplicate route name | Prompt user to choose a different name |
| Invalid roles format | Show error: "roles must be an array, e.g., ['admin']" |
| Missing Layouts import | Add `const Layouts = () => import("@/layouts/index.vue")` |
| TypeScript errors | Show specific error messages and suggest fixes |
| ESLint errors | Show lint errors and suggest formatting fixes |
