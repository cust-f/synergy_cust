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
      <template v-else-if="item.open">
         <el-menu-item :index="item.index" :key="item.index">
          
          <span slot="title"><a href="http://www.hccstc.cn/home/index" target="_blank">平台首页</a></span>
          
        </el-menu-item>
      </template>
        <template v-else-if="item.open1">
         <el-menu-item :index="item.index" :key="item.index">
          
          <span slot="title"><a href="https://jxzk.cnki.net/" target="_blank">知识服务</a></span>
          
        </el-menu-item>
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
                    index: '1',
                    title: '平台首页',
                    open:1,
                    open1:0
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: '/Home',
                    title: '首页',
                    open:0
                },
                {
                    icon: 'el-icon-receiving',
                    index: '/xuqiuyilan',
                    title: '需求一览',
                    open:0,
                    open1:0
                },
                // {
                //     icon: 'el-icon-edit-outline',
                //     index: '/admin/Enterprise_Evaluation/evaluate',
                //     title: '企业评价'
                // },
                {
                     icon: 'el-icon-s-custom',
                    index: '/excellentCompany',
                    title: '优质企业',
                    open:0,
                    open1:0
                },
                {
                     icon: 'el-icon-s-custom',
                    index: '/twoMenu',
                    title: '服务成果',
                    open:0,
                    open1:0
                },
                {
                     icon: 'el-icon-s-custom',
                    index: '/Data',
                    title: '网站数据',
                    open:0,
                },
                 {
                     icon: 'el-icon-s-custom',
                    index: '2',
                    title: '知识服务',
                    open:0,
                    open1:1
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
  margin-bottom: 0px !important;
}

.el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
}
.el-submenu__title {
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height:40px
}
.el-submenu .el-menu-item {
    height: 40px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 200px;
}

</style>