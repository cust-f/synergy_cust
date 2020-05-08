<template>
  <div>
    <div class="desinger">
      <div
        class="biaoti"
        style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;"
      >&nbsp;&nbsp;&nbsp;&nbsp;已接任务</div>
    </div>

    <!-- <el-divider></el-divider> -->
    <el-row>
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
        :default-sort="{prop: 'designerAcceptTime', order: 'descending'}"
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
            prop="supplierCheckDesignState"
            label="审核状态"
            sortable
            min-width="90px"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.supplierCheckDesignState === 0"><el-tag>待提交</el-tag></span>
              <span v-else-if="scope.row.supplierCheckDesignState === 1"><el-tag>待审核</el-tag></span>
              <span v-else-if="scope.row.supplierCheckDesignState === 2"><el-tag type="success">通过</el-tag></span>
              <span v-else-if="scope.row.supplierCheckDesignState === 3"><el-tag type="danger">未通过</el-tag></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="taskCategoryPart"
            label="需求类型"
            sortable
            min-width="90px"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>

          
          <el-table-column
            prop="designerAcceptTime"
            label="接收时间"
            sortable
            min-width="90px"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template
              slot-scope="scope"
            >{{scope.row.designerAcceptTime | dataFormat("yyyy-MM-dd hh:mm")}}</template>
          </el-table-column>

          <el-table-column
            prop="deadline"
            sortable
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
            <el-button @click="handleDetail(scope.row)" type="text" size="small">进入工作台</el-button>
            <el-button
              @click="submitTask(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.supplierCheckDesignState===0 || scope.row.supplierCheckDesignState===1 ||scope.row.supplierCheckDesignState===3"
            >任务提交</el-button>
            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">任务详情</el-button>
            <el-button @click="xiazaiMAINmoban(scope.row)" type="text" size="small">下载附件</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next,total, jumper"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="Accepted_Task_Data.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" width="60%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务详情</div>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <div class="dialogCSS">
        <el-form ref="form1" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="form1.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="企业名称">
                <el-input v-model="form1.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="一级行业类别">
                <el-input v-model="form1.taskCategoryMain" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="二级行业类别">
                <el-input v-model="form1.taskCategoryPart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="开始时间">
                <el-input
                  v-bind:value="form1.beginTime|formatDate"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input
                  v-bind:value="form1.deadline|formatDate"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="拒绝原因">
                <el-input v-model="form1.refuseReason" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

            <el-row>
            
            <el-col :span="22">
               <el-form-item label="任务详情">
              <el-input
                 v-model="form1.taskDetail"
                type="textarea"
                :rows="7"
                :disabled="true"
               
                
              ></el-input>
            </el-form-item>
            </el-col>
              
            
            
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
    </div>-->
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
      pageSize: 5,

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
          taskId: "",
          taskName: "",
          taskCategory: "",
          deadline: "",
          taskType: ""
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
        }
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
            url: "http://127.0.0.1:8081/designer/updateCheckState",
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
    handleDetail(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/personnel_allotment/virtualMachine",
        query: {
          taskId: row.taskId
        }
      });
    },

    goBack() {
      this.$router.push("/#");
    },
    handlePageChange(val) {},
    xiazaiMAINmoban(row) {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskID: row.taskId,
        leixing: "ZRWFJ"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          console.log("cap");
          console.log(response);
          response.data = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/octet-stream" })
          );
          this.download(response.data, "ZFJ");
        });
    },

    download(data, leixing) {
      console.log("调用");
      if (!data) {
        return;
      }
      //let url = window.URL.createObjectURL(new Blob([data], {type: 'application/octet-stream'} ) ) ;
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = data;
      if (leixing === "JHS") {
        link.setAttribute("download", "设计文档.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "ZFJ") {
        link.setAttribute("download", "任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },

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
          url: "http://127.0.0.1:8081/designer/acceptlist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          // console.log(response);
          this.Accepted_Task_Data = response.data.allData;
          if (this.Accepted_Task_Data.taskType === 0) {
            this.Accepted_Task_Data.taskType = "设计任务";
          } else {
            this.Accepted_Task_Data.taskType = "流通任务";
          }
          //this.form1 = response.data.allData[0];
        });
    },
    handleEdit(index, row) {
      this.idx = index;
      this.form1 = row;
      this.dialogVisible = true;
    },
    xiazai(row) {
      var that = this;
      var data = Qs.stringify({
        taskId: row.taskId
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/designer/downloadFile",
          data: data
        })
        .then(response => {
          console.log("cap");
          console.log(response.data);
          this.download(response.data, "tf");
        });
    },
    // 下载文件
    // download(data, leixing) {
    //   if (!data) {
    //     return;
    //   }
    //   let url = window.URL.createObjectURL(new Blob([data]));
    //   let link = document.createElement("a");
    //   link.style.display = "none";
    //   link.href = url;
    //   if (leixing === "tf") {
    //     link.setAttribute("download", "技术文档.docx");
    //   } else if (leixing === "HT") {
    //     link.setAttribute("download", "合同.docx");
    //   }
    //   document.body.appendChild(link);
    //   link.click();
    // },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    }
  }
};
</script>
<style>
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
.el-dialog__header {
  padding: 0px 0px 0px;
}
</style>