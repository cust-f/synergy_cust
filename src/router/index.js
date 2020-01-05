import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/template page/login'
import Front from '@/Layout/template page/Front'
import Home from '@/views/Home/Home'
import newTask from '@/views/admin/newTask'
import mainStaskShow from '@/views/admin/mainStaskShow'
import substaskDetail from '@/views/admin/substaskDetail'
import mainStaskDetail from '@/views/admin/mainStaskDetail'
import test from '@/views/admin/test'
import companyDetail from '@/views/company/companyDetail'
import supplyBussess from '@/views/company/supplyBussess'
import supplyDetail from '@/views/company/supplyDetail'
<<<<<<< HEAD
import review from '@/views/admin/review'

=======

import designTaskEvaluation from '@/views/projectManagement/designTaskEvaluation'
import designTaskEvaluationDetils from '@/views/projectManagement/designTaskEvaluationDetils'
import staffingTenderManagement from '@/views/projectManagement/staffingTenderManagement'
import newStaff from '@/views/admin/newStaff'

import basetable from '@/Layout/components/common/BaseTable'
import supplierTast from '@/views/supplier/supplierTast' 
import supplierChildtast from '@/views/supplier/supplierChildtast' 
import supplierCTdistribution from '@/views/supplier/supplierCTdistribution' 
>>>>>>> e8f675b356a004bbf48ef261442b91ab7aa6d0af

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
        },
        {
<<<<<<< HEAD
          path:'/review',
          name:'review',
          component:review
        },

=======
          path:'/newStaff',
          name:'newStaff',
          component:newStaff
        },
        {
          path:'/designTaskEvaluation',
          name:'designTaskEvaluation',
          component:designTaskEvaluation
        },
        {
          path:'/designTaskEvaluationDetils',
          name:'designTaskEvaluationDetils',
          component:designTaskEvaluationDetils
        },
        {
          path:'/staffingTenderManagement',
          name:'staffingTenderManagement',
          component:staffingTenderManagement
        },
        {
          path:'/basetable',
          name:'basetable',
          component:basetable
        },
        //供应商任务
        {
          path:'/supplierTast',
          name:'supplierTast',
          component:supplierTast,
          meta: {
            requireAuth: true    // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        //供应商子任务详情
        {
          path:'/supplierChildtast',
          name:'supplierChildtast',
          component:supplierChildtast,
        
        },
         //供应商子任务分配
         {
          path:'/supplierCTdistribution',
          name:'supplierCTdistribution',
          component:supplierCTdistribution,
        
        }
>>>>>>> e8f675b356a004bbf48ef261442b91ab7aa6d0af
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },

  ]
})
