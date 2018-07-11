// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { makeFunctionsService } from './services/functions';
const functions = makeFunctionsService();

Vue.use(Vuetify);

Vue.config.productionTip = false;

Vue.filter('limit', (val, count) => {
  if (!val) {
    return '';
  }

  const v = val.toString();
  return v.toUpperCase().substring(0, count);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  functions
});
