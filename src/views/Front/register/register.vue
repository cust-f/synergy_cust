<template>
  <div class="register">
    <el-steps :active="active" finish-status="success">
      <el-step title="设置账号"></el-step>
      <el-step title="添加企业信息"></el-step>
      <el-step title="相关图片上传"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="back" :disabled="first">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">{{active==3?'提交':'下一步'}}</el-button>
    <register-user v-show="active==1" ref="user" :account="account" @accountSave="accountSave"></register-user>
    <register-company v-show="active==2" ref="company" @companyFrom="companyFrom"></register-company>
    <register-picture v-show="active==3" ref="picture" @checkPicture ="checkPicture" :enterpriseName="this.company.Company_Name"></register-picture>
  </div>
</template>

<script>
import registerUser from "./components/registerUser";
import registerCompany from "./components/registerCompany";
import registerPicture from "./components/registerPicture";

import Qs from "qs";

export default {
  name: "register",
  data() {
    return {
      active: 1, //索引
      first: true, //上一步
      goOn: true, //判断是否符合标准下一步
      check:false,
      //新增账户
      account: {
        password: "",
        checkPass: "",
        userName: ""
      },
      company: {
        Company_Name:""
      }
    };
  },
  components: {
    "register-user": registerUser,
    "register-company": registerCompany,
    "register-picture": registerPicture
  },
  methods: {
    next() {
      console.log(this.active);
      if (this.active == 1) {
        this.$refs.user.submitForm("account");
        if (this.goOn) {
          this.active++;
          this.first = false;
        }
      } else if (this.active == 2) {
        this.active++;
        this.first = false;
        this.$refs.company.upLoad();
      } else if (this.active == 3) {
        console.log("第三步呀")
                this.$refs.picture.submitUpload();
        if(this.check){
          console.log("图片存在！！")
        var that = this;
        this.account["roleId"] = "1";
        this.company.product = this.company.product.toString();
        // this.company.City = this.company.City.toString();
        // this.company.Province = this.company.Province.toString();
        // this.company.Postcode = this.company.Postcode.toString();
        var data1 = Qs.stringify(this.account);
        var data2 = Qs.stringify(this.company);
        //传递用户信息
        that
          .axios({
            method: "post",
            url: "http://127.0.0.1:8081/register/user",
            data: data1
          })
          .then(response => {
            console.log(response);
          });

        //传递企业信息
        that
          .axios({
            method: "post",
            url: "http://127.0.0.1:8081/register/company",
            data: data2
          })
          .then(response => {
            console.log(response);
          });
        }
      }
    },
    back() {
      if (this.active == 2) {
        this.active--;
        this.first = true;
      } else if (this.active == 3) {
        this.active--;
        this.first = false;
      }
    },
    /*
     *@functionName:accountSave.js
     *@params1: data
     *@params2: data2
     *@description:记录输入的账号信息.data表示子组件传递账户信息给父组件，data2：表示状态能下一步或返回上一步
     保证每一步操作必须正确
     *@author: 旋展峰
     *@date: 2020-01-14 22:16:08
     *@version: V1.0.5
    */
    accountSave(data, data2) {
      this.account = data;
      this.goOn = data2;
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
    companyFrom(data) {
      this.company = data;
      console.log(this.company);
    },
    checkPicture(data){
      this.check=data;
    }
  }
};
</script>

<style scoped>
</style>