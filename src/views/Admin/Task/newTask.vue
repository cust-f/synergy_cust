<template>
  <el-container>
    <el-main>
      <div class="newTask">
        <h3>新增任务</h3>
        <el-divider></el-divider>

        <el-form ref="form" :model="form" label-width="110px" class="box">
          <el-row>
            <el-col :span="11">
              <el-form-item label="项目名称">
                <el-input v-model="newTask.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="项目类别">
                <el-input v-model="newTask.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="投标截止日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="newTask.date1"
                  style="width: 100%;"
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
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="总负责人">
                <el-select v-model="newTask.head" placeholder="请选择总负责人" style="width: 100%;">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="head in personnel" :key="head" :label="head" :value="head"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="项目类别">
                <el-select v-model="newTask.region" placeholder="请选择项目类别" style="width: 100%;">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="tag in statuses" :key="tag" :label="tag" :value="tag"></el-option>
                </el-select>
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
            <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="taskNum" label="子任务编号" align="center"></el-table-column>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="taskType" label="任务类别"></el-table-column>
            <el-table-column prop="bidTime" label="开始时间"></el-table-column>
            <el-table-column prop="supplyCompany" label="供应商"></el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope>
                <el-button type="primary" class="handle-del mr10" @click="addDesignerButton">新增外来企业</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="50%">
          <el-form ref="form" :model="addList" label-width="120px">
            <el-form-item label="子任务编号">
              <el-input v-model="addList.taskNum"></el-input>
            </el-form-item>
            <el-form-item label="任务名称">
              <el-input v-model="addList.taskName"></el-input>
            </el-form-item>
            <el-form-item label="任务类别">
              <el-input v-model="addList.taskType"></el-input>
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
                      width="180"
                      v-for="coo in shifou"
                      :key="coo"
                      :label="coo"
                      :value="coo"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="核心供应商" :style="{display: visiblehexin}">
                  <el-select
                    v-model="addList.supplyCompany"
                    placeholder="请选择供应商"
                    class="selectsupply"
                  >
                    <el-option label="全部" value></el-option>
                    <el-option
                      width="180"
                      v-for="company in supplyCompanies"
                      :key="company"
                      :label="company"
                      :value="company"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-input placeholder="等待供应方申请" v-model="input" :disabled="true" :style="{display:shenqing}"></el-input>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 新增设计人员 -->
        <el-dialog title="添加" :visible.sync="addDesigner" width="50%">
          <el-form ref="form" :model="addList1" label-width="120px">
            <el-form-item label="企业负责人">
              <el-input v-model="addList1.taskNum"></el-input>
            </el-form-item>
            <el-form-item label="任务名称">
              <el-input v-model="addList1.taskName"></el-input>
            </el-form-item>
            <el-form-item label="任务类别">
              <el-input v-model="addList1.taskType"></el-input>
            </el-form-item>
            <el-form-item label="添加时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addList1.bidTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-select v-model="addList1.supplyDesigner" placeholder="请选择设计人员">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="company in supplyCompanies"
                  :key="company"
                  :label="company"
                  :value="company"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDesigner = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "newTask",

  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      visiblehexin: "none",
      shenqing:"none",
      multipleSelection: [], //批量删除数组
      editVisible: false,
      addVisible: false,
      addDesigner: false,
      personnel: ["许知远", "王添", "白泽"], //总负责人
      statuses: ["数控机床制造", "精密汽车零部件制造"], //任务类别
      supplyCompanies: [
        "沈阳机床集团有限责任公司",
        "起重集团有限公司",
        "长光电子"
      ], //供应商列表
      shifou: ["是","否"],
      selVal:'',
      supplyDesigners: ["韩钟工程师", "李林工程师", "张志正工程师"],
      id: 0, //记录任务数
      //招标信息
      newTask: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        head: "",
        detail: ""
      },
      //子任务表格
      tableData: [
        {
          id: "001",
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

      if(coo=="是"){
        console.log(coo);
        this.visiblehexin='inline';
        this.shenqing="none";
      }
      else{
        //console.log(coo);
        this.shenqing='inline';
        this.visiblehexin="none";
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