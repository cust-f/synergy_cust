import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Layout/template page/login'

//前台界面
import Front from '@/Layout/template page/Front'
import Home from '@/views/Front/Home/Home'//前台首页
import twoMenu from '@/views/Front/Home/twoMenu'//前台首页二级页面
import threeMenu from '@/views/Front/Home/threeMenu'//前台首页三级页面
import excellentCompany from '@/views/Front/Home/excellentCompany'//优秀企业
import excellentCompanyDesigin from '@/views/Front/company/excellentCompanyDesigin'//优秀企业
import xuqiuyilan from '@/views/Front/Home/xuqiuyilan'//需求一览
import xuqiuyilanDetail from '@/views/admin/company/xuqiuyilanDetail'//需求一览

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
import circulationTaskEvaluation from '@/views/admin/circulationRemark/circulationTaskEvaluation' //流通任务评价
import circulationTaskEvaluationDetils from '@/views/admin/circulationRemark/circulationTaskEvaluationDetils'//流通任务评价详情
import staffingTenderManagement from '@/views/admin/projectManagement/staffingTenderManagement'


import circulation from '@/views/admin/personnel_allotment/circulation'
import desinger from '@/views/admin/personnel_allotment/desinger'
import virtualMachine from '@/Layout/template page/virtualMachine'
import evaluate from '@/views/admin/Enterprise_Evaluation/evaluate'

 import supplyContract from '@/views/admin/company/supplyContract'  //合同详情
 import userManagement from '@/views/admin/company/userManagement'  //用户管理


//供应商设计界面
import designTaskq from '@/views/admin/supplier/supplierMarket/designTaskq'//设计任务列表
import designingTaskDet from '@/views/admin/supplier/design/designDetails/designingTaskDet'//进行中任务详情
import finishTaskDet from '@/views/admin/supplier/design/designDetails/finishTaskDet'//完成任务详情界面
import pendingAcceptanceDet from '@/views/admin/supplier/design/designDetails/pendingAcceptanceDet'//待验收设计详情界面
import pendingAuditDet from '@/views/admin/supplier/design/designDetails/pendingAuditDet'//待审核详情页面
import pendingResTaskDet from '@/views/admin/supplier/design/designDetails/pendingResTaskDet'//待响应详情页面
import planAuditDet from '@/views/admin/supplier/design/designDetails/planAuditDet'//任务计划详情页面
import planAuditingDet from '@/views/admin/supplier/design/designDetails/planAuditingDet'//审核任务计划详情页面
import repealedTaskDet from '@/views/admin/supplier/design/designDetails/repealedTaskDet'//废除任务详情页面
//供应商流通界面
import circulationTaskq from '@/views/admin/supplier/supplierMarket/circulationTaskq'//流通任务列表
import cNewTask from '@/views/admin/supplier/circulation/cNewTask'//供应商流通分配
import cAllTaskDet from '@/views/admin/supplier/circulation/circulationDetails/cAllTaskDet'  //全部任务详情
import cPendingResTaskDet from '@/views/admin/supplier/circulation/circulationDetails/cPendingResTaskDet'//待响应界面详情
import cPlanAuditDet from '@/views/admin/supplier/circulation/circulationDetails/cPlanAuditDet'//任务计划界面详情
import cPlanAuditingDet from '@/views/admin/supplier/circulation/circulationDetails/cPlanAuditingDet'//计划审核详情界面
import circulationTaskDet from '@/views/admin/supplier/circulation/circulationDetails/circulationTaskDet'//流通任务进行中详情界面
import cPendingAcceptanceDet from '@/views/admin/supplier/circulation/circulationDetails/cPendingAcceptanceDet'//待验收任务详情界面
import cFinishTaskDet from '@/views/admin/supplier/circulation/circulationDetails/cFinishTaskDet'//完成任务详情界面
import cRepealedTaskDet from '@/views/admin/supplier/circulation/circulationDetails/cRepealedTaskDet'//已废除任务详情界面
import cPendingAuditDet from '@/views/admin/supplier/circulation/circulationDetails/cPendingAuditDet'//流通进行中任务详情

