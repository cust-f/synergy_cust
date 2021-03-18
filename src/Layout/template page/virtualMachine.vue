
<template>
  <el-container style="overflow: hidden;" class="visual">
    <div style="padding:0px;">
      <header-synergy></header-synergy>
    </div>
    <div>
      <el-container style="padding:0px;overflow:hidden;">
        <el-header style="height:50px;">
          <el-page-header style="padding-top:15px;margin-left:15px;" @back="goBack" content="任务工作台"></el-page-header>
        </el-header>
        <el-main style="overflow:hidden;">
          <el-container>
            <el-container>
              <el-main width="73%" id="kvm-left" class="work">
                <el-tabs type="border-card" v-model="activeName">
                  <el-tab-pane
                    v-for="(item,index) in VisualMachineList"
                    :key="index"
                    :label="item.taskName"
                    :name="item.taskId"
                  >
                    <div class="show-iframe" id="visual" :style="{height:(screenHeight-80)+'px'}">
                      <iframe
                        style="width:100%;height:100%;                                                                                                                                                                                                                                                                                            position：absolute;width: 100%;height:90%; top: 0;left:0;bottom:0;"
                        frameborder="0"
                        scrolling="yes"
                        :src="item.ip"
                      ></iframe>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-main>

              <div id="movebar" style="width:2px; z-index:2; background:#cccccc;"></div>

              <el-aside width="30%" id="kvm-right">
                <el-tabs v-model="activeTab" type="border-card">
                  <el-tab-pane
                    class="cur"
                    :style="{height:(screenHeight-600)+'px'}"
                    label="任务详情"
                    name="first"
                  >
                    <br />
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公司名称:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{taskDetail.taskCode}}</el-col>
                    </el-row>
                    
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">任务名称:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{taskDetail.taskName}}</el-col>
                    </el-row>
                    
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">任务类型:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{taskDetail.taskType}}</el-col>
                    </el-row>
                    
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">截止日期:</el-col>
                      <el-col
                        :span="16"
                        style="margin-left:30px"
                      >{{taskDetail.taskDeadline |dataFormat("yyyy-MM-dd")}}</el-col>
                    </el-row>
                        <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">联系电话:</el-col>
                      <el-col :span="15" style="margin-left:30px">
                        <span>{{taskDetail.phone}}</span>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">任务详情:</el-col>
                      <el-col :span="17" style="margin-left:30px">
                        <span>{{taskDetail.taskDescription}}</span>
                      </el-col>
                    </el-row>
                
      
                    
                  </el-tab-pane>
                  <!-- <el-tab-pane class="cur" label="文档提交" name="second">
                    假装这里有个富文本编辑器
                    <br />
                  </el-tab-pane>
                  <el-tab-pane class="cur" label="预留标签1" name="third">预留标签1</el-tab-pane>-->
                </el-tabs>
                 <el-tabs v-model="activName" type="card" @tab-click="handleClick">
              <el-tab-pane label="期刊" name="wf_mds_chn_qikan"  v-loading="loading">
                      <br />
                   <div v-for="(item, index) in currentList" :key="index" >
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">标题:</el-col>
                      <el-col :span="10" style="margin-left:30px"><span style="font-weight:bold ">{{item._source.title}}</span></el-col>
                       <el-col :span="4" align="right">资料来源:</el-col>
                      <el-col :span="3" align="right"><p>{{"万方"}}<img
                       style="width: 20px; height: 20px;float:right; "
                       src="../../assets/img/wanfang.png"
                      /></p>
                      </el-col>
                    </el-row>

                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">作者:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.author}}</el-col>
                    </el-row>
                   <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">分类:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.joucn}}</el-col>
                    </el-row>
                     <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公开号:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.nid}}</el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公开日期:</el-col>
                      <el-col
                        :span="16"
                        style="margin-left:30px"
                      >{{item._source.date}}</el-col>
                    </el-row>

                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">关键字:</el-col>
                      <el-col :span="17" style="margin-left:30px">
                        <span>{{item._source.keyword.replaceAll("%","、")}}</span>
                      </el-col>
                    </el-row>
                                         <el-row>
                        <img
          style="width:25px; height: 25px;float:left;"
          src="../../assets/img/zheda.png"
        />
        <p
          style="
            font-size: 16px;
            color: #7d7974;
            float: left;
            line-height: 30px;
            margin-left: 10px;
          "
        >
          版权所有：     浙江大学、国家重点研发计划项目支持
        </p>
        <br>

                       <el-divider></el-divider>
       
      </el-row>
                    <br>
              </div>
              <div>
                <el-pagination
                  :hide-on-single-page="true"
                  layout="prev, pager, next, jumper"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage" 
                  :page-size="pageSize"
                  :total="patentList.length"
                ></el-pagination>
              </div>

              </el-tab-pane>
              <el-tab-pane label="成果" name="wf_mds_chn_cstad" v-loading="loading">
                    <br />
                   <div v-for="(item, index) in chengguoList" :key="index" >
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">标题:</el-col>
                      <el-col :span="10" style="margin-left:30px"><span style="font-weight:bold ">{{item._source.title}}</span></el-col>
                       <el-col :span="4" align="right">资料来源:</el-col>
                      <el-col :span="3" align="right"><p>{{"万方"}}<img
                       style="width: 20px; height: 20px;float:right; "
                       src="../../assets/img/wanfang.png"
                      /></p>
                      </el-col>
                    </el-row>

                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">作者:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.author.replaceAll("%","、")}}</el-col>
                    </el-row>
                   <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公司:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.org}}</el-col>
                    </el-row>
                     <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">编号:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._id}}</el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公开日期:</el-col>
                      <el-col
                        :span="16"
                        style="margin-left:30px"
                      >{{item._source.nianyue}}</el-col>
                    </el-row>

                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">关键字:</el-col>
                      <el-col :span="17" style="margin-left:30px">
                        <span>{{item._source.keyword.replaceAll("%","、")}}</span>
                      </el-col>
                    </el-row>
                                         <el-row>
                        <img
          style="width:25px; height: 25px;float:left;"
          src="../../assets/img/zheda.png"
        />
        <p
          style="
            font-size: 16px;
            color: #7d7974;
            float: left;
            line-height: 30px;
            margin-left: 10px;
          "
        >
          版权所有：     浙江大学、国家重点研发计划项目支持
        </p>
        <br>

                       <el-divider></el-divider>
       
      </el-row>
                    <br>
              </div>
              <div>
                <el-pagination
                  :hide-on-single-page="true"
                  layout="prev, pager, next, jumper"
                  @current-change="handleCurrentChangeTwo"
                  :current-page="currentPageTwo" 
                  :page-size="pageSizeTwo"
                  :total="patentList.length"
                ></el-pagination>
              </div>

              </el-tab-pane>
              <el-tab-pane label="专利" name="wf_mds_chn_zhuanli" v-loading="loading">
                                      <br />
                   <div v-for="(item, index) in zhuanliList" :key="index">
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">标题:</el-col>
                      <el-col :span="10" style="margin-left:30px"><span style="font-weight:bold ">{{item._source.title}}</span></el-col>
                       <el-col :span="4" align="right">资料来源:</el-col>
                      <el-col :span="3" align="right"><p>{{"万方"}}<img
                       style="width: 20px; height: 20px;float:right; "
                       src="../../assets/img/wanfang.png"
                      /></p>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公司:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.org}}</el-col>
                    </el-row>
                   <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">分类:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.patt}}</el-col>
                    </el-row>
                     <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公开号:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.patno}}</el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">公开日期:</el-col>
                      <el-col
                        :span="16"
                        style="margin-left:30px"
                      >{{item._source.date}}</el-col>
                    </el-row>

                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">关键字:</el-col>
                      <el-col :span="17" style="margin-left:30px">
                        <span>{{item._source.keyword.replaceAll("%","、")}}</span>
                      </el-col>
                    </el-row>
                                         <el-row>
                        <img
          style="width:25px; height: 25px;float:left;"
          src="../../assets/img/zheda.png"
        />
        <p
          style="
            font-size: 16px;
            color: #7d7974;
            float: left;
            line-height: 30px;
            margin-left: 10px;
          "
        >
          版权所有：     浙江大学、国家重点研发计划项目支持
        </p>
        <br>

                       <el-divider></el-divider>
      </el-row>
                    <br>
              </div>
              <div>
                <el-pagination
                  :hide-on-single-page="true"
                  layout="prev, pager, next, jumper"
                  @current-change="handleCurrentChangeThree"
                  :current-page="currentPageThree" 
                  :page-size="pageSizeThree"
                  :total="patentList.length"
                ></el-pagination>
              </div>
              </el-tab-pane>
              <el-tab-pane label="标准" name="wf_mds_chn_biaozhun" v-loading="loading">
                     <br />
                   <div v-for="(item, index) in biaozhunList" :key="index">
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">标题:</el-col>
                      <el-col :span="10" style="margin-left:30px"><span style="font-weight:bold ">{{item._source.title}}</span></el-col>
                       <el-col :span="4" align="right">资料来源:</el-col>
                      <el-col :span="3" align="right"><p>{{"万方"}}<img
                       style="width: 20px; height: 20px;float:right; "
                       src="../../assets/img/wanfang.png"
                      /></p>
                      </el-col>
                    </el-row>
                   <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">类型:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.type}}</el-col>
                    </el-row>
                     <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">标准号:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.sn}}</el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">执行情况:</el-col>
                      <el-col
                        :span="16"
                        style="margin-left:30px"
                      >{{item._source.status}}</el-col>
                    </el-row>

                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">执行编号:</el-col>
                      <el-col :span="17" style="margin-left:30px">
                        <span>{{item._source.id}}</span>
                      </el-col>
                    </el-row>
                      <el-row>
                        <img
          style="width:25px; height: 25px;float:left;"
          src="../../assets/img/zheda.png"
        />
        <p
          style="
            font-size: 16px;
            color: #7d7974;
            float: left;
            line-height: 30px;
            margin-left: 10px;
          "
        >
          版权所有：     浙江大学、国家重点研发计划项目支持
        </p>
        <br>
                       <el-divider></el-divider>
       
      </el-row>
                   
              </div>
              <div>
                <el-pagination
                  :hide-on-single-page="true"
                  layout="prev, pager, next, jumper"
                  @current-change="handleCurrentChangeFour"
                  :current-page="currentPageFour" 
                  :page-size="pageSizeFour"
                  :total="patentList.length"
                ></el-pagination>
              </div>
              </el-tab-pane>
              <el-tab-pane label="法规" name="wf_mds_chn_claw" v-loading="loading">
                                   <br />
                   <div v-for="(item, index) in faguiList" :key="index">
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">标题:</el-col>
                      <el-col :span="10" style="margin-left:30px"><span style="font-weight:bold ">{{item._source.title}}</span></el-col>
                       <el-col :span="4" align="right">资料来源:</el-col>
                      <el-col :span="3" align="right"><p>{{"万方"}}<img
                       style="width: 20px; height: 20px;float:right; "
                       src="../../assets/img/wanfang.png"
                      /></p>
                      </el-col>
                    </el-row>
                   <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">类型:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.concls}}</el-col>
                    </el-row>
                     <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">判定法院:</el-col>
                      <el-col :span="15" style="margin-left:30px">{{item._source.cfa}}</el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">审判时间:</el-col>
                      <el-col
                        :span="16"
                        style="margin-left:30px"
                      >{{item._source.appdate}}</el-col>
                    </el-row>

                    <el-row style="margin-bottom:5px">
                      <el-col :span="5" align="right">案件编号:</el-col>
                      <el-col :span="17" style="margin-left:30px">
                        <span>{{item._source.id}}</span>
                      </el-col>
                    </el-row>
                     <el-row>
                        <img
          style="width:25px; height: 25px;float:left;"
          src="../../assets/img/zheda.png"
        />
        <p
          style="
            font-size: 16px;
            color: #7d7974;
            float: left;
            line-height: 30px;
            margin-left: 10px;
          "
        >
          版权所有：     浙江大学、国家重点研发计划项目支持
        </p>
        <br>

                       <el-divider></el-divider>
       
      </el-row>
            
              </div>
              <div>
                <el-pagination
                  :hide-on-single-page="true"
                  layout="prev, pager, next, jumper"
                  @current-change="handleCurrentChangefive"
                  :current-page="currentPageFive" 
                  :page-size="pageSizeFive"
                  :total="patentList.length"
                ></el-pagination>
              </div>
              </el-tab-pane>
              </el-tabs>
              </el-aside>
              


            </el-container>
          </el-container>
        </el-main>
      </el-container>
    </div>
    <el-footer></el-footer>
  </el-container>
