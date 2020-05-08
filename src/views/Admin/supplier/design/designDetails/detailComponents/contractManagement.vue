<!--合同管理组件-->
<template>
  <div class="contractManagement">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务计划</div>
    <br />
    <el-table
      :data="contractMessage"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="taskName" label="需求名称"></el-table-column>
      <el-table-column prop="checkPlanState" width="100" label="计划审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.checkPlanState === 0">待上传</span>
          <span v-else-if="scope.row.checkPlanState === 1">待审核</span>
          <span v-else-if="scope.row.checkPlanState === 2">通过</span>
          <span v-else-if="scope.row.checkPlanState === 3">拒绝</span>
        </template>
      </el-table-column>
      <el-table-column prop="planUploadTime" label="上传时间">
        <template slot-scope="scope">
          <span v-if="+scope.row.planUploadTime === 0">暂未上传</span>
          <span v-else>{{scope.row.planUploadTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkPlanTime" label="审核时间">
        <template slot-scope="scope">
          <span v-if="+scope.row.checkPlanTime === 0">暂未审核</span>
          <span v-else>{{scope.row.checkPlanTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            @click="upLoadPlanT()"
            type="text"
            size="small"
            v-show="scope.row.checkPlanState === 0"
          >上传</el-button>
          <el-button
            @click="RWJHXZ(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.checkPlanState > 0"
          >下载</el-button>
          <el-button
            @click="refusePlanReason(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.checkPlanState === 3"
          >拒绝原因</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../designDetails/dataChange";
import radarChart from "../designDetails/detailComponents/radarChart";
export default {
  components: {
    "radar-chart": radarChart
  },
  name: "designDet",
  data() {
    return {
      taskId: 0,
      userName: localStorage.getItem("ms_username"),
      contractMessage: []
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  created() {
    this.getParams();
    this.showData();
    this.getLDData(); //雷达图数据查找
    this.getFilePath();
  },
  methods: {
    //获得信息
    getMsg(msg) {
      this.contractMessage = msg;
      this.taskId = this.contractMessage.taskId;
    },
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
          this.tableData7 = response.data.allData;
        });
    },
    //个别文件下载
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
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },
    //下载子任务附件
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
    HTFileHistory() {
      this.fileType = 0;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        fileType: this.fileType
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getFileHistory",
          data: data
        })
        .then(response => {
          // console.log(response);
          this.tableData6 = response.data.allData;
          this.fileHistoryDia = true;
        });
    },
    //提交次数 背景颜色变化
    styleswith() {
      if (this.designCount > 0 && this.designCount < 3) {
        document.getElementById("one").style.background = "#00D1B2";
        console.log("这里是很好，看看是不是样式问题");
      }
      if (this.designCount > 2 && this.designCount < 4) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
        console.log("这里是一般，看看是不是样式问题");
      }
      if (this.designCount > 4 || this.designCount == 4) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
        console.log("这里是最差，看看是不是样式问题");
      } else {
        console.log("为啥没去上面啊");
      }
    },
    //任务计划下载
    RWJHXZ(row) {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "jihuashu"
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/Download",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          console.log("cap");
          console.log(response);
          this.download(response.data, "JHS");
        });
    },
    //合同下载
    HTXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "hetong"
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/Download",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          console.log(response);
          this.download(response.data, "HT");
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

    //计划书拒绝原因
    refusePlanReason(row) {
      this.addVisible2 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList2 = response.data.allData.b[0];
        });
    },

    //上传计划书方法
    upLoadPlanT() {
      this.planbook = true;
    },
    //上传合同方法
    upLoadConT() {
      this.conbook = true;
    },
    //雷达图数据查找
    getLDData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      that
        .axios({
          method: "post",
          url: "/api/remarkDetils",
          data: data
        })
        .then(response => {
          this.radarData.radarData = response.data.allData;
          if (response.data.allData[0] == null) {
            this.reMarkId = 0;
          }
          that.$refs.QradarChart.getCharts1();
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileNumber = this.fileNumber - 1;
    },
    
    handleAvatarSuccess1(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      this.technicalFileWanzheng =
        this.technicalFileWanzheng +
        this.technicalFile[this.shangchuancishu] +
        "linklink";
      this.shangchuancishu = this.shangchuancishu + 1;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File1: this.technicalFileWanzheng
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/textImportPlan",
          data: data
        })
        .then(response => {
          this.technicalFileWanzheng = "";
        });
      this.$router.go(0);
    },
    //提交拒绝原因
    SJJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        HTrefuseReason: this.addList4.SJrefuseReason
      });
      console.log(data),
        that.axios({
          method: "post",
          url: "/api/supplier/designRefuse",
          data: data
        });
      this.$message.success("提交成功");
      this.addList4 = {};
      this.designRefuseReason = false;
      this.showData();
    },
    companyDetil(row) {
      this.getCompay();
      this.companyDag = true;
    },
    taskDetil(row) {
      this.taskDetilDag = true;
    },
    //需求方信息弹窗
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
          this.jingyingfanwei = response.data.allData.b;
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
          response.data.allData.companyDetail[0].tRCertificate;
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
        });
    },
    ziTaskDetail() {
      this.quanbuzirenwu = true;
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data

          // data:this.$store.state.userName
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
.contractManagement {

}
</style>