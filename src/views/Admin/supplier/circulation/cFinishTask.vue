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
      :default-sort="{prop: 'beginTime', order: 'descending'}"
    >
      <el-table-column label="序号" type="index" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="taskId" label="任务ID" width="55" align="center" v-if="YinCang===0"></el-table-column>

      <el-table-column prop="taskName" sortable label="需求名称"></el-table-column>

      <el-table-column prop="taskCategoryPart" sortable label="需求类型"></el-table-column>

      <el-table-column prop="companyName" sortable label="需求企业"></el-table-column>

      <el-table-column prop="finishTime" sortable label="完成日期">
        <template slot-scope="scope">{{scope.row.finishTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="Det(scope.row)" type="text" size="small">查看详情</el-button>
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
  name: "finishTask",
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
          userId: "",
          supplierName: "",
          deadline: "",
          taskCategoryPart: ""
        }
      ],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      selectname: "",
      form: {},
      YinCang: 1,
      idx: -1,
      id: -1,
      username: localStorage.getItem("ms_username"),
      taskId: 0
    };
  },
  created() {
    this.getData();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },
  methods: {
    handleSearch() {
      console.log(this.selectname);
      var that = this;
      var data = Qs.stringify({
        userName: this.username,
        taskName: this.selectname
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/searchByConTaskIdInTask",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    getData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: this.username
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/supplierConedTaskList",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },

    // jumprepealedTask() {
    //   this.$router.push("/admin/finishTaskDet");
    // },
    Det(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/circulationDet",
        query: {
          taskId: row.taskId
        }
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
