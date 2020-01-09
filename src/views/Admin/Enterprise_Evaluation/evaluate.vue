<template>
  <el-container>
    <el-main>
      <div class="top">
        <div id="charts1" style="height:100%; width:300px; float:left"></div>
        <div id="charts2" style="height:100%; width:300px; float:left"></div>
      </div>

      <div class="lists">
        <el-card style="height:100%">
          <el-table
            :data="Not_Accepted_Task_Data"
            border
            stripe
            class="table"
            header-cell-class-name="table-header"
            height="100%"
          >
            <template v-for="(item,index) in Not_Accepted_Task_Head">
              <el-table-column
                :prop="item.column_name"
                :label="item.column_comment"
                :key="index"
                :min-width="item.width"
                v-if="item.column_name != 'id'"
                align="center"
              ></el-table-column>
            </template>
            <el-table-column label="操作" min-width="70px" align="center">
              <template>
                <el-button @click="dialogVisible = true" type="text" size="small">查看任务详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 5
      },
      pageTotal: 13,
      Not_Accepted_Task_Head: [
        {
          column_name: "Task_ID",
          column_comment: "任务ID",
          width: "40"
        },
        {
          column_name: "Task_Name",
          column_comment: "任务名称",
          width: "60"
        },
        {
          column_name: "Task_Type",
          column_comment: "任务类型",
          width: "60"
        },
        {
          column_name: "People_Number",
          column_comment: "参与人员数量",
          width: "60"
        },
        {
          column_name: "Finished_time",
          column_comment: "使用时间",
          width: "50"
        },
        {
          column_name: "Amount_Involved",
          column_comment: "涉及金额",
          width: "50"
        },
        {
          column_name: "Submission_Times",
          column_comment: "提交次数",
          width: "50"
        },
        {
          column_name: "redo",
          column_comment: "是否存在重做记录",
          width: "50"
        },
        {
          column_name: "Completion_Status",
          column_comment: "完成状态",
          width: "50"
        }
      ],
      Not_Accepted_Task_Data: [
        {
          Task_ID: "0001",
          Task_Name: "光电测控仪器设备",
          Task_Type: "设计任务",
          People_Number: "2",
          Finished_time: "36天",
          Amount_Involved: "50000",
          Submission_Times: "13",
          redo: "否",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0002",
          Task_Name: "磨床生产",
          Task_Type: "设计任务",
          People_Number: "5",
          Finished_time: "95天",
          Amount_Involved: "100000",
          Submission_Times: "26",
          redo: "否",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0003",
          Task_Name: "汽车电子产品研发",
          Task_Type: "设计任务",
          People_Number: "16",
          Finished_time: "364天",
          Amount_Involved: "230000",
          Submission_Times: "10",
          redo: "否",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0004",
          Task_Name: "铁轨零件制造",
          Task_Type: "流通任务",
          People_Number: "9",
          Finished_time: "160天",
          Amount_Involved: "5000",
          Submission_Times: "3",
          redo: "否",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0005",
          Task_Name: "武器装备模拟装配",
          Task_Type: "流通任务",
          People_Number: "25",
          Finished_time: "245天",
          Amount_Involved: "5000",
          Submission_Times: "5",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0006",
          Task_Name: "卫星应用数据创新",
          Task_Type: "流通任务",
          People_Number: "24",
          Finished_time: "135天",
          Amount_Involved: "15000",
          Submission_Times: "5",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0007",
          Task_Name: "通信技术设计",
          Task_Type: "流通任务",
          People_Number: "22",
          Finished_time: "96天",
          Amount_Involved: "25000",
          Submission_Times: "6",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0008",
          Task_Name: "高分子材料创新",
          Task_Type: "流通任务",
          People_Number: "8",
          Finished_time: "111天",
          Amount_Involved: "7000",
          Submission_Times: "1",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0009",
          Task_Name: "发电智能制造",
          Task_Type: "流通任务",
          People_Number: "26",
          Finished_time: "323天",
          Amount_Involved: "52000",
          Submission_Times: "6",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0010",
          Task_Name: "武器装备模拟装配",
          Task_Type: "流通任务",
          People_Number: "14",
          Finished_time: "45天",
          Amount_Involved: "5000",
          Submission_Times: "2",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0011",
          Task_Name: "磨床生产",
          Task_Type: "流通任务",
          People_Number: "30",
          Finished_time: "35天",
          Amount_Involved: "15000",
          Submission_Times: "4",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0012",
          Task_Name: "汽车电子产品研发",
          Task_Type: "流通任务",
          People_Number: "25",
          Finished_time: "245天",
          Amount_Involved: "5000",
          Submission_Times: "5",
          redo: "是",
          Completion_Status: "已完成"
        },
        {
          Task_ID: "0013",
          Task_Name: "发电智能制造",
          Task_Type: "流通任务",
          People_Number: "26",
          Finished_time: "285天",
          Amount_Involved: "55000",
          Submission_Times: "13",
          redo: "是",
          Completion_Status: "已完成"
        }
      ]
    };
  },
  mounted() {
    this.getCharts1();
    this.getCharts2();
  },
  methods: {
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
  width: 98%;
  height: 60%;
}
</style>