<template>
  <div>
    <div class="desinger">
      <h3>设计任务</h3>
    </div>
    <el-divider></el-divider>
    <el-row style="height:600px;">
      <el-card style="height:100%">
        <div style="font-size:20px">新增任务</div>
        <el-table
          :data="Not_Accepted_Task_Data"
          border
          class="table"
          header-cell-class-name="table-header"
          height="100%"
          style="margin-top:20px"
        >
          <template>
            <el-table-column prop="taskId" label="需求任务编号"></el-table-column>
            <el-table-column prop="taskName" label="需求任务名称"></el-table-column>
            <el-table-column prop="taskType" label="需求类型"></el-table-column>
            <el-table-column prop="deadline" label="截止时间"></el-table-column>
          </template>
          <el-table-column label="操作" min-width="45px" align="center">
            <template>
              <el-button @click="dialogVisible = true" type="text" size="small">查看任务详情</el-button>
              <el-button type="text" size="small">开始任务</el-button>
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
    <el-divider></el-divider>
    <el-row style="height:600px;">
      <el-card style="height:100%">
        <div style="font-size:20px">已接任务</div>
        <el-table
          :data="Accepted_Task_Data"
          border
          class="table"
          header-cell-class-name="table-header"
          height="100%"
          style="margin-top:20px"
        >
          <template v-for="(item,index) in Accepted_Task_Head">
            <el-table-column
              :prop="item.column_name"
              :label="item.column_comment"
              :key="index"
              :min-width="item.width"
              v-if="item.column_name != 'id'"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
          </template>
          <el-table-column label="操作" min-width="70px" align="center">
            <template>
              <el-button @click="handleDetail" type="text" size="small">进入工作台</el-button>
              <el-button @click="dialogVisible = true" type="text" size="small">查看任务详情</el-button>
              <el-button type="text" size="small">提交任务</el-button>
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
              <el-button type="text" size="small">下载图纸</el-button>
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

    <el-dialog title="设计任务详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form.taskId"
                :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form.taskName"
                :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form.taskCategory"
                :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form.deadline" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form.taskDetails"
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

export default {
  data() {
    name: "desinger";
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      Not_Accepted_Task_Head: [
        {
          column_name: "taskId",
          column_comment: "需求编号",
          width: "30"
        },
        {
          column_name: "taskName",
          column_comment: "需求名称",
          width: "55"
        },
        {
          column_name: "taskCategory",
          column_comment: "需求类别",
          width: "50"
        },
        {
          column_name: "deadline",
          column_comment: "截至时间",
          width: "45"
        }
      ],
      Not_Accepted_Task_Data: [
       
      ],
      Accepted_Task_Head: [
        {
          column_name: "taskId",
          column_comment: "需求编号",
          width: "35"
        },
        {
          column_name: "taskName",
          column_comment: "需求名称",
          width: "60"
        },
        {
          column_name: "taskCategory",
          column_comment: "需求类别",
          width: "65"
        },
        {
          column_name: "deadline",
          column_comment: "截至时间",
          width: "55"
        },
        {
          column_name: "taskCheck",
          column_comment: "审核状态",
          width: "45"
        }
      ],
      Accepted_Task_Data: [
        
      ],
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
      ],
      form: {
       
      },

      dialogVisible: false
    };
  },
  created() {
    this.getData();
    this.getTableData();
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
    //获取新增列表数据
    getData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: ""
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/designer/newlist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.Not_Accepted_Task_Data = response.data.allData;
          //this.form = response.data.allData;
        });
    },
    //获取已接收任务列表数据
    getTableData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: ""
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/designer/acceptlist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.Accepted_Task_Data = response.data.allData;
          this.form = response.data.allData;
        });
    },
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
          console.log(response);
          this.Finished_Task_Data = response.data.allData;
          //this.form = response.data.allData;
        });
    }
  }
};
</script>
<style scope>
/* .el-divider {
  margin: 25px 0px !important;
} */
.table {
  width: 100%;
  font-size: 14px;
}
</style>>