import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import FortuneCategories from '../views/FortuneCategories.vue'
import SubmitFortune from '../views/SubmitFortune.vue'
import Dashboard from '../views/Dashboard.vue'
import Subscription from '../views/Subscription.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/categories',
      name: 'categories',
      component: FortuneCategories
    },
    {
      path: '/submit/:category',
      name: 'submit',
      component: SubmitFortune,
      props: true
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: Subscription,
      meta: { requiresAuth: true }
    }
  ]
})

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router 