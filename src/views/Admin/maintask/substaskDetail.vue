<template>
  <div>
    <div>
      <el-container>
        <el-main style="overflow:hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="cool" :model="cool" label-width="110px" class="form">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称名称">
                  <el-input v-model="cool.mainTaskName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="行业类别">
                  <el-input v-model="cool.industry_Type" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-input
                    v-bind:value='cool.publishTime | formatDate'
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-input  v-bind:value="cool.deadline | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="任务状态">
                  <el-input v-model="cool.taskState" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="完成日期">
                  <el-input  v-bind:value="cool.finishTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="项目负责人">
                  <el-input v-model="cool.principalName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row></el-row>
            <el-row>
              <el-col width="100%">
                <el-form-item label="主项目详情">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width:90%"
                    v-model="cool.mainTaskDetail"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="feichuAll">废除需求任务</el-button>
            <el-button type="primary" class="button1">下载装配文档</el-button>
          </div>
          <el-divider></el-divider>
          <h3>分解任务</h3>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <div>
            <div class="container">
              <div class="handle-box">
                <!-- <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
                >批量删除</el-button>-->
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
               
              <el-table-column prop="taskName" label="任务名称"></el-table-column>
              <el-table-column prop="taskType" label="任务类别"></el-table-column>
              <el-table-column prop="beginTime" label="开始时间">
                <template slot-scope="scope">
                    {{scope.row.beginTime | formatDate}}
                    
                  </template>
              </el-table-column>
              <el-table-column prop="deadline" label="结束时间">
                 <template slot-scope="scope">
                    {{scope.row.deadline | formatDate}}
                    
                  </template>
              </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>-->
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete1(scope.row)"
                    >废除</el-button>
                    <el-button @click="mainStaskDetail(scope.row)" type="text" size="small">查看详情</el-button>
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
        <el-dialog title="新增" :visible.sync="addVisible" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="addList" label-width="120px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="分解任务名称">
                  <el-input v-model="addList.taskName"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="任务设计状态">
                  <el-input v-model="addList.taskType"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="addList.beginTime"
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
                    v-model="addList.deadline"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>

                            <el-col :span="11">
                <el-form-item label="任务种类">
                  <el-input v-model="addList.TaskState1"></el-input>
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
                  <el-input v-model="addList.TaskXiangXi" type="textarea" :rows="2"></el-input>
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

              <el-col :span="7">
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

              &nbsp;&nbsp;&nbsp;
              <el-col :span="7">
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
            <el-button type="primary" @click="saveAdd11">确 定</el-button>
          </span>
        </el-dialog>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>




<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "substaskDetail",
  prop: {},
  data() {
    return {
      dialogVisible: false,
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
      visiblehexin: "none",
      shenqing: "none",
      supplyDesigners: ["韩钟工程师", "李林工程师", "张志正工程师"],
      cool: {
        mainTaskName: "",
        industry_Type: "",
        publishTime: "",
        deadline: "",
        mainTaskDetail: "",
        leader: "",
        taskState: ""
      },
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
        
          taskName:"",
          taskType:"",
          beginTime:"",
          deadline:""
        }
      ],
          addList: [
        {
          taskName: null,
          beginTime:"",
          taskType:"",
          deadline:"",
          fabuTime: "",
          endLine: "",
          TaskState: "",
          TaskState1: "",
          TaskXiangXi: "",
        }
      ],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      mainTaskID: "",
      cooList: {supplyCompany:''},
      liebieList:{supplyCompany:''},
      form: {},
      name:'',
      type:'',
      publishdate:'',
      deaddate:'',
      leader:'',
      xiangxi:'',
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },

  created() {
    this.getParams();
    this.getData();
  },

  methods: {
        //保存新增
    saveAdd11() {

      //console.log(this.TaskXiangXi)
       var that = this;
      var data = Qs.stringify({
        userName:'aaaa',
        taskName : this.addList.taskName,
        // taskState : this.addList.TaskState,
        publishTime : this.addList.beginTime,
        endLine : this.addList.deadline,
        taskCategaty :  this.addList.taskType,
        yaoqing : 1,
        taskType : 0,
        mainTaskName : this.name,
        taskXiangxi : this.addList.TaskXiangXi,
        mainTaskID : this.mainStaskID
      });
      console.log(data);
      console.log("123木头人")

      that
        .axios({
          method:"post",
          url:'http://127.0.0.1:8082/SubstaskInformation/addSubstaskInformation',
          data:data,
        })



    this.$message.success("提交成功");
    this.tableData.push(this.addList);
    this.addList = {};
    this.addVisible = false;
    },



    invitate(coo) {
      

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
    /*
     *转跳对应任务信息页面
     */
    // 获取 easy-mock 的模拟数据
    getParams() {
      var routerParams = this.$route.query.mainTaskID;
      this.mainTaskID = routerParams;
      console.log(routerParams);
    },

    getData() {
      console.log(this.mainTaskID);
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/MainTaskInformation/combineMS",
          data: data
          
          // data:this.$store.state.userName
        })
        .then(response => {
          this.cool = response.data.allData.a[0];
          this.mainStaskID = response.data.allData.a[0].mainTaskID;
          this.name = response.data.allData.a[0].mainTaskName;
          this.tableData = response.data.allData.b;
          console.log(response.data.allData);
        });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },

    // 删除操作
    handleDelete1(row) {
      this.$confirm("确定要废除吗？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          substakeID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/MainTaskInformation/feicuBySubstaskstaskID",
          data: data

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
        this.tableData.splice(index, 1);
      });
      //   .then(response => {
      //     this.cool = response.data.allData.a[0];
      //     this.tableData = response.data.allData.b;
      //      console.log(response.data.allData);
      //   });
      // 二次确认删除

      //   .catch(() => {});
    },

    feichuAll() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        var that = this;
        console.log(this.mainTaskID);
        var data = Qs.stringify({
          mainStaskID: this.mainTaskID
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "http://127.0.0.1:8082/MainTaskInformation/feichuByMainstaskID",
          data: data

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
      });
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

    mainStaskDetail(row) {
      console.log(row.taskId);
      this.$router.push({
        path: "/admin/mainStaskDetail",
        query: {
          taskId: row.taskId
        }
      });
    },
    goBack() {
      this.$router.push("/admin/mainStaskShow");
    }
  }
};
</script>

<style>
.table {
  font-size: 14px;
}
.table {
  width: 100%;
  font-size: 14px;
}
</style>