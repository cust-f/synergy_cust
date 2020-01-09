<template>
  <div class="BG">

    <!--第一行  保留，不一定用-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="grid-content0">
          <el-breadcrumb separator="/" class="fontStyle">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">需求任务</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <!--第二行  本月需求信息统计-->
    <el-row :gutter="gutterCount" >
      <el-col :span="20"  :push="pushCount" :pull="pullCount">
        <div class="grid-content1  fontStyle0">
        <h3 style="color:black;">需求任务</h3>
        </div>
      </el-col>
    </el-row>


    <!--第九行  留一行-->
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


              <el-collapse-item title="任务类别" name="2">
                <el-radio v-model="radio0" label="1">不限</el-radio>
                <el-radio v-model="radio0" label="2">采购</el-radio>
                <el-radio v-model="radio0" label="3">维修</el-radio>
                <el-radio v-model="radio0" label="4">制作</el-radio>
                <el-radio v-model="radio0" label="5">设计</el-radio>
                <el-radio v-model="radio0" label="6">运输</el-radio>
              </el-collapse-item>

              <el-collapse-item title="发布企业ID" name="3">
                <el-radio v-model="radio1" label="1">不限</el-radio>
                <el-input v-model="input" placeholder="请输入企业ID"></el-input>
              </el-collapse-item>
              <span style=" width :100%; float:left;margin:50px 0">本月更新了:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{taskCountMonth}}</font>&nbsp;&nbsp;条需求信息</span>
              
          </el-collapse>
        </div>
      </el-col>
      <el-col :span="16"  :push="pushCount" :pull="pullCount">
        <div class="grid-content4">

            <el-table
            :data="tableData"
            style="width: 100%">
              <el-table-column
              prop="Begin_Time"
              label="发布日期"
              width="100">
              </el-table-column>
              <el-table-column
              prop="Main_Task_Type"
              label="任务类别"
              width="100">
              </el-table-column>
              <el-table-column
              prop="Company_Name"
              label="企业名称"
              width="100">
              </el-table-column>
              <el-table-column
              prop="Main_Task_Name"
              label="任务名称"
              width="250">
              </el-table-column>
              <el-table-column
              prop="Principal_ID"
              label="项目负责人"
              width="100">
              </el-table-column>
              <el-table-column
              prop="Deadline"
              label="截止日期"
              width="100">
              </el-table-column>
              <el-table-column
              label="操作"
              width="100">
              <el-button @click="home" type="text" size="small">查看详情</el-button>
               
              </el-table-column>
        </el-table>
        </div>
          <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
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
      //发布地区的单选框数值
      radio1:'1',
      //任务截至时间
      value: new Date(),

      input:123,
      //设定el-cow的值
      gutterCount: 15,
      pushCount:2,
      pullCount:2,
      pushCount0:3,

      //第二行网站统计数据
      taskCountMonth:233,
     
      //需求任务详细信息数组
      tableData: [
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
       {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        }, 
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
         {
          //发布时间
          Begin_Time:'2019-03-13',
          //任务类别
          Main_Task_Type:'运输',
          //企业名称
          Company_Name:'一汽',
    
          //任务名称
          Main_Task_Name:'危险品运输半挂车货箱采购项目',
          //项目负责人
          Principal_ID:'王小虎',
          //截止日期
          Deadline:'2019-05-15'
        },
        ],

    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
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
}
/**第二行用css样式 网站访问统计数据块*/
.grid-content1
{
  border-radius: 4px;
  height: 50px;
  width:100%;
  line-height: 50px;
  margin: 0 252px;
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
  height: 1400px;
}
.block
{
  margin: 0 180px;
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