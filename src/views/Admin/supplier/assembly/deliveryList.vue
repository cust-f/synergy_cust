<!--发货清单组件-->
<template>
  <div class="deliveryList">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
      发货清单
    </div>
    <br />
    <el-table
      :data="deliveryList"
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
      <el-table-column prop="taskName" label="需求名称"></el-table-column>

      <el-table-column
        prop="Consignment_State"
        width="100"
        align="center"
        label="验收状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.demandorCheckDesignState === 0"
            >待提交</el-tag
          >
          <el-tag
            type="warning"
            v-else-if="scope.row.demandorCheckDesignState === 1"
            >待审核</el-tag
          >
          <el-tag
            type="success"
            v-else-if="scope.row.demandorCheckDesignState === 2"
            >通过</el-tag
          >
          <el-tag
            type="danger"
            v-else-if="scope.row.demandorCheckDesignState === 3"
            >未通过</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="upLoadCircuaterTime" label="清单上传时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.uploadCircuaterTime === 0"
            >暂未验收</el-span
          >
          <el-span v-else>{{
            scope.row.uploadCircuaterTime | formatDate
          }}</el-span>
        </template>
      </el-table-column>

      <el-table-column prop="checkCircuaterTime" label="验收时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.checkCircuaterTime === 0">暂未验收</el-span>
          <el-span v-else>{{
            scope.row.checkCircuaterTime | formatDate
          }}</el-span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            @click="upLoadCirculationPlan(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.demandorCheckDesignState === 0"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="FHQDFileHistory()"
            v-show="scope.row.demandorCheckDesignState > 0"
            >历史上传</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 上传流通规格书 -->
    <el-dialog
      :visible.sync="upCirculation"
      width="1000px"
      :before-close="handleClose"
    >
      <div style="padding: 0 10px; border-left: 3px solid #4e58c5">
      
      </div>
      <br />
      <el-form ref="form" label-width="110px" class="box">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
          >
            <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                    </template>             
          </el-table-column>
          <el-table-column
            prop="Product_Name"
            label="产品名称"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="Delivery_Time"
            label="发货时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="Consignment_Time_Latest"
            label="发货截至时间"
            width="120"
          ></el-table-column>
          <el-table-column prop="Consignment_State" label="发货状态" width="100">
            <template slot-scope="scope">
              <el-tag v-if="+scope.row.Consignment_State === 0" type="info">待发货</el-tag>
              <el-tag v-else-if="+scope.row.Consignment_State === 1">已发货</el-tag>
              <el-tag v-else-if="+scope.row.Consignment_State === 2" type="success">已完成</el-tag>
              <el-tag v-else type="danger">拒绝</el-tag>
            </template>
          </el-table-column>
           <el-table-column
            prop="Product_Number"
            label="产品数量"
            width="100"
          ></el-table-column>
          <el-table-column prop="Product_Model" label="产品规格" width="100"></el-table-column>
          <el-table-column
            prop="Consignment_Notes"
            label="发货清单备注"
            width="120"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
              <el-button @click="success()" type="text" size="small"
                >提交</el-button
              >
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="success()">全部提交</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="toggleSelection()">导出Excel文件</el-button>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="page"
        >
        </el-pagination>
      </el-form>
    </el-dialog>

    <!-- 文件历史 -->
    <el-dialog title :visible.sync="fileHistoryDia" width="55%">
      <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        文件历史
      </div>
      <br />
      <br />
      <div>
        <el-table
          :data="fileHistoryMessage"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <el-table-column label="序号" type="index" width="55" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="文件名" align="center">
            <template slot-scope="scope">
              <el-link @click.native="downloadFile(scope.row)">{{
                scope.row.fileName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="publishingCompanyName"
            label="发布企业"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="fileType"
            width="100"
            label="文件类型"
            align="center"
          >
            <template slot-scope="scope" align="center">
              <span v-if="scope.row.fileType === 0">合同文件</span>
              <span v-else-if="scope.row.fileType === 1">发货清单</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="filePath"
            width="100"
            label="文件地址"
            v-if="yinCang === 0"
          ></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间">
            <template slot-scope="scope">
              <el-span>{{ scope.row.uploadTime | formatDate }}</el-span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      fileType: 0,
      taskId: 0,
      yinCang: 1,
      userName: sessionStorage.getItem("ms_username"),
      deliveryList: [],
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
      tableData: [
        {
          Consignment_ID: "1000015",
          Task_Id: "1-1",
          Product_Name:"华子",
          Delivery_Time:'',
          Consignment_Time_Latest: "2020.10.5",
          Consignment_State: "",
          Product_Number: "5",
          Product_Model:"很大很大",
          Product_Price: "500",
          Contact_number:"18904402315",
          Shipping_address:"",
          Total_Price: "2500",
          Consignment_Notes: "麻烦快点谢谢",
        },
        
      ],
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    //获得信息
    getMsg(msg) {
      this.deliveryList = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },

    //取消选择的方法
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //分页功能的实现
    page(currentPage) {
      const _this = this;
      axios.get("" + (currentPage - 1) + "/6").then(function (resp) {
        console.log(resp);
        _this.tableData = resp.data.content;
        _this.pageSize = resp.data.size;
        _this.total = resp.data.totalElements;
      });
    },
    /* //发货清单下载
    FFQDXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "FHQD"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          
          let url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/zip" })
          );
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "发货清单.zip");
          document.body.appendChild(link);
          link.click();
        });
    },
    FHQDFileHistory() {
      this.fileType = 1;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        fileType: this.fileType
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/getFileHistory",
          data: data
        })
        .then(response => {
          // 
          this.fileHistoryMessage = response.data.allData;
          this.fileHistoryDia = true;
        });
    }, */
    // 下载文件
    /* download(data, leixing) {
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
      } else if (leixing === "FFQD") {
        link.setAttribute("download", "发货清单.zip");
      } else if (leixing === "ZRWFJ") {
        link.setAttribute("download", "子任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    }, */
    //上传流通计划书
    upLoadCirculationPlan() {
      this.upCirculation = true;
    },
    /*
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {
    },
    handleRemove(file, fileList) {
      this.fileNumber = this.fileNumber - 1;
    },
    addRoutes1() {
      this.$router.push('/admin/SubmitChecklist')
    },
    handleAvatarSuccess(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      this.technicalFileWanzheng =
        this.technicalFileWanzheng +
        this.technicalFile[this.shangchuancishu] +
        "linklink";
      console.log(this.technicalFileWanzheng)
      this.shangchuancishu = this.shangchuancishu + 1;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName:this.userName,
        Text_File: this.technicalFileWanzheng
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/textImportCir",
          data: data
        })
        .then(response => {
          this.technicalFileWanzheng = "";
        });
      this.$router.go(0);
    }
 */
  },
};
</script>

<style lang="scss">
.deliveryList {
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
  }
}
</style>