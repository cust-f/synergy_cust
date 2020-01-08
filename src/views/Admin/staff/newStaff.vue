<!-- 
 * @description: 人员管理
 * @fileName: newStaff.vue 
 * @author: 刘思源
 * @date: 2020.1.5
 * @后台人员:  
 * @path:  
 * @version: V1.0.5 
!-->
<template>
  <div>
    <el-container>
      <el-main>
        <div class="box">
          <h3>人员管理</h3>
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  class="handle-del mr10"
                  @click="delAllSelection"
                >批量删除</el-button>

                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

                <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button>
              </div>
              <div class="box">
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
                  <el-table-column prop="name" label="用户名"></el-table-column>
                  <el-table-column prop="realname" label="真实姓名"></el-table-column>
                  <el-table-column prop="role" label="部门"></el-table-column>
                  <el-table-column prop="email" label="邮箱"></el-table-column>
                  <el-table-column prop="phone" label="电话"></el-table-column>

                  <el-table-column label="操作" width="180" align="center">
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
                <el-form-item label="邮箱">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              </span>
            </el-dialog>

            <!-- 新增弹出框 -->
            <el-dialog title="新增" :visible.sync="addVisible" width="50%">
              <el-form ref="form" :model="addList" label-width="70px">
                <el-form-item label="用户名">
                  <el-input v-model="addList.name"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                  <el-input v-model="addList.realname"></el-input>
                </el-form-item>

                <el-form-item label="角色">
                  <el-select v-model="addList.role" placeholder="请选择角色">
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option label="设计人员" value="设计人员"></el-option>
                    <el-option label="市场人员" value="市场人员"></el-option>
                    <el-option label="流通人员" value="流通人员"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="addList.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="addList.phone"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                  <el-input v-model="addList.password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>





<div class="con">
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div>
        </el-main>
    </el-container>
     

</div>
      
</template>

<script>
export default {
  name: "newStaff",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          id: 1,
          realname: "邓力夫",
          name: "邓力夫",
          email: "denglifu@163.com",
          role: "管理员",
          phone: "16545675821"
        },
        {
          id: 2,
          realname: "刘强",
          name: "刘强",
          email: "liuqiang123@163.com",
          role: "设计人员",
          phone: "15874561485"
        },
        {
          id: 3,
          realname: "夏圆圆",
          name: "夏圆圆",
          email: "xiayuanyuan@163.com",
          role: "流通人员",
          phone: "16445983697"
        }
      ],
      addList: {
        id: 1,
        realname: "",
        name: "",
        email: "",
        role: "",
        phone: ""
      },
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,

    
      addForm: {
        realname: "",
        loginname: "",
        password: "",
        realName: "",
        email: "",
        mobile: "",
        role: ""
      },
      value: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
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

    addstaff: function() {
      this.addFormVisible = true;
    },
    open() {
      this.$message({
        showClose: true,
        message: "提交成功",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 16px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.box {
  font-size: 24px;
}
</style>

