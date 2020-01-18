<template>
  <el-container>
    <el-main>
      <div class="newTask">
        <h3>新增需求</h3>
        <el-divider></el-divider>
        <!-- <el-button type="small" @click="getdata()"></el-button> -->
        <el-form ref="form" label-width="110px" class="box">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求任务名称">
                <el-input v-model="name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求项目类别">
                <el-input v-model="type"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="发布时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="publishdate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="deaddate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="总负责人">
                <el-input v-model="leader"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="22">
              <el-form-item label="需求任务详细">
                <el-input type="textarea" :rows="3" v-model="xiangxi"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div id="div2" align="right">
          <el-button type="primary" class="button1" @click="tijiao">提交</el-button>
        </div>
      </div>
      <el-divider></el-divider>

      <el-card shadow="always">
        <h3>需求分解信息</h3>
        <br />
        <div class="container">
          <div class="handle-box">
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
            <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="taskNum" label="子任务编号" align="center"></el-table-column>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="taskType" label="任务类别"></el-table-column>
            <el-table-column prop="bidTime" label="开始时间"></el-table-column>
            <el-table-column prop="supplyCompany" label="供应商"></el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope>
                <el-button @click="supplyDetail" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" label-width="120px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="分解任务名称">
                  <el-input v-model="dividename"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="任务设计状态">
                  <el-input v-model="TaskState"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="fabuTime"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="endLine"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>

                            <el-col :span="11">
                <el-form-item label="任务种类">
                  <el-input v-model="TaskState1"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11" >
                <el-form-item label="任务类别">
                  <el-select
                    v-model="liebieList.supplyCompany"
                    placeholder="请选择是或者否"
                    class="selectsupply"
                    @change="liebieShu"
                    style = "width:50%;"
                  >
                    <el-option
                      v-for="leibie in Task"
                      :key="leibie"
                      :label="leibie"
                      :value="leibie"
                    ></el-option>
                  </el-select>      
                </el-form-item>
              </el-col>


            </el-row>

            
            <el-row>

              <el-col :span="22">
                <el-form-item label="分解任务详细">
                  <el-input v-model="TaskXiangXi" type="textarea" :rows="2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


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
import Qs from "qs"

export default {
  name: "newTask",

  data() {
    return {
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
      statuses: ["数控机床制造", "精密汽车零部件制造"], //任务类别
      supplyCompanies: [
        "沈阳机床集团有限责任公司",
        "起重集团有限公司",
        "长光电子"
      ], //供应商列表
      shifou: ["是", "否"],
      Task:["设计任务","流通任务"],
      selVal: "",
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
          fabuTime: "",
          endLine: "",
          bidTime: "",
          TaskState: "",
          TaskXiangXi: "",
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
      cooList: {supplyCompany:''},
      liebieList:{supplyCompany:''},
      form: {},
      name:'',
      type:'',
      publishdate:'',
      deaddate:'',
      leader:'',
      xiangxi:'',

      //这是新增模态框
      dividename: "",
          fabuTime: "",
          endLine: "",
          TaskState: "",
          TaskState1: "",
          TaskXiangXi: "",
    };
  },
  methods: {
    tijiao(){
      var that = this;
      var data = Qs.stringify({
        userName:'aaaa',
        name:this.name,
        type:this.type,
        publishdate:this.publishdate,
        deaddate:this.deaddate,
        leader:this.leader,
        xiangxi:this.xiangxi
      });
      console.log(data)
      that  
        .axios({
          method:'post',
          url: "http://127.0.0.1:8082/MainTaskInformation/addMainTaskInformation",
          data:data,
          
       })
               this.$message.success("提交成功");
  
    },
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
    getdata() {
      var menuList;
      var that = this;
      var data = Qs.stringify({
        id: this.tableData.id,
        taskName: this.tableData.taskName
      }); 
      that
      .axios({
        methods: "post",
        url: "/api/user/login",
        data: data
        })
        .then(response =>{
          console.log(response);
          this.$store.commit("SET_TOKEN" , true);
          this.$store.commit("GET_USER" , this.id);
          this.$store.setItem("ms_id" , this.tableData.id);
          this.$message({
            type: "success",
            message: this.id
          })
        })

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

      console.log(this.TaskXiangXi)
       var that = this;
      var data = Qs.stringify({
        userName:'aaaa',
        taskName : this.dividename,
        // taskState : this.addList.TaskState,
        publishTime : this.fabuTime,
        endLine : this.endLine,
        taskCategaty :  this.TaskState,
        yaoqing : this.cooList.supplyCompany,
        taskType : this.liebieList.supplyCompany,
        mainTaskName : this.name,
        taskXiangxi : this.TaskXiangXi
      });
      console.log(data);
      console.log("123木头人")

      that
        .axios({
          method:'post',
          url:'hhttp://127.0.0.1:8082/SubstaskInformation/addSubstaskInformation',
          data:data,
        });


 this.$message.success("提交成功");
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
.el-select .el-input__inner .selectsupply{
  width: 200px;
}
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