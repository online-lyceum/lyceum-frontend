import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/schools/:school_id',
    name: 'Выбор класса',
    component: () => import('@/views/SchoolView.vue')
  },
  {
    path: '/home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
