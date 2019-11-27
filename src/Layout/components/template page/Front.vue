<!-- 
 * @description: 
 * @fileName: Front.vue 
 * @author: 旋展峰 
 * @date: 2019-11-27 20:56:52 
 * @后台人员:
 * @version: V1.0.5 
!-->
<template>
  <el-container>
    <el-header>
      <header-synergy ></header-synergy>
    </el-header>
    <el-main>
        <home></home>
    </el-main>
    <el-footer>
      <footer-synergy></footer-synergy>
    </el-footer>
  </el-container>
</template>

<script>
import headerSynergy from "../modules/Header";
import home from '../../../views/Home/Home';
import footerSynergy from "../modules/Footer";

export default {
  name: "front",
  components: {
    "header-synergy": headerSynergy,
    "home":home,
    "footer-synergy": footerSynergy
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