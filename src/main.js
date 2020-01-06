// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import './assets/icon/iconfont.css'
import './assets/icon/iconfont'

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios //改变原型链
Vue.use(VueAxios, axios)

window.echarts = require('echarts');

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

