import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator'
import { Toast } from 'vant';
import "../src/assets/js/bigDate";
import axios from 'axios'
import {post,fetch,patch,put} from './assets/js/https'
import { calendar } from '../static/utils/calendar';
import common from './assets/js/common';
import state from './store';
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$calendar=calendar;
Vue.prototype.$common=common;
Vue.prototype.$state = state

Vue.use(Toast);
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$toast = Toast;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
