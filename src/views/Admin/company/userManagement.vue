<template>
  <div class="userManagement">
    <el-container>
      <el-main>
        <div font-size="24px">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">用户管理</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        </div>

        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">删除</el-button> -->
                <el-button
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  class="handle-del mr10"
                  @click="addData"
                >新增</el-button>
                <el-input v-model="User_Name" placeholder="账户名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
              </div>
               
              <el-table
                :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                border
                class="table"
                ref="configurationTable"
                header-cell-class-name="table-header"
                :default-sort="{prop: 'userName', order: 'descending'}"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="序号" type="index" width="70" align="center">
                  <template slot-scope="scope">
                    <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="userName" label="用户名称" sortable width="120" align="center"></el-table-column>
                <el-table-column
                  prop="companyName"
                  label="企业名称"
                  sortable
                  width="180"
                  align="center"
                ></el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="130" sortable align="center">
                  <!-- <template slot-scope="{row: {roleName}}">
                    <span v-if="+roleName===1">管理员</span>
                    <span v-else-if="+roleName===2">核心企业</span>
                    <span v-else-if="+roleName=== 3">供应商</span>
                    <span v-else-if="+roleName=== 4">设计人员</span>
                    <span v-else-if="+roleName=== 5">流通人员</span>
                  </template> -->
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="160" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.email===''">无</span>
                    <span v-else>{{ scope.row.email }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" width="120" align="center"></el-table-column>
                <!-- <el-table-column prop="password" label="用户密码" align="center"></el-table-column> -->

                <el-table-column label="操作" width="140" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="chushihuamima(scope.row)">初始化密码</el-button>
                    <el-button @click="handleDelete(scope.row.userId)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next, sizes, total, jumper"
                :current-page="pageIndex"
                :page-size="pageSize"
                :total="tableData.length"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </div>

            <!-- 新增弹出框 -->
            <el-dialog title="用户信息" :visible.sync="addVisible" width="50%">
              <el-form ref="form" :model="addList" label-width="70px">
                <el-form-item label="账号名称">
                  <el-input v-model="addList.userName" @blur="animate1()"></el-input>
                   <font color="red">
                    <el-span v-if="this.addList.userName === null">您输入的账号名称重复</el-span>
                  </font>
                </el-form-item>
                <el-form-item label="企业名称">
                  <el-select v-model="addList.companyName" style="width:100%" placeholder="请选择">
                    <el-option
                      v-for="item in optionsCompany"
                      :key="item.companyId"
                      :label="item.companyName"
                      :value="item.companyName"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色名称">
                  <el-select v-model="addList.roleName" style="width:100%" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="真实姓名">
                  <el-input v-model="addList.realName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="addList.phone" @blur="animate()"></el-input>
                  <font color="red">
                    <el-span v-if="this.addList.phone === null">您输入的联系方式格式不正确</el-span>
                  </font>
                </el-form-item>
                <!-- <el-form-item label="用户密码">
                  <el-input v-model="addList.password"></el-input>
                </el-form-item>-->
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAdd">确 定</el-button>
                <el-button @click="quxiao">取 消</el-button>
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
      options: [
        {
          value: "1",
          label: "管理员"
        },
        {
          value: "2",
          label: "核心企业"
        },
        {
          value: "3",
          label: "供应商"
        },
        {
          value: "4",
          label: "设计人员"
        },
        {
          value: "5",
          label: "流通人员"
        }
      ],
      optionsCompany: [],

      pageIndex: 1,
      pageSize: 10,

      User_Name: "",
      addList: {
        id: "1",
        userName: "",
        company_Name: "",
        roleName: "",
        email: "",
        phone: "",
        password: ""
      },

      tableData: [],
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
        phone: ""
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
    getCompanyName() {
      var that = this;
      this.axios({
        method: "get",
        url: "/api/user/findCompanyName"
      }).then(response => {
        console.log(response);
        that.optionsCompany = response.data;
      });
    },

    getData() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/user/getAllUser"
        })
        .then(response => {
          that.pageTotal = response.data.allData.totalCount; //绑定总的条数
          that.tableData = response.data.allData.userList; //绑定对象数组
          console.log(this.tableData);
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
          url: "/api/user/selectUser",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          // console.log(response);
          this.tableData = response.data.allData;
        });
    },
    //手机号校验
    animate() {
      var re = /^1\d{10}$/;
      let str = this.addList.phone;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.addList.phone = null;
      }
    },
        animate1() {
        var that = this;
        var data = Qs.stringify({
        userName: "admin",
        User_Name: this.addList.userName,
        Company_Name: this.addList.companyName,
        Role_Name: this.addList.roleName,
        Email: this.addList.email,
        Phone: this.addList.phone,
        Password: this.addList.password
      });
      console.log(data);
      

      that
        .axios({
          method: "post",
          url: "/api/user/addUserInformation",
          data: data
        })
        .then(response => {
          console.log(response);
          if (response.data == "成功") {
                        console.log("nihaome");
          } else {
            console.log("nihao");
            this.addList.userName = null;
          }
        });

    },
    chushihuamima(row) {
      var that = this;
      var data = Qs.stringify({
        userId: row.userId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/user/updatePassword",
          data: data
        })
        .then(response => {
          this.$message.success("初始化密码成功");
          this.tableData.splice(index, 1);
          center: true;
        });
    },
    quxiao() {
      this.addVisible = false;
      this.addList = {};
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
            url: "/api/user/delectUser?userID=" + index
          }).then(response => {
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
      });
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
        Password: this.addList.password
      });
      console.log(data);
      console.log(this.addList.user);

      that
        .axios({
          method: "post",
          url: "/api/user/addUserInformation",
          data: data
        })
        .then(response => {
          console.log(response);
          if (response.data == "成功") {
            this.$message.success("提交成功");
            this.addVisible = false;
          } else {
            this.$message.success("提交失败");
            this.addVisible = false;
          }
        });

      this.tableData.push(this.addList);
      this.addList = {};
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },

    handleSelectionChange(val) {
      console.log(val);
    }
  
  }
};
</script>

<style lang="scss">
.userManagement  .el-main{
 padding: 0px;
}
.userManagement {
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
  display: table-cell !important;
  /* width: 100%; */
  font-size: 14px;
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
.el-pagination {
  text-align: center;
}

}

</style>