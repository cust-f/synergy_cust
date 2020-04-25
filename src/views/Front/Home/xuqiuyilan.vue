<template>
  <el-main>
    <div class="xuqiuyilan">
      <el-col :span="20" push="4" pull="2">
        <div>
          <div>
            <el-col span="6">
              <div class="title" width="160px">
                <span>首页</span>
                <span>&nbsp;>&nbsp;</span>
                <span>需求一览</span>
              </div>
            </el-col>
          </div>
        </div>

        <div class="zy_kjcg_top">
          <!--<div><a>科技成果</a></div>-->
          <table cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td class="cg_td01">需求类型：</td>
                <td class="cg_td02">
                  <a @click="getInfo()">不限</a>
                  <a @click="testgetListByTaskType(0)">设计</a>
                  <a @click="testgetListByTaskType(1)">流通</a>
                </td>
              </tr>
              <tr>
                <td class="cg_td01">行业类别：</td>
                <td class="cg_td02">
                  <a v-bind:class="{ active: isActive0 }" @click="click0">不限</a>
                  <a v-bind:class="{ active: isActive1 }" @click="click1('交通运输设备')">交通运输设备</a>
                  <a v-bind:class="{ active: isActive2 }" @click="click2('仪器仪表及文化、办公用机械')">仪器仪表及文化、办公用机械</a>
                  <a v-bind:class="{ active: isActive3 }" @click="click3('通信设备、计算机及其他电子设备')">通信设备、计算机及其他电子设备</a>
                  <a v-bind:class="{ active: isActive4 }" @click="click4('电气机械及器材')">电气机械及器材</a>
                  <a v-bind:class="{ active: isActive5 }" @click="click5('专用设备')">专用设备</a>
                  <a v-bind:class="{ active: isActive6 }" @click="click6('通用设备')">通用设备</a>
                </td>
              </tr>
              <tr>
                <td class="cg_td01">下分子类：</td>
                <td class="cg_td02">
                  <div v-if="show0">
                    <a v-for="item in options0" :key="item.value" @click="testgetListByPartType(item.label)">{{item.label}}</a>
                  </div>
                  <div v-if="show1">
                    <a v-for="item in options1" :key="item.value" @click="testgetListByPartType(item.label)">{{item.label}}</a>
                  </div>
                  <div v-if="show2">
                    <a v-for="item in options2" :key="item.value" @click="testgetListByPartType(item.label)">{{item.label}}</a>
                  </div>
                  <div v-if="show3">
                    <a v-for="item in options3" :key="item.value" @click="testgetListByPartType(item.label)">{{item.label}}</a>
                  </div>
                  <div v-if="show4">
                    <a v-for="item in options4" :key="item.value" @click="testgetListByPartType(item.label)">{{item.label}}</a>
                  </div>
                  <div v-if="show5">
                    <a v-for="item in options5" :key="item.value" @click="testgetListByPartType(item.label)">{{item.label}}</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="width:500px; margin:20px 58px;">
          <el-input
            size="small"
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            v-model="searchInfo"
          ></el-input>
          <el-button type="warning" class="button1" style=" margin:0px -120px;" @click="searchInfoList()">搜索</el-button>
        </div>

        <div class="list">
          <!-- <div class="cg_bottomlist" >
          <ul class="cg_bottomLeft" >
            <li class="cg_list001">  
              <a href="#/threeMenu" class="ziti2">福特汽车组装</a>
            </li>
            <li class="cg_list002">
              <a>
                需求类型：流通 
              </a>
              <a>
                行业类别：交通运输设备
              </a>
              <br>
              <a>
                发布时间：2019-10-12
              </a>
              <a>
                完成时间：2019-12-22
              </a>
            </li>
          </ul>
          <div class="bottomRight" align="middle">
            <a href class="fabujigou">发布机构</a>
            <ul class="jgje">
              <li>
                  <a style="width:435px" align="left">
                    <font>机构名称:</font>
                    吉林省科技服务中心
                    <br>

                    <font>联系电话:</font>
                    1231231232132
                  </a>
                </li>
            </ul>
          </div>
          </div>-->

          <div class="cg_bottomlist" v-for="(list,index) in dataShow" :key="index">
            <ul class="cg_bottomLeft">
              <li class="cg_list001">
                <a href="#/threeMenu" class="ziti2" @click="passTaskID(list.taskId)">{{list.taskName}}</a>
              </li>
              <li class="cg_list002">
              <p>
                <a>需求类型：{{change(list.taskType)}}&nbsp;&nbsp;&nbsp;</a>
                <br>
                <a>行业主类别：{{list.taskCategoryMain}}&nbsp;&nbsp;&nbsp;</a>
                <br>
                <a>行业子类别：{{list.taskCategoryPart}}</a>      
              </p>
                <a>发布时间：{{list.publishTime| dataFormat("yyyy-MM-dd")}}&nbsp;&nbsp;&nbsp;</a>
                <a>截止时间：{{list.deadline| dataFormat("yyyy-MM-dd")}}</a>
              </li>
            </ul>
            <div class="bottomRight" align="middle">
              <a href class="fabujigou">发布机构</a>
              <ul class="jgje">
                <li>
                  <a style="width:435px" align="left">
                    <font>机构名称:</font>
                    {{list.companyName}}
                    <br />
                    <br />
                    <font>联系电话:</font>
                    {{list.demanderTel}}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 新的分页部分 -->
          <!-- <el-pagination
            class="pull-right clearfix"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNo"
            :page-sizes="pageSizesList"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalDataNumber">
          </el-pagination> -->

          <div class="page">
              <ul>
                  <li>
                      <a href="#/xuqiuyilan"  v-on:click="prePage" ></a>
                  </li>
                  <!-- <li v-for="(list, index) in totalPage">
                      <a href="#/xuqiuyilan" v-on:click="toPage(index)" :class="{active: currentPage==index}">{{ index+1 }}</a>
                  </li> -->
                  <li>
                      <a href="#/xuqiuyilan" v-on:click="nextPage" >></a>
                  </li>
              </ul>
          </div>    

          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="50">
          </el-pagination> -->


        </div>
      </el-col>
    </div>
  </el-main>
