<template>
  <el-container style="overflow: hidden;">
    <div style="padding:0px;">
      <header-synergy></header-synergy>
    </div>
    <div style="margin:0 auto;">
      <el-container width="1200px" style="padding:0px;overflow:hidden;width:1200px;">
        <el-aside width="230px" style="margin-top:50px;">
          <v-sidebar></v-sidebar>
        </el-aside>
        <el-main style="padding-top:10px;overflow:hidden;" >
            <router-view></router-view>
        </el-main>
      </el-container>
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
  methods: {}
};
</script>

<style>
</style>