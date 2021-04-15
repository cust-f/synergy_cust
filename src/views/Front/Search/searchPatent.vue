<template>
  <div class="search-patent">
    <el-container style="width:1200px;margin:0 auto;">
      <el-header>
        <el-breadcrumb separator=">" style="margin-top:20px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>专利查询</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main style="width:1200px;">

          <el-row>
            <el-select v-model="webSearchType" placeholder="搜索类型" size="small" style="width:100px;">
              <el-option
                v-for="item in StatusOptions"
                :key="item.key"
                :value="item.key"
                :label="item.name"
              />
            </el-select>
            <span v-if="webSearchType=='0'">
              <el-input style="width:260px" size="small" placeholder="零部件名称(必)" prefix-icon="el-icon-search" v-model="webKeyWords"></el-input>
              <el-input style="width:260px" size="small" placeholder="技术指标(选)" v-model="webTechnicalIndex"></el-input>
            </span>
            <span v-else>
              <el-input style="width:524px" size="small" placeholder="输入企业名称" prefix-icon="el-icon-search" v-model="webOrg"></el-input>
            </span>
            <el-button class="searchBtn" @click="getWebSearchResult()">搜索</el-button>
          </el-row>

          <!-- 加载 错误提示 -->
          <!-- <el-card style="margin-bottom:20px; width:1198px;height:689px" v-show="loadPageShow" ></el-card> -->
          <el-card style="margin-bottom:20px; width:1198px;" v-loading="loading">
            <div class="noResult" style="height:400px;" v-if="hitPageShow === true">
                <el-row :gutter="2" style="margin-top:25%;">
                  <el-col :span="6" :offset="5"  v-if="!loading">
                    <img src="../../../assets/images/company/noResult.jpg" alt="No Result" />
                  </el-col>
                  <el-col :span="6" :push="1" v-if="!loading">
                    <div>
                      <h1 style="font-size:24px;">抱歉，没有找到相关结果！</h1>
                      <ul style="margin-top:30px;">
                        <li>1.输入准确的关键词，重新搜索</li>
                        <li>2.更换筛选条件，重新搜索</li>
                        <li>3.输入的关键词过于宽泛</li>
                      </ul>
                    </div>
                    <!-- <div>
                      <h1 style="font-size:24px;line-height:217px;">抱歉，请求失败，请重试！</h1>
                    </div> -->
                  </el-col>
                </el-row>
              <!-- </div> -->
            </div>
            <div v-else-if="hitPageShow === false">
              <div>
                <patent-list :patentList="patentList"></patent-list>
              </div>
              <div style="margin-top:20px;" v-if="searchType=='0'">
                <el-pagination
                  :hide-on-single-page="true"
                  @size-change="getSearchResult"
                  @current-change="getSearchResult"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="prev, pager, next, jumper"
                  :total="totalNumber"
                ></el-pagination>
              </div>
            </div>
          </el-card>
          <!-- 查询结果 -->
          <!-- <el-card style="margin-bottom:20px; width:1198px;" v-if="!hitPageShow"> -->
            <!-- <div slot="header">
              <div><p>您的关键词为<span>{{keyWords}}</span>;相关结果总数为<span>{{totalNumber}}</span>条！</p></div>
            </div>-->
            
          <!-- </el-card> -->

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import patentList from "./components/patentList";

import Qs from "qs";

