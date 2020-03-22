<template>
  <div>
    <div>
      <el-container>
        <el-main style="overflow:hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="cool" :model="cool" label-width="110px" class="formYS">
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
                  <el-input v-bind:value="cool.publishTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-input v-bind:value="cool.deadline | formatDate" :disabled="true"></el-input>
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
                  <el-input v-bind:value="cool.finishTime | formatDate" :disabled="true"></el-input>
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

           
            <el-row>
              <el-col :span="11">
                <el-form-item label="主项目详情">
                  <el-input
                    v-model="cool.mainTaskDetail"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="feichuAll">废除需求任务</el-button>
            <!-- <el-button type="primary" class="button1">下载装配文档</el-button> -->
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
                  <template slot-scope="scope">{{scope.row.beginTime | formatDate}}</template>
                </el-table-column>
                <el-table-column prop="deadline" label="结束时间">
                  <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
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
                    <el-form-item label="需求方联络电话">
                      <el-input
                        v-model="addList.Telphone"      
                      ></el-input>
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
                    <el-form-item label="任务类型">
                      <el-select
                        v-model="addList.substasktype1"
                        placeholder="请选择"
                        class="selectsupply"
                        @change="subStask"
                        style="width:50%;"
                      >
                        <el-option
                          v-for="leibie in subStaskType"
                          :key="leibie.id"
                          :label="leibie.industryName"
                          :value="leibie.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11">
                    <el-form-item label="任务类别">
                      <el-select
                        v-model="addList.taskType"
                        placeholder="请选择是或者否"
                        class="selectsupply"
                        @change="liebieShu"
                        style="width:50%;"
                      >
                        <el-option
                          v-for="leibie in Task"
                          :key="leibie.id"
                          :label="leibie.label"
                          :value="leibie.id"
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
                        v-model="cooList.shifouyaoqing"
                        placeholder="请选择是或者否"
                        class="selectsupply"
                        @change="invitate"
                      >
                        <el-option
                          width="180"
                          v-for="coo in shifou"
                          :key="coo.id"
                          :label="coo.label"
                          :value="coo.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="核心供应商" :style="{display: visiblehexin}">
                      <el-select
                        v-model="SupplierListInt"
                        multiple placeholder="请选择供应商"
                        class="selectsupply"
                      >
                        <el-option
                          width="180"
                          v-for="supplier in supplierCompany"
                          :key="supplier"
                          :label="supplier.companyName"
                          :value="supplier.companyId"
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

                <el-form-item label="添加附件">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://127.0.0.1:8082/MainTaskInformation/import"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button
                      style="margin-left: 10px;"
                      size="small"
                      type="success"
                      @click="submitUpload"
                    >上传到服务器</el-button>
                    <br />
                    <div slot="tip" class="el-upload__tip">只能上传单个文件，若要上传多个文件请将全部文件打包压缩成一个文件之后上传</div>
                  </el-upload>
                </el-form-item>
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
      //核心供应商
      supperlier:"",
            //上传的文件路径
      technicalFile:"null",
      dialogVisible: false,
      type: "", //主任务类型
      personnel: ["许知远", "王添", "白泽"], //总负责人
      statuses: ["数控机床制造", "精密汽车零部件制造"], //任务类别
      supplyCompanies: [
        "沈阳机床集团有限责任公司",
        "起重集团有限公司",
        "长光电子"
      ], //供应商列表
      Task: ["设计任务", "流通任务"],
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
          taskName: "",
          taskType: "",
          beginTime: "",
          deadline: ""
        }
      ],
      subStaskType: [
        {
          id: "",
          industryName: "",
          pId: ""
        }
      ],
      //供应商列表
      supplierCompany: [
        {
          companyName: "",
          companyId: "",
          pId: ""
        }
      ],
      Task: [
        {
          id: "0",
          label: "设计任务"
        },
        {
          id: "1",
          label: "流通任务"
        }
      ],
      addList: [
        {
          taskName: null,
          beginTime: null,
          deadline: "",
          TaskState: "",
          TaskState1: "",
          TaskXiangXi: "",
          taskType: "",
          substasktype: "",
          substasktype1: "",
          Telphone:""//电话
        }
      ],
      shifou: [
        {
          id: "0",
          label: "是"
        },
        { id: "1", label: "否" }
      ],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      mainTaskID: "",
      cooList: { shifouyaoqing: "" },
      SupplierListInt:"",
      liebieList: { supplyCompany: "" },
      form: {},
      name: "",
      type: "",
      publishdate: "",
      deaddate: "",
      leader: "",
      xiangxi: ""
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
            if(this.technicalFile == 'null'){
         this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
              type: "warning"
            });
      }else{   
      var that = this;
      var data = Qs.stringify({
        userName: "aaaa",
        taskName: this.addList.taskName,
        // taskState : this.addList.TaskState,
        publishTime: this.addList.beginTime,
        endLine: this.addList.deadline,
        taskCategaty: this.addList.substasktype1,
        yaoqing: this.cooList.shifouyaoqing,
        taskType: this.addList.taskType,
        mainTaskName: this.name,
        taskXiangxi: this.addList.TaskXiangXi,
        mainTaskID: this.mainStaskID,
        Technonlgy_File:this.technicalFile,
        Telphone:this.addList.Telphone,
        SupperListINt:this.SupplierListInt
        
      });
      console.log(this.SupplierListInt);
      console.log(data);

      that
        .axios({
        method: "post",
        url: "http://127.0.0.1:8082/SubstaskInformation/addSubstaskInformation",
        data: data,
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
       })
        .catch(error => {
          console.log(error);
          if (error != null) {
            this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
              type: "warning"
            });
          }
        });
      this.$message.success("提交成功");
      this.tableData.push(this.addList);
      this.addList = {};
      this.addVisible = false;
      location.reload()
      }
    },

    invitate(coo) {
      console.log(coo);

      if (coo == 0) {
        //console.log(coo);
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
          this.type = response.data.allData.a[0].industry_Type;
          console.log(response);
          console.log(this.type);
          console.log(this.name);
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

    //新增操作 查询子任务列别及供应商列表
    addData() {
      this.addVisible = true;
      var that = this;
      var data = Qs.stringify({
        PId: this.type,
        username :"aaaa"
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/SubstaskInformation/selectSubType",
          data: data
        })
        .then(response => {
          this.subStaskType = response.data.allData.a;
          this.supplierCompany = response.data.allData.b;
          console.log(response);
          console.log(this.supperlier)
        });
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
    },
        //上传文件
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    handleAvatarSuccess(response, file, fileList){
      this.technicalFile = response
      console.log(response)
    },
  }
};
</script>

<style>
.formYS .el-input__inner{
     /* // 表格样式调整 */
   
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
}
.formYS .el-input.is-disabled .el-input__inner{
    background-color: #ffffff;
    color:#606266
}
 
.table {
  font-size: 14px;
}
.table {
  width: 100%;
  font-size: 14px;
}
</style>