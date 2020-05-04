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
              <el-button type="primary" class="handle-del mr10" @click="addData">导入</el-button>
              <el-button type="primary" class="handle-del mr10" @click="addData">导出</el-button>
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
              <el-table-column prop="Maintask" label="主任务名称" width="106"></el-table-column>
              <el-table-column prop="Subtask" label="子任务名称"></el-table-column>
              <el-table-column prop="Suppliername" label="供应商名称"></el-table-column>
              <el-table-column prop="time" width="139" label="任务完成时间"></el-table-column>
              <el-table-column prop="state" width="83" label="评价状态"></el-table-column>

              <el-table-column prop="“cz”" label="操作" width="189" align="center">
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
        { el: '#vue',
          id: 1, 
          Maintask:"车间零部件生产",
          Subtask: "火车的制造",
          Suppliername: "沈阳机床集团有限责任公司",
          time:"2020-02-02",
          state: "已评价",
          Grade: "5 "
          // cz:
        },
        {
          id: 2, 
          Maintask:"卫星微型零件制作",
          Subtask: "汽车生产装配",
          Suppliername: "中国机械工业集团公司",
          time:"2019-12-02",
          state: "已评价",
          Grade:"4"
        },
        {
          id: 3, 
          Maintask:"大型机械组装",
          Subtask: "轮船动力锅炉制造",
          Suppliername: "山东工程机械集团有限公司",
          time:"2019-03-02",
          state: "未评价",
          Grade: " "
        },
        {
          id: 4, 
          Maintask:"大型机械组装",
          Subtask: "铁轨的制造",
          Suppliername: "大连冰山集团有限公司",
          time:"2020-01-02",
          state: "未评价",
          Grade: " "
        },
         {
         id: 5, 
          Maintask:"车间零部件生产",
          Subtask: "高压锅炉制造",
          Suppliername: "沈阳机床集团有限责任公司",
          time:"2020-02-02",
          state: "未评价",
          Grade: " "
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
  /* font-size: 16px; */
}
.el-tabs__item {
  /* font-size: 16px; */
}
.red {
  /* font-size: 16px; */
}
</style>


