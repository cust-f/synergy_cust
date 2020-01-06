
<template>
     <div class="BG">
<el-row gutter="8">
    <el-col :span="3" push="3"><div class="grid-content0">

        <el-tabs tab-position="top" stretch="true" style="height: inherit;">
        <el-tab-pane label="需求热门行业">
          <div v-for="o in rmList" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
    </el-tabs>

      </div></el-col>
    <el-col :span="11" push="3" ><div>
      <el-carousel interval="3000"  height="500px">
      <el-carousel-item v-for="item in img_list" :key="item">
            <img :src="item" alt="" >
          </el-carousel-item>
    </el-carousel>
      
      </div></el-col>
    <el-col :span="6" push="3" ><div class=" grid-content0">
      <el-tabs tab-position="top" stretch="true" style="height: inherit;">
        <el-tab-pane label="本月核心企业top10">
        <div v-for="o in rmList" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="本月供应商top10">
        <div v-for="o in rmList" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="本月成交金额任务top10">
        <div v-for="o in rmList" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="更多信息">
        <div v-for="o in rmList" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
      </el-tabs>
      </div></el-col>
</el-row>

<el-divider></el-divider>

<el-row>
  <el-col :span="20" push="3" >
    <div class="grid-content bg-purple" style="text-align: center;    background-color:lightcoral;">
    <span>需求任务</span>
    </div></el-col>
</el-row>

<el-row gutter="15">
  <el-col :span="10" push="3" >
    <div class="grid-content bg-purple">

    <el-tabs tab-position="top" stretch="true" style="height: inherit;">
        <el-tab-pane label="建筑施工">
          <div v-for="o in jzList" :key="o" class="text item">
            {{o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="公路工程">
          <div v-for="o in glList" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
    </el-tabs>



    </div></el-col>

    <el-col :span="10" push="3" >
    <div class="grid-content bg-purple">
    
    <el-tabs tab-position="top" stretch="true" style="height: inherit;">
        <el-tab-pane label="铁路工程">
          <div v-for="o in tlList" :key="o" class="text item">
            {{o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="电力工程">
          <div v-for="o in dlList" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
    </el-tabs>



    </div></el-col>
</el-row>

<el-divider></el-divider>

<el-row gutter="15">
  <el-col :span="10" push="3" >
   <div class="grid-content bg-purple" style="text-align: center;  background-color:lightcoral;">
    <span>拟需求任务</span>
   </div>
  </el-col>
  <el-col :span="10" push="3" >
   <div class="grid-content bg-purple" style="text-align: center ;   background-color:lightcoral;;">
    <span>已完成需求任务</span>
   </div>
  </el-col>
</el-row>

<el-row gutter="15">
  <el-col :span="10" push="3" >
    <div class="grid-content bg-purple">
    
       <el-tabs tab-position="top" stretch="true" style="height: inherit;">
        <el-tab-pane label="建筑施工">
          <div v-for="o in jzList0" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="公路工程">
          <div v-for="o in glList0" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="铁路工程">
          <div v-for="o in tlList0" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="电力工程">
          <div v-for="o in dlList0" :key="o" class="text item">
            {{ o }}
          </div>
        </el-tab-pane>
       </el-tabs>


    </div></el-col>

    <el-col :span="10" push="3" >
    <div class="grid-content bg-purple">
       <el-tabs tab-position="top" stretch="true" style="height: inherit;">
        <el-tab-pane label="建筑施工">
          <div v-for="o in jzList0" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="公路工程">
          <div v-for="o in glList0" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="铁路工程">
          <div v-for="o in tlList0" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="电力工程">
          <div v-for="o in dlList0" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-tab-pane>
       </el-tabs>



    </div></el-col>
</el-row>

<el-divider></el-divider>


<el-row gutter="20">
  
  <el-col :span="6" push="3" >
    <div class="grid-content">

      <el-card class="box-card">

  <div slot="header" class="clearfix" style="text-align: center;">
    <span>任务流通情况</span>
  </div>

  
  <div v-for="o in ltList0" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        



</el-card>

      </div>
  </el-col>






  <el-col :span="6" push="4" >
    <div class="grid-content">

      <el-card class="box-card">

  <div slot="header" class="clearfix" style="text-align: center;">
    <span>核心企业</span>
  </div>

 <el-row gutter="1">
  <el-col :span="12">
    <div class="grid-content ">
  
<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>

    </div></el-col>
  <el-col :span="12">
    <div class="grid-content">

<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>



    </div>
  </el-col>
</el-row>
<el-row gutter="1">
  <el-col :span="12">
    <div class="grid-content">
  

<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>



    </div></el-col>
  <el-col :span="12">
    <div class="grid-content ">
   

<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>




    </div>
  </el-col>
</el-row>
</el-card>

      </div>
  </el-col>
  <el-col :span="6" push="5">
    <div class="grid-content ">

      <el-card class="box-card">

  <div slot="header" class="clearfix" style="text-align: center;">
    <span>供应商</span>
  </div>

 <el-row gutter="1">
  <el-col :span="12">
    <div class="grid-content">
  

<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>






    </div></el-col>
  <el-col :span="12">
    <div class="grid-content ">
   


<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>





    </div>
  </el-col>
</el-row>
<el-row gutter="1">
  <el-col :span="12">
    <div class="grid-content ">
  

<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>







    </div></el-col>
  <el-col :span="12">
    <div class="grid-content ">
   


<div class="businesscardAvatar">
      <el-avatar :fit="fit"> user </el-avatar>
    </div>
        <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{o}}
        </div>
        <el-tag>稳定</el-tag>
        <el-tag type="success">有活力</el-tag>
        <el-tag type="info">成功</el-tag>



    </div>
  </el-col>
</el-row>



</el-card>

    </div>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeName0: 'second',
      activeName1: 'second',
      activeName2: 'second',
      activeName3: 'second',


      tenderTrendsList: [
       "中国农业银行",
       "艺点意创，中国领先的全景全域创意服务机构，服务超5万家企业"
      ],
      // 图片地址数组
            img_list:[
               "../assets/images/home/illust_71187447_20181111_232431.png",
              "src/assets/images/home/illust_71492221_20181111_232951.png",
              "src/assets/images/home/illust_71588619_20181111_233227.jpg",
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

      handleClick0(tab, event) {
        console.log(tab, event);
      },
       handleClick1(tab, event) {
        console.log(tab, event);
      },
       handleClick2(tab, event) {
        console.log(tab, event);
      },
       handleClick3(tab, event) {
        console.log(tab, event);
      },

      /*
      *转跳对应任务信息页面
      */
      recordTabletender(){

      }
  }
};




</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #ffffff;
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #f7f7f7;
   
  }
  .grid-content {
    min-height: 36px;
     padding: 3px;
     border: 1px  solid rgb(221, 221, 221);
  }
  .grid-content0
  {
    height: 500px;
    background-color: antiquewhite;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }


/**中间的div块   给gutter留padding*/
.BG {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 10px;
}
/**card 样式 */
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";

    clear: both;
  }

  .box-card {
    width: 100%;
  }
  .image {
    width: 50%;
    display: block;
  }
  .businesscard
  {
    width: 100%;
    height: 120px;
    
  }
  .businesscardAvatar
  {
    width: 20%;
    float: right;
  }






/*el轮播图定义*/
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity:0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
    /*设置图片宽度和浏览器宽度一致*/
    height: inherit;
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