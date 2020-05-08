<template>
  <div class="companyDetail">
    <el-container>
      <el-main>
        <!-- <el-carousel :interval="5000" arrow="always">
 <el-carousel-item v-for="item in imagesbox" :key="item">
      <img v-bind:src="item.idView" class="image">
    </el-carousel-item>
        </el-carousel>-->
        <div width="500" align="center" height="200px">
          <el-image class="qiyetupian" :src="imgsrc" :onerror="errorImg01">


          </el-image>
        </div>
        <!-- <el-table :data="tableData123">
<el-table-column prop="imgsrc" label="书籍海报" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgsrc" min-width="70" height="70">
        </template>
      </el-table-column>
        </el-table>-->
        <el-divider></el-divider>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业营业执照</div>
        <br />
        <div>
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label>
                  <el-image align="left" class="yingyezhizhao" :src="qiyezhizhao" :onerror="errorImg02"></el-image>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业税务登记证</div>
        <br />
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label align="left">
                <el-image align="left" class="yingyezhizhao" :src="shuiwudengjizheng" :onerror="errorImg03"></el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div>
        <br />

        <div>
          <el-rate label="企业星级：" v-model="form.star" disabled text-color="#ff9900"></el-rate>
        </div>
        <br />
        <div align="right" class="formYS">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="form.companyName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业联络电话">
                  <el-input v-model="form.businessTel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

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

            <!-- <el-row>
              <el-col :span="24">
                <el-form-item label="企业简介">
                  <el-input v-model="form.introduction" :disabled="yangshi"></el-input>
                </el-form-item>
                <el-form-item label="详细" >
                            <el-input 
                            type="textarea"
                            :rows="1"
                            style="width:100%;"
                            placeholder="请输入内容" v-model="form.introduction" :disabled=yangshi ></el-input>
                    </el-form-item>
               
              </el-col>
            </el-row> -->
          </el-form>
        </div>
        <div align="center">
          <el-button type="primary" class="button1" @click="update" :disabled="xiugai">修改</el-button>
          <el-button type="primary" class="button1" @click="update1" :disabled="xiugai">修改企业简介</el-button>
        </div>

        <!-- 新增弹出框 -->

        <el-dialog :visible.sync="addVisible" width="50%">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业图片修改</div>
          <div>
            <el-upload
              class="avatar-uploader"
              action="/api/MainTaskInformation/importTP"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imgsrc" :src="imgsrc" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <br />

          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业营业执照修改</div>
          <div>
            <el-upload
              class="avatar-uploader"
              action="/api/MainTaskInformation/importTP"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="qiyezhizhao" :src="qiyezhizhao" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <br />
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业税务登记证修改</div>

          <div>
            <el-upload
              class="avatar-uploader"
              action="/api/MainTaskInformation/importTP"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shuiwudengjizheng" :src="shuiwudengjizheng" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <br />
          <div
            class="biaoti"
            style="padding: 0 10px; border-left: 3px solid #4e58c5;"
            font-size="14px"
          >信息修改</div>
          <br />
          <br />
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="form1" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="form1.companyName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人代表">
                  <el-input v-model="form1.legalPerson" :disabled="true"></el-input>
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
                  <el-input v-model="form1.brNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业所在省份">
                  <el-input οninput="value=value.replace(/[^\d]/g,'')" v-model="form1.province"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业所在县市">
                  <el-input οninput="value=value.replace(/[^\d]/g,'')" v-model="form1.city"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业地址">
                  <el-input v-model="form1.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input @blur="youzhengbianma()" v-model="form1.postcode"></el-input>
                  <font color="red">
                    <el-span v-if="this.form1.postcode === null">您的邮政编码输入不正确</el-span>
                  </font>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业业务范围">
                  <el-input v-model="form1.product"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱">
                  <el-input v-model="form1.email" @blur="youxiang()"></el-input>
                  <font color="red">
                    <el-span v-if="this.form1.email === null">您的电子邮箱输入不正确</el-span>
                  </font>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业联系人">
                  <el-input v-model="form1.businessName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公室电话">
                  <el-input @blur="animate()" v-model="form1.officeNumber"></el-input>
                  <font color="red">
                    <el-span v-if="this.form1.officeNumber === null">您的办公室电话输入不正确</el-span>
                  </font>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资产">
                  <el-input
                    οninput="value=value.replace(/[^\d]/g,'')"
                    v-model="form1.registeredCapital"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总资本">
                  <el-input οninput="value=value.replace(/[^\d]/g,'')" v-model="form1.totalAssets"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="固定资产">
                  <el-input οninput="value=value.replace(/[^\d]/g,'')" v-model="form1.fixedAssets"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流动资产">
                  <el-input
                    οninput="value=value.replace(/[^\d]/g,'')"
                    v-model="form1.currentAssets"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业联络电话">
                  <el-input v-model="form1.businessTel" @blur="animate1()"></el-input>
                  <font color="red">
                    <el-span v-if="this.form1.businessTel === null">您的企业联络电话输入不正确</el-span>
                  </font>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="员工人数">
                  <el-input οninput="value=value.replace(/[^\d]/g,'')" v-model="form1.workerNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户银行">
                  <el-input v-model="form1.deposit_Bank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行账户">
                  <el-input @blur="yinhangkahao()" v-model="form1.bankNumber"></el-input>
                  <font color="red">
                    <el-span v-if="this.form1.bankNumber === null">您的银行账户输入不正确</el-span>
                  </font>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="xiangxi">
                <el-form-item label="企业简介">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width:100%;"
                    placeholder="请输入内容"
                    v-model="form1.introduction"
                    class="gongsiDetail"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd11">确 定</el-button>
          </span>
        </el-dialog>
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
      usernameX: this.$store.state.user,
      imageUrl: "", //shuwu照片
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
      shuiwudengjizheng: "",
      shuiwudengjizheng1: "",

      qiyezhizhao: "",
      qiyezhizhao1: "",

      tableData123: [
        {
          imgsrc: require("../company/1.png")
        }
      ],
      imgsrc: "",
      imgsrc1:"",
      //默认企业图片
      errorImg01: 'this.src="' + require("../company/1.png") + '"',
            //默认营业执照
      errorImg02: 'this.src="' + require("../company/营业执照.jpg") + '"',
            //默认税务登记
      errorImg03: 'this.src="' + require("../company/税务登记证.jpg") + '"',
    };
  },
  //  computed: {
  //   imgsrc() {
  //     return "/course/img/" + this.course.courseId + ".png";
  //   }
  // },
  filters: {
    formatDate(time) {
      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    this.getDate();
  },

  methods: {
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
        userName: localStorage.getItem("ms_username")
      });
      console.log(localStorage.getItem("ms_username"));
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/getCompanyForm",
          data: data
        })
        .then(response => {
          console.log(response);

          this.form = response.data.allData.companyDetail[0];
          this.companyId = response.data.allData.companyDetail[0].companyId;
          this.companyName = response.data.allData.companyDetail[0].companyName;
          this.imgsrc = response.data.allData.companyDetail[0].companyPicture;
          this.qiyezhizhao =
          response.data.allData.companyDetail[0].businessLicence;
          this.shuiwudengjizheng =
          response.data.allData.companyDetail[0].tRCertificate;
          this.qiyezhizhao1 = this.qiyezhizhao.substring(22);
          this.shuiwudengjizheng1 = this.shuiwudengjizheng.substring(22);
          this.imgsrc1 = this.imgsrc.substring(22);
          console.log(this.imgsrc1);
          console.log(this.qiyezhizhao1);
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
        foundingTimeold: this.form.foundingTime,
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
        bankNumber: this.form1.bankNumber,
        star:this.form.star,
        businessTel: this.form.businessTel,
        businessLicence: this.qiyezhizhao1,
        tRCertificate: this.shuiwudengjizheng1,
        companyPicture: this.imgsrc1
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
    //上传税务登记样式触发
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.shuiwudengjizheng = URL.createObjectURL(file.raw);
      this.shuiwudengjizheng1 = res;
    },
    //企业营业执照
    handleAvatarSuccess1(res, file) {
      console.log(res);

      console.log(file);
      this.qiyezhizhao = URL.createObjectURL(file.raw);
      this.qiyezhizhao1 = res;
    },
        //上传税务登记样式触发
    handleAvatarSuccess3(res, file) {
      console.log(res);
      console.log(file);
      this.imgsrc = URL.createObjectURL(file.raw);
      this.imgsrc1 = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.companyDetail {
  .el-upload--text {
    width: 180px;
  }
  //上传按钮的样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
  .el-dialog__body {
    padding-right: 40px;
    padding-top: 20px;
  }
  //弹出框的样式
  .el-dialog__header {
    padding-right: 0%;
    padding-top: 0%;
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
  //企业图片
  .qiyetupian {
    width: 900px;
    height: 400px;
  }
  //营业制造
  .yingyezhizhao {
    width: 600px;
    height: 300px;
  }
  .biaoti {
    font-size: 18px;
  }
  .liangtuheji {
    width: 1200px;
    height: 200px;
  }
}
</style>
