<template>
  <div class="managerBusiness">
    <el-container>
      <el-main>
        <div font-size="24px">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
          企业管理
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</div>
          
        <template>
          <div>
            <div class="container">
              <div class="handle-box">
                <el-select
                  v-model="provicepid"
                  placeholder="请选择省份"
                  class="selectsupply"
                  style="width:40%;"
                >  <el-option
                    label="不限"
                    value="99"
                  ></el-option>
                  <el-option
                    v-for="leibie in Provice"
                    :key="leibie.id"
                    :label="leibie.districtName"
                    :value="leibie.id"
                    @change="getCity"
                  ></el-option>            
                </el-select>
                <el-select
                  v-model="citypid"
                  placeholder="请选择城市"
                  class="selectsupply"
                  @change="liebieShu"
                  style="width:40%;"
                >  <el-option
                    label="不限"
                    value="10086"
                  ></el-option>
                  <el-option
                    v-for="leibie in City"
                    :key="leibie.id"
                    :label="leibie.districtName"
                    :value="leibie.id"
                  ></el-option>
                
                </el-select>

                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
              </div>
              
              <el-table
                :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                border
                class="table"
                ref="configurationTable"
                header-cell-class-name="table-header"
                :default-sort="{prop: 'companyName', order: 'descending'}"
                @selection-change="handleSelectionChange"
              > 

                <el-table-column label="序号" type="index" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
                        </template>
                </el-table-column>
                <el-table-column
                  prop="companyName"
                  label="企业名称"
                  sortable
                  width="150"
                  align="center"
                ></el-table-column>
                <el-table-column prop="companyCategory" label="企业类别"  sortable width="120" align="center">
               <template slot-scope="{row: {companyCategory}}">
                    <span v-if="+companyCategory===1">供应商</span>
                    <span v-else-if="+companyCategory===0">核心企业</span>
                  </template></el-table-column>
                <el-table-column prop="foundingTime" label="成立时间" sortable width="120" align="center">
                  <template slot-scope="scope">
                    <div>
                      <span>{{scope.row.foundingTime | dataFormat("yyyy-MM-dd")}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="province" label="所在省"  sortable width="90" align="center"></el-table-column>
                <el-table-column prop="city" label="所在市"  sortable width="90" align="center"></el-table-column>
                <el-table-column prop="officeNumber" label="办公电话" width="150" align="center"></el-table-column>

                <el-table-column label="操作" width="135" align="center">
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
      
        pageIndex: 1,
        pageSize: 10,
      
      Provice: [
        {
          districtName: "",
          pid: "",
          districtSqe: "",
          hierarchy: "",
          companyCategory: "",
          id: ""
        }
      ],
      City: [
        {
          districtName: "",
          pid: "",
          districtSqe: "",
          hierarchy: "",
          companyCategory: "",
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
        this.citypid="10086";
        this.City = null;
      }
      else{
        this.citypid = null;
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
          url: "/api/companyDetail/getAllCompanies"
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
          url: "/api/district/HaChangProvince"
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
          url: "/api/district/city",
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
          url: "/api/companyDetail/selectBySS",
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
              "/api/companyDetail/delectCompany?companyID=" +
              index
            //data:{"companyID":index}
          }).then(response => {
            this.$message.success("删除成功");
            this.tableData.splice(index, 1);
             location.reload();
          });
          //end
          // this.$message.success("删除成功");
          // this.tableData.splice(index, 1);
        })
        .catch(() => {});
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
.managerBusiness {
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
  display: table-cell!important;
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