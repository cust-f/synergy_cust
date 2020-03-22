<template>
  <div>
      <div class="desinger">
        <h3>流通接收任务</h3>
      </div>
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
              <template slot-scope="scope">
                <el-button @click="handleDetail" type="text" size="small">进入工作台</el-button>
                <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">查看任务详情</el-button>
                <el-button type="text" size="small" @click="submitTask(scope.row)">提交任务</el-button>
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
        <el-form ref="form1" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form1.taskId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form1.taskName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form1.taskCategory"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form1.deadline"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form1.taskDetail"
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
  name: "circulationAcceptList",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
     
      Accepted_Task_Head: [
        {
          column_name: "taskId",
          column_comment: "任务ID",
          width: "35"
        },
        {
          column_name: "taskName",
          column_comment: "任务名称",
          width: "60"
        },
        {
          column_name: "taskCategory",
          column_comment: "任务类别",
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
        },
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
     
      form1:{},
   

      dialogVisible: false
    };
  },
  created() {
    this.getTableData();
    
  },
  methods: {
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.dialogVisible = true;
    },
    

    handleDetail(index, row) {
      this.$router.push("/admin/personnel_allotment/virtualMachine");
    },
    goBack() {
      this.$router.push("/#");
    },
    handlePageChange(val) {},
    getTableData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: ""
      });
      console.log(data);
      that 
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/circulater/circulateAcceptList",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
         console.log(response);
          this.Accepted_Task_Data = response.data.allData;
          this.form1 = response.data.allData[0];
        });
    },
       submitTask(row) {
        if(row.taskCheck == "待审核"||row.taskCheck =="供应商验收未通过"||row.taskCheck == "企业验收未通过"){
        this.$confirm("确定要提交任务吗？", "提示", {
        type: "warning"
      }).then(()=>{
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskId:row.taskId
        });
        console.log(data);
        that.axios({
          method:"post",
          url:
          "http://127.0.0.1:8082/circulater/updateCirculationCheckState",
          data:data
        });  
         this.$message({
        message: "提交成功",
        type: "success"
      });
      })
      }
      else {
        this.$confirm("任务已提交无需再次提交", "提示", {
        type: "warning"
      })
      }
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