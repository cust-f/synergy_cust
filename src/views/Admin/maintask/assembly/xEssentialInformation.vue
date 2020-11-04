<!--需求方基本信息组件-->
<template>
  <div class="xEssentialInformation">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
      基本信息
      <el-button
        v-if="this.taskState === 0"
        type="text"
        class="XG"
        style="float:right"
        @click="XG"
      >修改</el-button>
    </div>
    <br />
    <!-- 进本信息框信息 -->
    <el-card class="Mystyle">
      <el-form ref="cool" :model="cool" label-width="110px" class="form">
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求名称">
              <template slot-scope="scope">
                <el-button
                  class="anniu"
                  type="primary"
                  text-decoration="underline"
                  @click="ziTaskDetail(scope.row)"
                >{{cool.mainTaskName}}</el-button>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="子任务名称">
              <el-button
                class="anniu"
                type="primary"
                text-decoration="underline"
                @click="taskDetil()"
              >{{cool.taskName}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求方">
              <el-button
                class="anniu"
                type="primary"
                text-decoration="underline"
                @click.native="companyDetil()"
              >{{cool.companyName}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="需求类型">
              <el-input v-bind:value="cool.taskType" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="一级行业类别">
              <el-input v-model="cool.taskCategoryMain" :readonly="true" style="text-align:center"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="二级行业类别">
              <el-input v-model="cool.taskCategoryPart" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="截止日期">
              <el-input
                v-bind:value="cool.deadline|formatDate"
                :readonly="true"
                style="text-align:center"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="需求方电话">
              <el-input v-model="cool.demanderTel" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--子任务修改 -->
    <el-dialog :visible.sync="ZRWXG" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">信息修改</div>
      <br />
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="cool" label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="任务名称">
              <el-input v-model="cool.taskName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="联络电话">
              <el-input v-model="cool.demanderTel" @blur="animate()"></el-input>
              <font color="red">
                <el-span v-if="this.cool.demanderTel === null">您的联络电话格式输入不正确</el-span>
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
                v-model="cool.publishTime"
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
                v-model="cool.deadline"
                value-format
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
                v-model="selectCateKeys"
                :options="xuanzelist"
                :props="cateProps"
                @change="handleChange"
                props.checkStrictly="true"
              ></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="任务类型">
              <el-select
                v-model="cool.taskType"
                placeholder="请选择"
                class="selectsupply"
                @change="liebieShu"
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
            <el-form-item label="新增供应商" :style="{display: true}">
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
            <el-span class="simichakan" :style="{display:sm}">自身可见</el-span>
            <el-span class="simichakan" :style="{display:busm}">全部可见</el-span>
          </font>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="分解任务详情">
              <el-input v-model="cool.taskDetail" type="textarea" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="附件下载">
              <div>
                <el-table :data="fujian" class="customer-table" :show-header="false">
                  <el-table-column label="序号" type="index" width="20" align="center"></el-table-column>
                  <el-table-column>
                    <template slot-scope="scope">
                      <el-link
                        style="color:#409EFF"
                        @click.native="downloadFile(scope.row)"
                      >{{scope.row.realName}}</el-link>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="realPath" label="真实地址" v-if="YinCang===0"></el-table-column> -->
                  <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                      <el-button
                        size="small"
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="shanchuwenjian(scope.row)"
                      >删除文件</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="添加附件">
          <el-upload
            action="/api/MainTaskInformation/import"
            :on-success="handleAvatarSuccess"
            multiple
            :limit="10"
            ref="upload"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip">上传文件不能超过3个</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ZRWXG = false">取 消</el-button>
        <el-button type="primary" @click="XGZRW">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 公司信息 -->
    <el-dialog :visible.sync="companyDag" width="50%" class="Mystyle">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业图片</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="imgsrc" :onerror="errorImg01"></el-image>
      </div>
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业营业执照</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="qiyezhizhao" :onerror="errorImg02"></el-image>
      </div>
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业税务登记证</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="shuiwudengjizheng" :onerror="errorImg03"></el-image>
      </div>
      <br />

      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div>
      <br />
      <div>
        <el-rate label="企业级别：" v-model="companyMessage.star" disabled text-color="#ff9900"></el-rate>
      </div>
      <div align="right" class="formYS">
        <el-form ref="form" :model="companyMessage" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称">
                <el-input v-model="companyMessage.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业联络电话">
                <el-input v-model="companyMessage.businessTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业所在省份">
                <el-input v-model="companyMessage.province" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业所在县市">
                <el-input v-model="companyMessage.city" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业地址">
                <el-input v-model="companyMessage.address" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮政编码">
                <el-input v-model="companyMessage.postcode" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业成立时间">
                <el-input v-bind:value="companyMessage.foundingTime | formatDate" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工商注册号">
                <el-input v-model="companyMessage.brNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业业务范围">
                <el-input v-model="companyMessage.product" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="companyMessage.email" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业联系人">
                <el-input v-model="companyMessage.businessName" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公室电话">
                <el-input v-model="companyMessage.officeNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="注册资产">
                <el-input v-model="companyMessage.registeredCapital" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总资本">
                <el-input v-model="companyMessage.totalAssets" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="固定资产">
                <el-input v-model="companyMessage.fixedAssets" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流动资产">
                <el-input v-model="companyMessage.currentAssets" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="法人代表">
                <el-input v-model="companyMessage.legalPerson" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工人数">
                <el-input v-model="companyMessage.workerNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="开户银行">
                <el-input v-model="companyMessage.deposit_Bank" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账户">
                <el-input v-model="companyMessage.bankNumber" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="企业详情"></el-form-item>
              <div class="leftDet" v-html="companyDetailContent"></div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="companyDag = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 子任务详情 -->
    <el-dialog :visible.sync="taskDetilDag" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">子任务详情</div>
      <br />
      <el-form ref="form" :model="cool" label-width="120px">
        <el-row>
          <el-col>
            <div class="minheight">{{cool.taskDetail}}</div>
          </el-col>
        </el-row>
      </el-form>
      <br />
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">附件下载</div>
      <div>
        <el-table :data="fileTable" class="customer-table" :show-header="false">
          <el-table-column>
            <template slot-scope="scope">
              <el-link @click.native="downloadFile(scope.row)">{{scope.row.fileName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="filePath" label="真实地址" v-if="yinCang===1"></el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="xiazaiZRWFJ">打包下载</el-button>
        <el-button type="primary" @click="taskDetilDag = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 主任务信息 -->
    <el-dialog :visible.sync="quanbuzirenwu" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">全部子任务</div>
      <br />
      <el-table
        :data="zirenwu"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="taskName" label="子任务名称"></el-table-column>
        <el-table-column prop="taskState" label="子任务状态"></el-table-column>
        <el-table-column prop="acceptCompanyName" label="供应方">
          <template slot-scope="scope">
            <el-span v-if="+scope.row.acceptCompanyName === 0"></el-span>
            <el-span v-else>{{scope.row.acceptCompanyName}}</el-span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quanbuzirenwu = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../dataChange";
export default {
  data() {
    return {
      //行业分类列表
      xuanzelist: [],
      SupplierListInt: "",
      cateProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: true,
      },
      shifousimi: [
        { id: "0", label: "是" },
        {
          id: "1",
          label: "否",
        },
      ],
      ZRWXG: false,
      sm: "none", //私密
      busm: "none", //不私秘
      //供应商列表
      supplierCompany: [
        {
          companyName: "",
          companyId: "",
          pId: "",
        },
      ],
      taskState: 1,
      companyDag: false, //公司详情弹出框
      quanbuzirenwu: false, //全部子任务弹出框
      taskDetilDag: false, //子任务详情弹出框
      yinCang: 0, //隐藏控制

      //基本信息数据
      cool: [],
      companyDetailContent: "",
      //任务Id
      taskId: 0,
      //主任务Id
      mainTaskId: 0,
      //公司详情
      companyMessage: [],
      // 子任务详情
      zirenwu: [],
      taskTpyeName: "",
      //技术文档附件下载表
      fileTable: [],
      //企业弹窗所需图片
      imgsrc: "",
      shuiwudengjizheng: "",
      qiyezhizhao: "",
      //主行业列别ID
      mainStaskTypeID: "",
      //选择是设计任务还是流通任务
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
      //子行业类别ID
      subStaskTypeID: "",
      // 附件数据
      fujian: [
        {
          realName: "",
          realPath: "",
        },
      ],
      //上传的文件路径
      technicalFile: [],
      shangchuancishu: 0,
      username: sessionStorage.getItem("ms_username"),
      //全部路径
      technicalFileWanzheng: "",
      //级联选择框双向绑定到的数组
      selectCateKeys: [],
      //yaoqing，simi的
      cooList: { shifouyaoqing: "", shifousimi: "" },
      //企业弹窗所需图片默认
      errorImg01:
        'this.src="' +
        require("../../../../assets/images/company/noResult.jpg") +
        '"',
      errorImg02:
        'this.src="' +
        require("../../../../assets/images/company/noResult.jpg") +
        '"',
      errorImg03:
        'this.src="' +
        require("../../../../assets/images/company/noResult.jpg") +
        '"',
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
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
    //删除文件
    shanchuwenjian(row) {
      let ks = this.WZLJ.indexOf(row.realPath);
      let qianzui, houzui;
      if (row.wenjiancixu == this.WJSM - 1) {
        qianzui = this.WZLJ.substr(0, ks - 8);
        houzui = "";
      } else {
        qianzui = this.WZLJ.substr(0, ks);
        houzui = this.WZLJ.substr(ks + row.realPath.length + 8);
      }
      this.WZLJ = qianzui + houzui;
      this.fujian.splice(row.wenjiancixu, 1);
    },
    //私密指定
    simizhiding(coo) {
      if (coo == 0) {
        this.busm = "inline";
        this.sm = "none";
      } else {
        this.sm = "inline";
        this.busm = "none";
      }
    },
    //手机号校验
    animate() {
      var re = /^1\d{10}$/;
      let str = this.cool.demanderTel;
      if (re.test(str)) {
        //  alert('成功')
      } else {
        this.cool.demanderTel = null;
      }
    },
    // 修改基本信息
    XG() {
      this.addData();
      this.ZRWXG = true;
    },
    addData() {
      var that = this;
      var data = Qs.stringify({
        PId: "0",
        username: this.username,
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
          console.log(this.supplierCompany);
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
    handleChange() {
      this.mainStaskTypeID = this.selectCateKeys[0];
      this.subStaskTypeID = this.selectCateKeys[1];
    },
    //修改子任务
    XGZRW() {
      //设置文件路径
      if (this.technicalFileWanzheng != 0 && this.WZLJ != 0) {
        this.technicalFileWanzheng =
          this.WZLJ + "linklink" + this.technicalFileWanzheng;
      }
      if (this.technicalFileWanzheng == 0 && this.WZLJ != 0) {
        this.technicalFileWanzheng = this.WZLJ;
      }
      this.mainStaskTypeID = this.selectCateKeys[0];
      this.subStaskTypeID = this.selectCateKeys[1];
      //先对要修改的文件进行判断
      if (this.technicalFile == "null" || this.mainStaskTypeID == "null") {
        this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
          type: "warning",
        });
      } else {
        if (this.cooList.shifousimi != 1) {
          this.cooList.shifousimi = 0;
        }
        if (this.cool.taskType == "设计任务") {
          this.cool.taskType = 0;
        } else {
          this.cool.taskType = 1;
        }
        if (this.cooList.shifousimi == "是") {
          this.cooList.shifousimi = 0;
        } else {
          this.cooList.shifousimi = 1;
        }
        var that = this;
        var data = Qs.stringify({
          userName: this.usernameX,
          taskName: this.cool.taskName,
          publishTime: this.cool.publishTime,
          endLine: this.cool.deadline,
          mainStaskTypeID: this.mainStaskTypeID,
          subStaskTypeID: this.subStaskTypeID,
          yaoqing: 0,
          sssm: this.cooList.shifousimi,
          taskType: 0,
          mainTaskName: this.mainTaskName,
          taskXiangxi: this.cool.taskDetail,
          mainTaskID: this.mainTaskID,
          Technonlgy_File: this.technicalFileWanzheng,
          Telphone: this.cool.demanderTel,
          taskID: this.taskID,
          SupperListINt: this.SupplierListInt,
        });

        if (this.cool.taskType == 0) {
          this.cool.taskType = "设计任务";
        } else {
          this.cool.taskType = "流通任务";
        }
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/addSubstaskInformation",
            data: data,
          })
          .then((response) => {
            if (response.data != null) {
              this.$message.success("修改成功");
              this.$refs.upload.clearFiles();
              this.technicalFileWanzheng = "";
              this.technicalFile = "";
              this.shangchuancishu = "";
              //this.getData();
            }
          })
          .catch((error) => {
            if (error != null) {
              this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
                type: "warning",
              });
              this.$refs.upload.clearFiles();
              this.technicalFileWanzheng = "";
              this.technicalFile = "";
              this.shangchuancishu = "";
            }
          });

        this.ZRWXG = false;
        this.showData();
        // this.getData();
        // location.reload()
      }
    },
    //技术文件
    getFilePath() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
      });

      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getFilePath",
          data: data,
        })
        .then((response) => {
          this.fileTable = response.data.allData;
        });
    },
    //子任务信息获取
    getMsg(msg) {
      this.cool = msg[0];
      this.mainTaskId = this.cool.mainTaskId;
      this.taskId = this.cool.taskId;
      this.fujian = msg[2];
      this.WZLJ = msg[1];
      this.WJSM = msg[3];
      console.log(msg);
      this.cooList.shifousimi = msg[0].sssm;
      this.selectCateKeys[0] = msg[0].taskCategoryMainId;
      this.selectCateKeys[1] = msg[0].taskCategory;
      if (this.cooList.shifousimi == 0) {
        this.cooList.shifousimi = "是";
      } else {
        this.cooList.shifousimi = "否";
      }
      if (this.cool.taskState == "申请或邀请中") {
        this.taskState = 0;
      }
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    //单独附件下载
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        url: row.filePath,
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/DownloadTelFile",
          data: data,
          responseType: "blob", //服务器返回的数据类型
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          const content = response.data;
          const blob = new Blob([content]);
          let url = window.URL.createObjectURL(blob); //表示一个指定的file对象或Blob对象
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", row.fileName);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href); //释放url
        });
    },
    //子任务附件下载
    xiazaiZRWFJ() {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "ZIRWHJ",
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob",
        })
        .then((response) => {
          this.download(response.data, "ZRWFJ");
        });
    },
    //下载文件
    download(data, leixing) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(
        new Blob([data], { type: "application/zip" })
      );
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      if (leixing === "JHS") {
        link.setAttribute("download", "设计文档.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "ZRWFJ") {
        link.setAttribute("download", "子任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
    taskDetil(row) {
      this.getFilePath();
      this.taskDetilDag = true;
    },
    //需求方信息弹窗
    companyDetil(row) {
      this.getCompay();
      this.companyDag = true;
    },
    getCompay() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
      });

      that
        .axios({
          method: "post",
          url: "/api/companyDetail/getCompanyFormBytaskId",
          data: data,
        })
        .then((response) => {
          this.companyMessage = response.data.allData.detail;
          this.companyDetailContent = response.data.allData.content;
          this.imgsrc = response.data.allData.companyPicture[0].url;
          this.shuiwudengjizheng = response.data.allData.tax;
          this.qiyezhizhao = response.data.allData.business;
        });
    },
    //子任务详情
    ziTaskDetail() {
      this.quanbuzirenwu = true;
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskId,
      });

      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data,
        })
        .then((response) => {
          this.zirenwu = response.data.allData.b;
        });
    },
  },
};
</script>
<style lang="scss">
.xEssentialInformation {
  .customer-table {
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .Mystyle {
    width: 100%;
  }
  //企业详情
  .leftDet {
    float: left;
    text-align: left;
    width: 90%;
    padding: 0px 30px 0px;
  }
  //各个详情按钮弹窗
  .Mystyle .anniu {
    width: 100%;
    border-left: cadetblue;
    background-color: white;
    color: #409eff;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    border-color: #dcdfe6;
    border-radius: 0px;
  }
  .minheight {
    min-height: 100px;
    font-size: 16px;
  }
  // 表格样式调整
  .formYS .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .Mystyle .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  // 表格样式调整
  .Mystyle .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }
  //对话框头
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }
}
</style>