<template>
  <div>
    <div class="desinger">
      <h3>已完成设计任务</h3>
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
          <template>
            <el-table-column
              prop="taskId"
              label="需求任务编号"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="taskName"
              label="需求任务名称"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="taskType"
              label="需求类型"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="deadline"
              label="截止时间"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
            </el-table-column>
          </template>

          <el-table-column label="操作" min-width="90px" align="center">
            <template>
              <el-button type="text" size="small" @click="handleDetail">查看图纸</el-button>
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
    <el-dialog title="完成任务详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-form ref="form2" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form2.taskId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form2.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form2.taskCategory" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form2.deadline" :disabled="true"></el-input>
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
import { formatDate } from "./dataChange";
export default {
  data() {
    name: "desingerFinishList";
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      Finished_Task_Head: [
        {
          column_name: "taskId",
          column_comment: "需求编号"
        },
        {
          column_name: "taskName",
          column_comment: "需求名称"
        },
        {
          column_name: "taskCategory",
          column_comment: "需求类别"
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
          taskId: 123,
          taskName: 123,
          taskCategory: 123,
          deadline: "2019-5-4"
        },
        {
          taskId: 123,
          taskName: 123,
          taskCategory: 123,
          deadline: "2019-5-4"
        },
        {
          taskId: 123,
          taskName: 123,
          taskCategory: 123,
          deadline: "2019-5-4"
        },
        {
          taskId: 123,
          taskName: 123,
          taskCategory: 123,
          deadline: "2019-5-4"
        }
      ],
      form2: {},
      dialogVisible: false,
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
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
    //获取已完成的设计数据
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
          url: "http://127.0.0.1:8082/designer/historylist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          // console.log(response);
          this.Finished_Task_Data = response.data.allData;
          this.form2 = response.data.allData[0];
        });
    },
   
  }
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
.el-scrollbar__wrap {
  overflow-y: hidden;
}
</style>