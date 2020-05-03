<template>
  <div class="xuqiuyilan">
    <el-container>
      <el-main>
        <el-card shadow="never" class="selectCard company-select">
          <div slot="header" class="clearfix">
            <span>需求一览</span>
          </div>
          <el-row v-if="!dynamicTags.length==0">
            <el-col :span="3" style="line-height:53px;">
              <span>已选择条件</span>
            </el-col>
            <el-col :span="20" style="text-align:left;">
              <el-row>
                <ul class="company-navigation">
                  <li v-for="(tag,index) in dynamicTags" :key="index">
                    <el-tag
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag,1)"
                    >{{tag.name}}</el-tag>
                  </li>
                </ul>
              </el-row>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="3" class="major">
              <span>省份地区</span>
            </el-col>
            <ul class="company-navigation">
              <li>
                <a @click="districtProvince(0)">不限</a>
              </li>
              <li v-for="(pro,index) in province" :key="index">
                <a @click="districtProvince(pro)">{{pro.districtName}}</a>
              </li>
            </ul>
          </el-row>
          <el-row v-if="provinceOption">
            <el-col :span="3" class="major">
              <span>城市</span>
            </el-col>
            <ul class="company-navigation">
              <li>
                <a @click="districtCity(0)">不限</a>
              </li>
              <li v-for="(c,index) in city" :key="index">
                <a @click="districtCity(c)">{{c.districtName}}</a>
              </li>
            </ul>
          </el-row> -->
          <el-row>
            <el-col :span="3"  class="major">
              <span>任务类别</span>
            </el-col>
            <el-col :span="21">
              <el-row>
                <ul class="company-navigation">
                  <li>
                    <a @click="taskTypeSelect(0)">不限</a>
                  </li>
                  <li v-for="(ca,index) in taskType " :key="index">
                    <a @click="taskTypeSelect(ca)">{{ca.name}}</a>
                  </li>
                </ul>
              </el-row>
            </el-col>
            <!-- <el-col :span="4" v-for="ca in category" :key="ca.id">{{ca}}</el-col> -->
          </el-row>
          <el-row>
            <el-col :span="3"  class="major">
              <span>行业类别</span>
            </el-col>
            <el-col :span="21">
              <el-row>
                <ul class="company-navigation">
                  <li>
                    <a @click="categorySelect(0)">不限</a>
                  </li>
                  <li v-for="(hangye,index) in category " :key="index">
                    <a @click="categorySelect(hangye)">{{hangye.name}}</a>
                  </li>
                </ul>
              </el-row>
            </el-col>
            <!-- <el-col :span="4" v-for="ca in category" :key="ca.id">{{ca}}</el-col> -->
          </el-row>
          <el-row v-if="zihangyeOption">
            <el-col :span="3" class="major">
              <span>子行业类别</span>
            </el-col>
            <ul class="company-navigation">
              <li>
                <a @click="zicategorySelect(0)">不限</a>
              </li>
              <li v-for="(zi,index) in zihangye" :key="index">
                <a @click="zicategorySelect(zi)">{{zi.industryName}}</a>
              </li>
            </ul>
          </el-row>
        </el-card>

        <div style="width:500px; margin:20px 0px;">
          <el-input
            size="small"
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            @change="searchCom"
            v-model="search"
          >
            <el-button type="warning" slot="append" @click="searchCom">搜索</el-button>
          </el-input>
        </div>

        <el-card shadow="never" class="selectCard company-detail">
          <div slot="header">
            <span>SaaS服务平台为您寻找需求任务</span>
          </div>
          <div v-if="companyList.length!==0">
            <el-row v-for="(companys,index) in companyList" :key="index" class="company-info">
              <div @click="companyDetail(companys.taskID)">
                <el-col :span="4">
                  <el-avatar shape="square" :size="80" fit="fill" :src="companys.logo"></el-avatar>
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <div style="float:left;">
                      <h2>{{companys.taskName}}</h2>
                    </div>
                    <!-- <div style="float:right;">
                      <el-rate v-model="companys.star" disabled text-color="#ff9900"></el-rate>
                    </div> -->
                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <span>一级行业类别: {{companys.taskCategotyMain}}</span>
                    </el-col>
                      
                    <el-col :span="11">
                       <span>主任务名称: {{companys.maintaskName}}</span>
                    </el-col>
                    
                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <span>二级行业类别: {{companys.taskCategoryPart}}</span>
                    </el-col>
                  
                    <el-col :span="11">
                      <span>发布日期: {{companys.publishTime | dataFormat("yyyy-MM-dd")}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </el-row>
          </div>
          <div v-else>
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

          <!-- <el-divider></el-divider> -->
          <div style="margin-top:20px;">
            <el-pagination
              :hide-on-single-page="true"
              @size-change="getCompanyList"
              @current-change="getCompanyList"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="totalCount"
            ></el-pagination>
          </div>
        </el-card>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "excellentCompany",
  data() {
    return {
      dynamicTags: [],
      province: "",
      city: [],
      zihangye:[],
      zihangyeOption: false, //是否选择了省份
      category: [{id:"",name:""}], //行业类别
      taskType:[{
        id:0,name:"设计任务"
        
      },{
        id:1,name:"流通任务"
        
      }],
      companyList: [],
      recommendedCompanyList: [], //推荐企业列表
      currentPage: 1,
      pageSize: 15,
      //value: this.totalCount <= 15,
      totalCount: 0,
      search: "",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  created() {
    this.getProvince();
    this.getCategry();
    this.getCompanyList(this.val);
    this.getRecommendedCompanyList();
  },
  watch: {
    dynamicTags: function(val) {
      this.getAnswer();
    }
  },
  methods: {
    getProvince() {
      let that = this;
      that.axios.post("/api/district/HaChangProvince").then(response => {
        this.province = response.data.allData.Province;
      });
    },
    getCategry() {
      let that = this;
      that.axios.post("/api/industry/allIndustryType").then(response => {
        this.category = response.data.allData;
      });
    },
    getCity(id) {
      let that = this;
      let data = Qs.stringify({
        pid: id
      });
      that
        .axios({
          method: "post",
          url: "/api/district/city",
          data: data
        })
        .then(response => {
          console.log(response);
          this.city = response.data.allData.city;
        });
    },
    getzihangye(id) {
      let that = this;
      let data = Qs.stringify({
        pid: id
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/zihangye",
          data: data
        })
        .then(response => {
          console.log(response);
          this.zihangye = response.data.allData.zihangye;
        });
    },
    getCompanyList(page) {
      let that = this;
      let data = Qs.stringify({
        page: page - 1
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/getAllTaskList",
          data: data
        })
        .then(response => {
          console.log(response)
          this.companyList = response.data.allData.companyList;
          this.totalCount = response.data.allData.totalCount;
        });
    },
    getRecommendedCompanyList() {
      let that = this;
      that.axios.post("/api/company/recommended").then(response => {
        this.recommendedCompanyList = response.data.allData;
      });
    },
    searchCom() {
      console.log("呵呵");
      this.getAnswer();
      // this.serach="";
    },
    //筛选条件
    getAnswer() {
      let that = this;
      let url;
      let taskType;
      let categorys;
      let zihangye;
      var j;
      for (let i = 0; i < this.dynamicTags.length; i++) {
        if (this.dynamicTags[i].type == "taskType") {
          taskType = this.dynamicTags[i].id;
        }  else if (this.dynamicTags[i].type == "category") {
          categorys=(this.dynamicTags[i].id);
        }
        else if (this.dynamicTags[i].type == "zihangye"){
          zihangye = this.dynamicTags[i].id;
        }
      }
      let data = Qs.stringify(
        {
          taskType: taskType,
          category: categorys,
          searchStr: this.search,
          zihangye:zihangye,
          page: 0
        },
        { arrayFormat: "brackets" }
      );
      console.log(taskType);
      console.log(categorys);
      console.log("输入："+this.search)
      console.log("数组长度：" + this.dynamicTags.length)   
      if (this.dynamicTags.length != 0 || this.search != null) { 
        url = "/api/MainTaskInformation/select";
        console.log(url);
      }
      else {
      url = "/api/MainTaskInformation/getAllTaskList";  
      console.log(url);
      }
      that
        .axios({
          method: "post",
          url: url,
          data: data
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 400) {
            this.companyList = "";
            this.totalCount = 0;
            this.$message({
              type: "warning",
              message: "无符合条件的企业"
            });
          } else if ((response.data.code = 200)) {
            this.companyList = response.data.allData.companyList;
            this.totalCount = response.data.allData.totalCount;
          }
        });
    },
    // getOtherCompany(val){

    // },
    //关闭筛选的标签
    /*
     *@functionName:     js
     *@params1: tag 要删除的标签
     *@params2: id 要删除标签的形式 0：该类别下全部 1：单个对应的标签
     *@description:
     *@author: 旋展峰
     *@date: 2020-04-02 22:30:16
     *@version: V1.0.5
     */
    handleClose(tag, id) {
      if (tag.type == "taskType") {
        this.deleteTag("taskType", 0);
        
      }else if (tag.type == "category") {
        this.deleteTag("category", 0);
        this.deleteTag("zihangye",0);
        this.zihangyeOption = false;
      }
       else {
        //删除对应一个还是不限
        if (id == 0) {
          this.deleteTag(tag.type, 0);
        } else if (id == 1) {
          this.deleteTag(tag.type, tag.id);
        }
      }
    },
    deleteTag(type, id) {
      if (id == 0) {
        //删除对应type的所有元素
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == type) {
            this.dynamicTags.splice(i--, 1);
          }
        }
      } else {
        //删除一个元素
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (
            this.dynamicTags[i].type == type &&
            this.dynamicTags[i].id == id
          ) {
            this.dynamicTags.splice(i, 1);
            return;
          }
        }
      }
    },
    districtProvince(data) {
      if (data == 0) {
        let delTag = { type: "province" };
        this.handleClose(delTag, 0);
        this.provinceOption = false;
      } else {
        let tag = {
          name: data.districtName,
          type: "province",
          id: data.id
        };
        this.checkTag(tag);
        this.dynamicTags.push(tag);
        this.getCity(data.id);
        this.provinceOption = true;
      }
    },
    districtCity(data) {
      if (data == 0) {
        let delTag = { type: "city" };
        this.handleClose(delTag, 0);
      } else {
        let tag = {
          name: data.districtName,
          type: "city",
          id: data.id
        };
        if (this.checkTag(tag)) {
          this.dynamicTags.push(tag);
        }
      }
    },
