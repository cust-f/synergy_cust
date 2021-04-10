<template>
  <div>
    <div class="handle-box">
      <el-input v-model="selectname" placeholder="需求名称" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      :default-sort="{prop: 'applyTime', order: 'descending'}"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" type="index" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="taskId" label="任务ID" width="55" align="center" v-if="YinCang===0"></el-table-column>

      <el-table-column prop="taskName" sortable="custom"  label="需求名称"></el-table-column>

      <el-table-column prop="taskCategoryPart" sortable="custom"  label="需求类型"></el-table-column>

      <el-table-column prop="companyName" sortable="custom"  label="需求企业"></el-table-column>

      <el-table-column prop="finishTime" sortable="custom"  label="完成日期">
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
        layout="prev, pager, next, sizes, total, jumper"
        :current-page="pageIndex1"
        :page-size="pageSize"
        :total="tableData.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
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
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
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
          taskCategoryPart: "",
        },
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
      username: sessionStorage.getItem("ms_username"),
      taskId: 0,
    };
  },
  created() {
    this.getData();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  methods: {
    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        username: this.username,
        taskName: this.selectname,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/searchByConTaskIdInTask",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    getData() {
      var that = this;
      var data = Qs.stringify({
        userName: this.username,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/supplierConedTaskList",
          data: data,

          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },

    sortByTaskName(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 1,
        sortType: sortType,
        taskState: 5,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortByTaskName",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
    sortByFinishTime(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 1,
        sortType: sortType,
        taskState: 5,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortByFinishTime",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
    sortByCompanyName(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 1,
        sortType: sortType,
        taskState: 5,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortByCompanyName",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
    sortByTaskCategoryPart(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 1,
        sortType: sortType,
        taskState: 5,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortByTaskCategoryPart",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
    sortChange(v) {
      //正序
      if (v.column.order == "ascending") {
        //通过属性showWeights进行排序
        if (v.column.property == "finishTime") {
          this.sortByFinishTime(1);
        }
        if (v.column.property == "companyName") {
          this.sortByCompanyName(1);
        }
        if (v.column.property == "taskCategoryPart") {
          this.sortByTaskCategoryPart(1);
        }
        if (v.column.property == "taskName") {
          this.sortByTaskName(1);
        }
      }
      //倒序
      else if (v.column.order == "descending") {
        if (v.column.property == "finishTime") {
          this.sortByFinishTime(2);
        }
        if (v.column.property == "companyName") {
          this.sortByCompanyName(2);
        }
        if (v.column.property == "taskCategoryPart") {
          this.sortByTaskCategoryPart(2);
        }
        if (v.column.property == "taskName") {
          this.sortByTaskName(2);
        }
      }
    },

    // jumprepealedTask() {
    //   this.$router.push("/admin/finishTaskDet");
    // },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },

    //详情页面跳转方法
    Det(row) {
      this.$router.push({
        path: "/admin/circulationDet",
        query: {
          taskId: row.taskId,
        },
      });
    },
  },
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
