<template>
  <div class="admin-header">
    <el-row class="header-message">
      <div style="width: 350px;height: 30px;float: right;">
        <ul v-if="log==token">
          <li>
            <el-popover placement="bottom" trigger="hover">
              <el-row>
                <el-col :span="10" class="user-avator">
                  <img :src="this.$store.state.userLogo" />
                </el-col>
                <el-col :span="10" style="float:right;">
                  <div class="user-option">
                    <a @click="logout(0)">退出登录</a>
                    <el-divider></el-divider>
                    <a @click="logout(1)">后台中心</a>
                    <el-divider></el-divider>
                    <a @click="getUserDetail">账号管理</a>
                  </div>
                </el-col>
              </el-row>
              <span slot="reference">{{this.reallyName}}</span>
              <!-- <span slot="reference">账号管理</span> -->
            </el-popover>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a @click="login(0)">登录</a>
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
    </el-row>
    <!-- 区域 拉开层次 -->
    <el-row :gutter="20" class="header" style="height:90px;">
      <el-col :span="10" :offset="1">
        <div class="logo">
          <a href="http://www.hccstc.cn/home/index" target="_blank">
            <img style="width:100%;" src="../../../../assets/images/home/logo2.png" />
          </a>
        </div>
      </el-col>
      <!-- 搜索-->
      <el-col :span="9" :offset="4" style="padding-top:15px;" class="search">
        <el-input
          placeholder="请输入内容"
          v-model="searchModel"
          @keyup.enter.native="searchResult()"
          style="width:500px;"
          type="text"
          name="username"
          autocomplete="off" 
          clearable
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="成果" value="1"></el-option>
            <el-option label="企业" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchResult()"></el-button>
        </el-input>
      <el-input type="password" autocomplete="new-password" style="display: none">
        </el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="height: 45px;">
        <div style="background-color:#00A2E6">
          <navigation></navigation>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="userDetail"
      :close-on-click-modal="false"
      @close="userDetail=false"
      class="info"
    >
      <el-container style="width:50%;height:100%;background-color:#f5f5f5;float:left;">
        <el-header>
          <br>

                  <div
        class="biaoti"
        style="padding: 0 15px;  font-size:18px"

      >
       账号管理
      </div>

        </el-header>
        
        <el-aside style="width:100%;text-align:center;margin-top: 150px;">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :data="updateData()"
            accept=".jpg, .png"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="userInfo.userLogo" :src="userInfo.userLogo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <h3 style="margin:10px 0px;font-size:20px;">{{userInfo.userName}}</h3>
          <span>{{userInfo.email}}</span>
        </el-aside>
        <el-row style="text-align:center;margin-top:34px;">
          <el-col :span="8" :offset="4">
            <el-button icon="el-icon-edit-outline" @click="updataUserDetail=true">修改信息</el-button>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-edit" @click="updataPassword=true">修改密码</el-button>
          </el-col>
        </el-row>
      </el-container>
      <el-container style="width:50%;padding-left: 10px;padding-right: 10px;">
        <el-header>
          <div style="margin:5px 5px;"></div>
        </el-header>
        <el-row class="Detail">
          <el-container>
            <el-main>
              <h2 style="font-size:18px;">
                {{personalDetail.parent}}
                <i class="el-icon-user"></i>
              </h2>
              <el-divider></el-divider>
              <div>
                <ul>
                  <li v-for="(item,index) in personalDetail.children" :key="index">
                    <el-row>
                      <el-col :span="8">
                        <i class="el-icon-notebook-2" style="margin-right:10px;"></i>
                        {{item.name}}
                      </el-col>
                      <el-col :span="14">{{item.value}}</el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </el-main>
          </el-container>
        </el-row>

        <el-row class="Detail" style="margin-top:20px;">
          <el-container>
            <el-main style="overflow: hidden;">
              <h2 style="font-size:18px;">
                {{detail.parent}}
                <i class="el-icon-postcard"></i>
              </h2>
              <el-divider></el-divider>
              <div>
                <ul>
                  <li v-for="(item,index) in detail.children" :key="index">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <i :class="item.icon" style="margin-right:10px;"></i>
                        {{item.name}}
                      </el-col>
                      <el-col :span="14">{{item.value}}</el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </el-main>
          </el-container>
        </el-row>
      </el-container>
    </el-dialog>

    <el-dialog
      :visible.sync="updataPassword"
      :close-on-click-modal="false"
      top="20vh"
      class="updata"
      @close="closeDialog"
      width="450px"
    >
      <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5;margin-top:-10px"
      >
       修改密码
      </div>
      <br>
      <div style="text-align:center;">
        <el-form
          :model="account"
          status-icon
          :rules="rules"
          ref="account"
          label-width="70px"
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
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('account')" :disabled="checkMessage" >提交</el-button>
        <el-button @click="resetForm('account')">重置</el-button>
      </div>
    </el-dialog>
    <el-dialog
      
      :visible.sync="updataUserDetail"
      :close-on-click-modal="false"
      class="updata"
      top="20vh"
      @close="updataUserDetail=false"
      width="450px"
    >
          <div
          class="biaoti"
        style="padding: 0px 10px;  border-left: 3px solid #4e58c5; margin-top:-10px"
      >
        修改信息
      </div>
      <br>
      <br>
      <br>
      <el-form
        :model="user"
        status-icon
        :rules="userRules"
        ref="user"
        label-width="70px"
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
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="user.realName"></el-input>
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
    };
    return {
      reallyName:'账号',
      log: true,
      collapse: false,
      serverUrl: "/api/users/updataPicture",
      searchModel: "",
      select: "0",
      checkMessage: true,
      updataPassword: false, //弹出框修改账号信息
      userDetail: false, //用户信息弹框
      updataUserDetail: false, //用户信息修改弹框
      icon: "el-icon-edit",
      userInfo: {},
      personalDetail: {}, //右上角
      detail: {}, //有下角
      account: {
        oldPassword: "",
        newPassword: "",
        checkPass: "",
        userId: this.$store.state.userId,
      },
      user: {
        email: "",
        phone: "",
        realName: "",
        userLogo: "",
      },
      userRules: {
        phone: [{ required: true, validator: validDataPhone, trigger: "blur" }],
      },
      rules: {
        //oldPassword: [{ validator: validatePass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  components: {
    navigation,
  },
  computed:{
    token(){
      return this.$store.state.token;
    },
    username(){
      return this.$store.state.user;
    }
  },
  created(){
    //获得真实姓名
    this.getrealName();
  },
  methods: {
    getrealName(){
      let that = this;
      let data = Qs.stringify({
        userName: this.username,
      });

      that
        .axios({
          method: "post",
          url: "/api/users/getUserDetail",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.userInfo = response.data.allData.userDetail;
          // this.personalDetail = response.data.allData.personalDetail;
          // this.detail = response.data.allData.detail;
          // this.user.email = this.userInfo.email;
          // this.user.phone = this.userInfo.phone;
          // this.user.realName = this.userInfo.realName;
          // console.log(this.userInfo.realName)
          console.log(this.userInfo.roleName)
          console.log("无")
          let r = JSON.stringify(this.userInfo.roleName);
          if(this.userInfo.roleName!=""){
            this.reallyName=this.userInfo.roleName;
          }else if(this.userInfo.roleName ===""){
             this.reallyName=this.username;
          }
          if(this.userInfo.roleName=="无"){
              this.reallyName=this.username;
          }
          console.log(reallyName);
        });
    },
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
          message: "登出成功",
        });
        this.$router.push("/home");
      } else {
        let roleId = sessionStorage.getItem("roleId");
        console.log(roleId);
        if (roleId == 4) {
          this.$router.push("/admin/designerNewList");
        } else if (roleId == 2) {
          this.$router.push("/admin/mainStaskShow");
        } else if (roleId == 3) {
          this.$router.push("/admin/designTaskq");
        } else if (roleId == 6) {
          this.$router.push("/admin/mainStaskShow");
        } else {
          this.$router.push("/admin/dashboard");
        }
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
        userName: this.username,
      });
      console.log(this.username)
      that
        .axios({
          method: "post",
          url: "/api/users/getUserDetail",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.userInfo = response.data.allData.userDetail;
          this.personalDetail = response.data.allData.personalDetail;
          this.detail = response.data.allData.detail;
          this.user.email = this.userInfo.email;
          this.user.phone = this.userInfo.phone;
          this.user.realName = this.userInfo.realName;
          this.userDetail = true;
        });
    },
    //搜索
    searchResult() {
      this.$router.push({
        path: "/search",
        query: {
          keyWords: this.searchModel,
          type: this.select,
        },
      });
      this.searchModel = "";
    },
    //向后台检验原来输入的密码是否正确
    checkOldPassword() {
      let that = this;
      var data = Qs.stringify({
        userName: this.username,
        password: this.account.oldPassword,
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
            this.icon = "el-icon-check";
            this.checkMessage = false;
          } else {
            this.icon = "el-icon-close";
            this.$message({
              type: "warning",
              message: "原密码输入错误!",
            });
            this.checkMessage = true;
          }
        });
    },
    updateData() {
      let data = { userName: this.username };
      return data;
    },
    handleAvatarSuccess(res, file) {
      this.userInfo.userLogo = URL.createObjectURL(file.raw);
      this.$message("修改成功");
      this.$store.commit("SET_USERLOGO", this.userInfo.userLogo);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改密码
          let that = this;
          var data = Qs.stringify({
            userName: this.username,
            password: this.account.newPassword,
          });
          that
            .axios({
              method: "post",
              url: "/api/users/updatePassword",
              data: data,
            })
            .then((response) => {
              this.$message({
                type: "success",
                message: "修改密码成功",
              });
              this.resetForm("account");
              this.updataPassword = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入正确有效的信息",
          });
        }
      });
    },
    submitUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //账户信息
          let that = this;
          var data = Qs.stringify({
            userName: this.username,
            email: this.user.email,
            phone: this.user.phone,
            realName: this.user.realName,
          });
          that
            .axios({
              method: "post",
              url: "/api/users/updataUserDetail",
              data: data,
            })
            .then((response) => {
              this.$message({
                type: "success",
                message: "修改账户信息成功",
              });
              this.getUserDetail();
              this.updataUserDetail = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入正确有效的信息",
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
    },
  },
};
</script>

