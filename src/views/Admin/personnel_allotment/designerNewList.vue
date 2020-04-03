<template>
  <div>
    <div class="desinger">
      <div  class = "biaoti" style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;">&nbsp;&nbsp;&nbsp;&nbsp;新增任务</div>
    </div>
    <br>    <!-- <el-divider></el-divider> -->
    <el-row style="height:600px;">
      <el-card style="height:100%">
        
        <el-table
          :data="Not_Accepted_Task_Data"
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
            <template slot-scope="scope">
              <el-button @click="dialogVisible = true" type="text" size="small">查看任务详情</el-button>
              <el-button type="text" size="small" @click="beginTask(scope.row)">开始任务</el-button>
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
    
    <el-dialog title="新增任务详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form.taskId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form.taskCategory" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input  v-bind:value="form.deadline | formatDate"></el-input>
                
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form.taskDetail"
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
      name: "designerNewList",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
   
      Not_Accepted_Task_Data: [
        {
          taskId:"",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },
        
      ],
      
      form: {},
      form1: {},
      form2: {},
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
    this.getData();
 
  },
  methods: {
    beginTask(row) {
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: row.taskId
      });
      console.log(data);
      that.axios({
        method: "post",
        url: "http://127.0.0.1:8082/designer/updateDesignState",
        data: data
      });
      this.$message({
        message: "任务开始成功",
        type: "success"
      });
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
        designerName: ""
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
          this.form = response.data.allData[0];
        });
    }
  }
    }
  

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