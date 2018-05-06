// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import {
  MdApp,
  MdDrawer,
  MdToolbar,
  MdList,
  MdField,
  MdRadio,
  MdIcon,
  MdDialog,
  MdDialogConfirm,
  MdButton,
  MdContent,
  MdTabs,
  MdCard,
  MdDivider,
  MdTooltip,
  MdSnackbar
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import { makeFunctionsService } from './services/functions';
const functions = makeFunctionsService();

// Vue.use(VueMaterial);
Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdList);
Vue.use(MdField);
Vue.use(MdRadio);
Vue.use(MdDialog);
Vue.use(MdDialogConfirm);
Vue.use(MdIcon);
Vue.use(MdDrawer);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdCard);
Vue.use(MdDivider);
Vue.use(MdTooltip);
Vue.use(MdSnackbar);
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
