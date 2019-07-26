import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import Trend from 'vuetrend';
import AOS from 'aos';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import 'aos/dist/aos.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/app.scss';

import './assets/js/app';

Vue.use(Buefy);
Vue.use(VeeValidate);
Vue.use(Trend);
Vue.use(Chartkick);
Chartkick.configure({ language: 'en', mapsApiKey: 'AIzaSyBHBwaNcbkyAIEGCwW27w6JbiwJEDYpi80' });

AOS.init();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
