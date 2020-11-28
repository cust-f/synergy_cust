<template >
<div>
<el-container>


    <el-main>
        
            <el-page-header @back="goBack" content="任务计划">
</el-page-header>
 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form ref="form" :model="form" label-width="110px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="供应商名称">
                        <el-input v-model="form.Supply_Name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="任务名称">
                        <el-input v-model="form.Task_Name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="企业名称">
                        <el-input v-model="form.Company_Name" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="任务编号">
                        <el-input v-model="form.Task_Num" :disabled=yangshi></el-input>
                    </el-form-item>
                </el-col>
                 
            </el-row>
             <el-row>
                <el-col :span="11">
                    <el-form-item label="任务类别">
                        <el-input v-model="form.Task_category" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="开始时间">
                        <el-input v-model="form.Task_Time" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                
            </el-row>


            
           

            <el-row>
                <el-col :span="22" class = "xiangxi">
                    <el-form-item label="详情：" >
                      <!-- <el-input v-model="form.detailsxq" :disabled="true"></el-input> -->
                       <el-input
  type="textarea"
  :rows="5"
  :disabled="true"
  placeholder="面向高端制造业，建立科技咨询及评测服务示范。在科技综合服务平台基础上，开展虚拟现实协同辅助协同设计与流通的科技服务，突破企业内部，企业之间的设计与流通数据。实现设计数据到生产数据的可视化，使数字化技术贯穿设计制造全过程。"
  v-model="textarea">
</el-input> 
                        <!--   <el-input
  type="textarea"
  :rows="5"
  placeholder="  面向高端制造业，建立科技咨询及评测服务示范。在科技综合服务平台基础上，开展虚拟现实协同辅助协同设计与流通的科技服务，突破企业内部，企业之间的设计与流通数据。实现设计数据到生产数据的可视化，使数字化技术贯穿设计制造全过程。 "
  
  v-model="textarea"
    >
</el-input>  -->
                    </el-form-item>
                    
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="20" class = "xiangxi">
                    <el-form-item label="附件：" >
                       <el-link href="https://element.eleme.io" target="_blank" :underline="false">长光卫星国际有限公司关于购买高端装备装备制造领域的科技服务合同.pdf</el-link>
                          <!--  <el-input
  type="textarea"
  :rows="5"
  placeholder="长光卫星国际有限公司关于购买高端装备装备制造领域的科技服务合同.pdf"
  v-model="textarea">
</el-input> -->
                    </el-form-item>
                    
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="11">
                    <el-form-item label="">
                        
                    </el-form-item>
                </el-col>
                  
                <!-- <el-button type="primary" round @click="submitUpload">上传附件</el-button> -->
                <!-- <el-button type="primary" round @click="submitDownload">下载附件</el-button> -->
                 
             
            
           <!--  </el-row>
             <el-button type="primary" round>上传附件</el-button>
            <el-row> -->

            </el-row>
            <!-- <el-row>
               <el-col :span="11">
                    <el-form-item label="其他">
                        <el-input v-model="form.name2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
 -->

        </el-form>


        <div align="center">
           <!-- <el-button type="primary" class="button1" >审核</el-button> -->
            <el-button type="primary" plain>审核</el-button>
            <!-- <el-button type="primary" class="button1" @click="achieve" :disabled=wancheng></el-button> -->
        </div> 


       
    </el-main>
</el-container>
</div>
</template>
<script>
export default {
    name:'supplyContract',
    data(){
       return {
          textarea1: '',
           textarea: '',
           
           yangshi:true,
           wancheng:true,
           xiugai:false,
        form: {
          Supply_Name:'长春光华微电子设备工程中心',
          Company_Name: '长光卫星国际有限公司',
          detailsxq:' 面向高端制造业，建立科技咨询及评测服务示范。在科技综合服务平台基础上，开展虚拟现实协同辅助协同设计与流通的科技服务，突破企业内部，企业之间的设计与流通数据。',
          Task_Name:'高端装备制造',
          Task_Num:'10011001010',
          Task_category:'A类',
          Task_Time:'2019-12-28',
        },

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
            this.$router.push('/admin/dashboard',);
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
