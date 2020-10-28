<template>
  <div class="excellent">
    <div class="company">
      <el-row
        :gutter="20"
        style="font:size:14px;margin-top:10px;margin-left:15px;"
      >
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>优质企业</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-container>
        <el-main>
          <el-card shadow="never" class="selectCard company-select">
            <div
              slot="header"
              style="
                margin: -18px -20px;
                padding: 10px 20px;
                background: #dcdfe6;
                border-bottom: 1px solid #606266;
              "
              class="clearfix"
            >
              <span>优质企业</span>
            </div>
            <el-row v-if="!dynamicTags.length == 0">
              <el-col :span="3" style="line-height: 53px">
                <span>已选择条件</span>
              </el-col>
              <el-col :span="20" style="text-align: left">
                <el-row>
                  <ul class="company-navigation">
                    <li v-for="(tag, index) in dynamicTags" :key="index">
                      <el-tag
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag, 1)"
                        >{{ tag.name }}</el-tag
                      >
                    </li>
                  </ul>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="major">
                <span>省份地区</span>
              </el-col>
              <ul class="company-navigation">
                <li>
                  <a @click="districtProvince(0)">不限</a>
                </li>
                <li v-for="(pro, index) in province" :key="index">
                  <a @click="districtProvince(pro)">{{ pro.districtName }}</a>
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
                <li v-for="(c, index) in city" :key="index">
                  <a @click="districtCity(c)">{{ c.districtName }}</a>
                </li>
              </ul>
            </el-row>
            <el-row>
              <el-col :span="3" :gutter="2" class="major">
                <span>行业类别</span>
              </el-col>
              <el-col :span="21">
                <el-row>
                  <ul class="company-navigation">
                    <li>
                      <a @click="categorySelect(0)">不限</a>
                    </li>
                    <li v-for="(ca, index) in category" :key="index">
                      <a @click="categorySelect(ca)">{{ ca.name }}</a>
                    </li>
                  </ul>
                </el-row>
              </el-col>
              <!-- <el-col :span="4" v-for="ca in category" :key="ca.id">{{ca}}</el-col> -->
            </el-row>
          </el-card>

          <div style="width: 600px; margin: 20px 0px">
            <el-input
              class="neirong1"
              size="small"
              placeholder="请输入搜索内容"
              prefix-icon="el-icon-search"
              @change="searchCom"
              v-model="search"
            ></el-input>
            <el-button
              class="sousuo1"
              style="display: inline-block; float: right"
              slot="append"
              @click="searchCom"
              >搜索</el-button
            >
          </div>
          <br />

          <el-card shadow="never" class="selectCard company-detail">
            <div
              style="
                margin: -18px -20px;
                padding: 10px 20px;
                background: #dcdfe6;
                border-bottom: 1px solid #606266;
              "
              slot="header"
            >
              <span>SaaS服务平台为您寻找企业</span>
            </div>

            <div v-if="companyLists.length !== 0">
              <company-list :companyList="companyLists"></company-list>
            </div>
            <div v-else>
              <div class="noResult" style="height: 400px">
                <el-row :gutter="2" style="margin-top: 25%">
                  <el-col :span="6" :offset="5">
                    <img
                      src="../../../assets/images/company/noResult.jpg"
                      alt="No Result"
                    />
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
            <div style="margin-top: 20px">
              <el-pagination
                :hide-on-single-page="true"
                @current-change="getAnswer(1)"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next,total, jumper"
                :total="totalCount"
              ></el-pagination>
            </div>
          </el-card>
        </el-main>
        <el-aside style="width: 300px">
          <el-card
            shadow="never"
            style="width: 300px"
            class="selectCard recommend"
          >
            <div
              style="
                margin: -18px -20px;
                padding: 10px 20px;
                background: #dcdfe6;
                border-bottom: 1px solid #606266;
              "
              slot="header"
            >
              <span>推荐企业</span>
            </div>
            <ul>
              <li
                v-for="item in recommendedCompanyList"
                :key="item.id"
                style="margin-bottom: 10px"
              >
                <a @click="companyDetail(item.id)">{{ item.companyName }}</a>
              </li>
            </ul>
          </el-card>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import companyList from "./components/companyList";