</template>



<script>
import Qs from "qs";

export default {
  name: "substaskDetail",
  data() {
    return {
      //需求大类下的下分子类
    //交通运输设备子类
        options0: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '汽车'
        }, {
          value0: '2',
          label: '铁路运输设备'
        }, {
          value0: '3',
          label: '摩托车'
        }, {
          value0: '4',
          label: '自行车'
        }, {
          value0: '5',
          label: '船舶及浮动装置'
        }, {
          value0: '6',
          label: '航空航天器'
        },{
          value0: '7',
          label: '交通器材及其他交通运输设备'
        }],
        //仪器仪表及文化、办公用机械
        options1: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '通用仪器仪表'
        }, {
          value0: '2',
          label: '专用仪器仪表'
        }, {
          value0: '3',
          label: '钟表与计时仪器'
        }, {
          value0: '4',
          label: '光学仪器及眼镜'
        }, {
          value0: '5',
          label: '文化、办公用机械'
        }, {
          value0: '6',
          label: '其他仪器仪表的制造及修理'
        }],
        //通信设备、计算机及其他电子设备
        options2: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '通信设备'
        }, {
          value0: '2',
          label: '雷达及配套设备'
        }, {
          value0: '3',
          label: '广播电视设备'
        }, {
          value0: '4',
          label: '电子计算机'
        }, {
          value0: '5',
          label: '电子器件'
        }, {
          value0: '6',
          label: '电子元件'
        }, {
          value0: '7',
          label: '家用视听设备'
        }, {
          value0: '8',
          label: '其他电子设备'
        }],
        //电气机械及器材
        options3: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '电机'
        }, {
          value0: '2',
          label: '输配电及控制设备'
        }, {
          value0: '3',
          label: '电线、电缆、光缆及电工器材'
        }, {
          value0: '4',
          label: '电池'
        }, {
          value0: '5',
          label: '家用电力器具'
        }, {
          value0: '6',
          label: '非电力家用器具'
        }, {
          value0: '7',
          label: '照明器具'
        }, {
          value0: '8',
          label: '其他电气机械及器材'
        }],
        //专用设备
        options4: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '矿山、冶金、建筑专用设备'
        }, {
          value0: '2',
          label: '化工、木材、非金属加工专用设备'
        }, {
          value0: '3',
          label: '食品、饮料、烟草及饲料生产专用设备'
        }, {
          value0: '4',
          label: '印刷、制药、日化生产专用设备'
        }, {
          value0: '5',
          label: '纺织、服装和皮革工业专用设备'
        }, {
          value0: '6',
          label: '电子和电工机械专用设备'
        }, {
          value0: '7',
          label: '农、林、牧、渔专用机械'
        }, {
          value0: '8',
          label: '医疗仪器设备及器械'
        }, {
          value0: '9',
          label: '环保、社会公共安全及其他专用设备'
        }],
        //通用设备
        options5:  [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '锅炉及原动机'
        }, {
          value0: '2',
          label: '金属加工机械'
        }, {
          value0: '3',
          label: '起重运输设备'
        }, {
          value0: '4',
          label: '泵、阀门、压缩机及类似机械'
        }, {
          value0: '5',
          label: '轴承、齿轮、传动和驱动部件'
        }, {
          value0: '6',
          label: '烘炉、熔炉及电炉'
        }, {
          value0: '7',
          label: '风机、衡器、包装设备等通用设备'
        }, {
          value0: '8',
          label: '通用零部件制造及机械修理'
        }, {
          value0: '9',
          label: '金属铸、锻加工'
        }],
        //各子类显示判定bool值
        show0: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,

        //点击变色的判定值
        isActive0: false,
        isActive1: false,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isActive6: false,

        activeName: 'first',
        checkList1: [],
        checkList2: [],
        checkList3: [],
        checkList4: [],
        checkList5: [],
        checkList6: [],
        checkList7: [],

        demandTaskList:[],

        // 总页数
        pageNum:1,
        // 每页显示的个数
        pageSize:5,
        // 当前页
        currentPage:0,
        // 总数据
        totalPage:[],
        // 当前显示的数据
        dataShow:[],
        //搜索框
        searchInfo:"",
        // pageNo: 1,
        // pageSize: 10,
        // pageSizesList: [10, 15, 20, 30, 50],
        // tableData: [],//返回的结果集合
        // totalDataNumber: 0,//数据的总数,

    };
     radio: '1'
     
       
      
      
  },
  created() {
    this.getInfo()
  },
  methods: {
    change(taskType){
      if(taskType==0)
        return "设计";
      if(taskType==1)
        return "流通";
      else
        return "error"
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    tiaozhuan() {
      this.router.push("/admin/circulationTask");
    },

    passTaskID(taskId){
      this.$router.push({
        path:"/threeMenu",
        query:{taskID:taskId}
        // 
      });
    },

    
    testgetListByTaskType(taskType){
      var that = this;
      let data = Qs.stringify({
        taskType: taskType
      });
      that.axios({
        method: "post",
        url: "/api/xuqiuyilan/getListByTaskType",
        data: data
      }).then(response =>{
        that.demandTaskList = response.data;
        console.log(that.demandTaskList)
        this.pageChange();
        this.$message({
        type: "success",
        message: "成功"
      });
      })
    },
    
    testgetListByMainType(TaskCategory){
      var that = this;
      let data = Qs.stringify({
        TaskCategory: TaskCategory
      });
      that.axios({
        method: "post",
        url: "/api/xuqiuyilan/getListByMainType",
        data: data
      }).then(response =>{
        that.demandTaskList = response.data;
        console.log(this.demandTaskList)
        this.pageChange();
        this.$message({
        type: "success",
        message: "成功"
      });
      })
    },
    testgetListByPartType(TaskCategory){
      var that = this;
      let data = Qs.stringify({
        TaskCategory: TaskCategory
      });
      that.axios({
        method: "post",
        url: "/api/xuqiuyilan/getListByPartType",
        data: data
      }).then(response =>{
        that.demandTaskList = response.data;
        console.log(this.demandTaskList)
        this.pageChange();
        this.$message({
        type: "success",
        message: "成功"
      });
      })
    },


    click0() {
      this.show0 = false;
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;

      this.isActive0 = true;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = false;
      this.isActive5 = false;
      this.isActive6 = false;
    },
    click1(TaskCategory) {
      if (this.show0 == false) {
        this.show0 = true;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.testgetListByMainType(TaskCategory);
        return;
      }
      if (this.show0 == true) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        return;
      }
    },

    click2(TaskCategory) {
      if (this.show1 == false) {
        this.show0 = false;
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.testgetListByMainType(TaskCategory);
        return;
      }
      if (this.show1 == true) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        return;
      }
    },

    click3(TaskCategory) {
      if (this.show2 == false) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.testgetListByMainType(TaskCategory);
        return;
      }
      if (this.show2 == true) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        return;
      }
    },
    click4(TaskCategory) {
      if (this.show3 == false) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
        this.isActive5 = false;
        this.isActive6 = false;
        this.testgetListByMainType(TaskCategory);
        return;
      }
      if (this.show3 == true) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        return;
      }
    },

    click5(TaskCategory) {
      if (this.show4 == false) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = true;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = true;
        this.isActive6 = false;
        this.testgetListByMainType(TaskCategory);
        return;
      }
      if (this.show4 == true) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = true;
        this.isActive6 = false;
        return;
      }
    },

    click6(TaskCategory) {
      if (this.show5 == false) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = true;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = true;
        this.testgetListByMainType(TaskCategory);
        return;
      }
      if (this.show5 == true) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;

        this.isActive0 = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        return;
      }
    },

    getInfo() {
      var that = this;
      // let data = Qs.stringify({
      //   TaskCategory: "交通运输业"
      // });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getAllList",
          // data: data
        })
        .then(response =>{
        that.demandTaskList = response.data;
        console.log(that.demandTaskList.length)
        this.pageChange();
      });
    },

    searchInfoList() {
      var that = this;
      let data = Qs.stringify({
        searchName: this.searchInfo
      });
      that.axios({
        method: "post",
        url: "/api/xuqiuyilan/searchInfo",
        data: data
      }).then(response =>{
        that.demandTaskList = response.data;
        console.log(that.demandTaskList)
        this.pageChange();
        this.$message({
        type: "success",
        message: "搜索成功"
      });
      })
    },

    pageChange(){
        var that = this;
        // 总页数
        that.pageNum = Math.ceil(that.demandTaskList.length / that.pageSize) || 1 
        // 分组
        for (var i = 0; i<that.pageNum; i++) {
            that.totalPage[i] = that.demandTaskList.slice(that.pageSize * i, that.pageSize * (i + 1))
        }
        // 取值
        that.dataShow = that.totalPage[that.currentPage]
        console.log(that.dataShow)
    },

