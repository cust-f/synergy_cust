import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/template page/login'

//前台界面
import Front from '@/Layout/template page/Front'
import Home from '@/views/Front/Home/Home'

//后台界面
import Admin from '@/Layout/template page/admin'
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
import designTaskq from '@/views/admin/supplier/supplierMarket/designTaskq'
import accceptCirculationDetailsTask from '@/views/admin/supplier/supplierMarket/accceptCirculationDetailsTask'
import designResultDesigin from '@/views/admin/supplier/supplierMarket/designResultDesigin'
import designTaskqDesigin from '@/views/admin/supplier/supplierMarket/designTaskqDesigin'
import circulationTaskqDesign from '@/views/admin/supplier/supplierMarket/circulationTaskqDesign'
import circulationTaskfinish from '@/views/admin/supplier/supplierMarket/circulationTaskfinish'
import circulationTaskfinishDesign from '@/views/admin/supplier/supplierMarket/circulationTaskfinishDesign'
import circulationTaskEvaluate from '@/views/admin/supplier/supplierMarket/circulationTaskEvaluate'

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
      component: Admin,
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
        },
        //企业信息详情
        {
          path: '/admin/companyDetail',
          name: 'companyDetail',
          component: companyDetail
        },
        //查看所有供应商的信息
        {
          path: '/admin/company/supplyBussess',
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
        //新增人员
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
          path: '/admin/personnel_allotment/circulation',
          name: 'circulation',
          component: circulation,
        },
        //设计人员
        {
          path: '/admin/personnel_allotment/desinger',
          name: 'desinger',
          component: desinger,
        },
        //虚拟机
        {
          path: '/admin/personnel_allotment/virtualMachine',
          name: 'virtualMachine',
          component: virtualMachine,
        },
        //供应商接受设计任务
        // {
        //   path: '/admin/supplierAccept',
        //   name: 'supplierAccept',
        //   component: supplierAccept,

        // },
        //供应商流通任务
        {
          path: '/admin/supplier/circulationTaskq',
          name: 'circulationTaskq',
          component: circulationTaskq,
        },
        //供应商设计成果
        {
          path: '/admin/supplier/designResult',
          name: 'designResult',
          component: designResult,
        },
        //供应商接受任务详情
        // {
        //   path: '/admin/supplier/supplierMarket/supplierAcceptTask',
        //   name: 'supplierAcceptTask',
        //   component: supplierAcceptTask,

        // },
        {
          path: '/admin/accceptCirculationDetailsTask',
          name: 'accceptCirculationDetailsTask',
          component: accceptCirculationDetailsTask,
        },
        {
          path: '/admin/accceptCirculationtask',
          name: 'accceptCirculationtask',
          component: accceptCirculationtask,
        },
        {
          path: '/admin/acceptDesignDetailsTask',
          name: 'acceptDesignDetailsTask',
          component: acceptDesignDetailsTask,
        },
        {
          path: '/admin/acceptDesignTask',
          name: 'acceptDesignTask',
          component: acceptDesignTask,
        },
        {
          path: '/admin/circulationTaskEvaluate',
          name: 'circulationTaskEvaluate',
          component: circulationTaskEvaluate,
        },
        {
          path: '/admin/circulationTaskfinish',
          name: 'circulationTaskfinish',
          component: circulationTaskfinish,
        },
        {
          path: '/admin/circulationTaskfinishDesign',
          name: 'circulationTaskfinishDesign',
          component: circulationTaskfinishDesign,
        },
        {
          path: '/admin/circulationTaskqDesign',
          name: 'circulationTaskqDesign',
          component: circulationTaskqDesign,
        },
        {
          path: '/admin/circulationTaskqDesign',
          name: 'circulationTaskqDesign',
          component: circulationTaskqDesign,

        },
        {
          path: '/admin/designResultDesigin',
          name: 'designResultDesigin',
          component: designResultDesigin,
        },
        {
          path: '/admin/designTaskq',
          name: 'designTaskq',
          component: designTaskq,
        },
        {
          path: '/admin/designTaskqDesigin',
          name: 'designTaskqDesigin',
          component: designTaskqDesigin,
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
