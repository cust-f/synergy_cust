<template>
  <el-container >
    <el-header style="height:50px;padding:0px 0px;">
      <el-page-header style="padding-top:15px;margin-left:15px;" @back="goBack" content="修改企业详情"></el-page-header>
    </el-header>
    <el-main style="padding:0px 0px;">
        <el-row>
           <el-button type="primary" style="float:right;"  @click="addSubmit">保存</el-button>           
        </el-row>

      <vue-ueditor-wrap
        @ready="ready"
        mode="observer"
        :observerDebounceTime="1000"
        :observerOptions="{ attributes: true, characterData: true, childList: true, subtree: true }"
        v-model="content"
        :config="myConfig"
      ></vue-ueditor-wrap>
    </el-main>
  </el-container>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import Qs from "qs";

export default {
  name: "companyEditor",
  data() {
    return {
      companyId: this.$route.query.companyId,
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
        serverUrl: "/api/config",
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: "/static/ueditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 工具栏是否可以浮动
        autoFloatEnabled: false,
        // 初始容器高度
        initialFrameHeight: 1500,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: true
      },
      content: ""
    };
  },
  //   props:{
  //       companyId:{
  //           type:Number,
  //           default:0
  //       }
  //   },
  components: { VueUeditorWrap },
  created() {
    this.getContent();
  },
  methods: {
    goBack: function() {
      window.history.go(-1);
    },
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },
    //编辑获取文章
    getContent() {
      var that = this;
      var data = Qs.stringify({
        companyId: this.companyId
      });
      that
        .axios({
          method: "post",
          url: "/api/company/detail",
          data: data
        })
        .then(response => {
            console.log(response)
          this.content = response.data.allData.companyDetailContent;
        });
    },
    //新增文章
    addSubmit() {
      var that = this;
      var data = Qs.stringify({
        content: this.content,
        companyId: this.companyId
      });
      that
        .axios({
          method: "post",
          url: "/api/company/updateIntroduction",
          data: data
        })
        .then(response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          window.history.go(-1);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
/* 编辑器上方功能控件的布局 */
/* @import "../../../../assets/css/admin/editor.css"; */
.title {
  width: 100%;
  height: 50px;
  margin-bottom: 2vh;
}
.title .el-input {
  font-size: 22px;
}
</style>