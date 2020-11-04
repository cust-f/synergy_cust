<template>
  <div class="mainStaskShow">
    <el-container>
      <el-main>
        <div
          class="biaoti"
          style="padding: 0 10px; border-left: 3px solid #4e58c5"
        >
          内部修改
        </div>
        <!-- <el-divider></el-divider> -->
        <br />
        <div class="container">
          <div class="handle-box">
            <el-input
              v-model="selectname"
              placeholder="企业名称"
              class="handle-input mr10"
            ></el-input>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="updateRegisterTime">修改企业register时间</el-button>
          </div>
          <el-table
            :data="
              tableData"
            border
            class="table"
            ref="multipleTable"
            :default-sort="{
              prop:
                'taskState,publishTime,time,mainTaskName,taskCategoryMain,principalName',
              order: 'descending',
            }"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              label="序号"
              type="index"
              width="50"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="companyName"
              label="企业名称"
              sortable
            ></el-table-column>
            <el-table-column
              prop="businessName"
              label="企业联络人"
              sortable
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="businessTel"
              label="企业联络电话"
              sortable
            ></el-table-column>
            <el-table-column
              prop="email"
              label="企业邮箱"
              sortable
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="xiugai(scope.row)" type="text" size="small"
                  >修改</el-button
                >
              </template>
            </el-table-column>
          </el-table>


          <div class="consignment">
            <el-dialog title :visible.sync="bianjiTC" width="50%">
              <div
                class="biaoti"
                style="padding: 0 10px; border-left: 3px solid #4e58c5"
              >
                修改联络信息
              </div>
              <br />
              <el-form ref="form" label-width="110px" class="box">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="企业名称">
                      <el-input v-model="companyName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="企业联络人">
                      <el-input v-model="businessName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="企业联络电话">
                      <el-input v-model="businessTel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="企业邮箱">
                      <el-input v-model="email"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="bianjiTC = false">取 消</el-button>
                <el-button type="primary" @click="savecompany">确 定</el-button>
              </span>
            </el-dialog>
          </div>

          <div class="consignment">
            <el-dialog title :visible.sync="updateTime" width="50%">
              <div
                class="biaoti"
                style="padding: 0 10px; border-left: 3px solid #4e58c5"
              >
                修改时间（时间格式例子2020-01-01）
              </div>
              <br />
              <el-form ref="form" label-width="110px" class="box">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="开始时间">
                      <el-input v-model="startTime"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="结束时间">
                      <el-input v-model="endTime"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="开始企业id">
                      <el-input v-model="startcompanyId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="改变企业个数">
                      <el-input v-model="companyNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="updateTime = false">取 消</el-button>
                <el-button type="primary" @click="saveall">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import Qs from "qs";

export default {
  name: "hidden",
  data() {
    return {
      startTime:"",
      companyNum:"",
      endTime:"",
      startcompanyId:"",
      companyId:"",
      companyName:"",
      businessName:"",
      businessTel:"",
      email:"",
      //修改弹窗
            bianjiTC: false,
      //修改时间
      updateTime:false,
      usernameX: sessionStorage.getItem("ms_username"),
      pageIndex: 1,
      pageSize: 10,
      activeName: "first",
      tableData: [
      ],
      addList: {
        id: null,
        address: "",
        name: "",
        money: null,
        state: null,
        date: null
      },
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      dialogVisible: false,
      userName: "123",
      mainTaskID: "",
      selectname: ""
    };
  },


  // Vue.filter("moment", function (value, formatString)
  // {
  //   formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  //   return moment(value).format(formatString);
  //   });
  created() {
    this.getData();
    this.GetTime(date);
  },
  methods: {
    GetTime(date) {
      var datee = new Date(date).toJSON();
      return new Date(+new Date(datee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },

    getData() {
      var that = this;
      var data = Qs.stringify({
        
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/selectAllCompany",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },

    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        companyName : this.selectname
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/selectByCompanyName",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          this.tableData = response.data.allData;
        });

      //this.getData();
    },
    updateRegisterTime(){
      this.updateTime=true
    },
    //审核不通过的原因
    open() {
      this.$prompt("请输入审核不通过原因", "提示", {
        confirmButtonText: "修改提交",
        cancelButtonText: "任务废除"
      });
    },
    onSubmit() {
    },
    handleDelete(index, row) {
    },

    handleClick(tab, event) {
    },

    xiugai(row) {
      console.log(row.companyId)
      this.bianjiTC= true;
      var that = this;
      var data = Qs.stringify({
        companyID: row.companyId,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/selectByCompany",
          data: data
        })
        .then(response => {
          console.log(response);
          this.companyName = response.data.allData[0].companyName;
      this.businessName = response.data.allData[0].businessName;
      this.businessTel =response.data.allData[0].businessTel;
      this.email= response.data.allData[0].email;
      this.companyId = response.data.allData[0].companyId;
       console.log("companyID为"+this.companyId)
        });
    },
    savecompany(){
      console.log("companyID为"+this.companyId)
      this.bianjiTC= true;
      var that = this;
      var data = Qs.stringify({
        companyId :this.companyId,
        businessName : this.businessName,
        businessTel :this.businessTel,
        email:this.email,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/updateall",
          data: data
        })
        .then(response => {
          console.log(response);
          this.bianjiTC = false;
          this.$message({
          message: "修改成功",
          type: "success",
        });
        });
    },
    saveall(){
      var that = this;
      var data = Qs.stringify({
        startTime:this.startTime,
        endTime:this.endTime,
        companyID:this.startcompanyId,
        companyNum:this.companyNum
      });
      console.log("测试"+data)
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/randomTime",
          data: data
        })
        .then(response => {
          console.log(response);
          this.updateTime = false;
          this.$message({
          message: "修改成功",
          type: "success",
        });
        });
    },
    chick() {
      this.$router.push("/admin/check/review");
    },

    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },

    handleSelectionChange(val) {
    }
  },
  // 获取 easy-mock 的模拟数据
  getData() {
    //   this.tableData = res.list;
    //   this.pageTotal = tableData.length;
  },
  // 触发搜索按钮

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

  /*
   *转跳对应任务信息页面
   */
};
</script>
<style  lang="scss">
.el-dialog__header {
    padding: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
}
.mainStaskShow {
  /* .table {
  font-size: 16px;
} */
  .handle-box {
    margin-bottom: 20px;
  }
  /* 
.handle-box {
  margin-bottom: 20px;
} */

  .handle-select {
    width: 120px;
  }
  .table123 {
    display: table-cell !important;
    /* width: 100%; */
    font-size: 14px;
  }
  .handle-input {
    width: 260px;
    display: inline-block;
  }

  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }

  .box {
    font-size: 24px;
  }
  .container {
    padding: 0px;
  }
  .biaoti {
    font-size: 18px;
  }
}
</style>
