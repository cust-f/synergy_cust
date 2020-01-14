<template>
  <div>
    <el-container>
      <el-main>
        <h3>用户管理</h3>
        <el-divider></el-divider>
        <div class="container">
          <div class="handle-box">
            <el-button
              type="primary"
              icon="el-icon-delete"
              class="handle-del mr10"
              @click="delAllSelection"
            >批量删除</el-button>
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              class="handle-del mr10"
              @click="addData"
            >增加</el-button>

            <el-select v-model="name" placeholder="企业名称" class="handle-input mr10"></el-select>
            <el-select v-model="name" placeholder="用户名" class="handle-input mr10"></el-select>

            <el-select v-model="role" placeholder="角色" class="handle-input mr10">
              <el-option label="需求方" value="1"></el-option>
              <el-option label="供应商" value="2"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="choose">筛选</el-button>
          </div>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
            <el-table-column prop="Company_name" label="企业名称"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="Business_Tel" label="联系方式"></el-table-column>
            <el-table-column prop="password" width="108" label="密码"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>-->
                <el-button @click="supplyDetail" type="text" size="small">初始化密码</el-button>
                <el-button type="text" class="red" @click="freeze(scope.$index, scope.row)">冻结</el-button>
                <el-button type="text" class="red" @click="unfreeze(scope.$index, scope.row)">解冻</el-button>
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

        <el-dialog title="增加" :visible.sync="addVisible" width="50%">
          <el-form ref="form" :model="addList" label-width="70px">
            <el-form-item label="用户名">
              <el-input v-model="user_name"></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input v-model="company_name"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-input v-model="role"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="email"></el-input>
            </el-form-item>

            <el-form-item label="联系方式">
              <el-input v-model="contect"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "userManagement",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      multipleSelection: [], //批量删除数组
      editVisible: false,
      addVisible: false,

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
      tableData: [
        {
          user_name: "宋东润",
          Company_name: "长春第一汽车制造厂",
          role: "需求方",
          email: "1235406@163.com",
          Business_Tel: "0451-82872000",
          password: "123123"
        },
        {
          user_name: "苏得税",
          Company_name: "沈阳机床集团有限责任公司",
          role: "供应商",
          email: "1231206@163.com",
          Business_Tel: "0451-82872000",
          password: "cdfgssf"
        },
        {
          user_name: "加蒂斯",
          Company_name: "哈尔滨电机厂有限责任公司",
          role: "供应商",
          email: "1232306@163.com",
          Business_Tel: "0456-82372000",
          password: "fechfr"
        },
        {
          user_name: "刘大海",
          Company_name: "大连重工-起重集团有限公司",
          role: "供应商",
          email: "12306@163.com",
          Business_Tel: "0451-82872000",
          password: "xffdsgg"
        },
        {
          user_name: "苏之星",
          Company_name: "北方重工集团有限公司",
          role: "供应商",
          email: "12426@163.com",
          Business_Tel: "0451-828745390",
          password: "xffdsgg"
        },
        {
          user_name: "蔡长件",
          Company_name: "长春光华微电子集团",
          role: "供应商",
          email: "123g306@163.com",
          Business_Tel: "0451-82872000",
          password: "xffdsgg"
        },
        {
          user_name: "王期间",
          Company_name: "大连冰山集团有限公司",
          role: "供应商",
          email: "12234306@163.com",
          Business_Tel: "0451-82872000",
          password: "xffdsgg"
        }
      ],
      addList: [
        {
          id: "",
          taskNum: "",
          taskName: "",
          taskType: "",
          bidTime: "",
          supplyCompany: "",
          select: ""
        }
      ],
      form: {}
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}
.table {
  /* font-size: 16px; */
}
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