<template>
  <div class="stockManage">
    <el-container>
      <el-main>
        <div
          class="biaoti"
          style="padding: 0 10px; border-left: 3px solid #4e58c5"
        >
          库存管理
        </div>
        <br />
        <div class="container">
          <div class="handle-box">
            <!-- <template slot-scope="scope"> -->
            <el-input
              v-model="selectname"
              placeholder="产品名称"
              class="handle-input mr10"
            ></el-input>
            <el-button type="primary" @click="handleSearch">搜索</el-button>

            <el-button
              type="primary"
              class="handle-del mr10"
              @click="xinzengTC()"
              >新增</el-button
            >
            <!-- </template> -->
          </div>

          <el-table
            :data="
              tableData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            "
            border
            class="table"
            ref="multipleTable"
            :default-sort="{
              prop: 'productState,beginTime,sale,productName,price,reserve',
              order: 'descending',
            }"
            header-cell-class-name="table-header"
          >
            <el-table-column
              label="序号"
              type="index"
              width="50"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="productName"
              label="产品名称"
              sortable
              width="120"
            ></el-table-column>
            <el-table-column
              prop="productState"
              label="物品状态"
              align="center"
              sortable
              width="120"
            >
              <template slot-scope="scope">
                <el-tag v-if="+scope.row.productState === 2" type="success"
                  >库存充足</el-tag
                >
                <el-tag v-else-if="+scope.row.productState === 1" type="danger"
                  >库存紧缺</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="单价"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              prop="reserve"
              label="库存"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              prop="sale"
              label="销量"
              width="100"
              sortable
            ></el-table-column>
            <!-- <el-table-column
              prop="beginTime"
              label="创建时间"
              width="140"
              sortable
            >
              <template slot-scope="scope"> {{scope.row.beginTime | formatDate}}</template>
            </el-table-column> -->
            <el-table-column
              label="所在仓库名称"
            >
              <template slot-scope="scope">
                <p
                  v-if="scope.row.storeID == item.storeId"
                  v-for="item in STR"
                  :key="item.value"
                >
                  {{ item.storeName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120">
              <template slot-scope="scope">
                <el-button @click="modify(scope.row)" type="text" size="small"
                  >修改</el-button
                >
                <el-button
                  @click="consignmentDelete(scope.$index, scope.row)" type="text" size="small"
                  >删除</el-button
                >
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
            ></el-pagination>
          </div>
        </div>

        <!-- 修改功能弹窗 -->
        <div class="dialogcss">
          <el-dialog :visible.sync="XGTC" width="800px">
            <div
              class="biaoti"
              style="padding: 0 10px; border-left: 3px solid #4e58c5"
            >
              库存修改
            </div>
            <br />
            <el-form
              ref="changeForm"
              label-width="110px"
              :rules="stockRulesChange"
              class="box"
              :model="changeTC"
            >
              <el-row>
                <el-col :span="11">
                  <el-form-item label="产品名称" prop="productName">
                    <el-input v-model="changeTC.productName"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="11">
                  <el-form-item label="创建时间" prop="beginTime">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="changeTC.beginTime"
                      style="width: 100%"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="单价" prop="price">
                    <el-input v-model="changeTC.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="库存" prop="reserve">
                    <el-input v-model="changeTC.reserve"></el-input>
                  </el-form-item>
                </el-col>
<!--                 <el-col :span="11">
                  <el-form-item label="销量" prop="sale">
                    <el-input v-model="changeTC.sale"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="XGTC = false">取 消</el-button>
              <el-button type="primary" @click="change()">确 定</el-button>
            </span>
          </el-dialog>
        </div>

        <!-- 新增功能弹窗 -->
        <div class="dialogcss">
          <el-dialog :visible.sync="XZTC" width="800px">
            <div
              class="biaoti"
              style="padding: 0 10px; border-left: 3px solid #4e58c5"
            >
              库存新增
            </div>
            <br />
            <el-form
              ref="addform"
              label-width="110px"
              :rules="stockRulesAdd"
              class="box"
              :model="addTC"
            >
              <el-row>
                <el-col :span="11">
                  <el-form-item label="产品名称" prop="productName1">
                    <el-input v-model="addTC.productName1"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="11">
                  <el-form-item label="创建时间" prop="beginTime1">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="addTC.beginTime1"
                      style="width: 100%"
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
                  <el-form-item label="库存" prop="reserve1">
                    <el-input v-model="addTC.reserve1"></el-input>
                  </el-form-item>
                </el-col>
<!--                 <el-col :span="11">
                  <el-form-item label="销量" prop="sale1">
                    <el-input v-model="addTC.sale1"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="仓库">
                    <el-select
                      v-model="storeID"
                      placeholder="请选择仓库"
                      class="selectsupply"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in STR"
                        :label="item.storeName"
                        :key="item.storeId"
                        :value="item.storeId"
                      ></el-option>

                      <!--lable\key\value绑定的为后台的变量
                        1、首先：调用方法，将所有的仓库信息按条返回到STR大数组里
                        2、对于STR中的每个小数组循环绑定并输出每条仓库信息
                        3、lable绑定选择框中能看到的文字
                           value可以绑定想要的例如id
                           key要和value绑定为一样的
                           item是将STR数组中的循环的每条数据（[0]、[1]、[2]）的代称
                     -->
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="XZTC = false">取 消</el-button>
              <el-button type="primary" @click="addStock()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
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
      addTC: {
        productName1: "",
        price1: "",
        reserve1: "",
        sale1: "0",
        beginTime1: "",
        productState1: "",
        store: "",
      },
      changeTC: {
        productName: "",
        price: "",
        reserve: "",
        beginTime: "",
        sale: "0",
        storeID: "",
      },
      productState: "",
      storeID: "",
      stockID: "",
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
      XZTC: false,
      XGTC: false,
      store: "",
      STR: [],

      stockRulesAdd: {
        productName1: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "请输入长度在 1 到 20 个字符的名称",
            trigger: "blur",
          },
        ],
        beginTime1: [
          { required: true, message: "请输入建立时间", trigger: "blur" },
        ],
        price1: [
          { required: true, message: "请输入单价", trigger: "blur" },
          {
            pattern: /^\d{1,10}$/,
            message: "请输入长度在 1 到 10 位的单价",
            trigger: "blur",
          },
        ],

        reserve1: [
          { required: true, message: "请输入库存数目", trigger: "blur" },
          {
            pattern: /^\d{1,10}$/,
            message: "请输入长度在 1 到 10 位的库存数目",
            trigger: "blur",
          },
        ],
        sale1: [
          { required: true, message: "请输入销量", trigger: "blur" },
          {
            pattern: /^\d{1,10}$/,
            message: "请输入长度在 1 到 10 位的库存销量",
            trigger: "blur",
          },
        ],
      },
      stockRulesChange: {
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "请输入长度在 1 到 20 个字符的名称",
            trigger: "blur",
          },
        ],
        beginTime: [
          { required: true, message: "请输入建立时间", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入单价" },
          {
            pattern: /^\d{1,10}$/,
            message: "请输入长度在 1 到 10 位的单价",
            trigger: "blur",
          },
        ],

        reserve: [
          { required: true, message: "请输入库存数目" },
          {
            pattern: /^\d{1,10}$/,
            message: "请输入长度在 1 到 10 位的库存数目",
            trigger: "blur",
          },
        ],
        sale: [
          { required: true, message: "请输入销量", trigger: "blur" },
          {
            pattern: /^\d{1,10}$/,
            message: "请输入长度在 1 到 10 位的库存销量",
            trigger: "blur",
          },
        ],
      },
    };
  },

  filters: {
    formatDate(time) {
      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },

  created() {
    this.getData();
    this.getStore();
    //this.GetTime();
  },
  methods: {
    //查询公司所有仓库
    getStore() {
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/StoreHouse/selectStorehouseAll",
          data: data,
        })
        .then((response) => {
          if (response.data.code == "200") {
            this.STR = response.data.allData;
            //console.log(this.STR);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    //新增弹出框 弹出
    xinzengTC() {
      this.XZTC = true;
    },
    //修改某一行 修改弹出框 填入某行数据并弹出
    modify(row) {
      this.XGTC = true;
      this.changeTC.productName = row.productName;
      // this.oldName=row.productName;
      this.changeTC.price = row.price;
      this.changeTC.reserve = row.reserve;
      this.changeTC.beginTime = this.GetTime(row.beginTime);
      this.changeTC.sale = row.sale;
      this.changeTC.stockID = row.stockID;
      this.changeTC.storeID = row.storeID;
      this.changeTC.productState = row.productState;
    },

    //新增弹出框的确定
    addStock() {
      this.$refs.addform.validate((valid) => {
        if (valid && this.storeID != "") {
          var that = this;
          //1.保存数据到本地  2.调用方法存入数据库 3.弹出成功提示消息 4.清空关闭 5.刷新table
          //====流通清单数据====
          if (this.addTC.reserve1 > 100) {
            this.addTC.productState1 = "2"; //库存大于10，库存充足
          } else {
            this.addTC.productState1 = "1"; //库存小于10，库存紧缺
          }
          var data = Qs.stringify({
            username: this.usernameX, //让后台查询companyID
            productName: this.addTC.productName1,
            price: this.addTC.price1,
            reserve: this.addTC.reserve1,
            sale: this.addTC.sale1,
            beginTime: this.addTC.beginTime1,
            productState: this.addTC.productState1,
            storeID: this.storeID,
          });
          that
            .axios({
              method: "post",
              url: "/api/Inventory/addInventory",
              data: data,
              // headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then((response) => {
              if (response.data.allData == "false") {
                this.$message.warning("该库存信息已存在");
                this.addTC = {};
                //弹出框消失
                this.XZTC = false;
                that.getData();
              } else {
                this.$message.success("新增库存信息成功");
                this.addTC = {};
                //弹出框消失
                this.XZTC = false;
                that.getData();
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
        } else {
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，填写后再提交",
          });
        }
      });
    },
    //删除某一行
    consignmentDelete(index, row) {
      var that = this;
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that
            .axios({
              method: "post",
              url: "/api/Inventory/deleteStockById",
              data: data,
              // headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then((response) => {
              if (response.data.code == "200") {
                this.$message.success("删除库存信息成功");
                that.getData();
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      var data = Qs.stringify({
        stockID: row.stockID,
      });
    },
    //修改弹出框 的确定
    change() {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          var stockManageState;
          var that = this;
          var data = Qs.stringify({
            username: this.usernameX, //让后台查询companyID
            productName: this.changeTC.productName,
            storeID: this.changeTC.storeID,
            price: this.changeTC.price,
            stockId: this.changeTC.stockID,
            reserve: this.changeTC.reserve,
            sale: this.changeTC.sale,
            beginTime: this.changeTC.beginTime,
            productState: parseInt(this.changeTC.reserve) > 100 ? 2 : 1,
            // companyID:'5556',
          });
          that
            .axios({
              method: "post",
              url: "/api/Inventory/updateStockByID",
              data: data,
              // data:this.$store.state.userName
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then((response) => {
              console.log(response);
              if (response.data.code == "200") {
                this.$message.success("修改库存信息成功");
                this.XGTC = false;
                that.getData();
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
        } else {
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，填写后再提交",
          });
        }
      });
    },

    //转换时间格式
    GetTime(date) {
      var datee = new Date(date).toJSON();
      return new Date(+new Date(datee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    //获取所有库存信息
    getData() {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/Inventory/selectStockAll",
          data: data,

          // data:this.$store.state.userName
        })
        .then((response) => {
          console.log(response);
          this.tableData = response.data.allData;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    //搜索
    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        productName: this.selectname,
        userName: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/Inventory/selectProductByLittle",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input__inner {
  width: 310px;
  padding-right: 30px;
}
.stockManage {
  .handle-box {
    margin-bottom: 20px;
  }
  .handle-select {
    width: 120px;
  }
  .table {
    display: table-cell !important;
    font-size: 14px;
    width: 970px;
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
<style  lang="scss">
.dialogcss {
  .el-dialog__body {
    padding-right: 0px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .el-dialog__header {
    padding: 0px;
    margin: 0px;
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



