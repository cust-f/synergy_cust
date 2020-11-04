<template>
  <div class="register">
    <el-steps class="steps" :active="active" finish-status="success">
      <el-step title="设置账号"></el-step>
      <el-step title="添加企业信息"></el-step>
      <el-step title="添加企业介绍详情"></el-step>
      <el-step title="相关图片上传"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="back" :disabled="first">上一步</el-button>
    <el-button style="margin-top: 12px;float:right;" @click="next">{{active==4?'提交':'下一步'}}</el-button>
    <div style="margin-top:15px;">
      <register-user
        v-show="active==0"
        ref="user"
        @accountSave="accountSave"
        :enterpriseName="this.companyName"
      ></register-user>
      <register-company
        v-show="active==1"
        ref="company"
        @companyFrom="companyFrom"
        @registerUserDe="registerUserDe"
      ></register-company>
      <register-editor ref="detail" @registerDetail="registerDetail" v-show="active==2"></register-editor>
      <register-picture
        v-show="active==3"
        ref="picture"
        @checkPicture="checkPicture"
        @register="register"
        :enterpriseName="this.companyName"
      ></register-picture>
    </div>
  </div>
</template>

<script>
import registerUser from "./components/registerUser";
import registerCompany from "./components/registerCompany";
import registerPicture from "./components/registerPicture";
import registerEditor from "./components/registerCompanyDetail";

import Qs from "qs";

export default {
  name: "register",
  data() {
    return {
      active: 0, //索引
      first: true, //上一步
      goOn: true, //判断是否符合标准下一步
      goOnCompany: false,
      check: false,
      companyName: ""
    };
  },
  components: {
    "register-user": registerUser,
    "register-company": registerCompany,
    "register-picture": registerPicture,
    "register-editor": registerEditor
  },
  methods: {
    next() {
      console.log(this.active);
      if (this.active == 0) {
        this.$refs.user.submitForm("account");
        if (this.goOn) {
          this.active++;
          this.first = false;
        }
      } else if (this.active == 1) {
        this.$refs.company.upLoad("form");
        if (this.goOnCompany) {
          this.active++;
          this.first = false;
        }
      } else if (this.active == 2) {
        this.active++;
        this.first = false;
      } else if (this.active == 3) {
        this.$refs.picture.submitUpload();
        if (this.check) {

        }
      }
    },
    back() {
      if (this.active == 1) {
        this.active--;
        this.first = true;
      } else if (this.active == 3) {
        this.active--;
        this.first = false;
      }else{
        this.active--;
      }
    },
    /*
     *@functionName:accountSave.js
     *@params1: data
     *@params2: data2
     *@description:记录输入的账号信息.data：表示状态能下一步或返回上一步
     保证每一步操作必须正确
     *@author: 旋展峰
     *@date: 2020-01-14 22:16:08
     *@version: V1.0.5
    */
    accountSave(data) {
      this.goOn = data;
      console.log(this.goOn);
    },
    /*
     *@functionName:companyFrom.js
     *@params1: 企业基本信息表单
     *@description:data表示子组件的表单
     *@author: 旋展峰
     *@date: 2020-01-15 14:53:29
     *@version: V1.0.5
     */
    companyFrom(name, data) {
      this.companyName = name;
      this.goOnCompany = data;
    },
    checkPicture(data) {
      this.check = data;
    },
    register() {
      var that = this;
      that.$refs.company.registerCompanyDetail(); //注册企业信息
    },
    registerUserDe() {
      var that = this;
      that.$refs.detail.addSubmit();//企业介绍信息
    },
    registerDetail(){
      var that = this;
      that.$refs.user.registerUserDetail(); //用户注册账户信息
    }
  }
};
</script>

<style scoped>
.steps {
  margin-top: 30px;
  width: 1076px;
  margin-left: 100px;
}
</style>