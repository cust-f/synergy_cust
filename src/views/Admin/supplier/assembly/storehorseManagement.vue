<!--流通清单组件-->
<template>
  <div class="storehorseManagement">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
      清单备货
    </div>

    <br />
    <el-table
      :data="storehorseManagement"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column prop="taskName" label="需求名称"   width="240"></el-table-column>

      <el-table-column
        prop="leadState"
         width="120"
        align="center"
        label="备货状态"
      >
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.leadState === 0"
            >待备货</el-tag
          >
          <el-tag type="success" v-else-if="scope.row.leadState === 1"
            >已备货</el-tag
          >
          <el-tag type="success" v-else-if="scope.row.leadState === 2"
            >已发货</el-tag
          >
          <el-tag type="success" v-else-if="scope.row.leadState === 3"
            >已完成</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="uploadCircuaterTime" label="发货时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.uploadCircuaterTime === 0"
            >暂未验收</el-span
          >
          <el-span v-else>{{
            scope.row.uploadCircuaterTime | formatDate
          }}</el-span>
        </template>
      </el-table-column>

      <el-table-column prop="leadTime" label="备货时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.leadTime === 0">暂未备货</el-span>
          <el-span v-else>{{ scope.row.leadTime | formatDate }}</el-span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button
            @click="showData(), showhorseData(), ShowCompanyName(), showtaskDetails()"
            type="text"
            size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看弹窗的内容 -->
    <el-dialog
      :visible.sync="upCirculation"
      width="1000px"
      @click="handleClose"
    >
        <div
              class="biaoti"
              style="
                padding: 0 10px;
                border-left: 3px solid rgb(78, 88, 197);
                margin-bottom: 6px;
              "
            >
              备货信息
            </div>

      <div class="top">
        <div class="inside">
          <div style="width: 100%; margin-bottom: 10px">
            <el-row>
                <el-col :span="4" class="nowstatus">
            <span style="color: black" >发货状态: </span>
            <span style="color: #409eff">
              &nbsp;&nbsp;&nbsp;&nbsp;{{ status }}</span
            >
            </el-col>
             <el-col :span="12">
            <el-button
            class="btn"
            type="primary"
            @click="submit2()"
            size="small"
            v-bind:disabled="liu"
            >全部发货</el-button
          >
          </el-col>
          </el-row>
          <!-- 这里写需求方 -->
          <el-row>
             <el-col :span="8">
          <span style="color: black">需求名称: </span>
           <span style="color: #409eff">
              &nbsp;&nbsp;&nbsp;&nbsp;{{ this.taskDETA.mainTaskName}}</span
            >
            </el-col>
           <el-col :span="8">
           <span style="color: black" >需求方: </span>
           <span style="color: #409eff">
              {{this.companyName}}</span
            >
               </el-col>
            <el-col :span="8">
           <span style="color: black" >供应方: </span>
           <span style="color: #409eff">
             {{this.taskDETA.acceptCompanyName}}</span
            >
               </el-col>
             </el-row>

             <div class="Taskdetails">
    
            <span style="color: black" class="Taskdetails">任务详情: </span>
            <!-- <el-tooltip class="item" effect="light" :content="this.taskDETA.taskDetail" placement="bottom" v-if="this.taskDETA.taskDetail.length>=120">
                            <span>
                              {{ this.taskDETA.taskDetail+"..." }}
                            </span>
                          </el-tooltip>
                          <span v-else-if="this.taskDETA.taskDetail.length<120">
                            {{this.taskDETA.taskDetail }}
                          </span> -->
           <span style="color: black" class="Taskdetails">
              &nbsp;&nbsp;&nbsp;&nbsp;{{this.taskDETA.taskDetail}}</span
            >
      
            </div>
        </div>

        </div>
         
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label" class="biaoti" style="padding: 0 10px"
            >流通清单</span
          >
          <!-- <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        流通清单
      </div> -->

          <el-form ref="form" label-width="100px" class="box">
            <el-table
              ref="multipleTable"
              :data="
                tableData.slice(
                  (pageIndex - 1) * pageSize,
                  pageIndex * pageSize
                )
              "
            >
              <!-- <el-table-column
                label="序号"
                type="index"
                width="80"
                align="center"
                prop="consignmentId"
              >
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column> -->
              <el-table-column prop="productName" label="物品名称" width="160" align="center">
                <template slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content" style="font-size: 13px">
                      {{ "备注：" + scope.row.consignmentNotes }}<br />
                      {{ "分类：" + scope.row.taskCategoryMain }}<br />
                      {{ "产品规格：" + scope.row.productModel }}<br />
                      {{ "联系电话：" + scope.row.contactNumber }}
                    </div>
                    <p>
                      {{ scope.row.productName }}
                    </p>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="leadState" label="备货状态" width="120"  align="center">
                <template slot-scope="scope">
                  <el-tag
                    v-if="
                      +scope.row.shortageQuantity > 0 ||
                      scope.row.leadState === 0
                    "
                    type="info"
                    >待备货</el-tag
                  >
                  <el-tag v-else-if="scope.row.leadState === 1">已备货</el-tag>
                  <el-tag v-else-if="scope.row.leadState === 2">已发货</el-tag>
                  <el-tag type="success" v-else-if="scope.row.leadState === 3"
                    >已完成</el-tag
                  >
                </template>
              </el-table-column>

              <el-table-column
                prop="productNumber"
                label="产品数量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="issuedQuantity"
                label="已发数量"
                align="center"
              >
                <!-- <template slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content" style="font-size: 13px">
                      {{ "仍需数量：" + scope.row.shortageQuantity }}
                    </div>
                    <p>
                      {{ scope.row.issuedQuantity }}
                    </p>
                  </el-tooltip>
                </template> -->
              </el-table-column>
              <el-table-column
            prop="shortageQuantity"
            label="待发数量"
            align="center"
          ></el-table-column>
              <!-- <el-table-column
            prop="productModel"
            label="产品规格"
            width="85"
          ></el-table-column> -->
              <el-table-column
                prop="shippingWarehouse"
                label="发货仓库"
                align="center"
                width="160"
              ></el-table-column>
              <el-table-column prop="consignmentTimeLatest" label="发货截止时间" width="140" align="center"
                ><template slot-scope="scope">
                  <el-span>{{
                    scope.row.consignmentTimeLatest | formatDate
                  }}</el-span>
                </template></el-table-column
              >

              <el-table-column prop="leadTime" label="备货时间" width="140" align="center"
                ><template slot-scope="scope">
                  <el-span v-if="+scope.row.leadTime === 0">暂未备货</el-span>
                  <el-span v-else>{{
                    scope.row.leadTime | formatDate
                  }}</el-span>
                </template></el-table-column
              >
            </el-table>

            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next, sizes, total, jumper"
                :current-page="pageIndex1"
                :page-size="pageSize"
                :total="tableData.length"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </div>
          </el-form>

          <!-- 分割 -->
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item  name="1">
              <template slot="title">
                <div class="biaoti" style="padding: 0 10px">库存列表</div>
              </template>
              <!-- <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        库存列表
      </div> -->
              <br />
              <el-form ref="form" label-width="100px" class="box">
                <el-table
                  ref="multipleTable"
                  :data="
                    tableData2.slice(
                      (pageIndex - 1) * pageSize,
                      pageIndex * pageSize
                    )
                  "
                >
                  <!-- <el-table-column
                    label="序号"
                    width="80"
                    align="center"
                    prop="xuhao"
                    type="index"
                  >
                  </el-table-column> -->
                  <el-table-column prop="productName" label="物品名称" width="160" align="center">
                    <template slot-scope="scope">
                      <el-tooltip placement="top">
                        <div slot="content" style="font-size: 13px">
                          {{ "单价：" + scope.row.price + "元 / 件" }}
                        </div>
                        <p>
                          {{ scope.row.productName }}
                        </p>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                     <el-table-column
                    prop="productState"
                    label="物品状态"
                    width="120" 
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-tag v-if="+scope.row.productState === 1" type="danger"
                        >库存紧缺</el-tag
                      >
                      <el-tag
                        v-else-if="+scope.row.productState === 2"
                        type="success"
                        >库存充足</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column prop="storeName" label="仓库名称" align="center"  width="200">
                    <template slot-scope="scope">
                      <el-tooltip placement="top">
                        <div slot="content" style="font-size: 13px">
                          {{ "地址：" + scope.row.storeAddress }}<br />
                          {{ "联系方式：" + scope.row.telePhone }}
                        </div>
                        <p>{{ scope.row.storeName }}</p>
                      </el-tooltip>
                    </template>
                  </el-table-column>
               
                  <el-table-column prop="reserve" label="库存" align="center" width="120" >
                    <template slot-scope="scope">
                      <el-tooltip placement="top">
                        <div slot="content" style="font-size: 13px">
                          {{ "销量：" + scope.row.sale }}
                        </div>
                        <p>
                          {{ scope.row.reserve }}
                        </p>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货数量"
                    align="center"
                    style="margin-right: 100px"
                    width="220"
                  >
                    <el-input-number
                      size="small"
                      slot-scope="scope"
                      placeholder="输入数量"
                      v-model="tableData2[scope.$index].deliveringAmount"
                      :min="1"
                      label="描述文字"
                    >
                    </el-input-number>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        v-bind:disabled="!beihuo"
                        @click="deliver(scope.row, scope.$index)"
                        type="text"
                        size="small"
                        >备货</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination2">
                  <el-pagination
                    background
                    layout="prev, pager, next, sizes, total, jumper"
                    :current-page="pageIndex1"
                    :page-size="pageSize"
                    :total="tableData2.length"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                  ></el-pagination>
                </div>
              </el-form>
            </el-collapse-item>
               <!-- 这里写关闭弹窗的方法 -->
            <el-button
              @click="close()"
              size="small"
              class="close"
              style="margin-left: 30px"
              type="primary"
              >
                {{ "关闭" }}
              </el-button
            >
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label" class="biaoti" style="padding: 0 10px"
            >发货信息</span
          >
          <div>
            <!-- <div
              class="biaoti"
              style="
                padding: 0 10px;
                border-left: 5px solid rgb(255, 153, 102);
                margin-left: 10px;
              "
            >
              需求信息
            </div>
            <br /> -->
            <label
              style="
                white-space: nowrap;
                text-align: left;
                font-size: 16px;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                color: rgb(153, 153, 153);
                margin-left: 30px;
              "
              >需求方：{{ this.companyName }}</label
            >
            <label
              style="
                white-space: nowrap;
                text-align: left;
                font-size: 16px;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                color: rgb(153, 153, 153);
                margin-left: 30px;
              "
              >联系电话 :{{ this.tableData[0].contactNumber }}</label
            >
            <br />
            <label
              style="
                white-space: nowrap;
                text-align: left;
                font-size: 16px;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                color: rgb(153, 153, 153);
                margin-left: 30px;
              "
            >
              {{ "发货地址：" + this.circulationAddress }}</label
            >
            <el-button
              @click="UpdateCirculationAddress()"
              size="mini"
              style="margin-left: 30px"
              ><p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  white-space: nowrap;
                  color: rgb(153, 153, 153);
                "
              >
                {{ "修改" }}
              </p></el-button
            >

            <br />
          </div>
          <el-divider></el-divider>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      demandName:"",
      subtaskName:"",
      taskDetails:"",
      activeNames: '1',
      status: "",
      FormData: {},
      companyName: "",
      circulationAddress: "",
      activeName: "first",
      submitDisable: false,
      text: true,
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
      fileType: 0,
      taskId: 0,
      yinCang: 1,
      userName: sessionStorage.getItem("ms_username"),
      storehorseManagement: [],
      taskName: "",
      uploadCircuaterTime: "",
      taskState: 0,
      fileHistoryMessage: [
        {
          publishingCompanyName: "123",
          fileType: "123",
        },
      ],
      upCirculation: false,
      //文件历史弹窗
      fileHistoryDia: false,
      addVisible3: false, //拒绝原因弹窗
      //文件列表
      fileList: [],
      //上传此时
      shangchuancishu: 0,
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      filePath: "",
      uploadTime: "",
      multipleSelection: [],
      tableData: [
        {
          consignmentId: "",
          taskId: "",
          productName: "",
          deliveryTime: "",
          consignmentTimeLatest: "",
          consignmentState: "",
          productNumber: "",
          productModel: "",
          productPrice: "",
          contactnumber: "",
          shippingaddress: "",
          totalPrice: "",
          consignmentNotes: "",
          checkox: "",
          refuseReason: "",
          leadTime: "",
          leadState: "",
          issuedQuantity: "", //已发数量
          shortageQuantity: "", //仍需数量
        },
      ],
      dis: "1",
      tableData2: [
        {
          beginTime: "",
          productState: "",
          reserve: "",
          price: "",
          productName: "",
          storeName: "",
          xuhao: "",
          deliveringAmount: 1, //输入框的值
          stockId: "",
          isproductName: "",
          isleadState: "",
        },
      ],
      tableData3: [
        {
          beginTime: "",
          productState: "",
          reserve: "",
          price: "",
          productName: "",
          storeName: "",
          xuhao: "",
          deliveringAmount: "", //输入框的值
          stockId: "",
          isproductName: "",
        },
      ],
      positiveInteger: "0", //输入框是否是正整数
      isitGreater: "0", //判断输入的数量是否超过库存、是否超过产品数量
      Data_checkox: [],
      //流通清单全部提交按钮可见
      liu: false,
      beihuo:false,
      mainTaskID:"",
      taskDETA:{},
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  props:["companyId"],
  methods: {
    //修改货物状态、全部发货
    submit2() {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].shortageQuantity != 0) {
          this.$notify.error({
            title: "错误",
            message: "无法全部发货",
          });
        }
      }
      this.$confirm("确定全部发货吗？", "提示", {
          type: "warning",
        }).then(() => {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userId: sessionStorage.getItem("userId"),
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/changeLeadState",
          data: data,
        })
        .then((response) => {
          //修改成功
          if (response) {
            this.$message({
              type: "success",
              message: "全部发货成功",
            });
            setTimeout(() => {
              this.close();
                  }, 100);
          }
        });
        this.showhorseData();
        this.showData();
          });
        // this.upCirculation = false;
        // this.$router.go(0);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      var _this = this;
      _this.data.push({
        checkox: _this.checkox,
      });
    },
    //获得信息
    getMsg(msg) {
      this.storehorseManagement = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    //显示需求名称、子任务名称、任务详情
    showtaskDetails(){
        var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userId: sessionStorage.getItem("userId"),
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/showtaskDetails",
          data: data,
        })
        .then((response) => {
            this.taskDETA= response.data.allData[0];
            console.log("54321ss"+this.taskDETA.taskDetail.length)
        });
    },
    //把数据库表格中的内容显示到上面
    showData() {
    
      this.upCirculation = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userId: sessionStorage.getItem("userId"),
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findConsignmentByTaskIdNew",
          data: data,
        })
        .then((response) => {
          console.log(response)
          var temp = 0; //检查下面的已发货，已完成
          this.tableData = response.data.allData;
          console.log(this.tableData);
          this.liu = false;
          this.tableData2.isleadState = response.data.allData[0].leadState;
          if (this.taskState == "完成") {
            this.submitDisable = true;
          }
          var temp = this.tableData[0].leadState;
          for (var i = 1; i < this.tableData.length; i++) {
            // if (this.tableData[i].shortageQuantity != 0) {
            //   that.liu = true;
            // }
            // if (this.tableData[i].leadState == 0) {
            //   that.status = "待备货";
            //   that.liu = true;
            //   return;
            // } else if (this.tableData[i].leadState == 1) {
            //   that.status = "已备货";
            //   that.liu = false;
            //   return;
            // } else if (this.tableData[i].leadState == 2) {
            //   that.status = "已发货";
            //   that.liu = true;  
            //   return;
            // } else if (this.tableData[i].leadState == 3) {
            //   that.status = "已完成";
            //   that.liu= true;
            // }
            if(temp > this.tableData[i].leadState){
              temp = this.tableData[i].leadState;
            }
          }
          switch(temp){
            case 0:{
              that.status = "待备货";
              that.liu = true; 
              this.beihuo=true;
            }
            break;
            case 1:{ that.status = "已备货";
              that.liu = false; 
              this.beihuo=false;
              }
            break;
            case 2:{ that.status = "已发货";
              that.liu = true; 
              this.beihuo=false;}
            break;
            case 3:{ that.status = "已完成";
              that.liu = true; 
              this.beihuo=false;}
            break;
          }
        });
    },
    //用taskId查到maintaskID
    FindmaintaskID(){
         var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findmaintaskID",
          data: data,
        })
        .then((response) => {
            this.mainTaskID=response.data.allData;
        });
    },
    //显示仓库表格中的信息。判断物品名称是否与产品名称一致。
    showhorseData() {
      // this.FindmaintaskID();
      var that = this;
      var data = Qs.stringify({
        // taskId: this.taskId,
        userId: sessionStorage.getItem("userId"),
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/showInventoryDetail",
          data: data,
        })
        .then((response) => {
          this.tableData3 = response.data.allData;
          if (this.taskState == "完成") {
            this.submitDisable = true;
          }
          this.showData();
          for (var i = 0; i < this.tableData3.length; i++) {
            this.tableData3[i].isproductName = false;
            for (var j = 0; j < this.tableData.length; j++) {
              if (
                this.tableData3[i].productName == this.tableData[j].productName
              ) {
                this.tableData3[i].isproductName = true;
                break;
              }
            }
          }
          var k = 0;
          for (var i = 0; i < this.tableData3.length; i++) {
            if (this.tableData3[i].isproductName == true) {
              this.tableData2[k] = this.tableData3[i];
              k = k + 1;
            }
          }
        });
        console.log(this.tableData2)
    },
    UpdateAddress(value) {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        circulationAddress: value,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/updateAddress",
          data: data,
        })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.ShowCompanyName();
        });
    },

    //修改发货地址
    UpdateCirculationAddress() {
      this.$prompt("请输入发货地址", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        //只含有汉字、数字、字母、下划线，下划线位置不限：
        inputPattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
        inputErrorMessage: "请输入正确格式的地址",
      })
        .then(({ value }) => {
          this.UpdateAddress(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //显示公司信息
    ShowCompanyName() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userId: sessionStorage.getItem("userId"),
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findcompanyNamebytaskIdNew",
          data: data,
        })
        .then((response) => {
          this.companyName = response.data.allData[0];
          this.circulationAddress = response.data.allData[1];
        });
    },
        //字符串转换
    changeString(data) {
      if(data == null || data.length==0)
      return "暂无数据";
      else if(data.length >= 180)
      {
        return data.substring(0,180)+"...";
      }
      else{
        return data;
      }
    },
    //输入input框的限制问题
    BlurText(e) {
      let boolen = new RegExp("^[1-9][0-9]*$").test(e.target.value);
      if (!boolen) {
        this.$message.warning("请输入正整数");
        this.positiveInteger = "0";
        e.target.value = "";
      } else {
        this.positiveInteger = "1";
      }
    },
    // 判断输入的数量是否超过库存、是否超过产品数量
    judgeproductName(e, row) {
      console.log("=============================" + e.target.value);
      this.isitGreater = "0";
      for (var i = 0; i < this.tableData.length; i++) {
        if (row.productName == this.tableData[i].productName) {
          console.log(i);
          console.log(
            e.target.value +
              "....." +
              this.tableData[i].productNumber +
              "....." +
              row.reserve
          );
          if (
            e.target.value <= this.tableData[i].productNumber &&
            e.target.value <= row.reserve
          ) {
            console.log("ssssssssssss");
            this.isitGreater = "1";
          } else {
            this.isitGreater = "0";
            e.target.value = "";
          }
        }
      }
    },
    //
    handleChange(value) {
      console.log(value);
    },
    //备货发货数量
    deliver(row, index) {
      console.log(row.partsCategory)
      this.isitGreater = "0";
      for (var i = 0; i < this.tableData.length; i++) {
        if (row.productName == this.tableData[i].productName) {
          if (
            row.deliveringAmount <= this.tableData[i].shortageQuantity &&
            row.deliveringAmount <= row.reserve
          ) {
            console.log(row.deliveringAmount);
            console.log(this.tableData[i].shortageQuantity);
            console.log(row.reserve);
            this.isitGreater = "1";
          } else {
            this.isitGreater = "0";
            row.deliveringAmount = "";
          }
        }
      }
      if (this.isitGreater === "0" || row.deliveringAmount == 0) {
        this.$message({
          message: '您提交的发货数量有误',
          type: 'warning'
        });
      } else if (row.deliveringAmount != 0) {
        this.$confirm("确定发货吗？", "提示", {
          type: "warning",
        }).then(() => {
          var that = this;
          var data = Qs.stringify({
            taskId: this.taskId,
            stockId: row.stockId,
            reserveCount: row.deliveringAmount,
            productName: row.productName,
            storeName: row.storeName,
            partsCategory:row.partsCategory,
            userId: sessionStorage.getItem("userId"),
          });
          that
            .axios({
              method: "post",
              url: "/api/addConsignment/updateInventoryCount",
              data: data,
            })
            .then((response) => {
              this.$message({
               message: '发货成功！',
                type: 'success'
        });
        this.showhorseData();
          this.showData();
            });
          // 刷新提示不显示
          // this.$message({
          //   message: "发货成功",
          //   type: "success",
          // });
          
          // this.$router.go(0);
          // this.upCirculation = false;
        });
      }
    },

    //拒绝原因弹出框
    open(row) {
      console.log(row.refuseReason);
      this.$alert(row.refuseReason, "拒绝原因", {
        confirmButtonText: "确定",
      });
    },
    checkboxT(row, index) {
      if (row.consignmentState == 0 || row.consignmentState == 3) {
        return true;
      } else {
        return false;
      }
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },
    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    Jump() {
      this.$router.push({
        path: "/admin/stockManage",
        name: "stockManage",
      });
    },
    JumpWarehouse() {
      this.$router.push({
        path: "/admin/storeHouseManage",
        name: "storeHouseManage",
      });
    },
    close(){
      this.upCirculation = false;
      setTimeout(() => {
       this.$router.go(0);
        }, 300);
    },
    handleClose() {
      debugger;
      console.log("1");
      if (this.upCirculation == false) {
        this.upCirculation = true;
      } else {
        this.upCirculation = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  height: auto;
  min-height: 80px;
  margin-bottom: 10px;
  width: 100%;
  background-color: #fff4ee;
  border: 1px solid red;
  border-radius: 5px;

  .inside {
    padding: 10px 15px 3px 15px;
    .btn {
      margin-left: 0px;
    }
  }  
}
//

.storehorseManagement {
  .el-dialog__header {
    padding: 0px;
  }

  .table {
    font-size: 13px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }

  .el-step__title.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
      .el-collapse-item__content{
    padding-bottom: 0px;
  }
  }
  .Notestyle {
    padding: 0;
    margin-top: 10px;
    background-color: white;
    line-height: 20px;
    font-size: 18px;
  }
  .kaozuo {
    font-size: 16px;
    margin-left: 20px;
  }
  .close{
    float: right;
    margin-top: 10px;
  }
  .pagination2{
    float: right;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .Subtasks{
    margin-left:0px;
  }
  .Taskdetails{
    padding-top:5px;
  }
  .nowstatus{
    margin-top: 8px;
  }

}
</style>
<style>
      .el-dialog__header {
    padding: 0px;
  }
</style>