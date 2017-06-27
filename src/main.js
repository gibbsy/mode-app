import 'es6-promise/auto';
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';

import router from './router';
import store from './store/store';

//Vue.config.productionTip = false

Vue.use(VueResource);

Vue.http.options.root = 'http://52.56.200.30/modewp/wp-json/wp/v2/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
