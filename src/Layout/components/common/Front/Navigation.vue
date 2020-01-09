<template>
<div style="margin:0 auto; width:1200px;">
  <el-menu
    :default-active="this.$route.path"
    background-color="#00a2e6"
    text-color="#FFF  "
    mode="horizontal"
    router
  >
    <template v-for="item in items">
      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.index">
          <template slot="title">
            <!-- <i :class="item.icon"></i> -->
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
            <el-menu-item :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index">
          <!-- <i :class="item.icon"></i> -->
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
                  items: [
                {
                    icon: 'el-icon-office-building',
                    index: '/admin/dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                {
                    icon: 'el-icon-s-custom',
                    index: '6',
                    title: '人员管理',
                    subs: [
                        {
                            index: '/admin/newStaff',
                            title: '新增人员'
                        },
                        {
                            index: '/admin/dialog',
                            title: '评价管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-edit-outline',
                    index: '/admin/designTaskEvaluation',
                    title: '设计任务评价'
                },
                {
                    icon: 'el-icon-receiving',
                    index: '',
                    title: '流通任务评价'
                },
                {
                     icon: 'el-icon-s-custom',
                    index: '8',
                    title: '管理员',
                    subs: [
                        {
                            index: '/admin/manager_business',
                            title: '企业管理'
                        },                  
                        {
                            index: '/admin/manager_user',
                            title: '用户管理'
                        }
                    ]
                }
            ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style>
.el-submenu__title {
  font-size: 16px;
    height: 45px !important;
          line-height: 43px !important;
  /* #1381ce */
}
.el-menu--horizontal{
  height: 45px;
}
.el-menu--horizontal>.el-menu-item.is-active {
  background-color:  #1381ce !important;
  color: #FFF !important;  
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    background-color:  #1381ce !important;
  color: #FFF !important;  
}
.el-menu--horizontal .el-menu .el-menu-item.is-active{
      background-color:  #1381ce !important;
    color: #FFF !important;  
}
.el-menu-item {
    font-size: 16px;
      height: 45px !important;
    padding:0px 20px;
    line-height: 43px !important;
}
.el-submenu{
}
</style>