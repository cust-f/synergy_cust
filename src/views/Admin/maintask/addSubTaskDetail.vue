<template>
  <el-container>
    <el-header height="20px">
      <el-page-header @back="goBack" content="新增子任务"></el-page-header>
      <!-- &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; -->
    </el-header>

    <el-divider></el-divider>
    <el-main>
      <div>
        <!-- 新增基本信息 -->
        <el-form ref="form" :model="addList" label-width="120px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="分解任务名称">
                <el-input @blur="getParent" v-model="addList.taskName"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="需求方联络电话">
                <el-input v-model="addList.Telphone" @blur="animate"></el-input>
                <font color="red">
                  <span v-if="this.addList.Telphone === null">您的联络电话格式输入不正确</span>
                </font>
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
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
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
              <el-form-item label="任务类别">
                <el-select
                  v-model="addList.taskType"
                  placeholder="请选择"
                  class="selectsupply"
                  style="width:100%;"
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
                    v-for="(supplier,index) in supplierCompany"
                    :key="index"
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
              <span class="simichakan" :style="{display:sm}">仅该供应方可见</span>
              <span class="simichakan" :style="{display:busm}">全部可见</span>
            </font>
          </el-row>

          <el-row>
            <el-col :span="22">
              <el-form-item label="分解任务详情">
                <el-input v-model="addList.TaskXiangXi" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="添加附件">
            <el-upload
              class="upload-demo"
              action="/api/MainTaskInformation/import"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              multiple
              :limit="10"
              ref="upload"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传文件</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
        </el-form>

        <!-- <el-button @click="addVisible = false">取 消</el-button> -->
        <div align="right">
          <el-button type="primary" @click="saveAdd11">确 定</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">专利转移</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <!-- 专利表格 -->
      <div>
        <el-table :data="parentTable" style="width: 100%" border highlight-current-row>
          <el-table-column type="index" width="50"></el-table-column>

          <el-table-column label="企业名称" width="320">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-link
                  type="primary"
                  @click="goCompanyDetail(scope.row.companyId,scope.row.token)"
                  size="medium"
                >{{ scope.row.companyName }}</el-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" width="220">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.telphone }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link @click="goTaskDetail(scope.row.taskId,scope.row.platform)" type="info">专利详情</el-link>
              <el-link
                v-if="scope.row.token"
                @click="invite(scope.row.companyName,scope.row.companyId)"
                type="primary"
                style="margin-left:10px;"
              >邀请参与</el-link>
              <el-link v-else type="success" style="margin-left:10px;">发送邮件邀请</el-link>
              <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
