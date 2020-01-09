<template>
  <el-container style="overflow: hidden;">
    <div style="padding:0px;">
      <admin-header></admin-header>
    </div>
    <div style="padding:0px 7%;" class="content" :class="{'content-collapse':collapse}">
      <el-container>
        <el-aside width="230px;">
          <v-sidebar></v-sidebar>
        </el-aside>
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
import adminHeader from "../components/common/Admin/adminHeader";
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
    "admin-header": adminHeader,
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