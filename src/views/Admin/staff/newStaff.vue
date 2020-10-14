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
  <div class="newStaff">
    <el-container>
      <el-main>
        <div class="box">
          <div
            class="biaoti"
            style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;"
          >
            &nbsp;&nbsp;人员管理
          </div>
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                <el-input
                  v-model="selectName"
                  placeholder="用户名"
                  class="handle-input mr10"
                ></el-input>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="handleSearch"
                  >搜索</el-button
                >

                <el-button
                  type="primary"
                  class="handle-del mr10"
                  @click="addData"
                  >新增</el-button
                >
              </div>
              <div class="box">
                <el-table
                  :data="
                    tableData.slice(
                      (pageIndex - 1) * pageSize,
                      pageIndex * pageSize
                    )
                  "
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  row-style="height:0"
                  cell-style="padding:0"
                  :default-sort="{ prop: 'userName', order: 'descending' }"
                >
                  <el-table-column
                    prop="userId"
                    label="序号"
                    width="55"
                    align="center"
                    type="index"
                  ></el-table-column>

                  <el-table-column
                    prop="userName"
                    label="用户名"
                    sortable
                    width="120"
                  ></el-table-column>
                  <el-table-column
                    prop="realName"
                    label="真实姓名"
                    sortable
                    width="120"
                  ></el-table-column>
                  <el-table-column
                    prop="roleId"
                    label="部门"
                    sortable
                    width="100"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.roleId === 4">设计人员</span>
                      <span v-else-if="scope.row.roleId === 5">流通人员</span>
                      <span v-else-if="scope.row.roleId === 3">供应商</span>
                      <span v-else-if="scope.row.roleId === 2">核心企业</span>
                      <span v-else-if="scope.row.roleId === 1">管理员</span>
                      <span v-else-if="scope.row.roleId === 6">企业</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    label="邮箱"
                    sortable
                  ></el-table-column>
                  <el-table-column
                    prop="phone"
                    label="电话"
                    sortable
                  ></el-table-column>

                  <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                        size="small"
                        >编辑</el-button
                      >
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red1"
                        size="small"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next,total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData.length"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                ></el-pagination>
              </div>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog :visible.sync="editVisible" width="30%">
              <div
                class="biaoti"
                style="padding: 0 10px; border-left: 3px solid #4e58c5"
              >
                人员编辑
              </div>
              &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <el-form
                ref="form"
                :model="form"
                label-width="70px"
                :rules="userRules"
              >
                <el-form-item label="用户名">
                  <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item
                  prop="email"
                  label="邮箱"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮箱地址',
                      trigger: 'blur',
                    },
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址',
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>

                <el-button type="primary" @click="saveEdit('form')"
                  >确 定</el-button
                >
              </span>
            </el-dialog>

            <!-- 新增弹出框 -->
            <el-dialog :visible.sync="addVisible" width="50%">
              <div
                class="biaoti"
                style="padding: 0 10px; border-left: 3px solid #4e58c5"
              >
                人员新增
              </div>
              &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <el-form
                ref="form"
                :model="addList"
                label-width="70px"
                :rules="userRules"
              >
                <!-- <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>-->
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="addList.userName"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                  <el-input v-model="addList.realName"></el-input>
                </el-form-item>

                <el-form-item label="角色">
                  <el-select v-model="addList.roleId" placeholder="请选择角色">
                    <el-option label="设计人员" value="4"></el-option>
                    <el-option label="流通人员" value="5"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  prop="email"
                  label="邮箱"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮箱地址',
                      trigger: 'blur',
                    },
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址',
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input v-model="addList.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="addList.phone"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                  <el-input v-model="addList.password"></el-input>
                </el-form-item>
                <!-- <el-form-item label="用户头像" prop="password">
                  <el-input v-model="addList.password"></el-input>
                </el-form-item> -->
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd('form')"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>





