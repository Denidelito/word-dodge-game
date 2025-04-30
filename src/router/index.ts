import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Game', component: () => import('../views/Game.vue') }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
