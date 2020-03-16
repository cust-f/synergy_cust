<template>
  <div>
    <el-container>
      <el-main>
        <div class="box">
          <h3>企业管理</h3>
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">删除</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del mr10" @click="addData">增加</el-button>
                <el-input v-model="query.Province" placeholder="所在省" class="handle-input mr10"></el-input>
                 <el-input v-model="query.City" placeholder="所在市" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">筛选</el-button>

                
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
                  <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
                  <el-table-column prop="Company_Name" label="企业名称"></el-table-column>
                  <el-table-column prop="Company_Category" label="企业类别"></el-table-column>
                  <el-table-column prop="Founding_Time" label="成立时间"></el-table-column>
                  <el-table-column prop="Province" label="所在省"></el-table-column>
                  <el-table-column prop="City" label="所在市"></el-table-column>
                  <el-table-column prop="Office_Number" label="办公电话"></el-table-column>

                  <el-table-column label="操作" width="60" align="center">
                    <template slot-scope="scope">
                       <el-button @click="businessDetail" type="text">详情</el-button>
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

            <!-- 新增弹出框 -->
            <el-dialog title="企业信息" :visible.sync="addVisible" width="50%">
              <el-form ref="form" :model="addList" label-width="70px">
                <el-form-item label="企业名称">
                  <el-input v-model="addList.Company_Name"></el-input>
                </el-form-item>
                <el-form-item label="企业类别">
                  <el-input v-model="addList.Company_Category"></el-input>
                </el-form-item>

                  <el-form-item label="成立时间">
                <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addList.Founding_Time"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
                ></el-date-picker>
                </el-form-item>
                <el-form-item label="所在省">
                  <el-input v-model="addList.Province"></el-input>
                </el-form-item>
                <el-form-item label="所在市">
                  <el-input v-model="addList.City"></el-input>
                </el-form-item>
                <el-form-item label="办公电话">
                  <el-input v-model="addList.Office_Number"></el-input>
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
  name: "managerBusiness",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },

      addList: {
        id: 1,
        Company_Name: "",
        Company_Category: "",
        Founding_Time: "",
        Province: "",
        City: "",
        Office_Number: ""
      },
      tableData:[{
        Company_Name: "电子科技有限公司",
        Company_Category: "1",
        Founding_Time: "2009-09-08",
        Province: "吉林省",
        City: "长春市",
        Office_Number: "17847778888"
      }],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,

      addForm: {
        Company_Name: "",
        Company_Category: "",
        Founding_Time: "",
        Province: "",
        City: "",
        Office_Number: ""
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
   
      /*
      *转跳对应任务信息页面
      */
     businessDetail(){
         this.$router.push('/admin/businessDetail')
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
        userName: "aaaa",
        Company_Name: this.addList.Company_Name,
        Company_Category: this.addList.Company_Category,
        Founding_Time: this.addList.Founding_Time,
        Province: this.addList.Province,
        City: this.addList.City,
        Office_Number: this.addList.Office_Number,
      });
      console.log(data);
      console.log(this.addList.company);

      that
      .axios({
        method: "post",
        url: "http://127.0.0.1:8082/companyDetail/addCompanyInformation",
        data: data
      });

      this.$message.success("提交成功");
            this.addVisible = false;

      this.tableData.push(this.addList);
      this.addList = {};
      }
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
    // // 删除操作
    // handleDelete(index, row) {
    //   // 二次确认删除
    //   this.$confirm("确定要删除吗？", "提示", {
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$message.success("删除成功");
    //       this.tableData.splice(index, 1);
    //     })
    //     .catch(() => {});
    // },
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
    // //新增操作
    // addData() {
    //   this.addVisible = true;
    // },
    // //保存新增
    // saveAdd() {
    //   this.tableData.push(this.addList);
    //   console.log(this.addList);
    //   this.addList = {};
    //   this.addVisible = false;
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