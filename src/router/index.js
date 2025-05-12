import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import BookView from '@/views/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { guestOnly: true },
    },
    {
      path: '/book/:bookData',
      name: 'BookView',
      component: BookView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/CartView.vue'),
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/library',
      name: 'Library',
      component: () => import('@/views/LibraryView.vue'),
    },
    {
      path: '/SellerDash',
      name: 'SellerDash',
      component: () => import('@/views/SellerDashView.vue'),
    },
  ],
})

// 🔥 Navigation Guard for Authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // Convert to boolean

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn('Not authenticated, redirecting to login...')
    next('/login') // Redirect unauthenticated users to login
  } else if (to.meta.guestOnly && isAuthenticated) {
    console.warn('Already logged in, redirecting to home...')
    next('/') // Redirect logged-in users away from login/register
  } else {
    next() // Allow access
  }
})
export default router
