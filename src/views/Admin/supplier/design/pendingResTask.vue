<template>
  <div>
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

      <el-table-column prop="taskLeader" label="任务负责人" align="center"></el-table-column>

      <el-table-column label="截止日期">
        <template slot-scope="scope">{{scope.row.date}}</template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button @click="jumpResDet() " type="text" size="small">查看详情</el-button>

          <el-button @click="acceptf=true" type="text" size="small">接受</el-button>

          <el-button @click="disacceptf=true" type="text" size="small">不接受</el-button>
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

    <el-dialog title="提示" :visible.sync="acceptf" width="30%" :before-close="handleClose">
      <span>接受成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="acceptf=false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="disacceptf" width="30%" :before-close="handleClose">
      <span>拒绝成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="disacceptf=false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>



<script>
export default {
  name: "pendingResTask", 

  data() {
    return {
        acceptf: false, //接受任务弹窗
  disacceptf: false, 
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
          date: "2019-11-17"
        },
        {
          id: 2,
          taskName: "磨床生产",
          bussessType: "平面磨床制作",
          publishTask: "杭机集团长春一机有限公司",
          taskLeader: "刘柳",

          date: "2019-12-17"
        },
        {
          id: 3,
          taskName: "通信技术设计",
          bussessType: "通信技术",
          publishTask: "哈尔滨海邻科信息技术有限公司",
          taskLeader: "周舟",
          date: "2019-9-22"
        },
        {
          id: 4,
          taskName: "发电智能制造",
          bussessType: "发电装备",
          publishTask: "哈尔滨电机厂有限责任公司",
          taskLeader: "孙铭",
          date: "2019-11-13"
        },
        {
          id: 5,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
        {
          id: 6,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
        {
          id: 7,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
        {
          id: 8,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
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
    jumpResDet() {
      this.$router.push("/admin/pendingResTaskDet");
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
