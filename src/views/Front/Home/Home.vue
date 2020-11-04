
<template>
  <div align="center" class="home">
    <!--第一行 首页轮播图-->
    <div class="BG0">
      <div>
        <!-- <el-row style="width: 1300px;margin: 5px;padding: 25px;"> -->
        <div class="grid-content0">
          <el-carousel height="410px">
            <!--备注，需要向img_list写入图片地址-->
            <el-carousel-item v-for="item in img_list" :key="item">
              <img style="width: 100%; height: 100%;" :src="item" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- </el-row> -->
      </div>
    </div>

    <div class="BG">
      <!--第二行  网站访问统计数据-->
      <el-row :gutter="gutterCount" class="Statistics">
        <div style="margin:0 auto;">
          <ul>
            <li>
              <span class="dataCSS">
                服务成果:
                <font class="fontStyle">{{formMonth.monthCount}}</font>项
              </span>
            </li>
            <li>
              <span class="dataCSS">
                设计任务:
                <font class="fontStyle">{{formMonth.desingMonthCount}}</font>项
              </span>
            </li>
            <li>
              <span class="dataCSS">
                流通任务:
                <font class="fontStyle">{{formMonth.circulaterMonthCount}}</font>项
              </span>
            </li>
            <li>
              <span class="dataCSS">
                认证企业:
                <font class="fontStyle">{{formMonth.companyCount}}</font>家
              </span>
            </li>
          </ul>
        </div>
      </el-row>

      <!--第三行  分类门户-->
      <el-row :gutter="6" class="category" style="margin-bottom:20px;">
        <el-col :span="17">
          <el-row :gutter="20" style="margin-left:0px;">
            <el-col :span="8" style="padding-left: 0px;">
              <el-card shadow="hover" pa>
                <div class="category_item">
                  <div
                    class="cate_ietm_title"
                    :style="{backgroundImage: 'url(' + orangePicture + ')'}"
                    style=" background-size: cover; "
                  >
                    <font @click="demandPRedirects('交通运输设备',2)">交通运输设备</font>
                    <p></p>
                  </div>
                  <i class="cate_list">
                    <a @click="demandRedirects('汽车',8,'交通运输设备',2)">汽车</a>
                    <a @click="demandRedirects('铁路运输设备',9,'交通运输设备',2)">铁路运输设备</a>
                    <a @click="demandRedirects('摩托车',10,'交通运输设备',2)">摩托车</a>
                    <a @click="demandRedirects('自行车',11,'交通运输设备',2)">自行车</a>
                    <a @click="demandRedirects('船舶及浮动装置',12,'交通运输设备',2)">船舶及浮动装置</a>
                    <a @click="demandRedirects('航空航天器',13,'交通运输设备',2)">航空航天器</a>
                    <a @click="demandRedirects('交通器材及其他交通运输设备',14,'交通运输设备',2)">交通器材及其他交通运输设备</a>
                  </i>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="padding-left: 5px;padding-right: 10px;">
              <el-card shadow="hover" style="float:left">
                <div class="category_item">
                  <div
                    class="cate_ietm_title"
                    :style="{backgroundImage: 'url(' + redPicture + ')' }"
                  >
                    <font @click="demandPRedirects('仪器仪表及文化、办公用机械',3)">仪器仪表及文化、办公用机械</font>
                  </div>
                  <i class="cate_list">
                    <a @click="demandRedirects('通用仪器仪表',15,'仪器仪表及文化、办公用机械',3)">通用仪器仪表</a>
                    <a @click="demandRedirects('专用仪器仪表',16,'仪器仪表及文化、办公用机械',3)">专用仪器仪表</a>
                    <a @click="demandRedirects('钟表与计时仪器',17,'仪器仪表及文化、办公用机械',3)">钟表与计时仪器</a>
                    <!-- <a href>光学仪器及眼镜</a> -->
                    <a @click="demandRedirects('文化、办公用机械',19,'仪器仪表及文化、办公用机械',3)">文化、办公用机械</a>
                    <a @click="demandRedirects('其他仪器仪表的制造及修理',20,'仪器仪表及文化、办公用机械',3)">其他仪器仪表的制造及修理</a>
                  </i>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="padding-left: 5px;padding-right: 10px;">
              <el-card shadow="hover">
                <div class="category_item">
                  <div class="cate_ietm_title">
                    <font @click="demandPRedirects('通信设备、计算机及其他电子设备',4)">通信设备、计算机及其他电子设备</font>
                  </div>
                  <i class="cate_list">
                    <a @click="demandRedirects('通信设备',21,'通信设备、计算机及其他电子设备',4)">通信设备</a>
                    <a @click="demandRedirects('雷达及配套设备',22,'通信设备、计算机及其他电子设备',4)">雷达及配套设备</a>
                    <a @click="demandRedirects('广播电视设备',23,'通信设备、计算机及其他电子设备',4)">广播电视设备</a>
                    <a @click="demandRedirects('电子计算机',24,'通信设备、计算机及其他电子设备',4)">电子计算机</a>
                    <a @click="demandRedirects('电子器件',25,'通信设备、计算机及其他电子设备',4)">电子器件</a>
                    <a @click="demandRedirects('电子元件',26,'通信设备、计算机及其他电子设备',4)">电子元件</a>
                    <a @click="demandRedirects('家用视听设备',27,'通信设备、计算机及其他电子设备',4)">家用视听设备</a>
                    <a @click="demandRedirects('其他电子设备',28,'通信设备、计算机及其他电子设备',4)">其他电子设备</a>
                  </i>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!----这里分类----->
          <el-row :gutter="20" style="margin-top:25px;margin-left:0px;">
            <el-col :span="8" style="padding-left: 0px;">
              <el-card shadow="hover">
                <div class="category_item">
                  <div
                    class="cate_ietm_title"
                    :style="{backgroundImage: 'url(' + geometryPicture + ')' }"
                    style="background-size: cover;"
                  >
                    <font @click="demandPRedirects('电气机械及器材',5)">电气机械及器材</font>
                  </div>
                  <i class="cate_list">
                    <a @click="demandRedirects('电机',29,'电气机械及器材',5)">电机</a>
                    <a @click="demandRedirects('输配电及控制设备',30,'电气机械及器材',5)">输配电及控制设备</a>
                    <a @click="demandRedirects('电池',31,'电气机械及器材',5)">电池</a>
                    <a @click="demandRedirects('家用电力器具',32,'电气机械及器材',5)">家用电力器具</a>
                    <a @click="demandRedirects('非电力家用器具',33,'电气机械及器材',5)">非电力家用器具</a>
                    <a @click="demandRedirects('照明器具',34,'电气机械及器材',5)">照明器具</a>
                    <a @click="demandRedirects('其他电气机械及器材',35,'电气机械及器材',5)">其他电气机械及器材</a>
                  </i>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="padding-left: 5px;padding-right: 10px;">
              <el-card shadow="hover">
                <div class="category_item">
                  <div
                    class="cate_ietm_title"
                    :style="{backgroundImage: 'url(' + BluePicture + ')' }"
                  >
                    <font @click="demandPRedirects('专用设备',6)">专用设备</font>
                  </div>
                  <i class="cate_list">
                    <a @click="demandRedirects('矿山、冶金、建筑专用设备',37,'专用设备',6)">矿山、冶金、建筑专用设备</a>
                    <a @click="demandRedirects('电子和电工机械专用设备',42,'专用设备',6)">电子和电工机械专用设备</a>
                    <a @click="demandRedirects('医疗仪器设备及器械',44,'专用设备',6)">医疗仪器设备及器械</a>
                    <a @click="demandRedirects('农、林、牧、渔专用机械',43,'专用设备',6)">农、林、牧、渔专用机械</a>
                    <a @click="demandPRedirects('专用设备',6)" style="float:right;">更多</a>
                  </i>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="padding-left: 5px;padding-right: 10px;">
              <el-card shadow="hover">
                <div class="category_item">
                  <div
                    class="cate_ietm_title"
                    :style="{backgroundImage: 'url(' + greedPicture + ')'}"
                    style="background-size: 100% 100%;"
                  >
                    <font @click="demandPRedirects('通用设备',7)">通用设备</font>
                  </div>
                  <i class="cate_list">
                    <a @click="demandRedirects('锅炉及原动机',46,'通用设备',7)">锅炉及原动机</a>
                    <a @click="demandRedirects('金属加工机械',47,'通用设备',7)">金属加工机械</a>
                    <a @click="demandRedirects('起重运输设备',48,'通用设备',7)">起重运输设备</a>
                    <a @click="demandRedirects('烘炉、熔炉及电炉',51,'通用设备',7)">烘炉、熔炉及电炉</a>
                    <a @click="demandRedirects('金属铸、锻加工',54,'通用设备',7)">金属铸、锻加工</a>
                    <a @click="demandPRedirects('通用设备',7)">更多</a>
                  </i>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <!-- 登录模块-->
        <el-col :span="7">
          <div class="grid-content">
            <el-card style="margin-bottom:5px;padding-top: 10px;">
              <div v-if="!this.$store.state.token">
                <span>欢迎来到高端装备制造领域科技服务SaaS应用</span>
                <div class="grid-content-top-button">
                  <el-button
                    style=" left:5px; background-color:#27b0f0;; border-color:#27b0f0;; "
                    type="primary"
                    round
                    @click="login(0)"
                  >登录</el-button>
                  <el-button
                    style="right:5px;background-color:#ff6600;; border-color:#ff6600;"
                    type="primary"
                    round
                    @click="login(1)"
                  >注册</el-button>
                </div>
              </div>
              <div v-else>
                <div class="user-avator" style="padding-bottom:6%;padding-left:10px;">
                  <img @click="goAdmin" :src="this.$store.state.userLogo" />
                </div>
                <div>
                  <p style="line-height: 80px;margin-top:5px;font-size: 20px;color:#2762A0;">
                    欢迎登录高端装备SaaS平台
                    <!-- <span
                      style="font-size: 22px;font-weight: 600;margin: 0 5px;font-family: KaiTi_GB2312;"
                    >{{userName}}</span>登陆平台 -->
                  </p>
                </div>
              </div>
            </el-card>
            <div class="grid-content-down">
              <el-card class="home-box-card" style="height:100%;" :body-style="{ padding: '5px' }">
                <el-tabs
                  v-model="activeName"
                  @tab-click="handleClick"
                  :stretch="true"
                  class="loginHeight"
                >
                  <el-tab-pane label="我有需求" name="first">
                    <el-row style="margin-top: 9%;">
                      <el-tag
                        class="xqelbuttonleft"
                        style="margin-top:0px ; margin-left:0px ;"
                        type="warning"
                      >协同设计</el-tag>
                      <el-tag
                        class="xqelbuttonright"
                        style="margin-top:0px ; margin-left:0px ;"
                        type="warning"
                      >企业标准</el-tag>
                    </el-row>

                    <el-row>
                      <el-tag
                        class="xqelbuttonleft"
                        style="margin-top:10px ; margin-left:0px ;"
                        type="warning"
                      >综合服务</el-tag>
                      <el-tag
                        class="xqelbuttonright"
                        style="margin-top:10px ; margin-left:0px ;"
                        type="warning"
                      >产业融合</el-tag>
                    </el-row>

                    <el-button
                      class="xqelbuttonleft0"
                      @click="addNewTask()"
                      style="margin-top:30px ; margin-left:0px ;"
                      round
                      type="primary"
                    >发布需求</el-button>
                  </el-tab-pane>
                  <el-tab-pane label="我有服务" name="second">
                    <el-row style="margin-top: 9%;">
                      <el-tag
                        class="xqelbuttonleft"
                        style="margin-top:0px ; margin-left:0px ;"
                        type="success"
                      >协同设计</el-tag>
                      <el-tag
                        class="xqelbuttonright"
                        type="success"
                        style="margin-top:0px ; margin-left:0px ;"
                      >企业标准</el-tag>
                    </el-row>
                    <el-row>
                      <el-tag
                        class="xqelbuttonleft"
                        type="success"
                        style="margin-top:10px ; margin-left:0px ;"
                      >综合服务</el-tag>
                      <el-tag
                        class="xqelbuttonright"
                        type="success"
                        style="margin-top:10px ; margin-left:0px ;"
                      >产业融合</el-tag>
                    </el-row>

                    <el-button
                      class="xqelbuttonleft0"
                      @click="selectDemand()"
                      style="margin-top:30px ; margin-left:0px ;"
                      type="primary"
                      round
                    >寻找需求</el-button>
                  </el-tab-pane>
                  <el-tab-pane label="专利查询" name="three">
                    <!-- 专利列表搜索 -->
                    <div class="search-patentName">
                      <h4>专利查询</h4>
                      <el-row class="search-patentName-inputs">
                        <el-col :span="10">
                          <el-input v-model="patentName" placeholder="零部件名称(必)"></el-input>
                        </el-col>
                        <el-col :span="10">
                          <el-input v-model="technicalIndex" placeholder="技术指标(选)"></el-input>
                        </el-col>
                        <el-col :span="4">
                          <el-button icon="el-icon-search" circle @click="searchPatent()"></el-button>
                        </el-col>
                      </el-row>
                    </div>

                    <el-divider></el-divider>
                    <!-- 搜索企业对应专利信息 -->
                    <div class="search-org">
                      <h4>企业专利查询</h4>
                      <el-row class="search-org-inputs">
                        <el-col :span="20">
                          <el-input placeholder="输入企业名称" v-model="org"></el-input>
                        </el-col>
                        <el-col :span="4">
                          <el-button icon="el-icon-search" circle @click="searchOrgPatent()"></el-button>
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--第四行  需求一览，优质企业，服务成果-->
      <el-row :gutter="gutterCount">
        <!--需求任务-->
        <el-col :span="8">
          <div class="grid-content2 one">
            <el-card class="grid-content3">
              <div slot="header" class="titleColor">
                <span>需求一览</span>
                <el-button
                  style="float: right; padding: 5px 0"
                  type="text"
                  @click="serviceResults"
                >>>更多</el-button>
              </div>
              <el-row
                v-for="(item,index) in demandTaskList"
                :key="index"
                style="margin-bottom:20px;"
                :gutter="10"
              >
                <el-col :span="6">
                  <span class="fontStyle1">{{"【"+item.types+"】"}}</span>
                </el-col>
                <el-col :span="11">
                  <el-popover :content="item.taskName" placement="top-start" trigger="hover">
                    <a
                      slot="reference"
                      @click="serviceDetail(item.taskId)"
                      style="float:left;line-height: 24px;"
                    >{{item.taskName}}</a>
                  </el-popover>
                </el-col>
                <el-col :span="5">
                  <span
                    class="fontStyle2"
                    style="line-height: 24px;"
                  >{{item.deadline | dataFormat("yyyy-MM-dd")}}</span>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content2 tow">
            <el-card class="grid-content3">
              <div slot="header" class="titleColor">
                <span>优质企业</span>
                <el-button
                  style="float: right; padding: 5px 0"
                  type="text"
                  @click="excellentCompany"
                >>>更多</el-button>
              </div>

              <el-row
                v-for="(item,i) in supplierlist.companyId"
                :key="i"
                style="margin-bottom:20px;"
                :gutter="10"
              >
                <el-col :span="6">
                  <span
                    class="fontStyle1"
                    style="line-height: 24px;"
                  >{{"【"+supplierlist.companyProduct[i]+"】"}}</span>
                </el-col>
                <el-col :span="17">
                  <el-popover
                    :content="supplierlist.companyName[i]"
                    placement="top-start"
                    trigger="hover"
                  >
                    <a
                      slot="reference"
                      @click="excellentCompanyDetail(item)"
                      style="float:left;line-height: 24px;"
                    >{{supplierlist.companyName[i]}}</a>
                  </el-popover>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content2 three">
            <el-card class="grid-content3">
              <div slot="header" class="titleColor">
                <span>服务成果</span>
                <el-button style="float: right; padding: 5px 0" type="text" @click="needs">>>更多</el-button>
              </div>
              <el-row
                v-for="(item,index) in completeddemandTaskList"
                :key="index"
                style="margin-bottom:20px;"
                :gutter="10"
              >
                <el-col :span="6">
                  <span class="fontStyle1">{{"【"+item.types+"】"}}</span>
                </el-col>
                <el-col :span="11">
                  <el-popover :content="item.taskName" placement="top-start" trigger="hover">
                    <a
                      slot="reference"
                      @click="needsDetail(item.taskId)"
                      style="float:left;line-height: 24px;"
                    >{{item.taskName}}</a>
                  </el-popover>
                </el-col>
                <el-col :span="5">
                  <span
                    class="fontStyle2"
                    style="line-height: 24px;"
                  >{{item.finishTime | dataFormat("yyyy-MM-dd")}}</span>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>

      <!--第七行  平台数据分割线-->
      <el-row :gutter="gutterCount">
        <el-col :span="24">
          <div class="big_bt">
            <a>平台数据</a>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="gutterCount">
        <el-col :span="24">
          <el-card shadow="hover">
            <div class="demandTop5"></div>
            <!-- <div id="monthSituation" style="width: 100%;height:350%;"></div> -->
            <line-chart :lineData="lineData" ref="drawLineChart"></line-chart>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="hover" style="margin-top:5px;">
            <!-- <div id="fulfillDemandTop5" style="width: 100%;height:350%;"></div> -->
            <cloumn-chart ref="drawCloumnChart" :cloumnData="cloumnData"></cloumn-chart>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" style="margin-top:5px;">
            <!-- <div id="quarterlySituation" style="width: 100%;height:350%;"></div> -->
            <pie-chart ref="drawPieChart" :pieData="pieData"></pie-chart>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->

