<template>
  <div class="register-user">
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('account')">提交</el-button>
        <el-button @click="resetForm('account')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "registerUser",
  data() {
    var checkuserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
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
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userName: [
          { validator: checkuserName, trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    account: {
      default: {
        password: "",
        checkPass: "",
        userName: ""
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log("呵呵");
      this.$refs[formName].validate(valid => {
        console.log("滚");
        if (valid) {
          console.log("111");
          this.$emit("accountSave", this.account, true);
        } else {
          this.$message({
            type: "warning",
            message: "下一步失败"
          });
          this.$emit("accountSave", this.account, false);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("accountSave", this.account, false);
    }
  }
};
</script>

<style scoped>
.register-user {
  width: 600px;
  margin: 0 auto;
}
</style>