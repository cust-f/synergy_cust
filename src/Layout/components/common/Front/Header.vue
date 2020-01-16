<template>
  <div class="admin-header">
    <el-row class="header-message" :gutter="20">
      <el-col :span="7" :offset="1">
        <!-- <div class="collapse-btn" @click="collapseChage">
          <i v-if="!collapse" class="el-icon-s-fold"></i>
          <i v-else class="el-icon-s-unfold"></i>
        </div>-->
        <!-- <span>欢迎访问高端装备制造领域的科技服务SaaS应用构建以及示范!</span> -->
      </el-col>
      <el-col :span="10" :offset="2" :push="4" style="float:right;">
        <div>
          <ul v-if="log">
            <li>
              <el-popover placement="bottom" trigger="hover">
                <el-row>
                  <el-col :span="8" class="user-avator">
                    <img src="../../../../assets/img/img.jpg" />
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <el-row>
                        <a @click="logout">退出登陆</a>
                      </el-row>
                      <el-row>
              <router-link to="home" tag="a">返回首页</router-link>
                      </el-row>
                      <el-row>
                        <a>账号管理</a>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <span slot="reference">欢迎{{username}}!</span>
              </el-popover>
            </li>
          </ul>
          <ul v-else>
            <li>
            <router-link to="login" tag="a">登陆</router-link>
            </li>
            <li>
              <a>|</a>
            </li>
            <li>
             <router-link to="login" tag="a">注册</router-link>
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
        <div style="background-color:#FF8F12">
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
      log: this.$store.state.token,
      collapse: false,
      username: "admin",
      input: "",
      select: ""
    };
  },
  components: {
    navigation
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
    },
    /*
     *@description:登出功能函数
     *@modifyContent:
     *@author: 旋展峰
     *@date: 2020-01-14 08:34:47
     */
    logout() {
      this.$store.commit("LOGOUT");
      this.$message({
        type: "success",
        message: "登出成功"
      });
      this.$router.push("/home");
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>

<style>
.el-row {
  margin-left: 0px !important;
}
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
.user-name {
  margin-left: 10px;
}
.user-avator {
  float: left;
}
.user-avator img {
  display: block;
  width: 45px;
  height: 45px;
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