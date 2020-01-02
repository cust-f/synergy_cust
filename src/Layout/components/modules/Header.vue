<!-- 
 * @description: 
 * @fileName: Header.vue 
 * @author: 旋展峰 
 * @date: 2019-11-27 20:20:03 
 * @后台人员:  
 * @path:  
 * @version: V1.0.5 
!-->
<template>
  <div class="header">
    <el-row>
      <el-col  :span="2" class="logo">
        <img src="../../../assets/logo.png" />
      </el-col>
      <el-col :span="2" class="logo-detail">
                  <span>协同设计</span>
      </el-col>
      <el-col :span="8" class="navigation">
          <navigation></navigation>
      </el-col>
      <el-col :offset="4" :span="6" class="function">
        <ul>
          <li @click="openMenu()">账户管理</li>
          <admin-menu :drawer="drawer" @dialogClose="Close()"></admin-menu>
          <li>登陆</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navigation from './Navigation'
import adminMenu from '../../../views/admin/adminMenu'

export default {
  name: "headerSynergy",
  data(){
      return{
          drawer:false  //抽屉开关
      }
  },
  components:{
      'navigation':navigation,
      'admin-menu':adminMenu
  },
  methods:{
    /*
     *@description:账户管理点击事件
     *@modifyContent:抽屉关闭与打开的数据双向绑定
     *@author: 旋展峰
     *@date: 2019-11-30 14:33:11
    */
      openMenu(){
           this.drawer=!this.drawer;
      },
      Close(){
          this.drawer=false;
      }
  }
};
</script>

<style scoped>
.header {
  background-image: url("@/../../../../assets/header.png");
    color: aliceblue;
    z-index:9999;
}
.logo{
    margin-left:20px;
}
.logo-detail {
  font-size: 25px;
  font-weight:800;
  margin-top:25px;

}
.navigation ul li {
  margin-top:50px;
  float: left;
  list-style: none;
  margin-right: 20px;
}
.function ul li {
  float: left;
  list-style: none;
  margin-right: 10px;
    margin-top:50px;
}
</style>