<template>
  <div class="mainStaskShow">
    <el-container>
      <el-main>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">需求任务</div>
          <!-- <el-divider></el-divider> -->
          <br>
          <div class="container">
              <div class="handle-box">
                <el-input v-model="selectname" placeholder="需求名称" class="handle-input mr10"></el-input>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
              </div>
                <el-table
                  :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                  @sort-change="sortChange"
                  
                >
                <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
                  <el-table-column prop="mainTaskName" label="需求名称" sortable='custom'></el-table-column>
                  <el-table-column prop="mainTaskType" label="需求类别" width="101" sortable='custom'>
                    <template slot-scope="scope">
                      <span v-if="+scope.row.mainTaskType===0">设计需求</span>
                      <span v-else>流通需求</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="taskState" label="状态" align="center" width="80" sortable='custom'>
                    <template slot-scope="scope">
                      <el-tag v-if="+scope.row.taskState ===0" >进行中</el-tag>
                      <el-tag v-else-if="+scope.row.taskState ===1"  type="success">已完成</el-tag>
                      <el-tag v-else-if="+scope.row.taskState ===2" type="danger">废除</el-tag>
                    </template>
                  </el-table-column>
                  
                  <el-table-column prop="principalName" label="负责人" width="88" align="center" sortable='custom'></el-table-column>
                  <el-table-column prop="taskCategoryMain" label="一级行业类别" width="131" sortable='custom'></el-table-column>
                  <el-table-column prop="publishTime" label="发布时间" width="101" sortable='custom'>
                    <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
                  </el-table-column>
                  <el-table-column prop="deadline" label="截止时间" width="101" sortable='custom'>
                    <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="90">
                    <template slot-scope="scope">
                      <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
                      >废除</el-button>-->
                      <el-button @click="substaskDetail1(scope.row)" type="text" size="small">查看详情</el-button>
                      <!-- 暂时注释 -->
                      <el-button v-show="scope.row.mainTaskType===1" @click="deleteAllLT(scope.row)" type="text" size="small" class="backDoor">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData.length"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                ></el-pagination>
              </div>
          </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "mainStaskShow",
  data() {
    return {
      usernameX: sessionStorage.getItem("ms_username"),
      pageIndex: 1,
      pageSize: 10,
      activeName: "first",
      tableData: [
      ],
      addList: {
        id: null,
        address: "",
        name: "",
        money: null,
        state: null,
        date: null
      },
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      dialogVisible: false,
      userName: "123",
      mainTaskID: "",
      selectname: ""
    };
  },

  filters: {
    formatDate(time) {
      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },

  // Vue.filter("moment", function (value, formatString)
  // {
  //   formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  //   return moment(value).format(formatString);
  //   });
  created() {
    this.getData();
  },
  methods: {
    GetTime(date) {
      var datee = new Date(date).toJSON();
      return new Date(+new Date(datee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },

    getData() {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/listall",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          //console.log(response);
          this.tableData = response.data.allData;
          // this.$refs.configurationTable.$el.style.width = "99.99%";
        });
    },

    handleSearch() {
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        taskName: this.selectname
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/selectByCompanyandTaskName",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          this.tableData = response.data.allData;
        });

      //this.getData();
    },
    //审核不通过的原因
    open() {
      this.$prompt("请输入审核不通过原因", "提示", {
        confirmButtonText: "修改提交",
        cancelButtonText: "任务废除"
      });
    },
    onSubmit() {
    },
    handleDelete(index, row) {
    },

    handleClick(tab, event) {
    },
    //删除流通任务
    deleteAllLT(row){
      var that = this;
      var data = Qs.stringify({
        mainTaskID: row.mainTaskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/deleteAllTaskLTByMainTaskId",
          data: data
        })
        .then(response => {
            this.$message('删除成功！');
            this.getData();
        });
    },
    substaskDetail1(row) {
      if(row.mainTaskType==0){
        this.$router.push({
          path: "/admin/substaskDetail",
          query: {
            mainTaskID: row.mainTaskID
          }
        });
      }else{
        this.$router.push({
          path: "/admin/substaskDetailLT",
          query: {
            mainTaskID: row.mainTaskID
          }
        });
      }
    },
    chick() {
      this.$router.push("/admin/check/review");
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },
    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    handleSelectionChange(val) {
    },
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
  },
  // // 获取 easy-mock 的模拟数据
  // getData() {
  //   //   this.tableData = res.list;
  //   //   this.pageTotal = tableData.length;
  // },
  // // 触发搜索按钮

  // // 删除操作
  // handleDelete(index, row) {
  //   // 二次确认删除
  //   this.$confirm("确定要删除吗？", "提示", {
  //     type: "warning"
  //   })
  //     .then(() => {
  //       this.$message.success("删除成功");
  //       this.tableData.splice(index, 1);
  //     })
  //     .catch(() => {});
  // },
  // // 多选操作
  // handleSelectionChange(val) {
  //   this.multipleSelection = val;
  // },
  // delAllSelection() {
  //   let length = this.multipleSelection.length;
  //   let str = "";
  //   for (let j = 0; j < length; j++) {
  //     this.tableData.splice(this.multipleSelection[j], 1);
  //     str += this.multipleSelection[j].name + " ";
  //   }
  //   this.$message.error(`删除了${str}`);
  //   this.multipleSelection = [];
  // },
  // //新增操作
  // addData() {
  //   this.addVisible = true;
  // },
  // //保存新增
  // saveAdd() {
  //   this.tableData.push(this.addList);
  //   this.addList = {};
  //   this.addVisible = false;
  // },
  // // 编辑操作
  // handleEdit(index, row) {
  //   this.idx = index;
  //   this.form = row;
  //   this.editVisible = true;
  // },
  // // 保存编辑
  // saveEdit() {
  //   this.editVisible = false;
  //   this.$message.success(`修改第 ${this.idx + 1} 行成功`);
  //   this.$set(this.tableData, this.idx, this.form);
  // },
  // /*
  //  *转跳对应任务信息页面
  //  */
};
</script>
<style  lang="scss">
.mainStaskShow{

/* .table {
  font-size: 16px;
} */
.handle-box {
  margin-bottom: 20px;
}
/* 
.handle-box {
  margin-bottom: 20px;
} */

.handle-select {
  width: 120px;
}
.table123 {
  display: table-cell !important;
  /* width: 100%; */
  font-size: 14px;
}
.handle-input {
  width: 260px;
  display: inline-block;
}

.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}

.box {
  font-size: 24px;
}
.container {
  padding: 0px;
}
.biaoti {
  font-size: 18px;
}
}

</style>
<style>
/* 修改按钮暂时隐藏 */
.backDoor{
  display: none;
}
</style>