export default {
  name: "searchPatent",
  components: {
    // 专利列表
    "patent-list": patentList,
  },
  data() {
    return {
      // 搜索内容
      keyWords: this.$route.query.keyWords,
      // 总数
      totalNumber: 0,
      // 技术指标
      technicalIndex: this.$route.query.technicalIndex,
      // 企业名称
      org: this.$route.query.companyName,
      // 专利列表
      patentList: [],
      //企业专利列表
      // orgPatentList: [{type:1}],
      // 数量
      pageSize: 10,
      // 当前页数
      currentPage: 1,
      //类型0 专利名 1企业名
      searchType: this.$route.query.type,

      // 页面搜索内容
      webKeyWords: "",
      // 技术指标
      webTechnicalIndex: "",
      // 企业名称
      webOrg: "",
      //类型0专利名 1企业名
      webSearchType: "",

      //加载动画
      loading:true,
      //处理页面
      hitPageShow:true,
      StatusOptions : [
        { key: "0", name: '专利名' },
        { key: "1", name: '企业名' }
      ],
    };
  },
  created() {
    this.getSearchResult(this.currentPage);
    // this.webSearchType = this.StatusOptions[0].key;
  },
  methods: {
    //给页面参数赋值
    getWebParams(){
      this.webKeyWords = this.keyWords;
      this.webTechnicalIndex = this.technicalIndex;
      this.webSearchType = this.searchType;
      this.webOrg = this.org;
    },
    //页面加载获得数据
    getSearchResult(page) {
      //打开加载动画
      this.loading = true;
      this.hitPageShow = true;
      //数组设空
      this.patentList=[];
      //执行搜索
      var that = this;
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //页面初始化-根据【专利名】匹配专利列表
      if (this.searchType == "0") {
        var data ={
          componentName: this.keyWords,
          technicalIndex: this.technicalIndex,
          from: page,
          pageSize: this.pageSize,
        };
        that
          .axios({
            config,
            method: "post",
            data: data,
            url: "/city/bizdesign/synergicResource",
          })
          .then((response) => {
            this.totalNumber = response.data.data.totalSize;
            if(this.totalNumber <= 0)
            {  
              this.hitPageShow = true;
              console.log("Pat"+this.totalNumber);
            }
            else{
              this.hitPageShow = false;//不显示异常页面
              let result = response.data.data.result;
              this.patentList = result;
            }
            this.loading = false;//结束加载动画
          })
          .catch((error) => {
            this.hitPageShow = true;//显示异常页面  
            this.loading = false;//结束加载动画
            console.log(this.hitPageShow);  
          });
      } else {
        // 页面初始化-根据【企业名】匹配旗下企业列表
        var data = {
          orgName: this.org,
        };
        that
          .axios({
            config,
            method: "post",
            data: data,
            url: "/city/bizdesign/detection",
          })
          .then((response) => {
            this.totalNumber = response.data.data.patentData.totalSize;
            if(this.totalNumber <= 0)
            {  
              this.hitPageShow = true;
              console.log("Org"+this.totalNumber);
            }
            else{
              this.hitPageShow = false;//不显示异常页面
              let result = response.data.data.patentData.result;
              this.patentList = result;
            }
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;//结束加载动画
            this.hitPageShow = true;//显示异常页面 
          });
      }
      this.getWebParams();
    },
    //页面的搜索方法
    getWebSearchResult(page) {
      //打开加载动画
      this.loading = true;
      this.hitPageShow = true;
      //更改地址栏
      // this.urlChange();
      //数组设空
      this.patentList=[];
      //执行搜索
      var that = this;
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //根据【专利名】匹配专利列表
      if (this.webSearchType == "0") {
        var data ={
          componentName: this.webKeyWords,
          technicalIndex: this.webTechnicalIndex,
          from: page,
          pageSize: this.pageSize,
        };
        // console.log("wozhuanli"+data);
        that
          .axios({
            config,
            method: "post",
            data: data,
            url: "/city/bizdesign/synergicResource",
          })
          .then((response) => {
            this.totalNumber = response.data.data.totalSize;
            if(this.totalNumber <= 0)
            {  
              this.hitPageShow = true;
              console.log("Pat"+this.totalNumber);
            }
            else{
              this.hitPageShow = false;//不显示异常页面
              let result = response.data.data.result;
              this.patentList = result;
            }
            this.loading = false;//结束加载动画
          })
          .catch((error) => {
            this.loading = false;//结束加载动画
            this.hitPageShow = true;//显示异常页面            
          });
      } else {
        // 根据【企业名】匹配旗下企业列表
        var data = {
          orgName: this.webOrg,
        };
        // console.log("woqiye"+data);
        that
          .axios({
            config,
            method: "post",
            data: data,
            url: "/city/bizdesign/detection",
          })
          .then((response) => {
            this.totalNumber = response.data.data.patentData.totalSize;
            if(this.totalNumber <= 0)
            {  
              this.hitPageShow = true;
              console.log("Org"+this.totalNumber);
            }
            else{
              this.hitPageShow = false;//不显示异常页面
              let result = response.data.data.patentData.result;
              this.patentList = result;
            }
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;//结束加载动画
            this.hitPageShow = true;//显示异常页面 
          });
      }
    },
    //搜索条件改变时，不刷新页面更改地址栏
    urlChange(){
      if(this.webSearchType == "0")
      {  
        const newUrl = this.$route.path + `?keyWords=${this.webKeyWords}&technicalIndex=${this.webTechnicalIndex}&type=0`
        window.history.pushState('', '', newUrl)
      }else{  
        const newUrl = this.$route.path + `?companyName=${this.webOrg}&type=1`
        window.history.pushState('', '', newUrl)
      }
    },
  },
};
</script>

<style scoped>
.searchBtn {
  color: white;
  padding-top: 7px;
  padding-bottom: 8px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: #ff7720;
  margin: 0px 0px 20px 0px;
}
.searchContent {
  border-color: #ff7720;
  float: left;
  width: 520px;
  min-width: 85%;
  margin: 0px 0px 20px 0px;
}
</style>