<template>
  <div class="admin-header">
    <el-row class="header-message" :gutter="20">
      <el-col :span="8" :offset="1">
        <!-- <span>欢迎访问高端装备制造领域的科技服务SaaS应用构建以及示范!</span> -->
      </el-col>
      <el-col :span="6" :offset="3" style="float:right;">
        <div>
          <ul v-if="log==token">
            <li>
              <el-popover placement="bottom" trigger="hover">
                <el-row>
                  <el-col :span="10" class="user-avator">
                    <img src="../../../../assets/img/img.jpg" />
                  </el-col>
                  <el-col :span="10" style="float:right;">
                    <div class="user-option">
                        <a @click="logout(0)">退出登陆</a>
                         <el-divider></el-divider>
                 <a @click="logout(1)">返回首页</a>
                      <el-divider></el-divider>
                        <a>账号管理</a>
                    </div>
                  </el-col>
                </el-row>
                <span slot="reference">欢迎{{username}}!</span>
              </el-popover>
            </li>
          </ul>
          <ul v-else>
            <li>
              <a @click="login(0)">登陆</a>
            </li>
            <li>
              <a>|</a>
            </li>
            <li>
              <a @click="login(1)">注册</a>
            </li>
          </ul>
          <ul>
            <li>联系客服</li>
            <li>|</li>
            <li>关于我们</li>
            <li>|</li>
            <li>帮助中心</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <!-- 区域 拉开层次 -->
    <el-row :gutter="20" class="header" style="height:50px;">
      <el-col :span="10" :offset="1">
        <div class="logo">
          <img style="width:100%;" src="../../../../assets/images/home/logo3.png" />
        </div>
      </el-col>
      <!-- 用户名下拉菜单 -->
      <el-col :span="8" style="float:right;">
        <el-input placeholder="请输入内容" v-model="input" style="width:400px;">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="height: 60px;">
        <div style="background-color:#00A2E6">
          <navigation></navigation>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navigation from "./Navigation";

export default {
  name: "adminpage",
  data() {
    return {
      log: true,
      token:this.$store.state.token,
      collapse: false,
      username: this.$store.state.user,
      input: "",
      select: ""
    };
  },
  components: {
    navigation
  },
  methods: {
    /*
     *@description:登出功能函数
     *@modifyContent:
     *@author: 旋展峰
     *@date: 2020-01-14 08:34:47
     */
    logout(opinion) {
      if(opinion==0){
      this.$store.commit("LOGOUT");
      this.token=false;
      this.$message({
        type: "success",
        message: "登出成功"
      });
      this.$router.push("/home");
      }else{
      this.$router.push("/home");
      }

    },
    login(opinion){
      if(opinion==0){
              this.$router.push("/login");
      }else{
        this.$router.push("/register");
      }
    }
  }
};
</script>

<style>
.el-row {
  margin-left: 0px !important;
}
/* .admin-header{
  width:100%;
} */
.admin-header .el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.admin-header ul li {
  float: left;
  margin-left: 15px;
}
.header-message {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  margin-left: 0px;
  color: #888;
  font-size: 13px;
  line-height: 32px;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  line-height: 70px;
}
/* .collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
} */
.header .logo {
  float: left;
  line-height: 70px;
  color: #fff;
  margin-top: 15px;
  height: 50px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-option .el-divider--horizontal{
  margin:5px 0 !important;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  float: left;
}
.user-avator img {
  display: block;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>