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
            <!-- <el-select v-model="Role_Name" placeholder="角色名称" class="handle-input mr10">
              <el-option label="系统管理员" value="0"></el-option>
              <el-option label="企业管理员" value="1"></el-option>
              <el-option label="设计师" value="2"></el-option>
              <el-option label="流通人员" value="3"></el-option>
            </el-select> -->
            <el-input v-model="User_Name" placeholder="账户名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </div>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            :default-sort="{prop: 'userName', order: 'descending'}"
            @selection-change="handleSelectionChange"
          >
                <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名称" sortable width="130" align="center"></el-table-column>
                <el-table-column prop="companyName" label="企业名称" width="180" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center">
                   <template slot-scope="{row: {roleName}}">
                          <span v-if="+roleName===1">管理员</span>
                          <span v-else-if="+roleName===2">核心企业</span>
                          <span v-else-if="+roleName=== 3">供应商</span>
                          <span v-else-if="+roleName=== 4">设计人员</span>
                          <span v-else-if="+roleName=== 5">流通人员</span>
                </template></el-table-column>
                <el-table-column prop="email" label="邮箱" width="120" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系方式" width="120" align="center"></el-table-column>
                <!-- <el-table-column prop="password" label="用户密码" align="center"></el-table-column> -->

                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                     <el-button type="text" size="small" @click="chushihuamima(scope.row)">初始化密码</el-button>
                    <el-button @click="handleDelete(scope.row.userId)" type="text" size="small">删除</el-button>
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
                  <el-input v-model="addList.userName"></el-input>
                </el-form-item>
                <el-form-item label="企业名称">
                 <el-select v-model="addList.companyName" style="width:100%" placeholder="请选择">
                    <el-option  v-for="item in optionsCompany"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyName"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色名称">
                  <el-select v-model="addList.roleName" style="width:100%" placeholder="请选择">
                    <el-option  v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="真实姓名">
                  <el-input v-model="addList.realName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="addList.phone" @blur="animate()"></el-input>
                </el-form-item>
                 <!-- <el-form-item label="用户密码">
                  <el-input v-model="addList.password"></el-input>
                </el-form-item> -->
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
      value:'1',
      label:'管理员',
      },{
      value:'2',
      label:'核心企业',
      },{
      value:'3',
      label:'供应商',
      },{
      value:'4',
      label:'设计人员',
      },{
      value:'5',
      label:'流通人员',
      }],
      optionsCompany:[],
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      User_Name:"",
      addList: {
        id: "1",
        userName: "",
        company_Name: "",
        roleName: "",
        email: "",
        phone: "",
        password: ""
      },

      tableData:[],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
    
      addForm: {
        userName: "",
        companyName: "",
        roleName: "",
        email: "",
        phone: "",
        // password: ""
      },
      value: ""
    };
  },
  created() {
    this.getData();
    this.getCompanyName();
  },
  methods: {

    getCompanyName(){
      var that = this;
      this.axios({
        method:"get",
        url:"http://127.0.0.1:8082/user/findCompanyName"
      }).then(response=>{
        console.log(response);
        that.optionsCompany = response.data
      })
    },

    getData() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/user/getAllUser"
        })
        .then(response => {
          
         that.pageTotal=response.data.allData.totalCount;//绑定总的条数
         that.tableData=response.data.allData.userList;//绑定对象数组
        });
    },
      
      handleSearch() {
      console.log(this.User_Name);
      var that = this;
      var data = Qs.stringify({
        username: this.User_Name
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/user/selectUser",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          // console.log(response);
          this.tableData = response.data.allData;
        });
    },
     //手机号校验
       animate(){
           var re = /^1\d{10}$/;
           let str = this.addList.phone;
           if(re.test(str)){
              //  alert('成功')
           }else {
               this.addList.phone = "";
               alert('抱歉联系方式不合法')

          }
       },
    chushihuamima(row){
      var that = this;
      var data = Qs.stringify({
        userId: row.userId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/user/updatePassword",
          data: data
        })
        .then(response => {         
           this.$message.success("初始化密码成功");          
          this.tableData.splice(index, 1);
           center: true;
        });
    },
  
    // 删除操作
      handleDelete(index) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
        this.axios({
          method: "get",
          url: "http://127.0.0.1:8082/user/delectUser?userID=" +index ,     
        })
         .then(response => {      
           this.$message.success("删除成功");          
          this.tableData.splice(index, 1); 
              location.reload();
        });
        })
        .catch(() => {});
   
    },
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
        userName: "admin",
        User_Name: this.addList.userName,
        Company_Name: this.addList.companyName,
        Role_Name: this.addList.roleName,
        Email: this.addList.email,
        Phone: this.addList.phone,
        Password: this.addList.password,
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
    //分页导航 分页查询使用
    handlePageChange(val) {
      let that = this;
      var data = Qs.stringify({
        page: val - 1
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/user/getAllUser",
          data: data
        })
        .then(response => {
          console.log(response);
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