import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Info from '@/components/Info';
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
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
