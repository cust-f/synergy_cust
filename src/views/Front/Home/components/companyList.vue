<template>
  <div class="companyList">
    <el-row v-for="(companys,index) in companyList" :key="index" class="company-info">
      <div @click="companyDetail(companys.companyId)">
        <el-col :span="4">
          <el-avatar shape="square" :size="80" fit="fill" :src="companys.logo"></el-avatar>
        </el-col>
        <el-col :span="20">
          <el-row>
            <div style="float:left;">
              <h2>{{companys.companyName}}</h2>
            </div>
            <div style="float:right;">
              <el-rate v-model="companys.star" disabled text-color="#ff9900"></el-rate>
            </div>
          </el-row>
          <el-row>
            <el-col :span="5">
              <span>所在省份: {{companys.province}}</span>
            </el-col>
            <el-col :span="5">
              <span>所在城市: {{companys.city}}</span>
            </el-col>
            <el-col :span="6">
              <span>成立日期: {{companys.foundTime | dataFormat("yyyy-MM-dd")}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>企业所在地: {{companys.address}}</span>
            </el-col>
            <el-col :span="12">
              <span>企业类别：{{companys.type}}</span>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    companyList: {
      default: [],
      type: Array
    }
  },
  methods: {
    //进入企业详情界面
    companyDetail(id) {
      this.$router.push({
        path: "/company/excellentCompanyDetail",
        name: "companyDetails",
        query: { companyId: id }
      });
    }
  }
};
</script>

<style scoped>
/* 企业列表样式 */
.companyList {
  width: 100%;
}
.company-info {
  padding: 20px;
  border-bottom: 1px solid #f3f3f3;
  -webkit-transition: -webkit-box-shadow 0.3s;
  transition: -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}
.company-info:hover {
  position: relative;
  z-index: 1;
  -webkit-box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
}
.company-info:hover h2 {
  color: #0084ff;
}
.company-info .el-row {
  margin-bottom: 10px;
}
</style>