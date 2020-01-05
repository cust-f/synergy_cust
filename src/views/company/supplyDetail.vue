<template >
<div>
<el-container>
    <el-aside width="%15">
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
        
            <el-page-header @back="goBack" content="详情页面">
</el-page-header>
 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form ref="form" :model="form" label-width="100px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="企业ID">
                        <el-input v-model="form.Company_ID" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="企业名称">
                        <el-input v-model="form.Company_Name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="企业地址">
                        <el-input v-model="form.Address" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮政编码">
                        <el-input v-model="form.Postcode" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="企业成立时间">
                        <el-input v-model="form.Founding_Time" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="工商注册号">
                        <el-input v-model="form.BR_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
               <el-col :span="8">
                    <el-form-item label="供应商业务范围">
                        <el-input v-model="form.Product" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电子邮箱">
                        <el-input v-model="form.Email" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="供应商联系人">
                        <el-input v-model="form.Bussess_Name" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="办公电话">
                        <el-input v-model="form.Office_Number" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
 
            </el-row>


            <el-row>
                <el-col :span="8">
                    <el-form-item label="活动名称2">
                        <el-input v-model="form.name2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动区域2">
                        <el-select v-model="form.region2" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="16" class = "xiangxi">
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
          Founding_Time: '2015-9-10',
          BR_Number:'S100934',
          Office_Number:'17866625034',
          Email:'34895611@163.com',
          Bussess_Name:'李林甫',
          Product:'微电子元器件制作',
          Introduction:'少年的肩膀，就该这样才对嘛，什么家国仇恨，浩然正气的，都不要急，先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。',
          cool:'17855555'        
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
            this.$router.push('/supplyBussess');
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
</style>
