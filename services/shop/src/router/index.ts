import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const shopRoutes: RouteRecordRaw[] = [
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/pages/shopPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: shopRoutes,
})

export default router