import Vue from 'vue'
import Router from 'vue-router'
import PostPage from "@/views/Post.vue";
import AboutPage from "@/views/About.vue";
import HomePage from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
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
      component: HomePage
    },
    {
      path: '/posts/:postId',
      name: 'posts',
      component: PostPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    }
  ]
})