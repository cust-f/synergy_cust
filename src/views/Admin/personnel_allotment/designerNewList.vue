<template>
  <div class="desingerNew">
    <div
      class="biaoti"
      style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;"
    >&nbsp;&nbsp;&nbsp;&nbsp;新增任务</div>

    <!-- <el-divider></el-divider> -->
    <div>
      <el-row>
        <el-table
          :data="Not_Accepted_Task_Data.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
          border
          class="table"
          header-cell-class-name="table-header"
          height="tableHeight"
          style="margin-top:20px"
          :default-sort="{prop: 'supplierDistributionTime', order: 'descending'}"
        >
          <template>
            <el-table-column
              prop="taskId"
              label="序号"
              type="index"
              width="60px"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="taskName"
              label="需求名称"
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
              prop="supplierDistributionTime"
              label="分配时间"
              sortable
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template
                slot-scope="scope"
              >{{scope.row.supplierDistributionTime| dataFormat("yyyy-MM-dd hh:mm")}}</template>
            </el-table-column>

            <el-table-column
              prop="deadline"
              label="截止时间"
              sortable
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{scope.row.deadline| dataFormat("yyyy-MM-dd hh:mm")}}</template>
            </el-table-column>
          </template>

          <el-table-column label="操作" min-width="90px" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="small">任务详情</el-button>
              <el-button type="text" size="small" @click="beginTask(scope.row)">开始任务</el-button>
              <el-button type="text" size="small" @click="xiazaiZRWFJ(scope.row)">下载附件</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next, total, jumper"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="      Not_Accepted_Task_Data.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-row>
    </div>
    <div class="dialog1">
      <el-dialog :visible.sync="dialogVisible">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务详情</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <div class="dialogCSS">
          <el-form ref="form" :model="form" label-width="110px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称">
                  <el-input v-model="form.taskName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="企业名称">
                  <el-input v-model="form.companyName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="一级行业类别">
                  <el-input v-model="form.taskCategoryMain" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="二级行业类别">
                  <el-input v-model="form.taskCategoryPart" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="开始时间">
                  <el-input
                    v-bind:value="form.beginTime|formatDate"
                    :disabled="true"
                    style="text-align:center"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="截止日期">
                  <el-input
                    v-bind:value="form.deadline|formatDate"
                    :disabled="true"
                    style="text-align:center"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span="22">
                <el-form-item label="任务详情">
                  <el-input
                    :disabled="true"
                    type="textarea"
                    :rows="7"
                    v-model="form.taskDetail"
                    style="width:100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-col :span="22">
              <el-form-item label="拒绝原因">
                <el-input v-model="form1.refuseReason" :disabled="true"></el-input>
              </el-form-item>
            </el-col>-->
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- <el-dialog :visible.sync="dialogVisible" width="60%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务详情</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11" :offset="2">
              <span class = "titles">任务名称:</span>
              <span>{{form.taskName}}</span><br><br>
            </el-col>

            <el-col :span="11">
              <span class = "titles">企业名称:</span>
                <span>{{form.companyName}}</span><br>
            
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="2">
              <span class="titles">任务类别:</span>
                <span >{{form.taskCategoryPart}}</span><br><br>
            </el-col>
            <el-col :span="11">
              <span class="titles">截止日期:</span>
                <span >{{form.deadline |formatDate}}</span><br>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="2">
              <span class="titles">任务详情:</span>
            <span>{{form.taskDetail}}</span>
            </el-col>
            
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>



<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
export default {
  name: "designerNewList",
  data() {
    return {
      username1: sessionStorage.getItem("ms_username"),

      pageIndex: 1,
      pageSize: 7,
      pageTotal: 0,
      tableHeight: window.innerHeight,

      Not_Accepted_Task_Data: [
        // {
        //   taskId: "",
        //   taskName: "",
        //   taskCategory: "",
        //   deadline: ""
        // },
        // {
        //   taskId: "",
        //   taskName: "",
        //   taskCategory: "",
        //   deadline: ""
        // },
        // {
        //   taskId: "",
        //   taskName: "",
        //   taskCategory: "",
        //   deadline: ""
        // },
        // {
        //   taskId: "",
        //   taskName: "",
        //   taskCategory: "",
        //   deadline: ""
        // },
        // {
        //   taskId: "",
        //   taskName: "",
        //   taskCategory: "",
        //   deadline: ""
        // },
        // {
        //   taskId: "",
        //   taskName: "",
        //   taskCategory: "",
        //   deadline: ""
        // },
        // {
        //   taskId: "",
        //   taskName: "",
        //   taskCategory: "",
        //   deadline: ""
        // },
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
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    this.getData();
    //this.getDetailData();
  },
  methods: {
    getData() {
      //console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        designerName: this.username1
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/designer/newlist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
         // console.log(response);
          this.Not_Accepted_Task_Data = response.data.allData;
          this.form = response.data.allData[0];
        });
    },
    beginTask(row) {
      //console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: row.taskId,
        designerName: this.username1
      });
     // console.log(data);
      that
        .axios({
          method: "post",
          url: "api/designer/updateDesignState",
          data: data
        })
        .then(response => {
          this.$message({
            type: "success",
            message: "任务开始成功"
          });
          this.getData();
        });
      this.getData();
      this.$router.go(0);

      //this.$router.push("/admin/designerAcceptList");
    },
    goBack() {
      this.$router.push("/#");
    },
    handlePageChange(val) {},
    //获取新增列表数据

    getDetailData() {
      //console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        taskId: row.taskId
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/designer/newlist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
         // console.log(response);
          this.form = response.data.allData;
        });
    },
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.dialogVisible = true;
    },
    xiazaiZRWFJ(row) {
      //console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskID: row.taskId,
        leixing: "ZIRWHJ"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          //console.log("cap");
          //console.log(response);
          this.download(response.data, "ZRWFJ");
        });
    },

    // 下载文件
    download(data, leixing) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(
        new Blob([data], { type: "application/zip" })
      );
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      if (leixing === "JHS") {
        link.setAttribute("download", "设计文档.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "ZRWFJ") {
        link.setAttribute("download", "子任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },

    //  xiazai(row) {
    //   var that = this;
    //   var data = Qs.stringify({
    //     taskId: row.taskId
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "http://127.0.0.1:8081/designer/downloadFile",
    //       data: data
    //     })
    //     .then(response => {
    //       console.log("cap");
    //       console.log(response.data);
    //       this.download(response.data, "tf");
    //     });
    // },
    // // 下载文件
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
<style lang="scss">
.desingerNew {
  .table {
    width: 100%;
    font-size: 14px;
    height: 750px;
  }
  .el-scrollbar__wrap {
    overflow-y: hidden;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .titles {
    font-size: 15px;
    font-weight: 400;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
  .dialogCSS .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #303133;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #ffffff;
    border-color: #e4e7ed;
    color: #303133;
    cursor: not-allowed;
  }
  .dialog1 {
    width: 50%;
  }
  .el-dialog__body {
    padding-top: 30px;
    padding-right: 0px !important;
    padding-bottom: 30px;
    padding-left: 20px;
    /* color: #606266; */
    font-size: 14px;
    word-break: break-all;
  }
}
</style>