categorySelect(data) {
      if (data == 0) {
        let delTag = { type: "category" };
        this.handleClose(delTag, 0);
        console.log("nihao")
      } else {
        let tag = {
          name: data.name,
          type: "category",
          id: data.id
        };
      console.log(tag)

       this.checkTag(tag)
       this.dynamicTags.push(tag)
       this.getzihangye(data.id)
       this.zihangyeOption = true;    
      }
    },
    zicategorySelect(data){
    if (data == 0) {
        let delTag = { type: "zihangye" };
        this.handleClose(delTag, 0);
        console.log("nihao")
      } else {
        let tag = {
          name: data.industryName,
          type: "zihangye",
          id: data.id
        };
      console.log(tag)

       this.checkTag(tag)
       this.dynamicTags.push(tag)
 
      }
    },
    taskTypeSelect(data){
      if(data== 0 ){
        let delTag = {type: "taskType"};
        this.handleClose(delTag,0);
      }else{
        let tag = {
          name: data.name,
          type:"taskType",
          id:data.id
        }
        this.checkTag(tag)
        this.dynamicTags.push(tag);
        
      }
    },
    //查看原来是否存在该省份,或重复选择同一个标签
    checkTag(data) {
      if (data.type == "taskType") {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == "taskType") {
            let oldTag = { type: "taskType" };
            this.handleClose(oldTag, 0);
            return;
          }
        }
      }   else if (data.type == "category") {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == "category") {
            let oldTag = { type: "category" };
            this.handleClose(oldTag, 0);
            return;
          }
        }
      }   else if (data.type == "zihangye") {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == "zihangye") {
            let oldTag = { type: "zihangye" };
            this.handleClose(oldTag, 0);
            return;
          }
        }
      }  
      else {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (
            this.dynamicTags[i].type == data.type &&
            this.dynamicTags[i].id == data.id
          ) {
            this.$message({
              type: "warning",
              message: "已经选择过该条件"
            });
            return false;
          }
        }
        return true;
      }
    },
    //进入企业详情界面
    companyDetail(id) {
      console.log("触发了呀");
      this.$router.push({
        path: "admin/xuqiuyilanDetail",
        query: { taskID: id }
      });
    }
  }
};
</script>

