<template>
  <div>
    <el-container>
      <el-aside width="5%">
        <div class="backGround_0">
          <!-- <el-card class="box-card">
             <div slot="header" class="clearfix">
                <span></span>
                <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
          </div>-->
          <!--   <div v-for="o in tenderTrendsList" :key="o" class="text item">
                {{ o }}
            </div>  
          </el-card>-->
        </div>
      </el-aside>
      <el-main>
        <h3>流通任务评价</h3>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <div>
          <div class="container">
            <div class="handle-box">
              <el-button
                type="primary"
                icon="el-icon-delete"
                class="handle-del mr10"
                @click="delAllSelection"
              >批量删除</el-button>
              <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
            </div>

            <el-table
              :data="tableData"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
              <el-table-column prop="Maintask" label="主任务名称"></el-table-column>
              <el-table-column prop="Subtask" label="子任务名称"></el-table-column>
              <el-table-column prop="Suppliername" label="供应商名称"></el-table-column>
              <el-table-column prop="time" label="任务完成时间"></el-table-column>
              <el-table-column prop="state" label="评价状态"></el-table-column>

              <el-table-column prop="“cz”" label="操作" width="340" align="center">
                <template slot-scope="scope">
                  <!--    <div id=a> -->
                  <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                  <el-button
                    @click="supplyDetail"
                    type="text"
                    size="small "
                    class="el-tabs__item"
                  >查看详情</el-button>
                  <!-- </div> -->
                  <el-button
                    @click="supplyDetailVue"
                    type="text"
                    size="small"
                    class="el-tabs__item"
                  >评价</el-button>
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
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import supplyDetailVue from "../company/supplyDetail.vue";
/* import supplyDetailVue from '../company/supplyDetail.vue'; */
/*  var vm = new Vue({
   el: '#a'}) */
export default {
  name: "circulationTaskEvaluation",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          el: "#vue",
          id: 1,
          Maintask: "光电测控仪器设备",
          Subtask: "电视测角仪",
          Suppliername: "长春奥普光电技术股份有限公司",
          time: "2020-01-02",
          state: "已评价",
          Grade: "5 "
          // cz:
        },
        {
          id: 2,
          Maintask: "磨床生产",
          Subtask: "平面磨床制作",
          Suppliername: "123",
          time: "2019-12-02",
          state: "杭机集团长春一机有限公司",
          Grade: "4"
        },
        {
          id: 3,
          Maintask: "汽车电子产品研发",
          Subtask: "汽车集成服务",
          Suppliername: "启明信息技术股份有限公司",
          time: "2019-03-02",
          state: "未评价",
          Grade: " "
        },
        {
          id: 4,
          Maintask: "卫星应用数据创新",
          Subtask: "卫星应用数据",
          Suppliername: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2020-01-02",
          state: "未评价",
          Grade: " "
        },
        {
          id: 5,
          Maintask: "通信技术设计",
          Subtask: "通信技术",
          Suppliername: "哈尔滨海邻科信息技术有限公司",
          time: "2020-02-02",
          state: "未评价",
          Grade: " "
        },
        {
          id: 6,
          Maintask: "高分子材料创新",
          Subtask: "高分子材料创新",
          Suppliername: "黑龙江省润特科技有限公司",
          time: "2020-01-02",
          state: "未评价",
          Grade: " "
        },
        {
          id: 7,
          Maintask: "发电智能制造",
          Subtask: "发电装备",
          Suppliername: "哈尔滨电机厂有限责任公司",
          time: "2019-11-08",
          state: "未评价",
          Grade: " "
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
    getData() {
      //   this.tableData = res.list;
      //   this.pageTotal = tableData.length;
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      let length = this.multipleSelection.length;
      let str = "";
      for (let j = 0; j < length; j++) {
        this.tableData.splice(this.multipleSelection[j], 1);
        str += this.multipleSelection[j].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
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
    /*
     *转跳对应任务信息页面
     */
    supplyDetail() {
      this.$router.push("/admin/circulationTaskEvaluationDetils");
    }
    /*  supplyDetailVue(){
         this.$router.push('/circulationTaskEvaluationDetils2')
     } */
  }
};
</script>
<style>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}
.table {
  font-size: 16px;
}
.el-tabs__item {
  font-size: 16px;
}
.red {
  font-size: 16px;
}
</style>


