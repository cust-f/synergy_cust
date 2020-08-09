<template>
  <div>
    <div class="desinger">
      <div
        class="biaoti"
        style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;"
      >&nbsp;&nbsp;&nbsp;&nbsp;新增任务</div>
    </div>
    <br />
    <!-- <el-divider></el-divider> -->
    <el-row style="height:600px;">
      <el-card style="height:100%">
        <el-table
          :data="Not_Accepted_Task_Data.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
          border
          class="table"
          header-cell-class-name="table-header"
          height="100%"
          style="margin-top:20px"
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
            ></el-table-column>
            <el-table-column
              prop="deadline"
              label="截止时间"
              min-width="90px"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{scope.row.deadline| dataFormat("yyyy-MM-dd hh:mm")}}</template>
            </el-table-column>
          </template>

          <el-table-column label="操作" min-width="90px" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)"  size="small">任务详情</el-button>
              <el-button type="text" size="small" @click="beginTask(scope.row)">开始任务</el-button>
              <el-button type="text" size="small" @click="xiazai(scope.row)">下载附件</el-button>

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
      </el-card>
    </el-row>

    <el-dialog title="新增任务详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form.taskName" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="企业名称">
                <el-input v-model="form.companyName" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form.taskCategoryPart" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-bind:value="form.deadline | formatDate"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                
                type="textarea"
                :rows="7"
                v-model="form.taskDetail"
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
  </div>
</template>



<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
export default {
  name: "circulationNewList",
  data() {
    return {
      username1: sessionStorage.getItem("ms_username"),

      pageIndex: 1,
      pageSize: 7,
      pageTotal: 0,

      Not_Accepted_Task_Data: [
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
    this.getDetailData();
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
        url: "http://127.0.0.1:8081/designer/updateDesignState",
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
        userName: this.username1
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081//circulater/circulateNewList",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.Not_Accepted_Task_Data = response.data.allData;
          this.form = response.data.allData[0];
        })
    },
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
          url: "http://127.0.0.1:8081/designer/newlist",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.form = response.data.allData;
        })
    },
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
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
    download(data, leixing) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      if (leixing === "tf") {
        link.setAttribute("download", "技术文档.docx");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.docx");
      }
      document.body.appendChild(link);
      link.click();
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