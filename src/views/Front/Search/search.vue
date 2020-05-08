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
          <div slot="header">
            <div>
              <p>
                您的关键词为
                <span>{{keyWords}}</span>
                ;相关结果总数为
                <span>{{totalNumber}}</span>
                条！
              </p>
            </div>
          </div>
          <div v-show="companyInfo.length>0">
            <company-list :companyList="companyInfo" ></company-list>
          </div>
          <div v-show="finishTaskInfo.length>0">
            <task-list :taskList="finishTaskInfo" :type="1">
                【成果】
            </task-list>
          </div>
          <div v-show="unfinishedTaskInfo.length>0">
            <task-list :taskList="unfinishedTaskInfo" :type="0" >
                【需求】
            </task-list>
          </div>
          <div v-show="finishTaskInfo.length<=0&&companyInfo.length<=0&&unfinishedTaskInfo.length<=0">
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
      finishTaskInfo: [], //搜索出的成果
      unfinishedTaskInfo: [], //需求
      pageSize: 7, //数量
      currentPage: 1, //当前页数
      type: this.$route.query.type,
      navigationSearch:0
    };
  },
  watch:{
    type: function(val) {
      this.getSearchResult(this.currentPage);
    }
  },
  created(){
      this.getSearchResult(this.currentPage);
  },
  methods: {
    getSearchResult(page) {
        console.log("======================")
      var that = this;
      var data = Qs.stringify({
        keyWords: this.keyWords,
        type: this.type,
        page: page,
        size: this.pageSize
      });
      that
        .axios({
          method: "post",
          data: data,
          url: "/api/home/search"
        })
        .then(response => {
            console.log(response)
          this.totalNumber = response.data.allData.totalNumber; //总条数
          this.companyInfo = response.data.allData.company.companyList; //企业列表
          this.unfinishedTaskInfo = response.data.allData.unfinished.unfinishedTaskList; //需求列表
          this.finishTaskInfo =
           response.data.allData.finish.finishTaskList ; //成果列表
            if(this.navigationSearch){
                //this.navigationSearch=0;
            }else{
             this.navigation = [
            { name: "全部", number: this.totalNumber, type: 0 },
            {
              name: "优质企业",
              number: response.data.allData.company.companyNumber,
              type: 1
            },
            {
              name: "服务成果",
              number: response.data.allData.finish.finishNumber,
              type: 2
            },
            {
              name: "需求一栏",
              number: response.data.allData.unfinished.unfinishedNumber,
              type: 3
            }
          ];             
            }

        });
    },
    otherSearch(index,data){
        this.type=index;
        this.navigationSearch=data;
    }
  }
};
</script>

<style>
.search .el-card__body{
    padding:0px;
}
</style>