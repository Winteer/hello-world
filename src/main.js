import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.use(ElementUI);
axios.defaults.timeout = 5000 // 请求超时

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
