import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),//哈希模式
    routes: [
        {
            path: '/',
            component: () => import('../views/Index.vue'),
        },
        {
            path: '/add',
            component: () => import('../views/AddUser.vue'),
        },
        {
            path: '/up',
            component: () => import('../views/UpUser.vue'),
        }
    ]
})