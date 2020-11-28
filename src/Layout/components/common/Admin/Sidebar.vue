<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="this.$route.path"
      background-color="#FFF"
      text-color="#000"
      active-text-color="#20a0ff"
      router
      :default-openeds="openMenu"
      >
      <template v-for="item in items">
        <!-- 判断是否有二级 -->
        <template v-if="item.children">
          <el-submenu style="margin-bottom:15px;" :index="item.menuURL" :key="item.menuURL">
            <template slot="title">
              <i :class="item.icon"></i>
             <span  slot="title">{{ item.menuName }}</span>
            </template>
            <template v-for="subItem in item.children">
              <!-- 判断是否有三级 -->
              <el-submenu v-if="subItem.children" :index="subItem.menuURL" :key="subItem.menuURL">
                <template slot="title">{{ subItem.menuName }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.menuURL"
                >{{ threeItem.menuName }}</el-menu-item>
              </el-submenu>

              <el-menu-item
                style="padding-left:53px;"
                v-else
                :index="subItem.menuURL"
                :key="subItem.menuURL"
              >{{ subItem.menuName }}</el-menu-item>
            </template>
          </el-submenu>
        </template>

        <template v-else>
          <el-menu-item style="margin-bottom:15px;" :index="item.menuURL" :key="item.menuURL">
            <i :class="item.icon"></i>
            <span slot="menuName">{{ item.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  data() {
    return {
      openMenu:this.$store.state.openMenu,
      collapse: false,
      items: this.$store.state.menuList,
    };
  },
  created() {
    console.log(this.openMenu);
    console.log("==========");
    console.log(this.items);
  },
  methods:{
    // redirects(path){
    //   console.log("触发啦")
    //   console.log(path)
    //   var code=path;
    //   this.$router.push({ path:code});
    //                   // this.$router.push("/admin/dashboard");
    // },

    }
  };

</script>

<style>
/* .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}*/
.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar .el-menu-item:hover{
  background-color:#FFF!important;
  color: #409EFF!important;
}
.sidebar .el-submenu__title:hover{
    background-color:#FFF!important;
}
.sidebar-el-menu {
  width: 230px;
}
.sidebar > ul {
  height: 100%;
}
/* 修改导航栏边框 */
.el-menu {
  border: none;
}
.sidebar .el-menu span {
  font-size: 14px !important;
      font-weight: bold;
}
.sidebar .el-menu .el-menu-item {
  font-size: 14px !important;
  
}
</style>