<script>
import lineChart from "./components/lineChart";
import columnChart from "./components/columnChart";
import pieChart from "./components/pieChart";
import Qs from "qs"
export default {
  name: "Home",
  components: {
    "line-chart": lineChart,
    "cloumn-chart": columnChart,
    "pie-chart": pieChart,
  },
  data() {
    return {
      userName: sessionStorage.getItem("ms_username"),
      //首页轮播图的图片地址数组
      img_list: [
        require("../../../assets/images/home/banner2.png"),
        // require("../../../assets/images/home/轮播图1.png"),
        // require("../../../assets/images/home/轮播图2.jpg"),
      ],
      //引入集合头部
      geometryPicture: require("../../../assets/images/home/banner/img22.png"),
      //引入绿色头部
      greedPicture: require("../../../assets/images/home/banner/img31.png"),
      //引入蓝色头部
      BluePicture: require("../../../assets/images/home/banner/img23.png"),
      //引入红色头
      redPicture: require("../../../assets/images/home/banner/red.png"),
      //引入橙色头部
      orangePicture: require("../../../assets/images/home/banner/orange.jpg"),

      sPicture: require("../../../assets/images/home/banner/banner3.jpg"),
      bPicture: require("../../../assets/images/home/banner/banner1.jpg"),
      //判定发布需求弹出框的bool值
      dialogVisible: false,
      //发布需求弹出框内的表单信息数据
      form: {
        //需求名称
        name: "",
        //需求类别组合
        value: "0",
        value0: "0",
        //需求详情
        Details: "",
        //截至日期
        dateEnd: "",
        //附件

        //联系电话
        number: "",
      },
      /**
       * 数据统计
       */
      //折线图
      lineData: {
        //发布任务总量
        finishTaskCount: [],
        //完成任务总量
        taskCount: [],
        //月份数量
        months: [],
      },

      //柱状图
      cloumnData: {
        //年份
        Vintage: [],
        //最高五家公司名称
        topCompanyName: [],
        //今年任务完成量
        nowTaskNumber: [],
        //去年任务完成量
        lastTaskNumber: [],
      },
      pieData: {
        searsonCount: [],
        seasonsFinishTaskCount: [],
        nowYear: "",
      },
      //设定本页面中el-cow与el-col的gutter\push\pull值
      gutterCount: 5,
      pushCount: 2,
      pullCount: 2,
      pushCount0: 3,

      //网站的近期统计简报数据
      taskCountMonth: 0,
      demandTaskCount: 0,
      circulationTaskCount: 0,
      certifiedEnterpriseCount: 0,
      certifiedSupplierCount: 0,

      //登录注册发布需求模块tag页的名称绑定数据
      activeName: "first",

      //需求一览数据表（category为需求一览类别,name为需求名称，sTime为项目发布时间）
      demandTaskList: [],

      //优质企业数据表（category为企业类别，companyName为企业名称）
      supplierlist: "",

      //服务成果数据表（category为服务成果类别，name为服务成果名称，sTime为服务成果完成时间）
      completeddemandTaskList: [],
      // 专利查询
      patentName: "",
      technicalIndex: "",
      org: "",

      //数据统计-本年1月1日 到 现在时间
      formMonth: {
        monthCount: "",
        desingMonthCount: [],
        circulaterMonthCount: [],
        companyCount: [],
        // monthCountRing: "",
        // desingMonthCountRing: [],
        // circulaterMonthCountRing: [],
        // companyCountRing: [],
      },
    };
  },
  //网站下方数据统计图表用（丁宅荣负责添加）
  // mounted() {
  //   this.getCharts();
  // },
  created() {
    this.monthDataB();
    this.getInfo();
    this.getStatistics();
  },
  methods: {
    //数据统计-四个数据
    monthDataB() {
      var that = this;
      var data = Qs.stringify({});
      that
        .axios({
          method: "post",
          url: "/api/findHomeData",
          data: data,
        })
        .then((response) => {
          this.formMonth.monthCount = response.data.allData[0];//服务成果数量-主任务完成数量
          this.formMonth.desingMonthCount = response.data.allData[1];//设计任务数量
          this.formMonth.circulaterMonthCount = response.data.allData[2];//流通任务数量
          this.formMonth.companyCount = response.data.allData[3];//注册的企业数量
          
        });
    },

    getInfo() {
      var that = this;
      that.axios.post("/api/home/detail").then((response) => {
        this.taskCountMonth = response.data.allData.mainTaskCount;
        this.demandTaskCount = response.data.allData.designTaskCount;
        this.circulationTaskCount = response.data.allData.circulateTaskCount;
        this.certifiedEnterpriseCount = response.data.allData.enterpriseCount;
        this.certifiedSupplierCount = response.data.allData.supplierCount;
        this.demandTaskList = response.data.allData.demandTask;
        this.completeddemandTaskList = response.data.allData.serviceTask;
        this.supplierlist = response.data.allData.company;
        console.log(this.demandTaskList);
      });
    },
    //数据统计
    getStatistics() {
      var myDate = new Date();
      var nowMonth = myDate.getMonth() + 1;
      this.lineChart();
      this.columnChart();
      this.pipChart();
    },
    lineChart() {
      var that = this;
      var task;
      var finishTask;
      that.axios
        .post("/api/dataStatistics/allMonthTaskCount")
        .then((response) => {
          this.lineData.finishTaskCount = response.data.allData.finishTaskCount;
          this.lineData.taskCount = response.data.allData.taskCount;
          this.lineData.months = response.data.allData.monthCount;
          that.$refs.drawLineChart.getCharts();
        });
    },
    columnChart() {
      let that = this;
      that.axios.post("/api/dataStatistics/supplierRank").then((response) => {
        this.cloumnData.Vintage = response.data.allData.Vintage;
        this.cloumnData.topCompanyName = response.data.allData.supplierName;
        this.cloumnData.nowTaskNumber = response.data.allData.countYear;
        this.cloumnData.lastTaskNumber = response.data.allData.countLastYear;
        this.$refs.drawCloumnChart.getCharts();
        //   console.log(response.data.allData);
      });
    },
    pipChart() {
      let that = this;
      that.axios
        .post("/api/dataStatistics/seasonsTaskCount")
        .then((response) => {
          this.pieData.searsonCount = response.data.allData.searsonCount;
          this.pieData.seasonsFinishTaskCount =
            response.data.allData.seasonsFinishTaskCount;
          this.pieData.nowYear = response.data.allData.nowYear;
          this.$refs.drawPieChart.getCharts();
        });
    },
    /*
     *转跳对应任务信息二级页面
     */
    serviceResults() {
      this.$router.push({ path: "/xuqiuyilan" });
    },
    excellentCompany() {
      this.$router.push({ path: "/excellentCompany" });
    },
    needs() {
      this.$router.push({ path: "/twoMenu" });
    },
    /**
     * 专挑到详情界面
     */
    serviceDetail(id) {
      this.$router.push({
        path: "admin/xuqiuyilanDetail",
        query: { taskID: id },
      });
    },
    excellentCompanyDetail(id) {
      this.$router.push({
        path: "/company/excellentCompanyDetail",
        name: "companyDetails",
        query: { companyId: id },
      });
    },
    needsDetail(id) {
      this.$router.push({
        path: "/service1",
        query: { mainTaskID: id },
      });
    },
    //发布需求的表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //发布需求界面
    addNewTask() {
      if (!this.$store.state.token) {
        this.$message.error("抱歉你还未进行登陆");
      } else {
        this.$router.push("/admin/newTask");
      }
    },
    //寻找需求
    selectDemand() {
      this.$message("功能维护中！");
    },
    //登陆或者注册界面转跳
    login(option) {
      if (option == 0) {
        this.$router.push("/login");
      } else {
        this.$router.push("/register");
      }
    },
    //登陆注册模块tag页点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },

    demandRedirects(cName, cId, name, id) {
      let Predirects = {
        name: name,
        id: id,
      };
      let CPredirects = {
        name: cName,
        id: cId,
      };
      this.$router.push({
        path: "/xuqiuyilan",
        query: {
          Predirects: Predirects,
          CPredirects: CPredirects,
        },
      });
    },
    demandPRedirects(name, id) {
      let Predirects = {
        name: name,
        id: id,
      };
      this.$router.push({
        path: "/xuqiuyilan",
        query: {
          Predirects: Predirects,
        },
      });
    },
    // 专利查询
    searchPatent() {
      this.$router.push({
        path: "/searchPatent",
        query: {
          keyWords: this.patentName,
          technicalIndex: this.technicalIndex,
          type: 0,
        },
      });
    },
    searchOrgPatent() {
      this.$router.push({
        path: "/searchPatent",
        query: {
          companyName: this.org,
          type: 1,
        },
      });
    },
    // 转跳到后台管理界面
    goAdmin() {
      let roleId = sessionStorage.getItem("roleId");
      if (roleID === 4) {
        this.$router.push("/admin/designerNewList");
      } else if (roleID === 2) {
        this.$router.push("/admin/mainStaskShow");
      } else if (roleID === 3) {
        this.$router.push("/admin/designTaskq");
      } else if (roleID === 6) {
        this.$router.push("/admin/mainStaskShow");
      } else this.$router.push("/admin/dashboard");
    },
  },
};
</script>

