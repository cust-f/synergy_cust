import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/components/template page/login'
import Front from '@/Layout/components/template page/Front'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Front'
    },
    {
      path: '/front',
      name: 'front',
      component: Front
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
