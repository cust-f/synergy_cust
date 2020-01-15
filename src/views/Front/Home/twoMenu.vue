<template>
  <div class="BG">

    <!--第一行 -->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="grid-content0">
          <el-breadcrumb separator="/" class="fontStyle">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a>需求任务</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <!--第二行  本月需求信息统计-->
    <el-row :gutter="gutterCount" >
      <el-col :span="20"  :push="pushCount" :pull="pullCount">
        <div class="grid-content0">
        <h3 style="color:black;position: relative;left:20.4%;">需求任务</h3>
        </div>
      </el-col>
    </el-row>


    <el-row :gutter="gutterCount" >
      <el-col :span="4"  :push="pushCount" :pull="pullCount">
         
        <div class="grid-content4">
          
            <el-collapse v-model="activeNames" @change="handleChange">
              
              <el-collapse-item title="发布时间" name="1">
                <el-radio v-model="radio" label="1">不限</el-radio>
                <el-radio v-model="radio" label="2">近一周</el-radio>
                <el-radio v-model="radio" label="3">近一个月</el-radio>
                <el-radio v-model="radio" label="4">近半年</el-radio>
                <el-radio v-model="radio" label="5">近一年</el-radio>
              </el-collapse-item>


              <el-collapse-item title="行业类别" name="2">
                <el-radio v-model="radio0" label="1">不限</el-radio>
                <el-radio v-model="radio0" label="2">交通运输设备</el-radio>
                <el-radio v-model="radio0" label="3">仪器仪表及文化、办公用机械</el-radio>
                <el-radio v-model="radio0" label="4">通信设备、计算机及其他电子设备</el-radio>
                <el-radio v-model="radio0" label="5">电气机械及器材</el-radio>
                <el-radio v-model="radio0" label="6">专用设备</el-radio>
                <el-radio v-model="radio0" label="7">通用设备</el-radio>
              </el-collapse-item>

              <el-collapse-item title="企业" name="3">
                <el-input v-model="input" placeholder="请输入企业"></el-input>
              </el-collapse-item>
              <span style=" width :100%; float:left;margin:50px 0">本月更新了:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{taskCountMonth}}</font>&nbsp;&nbsp;条需求信息</span>
              
          </el-collapse>
        </div>
      </el-col>
      <el-col :span="16"  :push="pushCount" :pull="pullCount">
        <div class="grid-content5">

            <el-table
            :data="tableData"
            style="width: 100%">
              <el-table-column
              prop="beginTime"
              label="发布时间"
              width="100">
              </el-table-column>

              <el-table-column
              prop="finishTime"
              label="完成时间"
              width="100">
              </el-table-column>

              <el-table-column
              prop="industryType"
              label="行业类别"
              width="100">
              </el-table-column>

              <el-table-column
              prop="demandType"
              label="需求类型"
              width="100">
              </el-table-column>

              <el-table-column
              prop="company"
              label="企业"
              width="150">
              </el-table-column>

              <el-table-column
              prop="demandName"
              label="需求名称"
              width="200">
              </el-table-column>

              <el-table-column
              label="操作"
              width="100">
              <el-button @click="remarkDetail" type="text" size="small">查看详情</el-button>               
              </el-table-column>

        </el-table>
        </div>
          <!-- <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div> -->
      </el-col>
    </el-row>

    
  </div>
</template>


