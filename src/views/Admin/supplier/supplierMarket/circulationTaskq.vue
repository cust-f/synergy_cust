<template>
  <div>
    <el-container>
      <el-main>
        <h3>流通任务</h3>
        <br />
        <div>
          <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部任务" name="first">
                <div class="handle-box"></div>
                <el-table
                  :data="tableData1"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>

                  <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
                  <el-table-column label="任务截止日期">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                  </el-table-column>
                  <el-table-column prop="bussessType" label="任务类型" align="center"></el-table-column>

                  <el-table-column prop="publishTask" label="发布任务企业" align="center"></el-table-column>

                  <el-table-column prop="taskLeader" label="任务负责人" align="center"></el-table-column>

                  <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.state==='已完成'?'success':(scope.row.state==='待审核'?'danger':'')"
                      >{{scope.row.state}}</el-tag>
                    </template>
                  </el-table-column>

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
              </el-tab-pane>

              <el-tab-pane label="新增任务" name="second">
                <div class="handle-box"></div>
                <el-table
                  :data="tableData2"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>

                  <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
                  <el-table-column label="任务截止日期">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                  </el-table-column>
                  <el-table-column prop="bussessType" label="任务类型" align="center"></el-table-column>

                  <el-table-column prop="publishTask" label="发布任务企业" align="center"></el-table-column>

                  <el-table-column prop="taskLeader" label="任务负责人" align="center"></el-table-column>

                  <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.state==='已完成'?'success':(scope.row.state==='待审核'?'danger':'')"
                      >{{scope.row.state}}</el-tag>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >查看详情</el-button>

                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >接受</el-button>

                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >不接受</el-button>
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
              </el-tab-pane>

              <el-tab-pane label="进行中" name="third">
                <div class="handle-box"></div>
                <el-table
                  :data="tableData3"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>

                  <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
                  <el-table-column label="任务截止日期">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                  </el-table-column>
                  <el-table-column prop="bussessType" label="任务类型" align="center"></el-table-column>

                  <el-table-column prop="publishTask" label="发布任务企业" align="center"></el-table-column>

                  <el-table-column prop="taskLeader" label="任务负责人" align="center"></el-table-column>

                  <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.state==='已完成'?'success':(scope.row.state==='待审核'?'danger':'')"
                      >{{scope.row.state}}</el-tag>
                    </template>
                  </el-table-column>

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
              </el-tab-pane>

              <el-tab-pane label="待审核" name="fourth">
                <div class="handle-box"></div>
                <el-table
                  :data="tableData4"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>

                  <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
                  <el-table-column label="任务截止日期">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                  </el-table-column>
                  <el-table-column prop="bussessType" label="任务类型" align="center"></el-table-column>

                  <el-table-column prop="publishTask" label="发布任务企业" align="center"></el-table-column>

                  <el-table-column prop="taskLeader" label="任务负责人" align="center"></el-table-column>

                  <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.state==='已完成'?'success':(scope.row.state==='待审核'?'danger':'')"
                      >{{scope.row.state}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="文件" width="110" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >查看</el-button>
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >下载</el-button>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >查看详情</el-button>

                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >审核通过</el-button>

                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >审核未通过</el-button>
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
              </el-tab-pane>

              <el-tab-pane label="已完成" name="fifth">
                <div class="handle-box"></div>
                <el-table
                  :data="tableData5"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>

                  <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
                  <el-table-column label="任务截止日期">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                  </el-table-column>
                  <el-table-column prop="bussessType" label="任务类型" align="center"></el-table-column>

                  <el-table-column prop="publishTask" label="发布任务企业" align="center"></el-table-column>

                  <el-table-column prop="taskLeader" label="任务负责人" align="center"></el-table-column>

                  <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.state==='已完成'?'success':(scope.row.state==='待审核'?'danger':'')"
                      >{{scope.row.state}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="文件" width="110" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >查看</el-button>
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >下载</el-button>
                    </template>
                  </el-table-column>

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
              </el-tab-pane>
              <el-tab-pane label="已废除" name="sixth">
                <div class="handle-box"></div>
                <el-table
                  :data="tableData6"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>

                  <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
                  <el-table-column label="任务截止日期">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                  </el-table-column>
                  <el-table-column prop="bussessType" label="任务类型" align="center"></el-table-column>

                  <el-table-column prop="publishTask" label="发布任务企业" align="center"></el-table-column>

                  <el-table-column prop="taskLeader" label="任务负责人" align="center"></el-table-column>

                  <el-table-column prop="taskLeader" label="废除原因" align="center"></el-table-column>

                  <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.state==='已完成'?'success':(scope.row.state==='待审核'?'danger':'')"
                      >{{scope.row.state}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="文件" width="110" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >查看</el-button>
                      <el-button
                        @click="substaskDetail(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >下载</el-button>
                    </template>
                  </el-table-column>

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
              </el-tab-pane>
            </el-tabs>
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

      tableData1: [
        {
          id: 100000,
          taskName: "小型汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李华",

          state: "新增",
          date: "2019-11-1"
        },
        {
          id: 100001,
          taskName: "中型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",

          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 100002,
          taskName: "小型汽车刹车",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "周舟",

          state: "已完成",
          date: "2019-11-1"
        },
        {
          id: 100003,
          taskName: "小型汽车后备箱盖子",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "孙铭",

          state: "进行中",
          date: "2019-11-1"
        }
      ],

      tableData2: [
        {
          id: 100012,
          taskName: "客车汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李名",

          state: "新增",
          date: "2019-12-1"
        },
        {
          id: 100301,
          taskName: "中型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",

          state: "新增",
          date: "2019-11-14"
        },
        {
          id: 100042,
          taskName: "小型汽车刹车",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "周舟",

          state: "新增",
          date: "2019-11-5"
        },
        {
          id: 100203,
          taskName: "小型汽车后备箱盖子",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "孙铭",

          state: "新增",
          date: "2019-11-12"
        }
      ],

      tableData3: [
        {
          id: 100012,
          taskName: "客车汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李名",

          state: "进行中",
          date: "2019-12-1"
        },
        {
          id: 100301,
          taskName: "中型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",

          state: "进行中",
          date: "2019-11-14"
        }
      ],
      tableData4: [
        {
          id: 100012,
          taskName: "火车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李名",

          state: "待审核",
          date: "2019-12-1"
        },
        {
          id: 100320,
          taskName: "大型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",

          state: "待审核",
          date: "2019-11-14"
        }
      ],
      tableData5: [
        {
          id: 100212,
          taskName: "小型汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李名",

          state: "已完成",
          date: "2019-12-1"
        },
        {
          id: 102320,
          taskName: "小型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘柳",

          state: "已完成",
          date: "2019-11-14"
        }
      ],
      tableData6: [
        {
          id: 104412,
          taskName: "小型汽车前车灯",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "李想",
          Abolish_Reason: "设计不合理",
          state: "已废除",
          date: "2019-12-23"
        },
        {
          id: 102324,
          taskName: "小型汽车车架",
          bussessType: "车间零部件生产",
          publishTask: "一汽大众",
          taskLeader: "刘成",
          Abolish_Reason: "设计超时",
          state: "已废除",
          date: "2019-11-19"
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
