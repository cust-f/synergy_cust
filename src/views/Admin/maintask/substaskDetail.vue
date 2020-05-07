<template>
  <div>
    <div>
      <el-container>
        <el-main style="overflow:hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="cool" :model="cool" label-width="110px" class="formYS">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称">
                  <el-input v-model="cool.mainTaskName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="项目负责人">
                  <el-input v-model="cool.principalName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-input v-bind:value="cool.publishTime |formatDate " :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-input v-bind:value="cool.deadline |formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="需求状态">
                  <el-input v-model="cool.taskState" :disabled="true">
                    <template slot-scope="scope">
                      <span v-if="+scope.row.cool.taskState===0">待上传</span>
                      <span v-else-if="+scope.row.cool.taskState===1">待审核</span>
                      <span v-else-if="+scope.row.cool.taskState===2">通过</span>
                      <span v-else-if="+scope.row.cool.taskState===3">未通过</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="完成日期">
                  <el-input v-bind:value="cool.finishTime |formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="一级行业类别">
                  <el-input v-model="cool.taskCategoryMain" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="二级行业类别">
                  <el-input v-model="cool.taskCategoryPart" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="需求详情">
                  <el-input v-model="cool.mainTaskDetail" :disabled="true"></el-input>
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
                          <el-link style="color:#409EFF" @click.native="downloadFile(scope.row)">{{scope.row.realName}}</el-link>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column prop="realPath" label="真实地址" v-if="YinCang===0"></el-table-column> -->
                    </el-table>
                  </div>
                </el-form-item>
              </el-col>
            </el-row> 
                        <!-- <el-card class="box-card"> -->
                 
                <!-- </el-card> -->
          </el-form>
          <br>
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="feichuAll">废除需求任务</el-button>
            <el-button type="primary" class="button1" @click="xiugaitanchu">修改</el-button>
            <el-button type="primary" class="button1" @click="xiazaiMAINmoban">打包下载</el-button>
            <!-- <el-button type="primary" class="button1">下载装配文档</el-button> -->
          </div>
          <el-divider></el-divider>
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">需求分解</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
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
                :data="shuju"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>

                <el-table-column prop="taskName" label="需求名称"></el-table-column>
                <el-table-column prop="taskType" label="需求类型">
                  <template slot-scope="scope">
                    <span v-if="+scope.row.taskType === 0">设计任务</span>
                    <span v-else-if="+scope.row.taskType === 1">流通任务</span>
                  </template>
                </el-table-column>
                <el-table-column prop="taskCategoryMain" label="一级行业类别"></el-table-column>
                <el-table-column prop="taskCategoryPart" label="二级行业类别"></el-table-column>
                <el-table-column prop="taskState" label="需求状态"></el-table-column>
                <el-table-column prop="publishTime" label="开始时间">
                  <template slot-scope="scope">{{scope.row.publishTime |formatDate}}</template>
                </el-table-column>
                <el-table-column prop="deadline" label="截止时间">
                  <template slot-scope="scope">{{scope.row.deadline |formatDate}}</template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>-->
                    <el-button
                      size="small"
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

            <!-- 新增弹出框 -->
            <el-dialog title :visible.sync="addVisible" width="50%">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">新增</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
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
                      <el-input v-model="addList.Telphone" @blur="animate()"></el-input>
                      <font color="red">
                        <el-span v-if="this.addList.Telphone === null">您的联络电话格式输入不正确</el-span>
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
                    <el-span class = "simichakan" :style="{display:sm}">仅该供应方可见</el-span>
                    <el-span class = "simichakan"  :style="{display:busm}">全部可见</el-span>
                    </font>
                <!-- <el-col :span="11">
                  <el-form-item label="仅该供应方可见" :style="{display:sm}">
                  </el-form-item>
                 <el-form-item label="全部可见" :style="{display:busm}">
                  </el-form-item>
                      
                </el-col> -->
