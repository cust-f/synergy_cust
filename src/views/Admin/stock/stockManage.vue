<template>
  <div class="stockManage">
    <el-container>
      <el-main>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">库存管理</div>
        <br>
        <div class="container">
          <div class="handle-box">
                <el-input v-model="selectname" placeholder="产品名称" class="handle-input mr10"></el-input>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button type="primary" class="handle-del mr10" @click="XZTC = true">新增</el-button>
          </div>
          
      
          <el-table
                  :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  :default-sort="{prop: 'productState,beginTime,sale,productName,price,reserve', order: 'descending'}"
                  header-cell-class-name="table-header"
           >
           <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
                  <el-table-column prop="productName" label="产品名称" sortable ></el-table-column>
                  <el-table-column prop="productState" label="物品状态" align="center" sortable  width="80" >
                    <template slot-scope="scope">
                      <el-tag v-if="+scope.row.productState ===2"  type="success">库存充足</el-tag>
                      <el-tag v-else-if="+scope.row.productState ===1" type="danger">库存紧缺</el-tag>
                    </template>
                  </el-table-column>
                  
                  <el-table-column
                    prop="price"
                    label="单价"
                    sortable
                    width="100"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="reserve" label="库存" width="150" sortable></el-table-column>
                  <el-table-column prop="sale" label="销量" width="150" sortable></el-table-column>
                  <el-table-column prop="beginTime" sortable label="创建时间" width="150">
                    <template slot-scope="scope">{{scope.row.beginTime | formatDate}}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                      
                     <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>

                     <el-button @click="consignmentDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData.length"
                  @current-change="handleCurrentChange"
                  @size-change="handl2eSizeChange"
                ></el-pagination>
              </div>
        </div>
        <!-- 修改功能弹窗 -->
        <el-dialog :visible.sync="XGTC" width="50%">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">库存修改</div>
          <br />
         <el-form ref="addTC" label-width="110px" class="box">
            <el-row>
                  <el-col :span="11">
                    <el-form-item label="产品名称">
                      <el-input v-model="productName"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11">
                    <el-form-item label="创建时间">
                      <el-date-picker
                        type="datetime"
                        placeholder="选择日期"
                        v-model="beginTime"
                        style="width: 100%;"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  
            </el-row>
            <el-row>
                  <el-col :span="11">
                    <el-form-item label="单价">
                      <el-input v-model="price"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11">
                    <el-form-item label="销量">
                      <el-input v-model="sale"></el-input>
                    </el-form-item>
                  </el-col>
                  
            </el-row>
            <el-row>
                  <el-col :span="11">
                    <el-form-item label="库存">
                      <el-input v-model="reserve"></el-input>
                    </el-form-item>
                  </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="XGTC = false">取 消</el-button>
            <el-button type="primary" @click="change()">确 定</el-button>
          </span>
        </el-dialog> 
         <!--新增库存 -->

        
            <!-- <el-dialog title :visible.sync="XZTC" width="50%">
                <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;" id="storeTCK" v-html ="storeTCKTitle"></div>
                <br>
                <el-form ref="addTC" label-width="110px" class="box" :rules="storeRulesAdd" :model="addTC">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="产品名称" prop="productName1">
                                <el-input v-model="addTC.productName1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="单价" prop="price1">
                                <el-input v-model="addTC.price1"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="库存" prop="reserve1">
                                <el-input v-model="addTC.reserve1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="销量" prop="sale1">
                                <el-input v-model="addTC.sale1"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="创建时间" prop="beginTime1">
                                <el-input v-bind:value="addTC.beginTime |formatDate " :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="产品状态" prop="productState1">
                                <el-input v-model="addTC.productState1"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="XZTC = false">取 消</el-button>
                    <el-button type="primary" @click="addStock('addTC')">确 定</el-button>
                </span>
            </el-dialog> -->
            <el-dialog :visible.sync="XZTC" width="50%">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">库存新增</div>
          <br />
         <el-form ref="addTC" label-width="110px" class="box">
            <el-row>
                  <el-col :span="11">
                    <el-form-item label="产品名称"  prop="productName1">
                      <el-input v-model="addTC.productName1"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11">
                    <el-form-item label="创建时间" prop="beginTime1">
                      <el-date-picker
                        type="datetime"
                        placeholder="选择日期"
                        v-model="addTC.beginTime1"
                        style="width: 100%;"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  
            </el-row>
            <el-row>
                  <el-col :span="11">
                    <el-form-item label="单价" prop="price1">
                      <el-input v-model="addTC.price1"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11">
                    <el-form-item label="销量" prop="sale1">
                      <el-input v-model="addTC.sale1"></el-input>
                    </el-form-item>
                  </el-col>
                  
            </el-row>
            <el-row>
                  <el-col :span="11">
                    <el-form-item label="库存" prop="reserve1">
                      <el-input v-model="addTC.reserve1"></el-input>
                    </el-form-item>
                  </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="XGTC = false">取 消</el-button>
            <el-button type="primary" @click="addStock()">确 定</el-button>
          </span>
        </el-dialog> 
        

      </el-main>
    </el-container>
  </div>
