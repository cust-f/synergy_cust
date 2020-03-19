<template>
  <div class="company">
    <el-card shadow="never" class="selectCard" >
      <el-row v-if="!dynamicTags.length==0">
        <el-col :span="3">
          <span>已选择条件</span>
        </el-col>
        <el-col :span="20" style="text-align:left;">
          <el-tag
            closable
            :disable-transitions="false"
            :key="tag"
            v-for="tag in dynamicTags"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>省份地区</span>
        </el-col>
        <el-col :span="2">
          <a>不限</a>
        </el-col>
        <div style="margin:0 15px;float:left;" v-for="pro in province.slice(0,moreProvince)" :key="pro.id">
          <a>{{pro.districtName}}</a>
        </div>
        <div v-if="moreProvince==9" >
          <a class="fixed" @click="more(1)">更多</a>
        </div>
        <div v-else>
          <a class="fixed" @click="more(0)">收起</a>
        </div>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>行业类别</span>
        </el-col>
        <el-col :span="2" v-for="ca in category" :key="ca.id"></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "excellentCompany",
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      province: "",
      city: "",
      moreProvince: 9, //显示省份数量
      provinceOption: false, //是否选择了省份
      category: "" //行业类别
    };
  },
  created() {
    this.getProvince();
  },
  methods: {
    getProvince() {
      let that = this;
      that.axios.post("/api/district/province").then(response => {
        this.province = response.data.allData.Province;
      });
    },
    //关闭筛选的标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    more(option) {
      if (option == 1) {
        this.moreProvince = this.province.length;
      } else {
        this.moreProvince = 9;
      }
    }
  }
};
</script>

<style scoped>
.company {
  width: 1200px;
  margin: 0 auto;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.company .el-row {
  margin-bottom: 20px;
}
.selectCard{
 margin-top:35px;
 padding-right:55px; 
 width:800px;
 font-size: 14px;
}
.selectCard .span{
    border-right: 1px solid #f3f3f3;
    text-align: right;
    color: #666
}
.fixed{
    position: absolute;
    right: -58px;
}
</style>