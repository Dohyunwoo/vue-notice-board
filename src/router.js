import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/routes/index'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
