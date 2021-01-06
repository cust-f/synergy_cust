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
                 <el-button @click="storeAdd(1)" type="primary" size="primary">新增</el-button>
            </div>           
            <!---->
            <el-table
                :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                border
                class="table"
                ref="multipleTable"
                :default-sort="{prop: 'storeName,storeAddress,contacter,telephone,totalStock', order: 'descending'}"
                header-cell-class-name="table-header"
            >
                <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="storeName" label="仓库名称" width="150" sortable></el-table-column>
                <el-table-column prop="storeAddress" label="仓库地址" width="250" sortable></el-table-column>
                <el-table-column prop="contacter" label="联系人" width="100" sortable></el-table-column>
                <el-table-column prop="telephone" label="联系电话" width="150" sortable></el-table-column>
                <el-table-column prop="totalStock" label="总库存" width="80" sortable></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="storeAdd(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="storeDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
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
            <el-dialog title :visible.sync="storeAddTC" width="700px">
                <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;" id="storeTCK" v-html ="storeTCKTitle"></div>
                <br>
                <el-form ref="storeFormAdd" label-width="110px" class="box" :rules="storeRulesAdd" :model="storeFormAdd">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="仓库名称" prop="storeNameAdd">
                                <el-input v-model="storeFormAdd.storeNameAdd"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="仓库地址" prop="storeAddressAdd">
                                <el-input v-model="storeFormAdd.storeAddressAdd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="联系人" prop="contacterAdd">
                                <el-input v-model="storeFormAdd.contacterAdd"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="联系电话" prop="telephoneAdd">
                                <el-input v-model="storeFormAdd.telephoneAdd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="storeAddTC = false">取 消</el-button>
                    <el-button type="primary" @click="storeEdit('storeFormAdd')">确 定</el-button>
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
      tableData: [], 
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

      storeID:'',
      storeAddTC:false,
      storeFormAdd:{
        storeIdAdd : '',
        storeNameAdd : '',
        storeAddressAdd : '',
        contacterAdd : '',
        telephoneAdd : '',
        totalStockAdd : '',
      },
      //新增仓库 数据验证
      storeRulesAdd:{
        storeNameAdd:[
          {required: true, message: '请输入仓库名称', trigger: 'blur'},
          { min: 1, max: 20, message: "请输入长度在 1 到 20 个字符的名称", trigger: "blur" },
        ],
        storeAddressAdd:[
          {required: true, message: '请输入仓库地址', trigger: 'blur'},
           { min: 1, max: 50, message: "请输入长度在 1 到 50 个字符的地址", trigger: "blur" },
        ],
        contacterAdd:[
          {required: true, message: '请输入联系人', trigger: 'blur'},
          {min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的联系人", trigger: "blur"},
        ],
        telephoneAdd:[
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern:/^1\d{10}$/, message: "请输入正确的联系电话", trigger: "blur"},
        ],
      },
      storeTCKTitle:"新增还是弹出呢",
      storeEditUrl:'',

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
          url: "/api/StoreHouse/selectStorehouseAll",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
        //   console.log(response);
          this.tableData = response.data.allData;
         this.handleSearchByStoreName();
        //   this.$refs.configurationTable.$el.style.width = "100%";
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
          url: "/api/StoreHouse/selectStorehouseByStoreName",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          this.tableData = response.data.allData;
        });
    },

    //新增弹出
    storeAdd(row){
        this.storeFormAdd.storeIdAdd = row.storeId;
        this.storeFormAdd.storeNameAdd = row.storeName;
        this.storeFormAdd.storeAddressAdd = row.storeAddress;
        this.storeFormAdd.contacterAdd = row.contacter;
        this.storeFormAdd.telephoneAdd = row.telephone;
        this.storeFormAdd.totalStockAdd = row.totalStock;
        //1是新增，否则是修改
        if(row == 1){
            this.storeTCKTitle = "新增仓库信息";
            this.storeEditUrl = "/api/StoreHouse/addStorehouse";
            // this.storeFormAdd = {};
        }
        else{
            this.storeTCKTitle = "修改";
            this.storeEditUrl = "/api/StoreHouse/updateStorehouseById";
            // this.storeFormAdd = row;
        }
        this.storeAddTC = true;
        
    },
    
    //仓库数据 新增或修改
    storeEdit(row){
        this.$refs.storeFormAdd.validate((valid) => {
        if(valid){
            var that = this;
            var data = Qs.stringify({
                username : this.usernameX,
                storeId: this.storeFormAdd.storeIdAdd,
                storeName : this.storeFormAdd.storeNameAdd,
                storeAddress : this.storeFormAdd.storeAddressAdd,
                contacter : this.storeFormAdd.contacterAdd,
                telephone : this.storeFormAdd.telephoneAdd,
                totalStock : this.storeFormAdd.totalStockAdd,
            });
            that
            .axios({
                method: "post",
                url: this.storeEditUrl,
                data: data,
            })
            .then((response) => {
                if (response.data == "成功") {
                    if(this.storeTCKTitle == "新增仓库信息"){
                        this.$message.success("新增仓库信息成功");
                    }
                    else{
                        this.$message.success("修改仓库信息成功");
                    }
                    this.storeAddTC = false;//弹出框消失
                    that.getData();//重新加载数据
                    let arr = this.storeFormAdd;
                    array.forEach(element => {
                        element = '';
                    });
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
        }
        else{
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，填写后再提交",
          });
        }
        })
    },

    //仓库数据 单行删除
    storeDelete(index,row){
         var that = this;
        this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }) .then(() => {   
         that
        .axios({
           method: "post",
           url: "/api/StoreHouse/deleteStorehouseById",
           data: data,
           headers: { "Content-Type": "application/x-www-form-urlencoded" },
         })
        .then((response) => {
            if (response.data == "成功") {
                this.$message.success("删除仓库信息成功");
                this.getData();
              }
        })
        .catch((error) => {
          console.log(error);
      });
         
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
     
        var data = Qs.stringify({
            storeId: row.storeId,
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
.table {
  display: table-cell !important;
  width: 970px; 
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
  font-size: 14px;
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