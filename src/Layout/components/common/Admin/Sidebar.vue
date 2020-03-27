<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="this.$route.path"
      background-color="#FFF"
      text-color="#000"
      active-text-color="#20a0ff"
      :default-openeds="true"
      router
    >
      <template v-for="item in items">
        <!-- 判断是否有二级 -->
        <template v-if="item.children">
          <el-submenu style="margin-bottom:15px;" :index="item.menuURL" :key="item.menuURL">
            <template slot="title">
              <!-- <i :class="item.icon"></i> -->
             <span @click="redirects(item.menuURL)" slot="title">{{ item.menuName }}</span>
            </template>
            <template v-for="subItem in item.children">
              <!-- 判断是否有三级 -->
              <el-submenu v-if="subItem.children" :index="subItem.menuURL" :key="subItem.menuURL">
                <template slot="title">{{ subItem.menuName }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.menuURL"
                >{{ threeItem.menuName }}</el-menu-item>
              </el-submenu>

              <el-menu-item
                style="padding-left:53px;"
                v-else
                :index="subItem.menuURL"
                :key="subItem.menuURL"
              >{{ subItem.menuName }}</el-menu-item>
            </template>
          </el-submenu>
        </template>

        <template v-else>
          <el-menu-item style="margin-bottom:15px;" :index="item.menuURL" :key="item.menuURL">
            <!-- <i :class="item.icon"></i> -->
            <span slot="menuName">{{ item.menuName }}</span>
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
      items: this.$store.state.menuList,
      // items:[
      //   {
      //     icon: "el-icon-office-building",
      //     menuURL: "/admin/dashboard",
      //     menuName: "系统管理"
      //   },
      //   {
      //       icon: 'el-icon-postcard',
      //       menuURL: '2',
      //       menuName: '企业信息管理',
      //       children:[{
      //               menuURL:'/admin/companyDetail',
      //               menuName:'企业信息详情'
      //           },
      //           {
      //               menuURL:'/admin/supplyBussess',
      //               menuName:'企业名录'
      //           },
      //           ]
      //   },
      //   {
      //     icon: "el-icon-edit-outline",
      //     menuURL: "3",
      //     menuName: "任务管理",
      //     children: [
      //       {
      //         menuURL: "/admin/newTask",
      //         menuName: "新增任务"
      //       },
      //       {
      //         menuURL: "/admin/mainStaskShow",
      //         menuName: "需求详细"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-tickets",
      //     menuURL: "4",
      //     menuName: "流通管理",
      //     children: [
      //       {
      //         menuURL: "/admin/designTask",
      //         menuName: "设计任务"
      //       },
      //       {
      //         menuURL: "/admin/circulationTask",
      //         menuName: "流通任务"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-pie-chart",
      //     menuURL: "charts",
      //     menuName: "文件管理"
      //   },
      //   {
      //     icon: "el-icon-s-custom",
      //     menuURL: "6",
      //     menuName: "供应方管理",
      //     children: [
      //       {
      //         menuURL: "/admin/designTaskq",
      //         menuName: "设计任务"
      //       },
      //        {
      //         menuURL: "/admin/circulationTaskq",
      //         menuName: "流通任务"
      //       },
      //     ]
      //   },
      //   {
      //     icon: "el-icon-edit-outline",
      //     menuURL: "7",
      //     menuName: "评价管理",
      //     children: [
      //       {
      //         menuURL: "/admin/designTaskEvaluation",
      //         menuName: "设计任务评价"
      //       },
      //       {
      //         menuURL: "/admin/circulationTaskEvaluation",
      //         menuName: "流通任务评价"
      //       },
      //       {
      //         menuURL: "/admin/Enterprise_Evaluation/evaluate",
      //         menuName: "企业评价"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-s-custom",
      //     menuURL: "8",
      //     menuName: "人员分配",
      //     children: [
      //       {
      //         menuURL: "/admin/personnel_allotment/desinger",
      //         menuName: "设计人员"
      //       },
      //       {
      //         //icon: "el-icon-receiving",
      //         menuURL: "/admin/personnel_allotment/circulation",
      //         menuName: "流通人员"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-s-custom",
      //     menuURL: "9",
      //     menuName: "管理员",
      //     children: [
      //       {
      //         menuURL: "/admin/manager_business",
      //         menuName: "企业管理"
      //       },
      //       {
      //         menuURL: "/admin/userManagement",
      //         menuName: "用户管理"
      //       }
      //     ]
      //   }
      // ],
    };
  },
  // created() {
  //   console.log(this.items);
  // }
  methods:{
    redirects(path){
      console.log("触发啦")
      console.log(path)
      var code=path;
      this.$router.push({ path:code});
                      // this.$router.push("/admin/dashboard");
    }
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