export default {
  name: "addSubTaskDetail",
  data() {
    return {
      // =====================================================================
      // 新增子任务
      addList: [
        {
          taskName: "",
          taskType: "",
          beginTime: "",
          publishTime: "",
          taskState: "",
          deadline: "",
          taskCategoryMain: "",
          taskCategoryPart: "",
        },
      ],
      //是否申请
      shifou: [
        {
          id: "0",
          label: "是",
        },
        { id: "1", label: "否" },
      ],
      //供应商列表
      supplierCompany: [
        {
          companyName: "",
          companyId: "",
          pId: "",
        },
      ],
      //是否私密
      shifousimi: [
        { id: "0", label: "是" },
        {
          id: "1",
          label: "否",
        },
      ],
      //级联选择框的配置对象
      cateProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: true,
      },
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
      //私密
      sm: "none",
      //不私秘
      busm: "none",
      //任务详情
      RWXQ: false,
      //初始完整路径
      WZLJ: "",
      //文件数目
      WJSM: "",
      FZR: [{}],
      xiugaiTC: false,
      //xiugaixuqiu
      zhurenwuxiangxi: "",
      sfsmkj: false, //是否私密指派
      liebieList: { supplyCompany: "" },
      fileList: [],
      usernameX: sessionStorage.getItem("ms_username"),
      visiblehexin: "none",
      shenqing: "none",
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      mainTaskID: this.$route.query.mainTaskID,
      cooList: { shifouyaoqing: "", shifousimi: "" },
      SupplierListInt: [],
      form: {},
      name: this.$route.query.name,
      type: this.$route.query.type,
      publishdate: "",
      deaddate: "",
      leader: "",
      xiangxi: "",
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      shangchuancishu: 0,
      dialogVisible: false,
      //级联选择框双向绑定到的数组 =--子
      selectCateKeys1: [],
      //级联选择框双向绑定到的数组
      selectCateKeys: [],
      //行业分类列表
      xuanzelist: [],
      subStaskTypeID: "",
      // ==============================================================================
      //专利列表
      parentTable: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //手机号校验
    animate() {
      var re = /^1\d{10}$/;
      let str = this.addList.Telphone;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.addList.Telphone = null;
      }
    },
    //新增操作 查询子任务列别及供应商列表
    getData() {
      var that = this;
      var data = Qs.stringify({
        PId: this.type,
        username: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/selectSubType",
          data: data,
        })
        .then((response) => {
          this.xuanzelist = this.getTreeData(response.data.allData.a);
          this.supplierCompany = response.data.allData.b;
        });
    },
    //将级联选择器最后一行的数据去掉
    getTreeData(data) {
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
    //级联选中框选中变化项会用到这个函数主
    handleChange1() {
      this.mainStaskTypeID = this.selectCateKeys1[0];
      this.subStaskTypeID = this.selectCateKeys1[1];
    },
    simizhiding(coo) {
      if (coo == 0) {
        this.busm = "inline";
        this.sm = "none";
      } else {
        this.sm = "inline";
        this.busm = "none";
      }
    },
    invitate(coo) {
      if (coo == 0) {
        this.visiblehexin = "inline";
        this.shenqing = "none";
        this.sfsmkj = true;
      } else {
        this.shenqing = "inline";
        this.visiblehexin = "none";
        this.sfsmkj = false;
      }
    },
    //======保存新增========
    saveAdd11() {
      //console.log(this.TaskXiangXi)
      if (this.technicalFile == "null") {
        this.$message({
          type: "warning",
          message: "你还有重要信息未填写，填写后再提交",
        });
      } else {
        if (this.cooList.shifousimi != 1) {
          this.cooList.shifousimi = 0;
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
          mainTaskID: this.mainTaskID,
          Technonlgy_File: this.technicalFileWanzheng,
          Telphone: this.addList.Telphone,
          taskID: "100086",
          SupperListINt: this.SupplierListInt,
        });

        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/addSubstaskInformation",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((response) => {
            if (response.data == "成功") {
              this.$message.success("提交成功");
              this.technicalFileWanzheng = "";
              this.addList = {};
              // 此处返回到详情界面
              this.goBack();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // =================================================================
    //上传文件
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleAvatarSuccess(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      if (this.technicalFileWanzheng.length > 0) {
        this.technicalFileWanzheng =
          this.technicalFileWanzheng +
          "linklink" +
          this.technicalFile[this.shangchuancishu];
      } else {
        this.technicalFileWanzheng =
          this.technicalFileWanzheng + this.technicalFile[this.shangchuancishu];
      }
      this.shangchuancishu = this.shangchuancishu + 1;
    },
    // =====================新的功能=====================
    goBack: function () {
      window.history.go(-1);
    },
    getParent() {
      var that = this;
      if (this.addList.taskName != null) {
        var data = Qs.stringify({
          componentName: this.addList.taskName,
        });
        that
          .axios({
            method: "post",
            url: "/api/search/parent",
            data: data,
          })
          .then((response) => {
            if (response.data.code == 200) {
              this.parentTable = response.data.allData.parentList;
            } else {
              this.$message({
                type: "warning",
                message:
                  "系统自动查询专利失败，请重新点击任务名称输入框进行查询",
              });
            }
          });
      }
    },
    goCompanyDetail(companyId) {
      let newpage = this.$router.resolve({
        path: "/company/excellentCompanyDetail",
        name: "companyDetails",
        query: { companyId: companyId },
      });
      window.open(newpage.href, "_blank");
    },
    goTaskDetail(taskId, platform) {
      let newpage;
      if (platform == "own") {
        newpage = this.$router.resolve({
          path: "/admin/xuqiuyilanDetail",
          query: { taskID: taskId },
        });
      } else {
        newpage = this.$router.resolve({
          path: "/patentDetail",
          query: { id: taskId },
        });
      }

      window.open(newpage.href, "_blank");
    },
    /*
     *@functionName:invite
     *@params1: companyId 企业Id
     *@description:邀请参加
     *@author: 旋展峰
     *@date: 2020-08-09 10:18:41
     *@version: V1.0.5
     */
    invite(companyName, companyId) {
      var that = this;
      this.cooList.shifouyaoqing = "0";
      this.invitate(0);
      let token = false; //标识是否已经选中
      var data = Qs.stringify({
        userName: this.usernameX,
        companyId: companyId,
      });
      that
        .axios({
          method: "post",
          url: "/api/search/core",
          data: data,
        })
        .then((response) => {
          console.log(response);
          if (response.data.allData.token == 1) {
            //表明在企业名录
            //判断是不是已经添加过了
            for (let i = 0; i < this.SupplierListInt.length; i++) {
              if (companyId == this.SupplierListInt[i]) token = true;
            }
            if (token) {
              this.$message({
                type: "warning",
                message: "已经邀请，请勿重复邀请！",
              });
            } else {
              this.$message({
                type: "success",
                message: "邀请成功！",
              });
              this.SupplierListInt.push(companyId);
            }
          } else if (response.data.allData.token == 0) {
            //如果不是企业名录里面的企业
            this.supplierCompany.push({
              companyName: companyName,
              companyId: companyId,
            });
            this.SupplierListInt.push(companyId);
            this.$message({
              type: "success",
              message: "邀请成功！",
            });
          } else if (response.data.allData.token == 3) {
            //自己的任务
            this.$message({
              type: "warning",
              message: "不可以选择自己的公司的专利！",
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: "出现错误请再次点击！",
          });
          console.log(error);
        });
      //如果不在核心供应商列表里面则自动添加
    },
  },
};
</script>

<style >
.biaoti {
  font-size: 18px;
  color: #303133;
}
.el-upload--text {
  width: 85px;
  height: 40px;
}
/* //返回字体 */
.el-page-header__title {
  font-size: 18px;
}
</style>