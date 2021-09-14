<template>
  <div class="xuqiuyilan">
    <el-container>
      <el-main>
        <el-card shadow="never" class="selectCard company-select">
          <div slot="header" style="margin: -18px -20px; padding: 10px 20px; background: #dcdfe6" class="clearfix">
            <span>需求一览</span>
          </div>
          <el-row v-if="!dynamicTags.length == 0">
            <el-col :span="3" style="line-height: 53px">
              <span>已选择条件</span>
            </el-col>
            <el-col :span="20" style="text-align: left">
              <el-row>
                <ul class="company-navigation">
                  <li v-for="(tag, index) in dynamicTags" :key="index">
                    <el-tag closable :disable-transitions="false" @close="handleClose(tag, 1)">{{ tag.name }}</el-tag>
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
          </el-row>-->
          <el-row>
            <el-col :span="3" class="major">
              <span>任务类别</span>
            </el-col>
            <el-col :span="21">
              <el-row>
                <ul class="company-navigation">
                  <li>
                    <a @click="taskTypeSelect(0)">不限</a>
                  </li>
                  <li v-for="(ca, index) in taskType" :key="index">
                    <a @click="taskTypeSelect(ca)">{{ ca.name }}</a>
                  </li>
                  <li>
                    <a @click="taskTypeSelect(-1)">推荐任务</a>
                  </li>
                </ul>
              </el-row>
            </el-col>
            <!-- <el-col :span="4" v-for="ca in category" :key="ca.id">{{ca}}</el-col> -->
          </el-row>
          <el-row>
            <el-col :span="3" class="major">
              <span>行业类别</span>
            </el-col>
            <el-col :span="21">
              <el-row>
                <ul class="company-navigation">
                  <li>
                    <a @click="categorySelect(0)">不限</a>
                  </li>
                  <li v-for="(hangye, index) in category" :key="index">
                    <a @click="categorySelect(hangye)">{{ hangye.name }}</a>
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
              <li v-for="(zi, index) in zihangye" :key="index">
                <a @click="zicategorySelect(zi)">{{ zi.industryName }}</a>
              </li>
            </ul>
          </el-row>
        </el-card>

        <div style="width: 610px; margin: 20px 0px">
          <el-input class="neirong" size="small" placeholder="请输入搜索内容" prefix-icon="el-icon-search" @change="searchCom" v-model="search"></el-input>
          <el-button class="sousuo" style="display: inline-block; float: right" slot="append" @click="searchCom">搜索</el-button>
        </div>
        <br>
        <div style="margin-top: 20px;float:right;margin-right:50px;margin-bottom: 20px;">
          <el-pagination background :hide-on-single-page="true" @size-change="getCompanyListTest" @current-change="getCompanyListTest" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next,total, jumper" :total="totalCount"></el-pagination>
        </div>
        <!-- <el-divider></el-divider> -->

        <el-card shadow="never" class="selectCard company-detail">
          <div style="margin: -18px -20px; padding: 10px 20px; background: #dcdfe6" slot="header">
            <span style="color: black">SaaS服务平台为您寻找需求任务</span>
          </div>
          <div v-if="companyList.length !== 0">
            <el-row v-for="(companys, index) in companyList" :key="index" class="company-info">
              <div @click="companyDetail(companys.taskID)">
                <el-col :span="3">
                  <el-tag v-if="companys.taskState === '完成'" type="danger">已完成</el-tag>
                  <el-tag v-else-if="
                      companys.taskState === '申请或邀请中'" type="success">申请/邀请中</el-tag>
                  <el-tag v-else-if="companys.taskState==='计划提交'" type="warning">计划中</el-tag>
                  <el-tag v-else>进行中</el-tag>
                </el-col>
                <el-col :span="21">
                  <el-row>
                    <div style="float: left">
                      <h2>{{ companys.taskName }} <span style=" color: red;" v-show="companys.isRecommended&&companys.taskState == '申请或邀请中'">【推荐】</span>
                      </h2>
                    </div>
                    <!-- <div style="float:right;">
                      <el-rate v-model="companys.star" disabled text-color="#ff9900"></el-rate>
                    </div>-->
                    <!-- <el-col :span="3">
                    <div style="float:right;">
                           <p v-if="companys.isRecommended"
                           style="font-size: 18px; font-weight: 600; font-style: normal; 
                           text-decoration: none; color: red;
                            padding: 0px; margin: 0px; word-break: break-word;">
                             {{"（推荐）"}}
                             </p>
                    </div>
                    </el-col> -->
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <span>一级行业类别: {{ companys.taskCategotyMain }}</span>
                    </el-col>

                    <el-col :span="9">
                      <span>主任务名称: {{ companys.maintaskName }}</span>
                    </el-col>

                    <el-col :span="6">
                      <span>任务类型: {{ companys.taskType }}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <span>二级行业类别: {{ companys.taskCategoryPart }}</span>
                    </el-col>
                    <el-col :span="9">
                      <span>企业名称: {{ companys.companyName }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>发布日期:
                        {{
                          companys.publishTime | dataFormat("yyyy-MM-dd")
                        }}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </el-row>
          </div>
          <div v-else>
            <div class="noResult" style="height: 400px">
              <el-row :gutter="2" style="margin-top: 25%">
                <el-col :span="6" :offset="5">
                  <img src="../../../assets/images/company/noResult.jpg" alt="No Result" />
                </el-col>
                <el-col :span="6" :push="1">
                  <h1 style="font-size: 24px">抱歉，没有找到相关结果！</h1>
                  <ul style="margin-top: 30px">
                    <li>1.输入准确的关键词，重新搜索</li>
                    <li>2.更换筛选条件，重新搜索</li>
                    <li>3.输入的关键词过于宽泛</li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- <el-divider></el-divider> -->
          <!-- <div style="margin-top: 20px">
            <el-pagination
              :hide-on-single-page="true"
              @size-change="getCompanyListTest"
              @current-change="getCompanyListTest"
              :current-page="currentPage"
              :page-size="pageSize"
            layout="prev, pager, next,total, jumper"
              :total="totalCount"
            ></el-pagination>
          </div> -->
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
      usernameX: sessionStorage.getItem("ms_username"),
      dynamicTags: [], //选中的标签
      province: "",
      city: [],
      zihangye: [],
      zihangyeOption: false, //子行业筛选框是否显示
      category: [{ id: "", name: "" }], //行业类别
      taskType: [
        {
          id: 0,
          name: "设计任务",
        },
        {
          id: 1,
          name: "流通任务",
        },
      ],
      companyList: [],
      recommendedCompanyList: [], //推荐企业列表
      currentPage: 1,
      pageSize: 15,
      //value: this.totalCount <= 15,
      totalCount: 0,
      search: "",
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  created() {
    this.getParams();
    this.getProvince();
    this.getCategry();
    this.getCompanyListTest(this.val);
    this.getRecommendedCompanyList();
  },
  watch: {
    dynamicTags: function (val) {
      this.getCompanyListTest(0);
    },
  },
  methods: {
    //判断该需求任务中流通任务中的零件对比自己的仓库中是否含有零件，若含有，则显示邀请，不含有则显示邀请

    getParams() {
      if (this.$route.query.Predirects != null) {
        var routerParams = this.$route.query.Predirects;
        let tag = {
          name: routerParams.name,
          type: "category",
          id: routerParams.id,
        };
        this.checkTag(tag);
        this.dynamicTags.push(tag);
        this.getzihangye(routerParams.id);
        this.zihangyeOption = true;
        if (this.$route.query.CPredirects != null) {
          var routerParams1 = this.$route.query.CPredirects;
          let tag = {
            name: routerParams1.name,
            type: "zihangye",
            id: routerParams1.id,
          };
          this.checkTag(tag);
          this.dynamicTags.push(tag);
        }
      }
    },
    getProvince() {
      let that = this;
      that.axios.post("/api/district/HaChangProvince").then((response) => {
        this.province = response.data.allData.Province;
      });
    },
    getCategry() {
      let that = this;
      that.axios.post("/api/industry/allIndustryType").then((response) => {
        this.category = response.data.allData;
      });
    },
    getCity(id) {
      let that = this;
      let data = Qs.stringify({
        pid: id,
      });
      that
        .axios({
          method: "post",
          url: "/api/district/city",
          data: data,
        })
        .then((response) => {
          this.city = response.data.allData.city;
        });
    },
    getzihangye(id) {
      let that = this;
      let data = Qs.stringify({
        pid: id,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/zihangye",
          data: data,
        })
        .then((response) => {
          this.zihangye = response.data.allData.zihangye;
        });
    },
    getCompanyList(page) {
      let url;
      let that = this;
      let data = Qs.stringify({
        page: page - 1,
        userName: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/getAllTaskList",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.companyList = response.data.allData.companyList;
          this.totalCount = response.data.allData.totalcount;
        });
    },
    getCompanyListTest(page) {
      let that = this;
      let url;
      let taskType;
      let categorys;
      let zihangye;
      var j;
      console.log("数组长度" + this.dynamicTags.length);
      if (
        this.dynamicTags.length == 1 &&
        this.dynamicTags[0].type == "recommondType"
      ) {
        url = "/api/MainTaskInformation/getAllRecommondTaskList";
        var data = Qs.stringify(
          {
            page: page - 1,
            userName: this.usernameX,
          },
          { arrayFormat: "brackets" }
        );
        that
          .axios({
            method: "post",
            url: url,
            data: data,
          })
          .then((response) => {
            this.companyList = response.data.allData.companyList;
            this.totalCount = response.data.allData.totalcount;
          });
      } else {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == "taskType") {
            taskType = this.dynamicTags[i].id;
          } else if (this.dynamicTags[i].type == "category") {
            categorys = this.dynamicTags[i].id;
          } else if (this.dynamicTags[i].type == "zihangye") {
            zihangye = this.dynamicTags[i].id;
          }
        }
        let data = Qs.stringify({
          page: page - 1,
        });
        if (this.dynamicTags.length != 0 || this.search != null) {
          url = "/api/MainTaskInformation/select";
          data = Qs.stringify(
            {
              taskType: taskType,
              category: categorys,
              searchStr: this.search,
              zihangye: zihangye,
              page: page - 1,
              userName: this.usernameX,
            },
            { arrayFormat: "brackets" }
          );
        } else {
          url = "/api/MainTaskInformation/getAllTaskList";
          data = Qs.stringify(
            {
              page: page - 1,
              userName: this.usernameX,
            },
            { arrayFormat: "brackets" }
          );
        }
        that
          .axios({
            method: "post",
            url: url,
            data: data,
          })
          .then((response) => {
            console.log(data);
            this.companyList = response.data.allData.companyList;
            this.totalCount = response.data.allData.totalcount;
          });
      }
    },

    getRecommendedCompanyList() {
      let that = this;
      that.axios.post("/api/company/recommended").then((response) => {
        this.recommendedCompanyList = response.data.allData;
      });
    },
    searchCom() {
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
        } else if (this.dynamicTags[i].type == "category") {
          categorys = this.dynamicTags[i].id;
        } else if (this.dynamicTags[i].type == "zihangye") {
          zihangye = this.dynamicTags[i].id;
        }
      }

      let data;
      if (this.dynamicTags.length != 0 || this.search != null) {
        url = "/api/MainTaskInformation/select";
        data = Qs.stringify(
          {
            taskType: taskType,
            category: categorys,
            searchStr: this.search,
            zihangye: zihangye,
            page: 0,
            userName: this.usernameX,
          },
          { arrayFormat: "brackets" }
        );
      } else {
        url = "/api/MainTaskInformation/getAllTaskList";
        data = Qs.stringify(
          {
            page: 0,
            userName: this.usernameX,
          },
          { arrayFormat: "brackets" }
        );
      }
      that
        .axios({
          method: "post",
          url: url,
          data: data,
        })
        .then((response) => {
          if (response.data.code == 400) {
            this.companyList = "";
            this.totalCount = 0;
            this.$message({
              type: "warning",
              message: "无符合条件的企业",
            });
          } else if ((response.data.code = 200)) {
            console.log("repsonse的结果" + response);
            this.companyList = response.data.allData.companyList;
            this.totalCount = response.data.allData.totalCount;
            this.getCompanyListTest(0);
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
      } else if (tag.type == "category") {
        this.deleteTag("category", 0);
        this.deleteTag("zihangye", 0);
        this.zihangyeOption = false;
      } else {
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
          id: data.id,
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
          id: data.id,
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
      } else {
        let tag = {
          name: data.name,
          type: "category",
          id: data.id,
        };
        this.deleteTag("recommondType", -1);
        this.checkTag(tag);
        this.dynamicTags.push(tag);
        this.getzihangye(data.id);
        this.zihangyeOption = true;
      }
    },
    zicategorySelect(data) {
      if (data == 0) {
        let delTag = { type: "zihangye" };
        this.handleClose(delTag, 0);
      } else {
        let tag = {
          name: data.industryName,
          type: "zihangye",
          id: data.id,
        };

        this.checkTag(tag);
        this.dynamicTags.push(tag);
      }
    },
    taskTypeSelect(data) {
      if (data == -1) {
        // 推荐任务
        console.log(this.$store.state.token);
        if (this.$store.state.token) {
          // 登陆了
          //关闭所有的标签
          this.dynamicTags.splice(0, this.dynamicTags.length);
          let tag = {
            name: "推荐任务",
            type: "recommondType",
            id: "-1",
          };
          // 添加
          this.zihangyeOption = false;
          this.dynamicTags.push(tag);
          // this.getCompanyListTest(0);
        }else{
          // 没登录
          this.$confirm("登录后才能进行推荐，是否登录？", "提示", {
            confirmButtonText: "登录",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            this.$router.push({
              path: "/Login",
            });
          })
        }
      } else if (data == 0) {
        // 不限
        let delTag = { type: "taskType" };
        this.deleteTag("recommondType", -1);
        this.handleClose(delTag, 0);
      } else {
        // 设计任务/流通任务
        let tag = {
          name: data.name,
          type: "taskType",
          id: data.id,
        };
        this.checkTag(tag);
        this.deleteTag("recommondType", -1);
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
      } else if (data.type == "category") {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == "category") {
            let oldTag = { type: "category" };
            this.handleClose(oldTag, 0);
            return;
          }
        }
      } else if (data.type == "zihangye") {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == "zihangye") {
            let oldTag = { type: "zihangye" };
            this.handleClose(oldTag, 0);
            return;
          }
        }
      } else {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (
            this.dynamicTags[i].type == data.type &&
            this.dynamicTags[i].id == data.id
          ) {
            this.$message({
              type: "warning",
              message: "已经选择过该条件",
            });
            return false;
          }
        }
        return true;
      }
    },
    //进入企业详情界面
    companyDetail(id) {
      this.$router.push({
        path: "admin/xuqiuyilanDetail",
        query: { taskID: id },
      });
    },
  },
};
</script>

<style scoped>
.el-card__header {
  background-color: #dcdfe6;
}
.xuqiuyilan {
  width: 1150px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.xiqiuyilan .el-card__body {
  padding-bottom: 0px;
}
.xuqiuyilan .el-pagination {
  padding-left: 520px;
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
  margin-top: 20px;
  /* padding-right: 55px; */
  width: 1100px;
  font-size: 14px;
}
.selectCard .span {
  border-right: 1px solid black;
  text-align: right;
}
.fixed {
  position: absolute;
  right: -58px;
}

.selectCard company-detail {
  color: black;
}
.clearfix {
  color: black;
}
.el-card /deep/ .el-card__header {
  border-bottom: 1px solid #606266;
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
.sousuo {
  color: white;
  padding-top: 7px;
  padding-bottom: 8px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: #ff7720;
}
.neirong {
  border-color: #ff7720;
  float: left;
  width: 520px;
  min-width: 85%;
}
.neirong .el-input__inner {
  border-right-color: #ff7720;
  border-top-color: #ff7720;
  border-left-color: #ff7720;
  border-bottom-color: #ff7720;
}
</style>