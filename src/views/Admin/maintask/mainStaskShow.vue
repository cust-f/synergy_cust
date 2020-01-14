<template>
  <div>
    <el-container>
      <el-main>
        <h3>需求任务</h3>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <div>
          <el-divider></el-divider>

          <div class="container">
            <template>
              <div class="handle-box">
                <el-input v-model="query.name" placeholder="需求名称" class="handle-input mr10"></el-input>
                <el-input v-model="query.state" placeholder="需求状态" class="handle-input mr10"></el-input>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="mainstaskTask" label="需求任务名称"></el-table-column>
                <el-table-column prop="type" label="需求类型"></el-table-column>
                <el-table-column prop="leader" label="项目负责人"></el-table-column>
                <el-table-column prop="fabudate" label="发布时间"></el-table-column>
                <el-table-column prop="date" label="截止时间"></el-table-column>
                <el-table-column prop="state" label="状态" align="center" type="text"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
                    >废除</el-button> -->
                    <el-button
                      @click="substaskDetail1(scope.$index, scope.row)"
                      type="text"
                      size="small"
                    >查看详情</el-button>
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

              <el-dialog title="是否同意通过审核" :visible.sync="dialogVisible" width="40%">
                <div></div>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">是</el-button>
                  <el-button type="primary" @click="dialogVisible = false">否</el-button>
                </span>
              </el-dialog>
            </template>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>




    </div>

 
  </div>

  
        </el-main>
    </el-container>
     

</div>
      
</template>

<script>
export default {
  name: "mainStaskShow",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      activeName: "first",
      tableData: [
        {
          id: 1,
          bussessType: "电视测角仪",
          name: "长春奥普光电技术股份有限公司",
          money: 30000,
          state: "成功",
          fabudate: "2018-1-9",
          type:'汽车的制造与使用',
          leader:'王元风',
          date: "2019-5-1",
          mainstaskTask: "光电测控仪器设备",
          substaskTask: "线路设计"
        },
        {
          id: 2,
          bussessType: "磨床生产",
          name: "杭机集团长春一机有限公司",
          money: 5000,
          state: "失败",
          date: "2019-6-1",
                    fabudate: "2018-1-9",
          type:'汽车的制造与使用',
          leader:'王元风',
          mainstaskTask: "平面磨床制作",
          substaskTask: "磨床设计"
        },
        {
          id: 3,
          bussessType: "汽车集成服务",
          name: "启明信息技术股份有限公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-21",
                    fabudate: "2018-1-9",
          type:'汽车的制造与使用',
          leader:'王元风',
          mainstaskTask: "汽车电子产品研发",
          substaskTask: "汽车电子测试设计"
        },
        {
          id: 4,
          bussessType: "卫星应用数据",
          name: "哈尔滨航天恒星数据系统科技有限公司",
          money: 5000,
          state: "成功",
                    fabudate: "2018-1-9",
          type:'汽车的制造与使用',
          leader:'王元风',
          date: "2019-10-12",
          mainstaskTask: "卫星应用数据创新",
          substaskTask: "卫星应用数据采集"
        },
        {
          id: 5,
          bussessType: "通信技术",
          name: "哈尔滨海邻科信息技术有限公司",
          money: 5000,
          state: "失败",
                    fabudate: "2018-1-9",
          type:'汽车的制造与使用',
          leader:'王元风',
          date: "2019-8-10",
          mainstaskTask: "通信技术设计",
          substaskTask: "通讯装备设计"
        },
        {
          id: 6,
          bussessType: "高分子材料创新",
          name: "黑龙江省润特科技有限公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-16",
                    fabudate: "2018-1-9",
          type:'汽车的制造与使用',
          leader:'王元风',
          mainstaskTask: "高分子材料创新",
          substaskTask: "高分子材料设计"
        }
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
      dialogVisible: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
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

    substaskDetail1() {
      this.$router.push("/admin/substaskDetail");
    },

    substaskDetail2() {
      this.$router.push("/admin/substaskDetail");
    },
    substaskDetail3() {
      this.$router.push("/admin/substaskDetail");
    },
    substaskDetail4() {
      this.$router.push("/admin/substaskDetail");
    },
    substaskDetaill() {
      this.$router.push("/admin/substaskDetail");
    },
    substaskDetail6() {
      this.$router.push("/admin/substaskDetail");
    },
    chick() {
      this.$router.push("/admin/check/review");
    }
  },
  // 获取 easy-mock 的模拟数据
  getData() {
    //   this.tableData = res.list;
    //   this.pageTotal = tableData.length;
  },
  // 触发搜索按钮
  handleSearch() {
    this.$set(this.query, "pageIndex", 1);
    this.getData();
  },
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
  },
  // 分页导航
  handlePageChange(val) {}

  /*
   *转跳对应任务信息页面
   */
};
</script>
<style>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}
/* .table {
  font-size: 16px;
} */
.handle-box {
  margin-bottom: 20px;
}
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
  /* font-size: 16px; */
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
.container {
  padding: 0px;
}
</style>
