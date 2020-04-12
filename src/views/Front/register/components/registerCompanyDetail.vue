<template>
    <el-container>
        <el-card>
      <div slot="header" class="clearfix">
        <span>输入企业介绍详细信息</span>
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
      filterType: this.$route.query.statuses,
      title: this.$route.query.title,
      statuses: this.$route.query.statuses,
      select: this.$route.query.select,
      id: this.$route.query.id,
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
    //编辑获取文章
    getContent() {
      var that = this;
      if (this.$store.state.table == "notice") {
        var data = Qs.stringify({
          firstMenu: this.$store.state.parentList,
          secondMenu: this.filterType,
          title: this.title
        });
      } else {
        var data = Qs.stringify({
          firstMenu: this.$store.state.currentAdminNav.menuName,
          secondMenu: this.filterType,
          title: this.title
        });
      }
      that
        .axios({
          method: "post",
          url: "/api/wp-admin/getContent",
          data: data
        })
        .then(response => {
          console.log(response);
          this.content = response.data.allData.content;
        });
    },
    //新增文章
    addSubmit() {
      if (this.filterType=="") {
        this.$message({
          message: "请选择类别哦",
          type: "warning"
        });
      } else {
        var that = this;
        if (this.$store.state.table == "notice") {
          var data = Qs.stringify({
            firstMenu: this.$store.state.parentList,
            secondMenu: this.filterType,
            title: this.title,
            NorA: this.$store.state.currentAdminNav.menuName,
            content: this.content,
            isFocus: null,
            picture: null,
            id: this.id
          });
        } else {
          var data = Qs.stringify({
            firstMenu: this.$store.state.currentAdminNav.menuName,
            secondMenu: this.filterType,
            title: this.title,
            NorA: null,
            content: this.content,
            isFocus: null,
            picture: null,
            id: this.id
          });
        }
        that
          .axios({
            method: "post",
            url: "/api/wp-admin/saveContent",
            data: data
          })
          .then(response => {
            if (response.status == 200) {
              this.$message({
                message: "保持成功",
                type: "success"
              });
              window.history.go(-1);
            } else {
              this.$message({
                message: response.data.message,
                type: "alert"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
