import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/template page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
