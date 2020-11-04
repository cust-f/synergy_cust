
<template>
  <div class="BG">

    <!--第一行-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="grid-content0">
          <span>首页</span>
            <span>&nbsp;>&nbsp;</span>
            <span>需求一览</span>
            <span>&nbsp;>&nbsp;</span>
            <span>需求详情</span>
        </div>
      </el-col>
    </el-row>
    <!--第二行-->
    <el-row :gutter="gutterCount" >
      <el-col :span="10"  :push="pushCount" :pull="pullCount">
         <div class="grid-content2 bg-purple-dark">
        <h2 style="margin:20px 0;">{{taskDetail.taskName}}</h2>
        <el-divider></el-divider>
        <div class="grid-content3" style="margin-top:50px">      
          
          <p style =" width :50%; float:left">行业类别：{{taskDetail.taskCategoryMain}}</p>
          <p style =" width :50%;float:left">所在地区：吉林省长春市</p>
          
          <p>&nbsp;</p>
          <p style =" width :50%; float:left">联系方式：{{taskDetail.demanderTel}}</p>
          <p style =" width :50%; float:left">需求类型：流通</p>
          <p>&nbsp;</p>
          <p style =" width :50%; float:left">需求开始时间：2019-10-22</p>
          <p style =" width :50%; float:left">需求截止时间：{{taskDetail.deadline| dataFormat("yyyy-MM-dd")}}</p>
          <p>&nbsp;</p>
          <div style="margin:20px 0;">        
           <el-button type="warning" >下载模板</el-button>
           <el-button type="warning" @click="dialogDateVisible=true">申请任务</el-button>
           <el-dialog title="申请" :visible.sync="dialogDateVisible">
              <p style =" width :50%; float:left">行业类别：{{taskDetail.taskCategoryMain}}</p>
              <p style =" width :50%;float:left">所在地区：吉林省长春市</p>
              <p>&nbsp;</p>
              <p style =" width :50%; float:left">联系方式：{{taskDetail.demanderTel}}</p>
              <p style =" width :50%; float:left">需求类型：流通</p>
              <p>&nbsp;</p>
              <p style =" width :50%; float:left">需求开始时间：2019-10-22</p>
              <p style =" width :50%; float:left">需求截止时间：{{taskDetail.deadline| dataFormat("yyyy-MM-dd")}}</p>
              <p>&nbsp;</p>
              <p style =" width :100%; float:left">需求介绍：{{taskDetail.taskDetail}}</p>
              <p>&nbsp;</p>
              <p style =" width :100%; float:left">联系方式：   
                <el-input
                  size="small"
                  prop="phone"
                  prefix-icon="el-icon-phone"
                  placeholder="请输入联系方式"
                  v-model="inputphone"
                  style="width:300px;">
                </el-input>
              </p>
              <p>&nbsp;</p>
              <p align="center">
                <el-button type="warning" @click="MBDownload" >申请</el-button>
              </p>


                

          </el-dialog>
          </div>
        </div>
        </div>
      </el-col>
       <el-col :span="5"  :push="5"  >
          <div class="grid-content4 bg-purple-dark" style="margin-top:0px">
            <h3 style="margin:30px 0;">发布方信息</h3>
             <el-divider></el-divider>
              <div style="margin:30px 90px;">
              <el-image
                style="width: 100px; height: 100px"
                :src= "SRC"/>
              </div>
                <ul>
                <li>发布方名称：{{taskDetail.companyName}}</li>
                <li>&nbsp;</li>
                <!-- <li>发布方介绍：需要从数据库中单独查询</li> -->
                </ul>
          </div>
      </el-col>
    </el-row>

    <!--第三行-->
    <el-row :gutter="gutterCount">
     <el-col :span="16"  :push="pushCount" :pull="pullCount">
         <div class="grid-content5 bg-purple-dark">
           <h3 style="margin-top:-80px;margin-left:5px; padding: 0 10px; border-left: 3px solid #ff5500;">需求介绍</h3>
           <el-divider></el-divider>
           <p style="line-height:40px">&nbsp;&nbsp;&nbsp;&nbsp;{{taskDetail.taskDetail}}</p>
         </div>
     </el-col>
    </el-row>

  </div>
</template>


<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<script>
import Qs from "qs";
export default {
  name: "Home",
  data() {
    return {
      SRC:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578498716057&di=2862e7c5e9dc83020a4698017c207fd8&imgtype=0&src=http%3A%2F%2Fstatic.yjcf360.com%2Fgegu%2Fimg%2F000800.jpg',
      //设定el-cow的值
      gutterCount: 15,
      pushCount:4,
      pullCount:2,
      taskID:this.$route.query.taskID,
      taskDetail:[],
      dialogDateVisible:false,
      inputphone:"",
      rules:{
        phone:[{required:true,message:"请输入联系方式"}]
      }
    };
  },
  created(){
    this.getInfo();
  },
  methods: {
      getInfo(){
        var that = this;
        let data = Qs.stringify({
          taskID: this.taskID,
        });
        that
          .axios({
            method: "post",
            url: "/api/threeMenu/getTaskDetail",
            data: data
          })
          .then(response =>{
          that.taskDetail = response.data;
          console.log(that.taskDetail)
          });
      },
      open() {
        this.$confirm('是否申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '申请成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消申请'
          });          
        });
      },
      //模板下载
      MBDownload() {
        var that = this;
        var data = Qs.stringify({
          taskID: this.taskID
        });
        that
          .axios({
            method: "post",
            url: "/api/threeMenu/DownloadMB",
            data: data
          })
          .then(response => {
            console.log(response.data);
            this.download(response.data);
          });
      },
      // 下载文件
      download(data) {
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", "模板.docx");
        document.body.appendChild(link);
        link.click();
      },
    }
};




</script>



<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->



<style scoped>
/**中间的div块   给gutter留padding*/
.BG {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 20px;
 
}

/**第一行用css样式*/
.grid-content0
{
  border-radius: 4px;
  height: 36px;
  margin-top: 30px;
  font-size: 14px;
  font-style: normal;
}
.grid-content1
{
  border-radius: 4px;
  height: 100px;
}
.grid-content2
{
   font-size: 24px;
    height: 350px;
}
.grid-content3
{
   font-size: 17px;
}
.grid-content4
{
   font-size: 17px;
   height: 500px;
   margin: 20px 0;
}
.grid-content5
{
   font-size: 17px;
   margin: 0 0;
   height: 500px;
}


.fontStyle
{
  font-size: 15px;
}

ul li{list-style-type: none;}

/**布局测试用css*/
.el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #ffffff44;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>