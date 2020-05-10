<template>
  <div >
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
                  :default-sort="{prop: 'taskState,publishTime,time,mainTaskName,taskCategoryMain,principalName', order: 'descending'}"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
                  <el-table-column prop="mainTaskName" label="需求名称" sortable ></el-table-column>
                  <el-table-column prop="taskState" label="状态" sortable  width="80" >
                    <template slot-scope="scope">
                      <el-tag v-if="+scope.row.taskState ===0" type="info">进行中</el-tag>
                      <el-tag v-else-if="+scope.row.taskState ===1"  type="success">已完成</el-tag>
                      <el-tag v-else-if="+scope.row.taskState ===2" type="danger">废除</el-tag>
                    </template>
                  </el-table-column>
                  
                  <el-table-column
                    prop="principalName"
                    label="负责人"
                    sortable
                    width="100"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="taskCategoryMain" label="一级行业类别" width="150" sortable></el-table-column>
                  <el-table-column prop="publishTime" sortable label="发布时间" width="150">
                    <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
                  </el-table-column>
                  <el-table-column prop="time" sortable label="截止时间" width="150" >
                    <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
                  </el-table-column>
                  <el-table-column label="操作" >
                    <template slot-scope="scope">
                      <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
                      >废除</el-button>-->
                      <el-button @click="substaskDetail1(scope.row)" type="text" size="small">查看详情</el-button>
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
      usernameX: localStorage.getItem("ms_username"),
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
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },

  // Vue.filter("moment", function (value, formatString)
  // {
  //   formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  //   return moment(value).format(formatString);
  //   });
  created() {
    this.getData();
    this.GetTime(date);
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
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/listall",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
          this.$refs.configurationTable.$el.style.width = "99.99%";
        });
    },

    handleSearch() {
      console.log(this.selectname);
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        taskName: this.selectname
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/selectByCompanyandTaskName",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
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
      console.log(123);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    substaskDetail1(row) {
      console.log(row.mainTaskID);
      this.$router.push({
        path: "/admin/substaskDetail",
        query: {
          mainTaskID: row.mainTaskID
        }
      });
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
      console.log(val);
    }
  },
  // 获取 easy-mock 的模拟数据
  getData() {
    //   this.tableData = res.list;
    //   this.pageTotal = tableData.length;
  },
  // 触发搜索按钮

  // 删除操作
  handleDelete(index, row) {
    // 二次确认删除
    this.$confirm("确定要删除吗？", "提示", {
      type: "warning"
    })
      .then(() => {
        this.$message.success("删除成功");
        this.tableData.splice(index, 1);
      })
      .catch(() => {});
  },
  // 多选操作
  handleSelectionChange(val) {
    this.multipleSelection = val;
  },
  delAllSelection() {
    let length = this.multipleSelection.length;
    let str = "";
    for (let j = 0; j < length; j++) {
      this.tableData.splice(this.multipleSelection[j], 1);
      str += this.multipleSelection[j].name + " ";
    }
    this.$message.error(`删除了${str}`);
    this.multipleSelection = [];
  },
  //新增操作
  addData() {
    this.addVisible = true;
  },
  //保存新增
  saveAdd() {
    this.tableData.push(this.addList);
    console.log(this.addList);
    this.addList = {};
    this.addVisible = false;
  },
  // 编辑操作
  handleEdit(index, row) {
    this.idx = index;
    this.form = row;
    this.editVisible = true;
  },
  // 保存编辑
  saveEdit() {
    this.editVisible = false;
    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    this.$set(this.tableData, this.idx, this.form);
  }

  /*
   *转跳对应任务信息页面
   */
};
</script>
<style scoped>

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

</style>
