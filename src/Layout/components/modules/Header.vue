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
        <!-- <ul>
          <li>首页</li>
          <li>招标预告</li>
          <li>招标公告</li>
          <li>中标公告</li>
        </ul> -->
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
          drawer:false
      }
  },
  components:{
      'navigation':navigation,
      'admin-menu':adminMenu
  },
  methods:{
    
      openMenu(){
           this.drawer=true
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
    z-index:2002;
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