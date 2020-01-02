<!-- 
 * @description: 导航栏
 * @fileName: Navigation.vue 
 * @author: 旋展峰 
 * @date: 2019-11-30 14:29:42 
 * @后台人员:  
 * @path:  
 * @version: V1.0.5 
!-->
<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    class="nav"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">招标预告</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
        <el-submenu index="3">
      <template slot="title">招标公告</template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
      </el-submenu>
    <el-menu-item index="4">中标公告</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    /*
     *@description:点击事件
     *@modifyContent:实现页面的转跳
     *@author: 旋展峰
     *@date: 2019-11-30 14:30:15
    */
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style >
/*
 *@description: 导航栏样式
 *@author: 旋展峰 
 *@date: 2019-11-30 14:31:23
*/
.nav {
  background: rgba(255, 255, 255, 0);
  margin-top:20px;
}
/*
 *@description: 覆盖ui框架样式
 *@author: 旋展峰 
 *@date: 2019-11-30 14:31:41
*/
.el-menu {
        background: rgba(7, 7, 10, 0);
}
.el-menu--horizontal>.el-menu-item.is-active{
            background: rgba(7, 7, 10, 0);
}
.el-menu.el-menu--horizontal {
  border: none;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active {
        background: rgba(7, 7, 10, 0);
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
        background: rgba(7, 7, 10, 0);
}
.el-menu--horizontal .el-menu--popup{
    padding:0px;
}
.el-menu--horizontal .el-menu--popup .el-menu-item:hover {
  background: rgba(255, 255, 255, 0.445);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 30px;
}
.el-menu--horizontal .el-menu--popup .el-menu-item.is-active {
  background: rgba(255, 255, 255, 0.445);
}
.el-menu--horizontal .el-menu--popup .el-menu-item {
  background: rgba(49, 163, 221, 0.7);
  color: #ffffff;
  padding-left: 20px;
  transition: padding 0.5s;
  -webkit-transition: padding 0.5s; /* Safari */
}
.el-menu--horizontal .el-menu--popup .el-menu-item .el-icon-arrow-right:hover {
  color: rgba(0, 0, 0, 0.8);
}
.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
        background: rgba(7, 7, 10, 0);
}

</style>