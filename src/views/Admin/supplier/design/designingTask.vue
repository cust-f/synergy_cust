<template>
  <div>
    <div class="handle-box">
      <el-input v-model="query.name" placeholder="需求名称" class="handle-input mr10"></el-input>
      <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="taskName" label="需求名称"></el-table-column>

     <el-table-column prop="taskType" label="需求类型">
        <template slot-scope="scope">
          <span v-if="scope.row.taskType === 0">类型0</span>
          <span v-else-if="scope.row.taskType === 1">类型1</span>
        </template>
      </el-table-column>

      <el-table-column prop="companyName" label="发布需求企业"></el-table-column>

      <el-table-column prop="designerName" label="设计师" align="center"></el-table-column>

      <el-table-column prop="designCount" label="退回次数" align="center"></el-table-column>

      <el-table-column prop="deadline" label="截止日期">
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
  name: "designingTask",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      tableData: [
        {
          taskId: "",
          taskName: "",
          taskType: "",
          companyName: "",
          designerName: "",
          designCount: "",
          deadline: ""
        }
      ],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
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
    // 详情页面跳转
    // jumpdesigningDet() {
    //   this.$router.push("/admin/designingTaskDet");
    // },

    Det(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/Det",
        query: {
          taskId: row.taskId
        }
      });
    },
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
          url: "http://127.0.0.1:8082/supplier/supplierDesigningTaskList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
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
