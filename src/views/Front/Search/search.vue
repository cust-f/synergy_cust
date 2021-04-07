<template>
  <div class="search">
    <el-container style="width:1200px;margin:0 auto;">
      <el-header>
        <el-breadcrumb separator=">" style="margin-top:20px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-aside style="width:300px;">
          <side-navigation :sidenavigationList="navigation" :type="type" @otherSearch="otherSearch"></side-navigation>
        </el-aside>
        <el-main style="width:900px;">
          <el-card>
            <!-- 结果数量总计 -->
            <div slot="header">
              <div>
                <p>
                  您的关键词为
                  <span>{{keyWords}}</span>
                  ;相关结果总数为
                  <span>{{ totalNumber }}</span>
                  条！
                </p>
              </div>
            </div>
            <!-- 企业列表 -->
            <div v-show="companyInfo.length>0">
              <company-list :companyList="companyInfo"></company-list>
            </div>
            <!-- 成果列表 -->
            <div v-show="finishTaskInfo.length>0">
              <task-list :taskList="finishTaskInfo" :type="1">【成果】</task-list>
            </div>
            <!-- 需求列表 -->
            <div v-show="unfinishedTaskInfo.length>0">
              <task-list :taskList="unfinishedTaskInfo" :type="0">【需求】</task-list>
            </div>
            <!-- 错误提示 -->
            <div v-show="finishTaskInfo.length<=0&&companyInfo.length<=0&&unfinishedTaskInfo.length<=0">
            <!-- <div v-show="(noResultPageShow==true) || (finishTaskInfo.length<=0&&companyInfo.length<=0&&unfinishedTaskInfo.length<=0)"> -->
              <div class="noResult" style="height:400px;">
                <el-row :gutter="2" style="margin-top:25%;">
                  <el-col :span="6" :offset="5">
                    <img src="../../../assets/images/company/noResult.jpg" alt="No Result" />
                  </el-col>
                  <el-col :span="6" :push="1">
                    <h1 style="font-size:24px;">抱歉，没有找到相关结果！</h1>
                    <ul style="margin-top:30px;">
                      <li>1.输入准确的关键词，重新搜索</li>
                      <li>2.更换筛选条件，重新搜索</li>
                      <li>3.输入的关键词过于宽泛</li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- 分页 -->
            <div style="margin-top:20px;">
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
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import sideNavigation from "./components/sideNavigation";
import companyList from "../Home/components/companyList";
import taskList from "../Home/components/taskList";

import Qs from "qs";

export default {
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，该组件被复用时调用
    // 可以访问组件实例 `this`
    // this.getSearchResult(this.currentPage);
    next();
  },
  name: "search",
  components: {
    "side-navigation": sideNavigation,
    "company-list": companyList,
    "task-list": taskList
  },
  data() {
    return {
      keyWords: this.$route.query.keyWords,
      totalNumber: 0,
      navigation: [],
      companyInfo: [], //搜索出的企业列表
      companyNumber:0,
      finishTaskInfo: [], //搜索出的成果
      finishNumber:0,
      unfinishedTaskInfo: [], //需求
      unfinishedNumber:0,
      pageSize: 7, //数量
      currentPage: 1, //当前页数
      type: this.$route.query.type,
      originalType:0,
      navigationSearch: 0,
      noResultPageShow:false,
    };
  },
  watch: {
    type: function(newVal, oldVal) {
      this.getSearchResult(this.currentPage);
    }
  },
  created() {
    //记录原始查询类型
    this.originalType = this.type;
    //获得查询结果
    this.getSearchResult(this.currentPage);
  },
  methods: {
    getSearchResult(page) {
      var that = this;
      var data = Qs.stringify({
        keyWords: this.keyWords,
        type: this.type,
        page: page,
        size: this.pageSize
      });
      console.log(data);
      that
        .axios({
          method: "post",
          data: data,
          url: "/api/home/search"
        })
        .then(response => {
          console.log(response);
          if(this.originalType == 0){
            this.companyInfo = response.data.allData.company.companyList; //企业列表
            this.finishTaskInfo = response.data.allData.finish.finishTaskList; //成果列表
            this.unfinishedTaskInfo = response.data.allData.unfinished.unfinishedTaskList; //需求列表
          }else if(this.originalType == 1){
            this.companyInfo = response.data.allData.company.companyList; //企业列表
            this.finishTaskInfo = []; //成果列表
            this.unfinishedTaskInfo = []; //需求列表 
          }else if(this.originalType == 2){
            this.companyInfo = []; //企业列表
            this.finishTaskInfo = response.data.allData.finish.finishTaskList; //成果列表
            this.unfinishedTaskInfo = []; //需求列表
          }else if(this.originalType == 3){
            this.companyInfo = []; //企业列表
            this.finishTaskInfo = []; //成果列表
            this.unfinishedTaskInfo = response.data.allData.unfinished.unfinishedTaskList; //需求列表
          }
            this.companyNumber = response.data.allData.company.companyNumber; 
            console.log("企业"+this.companyNumber);
            this.finishNumber = response.data.allData.finish.finishNumber; 
            console.log("成果"+this.finishNumber);
            this.unfinishedNumber = response.data.allData.unfinished.unfinishedNumber;  
            console.log("需求"+this.unfinishedNumber);
            // this.totalNumber=this.companyNumber+this.finishNumber+this.unfinishedNumber;  
            console.log("总"+this.totalNumber);
            this.totalNumber = response.data.allData.totalNumber;
          if (this.navigationSearch) {
            //this.navigationSearch=0;
          } else {
            this.navigation = [
              { 
                name: "全部", 
                number: this.totalNumber, 
                type: 0 
              },
              {
                name: "优质企业",
                // number:this.companyNumber,
                number: response.data.allData.company.companyNumber,
                type: 1
              },
              {
                name: "服务成果",
                // number: this.finishNumber,
                number: response.data.allData.finish.finishNumber,
                type: 2
              },
              {
                name: "需求一览",
                // number: this.unfinishedNumber,
                number: response.data.allData.unfinished.unfinishedNumber,
                type: 3
              }
            ];
          }
        });
    },
    otherSearch(index, data) {
      this.type = index;
      this.navigationSearch = data;
    }
  }
};
</script>

<style>
.search .el-card__body {
  padding: 0px;
}
</style>