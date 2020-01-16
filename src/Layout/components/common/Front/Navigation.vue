<template>
<div style="margin:0 auto; width:1200px;" class="navigation">
  <el-menu
    :default-active="this.$route.path"
    background-color="#00A2E6"
    text-color="#FFF"
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
                    index: '/Home',
                    title: '首页'
                },
                {
                    icon: 'el-icon-receiving',
                    index: '/xuqiuyilan',
                    title: '需求一览'
                },
                {
                    icon: 'el-icon-edit-outline',
                    index: '/admin/Enterprise_Evaluation/evaluate',
                    title: '企业评价'
                },
                {
                     icon: 'el-icon-s-custom',
                    index: '8',
                    title: '优质企业',
                },
                {
                     icon: 'el-icon-s-custom',
                    index: '9',
                    title: '服务成果',
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
.navigation .el-submenu__title {
  font-size: 16px;
    height: 45px !important;
          line-height: 43px !important;
  /* #1381ce */
}
.navigation .el-menu--horizontal{
  height: 45px;
}
.el-menu--horizontal>.el-menu-item.is-active {
  background-color:  #00A2E6 !important;
  border-bottom: 2px solid #0000CD;
  color: #FFF !important;  
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    background-color:  #00A2E6 !important;
  color: #FFF !important;  
}
.el-menu--horizontal .el-menu .el-menu-item.is-active{
      background-color:  #00A2E6 !important;
    color: #FFF !important;  
}
.navigation .el-menu-item {
    font-size: 16px;
      height: 45px !important;
    padding:0px 20px;
    margin: 0px 20px !important;
    line-height: 43px !important;
}
.el-submenu{
}
</style>