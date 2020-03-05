<template>
  <div class="planAudit">
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

      <el-table-column prop="acceptCompanyName" label="需求名称"></el-table-column>

      <el-table-column prop="supplierName" label="需求类型"></el-table-column>

      <el-table-column prop="companyName" label="发布需求企业"></el-table-column>

      <el-table-column prop="assignmentState" label="状态" align="center"></el-table-column>

      <el-table-column prop="deadline" label="截止日期"></el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button @click="planAuditDet()" type="text" size="small">查看详情</el-button>
          <el-button @click="dialogTableVisible=true" type="text" size="small">分配人员</el-button>
          <el-button @click="TableVisible=true" type="text" size="small">分配供应商</el-button>
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

    <br />
    <br />
    <h2>计划书审核菜单</h2>
    <el-divider></el-divider>
    <el-table
      :data="tableData2"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="taskName" label="需求名称"></el-table-column>
      <el-table-column prop="bussessType" label="需求类型"></el-table-column>

      <el-table-column prop="publishTask" label="接受需求企业"></el-table-column>

      <el-table-column prop="taskLeader" label="负责人" align="center"></el-table-column>

      <el-table-column label="截止日期">
        <template slot-scope="scope">{{scope.row.date}}</template>
      </el-table-column>

      <el-table-column label="计划书" align="center">
        <el-button type="text" size="small">下载</el-button>
      </el-table-column>
      <el-table-column label="审核" align="center" width="110">
        <el-button type="success" size="mini" plain @click="accept = true">审核通过</el-button>
        <br />
        <el-button type="danger" size="mini" plain @click="disaccept = true">审核不通过</el-button>
      </el-table-column>

      <el-table-column label="操作" width="160" align="center">
        <template>
          <el-button @click="planAuditingDet()" type="text" size="small">查看详情</el-button>
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

    <el-dialog title="分配供应商" :visible.sync="TableVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="需求名称" :label-width="formLabelWidth">
          <el-input v-model="from.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-input v-model="from.endtime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择分配供应商">
            <el-option label="杭机集团长春一机有限公司" value="wangxiaohu"></el-option>
            <el-option label="杭机集团长春一机有限公司" value="lili"></el-option>
            <el-option label="杭机集团长春一机有限公司" value="majie"></el-option>
            <el-option label="杭机集团长春一机有限公司" value="qinqin"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TableVisible = false">取 消</el-button>
        <el-button type="primary" @click="success()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配设计人员 -->

    <el-dialog title="分配设计人员" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="需求名称" :label-width="formLabelWidth">
          <el-input v-model="from.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-input v-model="from.endtime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设计人员" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择分配人员">
            <el-option label="王虎" value="wangxiaohu"></el-option>
            <el-option label="李丽" value="lili"></el-option>
            <el-option label="马杰" value="majie"></el-option>
            <el-option label="秦琴" value="qinqin"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="success()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="successful" width="15%" :before-close="handleClose">
      <span>分配成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successful=false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="accept" width="15%" :before-close="handleClose">
      <span>审核通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="accept=false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="disaccept" width="15%" :before-close="handleClose">
      <span>审核不通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="disaccept=false">确 定</el-button>
      </span>
    </el-dialog>
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

      tableData:[
        {
          taskId: 1,
          acceptCompanyName: "小型汽车前车灯",
          supplierName: "车间零部件生产",
          companyName: "一汽大众",
          assignmentState: "已废除",
          deadline: "2019-12-23"
        },
        {
          taskId: 1,
          acceptCompanyName: "小型汽车前车灯",
          supplierName: "车间零部件生产",
          companyName: "一汽大众",
          assignmentState: "已废除",
          deadline: "2019-12-23"
        }
      ],
      from: {
        name: "小汽车零件的装配",
        endtime: "2019-10-17"
      },
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
    this.getData();
    this.getData2();
  },
  methods: {
    // 供应商接受的二级计划且未分配的全部任务
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
          url: "http://127.0.0.1:8082/supplier/supplierPlanAuditlist",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },
    //分配给二级供应商且任务计划书未通过的全部任务
    getData2() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: "1"
      });

      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/supplierPlanAuditOtherList",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData2 = response.data.allData;
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

    jumpAuditDet() {
      this.$router.push("/admin/planAuditingDet");
    },

    planAuditingDet(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/planAuditingDet",
        query: {
          taskId: row.taskId
        }
      });
    },
    success() {
      this.dialogTableVisible = false;
      this.successful = true;
      this.TableVisible = false;
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
