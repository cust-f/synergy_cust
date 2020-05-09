<template>
  <div>
    <div class="desinger">
      <div  class = "biaoti" style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;">&nbsp;&nbsp;&nbsp;&nbsp;历史任务</div>
    </div>
    
    <!-- <el-divider></el-divider> -->
    <el-row >
      
        
        <el-table
          :data="Finished_Task_Data.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
          border
          class="table"
          header-cell-class-name="table-header"
          height="100%"
          style="margin-top:20px"
           :default-sort = "{prop: 'demandorCheckDesignTime', order: 'descending'}"
        >
          <template>
            <el-table-column
              prop="taskId"
              label="编号"
              
              type="index"
              width="110px"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="taskName"
              label="需求任务名称"
              sortable
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="taskCategoryPart"
              label="需求类型"
              sortable
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="demandorCheckDesignTime"
              label="完成时间"
              sortable
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{scope.row.demandorCheckDesignTime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="deadline"
              label="截止时间"
              sortable
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
            </el-table-column>
          </template>

          <el-table-column label="操作" min-width="90px" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDetail">查看图纸</el-button>
              <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">任务详情</el-button>
            </template>
          </el-table-column>
        </el-table>
         <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next, total, jumper"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="Finished_Task_Data.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      
    </el-row>

    <el-dialog :visible.sync="dialogVisible" width="60%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务详情</div>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <div class="dialogCSS">
        <el-form ref="form2" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="form2.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="企业名称">
                <el-input v-model="form2.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="一级行业类别">
                <el-input v-model="form2.taskCategoryMain" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="二级行业类别">
                <el-input v-model="form2.taskCategoryPart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="开始时间">
                <el-input
                  v-bind:value="form2.beginTime|formatDate"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input
                  v-bind:value="form2.deadline|formatDate"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="22"> <el-form-item label="任务详情">
              <el-input
                :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form2.taskDetail"
                style="width:100%;"
              ></el-input>
            </el-form-item></el-col>>

           
            
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
     <!-- <el-dialog :visible.sync="dialogVisible" width="60%">
       <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务详情</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <div>
        <el-form ref="form2" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11" :offset="2">
              <span class = "titles">任务名称:</span>
              <span>{{form2.taskName}}</span><br><br>
            </el-col>

            <el-col :span="11">
              <span class = "titles">企业名称:</span>
                <span>{{form2.companyName}}</span><br>
            
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="2">
              <span class="titles">任务类别:</span>
                <span >{{form2.taskCategoryPart}}</span><br><br>
            </el-col>
            <el-col :span="11">
              <span class="titles">截止日期:</span>
                <span >{{form2.deadline |formatDate}}</span><br>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="2">
              <span class="titles">任务详情:</span>
            <span>{{form2.taskDetail}}</span>
            </el-col>
            
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>



<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
export default {
      name: "designerFinishList",
  data() {
    return {
      username1:  localStorage.getItem("ms_username"),
      
      
        pageIndex: 1,
        pageSize: 7,
      
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
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },
        {
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },
        {
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },
        {
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },
        {
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },
        {
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },
        {
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: ""
        },

      ],
      form2: {},
      dialogVisible: false,
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
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
        designerName: this.username1
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/designer/historylist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          // console.log(response);
          this.Finished_Task_Data = response.data.allData;
          //this.form2 = response.data.allData[0];
        });
    },
    handleEdit(index, row) {
      this.idx = index;
      this.form2 = row;
      this.dialogVisible = true;
    },
     handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    
   
  }
};
</script>
<style>
/* .el-divider {
  margin: 25px 0px !important;
} */
.dialogCSS .el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  color: #303133;
  
}
.dialogCSS.el-textarea.is-disabled .el-textarea__inner {
    background-color: #ffffff;
    border-color: #E4E7ED;
    color: #303133;
    cursor: not-allowed;
}
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
  

.el-dialog__header {
    padding: 0px 0px 0px;
}
</style>