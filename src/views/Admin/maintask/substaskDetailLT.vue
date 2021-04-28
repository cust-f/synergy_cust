<template>
  <div class="substaskDetailLT">
    <div>
      <el-container>
        <el-main style="overflow: hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header
          >&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="cool" :model="cool" label-width="110px" class="formYS">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称">
                  <template slot-scope="scope">
                    <el-button class="anniu" @click="xuqiuXX(scope.row)">{{
                      cool.mainTaskName
                    }}</el-button>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品名称">
                  <el-input
                    v-model="cool.productName"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="项目负责人">
                  <el-input v-model="cool.leader" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="任务类别">
                  <el-input v-model="cool.taskType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-input
                    v-bind:value="cool.publishTime"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-input
                    v-bind:value="cool.deadline"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="需求状态">
                  <el-input
                    v-model="cool.taskState"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="完成日期">
                  <el-input v-if="cool.finishTime === 1" :disabled="true"
                    >暂未完成</el-input
                  >
                  <el-input
                    v-else
                    v-bind:value="cool.finishTime | formatDate"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="一级行业类别">
                  <el-input
                    v-model="cool.taskCategoryMain"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="二级行业类别">
                  <el-input
                    v-model="cool.taskCategoryPart"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="产品报价">
                  <el-input
                    v-model="cool.productPrice"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="数量总计">
                  <el-input
                    v-model="cool.productNum"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="附件下载">
                  <div>
                    <el-table
                      :data="fujian"
                      class="customer-table"
                      :show-header="false"
                    >
                      <el-table-column
                        label="序号"
                        type="index"
                        width="20"
                        align="center"
                      ></el-table-column>
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-link
                            style="color: #409eff"
                            @click.native="downloadFile(scope.row)"
                            >{{ scope.row.realName }}</el-link
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <br /> -->
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="achieveMain"
              >完成任务</el-button
            >
            <el-button type="primary" class="button1" @click="xiugaitanchu"
              >修改</el-button
            >
            <el-button type="primary" class="button1" @click="xiazaiMAINmoban"
              >打包下载</el-button
            >
          </div>
          <el-divider></el-divider>
          <div v-show="milepostActive1">
            <el-row>
              <el-col :span="13">
                <div
                  class="biaoti"
                  style="padding: 0 10px; border-left: 3px solid #4e58c5"
                >
                  申请列表
                </div>
              </el-col>
              <el-col :span="11">
                <div id="div2" align="right">
                  <el-button v-if="applySuccessNum !== 0 && showPEButton === true" type="primary" size="medium" style="margin-top: -20px" @click="getNum"
                    >配额分配</el-button
                  >
                </div>
              </el-col>
            </el-row>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <el-table
              :data="tableData1"
              border
              class="table1"
              ref="multipleTable"
              header-cell-class-name="table-header"
            >
              <!-- mainTaskID冲-->
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="companyName"
                align="center"
                label="供应商"
                width="210"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="companyDetail(scope.row)">{{
                    scope.row.companyName
                  }}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品名称"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="partsCategory"
                label="类别"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="saleNum"
                label="销量"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="inventoryNum"
                label="库存"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="productPrice"
                label="价格"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="applyType"
                label="申请/邀请"
                align="center"
                width="90"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.applyType == 0">邀请</span>
                  <span v-else-if="scope.row.applyType == 1">申请</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="applyState"
                label="申请/邀请状态"
                align="center"
                width="90"
              >
                <template slot-scope="scope">
                  <el-tag v-if="+scope.row.applyState === 0">待审核</el-tag>
                  <el-tag v-else-if="+scope.row.applyState === 1" type="success"
                    >通过</el-tag
                  >
                  <el-tag v-else type="danger">拒绝</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!-- 暂时注释 -->
                  <!-- <el-button
                      @click="changeTime(scope.row)"
                      size="small"
                      type="text"
                      >修改</el-button
                    > -->
                  <!-- <el-button
                      type="text"
                      size="small "
                      @click="shenqingtanchu(scope.row)"
                      >流通清单</el-button
                    > -->
                  <el-button
                    @click="SQTG(scope.row)"
                    type="text"
                    size="small"
                    v-if="
                      scope.row.applyType == 1 && scope.row.applyState == 0
                    "
                    >通过</el-button
                  >
                  <el-button
                    @click="SQJJ(scope.row)"
                    type="text"
                    size="small"
                    v-if="
                     scope.row.applyType == 1 && scope.row.applyState == 0
                    "
                    >拒绝</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <br />
            <br />
          </div>
          <!-- 申请查看弹窗 -->
          <!-- <el-dialog title :visible.sync="shenqingTC" width="50%">
              <div
                class="biaoti"
                style="padding: 0 10px; border-left: 3px solid #4e58c5"
              >
                流通清单
              </div>
              <br />
              <el-form>
                <el-table
                  :data="tableData"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.$index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productName" label="产品名称">
                    <template slot-scope="scope">
                      <el-link
                        @click.native="showLineChart(scope.row)"
                        :disabled="dialogLineChartVisible"
                        >{{ scope.row.productName }}</el-link
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="productNumber"
                    label="产品数量"
                  ></el-table-column>
                  <el-table-column
                    prop="productModel"
                    label="产品规格"
                  ></el-table-column>
                  <el-table-column
                    prop="productPrice"
                    label="产品单价"
                  ></el-table-column>
                  <el-table-column
                    prop="contactNumber"
                    label="联系方式"
                  ></el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                </div>
                <div class="pagination">
                  <el-pagination
                    background
                    layout="prev, pager, next,total, jumper"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="tableData.length"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                  ></el-pagination>
                </div>
              </el-form>
            </el-dialog> -->

          <div v-show="milepostActive2">
            <div
              class="biaoti"
              style="padding: 0 10px; border-left: 3px solid #4e58c5"
            >
              配额分配
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <br />
            <el-table
              :data="tableData2"
              border
              class="table1"
              ref="multipleTable"
              header-cell-class-name="table-header"
            >
              <!-- mainTaskID冲-->
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="companyName"
                align="center"
                label="供应商"
                width="210"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="companyDetail(scope.row)">{{
                    scope.row.companyName
                  }}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品名称"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="partsCategory"
                label="类别"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="saleNum"
                label="销量"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="inventoryNum"
                label="库存"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="productPrice"
                label="价格"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="applyType"
                label="申请/邀请"
                align="center"
                width="90"
              >
                <template slot-scope="scope">
                  <span v-if="+scope.row.applyType === 0">邀请</span>
                  <span v-else-if="+scope.row.applyType === 1">申请</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="getNum"
                label="配额"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="XGPE(scope.row)" type="text" size="small"
                    >修改</el-button
                  >
                  <el-button
                    @click="substaskDetailLT(scope.row)"
                    type="text"
                    size="small"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <br />
            <br />
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>




