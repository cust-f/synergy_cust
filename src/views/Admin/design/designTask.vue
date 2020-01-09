<template>
  <div>
    <el-container>
      <el-main>
        <div class="box">
        <h3>设计任务</h3></div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <div>
          <div class="container">
            <div class="handle-box">
              <el-button
                type="primary"
                icon="el-icon-delete"
                class="handle-del mr10"
                @click="delAllSelection"
              >批量删除</el-button>
              <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
              <el-input v-model="query.name" placeholder="主任务名称" class="handle-input mr10"></el-input>
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
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
              <el-table-column prop="name" label="主任务名称"></el-table-column>
              <el-table-column prop="subname" label="子任务名称"></el-table-column>
              <el-table-column prop="company" label="供应商名称"></el-table-column>
<el-table-column prop="time" label="上传时间"></el-table-column>
              <el-table-column prop="state" label="状态" align="center"><el-tag>待完成</el-tag></el-table-column>
              <el-table-column prop="remarkstate" label="评价状态" align="center">
            <el-tag>待评价</el-tag>
              </el-table-column>
              
              <el-table-column label="图纸"  align="center" width="55">
                <el-button type="text" size="small">下载</el-button>
              </el-table-column>

              <el-table-column label="操作" align="center" width="55">
                <template slot-scope="scope">
                  <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>-->

                  <el-button @click="remarkDetail" type="text" size="small">评价</el-button>
                  
                </template>
              </el-table-column>
              <el-table-column label="是否选择"  align="center">
                <el-button type="success" size="mini" plain >选择</el-button>
                <el-button type="danger" size="mini" plain >拒绝</el-button>
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
          </div>

          <!-- 编辑弹出框 -->
          <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
              <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 新增弹出框 -->
          <!-- <el-dialog title="新增" :visible.sync="addVisible" width="50%">
      <el-form ref="form" :model="addList" label-width="70px">
        <el-form-item label="企业名称">
          <el-input v-model="addList.name"></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input v-model="addList.address"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="addList.money"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addList.state" placeholder="请选择状态">
            <el-option label="成功" value="成功"></el-option>
            <el-option label="失败" value="失败"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addList.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
          </el-dialog>-->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "designTask",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "待完成",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time:"2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "待完成",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time:"2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "待完成",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time:"2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "待完成",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time:"2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "待完成",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time:"2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "待完成",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time:"2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "待完成",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time:"2019-11-15"

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
      radio: "1"
    };
  },
  created() {
    this.getData();
  },
  methods: {
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
    handlePageChange(val) {},
    /*
     *转跳对应任务信息页面
     */
    remarkDetail() {
      this.$router.push("/admin/designTaskEvaluation");
    },
    open2() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    }
  }
};
</script>
<style>
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
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 16px;
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


