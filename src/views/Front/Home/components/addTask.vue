<template>
  <el-dialog title="发布需求" :visible.sync="addDemand">
    <el-form :model="demandForm" :rules="rules" ref="demandForm">
      <el-form-item label="需求名称" :prop="name">
        <el-input v-model="demandForm.name"></el-input>
      </el-form-item>
      <el-form-item label="需求简介" :prop="describe">
        <el-input type="textarea" v-model="demandForm.describe "></el-input>
      </el-form-item>
      <el-form-item label="需求类型" :prop="type">
        <el-cascader-panel
          :options="options"
          v-model="type"
          :props="{value:'id',label:'Industry_Name',children:'child',emitPath:false}"
        ></el-cascader-panel>
      </el-form-item>
    <el-form-item label="联系人" :prop="people">
        <el-input v-model="demandForm.people"></el-input>
      </el-form-item>
         <el-form-item label="联系电话" :prop="telephone">
        <el-input v-model="demandForm.telephone"></el-input>
      </el-form-item>
      t
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      demandForm: {
        name: "",
        describe: "",
        type:"",
        people:"",
        telephone:""
      },
      options:""
    };
  },
  props: {
    addDemand: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
</style>