<!-- 
 * @description: 前台页面布局
 * @fileName: Front.vue 
 * @author: 旋展峰 
 * @date: 2019-11-27 20:56:52 
 * @后台人员:
 * @version: V1.0.5 
!-->
<template>
  <el-container style=" overflow:hidden;">
    <el-header height="157px">
      <header-synergy ></header-synergy>
    </el-header>
    <el-main  style=" overflow: hidden;">
        <router-view></router-view>
    </el-main>
    <el-footer>
      <footer-synergy></footer-synergy>
    </el-footer>
  </el-container>
</template>

<script>
import headerSynergy from "../components/common/Front/Header";
import footerSynergy from "../components/common/Front/Footer0";

export default {
  name: "front",
  components: {
    "header-synergy": headerSynergy, //页头
    "footer-synergy": footerSynergy //页尾
  },
  data() {
    return {
      header_color: "", // header背景色
      header_position: "", // header定位
      header_hover: "", // header图标是否显示白光划过效果
      show_backtop: false // 是否显示回到顶部按钮
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop === 0) this.header_color = "transparent";
      if (scrollTop > 100) this.header_color = "rgba(3,3,3,.8)";
      if (scrollTop > 200) this.show_backtop = true;
      if (scrollTop < 200) this.show_backtop = false;
    },
    backTop() {
      // 让回到顶部更加平滑
      let scrollTop;
      var time = setInterval(() => {
        scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        window.scroll(0, scrollTop - 50);
        if (scrollTop === 0) clearInterval(time);
      }, 50);
    },
    head_fix(val) {
      this.header_position = val[0];
      this.header_hover = val[1];
    }
  }
};
</script>

<style lang="scss">
/*
 *@description: 页面整体布局
 *@author: 旋展峰 
 *@date: 2019-11-30 14:28:16
*/
.el-container {
  margin: 0px;
  padding: 0px;
}
.el-header {
  margin: 0px;
  padding: 0px;
}
.el-main {
  margin: 0px;
  padding: 0px;
}
.el-footer {
  margin: 0px;
  padding: 0px;
}


ul {
  list-style: none;
}
.backtop {
  width: 60px;
  height: 25px;
  background-color: rgb(255, 135, 36);
  text-align: center;
  position: fixed;
  z-index: 999;
  right: 5%;
  bottom: 0;
  cursor: pointer;
  transition: transform 0.3s;
  animation: rotateIn 0.8s;
  &:hover {
    transform: scale(1.2);
  }
  i {
    color: #ffffff;
    font-size: 30px;
  }
}
</style>