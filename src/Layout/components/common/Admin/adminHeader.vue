<template>
  <div class="admin-header">
    <el-row
      class="header-message"
      style="width:100%;height:30px;background-color:#f3f3f3;"
      :gutter="20"
    >
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
                <a>退出登陆</a>
                <a>返回首页</a>
                <a>账号管理</a>
              </div>
              <span slot="reference">欢迎{{this.$store.state.user}}!</span>
            </el-popover>
          </li>
          <li>
            <a>我的后台</a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a>登陆</a>
          </li>
          <li>
            <a>|</a>
          </li>
          <li>
            <a>注册</a>
          </li>
        </ul>
        <ul>
          <li>联系客服</li>
          <li>|</li>
          <li>关于我们</li>
          <li>|</li>
          <li>帮助中心</li>
        </ul>
      </el-col>
    </el-row>
    <!-- 红色区域 拉开层次 -->
    <el-row :gutter="20" style="height:60px;background-color:#242f42;">
      <el-col :span="5" :offset="1"></el-col>
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
      collapse: false
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
  color: #888;
  font-size: 13px;
  line-height: 32px;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>