import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')


