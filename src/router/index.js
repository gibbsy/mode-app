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
      component: Home,
      children: [
        {
          path: '/project/:slug',
          component: Project
        }
      ]
    }
  ]
})
