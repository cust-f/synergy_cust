import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/template page/login'

//前台界面
import Front from '@/Layout/template page/Front'
import Home from '@/views/Front/Home/Home'

//后台界面
import adminPage from '@/Layout/template page/adminPage'
import Dashboard from '@/views/admin/Home/Dashboard' //后台系统首页
//核心企业
import newStaff from '@/views/admin/staff/newStaff'//新增人员
import newTask from '@/views/admin/Task/newTask'//新增任务
import mainStaskShow from '@/views/admin/maintask/mainStaskShow'//主任务显示
import substaskDetail from '@/views/admin/maintask/substaskDetail'//子任务详情
import mainStaskDetail from '@/views/admin/maintask/mainStaskDetail'//主任务详情
import review from '@/views/admin/check/review'

import companyDetail from '@/views/admin/company/companyDetail'//企业详情
import supplyBussess from '@/views/admin/company/supplyBussess'//供应商名录
import supplyDetail from '@/views/admin/company/supplyDetail'//供应商详情

import designTask from '@/views/admin/design/designTask'//设计任务
import circulationTask from '@/views/admin/circulation/circulationTask'//流通任务

import designTaskEvaluation from '@/views/admin/projectManagement/designTaskEvaluation'//设计任务评价
import designTaskEvaluationDetils from '@/views/admin/projectManagement/designTaskEvaluationDetils'//设计任务评价详情
import staffingTenderManagement from '@/views/admin/projectManagement/staffingTenderManagement'


import circulation from '@/views/admin/personnel_allotment/circulation'
import desinger from '@/views/admin/personnel_allotment/desinger'
import virtualMachine from '@/views/admin/personnel_allotment/virtualMachine'

//供应商市场部门
import acceptDesignTask from '@/views/admin/supplier/supplierMarket/acceptDesignTask'
import acceptDesignDetailsTask from '@/views/admin/supplier/supplierMarket/acceptDesignDetailsTask'
import accceptCirculationtask from '@/views/admin/supplier/supplierMarket/accceptCirculationtask'
import circulationTaskq from '@/views/admin/supplier/supplierMarket/circulationTaskq'
import designResult from '@/views/admin/supplier/supplierMarket/designResult'
import designTaskq from '@/views/admin/supplier/supplierMarket/designTaskq'//子设计任务列表
import designTaskqDesigin from '@/views/admin/supplier/supplierMarket/designTaskqDesigin'//子设计任务详情
import accceptCirculationDetailsTask from '@/views/admin/supplier/supplierMarket/accceptCirculationDetailsTask'


import circulationTaskfinish from '@/views/admin/supplier/supplierMarket/circulationTaskfinish'
import circulationTaskfinishDesign from '@/views/admin/supplier/supplierMarket/circulationTaskfinishDesign'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Front',
      name: 'Front',
      component: Front,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: adminPage,
      children: [
        //系统首页
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            title: '系统首页'
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
          meta: {
            title: "查看主任务所属子任务的全部信息"
          }
        },
        //企业信息详情
        {
          path: '/admin/companyDetail',
          name: 'companyDetail',
          component: companyDetail,
          meta: {
            title: "企业信息详情"
          }
        },
        //查看所有供应商的信息
        {
          path: '/admin/supplyBussess',
          name: 'supplyBussess',
          component: supplyBussess,
          meta: {
            title: "所有供应商的信息"
          }
        },
        //单个供应商的详细信息
        {
          path: '/admin/supplyDetail',
          name: 'supplyDetail',
          component: supplyDetail,
          meta: {
            title: "供应商的详细信息"
          }
        },
        //供应商信息审核（将供应商添加到所属供应商名录中）
        {
          path: '/admin/check/review',
          name: 'review',
          component: review,
          meta: {
            title: "供应信息审核"
          }
        },
        //新增人员
        {
          path: '/admin/newStaff',
          name: 'newStaff',
          component: newStaff,
          meta: {
            title: "新增人员"
          }
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
          path: '/admin/designTask',
          name: 'designTask',
          component: designTask,

        },

        //核心企业流通任务详情列表
        {
          path: '/admin/circulationTask',
          name: 'circulationTask',
          component: circulationTask,

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
        //虚拟机
        {
          path: '/admin/virtualMachine',
          name: 'virtualMachine',
          component: virtualMachine,
        },
//供应方

         //供应商设计任务列表
        {
          path: '/admin/designTaskq',
          name: 'designTaskq',
          component: designTaskq,
          meta: {
            title: "接受设计任务"
          }
        },
         //供应商设计任务详情
        {
          path: '/admin/designTaskqDesigin',
          name: 'designTaskqDesigin',
          component: designTaskqDesigin,
          meta: {
            title: "接受设计任务"
          }
        },
                //供应商接受设计任务
        {
          path: '/admin/acceptDesignTask',
          name: 'acceptDesignTask',
          component: acceptDesignTask,
          meta: {
            title: "接受设计任务"
          }
        },
        //供应商接受设计任务详情
        {
          path: '/admin/acceptDesignDetailsTask',
          name: 'acceptDesignDetailsTask',
          component: acceptDesignDetailsTask,
          meta: {
            title: "接受设计任务详情"
          }
        },

        //供应商接受流通任务
        {
          path: '/admin/accceptCirculationtask',
          name: 'accceptCirculationtask',
          component: accceptCirculationtask,
          meta: {
            title: "接受流通任务"
          }
        },

        //供应商接受流通任务详情
        {
          path: '/admin/accceptCirculationDetailsTask',
          name: 'accceptCirculationDetailsTask',
          component: accceptCirculationDetailsTask,
          meta: {
            title: "流通任务详情"
          }
        },

        //供应商流通任务
        {
          path: '/admin/circulationTaskq',
          name: 'circulationTaskq',
          component: circulationTaskq,
          meta: {
            title: "流通任务"
          }
        },
        //供应商设计成果
        {
          path: '/admin/designResult',
          name: 'designResult',
          component: designResult,
          meta:{
            title:"设计成果"
          }
        },

        //供应商接受任务详情
        {
          path: '/admin/acceptDesignDetailsTask',
          name: 'acceptDesignDetailsTask',
          component: acceptDesignDetailsTask,
          meta:{
            title:"接受任务详情"
          }

        },
        //供应商完成任务列表
        {
          path: '/admin/circulationTaskfinish',
          name: 'circulationTaskfinish',
          component: circulationTaskfinish,
          meta:{
            title:"完成任务列表"
          }
        },
        //供应商完成任务详情
        {
          path: '/admin/circulationTaskfinishDesign',
          name: 'circulationTaskfinishDesign',
          component: circulationTaskfinishDesign,
          meta:{
            title:"完成任务详情"
          }
        },
        
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
