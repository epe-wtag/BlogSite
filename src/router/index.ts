import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogPage from '@/views/BlogPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import BlogEdit from '@/views/BlogEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/blog/:blog_id',
      name: 'BlogPage',
      component: BlogPage,
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/blog-edit/:blog_id',
      name: 'BlogEdit',
      component: BlogEdit
    }
  ]
})

export default router
