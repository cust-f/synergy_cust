<template>
  <div>
    <div class="user_top">
      <div onclick="gotoHomeIndexPage()">
        <router-link tag="a" to="/home" class="user_logo">
          <img src="../../assets/images/login/login-logo.png" />
        </router-link>
        <div class="user_div">
          <router-link tag="a" to="/home">返回首页</router-link>
          <router-link tag="a" to="/home" class="user_top_a1"
            >&nbsp;</router-link
          >
        </div>
      </div>
    </div>

    <div class="user_middle">
      <div class="user_dl">
        <a class="user_dl_left">
          <img src="../../assets/images/login/user_img06.png" />
        </a>

        <div class="user_dl_right">
          <a class="user_a1">快捷</a>

          <div id="user_dl_qh">
            <h3 class="active">登录</h3>

            <div id="phone_login" style="display: block">
              <ul>
                <li>
                  <a>帐号</a>
                  <input
                    type="text"
                    name="phone"
                    v-model="param.userName"
                    id="phone"
                    placeholder="账号"
                  />
                </li>
                <li>
                  <a>密码</a>
                  <input
                    type="password"
                    name="password1"
                    v-model="param.password"
                    id="password1"
                    @keyup.enter="submitForm"
                    placeholder="请输入密码"
                  />
                </li>
              </ul>
            </div>
          </div>

          <ul class="big_yzm">
            <li class="yzm">
              <a>验证码</a>
              <input 
                type="text" 
                v-model="param.code"
                id="checkCode" 
                placeholder="请输入验证码" 
                maxlength="4" 
              />
              <a class="yzm_img">
                <!-- <img src="" onclick="changeCode()" id="code" /> -->
                <div @click="changeCode()">
                  <vIdentify :identifyCode="identifyCode"></vIdentify>
                </div>
              </a>
            </li>
          </ul>

          <a href="javascript:void(0)" class="user_a3" @click="submitForm"
            >登录</a
          >

          <div class="user_dl_div">
            <!-- <a class="user_a4">
              <img src="./哈长城市群科技云-登录_files/user_img06.png" />
              <span>QQ</span>
            </a>
            <a class="user_a4">
              <img src="./哈长城市群科技云-登录_files/user_img07.png" />
              <span>微信</span>
            </a> -->
            <div>
              <img src="../../assets/images/login/user_img08.png" />
              <router-link tag="a" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="user_bottom">
      <ul>
        <li>
          <a href="javascript:void(0)">关于我们</a>
        </li>
        <li>|</li>
        <li>
          <a href="javascript:void(0)">平台服务</a>
        </li>
        <li>|</li>
        <li>
          <a href="javascript:void(0)">帮助中心</a>
        </li>
        <li>|</li>
        <li>
          <a href="javascript:void(0)">隐私声明</a>
        </li>
        <li>|</li>
        <li>
          <a href="javascript:void(0)">联系我们</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import vIdentify from "./identify.vue"

export default {
  components:{
    vIdentify, //注册组件
  },
  name: "login",
  data: function () {
    return {
      param: {
        userName: "",
        password: "",
        code:"",
      },
      identifyCode:"",
      identifyCodes:"1234567890",
      // rules: {
      //   userName: [
      //     { required: true, message: "请输入用户名", trigger: "blur" },
      //   ],
      //   password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      // },
      roleID: "",
    };
  },
  mounted(){
    this.identifyCode="";
    this.makeCode(this.identifyCodes,4);
  },
  created() {
    this.changeCode();
  },
  methods: {
    //验证码
    randomNum(min,max){
      return Math.floor(Math.random()*(max-min)+min);
    },
    changeCode(){
      this.identifyCode="";
      this.makeCode(this.identifyCodes,4);
    },
    makeCode(o,l){
      for(let i=0;i<l;i++){
        this.identifyCode += this.identifyCodes[
          this.randomNum(0,this.identifyCodes.length)
        ];
      }
    },
    //数据格式验证
    valid() {
      if (this.param.userName == "" || this.param.password == "" ||this.param.code=="") {
        this.$message.error("请输入账号、密码和验证码");
        return false;
      }else if(this.identifyCode!=this.param.code){
        this.param.code='';
        this.changeCode();
        this.$message.error("请输入正确的验证码");
        return false;
      } 
      else {
        return true;
      }
    },
    //登录
    submitForm() {
      // this.$refs.login.validate((valid) => {
      if (this.valid()) {
        var menuList;
        var that = this;
        var data = Qs.stringify({
          userName: this.param.userName.replaceAll(" ",""),
          password: this.param.password.replaceAll(" ",""),
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
                message: "登录成功",
              });
              this.$store.commit("SET_TOKEN", true);
              this.$store.commit("SET_USER", this.param.userName);
              sessionStorage.setItem("ms_username", this.param.userName);
              sessionStorage.setItem("designer_name", this.param.userName);
              console.log(response.data.allData.userId.userId)
              sessionStorage.setItem("userId", response.data.allData.userId.userId);

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
                message: "登录失败",
              });
              // this.changeCode();
            }
          });
      } 
      // else {
      //   this.$message.error("请输入账号和密码");
      //   return false;
      // }
      // });
    },
    goHome() {
      this.$router.push({
        path: "/home",
      });
    },
  },
};
</script>

<style >
@import "../../assets/css/layer.css";
</style>