<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<script>
export default {
  name: "Home",
  data() {
    return {
      
      //默认激活的筛选框name
      activeNames: ['1'],
      //发布时间的单选框数值
       radio: '1',
      //任务类别的单选框数值
      radio0:'1',
      //任务截至时间
      value: new Date(),

      input:"",
      //设定el-cow的值
      gutterCount: 15,
      pushCount:4,
      pullCount:2,
      pushCount0:3,

      //第二行网站统计数据
      taskCountMonth:233,
     
      //需求任务详细信息数组
      tableData: [
        {
          //发布时间
          beginTime:'2019-03-13',
          //完成时间
          finishTime:'2019-03-13',
          //行业类别
          industryType:'通信设备',
          //需求类型
          demandType:'流通',
          //企业
          company:'一汽集团有限公司',
          //需求名称
          demandName:'TNGA项目组装线安装工程'
        },
        {
          //发布时间
          beginTime:'2019-03-13',
          //完成时间
          finishTime:'2019-03-13',
          //行业类别
          industryType:'通信设备',
          //需求类型
          demandType:'流通',
          //企业
          company:'一汽集团有限公司',
          //需求名称
          demandName:'TNGA项目组装线安装工程'
        },
       {
          //发布时间
          beginTime:'2019-03-13',
          //完成时间
          finishTime:'2019-03-13',
          //行业类别
          industryType:'通信设备',
          //需求类型
          demandType:'流通',
          //企业
          company:'一汽集团有限公司',
          //需求名称
          demandName:'TNGA项目组装线安装工程'
        },
        {
         //发布时间
          beginTime:'2019-03-13',
          //完成时间
          finishTime:'2019-03-13',
          //行业类别
          industryType:'通信设备',
          //需求类型
          demandType:'流通',
          //企业
          company:'一汽集团有限公司',
          //需求名称
          demandName:'TNGA项目组装线安装工程'
        },
        {
          //发布时间
          beginTime:'2019-03-13',
          //完成时间
          finishTime:'2019-03-13',
          //行业类别
          industryType:'通信设备',
          //需求类型
          demandType:'流通',
          //企业
          company:'一汽集团有限公司',
          //需求名称
          demandName:'TNGA项目组装线安装工程'
        },
        ],

    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */remarkDetail() {
      this.$router.push("/threeMenu");
    },
      recordTabletender(){
      },
      handleChange(val) {
        console.log(val);
      }
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
  margin-top: 20px;
}
/**第二行用css样式 网站访问统计数据块*/
.grid-content1
{
  border-radius: 4px;
  height: 50px;
  width:100%;
  line-height: 50px;
  margin: 0 250px;
}
.grid-content2
{
  border-radius: 4px;
  height: 400px;
}
.grid-content3
{
  border-radius: 4px;
  height: 400px;
}
.grid-content4
{
  border-radius: 4px;
  height: 400px;
}
.grid-content5
{
  border-radius: 4px;
  height: 400px;
  width: 850px;
}
.block
{
  /*margin: 0 180px;*/
  position: relative;
  left:20%;
}


/**网站统计数据字体样式 */
.fontStyle0
{
  font-size: 14px;
  color:rgb(167, 165, 165);
}
.fontStyle
{
  font-size: 15px;
  color:orangered;
}

/**划分页面标识*/
.big_bt {
    width: 370px;
    margin: 0 auto;
    border-bottom: solid 3px #000;
    margin-bottom: 40px;
}
.big_bt a {
    display: block;
    font-size: 26px;
    color: #000;
    font-family: "微软雅黑";
    width: 180px;
    background: #fff;
    text-align: center;
    margin: 0 auto;
    position: relative;
    top: 18px;
}


/**布局测试用css*/
.el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  

ul li {
  list-style: none;
  margin-bottom: 5px;
  overflow: hidden;
}
.some-show{
  white-space: nowrap;/* 规定段落中的文本不进行换行 */
  text-overflow: ellipsis; /*文字段在容器内超宽时，截断该文字段并且续以省略号*/
  overflow: hidden;
}
.tender-notice{
border:1px solid #d3d7d4;
}
.tender-header{
    padding:15px;
    border-bottom: 1px solid #d3d7d4;
}
.tender-header span{
    font-size: 800;
    font-size: 18px;
}
.tender-header-some{
    padding:20px;
    font-size: 15px;
    color: #a1a3a6;
}
/* .tender-header-some ul li{
    margin-bottom: 15px;
} */
</style>