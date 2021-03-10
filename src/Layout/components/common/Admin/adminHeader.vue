<template>
  <div class="admin-header">
    <el-row class="header-message" :gutter="20">
      <el-col :span="10" :offset="1">
        <!-- <div class="collapse-btn" @click="collapseChage">
          <i v-if="!collapse" class="el-icon-s-fold"></i>
          <i v-else class="el-icon-s-unfold"></i>
        </div>-->
        <span>欢迎访问高端装备制造领域的科技服务SaaS应用构建以及示范!</span>
      </el-col>
      <el-col :span="8" :offset="2">
        <ul v-if="log">
          <li>
            <el-popover placement="bottom" trigger="hover">
              <div class="user-avator">
                <img src="../../../../assets/img/img.jpg" />
              </div>
              <div>
                <a>退出登录</a>
                <a>返回首页</a>
                <a>账号管理</a>
              </div>
              <span slot="reference">欢迎{{username}}!</span>
            </el-popover>
          </li>
          <li>
            <a>我的后台</a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a>登录</a>
          </li>
          <li>
            <a>|</a>
          </li>
          <li>
            <a>注册</a>
          </li>
        </ul>
        <ul style="float:right;">
          <li>联系客服</li>
          <li>|</li>
          <li>关于我们</li>
          <li>|</li>
          <li>帮助中心</li>
        </ul>
      </el-col>
    </el-row>
    <!-- 区域 拉开层次 -->
    <el-row :gutter="20" class="header" style="height:60px;background-color:#242f42;">
      <el-col :span="8" :offset="1">
        <div class="logo">面向高端装备制造领域的科技服务 SaaS 应用</div>
      </el-col>
      <el-col :span="1" :offset="12">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../../../assets/img/img.jpg" />
        </div>
      </el-col>
      <el-col :span="2">
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="returnHome">返回首页</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  name: "adminpage",
  data() {
    return {
      log: this.$store.state.token,
      collapse: false,
      username: "admin"
    };
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>

<style scoped>
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
  background-color: #242f42;
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
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
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