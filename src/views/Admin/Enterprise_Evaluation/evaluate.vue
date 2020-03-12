<template>
  <el-container>
    <el-main>
      <div class="top">
        <div id="charts1" style="height:100%; width:300px; float:left"></div>
        <br/>
        <div id="charts2" style="height:100%; width:300px; float:left"></div>
        <br/>
      </div>
      
     
      <div class="lists">

           <el-table
                  :data="tableData"
                  border
                  class="table"
                  ref="multipleTable"
                 :default-sort = "{prop: 'taskId', order: 'descending'}"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column  prop="taskId" label="任务编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="任务名称"></el-table-column>
                  <el-table-column prop="taskType" label="任务类型"></el-table-column>
                   <el-table-column prop="staffNumber" label="任务参与人数"></el-table-column>
                    <el-table-column prop="sumMoney" label="任务金额"></el-table-column>
                  <el-table-column prop="doAgain" label="是否重做"></el-table-column>
                  <el-table-column prop="operatingTime" label="完成时间">
                   
                  </el-table-column>
                  <el-table-column prop="finishState" label="状态" align="center" width="80">
                  </el-table-column>
                  <el-table-column label="操作" align="center" >

                <template slot-scope="scope">
                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                </template>
              </el-table-column>
              
     
          </el-table> 
            
      </div>
    
     
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
//import { formatDate } from "./dataChange";
export default {
  name:"evaluate",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 5
      },
      pageTotal: 10,
      
      
    };
  },
  //初始化方法
   created() {
    this.getParams();
    this.getData();
  },
  //初始化俩图标
  mounted() {
    this.getCharts1();
    this.getCharts2();
  },
  methods: {
    //接受数据
    getParams() {
      //需要修改接受企业ID
      // var routerParams = this.$route.query.taskId;
      // this.taskId = routerParams;
      // console.log(routerParams);
    },
    //数据查找
    getData() {
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        companyId: "1111"
      });
      console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/evaluate",
          data: data
        })
        .then(response => {
          //this.table = response.data.allData;
           
           this.tableData = response.data.allData;
           console.log(response.data.allData);
          
          
        });
         
    },
   
    //以下为图标
    getCharts1() {
      var myChart = echarts.init(document.getElementById("charts1"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            type: "funnel",
            left: "10%",
            top: 60,
            //x2: 80,
            bottom: 60,
            width: "80%",
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "ascending", // 金字塔形:'ascending',  漏斗图形:'descending'
            gap: 2,
            label: {
              show: true,
              position: "inside"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 60, name: "参与人员数量" },
              { value: 40, name: "使用时间" },
              { value: 20, name: "涉及金额" },
              { value: 80, name: "提交次数" },
              { value: 100, name: "重做任务数量" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    getCharts2() {
      var myChart = echarts.init(document.getElementById("charts2"));
      var option = {
        tooltip: {},
        legend: {
          x: "left",
          y: "top",
          data: ["设计任务", "流通任务"]
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "人员数量", max: 50 },
            { name: "时间效率", max: 400 },
            { name: "涉及金额", max: 50000 },
            { name: "提交效率", max: 100 },
            { name: "完成准确度", max: 100 }
          ]
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [20, 200, 35000, 80, 90],
                name: "设计任务"
              },
              {
                value: [30, 300, 28000, 93, 87],
                name: "流通任务"
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style>
.el-main {
  height: 100%;
}
.top {
  width: 66%;
  margin-left: 10%;
  height: 320px;
}
.lists {
  width: 100%;
  height: 60%;
  margin-top: 30%;
  margin-left: 0%
}
</style>