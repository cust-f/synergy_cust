<template>
  <div>
    <div>
      <el-container>
        <el-main style="overflow:hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="cool" :model="cool" label-width="110px" class="form">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称名称">
                  <el-input v-model="cool.mainTaskName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="行业类别">
                  <el-input v-model="cool.industry_Type" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-input
                    v-bind:value='cool.publishTime | formatDate'
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-input  v-bind:value="cool.deadline | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="任务状态">
                  <el-input v-model="cool.taskState" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="完成日期">
                  <el-input  v-bind:value="cool.finishTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="项目负责人">
                  <el-input v-model="cool.principalName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row></el-row>
            <el-row>
              <el-col width="100%">
                <el-form-item label="主项目详情">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width:90%"
                    v-model="cool.mainTaskDetail"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="feichuAll">废除需求任务</el-button>
            <el-button type="primary" class="button1">下载装配文档</el-button>
            <el-button type="primary" class="button1">下载技术文档模板</el-button>
          </div>
          <el-divider></el-divider>
          <h3>分解任务</h3>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <div>
            <div class="container">
              <div class="handle-box">
                <!-- <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
                >批量删除</el-button>-->
                <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button>
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
                <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>
                <el-table-column prop="taskName" label="分解任务名称"></el-table-column>
                <el-table-column prop="companyName" label="企业名称"></el-table-column>
                <el-table-column prop="taskType" label="任务类型"></el-table-column>
                <el-table-column prop="finishTime" label="任务完成时间">
                  <template slot-scope="scope">{{scope.row.finishTime | formatDate}}</template>
                </el-table-column>
                <el-table-column label="状态" align="center" prop="taskState"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>-->
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete1(scope.row)"
                    >废除</el-button>
                    <el-button @click="mainStaskDetail(scope.row)" type="text" size="small">查看详情</el-button>
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

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
              <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input v-model="form.address"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              </span>
            </el-dialog>

            <el-dialog title="新增" :visible.sync="addVisible" width="50%">
              <el-form ref="form" :model="addList" label-width="70px">
                <el-form-item label="企业名称">
                  <el-input v-model="addList.name"></el-input>
                </el-form-item>
                <el-form-item label="任务类型">
                  <el-input v-model="addList.address"></el-input>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input v-model="addList.money"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="addList.state" placeholder="请选择状态">
                    <el-option label="成功" value="成功"></el-option>
                    <el-option label="失败" value="失败"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="注册时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="addList.date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>




<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "substaskDetail",
  prop: {},
  data() {
    return {
      dialogVisible: false,
      cool: {
        mainTaskName: "",
        industry_Type: "",
        publishTime: "",
        deadline: "",
        mainTaskDetail: "",
        leader: "",
        taskState: ""
      },
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          id: 1,
          bussessType: "设计任务",
          name: "长春光华微电子集团",
          needname: "车间零部件生产",
          dividename: "汽车轴承生产",
          money: 30000,
          state: "已完成",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "设计任务",
          needname: "车间零部件生产",
          name: "中国机械工业集团公司",
          dividename: "汽车轮毂生产",
          money: 5000,
          state: "已完成",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "设计任务",
          name: "大连冰山集团有限公司",
          needname: "车间零部件生产",
          dividename: "汽车轮胎生产",
          money: 7000,
          state: "已完成",
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
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      mainTaskID: ""
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },

  created() {
    this.getParams();
    this.getData();
  },

  methods: {
    /*
     *转跳对应任务信息页面
     */
    // 获取 easy-mock 的模拟数据
    getParams() {
      var routerParams = this.$route.query.mainTaskID;
      this.mainTaskID = routerParams;
      console.log(routerParams);
    },

    getData() {
      console.log(this.mainTaskID);
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/MainTaskInformation/combineMS",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          this.cool = response.data.allData.a[0];
          this.tableData = response.data.allData.b;
          console.log(response.data.allData);
        });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },

    // 删除操作
    handleDelete1(row) {
      this.$confirm("确定要废除吗？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          substakeID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/MainTaskInformation/feicuBySubstaskstaskID",
          data: data

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
        this.tableData.splice(index, 1);
      });
      //   .then(response => {
      //     this.cool = response.data.allData.a[0];
      //     this.tableData = response.data.allData.b;
      //      console.log(response.data.allData);
      //   });
      // 二次确认删除

      //   .catch(() => {});
    },

    feichuAll() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        var that = this;
        console.log(this.mainTaskID);
        var data = Qs.stringify({
          mainStaskID: this.mainTaskID
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "http://127.0.0.1:8082/MainTaskInformation/feichuByMainstaskID",
          data: data

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
      });
    },

    //新增操作
    addData() {
      this.addVisible = true;
    },
    //保存新增
    saveAdd() {
      this.tableData.push(this.addList);
      console.log(this.addList);
      this.addList = {};
      this.addVisible = false;
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {},

    mainStaskDetail(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/mainStaskDetail",
        query: {
          taskId: row.taskId
        }
      });
    },
    goBack() {
      this.$router.push("/admin/mainStaskShow");
    }
  }
};
</script>

<style>
.table {
  font-size: 14px;
}
.table {
  width: 100%;
  font-size: 14px;
}
</style>