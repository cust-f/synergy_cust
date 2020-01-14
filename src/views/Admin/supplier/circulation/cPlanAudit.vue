<template>
  <div class="planAudit">
    <div class="handle-box">
      <el-button
        type="primary"
        icon="el-icon-delete"
        class="handle-del mr10"
        @click="delAllSelection"
      >批量删除</el-button>
      <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      <el-input v-model="query.name" placeholder="任务名称" class="handle-input mr10"></el-input>
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
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="taskName" label="任务名称"></el-table-column>

      <el-table-column prop="bussessType" label="任务类型"></el-table-column>

      <el-table-column prop="publishTask" label="发布任务企业"></el-table-column>

      <el-table-column prop="count" label="数目" align="center"></el-table-column>

      <el-table-column prop="state" label="状态" align="center"></el-table-column>

      <el-table-column label="截止日期">
        <template slot-scope="scope">{{scope.row.date}}</template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button @click="jumpplanDet()" type="text" size="small">查看详情</el-button>
          <el-button @click="dialogTableVisible=true" type="text" size="small">分配人员</el-button>
          <el-button @click="jumpnewTask()" type="text" size="small">分配供应商</el-button>
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
      :data="tableData1"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="bussessType" label="任务类型"></el-table-column>

      <el-table-column prop="publishTask" label="接受任务企业"></el-table-column>

      <el-table-column prop="count" label="数目" align="center"></el-table-column>

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
          <el-button @click="jumpAuditDet()" type="text" size="small">查看详情</el-button>
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

    <!-- 分配流通人员 -->

    <el-dialog title="分配流通负责人" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="from.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-input v-model="from.endtime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
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
  name: "cPlanAudit",
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

      from: {
        name: "小汽车零件的装配",
        endtime: "2019-10-17"
      },
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      tableData: [
        {
          id: 1,
          taskName: "客车汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          count: "50000",

          state: "进行中",
          date: "2019-12-1"
        },
        {
          id: 2,
          taskName: "中型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",
          count: "50000",
          state: "进行中",
          date: "2019-11-14"
        }
      ],
      tableData1: [
        {
          id: 1,
          taskName: "客车汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          count: "50000",

          state: "进行中",
          date: "2019-12-1"
        },
        {
          id: 2,
          taskName: "中型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",
          count: "50000",
          state: "进行中",
          date: "2019-11-14"
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
    // 全部任务详情页面跳转
    jumpplanDet() {
      this.$router.push("/admin/cPlanAuditDet");
    },

    jumpAuditDet() {
      this.$router.push("/admin/cPlanAuditingDet");
    },
    success() {
      this.dialogTableVisible = false;
      this.successful = true;
      this.TableVisible = false;
    },
    jumpnewTask(){
      this.$router.push("/admin/cNewTask");
    }
  }
  /*
   *转跳对应任务信息页面
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