</template>

<script>

import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "stockManage",
  data() {
    return {
      //新增弹窗内部字段
      addTC:{
        productName1:"",
        price1:"",
        reserve1:"",
        sale1:"",
        beginTime1:"",
        productState1:"",
      },
      productName:"",
      price:"",
      reserve:"",
      beginTime:"",
      sale:"",
      productState:"",
      storeID:"1",
      stockID:"",
      usernameX: sessionStorage.getItem("ms_username"),
      pageIndex: 1,
      pageSize: 10,
      activeName: "first",
      tableData: [],
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
      selectname: "",

      XZTC:false,
      XGTC:false,
    };
  },

  
  

  filters: {
    formatDate(time) {
      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },

  created() {
    this.getData();
    this.GetTime(date);
  },
  methods: {
    xinzengTC(){
      this.XZTC=true;
    },
    modify(row){
      this.XGTC=true;
      this.productName=row.productName;
      this.price=row.price;
      this.reserve=row.reserve;
      this.beginTime=row.beginTime;
      this.sale=row.sale;
      this.stockID=row.stockID;
      this.storeID=row.storeID;
      this.productState=row.productState;
    },
    
    //新增弹窗
    addStock(){
      var that = this;

          //1.保存数据到本地  2.调用方法存入数据库 3.弹出成功提示消息 4.清空关闭 5.刷新table
          //====流通清单数据====
          if(this.addTC.reserve1>200){
            this.addTC.productState1='2';
          }
          else{
            this.addTC.productState1='1';
          };
          var data = Qs.stringify({
            username: this.usernameX,//让后台查询companyID
            productName: this.addTC.productName1,
            price:this.addTC.price1,
            reserve:this.addTC.reserve1,
            sale:this.addTC.sale1,
            beginTime:this.addTC.beginTime1,
            productState:this.addTC.productState1,
            storeID:"1",
          });
          that
            .axios({
              method: "post",
              url: "/api/Inventory/addInventory",
              data: data,
              // headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then((response) => {
              if (response.data == "成功") {
                this.$message.success("新增库存信息成功");
                this.addTC = {};
                //弹出框消失
                this.XZTC = false;
                that.getdata();
              }
            })
            .catch((error) => {
              console.log(error.response);
            })
    },   
    
    consignmentDelete(row){
          var that = this;
          var data = Qs.stringify({
          stockID: row.stockID,
      });
       that
        .axios({
          method: "post",
          url: "/api/Inventory/deleteStockById",
          data: data,
          // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          if (response.data.code == "200") {
                this.$message.success("删除流通清单信息成功");
                that.getData();
              }
        })
        .catch((error) => {
          console.log(error);
      });
    },

    change(){
      var stockManageState;       
      var that = this;
      var data = Qs.stringify({
            username: this.usernameX,//让后台查询companyID
            productName: this.productName,
            storeID:this.storeID,
            price:this.price,
            reserve:this.reserve,
            sale:this.sale,
            beginTime:this.beginTime,
            productState:this.productState,
            stockID:this.stockID,
            companyID:'5556',
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/Inventory/updateStockByID",
          data: data,
          // data:this.$store.state.userName
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          if (response.data == "成功") {
                this.$message.success("修改库存信息成功");
                
                this.XGTC = false;
                that.getdata();
              }
          
        })
        .catch((error) => {
         console.log(error);
        });
    
    },

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
        username: this.usernameX
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/Inventory/selectStockAll",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
          // this.$refs.configurationTable.$el.style.width = "99.99%";
          })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        taskName: this.selectname
      });
      that
        .axios({
          method: "post",
          url: "/api/Inventory/selectStockAll",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          this.tableData = response.data.allData;
        });

      //this.getData();
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

    substaskDetail1(row) {
      this.$router.push({
        path: "/admin/substaskDetail",
        query: {
          mainTaskID: row.mainTaskID
        }
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

};
</script>

<style lang="scss">
.stockManage{

  .handle-box {
  margin-bottom: 20px;
 }
 .handle-select {
  width: 120px;
}
.table123 {
  display: table-cell !important;
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



