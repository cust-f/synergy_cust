<template>
  <div class="register-company">
    <el-card shadow="never" style="margin-bottom:30px;height:100%;">
      <div slot="header" class="clearfix">
        <span>新增企业信息</span>
      </div>
      <el-container>
        <el-main>
          <div style="text-align:center;">
            <el-form ref="form" status-icon :model="form" label-width="110px" :rules="rules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="企业类别">
                    <div style="float:left;">
                      <el-radio v-model="form.companyCategory" label="0">核心企业</el-radio>
                      <el-radio v-model="form.companyCategory" label="1">供应商</el-radio>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="企业名称" prop="companyName">
                    <el-input v-model="form.companyName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row class="select">
                <el-col :span="12">
                  <el-form-item label="企业所在省份" prop="province">
                    <!-- <el-input v-model="form.province"></el-input> -->
                    <el-select
                      v-model="form.province"
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
                    <el-select v-model="form.city" placeholder="请选择城市" style="width: 100%;">
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
                <el-col :span="9">
                  <el-form-item label="企业地址">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="邮政编码">
                    <el-input v-model="form.postcode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="企业成立时间" prop="foundingTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.foundingTime"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="员工人数">
                    <el-input v-model="form.workerNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9" class="select">
                  <el-form-item label="企业业务范围" prop="middleProduct">
                    <el-cascader
                      ref="producted"
                      v-model="form.middleProduct"
                      @change="selectProducts"
                      :options="options"
                      :props="props"
                      clearable
                    ></el-cascader>
                    <!-- <el-select v-model="form.product" multiple placeholder="请选择">
                      <el-option-group
                        v-for="group in options"
                        :key="group.industryName"
                        :label="group.industryName"
                      >
                        <el-option
                          v-for="item in group.children"
                          :key="item.industryName"
                          :label="item.industryName"
                          :value="item.industryName"
                        ></el-option>
                      </el-option-group>
                    </el-select>-->
                    <!-- <el-input v-model="form.product"></!-->
                  </el-form-item>
                </el-col>

                <el-col :span="9" :offset="3">
                  <el-form-item
                    label="电子邮箱"
                    prop="email"
                    :rules="[ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
                  >
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="企业联系人">
                    <el-input v-model="form.businessName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="办公电话">
                    <el-input v-model="form.officeNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="注册资产">
                    <el-input v-model="form.registeredCapital">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="总资本">
                    <el-input v-model="form.totalAssets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="固定资产">
                    <el-input v-model="form.fixedAssets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="流动资产">
                    <el-input v-model="form.currentAssets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="法人代表" prop="legalPerson">
                    <el-input v-model="form.legalPerson"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="法人联系电话" prop="legalTel">
                    <el-input v-model="form.legalTel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="税务证书登记编号"  prop="trNumber">
                    <el-input v-model="form.trNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="工商注册号" prop="brNumber">
                    <el-input v-model="form.brNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="开户银行" prop="deposit_Bank">
                    <el-input v-model="form.deposit_Bank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="银行账户" prop="bankNumber">
                    <el-input v-model="form.bankNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  name: "registerCompany",
  data() {
    var vaildDataEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入信息"));
      } else {
        callback();
      }
    };
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
      //所有业务范围
      options: [],
      props: { multiple: true, value: "id", label: "name" },
      //平台覆盖的省份
      province: [],
      city: [],
      stair: "",
      selectProduct: [],
      form: {
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
        // Introduction:
        //   "少年的肩膀，就该这样才对嘛，什么家国仇恨，浩然正气的，都不要急，先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。",
        Province: "",
        city: "",
        registeredCapital: new Number(),
        totalAssets: new Number(),
        currentAssets: new Number(),
        fixedAssets: new Number(),
        legalPerson: "",
        legalTel: "",
        workerNumber: new Number(),
        deposit_Bank: "",
        bankNumber: ""
      }
    };
  },
  created() {
    this.getBusiness();
    this.getProvince();
    //this.getCity();
  },
  watch: {
    selectProduct(newValue, oldValue) {
      if (oldValue.length == 0) {
        this.stair = newValue[0][0];
        this.checkProduct();
      } else if (oldValue.length > 0 && newValue.length > 0) {
        this.checkProduct();
      }
    }
  },
  methods: {
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
          console.log(response);
          this.city = response.data.allData.city;
          this.form.city = "";
        });
    },
    // setCity(data) {
    //   var i;
    //   for (i = 0; i < this.address.length; i++) {
    //     if (this.address[i].provinces == data) {
    //       this.province = i;
    //     }
    //   }
    // },
    selectProducts(value) {
      this.selectProduct = this.form.middleProduct;
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
      this.form.middleProduct = newProduct;
      console.log(this.form.middleProduct);
    },
    upLoad(formName) {
      this.$refs[formName].validate(valid => {
        let a = [];
        if (valid) {
          a.push(this.stair);
          for (let i = 0; i < this.form.middleProduct.length; i++) {
            a.push(this.form.middleProduct[i][1]);
          }
          this.form.product = a.toString();
          this.$emit("companyFrom", this.form.companyName, true);
        } else {
          this.$message({
            type: "warning",
            message: "下一步失败"
          });
          this.$emit("companyFrom", this.form.companyName, false);
        }
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
          console.log(response);
          this.options = response.data.allData.allProduct;
        });
    },
    registerCompanyDetail() {
      let that = this;
      var data = Qs.stringify(this.form);
      //传递企业信息
      that
        .axios({
          method: "post",
          url: "/api/register/company",
          data: data
        })
        .then(response => {
          if (response.data.code == 200) {
            this.$emit("registerUserDe");
          }
        });
    }
  }
};
</script>

<style >
.register-company {
  width: 1000px;
  height: 100%;
  margin-bottom: 30px;
  margin: 0 auto;
}
.register-company .el-input__inner {
  width: 250px;
  float: left;
}
.register-company .el-select {
  width: 250px !important;
  float: left;
}
.register-company .el-form-item__error {
  line-height: 0px;
  padding-top: 0px;
}
.register-company .select .el-form-item__error {
  line-height: 1 !important;
  padding-top: 4px !important;
}
.gongsiDetail {
  height: 80px;
}
.select .el-input__inner {
  float: none !important;
}
</style>
