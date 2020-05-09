<!--需求基本信息组件-->

<template>
  <div class="essentialInformation">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">基本信息</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    <br />
    <!-- 进本信息框信息 -->
    <el-card class="box-card">
      <el-form ref="cool" :model="cool" label-width="110px" class="form">
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求名称">
              <template slot-scope="scope">
                <el-button
                  class="anniu"
                  type="primary"
                  text-decoration="underline"
                  @click="ziTaskDetail(scope.row)"
                >{{cool.mainTaskName}}</el-button>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="子任务名称">
              <el-button
                class="anniu"
                type="primary"
                text-decoration="underline"
                @click="taskDetil()"
              >{{cool.taskName}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求方">
              <el-button
                class="anniu"
                type="primary"
                text-decoration="underline"
                @click.native="companyDetil()"
              >{{cool.companyName}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="需求类型">
              <el-input v-bind:value="taskTpyeName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="一级行业类别">
              <el-input v-model="cool.taskCategoryMain" :readonly="true" style="text-align:center"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="二级行业类别">
              <el-input v-model="cool.taskCategoryPart" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="截止日期">
              <el-input
                v-bind:value="cool.deadline|formatDate"
                :readonly="true"
                style="text-align:center"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="需求方电话">
              <el-input v-model="cool.demanderTel" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 公司信息 -->
    <el-dialog :visible.sync="companyDag" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业图片</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="imgsrc" :onerror="errorImg01"></el-image>
      </div>
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业营业执照</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="qiyezhizhao" :onerror="errorImg02"></el-image>
      </div>
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业税务登记证</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="shuiwudengjizheng" :onerror="errorImg03"></el-image>
      </div>
      <br />

      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div>
      <br />
      <div>
        <el-rate label="企业级别：" v-model="companyMessage.star" disabled text-color="#ff9900"></el-rate>
      </div>
      <div align="right" class="formYS">
        <el-form ref="form" :model="companyMessage" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称">
                <el-input v-model="companyMessage.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业联络电话">
                <el-input v-model="companyMessage.businessTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业所在省份">
                <el-input v-model="companyMessage.province" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业所在县市">
                <el-input v-model="companyMessage.city" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业地址">
                <el-input v-model="companyMessage.address" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮政编码">
                <el-input v-model="companyMessage.postcode" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业成立时间">
                <el-input v-bind:value="companyMessage.foundingTime | formatDate" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工商注册号">
                <el-input v-model="companyMessage.brNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业业务范围">
                <el-input v-model="companyMessage.product" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="companyMessage.email" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业联系人">
                <el-input v-model="companyMessage.businessName" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公室电话">
                <el-input v-model="companyMessage.officeNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="注册资产">
                <el-input v-model="companyMessage.registeredCapital" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总资本">
                <el-input v-model="companyMessage.totalAssets" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="固定资产">
                <el-input v-model="companyMessage.fixedAssets" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流动资产">
                <el-input v-model="companyMessage.currentAssets" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="法人代表">
                <el-input v-model="companyMessage.legalPerson" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工人数">
                <el-input v-model="companyMessage.workerNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="开户银行">
                <el-input v-model="companyMessage.deposit_Bank" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账户">
                <el-input v-model="companyMessage.bankNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="企业详情">
                <br />
                <div class="leftDet" v-html="companyDetailContent"></div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="companyDag = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 子任务详情 -->
    <el-dialog :visible.sync="taskDetilDag" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">子任务详情</div>
      <br />
      <el-form ref="form" :model="cool" label-width="120px">
        <el-row>
          <el-col>
            <div class="minheight">{{cool.taskDetail}}</div>
          </el-col>
        </el-row>
      </el-form>
      <br />
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">附件下载</div>
      <div>
        <el-table :data="fileTable" class="customer-table" :show-header="false">
          <el-table-column>
            <template slot-scope="scope">
              <el-link @click.native="downloadFile(scope.row)">{{scope.row.fileName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="filePath" label="真实地址" v-if="yinCang===1"></el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="xiazaiZRWFJ">打包下载</el-button>
        <el-button type="primary" @click="taskDetilDag = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 主任务信息 -->
    <el-dialog :visible.sync="quanbuzirenwu" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">全部子任务</div>
      <br />
      <el-table
        :data="zirenwu"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="taskName" label="子任务名称"></el-table-column>
        <el-table-column prop="taskState" label="子任务状态"></el-table-column>
        <el-table-column prop="acceptCompanyName" label="供应方">
          <template slot-scope="scope">
            <el-span v-if="+scope.row.acceptCompanyName === 0"></el-span>
            <el-span v-else>{{scope.row.acceptCompanyName}}</el-span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quanbuzirenwu = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      companyDag: false, //公司详情弹出框
      quanbuzirenwu: false, //全部子任务弹出框
      taskDetilDag: false, //子任务详情弹出框
      yinCang: 0, //隐藏控制
      //基本信息数据
      cool: [],
      companyDetailContent: "",
      //任务Id
      taskId: 0,
      //主任务Id
      mainTaskId: 0,
      //公司详情
      companyMessage: [],
      // 子任务详情
      zirenwu: [],
      taskTpyeName: "",
      //技术文档附件下载表
      fileTable: [],
      //企业弹窗所需图片
      imgsrc: require("../../company/2.jpg"),
      shuiwudengjizheng: require("../../company/2.jpg"),
      qiyezhizhao: require("../../company/2.jpg"),
      //企业弹窗所需图片默认
      errorImg01: 'this.src="' + require("../../company/2.jpg") + '"',
      errorImg02:
        'this.src="' + require("../../company/2.jpg") + '"',
      errorImg03:
        'this.src="' + require("../../company/2.jpg") + '"'
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    //技术文件
    getFilePath() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getFilePath",
          data: data
        })
        .then(response => {
          console.log(response);
          this.fileTable = response.data.allData;
        });
    },
    //子任务信息获取
    getMsg(msg) {
      this.cool = msg;
      this.mainTaskId = this.cool.mainTaskId;
      this.taskId = this.cool.taskId;
      if (this.cool.taskType == 0) {
        this.taskTpyeName = "设计需求";
      } else if (this.cool.taskType == 1) {
        this.taskTpyeName = "流通需求";
      }
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },
    //单独附件下载
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        url: row.filePath
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/DownloadTelFile",
          data: data,
          responseType: "blob", //服务器返回的数据类型
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          console.log(response);
          const content = response.data;
          const blob = new Blob([content]);
          let url = window.URL.createObjectURL(blob); //表示一个指定的file对象或Blob对象
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", row.fileName);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href); //释放url
        });
    },
    //子任务附件下载
    xiazaiZRWFJ() {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "ZIRWHJ"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          console.log("cap");
          console.log(response);
          this.download(response.data, "ZRWFJ");
        });
    },
    //下载文件
    download(data, leixing) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(
        new Blob([data], { type: "application/zip" })
      );
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      if (leixing === "JHS") {
        link.setAttribute("download", "设计文档.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "ZRWFJ") {
        link.setAttribute("download", "子任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
    taskDetil(row) {
      this.getFilePath();
      this.taskDetilDag = true;
    },
    //需求方信息弹窗
    companyDetil(row) {
      this.getCompay();
      this.companyDag = true;
    },
    getCompay() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/getCompanyFormBytaskId",
          data: data
        })
        .then(response => {
          this.companyMessage = response.data.allData.companyDetail[0];
          this.companyId = response.data.allData.companyDetail[0].companyId;
          this.companyName = response.data.allData.companyDetail[0].companyName;
          this.imgsrc = response.data.allData.companyDetail[0].companyPicture;
          this.qiyezhizhao =
            response.data.allData.companyDetail[0].businessLicence;
          this.shuiwudengjizheng =
            response.data.allData.companyDetail[0].tRCertificate;
          // this.jingyingfanwei = response.data.allData.b;
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
        });
    },
    //子任务详情
    ziTaskDetail() {
      this.quanbuzirenwu = true;
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data
        })
        .then(response => {
          this.zirenwu = response.data.allData.b;
          console.log(this.zirenwu);
        });
    }
  }
};
</script>
<style lang="scss">
.essentialInformation {
  //企业详情
  .leftDet {
    float: left;
    text-align: left;
    width: 95%;
  }
  //各个详情按钮弹窗
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
  .minheight {
    min-height: 100px;
    font-size: 16px;
  }
  // 表格样式调整
  .formYS .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  // 表格样式调整
  .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }
  //对话框头
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }
}
</style>