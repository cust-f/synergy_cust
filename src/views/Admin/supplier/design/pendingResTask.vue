<template>
  <div>
    <div class="handle-box">
      <el-input v-model="selectname" placeholder="需求名称" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
      :default-sort="{prop: 'beginTime', order: 'ascending'}"
    >
      <el-table-column label="序号" type="index" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="taskId" label="任务ID" width="55" align="center" v-if="YinCang===0"></el-table-column>

      <el-table-column prop="taskName" sortable label="需求名称"></el-table-column>

      <el-table-column prop="taskType" sortable label="需求类型">
        <template slot-scope="scope">
          <span v-if="scope.row.taskType === 1">类型1</span>
          <span v-else-if="scope.row.taskType === 2">类型2</span>
        </template>
      </el-table-column>

      <el-table-column prop="publishingCompanyName" sortable label="发布需求企业"></el-table-column>

      <el-table-column prop="beginTime" sortable label="发布日期" align="center">
        <template slot-scope="scope">{{scope.row.beginTime | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="deadline" sortable label="截止日期">
        <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button @click="Det(scope.row) " type="text" size="small">查看详情</el-button>
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
  </div>
</template>



<script>
import Qs from "qs";
import { formatDate } from "../../maintask/dataChange";
export default {
  name: "pendingResTask",
  created() {
    this.getData();
  },

  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },

      tableData: [
        {
          taskId: "",
          taskName: "",
          taskType: "",
          companyName: "",
          beginTime: "",
          deadline: ""
        }
      ],
      //接受表单数据
      formLabelWidth: "120px",
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      selectname: "",
      YinCang: 1,
      userName: ""
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: "supplier"
      });

      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/supplierPendingResTaskList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },

    //详情跳转
    Det(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/Det",
        query: {
          taskId: row.taskId
        }
      });
    },
    handleSearch() {
      console.log(this.selectname);
      var that = this;
      var data = Qs.stringify({
        username: "supplier",
        taskName: this.selectname
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/searchByTaskIdInTaskApply",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    success() {
      this.planbook = false;
      this.acceptf = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
  /*
   *转跳对应需求信息页面
   */
};
</script>

<style scoped>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 260px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.box {
  font-size: 24px;
}
</style>
