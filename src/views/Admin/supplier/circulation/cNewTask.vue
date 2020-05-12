<template>
  <el-container>
    <el-main>
      <div class="newTask">
        <h3>流通分配需求</h3>
        <el-divider></el-divider>

        <el-form ref="form" :model="form" label-width="110px" class="box">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="newTask.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求类别">
                <el-input v-model="newTask.region" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="截止时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="newTask.date1"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="开始日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="newTask.date2"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="负责人">
                <el-select v-model="newTask.head" placeholder="请选择负责人" style="width: 100%;">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="head in personnel" :key="head" :label="head" :value="head"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="数量">
                <el-input v-model="newTask.count" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="xiangxi">
              <el-form-item label="详细">
                <el-input
                  type="textarea"
                  :rows="3"
                  style="width: 100%;"
                  placeholder="请输入内容"
                  v-model="form.Introduction"
                  class="gongsiDetail"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-divider></el-divider>

      <el-card shadow="always">
        <div style="font-size:20px;">需求分解信息</div>
        <div class="container">
          <div class="handle-box">
            <el-button
              type="primary"
              icon="el-icon-delete"
              class="handle-del mr10"
              @click="delAllSelection"
            >批量删除</el-button>
            <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button>
          </div>
          <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40" align="center"></el-table-column>
            <el-table-column prop="taskNum" label="需求编号" align="center"></el-table-column>
            <el-table-column prop="taskName" label="需求名称"></el-table-column>
            <el-table-column prop="taskType" label="需求类别"></el-table-column>
            <el-table-column prop="bidTime" label="开始时间"></el-table-column>
                        <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column prop="supplyCompany" label="供应商"></el-table-column>
            <el-table-column label="操作" align="center" width="120">
              <template slot-scope>
                <el-button type="danger" class="handle-del mr10" >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
          <el-form ref="form" :model="addList" label-width="120px">
            <el-form-item label="需求名称">
              <el-input v-model="newTask.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="需求类别">
              <el-input v-model="newTask.region" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="数目">
              <el-input v-model="newTask.taskType"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addList.bidTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否邀请">
                  <el-select
                    v-model="cooList.supplyCompany"
                    placeholder="请选择是或者否"
                    class="selectsupply"
                    @change="invitate"
                  >
                    <el-option
                      width="120"
                      v-for="coo in shifou"
                      :key="coo"
                      :label="coo"
                      :value="coo"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="下级供应商" :style="{display: visiblehexin}">
                  <el-select
                    v-model="addList.supplyCompany"
                    placeholder="请选择供应商"
                    class="selectsupply"
                  >
                    <el-option label="全部" value></el-option>
                    <el-option
                      width="120"
                      v-for="company in supplyCompanies"
                      :key="company"
                      :label="company"
                      :value="company"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-input
                  placeholder="等待供应方申请"
                  v-model="input"
                  :disabled="true"
                  :style="{display:shenqing}"
                ></el-input>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
      <br />
      <br />
      <div align="center">
        <el-button type="primary" class="button1" @click="accept = true">确定</el-button>
        <el-button type="primary" class="button1" @click="goBack()">返回</el-button>
      </div>

      <el-dialog title="提示" :visible.sync="accept" width="15%" :before-close="handleClose">
        <span>分配成功</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goBack()">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "newTask",

  data() {
    return {
      accept:false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      visiblehexin: "none",
      shenqing: "none",
      multipleSelection: [], //批量删除数组
      editVisible: false,
      addVisible: false,
      addDesigner: false,
      personnel: ["许知远", "王添", "白泽"], //总负责人
      statuses: ["数控机床制造", "精密汽车零部件制造"], //需求类别
      supplyCompanies: [
        "沈阳机床集团有限责任公司",
        "起重集团有限公司",
        "长光电子"
      ], //供应商列表
      shifou: ["是", "否"],
      selVal: "",
      supplyDesigners: ["韩钟工程师", "李林工程师", "张志正工程师"],
      id: 0, //记录需求数
      //招标信息
      newTask: {
        name: "Name",
        region: "类别",
        date1: "2019-10-5",
        date2: "2019-10-5",
        count: "50000",
        detail: "这里是一段详情"
      },
      //子需求表格
      tableData: [
        {
          count: "10000",
          taskNum: "002",
          taskName: "车辆轴承制造",
          taskType: "小汽车零件制造",
          bidTime: "2019-10-5",
          supplyCompany: "长春光电子微型卫星有限公司"
        }
      ],
      addList: [
        {
          id: "",
          taskNum: "",
          taskName: "",
          taskType: "",
          bidTime: "",
          supplyCompany: ""
        }
      ],
      addList1: [
        {
          id: "",
          taskNum: "",
          taskName: "",
          taskType: "",
          bidTime: "",
          supplyDesigner: ""
        }
      ],
      cooList: {},
      form: {}
    };
  },
  methods: {
    invitate(coo) {
      console.log(coo);
      console.log(coo);

      if (coo == "是") {
        console.log(coo);
        this.visiblehexin = "inline";
        this.shenqing = "none";
      } else {
        //console.log(coo);
        this.shenqing = "inline";
        this.visiblehexin = "none";
      }
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
          --this.id;
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      let length = this.multipleSelection.length;
      this.id = -length;
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

    addDesignerButton() {
      this.addDesigner = true;
    },
    //保存新增
    saveAdd() {
      ++this.id;
      this.addList.id = this.id;
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
    goBack() {
      this.$router.push("/admin/circulationTaskq");
    }
  }
};
</script>

<style>
.newTask textarea {
  min-height: 100px !important;
  width: 500px !important;
}
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
.selectsupply {
  padding-right: 300px;
}
</style>