<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "substaskDetailLT",
  prop: {},
  inject: ["reload"],
  data() {
    return {
      //控制模块显示
      milepostActive1: "1",
      milepostActive2: "1",
      //显示配额分配按钮
      applySuccessNum: "1",
      showPEButton: true,
      //禁用今天以前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      usernameX: sessionStorage.getItem("ms_username"),
      cool: {
        taskCategoryMain: "交通运输设备",
        mainTaskName: "交通运输设备零件订购",
        industry_Type: "",
        publishTime: "2020-03-06",
        deadline: "2021-12-30",
        mainTaskDetail: "",
        leader: "傅乔",
        taskState: "进行中",
        taskCategoryPart: "汽车",
        finishTime: "尚未完成",
        productName: "缸盖",
        taskType: "流通任务",
        productPrice: "50",
        productNum: "2000",
      },
      //申请列表数据
      tableData1: [
        {
          companyName: "长春跃达交通设施工程有限公司",
          productName: "缸盖",
          partsCategory: "缸盖和部件",
          saleNum: "1500",
          inventoryNum: "3000",
          productPrice: "50",
          applyType: "0",
          applyState: "1",
        },
        {
          companyName: "吉林大华机械制造有限公司",
          productName: "缸盖",
          partsCategory: "缸盖和部件",
          saleNum: "1000",
          inventoryNum: "2000",
          productPrice: "50",
          applyType: "0",
          applyState: "1",
        },
      ],
      //配额分配数据
      tableData2: [
        {
          companyName: "长春跃达交通设施工程有限公司",
          productName: "缸盖",
          partsCategory: "缸盖和部件",
          saleNum: "1500",
          inventoryNum: "3000",
          productPrice: "50",
          applyType: "1",
          applyState: "0",
          getNum: "1000",
        },
        {
          companyName: "吉林大华机械制造有限公司",
          productName: "缸盖",
          partsCategory: "缸盖和部件",
          saleNum: "1000",
          inventoryNum: "2000",
          productPrice: "50",
          applyType: "0",
          applyState: "1",
          getNum: "1000",
        },
      ],
      //附件
      fujian: [
        {
          realName: "交通运输设备零件订购需求书.docx",
          realPath: "",
        },
      ],
    };
  },

  filters: {
    formatDate(time) {
      if (time === "尚未完成") {
        return "暂未完成";
      }

      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },

  created() {
    this.getParams();
    this.getData();
    this.getDate();
  },

  methods: {
    getDate() {
      var that = this;
      var data = Qs.stringify({
        aaaa: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/SubstaskInformation/selectMainType",
          data: data,
        })
        .then((response) => {
          // this.mainStaskType = response.data.allData.a;
          //this.shuju = response.data.allData.b;
          this.xuanzelist = this.getTreeData(response.data.allData.c);
          this.FZR = response.data.allData.d;
        });
    },
    /*
     *转跳对应任务信息页面
     */
    // 获取 easy-mock 的模拟数据
    getParams() {
      var routerParams = this.$route.query.mainTaskID;
      this.mainTaskID = routerParams;
    },
    getData() {
      //console.log(this.mainTaskID);
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.cool = response.data.allData.a[0];

          this.updateTime = response.data.allData.a[0];
          this.publishTime1 = response.data.allData.a[0].publishTime;
          this.publishTime1 = new Date(this.publishTime1);
          this.deadline1 = response.data.allData.a[0].deadline;
          this.deadline1 = new Date(this.deadline1);
          this.finishTime1 = response.data.allData.a[0].finishTime;
          console.log(this.finishTime1);
          this.finishTime1 = new Date(this.finishTime1);

          this.mainStaskID = response.data.allData.a[0].mainTaskID;
          this.name = response.data.allData.a[0].mainTaskName;
          this.shuju = response.data.allData.b;
          this.fujian = response.data.allData.c;
          this.type = response.data.allData.a[0].industry_Type;
          this.WZLJ = response.data.allData.WZLJ;
          this.WJSM = response.data.allData.SM;
          this.selectCateKeys[0] =
            response.data.allData.a[0].taskCategoryMainId;
          this.selectCateKeys[1] =
            response.data.allData.a[0].taskCategoryPartId;
          if (this.cool.taskState === 0) {
            this.cool.taskState = "进行中";
          } else if (this.cool.taskState === 1) {
            this.cool.taskState = "已完成";
            this.finishTimeState = false;
          } else if (this.cool.taskState === 2) {
            this.cool.taskState = "废除";
          }
          if (this.cool.finishTime != null) {
            if (this.cool.finishTime.slice(0, 4) < 2020) {
              this.cool.finishTime = "尚未完成";
              console.log("完成时间" + this.cool.finishTime);
            }
          }
          if (this.cool.finishTime === null) {
            this.cool.finishTime = "尚未完成";
          }
        });
    },
  },
};
</script>

