<!-- 
 * @description: 新增任务  
 * @fileName: newTask.vue 
 * @author: zjw
 * @date: 2020-03-12 22:55:28 
 * @path:  
 * @version: V1.0.5 
!-->
<template>
  <div class="newTask">
    <el-container>
      <el-main>
        <div>
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">新增需求</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <!-- <el-divider></el-divider> -->
          <!-- <el-button type="small" @click="getdata()"></el-button> -->
          <el-form ref="form" label-width="110px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="任务名称">
                  <el-input v-model="name"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="11">
              <el-form-item label="需求项目类别">
                <el-input v-model="type"></el-input>
              </el-form-item>
              </el-col>-->

              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期"
                    v-model="publishdate"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="总负责人">
                  <el-select
                    v-model="leader"
                    placeholder="请选择总负责人"
                    class="selectsupply"
                    style="width:100%;"
                  >
                    <el-option
                      width="180"
                      v-for="coo1 in FZR"
                      :key="coo1"
                      :label="coo1"
                      :value="coo1"
                    ></el-option>
                    
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期"
                    v-model="deaddate"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="11">
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
              </el-col>-->
              <el-col :span="11">
                <el-form-item label="行业类别">
                  <el-cascader
                    style="width:100%;"
                    expand-trigger="hover"
                    v-model="selectCateKeys"
                    :options="xuanzelist"
                    :props="cateProps"
                    @change="handleChange"
                    props.checkStrictly="true"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22" class="xiangxi">
                <el-form-item label="任务详情">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width:100%;"
                    placeholder="请输入内容"
                    v-model="xiangxi"
                    class="gongsiDetail"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="添加附件">
              <el-upload
                class="upload-demo"
                action="/api/MainTaskInformation/import"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleAvatarSuccess"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="tijiao">提交</el-button>
          </div>
        </div>
        <el-divider></el-divider>

      <!-- 原始需求分解 -->
        <!-- <el-card shadow="always">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">需求分解</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
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
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="taskName" label="任务名称"></el-table-column>
              <el-table-column prop="Telphone" label="联络电话"></el-table-column>
              <el-table-column prop="beginTime" label="开始时间"></el-table-column>
              <el-table-column prop="deadline" label="结束时间"></el-table-column>
            </el-table>
          </div> -->

          <!-- 新增弹出框 -->
          <el-dialog title :visible.sync="addVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">需求分解</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
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
                  <el-form-item label="联络电话">
                    <el-input v-model="addList.Telphone" @blur="animate()"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="11">
                  <el-form-item label="发布时间">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="addList.beginTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="11">
                  <el-form-item label="截止时间">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="addList.deadline"
                      style="width: 100%;"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="11">
                  <el-form-item label="行业类别">
                    <el-cascader
                      style="width:100%;"
                      expand-trigger="hover"
                      v-model="selectCateKeys1"
                      :options="xuanzelist"
                      :props="cateProps"
                      @change="handleChange1"
                      props.checkStrictly="true"
                    ></el-cascader>
                  </el-form-item>
                </el-col>

                <el-col :span="11">
                  <el-form-item label="任务类型">
                    <el-select
                      v-model="addList.taskType"
                      placeholder="请选择是或者否"
                      class="selectsupply"
                      @change="liebieShu"
                      style="width:100%;"
                    >
                      <el-option
                        width="180"
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
                <el-col :span="11">
                  <el-form-item label="是否邀请">
                    <el-select
                      v-model="cooList.shifouyaoqing"
                      placeholder="请选择是或者否"
                      class="selectsupply"
                      @change="invitate"
                      style="width:100%;"
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

                <el-col :span="11">
                  <el-form-item label="核心供应商" :style="{display: visiblehexin}">
                    <el-select
                      v-model="SupplierListInt"
                      multiple
                      placeholder="请选择供应商"
                      class="selectsupply"
                      style="width:100%;"
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

                <el-col :span="11">
                  <el-form-item label="等待申请" :style="{display:shenqing}">
                    <el-input
                      placeholder="等待供应方申请"
                      v-model="input"
                      :disabled="true"
                      :style="{display:shenqing}"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row v-if="sfsmkj">
                <el-col :span="11">
                  <el-form-item label="是否发布">
                    <el-select
                      v-model="cooList.shifousimi"
                      placeholder="请选择是或者否"
                      class="selectsupply"
                      @change="simizhiding"
                      style="width:100%;"
                    >
                      <el-option
                        width="180"
                        v-for="coo in shifousimi"
                        :key="coo.id"
                        :label="coo.label"
                        :value="coo.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <font color="red">
                  <el-span class="simichakan" :style="{display:sm}">仅该供应方可见</el-span>
                  <el-span class="simichakan" :style="{display:busm}">全部可见</el-span>
                </font>
              </el-row>

              <el-row>
                <el-col :span="22">
                  <el-form-item label="分解任务详细">
                    <el-input v-model="addList.TaskXiangXi" type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="添加附件">
                <el-upload
                  class="upload-demo"
                  action="http://127.0.0.1:8081/MainTaskInformation/import"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleAvatarSuccess"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
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
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="企业名称">
                <el-select v-model="addList1.supplyDesigner" placeholder="请选择设计人员">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDesigner = false">取 消</el-button>
              <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
          </el-dialog>
        <!-- </el-card> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "newTask",

  data() {
    return {
      //禁用今天以前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      shangchuancishu: 0,
      usernameX: sessionStorage.getItem("ms_username"),
      sfsmkj: false, //是否私密指派
      sm: "none", //私密
      busm: "none", //不私秘
      query: {
        pageIndex: 1,
        pageSize: 10,
      },
      //级联选择框的配置对象
      cateProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: true,
      },
      //级联选择框双向绑定到的数组
      selectCateKeys: [],
      //行业分类列表
      xuanzelist: [],
      //级联选择框双向绑定到的数组 =--子
      selectCateKeys1: [],

      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      //只能被调用一次
      firstPlayFlag: true, // 第一次播放标记
      //供应商传值
      SupplierListInt: "",
      //主行业ID
      mainStaskTypeID: "",
      //子行业ID
      subStaskTypeID: "",
      ruleForm: "",
      zzzz: "null",

      visiblehexin: "none",
      shenqing: "none",
      multipleSelection: [], //批量删除数组
      editVisible: false,
      addVisible: false,
      addDesigner: false,
      //控制新增按钮点击
      kongzhi: true,
      personnel: ["许知远", "王添", "白泽"], //总负责人
      statuses: ["数控机床制造", "精密汽车零部件制造"], //任务类别
      supplyCompanies: [
        "沈阳机床集团有限责任公司",
        "起重集团有限公司",
        "长光电子",
      ], //供应商列表
      shifou: [
        {
          id: "0",
          label: "是",
        },
        { id: "1", label: "否" },
      ],
      shifousimi: [
        { id: "0", label: "是" },
        {
          id: "1",
          label: "否",
        },
      ],
      FZR: [{}],
      //供应商列表
      supplierCompany: [
        {
          companyName: "",
          companyId: "",
          pId: "",
        },
      ],
      Task: [
        {
          id: "0",
          label: "设计任务",
        },
        {
          id: "1",
          label: "流通任务",
        },
      ],

      selVal: "",
      supplyDesigners: ["韩钟工程师", "李林工程师", "张志正工程师"],
      // mainStaskType: [
      //   {
      //     id: "",
      //     industryName: "",
      //     pId: ""
      //   }
      // ],
      subStaskType: [
        {
          id: "",
          industryName: "",
          pId: "",
        },
      ],
      id: 0, //记录任务数
      //招标信息
      newTask: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        head: "",
        detail: "",
      },
      //子任务表格
      shuju: [
        {
          taskName: "",
          Telphone: "",
          beginTime: "",
          deadline: "",
        },
      ],

      addList: [
        {
          taskName: "",
          Telphone: "",
          beginTime: "",
          deadline: "",
        },
      ],
      addList1: [
        {
          id: "",
          taskNum: "",
          taskName: "",
          taskType: "",
          bidTime: "",
          supplyDesigner: "",
        },
      ],
      cooList: { supplyCompany: "", shifousimi: "" },
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
      TaskXiangXi: "",
      
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    //手机号校验
    animate() {
      var re = /^1\d{10}$/;
      let str = this.addList.Telphone;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        alert("抱歉手机号不合法");
      }
    },

    //级联选中框选中变化项会用到这个函数
    handleChange() {
      console.log(this.selectCateKeys);
      this.mainStaskTypeID = this.selectCateKeys[0];
      this.subStaskTypeID = this.selectCateKeys[1];
      console.log(this.mainStaskTypeID);
      console.log(this.subStaskTypeID);
    },

    //级联选中框选中变化项会用到这个函数
    handleChange1() {
      console.log(this.selectCateKeys1);
      this.mainStaskTypeID = this.selectCateKeys1[0];
      this.subStaskTypeID = this.selectCateKeys1[1];
      console.log(this.mainStaskTypeID);
      console.log(this.subStaskTypeID);
    },

    tijiao() {
      console.log(this.type);
      console.log(this.technicalFile);
      if (this.technicalFile == "null") {
        this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
          type: "warning",
        });
      } else {
        var that = this;
        var data = Qs.stringify({
          userName: this.usernameX,
          technicalFile: this.technicalFileWanzheng,
          name: this.name,
          mainStaskTypeID: this.mainStaskTypeID,
          subStaskTypeID: this.subStaskTypeID,
          publishdate: this.publishdate,
          deaddate: this.deaddate,
          principalName: this.leader,
          xiangxi: this.xiangxi,
        });
        console.log(data);
        that
          .axios({
            method: "post",
            url: "/api/MainTaskInformation/addMainTaskInformation",
            data: data,
          })
          .then((response) => {
            this.mainStaskID = response.data.allData;
            this.zzzz = response.data.allData;
            if (this.zzzz != "null") {
              console.log(this.zzzz);
              this.$message.success("提交成功");
                    this.$router.push({
        path: "/admin/substaskDetail",
        query: {
          mainTaskID:this.zzzz
        }
      });
              //老页面的弹窗
              //this.kongzhi = false;
              //this.technicalFileWanzheng = "";
            }
          })
          .catch((error) => {
            console.log(error);
            if (error != null) {
              this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
                type: "warning",
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
    handleAvatarSuccess(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      this.technicalFileWanzheng =
        this.technicalFileWanzheng +
        this.technicalFile[this.shangchuancishu] +
        "linklink";
      this.shangchuancishu = this.shangchuancishu + 1;
    },
    invitate(coo) {
      console.log(coo);

      if (coo == 0) {
        //console.log(coo);
        this.visiblehexin = "inline";
        this.shenqing = "none";
        this.sfsmkj = true;
      } else {
        //console.log(coo);
        this.shenqing = "inline";
        this.visiblehexin = "none";
        this.sfsmkj = false;
      }
    },

    simizhiding(coo) {
      console.log(coo);

      if (coo == 0) {
        //console.log(coo);
        this.busm = "inline";
        this.sm = "none";
      } else {
        //console.log(coo);
        this.sm = "inline";
        this.busm = "none";
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
        aaaa: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/selectMainType",
          data: data,
        })
        .then((response) => {
          // this.mainStaskType = response.data.allData.a;
          this.shuju = response.data.allData.b;
          this.xuanzelist = this.getTreeData(response.data.allData.c);
          this.FZR = response.data.allData.d;
        });
    },

    //将级联选择器最后一行的数据去掉
    getTreeData(data) {
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = null;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    //新增操作
    addData() {
      // 传递this.type
      this.$router.push({
        path: "/admin/addSubTask",
        query: {
          type: this.type,
          mainTaskID: this.mainStaskID,
          name: this.name,
        },
      });
      // this.addVisible = true;
      // var that = this;
      // var data = Qs.stringify({
      //   PId: this.type,
      //   username: this.usernameX
      // });
      // that
      //   .axios({
      //     method: "post",
      //     url: "/api/SubstaskInformation/selectSubType",
      //     data: data
      //   })
      //   .then(response => {
      //     this.subStaskType = response.data.allData.a;
      //     this.supplierCompany = response.data.allData.b;
      //     console.log(response);
      //   });
    },

    addDesignerButton() {
      this.addDesigner = true;
    },
    //保存新增
    saveAdd11() {
      //console.log(this.TaskXiangXi)
      if (this.technicalFile == "null") {
        this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
          type: "warning",
        });
      } else {
        if (this.cooList.shifousimi != 1) {
          this.cooList.shifousimi = 0;
          console.log("是否私密" + this.cooList.shifousimi);
        }
        var that = this;
        var data = Qs.stringify({
          userName: this.usernameX,
          taskName: this.addList.taskName,
          // taskState : this.addList.TaskState,
          publishTime: this.addList.beginTime,
          endLine: this.addList.deadline,
          mainStaskTypeID: this.mainStaskTypeID,
          subStaskTypeID: this.subStaskTypeID,
          yaoqing: this.cooList.shifouyaoqing,
          sssm: this.cooList.shifousimi,
          taskType: this.addList.taskType,
          mainTaskName: this.name,
          taskXiangxi: this.addList.TaskXiangXi,
          mainTaskID: this.mainStaskID,
          Technonlgy_File: this.technicalFileWanzheng,
          Telphone: this.addList.Telphone,
          taskID: "100086",
          SupperListINt: this.SupplierListInt,
        });
        console.log(this.SupplierListInt);
        console.log(data);

        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/addSubstaskInformation",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .catch((error) => {
            console.log(error);
            if (error != null) {
              this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
                type: "warning",
              });
            }
          });
        this.$message.success("提交成功");
        this.addVisible = false;
        this.shuju.push(this.addList);
        this.addList = {};
        this.technicalFileWanzheng = "";
        this.selectCateKeys1 = {};
      }
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    //控制上传
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>

<style lang="scss">
.newTask {
  .xuanzeqi {
    .el-upload-list__item {
      width: 90%;
    }
    .first-child.el-upload-list__item {
      width: 90%;
    }
    width: 180px !important;
  }
  .el-select-dropdown el-popper {
    min-width: 180px;
  }

  .el-select .el-input__inner .selectsupply {
    width: 200px;
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
  .el-upload--text {
    width: 85px;
    height: 40px;
  }

  .button1 {
    width: 100px;
    height: 40px;
  }
}
</style>