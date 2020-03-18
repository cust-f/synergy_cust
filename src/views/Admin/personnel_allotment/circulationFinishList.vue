<template>
  <div>
      <div class="desinger">
        <h3>流通历史任务</h3>
      </div>
      <el-divider></el-divider>
      <el-row style="height:600px;">
        <el-card style="height:100%">
          <div style="font-size:20px">历史任务</div>
          <el-table
            :data="Finished_Task_Data"
            border
            class="table"
            header-cell-class-name="table-header"
            height="100%"
            style="margin-top:20px"
          >
            <template v-for="(item,index) in Finished_Task_Head">
              <el-table-column
                :prop="item.column_name"
                :label="item.column_comment"
                :key="index"
                v-if="item.column_name != 'id'"
                min-width="90px"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
            </template>
            <el-table-column label="操作" min-width="90px" align="center">
              <template>
                <el-button type="text" size="small" @click = "handleDetail">查看图纸</el-button>
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
      </el-row>
      <el-dialog title="流通任务详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-form ref="form2" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form2.taskId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form2.taskName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form2.taskCategory"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form2.deadline"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form2.taskDetail"
                style="width:100%;"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import Qs from "qs";
export default {
  name: "circulationFinishList",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      Finished_Task_Head: [
        {
          column_name: "taskId",
          column_comment: "任务ID"
        },
        {
          column_name: "taskName",
          column_comment: "任务名称"
        },
        {
          column_name: "taskCategory",
          column_comment: "任务类别"
        },
        {
          column_name: "beginTime",
          column_comment: "开始时间"
        },
        {
          column_name: "finishTime",
          column_comment: "完成时间"
        },
        {
          column_name: "taskState",
          column_comment: "完成状态"
        }
      ],
      Finished_Task_Data: [
        {
          Circulation_ID: "0003",
          Circulation_Name: "大火箭模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_Start_Time: "2019-1-23",
          Circulation_Finish_Time: "2019-12-17",
          Circulation_Completion_Status: "已完成"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "铁轨零件制造",
          Circulation_Type: "高端装配制造",
          Circulation_Start_Time: "2019-6-7",
          Circulation_Finish_Time: "2019-12-17",
          Circulation_Completion_Status: "已销毁"
        }
      ],
      form2:{},

      dialogVisible: false
    };
  },
  created() {
    this.getHistoryData();
  },
  methods: {
    

    handleDetail(index, row) {
      this.$router.push("/admin/personnel_allotment/virtualMachine");
    },
    goBack() {
      this.$router.push("/#");
    },
    handlePageChange(val) {},
    getHistoryData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: ""
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082//circulater/circulateFinishList",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
         // console.log(response);
          this.Finished_Task_Data = response.data.allData;
          this.form2 = response.data.allData;
        });
    },
  },
  
};
</script>
<style>
/* .el-divider {
  margin: 25px 0px !important;
} */
.table {
  width: 100%;
  font-size: 14px;
}
</style>>