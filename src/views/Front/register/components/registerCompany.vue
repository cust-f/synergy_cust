<template>
  <div class="register-company">
    <el-container>
      <el-main>
        <el-divider></el-divider>
        <div style="text-align:center;">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业类别">
                  <el-radio v-model="form.Company_Category" label="0">核心企业</el-radio>
                  <el-radio v-model="form.Company_Category" label="1">供应商</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="form.Company_Name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="select">
              <el-col :span="12">
                <el-form-item label="企业所在省份">
                  <!-- <el-input v-model="form.Province"></el-input> -->
                  <el-select
                    v-model="form.Province"
                    placeholder="请选择省"
                    @change="setCity"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="home in address"
                      :key="home.provinces"
                      :label="home.provinces"
                      :value="home.provinces"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业所在县市">
                  <el-select v-model="form.City" placeholder="请选择城市" style="width: 100%;">
                    <el-option
                      v-for="city in address[province].city"
                      :key="city"
                      :label="city"
                      :value="city"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业地址">
                  <el-input v-model="form.Address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input v-model="form.Postcode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业成立时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.Founding_Time"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工商注册号">
                  <el-input v-model="form.BR_Number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12" class="select">
                <el-form-item label="企业业务范围">
                  <el-select v-model="form.product" multiple placeholder="请选择">
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
                  </el-select>
                  <!-- <el-input v-model="form.product"></!-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱">
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
              <el-col :span="12">
                <el-form-item label="注册资产">
                  <el-input v-model="form.Registered_Capital">
                    <template slot="append">万元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总资本">
                  <el-input v-model="form.Total_Assets">
                    <template slot="append">万元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="固定资产">
                  <el-input v-model="form.Fixed_Assets">
                    <template slot="append">万元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流动资产">
                  <el-input v-model="form.Current_Assets">
                    <template slot="append">万元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="法人代表">
                  <el-input v-model="form.Legal_Person"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工人数">
                  <el-input v-model="form.Worker_Number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户银行">
                  <el-input v-model="form.Deposit_Bank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行账户">
                  <el-input v-model="form.Bank_Number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
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
            </el-row>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "registerCompany",
  data() {
    return {
      //选中的城市
      province: 0,
      //所有业务范围
      options: [],
      //平台覆盖的省份
      address: [
        { provinces: "哈尔滨", city: ["哈尔滨", "滨哈尔", "呃呃呃"] },
        { provinces: "吉林", city: ["长春", "春长", "呃呃呃"] }
      ],
      form: {
        Company_Category: "0",
        Company_Name: "",
        Address: "",
        Postcode: null,
        Founding_Time: "",
        BR_Number: "",
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
        Worker_Number: "",
        Deposit_Bank: "",
        Bank_Number: ""
      }
    };
  },
  created() {
    this.getBusiness();
  },
  methods: {
    setCity(data) {
      var i;
      for (i = 0; i < this.address.length; i++) {
        if (this.address[i].provinces == data) {
          this.province = i;
        }
      }
    },
    upLoad() {
      console.log(this.form)
      this.$emit("companyFrom", this.form);
    },
    getBusiness() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/register/getBusiness"
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
.gongsiDetail {
  height: 80px;
}
.select .el-input__inner {
  float: none !important;
}
</style>
