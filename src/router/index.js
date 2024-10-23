import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomePage.vue';
import Register from '../views/RegisterPage.vue';
import Login from '../views/LoginPage.vue';
import Chat from '../views/ChatPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/chat', name: 'Chat', component: Chat },
  ]
})

export default router