<script>
import Qs from "qs";
export default {
  name: "newStaff",
  data() {
    var validDataPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写手机号码"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        // this.$error("手机号码有误，请重填");
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };

     var checkuserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value === this.existName) {
        callback(new Error("用户名重复"));
      } else {
        callback();
      }
    };
    return {
      usernamex: sessionStorage.getItem("ms_username"),
      //userId:row.userId,

      pageIndex: 1,
      pageSize: 7,

      tableData: [
        {
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: "",
        },
        
      ],
      addList: {
        id: 1,
        realName: "",
        userName: "",
        email: "",
        roleId: "",
        phone: "",
        passWord: "",
      },
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {
        taskId: "",
        userName: "",
        phone: "",
        email: "",
        password: "",
      },
      idx: -1,
      id: -1,

      addForm: {
        realname: "",
        loginname: "",
        password: "",
        realName: "",
        email: "",
        mobile: "",
        role: "",
      },
      value: "",
      Id: "",
      selectName: "",
      userRules: {
        phone: [{ required: true, validator: validDataPhone, trigger: "blur" }],
        userName: [
          { required: true, validator: checkuserName, trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" },
        ],
      },

      // 0: {
      //   "addList.userName": function (val) {
      //     this.getexistName();
      //   },
      // },
      existName: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      //this.tableData = res.list;
      //this.pageTotal = tableData.length;
      console.log(this.usernamex);
      var that = this;
      var data = Qs.stringify({
        userName: this.usernamex,
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "api/newStaff/list",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          //console.log(response);
          this.tableData = response.data.allData;
        });
    },
    // 触发搜索按钮
    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        UserName: this.usernamex,
        userName: this.selectName,
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "api/newStaff/selectStaff",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          //console.log(response);
          this.tableData = response.data.allData;
        });

      this.$set(this.selectName, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      var that = this;
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      var data = Qs.stringify({
        userId: row.userId,
      });
      that
        .axios({
          method: "post",
          url: "api/newStaff/deletelist",
          data: data,
          //  data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
          //this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        });
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
    saveAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          var data = Qs.stringify({
            userName: this.usernamex,
            User_Name: this.addList.userName,
            Real_Name: this.addList.realName,
            Role_Id: this.addList.roleId,
            Phone: this.addList.phone,
            Email: this.addList.email,
            Password1: this.addList.password,
            //roleName:this.roleName
          });
          // console.log(data);
          //console.log(this.addList.email);

          that
            .axios({
              method: "post",
              url: "api/newStaff/addlist",
              data: data,
            })
            .then((response) => {
              this.$message({
                type: "success",
                message: "提交成功",
              });
              this.tableData.push(this.addList);
              //console.log(this.addList);
              this.addList = {};
              this.addVisible = false;
              this.getData();
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入正确有效的信息",
          });
        }
      });
    },

    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
      this.Id = row.userId;
      //console.log(Id);
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          var data = Qs.stringify({
            userId: this.Id,
            User_Name: this.form.userName,
            Phone: this.form.phone,
            Email: this.form.email,
            Password: this.form.password,
            //userId:row.userId
          });
          //console.log(data);
          //console.log(this.addList.email);

          that
            .axios({
              method: "post",
              url: "api/newStaff/editlist",
              data: data,
            })
            .then((response) => {
              this.$message({
                type: "success",
                message: "修改账户信息成功",
              });
              this.getData();
              this.editVisible = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入正确有效的信息",
          });
        }

        // this.$message.success("提交成功");
        //this.tableData.push(this.form);
        //this.form = {};
      });
    },
    //校验姓名是否存在
    getexistName() {
      let that = this;
      let data = Qs.stringify({
        checkName: this.addList.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/register/checkName",
          data: data,
        })
        .then((response) => {
          console.log(response);
          if (response.data.allData.check) {
            this.existName = this.addList.userName;
          }
        });
    },
    // 分页导航
    handlePageChange(val) {},

    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },

    /*
     *转跳对应任务信息页面
     */

    addstaff: function () {
      this.addFormVisible = true;
    },
    open() {
      this.$message({
        showClose: true,
        message: "提交成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss">
.newStaff {
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
    font-size: 14px;
  }
  .red1 {
    color: #ff0000;
    size: small;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 30px;
  }
  .box {
    font-size: 24px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
}
</style>

