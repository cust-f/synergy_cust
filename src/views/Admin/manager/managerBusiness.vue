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
                <el-select
                  v-model="provicepid"
                  placeholder="请选择省份"
                  class="selectsupply"
                  style="width:40%;"
                >
                  <el-option
                    v-for="leibie in Provice"
                    :key="leibie.id"
                    :label="leibie.districtName"
                    :value="leibie.id"
                    @change="getCity"
                  ></el-option>
                    <el-option
                    label="不限"
                    value="99"
                  ></el-option>
                </el-select>

                <el-select
                  v-model="citypid"
                  placeholder="请选择城市"
                  class="selectsupply"
                  @change="liebieShu"
                  style="width:40%;"
                >
                  <el-option
                    v-for="leibie in City"
                    :key="leibie.id"
                    :label="leibie.districtName"
                    :value="leibie.id"
                  ></el-option>
                  <el-option
                    label="不限"
                    value="10086"
                  ></el-option>
                </el-select>

                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
              </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                :default-sort="{prop: 'companyName', order: 'descending'}"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>
                <el-table-column
                  prop="companyName"
                  label="企业名称"
                  sortable
                  width="160"
                  align="center"
                ></el-table-column>
                <el-table-column prop="type" label="企业类别"  sortable width="120" align="center"></el-table-column>
                <!-- <template slot-scope="scope">
                          <span v-if="+scope.row.Role_Name===0">核心企业</span>
                          <span v-else-if="+scope.row.Role_Name===1">供应商</span>
                </template>-->
                <el-table-column prop="foundTime" label="成立时间" sortable width="120" align="center">
                  <template slot-scope="scope">
                    <div>
                      <span>{{scope.row.foundTime | dataFormat("yyyy-MM-dd")}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="province" label="所在省"  sortable width="100" align="center"></el-table-column>
                <el-table-column prop="city" label="所在市"  sortable width="100" align="center"></el-table-column>
                <el-table-column prop="officeNumber" label="办公电话" width="100" align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button> -->
                    <el-button
                      @click="businessDetail(scope.row.companyId)"
                      type="text"
                      size="small"
                    >查看详情</el-button>
                    <el-button
                      @click="handleDelete(scope.row.companyId)"
                      type="text"
                      size="small"
                    >删除</el-button>
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

            <!-- 新增弹出框
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
            </el-dialog>-->
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
      provicepid: "",
      citypid:"",
      query: {
        pageIndex: 1,
        pageSize: 15
      },
      Provice: [
        {
          districtName: "",
          pid: "",
          districtSqe: "",
          hierarchy: "",
          type: "",
          id: ""
        }
      ],
      City: [
        {
          districtName: "",
          pid: "",
          districtSqe: "",
          hierarchy: "",
          type: "",
          id: ""
        }
      ],
      // addList: {
      //   id: "1",
      //   companyName: "",
      //   type: "",
      //   foundTime: "",
      //   province: "",
      //   city: "",
      //   officeNumber: ""
      // },
      tableData: [],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      // addForm: {
      //   User_Name: "",
      //   Company_Name: "",
      //   Role_Name: "",
      //   Email: "",
      //   Phone: "",
      //   Password: ""
      // },
      value: ""
    };
  },
  watch: {
    provicepid(){
       if(this.provicepid !=0&&this.provicepid!=99){
        this.getCity();
        console.log("ri")
      }
      if(this.provicepid ==99){
        this.citypid="10086"
      }
    }
     
    
  },
  created() {
    this.getData();
    this.getProvice();
  },
  methods: {
    /*
     *转跳对应任务信息页面
     */
    getData() {
      var that = this;

      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/companyDetail/getAllCompany"
        })
        .then(response => {
          that.pageTotal = response.data.allData.totalCount; //绑定总的条数
          that.tableData = response.data.allData.companyList; //绑定对象数组
          console.log(that.tableData);
        });
      this.getProvice();
    },
    getProvice() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/district/HaChangProvince"
        })
        .then(response => {
          this.Provice = response.data.allData.Province;
          console.log(response);
          console.log(this.Provice);
        });
        
    },
      getCity() {
      var that = this;
      console.log(this.provicepid)
      var data = Qs.stringify({
        pid: this.provicepid
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/district/city",
          data:data
        })
        .then(response => {
          this.City = response.data.allData.city;
          console.log(response);
          console.log(this.City);
        });
    },
    businessDetail(id) {
      //通过路由进行传值
      this.$router.push({
        path: "/admin/businessDetail",
        query: { companyId: id }
      });
    },
     handleSearch(){
       var that = this;
      console.log(this.provicepid)
      var data = Qs.stringify({
        provicepid: this.provicepid,
        citypid:this.citypid
      });
      console.log(this.provicepid)
      console.log(this.citypid)
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/companyDetail/selectBySS",
          data:data
        })
        .then(response => {
          this.tableData = response.data.allData;
          console.log(response);
        });
    },

    // 删除操作
    // handleDelete(index, row) {
    handleDelete(index) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "get",
            url:
              "http://127.0.0.1:8081/companyDetail/delectCompany?companyID=" +
              index
            //data:{"companyID":index}
          }).then(response => {
            this.$message.success("删除成功");
            this.tableData.splice(index, 1);
          });
          //end
          // this.$message.success("删除成功");
          // this.tableData.splice(index, 1);
        })
        .catch(() => {});
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
          url: "http://127.0.0.1:8081/companyDetail/getAllCompany",
          data: data
        })
        .then(response => {
          console.log(response);
        });
    }
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
    // }, // getData(){
    //   //this.tableData=null
    // },
    //新增操作
    // addData() {
    //   this.addVisible = true;
    //   var that = this;
    //   var data = Qs.stringify({
    //     PId: this.type
    //   })
    //   },
    //  //保存新增
    // saveAdd() {

    //   var that = this;
    //   var data = Qs.stringify({
    //     userName: "aaaa",
    //     User_Name: this.addList.User_Name,
    //     Company_Name: this.addList.Company_Name,
    //     Role_Name: this.addList.Role_Name,
    //     Email: this.addList.Email,
    //     Phone: this.addList.Phone,
    //     Password: this.addList.Password,
    //   });
    //   console.log(data);
    //   console.log(this.addList.user);

    //   that
    //   .axios({
    //     method: "post",
    //     url: "http://127.0.0.1:8082/user/addUserInformation",
    //     data: data
    //   });

    //   this.$message.success("提交成功");
    //         this.addVisible = false;

    //   this.tableData.push(this.addList);
    //   this.addList = {};
    //   },

    // // 获取 easy-mock 的模拟数据
    // getData() {
    //   //   this.tableData = res.list;
    //   //   this.pageTotal = tableData.length;
    // },

    // // 触发搜索按钮
    // handleSearch() {
    //   this.$set(this.query, "pageIndex", 1);
    //   // this.getData();
    //    var that = this;

    //   that
    //     .axios({
    //       method: "get",
    //       url: "http://127.0.0.1:8082/companyDetail/selectCompany?City=" + this.query.City + "&Address=" + this.query.Province,//+ "123" +"&&Address = " + "2345",
    //       // data:{City:"123",Address:"2345"}
    //     })
    //     .then(response => {

    //      that.pageTotal=response.data.allData.totalCount;//绑定总的条数
    //      that.tableData=response.data.allData.companyList;//绑定对象数组
    //      console.log(that.tableData)
    //     });
    // },

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