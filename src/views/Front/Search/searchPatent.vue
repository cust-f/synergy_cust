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
            <el-select v-model="searchType" placeholder="搜索类型" size="small" style="width:100px;">
              <el-option label="专利名" value="0"></el-option>
              <el-option label="企业名" value="1"></el-option>
            </el-select>
            <span v-if="+searchType===0">
              <el-input style="width:260px" size="small" placeholder="零部件名称(必)" prefix-icon="el-icon-search" v-model="keyWords"></el-input>
              <el-input style="width:260px" size="small" placeholder="技术指标(选)" v-model="technicalIndex"></el-input>
            </span>
            <span v-else>
              <el-input style="width:524px" size="small" placeholder="输入企业名称" prefix-icon="el-icon-search" v-model="org"></el-input>
            </span>
            <el-button class="searchBtn" @click="getSearchResult">搜索</el-button>
          </el-row>
          <el-card style="margin-bottom:20px; width:1198px;" v-loading="loading">
            <!-- <div slot="header">
              <div>
                <p>
                  您的关键词为
                  <span>{{keyWords}}</span>
                  ;相关结果总数为
                  <span>{{totalNumber}}</span>
                  条！
                </p>
              </div>
            </div>-->
            <div>
              <patent-list :patentList="patentList"></patent-list>
            </div>
            
              <div class="noResult" style="height:400px;">
                <div v-show="sorryPageShow">
                <el-row :gutter="2" style="margin-top:25%;">
                  <el-col :span="6" :offset="5">
                    <img src="../../../assets/images/company/noResult.jpg" alt="No Result" />
                  </el-col>
                  <el-col :span="6" :push="1">
                    <div v-if="+searchNull === true">
                      <h1 style="font-size:24px;">抱歉，没有找到相关结果！</h1>
                      <ul style="margin-top:30px;">
                        <li>1.输入准确的关键词，重新搜索</li>
                        <li>2.更换筛选条件，重新搜索</li>
                        <li>3.输入的关键词过于宽泛</li>
                      </ul>
                    </div>
                    <div v-else>
                      <h1 style="font-size:24px;line-height:217px;">抱歉，请求失败，请重试！</h1>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div style="margin-top:20px;" v-if="searchType==0">
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
            <div style="margin-top:20px;" v-else></div>
          </el-card>
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
      // 数量
      pageSize: 10,
      // 当前页数
      currentPage: 1,
      //类型0 专利名 1企业名
      searchType: this.$route.query.type,
      //加载动画
      loading: true,
      //查询不到数据
      sorryPageShow:false,
      //查询为空true 查询失败false 
      searchNull:false,
    };
  },
  created() {
    this.getSearchResult(this.currentPage);
  },
  methods: {
    getSearchResult(page) {
      //更改地址栏
      this.searchChange();
      //打开加载动画
      this.loading = true;
      //执行搜索
      var that = this;
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //根据【专利名】匹配专利列表
      if (this.searchType == 0) {
        var data = {
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
            let result = response.data.data.result;
            this.patentList = result;
            if(patentList.length <= 0)
            {  
              this.sorryPageShow=true;//显示异常页面
              this.searchNull = true;//提示搜索为空
            }
            this.loading = false;//结束加载动画
          })
          .catch((error) => {
            // console.log(error.response);
            this.loading = false;//结束加载动画
            this.sorryPageShow=true;//显示异常页面
            this.searchNull = false;//提示接口错误
          });
      } else {
        // 根据【企业名】匹配旗下企业列表
        var data = {
          orgName: this.org,
        };
        that
          .axios({
            config,
            method: "post",
            data: data,
            url: "/city/bizdesign/detection",
            //尝试转码-搜的-还没用
            // 以下为解决中文乱码的主要代码
            // responseType: 'blob',
            // transformResponse: [function(data) {
            //   var reader = new FileReader()
            //   reader.readAsText(data, 'GBK')
            //   reader.onload = function(e) {
            //     var list = JSON.parse(reader.result)
            //     console.log(list)
            //     that.data = list
            //   }
            //   return data
            // }],
            // headers: {
            //   'X-Requested-With': 'XMLHttpRequest',
            //   'Content-Type': 'application/x-www-form-urlencoded'
            // },
            //尝试结束
          })
          .then((response) => {
            let result = response.data.data.patentData.result;
            this.patentList = result;
            if(patentList.length <= 0)
            {  
              this.sorryPageShow=true;//显示异常页面
              this.searchNull = true;//提示搜索为空
            }
            this.loading = false;//结束加载动画
          })
          .catch((error) => {
            // console.log(error.response);
            this.loading = false;//结束加载动画
            this.sorryPageShow=true;//显示异常页面
            this.searchNull = false;//提示接口错误
          });
      }
    },
    //搜索条件改变时，不刷新页面更改地址栏
    searchChange(){
      if(this.searchType==0)
      { 
        const newUrl= this.$route.path + `?keyWords=${this.keyWords}&technicalIndex=${this.technicalIndex}&type=0`;
        window.history.replaceState('', '', newUrl);
      }
      else
      {
        const newUrl = this.$route.path + `?companyName=${this.org}&type=1`;
        window.history.replaceState('', '', newUrl);
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