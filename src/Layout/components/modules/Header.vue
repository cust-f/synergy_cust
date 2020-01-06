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
      <el-col :span="2" class="logo">
        <img src="../../../assets/logo.png" />
      </el-col>
      <el-col :span="2" class="logo-detail">
        <span>协同设计</span>
      </el-col>
      <el-col :span="8" class="navigation">
        <navigation></navigation>
      </el-col>
      <el-col :offset="6" :span="4" class="function">
        <el-input
          v-show="log"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="input"
          @focus="openMenu"
          width="30%"
          class="input"
        ></el-input>
        <admin-menu :drawer="drawer" @dialogClose="Close()"></admin-menu>
      </el-col>
      <el-col style="float:right;line-height: 78px;" :span="1">
        <span @click="logIn">{{log?"登出":"登陆"}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navigation from "./Navigation";
import adminMenu from "../../../views/admin/adminMenu";

export default {
  name: "headerSynergy",
  data() {
    return {
      drawer: false, //抽屉开关
      input: "",
      log: this.$store.state.token
    };
  },
  components: {
    navigation: navigation,
    "admin-menu": adminMenu
  },
  created() {
    // this.verifyLog();
  },
  methods: {
    /*
     *@description:判断是否登陆
     *@modifyContent:
     *@author: 旋展峰
     *@date: 2020-01-06 10:19:57
     */
    // verifyLog() {
    //   this.log =
    // },
    logIn() {
      if (this.log) {
        this.$message.success("已登出");
        this.$store.commit("LOGOUT");
        this.log = false;
        console.log(this.$store.state.token);
      } else {
        console.log(this.log);
        this.$router.push({
          path: "/login"
        });
      }
    },
    /*
     *@description:账户管理点击事件
     *@modifyContent:抽屉关闭与打开的数据双向绑定
     *@author: 旋展峰
     *@date: 2019-11-30 14:33:11
     */
    openMenu() {
      this.drawer = !this.drawer;
    },
    Close() {
      this.drawer = false;
    }
  }
};
</script>

<style scoped>
.header {
  background-image: url("@/../../../../assets/header.png");
  color: aliceblue;
  z-index: 9999;
}
.logo {
  margin-left: 20px;
}
.logo-detail {
  font-size: 25px;
  font-weight: 800;
  margin-top: 25px;
}
.navigation ul li {
  margin-top: 50px;
  float: left;
  list-style: none;
  margin-right: 20px;
}
.function ul li {
  float: left;
  list-style: none;
  margin-right: 10px;
  margin-top: 50px;
}
.input {
  margin-top: 20px;
}
</style>