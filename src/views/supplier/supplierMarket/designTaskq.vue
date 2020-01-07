<template>
  <div>
    <el-container>
      <el-aside width="15%">
        <div class="backGround_0">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>历史记录</span>
              <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
            </div>
            <div v-for="o in tenderTrendsList" :key="o" class="text item">{{ o }}</div>
          </el-card>
        </div>
      </el-aside>
      <el-main>
        <h3>设计任务</h3>
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

               <el-table-column prop="designer" label="设计人员"></el-table-column>

              <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="substaskDetail(scope.$index, scope.row)"
                    type="text"
                    size="small"
                  >查看详情</el-button>

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
  
  </div>
</template>

<script>
export default {
  name: "designTaskq",
  data() {
    return {
      dialogTableVisible: false,
      dialogVisible: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },

      form: {
        name: "小汽车零件的装配",
        endtime: "2019-10-17",
        company: "一汽大众"
      },
      formLabelWidth: "120px",
      tableData: [
        {
          id: 100000,
          taskName: "小型汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李华",
          designer:"李贤",
          leaderTel: "18088678745",
          date: "2019-11-1"
        },
        {
          id: 100001,
          taskName: "中型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",
          designer:"李贤",
          leaderTel: "13588678745",
          date: "2019-11-1"
        },
        {
          id: 100002,
          taskName: "小型汽车刹车",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "周舟",
          designer:"李贤",
          leaderTel: "18588678745",
          date: "2019-11-1"
        },
        {
          id: 100003,
          taskName: "小型汽车后备箱盖子",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "孙铭",
          designer:"李贤",
          leaderTel: "11288678745",
          date: "2019-11-1"
        },
        {
          id: 100004,
          taskName: "小型汽车车轮",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "秦青",
          designer:"李贤",
          leaderTel: "16688678745",
          date: "2019-11-1"
        },
        {
          id: 100005,
          taskName: "大型卡车货箱",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "蔡司",
          designer:"李贤",
          leaderTel: "13388678745",
          date: "2019-11-1"
        },
        {
          id: 100006,
          taskName: "面包车包厢",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李继",
          designer:"李贤",
          leaderTel: "15488678745",
          date: "2019-11-1"
        }
      ],
      addList: {
        id: null,
        address: "",
        name: "",
        money: null,
        state: null,
        date: null
      },
      tenderTrendsList: [
        { column_name: "黄河远上白云间" },
        { column_name: "九曲黄河万里沙" },
        { column_name: "君不见黄河之水天上来" },
        { column_name: "白日依山尽，黄河入海流" },
        { column_name: "黄河落天走东海，万里尘沙入胸怀" },
        { column_name: "明月隐高树，长河没晓天" },
        { column_name: "萧萧远树疏林外，一半秋山带夕阳。" },
        { column_name: "黄河西来决昆仑，咆哮万里触龙门。" }
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
    // 分页导航
    handlePageChange(val) {},
    substaskDetail() {
      this.$router.push("/designTaskqDesigin");
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
