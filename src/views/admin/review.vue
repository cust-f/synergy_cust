<template>
<div>
    <el-container>
        <el-aside width="15%">
        <div class="backGround_0">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>历史记录</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
            </div>
            <div v-for="o in tenderTrendsList" :key="o" class="text item">
                {{ o }}
            </div>  
        </el-card>
        </div>
        </el-aside>
    <el-main>
        <el-form ref="form" :model="form" label-width="110px">
            <el-row >
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
                        <el-input v-model="form.Address" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="邮政编码">
                        <el-input v-model="form.Postcode" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="企业成立时间">
                        <el-input v-model="form.Founding_Time" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="工商注册号">
                        <el-input v-model="form.BR_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="办公电话">
                        <el-input v-model="form.Office_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="电子邮箱">
                        <el-input v-model="form.Email" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="银行账户">
                        <el-input v-model="form.Bank_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="员工人数">
                        <el-input v-model="form.Worker_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
                        <el-row>
                <el-col :span="11">
                    <el-form-item label="总资产">
                        <el-input v-model="form.Total_Assets" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="流动资产">
                        <el-input v-model="form.Current_Assets" :disabled=yangshi></el-input>
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
                <el-col :span="20" >
                    <el-form-item label="详细" >
                            <el-input v-model="form.Introduction" class="gongsiDetail" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>


        <div align="center">
            <el-button type="primary" class="button1" @click="review" :disabled=shenhe>审核通过</el-button>
            <el-button type="primary" class="button1" @click="disreview" :disabled=butongugo>审核未通过</el-button>
        </div>

     
    </el-main>
    </el-container>


<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>




</div>   
</template>
<script>
export default {
    name:'review',
    data(){
        
        return{
             dialogVisible: false,
           yangshi:true,
           butongguo:true,
           shenhe:false,
            form: {
          Company_ID:'20191006066',
          Company_Name: '长光卫星国际有限公司',
          Address: '吉林省长春市卫星路8848号',
          Postcode: '104300',
          Founding_Time: '2015-9-10',
          BR_Number:'S100934',
          Office_Number:'17866625034',
          Email:'34895611@163.com',
          Introduction:'少年的肩膀，就该这样才对嘛，什么家国仇恨，浩然正气的，都不要急，先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。',
          cool:'17855555',
          Total_Assets:'30亿',
          Current_Assets:'4.5亿',        
          Bank_Number:'20256000224679200034',
          Worker_Number:'250'


        },
                               tenderTrendsList:[
        { column_name: "黄河远上白云间" },
        { column_name: "九曲黄河万里沙" },
        { column_name: "君不见黄河之水天上来"},
        { column_name: "白日依山尽，黄河入海流"},
        { column_name: "黄河落天走东海，万里尘沙入胸怀"},
        { column_name: "明月隐高树，长河没晓天"},
        { column_name :"萧萧远树疏林外，一半秋山带夕阳。"},
        { column_name: "黄河西来决昆仑，咆哮万里触龙门。"}
         ],

        }

    },   
     methods:{
        review() {
           
                
                if(this.butongguo){
                    this.butongguo=false;
                }
                
                console.log(this.yangshi); 
                this.$message('审核已经通过');
        },

        disreview(){
                 this.$message('审核尚未通过');
        },
           
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }

    }
}


</script>