<template>
  <div style="width:1200px;margin:0 auto;" class="company-detail-info">
    <!--第一行 -->
    <el-row >
      <el-col :span="20" >
        <div style="margin-top:15px;">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/excellentCompany' }">优质企业</el-breadcrumb-item>
            <el-breadcrumb-item >企业详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <br />
    <el-card shadow="never" style="margin-bottom:20px;">
       <div slot="header">
        <div style=" margin:-18px -20px; padding:10px 20px; background: #dcdfe6;border-bottom: 1px solid #606266;">企业详情</div>
      </div>
      <div class="company_top">
        <div class="preview">
          <div class="company-picture">
            <el-carousel height="400" width="400" direction="vertical" arrow="always">
              <el-carousel-item v-for="(item,index) in imagesbox" :key="index">
                <img :src="item" class="images" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

        <div class="Rights">
          <!-- <font style="color:#ff7720;font-size:20px;">[229857]</font> -->
          <!-- <el-row>
          <el-col :span="5">-->
          <div>
            <div style="float:left">
              <span style="font-size:24px;font-weight:500;">{{companyDetail.companyName}}</span>
            </div>
            <!-- </el-col>
            <el-col :span="4"></el-col>-->
            <el-rate v-model="companyDetail.star" style="margin-left:135px;line-height:2;" disabled text-color="#ff9900"></el-rate>
            <!-- </el-col>
            </el-row>-->
          </div>
          <el-divider></el-divider>
          <el-row class="Detail">
            <el-col :span="9" :offset="2">
              <li>
                <a>
                  企业所在省：
                  <font>{{companyDetail.province}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  企业所在市：
                  <font>{{companyDetail.city}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  成立时间：
                  <font>{{companyDetail.foundingTime | dataFormat("yyyy-MM-dd")}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  注册资本：
                  <font>{{companyDetail.registeredCapital}}万元</font>
                </a>
              </li>
              <br />

              <li>
                <a>
                  企业地址：
                  <font>{{companyDetail.address}}</font>
                </a>
              </li>
            </el-col>
            <el-col :span="9" :offset="2">
              <li>
                <a>
                  工商注册号：
                  <font>{{companyDetail.brNumber}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  法人代表：
                  <font>{{companyDetail.legalPerson}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  法人联系电话：
                  <font>{{companyDetail.legalTel}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  办公电话：
                  <font>{{companyDetail.officeNumber}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  经营范围：
                  <font>{{companyDetail.product}}</font>
                </a>
              </li>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="white" :class="{'companyContent':! companyDetailContent==null}">
        <el-tabs type="card">
          <el-tab-pane label="企业信息">
            <div>
              <div class="message" v-html="companyDetailContent"></div>
              <br>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "companyDetails",
  data() {
    return {
      companyDetail: "",
      companyDetailContent: "",
      imagesbox: [
        // { id: 0, idView: require("../company/1.png") },
        // { id: 1, idView: require("../company/2.jpg") },
        // { id: 2, idView: require("../company/3.jpg") }
      ]
    };
  },
  created() {
    this.getCompanyDetail();
  },
  methods: {
    getCompanyDetail() {
      let that = this;
      let data = Qs.stringify({
        companyId: this.$route.query.companyId
      });
      that
        .axios({
          method: "post",
          url: "/api/company/detail",
          data: data
        })
        .then(response => {
          // console.log(response);
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
          this.companyDetail = response.data.allData.companyDetail;
          this.imagesbox=response.data.allData.companyCarousel;
        });
    }
  }
};
</script>
<style scoped>
.company-detail-info .images {
  width: 300px;
  height: 300px;
}
.company-detail-info .white {
  /* width: 67%; */
  margin-top: 20px;
}
.company-detail-info .companyContent{
  height: 600px;
}
.divtap {
  border-right: 1px solid #000;
  border-top: 1px solid #000;
}
.designcomment {
  width: 80%;
  text-align: center;
}
.yqk_nr_bt {
  display: block;
  width: 200px;
  font-size: 16px;
  line-height: 40px;
  color: #00a2e6;
}
.company-detail-info .title {
  font-size: 14px;
  font-style: normal;
  width: 250px;
  margin-top: 22px;
}
.company_top {
  /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  border-bottom-color: rgb(225, 225, 225);

  border-bottom-style: solid;

  border-bottom-width: 1px;

  border-left-color: rgb(225, 225, 225);

  border-left-style: solid;

  border-left-width: 1px;

  border-right-color: rgb(225, 225, 225);

  border-right-style: solid;

  border-right-width: 1px;

  border-top-color: rgb(225, 225, 225);

  border-top-style: solid;

  border-top-width: 1px; */

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  /* margin-left: 305.6px; */

  margin-right: 65.61px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 10px;

  padding-left: 10px;

  padding-right: 10px;

  padding-top: 10px;

  text-decoration: none;

  width: 1280px;
}
.company-detail-info  .company-picture {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: left;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  height: 300px;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  position: relative;

  text-decoration: none;

  width: 300px;
}
.ull {
  width: 200px;
}
.ulr {
  width: 200px;
}
.Rights {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: left;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 40px;

  margin-right: 0px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  width: 920px;
}
.Rights .el-divider--horizontal {
  width: 87%;
}
.Detail li{
    margin-top: 10px;
}
.ul02 {
  width: 920px;
}
</style>