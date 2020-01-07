<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
   @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";     /*深色主题*/
* {
  padding: 0;
  margin: 0;
  border: 0;
}
html,
body {
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
</style>
