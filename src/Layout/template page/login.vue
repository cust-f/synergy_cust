<template>
  <div class="login">
    <div class="login-box">
      <div class="top">
        <div class="logo">
          <a @click="goHome">
            <img style="width: 410px" src="~@/assets/img/login-logo.png" alt />
          </a>
        </div>
      </div>
      <div class="mid">
        <el-form
          :model="param"
          :rules="rules"
          ref="login"
          @keyup.enter.native="submitForm()"
          status-icon
        >
          <el-form-item prop="userName">
            <el-input
              class="info"
              v-model="param.userName"
              placeholder="帐号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="info"
              v-model="param.password"
              type="password"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="captcha">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="dataForm.captcha"
                          placeholder="验证码">
                </el-input>
              </el-col>
              <el-col :span="10"
                      class="login-captcha">
                <img :src="captchaPath"
                     @click="getCaptcha()"
                     alt="">
              </el-col>
            </el-row>
          </el-form-item>-->
          <el-form-item>
            <div class="item-btn">
              <input type="button" value="登录" @click="submitForm()" />
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="bottom">
        Copyright @ 2008 长春理工大学日立项目组 |
        地址：中国吉林省长春市卫星路7186号(南)
      </div>
    </div>
  </div>
</template>


<script>
import Qs from "qs";

export default {
  name: "login",
  data: function () {
    return {
      param: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      roleID: "",
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          var menuList;
          var that = this;
          var data = Qs.stringify({
            userName: this.param.userName,
            password: this.param.password,
          });
          that
            .axios({
              method: "post",
              url: "/api/users/login",
              data: data,
            })
            .then((response) => {
              console.log(response);
              if (response.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "登陆成功",
                });
                
                console.log(
                  "========================================================================"
                );
                this.$store.commit("SET_TOKEN", true);
                this.$store.commit("SET_USER", this.param.userName);
                this.$store.commit(
                  "SET_USER_ID",
                  response.data.allData.userId.userId
                );
                sessionStorage.setItem("ms_username", this.param.userName);
                sessionStorage.setItem("designer_name", this.param.userName);
                sessionStorage.setItem(
                  "userId",
                  response.data.allData.userId.userId
                );

                this.$store.commit(
                  "SET_List",
                  response.data.allData.data.menuList
                );
                this.$store.commit(
                  "SET_OPENMENU",
                  response.data.allData.openArray
                );
                this.$store.commit(
                  "SET_USERLOGO",
                  response.data.allData.userLogo
                );
                this.roleID = response.data.allData.roleId;
                sessionStorage.setItem("roleId", this.roleID);

                if (this.roleID === 4) {
                  this.$router.push("/admin/designerNewList");
                } else if (this.roleID === 2) {
                  this.$router.push("/admin/mainStaskShow");
                } else if (this.roleID === 3) {
                  this.$router.push("/admin/designTaskq");
                } else if (this.roleID === 6) {
                  this.$router.push("/admin/mainStaskShow");
                } else this.$router.push("/admin/dashboard");
              } else {
                this.$message({
                  type: "warning",
                  message: "登陆失败",
                });
              }
            });
        } else {
          this.$message.error("请输入账号和密码");
          return false;
        }
      });
    },
    goHome() {
      this.$router.push({
        path: "/home",
      });
    },
  },
};
</script>


<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url(~@/assets/img/login-bg.png) no-repeat;
  background-size: cover;
  position: fixed;
}
.login .login-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  padding-top: 10%;
  width: 410px;
}
.login .login-box .top {
  margin-bottom: 30px;
  text-align: center;
}
.login .login-box .top .logo {
  font-size: 0;
}
.login .login-box .top .company {
  font-size: 16px;
  margin-top: 10px;
}
.login .login-box .mid {
  font-size: 14px;
}
.login .login-box .mid .item-btn {
  margin-top: 20px;
}
.login .login-box .mid .item-btn input {
  border: 0;
  width: 100%;
  height: 40px;
  box-shadow: 0;
  background: #1f87e8;
  color: #fff;
  border-radius: 3px;
}
.info {
  // width: 410px;
}
.login-captcha {
  height: 40px;
}
.login .login-box .bottom {
  position: absolute;
  bottom: 10%;
  width: 100%;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
