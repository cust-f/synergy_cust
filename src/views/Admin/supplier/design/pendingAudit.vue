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

      <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="taskName" label="需求名称"></el-table-column>

      <el-table-column prop="bussessType" label="需求类型"></el-table-column>

      <el-table-column prop="publishTask" label="发布需求企业"></el-table-column>

      <el-table-column prop="taskLeader" label="需求负责人" align="center"></el-table-column>

      <el-table-column prop="state" label="承接供应商" align="center"></el-table-column>

      <el-table-column label="截止日期">
        <template slot-scope="scope">{{scope.row.date}}</template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="110">
        <el-button type="success" size="mini" plain @click="accept=true">审核通过</el-button>
        <br />
        <el-button type="danger" size="mini" plain @click="disaccept=true">审核不通过</el-button>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button @click="jumpAuditDet() " type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">查看成果</el-button>
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
  name: "pendingAudit",
  data() {
    
    return {
      accept: false, //接受需求弹窗
  disaccept: false, 
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      tableData: [
        {
          id: 1,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",

          state: "新增",
          date: "2019-11-17"
        },
        {
          id: 2,
          taskName: "磨床生产",
          bussessType: "平面磨床制作",
          publishTask: "杭机集团长春一机有限公司",
          taskLeader: "刘柳",

          state: "待审核",
          date: "2019-12-17"
        },
        {
          id: 3,
          taskName: "通信技术设计",
          bussessType: "通信技术",
          publishTask: "哈尔滨海邻科信息技术有限公司",
          taskLeader: "周舟",

          state: "已完成",
          date: "2019-9-22"
        },
        {
          id: 4,
          taskName: "发电智能制造",
          bussessType: "发电装备",
          publishTask: "哈尔滨电机厂有限责任公司",
          taskLeader: "孙铭",

          state: "进行中",
          date: "2019-11-13"
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
    // 全部需求详情页面跳转
    jumpAuditDet() {
      this.$router.push("/admin/pendingAuditDet");
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
