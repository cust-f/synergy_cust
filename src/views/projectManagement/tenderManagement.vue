<style>
.el-row {
    margin-bottom: 10px;
    :last-child {
      margin-bottom: 0;
    }
    
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .gridContent0 {
    border-radius: 4px;
    min-height: 36px;
  }
  .gridContent1 {
    border-radius: 4px;
    height: 600px;
  }
  .gridContent2 {
    border-radius: 4px;
    min-height: 36px;
  }
  .gridContent3 {
    border-radius: 4px;
    min-height: 36px;
  }
  .gridContent11{
      height: 50%;
      width: 50%;
      background-color: black
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .tenderT
  {
    padding: 0px 24px 0px 24px;
    background-color: bisque;   
    height: calc(100vh - 160px);   
  }

</style>
<template>
<div class="tenderT">
<el-row >
  <el-col :span="24"><div class="gridContent0 bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="4"><div class="gridContent1 bg-purple"><div class="gridContent11"></div></div></el-col>
  <el-col :span="16"><div class="gridContent2 bg-purple"></div></el-col>
  <el-col :span="4"><div class="gridContent3 bg-purple"></div></el-col>
</el-row>
</div>
</template>



<script>

</script>
