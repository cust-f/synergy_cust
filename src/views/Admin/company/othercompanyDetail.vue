<template>
  <div class="othercompanyDetail">
    <el-container>
      <el-main>
        <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <!-- <el-carousel :interval="5000" arrow="always">
 <el-carousel-item v-for="item in imagesbox" :key="item">
      <img v-bind:src="item.idView" class="image">
    </el-carousel-item>
        </el-carousel>-->
        <div width="500" align="center" height="200px">
          <el-image class="qiyetupian" :src="imgsrc" :onerror="errorImg01"></el-image>
        </div>

        <el-divider></el-divider>
        <!-- <el-card shadow="never" style="margin-bottom:20px;">

 <div class="np_top">
          <div class="left">
          
          <el-form ref="form" :model="form" >
          <el-row>
            <el-col :span="12">
              <el-form-item label>
                <el-image align="left" style="width:200px;height:200px" :src="logo" :onerror="errorImg00"></el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
          
          </div>
        <div class="Right">
          
          <div>
            <div style="float:left">
              <span style="font-size:24px;font-weight:500;">{{form.companyName}}</span>
            </div>
           
            <el-rate v-model="form.star" style="margin-left:135px;line-height:2;" disabled text-color="#ff9900"></el-rate>

          </div>
          <el-divider></el-divider>
          <el-row class="Detail">
            <el-col :span="9" :offset="2">
              <li>
                <a>
                  企业所在省：
                  <font>{{form.province}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  企业所在市：
                  <font>{{form.city}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  成立时间：
                  <font>{{form.foundingTime | dataFormat("yyyy-MM-dd")}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  注册资本：
                  <font>{{form.registeredCapital}}万元</font>
                </a>
              </li>
              <br />

              <li>
                <a>
                  企业地址：
                  <font>{{form.address}}</font>
                </a>
              </li>
            </el-col>
            <el-col :span="9" :offset="2">
              <li>
                <a>
                  工商注册号：
                  <font>{{form.brNumber}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  法人代表：
                  <font>{{form.legalPerson}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  法人联系电话：
                  <font>{{form.legalTel}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  办公电话：
                  <font>{{form.officeNumber}}</font>
                </a>
              </li>
              <br />
              <li>
                <a>
                  经营范围：
                  <font>{{form.product}}</font>
                </a>
              </li>
            </el-col>
          </el-row>
        </div>
      </div>
        </el-card>-->

        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业营业执照</div>
        <br />
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label>
                <el-image
                  align="left"
                  class="yingyezhizhao"
                  :src="qiyezhizhao"
                  :onerror="errorImg02"
                ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业税务登记证</div>
        <br />
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label align="left">
                <el-image
                  align="left"
                  class="yingyezhizhao"
                  :src="shuiwudengjizheng"
                  :onerror="errorImg03"
                ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业Logo</div>
        <br />
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label>
                <el-image align="left" style="width:200px;height:200px" :src="logo" :onerror="errorImg00"></el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>-->

        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div>
        <br />
        <div style="width:800px;height:250px">
        
          <div style="float: left" >
            <el-image
              align="left"
              style="width:200px;height:200px"
              :src="logo"
              :onerror="errorImg00"
            ></el-image>
          </div>

          <div style="float: right;width:490px;height:250px">
              <br>
            <el-rate label="企业级别：" v-model="form.star" disabled text-color="#ff9900"></el-rate>
            <br>
            <div align="">
              <font size="5">{{ form.companyName}}</font>
            </div>
            <br>
            <div align="">
              <font size="4">{{ form.businessTel}}</font>
            </div>
          </div>
        </div>

        <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业Logo</div> -->

        <div class="formYS">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业所在省份">
                  <el-input v-model="form.province" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业所在县市">
                  <el-input v-model="form.city" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业地址">
                  <el-input v-model="form.address" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input v-model="form.postcode" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业成立时间">
                  <el-input v-bind:value="form.foundingTime | formatDate" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工商注册号">
                  <el-input v-model="form.brNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业业务范围">
                  <el-input v-model="form.product" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱">
                  <el-input v-model="form.email" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业联系人">
                  <el-input v-model="form.businessName" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公室电话">
                  <el-input v-model="form.officeNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资产">
                  <el-input v-model="form.registeredCapital" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总资本">
                  <el-input v-model="form.totalAssets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="固定资产">
                  <el-input v-model="form.fixedAssets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流动资产">
                  <el-input v-model="form.currentAssets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="法人代表">
                  <el-input v-model="form.legalPerson" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工人数">
                  <el-input v-model="form.workerNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户银行">
                  <el-input v-model="form.deposit_Bank" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行账户">
                  <el-input v-model="form.bankNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="企业详情"></el-form-item>
              </el-col>

              <!-- <el-form-item label="详细" >
                            <el-input 
                            type="textarea"
                            :rows="1"
                            style="width:100%;"
                            placeholder="请输入内容" v-model="form.introduction" :disabled=yangshi ></el-input>
                    </el-form-item>
              -->
            </el-row>
            <el-card class="box-card">
              <font font-size="14px">
                <div class="XX" v-html="companyDetailContent"></div>
              </font>
            </el-card>
          </el-form>
        </div>
        <!-- <div align="center">
          <el-button type="primary" class="button1" @click="update" :disabled="xiugai">修改</el-button>
        </div>-->
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
export default {
  name: "companyDetail",
  data() {
    return {
      logo: "",
      //默认企业图片
      errorImg00: 'this.src="' + require("../company/2.jpg") + '"',
      //默认企业图片
      errorImg01: 'this.src="' + require("../company/1.png") + '"',
      //默认营业执照
      errorImg02: 'this.src="' + require("../company/营业执照.jpg") + '"',
      //默认税务登记
      errorImg03: 'this.src="' + require("../company/税务登记证.jpg") + '"',
      //企业详情路径
      companyDetailContent: "",
      companyId: "",
      usernameX: this.$store.state.user,
      yangshi: true,
      wancheng: true,
      xiugai: false,
      shenhe: true,
      form: {
        businessName: "",
        companyID: "20191006066",
        companyName: "长光卫星国际有限公司",
        Address: "吉林省长春市卫星路8848号",
        postcode: "104300",
        foundingTime: "2015-9-10",
        brNumber: "S100934",
        officeNumber: "17866625034",
        email: "34895611@163.com",
        bussessName: "李林甫",
        product: "微电子元器件制作",
        introduction:
          "少年的肩膀，就该这样才对嘛，什么家国仇恨，浩然正气的，都不要急，先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。",
        cool: "17855555",
        province: "吉林省",
        city: "长春市绿园区",
        registeredCapital: "8.5亿",
        totalAssets: "10亿",
        currentAssets: "2.2亿",
        fixedAssets: "2亿元",
        legalPerson: "杨言",
        workerNumber: "500人",
        deposit_Bank: "中国银行",
        bankNumber: "25206589260388885222201"
        //  @input.native="changeCode"
      },
      form1: {
        businessName: "",
        companyID: "",
        companyName: "",
        address: "",
        postcode: "",
        foundingTime: "",
        brNumber: "",
        officeNumber: "",
        email: "",
        bussessName: "",
        product: "",
        introduction: "",
        cool: "",
        province: "",
        city: "",
        registeredCapital: "",
        totalAssets: "",
        currentAssets: "",
        fixedAssets: "",
        legalPerson: "",
        workerNumber: "",
        deposit_Bank: "",
        bankNumber: ""
      },
      companyId: "",
      companyName: "",
      foundingTime: "",
      brNumber: "",
      addVisible: false,
      imagesbox: [{ id: 0, idView: require("../company/1.png") }],

      tableData123: [
        {
          imgsrc: require("../company/1.png")
        }
      ],
      imgsrc: "",
      shuiwudengjizheng: require("../company/税务登记证.jpg"),
      qiyezhizhao: require("../company/营业执照.jpg")
    };
  },
  filters: {
    formatDate(time) {
      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    this.getParams();
    this.getDate();
  },
  methods: {
    goBack() {
      this.$router.push("/admin/primarysupplyList");
    },
    /*
     *转跳对应任务信息页面
     */
    // 获取 easy-mock 的模拟数据
    getParams() {
      var routerParams = this.$route.query.companyId;
      this.companyId = routerParams;
    },
    //手机号校验
    animate() {
      var re = /^1\d{10}$/;
      let str = this.form1.officeNumber;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.form1.officeNumber = null;
      }
    },
    animate1() {
      var re = /^1\d{10}$/;
      let str = this.form1.businessTel;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.form1.businessTel = null;
      }
    },
    //银行卡号校验/^([1-9]{1})(\d{14}|\d{18})$/
    yinhangkahao() {
      var re = /\d{14}$/;
      let str = this.form1.bankNumber;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.form1.bankNumber = null;
      }
    },
    //邮箱校验
    youxiang() {
      var re = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let str = this.form1.email;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.form1.email = null;
      }
    },
    //邮政编码校验
    youzhengbianma() {
      var re = /\d{6}$/;
      let str = this.form1.postcode;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.form1.postcode = null;
        //alert('抱歉邮箱不合法')
      }
    },
    getDate() {
      var that = this;
      var data = Qs.stringify({
        companyID: this.companyId
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/getCompanyForm1",
          data: data
        })
        .then(response => {

          this.form = response.data.allData.companyDetail[0];
          this.companyId = response.data.allData.companyDetail[0].companyId;
          this.companyName = response.data.allData.companyDetail[0].companyName;
          this.imgsrc = response.data.allData.companyDetail[0].companyPicture;
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
          this.logo = response.data.allData.logo;
        });
    },
    update() {
      this.form1 = this.form;
      this.addVisible = true;
    },

    saveAdd11() {
      var that = this;
      var data = Qs.stringify({
        companyId: this.form1.companyId,
        companyName: this.form1.companyName,
        address: this.form1.address,
        postcode: this.form1.postcode,
        FT: this.form1.foundingTime,
        brNumber: this.form1.brNumber,
        officeNumber: this.form1.officeNumber,
        email: this.form1.email,
        businessName: this.form1.businessName,
        product: this.form1.product,
        introduction: this.form1.introduction,
        cool: this.form1.cool,
        province: this.form1.province,
        city: this.form1.city,
        registeredCapital: this.form1.registeredCapital,
        totalAssets: this.form1.totalAssets,
        currentAssets: this.form1.currentAssets,
        fixedAssets: this.form1.fixedAssets,
        legalPerson: this.form1.legalPerson,
        workerNumber: this.form1.workerNumber,
        deposit_Bank: this.form1.deposit_Bank,
        bankNumber: this.form1.bankNumber
      });

      that.axios({
        method: "post",
        url: "/api/companyDetail/updateCompanyForm",
        data: data
      });

      this.$message.success("提交成功");
      this.addList = {};
      this.addVisible = false;
    },

    changeCode() {
      this.$nextTick(() => {
        if (this.form1.province !== null) {
          this.form1.province = this.form1.province.replace(/[^\d]/g, "");
        }
        if (this.form1.city !== null) {
          this.form1.city = this.form1.city.replace(/[^\d]/g, "");
        }
        if (this.form1.postcode !== null) {
          this.form1.postcode = this.form1.postcode.replace(/[^\d]/g, "");
        }
        if (this.form1.officeNumber !== null) {
          this.form1.officeNumber = this.form1.officeNumber.replace(
            /[^\d]/g,
            ""
          );
        }
        if (this.form1.registeredCapital !== null) {
          this.form1.registeredCapital = this.form1.registeredCapital.replace(
            /[^\d]/g,
            ""
          );
        }
        if (this.form1.totalAssets !== null) {
          this.form1.totalAssets = this.form1.totalAssets.replace(/[^\d]/g, "");
        }
        if (this.form1.fixedAssets !== null) {
          this.form1.fixedAssets = this.form1.fixedAssets.replace(/[^\d]/g, "");
        }
        if (this.form1.currentAssets !== null) {
          this.form1.currentAssets = this.form1.currentAssets.replace(
            /[^\d]/g,
            ""
          );
        }
        if (this.form1.workerNumber !== null) {
          this.form1.workerNumber = this.form1.workerNumber.replace(
            /[^\d]/g,
            ""
          );
        }
        if (this.form1.bankNumber !== null) {
          this.form1.bankNumber = this.form1.bankNumber.replace(/[^\d]/g, "");
        }
      });
    }
  }
};
</script>


<style lang="scss">
.othercompanyDetail {
  .el-card {
    font-size: 14px;
  }
  .box-card {
    width: 860px;
    /* border: 1px solid #00a2e6 ; */
  }
  .formYS .el-input__inner {
    /* // 表格样式调整 */

    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: left;
  }
  .formYS .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #606266;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-carousel__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 100%;
    max-height: 100%;
  }
  .gongsiDetail {
    height: 80px;
  }

  .biaoti {
    font-size: 18px;
  }
  //企业图片
  .qiyetupian {
    width: 900px;
    height: 400px;
  }
  //营业执照
  .yingyezhizhao {
    width: 600px;
    height: 300px;
  }
  .XX {
    text-align: left;
  }
}
</style>
