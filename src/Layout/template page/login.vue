<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @click="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      param: {
        username: "admin",
        password: "123123"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          var menuList;
          if (this.param.username == "admin") {
            this.$message.success("管理员登录成功");
            this.$store.commit("SET_TOKEN", true);
            this.$store.commit("GET_USER", this.username);
            localStorage.setItem("ms_username", this.param.username);
            menuList = [
              {
                menuName: "协同管理",
                children: [
                  {
                    menuName: "新增任务",
                    code: "newTask",
                    icon: "#hhtxdrxx04"
                  },
                  {
                    menuName: "查看所有主任务",
                    code: "mainStaskShow",
                    icon: "#hhtxbaogao"
                  },
                  {
                    menuName: "查看所有主任务",
                    code: "mainStaskShow",
                    icon: "#hhtxbaogao"
                  },
                  {
                    menuName: "人员管理",
                    code: "newStaff",
                    icon: "#hhtxbaogao"
                  }
                ]
              }
            ];
            this.$store.commit("SET_List", menuList);
            this.$router.push("/Dashboard");
          } else if (this.param.username == "supplier") {
            this.$message.success("管理员登录成功");
            this.$store.commit("SET_TOKEN", true);
            this.$store.commit("GET_USER", this.username);
          } else if (this.param.username == "desinger") {
            this.$message.success("管理员登录成功");
            this.$store.commit("SET_TOKEN", true);
            this.$store.commsit("GET_USER", this.username);
          } else if (this.param.username == "company") {
            this.$message.success("管理员登录成功");
            this.$store.commit("SET_TOKEN", true);
            this.$store.commit("GET_USER", this.username);
          } else if (this.param.username == "circulation") {
            this.$message.success("管理员登录成功");
            this.$store.commit("SET_TOKEN", true);
            this.$store.commit("GET_USER", this.username);
          }
        } else {
          this.$message.error("请输入账号和密码");
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/login/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>