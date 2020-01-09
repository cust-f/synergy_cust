<template>
  <div>
      <div class="desinger">
        <h3>流通任务</h3>
      </div>
      <el-row style="height:600px;">
        <el-card style="height:100%">
          <div style="font-size:20px">新增任务</div>
          <el-table
            :data="Not_Accepted_Task_Data"
            border
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
                :show-overflow-tooltip="true"
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

    <el-dialog title="流通任务详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form.Circulation_ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form.Circulation_Name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form.Circulation_Type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form.Circulation_End_Time"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form.Circulation_Task_Details"
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
          column_name: "Circulation_ID",
          column_comment: "任务ID",
          width: "30"
        },
        {
          column_name: "Circulation_Name",
          column_comment: "任务名称",
          width: "55"
        },
        {
          column_name: "Circulation_Type",
          column_comment: "任务类别",
          width: "50"
        },
        {
          column_name: "Circulation_End_Time",
          column_comment: "截至时间",
          width: "45"
        }
      ],
      Not_Accepted_Task_Data: [
        {
          Circulation_ID: "0001",
          Circulation_Name: "大汽车零件装配",
          Circulation_Type: "零件装配制造",
          Circulation_End_Time: "2019-10-17"
        },
        {
          Circulation_ID: "0002",
          Circulation_Name: "大帆船的制造",
          Circulation_Type: "中形设备制造",
          Circulation_End_Time: "2019-9-15"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "大火箭模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        },
        {
          Circulation_ID: "0004",
          Circulation_Name: "铁轨零件制造",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        },
        {
          Circulation_ID: "0005",
          Circulation_Name: "武器装备模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        }
      ],
      Accepted_Task_Head: [
        {
          column_name: "Circulation_ID",
          column_comment: "任务ID",
          width: "35"
        },
        {
          column_name: "Circulation_Name",
          column_comment: "任务名称",
          width: "60"
        },
        {
          column_name: "Circulation_Type",
          column_comment: "任务类别",
          width: "65"
        },
        {
          column_name: "Circulation_End_Time",
          column_comment: "截至时间",
          width: "55"
        },
        {
          column_name: "Supplier_Audit",
          column_comment: "供应商审核状态",
          width: "45"
        },
        {
          column_name: "Core_Enterprise_Audit",
          column_comment: "核心企业审核状态",
          width: "45"
        }
      ],
      Accepted_Task_Data: [
        {
          Circulation_ID: "0001",
          Circulation_Name: "大汽车零件的装配",
          Circulation_Type: "零件装配制造",
          Circulation_End_Time: "2019-10-17",
          Supplier_Audit: "已通过",
          Core_Enterprise_Audit: "审核中"
        },
        {
          Circulation_ID: "0002",
          Circulation_Name: "大帆船的制造",
          Circulation_Type: "中形设备制造",
          Circulation_End_Time: "2019-9-15",
          Supplier_Audit: "审核中",
          Core_Enterprise_Audit: "审核中"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "大火箭模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17",
          Supplier_Audit: "已通过",
          Core_Enterprise_Audit: "已通过"
        }
      ],
      Finished_Task_Head: [
        {
          column_name: "Circulation_ID",
          column_comment: "任务ID"
        },
        {
          column_name: "Circulation_Name",
          column_comment: "任务名称"
        },
        {
          column_name: "Circulation_Type",
          column_comment: "任务类别"
        },
        {
          column_name: "Circulation_Start_Time",
          column_comment: "开始时间"
        },
        {
          column_name: "Circulation_Finish_Time",
          column_comment: "完成时间"
        },
        {
          column_name: "Circulation_Completion_Status",
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
      form: {
        Circulation_ID: "0001",
        Circulation_Name: "大汽车零件的装配",
        Circulation_Type: "零件装配制造",
        Circulation_End_Time: "2019-10-17",
        Circulation_Task_Details:
          "空气滤清器：作用是过滤空气中的灰尘杂质，让洁净的空气进入发动机，这对发动机的寿命和正常工作很重要。"
      },

      dialogVisible: false
    };
  },
  methods: {
    handleDetail(index, row) {
      this.$router.push("/admin/personnel_allotment/virtualMachine");
    },
    goBack() {
      this.$router.push("/#");
    },
    handlePageChange(val) {}
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