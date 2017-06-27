import Vue from 'vue';
import Router from 'vue-router';
import Projects from '@/components/Projects/Projects';
import Project from '@/components/Projects/Project';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: Projects,
      children: [
        {
          path: '/project/:slug',
          component: Project
        }
      ]
    }
  ]
})
