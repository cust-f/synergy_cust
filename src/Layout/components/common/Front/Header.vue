<!-- 
 * @description: 
 * @fileName: Header.vue 
 * @author: 旋展峰 
 * @date: 2019-11-27 20:20:03 
 * @后台人员:  
 * @path:  
 * @version: V1.0.5 
!-->
<template>
  <header :style="{backgroundColor: bg_color, position: hd_position}">
    <div class="header">
      <div :class="{img_hover: hover_flag}" class="web_icon">
        <img src="../../../../assets/images/home/brand-logo.png" alt="官网" @click="toHome" />
      </div>
      <ul>
        <li v-for="(item,index) in titleList" :key="index" @click="selected(item.title)">
          <router-link :to="item.link" :class="{active: active == item.title}">{{ item.title }}</router-link>
        </li>
        <li>
          <el-col :offset="6" :span="4" class="function">
            <el-input
              v-show="log"
              placeholder="搜索"
              prefix-icon="el-icon-search"
              v-model="input"
              @focus="openMenu"
              width="30%"
              class="input"
            ></el-input>
            <!-- <admin-menu :drawer="drawer" @dialogClose="Close()"></admin-menu> -->
          </el-col>
          <el-col style="float:right;line-height: 78px;" :span="1">
            <span @click="logIn">{{log?"登出":"登陆"}}</span>
          </el-col>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>


export default {
  name: "headerSynergy",
  // components: {
  //   "admin-menu": adminMenu
  // },
  props: {
    bg_color: {
      type: String,
      default: "transparent"
    },
    hd_position: {
      type: String,
      default: "fixed"
    },
    hover_flag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      active: "首页",
      drawer: false, //抽屉开关
      input: "",
      log: this.$store.state.token,
      titleList: [
        {
          title: "首页",
          link: "/home"
        },
        {
          title: "产品中心",
          link: "/product"
        },
        {
          title: "解决方案",
          link: "#" // '/solution'
        },
        {
          title: "客户案例",
          link: "#" // '/customer'
        },
        {
          title: "关于我们",
          link: "#" // '/about'
        },
        {
          title: "500",
          link: "/error-500"
        }
      ]
    };
  },
  mounted() {
    this.active = this.$route.meta.nav;
  },
  methods: {
    selected(title) {
      this.active = title;
    },
    toHome() {
      this.$router.push("/home");
      this.active = "首页";
    },
    /*
     *@description:判断是否登陆
     *@modifyContent:
     *@author: 旋展峰
     *@date: 2020-01-06 10:19:57
     */
    // verifyLog() {
    //   this.log =
    // },
    logIn() {
      if (this.log) {
        this.$message.success("已登出");
        this.$store.commit("LOGOUT");
        this.log = false;
        console.log(this.$store.state.token);
      } else {
        console.log(this.log);
        this.$router.push({
          path: "/login"
        });
      }
    },
    /*
     *@description:账户管理点击事件
     *@modifyContent:抽屉关闭与打开的数据双向绑定
     *@author: 旋展峰
     *@date: 2019-11-30 14:33:11
     */
    openMenu() {
      this.drawer = !this.drawer;
    },
    Close() {
      this.drawer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
@mixin rim {
  background: transparent none repeat scroll 0 0;
  content: "";
  height: 10px;
  position: absolute;
  width: 25px;
  visibility: hidden;
  transition: 0.3s ease;
  opacity: 0;
}
header {
  color: $white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 2% 0;
  transition: background-color 1.5s;
  & > div {
    display: flex;
    justify-content: space-between;
    margin: 0 10%;
    .img_hover:hover {
      &::before {
        content: "";
        height: 555px;
        width: 100%;
        position: absolute;
        left: 0%;
        top: 0;
        background-color: transparent;
        background-image: -webkit-linear-gradient(
          -30deg,
          transparent 30%,
          #fff 50%,
          transparent 70%
        ); /*设置渐变的背景，按对角线渐变*/
        background-blend-mode: hard-light; /*设置背景为混合模式下的强光模式*/
        background-size: 200%;
        animation: shine 5s forwards; /*给背景添加动画改变位置*/
      }
    }
    .web_icon {
      img {
        position: absolute;
        z-index: inherit;
        cursor: pointer;
      }
    }
    ul {
      font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
      font-weight: bold;
      display: flex;
      list-style: none;
      li {
        margin-right: 5px;
        box-sizing: border-box;
        position: relative;
        a {
          display: block;
          line-height: 20px;
          padding: 6px 15px;
          text-decoration: none;
          box-sizing: border-box;
          color: $white;
          position: relative;
          background-color: transparent;
          text-transform: uppercase;
          transition: 0.3s ease;
          &.active {
            color: #ff8724;
            &::before {
              visibility: visible;
              opacity: 1;
              left: 0;
            }
            &::after {
              visibility: visible;
              opacity: 1;
              right: 0;
            }
          }
          &:hover {
            background: none;
            color: #ff8724;
            outline: none;
            &::before {
              visibility: visible;
              opacity: 1;
              left: 0;
            }
            &::after {
              visibility: visible;
              opacity: 1;
              right: 0;
            }
          }
          &::before {
            @include rim;
            border-left: 1px solid #ff8724;
            border-top: 1px solid #ff8724;
            top: 0;
            left: -70px;
          }
          &::after {
            @include rim;
            border-right: 1px solid #ff8724;
            border-bottom: 1px solid #ff8724;
            bottom: 0;
            right: 70px;
          }
        }
      }
    }
  }
}
// 动画
@keyframes shine {
  from {
    background-position: 130%;
  }
  to {
    background-position: -50%;
  }
}

// .logo {
//   margin-left: 20px;
// }
// .logo-detail {
//   font-size: 25px;
//   font-weight: 800;
//   margin-top: 25px;
// }
// .navigation ul li {
//   margin-top: 50px;
//   float: left;
//   list-style: none;
//   margin-right: 20px;
// }
// .function ul li {
//   float: left;
//   list-style: none;
//   margin-right: 10px;
//   margin-top: 50px;
// }
// .input {
//   margin-top: 20px;
// }
</style>