<!-- <font color="black">
                        <el-span :style="{display:busm}">全部可见</el-span>
                      </font> -->
                  <!-- <el-col :span="11">
                    <el-form-item label="私密指派" :style="{display:sm}">
                      <el-input
                        placeholder="仅有该供应方可见"
                        v-model="input"
                        :disabled="true"
                        :style="{display:sm}"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11">
                    <el-form-item label="非私密指派" :style="{display:busm}">
                      <el-input
                        placeholder="全部可见"
                        v-model="input"
                        :disabled="true"
                        :style="{display:busm}"
                      ></el-input>
                    </el-form-item>
                  </el-col> -->
                  
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
                    :before-remove="beforeRemove"
                    :on-success="handleAvatarSuccess"
                    multiple
                    :limit="10"
                    :on-exceed="handleExceed"
                    ref = "upload"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">上传文件</el-button>
                    <div slot="tip" class="el-upload__tip"></div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd11">确 定</el-button>
              </span>
            </el-dialog>


                        <!-- 修改弹出框 -->



            <el-dialog title :visible.sync="xiugaiTC" width="50%">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">修改</div>
              <br>
               <el-form ref="form" label-width="110px" class="box">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求任务名称">
                <el-input v-model="name"></el-input>
              </el-form-item>
            </el-col>

          
          <el-col :span="11">
              <el-form-item label="发布时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="cool.publishTime"
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
                    v-model="cool.principalName"
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
                  v-model="cool.deadline"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd HH:mm:ss"
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
            </el-col> -->
            <el-col :span="11">
              <el-form-item label="行业类别">
                <el-cascader
                  style="width:100%;"
                  expand-trigger="hover"
                  v-model="selectCateKeys"
                  :options="xuanzelist"
                  :props="cateProps"
                  @change="handleChange"
                  props.checkStrictly = true
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
                <el-col :span="22" class = "xiangxi">
                    <el-form-item label="需求任务详情" >
                            <el-input 
                            type="textarea"
                            :rows="3"
                            style="width:100%;"
                            placeholder="请输入内容" v-model="cool.mainTaskDetail" class="gongsiDetail"  ></el-input>
                    </el-form-item>                   
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="22" class = "xiangxi">
                    <el-form-item label="附件管理" >
                <div> 
                    <el-table :data="fujian" class="customer-table" :show-header="false">
                      <el-table-column label="序号" type="index" width="20" align="center"></el-table-column>
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-link style="color:#409EFF" @click.native="downloadFile(scope.row)">{{scope.row.realName}}</el-link>
                        </template>
                      </el-table-column>
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
              class="upload-demo"
              action="/api/MainTaskInformation/import"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleAvatarSuccess"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              ref = "upload"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传文件</el-button>
            </el-upload>
          </el-form-item>
         
        </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="xiugaiTC = false">取 消</el-button>
                <el-button type="primary" @click="xiugaixuqiuxinxi">确 定</el-button>
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
  inject:['reload'],
  data() {
    return {
      //初始完整路径
      WZLJ:"",
      //文件数目
      WJSM:"",
      //xiugaixuqiu
      zhurenwuxiangxi:"",
      sfsmkj:false,//是否私密指派
      usernameX: localStorage.getItem("ms_username"),
      //级联选择框的配置对象
      cateProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: true
      },
      //级联选择框双向绑定到的数组 =--子
      selectCateKeys1: [],
      //级联选择框双向绑定到的数组
      selectCateKeys: [],
      //行业分类列表
      xuanzelist: [],

      //核心供应商
      supperlier: "",
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng:"",
      shangchuancishu:0,
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
      sm:"none",//私密
      busm:"none",//不私秘
      supplyDesigners: ["韩钟工程师", "李林工程师", "张志正工程师"],
      cool: {
        taskCategoryMain: "",
        mainTaskName: "",
        industry_Type: "",
        publishTime: "",
        deadline: "",
        mainTaskDetail: "",
        leader: "",
        taskState: "",
        taskCategoryPart: ""
      },
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      subStaskTypeID:"",
      mainStaskTypeID:"",
      shuju: [
        {
          taskName: "",
          taskType: "",
          beginTime: "",
          publishTime:"",
          taskState:"",
          deadline: "",
          taskCategoryMain:"",
          taskCategoryPart:"",
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
          taskName: "",
          taskType: "",
          beginTime: "",
          publishTime:"",
          taskState:"",
          deadline: "",
          taskCategoryMain:"",
          taskCategoryPart:"",
        }
      ],
      //附件
            fujian: [
        {
          realName: "",
          realPath: ""
        }
      ],

      //是否申请
      shifou: [
        {
          id: "0",
          label: "是"
        },
        { id: "1", label: "否" }
      ],
      //是否私密
            shifousimi: [
        
        { id: "0", label: "是" },{
          id: "1",
          label: "否"
        },
      ],
      //fuzeren
            FZR:[
        {
          
        },
      ],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      xiugaiTC:false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      mainTaskID: "",
      cooList: { shifouyaoqing: "" ,shifousimi:"",},
      SupplierListInt: "",
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
      if (time === "尚未完成") {
        return "暂未完成";
      }

      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },

  created() {
    this.getParams();
    this.getData();
    //fuzeren
    this.getDate();
  },

  methods: {
    shanchuwenjian(row){
        let ks = this.WZLJ.indexOf(row.realPath)
        let qianzui,houzui;
        console.log(row.wenjiancixu)
        if(row.wenjiancixu ==this.WJSM-1){
          qianzui = this.WZLJ.substr(0,ks-8)
          houzui = ""
        }
        else{
          qianzui = this.WZLJ.substr(0,ks)
          houzui = this.WZLJ.substr(ks+row.realPath.length+8)
        }
        this.WZLJ = qianzui+houzui
        console.log(this.WZLJ)
        this.fujian.splice(row.wenjiancixu,1)
    },
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        //taskID: this.taskId,
        url: row.realPath
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/DownloadTelFile",
          data: data,
          responseType: "blob", //服务器返回的数据类型
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        })
        .then(response => {
          
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'} ) )  ;
          link.setAttribute("download",  row.realName); 
          document.body.appendChild(link);
          link.click();
        });
    },
    getDate() {
      var that = this;
      var data = Qs.stringify({
        aaaa: this.usernameX
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/SubstaskInformation/selectMainType",
          data: data
        })
        .then(response => {
          // this.mainStaskType = response.data.allData.a;
          //this.shuju = response.data.allData.b;
          this.xuanzelist = this.getTreeData(response.data.allData.c)
          this.FZR= response.data.allData.d;
          console.log(response);
          console.log(this.FZR);
        });
    },
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

    dateFormat: function(time) {
      var index = time.lastIndexOf(".");
      time = time.substring(0, index);
      console.log(time);
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },

    //级联选中框选中变化项会用到这个函数
    handleChange() {
      console.log(this.selectCateKeys);
      this.mainStaskTypeID = this.selectCateKeys[0];
      this.subStaskTypeID = this.selectCateKeys[1];
      console.log(this.mainStaskTypeID);
      console.log(this.subStaskTypeID);
    },
    //保存新增
    saveAdd11() {
      
      //console.log(this.TaskXiangXi)
      if (this.technicalFile == "null") {
        this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
          type: "warning"
        });
      } else {

        if(this.cooList.shifousimi !=1){
        this.cooList.shifousimi = 0;
        console.log("是否私密" + this.cooList.shifousimi)
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
          sssm:this.cooList.shifousimi,
          taskType: this.addList.taskType,
          mainTaskName: this.name,
          taskXiangxi: this.addList.TaskXiangXi,
          mainTaskID: this.mainStaskID,
          Technonlgy_File: this.technicalFileWanzheng,
          Telphone: this.addList.Telphone,
          taskID:"100086",
          SupperListINt: this.SupplierListInt
        });
        console.log(this.SupplierListInt);
        console.log(data);

        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/addSubstaskInformation",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
        .then(response => {
             console.log(response)
            if(response.data=="成功"){
              this.$message.success("提交成功");        
            }
          })
          .catch(error => {
            console.log(error);
            if (error != null) {
              this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
                type: "warning"
              });
            }
            else{
                            this.$message.success("提交成功");        
            }
          });
        this.$message.success("提交成功");        
        this.addVisible = false;
        this.shuju.push(this.addList);
        this.technicalFileWanzheng = ""
        this.addList = {};
        this.getData();
        // location.reload()
      }
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
    xiugaixuqiuxinxi(){
      if(this.technicalFileWanzheng!=0&&this.WZLJ!=0){
        console.log("nihao")
        this.technicalFileWanzheng = this.WZLJ + "linklink" + this.technicalFileWanzheng
      }
      if(this.technicalFileWanzheng == 0 &&this.WZLJ!=0){
        this.technicalFileWanzheng = this.WZLJ
      }
      this.mainStaskTypeID = this.selectCateKeys[0]
      this.subStaskTypeID = this.selectCateKeys[1]
      console.log(this.technicalFileWanzheng)
      var that = this;
      var data = Qs.stringify({
        mainTaskID:this.mainTaskID,
        mainTaskName:this.name,
        principalName:this.cool.principalName,
        publishTime1:this.cool.publishTime,
        deadline1:this.cool.deadline,
        taskCategoryMainId: this.mainStaskTypeID,
        taskCategoryPartId: this.subStaskTypeID,
        technicalFile:this.technicalFileWanzheng,
        mainTaskDetail:this.cool.mainTaskDetail,
        username:this.usernameX,
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/updateMainXX",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
            this.mainStaskID = response.data.allData;
            this.zzzz = response.data.allData;
            if (this.zzzz != "null") {
              console.log(this.zzzz);
              this.$message.success("提交成功");
              this.xiugaiTC = false;
              this.$refs.upload.clearFiles()
              this.technicalFileWanzheng = "";
              this.technicalFile = "";
              this.shangchuancishu = "",
              this.getData();
            }
          })
          .catch(error => {
            console.log(error);
            if (error != null) {
              this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
                type: "warning"
              });
              this.$refs.upload.clearFiles();
              this.technicalFileWanzheng = "",
              this.technicalFile = "";
              this.shangchuancishu = "";

            }
          });
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
          url: "/api/MainTaskInformation/combineMS",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {          console.log(response);

          this.cool = response.data.allData.a[0];
          this.mainStaskID = response.data.allData.a[0].mainTaskID;
          this.name = response.data.allData.a[0].mainTaskName;
          this.shuju = response.data.allData.b;
          this.fujian = response.data.allData.c;
          this.type = response.data.allData.a[0].industry_Type;
          this.WZLJ = response.data.allData.WZLJ;
          this.WJSM = response.data.allData.SM;
          this.selectCateKeys[0] = response.data.allData.a[0].taskCategoryMainId
          this.selectCateKeys[1] = response.data.allData.a[0].taskCategoryPartId
          console.log(this.selectCateKeys)
          console.log(this.fujian.length)
          if (this.cool.taskState === 0) {
            this.cool.taskState = "进行中";
          } else if (this.cool.taskState === 1) {
            this.cool.taskState = "已完成";
          } else if (this.cool.taskState === 1) {
            this.cool.taskState = "废除";
          }
          if (this.cool.finishTime === null) {
            this.cool.finishTime = "尚未完成";
          } else {
            this.cool.finishTime = dateFormat(this.cool.finishTime);
          }
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
          url: "/api/MainTaskInformation/feicuBySubstaskstaskID",
          data: data

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
        this.shuju.splice(index, 1);
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
          url: "/api/MainTaskInformation/feichuByMainstaskID",
          data: data

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
      });
    },
    downLoad() {
      var that = this;
      console.log(this.technicalFile);
      var data = Qs.stringify({
        technicalFile: this.technicalFile
      });
      console.log(data);
      that.axios({
        method: "post",
        url: "/api/MainTaskInformation/feichuByMainstaskID",
        data: data

        // data:this.$store.state.userName
      });
    },
    xiugaitanchu(){
        this.xiugaiTC = true;
    },

    //新增操作 查询子任务列别及供应商列表
    addData() {
      this.addVisible = true;
      var that = this;
      var data = Qs.stringify({
        PId: this.type,
        username: this.usernameX
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/selectSubType",
          data: data
        })
        .then(response => {
          this.xuanzelist = this.getTreeData(response.data.allData.a);
          this.supplierCompany = response.data.allData.b;
          console.log(response);
          console.log(this.xuanzelist);
          console.log(response.data.allData.a)
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
      if(row.taskType == 0){
        this.$router.push({
        path: "/admin/mainStaskDetail",
        query: {
          taskId: row.taskId
        }
      });
      }
      else{
        this.$router.push({
        path: "/admin/mainStaskDetailLT",
        query: {
          taskId: row.taskId
        }
      });
      }
      
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
        handleAvatarSuccess(response, file, fileList) {

      this.technicalFile[this.shangchuancishu] = response;
      //console.log(this.technicalFileWanzheng)
      if(this.technicalFileWanzheng.length > 0){ 
        //console.log("ok")
        this.technicalFileWanzheng = this.technicalFileWanzheng +'linklink'+ this.technicalFile[this.shangchuancishu]
       
      }
      else{
             this.technicalFileWanzheng = this.technicalFileWanzheng + this.technicalFile[this.shangchuancishu]
      }
      this.shangchuancishu = this.shangchuancishu+1;
      //console.log(this.technicalFileWanzheng);
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
      console.log(this.selectCateKeys1);
      this.mainStaskTypeID = this.selectCateKeys1[0]
      this.subStaskTypeID = this.selectCateKeys1[1]
      console.log(this.mainStaskTypeID)
      console.log(this.subStaskTypeID)
    },
    //任务计划下载
    xiazaiMAINmoban() {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskID: this.mainTaskID,
        leixing:"ZRWFJ"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: 'blob'
        })
        .then(response => {
          console.log("cap");
          console.log(response);
          response.data = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'} ) ) ;
          this.download(response.data, "ZFJ");
        });
    },
    
    // 下载文件
    download(data, leixing) {
      console.log("调用")
      if (!data) {
        return;
      }
      //let url = window.URL.createObjectURL(new Blob([data], {type: 'application/octet-stream'} ) ) ;
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = data;
      if (leixing === "JHS") {
        link.setAttribute("download", "设计文档.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      }
      else if(leixing ==="ZFJ"){
        link.setAttribute("download", "主任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
    
   
  }
};
</script>

<style>
.simichakan{
  line-height:40px;
}
.formYS .el-input__inner {
  /* // 表格样式调整 */

  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0px;
  text-align: center;
}

  .el-dialog__body{
   padding-right: 0px; 
   padding-top: 20px;
  }

.el-dialog__header{
  padding-right: 0%;
  padding-top: 0%;
}
.formYS .el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  color: #606266;
}

.table {
  font-size: 14px;
}
.table {
  width: 100%;
  font-size: 14px;
}
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

  /* // 去掉表格单元格边框 */
  .customer-table th {
    border: none;
  }
  .customer-table td,
  .customer-table th.is-leaf {
    border: none;
  }
  /* // 表格最外边框 */
   .customer-table .el-table--border,
    .customer-table .el-table--group {
    border: none;
  }
  /* // 头部边框 */
  .customer-table thead tr th.is-leaf {
    border: 1px solid #ebeef5;
    border-right: none;
  }
  .customer-table thead tr th:nth-last-of-type(2) {
    border-right: 1px solid #ebeef5;
  }
  /* // 表格最外层边框-底部边框 */
    .customer-table .el-table--border::after,
    .customer-table .el-table--group::after {
    width: 0;
  }
  .customer-table::before {
    width: 0;
  }
  .customer-table .el-table__fixed-right::before,
  .el-table__fixed::before {
    width: 0;
  }
</style>