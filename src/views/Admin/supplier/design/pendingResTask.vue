<template>
  <div>
    <div class="handle-box">
      <el-input v-model="query.name" placeholder="需求名称" class="handle-input mr10"></el-input>
      <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="acceptCompanyName" label="需求名称"></el-table-column>

      <el-table-column prop="supplierName" label="需求类型"></el-table-column>

      <el-table-column prop="companyName" label="发布需求企业"></el-table-column>

      <el-table-column prop="beginTime" label="发布日期" align="center"></el-table-column>

      <el-table-column prop="deadline" label="截止日期"></el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button @click="pendingResTaskDet() " type="text" size="small">查看详情</el-button>

          <el-button @click="planbook=true" type="text" size="small">接收</el-button>

          <el-button @click="disacceptf=true" type="text" size="small">不接收</el-button>
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

    <el-dialog title="上传需求书" :visible.sync="planbook" width="20%" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">上传需求书</el-button>
        <div slot="tip" class="el-upload__tip">只能上传doc文件</div>
      </el-upload>
      <el-button type="primary" @click="success()">确 定</el-button>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="acceptf" width="20%" :before-close="handleClose">
      <span>上传成功，请等待审核</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="acceptf=false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="disacceptf" width="20%" :before-close="handleClose">
      <span>拒绝成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="disacceptf=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import Qs from "qs";
export default {
  name: "pendingResTask",
  created() {
    this.getData();
  },

  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      acceptf: false, //接受需求弹窗
      disacceptf: false,
      planbook: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },

      tableData: [
        {
          // id: "",
          // acceptCompanyId: "",
          // acceptCompanyName: "",
          // supplierName: "",
          // userId: "",
          // taskCheck: "",
          // companyName: "",
          // state: "",
          // date: ""
        }
      ],
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      tableData: [],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      userName: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: "1"
      });

      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/supplierdesignRestasklist",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },

    // 全部需求详情页面跳转
    // jumpResDet() {
    //   this.$router.push("/admin/pendingResTaskDet");
    // },

    pendingResTaskDet(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/pendingResTaskDet",
        query: {
          taskId: row.taskId
        }
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    success() {
      this.planbook = false;
      this.acceptf = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
  /*
   *转跳对应需求信息页面
   */
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
  width: 260px;
  display: inline-block;
}
.table {
  width: 100%;
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
</style>
