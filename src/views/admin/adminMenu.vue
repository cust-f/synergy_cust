<!-- 
 * @description: 后台菜单管理
 * @fileName: adminMenu.vue 
 * @author: 旋展峰 
 * @date: 2020-01-05 13:42:52 
 * @后台人员:  
 * @version: V1.0.5 
!-->
<template>
  <el-drawer
    size="90%"
    :visible.sync="drawer"
    direction="ttb"
    :before-close="handleClose"
    wrapperClosable:true
  >
    <el-container>
      <el-aside width="20%"></el-aside>
      <el-main>
        <el-row class="menu-item" v-for="item in menuList" :key="item.menuName">
          <div style="background-color:rgba(0,0,0,.5);">
            <h3>{{item.menuName}}</h3>
          </div>
          <el-col :span="4" :offset="2" v-for="child in item.children" :key="child.menuName">
            <div @click.native="redirects(child.menuName,child.code)">
              <div style=" float: left;">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="child.icon" />
                </svg>
              </div>
              <h5>{{child.menuName}}</h5>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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
            {
              menuName: "查看所有主任务",
              code: "mainStaskShow",
              icon: "#hhtxbaogao"
            },
            { menuName: "查看所有主任务", code: "mainStaskShow", icon: "#hhtxbaogao" },
             { menuName: "人员管理", code: "newStaff", icon: "#hhtxbaogao" },
          ]
        },
        {
          menuName: "模块二",
          children: [
            { menuName: "功能一", code: " ", icon: "#hhtxbingzhuangtu" },
            {
              menuName: "供应商任务",
              code: "supplierTast",
              icon: "#hhtxzhuzhuangtu"
            },
            { menuName: "功能三", code: " ", icon: "#hhtxhezuo" }
          ]
        },
        {
          menuName: "企业信息",
          children: [
            {
              menuName: "企业信息详情",
              code: "companyDetail",
              icon: "#hhtxmubiao"
            },
            {
              menuName: "所属供应商详情",
              code: "supplyBussess",
              icon: "#hhtxbiaoji"
            },
            {
              menuName: "设计任务评价",
              code: "designTaskEvaluation",
              icon: "#hhtxwenjianjia"
            },
            { menuName: "功能四", code: " ", icon: "#hhtxshujufenxi" }
          ]
        },
        {
          menuName: "模块四",
          children: [
            { menuName: "功能六", code: " ", icon: "#hhtxhaoping" },
            { menuName: "功能七", code: " ", icon: "#hhtxtuandui" },
            { menuName: "功能八", code: " ", icon: "#hhtxyouxiang" },
            { menuName: "功能九", code: " ", icon: "#hhtxdaibanshixiang" }
          ]
        },
        {
          menuName: "模块五",
          children: [
            { menuName: "功能十", code: " ", icon: "#hhtxhaoping" },
            { menuName: "功能十一", code: " ", icon: "#hhtxtuandui" },
            { menuName: "功能十二", code: " ", icon: "#hhtxyouxiang" }
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
      console.log("1111");
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
.menu-item {
  padding-top: 20px;
}
.menu-item h3 {
  color: aliceblue;
  padding: 15px 20px;
}
.menu-item h5 {
  color: aliceblue;
  float: left;
  font-size: 14px;
  font-weight: 400;
  padding-top: 26px;
  cursor: pointer;
}
</style>