
<template>
  <div class="BG">

    <!--第一行  保留，不一定用-->
    <el-row :gutter="gutterCount">
      <el-col :span="18" :push="pushCount" :pull="pullCount">
        <div class="grid-content0 bg-purple-dark">
          <el-carousel height="300px">
            <el-carousel-item v-for="item in 4" :key="item">
              <img :src="item" alt="" >
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <!--第二行  网站访问统计数据-->
    <el-row :gutter="gutterCount" >
      <el-col :span="18"  :push="pushCount" :pull="pullCount">
        <div class="grid-content1  fontStyle0">
        <span>本月成交任务:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{taskCountMonth}}</font>&nbsp;&nbsp;项</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>需求任务:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{demandTaskCount}}</font>&nbsp;&nbsp;项</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>流通任务:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{circulationTaskCount}}</font>&nbsp;&nbsp;项</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>认证企业:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{certifiedEnterpriseCount}}</font>&nbsp;&nbsp;家</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>认证供应商:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{certifiedSupplierCount}}</font>&nbsp;&nbsp;家</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </el-col>
    </el-row>


     <!--第三行  分割线-->
    <el-row :gutter="gutterCount">
      <el-col :span="18" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>需求</a>
        </div>
      </el-col>
    </el-row>

    <!--第四行   需求任务及已完成需求-->
    <el-row :gutter="gutterCount">

      <el-col :span="8" :push="pushCount">
        <div class="grid-content bg-purple-dark">
          <el-card >
            <div slot="header">
              <span>需求任务</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="p in demandTaskList" :key="p" style="padding-bottom: 10px;">
              <div style="float:left; width:10%;">{{"["+p.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:10%">{{"["+p.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:60%">{{p.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{p.sTime}}</div>
            
            </div>
            


        </el-card>
          
        </div>
      </el-col>

      <el-col :span="8"  :push="pushCount">
        <div class="grid-content bg-purple-dark">
            <el-card >
            <div slot="header">
              <span>已完成需求</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="p in completeddemandTaskList" :key="p">
              <div style="float:left; width:10%;">{{"["+p.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:10%">{{"["+p.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:60%">{{p.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{p.sTime}}</div>
            </div>
            

        </el-card>
          
        </div>
      </el-col>

      <el-col :span="2"  :push="pushCount">
        <div class="grid-content bg-purple-dark">
            <el-card >
              <div slot="header">
                <span>需求任务</span>
                  <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
              </div>

              <div v-for="p in demandTaskList" :key="p">
                <div style="float:left; width:10%;">{{"["+p.category+"]"}}&nbsp;&nbsp;</div>
                <div style="float:left; width:10%">{{"["+p.companyName+"]"}}&nbsp;&nbsp;</div>
                <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:60%">{{p.name}}</div>
                <div style="float:right;width:20%">&nbsp;&nbsp;{{p.sTime}}</div>
              </div>
              <el-divider></el-divider>
            </el-card>
          
        </div>
      </el-col>

    </el-row>

    <!--第五行  分割线-->
    <el-row :gutter="gutterCount">
      <el-col :span="18" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>流通</a>
        </div>
      </el-col>
    </el-row>

    <!--第六行   需求任务及已完成需求-->
    <el-row :gutter="gutterCount">

      <el-col :span="8" :push="pushCount">
        <div class="grid-content bg-purple-dark">
          <el-card >
            <div slot="header">
              <span>流通需求</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="p in demandTaskList" :key="p">
              <div style="float:left; width:10%;">{{"["+p.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:10%">{{"["+p.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:60%">{{p.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{p.sTime}}</div>
            </div>
            <el-divider></el-divider>


        </el-card>
          
        </div>
      </el-col>

      <el-col :span="8"  :push="pushCount">
        <div class="grid-content bg-purple-dark">
            <el-card>
            <div slot="header">
              <span>已完成流通</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="p in completeddemandTaskList" :key="p">
              <div style="float:left; width:10%;">{{"["+p.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:10%">{{"["+p.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:60%">{{p.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{p.sTime}}</div>
            </div>
            <el-divider></el-divider>

        </el-card>
          
        </div>
      </el-col>

      <el-col :span="2"  :push="pushCount">
        <div class="grid-content bg-purple-dark">

          
        </div>
      </el-col>

    </el-row>


    <!--第七行  分割线-->
    <el-row :gutter="gutterCount">
      <el-col :span="18" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>网站数据</a>
        </div>
      </el-col>
    </el-row>



    <!--第八行  网站数据统计图表-->
    <el-row :gutter="gutterCount" >
     <el-col :span="6"   :push="pushCount">
        <div class="grid-content bg-purple-dark">

          
        </div>
      </el-col>

      <el-col :span="6"  :push="pushCount">
        <div class="grid-content bg-purple-dark">

          
        </div>
      </el-col>

      <el-col :span="6"   :push="pushCount">
        <div class="grid-content bg-purple-dark">

          
        </div>
      </el-col>
    </el-row>

    
    <!--第九行  留一行-->
    <el-row :gutter="gutterCount" >
      <el-col :span="18"  :push="pushCount" :pull="pullCount">
        <div class="grid-content bg-purple-dark">

          
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

      //第一行图片的URL
      url0:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",

      //设定el-cow的值
      gutterCount: 15,
      pushCount:3,
      pullCount:3,

      //第二行网站统计数据
      taskCountMonth:233,
      demandTaskCount:212,
      circulationTaskCount:666,
      certifiedEnterpriseCount:231,
      certifiedSupplierCount:526,
      // 图片地址数组
            img_list:[
               "../assets/images/home/illust_71187447_20181111_232431.png",
              "../assets/images/home/illust_71492221_20181111_232951.png",
              "../assets/images/home/illust_71588619_20181111_233227.jpg",
            ],
      
      //需求任务数组
      demandTaskList:
      [
        {category:"2333",companyName:"6666",name:"6666666666666666666666666666666666666666666666666666666",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"2333",companyName:"6666",name:"6666666666666666666666666666666666666666666666666666666",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"2333",companyName:"6666",name:"6666666666666666666666666666666666666666666666666666666",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"2333",companyName:"6666",name:"6666666666666666666666666666666666666666666666666666666",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"2333",companyName:"6666",name:"6666666666666666666666666666666666666666666666666666666",sTime:"2019-09-06",eTime:"2019-12-31"},
      ],
      completeddemandTaskList:
      [
        {category:"2333",companyName:"6666",name:"6666666666666666666666666666666666666666666666666666666",sTime:"2019-09-06",eTime:"2019-12-31"},
      ],

      rmList: [
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
       "建筑施工",
      ],

      jzList: [
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
      ],
      glList: [
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
      ],
      tlList: [
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
      ],
      dlList: [
       "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        ],

      jzList0: [
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       "中国第一汽车股份有限公司红旗E115电动汽车项目-移动点焊机",
       
      ],
      glList0: [
       "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
        "解放UPS及相关设备更新项目货物采购招标公告",
       
      ],
      tlList0: [
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
       "存储交换机端口激活模块采购项目",
      
      ],
      dlList0: [
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
       "MKS1632数控外圆磨尾架维修采购项目公告",
        ],
        ltList0: [
       "xxxx需求任务采购情况",
       "xxxx需求任务采购情况",
       "xxxx需求任务采购情况",
       "xxxx需求任务采购情况",
       "xxxx需求任务采购情况",
       "xxxx需求任务采购情况",
       "xxxx需求任务采购情况",
       "xxxx需求任务采购情况",
        ],




    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
      recordTabletender(){
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
  height: 300px;
}
/**第二行用css样式 网站访问统计数据块*/
.grid-content1
{
  border-radius: 4px;
  height: 50px;
  /**文字显示居中 */
  text-align: center;
  line-height: 50px;
}
/**网站统计数据字体样式 */
.fontStyle0
{
  font-size: 20px;
  color:rgb(167, 165, 165);
}
.fontStyle
{
  font-size: 24px;
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
    &:last-child {
      margin-bottom: 0;
    }
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