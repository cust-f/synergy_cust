<template>
  <div>
    <el-container>
      <el-main>
        <div font-size="24px">
            <el-page-header @back="goBack" content="企业信息审核">
            </el-page-header>        </div>
        <br />
        <div class="box">
          <el-form ref="form" :model="form" label-width="110px" class="box">
            <el-row>
              <el-col :span="11">
                <el-form-item label="企业ID">
                  <el-input v-model="form.Company_ID" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="企业名称">
                  <el-input v-model="form.Company_Name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="企业地址">
                  <el-input v-model="form.Address" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="邮政编码">
                  <el-input v-model="form.Postcode" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="企业成立时间">
                  <el-input v-model="form.Founding_Time" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="工商注册号">
                  <el-input v-model="form.BR_Number" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="办公电话">
                  <el-input v-model="form.Office_Number" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="电子邮箱">
                  <el-input v-model="form.Email" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="银行账户">
                  <el-input v-model="form.Bank_Number" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="员工人数">
                  <el-input v-model="form.Worker_Number" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="总资产">
                  <el-input v-model="form.Total_Assets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="流动资产">
                  <el-input v-model="form.Current_Assets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="活动名称2">
                  <el-input v-model="form.name2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="活动区域2">
                  <el-select v-model="form.region2" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="详细">
                  <el-input  type="textarea" v-model="form.Introduction" class="gongsiDetail" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div align="center">
          <el-button
            type="success"
            round
            class="button1"
            :disabled="shenhe"
            @click="dialogVisible = true"
          >审核通过</el-button>
          <el-button type="danger" round class="button1" @click="open" :disabled="butongugo">审核未通过</el-button>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>您确定要将该企业审核通过？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "review",
  data() {
    return {
      dialogVisible: false,
      yangshi: true,
      butongguo: true,
      shenhe: false,
      form: {
        Company_ID: "20191006066",
        Company_Name: "长光卫星国际有限公司",
        Address: "吉林省长春市卫星路8848号",
        Postcode: "104300",
        Founding_Time: "2015-9-10",
        BR_Number: "S100934",
        Office_Number: "17866625034",
        Email: "34895611@163.com",
        Introduction:
          "2015年10月7日，由公司自主研发的“吉林一号”组星成功发射,开创了我国商业卫星应用的先河,同时也创造了由一个研发团队一箭成功发射四星的历史。“吉林一号”卫星是我国第一颗自主研发的商用高分辨率遥感卫星、我国第一颗以一个省的名义冠名发射的自主研发卫星、我国第一颗自主研发的“星载一体化”商用卫星,我国第一颗自主研发的米级高清动态视频卫星，也是我国第一次以灵巧方式在轨成功成像、国产CMOS第一次在轨技术验证。",
        cool: "17855555",
        Total_Assets: "30亿",
        Current_Assets: "4.5亿",
        Bank_Number: "20256000224679200034",
        Worker_Number: "250"
      },
      
    };
  },
  methods: {
     goBack() {
        
        this.$router.push('/admin/mainStaskShow');
      
      },
    disreview() {
      this.$message("审核尚未通过");
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
     open() {
        this.$prompt('请输入审核不通过原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })}
  }

  }
</script>
<style>
.box {
  font-size: 20px;
}
</style>