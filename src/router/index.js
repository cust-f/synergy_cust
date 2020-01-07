import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/template page/login'

//前台界面
import Front from '@/Layout/template page/Front'
import Home from '@/views/Front/Home/Home'

//后台界面
import Admin from '@/Layout/template page/Admin'
import Dashboard from '@/views/Admin/Home/Dashboard' //后台系统首页

import newStaff from '@/views/admins/newStaff'
import newTask from '@/views/admins/newTask'
import mainStaskShow from '@/views/admins/mainStaskShow'
import substaskDetail from '@/views/admins/substaskDetail'
import mainStaskDetail from '@/views/admins/mainStaskDetail'
import test from '@/views/admins/test'
import review from '@/views/admins/review'

import companyDetail from '@/views/Admin/company/companyDetail'
import supplyBussess from '@/views/Admin/company/supplyBussess'
import supplyDetail from '@/views/Admin/company/supplyDetail'


import designTaskEvaluation from '@/views/Admin/projectManagement/designTaskEvaluation'
import designTaskEvaluationDetils from '@/views/Admin/projectManagement/designTaskEvaluationDetils'
import staffingTenderManagement from '@/views/Admin/projectManagement/staffingTenderManagement'

import supplierTast from '@/views/Admin/supplier/supplierTast'
import supplierChildtast from '@/views/Admin/supplier/supplierChildtast'
import supplierCTdistribution from '@/views/Admin/supplier/supplierCTdistribution'

import circulation from '@/views/Admin/personnel allotment/circulation'
import desinger from '@/views/Admin/personnel allotment/desinger'

//供应商市场部门
import supplierAccept from '@/views/Admin/supplier/supplierMarket/supplierAccept'
import supplierAcceptTask from '@/views/Admin/supplier/supplierMarket/supplierAcceptTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path:'/Front',
      name:'Front',
      component:Front,
      children:[
        {
          path:'/home',
          name:'Home',
          component:Home
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        //系统首页
        {
          path:'/admin/dashboard',
          name:'Dashboard',
          component:Dashboard,
          meta:{
            title:'系统首页'
          }
        },
        //新增任务
        {
          path: '/admin/newTask',
          name: 'newTask',
          component: newTask,
          meta: {
            requireAuth: true    // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        //查看所有主任务
        {
          path: '/admin/mainStaskShow',
          name: 'mainStaskShow',
          component: mainStaskShow,
        },
        //主任务详情及查看所属子任务部分信息
        {
          path: '/admin/substaskDetail',
          name: 'substaskDetail',
          component: substaskDetail,
        },
        //查看主任务所属子任务的全部信息
        {
          path: '/admin/mainStaskDetail',
          name: 'mainStaskDetail',
          component: mainStaskDetail,
        },
        {
          path: '/admin/test',
          name: 'test',
          component: test,
        },
        //企业信息详情
        {
          path: '/admin/companyDetail',
          name: 'companyDetail',
          component: companyDetail
        },
        //查看所有供应商的信息
        {
          path: '/admin/supplyBussess',
          name: 'supplyBussess',
          component: supplyBussess
        },
        //单个供应商的详细信息
        {
          path: '/admin/supplyDetail',
          name: 'supplyDetail',
          component: supplyDetail
        },
        //供应商信息审核（将供应商添加到所属供应商名录中）
        {
          path: '/admin/review',
          name: 'review',
          component: review
        },
        {
          path: '/admin/newStaff',
          name: 'newStaff',
          component: newStaff
        },
        {
          path: '/admin/designTaskEvaluation',
          name: 'designTaskEvaluation',
          component: designTaskEvaluation
        },
        {
          path: '/admin/designTaskEvaluationDetils',
          name: 'designTaskEvaluationDetils',
          component: designTaskEvaluationDetils
        },
        {
          path: '/admin/staffingTenderManagement',
          name: 'staffingTenderManagement',
          component: staffingTenderManagement
        },
        //核心企业设计任务列表
        {
          path: '/admin/supplierTast',
          name: 'supplierTast',
          component: supplierTast,
          meta: {
            requireAuth: true    // 添加该字段，表示进入这个路由是需要登录的
          }
        },

        //核心企业流通任务详情列表
        {
          path: '/admin/supplierChildtast',
          name: 'supplierChildtast',
          component: supplierChildtast,

        },
        //供应商子任务分配
        {
          path: '/admin/supplierCTdistribution',
          name: 'supplierCTdistribution',
          component: supplierCTdistribution,

        },


        //流通人员
        {
          path: '/admin/circulation',
          name: 'circulation',
          component: circulation,

        },
        //设计人员
        {
          path: '/admin/desinger',
          name: 'desinger',
          component: desinger,

        },
        //供应商接受设计任务
        {
          path: '/admin/supplierAccept',
          name: 'supplierAccept',
          component: supplierAccept,

        },

        //供应商流通任务
        {
          path: '/circulationTaskq',
          name: 'circulationTaskq',
          component: circulationTaskq,
        },

        //供应商设计成果
        {
          path: '/designResult',
          name: 'designResult',
          component: designResult,
        },
        
        //供应商接受任务详情
        {
          path: '/admin/supplierAcceptTask',
          name: 'supplierAcceptTask',
          component: supplierAcceptTask,

        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
