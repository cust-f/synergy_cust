<template>
    <el-container>
        <el-card class="detailEdit">
      <div slot="header" class="clearfix">
        <span>添加企业介绍详情</span>
      </div>
     <vue-ueditor-wrap
        @ready="ready"
        mode="observer"
        :observerDebounceTime="1000"
        :observerOptions="{ attributes: true, characterData: true, childList: true, subtree: true }"
        v-model="content"
        :config="myConfig"
      ></vue-ueditor-wrap>     
        </el-card>

    </el-container>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import Qs from "qs";

export default {
  name: "editor",
  data() {
    return {
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
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: true
      },
      content: ""
    };
  },
  components: { VueUeditorWrap },
//   created() {
//     this.getContent();
//   },
  methods: {
    // goBack: function() {
    //   window.history.go(-1);
    // },
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },

    //新增文章
    addSubmit() {
        var that = this;
          var data = Qs.stringify({
            content: this.content,
          });

        that
          .axios({
            method: "post",
            url: "/api/register/setCompanyDetail",
            data: data
          })
          .then(response => {
            this.$emit("registerDetail");
          })
          .catch(function(error) {
            console.log(error);
          });
    }
  }
};
</script>
<style>
.el-container{
  width: 100%;
}
.detailEdit{
  /* margin-top: 60px; */
  margin-top: 5px;
  width: 1076px;
  margin-bottom: 40px;
  margin-left:auto;
  margin-right:auto;
}
</style>