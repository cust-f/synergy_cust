<template>
    <div>

        <el-row
      class="header-message"
      style="width:100%;height:30px;background-color:#f3f3f3;"
      :gutter="20"
    >
      <el-col :span="10" :offset="1">
        <!-- <div class="collapse-btn" @click="collapseChage">
          <i v-if="!collapse" class="el-icon-s-fold"></i>
          <i v-else class="el-icon-s-unfold"></i>
        </div>-->
        <span>欢迎访问高端装备制造领域的科技服务SaaS应用构建以及示范!</span>
      </el-col>
      <el-col :span="8" :offset="2">
        <ul v-if="log">
          <li>
            <el-popover placement="bottom" trigger="hover">
              <div class="user-avator">
                <img src="../../../../assets/img/img.jpg" />
              </div>
              <div>
                <a>退出登陆</a>
                <a>返回首页</a>
                <a>账号管理</a>
              </div>
              <span slot="reference">欢迎{{username}}!</span>
            </el-popover>
          </li>
          <li>
            <a>我的后台</a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a>登陆</a>
          </li>
          <li>
            <a>|</a>
          </li>
          <li>
            <a>注册</a>
          </li>
        </ul>
        <ul style="float:right;">
          <li>联系客服</li>
          <li>|</li>
          <li>关于我们</li>
          <li>|</li>
          <li>帮助中心</li>
        </ul>
      </el-col>
    </el-row>
        <el-row gutter="24">
            <el-col :span="24">
                <div class="elcolCSS0 bg-purple-dark">
                    <!-- 顶栏-->
                    <div class="CSS1">
                        <div class="CSS1Child0">
                            <span>欢迎访问&nbsp;<font class="fontStyle">高端装备制造领域的科技服务SaaS应用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span>
                        </div>
                        <div class="CSS1Child1">
                            <ul class="ulCSS">
                                <li><a href="#home">登录</a>&nbsp;</li>
                                <el-divider direction="vertical"></el-divider>
                                <li><a href="#news">&nbsp;联系客服&nbsp;</a></li>
                                <li><a href="#contact">&nbsp;关于我们&nbsp;</a></li>
                                <li><a href="#about">&nbsp;帮助中心&nbsp;</a></li>
                            </ul>
                        </div>

                    </div>



                    <!-- 搜索栏-->
                    <div class="CSS2">
                    <div class="CSS2Child0">
                    <el-image
                            style="width: 300px; height: 100px;"
                            :src="url"
                            :fit="fit">
                        </el-image>
                    </div>
                    <div class="CSS2Child3">
                    </div>
                    <div class="CSS2Child1">
                        <div class="search_wrap">
                        
    	                    <div class="search_box_l">
        	                    <div class="search_cate">看任务</div>
                                    <input name="Webhead1$keys" type="text" id="Webhead1_keys" placeholder="输入 “需求任务” 试试" class="search_txt">
                                </div>
                                <div class="float_right">
                                    <input id="Button1" value="搜索" type="button" onclick="sec();" class="search_btn" onmouseover="this.className='search_btn search_btn_hover'" onmouseout="this.className='search_btn'">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 导航栏-->
                    <div class="CSSN">
                        <div class="CSSNChild0">
                        </div>
                        <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#FF5500"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                            
                            <el-menu-item index="1">&nbsp;&nbsp;&nbsp;首页&nbsp;&nbsp;&nbsp;</el-menu-item>
                            
                            <el-menu-item index="2">&nbsp;&nbsp;&nbsp;需求任务&nbsp;&nbsp;&nbsp;</el-menu-item>
                            
                            <el-menu-item index="3">&nbsp;&nbsp;&nbsp;流通任务&nbsp;&nbsp;&nbsp;</el-menu-item>
                            
                            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">&nbsp;&nbsp;&nbsp;个人中心&nbsp;&nbsp;&nbsp;</a></el-menu-item>
                        </el-menu>
                    </div>
                </div>
            </el-col>
        </el-row>
         
    </div>
