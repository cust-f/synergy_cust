<template>
  <el-drawer
    size="90%"
    :visible.sync="drawer"
    direction="ttb"
    :before-close="handleClose"
    wrapperClosable:true
  >
      <el-row class="menu-item" v-for="item in menuList" :key="item.menuName">
        <div>
          <h3>{{item.menuName}}</h3>
        </div>
        <el-col :span="4" :offset="2" v-for="child in item.children" :key="child.code">
          <div @click="redirects(child.menuName,child.code)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="child.icon" />
            </svg>
            <span>{{child.menuName}}</span>
          </div>
        </el-col>
      </el-row>
  </el-drawer>
</template>

<script>
export default {
  name: "adminMenu",
  data() {
    return {
      menuList: [
        {
          menuName: "协同管理",
          children: [
            { menuName: "新增任务", code: "newTask", icon: "#hhtxdrxx04" },
            { menuName: "查看所有主任务", code: "mainStaskShow", icon: "#hhtxbaogao" },
             { menuName: "人员管理", code: "newStaff", icon: "#hhtxbaogao" },
          ]
        },
        {
          menuName: "模块二",
          children: [
            { menuName: "功能一", code: " ", icon: "#hhtxbingzhuangtu" },
            { menuName: "供应商任务", code: "supplierTast", icon: "#hhtxzhuzhuangtu" },
            { menuName: "功能三", code: " ", icon: "#hhtxhezuo" }
          ]
        },
        {
          menuName: "企业信息",
          children: [
            { menuName: "企业信息详情", code: "companyDetail", icon: "#hhtxmubiao" },
            { menuName: "所属供应商详情", code: "supplyBussess", icon: "#hhtxbiaoji" },
            { menuName: "审核", code: "review", icon: "#hhtxwenjianjia" },
            { menuName: "功能四", code: " ", icon: "#hhtxshujufenxi" }
          ]
        },
        {
          menuName: "模块四",
          children: [
            { menuName: "功能一", code: " ", icon: "#hhtxhaoping" },
            { menuName: "功能二", code: " ", icon: "#hhtxtuandui" },
            { menuName: "功能三", code: " ", icon: "#hhtxyouxiang" },
            { menuName: "功能四", code: " ", icon: "#hhtxdaibanshixiang" }
          ]
        },
        {
          menuName: "模块五",
          children: [
            { menuName: "功能一", code: " ", icon: "#hhtxhaoping" },
            { menuName: "功能二", code: " ", icon: "#hhtxtuandui" },
            { menuName: "功能三", code: " ", icon: "#hhtxyouxiang" }
          ]
        }
      ]
    };
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /*
     *@functionName:redirects.js
     *@params1: name
     *@params2: code
     *@description:导航栏转跳
     *@author: 旋展峰
     *@date: 2020-01-02 15:04:32
     *@version: V1.0.5
     */
    redirects(name, code) {
      //页面转跳
      this.$router.push({
        path: code
      });
      //关闭抽屉
      this.$emit("dialogClose", false);
    },
    handleClose(done) {
      this.$emit("dialogClose", false);
    }
  }
};
</script>

<style scope>
.el-drawer {
  background: none;
  overflow-y: scroll;
  overflow-x: hidden;
}
.el-drawer span {
  color: aliceblue;
}
.menu-item {
  margin: 50px 10px;
}
</style>