</template>


<script>
import headerSynergy from "../components/common/Front/Header";
import bus from "../components/common/Admin/bus";
import Qs from "qs";

export default {
  data() {
    return {
      
      //加载动画
      loading:true,
      currentPage: 1,
      pageSize: 2,
      currentPageFive:1,
      pageSizeFive: 2,
      currentPageTwo:1,
      pageSizeTwo:2,
      currentPageThree:1,
      pageSizeThree:2,
      currentPageFour:1,
      pageSizeFour:2,
      // totalNumber:'',
      patentList: [
      //   {
      //   title:"大有文章",
      //   au: "逍晗",
      //   joucn:"汽车领域",
      //   nid:"845235632sss",
      //   keyword:"汽车、生活、应用",
      //   date:"2018-1-6",
      // },
      // {
      //   title:"大有文章",
      //   au: "逍晗",
      //   joucn:"汽车领域",
      //   nid:"845235632sss",
      //   keyword:"汽车、生活、应用",
      //   date:"2018-1-6",
      // },
      //       {
      //   title:"大有文章",
      //   au: "逍晗",
      //   joucn:"汽车领域",
      //   nid:"845235632sss",
      //   keyword:"汽车、生活、应用",
      //   date:"2018-1-6",
      // },
      //       {
      //   title:"大有文章",
      //   au: "逍晗",
      //   joucn:"汽车领域",
      //   nid:"845235632sss",
      //   keyword:"汽车、生活、应用",
      //   date:"2018-1-6",
      // }
      ],//所有结果数组
      currentList:[],//当前期刊页数组
      faguiList:[],//法规当前数组
      chengguoList:[],//成果当前数组
      zhuanliList:[],//专利当前数组
      biaozhunList:[],//标准当前数组
      activeName: 'first',
      taskDetail: [],
      activeTab: "first",
      activName: "one",
      VisualMachineList: "",
      taskId:this.$route.query.taskId,
      screenHeight: document.documentElement.clientHeight,
    };
  },
  components: {
    "header-synergy": headerSynergy,
  },
  watch: {
    screenHeight: function (val) {
      // 监听屏幕高度变化
      var oIframe = document.getElementById("maindiv");
      // alert(this.$store.getters.screenHeight)
      oIframe.style.height = Number(val) - 40 + "px";
    },
  },
  created() {
    this.getVirtualTab();
    this.getTaskDetail(this.taskId);
   
    this.showQikan("wf_mds_chn_qikan");
    // this.showQikan("wf_mds_chn_cstad");
  },
  mounted() {
    this.changeMobsfIframe();
    var _this = this;
    window.onresize = function () {
      // this.changeMobsfIframe();
      // var kvm_left = document.getElementById("kvm-left");
      // var kvm_right = document.getElementById("kvm-right");
      // kvm_left.style.width = "67%";
      // kvm_right.style.width = "33%";
      _this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
    /**
     * 鼠标拖动改变窗口大小
     */
    var move = true;
    this.dragControllerDiv(move);
  },
  methods: {
    //各种查看的方法
    showQikan(searchIndex){
      
      this.loading = true;
      var that = this;
      var data = {
        keyword: this.taskDetail.taskName,
        searchIndex: searchIndex,
      };
      // console.log(realUrl);
      that
        .axios({
          method: "get",
          url: "http://101.132.153.135:8448/demand/recommendResource",
          params: data ,
        })
        .then((response) => {
          this.patentList = response.data.data;
          this.loading = false;
          // if(this.patentList._index=="wf_mds_chn_qikan"){
            if(searchIndex=="wf_mds_chn_qikan"){
          this.currentList = this.patentList.slice((this.currentPage-1)*this.pageSize,this.pageSize);
            }else if(searchIndex=="wf_mds_chn_claw"){
              this.faguiList = this.patentList.slice((this.currentPageFive-1)*this.pageSizeFive,this.pageSizeFive);
            }else if(searchIndex=="wf_mds_chn_cstad"){
              this.chengguoList =this.patentList.slice((this.currentPageTwo-1)*this.pageSizeTwo,this.pageSizeTwo);
            }else if(searchIndex=="wf_mds_chn_zhuanli"){
               this.zhuanliList =this.patentList.slice((this.currentPageThree-1)*this.pageSizeThree,this.pageSizeThree);
            }else if(searchIndex=="wf_mds_chn_biaozhun"){
              this.biaozhunList =this.patentList.slice((this.currentPageFour-1)*this.pageSizeFour,this.pageSizeFour);
            }
           //结束加载动画
           
        })
        .catch((error) => {
          console.log(error);
          });
    },
    //tab页切换
    handleClick(tab, event) {
      this.showQikan(tab.name);
    },
    //期刊分页
    handleCurrentChange(cpage) {
      // console.log(cpage);
      this.currentPage = cpage;
      this.currentList = this.patentList.slice((cpage-1)*this.pageSize,this.pageSize*this.currentPage);
    },
    handleCurrentChangefive(cpage) {
      // console.log(cpage);
      this.currentPageFive = cpage;
     
      this.faguiList=this.patentList.slice((cpage-1)*this.pageSizeFive,this.pageSizeFive*this.currentPageFive);
    },
    handleCurrentChangeTwo(cpage) {
      this.currentPageTwo = cpage;
     
      this.chengguoList=this.patentList.slice((cpage-1)*this.pageSizeTwo,this.pageSizeTwo*this.currentPageTwo);
    },
    handleCurrentChangeThree(cpage) {
      this.currentPageThree = cpage;
     
      this.zhuanliList=this.patentList.slice((cpage-1)*this.pageSizeThree,this.pageSizeThree*this.currentPageThree);
    },
        handleCurrentChangeFour(cpage) {
      this.currentPageFour = cpage;
     
      this.biaozhunList=this.patentList.slice((cpage-1)*this.pageSizeFour,this.pageSizeFour*this.currentPageFour);
    },
    // handleSizeChange(psize) {
    //   this.pageSize = psize;
    // },
    /**
     * iframe-宽高自适应显示
     */
    changeMobsfIframe() {
      const oIframe = document.getElementsByClassName("show-iframe");
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      console.log(oIframe.length);
      for (var i = 0; i < oIframe.length; i++) {
        oIframe[i].style.height = Number(deviceHeight) - 40 + "px"; //数字是页面布局高度差，其中的100可以根据自己的界面进行调整
      }
    },
    //查询任务详情
    getVirtualTab() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.$route.query.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/VisualMachine/getDesignVisualMachine",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.VisualMachineList = response.data.allData.VisualMachineList;

          this.activeName = this.VisualMachineList[0].taskId;
        });
    },
    goBack() {
      window.history.go(-1);
    },
    //获得任务详情
    getTaskDetail(id) {
      var that = this;
      var data = Qs.stringify({
        taskId: id,
      });
      that
        .axios({
          method: "post",
          url: "/api/VisualMachine/getTaskDetail",
          data: data,
        })
        .then((response) => {
          this.taskDetail = response.data.allData.taskDetail;
        });
    },
    // updataDetail(data) {
    //   this.getTaskDetail(this.activeName);
    // },
    backtolist() {
      this.$router.push("/admin/personnel_allotment/desinger");
    },
    dragControllerDiv: function (move) {
      var movebar = document.getElementById("movebar");
      movebar.onmousedown = function (e) {
        //获取左右距离
        var leftw = document.getElementById("kvm-left").offsetWidth;
        var rightw = document.getElementById("kvm-right").offsetWidth;
        //获取左右拖动快
        var kvm_left = document.getElementById("kvm-left");
        var kvm_right = document.getElementById("kvm-right");

        var mouse_start = e.pageX; //开始位置
        var mouse_end; //结束位置
        move = true;

        //插入一个全局的拖动把手（隐藏的）
        var mf = document.createElement("div");
        mf.setAttribute("id", "mf");
        mf.setAttribute(
          "style",
          "position:absolute;width:100%;height:100%;top:0;z-index:9999;cursor:w-resize"
        );
        document.body.appendChild(mf);

        window.onmousemove = function (event) {
          if (move && event.button == 0) {
            //当左键按下
            mouse_end = event.pageX;
            if (mouse_start < mouse_end) {
              //向右拖动
              if (rightw >= 10) {
                kvm_left.style.width = leftw + mouse_end - mouse_start + "px";
                leftw = leftw + mouse_end - mouse_start;

                kvm_right.style.width = rightw - mouse_end + mouse_start + "px";
                rightw = rightw - mouse_end + mouse_start;
              }
              if (rightw < 10) {
                kvm_right.style.width = 10 + "px";
                kvm_left.style.width = window.innerWidth - 10 + "px";
              }
            } else if (mouse_start > mouse_end) {
              //向左拖动
              if (leftw >= 1) {
                kvm_left.style.width = leftw - mouse_start + mouse_end + "px";
                leftw = leftw - mouse_start + mouse_end;
                kvm_right.style.width = rightw + mouse_start - mouse_end + "px";
                rightw = rightw + mouse_start - mouse_end;
              }
              if (leftw < 1) {
                kvm_left.style.width = 0 + "px";
                kvm_right.style.width = window.innerWidth + "px";
              }
            }
            mouse_start = mouse_end;
            var newleftw = document.getElementById("kvm-left").offsetWidth;
            var newrightw = document.getElementById("kvm-right").offsetWidth;
            var windows = window.innerWidth;
            if (newleftw > windows) {
              kvm_left.style.width = windows.innerWidth - 10 + "px";
              kvm_right.style.width = -10 + "px";
            }
            if (newrightw > windows) {
              kvm_right.style.width = windows.innerWidth + "px";
              kvm_left.style.width = 0 + "px";
            }
          }
        };
      };
      //释放把手
      window.onmouseup = function () {
        var mf = document.getElementById("mf");
        if (mf != null) {
          mf.remove();
          move = false;
        }
      };
    },
    returnAcceptMession() {
      this.$router.push({ path: "/admin/designerAcceptList" });
    },
  },
};
</script>
<style >
.buttons {
  margin-left: 70px;
  margin-top: 15px;
  width: 150px;
}
.visual .el-main {
  padding: 0px 0px;
  /* background-color: #F5F7FA; */
}
.visual .el-tabs__header {
  margin: 0px 0px;
}
.visual .el-tabs__content {
  padding: 0;
}
/* .visual .el-tabs__nav-scroll{
  background-color: #F5F7FA;
}
.visual .el-tabs--card>.el-tabs__header .el-tabs__nav{
  background-color: #FFF;
} */

</style>
