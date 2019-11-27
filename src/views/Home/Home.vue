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
    <el-row class="winning">
      <el-col :span="16" :offset="1" class="winning-notice"></el-col>
      <el-col :span="7" class="winning-industry"></el-col>
    </el-row>
    <el-row class="trailer">
      <el-col :span="16" :offset="1" class="trailer-tender"></el-col>
      <el-col :span="7" class="companies"></el-col>
    </el-row>
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
      ]
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