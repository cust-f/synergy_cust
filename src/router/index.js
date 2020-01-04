import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/template page/login'
import Front from '@/Layout/template page/Front'
import Home from '@/views/Home/Home'
import newTask from '@/views/admin/newTask'

import tenderManagement from '@/views/projectManagement/tenderManagement' //新增招标管理 2020-01-04 闫晗添加

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/front',
      name: 'front',
      component: Front,
      children:[
        //首页
        {
          path:'/Home',
          name:'Home',
          component:Home
        },
        //新增任务
        {
          path:'/newTask',
          name:'newTask',
          component:newTask,
          meta: {
            requireAuth: true    // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        //新增招标管理 2020-01-04 闫晗添加
        {
          path:'/tenderManagement',
          name:'tenderManagement',
          component:tenderManagement
          //是否需要登录未知
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
