<template>
  <div class="register-user">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>新增账号</span>
      </div>
      <el-form
        :model="account"
        status-icon
        :rules="rules"
        ref="account"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="account.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="account.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="account.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[
//      { required: false, message: '请输入邮箱地址', trigger: 'blur' },待议
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="account.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="account.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="account.realName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "registerUser",
  data() {
    var checkuserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value === this.existName) {
        callback(new Error("用户名重复"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
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
      } else if (value !== this.account.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var validDataPhone = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        // this.$error("手机号码有误，请重填");
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        userName: [
          { required: true, validator: checkuserName, trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" }
        ],
        phone: [{ required: false, validator: validDataPhone, trigger: "blur" }]
      },
      existName: null,
      account: {
        password: "",
        checkPass: "",
        userName: "",
        email: "",
        phone: "",
        realName: ""
      }
    };
  },
  props: {
    enterpriseName: {
      type: String,
      default: ""
    }
  },
  watch: {
    "account.userName": function(val) {
      this.getexistName();
    }
  },
  methods: {
    getexistName() {
      let that = this;
      let data = Qs.stringify({
        checkName: this.account.userName
      });
      that
        .axios({
          method: "post",
          url: "/api/register/checkName",
          data: data
        })
        .then(response => {
          console.log(response);
          if (response.data.allData.check) {
            this.existName = this.account.userName;
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("accountSave", true);
        } else {
          this.$message({
            type: "warning",
            message: "下一步失败"
          });
          this.$emit("accountSave", false);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("accountSave", false);
    },
    registerUserDetail() {
      //传递用户信息
      let that = this;
      this.account.companyName = this.enterpriseName;
      var data = Qs.stringify(this.account);
      that
        .axios({
          method: "post",
          url: "/api/register/user",
          data: data
        })
        .then(response => {
          if (response.data.code == 200) {
            this.$message({
              type: "success",
              message: "注册成功，请等待审核"
            });
            this.$router.push("/home");
          }
        });
    }
  }
};
</script>

<style scoped>
.register-user {
  width: 600px;
  margin: 0 auto;
  margin-bottom: 40px;
}
</style>