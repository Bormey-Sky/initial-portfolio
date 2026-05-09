import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/index.vue'
import NotebookList from '@/pages/notebook.vue'
import NotebookPage from '../pages/NotebookPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/notebooks',
    name: 'notebook-list',
    component: NotebookList,
  },
  {
    path: '/digital-notebooks/:id',          // 👈 dynamic route for each notebook
    name: 'notebook-detail',
    component: NotebookPage,
  },

  // ⚠️ keep any 404 route LAST
  // { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

console.log("ROUTES:", routes)

