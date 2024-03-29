import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/tablero/:id',
      name: 'tablero',
      props:true,
      component: () => import('../views/TableroView.vue')
    },
  ]
})

export default router

