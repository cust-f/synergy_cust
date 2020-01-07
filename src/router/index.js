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
import review from '@/views/admin/review'

import designTask from '@/views/admin/designTask'
import designTaskEvaluation from '@/views/projectManagement/designTaskEvaluation'
import designTaskEvaluationDetils from '@/views/projectManagement/designTaskEvaluationDetils'
import staffingTenderManagement from '@/views/projectManagement/staffingTenderManagement'
import newStaff from '@/views/admin/newStaff'

import basetable from '@/Layout/components/common/BaseTable'
import circulationTask from '@/views/admin/circulationTask'
import circulation from '@/views/personnel allotment/circulation'
import desinger from '@/views/personnel allotment/desinger'

//供应商市场部门
import acceptDesignTask from '@/views/supplier/supplierMarket/acceptDesignTask'
import acceptDesignDetailsTask from '@/views/supplier/supplierMarket/acceptDesignDetailsTask'
import accceptCirculationtask from '@/views/supplier/supplierMarket/accceptCirculationtask'
import circulationTaskq from '@/views/supplier/supplierMarket/circulationTaskq'
import designResult from '@/views/supplier/supplierMarket/designResult'
import designTaskq from '@/views/supplier/supplierMarket/designTaskq'
import accceptCirculationDetailsTask from '@/views/supplier/supplierMarket/accceptCirculationDetailsTask'
import designResultDesigin from '@/views/supplier/supplierMarket/designResultDesigin'
import designTaskqDesigin from '@/views/supplier/supplierMarket/designTaskqDesigin'
import circulationTaskqDesign from '@/views/supplier/supplierMarket/circulationTaskqDesign'
import circulationTaskfinish from '@/views/supplier/supplierMarket/circulationTaskfinish'
import circulationTaskfinishDesign from '@/views/supplier/supplierMarket/circulationTaskfinishDesign'
import circulationTaskEvaluationDetils from '@/views/supplier/supplierMarket/circulationTaskEvaluationDetils'

//企业图表统计
import enterpriseEvaluation from '@/views/data_statistics/enterpriseEvaluation'

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
      children: [
        //首页
        {
          path: '/Home',
          name: 'Home',
          component: Home
        },
        //新增任务
        {
          path: '/newTask',
          name: 'newTask',
          component: newTask,
          meta: {
            requireAuth: true    // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        //查看所有主任务
        {
          path: '/mainStaskShow',
          name: 'mainStaskShow',
          component: mainStaskShow,
        },
        //主任务详情及查看所属子任务部分信息
        {
          path: '/substaskDetail',
          name: 'substaskDetail',
          component: substaskDetail,
        },
        //查看主任务所属子任务的全部信息
        {
          path: '/mainStaskDetail',
          name: 'mainStaskDetail',
          component: mainStaskDetail,
        },
        {
          path: '/test',
          name: 'test',
          component: test,
        },
        //企业信息详情
        {
          path: '/companyDetail',
          name: 'companyDetail',
          component: companyDetail
        },
        //查看所有供应商的信息
        {
          path: '/supplyBussess',
          name: 'supplyBussess',
          component: supplyBussess
        },
        //单个供应商的详细信息
        {
          path: '/supplyDetail',
          name: 'supplyDetail',
          component: supplyDetail
        },
        //供应商信息审核（将供应商添加到所属供应商名录中）
        {
          path: '/review',
          name: 'review',
          component: review
        },
        {
          path: '/newStaff',
          name: 'newStaff',
          component: newStaff
        },
        {
          path: '/designTaskEvaluation',
          name: 'designTaskEvaluation',
          component: designTaskEvaluation
        },
        {
          path: '/designTaskEvaluationDetils',
          name: 'designTaskEvaluationDetils',
          component: designTaskEvaluationDetils
        },
        {
          path: '/staffingTenderManagement',
          name: 'staffingTenderManagement',
          component: staffingTenderManagement
        },
        {
          path: '/basetable',
          name: 'basetable',
          component: basetable
        },
        //核心企业设计任务列表
        {
          path: '/designTask',
          name: 'designTask',
          component: designTask
        },

        //核心企业流通任务详情列表
        {
          path: '/circulationTask',
          name: 'circulationTask',
          component: circulationTask
        },


        //流通人员
        {
          path: '/circulation',
          name: 'circulation',
          component: circulation,

        },
        //设计人员
        {
          path: '/desinger',
          name: 'desinger',
          component: desinger,

        },
        //供应商接受设计任务
        {
          path: '/acceptDesignTask',
          name: 'acceptDesignTask',
          component: acceptDesignTask,

        },
        //供应商接受设计任务详情
        {
          path: '/acceptDesignDetailsTask',
          name: 'acceptDesignDetailsTask',
          component: acceptDesignDetailsTask,

        },

        //供应商接受流通任务
        {
          path: '/accceptCirculationtask',
          name: 'accceptCirculationtask',
          component: accceptCirculationtask,
        },

        //供应商接受流通任务详情
        {
          path: '/accceptCirculationDetailsTask',
          name: 'accceptCirculationDetailsTask',
          component: accceptCirculationDetailsTask,
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
          path:'/acceptDesignDetailsTask',
          name:'acceptDesignDetailsTask',
          component:acceptDesignDetailsTask,
    
        },
        //供应商完成任务列表
        {
          path:'/circulationTaskfinish',
          name:'circulationTaskfinish',
          component:circulationTaskfinish,
    
        },
         //供应商完成任务详情
         {
          path:'/circulationTaskfinishDesign',
          name:'circulationTaskfinishDesign',
          component:circulationTaskfinishDesign,
    
        },
        //企业数据统计
        {
          path:'/charts',
          name:'charts',
          component:enterpriseEvaluation,
        },

        //供应商设计任务
        {
          path: '/designTaskq',
          name: 'designTaskq',
          component: designTaskq,
        },
        //供应商流通任务
        {
          path: '/designTaskqDesigin',
          name: 'designTaskqDesigin',
          component: designTaskqDesigin,
        },

         //供应商设计成果
         {
          path: '/designResultDesigin',
          name: 'designResultDesigin',
          component: designResultDesigin,
        },

        //供应商流通任务详情
        {
          path: '/circulationTaskqDesign',
          name: 'circulationTaskqDesign',
          component: circulationTaskqDesign,
        },

        //供应商流通任务评价
        {
          path: '/circulationTaskEvaluationDetils',
          name: 'circulationTaskEvaluationDetils',
          component: circulationTaskEvaluationDetils,
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
