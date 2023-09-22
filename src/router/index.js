import { createRouter, createWebHistory } from 'vue-router'
import HousesList from '../views/Houses/HousesList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'houses' }
    },
    {
      path: '/',
      name: 'houses',
      component: HousesList
    },
    {
      path: '/houses/:id',
      name: 'housesDetail',
      component: () => import('../views/Houses/HousesDetail.vue')
    },
    {
      path: '/houses/edit/:id',
      name: 'housesEdit',
      component: () => import('../views/Houses/HousesEdit.vue')
    },
    {
      path: '/houses/create',
      name: 'housesCreate',
      component: () => import('../views/Houses/HousesCreate.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
