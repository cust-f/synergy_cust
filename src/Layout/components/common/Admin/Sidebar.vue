<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#FFF"
      text-color="#000"
      active-text-color="#20a0ff"
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu style="margin-bottom:15px;" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                style="padding-left:53px;"
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item style="margin-bottom:15px;" :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  data() {
    return {
      collapse: true,
      items: [
        {
          icon: "el-icon-office-building",
          index: "/admin/dashboard",
          title: "系统管理"
        },
        // {
        //     icon: 'el-icon-postcard',
        //     index: '2',
        //     title: '企业信息管理',
        //     subs:[{
        //             index:'/admin/companyDetail',
        //             title:'企业信息详情'
        //         },
        //         {
        //             index:'/admin/supplyBussess',
        //             title:'企业名录'
        //         },
        //         {
        //             index:'/admin/xuqiuyilan',
        //             title:'需求一览'
        //         },
        //         ]
        // },
        {
          icon: "el-icon-edit-outline",
          index: "3",
          title: "设计管理",
          subs: [
            {
              index: "/admin/newTask",
              title: "新增任务"
            },
            {
              index: "/admin/mainStaskShow",
              title: "查看详情"
            }
          ]
        },
        {
          icon: "el-icon-tickets",
          index: "4",
          title: "流通管理",
          subs: [
            {
              index: "/admin/designTask",
              title: "设计任务"
            },
            {
              index: "/admin/circulationTask",
              title: "流通任务"
            }
          ]
        },
        {
          icon: "el-icon-pie-chart",
          index: "charts",
          title: "文件管理"
        },
        {
          icon: "el-icon-s-custom",
          index: "6",
          title: "供应方管理",
          subs: [
            {
              index: "/admin/designTaskq",
              title: "设计任务"
            },
             {
              index: "/admin/circulationTaskq",
              title: "流通任务"
            },
          ]
        },
        {
          icon: "el-icon-edit-outline",
          index: "7",
          title: "评价管理",
          subs: [
            {
              index: "/admin/designTaskEvaluation",
              title: "设计任务评价"
            },
            {
              index: "/admin/circulationTaskEvaluation",
              title: "流通任务评价"
            },
            {
              index: "/admin/Enterprise_Evaluation/evaluate",
              title: "企业评价"
            }
          ]
        },
        {
          icon: "el-icon-s-custom",
          index: "8",
          title: "人员分配",
          subs: [
            {
              index: "/admin/personnel_allotment/desinger",
              title: "设计人员"
            },
            {
              //icon: "el-icon-receiving",
              index: "/admin/personnel_allotment/circulation",
              title: "流通人员"
            }
          ]
        },
        {
          icon: "el-icon-s-custom",
          index: "9",
          title: "管理员",
          subs: [
            {
              index: "/admin/manager_business",
              title: "企业管理"
            },
            {
              index: "/admin/userManagement",
              title: "用户管理"
            }
          ]
        }
      ],
      created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on("collapse", msg => {
          this.collapse = msg;
          bus.$emit("collapse-content", msg);
        });
      }
    };
  }
};
</script>

<style>
/* .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}*/
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 230px;
}
.sidebar > ul {
  height: 100%;
}
/* 修改导航栏边框 */
.el-menu {
  border: none;
}
.sidebar .el-menu span {
  font-size: 14px !important;
}
.sidebar .el-menu .el-menu-item {
  font-size: 14px !important;
}
</style>