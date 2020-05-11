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

      <el-table-column prop="taskState" align="center" sortable label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.taskState === 0">待响应</el-tag>
          <el-tag class="jinxingzhong" v-else-if="scope.row.taskState === 1">计划审核</el-tag>
          <el-tag class="jinxingzhong" v-else-if="scope.row.taskState === 2">进行中</el-tag>
          <el-tag class="shenhe" v-else-if="scope.row.taskState === 3">审核</el-tag>
          <el-tag class="yanshou" v-else-if="scope.row.taskState === 4">验收</el-tag>
          <el-tag type="success" v-else-if="scope.row.taskState === 5">完成</el-tag>
          <el-tag type="danger" v-else-if="scope.row.taskState === 6">已废除</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="publishingCompanyName" sortable label="需求方"></el-table-column>
      <el-table-column prop="beginTime" sortable label="发布日期">
        <template slot-scope="scope">{{scope.row.beginTime | formatDate}}</template>
      </el-table-column>

      <el-table-column prop="taskCategoryPart" sortable label="行业类别"></el-table-column>

      <el-table-column label="操作" width="180" align="center">
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
  name: "allTask",
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
          companyName: "",
          publishingCompanyName: "",
          taskState: "",
          taskType: "",
          deadline: "",
          beginTime: "",
          taskCategoryPart: ""
        }
      ],
      multipleSelection: [],
      editVisible: false,
      YinCang: 1,
      addVisible: false,
      selectname: "",
      pageTotal: 0,
      form: {},
      idx: -1,
      username: localStorage.getItem("ms_username"),
      id: -1
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },
  //获取表格序号
  getIndex($index) {
    //表格序号
    return (this.page.currentPage - 1) * this.page.pageSize + $index + 1;
  },
  created() {
    this.getData();
    this.GetTime(date);
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
          url: "/api/supplierCon/searchByConTaskIdInTaskApply",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    GetTime(date) {
      var datee = new Date(date).toJSON();
      return new Date(+new Date(datee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    //读取数据的方法
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
          url: "/api/supplierCon/supplierConTaskList",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },

    //详情页面跳转方法
    Det(row) {
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
.jinxingzhong {
  color: #616130;
  background-color: #d6d6ad;
  border-color: #d6d6ad;
}
.shenhe {
  color: #ff8040;
  background-color: #ffe6d9;
  border-color: #ffdcb9;
}
.yanshou {
  color: #e066ff;
  background-color: #ffe1ff;
  border-color: #fff0f5;
}
</style>
