import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About'
import Post from './views/Post'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts/:postId',
      name: 'posts',
      component: Post
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

Vue.use(VueAnalytics, {
  id: 'UA-143023853-1',
  router,
  autoTracking: {
    screenview: true
  }
})

export default router
