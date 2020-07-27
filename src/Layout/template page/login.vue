<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password" @click="submitForm()">
            <el-button slot="prepend" icon="el-icon-unlock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
      </el-form>
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
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      roleID: "",
    };
  },
  created() {
    this.getRoleId();
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          var menuList;
          var that = this;
          var data = Qs.stringify({
            userName: this.param.username,
            password: this.param.password,
          });
          let config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          that
            .axios({
              method: "post",
              url: "/api/users/login",
              data: data,
            })
            .then((response) => {
              if (response.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "登陆成功",
                });
                this.$store.commit("SET_TOKEN", true);
                this.$store.commit("GET_USER", this.param.username);
                localStorage.setItem("ms_username", this.param.username);
                localStorage.setItem("designer_name", this.param.username);
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
                // console.log(response)
                this.roleID = response.data.allData.roleId;

                console.log(this.roleID);
                //this.param.roleID = response.data.allData.roleId;
                // console.log(localStorage.getItem("ms_username"));
                // console.log("有用户名的！！！")

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
          // if (this.param.username == "admin") {
          //   this.$message.success("管理员登录成功");
          //   this.$store.commit("SET_TOKEN", true);
          //   this.$store.commit("GET_USER", this.username);
          //   localStorage.setItem("ms_username", this.param.username);
          //   menuList = [
          //     {
          //       icon: "el-icon-postcard",
          //       index: "2",
          //       title: "企业信息管理",
          //       subs: [
          //         {
          //           index: "/admin/companyDetail",
          //           title: "企业信息详情"
          //         },
          //         {
          //           index: "/admin/supplyBussess",
          //           title: "企业名录"
          //         }
          //       ]
          //     },
          //     {
          //       icon: "el-icon-edit-outline",
          //       index: "3",
          //       title: "协同管理",
          //       subs: [
          //         {
          //           index: "/admin/newTask",
          //           title: "新增任务",
          //           meta: {
          //             title: "新增任务"
          //           }
          //         },
          //         {
          //           index: "/admin/mainStaskShow",
          //           title: "查看详情"
          //         }
          //       ]
          //     },
          //     {
          //       icon: "el-icon-tickets",
          //       index: "4",
          //       title: "任务管理",
          //       subs: [
          //         {
          //           index: "/admin/designTask",
          //           title: "设计任务"
          //         },
          //         {
          //           index: "/admin/circulationTask",
          //           title: "流通任务"
          //         }
          //       ]
          //     }
          //   ];
          //   this.$store.commit("SET_List", menuList);
          //   this.$router.push("/admin/dashboard");
          // } else if (this.param.username == "supplier") {
          //   this.$message.success("管理员登录成功");
          //   this.$store.commit("SET_TOKEN", true);
          //   this.$store.commit("GET_USER", this.username);
          //   menuList = [];
          //   this.$store.commit("SET_List", menuList);
          //   this.$router.push("/admin/dashboard");
          // } else if (this.param.username == "desinger") {
          //   this.$message.success("管理员登录成功");
          //   this.$store.commit("SET_TOKEN", true);
          //   this.$store.commsit("GET_USER", this.username);
          //   menuList = [];
          //   this.$store.commit("SET_List", menuList);
          //   this.$router.push("/admin/dashboard");
          // } else if (this.param.username == "company") {
          //   this.$message.success("管理员登录成功");
          //   this.$store.commit("SET_TOKEN", true);
          //   this.$store.commit("GET_USER", this.username);
          //   menuList = [];
          //   this.$store.commit("SET_List", menuList);
          //   this.$router.push("/admin/dashboard");
          // } else if (this.param.username == "circulation") {
          //   this.$message.success("管理员登录成功");
          //   this.$store.commit("SET_TOKEN", true);
          //   this.$store.commit("GET_USER", this.username);
          //   menuList = [];
          //   this.$store.commit("SET_List", menuList);
          //   this.$router.push("/admin/dashboard");
          // }
        } else {
          this.$message.error("请输入账号和密码");
          console.log("error submit!!");
          return false;
        }
      });
    },
    // getRoleId(){
    //   var that = this;
    //   var data = Qs.stringify({

    //     userName: this.param.username
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "/api/users//findroleId",
    //       data: data
    //     })
    //     .then(response => {
    //       this.roleID = response.data.allData;
    //       console.log(roleID)
    //       //  if(this.roleID==4)
    //       //       {
    //       //           this.$router.push("/admin/designerNewList");
    //       //       }else{
    //       //          this.$router.push("/admin/dashboard");
    //       //       }

    //     });
    // },
  },
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