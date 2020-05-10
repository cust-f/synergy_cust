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
      :default-sort="{prop: 'deadline', order: 'ascending'}"
    >
      <el-table-column label="序号" type="index" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="taskId" label="任务ID" width="55" align="center" v-if="YinCang===0"></el-table-column>

      <el-table-column prop="taskName" sortable label="需求名称"></el-table-column>

      <el-table-column prop="taskCategoryPart" sortable label="需求类型"></el-table-column>

      <el-table-column prop="companyName" sortable label="发布需求企业"></el-table-column>

      <el-table-column prop="designerName" sortable label="设计师" align="center"></el-table-column>

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
  name: "pendingAudit",
  data() {
    return {
      accept: false, //接受需求弹窗
      disaccept: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          taskId: "",
          taskName: "",
          supplierName: "",
          companyName: "",
          userName: "",
          supplierName: "",
          deadline: "",
          taskCategoryPart: ""
        }
      ],
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      tableData: [],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      selectname: "",
      YinCang: 1,
      form: {},
      idx: -1,
      id: -1,
      usernameX: localStorage.getItem("ms_username")
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
    handleSearch() {
      console.log(this.selectname);
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        taskName: this.selectname
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/searchByTaskIdInTask",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    // 全部需求详情页面跳转
    Det(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/designDet",
        query: {
          taskId: row.taskId
        }
      });
    },

    //获取数据
    getData() {
      console.log(this.usernameX);
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX
      });

      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/supplierAuditingTaskList",
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
