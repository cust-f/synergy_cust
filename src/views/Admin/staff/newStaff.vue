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
           <div  class = "biaoti" style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;">&nbsp;&nbsp;人员管理</div>
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                

                <el-input v-model="query.userName" placeholder="用户名" class="handle-input mr10"></el-input>
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
                  row-style="height:0"
                  cell-style="padding:0"
                >
                  <el-table-column prop="id" label="ID" width="55" align="center" type="index"></el-table-column>
                  <el-table-column prop="userName" label="用户名"></el-table-column>
                  <el-table-column prop="realName" label="真实姓名"></el-table-column>
                  <el-table-column prop="roleId" label="部门">
                      <template slot-scope="scope">
                 <span v-if="scope.row.roleId === 4">设计人员</span>
              <span v-else-if="scope.row.roleId === 5">流通人员</span>
            </template>
                  </el-table-column>
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
            <el-dialog title="人员编辑" :visible.sync="editVisible" width="30%">
              <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                  <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              </span>
            </el-dialog>

            <!-- 新增弹出框 -->
            <el-dialog title="人员新增" :visible.sync="addVisible" width="50%">
              <el-form ref="form" :model="addList" label-width="70px">
                <el-form-item label="用户名">
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
import Qs from "qs";
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
          
          userName: "邓力夫",
          realName: "邓力夫",
          email: "denglifu@163.com",
          roleId: "管理员",
          phone: "16545675821"
        },
        {
         
          username: "刘强",
          realname: "刘强",
          email: "liuqiang123@163.com",
          roleId: "设计人员",
          phone: "15874561485"
        },
        {
         
          username: "夏圆圆",
          realname: "夏圆圆",
          email: "xiayuanyuan@163.com",
          roleId: "流通人员",
          phone: "16445983697"
        }
      ],
      addList: {
        id: 1,
        realName: "",
        userName: "",
        email: "",
        roleId: "",
        phone: "",
        passWord:""
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
      //this.tableData = res.list;
      //this.pageTotal = tableData.length;
       console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: ""
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/newStaff/list",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
          //this.form = response.data.allData[0];
        });
        
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      //var that= this;
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
    //  var data = Qs.stringify({
    //     User_Name: this.row.userName
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "http://127.0.0.1:8082//newStaff/deletelist",
    //       data: data

    //       //  data:this.$store.state.userName
    //     })
        .then(
           response => {
          // console.log(response);
          // this.tableData = response.data.allData;
          //this.form = response.data.allData[0];
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
       var that = this;
      var data = Qs.stringify({
        username: "",
        User_Name: this.addList.userName,
        Real_Name : this.addList.realName, 
        Role_Id: this.addList.roleId,
        Phone:this.addList.phone,
        Email:this.addList.email,
        Password1:this.addList.password,
        //roleName:this.roleName
        
      
      });
      console.log(data);
      console.log(this.addList.email);

      that.axios({
        method: "post",
        url: "http://127.0.0.1:8082/newStaff/addlist",
        data: data
      });
       this.$message.success("提交成功");
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
      
      var that = this;
      var data = Qs.stringify({
        username: "",
        User_Name: this.form.userName,
        Phone:this.form.phone,
        Email:this.form.email,
        Password:this.form.passWord,
      });
      console.log(data);
      //console.log(this.addList.email);

      that.axios({
        method: "post",
        url: "http://127.0.0.1:8082/newStaff/editlist",
        data: data
      });
      // this.$message.success("提交成功");
      //this.tableData.push(this.form);
      //this.form = {};
      console.log(this.form);
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
  height: 30px;
 
}
.box {
  font-size: 24px;
}
 .biaoti {
    font-size: 18px;
    color: #303133;
  }

</style>

