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
      <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>

      <el-table-column prop="taskName" label="需求名称"></el-table-column>

      <el-table-column prop="bussessType" label="需求类型"></el-table-column>

      <el-table-column prop="publishTask" label="发布需求企业"></el-table-column>

      <el-table-column prop="taskLeader" label="需求负责人" align="center"></el-table-column>

      <el-table-column label="截止日期">
        <template slot-scope="scope">{{scope.row.date}}</template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button @click="jumpResDet() " type="text" size="small">查看详情</el-button>

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
export default {
  name: "pendingResTask",

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
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      tableData: [
        {
          id: 1,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
        {
          id: 2,
          taskName: "磨床生产",
          bussessType: "平面磨床制作",
          publishTask: "杭机集团长春一机有限公司",
          taskLeader: "刘柳",

          date: "2019-12-17"
        },
        {
          id: 3,
          taskName: "通信技术设计",
          bussessType: "通信技术",
          publishTask: "哈尔滨海邻科信息技术有限公司",
          taskLeader: "周舟",
          date: "2019-9-22"
        },
        {
          id: 4,
          taskName: "发电智能制造",
          bussessType: "发电装备",
          publishTask: "哈尔滨电机厂有限责任公司",
          taskLeader: "孙铭",
          date: "2019-11-13"
        },
        {
          id: 5,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
        {
          id: 6,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
        {
          id: 7,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        },
        {
          id: 8,
          taskName: "光电测控仪器设备",
          bussessType: "电视测角仪",
          publishTask: "长春奥普光电技术股份有限公司",
          taskLeader: "李华",
          date: "2019-11-17"
        }
      ],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 全部需求详情页面跳转
    jumpResDet() {
      this.$router.push("/admin/pendingResTaskDet");
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
    success(){
      this.planbook=false;
      this.acceptf =true;
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
