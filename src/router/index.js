import { createRouter, createWebHistory } from 'vue-router'
import Countries from "@/components/Countries.vue";
import Companies from "@/components/Companies.vue";
import Leaders from "@/components/Leaders.vue";

const routes = [
  {
    path: '/',
    component: Countries
  },
  {
    path: '/companies',
    component: Companies
  },
  {
    path: '/leaders',
    component: Leaders
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
