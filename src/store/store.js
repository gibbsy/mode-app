import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main';
import responsive from './modules/responsive';
import scroll from './modules/scroll';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    responsive,
    scroll
  }
});