<style>
.xuqiuyilan {
  width: 1150px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.xiqiuyilan .el-card__body {
  padding-bottom: 0px;
}
.company-detail .el-card__body {
  padding: 0px;
}
/* 企业筛选栏 */
/* 选择标题 */
.major {
  line-height: 26px;
}
.company-navigation li {
  float: left;
  margin-right: 10px;
  line-height: 28px;
  /* margin-top:10px; */
}
.company-select a:hover {
  color: #0084ff;
}
.el-tag {
  margin-top: 10px;
}
.company-select .el-row {
  margin-bottom: 15px;
}
.selectCard {
  margin-top: 35px;
  /* padding-right: 55px; */
  width: 1100px;
  font-size: 14px;
}
.selectCard .span {
  border-right: 1px solid #f3f3f3;
  text-align: right;
  color: #666;
}
.fixed {
  position: absolute;
  right: -58px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__header {
  background-color: #fbfbfb;
}
.clearfix span {
  font-size: 18px;
  font-weight: 500;
}
/* 企业列表样式 */
.company-info {
  padding: 20px;
  border-bottom: 1px solid #f3f3f3;
  -webkit-transition: -webkit-box-shadow 0.3s;
  transition: -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}
.company-info:hover {
  position: relative;
  z-index: 1;
  -webkit-box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
}
.company-info:hover h2 {
  color: #0084ff;
}
.company-info .el-row {
  margin-bottom: 10px;
}
/* 推荐企业列表 */
.recommend a:hover {
  color: #0084ff;
}
</style>