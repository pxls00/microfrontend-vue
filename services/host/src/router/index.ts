import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
//@ts-ignore
import {shopRoutes} from 'shop/router'
//@ts-ignore
import {adminRoutes} from 'admin/router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/main.vue')
  },
    ...shopRoutes,
    ...adminRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router