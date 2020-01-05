<!-- 
 * @description: 首页展示
 * @fileName: Home.vue 
 * @author: 闫晗
 * @date: 2019-11-24 16:41:03 
 * @后台人员:  
 * @path:  
 * @version: V1.0.5 
!-->
<template>
      <el-carousel  indicator-position="none" interval="3000" type="card" height="calc(45vh)" width="50%">
          <el-carousel-item v-for="item in img_list" :key="item">
            <img :src="item" alt="" >
          </el-carousel-item>
      </el-carousel>
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
              "../../assets/images/home/timg (1).jpg",
              "../../assets/images/home/timg.jpg"
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
  background-color: black;
  
}
.backGround_0
{
  float: left;
  height:calc(55vh - 160px);
  width: 33.3%;
  background-color: aqua;
}
.backGround_1
{
  float: left;
height:calc(55vh - 160px);
  width: 33.3%;
  background-color: aquamarine;
}
.backGround_2
{
  float: left;
height:calc(55vh - 160px);
  width: 33.3%;
  background-color: bisque;
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