//     //改变每页显示数量
//     handleSizeChange(val){
//       var likeThis=this;
//       var pageSize = `${val}`;
//       this.pageNo=1
//       this.pageSize= parseInt(pageSize);
//       console.log('pageSize: '+pageSize);
//       this.$nextTick(() =>
//         this.getAndDraw(1,pageSize,function (resp) {
//           likeThis.totalDataNumber = resp.data.Data.Total;
//         })
//       )
//     },

//          //改变页码
//       handleCurrentChange(val){
//         var pageSize=this.pageSize;
// //        this.pageNo=pageNo;
//         console.log('pageSize:'+this.pageSize)
//         this.getAndDraw(parseInt(pageNo),parseInt(pageSize));
//       },

    nextPage: function(){
        var that = this;
        if (that.currentPage == that.pageNum - 1) return;
        that.dataShow = that.totalPage[++that.currentPage]   
    },
    prePage: function(){
        var that = this;
        if (that.currentPage == 0) return;
        that.dataShow = that.totalPage[--that.currentPage]
    },
    toPage: function(page){
        var that = this;
        that.currentPage = page
        that.dataShow = that.totalPage[that.currentPage];
    }
  }
};
</script>
<style>
.zy_kjcg_top {
  width: 1200px;
  margin-left: 4%;
}