<style lang="scss" >
.substaskDetailLT {
  .wenzi {
    padding-right: 18px;
  }

  .shenhe {
    color: #ff8040;
    background-color: #ffe6d9;
    border-color: #ffdcb9;
  }
  .yanshou {
    color: #e066ff;
    background-color: #ffe1ff;
    border-color: #fff0f5;
  }
  .el-upload-list__item {
    width: 90%;
  }
  .first-child.el-upload-list__item {
    width: 90%;
  }

  .el-dialog__footer {
    padding-right: 40px;
  }
  .anniu .el-dialog__footer {
    padding-right: 20px;
  }
  .anniu {
    width: 100%;
    border-left: cadetblue;
    background-color: white;
    color: #409eff;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    border-color: #dcdfe6;
    border-radius: 0px;
  }
  .el-table__empty-block {
    min-height: 40px;
  }
  .el-table td,
  .el-table th {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .simichakan {
    line-height: 40px;
  }
  .formYS .el-input__inner {
    /* // 表格样式调整 */

    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }

  .el-dialog__body {
    padding-right: 0px;
    padding-top: 20px;
  }

  .el-dialog__header {
    padding-right: 0%;
    padding-top: 0%;
    padding-bottom: 0%;
  }
  .formYS .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #606266;
  }

  .table {
    font-size: 14px;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-upload--text {
    width: 85px;
    height: 40px;
  }
  /* //返回字体 */
  .el-page-header__title {
    font-size: 18px;
  }

  /* // 去掉表格单元格边框 */
  .customer-table th {
    border: none;
  }
  .customer-table td,
  .customer-table th.is-leaf {
    border: none;
  }
  /* // 表格最外边框 */
  .customer-table .el-table--border,
  .customer-table .el-table--group {
    border: none;
  }
  /* // 头部边框 */
  .customer-table thead tr th.is-leaf {
    border: 1px solid #ebeef5;
    border-right: none;
  }
  .customer-table thead tr th:nth-last-of-type(2) {
    border-right: 1px solid #ebeef5;
  }
  /* // 表格最外层边框-底部边框 */
  .customer-table .el-table--border::after,
  .customer-table .el-table--group::after {
    width: 0;
  }
  .customer-table::before {
    width: 0;
  }
  .customer-table .el-table__fixed-right::before,
  .el-table__fixed::before {
    width: 0;
  }
}
.consignment {
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