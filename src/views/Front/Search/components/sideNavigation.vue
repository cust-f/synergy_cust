<template>
    <div class="sidenavigation">
      <div class="sidenavigation-header">
        <h2>搜索</h2>
      </div>
      <div class="sidenavigation-item">
        <transition-group name="side-navigation" appear tag="ul">
          <li
            v-for="item in sidenavigationList"
            :key="item.type"
            :class="currentShow===item.type?'currentShowCss':''"
          >
            <!-- <span class="el-icon-arrow-right"></span> -->
            <a @click="recordTable(item.type)">{{item.name}}<span>【{{item.number}}条】</span></a>
          </li>
        </transition-group>
      </div>
    </div>
</template>

<script>
import Qs from "qs";

export default {
  // name:SideNavigation,
  data() {
    return {
    };
  },
  props: {
    //服务专区
    sidenavigationList: {
      type: Array,
      default: []
    },
    currentShow:{
      type:Number,
      default:0
    }
  },
  methods: {
    recordTable(index) {
        // this.
        this.currentShow=index;
         this.$emit("otherSearch", index,1);
    }
  }
};
</script>


<style>
.sidenavigation {
  border-left: 1px solid #428bca;
  border-bottom: 3px solid #428bca;
  background-color: #ffffff;
  overflow: hidden;
  margin-bottom: 30px;
  margin-top: 10px;
  margin-right: 40px;
}
.sidenavigation-header {
  background: #428bca;
  border: 1px solid #428bca;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.sidenavigation-header h2 {
  margin: 0px;
  clear: both;
  font: normal normal 18px Oswald;
  text-transform: uppercase;
  text-align: center;
  font-weight: normal;
  font-size: 22px;
  color: #fff;
}
.sidenavigation-item ul {
  padding-inline-start: 40px;
  margin-bottom: 10px;
}
.sidenavigation-item ul li {
  list-style: none;
  display: block;
  font-size: 16px;
  transition: all 0.4s ease 0s;
  background: #edf0f2;
  margin: 10px auto;
  overflow: visible;
}
.sidenavigation-item ul li a {
  color: #6a6a6a;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 10px;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  display: block;
  font-size: 16px;
  line-height: 40px;
  text-align: left;
  text-decoration: none;
}
.sidenavigation-item ul li a:hover {
  background: #31a3dd;
  color: #ffffff;
}
/* .sidenavigation-item ul li a::before {
  position: absolute;
  top: 0;
  left: -14px;
  content: ">";
} */
.sidenavigation-item .currentShowCss a {
  background: #31a3dd;
  color: #ffffff;
}
.side-navigation-enter,
.side-navigation-leave-to {
  opacity: 0;
  transform: translateY(-180px);
}
.side-navigation-enter-active,
.side-navigation-leave-active {
  transition: all 2s ease;
}
@media screen and (max-width: 768px) {
  /* .sidenavigation {
    margin: 0px;
  } */
}
</style>
