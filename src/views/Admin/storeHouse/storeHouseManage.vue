<template>
  <div class="storeHouseManage">
    <el-container>
      <el-main>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">仓库管理</div>
        <br>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="selectStoreName" placeholder="仓库名称" class="handle-input mr10"></el-input>
                <el-button type="primary" @click="handleSearchByStoreName">搜索</el-button>
            </div>
            <el-button @click="storeAdd" type="primary" size="small">新增</el-button>
            <br><br>
            <!---->
            <el-table
                :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                border
                class="table"
                ref="multipleTable"
                :default-sort="{prop: 'storeName,storeAddress,storeContacter,storeTelephone', order: 'descending'}"
                header-cell-class-name="table-header"
            >
                <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="storeName" label="仓库名称" width="150" sortable></el-table-column>
                <el-table-column prop="storeAddress" label="仓库地址" width="250" sortable></el-table-column>
                <el-table-column prop="storeAddress" label="总库存" width="100" sortable></el-table-column>
                <el-table-column prop="storeContacter" label="联系人" align="center" width="100" sortable></el-table-column>
                <el-table-column prop="storeTelephone" label="联系电话" width="150" sortable></el-table-column>
                <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                        <el-button @click="storeEdit(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="storeDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!---->
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
        </div>

        <!-- 新增仓库 弹出框 -->
        <div class="consignment">
            <el-dialog title :visible.sync="storeAddTC" width="50%">
                <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">新增仓库</div>
                <br>
                <el-form ref="storeFormAdd" label-width="110px" class="box" :rules="storeRulesAdd" :model="storeFormAdd">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="仓库名称" prop="storeName">
                                <el-input v-model="storeFormAdd.storeName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="仓库地址" prop="storeAddress">
                                <el-input v-model="storeFormAdd.storeAddress"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="联系人" prop="storeContacter">
                                <el-input v-model="storeFormAdd.storeContacter"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="联系电话" prop="storeTelephone">
                                <el-input v-model="storeFormAdd.storeTelephone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="StoreAddTC = false">取 消</el-button>
                    <el-button type="primary" @click="consignmentSaveNew('consignmentForm2')">确 定</el-button>
                </span>
            </el-dialog>
        </div>

      </el-main>
    </el-container>
  </div>
</template>


<script>
import Qs from "qs";

export default {
  name: "storeHouseManage",
  data() {
    return {
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
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      dialogVisible: false,
      userName: "123",
      mainTaskID: "",
      selectStoreName: "",

      storeID:"",

      storeAddTC:false,
      storeFormAdd:[],
            //新增流通清单 数据验证
      storeRulesAdd:{
        storeName:[
          {required: true, message: '请输入仓库名称', trigger: 'blur'},
          { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的名称", trigger: "blur" },
        ],
        storeAddress:[
          {required: true, message: '请输入仓库地址', trigger: 'blur'},
           { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的规格", trigger: "blur" },
        ],
        storeContacter:[
          {required: true, message: '请输入联系人', trigger: 'blur'},
          {pattern:/^\d{1,9}$/, message: "请输入长度为 1 到 9 个字符的整数", trigger: "blur"},
        ],
        storeTelephone:[
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern:/^1\d{10}$/, message: "请输入正确的联系电话", trigger: "blur"},
        ],
      },
    };
  },

  created() {
    this.getData();
  },
  
  methods: {
    //获取仓库数据
    getData() {
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/StoreHouse/selectStorehouseByName",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          //console.log(response);
          this.tableData = response.data.allData;
          this.$refs.configurationTable.$el.style.width = "100%";
        });
    },

    //搜索按钮功能-根据仓库名称查找数据
    handleSearchByStoreName() {
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        storeName: this.selectStoreName
      });
      that
        .axios({
          method: "post",
          url: "/api/storeHouse/selectStorehouseByName",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          this.tableData = response.data.allData;
        });
    },

    //新增弹出
    storeAdd(){
        this.storeAddTC=true;
    },

    //仓库数据 编辑弹出
    storeEdit(row){

    },
    //仓库数据 单行删除
    storeDelete(row){
        var that = this;
        var data = Qs.stringify({
            storeID: row.storeID,
        });
        that
        .axios({
           method: "post",
           url: "/api/storeHouse/deleteStorehouseById",
           data: data,
           headers: { "Content-Type": "application/x-www-form-urlencoded" },
         })
        .then((response) => {
            if (response.data == "成功") {
                this.$message.success("删除仓库信息成功");
              }
        })
        .catch((error) => {
          console.log(error);
      });
    },

    //分页相关
    chick() {
      this.$router.push("/admin/check/review");
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },
    handleSizeChange(psize) {
      this.pageSize = psize;
    },
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
.storeHouseManage{
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
.consignment{
  .el-dialog__body {
    padding-right: 0px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .el-dialog__header {
    padding-right: 0%;
    padding-top: 0%;
    padding-bottom: 0%;
  }
   .el-dialog__footer {
    padding-right: 40px;
    padding-top: 0px;
  }
}
</style>

</style>
