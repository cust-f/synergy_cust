<template>
  <div class="planAudit">
    <div class="handle-box">
      <el-input v-model="query.name" placeholder="需求名称" class="handle-input mr10"></el-input>
      <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="tableData1"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="taskName" label="需求名称"></el-table-column>

      <el-table-column prop="taskType" label="需求类型"></el-table-column>

      <el-table-column prop="companyName" label="发布需求企业"></el-table-column>

      <el-table-column prop="taskCode" label="状态" align="center"></el-table-column>

      <el-table-column prop="deadline" label="截止日期"></el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button @click="Det(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "planAudit",
  data() {
    return {
      successful: false,
      accept: false,
      disaccept: false,
      dialogTableVisible: false,
      TableVisible: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },

      tableData1: [
        {
          taskId: "",
          taskName: "",
          taskType: "",
          companyName: "",
          taskCode: "",
          deadline: ""
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
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData1();
  },
  methods: {
    // 供应商接受的二级计划且未分配的全部任务
    getData1() {
      console.log("123");
      var that = this;
      var data = Qs.stringify({
        userName: "supplier"
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.tableData1 = response.data.allData;
        });
    },

    // 全部需求详情页面跳转

    planAuditDet(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/planAuditDet",
        query: {
          taskId: row.taskId
        }
      });
    },

    Det(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/Det",
        query: {
          taskId: row.taskId
        }
      });
    }
  }
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
.planAudit .table {
  width: 100%;
  font-size: 14px;
  height: 500px;
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
