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
     
      <el-table-column prop="supplierName" label="需求类型"></el-table-column>

      <el-table-column prop="publishTask" label="发布需求企业"></el-table-column>

      <el-table-column prop="userName" label="设计师" align="center"></el-table-column>

      <el-table-column prop="supplierName" label="承接供应商" align="center"></el-table-column>

      <el-table-column prop="taskCheck" label="退回" align="center"></el-table-column>

       <el-table-column prop="deadline" label="截止日期">
      </el-table-column>
      
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button @click="designingTaskDet(scope.row) " type="text" size="small">查看详情</el-button>
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
        taskId:"",
        taskName:"",
        supplierName:"",
        publishTask:"",
        userName:"",
        supplierName:"",
        taskCheck:"",
        deadline:"",
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
  created() {
    this.getData();
  },
  methods: {
    // 详情页面跳转
    // jumpdesigningDet() {
    //   this.$router.push("/admin/designingTaskDet");
    // },

    designingTaskDet(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/designingTaskDet",
        query: {
          taskId: row.taskId
        }
      });
    },
    getData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: "1"
      });

      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/supplierDesigningtasklist",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },

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
