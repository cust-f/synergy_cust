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
                      <a @click="getUserDetail">账号管理</a>
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
    <el-dialog
      title="用户信息"
      :visible.sync="userDetail"
      :close-on-click-modal="false"
      @close="userDetail=false"
    >
      <div class="user-detail">
        <el-row>
          <el-col :span="3" :offset="6">
            <span class="titles">所属公司</span>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>{{userInfo.companyName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="6">
            <span class="titles">用户名</span>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>{{userInfo.userName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="6">
            <span class="titles">姓名</span>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>{{userInfo.realName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="6">
            <span class="titles">角色</span>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>{{userInfo.roleName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="6">
            <span class="titles">邮箱</span>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>{{userInfo.email}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="6">
            <span class="titles">电话</span>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>{{userInfo.phone}}</span>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="updataUserDetail=true">修改账户信息</el-button>
        <el-button @click="updataPassword=true" type="primary">修改密码</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="updataPassword"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-form
        :model="account"
        status-icon
        :rules="rules"
        ref="account"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input disabled v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="password">
          <el-input
            @blur="checkOldPassword"
            type="password"
            v-model="account.oldPassword"
            autocomplete="off"
            :suffix-icon="icon"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="account.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="account.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('account')" :disabled="checkMessage">提交</el-button>
        <el-button @click="resetForm('account')">重置</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改账户信息"
      :visible.sync="updataUserDetail"
      :close-on-click-modal="false"
      @close="updataUserDetail=false"
    >
      <el-form
        :model="user"
        status-icon
        :rules="userRules"
        ref="user"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUser('user')">提交</el-button>
        <!-- <el-button @click="resetForm('user')">重置</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import navigation from "./Navigation";
import Qs from "qs";

export default {
  name: "adminpage",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value == this.account.oldPassword) {
        callback(new Error("跟原始密码重复"));
      } else {
        if (this.account.checkPass !== "") {
          this.$refs.account.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.account.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
  var validDataPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写手机号码"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        // this.$error("手机号码有误，请重填");
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
      }
    return {
      log: true,
      token: this.$store.state.token,
      collapse: false,
      username: localStorage.getItem("ms_username"),
      input: "",
      select: "",
      checkMessage: true,
      updataPassword: false, //弹出框修改账号信息
      userDetail: false, //用户信息弹框
      updataUserDetail: false, //用户信息修改弹框
      icon: "el-icon-edit",
      userInfo: {},
      account: {
        oldPassword: "",
        newPassword: "",
        checkPass: "",
        userId: this.$store.state.userId
      },
      user: {
        email: "",
        phone: ""
      },
      userRules:{
        phone: [{ required: true, validator: validDataPhone, trigger: "blur" }]
      },
      rules: {
        //oldPassword: [{ validator: validatePass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
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
      if (opinion == 0) {
        this.$store.commit("LOGOUT");
        this.token = false;
        this.$message({
          type: "success",
          message: "登出成功"
        });
        this.$router.push("/home");
      } else {
        this.$router.push("/home");
      }
    },
    login(opinion) {
      if (opinion == 0) {
        this.$router.push("/login");
      } else {
        this.$router.push("/register");
      }
    },
    getUserDetail() {
      let that = this;
      let data = Qs.stringify({
        userName: this.username
      });
      that
        .axios({
          method: "post",
          url: "/api/users/getUserDetail",
          data: data
        })
        .then(response => {
          this.userInfo = response.data.allData.userDetail;
          this.user.email = this.userInfo.email;
          this.user.phone = this.userInfo.phone;
          this.userDetail = true;
        });
    },
    //向后台检验原来输入的密码是否正确
    checkOldPassword() {
      let that = this;
      var data = Qs.stringify({
        userName: this.username,
        password: this.account.oldPassword
      });
      that
        .axios({
          method: "post",
          url: "/api/users/login",
          data: data
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.icon = "el-icon-check";
            this.checkMessage = false;
          } else {
            this.icon = "el-icon-close";
            this.$message({
              type: "warning",
              message: "原密码输入错误!"
            });
            this.checkMessage = true;
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改密码
          let that = this;
          var data = Qs.stringify({
            userName: this.username,
            password: this.account.newPassword
          });
          that
            .axios({
              method: "post",
              url: "/api/users/updatePassword",
              data: data
            })
            .then(response => {
              this.$message({
                type: "success",
                message: "修改密码成功"
              });
              this.resetForm("account");
              this.updataPassword = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入正确有效的信息"
          });
        }
      });
    },
    submitUser(formName) {

      this.$refs[formName].validate(valid => {
        if (valid) {
          //账户信息
          let that = this;
          var data = Qs.stringify({
            userName: this.username,
            email: this.user.email,
            phone: this.user.phone
          });
          that
            .axios({
              method: "post",
              url: "/api/users/updataUserDetail",
              data: data
            })
            .then(response => {
              this.$message({
                type: "success",
                message: "修改账户信息成功"
              });
              this.getUserDetail();
              this.updataUserDetail = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入正确有效的信息"
          });
        }
      });
    },
    resetForm(fromName) {
      this.account.oldPassword = null;
      this.icon = "el-icon-edit";
      this.$refs[fromName].resetFields();
    },
    closeDialog() {
      this.resetForm("account");
      this.updataPassword = false;
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
.user-detail {
  margin: 0 auto;
  /* text-align: center; */
  /* float: left; */
}
.user-detail .titles {
  font-size: 20px;
  font-weight: 400;
}
.user-detail span {
  font-size: 16px;
  /* float: left; */
}
.user-detail .el-row {
  margin-bottom: 20px;
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
.user-option .el-divider--horizontal {
  margin: 5px 0 !important;
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