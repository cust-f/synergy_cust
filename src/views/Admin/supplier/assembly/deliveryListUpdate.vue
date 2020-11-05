<template>
  <el-form
    style="width: 60%"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="流通清单ID" prop="Consignment_ID">
      <el-input v-model="ruleForm.Consignment_ID" readOnly></el-input>
    </el-form-item>

    <el-form-item label="子任务ID" prop="Task_Id">
      <el-input v-model="ruleForm.Task_Id"></el-input>
    </el-form-item>

    <el-form-item label="产品名称" prop="Product_Name">
      <el-input v-model="ruleForm.Product_Name"></el-input>
    </el-form-item>

   <el-form-item label="发货时间" prop="Delivery_Time">
      <el-input v-model="ruleForm.Delivery_Time"></el-input>
    </el-form-item>
    <el-form-item label="发货截止时间">
      <el-input v-model="ruleForm.Consignment_Time_Latest" readOnly></el-input>
    </el-form-item>
    <el-form-item label="发货状态">
      <el-input v-model="ruleForm.Consignment_State" readOnly></el-input>
    </el-form-item>
    <el-form-item label="产品数量" prop="Product_Number">
      <el-input v-model="ruleForm.Product_Number"></el-input>
    </el-form-item>
    <el-form-item label="产品规格" prop="Product_Model">
      <el-input v-model="ruleForm.Product_Model"></el-input>
    </el-form-item>
    <el-form-item label="产品单价" prop="Product_Price">
      <el-input v-model="ruleForm.Product_Price"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="Contact_number">
      <el-input v-model="ruleForm.Contact_number"></el-input>
    </el-form-item>
    <el-form-item label="发货地址" prop="Shipping_address">
      <el-input v-model="ruleForm.Shipping_address"></el-input>
    </el-form-item>
    <el-form-item label="总金额" prop="Total_Price">
      <el-input v-model="ruleForm.Total_Price"></el-input>
    </el-form-item>
    <el-form-item label="流通清单备注" prop="Consignment_Notes">
      <el-input v-model="ruleForm.Consignment_Notes"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
       Consignment_ID: "",
        Task_Id: "",
        Product_Name:"",
        Delivery_Time:"",
        Consignment_Time_Latest: "",
        Consignment_State:"",
        Product_Number:'',
        Product_Model:"",
        Product_Price:'',
        Contact_number:"",
        Shipping_address:"",
        Total_Price:'',
        Consignment_Notes:'',
      },
      rules: {
        Delivery_Time: [
          { required: true, message: "发货时间不能为空", trigger: "blur" },
        ],
        Consignment_ID: [
          { required: true, message: "流通清单ID禁止修改", trigger: "blur" },
        ],
        Consignment_State: [
          { required: true, message: "发货状态禁止修改", trigger: "blur" },
        ],
        Shipping_address: [
          { required: true, message: "发货地址不能为空", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put("", this.ruleForm).then(function (resp) {
            if (resp.data == "success") {
              _this.$alert(
                "《" + _this.ruleForm.name + "》修改成功！",
                "消息",
                {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    _this.$router.push("/deliveryListUpdate");
                  },
                }
              );
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  //修改时将之前的各项内容显示在页面中
  created() {
    const _this = this;
    axios.get("" + this.$route.query.Consignment_ID).then(function (resp) {
      _this.ruleForm = resp.data;
    });
  },
};
</script>