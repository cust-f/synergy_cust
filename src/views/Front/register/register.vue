<template>
  <div class="register">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="back">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next" :disabled="last">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      active: 0,
      first:true,
      last:false
    };
  },

  methods: {
    next() {
      if (this.active++ == 2) this.last = true;
      else this.last=false;
    },
    back(){
        if(this.active-- ==0) this.first=true;
        else this.first=flase;
    }
  }
};
</script>

<style scoped>
</style>