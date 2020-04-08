<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  //   provide (){
  //     return{
  //       reload: this.reload
  //     }
  //   },
  //   data (){
  //     return{
  //       isRouterAlive:true
  //     }
  //   },
  //   method:{
  //   reload(){
  //     this.isRouterAlive = false
  //     this.$nextTick(function(){
  //       this.isRouterAlive = true
  //     })
  //   }
  // },
    created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
        window.sessionStorage.setItem('token', false) //一开始标记未登录
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },

};
</script>

<style lang="scss">
   @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";     /*深色主题*/
body .el-table th.gutter{

    display: table-cell!important;

}

 

body .el-table colgroup.gutter{

    display: table-cell!important;

}
* {
  padding: 0;
  margin: 0;
  border: 0;
}
//用于审查元素溢出
// 	* {
//     background: #000 !important;
//     color: #0f0 !important;
//     outline: solid #f00 1px !important;
// }
html,
body{
  width: 100%;
  height: 100%;
}
.icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 20px;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  /* -webkit-box-shadow:inset006pxrgba(0,0,0,0.3); */
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  /* -webkit-box-shadow:inset006pxrgba(0,0,0,0.5); */
}


h3{
  font-size: 24px;
}
a{
    cursor: pointer;
}
</style>
