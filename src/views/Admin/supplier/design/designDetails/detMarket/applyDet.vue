<template>
  <div>
    <el-main style="overflow:hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-steps :active="milepostActive" align-center>
        <el-step
          v-for="(value, key) in milepost"
          :class="milepostActive== key+1 ? stepActive: '' "
          :title="value.title"
          :icon="value.icon"
          :key="key"
        ></el-step>
      </el-steps>
      <br />
      <br />
      <div>
        <div class="biaoti">——基本信息——</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <br />
        <el-card class="box-card">
          <el-form ref="cool" :model="cool" label-width="110px" class="form">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称:">
                  <el-input v-model="cool.mainTaskName" :readonly="true" style="text-align:center"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="子任务名称:">
                  <el-input v-model="cool.taskName" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布企业名称:">
                  <el-input v-model="cool.companyName" :readonly="true" style="text-align:center"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="接受企业名称:">
                  <el-input v-model="cool.supplierName" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="任务截止日期:">
                  <el-input
                    v-bind:value="cool.deadline|formatDate"
                    :readonly="true"
                    style="text-align:center"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="需求方电话:">
                  <el-input v-model="cool.demanderTel" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <br />
      <br />
      <div>
        <div class="biaoti">——申请列表——</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-table
          :data="tableData1"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="applyWay" label="获取方式">
            <template slot-scope="scope">
              <span v-if="scope.row.applyWay === 0">邀请</span>
              <span v-else-if="scope.row.applyWay === 1">申请</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyState" label="申请/邀请状态">
            <template slot-scope="scope">
              <span v-if="scope.row.checkApplyState === 0">待审核</span>
              <span v-else-if="scope.row.checkApplyState === 1">通过</span>
              <span v-else>拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请/邀请时间">
            <template slot-scope="scope">{{scope.row.applyTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="checkApplyTime" label="审核时间">
            <template slot-scope="scope">{{scope.row.checkApplyTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.applyWay === 0">
                <div v-if="milepostActive === 0">
                  <el-button @click="accept(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="noAccept(scope.row)" type="text" size="small">拒绝</el-button>
                </div>
              </div>
              <div v-else-if="scope.row.applyWay === 1">
                <div v-if="scope.row.checkApplyState === 2">
                  <el-button @click="refuseReason(scope.row)" type="text" size="small">拒绝原因</el-button>
                </div>
              </div>
              <div v-if="milepostActive > 0">
                <span>任务已接受</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>
      <div v-show="show>0">
        <div class="biaoti">——任务计划——</div>
        <br />
        <el-table
          :data="tableData2"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="checkPlanState" label="计划审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.checkPlanState === 0">待上传</span>
              <span v-else-if="scope.row.checkPlanState === 1">待审核</span>
              <span v-else-if="scope.row.checkPlanState === 2">通过</span>
              <span v-else-if="scope.row.checkPlanState === 3">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="planUploadTime" label="上传时间">
            <template slot-scope="scope">{{scope.row.planUploadTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="checkPlanTime" label="审核时间">
            <template slot-scope="scope">{{scope.row.checkPlanTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <div v-show="scope.row.checkPlanState === 0"> -->
              <el-button @click="upLoadPlan()" type="text" size="small">上传</el-button>
              <!-- </div> -->
              <div v-show="scope.row.checkPlanState > 0">
                <el-button @click="SQJJ(scope.row)" type="text" size="small">下载</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <br />

      <div v-show="show>1">
        <div class="biaoti">——设计提交——</div>
        <br />

        <el-table
          :data="tableData3"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="supplierCheckDesignState" label="内部审核状态">
            <template slot-scope="scope">
              <span v-if="+supplierCheckDesignState === 0">待提交</span>
              <span v-else-if="scope.row.supplierCheckDesignState === 1">待审核</span>
              <span v-else-if="scope.row.supplierCheckDesignState === 2">通过</span>
              <span v-else-if="scope.row.supplierCheckDesignState === 3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadDesignTime" label="上传时间">
            <template slot-scope="scope">{{scope.row.uploadDesignTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="supplierCheckDesignTime" label="审核时间">
            <template slot-scope="scope">{{scope.row.supplierCheckDesignTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="demandorCheckDesignTime" label="验收状态">
            <template slot-scope="scope">
              <span v-if="scope.row.demandorCheckDesignState === 0">待提交</span>
              <span v-else-if="scope.row.demandorCheckDesignState === 1">待审核</span>
              <span v-else-if="scope.row.demandorCheckDesignState === 2">通过</span>
              <span v-else-if="scope.row.demandorCheckDesignState === 3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="demandorCheckDesignTime" label="验收时间">
            <template slot-scope="scope">{{scope.row.demandorCheckDesignTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <div v-show="scope.row.supplierCheckDesignState > 0">
                <el-button @click="SQJJ(scope.row)" type="text" size="small">下载</el-button>
              </div>
              <div v-show="scope.row.supplierCheckDesignState === 1">
                <el-button @click="designSuccess(scope.row)" type="text" size="small">通过</el-button>
                <el-button @click="designRefuse(scope.row)" type="text" size="small">拒绝</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="show>3">
        <div class="biaoti">——合同管理——</div>
        <br />
        <el-table
          :data="tableData2"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="contractState" label="合同审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.contractState === 0">待上传</span>
              <span v-else-if="scope.row.contractState === 1">待审核</span>
              <span v-else-if="scope.row.contractState === 2">通过</span>
              <span v-else-if="scope.row.contractState === 3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadContractTime" label="上传时间">
            <template slot-scope="scope">{{scope.row.uploadContractTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="checkContractTime" label="合同审核时间">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkContractTime === 'null'">尚未上传</span>
              <span v-else>{{scope.row.checkContractTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <div v-show="contractManagementStatus=0">
                <el-button @click="SQJJ(scope.row)" type="text" size="small">上传</el-button>
              </div>
              <div v-show="contractManagementStatus=1">
                <el-button @click="SQJJ(scope.row)" type="text" size="small">下载</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>
      <!-- 拒绝原因弹出框 -->
      <el-dialog title="被拒绝的原因" :visible.sync="addVisible1" width="50%">
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList1" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="被拒绝原因">
                <el-input v-model="addList1.refuseApplyMessage"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible1 = false">确定</el-button>
        </span>
      </el-dialog>
      <!-- 计划书上传 -->
      <el-dialog title="上传计划书" :visible.sync="planbook" width="24%" :before-close="handleClose">
        <el-form>
        <el-upload
          ref="uploadExcel"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="limitNum"
          :auto-upload="false"
          accept=".xlsx"
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
          :on-exceed="exceedFile"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
        >
          <el-button size="small" plain>选择文件</el-button>
        </el-upload>
        <el-form-item>
          <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 上传合同 -->
      <el-dialog title="上传合同" :visible.sync="conbook" width="20%" :before-close="handleClose">
        <el-upload
          ref="uploadExcel"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="limitNum"
          :auto-upload="false"
          accept=".xlsx"
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
          :on-exceed="exceedFile"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
        >
          <el-button size="small" plain>选择文件</el-button>
        </el-upload>
        <el-form-item>
          <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "../../../design/dataChange";
export default {
  name: "det",
  data() {
    return {
      //表单数据
      cool: {
        mainTaskName: "",
        industry_Type: "",
        publishTime: "",
        deadline: "",
        mainTaskDetail: "",
        leader: "",
        taskState: 0
      },

      //申请表数据
      tableData1: [
        {
          checkApplyState: "",
          applyTime: "",
          checkApplyTime: "",
          applyWay: ""
        }
      ],

      //任务计划表数据
      tableData2: [
        {
          applyWay: "",
          checkPlanState: "",
          planUploadTime: "",
          checkPlanTime: ""
        }
      ],

      //设计提交表数据
      tableData3: [
        {
          supplierCheckDesignState: "",
          uploadDesignTime: "",
          supplierCheckDesignTime: "",
          demandorCheckDesignState: "",
          demandorCheckDesignTime: ""
        }
      ],

      //合同管理数据
      tableData4: [
        {
          contractState: "",
          uploadContractTime: "",
          checkContractTime: ""
        }
      ],
      //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit" },
        { title: "计划提交", icon: "el-icon-upload" },
        { title: "任务进行中", icon: "el-icon-picture" },
        { title: "审核", icon: "el-icon-message-solid" },
        { title: "验收", icon: "el-icon-s-promotion" },
        { title: "完成", icon: "el-icon-s-claim" }
      ],
      //申请被拒绝原因
      addList1: {
        refuseApplyMessage: ""
      },
      //计划书上传
      planbook: false,
      //合同上传
      conbook: false,
      //设计计划拒绝弹窗
      addVisible1: false,
      //状态
      state: "",
      // 默认步骤数
      milepostActive: 0,
      // 动态添加类名
      stepActive: "stepActive",
      //任务Id
      taskId: 1,
      //表格显示控制
      show: 0,
      //文件上传数据
      limitNum: 1,
      formLabelWidth: "100px",
      form: {
        file: ""
      },
      fileList: []
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },
  created() {
    //  this.getParams();
    this.showData();
  },
  methods: {
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },
    //数据显示
    showData() {
      console.log("你好");
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.tableData1 = response.data.allData.b;
          this.tableData2 = response.data.allData.b;
          this.tableData3 = response.data.allData.a;
          this.tableData4 = response.data.allData.a;
          this.cool = response.data.allData.a[0];
          this.state = response.data.allData.a[0].taskState;
          if (this.state == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.state == "计划提交") {
            this.milepostActive = 1;
            this.show = 1;
          } else if (this.state == "任务进行中") {
            this.milepostActive = 2;
            this.show = 2;
          } else if (this.state == "审核") {
            this.milepostActive = 3;
            this.show = 3;
          } else if (this.state == "验收") {
            this.milepostActive = 4;
            this.show = 4;
          } else if (this.state == "完成") {
            this.milepostActive = 5;
            this.show = 5;
          } else {
            this.milepostActive = 6;
            if (response.data.allData.b[0].refuseApplyMessage != null) {
              this.show = 0;
            } else if (response.data.allData.b[0].refusePlanMessage != null) {
              this.show = 1;
            }
          }
          this.this.taskId = response.data.allData.a[0].taskId;
          console.log(response.data.allData.a[0].taskState);
          console.log(response.data.allData);
        });
    },
    //返回列表
    goBack() {
      this.$router.push({
        path: "/admin/substaskDetail",
        query: {
          taskId: this.taskId
        }
      });
    },
    //接受通过
    accept(row) {
      this.$confirm("确定接受需求么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/accept",
          data: data
        });
        this.$message({
          message: "接受成功",
          type: "success"
        });
      });
    },
    //接受不通过
    noAccept(row) {
      this.$confirm("确定拒绝需求么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/noAccept",
          data: data
        });
        this.$message({
          message: "拒绝通过",
          type: "success"
        });
      });
    },
    //拒绝原因
    refuseReason(row) {
      var that = this;
      var data = Qs.stringify({
        taskId: row.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList1 = response.allData.b[0];
          this.addVisible1 = true;
        });
    },
    //设计通过
    designSuccess(row) {
      this.$confirm("确定将设计审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/designSuccess",
          data: data
        });
        this.$message({
          message: "审核通过",
          type: "success"
        });
      });
    },
    //设计不通过
    designRefuse(row) {
      this.$confirm("确定审核不通过么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/designRefuse",
          data: data
        });
        this.$message({
          message: "审核不通过",
          type: "success"
        });
      });
    },

    upLoadPlan() {
      this.planbook = true;
    },
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: "警告",
        message: `只能选择 ${
          this.limitNum
        } 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log("change");
      console.log(file);
      this.form.file = file.raw;
      console.log(this.form.file);
      console.log(fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log("before upload");
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$notify.warning({
          title: "警告",
          message: `只能上传Excel2017（即后缀是.xlsx）的文件`
        });
      }
      if (size > 10) {
        this.$notify.warning({
          title: "警告",
          message: `文件大小不得超过10M`
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: `文件上传失败`
      });
    },
    uploadFile() {
      this.$refs.uploadExcel.submit();
      /*
      let formData = new FormData()
      formData.append('file', this.form.file)
      axios.post('https://jsonplaceholder.typicode.com/posts/', 
        formData,
        { "Content-Type": "multipart/form-data" }
      )
      .then(res => {
        console.log('res')
        console.log(res)
      })
      .catch(err => {

      })
      */
    }
  }
};
</script>

<style>
.el-step__head.is-process {
  color: #f15e09;
  border-color: #f15e09;
}

.el-step__title.is-process {
  color: #f15e09;
  border-color: #f15e09;
}

.table {
  font-size: 13px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 960px;
  border: none;
  /* border: 1px solid #00a2e6 ; */
}
.el-page-header__title {
  font-size: 18px;
}
.biaoti {
  font-size: 18px;
}
/* 表格字体粗细 */
.el-table thead {
  font-weight: 200;
}
/* 表格下方每列有无竖线 */
.el-table__row > td {
  border: none;
}

.el-input__inner {
  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0px;
  text-align: center;
}
.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
}
</style>
