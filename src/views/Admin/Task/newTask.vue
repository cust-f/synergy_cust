<!-- 
 * @description: 新增任务
 * @fileName: newTask.vue 
 * @author: zjw
 * @date: 2020-03-12 22:55:28 
 * @path:  
 * @version: V1.0.5 
!-->
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
            <!-- <el-col :span="11">
              <el-form-item label="需求项目类别">
                <el-input v-model="type"></el-input>
              </el-form-item>
            </el-col>-->
            <el-col :span="11">
              <el-form-item label="总负责人">
                <el-input v-model="leader"></el-input>
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
              <el-form-item label="任务类别">
                <el-select
                  v-model="type"
                  placeholder="请选择需求任务类别"
                  class="selectsupply"
                  @change="mainStaskType"
                  style="width:100%;"
                >
                  <el-option
                    v-for="leibie in mainStaskType"
                    :key="leibie.id"
                    :label="leibie.industryName"
                    :value="leibie.id"
                  ></el-option>
                </el-select>
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
          <el-button  size="small" slot="trigger"  type="primary">选取文件</el-button>
          <br>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传单个文件，若要上传多个文件请将全部文件打包压缩成一个文件之后上传</div>
        </el-upload>
</el-form-item>

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
            <el-button
              :disabled="kongzhi"
              type="primary"
              class="handle-del mr10"
              @click="addData"
            >新增</el-button>
          </div>
          <el-table
                :data="shuju"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
              >
              <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="Telphone" label="需求方联络电话"></el-table-column>
            <el-table-column prop="beginTime" label="开始时间"></el-table-column>
            <el-table-column prop="deadline" label="结束时间"></el-table-column>
               
              </el-table>




        </div>

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
import Qs from "qs";

export default {
  name: "newTask",

  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      //上传的文件路径
      technicalFile:"null",
      //只能被调用一次
      firstPlayFlag: true, // 第一次播放标记
      //供应商传值
      SupplierListInt:"",
      ruleForm: "",
      zzzz: "null",
      mainStaskID: "null",
      visiblehexin: "none",
      shenqing: "none",
      multipleSelection: [], //批量删除数组
      editVisible: false,
      addVisible: false,
      addDesigner: false,
      kongzhi: true,
      personnel: ["许知远", "王添", "白泽"], //总负责人
      statuses: ["数控机床制造", "精密汽车零部件制造"], //任务类别
      supplyCompanies: [
        "沈阳机床集团有限责任公司",
        "起重集团有限公司",
        "长光电子"
      ], //供应商列表
      shifou: [
        {
          id: "0",
          label: "是"
        },
        { id: "1", label: "否" }
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

      selVal: "",
      supplyDesigners: ["韩钟工程师", "李林工程师", "张志正工程师"],
      mainStaskType: [
        {
          id: "",
          industryName: "",
          pId: ""
        }
      ],
      subStaskType: [
        {
          id: "",
          industryName: "",
          pId: ""
        }
      ],
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
      shuju: [
        {
          taskName:"",
           Telphone:"",
            beginTime:"",
           deadline:""
        }
      ],

      addList: [
        {
          taskName:"",
           Telphone:"",
            beginTime:"",
           deadline:"",
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
      cooList: { supplyCompany: "" },
      liebieList: { supplyCompany: "" },
      form: {},
      name: "",
      type: "",
      publishdate: "",
      deaddate: "",
      leader: "",
      xiangxi: "",

      //这是新增模态框
      dividename: "",
      fabuTime: "",
      endLine: "",
      TaskState: "",
      TaskState1: "",
      TaskXiangXi: ""
    };
  },
  created() {
    this.getDate();
  },
  methods: {

    tijiao() {
      console.log(this.type);
      console.log(this.technicalFile);
      if(this.technicalFile == 'null'){
         this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
              type: "warning"
            });
      }
      else{
              var that = this;
      var data = Qs.stringify({
        userName:"aaaa",
        technicalFile:this.technicalFile,
        name: this.name,
        type: this.type,
        publishdate: this.publishdate,
        deaddate: this.deaddate,
        principalName: this.leader,
        xiangxi: this.xiangxi
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/MainTaskInformation/addMainTaskInformation",
          data: data
        })
        .then(response => {
          this.mainStaskID = response.data.allData;
          this.zzzz = response.data.allData;
          if (this.zzzz != "null") {
            console.log(this.zzzz);
            this.$message.success("提交成功");
            this.kongzhi = false;
          }
        })
        .catch(error => {
          console.log(error);
          if (error != null) {
            this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
              type: "warning"
            });
          }
        });
      }
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
    // getdata() {
    //   var menuList;
    //   var that = this;
    //   var data = Qs.stringify({
    //     id: this.tableData.id,
    //     taskName: this.tableData.taskName
    //   });
    //   that
    //     .axios({
    //       methods: "post",
    //       url: "/api/user/login",
    //       data: data
    //     })
    //     .then(response => {
    //       console.log(response);

    //       this.$message({
    //         type: "success",
    //         message: this.id
    //       });
    //     });
    // },

    
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
 
     getDate() {
      var that = this;
      var data = Qs.stringify({
        aaaa: "1111"
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/SubstaskInformation/selectMainType",
          data: data
        })
        .then(response => {
          this.mainStaskType = response.data.allData.a;
          this.shuju = response.data.allData.b;
          console.log(response);
        });
    },
    //新增操作
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
        });
    },

    addDesignerButton() {
      this.addDesigner = true;
    },
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
      this.addVisible = false;   
      this.shuju.push(this.addList);
      this.addList = {};
      }
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
 
  }
};
</script>

<style>
.el-select .el-input__inner .selectsupply {
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
.el-upload--text{
  width: 85px;
  height: 40px;
}
</style>