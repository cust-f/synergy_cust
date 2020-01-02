<!-- 
 * @description: 前台页面布局
 * @fileName: Front.vue 
 * @author: 旋展峰 
 * @date: 2019-11-27 20:56:52 
 * @后台人员:
 * @version: V1.0.5 
!-->
<template>
  <el-container>
    <el-header style="z-index:9999">
      <header-synergy ></header-synergy>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
    <el-footer>
      <footer-synergy></footer-synergy>
    </el-footer>
  </el-container>
</template>

<script>
import headerSynergy from "../components/modules/Header";
import footerSynergy from "../components/modules/Footer";

export default {
  name: "front",
  components: {
    "header-synergy": headerSynergy,//页头
    "footer-synergy": footerSynergy//页尾
  },
  data(){
      return{

      }
  },
  methods:{
  }
};
</script>

<style>
/*
 *@description: 页面整体布局
 *@author: 旋展峰 
 *@date: 2019-11-30 14:28:16
*/
.el-container {
  margin: 0px;
  padding: 0px;
}
.el-header {
  margin: 0px;
  padding: 0px;
  height:100px !important;
}
.el-main {
  margin: 0px;
  padding: 0px;
}
.el-footer {
  margin: 0px;
  padding: 0px;
}
</style>