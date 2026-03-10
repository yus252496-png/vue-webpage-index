import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/Analytics.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/content/:type',
    name: 'ContentList',
    component: () => import('../views/ContentList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('../views/Roles.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/info',
    name: 'UserInfo',
    component: () => import('../views/UserInfo.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/stock-analysis',
    name: 'StockAnalysis',
    component: () => import('../views/StockAnalysis.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ai-code-generator',
    name: 'AICodeGenerator',
    component: () => import('../views/AICodeGenerator.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫（使用 localStorage token，与 store initAuth 保持一致）
router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  } else if (to.path === '/login' && isAuthenticated) {
    return '/dashboard'
  } else {
    return true
  }
})

export default router
