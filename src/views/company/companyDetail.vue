<template>
<div>
  

   

<el-container>
<<<<<<< HEAD
        <el-aside width="15%">
=======
        <el-aside width="%15">
>>>>>>> d41a3f3e4e25d0dec5ac7f7f031aa2618e7f6dbf
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
<<<<<<< HEAD
        <el-form ref="form" :model="form" label-width="110px">
            <el-row >
                <el-col :span="11">
=======
<el-carousel :interval="5000" arrow="always">
 <el-carousel-item v-for="item in imagesbox" :key="item">
      <img :src="item.idView" class="image">
    </el-carousel-item>
  </el-carousel>
  <el-divider></el-divider>
<h3>企业信息修改</h3>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
<div align="center">
    
        <el-form ref="form" :model="form" label-width="100px">
            <el-row>
                <el-col :span="8">
>>>>>>> d41a3f3e4e25d0dec5ac7f7f031aa2618e7f6dbf
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
</div>
        <div align="center">
            <el-button type="primary" class="button1" @click="update" :disabled=xiugai>修改</el-button>
            <el-button type="primary" class="button1"  :disabled=shenhe @click="dialogVisible = true">审核通过</el-button>
        </div>

        
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>您确定要将该企业审核通过？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="achieve1">确 定</el-button>
  </span>
</el-dialog>

    </el-main>
</el-container>
</div>
</template>
<script>
export default {
    name:'companyDetail',
    data(){
       return {
           dialogVisible: false,
           yangshi:true,
           wancheng:true,
           xiugai:false,
           shenhe:true,
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
          cool:'17855555'        
        },
        imagesbox:[
            {id:0,idView:require("../company/1.png")},
            {id:1,idView:require("../company/2.jpg")},
            {id:2,idView:require("../company/3.jpg")},
        ],
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
                this.shenhe = false;
                console.log(this.yangshi);
        },

        achieve1(){
            this.$message('您已经修改完成');
            this.yangshi = true;
            this.xiugai = false;
            this.dialogVisible = false;
            this.shenhe = true;
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


<style>
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
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item {
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;

    max-width: 100%;
    max-height: 100%;
  
}
.gongsiDetail{
    height: 80px;
}
</style>
