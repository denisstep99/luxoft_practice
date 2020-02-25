import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueApexCharts from "vue-apexcharts";
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.config.productionTip = false;
Vue.component("apexchart", VueApexCharts);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
