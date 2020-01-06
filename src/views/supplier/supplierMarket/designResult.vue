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
        <h3>设计成果</h3>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
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
              <el-table-column prop="id" label="任务编号" width="80"></el-table-column>
              <el-table-column prop="name" label="任务名称"></el-table-column>
              <el-table-column prop="class" label="任务类别"></el-table-column>
              <el-table-column prop="publish" label="发布任务企业"></el-table-column>
              <el-table-column prop="designer" label="设计人员"></el-table-column>
              <el-table-column prop="completionDate" label="完成日期"></el-table-column>
              <el-table-column prop="state" label="任务状态">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.state==='未被采纳'?'danger':(scope.row.state==='已被采纳'?'success':scope.row.state==='已提交'?'info':scope.row.state==='未提交'?'warning':'')"
                  >{{scope.row.state}}</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="180">
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
  name: "designResult",
  data() {
    return {
      dialogTableVisible: false,
      dialogVisible: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          id: 10001,
          name: "车间零部件生产",
          class: "零件生产",
          publish: "一汽",
          designer: "张三",
          completionDate: "2019-11-1",
          state: "已被采纳"
        },
        {
          id: 10002,
          name: "卫星微型零件制作",
          class: "零件生产",
          publish: "一汽",
          designer: "张三",
          completionDate: "2019-11-1",
          state: "未被采纳"
        },
        {
          id: 10003,
          name: "卫星微型零件制作",
          class: "卫星零件生产",
          publish: "一汽",
          designer: "张三",
          completionDate: "2019-11-1",
          state: "未提交"
        },
        {
          id: 10004,
          name: "卫星微型零件制作",
          class: "卫星零件生产",
          publish: "一汽",
          designer: "张三",
          completionDate: "2019-11-1",
          state: "已提交"
        },
        {
          id: 10005,
          name: "卫星微型零件制作",
          class: "卫星零件生产",
          publish: "哈工",
          designer: "张三",
          completionDate: "2019-11-1",
          state: "已被采纳"
        },
        {
          id: 10006,
          name: "卫星微型零件制作",
          class: "卫星零件生产",
          publish: "哈工",
          designer: "张三",
          completionDate: "2019-11-1",
          state: "已被采纳"
        },
        {
          id: 10007,
          name: "导弹装配与改进",
          class: "卫星零件生产",
          publish: "哈工",
          designer: "张三",
          completionDate: "2019-11-1",
          state: "已被采纳"
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
      this.$router.push("/designResultDesigin");
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