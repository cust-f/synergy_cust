import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/template page/login'
import Front from '@/Layout/template page/Front'
import Home from '@/views/Home/Home'
import newTask from '@/views/admin/newTask'
<<<<<<< HEAD
import mainStaskShow from '@/views/admin/mainStaskShow'
import substaskDetail from '@/views/admin/substaskDetail'
import mainStaskDetail from '@/views/admin/mainStaskDetail'
import test from '@/views/admin/test'
import companyDetail from '@/views/company/companyDetail'
import supplyBussess from '@/views/company/supplyBussess'
import supplyDetail from '@/views/company/supplyDetail'
=======

import tenderManagement from '@/views/projectManagement/tenderManagement' //新增招标管理 2020-01-04 闫晗添加

>>>>>>> e9639ab6fa30bfcf6c790d6a650eefb9b8231b5f
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
<<<<<<< HEAD
        //查看所有主任务
        {
          path:'/mainStaskShow',
          name:'mainStaskShow',
          component:mainStaskShow,
        },
        {
          path:'/substaskDetail',
          name:'substaskDetail',
          component:substaskDetail,
        },
        {
          path:'/mainStaskDetail',
          name:'mainStaskDetail',
          component:mainStaskDetail,
        },
        {
          path:'/test',
          name:'test',
          component:test,
        
        },
        {
          path:'/companyDetail',
          name:'companyDetail',
          component:companyDetail
        },
        {
          path:'/supplyBussess',
          name:'supplyBussess',
          component:supplyBussess
        },
        {
          path:'/supplyDetail',
          name:'supplyDetail',
          component:supplyDetail
=======
        //新增招标管理 2020-01-04 闫晗添加
        {
          path:'/tenderManagement',
          name:'tenderManagement',
          component:tenderManagement
          //是否需要登录未知
>>>>>>> e9639ab6fa30bfcf6c790d6a650eefb9b8231b5f
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },

  ]
})
