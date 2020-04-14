<template>
  <div style="width:1200px;margin:0 auto;">
    <el-row>
      <div>
        <div class="title">
          <span>首页</span>
          <span>&nbsp; > &nbsp;</span>
          <span>优质企业</span>
          <span>&nbsp; > &nbsp;</span>
          <span>企业详情</span>
        </div>
        <br />
      </div>
    </el-row>
    <br />
    <el-card shadow="never" style="margin-bottom:20px;">
      <div slot="header">
        <span>企业详情</span>
      </div>
      <div class="np_top">
        <div class="preview">
          <div class="BigTime">
            <el-carousel height="400" width="400" direction="vertical" arrow="always">
              <el-carousel-item v-for="(item,index) in imagesbox" :key="index">
                <img :src="item.idView" class="images" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

        <div class="Right">
          <!-- <font style="color:#ff7720;font-size:20px;">[229857]</font> -->
          <!-- <el-row>
          <el-col :span="5">-->
          <div>
            <div style="float:left">
              <span style="font-size:24px;font-weight:500;">{{companyDetail.companyName}}</span>
            </div>
            <!-- </el-col>
            <el-col :span="4"></el-col>-->
            <el-rate v-model="companyDetail.star" disabled text-color="#ff9900" ></el-rate>
            <!-- </el-col>
            </el-row>-->
          </div>
          <el-divider ></el-divider>
          <el-row>
            <el-col :span="8" :offset="2">
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
                  <font>{{companyDetail.registeredCapital}}</font>
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
            <el-col :span="8" :offset="4">
              <li>
                <a>
                  工商注册号：
                  <font>{{companyDetail.businessName}}</font>
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
                  <font>{{companyDetail.workerNumber}}</font>
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

          <!--        <ul class="ul02">
            <div class="ull">  
            <li>
                <a>
                    企业所在省：
                    <font >黑龙江</font>
                </a>
            </li>
            <br>
            <li>
                <a>
                    企业所在市：
                    <font >哈尔滨</font>
                </a>
            </li>
            <br>
            <li>
                <a>
                    企业地址：
                    <font>哈尔滨高新区科技创新城创新创业广场11号楼科技一街1039号C504室</font>
                </a>
            </li>
             <br>
            <li>
                <a>
                    注册资本：
                    <font >2.5亿元</font>
                </a>
            </li>
               <br>
           
            <li>
                <a>
                    成立时间：
                    <font >2010年12月</font>
                </a>
            </li>   
                </div>
                <div class="ulr">
            <br>
            <li>
                <a>
                    工商注册号：
                    <font>201010101010</font>
                </a>
            </li>
               <br>
            <li>
                <a>
                    法人代表：
                    <font >张晓天</font>
                </a>
            </li>
               <br>
            <li>
                <a>
                    法人联系电话：
                    <font >10086</font>
                </a>
            </li>
               <br>
            <li>
                <a>
                    办公电话：
                    <font >18888881234</font>
                </a>
            </li>
                        <br>
            <li>
                <a>
                    经营范围：
                    <font >智能教学设备、软件的研发与销售；企业管理咨询、商务信息咨询；信息技术服务，工程技术服务</font>
                </a>
            </li>
                        <br>
</div>
          </ul>-->
        </div>
      </div>
      <el-row class="white">
        <el-tabs type="card">
          <el-tab-pane label="企业信息">
            <el-col :span="20" :offset="1">
              <div style="display:block">
                <ul>
                  <li class="yqk_nr_bt">
                    <a>企业简介</a>
                  </li>
                  <li>
                    <a>哈尔滨科大志远科技有限公司成立于2013年11月07日，注册地位于哈尔滨高新区科技创新城创新创业广场11号楼科技一街1039号C504室，法人代表为张晓天。经营范围包括智能教学设备、软件的研发与销售；企业管理咨询、商务信息咨询；信息技术服务，工程技术服务(涉及许可经营的项目，经审批机关批准并经工商行政管理机关登记注册后方可经营)。黑龙江棵乐信息技术有限公司是为中小微企业提供企业移动管理服务的专业企业，棵乐信息始终坚持专注于移动互联网时代的企业客户关系管理、营销管理、HR管理等方向，通过打造“管理信息化咨询平台+云服务平台”两大平台联动的商业模式，为客户提供从战略规划、商业模式设计、组织及人力资源优化、业务流程优化及管理、PC端和移动端IT系统规划及落地、云服务综合运营、管理等全链条综合持续服务，切实帮助企业与政府客户实现转型升级与价值落地。</a>
                  </li>
                  <li>
                    <a></a>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-tab-pane>
        </el-tabs>
        <el-divider></el-divider>
      </el-row>
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
      imagesbox: [
        { id: 0, idView: require("../company/1.png") },
        { id: 1, idView: require("../company/2.jpg") },
        { id: 2, idView: require("../company/3.jpg") }
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
          url: "/api/companyDetail/getBusinessForm",
          data: data
        })
        .then(response => {
          console.log("-------------------");
          console.log(response);
          this.companyDetail = response.data.allData.companyDetail[0];
        });
    }
  }
};
</script>
<style>
.images {
  width: 300px;
  height: 300px;
}
.white {
  /* width: 67%; */
  margin-top: 20px;
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
.title {
  font-size: 14px;
  font-style: normal;
  width: 250px;
  margin-top: 22px;
}
.np_top {
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
.BigTime {
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
.Right {
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
.Right .el-divider--horizontal{
  width:87%;
}
.ul02 {
  width: 920px;
}
</style>