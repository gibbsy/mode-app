import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Project from '@/components/Projects/Project';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/project/:slug',
      name: 'Project',
      component: Project
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
