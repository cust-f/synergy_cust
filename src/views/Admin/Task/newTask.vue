<template>
  <el-container>
    <el-main>
      <div class="newTask">
        <h3>招标信息</h3>
        <el-form
          ref="newTask"
          :model="newTask"
          label-width="120px"
          :inline="true"
          label-position="right"
        >
          <el-row>
            <el-form-item label="项目名称">
              <el-input v-model="newTask.name"></el-input>
            </el-form-item>
            <el-form-item label="项目类别">
              <el-select v-model="newTask.region" placeholder="请选择项目类别">
                <el-option label="全部" value></el-option>
                <el-option v-for="tag in statuses" :key="tag" :label="tag" :value="tag"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="总负责人">
              <el-select v-model="newTask.head" placeholder="请选择总负责人">
                <el-option label="全部" value></el-option>
                <el-option v-for="head in personnel" :key="head" :label="head" :value="head"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="投标截止日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="newTask.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="开标日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="newTask.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                type="textarea"
                autosize
                v-model="newTask.detail"
                style="width:100%;"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div>
        <h3>子任务信息</h3>

        <div class="container">
          <div class="handle-box">
            <el-button
              type="primary"
              icon="el-icon-delete"
              class="handle-del mr10"
              @click="delAllSelection"
            >批量删除</el-button>
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
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="taskNum" label="子任务编号"></el-table-column>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="taskType" label="任务类别"></el-table-column>
            <el-table-column prop="bidTime" label="开标时间"></el-table-column>
            <el-table-column prop="supplyCompany" label="供应商"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="red"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
 <el-form ref="form" :model="addList" label-width="120px">
            <el-form-item label="子任务编号">
              <el-input v-model="form.taskNum"></el-input>
            </el-form-item>
            <el-form-item label="任务名称">
              <el-input v-model="form.taskName"></el-input>
            </el-form-item>
            <el-form-item label="任务类别">
                <el-select v-model="form.taskTyp" placeholder="请选择项目类别">
                <el-option v-for="tag in statuses" :key="tag" :label="tag" :value="tag"></el-option>
              </el-select>
              <el-input v-model="form.taskType"></el-input>
            </el-form-item>
            <el-form-item label="开标时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.bidTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="核心供应商">
              <el-select v-model="form.supplyCompany" placeholder="请选择供应商">
                <el-option v-for="company in supplyCompanies" :key="company" :label="company" :value="company"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="50%">
          <el-form ref="form" :model="addList" label-width="120px">
            <el-form-item label="子任务编号">
              <el-input v-model="addList.taskNum"></el-input>
            </el-form-item>
            <el-form-item label="任务名称">
              <el-input v-model="addList.taskName"></el-input>
            </el-form-item>
            <el-form-item label="任务类别">
              <el-input v-model="addList.taskType"></el-input>
            </el-form-item>
            <el-form-item label="开标时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addList.bidTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="核心供应商">
              <el-select v-model="addList.supplyCompany" placeholder="请选择供应商">
                <el-option label="全部" value></el-option>
                <el-option v-for="company in supplyCompanies" :key="company" :label="company" :value="company"></el-option>
              </el-select>
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
</template>

<script>

export default {
  name: "newTask",
  data() {
    return {
            query: {
        pageIndex: 1,
        pageSize: 10
      },
      multipleSelection: [], //批量删除数组
      editVisible: false,
      addVisible: false,
      personnel: ["张三", "李四"], //总负责人
      statuses: ["A类别", "B类别"], //任务类别
      supplyCompanies: ["公司A", "公司B", "公司C"], //供应商列表
      id: 0, //记录任务数
      //招标信息
      newTask: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        head: "",
        detail: ""
      },
      //子任务表格
      tableData: [],
      addList: [
        {
          id: "",
          taskNum: "",
          taskName: "",
          taskType: "",
          bidTime: "",
          supplyCompany: ""
        }              
      ],
      form:{}
    };
  },
  methods: {
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
          --this.id;
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      let length = this.multipleSelection.length;
      this.id = -length;
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
      ++this.id;
      this.addList.id = this.id;
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
    }
  }
};
</script>

<style>
.newTask textarea {
  min-height: 100px !important;
  width: 500px !important;
}
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
</style>