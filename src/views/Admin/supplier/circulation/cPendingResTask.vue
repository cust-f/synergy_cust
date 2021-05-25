<template>
  <div>
    <div class="handle-box">
      <el-input v-model="selectname" placeholder="需求名称" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)" border class="table" ref="multipleTable" header-cell-class-name="table-header" :default-sort="{prop: 'applyTime', order: 'ascending'}" @sort-change="sortChange">
      <el-table-column label="序号" type="index" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskId" label="任务ID" width="55" align="center" v-if="YinCang===0"></el-table-column>
      <el-table-column prop="taskName" sortable="custom" label="需求名称"></el-table-column>
      <el-table-column prop="applyWay" width="77" label="承接方式">
        <template slot-scope="scope">
          <span v-if="scope.row.applyWay === 0">邀请</span>
          <span v-else-if="scope.row.applyWay === 1">申请</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkApplyState" sortable="custom" width="79" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.checkApplyState === 0">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.checkApplyState === 1">通过</el-tag>
          <el-tag type="danger" v-else>拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="publishingCompanyName" sortable="custom" label="需求方"></el-table-column>
      <el-table-column prop="applyTime" sortable="custom" label="发布日期" width="103">
        <template slot-scope="scope">{{scope.row.applyTime | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="deadline" sortable="custom" label="截止日期" width="103">
        <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
      </el-table-column>
      <el-table-column label="预警" width="50" align="center">
        <template slot-scope="scope">
          <el-image v-if="intervalTime(new Date(),1,scope.row.applyTime,0)==1" :src="require('../../../../assets/img/warnGreen.png')"></el-image>
          <el-image v-else-if="intervalTime(new Date(),1,scope.row.applyTime,0)==2" :src="require('../../../../assets/img/warnYellow.png')"></el-image>
          <el-image v-else :src="require('../../../../assets/img/warnRed.png')"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="98" align="center">
        <template slot-scope="scope">
          <el-button @click="Det(scope.row) " type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, sizes, total, jumper" :current-page="pageIndex1" :page-size="pageSize" :total="tableData.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
    </div>
  </div>
</template>



<script>
import Qs from "qs";
import { formatDate } from "../../maintask/dataChange";
import { intervalTime } from "../../../../utils/intervalTime";
export default {
  name: "pendingResTask",
  created() {
    this.getData();
  },

  data() {
    return {
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,

      tableData: [
        {
          taskId: "",
          taskName: "",
          taskType: "",
          companyName: "",
          applyTime: "",
          deadline: "",
          taskCategoryPart: "",
        },
      ],
      //接受表单数据
      formLabelWidth: "120px",
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      selectname: "",
      YinCang: 1,
      username: sessionStorage.getItem("ms_username"),
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {
    this.getData();
  },
  methods: {
    //外部调用到函数声明
    intervalTime,
    getData() {
      var that = this;
      var data = Qs.stringify({
        userName: this.username,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/supplierPendingResConTaskList",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },

    //详情跳转
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },

    //详情页面跳转方法
    Det(row) {
      this.$router.push({
        path: "/admin/circulationDet",
        query: {
          taskId: row.taskId,
        },
      });
    },
    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        userName: this.username,
        taskName: this.selectname,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/searchByConTaskIdInTaskApply",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
      //this.getData();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    success() {
      this.planbook = false;
      this.acceptf = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /**
     * 表格排序事件处理函数
     * @param {object} {column,prop,order} 列数据|排序字段|排序方式
     */
    sortChange({ prop, order }) {
      this.tableData.sort(this.compare(prop, order));
    },
    /**
     * 排序比较
     * @param {string} propertyName 排序的属性名
     * @param {string} sort ascending(升序)/descending(降序)
     * @return {function}
     */
    compare(propertyName, sort) {
      return function (obj1, obj2) {
        var value1 = obj1[propertyName];
        var value2 = obj2[propertyName];
        if (typeof value1 === "string" && typeof value2 === "string") {
          const res = value1.localeCompare(value2, "zh");
          return sort === "ascending" ? res : -res;
        } else {
          if (value1 <= value2) {
            return sort === "ascending" ? -1 : 1;
          } else if (value1 > value2) {
            return sort === "ascending" ? 1 : -1;
          }
        }
      };
    },
  },
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