<style >
.admin-header .el-row {
  margin-left: 0px !important;
}
.admin-header .el-dialog__footer{
     margin-top: -30px;
}
.updata .el-dialog__body{
      padding: 30px 20px;
}
/* .admin-header{
  width:100%;
} */
.admin-header .el-select .el-input {
  width: 100px;
}
.admin-header .el-dialog {
  width: 800px;
  height: 600px;
}
.info .el-dialog__body {
  height: 100%;
  padding: 0px 0px;
}
.info .el-dialog__header {
  padding: 0px 0px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.admin-header ul li {
  float: left;
  margin-left: 15px;
}
.admin-header .Detail ul li {
  float: none;
  margin-top: 10px;
}
.admin-header .Detail .el-divider--horizontal {
  margin-top: 10px;
  margin-bottom: 24px;
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
  font-size: 16px;
  font-weight: 400;
}
.user-detail span {
  font-size: 16px;
  /* float: left; */
}
.updata .el-dialog {
  height: 395px;
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
.admin-header .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  width: 115px;
  height: 115px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.admin-header .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.admin-header .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 120px;
  text-align: center;
}
.admin-header .avatar {
  width: 115px;
  height: 115px;
  display: block;
}
</style>

<style lang="scss">

.admin-header {
  .el-select .el-input .el-select__caret {
    color: white;
    font-size: 14px;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
    cursor: pointer;
  }
  .el-input-group__append button.el-button,
  .el-input-group__append div.el-select .el-input__inner,
  .el-input-group__append div.el-select:hover .el-input__inner,
  .el-input-group__prepend button.el-button,
  .el-input-group__prepend div.el-select .el-input__inner,
  .el-input-group__prepend div.el-select:hover .el-input__inner {
    border-color: #ff7720;
    background-color: #ff7720;
    /* color: inherit; */
    // der-top: 0;
    border-bottom: 0;
  }
  .search .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #ff7720;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // color: #f4f6f8;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    // padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #f5f7fa;
    color: white;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  
}
</style>