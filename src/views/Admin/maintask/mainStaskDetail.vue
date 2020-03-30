<template >
  <div class="mainStaskDetaul">
    <el-main style="overflow:hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <!-- <el-steps >
        <el-step title="申请/邀请" icon="el-icon-edit"></el-step>
        <el-step title="计划提交" icon="el-icon-upload"></el-step>
        <el-step title="任务进行中" icon="el-icon-picture"></el-step>
        <el-step title="审核" icon="el-icon-message-solid"></el-step>
        <el-step title="验收" icon="el-icon-s-promotion"></el-step>
        <el-step title="完成" icon="el-icon-s-claim"></el-step>
      </el-steps> -->
      <el-steps :active="milepostActive" align-center>
        <el-step
          v-for="(value, key) in milepost"
          :class="milepostActive== key+1 ? stepActive: '' "
          :title="value.title"
          :icon="value.icon"
          :key="key"
        ></el-step>
      </el-steps>
      <br />
      <br />
      <div class="biaoti">——基本信息——</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <br />
      <el-card class="box-card">
        <el-form ref="cool" :model="cool" label-width="110px" class="form">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求名称:">
                <el-input v-model="cool.mainTaskName" :disabled="true" style="text-align:center"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="子任务名称:">
                <el-input v-model="cool.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="发布企业名称:">
                <el-input v-model="cool.companyName" :disabled="true" style="text-align:center"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="接受企业名称:">
                <el-input v-model="cool.supplierName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="任务截止日期:">
                <el-input
                  v-bind:value="cool.deadline|formatDate"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求方电话:">
                <el-input v-model="cool.demanderTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <br />
      <br />

      <div v-show="milepostActive1">
        <div class="biaoti">——申请列表——</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-table
          :data="tableData1"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="companyName" label="供应商"></el-table-column>
          <el-table-column prop="applyWay" label="承接方式">
            <template slot-scope="scope">
              <span v-if="+scope.row.applyWay === 0">邀请</span>
              <span v-else-if="+scope.row.applyWay === 1">申请</span>
              <span v-else>其他</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyState" label="申请/邀请状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkApplyState === 0">待审核</span>
              <span v-else-if="+scope.row.checkApplyState === 1">通过</span>
              <span v-else>拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请/邀请时间">
            <template slot-scope="scope">{{scope.row.applyTime | formatDate}}</template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button @click="SQTG(scope.row)" type="text" size="small"   v-if="scope.row.checkApplyState===0&&scope.row.applyWay===1"  >通过</el-button>
              <el-button @click="SQJJ(scope.row)" type="text" size="small"  v-if="scope.row.checkApplyState===0&&scope.row.applyWay===1">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>



      <div v-show="milepostActive2">
        <div class="biaoti">——任务计划——</div>
        <br />
        <el-table
          :data="tableData2"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="companyName" label="供应商"></el-table-column>
          <el-table-column prop="checkPlanState" label="计划审核状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkPlanState === 0">待上传</span>
              <span v-else-if="+scope.row.checkPlanState === 1">待审核</span>
              <span v-else-if="+scope.row.checkPlanState === 2">通过</span>
              <span v-else-if="+scope.row.checkPlanState === 3">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="planUploadTime" label="计划上传时间">
            <template slot-scope="scope">
              <span v-if="+scope.row.planUploadTime === 0">暂未上传</span>
              <span v-else> {{scope.row.planUploadTime | formatDate}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="checkPlanTime" label="计划审核时间">
            <template slot-scope="scope">
               <span v-if="+scope.row.checkPlanTime === 0">暂未审核</span>
              <span v-else> {{scope.row.planUploadTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button type="text" size="small" v-if ="scope.row.checkPlanState !==0">下载</el-button>
              <el-button @click="JHSTG(scope.row)" type="text" size="small" v-if="scope.row.checkPlanState===1">通过</el-button>
              <el-button @click="JHSJJ(scope.row)" type="text" size="small" v-if="scope.row.checkPlanState===1">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive3">
        <div class="biaoti">——合同管理——</div>
        <br />
        <el-table
          :data="tableData3"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="acceptCompanyName" label="供应商"></el-table-column>
          <el-table-column prop="contractState" label="合同审核状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.contractState === 0">待上传</span>
              <span v-else-if="+scope.row.contractState === 1">待审核</span>
              <span v-else-if="+scope.row.contractState === 2">通过</span>
              <span v-else-if="+scope.row.contractState === 3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadContractTime" label="合同上传时间">
            <template slot-scope="scope">{{scope.row.uploadContractTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="checkContractTime" label="合同审核时间">
                <template slot-scope="scope">
                  <span v-if="+scope.row.checkContractTime === 'null'">尚未上传</span>
                  <span  v-else>{{scope.row.checkContractTime | formatDate}}</span>
                </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button type="text" size="small" v-if="scope.row.contractState!==0">下载</el-button>
              <el-button @click="HTSHTG(scope.row)" type="text" size="small" v-if="scope.row.contractState===1">通过</el-button>
              <el-button @click="HTSHJJ(scope.row)" type="text" size="small" v-if="scope.row.contractState===1">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive4">
        <div class="biaoti">——设计提交——</div>
        <br />
        <el-table
          :data="tableData4"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="acceptCompanyName" label="供应商"></el-table-column>
          <el-table-column prop="designerName" label="设计人员姓名"></el-table-column>
          <el-table-column prop="designCount" label="设计重做次数"></el-table-column>demandorCheckDesignState
          <el-table-column prop="demandorCheckDesignState" label="设计验收状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.demandorCheckDesignState===0">待上传</span>
              <span v-else-if="+scope.row.demandorCheckDesignState===1">待审核</span>
              <span v-else-if="+scope.row.demandorCheckDesignState===2">通过</span>
              <span v-else-if="+scope.row.demandorCheckDesignState===3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadDesignTime" label="设计上传时间">
            <template slot-scope="scope">{{scope.row.uploadDesignTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="demandorCheckDesignTime" label="设计审核时间">
            <template slot-scope="scope">{{scope.row.demandorCheckDesignTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button type="text" size="small" >下载</el-button>
              <el-button @click="SJTG(scope.row)" type="text" size="small" v-if="scope.row.demandorCheckDesignState===1">通过</el-button>
              <el-button @click="SJJJ(scope.row)" type="text" size="small" v-if="scope.row.demandorCheckDesignState===1">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      
         <!-- 申请拒绝原因弹出框 -->
        <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="addList" label-width="120px">
            <el-row>
              <el-col>
                <el-form-item label="审核拒绝原因">
                  <el-input v-model="addList.SQrefuseReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="SQJJYYTJ">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 计划书拒绝原因弹出框 -->
        <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible1" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="addList1" label-width="120px">
            <el-row>
              <el-col>
                <el-form-item label="审核拒绝原因">
                  <el-input v-model="addList1.JHSrefuseReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="JHSJJYYTJ">确 定</el-button>
          </span>
        </el-dialog>

         <!-- 合同拒绝原因弹出框 -->
        <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible2" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="addList2" label-width="120px">
            <el-row>
              <el-col>
                <el-form-item label="审核拒绝原因">
                  <el-input v-model="addList2.HTrefuseReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="HTJJYYTJ">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 设计拒绝原因弹出框 -->
        <el-dialog title="请输入设计不通过的原因" :visible.sync="addVisible3" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="addList3" label-width="120px">
            <el-row>
              <el-col>
                <el-form-item label="审核拒绝原因">
                  <el-input v-model="addList3.SJrefuseReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="SJJJYYTJ">确 定</el-button>
          </span>
        </el-dialog>

    </el-main>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
export default {
  inject:['reload'],
  name: "mainStaskDetail",
  data() {
    return {
      //申请拒绝原因       的模态框开始是否存在
      addVisible: false,
      //计划书拒绝原因    的模态框开始是否存在
      addVisible1:false,
      //合同退回原因      的模态框开始是否存在
      addVisible2:false,
      //设计退回原因     的模态框开始是否存在
      addVisible3:false,
      activeBZT: "",
      mainTaskID: "",
      //SQRWButton:none,
      //申请任务的id
      applyID:"",
      //子任务的id
      taskID:"",
      //控制4个table是否显示的
      milepostActive1: -1, 
      milepostActive2: -1,
      milepostActive3: -1,
      milepostActive4: -1,
      cool: {
        mainTaskName: "nihao",
        taskName: "nihao",
        companyName: "",
        supplierName: "",
        deadline: "",
        demanderTel: ""
      },
      tableData1: [
        {
          companyName: "",
          applyWay: "",
          checkApplyState: "", //任务申请审核状态
          applyTime: "", //任务申请审核时间
          checkPlanState: "", //计划审核状态
          checkPlanTime: "" //计划审核时间
        }
      ],
      tableData2: [
        {
          acceptCompanyName: "",
          applyWay: "",
          checkPlanState: "", //计划审核状态
          checkPlanTime: "" //计划审核时间
        }
      ],
      tableData3: [
        {
          acceptCompanyName: "",
          applyWay: "",
          contractState: "", //合同审核状态
          uploadContractTime: "", //合同上传时间
          contractRefuseReason: "" //合同拒绝原因
        }
      ],
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit" },
        { title: "计划提交", icon: "el-icon-upload" },
        { title: "任务进行中", icon: "el-icon-picture" },
        { title: "审核", icon: "el-icon-message-solid" },
        { title: "验收", icon: "el-icon-s-promotion" },
        { title: "完成", icon: "el-icon-s-claim" }
      ],
      // 默认步骤数
      milepostActive: 1,
      // 动态添加类名
      stepActive: "stepActive",
      addList:{
        SQrefuseReason:"",//申请拒绝原因
      },
      addList1:{
        JHSrefuseReason:"",//计划书拒绝原因
      },
      addList2:{
        HTrefuseReason:"",//计划书拒绝原因
      },
      addList3:{
        SJrefuseReason:"",//设计拒绝原因
      }
    };
  },

  filters: {
    formatDate(time) {
      var index=time.lastIndexOf("\.");
      time=time.substring(0,index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    this.getParams();
    this.showData();
  },
  methods: {
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },

    showData() {
      console.log("你好");
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        subStaskID: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/SubstaskInformation/list",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData1 = response.data.allData.b;
          //判断4个table是否隐藏
          if (this.tableData1 == null) {
            this.milepostActive1 = 0;
          }
          this.tableData2 = response.data.allData.c;
          if (this.tableData2 == null) {
            this.milepostActive2 = 0;
          }
          this.tableData3 = response.data.allData.d;
          if (this.tableData3 == null) {
            this.milepostActive3 = 0;
          }
          this.tableData4 = response.data.allData.e;
          if (this.tableData4 == null) {
            this.milepostActive4 = 0;
          }
          // let k = 0;
          // while(response.data.allData.c[k]!=null){
          //   if(response.data.allData.c[k].planUploadTime ===null){
          //         response.data.allData.c[k].planUploadTime =0;
          //   }
          // }
          console.log(response.data.allData.c[0].planUploadTime)

          //判断el-step到第几步骤
          this.cool = response.data.allData.a[0];
          this.milepostActive = response.data.allData.a[0].taskState;
          if (this.milepostActive == "计划提交") {
            this.milepostActive = 1;
          } else if (this.milepostActive == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.milepostActive == "任务进行中") {
            this.milepostActive = 2;
          } else if (this.milepostActive == "审核") {
            this.milepostActive = 3;
          } else if (this.milepostActive == "验收") {
            this.milepostActive = 4;
          } else if (this.milepostActive == "完成") {
            this.milepostActive = 5;
          }
          console.log(this.milepostActive)
          this.mainTaskID = response.data.allData.a[0].mainTaskId;
          console.log(response.data.allData.a[0].taskState);
          console.log(response.data.allData);
        });
    },
    goBack() {
      this.$router.push({
        path: "/admin/substaskDetail",
        query: {
          mainTaskID: this.mainTaskID
        }
      });
    },
    //申请通过与拒绝
    SQTG(row){
      this.$confirm("确定将申请审核通过么？", "提示", {
        type: "warning"
      }).then(()=>{
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          ID:row.id,
          taskID:row.taskId,
          companyID:row.companyId,
          companyName:row.companyName,
        });
        console.log(data);
        that.axios({
          method:"post",
          url:
          "http://127.0.0.1:8082/SubstaskInformation/shenheSQ",
          data:data
        });  
         this.$message({
        message: "审核通过",
        type: "success"
      });
      })
      
    },
    SQJJ(row){
      this.addVisible = true;
      this.applyID = row.id;
    },
    SQJJYYTJ(){
      var that =this;
      var data = Qs.stringify({
        ID:this.applyID,
        SQrefuseReason:this.addList.SQrefuseReason,
      })
      console.log(data),
      that
        .axios({
          method:"post",
          url:'http://127.0.0.1:8082/SubstaskInformation/SQJJReason',
          data:data,
          
        })
        this.$message.success("提交成功");
        this.addList = {};
        this.addVisible = false;
    },
    //计划书通过与拒绝
    JHSTG(row){
      this.$confirm("确定将任务计划书审核通过么？", "提示", {
        type: "warning"
      }).then(()=>{
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID:row.taskId,
        });
        console.log(data);
        that.axios({
          method:"post",
          url:
          "http://127.0.0.1:8082/SubstaskInformation/RWJHSH",
          data:data
        });  
         this.$message({
        message: "审核通过",
        type: "success"
      });
      })
    },
    JHSJJ(row){
      this.addVisible1 = true;
      this.taskId = row.taskId
    },
    JHSJJYYTJ(){
      var that =this;
      var data = Qs.stringify({
        taskId:this.taskId,
        JHSrefuseReason:this.addList1.JHSrefuseReason,
      })
      console.log(data),
      that
        .axios({
          method:"post",
          url:'http://127.0.0.1:8082/SubstaskInformation/JHSJJReason',
          data:data,
          
        })
        this.$message.success("提交成功");
        this.addList1 = {};
        this.addVisible1 = false;
    },
    //合同审核
    HTSHTG(row){
      this.$confirm("确定将合同审核通过么？", "提示", {
        type: "warning"
      }).then(()=>{
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID:row.taskId,
        });
        console.log(data);
        that.axios({
          method:"post",
          url:"http://127.0.0.1:8082/SubstaskInformation/HTSHTG",
          data:data
        });  
         this.$message({
        message: "审核通过",
        type: "success"
      });
      })
    },
    HTSHJJ(row){
      this.addVisible2 = true;
      this.taskId = row.taskId;
    },
    HTJJYYTJ(){
      var that =this;
      var data = Qs.stringify({
        taskId:this.taskId,
        HTrefuseReason:this.addList2.HTrefuseReason,
      })
      console.log(data),
      that
        .axios({
          method:"post",
          url:'http://127.0.0.1:8082/SubstaskInformation/HTJJReason',
          data:data,
          
        })
        this.$message.success("提交成功");
        this.addList2 = {};
        this.addVisible2 = false;
    },
    //设计通过
    SJTG(row){
      this.$confirm("确定将设计审核通过么？", "提示", {
        type: "warning"
      }).then(()=>{
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID:row.taskId,
        });
        console.log(data);
        that.axios({
          method:"post",
          url:"http://127.0.0.1:8082/SubstaskInformation/SJSHTG",
          data:data
        });  
         this.$message({
        message: "审核通过",
        type: "success"
      });
      })
    },
    SJJJ(row){
      this.addVisible3 = true;
      this.taskId = row.taskId
    },
    SJJJYYTJ(){
      var that =this;
      var data = Qs.stringify({
        taskId:this.taskId,
        HTrefuseReason:this.addList3.SJrefuseReason,
      })
      console.log(data),
      that
        .axios({
          method:"post",
          url:'http://127.0.0.1:8082/SubstaskInformation/SJJJReason',
          data:data,
          
        })
        this.$message.success("提交成功");
        this.addList3 = {};
        this.addVisible3 = false;
    }
  }
};
</script>

<style lang="scss">
.mainStaskDetaul {
  .table {
    font-size: 13px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 960px;
    /* border: 1px solid #00a2e6 ; */
  }
  .el-page-header__title {
    font-size: 18px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  /* 表格字体粗细 */
  .el-table thead {
    font-weight: 200;
  }
  /* 表格下方每列有无竖线 */
  .el-table__row > td {
    border: none;
  }
  // 表格样式调整
  .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }
  // 进度样式调整
.el-step__head.is-process {
  color: #f15e09;
  border-color: #f15e09;
}

.el-step__title.is-process {
  color: #f15e09;
  border-color: #f15e09;
}
}
</style>