.zy_kjcg_top table {
  border: solid 1px #ccc;
  width: 1000px;
  border-collapse: collapse;
  background: #fafafa;

  white-space: normal;
  line-height: normal;
  font-weight: normal;
  font-size: medium;
  font-style: normal;
  color: -internal-quirk-inherit;
  text-align: start;
}
.cg_td01 {
  color: #333;
  width: 100px;
  text-align: center;
  padding: 0px;
}
.zy_kjcg_top table td {
  border: dashed 1px #ccc;
  line-height: 30px;
  font-size: 14px;
  font-family: "微软雅黑";
  color: #666;
  padding: 20px 40px;
}
.cg_td02 a {
  display: block;
  float: left;
  margin-right: 50px;
}

.list {
  float: left;
  width: 1040px;
}
.active {
  color: cornflowerblue;
}

.title {
  font-size: 14px;
  font-style: normal;
  width: 160px;
  margin: 20px 64px;
}
.td101 {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  margin-bottom: 0px;
  text-align: center;
  text-decoration: none;
  width: 160px;
}
.td102 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  border-bottom-color: rgb(204, 204, 204);

  border-bottom-style: dashed;

  border-bottom-width: 1px;

  border-collapse: collapse;

  border-left-color: rgb(204, 204, 204);

  border-left-style: dashed;

  border-left-width: 1px;

  border-right-color: rgb(204, 204, 204);

  border-right-style: dashed;

  border-right-width: 1px;

  border-spacing: 0px 0px;

  border-top-color: rgb(204, 204, 204);

  border-top-style: dashed;

  border-top-width: 1px;

  color: rgb(102, 102, 102);

  font-family: "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  padding-bottom: 20px;

  padding-left: 40px;

  padding-right: 40px;

  padding-top: 20px;

  text-decoration: none;
}

