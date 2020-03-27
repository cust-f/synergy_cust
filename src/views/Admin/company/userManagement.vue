<template>
  <div>
    <el-container>
      <el-main>
        <div class="box">
          <h3>用户管理</h3>
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                
                <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">删除</el-button> -->
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del mr10" @click="addData">新增</el-button>
                <!-- <el-select v-model="Company_Name" placeholder="企业名称" class="handle-input mr10"></el-select> -->
            <el-select v-model="User_Name" placeholder="账号名称" class="handle-input mr10"></el-select>
            <el-select v-model="Role_Name" placeholder="角色名称" class="handle-input mr10">
              <el-option label="需求方" value="1"></el-option>
              <el-option label="供应商" value="2"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="choose">搜索</el-button>
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
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="User_Name" label="账号名称" width="108" align="center"></el-table-column>
            <el-table-column prop="Company_Name" label="企业名称" align="center"></el-table-column>
            <el-table-column prop="Role_Name" label="角色名称" width="108" align="center">
            </el-table-column>
            <el-table-column prop="Email" label="邮箱" width="160" align="center"></el-table-column>
            <el-table-column prop="Phone" label="联系方式" width="160" align="center"></el-table-column>
            <el-table-column prop="Password" width="108" label="用户密码" align="center"></el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                <el-button type="text" size="small">初始化密码</el-button>
               <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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


          <!-- 新增弹出框 -->
            <el-dialog title="用户信息" :visible.sync="addVisible" width="50%">
              <el-form ref="form" :model="addList" label-width="70px">
                <el-form-item label="账号名称">
                  <el-input v-model="addList.User_Name"></el-input>
                </el-form-item>
                <el-form-item label="企业名称">
                  <el-input v-model="addList.Company_Name"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                  <el-select v-model="addList.Role_Name" style="width:100%" placeholder="请选择">
                    <el-option  v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="addList.Email"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="addList.Phone"></el-input>
                </el-form-item>
                 <el-form-item label="用户密码">
                  <el-input v-model="addList.Password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAdd">确 定</el-button>
                <el-button @click="addVisible = false">取 消</el-button>               
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
  name: "userManagement",
  data() {
    return {
      options:[{
      value:'需求方',
      label:'需求方',
      },{
      value:'供应商',
      label:'供应商',
      }],
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      addList: {
        id: 1,
        User_Name: "",
        Company_Name: "",
        Role_Name: "",
        Email: "",
        Phone: "",
        Password: ""
      },

      tableData:[{
        User_Name: "admin",
        Company_Name: "长春第一汽车制造厂",
        Role_Name: "需求方",
        Email: "1233455@qq.com",
        Phone: "18899228333",
        Password: "123"
      }],

      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
    
      addForm: {
        User_Name: "",
        Company_Name: "",
        Role_Name: "",
        Email: "",
        Phone: "",
        Password: ""
      },
      value: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // getData(){
    //   //this.tableData=null
    // },      
     //新增操作
    addData() {
      this.addVisible = true;
      var that = this;
      var data = Qs.stringify({
        PId: this.type
      })
      },
     //保存新增
    saveAdd() {

      var that = this;
      var data = Qs.stringify({
        userName: "aaaa",
        User_Name: this.addList.User_Name,
        Company_Name: this.addList.Company_Name,
        Role_Name: this.addList.Role_Name,
        Email: this.addList.Email,
        Phone: this.addList.Phone,
        Password: this.addList.Password,
      });
      console.log(data);
      console.log(this.addList.user);

      that
      .axios({
        method: "post",
        url: "http://127.0.0.1:8082/user/addUserInformation",
        data: data
      });

      this.$message.success("提交成功");
            this.addVisible = false;

      this.tableData.push(this.addList);
      this.addList = {};
      },



    // // 获取 easy-mock 的模拟数据
    // getData() {
    //   //   this.tableData = res.list;
    //   //   this.pageTotal = tableData.length;
    // },
    
    // // 触发搜索按钮
    // handleSearch() {
    //   this.$set(this.query, "pageIndex", 1);
    //   this.getData();
    // },
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
    // // 多选操作
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    // delAllSelection() {
    //   let length = this.multipleSelection.length;
    //   let str = "";
    //   for (let j = 0; j < length; j++) {
    //     this.tableData.splice(this.multipleSelection[j], 1);
    //     str += this.multipleSelection[j].name + " ";
    //   }
    //   this.$message.error(`删除了${str}`);
    //   this.multipleSelection = [];
    // },
    
    // // 编辑操作
    // handleEdit(index, row) {
    //   this.idx = index;
    //   this.form = row;
    //   this.editVisible = true;
    // },
    // // 保存编辑
    // saveEdit() {
    //   this.editVisible = false;
    //   this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    //   this.$set(this.tableData, this.idx, this.form);
    // },
    // 分页导航
   // handlePageChange(val) {},

   // /*
    // *转跳对应任务信息页面
   //  */

   // addstaff: function() {
    //  this.addFormVisible = true;
  //  },

  //  open() {
   //   this.$message({
   //     showClose: true,
    //    message: "提交成功",
    //    type: "success"
   //   });
    
  }
}
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