<template>
<div>
    <el-container>
        <el-main>
          <div font-size="24px">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
          供应商列表
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</div>
             &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div>


    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del mr10" @click="addData">新增</el-button>
      </div>

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="businessName" label="企业联络人"></el-table-column>
        <el-table-column prop="email" label="企业邮箱"></el-table-column>
        <el-table-column prop="officeNumber" label="联系人电话"></el-table-column>
        <el-table-column prop="address" label="企业地址"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
           

           <el-button   @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="supplyDetail(scope.row)" type="text" size="small">查看详情</el-button>
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

    <!-- 编辑弹出框 -->
    <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- 新增弹出框 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="60%">
        <el-table
            :data="tableData1"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="businessName" label="企业联络人"></el-table-column>
        <el-table-column prop="email" label="企业邮箱"></el-table-column>
        <el-table-column prop="officeNumber" label="联系人电话"></el-table-column>
        <el-table-column prop="address" label="企业地址"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="TianJia(scope.row)"
            >添加</el-button>
          <el-button @click="supplyDetail" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
        </el-table>
    
    </el-dialog>
              </div>

        </el-main>
    </el-container>
    
    
</div>
      
</template>

<script>
import Qs from "qs";
export default {
  name: "primarysupplyList",
  data() {
    return {
      usernameX:localStorage.getItem("ms_username"),
        query: {
        pageIndex: 1,
        pageSize: 10
        },
        tableData: {
          companyId:"",
          companyName:"",
          businessName:"",
          email:"",
          officeNumber:"",
          address:""
        },
        tableData1: {
          companyId:"",
          companyName:"",
          businessName:"",
          email:"",
          officeNumber:"",
          address:""
        },
       
       
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
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
     getData(){
       var that = this;
        var data = Qs.stringify({
        username: this.usernameX
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/primarysupplyList/show",
          data: data,
          
          // data:this.$store.state.userName
        })
        .then(response => {
          this.tableData = response.data.allData
        });
     },
     TianJia(row){
       var that = this;
       var data = Qs.stringify({
         username:this.usernameX,
         companyId:row.companyId
       })
       that
          .axios({
          method: "post",
          url: "http://127.0.0.1:8082/companyDetail/tianjiaSupplier",
          data: data,
          })
          .then(response => {
              if (response.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.addVisible = false;
          }else{
             this.$message({
                  type: "warning",
                  message: "添加失败"
                });
          }
          });
          location.reload();//刷新当前页面
     },
    handleDelete(row){
      console.log(row.companyId)
      var that = this;
      var data = Qs.stringify({
        companyID: row.companyId,
        username:this.usernameX,
      })
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/primarysupplyList/deleteDate",
          data: data,
          
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response)
            if (response.data == "成功") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                }
            else{
                this.$message({
                  type: "warning",
                  message: "删除失败"
                });
            }
        });
     
    },
    supplyDetail(){
         this.$router.push('/admin/companyDetail')
     },
    addData() {
        var that = this;
        var data = Qs.stringify({
        username: this.usernameX
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/primarysupplyList/newAdd",
          data: data,
          
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response)
          this.tableData1 = response.data.allData
        });
      this.addVisible = true;
    },
    
  }
};
</script>
<style>
.con{
    width:500px;
    height: 1000px;
    margin:0 auto;
    text-align: center
}

</style>