.zuo {
  width: 300px;
  float: left;
}
.you {
  width: 600px;
  margin-top: 20px;
}
.cg_td_a1 {
  border-collapse: collapse;
  border-spacing: 0px 0px;
  color: rgb(225, 119, 32);
  display: block;
  float: left;
  font-family: "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  margin-right: 50px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  text-decoration: none;
}
.cg_td_a2 {
  border-collapse: collapse;
  border-spacing: 0px 0px;
  display: block;
  float: left;
  font-family: "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  margin-right: 50px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  text-decoration: none;
}
.cool {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;
  width: 1200px;
  height: 200px;

  text-decoration: none;
}

.qwe {
  float: left;
  width: 900px;
  height: 180px;
  border: 1px solid black;
}
.xuqiuyilan .button1 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  background-attachment: scroll;

  background-clip: border-box;

  background-color: rgb(255, 119, 32);

  background-image: none;

  background-origin: padding-box;

  background-position-x: 0%;

  background-position-y: 0%;

  background-repeat: repeat;

  background-size: auto;

  border-bottom-color: rgb(255, 255, 255);

  border-bottom-style: none;

  border-bottom-width: 0px;

  border-left-color: rgb(255, 255, 255);

  border-left-style: none;

  border-left-width: 0px;

  border-right-color: rgb(255, 255, 255);

  border-right-style: none;

  border-right-width: 0px;

  border-top-color: rgb(255, 255, 255);

  border-top-style: none;

  border-top-width: 0px;

  color: rgb(255, 255, 255);

  cursor: pointer;

  float: right;

  font-family: "微软雅黑";

  font-size: 16px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  margin-bottom: 0px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 0px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  width: 120px;
}
.ziti1 {
  font-size: 14px;
}
.cg_bottomLeft {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  background-attachment: scroll;

  background-clip: border-box;

  background-color: transparent;

  background-image: none;

  background-origin: padding-box;

  background-position-x: 0%;

  background-position-y: 0%;

  background-repeat: repeat;

  background-size: auto;

  color: rgb(51, 51, 51);

  float: left;

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 20px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  list-style-image: none;

  list-style-position: outside;

  list-style-type: none;

  margin-bottom: 40px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 50px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  vertical-align: baseline;

  width: 48%;

  word-break: break-all;

  height: 120px;
}
.cg_list001 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  color: rgb(51, 51, 51);

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  word-break: break-all;
}
.cg_list002 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  color: rgb(51, 51, 51);

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 16px;

  font-weight: 400;

  list-style-position: outside;

  word-break: break-all;
}

