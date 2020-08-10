<template>
  <div class="companyDetail">
    <el-container>
      <el-main>
        <!-- <el-carousel :interval="5000" arrow="always">
 <el-carousel-item v-for="item in imagesbox" :key="item">
      <img v-bind:src="item.idView" class="image">
    </el-carousel-item>
        </el-carousel>-->
         <div class="picture">
        <el-row>
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业图片</div>
          <el-col :span="20">
           
            <el-upload 
              action="/api/company/updatePicture"
              list-type="picture-card"
              :class="{hide:hideUpload}"
              :file-list="companyImage"
              accept=".jpg, .png"
              :data="updateData('companyPicture')"
              :on-preview="handleCompanyPictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-change="onChange"
              :on-remove="onRemove"
              
            >
              <el-button size="small" type="primary">点击添加图片</el-button>
            </el-upload>
            <el-dialog :visible.sync="companyImageDialog" >
              <img width="100%" :src="companyImage" alt />
            </el-dialog>
            <!-- <el-form-item label>
                  <el-image style="margin-left:-100px;margin-top:5px" class="yingyezhizhao" :src="qiyezhizhao" :onerror="errorImg02"></el-image>
                </el-form-item>
            -->
          </el-col>
          <!-- <el-image class="qiyetupian" :src="form.companyPicture" :onerror="errorImg01"> -->
        </el-row>
         
       
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <div style="display:inline-block">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
                企业LOGO
                <a
                  style="margin-left:10px;font-size:14px;color:#409EFF;"
                  @click="handlePictureCardPreview('logo')"
                >预览</a>
              </div>
              <el-upload
                action="/api/company/updatePicture"
                accept=".jpg, .png"
                :show-file-list="false"
                :on-success="handleAvatarSuccessLogo"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                :data="updateData('Logo')"
              >
                <img v-if="logoImage" :src="logoImage" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog :visible.sync="imageDialog">
                <img width="100%" :src="image" alt />
              </el-dialog>
            </div>
          </el-col>
          <!-- 税务证书 -->
          <el-col :span="8">
            <div style="display:inline-block">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
                企业税务登记证
                <a
                  style="margin-left:10px;font-size:14px;color:#409EFF;"
                  @click="handlePictureCardPreview('tax')"
                >预览</a>
              </div>
              <el-upload
                action="/api/company/updatePicture"
                accept=".jpg, .png"
                :show-file-list="false"
                :on-success="handleAvatarSuccessTR"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                :data="updateData('tRCertificate')"
              >
                <img v-if="taxImage" :src="taxImage" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
          <!-- 营业执照-->
          <el-col :span="8">
            <div style="display:inline-block">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
                企业营业执照
                <a
                  style="margin-left:10px;font-size:14px;color:#409EFF;"
                  @click="handlePictureCardPreview('business')"
                >预览</a>
              </div>
              <el-upload
                action="/api/company/updatePicture"
                accept=".jpg, .png"
                :show-file-list="false"
                :on-success="handleAvatarSuccessBusiness"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                :data="updateData('businessLicence')"
              >
                <img v-if="businessImage" :src="businessImage" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        </div>
        <br />
         <el-row>
          <el-col :span="12">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div>

        <br />
       
        <div>
          <el-rate label="企业星级：" v-model="form.star" disabled text-color="#ff9900"></el-rate>
        </div>
          </el-col>
           <el-col :span="12">
        <div align="right">
          <el-button type="primary" class="button1" @click="update">修改企业信息</el-button>
          <el-button type="primary" class="button1" @click="update1">修改企业详情</el-button>
        </div>
           </el-col>
        </el-row>
        <br />
        <!-- --------------------------------- ------------------------------>
        <!-- ------------------------企业信息 ------------------------------>
        <!-- --------------------------------- ------------------------------>
        <div align="right" class="formYS">
          <el-form :model="form" label-width="110px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="form.companyName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业联络电话">
                  <el-input v-model="form.businessTel" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业所在省份">
                  <el-input v-model="form.province" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业所在县市">
                  <el-input v-model="form.city" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业地址">
                  <el-input v-model="form.address" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input v-model="form.postcode" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业成立时间">
                  <el-input v-model="foundingTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工商注册号">
                  <el-input v-model="form.brNumber" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">

                <el-form-item label="企业业务范围">
                   <el-tooltip :content="form.product" placement="top" effect="light">
                  <el-input v-model="form.product" disabled></el-input>
                   </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="12">        
                
                  
                <el-form-item label="电子邮箱">
                  
                  <el-input v-model="form.email" disabled></el-input>
                
                </el-form-item>
                  
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业联系人">
                  <el-input v-model="form.businessName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公室电话">
                  <el-input v-model="form.officeNumber" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资产">
                  <el-input v-model="form.registeredCapital" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总资本">
                  <el-input v-model="form.totalAssets" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="固定资产">
                  <el-input v-model="form.fixedAssets" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流动资产">
                  <el-input v-model="form.currentAssets" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="法人代表">
                  <el-input v-model="form.legalPerson" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工人数">
                  <el-input v-model="form.workerNumber" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户银行">
                  <el-input v-model="form.deposit_Bank" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行账户">
                  <el-input v-model="form.bankNumber" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="企业详情">
                  <br />
                  <div class="leftDet" v-html="introductiont" style="margin-left:-70px"></div>
                  <!-- <el-input v-model="form.introduction" disabled></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        

        <!-- --------------------------------- ------------------------------>
        <!-- ------------------------新增弹出框 ------------------------------>
        <!-- --------------------------------- ------------------------------>
        <el-dialog :visible.sync="addVisible" width="50%">
          <div
            class="biaoti"
            style="padding: 0 10px; border-left: 3px solid #4e58c5;"
            font-size="14px"
          >信息修改</div>
          <br />
          <br />
          <div  class="formYS">
            <el-form ref="form" status-icon :model="formEditor" label-width="120px" :rules="rules">
              <el-row  >
                <el-col :span="12" >
                  <el-form-item label="企业名称" prop="companyName">
                     <el-tooltip :content="formEditor.companyName" placement="top" effect="light">
                    <el-input v-model="formEditor.companyName" disabled></el-input>
                     </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="法人代表" prop="legalPerson">
                    <el-input v-model="formEditor.legalPerson" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  >
                <el-col :span="12" >
                  <el-form-item label="企业注册时间" prop="registerTime">
                    <el-input v-model="registerTime" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"  >
                  <el-form-item label="工商注册号" prop="brNumber">
                    <el-input v-model="formEditor.brNumber" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row class="select" style="margin-bottom: 16px;">
                <el-col :span="12">
                  <el-form-item label="企业所在省份" prop="province">
                    <!-- <el-input v-model="form.province"></el-input> -->
                    <el-select
                      v-model="formEditor.province"
                      @change="getCity"
                      placeholder="请选择省"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="pro in province"
                        :key="pro.id"
                        :label="pro.districtName"
                        :value="pro.districtName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业所在县市" prop="City">
                    <el-select v-model="formEditor.city" placeholder="请选择城市" style="width: 100%;">
                      <el-option
                        v-for="c in city"
                        :key="c.id"
                        :label="c.districtName"
                        :value="c.districtName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="企业地址">
                    <el-tooltip :content="formEditor.address" placement="top" effect="light">
                    <el-input v-model="formEditor.address"></el-input>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item label="邮政编码">
                    <el-input v-model="formEditor.postcode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="企业成立时间" prop="foundingTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="formEditor.foundingTime"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item label="员工人数">
                    <el-input v-model="formEditor.workerNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" class="select">
                  <el-form-item label="企业业务范围" prop="middleProduct">
                    
                    <el-cascader
                      ref="producted"
                      v-model="formEditor.middleProduct"
                      @change="selectProducts"
                      :options="options"
                      :props="props"
                    ></el-cascader>
                    
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label="电子邮箱"
                    prop="email"
                    :rules="[ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
                  >
                   <el-tooltip :content="formEditor.email" placement="top" effect="light">
                    <el-input v-model="formEditor.email"></el-input>
                   </el-tooltip>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="企业联系人">
                    <el-input v-model="formEditor.businessName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="办公电话">
                    <el-input v-model="formEditor.officeNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin-bottom: 16px;">
                <el-col :span="12">
                  <el-form-item label="注册资产">
                    <el-input v-model="formEditor.registeredCapital">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item label="总资本">
                    <el-input v-model="formEditor.totalAssets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin-bottom: 16px;">
                <el-col :span="12">
                  <el-form-item label="固定资产">
                    <el-input v-model="formEditor.fixedAssets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item label="流动资产">
                    <el-input v-model="formEditor.currentAssets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="税务证书编号" prop="trNumber">
                    <el-input v-model="formEditor.trNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item label="法人联系电话" prop="legalTel">
                    <el-input v-model="formEditor.legalTel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="开户银行" prop="deposit_Bank">
                    <el-input v-model="formEditor.deposit_Bank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item label="银行账户" prop="bankNumber">
                    <el-input v-model="formEditor.bankNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveAdd11('form')">确 定</el-button>
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
    var vaildDataEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入信息"));
      } else {
        callback();
      }
    };
    //  var vaildProductEmpty = (rule, value, callback) => {
    //     if (!value) {
    //       callback(new Error("请选择业务范围"));
    //     } else {
    //       callback();
    //     }
    //   };
    var validDataBR_Number = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写工商注册号"));
      } else if (
        !/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$|[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}-[0-9]{2}$/.test(
          value
        )
      ) {
        //callback(new Error("请输入正确的工商注册号"));
        callback();
      } else {
        callback();
      }
    };
    var validDataTR_Number = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写税务登记号"));
      } else if (!/^[0-9a-zA-z_]{18}$/.test(value)) {
        callback(new Error("请输入正确的税务登记号"));
      } else {
        callback();
      }
    };
    var validDataLegal_Tel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写法人联系电话"));
      } else if (
        !/^1[3456789]\d{9}$/.test(value) ||
        !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)
      ) {
        callback();
      } else {
        callback();
      }
    };
    return {
      usernameX: this.$store.state.user,
      image: "",
      imageDialog: false,
      logoImage: "",
      taxImage: "",
      businessImage: "",
      companyImage: [],
      companyImageDialog: false,
      hideUpload: false,
      formDate: "",
      dialogVisible: false,
      rules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        middleProduct: [
          {
            required: true,
            type: "array",
            // validatorv: vaildProductEmpty,
            message: "请选择业务范围",
            trigger: "change"
          }
        ],
        foundingTime: [
          { required: true, message: "请选择企业成立时间", trigger: "change" }
        ],
        deposit_Bank: [
          { required: true, message: "请输入开户银行名称", trigger: "blur" }
        ],
        bankNumber: [
          { required: true, message: "请输入银行账号", trigger: "blur" }
          //  {type: 'number',message: '银行账号为数字值', trigger: "blur" }
        ],
        brNumber: [
          { required: true, validator: validDataBR_Number, trigger: "blur" }
        ],
        trNumber: [
          { required: true, validator: validDataTR_Number, trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "请输入法人代表", trigger: "blur" }
        ],
        legalTel: [
          { required: true, validator: validDataLegal_Tel, trigger: "blur" }
        ]
      },
      formEditor: {
        companyId: "",
        companyCategory: "0",
        companyName: "",
        address: new String(),
        postcode: new Number(),
        foundingTime: "",
        brNumber: "",
        trNumber: "",
        officeNumber: "",
        email: "",
        businessName: "",
        product: "",
        middleProduct: [],
        province: "",
        city: "",
        registeredCapital: "",
        totalAssets: "",
        currentAssets: "",
        fixedAssets: "",
        legalPerson: "",
        legalTel: "",
        workerNumber: new Number(),
        deposit_Bank: "",
        bankNumber: "",
        companyPicture: "",
        businessLicence: "",
        tRCertificate: "",
        companyCategory: "",
        registerTime: ""
      },
      foundingTime:"",
      registerTime:"",
      form: {},
      introductiont: "",
      addVisible: false,
      //所有业务范围
      options: [],
      props: { multiple: true, value: "id", label: "name" },
      //平台覆盖的省份
      province: [],
      city: [],
      stair: "",
      selectProduct: [],
      oldSelectProduct: []
    };
  },
  //  computed: {
  //   imgsrc() {
  //     return "/course/img/" + this.course.courseId + ".png";
  //   }
  // },
  // filters: {
  //   formatDate(time) {
  //     var index = time.lastIndexOf(".");
  //     time = time.substring(0, index);
  //     let date = new Date(time);
  //     return formatDate(date, "yyyy-MM-dd hh:mm");
  //   }
  // },
  created() {
    this.getDate();
    this.getPicture();
  },
  watch: {
    selectProduct(newValue, oldValue) {
      if (oldValue.length == 0) {
        // console.log("00000000000000000");
        this.stair = newValue[0][0];
        // console.log(this.stair);
        this.checkProduct();
      } else if (oldValue.length > 0 && newValue.length > 0) {
        this.checkProduct();
      }
    }
  },
  methods: {
    //读取信息
    // -----------------------------------------------------------------------------------------------------------------------------------
    update1() {
      this.$router.push({
        path: "/admin/companyEditor",
        query: { companyId: this.form.companyId }
      });
    },
    getDate() {
      var that = this;
      var data = Qs.stringify({
        userName: sessionStorage.getItem("ms_username")
      });
      that
        .axios({
          method: "post",
          url: "/api/company/getCompanyAllInfo",
          data: data
        })
        .then(response => {
          this.form = response.data.allData.detail;
          this.foundingTime = this.formatDate(this.form.foundingTime,0);
          this.registerTime = this.formatDate(this.form.registerTime,0);
          this.introductiont = response.data.allData.content;
              this.getOldProduct();
        });
    },
    getPicture() {
      var that = this;
      var timestamp = new Date().getTime();
      var data = Qs.stringify({
        userName: sessionStorage.getItem("ms_username"),
        time: timestamp
      });
      that
        .axios({
          method: "post",
          url: "/api/company/getPicture",
          data: data,
          params: {
            date: timestamp
          }
        })
        .then(response => {
          this.companyImage = response.data.allData.companyPicture;
          this.logoImage = response.data.allData.logo;
          this.businessImage = response.data.allData.business;
          this.taxImage = response.data.allData.tax;
          this.hideUpload = this.companyImage.length >= 3;
        });
    },
    getProvince() {
      let that = this;
      that.axios.post("/api/district/HaChangProvince").then(response => {
        this.province = response.data.allData.Province;
      });
    },
    getCity(name) {
      let id;
      let that = this;
      this.province.forEach(pro => {
        if (pro.districtName == name) {
          id = pro.id;
        }
      });
      let data = Qs.stringify({
        pid: id
      });
      that
        .axios({
          method: "post",
          url: "/api/district/city",
          data: data
        })
        .then(response => {
          //  console.log(this.form.province)
          this.city = response.data.allData.city;
          this.formEditor.city = "";
        });
    },
    getBusiness() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/industry/getIndustry"
        })
        .then(response => {
          this.options = response.data.allData.allProduct;
        });
    },
    getOldProduct() {
      var that = this;
      let data = Qs.stringify({
        companyId: this.form.companyId
      });
      that
        .axios({
          method: "post",
          url: "/api/company/getCompanyProduct",
          data: data
        })
        .then(response => {
               this.form["middleProduct"]= [];
        for (var i = 0, len = response.data.allData.selectProduct.length; i < len; i++) {
          this.form["middleProduct"].push(response.data.allData.selectProduct[ i ]);
        }
               this.selectProduct = this.form.middleProduct;
        });
    },
    //=====================================================================================================================================
    update() {
      this.formEditor = JSON.parse(JSON.stringify(this.form));
      this.getProvince();
      this.getBusiness();
      this.getOldProduct();
       this.addVisible = true;
    },
    //-----------------------------------------------------------------------
    updateData(name) {
      let data = { type: name, companyId: this.form.companyId };
      return data;
    },
    formatDate(time,type) {
      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      if(type==0)
         return formatDate(date, "yyyy-MM-dd");
      else
         return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    //-----------------------------------------------------------------------
    saveAdd11(formName) {
      this.$refs[formName].validate(valid => {
        let a = [];
        if (valid) {
          var that = this;
          a.push(this.stair);
          for (let i = 0; i < this.formEditor.middleProduct.length; i++) {
            a.push(this.formEditor.middleProduct[i][1]);
          }
          this.formEditor.product = a.toString();
          this.formEditor.foundingTime = this.formatDate(this.formEditor.foundingTime,1);
          this.formEditor.registerTime = this.formatDate(this.formEditor.registerTime,1);
          var data = Qs.stringify(this.formEditor);
          that.axios({
            method: "post",
            url: "/api/company/updateCompanyAllInfo",
            data: data
          }).then(response=>{
          this.$message({
            type: "success",
            message: "修改企业详情成功"
          });
          this.selectProduct = [];
          this.$refs['form'].resetFields();
              this.getDate();
          this.addVisible = false;
          })
        } else {
          this.$message({
            type: "warning",
            message: "请正确修改信息"
          });
        }
      });
    },
    close() {
      this.selectProduct = [];
      this.$refs['form'].resetFields();
      this.addVisible = false;
    },
    //================================================================

    //Log回调
    handleAvatarSuccessLogo(res, file) {
      this.logoImage = URL.createObjectURL(file.raw);
      this.$message({
        type: "success",
        message: "修改企业Logo成功"
      });
    },
    //营业执照回调
    handleAvatarSuccessBusiness(res, file) {
      this.businessImage = URL.createObjectURL(file.raw);
      this.$message({
        type: "success",
        message: "修改企业营业执照成功"
      });
    },
    //税务回调
    handleAvatarSuccessTR(res, file) {
      this.taxImage = URL.createObjectURL(file.raw);
      this.$message({
        type: "success",
        message: "修改企业税务登记书成功"
      });
    },
    //企业基本信息-营业执照图片回调
    businessLicensePictureCardPreview(file) {
      this.businessLicenseImageUrl = file.url;
    },
    //企业基本信息-税务证书图片回调
    taxPictureCardPreview(file) {
      this.form.taxPicture = file.url;
    },
    //企业图片修改
    handlePictureCardPreview(type) {
      switch (type) {
        case "logo":
          this.image = this.logoImage;
          break;
        case "business":
          this.image = this.businessImage;
          break;
        case "tax":
          this.image = this.taxImage;
          break;
      }
      this.imageDialog = true;
    },
    handleCompanyPictureCardPreview(file) {
      this.companyImage = file.url;
      this.companyImageDialog = true;
    },
    // 限制上传三张图片
    onChange(file, fileList) {
      // this.sequence = fileList;
      this.hideUpload = fileList.length >= 3;
    },
    onRemove(file, fileList) {
      // console.log(file.url);
      var that = this;
      var data = Qs.stringify({
        companyId: this.form.companyId,
        pictureUrl: file.url
      });
      that
        .axios({
          method: "post",
          url: "/api/company/deletePicture",
          data: data
        })
        .then(response => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.hideUpload = fileList.length >= 3;
        });
    },
    //=======================================================
    selectProducts(value) {
      // console.log("------------------------------");
      // console.log(this.formEditor);
      this.selectProduct = this.formEditor.middleProduct;
    },
    //范围
    checkProduct() {
      let p = this.selectProduct;
      let newProduct = [];
      for (let i = 0; i < p.length; i++) {
        if (p[i][0] == this.stair) {
          newProduct.push(p[i]);
        } else {
          this.$message({
            type: "warning",
            message: "不能选择多个一级类别"
          });
        }
      }
      // this.$nextTick(() => {
      this.formEditor.middleProduct = newProduct;
      // });
    }
  }
};
</script>


<style lang="scss" >
.companyDetail {
  //企业图片
  // .companyP{
  //   .img{
  //     display: inline-block;
  //     width:200px;
  //     height:200px
  //   }
  // }
  //企业详情
  .leftDet {
    float: left;
    text-align: left;
    width: 95%;
  }
  .picture{  
  .el-upload--text {
    width: 200px;
    height: 200px;
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
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .hide .el-upload--picture-card {
    display: none;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
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
  //营业执照
  .yingyezhizhao {
    width: 200px;
    height: 200px;
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
