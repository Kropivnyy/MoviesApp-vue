import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router/router';
import store from './store';
import './registerServiceWorker';
import 'modern-normalize/modern-normalize.css';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
