<template>
  <div>
    <el-container>
      <el-main>
        <h3>接受设计任务</h3>
        <br />
        <div>
          <div class="container">
            <div class="handle-box"></div>
            <el-table
              :data="tableData"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>

              <el-table-column prop="taskName" label="任务名称"></el-table-column>
              <el-table-column label="任务截止日期">
                <template slot-scope="scope">{{scope.row.date}}</template>
              </el-table-column>
              <el-table-column prop="bussessType" label="任务类型"></el-table-column>

              <el-table-column prop="publishTask" label="发布任务企业"></el-table-column>

              <el-table-column prop="taskLeader" label="任务负责人"></el-table-column>

              <el-table-column prop="leaderTel" label="负责人联系电话"></el-table-column>

              <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="substaskDetail(scope.$index, scope.row)"
                    type="text"
                    size="small"
                  >查看详情</el-button>
                  <el-button type="text" class="red" @click="saveAdd()">接受</el-button>
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
        </div>
      </el-main>
    </el-container>

    <el-dialog title="分配人员" :visible.sync="dialogTableVisible">
      <el-form :model="from" label-width="110px">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="from.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-input v-model="from.endtime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设计人员" :label-width="formLabelWidth">
          <el-select v-model="from.username" placeholder="请选择分配人员">
            <el-option label="王小虎" value="wangxiaohu"></el-option>
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

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>分配成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible =false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "acceptDesignTask",
  data() {
    return {
        
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      formLabelWidth: "120px",
      tableData: [
        {
          id: 100000,
          taskName: "小型汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李华",
          leaderTel: "18088678745",
          date: "2019-11-1"
        },
        {
          id: 100001,
          taskName: "中型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",
          leaderTel: "13588678745",
          date: "2019-11-1"
        },
        {
          id: 100002,
          taskName: "小型汽车刹车",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "周舟",
          leaderTel: "18588678745",
          date: "2019-11-1"
        },
        {
          id: 100003,
          taskName: "小型汽车后备箱盖子",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "孙铭",
          leaderTel: "11288678745",
          date: "2019-11-1"
        },
        {
          id: 100004,
          taskName: "小型汽车车轮",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "秦青",
          leaderTel: "16688678745",
          date: "2019-11-1"
        },
        {
          id: 100005,
          taskName: "大型卡车货箱",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "蔡司",
          leaderTel: "13388678745",
          date: "2019-11-1"
        },
        {
          id: 100006,
          taskName: "面包车包厢",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李继",
          leaderTel: "15488678745",
          date: "2019-11-1"
        }
      ],
     from:{        
        name:"小汽车零件的装配",        
        endtime:"2019-10-17"     
    },
     dialogTableVisible: false,
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
    // 分页导航
    handlePageChange(val) {},
    substaskDetail() {
      this.$router.push("/acceptDesignDetailsTask");
    },
    saveAdd() {
      console.log("13224");
      this.dialogTableVisible = true;
      this.addList.push(this.tableData);
    },
    clearDeta() {
      this.addList = {};
    },

    success() {
      this.dialogTableVisible = false;
      this.dialogVisible = true;
    }
  }
  /*
   *转跳对应任务信息页面
   */
};
</script>
<style>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}
</style>
