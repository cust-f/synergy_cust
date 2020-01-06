
<template>
     <div class="BG">
<el-row>
  <el-col :span="20" push="2" pull="2"><div class="grid-content"><el-carousel  indicator-position="none" interval="3000" type="card" height="400px">
          <el-carousel-item v-for="item in img_list" :key="item">
            <img :src="item" alt="" >
          </el-carousel-item>
      </el-carousel></div></el-col>
</el-row>
<el-row gutter="2">
  <el-col :span="10" push="2">
    <div class="grid-content bg-purple">
    <el-tabs v-model="activeName0" @tab-click="handleClick0" stretch="true">
    <el-tab-pane label="需求任务" name="first">需求任务


    </el-tab-pane>
    <el-tab-pane label="已完成需求任务" name="second">已完成需求任务


    </el-tab-pane>
    </el-tabs>
    </div></el-col>
  <el-col :span="10" push="2" >
    <div class="grid-content bg-purple-light">
      <el-tabs v-model="activeName1" @tab-click="handleClick1" stretch="true">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
    </div>
  </el-col>
</el-row>

<el-row gutter="2">
  <el-col :span="6" push="3">
    <div class="grid-content bg-purple">
      <el-card class="box-card">

  <div slot="header" class="clearfix">
    <span>合作单位</span>
  </div>
<el-row gutter="1">
  <el-col :span="12">
    <div class="grid-content bg-purple">
      

      
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
  <el-col :span="12">
    <div class="grid-content bg-purple-light">

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
    <div class="grid-content bg-purple">


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
    <div class="grid-content bg-purple-light">
   
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
    <div class="grid-content bg-purple">
  
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
    <div class="grid-content bg-purple-light">
   
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
    <div class="grid-content bg-purple">
  
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
    <div class="grid-content bg-purple-light">
   

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
  <el-col :span="6" push="3" >
    <div class="grid-content bg-purple-light">

      <el-card class="box-card">

  <div slot="header" class="clearfix">
    <span>核心企业</span>
  </div>

 <el-row gutter="1">
  <el-col :span="12">
    <div class="grid-content bg-purple">
  
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
    <div class="grid-content bg-purple-light">

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
    <div class="grid-content bg-purple">
  

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
    <div class="grid-content bg-purple-light">
   

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
    <div class="grid-content bg-purple">
  
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
    <div class="grid-content bg-purple-light">
   
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
    <div class="grid-content bg-purple">
  

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
    <div class="grid-content bg-purple-light">
   

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
  <el-col :span="6" push="3">
    <div class="grid-content bg-purple">

      <el-card class="box-card">

  <div slot="header" class="clearfix">
    <span>供应商</span>
  </div>

 <el-row gutter="1">
  <el-col :span="12">
    <div class="grid-content bg-purple">
  

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
    <div class="grid-content bg-purple-light">
   


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
    <div class="grid-content bg-purple">
  

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
    <div class="grid-content bg-purple-light">
   


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
    <div class="grid-content bg-purple">
  


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
    <div class="grid-content bg-purple-light">
   


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
    <div class="grid-content bg-purple">
  

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
    <div class="grid-content bg-purple-light">
   


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
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
     padding: 3px;
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