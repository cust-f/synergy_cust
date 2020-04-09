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
                      <el-radio v-model="form.Company_Category" label="0">核心企业</el-radio>
                      <el-radio v-model="form.Company_Category" label="1">供应商</el-radio>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="企业名称" prop="Company_Name">
                    <el-input v-model="form.Company_Name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="select">
                <el-col :span="12">
                  <el-form-item label="企业所在省份" prop="Province">
                    <!-- <el-input v-model="form.Province"></el-input> -->
                    <el-select
                      v-model="form.Province"
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
                    <el-select v-model="form.City" placeholder="请选择城市" style="width: 100%;">
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
                    <el-input v-model="form.Address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="邮政编码">
                    <el-input v-model="form.Postcode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form-item label="企业成立时间" prop="Founding_Time">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.Founding_Time"
                      value-format="yyyy-MM-dd"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="员工人数">
                    <el-input v-model="form.Worker_Number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9" class="select">
                  <el-form-item label="企业业务范围">
                    <el-cascader ref="producted" v-model="form.product" @change="selectProducts"  :options="options" :props="{ multiple: true}" clearable></el-cascader>
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
                    prop="Email"
                    :rules="[
//      { required: false, message: '请输入邮箱地址', trigger: 'blur' },待议
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
                  >
                    <el-input v-model="form.Email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="企业联系人">
                    <el-input v-model="form.Bussess_Name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="办公电话">
                    <el-input v-model="form.Office_Number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="注册资产">
                    <el-input v-model="form.Registered_Capital">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="总资本">
                    <el-input v-model="form.Total_Assets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="固定资产">
                    <el-input v-model="form.Fixed_Assets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="流动资产">
                    <el-input v-model="form.Current_Assets">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="法人代表">
                    <el-input v-model="form.Legal_Person"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="法人联系电话" prop="Legal_Tel">
                    <el-input v-model="form.Legal_Tel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="税务证书登记编号" label-width="130px" prop="TR_Number">
                    <el-input v-model="form.TR_Number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="工商注册号">
                    <el-input v-model="form.BR_Number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="开户银行" prop="Deposit_Bank">
                    <el-input v-model="form.Deposit_Bank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="3">
                  <el-form-item label="银行账户" prop="Bank_Number">
                    <el-input v-model="form.Bank_Number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- <el-row>
                <el-col :span="24" class="detail">
                  <el-form-item label="详细">
                    <el-input
                      type="textarea"
                      :rows="3"
                      style="width:100%;"
                      placeholder="请输入内容"
                      v-model="form.Introduction"
                      class="gongsiDetail"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->
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
      if (!value) {
        callback(new Error("请填写工商注册号"));
      } else if (
        !/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$|[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}-[0-9]{2}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的工商注册号"));
      }
    };
    var validDataTR_Number = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写税务登记号"));
      } else if (!/^[0-9a-zA-z_]{18}$/.test(value)) {
        callback(new Error("请输入正确的税务登记号"));
      }
    };
    var validDataLegal_Tel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写法人联系电话"));
      } else if (
        !/^1[3456789]\d{9}$/.test(value) ||
        !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)
      ) {
        callback(new Error("请输入正确的税务登记号"));
      }
    };
    return {
      rules: {
        Company_Name: [
          { required: true, validator: vaildDataEmpty, trigger: "blur" }
        ],
        Province: [
          { required: true, validator: vaildDataEmpty, trigger: "blur" }
        ],
        useCityrName: [
          { required: true, validator: vaildDataEmpty, trigger: "blur" }
        ],
        product: [
          { required: false, validator: vaildDataEmpty, trigger: "blur" }
        ],
        Founding_Time: [
          { required: true, validator: vaildDataEmpty, trigger: "blur" }
        ],
        Legal_Person: [
          { required: true, validator: vaildDataEmpty, trigger: "blur" }
        ],
        Deposit_Bank: [
          { required: true, validator: vaildDataEmpty, trigger: "blur" }
        ],
        Bank_Number: [{ required: true, type: "number", trigger: "blur" }],
        BR_Number: [
          { required: true, validator: validDataBR_Number, trigger: "blur" }
        ],
        TR_Number: [
          { required: true, validator: validDataTR_Number, trigger: "blur" }
        ],
        Legal_Person: [
          { required: true, validator: vaildDataEmpty, trigger: "blur" }
        ],
        Legal_Tel: [
          { required: true, validator: validDataLegal_Tel, trigger: "blur" }
        ]
      },
      //所有业务范围
      options: [{
          value: '1',
          label: '指南',
          children: [{
            value: '3',
            label: '设计原则'
          }]
        },
        {
            value: '2',
            label: '导航',
            children: [{
              value: '4',
              label: '侧向导航'
            }, {
              value: '5',
              label: '顶部导航'
            }]
          }],
      //平台覆盖的省份
      province: [],
      city: [],
      stair:"",
      selectProduct:[],
      form: {
        Company_Category: "0",
        Company_Name: "",
        Address: "",
        Postcode: null,
        Founding_Time: "",
        BR_Number: "",
        TR_Number: "",
        Office_Number: "",
        Email: "",
        Bussess_Name: "",
        product: [],
        Introduction:
          "少年的肩膀，就该这样才对嘛，什么家国仇恨，浩然正气的，都不要急，先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。",
        Province: "",
        City: "",
        Registered_Capital: "",
        Total_Assets: "",
        Current_Assets: "",
        Fixed_Assets: "",
        Legal_Person: "",
        Legal_Tel: "",
        Worker_Number: "",
        Deposit_Bank: "",
        Bank_Number: ""
      }
    };
  },
  created() {
    this.getBusiness();
    this.getProvince();
    //this.getCity();
  },
  watch:{
    "selectProduct" (newValue,oldValue) {
      if(oldValue.length==0){
        this.stair=newValue[0][0];
        this.checkProduct();
      }else if(oldValue.length>0 && newValue.length>0){
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
          this.form.City = "";
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
    selectProducts(value){
     this.selectProduct= this.form.product;
    },
    //范围
    checkProduct(){
      console.log(this.$refs.producted.getCheckedNodes(false));
      console.log("========================")
      console.log(this.form.product);
      console.log(this.form.product[0][0]);
      console.log("------------------------")
      console.log(this.$refs.producted.getCheckedNodes(true));
      console.log("---======------======-------====")
      
      let p=this.selectProduct;
      let newProduct=[];
      for(let i=0;i<p.length;i++){
        if(p[i][0]== this.stair){
          newProduct.push(p[i]);
        }else{
              this.$message({
                  type: "warning",
                  message: "不能选择多个一级类别"
                });
        }
      }
      this.form.product=newProduct;        
    },
    upLoad() {
      console.log(this.form);
      this.$emit("companyFrom", this.form);
    },
    getBusiness() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/register/getBusiness"
        })
        .then(response => {
          console.log(response);
          this.options = response.data.allData.IndustryInfoList;
        });
    }
  }
};
</script>

<style>

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
.gongsiDetail {
  height: 80px;
}
.select .el-input__inner {
  float: none !important;
}
</style>