import managerBusiness from '@/views/admin/manager/managerBusiness'
import businessDetail from '@/views/admin/manager/businessDetail'


import primarysupplyList from '@/views/admin/company/primarysupplyList'//一级供应商列表
import secondarysupplyList from '@/views/admin/company/secondarysupplyList'//二级供应商列表

import supplyBussess2 from '@/views/admin/supplycompany/supplyBussess2'
import supplyDetail2 from '@/views/admin/supplycompany/supplyDetail2'

import excellentCompanyDetail from '@/views/Front/company/excellentCompanyDetail'//一级供应商列表


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
        },
        {
          path:"/twoMenu",
          name:"twoMenu",
          component:twoMenu
        },
        {
          path:"/threeMenu",
          name:"threeMenu",
          component:threeMenu
        },
        {
          path: "/xuqiuyilan",
          name: "xuqiuyilan",
          component: xuqiuyilan,
        },
//优秀企业
        {
          path: "/excellentCompany",
          name: "excellentCompany",
          component: excellentCompany,
        },
        {
          path: '/admin/xuqiuyilanDetail',
          name: 'xuqiuyilanDetail',
          component: xuqiuyilanDetail,
        },

        //优秀企业详情
        {
          path: '/company/excellentCompanyDesigin',
          name: 'excellentCompanyDesigin',
          component: excellentCompanyDesigin,
        },

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
        {
          path: '/company/excellentCompanyDetail',
          name: 'excellentCompanyDetail',
          component: excellentCompanyDetail,
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
        //设计任务评价
        {
          path: '/admin/designTaskEvaluation',
          name: 'designTaskEvaluation',
          component: designTaskEvaluation
        },
        //任务计划
       {
          path: '/admin/supplyContract',
          name: 'supplyContract',
          component: supplyContract,
        

        },  
        //用户管理
        {
          path: '/admin/userManagement',
          name: 'userManagement',
          component: userManagement,
        

        },  
        {
          path: '/admin/circulationTaskEvaluation',
          name: 'circulationTaskEvaluation',
          component: circulationTaskEvaluation,
        

        },  
        {
          path: '/admin/circulationTaskEvaluationDetils',
          name: 'circulationTaskEvaluationDetils',
          component: circulationTaskEvaluationDetils,
        

        },  

        {
          path: '/admin/designTaskEvaluationDetils',
          name: 'designTaskEvaluationDetils',
          component: designTaskEvaluationDetils
        },
        //流通任务评价详情
        {
          path: '/admin/circulationTaskEvaluationDetils',
          name: 'circulationTaskEvaluationDetils',
          component: circulationTaskEvaluationDetils
        },
        //流通任务评价
        {
          path: '/admin/circulationTaskEvaluation',
          name: 'circulationTaskEvaluation',
          component: circulationTaskEvaluation
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
        //企业评价
        {
          path:'/admin/Enterprise_Evaluation/evaluate',
          name:'evaluate',
          component:evaluate,
        },

         //供应商设计任务列表
        {
          path: '/admin/designTaskq',
          name: 'designTaskq',
          component: designTaskq,
          
        },

         //供应商流通任务列表
         {
          path: '/admin/circulationTaskq',
          name: 'circulationTaskq',
          component: circulationTaskq,
          
        },
        

        //企业管理
        {
          path: '/admin/manager_business',
          name: 'managerBusiness',
          component: managerBusiness,
        },
        
        //企业详情
        {
          path: '/admin/businessDetail',
          name: 'businessDetail',
          component: businessDetail,
          meta: {
            title: "企业详情"
          }
        },
        //一级供应商名录
        {
          path: '/admin/primarysupplyList',
          name: 'primarysupplyList',
          component: primarysupplyList,
          meta: {
            title: "一级供应商的信息"
          }
        },
        //一级供应商名录
        {
          path: '/admin/secondarysupplyList',
          name: 'secondarysupplyList',
          component: secondarysupplyList,
          meta: {
            title: "二级供应商的信息"
          }
        },


        //进行中任务详情
        {
          path: '/admin/designingTaskDet',
          name: 'designingTaskDet',
          component: designingTaskDet,
          meta: {
            title: "详情"
          }
        },

        //完成任务详情
        {
          path: '/admin/finishTaskDet',
          name: 'finishTaskDet',
          component: finishTaskDet,
          meta: {
            title: "详情"
          }
        },
        //待验收设计详情
        {
          path: '/admin/pendingAcceptanceDet',
          name: 'pendingAcceptanceDet',
          component: pendingAcceptanceDet,
          meta: {
            title: "详情"
          }
        },
        //待审核详情
        {
          path: '/admin/pendingAuditDet',
          name: 'pendingAuditDet',
          component: pendingAuditDet,
          meta: {
            title: "详情"
          }
        },
        //待响应详情
        {
          path: '/admin/pendingResTaskDet',
          name: 'pendingResTaskDet',
          component: pendingResTaskDet,
          meta: {
            title: "详情"
          }
        },
        //任务计划详情页面
        {
          path: '/admin/planAuditDet',
          name: 'planAuditDet',
          component: planAuditDet,
          meta: {
            title: "详情"
          }
        },
        //审核任务计划详情页面
        {
          path: '/admin/planAuditingDet',
          name: 'planAuditingDet',
          component: planAuditingDet,
          meta: {
            title: "详情"
          }
        },
        //废除任务详情页面
        {
          path: '/admin/repealedTaskDet',
          name: 'repealedTaskDet',
          component: repealedTaskDet,
          meta: {
            title: "详情"
          }
        },       

         //流通全部任务详情页面
         {
          path: '/admin/cAllTaskDet',
          name: 'cAllTaskDet',
          component: cAllTaskDet,
          meta: {
            title: "详情"
          }
        },  

        //流通完成任务详情页面
        {
          path: '/admin/cFinishTaskDet',
          name: 'cFinishTaskDet',
          component: cFinishTaskDet,
          meta: {
            title: "详情"
          }
        },  

        //流通进行中任务详情页面
        {
          path: '/admin/circulationTaskDet',
          name: 'circulationTaskDet',
          component: circulationTaskDet,
          meta: {
            title: "详情"
          }
        },  

        //流通待验收任务详情页面
        {
          path: '/admin/cPendingAcceptanceDet',
          name: 'cPendingAcceptanceDet',
          component: cPendingAcceptanceDet,
          meta: {
            title: "详情"
          }
        },  

        //流通待审核任务详情页面
        {
          path: '/admin/cPlanAuditDet',
          name: 'cPlanAuditDet',
          component: cPlanAuditDet,
          meta: {
            title: "详情"
          }
        },
        //供应商的二级供应商名录
        {
          path: '/admin/supplyBussess2',
          name: 'supplyBussess2',
          component: supplyBussess2,
          meta: {
            title: "供应商信息"
          }
        },
        //供应商企业信息修改
        {
          path: '/admin/supplyDetail2',
          name: 'supplyDetail2',
          component: supplyDetail2,
          meta: {
            title: "供应商企业信息修改"
          }
        },
        



        //流通待响应任务详情页面
        {
          path: '/admin/cPendingResTaskDet',
          name: 'cPendingResTaskDet',
          component: cPendingResTaskDet,
          meta: {
            title: "详情"
          }
        }, 
        
        //流通计划审核详情界面
        {
          path: '/admin/cPlanAuditingDet',
          name: 'cPlanAuditingDet',
          component: cPlanAuditingDet,
          meta: {
            title: "详情"
          }
        }, 
        
        //流通已废除任务详情界面

        {
          path: '/admin/cRepealedTaskDet',
          name: 'cRepealedTaskDet',
          component: cRepealedTaskDet,
          meta: {
            title: "详情"
          }
        }, 


        //流通待审核任务详情界面

        {
          path: '/admin/cPendingAuditDet',
          name: 'cPendingAuditDet',
          component: cPendingAuditDet,
          meta: {
            title: "详情"
          }
        }, 

        //一级供应商新增界面
        {
          path: '/admin/cNewTask',
          name: 'cNewTask',
          component: cNewTask,
          meta: {
            title: "任务分解"
          }
        },  
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
            //虚拟机
            {
              path: '/admin/personnel_allotment/virtualMachine',
              name: 'virtualMachine',
              component: virtualMachine,
            },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
