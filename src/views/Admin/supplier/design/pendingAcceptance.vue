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
      :default-sort="{prop: 'deadline', order: 'descending'}"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" type="index" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="taskId" label="任务ID" width="55" align="center" v-if="YinCang===0"></el-table-column>
      <el-table-column prop="taskName" sortable="custom" label="需求名称"></el-table-column>
      <el-table-column prop="taskCategoryPart" sortable="custom" label="需求类型"></el-table-column>
      <el-table-column prop="companyName" sortable="custom" label="需求方"></el-table-column>

      <!-- <el-table-column prop="designerName" sortable="custom" label="设计师" align="center"></el-table-column> -->

      <el-table-column prop="demandorCheckDesignState" sortable="custom" label="验收状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.demandorCheckDesignState === 0">待提交</el-tag>
          <el-tag type="warning" v-else-if="scope.row.demandorCheckDesignState === 1">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.demandorCheckDesignState === 2">通过</el-tag>
          <el-tag type="danger" v-else-if="scope.row.demandorCheckDesignState === 3">未通过</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="deadline" sortable="custom" label="截止日期">
        <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
      </el-table-column>

      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="Det(scope.row) " type="text" size="small">查看详情</el-button>
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
  name: "pendingAcceptance",
  created() {
    this.getData();
  },
  data() {
    return {
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
      query: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [
        {
          taskId: "",
          taskName: "",
          taskType: "",
          companyName: "",
          designerName: "",
          deadline: "",
          taskCategoryPart: "",
        },
      ],
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      selectname: "",
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      YinCang: 1,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      usernameX: sessionStorage.getItem("ms_username"),
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-mm-dd");
    },
  },
  created() {
    this.getData();
  },
  methods: {
    // 全部需求详情页面跳转
    // jumpAcceptDet() {
    //   this.$router.push("/admin/pendingAcceptanceDet");
    // },
    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        taskName: this.selectname,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/searchByTaskIdInTask",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    Det(row) {
      this.$router.push({
        path: "/admin/designDet",
        query: {
          taskId: row.taskId,
        },
      });
    },

    getData() {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/supplierAcceptingTaskList",
          data: data,

          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },

    sortByDesignerName(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 0,
        sortType: sortType,
        taskState: 4,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortByDesignerName",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
    sortByTaskName(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 0,
        sortType: sortType,
        taskState: 4,
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
    sortByDeadline(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 1,
        sortType: sortType,
        taskState: 4,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortByDeadline",
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
        taskType: 0,
        sortType: sortType,
        taskState: 4,
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
        taskType: 0,
        sortType: sortType,
        taskState: 4,
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
    sortList(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    //通过数组对象的某个属性进行倒序排列
    sortListDesc(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
    },
    sortChange(v) {
      //正序
      if (v.column.order == "ascending") {
        if (v.column.property == "demandorCheckDesignState") {
          this.tableData.sort(this.sortList("demandorCheckDesignState"));
        }
        //通过属性showWeights进行排序
        if (v.column.property == "deadline") {
          this.sortByDeadline(1);
        }
        if (v.column.property == "companyName") {
          this.sortByCompanyName(1);
        }
        if (v.column.property == "taskCategoryPart") {
          this.sortByTaskCategoryPart(1);
        }
        if (v.column.property == "designerName") {
          this.sortByDesignerName(1);
        }
        if (v.column.property == "taskName") {
          this.sortByTaskName(1);
        }
      }
      //倒序
      else if (v.column.order == "descending") {
        if (v.column.property == "demandorCheckDesignState") {
          this.tableData.sort(this.sortListDesc("demandorCheckDesignState"));
        }
        if (v.column.property == "deadline") {
          this.sortByDeadline(2);
        }
        if (v.column.property == "companyName") {
          this.sortByCompanyName(2);
        }
        if (v.column.property == "taskCategoryPart") {
          this.sortByTaskCategoryPart(2);
        }
        if (v.column.property == "designerName") {
          this.sortByDesignerName(2);
        }
        if (v.column.property == "taskName") {
          this.sortByTaskName(2);
        }
      }
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
