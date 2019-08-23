import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引入uediter编辑器
// import './assets/ueditor/ueditor.config.js'
// import './assets/ueditor/ueditor.all.min.js'
// import './assets/ueditor/lang/zh-cn/zh-cn.js'
// import './assets/ueditor/ueditor.parse.min.js'
// import './assets/ueditor/themes/default/css/ueditor.css'

Vue.use(mavonEditor)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.use(ElementUI);
axios.defaults.timeout = 5000 // 请求超时

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
