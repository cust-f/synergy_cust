<!--基本信息组件-->
<template>
  <div>
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">基本信息</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    <br />
    <el-card class="box-card">
      <el-form ref="cool" :model="cool" label-width="110px" class="form">
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求名称:">
              <el-input v-model="cool.mainTaskName" :readonly="true" style="text-align:center"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="子任务名称:">
              <el-input v-model="cool.taskName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="发布企业名称:">
              <el-input v-model="cool.companyName" :readonly="true" style="text-align:center"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="接受企业名称:">
              <el-input v-model="cool.acceptCompanyName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="任务截止日期:">
              <el-input
                v-bind:value="cool.deadline|formatDate"
                :readonly="true"
                style="text-align:center"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="需求方电话:">
              <el-input v-model="cool.demanderTel" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>