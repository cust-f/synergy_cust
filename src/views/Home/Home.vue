<!-- 
 * @description: 首页展示
 * @fileName: Home.vue 
 * @author: 旋展峰 
 * @date: 2019-11-24 16:41:03 
 * @后台人员:  
 * @path:  
 * @version: V1.0.5 
!-->
<template>
  <div>
<!--
    <el-row class="tender">
      <el-col :span="8" :offset="1" class="tender-notice">
        <el-row class="tender-header">
          <div>
            <span>招标公告</span>
          </div>
          <div>
            <a @click="tenderList()" style="cursor: pointer;float:right;">更多>></a>
          </div>
        </el-row>
        <el-row class="tender-header-some">
          <ul>
            <li v-for="(item,i) in tenderTrendsList.slice(0,8)" :key="i">
              <el-col :span="2">
                <span>>></span>
              </el-col>
              <el-col class="some-show" :span="16">
                <el-tooltip class="item" effect="light" :content="item.name" placement="top-start">
                  <a @click="recordTabletender(item.name)">{{item.name}}</a>
                </el-tooltip>
              </el-col>
              <el-col :span="6">
                <span>({{item.tenderHappenTime }})</span>
              </el-col>
            </li>
          </ul>
        </el-row>
      </el-col>

      <el-col :span="7" class="tender-hot"></el-col>
    </el-row>

    <el-row class="tender">
      <el-col :span="8" :offset="1" class="tender-notice">
        <el-row class="tender-header">
          <div>
            <span>中标公告</span>
          </div>
          <div>
            <a @click="tenderList()" style="cursor: pointer;float:right;">更多>></a>
          </div>
        </el-row>
        <el-row class="tender-header-some">
          <ul>
            <li v-for="(item,i) in SuccessfulBidTrendsList.slice(0,8)" :key="i">
              <el-col :span="2">
                <span>>></span>
              </el-col>
              <el-col class="some-show" :span="16">
                <el-tooltip class="item" effect="light" :content="item.name" placement="top-start">
                  <a @click="recordTabletender(item.name)">{{item.name}}</a>
                </el-tooltip>
              </el-col>
              <el-col :span="6">
                <span>({{item.tenderHappenTime }})</span>
              </el-col>
            </li>
          </ul>
        </el-row>
      </el-col>
      <el-col :span="10" class="tender-hot"></el-col>
    </el-row>

    <el-row class="winning">
      <el-col :span="16" :offset="1" class="winning-notice"></el-col>
      <el-col :span="7" class="winning-industry"></el-col>
    </el-row>
    <el-row class="trailer">
      <el-col :span="16" :offset="1" class="trailer-tender"></el-col>
      <el-col :span="7" class="companies"></el-col>
    </el-row>
    !-->
    
    <div class="backGround">


      <el-carousel  indicator-position="none" interval="3000" type="card" height="calc(45vh)" width="50%">
          <el-carousel-item v-for="item in img_list" :key="item">
            <img :src="item" alt="" >
          </el-carousel-item>
      </el-carousel>


      <div class="backGround_0">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>已完成的需求任务</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
      </div>
      <div v-for="o in tenderTrendsList" :key="o" class="text item">
        {{ o }}
      </div>
      </el-card>
      </div>
      <div class="backGround_1">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>需求任务</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
        </el-card>
      </div>
      <div class="backGround_2">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>核心企业与供应商</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
      </el-card>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tenderTrendsList: [
        { name: "哈哈哈哈哈哈哈哈哈哈hahahha哈哈哈哈哈哈哈哈", tenderHappenTime: "2019-09-11" },
        { name: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈", tenderHappenTime: "2019-09-11" },
        { name: "哈哈哈哈哈哈", tenderHappenTime: "2019-09-11" },
        { name: "哈哈哈哈哈哈", tenderHappenTime: "2019-09-11" },
        { name: "哈哈哈哈哈哈", tenderHappenTime: "2019-09-11" },
        { name: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈", tenderHappenTime: "2019-09-11" }
      ],
      // 图片地址数组
            img_list:[
               "../static/image/timg.jpg",
              "../static/image/timg(1).jpg",
              "../static/image/e824b899a9014c0823e2daf9007b02087af4f495",
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

<style scoped>
/*背景块的大小定义*/
.backGround
{
  height:calc(100vh - 160px);
  width: 100%;
  
  
}
.backGround_0
{
  float: left;
  height:calc(55vh - 160px);
  width: 33.3%;
  
}
.backGround_1
{
  float: left;
height:calc(55vh - 160px);
  width: 33.3%;
  
}
.backGround_2
{
  float: left;
height:calc(55vh - 160px);
  width: 33.3%;
  
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
    width: 100%;
    height: inherit;
  }

  /*卡片样式定义*/
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
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    height: inherit;
    width: 100%;
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