<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->


<style>
/**轮播图的样式表 */
.home .BG0 {
  box-sizing: border-box;
  background-color: white;
  margin-bottom: 15px;
  /* padding-bottom: 20px; */
  font-size: 18px;
}

/**首页轮播图用样式表用于确认轮播图高度及border*/
.home .grid-content0 {
  height: 400px;
  padding: 0px;
}

/**轮播图下方的整块的样式表*/
.home .BG {
  box-sizing: border-box;
  width: 1300px;
  margin-bottom: 5px;
  padding: 25px;
  font-size: 16px;
}

/**网站访问统计数据的样式表*/
.home .grid-content1 {
  border-radius: 4px;
  height: 50px;
  /**文字显示居中 */
  width: 100%;
  line-height: 50px;
  overflow: hidden;
}
.home .one .el-card__header {
  /* backdrop-filter: ; */
  background: url(../../../assets/images/home/banner/banner1.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-left: 0px;
  padding-right: 15px;
}
.home .tow .el-card__header {
  /* backdrop-filter: ; */
  background: url(../../../assets/images/home/banner/banner2.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.home .three .el-card__header {
  /* backdrop-filter: ; */
  background: url(../../../assets/images/home/banner/banner3.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.home .titleColor span {
  font-size: 18px;
  color: #ffffff;
}
.home .titleColor .el-button span {
  font-size: 16px;
}
/**网站访问统计数据字体样式（用于访问统计数据标题） */
.home .fontStyle0 {
  font-size: 20px;
  color: rgb(167, 165, 165);
}
.dataCSS {
  overflow: hidden;
  color: #666666;
  font-size: 16px;
}
/**数据统计样式 */
.Statistics {
  padding-left: 12.22%;
  margin-bottom: 15px;
}
.Statistics li {
  float: left;
  padding: 0 30px;
}
/**网站访问统计数据字体样式（用于访问统计数据内容） */
.home .fontStyle {
  font-size: 20px;
  padding: 0 5px;
  color: orangered;
}
/**登陆、注册模块用样式表，用于文本居中及背景色更改*/
.home .grid-content {
  text-align: center;
  height: 434px;
}

/**登录、注册按钮模块标题模块所用样式表，用于确认整体高度及布局  */
.home .grid-content-top {
  float: left;
  height: 30%;
  width: 100%;
  align-items: center;
  background-color: #ece9e9;
}
.home .grid-content-top-span {
  float: left;
  width: 100%;
  height: 20%;
  margin-top: 10%;
}
.home .grid-content-top-button {
  position: relative;
  width: 100%;
  float: left;
  height: 80%;
  margin-top: 5%;
  margin-bottom: 5%;
}

/**登录、注册按钮模块tag页模块所用样式表，用于确认整体高度及布局*/
.home .grid-content-down {
  float: left;
  height: 70%;
  width: 99%;
  background-color: rgb(255, 255, 255);
}
/*我有需求标签页下的按钮展示样式表*/
/**左侧按钮的样式表*/
.home .xqelbuttonleft {
  float: left;
  position: relative;
  left: 5%;
  width: 40%;
  margin-top: 10%;
  height: 45px;
  font-size: 17px;
  padding-top: 7px;
}
/**下方大按钮用的样式表*/
.home .xqelbuttonleft0 {
  float: left;
  position: relative;
  left: 30%;
  width: 40%;
  height: 50px;
  margin-bottom: 7%;
  font-size: 18px;
}
/**右侧按钮的样式表*/
.home .xqelbuttonright {
  float: right;
  position: relative;
  right: 5%;
  width: 40%;
  margin-top: 10%;
  height: 45px;
  font-size: 17px;
  padding-top: 7px;
}

/**发布需求的弹出窗口的CSS */

/**此样式表内 el-input的样式 */
.Publishingrequirements .el-input {
  width: 300px;
  float: left;
}
/**此样式表内 .el-dialog__title的样式*/
.Publishingrequirements .el-dialog__title {
  font-size: 25px;
  color: #4c4e52;
  float: left;
  margin-left: 8%;
}
.Publishingrequirements .el-select {
  width: 300px;
  float: left;
}
/**此样式表内 立即发布按钮的CSS样式 */
.CreatebuttonCSS {
  width: 50%;
  height: 60px;
  font-size: 30px;
  position: relative;
  left: -5%;
}

/** 登录模块核心企业与供应商用CSS*/
.loginHeight {
  /* height: 210px; */
}
.loginHeight .el-tag.el-tag--warning:hover {
  background-color: white;
}
.loginHeight .el-tag.el-tag--success:hover {
  background-color: white;
}
/**需求一览，优质企业，服务成果 用的外部样式表 */
.grid-content2 {
  border-radius: 4px;
  height: 400px;
  padding-bottom: 50px;
}
/**需求一览，优质企业，服务成果 用的内部样式表 */
.grid-content3 {
  border-radius: 4px;
  height: 400px;
  padding-bottom: 50px;
  overflow: hidden;
}
.grid-content3 .el-card__body {
  padding: 0px;
  margin-top: 20px;
}
/**需求一览 优质企业 服务成果 卡片内的字体样式（用于需求，企业，服务的类别字体）*/
.home .fontStyle1 {
  color: rgb(230, 158, 24);
  float: left;
}

/**需求一览 优质企业 服务成果 卡片内的字体样式（用于需求，服务的时间字体）*/
.home .fontStyle2 {
  color: rgb(150, 144, 144);
  font-size: 15px;
}

/**平台数据分割线用的样式表*/
.home .big_bt {
  width: 370px;
  margin: 0 auto;
  border-bottom: solid 3px #000;
  margin-bottom: 40px;
}
.home .big_bt a {
  display: block;
  font-size: 26px;
  color: #000;
  font-family: "微软雅黑";
  width: 180px;
  background: #f5f5f5;
  text-align: center;
  margin: 0 auto;
  position: relative;
  top: 18px;
}

/**布局测试用css*/
/**防止污染其他界面 */
/* .home .el-card__body {
  padding: 0;
} */
.home.el-row {
  margin-bottom: 10px;
}
.home.el-col {
  border-radius: 4px;
}
.category .el-card__body {
  padding: 0px;
}
.home.home-box-card {
  width: 100%;
  height: 100%;
}

.home .category .el-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.33);
  box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.33);
  z-index: 200;
  position: relative;
}
.grid-content2 .el-col {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}
/** */

/**分类门户的样式表*/
.category_wrap {
  width: 100%;
  margin: 0px;
  float: left;
  overflow: hidden;
  height: 400px;
}
.category_box {
  width: 100%;
  height: 100%;
}
.category_item {
  height: 195px;
  float: left;
  background: #ffffff;
}
.cate_ietm_title {
  width: 100%;
  height: 25%;
  /* background: #94d6da; */
  background: url(../../../assets/images/home/banner/greed.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* background-size: cover; */
  color: #fff;
  font-size: 16px;
  font-weight: 520;
  text-align: center;
  line-height: 50px;
}
.cate_list {
  line-height: 30px;
  margin: 20px;
  display: block;
  height: 75%;
}
.cate_list a {
  margin: 0 15px 0 0;
  display: inline-block;
  font-size: 16px;
  font-style: normal;
}
.home a {
  color: #333;
  text-decoration: none;
}

.home ul li {
  list-style: none;
  margin-bottom: 5px;
  overflow: hidden;
}
.some-show {
  white-space: nowrap; /* 规定段落中的文本不进行换行 */
  text-overflow: ellipsis; /*文字段在容器内超宽时，截断该文字段并且续以省略号*/
  overflow: hidden;
}
.tender-notice {
  border: 1px solid #d3d7d4;
}
.tender-header {
  padding: 15px;
  border-bottom: 1px solid #d3d7d4;
}
.tender-header span {
  font-size: 800;
  font-size: 16px;
}
.tender-header-some {
  padding: 20px;
  font-size: 15px;
  color: #a1a3a6;
}
.home .charts {
  text-align: "center";
  align-self: auto;
  align-content: center;
  align-items: center;
}
.demandTop5 {
  font-size: 1.2rem;
}
/* .tender-header-some ul li{
    margin-bottom: 15px;
} */
/* 专利查询 */
.search-patentName {
}
.search-patentName .el-input {
  width: 90%;
}
.search-patentName .search-patentName-inputs {
  margin-top: 15px;
}
.search-org .el-input {
  width: 95%;
}
.search-org .search-org-inputs {
  margin-top: 15px;
}
</style>