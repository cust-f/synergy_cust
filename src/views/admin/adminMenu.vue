<template>
  <el-drawer size="90%"  :visible.sync="drawer" direction="ttb" :before-close="handleClose">
      <span>哈哈哈</span>
  </el-drawer>
</template>

<script>
export default {
   name:'adminMenu',
  data() {
    return {

    };
  },
  props:{
      drawer:{
      type: Boolean,
      default: false
    }
  },
  methods:{
      handleClose(done) {
      this.$emit("dialogClose", false);
      }
  }
};
</script>

<style>
.el-drawer{
  background:none;
}
</style>