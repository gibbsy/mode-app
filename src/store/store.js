import Vue from 'vue';
import Vuex from 'vuex';

import projects from './modules/projects';
import responsive from './modules/responsive';
import scroll from './modules/scroll';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    responsive,
    scroll
  }
});