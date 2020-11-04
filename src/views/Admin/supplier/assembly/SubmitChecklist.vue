<template>
  <div>
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="发货清单ID">
        <el-input v-model="formLabelAlign.Consignment_ID"></el-input>
      </el-form-item>
      <el-form-item label="子任务ID">
        <el-input v-model="formLabelAlign.Task_Id"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-input v-model="formLabelAlign.Consignment_Time_Latest"></el-input>
      </el-form-item>
      <el-form-item label="发货状态">
        <el-input v-model="formLabelAlign.Consignment_State"></el-input>
      </el-form-item>
      <el-form-item label="产品数量">
        <el-input v-model="formLabelAlign.Product_Number"></el-input>
      </el-form-item>
      <el-form-item label="产品单价">
        <el-input v-model="formLabelAlign.Product_Price"></el-input>
      </el-form-item>
      <el-form-item label="总金额">
        <el-input v-model="formLabelAlign.Total_Price"></el-input>
      </el-form-item>
      <el-form-item label="发货清单备注">
        <el-input v-model="formLabelAlign.Consignment_Notes"></el-input>
      </el-form-item>
      <el-form-item label="发货时间">
        <el-input v-model="formLabelAlign.Delivery_Time"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
};
</script>

<style>
</style>