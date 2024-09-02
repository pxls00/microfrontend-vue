import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/aboutPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
})

export default router