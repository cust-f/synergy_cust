<template>
  <el-container style="overflow: hidden;">
    <div style="padding:0px;">
      <header-synergy></header-synergy>
    </div>
    <div style="padding:0px 7%;">
      <el-container>
        <el-main style="padding:0px;overflow:hidden;">
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
      <el-backtop target=".content"></el-backtop>
    </div>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import headerSynergy from "../components/common/Front/Header";
import vSidebar from "../components/common/Admin/Sidebar";
import bus from "../components/common/Admin/bus";

export default {
  name: "adminpage",
  data() {
    return {
      collapse: true
    };
  },
  components: {
    "header-synergy": headerSynergy,
    vSidebar
  },
  created() {
    // bus.$on("collapse-content", msg => {
    //   this.collapse = msg;
    // });
  },
  methods: {}
};
</script>

<style scoped>
</style>