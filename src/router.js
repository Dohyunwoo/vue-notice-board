import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/routes/index'
import Edit from '@/routes/edit'
import Write from '@/routes/write'
import Read from '@/routes/read'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/write',
    name: 'write',
    component: Write
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit
  },
  {
    path: '/read/:id',
    name: 'read',
    component: Read
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