</template>
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<script>

    export default {
        
        data() {
            return {
                fit:'cover',
                url: require('../../../../assets/images/home/2.png'),
                name:'footerSynergy',
                activeIndex: '1',
                activeIndex2: '1'
         };
        },
        methods: {
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
    }

</script>
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<style scoped>
    




    /**顶栏ulcss */
    .ulCSS
    {
	    list-style-type:none;
	    margin:0;
	    padding:0;
    }
    .ulCSS li
    {
        display:inline;
    }

    .ulCSS li a
    {
        color: rgb(112, 112, 112);
    }
    /**顶栏平台名CSS */
    .fontStyle
    {
        font-size: 18px;
        color: rgb(80, 77, 77);
    }
    /**本行用CSS */
    .elcolCSS0
    {
        height: 200px;
        padding: 0;
    }
    
    /** 顶栏用CSS*/
    .CSS1
    {
        height:30px;
        padding: 0;
        width: 100%;
        background-color:rgb(194, 198, 207);
    }
    /**顶栏内内容所用CSS*/
    .CSS1Child0
    {
        height:30px;
        width: 50%;
        /* background-color:coral; */
        text-align: center;
        line-height: 30px;
        float: left;
        color: rgb(112, 112, 112);
        overflow: hidden;
    }
    .CSS1Child1
    {
        height:30px;
        width: 50%;
        /* background-color:brown; */
         text-align: center;
        line-height: 30px;
        float: right;
        overflow: hidden;
    }
    /**搜索栏用CSS */
    .CSS2
    {
        height:100px;
        padding: 0;
        width: 100%;
        background-color: rgb(236, 232, 232);
    }
    /**搜索栏栏内内容所用CSS*/
    .CSS2Child0
    {
        height:100px;
        width: 50%;
        /* background-color:coral; */
        text-align: center;
        line-height: 100px;
        float: left;
        color: rgb(112, 112, 112);
        overflow: hidden;
    }
    .CSS2Child3
    {
        height:100px;
        width: 15%;
        /* background-color:brown; */
         text-align: left;
        line-height: 36px;
        float: left;
        overflow: hidden;
    }
    .CSS2Child1
    {
        height:100px;
        width: 35%;
        /* background-color:brown; */
         text-align: left;
        line-height: 36px;
        float: left;
        overflow: hidden;
    }





    /**搜索框用CSS */
    .search_wrap 
    {
        float: left;
        margin: 28px 20px 0 0;
        right: 100px;
    }
    .search_box_l 
    {
        width: 400px;
        height: 38px;
        border: 3px solid #ff5500;
        border-right: none;
        float: left;
        overflow: hidden;
    }
    .search_cate 
    {
        float: left;
        width: 75px;
        line-height: 38px;
        background: #f5f5f5;
        border-right: 1px solid #eee;
        text-indent: 18px;
    }
    .float_right
    {
        float: right;
    }
    .search_btn 
    {
        width: 80px;
        height: 44px;
        line-height: 44px;
        background: #ff5500;
        font-family: "microsoft YaHei";
        font-size: 16px;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    .search_txt 
    {
        width: 324px;
        height: 38px;
        border: none;
        line-height: 38px;
        text-indent: 10px;
        font-size: 12px;
    }

    /**导航栏用CSS */
    .CSSN
    {
        height:70px;
        padding: 0;
        width: 100%;
        background-color:rgb(255, 255, 255)
    }
     .CSSNChild0
    {
        height:61px;
        width: 15%;
        /* background-color:brown; */
         text-align: left;
        line-height: 36px;
        float: left;
        overflow: hidden;
    }




    .admin-header ul li {
  float: left;
  margin-left: 15px;
}
.header-message {
  color: #888;
  font-size: 13px;
  line-height: 32px;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #242f42;
  line-height: 70px;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  line-height: 70px;
  color: #fff;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>