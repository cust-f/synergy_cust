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
          <el-card style="margin-bottom:20px;">
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
            <div v-show="patentList.length<=0">
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
    };
  },
  created() {
    this.getSearchResult(this.currentPage);
  },
  methods: {
    getSearchResult(page) {
      var that = this;
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
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
          });
      } else {
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
            // this.totalNumber = response.data.data.totalSize;
            // console.log(response)
            let result = response.data.data.patentData.result;
            this.patentList = result;
          });
      }
    },
    otherSearch(index, data) {
      this.type = index;
      this.navigationSearch = data;
    },
  },
};
</script>