.cg_bottomlist {
  float: left;
  margin-left: 5%;
  border-bottom: dashed 1px #ccc;
  width: 1000px;
}

.xuqiuyilan .ziti2 {

  -webkit-text-size-adjust: auto;

  color: rgb(0, 153, 234);

  display: block;

  font-family: "微软雅黑";

  font-size: 21px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 40px;

  list-style-image: none;

  list-style-position: outside;

  list-style-type: none;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  overflow: hidden;

  text-decoration: none;

  text-overflow: ellipsis;

  white-space: nowrap;

  width: 500px;

  word-break: break-all;
}
.fabujigou {
  background-attachment: scroll;

  background-clip: border-box;

  background-color: rgb(255, 230, 197);

  background-origin: padding-box;

  background-repeat: repeat;

  background-size: auto;

  color: rgb(255, 119, 32);

  display: block;

  font-family: "微软雅黑";

  font-size: 16px;

  font-weight: 400;

  line-height: 30px;

  outline-color: invert;

  position: relative;

  text-align: center;

  top: 15px;

  width: 100px;
}
.jgje {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  background-attachment: scroll;

  background-clip: border-box;

  background-color: transparent;

  background-origin: padding-box;

  background-repeat: repeat;

  background-size: auto;

  border-bottom-color: rgb(244, 156, 37);

  border-bottom-style: dashed;

  border-bottom-width: 1px;

  border-left-color: rgb(244, 156, 37);

  border-left-style: dashed;

  border-left-width: 1px;

  border-right-color: rgb(244, 156, 37);

  border-right-style: dashed;

  border-right-width: 1px;

  border-top-color: rgb(244, 156, 37);

  border-top-style: dashed;

  border-top-width: 1px;

  color: rgb(51, 51, 51);

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  height: 70px;

  outline-color: invert;

  overflow: hidden;

  padding-bottom: 10px;

  padding-left: 10px;

  padding-right: 10px;

  padding-top: 20px;

  text-decoration: none;

  vertical-align: baseline;

  word-break: break-all;

  width: 300px;
}
.bottomRight {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: right;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-weight: 400;

  line-height: normal;

  position: relative;

  margin-top: 20px;

  top: 0px;

  width: 322px;
}

.table1 {
  background-attachment: scroll;

  background-clip: border-box;

  background-color: rgb(255, 255, 255);

  background-image: none;

  background-origin: padding-box;

  background-position-x: 0%;

  background-position-y: 0%;

  background-repeat: repeat;

  background-size: auto;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  text-decoration: none;

  width: 300px;
}

.page {
  margin:40px auto;
  margin-top: 150px;
  right: 40px;
  
	transform:translateX(50%);/**右移元素**/
	-ms-transform:translateX(50%);
	-webkit-transform:translateX(50%);
}
ul,li{
  margin: 0px;
  padding: 0px;
}
li{
  list-style: none
}
.page li:first-child>a {
  margin-left: 0px
}
.page a{
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #5D6062;
  cursor: pointer;
  margin-right: 20px;
}
.page a:hover{
  background-color: #eee;
}
.page a.banclick{
  cursor:not-allowed;
}
.page .active a{
  color: #fff;
  cursor: default;
  background-color: #E96463;
  border-color: #E96463;
}
</style>
