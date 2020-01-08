
<template>
<el-container>
    <el-main>
  <div class="BG">
    <!--第一行  保留，不一定用-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="grid-content0">
          <el-carousel height="400px">

            <!--备注，需要向img_list写入图片地址-->
            <el-carousel-item v-for="item in img_list" :key="item">
              
              <img :src="item" alt="" >
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <!--第二行  网站访问统计数据-->
    <el-row :gutter="gutterCount" >
      <el-col :span="20"  :push="pushCount" :pull="pullCount">
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
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>需求</a>
        </div>
      </el-col>
    </el-row>

    <!--第四行   需求任务及已完成需求-->
    <el-row :gutter="gutterCount">
      <!--需求任务-->
      <el-col :span="8" :push="pushCount">
        <div class="grid-content2 ">
          <el-card class="grid-content2 ">
            <div slot="header">
              <span>需求任务</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="p in demandTaskList" :key="p.name" style="padding-bottom: 20px;">
              <div style="float:left; width:15%;">{{"["+p.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:15%">{{"["+p.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{p.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{p.sTime}}</div>
            
            </div>
            


        </el-card>
          
        </div>
      </el-col>
      <!--已完成需求-->
      <el-col :span="8"  :push="pushCount">
        <div class="grid-content2 ">
            <el-card class="grid-content2 ">
            <div slot="header">
              <span>已完成需求</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="i in completeddemandTaskList" :key="i.name">
              <div style="float:left; width:15%;">{{"["+i.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:15%">{{"["+i.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{i.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{i.sTime}}</div>
            </div>
            

        </el-card>
          
        </div>
      </el-col>
      <!--核心企业名单-->
      <el-col :span="4"  :push="pushCount">
        <div class="grid-content2 ">
            <el-card class="grid-content2 ">
              <div slot="header">
                <span>核心企业</span>
                  <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
              </div>

              <div v-for="l in corebusinessList" :key="l.name">
                <div style="float:left; width:30%;">{{"["+l.category+"]"}}&nbsp;</div>
                <div style="float:left; width:70%">{{l.companyName}}&nbsp;&nbsp;</div>
              </div>
            </el-card>
          
        </div>
      </el-col>

    </el-row>

    <!--第五行  分割线-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>流通</a>
        </div>
      </el-col>
    </el-row>

    <!--第六行   流通需求及已完成流通-->
    <el-row :gutter="gutterCount">
      <!--流通需求-->
      <el-col :span="8" :push="pushCount">
        <div class="grid-content bg-purple-dark">
          <el-card class="grid-content2 ">
            <div slot="header">
              <span>流通需求</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="u in demandforcirculationList" :key="u.name">
              <div style="float:left; width:15%;">{{"["+u.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:15%">{{"["+u.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{u.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{u.sTime}}</div>
            </div>
            


        </el-card>
          
        </div>
      </el-col>
      <!--已完成流通-->
      <el-col :span="8"  :push="pushCount">
        <div class="grid-content bg-purple-dark">
            <el-card class="grid-content2 ">
            <div slot="header">
              <span>已完成流通</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="j in completecirculationList" :key="j.name">
              <div style="float:left; width:15%;">{{"["+j.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:15%">{{"["+j.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{j.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{j.sTime}}</div>
            </div>
            

        </el-card>
          
        </div>
      </el-col>
      <!--供应商信息-->
      <el-col :span="4"  :push="pushCount">
        <div class="grid-content bg-purple-dark">
          <el-card class="grid-content2 ">
              <div slot="header">
                <span>供应商</span>
                  <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
              </div>

              <div v-for="h in supplierlist" :key="h.name">
                <div style="float:left; width:40%;">{{"["+h.category+"]"}}&nbsp;&nbsp;</div>
                <div style="float:left; width:60%">{{h.companyName}}&nbsp;</div>
              </div>
            </el-card>
          
        </div>
      </el-col>

    </el-row>


    <!--第七行  分割线-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>网站数据</a>
        </div>
      </el-col>
    </el-row>



    <!--第八行  网站数据统计图表-->
    <el-row :gutter="gutterCount" >
     <el-col :span="6"   :push="pushCount0">
        <div class="grid-content3 bg-purple-dark">

          
        </div>
      </el-col>

      <el-col :span="6"  :push="pushCount0">
        <div class="grid-content3 bg-purple-dark">

          
        </div>
      </el-col>

      <el-col :span="6"   :push="pushCount0">
        <div class="grid-content3 bg-purple-dark">

          
        </div>
      </el-col>
    </el-row>

    
    <!--第九行  留一行-->
    <el-row :gutter="gutterCount" >
      <el-col :span="20"  :push="pushCount" :pull="pullCount">
        <div class="grid-content4 bg-purple-dark">

          
        </div>
      </el-col>
    </el-row>

    
  </div>
  </el-main>
  </el-container>
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
      pushCount:2,
      pullCount:2,
      pushCount0:3,

      //第二行网站统计数据
      taskCountMonth:233,
      demandTaskCount:212,
      circulationTaskCount:666,
      certifiedEnterpriseCount:231,
      certifiedSupplierCount:526,
      // 图片地址数组
            img_list:[
              '../../assets/images/home/45f6300a9045c22cc1f63f49f20ab78e.jpg',
            ],
      
      //需求任务数组
      demandTaskList:
      [
        {category:"采购",companyName:"一汽",name:"危险品运输半挂车货箱采购项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"设备",companyName:"一汽",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"哈工",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"设备",companyName:"一汽",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"设备",companyName:"一汽",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      completeddemandTaskList:
      [
        {category:"竞价",companyName:"哈工",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"一汽",name:"MKS1632数控外圆磨尾架维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"一汽",name:"厂区维修服务",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"哈工",name:"汽车刹车片设计",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"一汽",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"一汽",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"一汽",name:"安装B30EV-试冲板料-3",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"6666",name:"MKS1632数控外圆磨尾架维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"6666",name:"MKS1632数控外圆磨尾架维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"6666",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"6666",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"6666",name:"安装B30EV-试冲板料-3",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"6666",name:"安装B30EV-试冲板料-3",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      //核心企业
      corebusinessList:
      [
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        
      ],
      //流通需求
      demandforcirculationList:
      [
        {category:"制作",companyName:"一汽",name:"外销减速器总成试制件",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"拉伸垫活塞及连接螺杆修理",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡簧槽测厚工具的制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡簧槽测厚工具的制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡车厂外委修理飞轮内孔",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡车厂外委修理飞轮内孔",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      //完成流通
      completecirculationList:
       [
        {category:"采购",companyName:"一汽",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"哈工",name:"加强板压模和连接板压模",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"哈工",name:"加强板压模和连接板压模",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"粗糙度检查仪采购",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"粗糙度检查仪采购",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"粗糙度检查仪采购",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      //供应商
      supplierlist:
      [
        {category:"灯系",companyName:"上海小糸车灯有限公司 "},
        {category:"轮胎",companyName:"上海轮胎橡胶(集团)供销有限公司"},
        {category:"特种工具",companyName:"上海奥力得特种工具厂"},
        {category:"塑料",companyName:"上海胜德塑料厂 "},
        {category:"开关",companyName:"北京京伟电器有限公司 "},
        {category:"装饰配件",companyName:"北京中环汽车装饰件有限责任公司"},
        {category:"散热器",companyName:"合肥皖仪科技有限公司"},
        
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


<style>
/**中间的div块   给gutter留padding*/
.BG {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 20px;
  font-size: 18px;
}

/**第一行用css样式*/
.grid-content0
{
  border-radius: 4px;
  height: 400px;
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
  height: 100px;
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