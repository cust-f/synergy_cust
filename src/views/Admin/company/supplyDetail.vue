<template >
<div>
<el-container>


    <el-main>
        
            <el-page-header @back="goBack" content="详情页面">
</el-page-header>
 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form ref="form" :model="form" label-width="110px">
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
                    <el-form-item label="企业所在省份">
                        <el-input v-model="form.Provice" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="企业所在县市">
                        <el-input v-model="form.City" :disabled=yangshi></el-input>
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
                    <el-form-item label="供应商业务范围">
                        <el-input v-model="form.Product" :disabled=yangshi></el-input>
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
                    <el-form-item label="供应商联系人">
                        <el-input v-model="form.Bussess_Name" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="办公电话">
                        <el-input v-model="form.Office_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="注册资产">
                        <el-input v-model="form.Registered_Capital" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="总资本">
                        <el-input v-model="form.Total_Assets" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="固定资产">
                        <el-input v-model="form.Fixed_Assets" :disabled=yangshi></el-input>
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
                    <el-form-item label="法人代表">
                        <el-input v-model="form.Legal_Person" :disabled=yangshi></el-input>
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
                    <el-form-item label="开户银行">
                        <el-input v-model="form.Deposit_Bank" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="银行账户">
                        <el-input v-model="form.Bank_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>



        


            <el-row>
                <el-col :span="20" class = "xiangxi">
                    <el-form-item label="详细" >
                            <el-input v-model="form.Introduction" class="gongsiDetail" :disabled="true"></el-input>
                    </el-form-item>
                    
                </el-col>
            </el-row>

        </el-form>


        <div align="center">
            <el-button type="primary" class="button1" @click="update" :disabled=xiugai>修改</el-button>
            <el-button type="primary" class="button1" @click="achieve" :disabled=wancheng>完成</el-button>
        </div>


       
    </el-main>
</el-container>
</div>
</template>
<script>
export default {
    name:'supplyDetail',
    data(){
       return {
           
           yangshi:true,
           wancheng:true,
           xiugai:false,
        form: {
          Company_ID:'20191006066',
          Company_Name: '长光卫星国际有限公司',
          Address: '吉林省长春市卫星路8848号',
          Postcode: '104300',
          Founding_Time: '2015-09-10',
          BR_Number:'S100934',
          Office_Number:'17866625034',
          Email:'34895611@163.com',
          Bussess_Name:'李林甫',
          Product:'微电子元器件制作',
          Introduction:'少年的肩膀，就该这样才对嘛，什么家国仇恨，浩然正气的，都不要急，先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。',
          cool:'17855555',
          Provice:'吉林省',
          City:'长春市绿园区',
          Registered_Capital:'8.5亿',
          Total_Assets:'10亿',
          Current_Assets:'2.2亿',
          Fixed_Assets:'2亿元',
          Legal_Person:'杨言',
          Worker_Number:'500人',
          Deposit_Bank:'中国银行',
          Bank_Number:'25206589260388885222201',

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
    };
    },
    methods:{
        update() {
                if (this.yangshi) {
                    this.yangshi=false;
                }
                else{
                    this.yangshi=true;
                }
                if(this.wancheng){
                    this.wancheng=false;
                }
                
                this.xiugai = true;
                console.log(this.yangshi);
        },
        achieve(){
            this.yangshi = true;
            this.xiugai = false;
        },
        goBack()
        {
            this.$router.push('/admin/supplyBussess',);
        }
    }
}
</script>




<style>

.backGround_0
{
  float: left;
  height:calc(55vh - 160px);
  width: 90.8%;
  background-color: aqua;
}
.gongsiDetail .el-input__inner{
    height: 80px;
}

.con{
    width:500px;
    height: 1000px;
    margin:0 auto;
    text-align: center
}
</style>
