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
            <template >
              
                <el-table-column prop="taskId" label="需求任务编号"></el-table-column>
                  <el-table-column prop="taskName" label="需求任务名称"></el-table-column>
                  <el-table-column prop="taskType" label="需求类型"></el-table-column>
                  <el-table-column prop="deadline" label="截止时间"></el-table-column>
              ></el-table-column>
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
                <el-input v-model="form.Desinger_ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form.Desinger_Name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form.Desinger_Type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form.Desinger_End_Time"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form.Desinger_Task_Details"
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
          column_name: "taskType",
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
        
        // {
        //   taskId: Not_Accepted_Task_Data.taskId,
        //   taskName: Not_Accepted_Task_Data.taskName,
        //   taskType: Not_Accepted_Task_Data.taskType,
        //   deadline:Not_Accepted_Task_Data.deadline,
        // },
        // {
        //   Desinger_ID: "0002",
        //   Desinger_Name: "大帆船的制造",
        //   Desinger_Type: "中形设备制造",
        //   Desinger_End_Time: "2019-9-15"
        // },
        // {
        //   Desinger_ID: "0003",
        //   Desinger_Name: "大火箭模拟装配",
        //   Desinger_Type: "高端装配制造",
        //   Desinger_End_Time: "2019-12-17"
        // },
        // {
        //   Desinger_ID: "0004",
        //   Desinger_Name: "铁轨零件制造",
        //   Desinger_Type: "高端装配制造",
        //   Desinger_End_Time: "2019-12-17"
        // },
        // {
        //   Desinger_ID: "0005",
        //   Desinger_Name: "武器装备模拟装配",
        //   Desinger_Type: "高端装配制造",
        //   Desinger_End_Time: "2019-12-17"
        // }
      ],
      Accepted_Task_Head: [
        {
          column_name: "Task_Id",
          column_comment: "需求编号",
          width: "35"
        },
        {
          column_name: "Task_Name",
          column_comment: "需求名称",
          width: "60"
        },
        {
          column_name: "Task_Type",
          column_comment: "需求类别",
          width: "65"
        },
        {
          column_name: "Deadline",
          column_comment: "截至时间",
          width: "55"
        },
        {
          column_name: "Task_Check",
          column_comment: "审核状态",
          width: "45"
        },
      ],
      Accepted_Task_Data: [
        {
          Desinger_ID: "0001",
          Desinger_Name: "大汽车零件的装配",
          Desinger_Type: "零件装配制造",
          Desinger_End_Time: "2019-10-17",
          Supplier_Audit: "已通过",
          Core_Enterprise_Audit: "审核中"
        },
        {
          Desinger_ID: "0002",
          Desinger_Name: "大帆船的制造",
          Desinger_Type: "中形设备制造",
          Desinger_End_Time: "2019-9-15",
          Supplier_Audit: "审核中",
          Core_Enterprise_Audit: "审核中"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "大火箭模拟装配",
          Desinger_Type: "高端装配制造",
          Desinger_End_Time: "2019-12-17",
          Supplier_Audit: "已通过",
          Core_Enterprise_Audit: "已通过"
        }
      ],
      Finished_Task_Head: [
        {
          column_name: "Task_Id",
          column_comment: "需求编号"
        },
        {
          column_name: "Task_Name",
          column_comment: "需求名称"
        },
        {
          column_name: "Task_Type",
          column_comment: "需求类别"
        },
        {
          column_name: "Begin_Time",
          column_comment: "开始时间"
        },
        {
          column_name: "Finish_Time",
          column_comment: "完成时间"
        },
        {
          column_name: "Task_State",
          column_comment: "完成状态"
        }
      ],
      Finished_Task_Data: [
        {
          Desinger_ID: "0003",
          Desinger_Name: "大火箭模拟装配",
          Desinger_Type: "高端装配制造",
          Desinger_Start_Time: "2019-1-23",
          Desinger_Finish_Time: "2019-12-17",
          Desinger_Completion_Status: "已完成"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "铁轨零件制造",
          Desinger_Type: "高端装配制造",
          Desinger_Start_Time: "2019-6-7",
          Desinger_Finish_Time: "2019-12-17",
          Desinger_Completion_Status: "已销毁"
        }
      ],
      form: {
        Desinger_ID: "0001",
        Desinger_Name: "大汽车零件的装配",
        Desinger_Type: "零件装配制造",
        Desinger_End_Time: "2019-10-17",
        Desinger_Task_Details:
          "空气滤清器：作用是过滤空气中的灰尘杂质，让洁净的空气进入发动机，这对发动机的寿命和正常工作很重要。"
      },

      dialogVisible: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleDetail(index, row) {
      this.$router.push("/admin/personnel_allotment/virtualMachine");
    },
    goBack() {
      this.$router.push("/#");
    },
    handlePageChange(val) {},

    getData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: "asd"
      });
      console.log(data);
      that
        .axios({
          method: 'post',
          url: "http://127.0.0.1:8082/designer/newlist",
          data: data,

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.Not_Accepted_Task_Data = response.data.allData;
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