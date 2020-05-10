<template>
  <el-container class="TitleTemplate">
    <el-header style="padding:0px">
      <crumbs :breadList="crumbs"></crumbs>
    </el-header>
    <br />
    <br />
    <br />
    <el-container id="TitleTemplate-item">
      <el-aside width="35%">
        <side-navigation></side-navigation>
      </el-aside>
      <el-main>
        <div>
          <el-divider></el-divider>
        </div>
        <transition-group name="file" tag="ul" class="messageShow">
          <li v-for="item in messageList" :key="item.fileId">
            <span style="font-size:10px;  color: #0073aa;
  margin-right: 15px;">>></span>
            <a
              href="#"
              @click="upload(this);"
              :id="item.fileId"
              :data-title="item.name"
            >{{item.name}}</a>
            <span class="messageShow-date">({{ item.fileCreateTime | dataFormat("yyyy-MM-dd")}})</span>
            <el-divider></el-divider>
          </li>
        </transition-group>
        <pagination-font
          :totalCount="totalCount"
          :currentPath="currentPath.menuName"
          @paging="OtherData"
        ></pagination-font>
      </el-main>
      <el-aside width="10%"></el-aside>
    </el-container>
  </el-container>
</template>

<script>
import PaginationFont from "../../../PaginationFont";
import SideNavigation from "./SideNavigation";

import Qs from "qs";

export default {
  // beforeRouteEnter(to, from, next) {
  //   console.log("是守卫呀");
  //   console.log(this.$store.state.currentNav);
  //   console.log(this.$store.state.currentParent);
  //   next();
  // },
  name: "TitleTemplate",
  components: {
    "pagination-font": PaginationFont,
    "side-navigation": SideNavigation
  },
  data() {
    return {
      totalCount: 0,
      messageList: [],
      currentParent: this.$store.state.currentParent,
      currentPath: this.$store.state.currentNav, //当前的menuName
      current: this.$route.fullPath, //当前的menuName
      crumbs: "" //面包屑

      // service: this.$route.query.service, //区别服务专区
      // serviceName: this.$route.query.name
    };
  },
  created() {
    this.getData();
    this.saveCrumbs();
  },
  methods: {
    getData() {
      var that = this;
      var data = Qs.stringify({
        type: this.currentParent.menuName,
        stype: this.currentPath.menuName
      });
      that
        .axios({
          method: "post",
          url: "/api/downloadFiles/select",
          data: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          this.messageList = response.data.allData.list;
          this.totalCount = response.data.allData.totalCount;
          if (response.data.code == 400) {
            this.$message({
              message: response.data.message,
              type: "warning"
            });
          }
        });
    },
    saveCrumbs() {
      var crumb;
      if (this.currentPath == "") {
        crumb = [
          { code: "/home", title: "首页" },
          { title: this.currentParent.menuName }
        ];
      } else {
        crumb = [
          { code: "/home", title: "首页" },
          { code: this.currentPath.code, title: this.currentParent.menuName },
          { title: this.currentPath.menuName }
        ];
      }
      this.$store.commit("GET_CRUMBS", crumb);
      this.crumbs = crumb;
    },
    OtherData(data) {
      this.messageList = data;
    },
    upload() {
      var that = this;
      var id = event.target.id;
      var aContent = document.getElementById(id).innerHTML;
      var data;
      data = Qs.stringify({
        title: aContent
      });
      that
        .axios({
          method: "post",
          url: "/api/downloadFiles/download",
          data: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          responseType: "blob" //服务器返回的数据类型
        })
        .then(response => {
          //另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          const content = response.data;
          const blob = new Blob([content]); //构造一个blob对象来处理数据
          const fileName = aContent;
          //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          //IE10以上支持blob但是依然不支持download
          if ("download" in document.createElement("a")) {
            //支持a标签download的浏览器
            const link = document.createElement("a"); //创建a标签
            link.download = fileName; //a标签添加属性
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click(); //执行下载
            URL.revokeObjectURL(link.href); //释放url
            document.body.removeChild(link); //释放标签
          } else {
            //其他浏览器
            navigator.msSaveBlob(blob, fileName);
          }
        });
    }
  }
};
</script>

<style>
/* 列表展示css */
@import "../../../../assets/css/front/list.css";

.TitleTemplate {
  height: 100%;
}
.file-enter-active,
.file-leave-active {
  transition: all 1.5s;
}
.file-enter, .file-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}
</style>