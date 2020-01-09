<template>
  <div>
    <el-container>
      <el-main>
        <h3>设计任务</h3>
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
                    <template>
                      <el-button @click="jumpAllTasks()" type="text" size="small">查看详情</el-button>
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

              <el-tab-pane label="待响应任务" name="second">
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
                        @click="dialogTableVisible = true"
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
                    <template>
                      <el-button @click="jumpAllTasks()" type="text" size="small">查看详情</el-button>
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

              <el-tab-pane label="待审核任务" name="fourth">
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
                  <el-table-column label="图纸" width="110" align="center">
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

              <el-tab-pane label="完成任务" name="fifth">
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
                  <el-table-column label="图纸" width="110" align="center">
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
              <el-tab-pane label="废除任务" name="sixth">
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

                  <el-table-column prop="taskName" label="任务名称" ></el-table-column>
                  <el-table-column label="任务截止日期" align="center">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                  </el-table-column>
                  <el-table-column prop="bussessType" label="任务类型" ></el-table-column>

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
                  <el-table-column label="图纸" width="110" align="center">
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
      <!-- 分配弹窗 -->
          <div align="left">
            <el-dialog title="分配人员" :visible.sync="dialogTableVisible">
              <el-form :model="from">
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                  <el-input v-model="from.name" autocomplete="off" :disabled="true">this.</el-input>
                </el-form-item>
                <el-form-item label="截止日期" :label-width="formLabelWidth">
                  <el-input v-model="from.endtime" autocomplete="off" :disabled="true">this.</el-input>
                </el-form-item>
                <el-form-item label="人员分配" :label-width="formLabelWidth">
                  <el-select v-model="from.region" placeholder="请选择分配人员">
                    <el-option label="王小虎" value="wangxiaohu"></el-option>
                    <el-option label="李丽" value="lili"></el-option>
                    <el-option label="马杰" value="majie"></el-option>
                    <el-option label="秦琴" value="qinqin"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="acceptSuccess()">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>分配成功</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "designTaskq",
  data() {
    return {
      dialogTableVisible: false, //分配人员弹窗
      dialogVisible: false,      //分配成功弹窗
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      //接受表单数据
      from: {
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
          taskLeader: "李琦",

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
    jumpAllTasks() {
      this.$router.push("/admin/designTaskqDesigin");
    },
    // 新建任务跳转
    jumpNewTasks() {
      this.$router.push("/admin/acceptDesignDetailsTask");
    },
    //接受成功
    acceptSuccess() {
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
