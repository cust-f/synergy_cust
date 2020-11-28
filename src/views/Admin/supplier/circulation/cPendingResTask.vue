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
      :default-sort="{prop: 'applyTime', order: 'ascending'}"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" type="index" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="taskId" label="任务ID" width="55" align="center" v-if="YinCang===0"></el-table-column>

      <el-table-column prop="taskName" sortable="custom" label="需求名称"></el-table-column>

      <el-table-column prop="applyWay" width="100" label="承接方式">
        <template slot-scope="scope">
          <span v-if="scope.row.applyWay === 0">邀请</span>
          <span v-else-if="scope.row.applyWay === 1">申请</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="checkApplyState"
        sortable="custom"
        width="120"
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.checkApplyState === 0">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.checkApplyState === 1">通过</el-tag>
          <el-tag type="danger" v-else>拒绝</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="publishingCompanyName" sortable="custom" label="需求方"></el-table-column>

      <el-table-column prop="applyTime" sortable="custom" label="发布日期" align="center">
        <template slot-scope="scope">{{scope.row.applyTime | formatDate}}</template>
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
  name: "pendingResTask",
  created() {
    this.getData();
  },

  data() {
    return {
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,

      tableData: [
        {
          taskId: "",
          taskName: "",
          taskType: "",
          companyName: "",
          applyTime: "",
          deadline: "",
          taskCategoryPart: "",
        },
      ],
      //接受表单数据
      formLabelWidth: "120px",
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      selectname: "",
      YinCang: 1,
      username: sessionStorage.getItem("ms_username"),
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      var data = Qs.stringify({
        userName: this.username,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/supplierPendingResConTaskList",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },

    //详情跳转
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
    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        userName: this.username,
        taskName: this.selectname,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/searchByConTaskIdInTaskApply",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    sortByApplyTime(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 1,
        sortType: sortType,
        taskState: 0,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortTaskApplyByApplyTime",
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
        taskType: 1,
        sortType: sortType,
        taskState: 0,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortTaskApplyByTaskName",
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
        taskState: 0,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortTaskApplyByDeadline",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
    sortByPublishingCompanyName(sortType) {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
        taskType: 1,
        sortType: sortType,
        taskState: 0,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortTaskApplyByPublishingCompanyName",
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
        taskState: 0,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/sortTaskApplyByTaskCategoryPart",
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
        if (v.column.property == "checkApplyState") {
          this.tableData.sort(this.sortList("checkApplyState"));
        }
        if (v.column.property == "applyway") {
          this.tableData.sort(this.sortList("applyway"));
        }
        if (v.column.property == "applyTime") {
          this.sortByApplyTime(1);
        }
        if (v.column.property == "deadline") {
          this.sortByDeadline(1);
        }
        if (v.column.property == "taskName") {
          this.sortByTaskName(1);
        }
        if (v.column.property == "publishingCompanyName") {
          this.sortByPublishingCompanyName(1);
        }
        if (v.column.property == "taskCategoryPart") {
          this.sortByTaskCategoryPart(1);
        }
      }
      //倒序
      else if (v.column.order == "descending") {
        if (v.column.property == "checkApplyState") {
          this.tableData.sort(this.sortListDesc("checkApplyState"));
        }
        if (v.column.property == "applyway") {
          this.tableData.sort(this.sortListDesc("applyway"));
        }
        if (v.column.property == "applyTime") {
          this.sortByApplyTime(2);
        }
        if (v.column.property == "taskName") {
          this.sortByTaskName(2);
        }
        if (v.column.property == "publishingCompanyName") {
          this.sortByPublishingCompanyName(2);
        }
        if (v.column.property == "taskCategoryPart") {
          this.sortByTaskCategoryPart(2);
        }
      }
    },
    //通过数组对象的某个属性进行正序排序
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
    success() {
      this.planbook = false;
      this.acceptf = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
