<template>
  <div>
    <div class="desinger">
            <div  class = "biaoti" style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;">&nbsp;&nbsp;&nbsp;&nbsp;已接任务</div>

    </div>
    <br>
    <!-- <el-divider></el-divider> -->
    <el-row style="height:600px;">
      <el-card style="height:100%">
        <!-- <div style="font-size:20px">已接任务</div> -->
        <el-table
          :data="Accepted_Task_Data.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
          border
          class="table"
          header-cell-class-name="table-header"
          height="100%"
          style="margin-top:20px"
          fit="true"
          over-flow:auto
        >
          <template>
            <el-table-column
            prop="taskId"
              label="需求任务编号"
              type="index"
              width="110px"
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
              prop="taskCategoryPart"
              label="需求类型"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            > </el-table-column>
           
            <el-table-column
              prop="supplierCheckDesignState"
              label="审核状态"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            > <template slot-scope="scope">
              <span v-if="scope.row.supplierCheckDesignState === 0">待提交</span>
              <span v-else-if="scope.row.supplierCheckDesignState === 1">待审核</span>
              <span v-else-if="scope.row.supplierCheckDesignState === 2">通过</span>
              <span v-else-if="scope.row.supplierCheckDesignState === 3">未通过</span>
            </template>
            </el-table-column>

            <el-table-column
              prop="deadline"
              label="截止时间"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{scope.row.deadline | dataFormat("yyyy-MM-dd hh:mm")}}</template>
            </el-table-column>
          </template>

           <el-table-column label="操作" min-width="110px" align="center">
            <template slot-scope="scope">
              <el-button @click="handleDetail" type="text" size="small">进入工作台</el-button>
                <el-button @click="submitTask(scope.row)" type="text" size="small">任务提交</el-button>
              <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">查看任务详情</el-button>
            
            </template>
          </el-table-column>
        </el-table>
         <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next, sizes, total, jumper"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="Accepted_Task_Data.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-card>
    </el-row>
    
    <el-dialog title="已接任务详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-form ref="form1" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form1.taskName" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="企业名称">
                <el-input v-model="form1.companyName" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            
            <el-col :span="11">
              <el-form-item label="任务类别">
                <el-input v-model="form1.taskCategoryPart" ></el-input>
                
              </el-form-item>
            </el-col>
             <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-bind:value="form1.deadline|formatDate" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
         
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                type="textarea"
                :rows="3"
                v-model="form1.taskDetail"
                style="width:90%;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="拒绝原因">
              <el-input
                type="textarea"
                :rows="3"
                v-model="form1.demandorRefuseReason"
                style="width:90%;"
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
    <!-- <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div> -->
    
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "designerAcceptList",
  data() {
    return {
      username1: localStorage.getItem("ms_username"),
      
        pageIndex: 1,
        pageSize: 7,
      
      pageTotal: 0,
     
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
        {
          taskId:"",
          taskName:"",
          taskCategory:"",
          deadline:"",
        },
        {
          taskId:"",
          taskName:"",
          taskCategory:"",
          deadline:"",
        },
        {
          taskId:"",
          taskName:"",
          taskCategory:"",
          deadline:"",
        },
        {
          taskId:"",
          taskName:"",
          taskCategory:"",
          deadline:"",
        },
        {
          taskId:"",
          taskName:"",
          taskCategory:"",
          deadline:"",
        },
        {
          taskId:"",
          taskName:"",
          taskCategory:"",
          deadline:"",
        },
        {
          taskId:"",
          taskName:"",
          taskCategory:"",
          deadline:"",
        },
      ],
      form1: {},
      dialogVisible: false,
      submit: false
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    this.getTableData();
    
  },
  methods: {
    submitTask(row) {
      if (
        row.supplierCheckDesignState == 0 ||
        row.supplierCheckDesignState == 3
        
      ) {
        this.$confirm("确定要提交任务吗？", "提示", {
          type: "warning"
        }).then(() => {
          console.log(row.taskId);
          var that = this;
          var data = Qs.stringify({
            taskId: row.taskId
          });
          console.log(data);
          that.axios({
            method: "post",
            url: "http://127.0.0.1:8082/designer/updateCheckState",
            data: data
          });
          this.$message({
            message: "提交成功",
            type: "success"
          });
        });
      } else {
        this.$confirm("任务已提交无需再次提交", "提示", {
          type: "warning"
        });
      }
    },

    handleDetail(index, row) {
      this.$router.push("/admin/personnel_allotment/virtualMachine");
    },
    goBack() {
      this.$router.push("/#");
    },
    handlePageChange(val) {},
    
    //获取已接收任务列表数据
    getTableData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        designerName: this.username1
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
          // console.log(response);
          this.Accepted_Task_Data = response.data.allData;
          //this.form1 = response.data.allData[0];
        });
    },
    handleEdit(index, row) {
      this.idx = index;
      this.form1 = row;
      this.dialogVisible = true;
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
 .biaoti {
    font-size: 18px;
    color: #303133;
  }
</style>