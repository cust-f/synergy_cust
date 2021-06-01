<template>
  <div class="allTask">
    <div class="handle-box">
      <el-input v-model="selectname" placeholder="需求名称" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      :default-sort="{prop: 'applyTime', order: 'descending'}"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="taskId" label="需求ID" width="55" align="center" v-if="YinCang===0"></el-table-column>
      <el-table-column prop="taskName" sortable="custom" label="需求名称"></el-table-column>
      <el-table-column prop="taskState" align="center" label="状态" width="95" sortable="custom" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.taskState === 0">待响应</el-tag>
          <el-tag type="warning" v-else-if="scope.row.taskState === 1">计划审核</el-tag>
          <el-tag type="warning" v-else-if="scope.row.taskState === 2">进行中</el-tag>
          <el-tag class="designshenhe" v-else-if="scope.row.taskState === 3">审核</el-tag>
          <el-tag class="designyanshou" v-else-if="scope.row.taskState === 4">验收</el-tag>
          <el-tag type="success" v-else-if="scope.row.taskState === 5">完成</el-tag>
          <el-tag type="danger" v-else-if="scope.row.taskState === 6">已废除</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="publishingCompanyName" sortable="custom" label="需求方"></el-table-column>
      <el-table-column prop="applyTime" label="开始时间" width="103px" sortable="custom">
        <template slot-scope="scope">{{scope.row.applyTime | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="taskCategoryPart" label="行业类别" width="105" sortable="custom"></el-table-column>
      <el-table-column label="预警" width="50" align="center">
        <template slot-scope="scope">
          <!-- 待响应 -->
          <span v-show="scope.row.taskState == 0">
            <el-image v-if="intervalTime(new Date(),1,scope.row.applyTime,0)==1"
              :src="require('../../../../assets/img/warnGreen.png')"></el-image>
            <el-image v-else-if="intervalTime(new Date(),1,scope.row.applyTime,0)==2"
              :src="require('../../../../assets/img/warnYellow.png')"></el-image>
            <el-image v-else :src="require('../../../../assets/img/warnRed.png')"></el-image>
          </span>
          <!-- 计划上传 -->
          <span v-show="scope.row.taskState == 1">
            <el-image v-if="intervalTime(new Date(),1,scope.row.checkApplyTime,0)==1"
              :src="require('../../../../assets/img/warnGreen.png')"></el-image>
            <el-image v-else-if="intervalTime(new Date(),1,scope.row.checkApplyTime,0)==2"
              :src="require('../../../../assets/img/warnYellow.png')"></el-image>
            <el-image v-else :src="require('../../../../assets/img/warnRed.png')"></el-image>
          </span>
          <!-- 进行中 -->
          <span v-show="scope.row.taskState == 2">
            <el-image v-if="intervalTime(scope.row.deadline,0,new Date(),1)==1"
              :src="require('../../../../assets/img/warnRed.png')"></el-image>
            <el-image v-else-if="intervalTime(scope.row.deadline,0,new Date(),1)==2"
              :src="require('../../../../assets/img/warnYellow.png')"></el-image>
            <el-image v-else :src="require('../../../../assets/img/warnGreen.png')"></el-image>
          </span>
          <!-- 审核 -->
          <!-- 验收 -->
          <span v-show="scope.row.taskState == 3 || scope.row.taskState == 4">
            <el-image v-if="intervalTime(new Date(),1,scope.row.supplierCheckDesignTime,0)==1"
              :src="require('../../../../assets/img/warnRed.png')"></el-image>
            <el-image v-else-if="intervalTime(new Date(),1,scope.row.supplierCheckDesignTime,0)==2"
              :src="require('../../../../assets/img/warnYellow.png')"></el-image>
            <el-image v-else :src="require('../../../../assets/img/warnGreen.png')"></el-image>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="105px" align="center">
        <template slot-scope="scope">
          <el-button @click="Det(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>



<script>
import Qs from "qs";
import { formatDate } from "../../maintask/dataChange";
import { intervalTime } from "../../../../utils/intervalTime";
export default {
  name: "allTask",
  data() {
    return {
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
      //接受表单数据
      formLabelWidth: "120px",
      activeName: "first",
      tableData: [
        {
          taskId: "",
          taskName: "",
          companyName: "",
          publishingCompanyName: "",
          taskState: "",
          taskType: "",
          deadline: "",
          applyTime: "",
          taskCategoryPart: "",
        },
      ],
      multipleSelection: [],
      editVisible: false,
      YinCang: 1,
      addVisible: false,
      selectname: "",
      pageTotal: 0,
      form: {},
      usernameX: sessionStorage.getItem("ms_username"),
      idx: -1,
      id: -1,
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
    handleSearch() {
      console.log(this.usernameX);
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        taskName: this.selectname,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/searchByTaskIdInTaskApply",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
      // this.getData();
    },
    //读取数据的方法
    getData() {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
      });

      that
        .axios({
          method: "post",
          url: "/api/supplier/supplierDesignTaskList",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.tableData = response.data.allData;
        });
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    //查询
    selectByType(type) {
      this.type = type;
      this.selectList();
    },
    // sortByTaskName(sortType) {
    //   var that = this;
    //   var data = Qs.stringify({
    //     userName: this.usernameX,
    //     taskType: 0,
    //     sortType: sortType,
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "/api/supplier/sortAllTaskByTaskName",
    //       data: data,
    //     })
    //     .then((response) => {
    //       this.tableData = response.data.allData;
    //     });
    // },

    // sortByApplyTime(sortType) {
    //   var that = this;
    //   var data = Qs.stringify({
    //     userName: this.usernameX,
    //     taskType: 0,
    //     sortType: sortType,
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "/api/supplier/sortAllTaskByApplyTime",
    //       data: data,
    //     })
    //     .then((response) => {
    //       this.tableData = response.data.allData;
    //     });
    // },

    // sortByPublishingCompanyName(sortType) {
    //   var that = this;
    //   var data = Qs.stringify({
    //     userName: this.usernameX,
    //     taskType: 0,
    //     sortType: sortType,
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "/api/supplier/sortAllTaskByPublishingCompanyName",
    //       data: data,
    //     })
    //     .then((response) => {
    //       this.tableData = response.data.allData;
    //     });
    // },

    // sortByTaskCategoryPart(sortType) {
    //   var that = this;
    //   var data = Qs.stringify({
    //     userName: this.usernameX,
    //     taskType: 0,
    //     sortType: sortType,
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "/api/supplier/sortAllTaskByTaskCategoryPart",
    //       data: data,
    //     })
    //     .then((response) => {
    //       this.tableData = response.data.allData;
    //     });
    // },

    // sortChange(v) {
    //   //正序
    //   if (v.column.order == "ascending") {
    //     //通过属性showWeights进行排序
    //     if (v.column.property == "taskState") {
    //       this.tableData.sort(this.sortList("taskState"));
    //     }
    //     if (v.column.property == "applyTime") {
    //       this.sortByApplyTime(1);
    //     }
    //     if (v.column.property == "taskName") {
    //       this.sortByTaskName(1);
    //     }
    //     if (v.column.property == "publishingCompanyName") {
    //       this.sortByPublishingCompanyName(1);
    //     }
    //     if (v.column.property == "taskCategoryPart") {
    //       this.sortByTaskCategoryPart(1);
    //     }
    //   }
    //   //倒序
    //   else if (v.column.order == "descending") {
    //     if (v.column.property == "taskState") {
    //       this.tableData.sort(this.sortListDesc("taskState"));
    //     }
    //     if (v.column.property == "applyTime") {
    //       this.sortByApplyTime(2);
    //     }
    //     if (v.column.property == "taskName") {
    //       this.sortByTaskName(2);
    //     }
    //     if (v.column.property == "publishingCompanyName") {
    //       this.sortByPublishingCompanyName(2);
    //     }
    //     if (v.column.property == "taskCategoryPart") {
    //       this.sortByTaskCategoryPart(2);
    //     }
    //   }
    // },
    // //通过数组对象的某个属性进行正序排序
    // sortList(property) {
    //   return function (a, b) {
    //     var value1 = a[property];
    //     var value2 = b[property];
    //     return value1 - value2;
    //   };
    // },
    // //通过数组对象的某个属性进行倒序排列
    // sortListDesc(property) {
    //   return function (a, b) {
    //     var value1 = a[property];
    //     var value2 = b[property];
    //     return value2 - value1;
    //   };
    // },
    /**
     * 表格排序事件处理函数
     * @param {object} {column,prop,order} 列数据|排序字段|排序方式
     */
    sortChange({ prop, order }) {
      this.tableData.sort(this.compare(prop,order));
    },
    /**
      * 排序比较
      * @param {string} propertyName 排序的属性名
      * @param {string} sort ascending(升序)/descending(降序)
      * @return {function}
      */
    compare (propertyName, sort) {
      return function (obj1, obj2) {
        var value1 = obj1[propertyName]
        var value2 = obj2[propertyName]
        if (typeof value1 === 'string' && typeof value2 === 'string') {
          const res = value1.localeCompare(value2, 'zh')
          return sort === 'ascending' ? res : -res
        } else {
          if (value1 <= value2) {
            return sort === 'ascending' ? -1 : 1
          } else if (value1 > value2) {
            return sort === 'ascending' ? 1 : -1
          }
        }
      }
    },
    //详情页面跳转方法
    Det(row) {
      this.$router.push({
        path: "/admin/designDet",
        query: {
          taskId: row.taskId,
        },
      });
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
.designjinxingzhong {
  color: #616130;
  background-color: #d6d6ad;
  border-color: #d6d6ad;
}
.designshenhe {
  color: #ff8040;
  background-color: #ffe6d9;
  border-color: #ffdcb9;
}
.designyanshou {
  color: #e066ff;
  background-color: #ebd3e8;
  border-color: #fff0f5;
}
</style>
<style lang="scss">
.allTask{
.el-image {
    vertical-align: middle;
    .el-image__inner{
      width: 16px;
      height: 16px;
    }
  }
}
</style>
<style>
/* .el-image{
    vertical-align: middle;  
  }
.el-image .el-image__inner{
      width: 16px;
      height: 16px;
  } */
</style>
