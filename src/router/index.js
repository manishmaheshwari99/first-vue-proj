import { createRouter, createWebHistory } from 'vue-router'

import UserList from '../components/UserList.vue';
import About from '../components/About.vue';

const routes = [
  {path: '', name: 'Home', component: UserList},
  {path: '/about', name: 'About', component: About}
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router