export default {
  name: "excellentCompany",
  components: {
    "company-list": companyList,
  },
  data() {
    return {
      dynamicTags: [],
      province: "",
      city: [],
      provinceOption: false, //是否选择了省份
      category: "", //行业类别
      companyLists: [],
      recommendedCompanyList: [], //推荐企业列表
      currentPage: 1,
      pageSize: 15,
      //value: this.totalCount <= 15,
      totalCount: 0,
      search: "",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  created() {
    this.getProvince();
    this.getCategry();
    this.getCompanyList(this.val);
    this.getRecommendedCompanyList();
  },
  watch: {
    dynamicTags: function (val) {
      this.getAnswer(0);
    },
  },
  methods: {
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
          console.log(response);
          this.city = response.data.allData.city;
        });
    },
    getCompanyList(page) {
      let that = this;
      let data = Qs.stringify({
        page: page - 1,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/getAllCompany",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.companyLists = response.data.allData.companyList;
          this.totalCount = response.data.allData.totalCount;
        });
    },
    getRecommendedCompanyList() {
      let that = this;
      that.axios.post("/api/company/recommended").then((response) => {
        this.recommendedCompanyList = response.data.allData;
      });
    },
    searchCom() {
      this.getAnswer(0);
      // this.serach="";
    },
    //筛选条件
    getAnswer(type) {
      let that = this;
      let url;
      let provinces;
      let categorys = [];
      let citys = [];
      var j;
      // let page = currentPage;
      for (let i = 0; i < this.dynamicTags.length; i++) {
        if (this.dynamicTags[i].type == "province") {
          provinces = this.dynamicTags[i].name;
        } else if (this.dynamicTags[i].type == "city") {
          citys.push(this.dynamicTags[i].name);
        } else if (this.dynamicTags[i].type == "category") {
          categorys.push(this.dynamicTags[i].id);
        }
      }
      if (type == 0) {
        this.currentPage = 1;
      }
      let data = Qs.stringify({
        province: provinces,
        city: citys,
        category: categorys,
        searchStr: this.search,
        page: this.currentPage-1,
      });
      console.log(this.currentPage + "==========");
      if (this.dynamicTags.length != 0 || this.search != null) {
        url = "/api/company/select";
      } else {
        url = "/api/companyDetail/getAllCompany";
      }
      that
        .axios({
          method: "post",
          url: url,
          data: data,
        })
        .then((response) => {
          console.log(response);
          if (response.data.code == 400) {
            this.companyLists = "";
            this.totalCount = 0;
            this.$message({
              type: "warning",
              message: "无符合条件的企业",
            });
          } else if ((response.data.code = 200)) {
            this.companyLists = response.data.allData.companyList;
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
      if (tag.type == "province") {
        this.deleteTag("province", 0);
        this.deleteTag("city", 0);
        this.provinceOption = false;
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

        if (this.checkTag(tag)) {
          this.dynamicTags.push(tag);
        }
      }
    },
    //查看原来是否存在该省份,或重复选择同一个标签
    checkTag(data) {
      if (data.type == "province") {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type == "province") {
            let oldTag = { type: "province" };
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
        path: "/company/excellentCompanyDetail",
        name: "companyDetails",
        query: { companyId: id },
      });
    },
  },
};
</script>

<style lang = "scss">
.company {
  width: 1150px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.company .el-card__body {
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
.company .el-tag {
  margin-top: 10px;
}
.company-select .el-row {
  margin-bottom: 15px;
}
.selectCard {
  margin-top: 35px;
  /* padding-right: 55px; */
  width: 800px;
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
.company .clearfix:before,
.company .clearfix:after {
  display: table;
  content: "";
}
.company .clearfix:after {
  clear: both;
}
.company .el-card__header {
  background-color: #fbfbfb;
}
.company .clearfix span {
  font-size: 18px;
  font-weight: 500;
}

/* 推荐企业列表 */
.recommend a:hover {
  color: #0084ff;
}
</style>
<style scoped>
.sousuo1 {
  color: white;
  padding-top: 7px;
  padding-bottom: 8px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: #ff7720;
}
.neirong1 {
  border-color: #ff7720;
  float: left;
  width: 520px;
  min-width: 85%;
}
.neirong1 .el-input__inner {
  border-right-color: #ff7720;
  border-top-color: #ff7720;
  border-left-color: #ff7720;
  border-bottom-color: #ff7720;
}
</style>