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
          >&nbsp;&nbsp;人员管理</div>
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                <el-input v-model="selectName" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

                <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button>
              </div>
              <div class="box">
                <el-table
                  :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"

                  row-style="height:0"
                  cell-style="padding:0"
                >
                  <el-table-column prop="userId" label="序号" width="55" align="center" type="index"></el-table-column>

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





<script>
import Qs from "qs";
export default {
  name: "newStaff",
  data() {
    return {
      usernamex: localStorage.getItem("ms_username"),
      //userId:row.userId,
    
        pageIndex: 1,
        pageSize: 7,
      
      tableData: [
        {
          
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: ""
        },
        {
          
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: ""
        },
        {
          
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: ""
        },
        {
          
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: ""
        },
        {
          
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: ""
        },
        {
          
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: ""
        },
        {
          
          userName: "",
          realName: "",
          email: "",
          roleId: "",
          phone: ""
        },
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
      form: {
        taskId:"",
        userName:"",
        phone:"",
        email:"",
        password:"",

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
        role: ""
      },
      value: "",
      Id:"",
      selectName:"",
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
        userName: this.usernamex
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/newStaff/list",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
        
    },
    // 触发搜索按钮
    handleSearch() {
       var that = this;
      var data = Qs.stringify({
        UserName:this.usernamex,
        userName: this.selectName
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/newStaff/selectStaff",
          data: data

          //  data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });

      this.$set(this.selectName, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      var that= this;
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type: "warning"
      }).then(()=>{
        this.$message({
        type:'success',
        message:'删除成功！'
        })
      }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      var data = Qs.stringify({
      userId:row.userId
      });
     that.axios({
          method: "post",
          url: "http://127.0.0.1:8081//newStaff/deletelist",
          data: data
          //  data:this.$store.state.userName
        })
        .then(
           response => {
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
    saveAdd() {
       var that = this;
      var data = Qs.stringify({
        userName:"supplier" ,
        User_Name: this.addList.userName,
        Real_Name : this.addList.realName, 
        Role_Id: this.addList.roleId,
        Phone:this.addList.phone,
        Email:this.addList.email,
        Password1:this.addList.password,
        //roleName:this.roleName
      
      });
      console.log(data);
      //console.log(this.addList.email);

      that.axios({
        method: "post",
        url: "http://127.0.0.1:8081/newStaff/addlist",
        data: data
      });
       this.$message.success("提交成功");
      this.tableData.push(this.addList);
      console.log(this.addList);
      this.addList = {};
      this.addVisible = false;
    },
    // 编辑操作
    handleEdit(index,row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
      this.Id = row.userId;
      console.log(Id);
    },
    // 保存编辑
    saveEdit() {
      
      var that = this;
      var data = Qs.stringify({
        userId : this.Id,
        User_Name: this.form.userName,
        Phone:this.form.phone,
        Email:this.form.email,
        Password:this.form.password,
        //userId:row.userId
      });
      console.log(data);
      //console.log(this.addList.email);

      that.axios({
        method: "post",
        url: "http://127.0.0.1:8081/newStaff/editlist",
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

     handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },

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

