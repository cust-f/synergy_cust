<template>
  <el-container class="addSubTask">
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
              <el-form-item label="任务名称">
                <el-input v-model="addList.taskName">
                  <div class="box">
                  
                      <el-button
                        slot="suffix"
                        icon="el-icon-search"
                        autofocus="false"
                        style="
                          border: 0px;
                          font-size: 14px;
                          padding: 0px 0px;
                          margin-right: -45px;
                        "
                        @click="goPatent()"
                      >123</el-button>
                  </div>  
                </el-input>
              </el-form-item>
            </el-col>
            <el-tooltip
                      class="item"
                      effect="dark"
                      content="专利查询"
                      placement="right"
                    >
                  <el-button
                  
                    icon="el-icon-search"
                    autofocus="false"
                    style="
                    position:relative;
                      border: 0px;
                      font-size: 14px;
                      padding: 0px 0px;
                      margin-left: -430px;
                      margin-top:60px;
                      margin-top: 13px;
                    "
                    @click="goPatent()"
                  ></el-button> 
            </el-tooltip>     
            <el-col :span="11">
              <el-form-item label="联络电话">
                <el-input v-model="addList.Telphone" @blur="animate"></el-input>
                <font color="red">
                  <span v-if="this.addList.Telphone === null"
                    >您的联络电话格式输入不正确</span
                  >
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
                  style="width: 100%"
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
                  style="width: 100%"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="行业类别">
                <el-cascader
                  style="width: 100%"
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
                  style="width: 100%"
                  @change="leibieChanged"
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
                  style="width: 100%"
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
            <el-col :span="11" v-if="sfsmkj">
              <el-form-item label="零件类别" :style="{ display: sfkjian }">
                  <el-select
                  v-model="allCategoryList"
                  placeholder="请选择零件种类"
                  class="selectsupply"
                  style="width: 100%"
                  @change="selectCategoryoption"
                >
                  <el-option
                    width="180"
                    v-for="(Categoryoption, index) in CategoryListoptions"
                    :key="index"
                    :label="Categoryoption.PartsCategory"
                    :value="Categoryoption.PartsCategory"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="11"  v-if="sfsmkj">
              <el-form-item label="是否发布">
                <el-select
                  v-model="cooList.shifousimi"
                  placeholder="请选择是或者否"
                  class="selectsupply"
                  @change="simizhiding"
                  style="width: 100%"
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
              <font color="red">
              <span class="simichakan" :style="{ display: sm }"
                >仅限供应方可见</span
              >
              <span class="simichakan" :style="{ display: busm }"
                >全部可见</span
              >
            </font>
            </el-col>
            
            <el-col :span="11">
              <el-form-item label="供应商" :style="{ display: visiblehexin }">
                <el-select
                  v-model="SupplierListInt"
                  multiple
                  placeholder="请选择供应商"
                  class="selectsupply"
                  style="width: 100%"
                  @change="selectSupplyChanged"
                >
                  <el-option
                    width="180"
                    v-for="(supplier, index) in supplierCompany"
                    :key="index"
                    :label="supplier.companyName"
                    :value="supplier.companyId"
                  ></el-option>
                </el-select>
                <font color="red">
                  <span :style="{ display: chooseSupply }">请选择供应商</span>
                </font>
              </el-form-item>
            </el-col>
                 <el-tooltip 
                      class="item"
                      effect="dark"
                      content="企业查询"
                      placement="right"
                      v-if="sfsmkj&&islingjianchaxun"
                    >
                  <el-button
                    v-if="sfsmkj&&islingjianchaxun"
                    icon="el-icon-search"
                    autofocus="false"
                    style="
                      position:relative;
                      border: 0px;
                      font-size: 14px;
                      padding: 0px 0px;
                      margin-right: 15px;
                      margin-top:60px;
                      margin-top: 13px;
                    "
                    @click="findCompanyByPartsCategory"
                  ></el-button> 
            </el-tooltip> 
            <el-col :span="11">
              <el-form-item label="等待申请" :style="{ display: shenqing }" class="dengdaishenqing">
                <el-input
                  placeholder="等待供应方申请"
                  v-model="input"
                  :disabled="true"
                  :style="{ display: shenqing }"
                ></el-input>
              </el-form-item>
            </el-col>
            
          </el-row>
        <br v-if="shifoubr" >
           <el-row>
            <el-col :span="22">
              <el-form-item label="收货地址" :style="{ display: sfkjian }" >
                <el-input
                  v-model="addList.circulationAddress"
                  type="textarea"
                  :rows="2"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        <br v-if="addList.taskType=='1'">
          <el-row>
            <el-col :span="22">
              <el-form-item label="任务详情">
                <el-input
                  v-model="addList.TaskXiangXi"
                  type="textarea"
                  :rows="2"
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
          <el-button
            type="primary"
            @click="bianjitanchu"
            :style="{ display: fahuo }"
            >新增流通清单</el-button
          >
          <el-button type="primary" @click="saveAdd11" :disabled="taskSaveBtn"
            >确 定</el-button
          >
        </div>
        <!-- <div v-if="addList.taskType=='0'||addList.taskType=='1'">
          <el-row>
            <el-col span="4">
               <span class="el-form-item__label" style="width: 120px;">任务工作流</span>
            </el-col>
           </el-row>
          <el-row>
           <el-col span="16"> -->
            <el-image
              v-if="addList.taskType=='1'"
              :src="require('../../../assets/images/subTask/circulationWorkflow.png')" 
              width="100%"
              :preview-src-list="[require('../../../assets/images/subTask/circulationWorkflow.png')]"
            ></el-image>
            <el-image
              v-if="addList.taskType=='0'"
              :src="require('../../../assets/images/subTask/designWorkflow.png')" 
              width="100%"
              :preview-src-list="[require('../../../assets/images/subTask/designWorkflow.png')]"
            ></el-image>
            <!-- </el-col>
          </el-row>
        </div> -->
      </div>

      <!-- <el-divider></el-divider> -->
      <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">专利转移</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; -->
      <!-- 专利表格
      <div>
        <el-table :data="parentTable" style="width: 100%" border highlight-current-row>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="专利名称" width="220">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-link
                  type="primary"
                  @click="goCompanyDetail(scope.row.companyId,scope.row.token)"
                  size="medium"
                >{{ scope.row.petentName }}</el-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" width="220">
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
               <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      <!-- </template>
          </el-table-column>
        </el-table>
      </div> -->

      <div v-show="LTQD">
        <el-divider></el-divider>
        <div
          class="biaoti"
          style="padding: 0 10px; border-left: 3px solid #4e58c5"
        >
          流通清单
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <!-- 流通清单表格 -->
        <div>
          <el-table
            :data="consignmentTable"
            style="width: 100%"
            border
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="50">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="产品名称"
              width="199"
              prop="productName"
            ></el-table-column>
            <el-table-column
              label="产品数量"
              width="160"
              prop="productNumber"
            ></el-table-column>
            <el-table-column
              prop="consignmentTimeLatest"
              label="截止时间"
              sortable
            >
              <template slot-scope="scope">
                {{ scope.row.consignmentTimeLatest | formatDate }}
              </template>
            </el-table-column>
            <el-table-column
              label="联系电话"
              width="160"
              prop="contactNumber"
            ></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  @click="consignmentDetail(scope.row)"
                  type="text"
                  size="small "
                  >查看详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

<div>
        <el-dialog :visible.sync="isEmail">

</el-dialog>
      </div>

      <div>
        <el-dialog :visible.sync="isPatent" class="patentDialog">
          <div
            class="biaoti"
            style="
              padding: 0 10px;
              border-left: 3px solid #4e58c5;
              
            "
          >
            专利转移
          </div>
          <template>
          <el-col :span="7" style="float: right">
            <el-input
              v-model="addList.taskName"
              size="mini"
              placeholder="输入关键字搜索"
              @blur="getParent"
            />
          </el-col></template>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <!-- 专利表格 -->
          <div>
            <el-table
            v-loading="loading"
              :data= parentTable 
              style="width: 100%; margin-top: 30px"
              border
              highlight-current-row
            >
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="专利名称" width="220">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-link
                      type="primary"
                      @click="
                        goTaskDetail(scope.row.companyId, scope.row.token)
                      "
                      size="medium"
                      >{{ scope.row.petentName }}</el-link
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="企业名称" width="220">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-link
                      type="primary"
                      v-if="scope.row.token"
                      @click="
                        goCompanyDetail(scope.row.companyId, scope.row.token)
                      "
                      size="medium"
                      >{{ scope.row.companyName }}</el-link
                    >
                    <el-link
                     type="info"
                      v-else
                      size="medium"
                      >{{ scope.row.companyName }}</el-link
                    >
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
                  <el-link
                    @click="goTaskDetail(scope.row.taskId, scope.row.platform)"
                    type="info"
                    >专利详情</el-link
                  >
                  <el-link
                    v-if="scope.row.token"
                    @click="invite(scope.row.companyName, scope.row.companyId)"
                    type="primary"
                    style="margin-left: 10px"
                    >邀请参与</el-link
                  >
                  <el-link v-else type="success" style="margin-left: 10px"
                  @click="inviteEmail()"
                    >发送邮件邀请</el-link
                  >
                  <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-dialog>
      </div>
      <!-- 编辑流通清单弹出框 -->
      <div class="consignment">
        <el-dialog title :visible.sync="bianjiTC" width="50%">
          <div
            class="biaoti"
            style="padding: 0 10px; border-left: 3px solid #4e58c5"
          >
            流通清单
          </div>
          <br />
          <el-form
            ref="consignmentForm"
            label-width="110px"
            :rules="consignmentRules"
            :model="consignmentForm"
          >
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品名称" prop="productName">
                  <el-input v-model="consignmentForm.productName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品规格" prop="productModel">
                  <el-input v-model="consignmentForm.productModel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品数量" prop="productNum">
                  <el-input
                    v-model="consignmentForm.productNum"
                    maxlength="9"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品单价" prop="productPrice">
                  <el-input
                    v-model="consignmentForm.productPrice"
                    maxlength="9"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="截止时间" prop="consignmentTimeLatest">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期"
                    v-model="consignmentForm.consignmentTimeLatest"
                    style="width: 100%"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系方式" prop="contactNumber">
                  <el-input
                    v-model="consignmentForm.contactNumber"
                    maxlength="11"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注" prop="productNotes">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width: 100%"
                    placeholder="请输入内容"
                    v-model="consignmentForm.productNotes"
                    class="gongsiDetail"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="bianjiTC = false">取 消</el-button>
            <el-button type="primary" @click="deliverySave('consignmentForm')"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>

      <!-- 流通清单详情弹出框 -->
      <div class="consignment">
        <el-dialog title :visible.sync="fhqdxiangqingTC" width="50%">
          <div
            class="biaoti"
            style="padding: 0 10px; border-left: 3px solid #4e58c5"
          >
            流通清单详情
          </div>
          <br />
          <el-form ref="form" label-width="110px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品名称">
                  <el-input
                    v-model="productName1"
                    readonly="readonly"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品规格">
                  <el-input
                    v-model="productModel1"
                    readonly="readonly"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品数量">
                  <el-input
                    v-model="productNum1"
                    readonly="readonly"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品单价">
                  <el-input
                    v-model="productPrice1"
                    readonly="readonly"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-date-picker
                    type="datetime"
                    v-model="consignmentTimeLatest1"
                    style="width: 100%"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    readonly="readonly"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系方式">
                  <el-input
                    v-model="contactNumber1"
                    readonly="readonly"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width: 100%"
                    placeholder="请输入内容"
                    v-model="productNotes1"
                    class="gongsiDetail"
                    readonly="readonly"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="fhqdxiangqingTC = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>

      <!-- 零件查询弹出框 -->
      <div class="consignment">
        <!-- <el-dialog title :visible.sync="partsPopup" width="50%">
          <div
            class="biaoti"
            style="padding: 0 10px; border-left: 3px solid #4e58c5"
          >
          </div>
          <br />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="this.partsPopup = false">确 定</el-button>
          </span>
        </el-dialog> -->
        <!-- 新增供应商弹出框 -->
          <el-dialog  :visible.sync="addCompanyVisible" width="60%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
              新增
            </div>
            <br />
            <el-table
              :data="companyTableData.slice((pageIndex1-1)*pageSize1,pageIndex1*pageSize1)"
              border
              class="companyDialogTable"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange"
            >
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="Company_Name" label="企业名称"></el-table-column>
              <el-table-column prop="Product_Name" label="零件名称"></el-table-column>
              <el-table-column prop="Reserve" width="100" label="库存量"></el-table-column>
              <el-table-column prop="Sale" width="100" label="销售量"></el-table-column>
              <el-table-column prop="Parts_Category" width="150" label="类别"></el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addSelectdSupplier(scope.row)">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br /> 
                <div class="companyDialogPagination">
                <el-pagination
                  background
                  layout="prev, pager, next, total, jumper"
                  :current-page="pageIndex1"
                  :page-size="pageSize1"
                  :total="companyTableData.length"
                  @current-change="companyDialogHandleCurrentChange"
                ></el-pagination>
              </div> 
              <br />          
          </el-dialog>
      </div>
      
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
import { Popover } from "element-ui";
// Vue.use(Popover);
export default {
  name: "addSubTaskDetail",
  data() {
    return {
       loading: true,
      //禁用今天以前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      chooseSupplySelected: false, //是否选择供应商 true未选 false选择
      chooseSupply: "none", //是否提示选择供应商
      LTQD: 0,
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
          circulationAddress: "",
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
      sfkjian:"none",
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
      //xiugaixuqiu
      zhurenwuxiangxi: "",
      sfsmkj: false, //是否私密指派
      //专门用来判断等待申请的br是否出来
      shifoubr:false,
      //根据零件查询出的企业列表弹窗
      addCompanyVisible:false,
      //根据零件查询出的企业列表数组
      companyTableData:[],
      pageIndex1:1,
      pageSize1:6,

      liebieList: { supplyCompany: "" },
      fileList: [],
      usernameX: sessionStorage.getItem("ms_username"),

      visiblehexin: "none",
      shenqing: "none",
      // search: "",
      taskID: "",
      bianjiTC: false,
      fahuo: "none",
      shifoufahuo: "",
      consignmentForm: {
        consignmentTimeLatest: "",
        productName: "",
        productModel: "",
        productNum: "",
        productPrice: "",
        productTotal: "",
        productNotes: "",
        contactNumber: "",
      },
      consignmentTable: [],
      fhqdxiangqingTC: false,
      consignmentTimeLatest1: "",
      productName1: "",
      productModel1: "",
      productNum1: "",
      productPrice1: "",
      productTotal1: "",
      productNotes1: "",
      contactNumber1: "",
      taskSaveBtn: false,
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      mainTaskID: this.$route.query.mainTaskID,
      cooList: { shifouyaoqing: "", shifousimi: "" },
      //判断流通时候的零件类别是否显示
      islingjianchaxun:false,
      SupplierListInt: [],
      //零件类别的数据
      allCategoryList:[],
      //所有零件类别下拉框
      CategoryListoptions:[],
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
      parentTable2: "",
      isPatent: false,
      isEmail:false,
      //编辑流通清单 数据验证
      consignmentRules: {
        consignmentTimeLatest: [
          { required: true, message: "请选择截止时间", trigger: "blur" },
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "请输入长度在 1 到 10 个字符的名称",
            trigger: "blur",
          },
        ],
        productModel: [
          { required: true, message: "请输入产品规格", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "请输入长度在 1 到 10 个字符的规格",
            trigger: "blur",
          },
        ],
        productNum: [
          { required: true, message: "请输入产品数量", trigger: "blur" },
          {
            pattern: /^\d{1,9}$/,
            message: "请输入1到9位的整数",
            trigger: "blur",
          },
        ],
        productPrice: [
          { required: true, message: "请输入产品单价", trigger: "blur" },
          {
            pattern: /^\d{1,9}$/,
            message: "请输入为1到9位的整数",
            trigger: "blur",
          },
        ],
        productNotes: [
          { required: true, message: "请输入备注或填写无", trigger: "blur" },
        ],
        contactNumber: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的联系方式",
            trigger: "blur",
          },
        ],
      },
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {
    this.getAllIndustryList();
    this.getAllSupplierList();
    this.getAllPartsList();
    that.consignmentTableShuaxin();
  },
  methods: {  
    // handleSearch(val) {
    //   let search = val;
    //   if (search == "") {
    //     //如果search不等于空
    //     this.parentTable2 = this.parentTable;
    //     // this.parentTable = this.parentTable2.length;
    //   }
    //   if (search != "") {
    //     //如果search等于空
    //     this.parentTable2 = this.parentTable.filter(
    //       (data) =>
    //         !search || data.petentName.toLowerCase().includes(search.toLowerCase())
    //     );
    //     // this.tableData_length = this.parentTable2.length;
    //   }
    // },

    //根据零件类别查询企业
    findCompanyByPartsCategory(){
      if(this.allCategoryList==''||this.allCategoryList==null)
      { 
        this.$message({
          type: "warning",
          message: "请选择零件种类",
        });
      }
      else{
        var that = this;
        var data = Qs.stringify({
          partsCategory :this.allCategoryList,
        });
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/findCompanyByPartsCategory",
            data: data,
          })
          .then((response) => {
             this.companyTableData = response.data.allData;//接收返回的企业列表
          });
        //企业列表弹出框弹出
        this.addCompanyVisible=true;
      }
    },
    //企业列表分页改变
    companyDialogHandleCurrentChange(cpage){
      this.pageIndex1 = cpage;
    },
    //判断供应商集合中是否存在某值
    supplierIsExist(selectSupplierId){
      var supplierExist = false;
      this.supplierCompany.forEach(function (element) {
        for (let [key, value] of Object.entries(element)) {
          if(key == "companyId" && value == selectSupplierId)
            supplierExist = true;
        }
      });
      return supplierExist; 
    },
    //判断选中的供应商ID数组中是否存在某值
    selectedSupplierIsExist(selectSupplierId){
      var selectedSupplierExist = false;
      this.SupplierListInt.forEach(function (element) {
        if(element == selectSupplierId)
          selectedSupplierExist = true;
      });
      return selectedSupplierExist;
    },
    //选择供应商至选中框
    addSelectdSupplier(row){
      //如果选中的在供应商列表
      if(this.supplierIsExist(row.Company_ID)){
        //如果在选中列表，提示已添加
        if(this.selectedSupplierIsExist(row.Company_ID)){
          this.$message({
            type: "info",
            message: "已选择供应商",
          });
        }else{
          //如果不在选中列表，加入选中列表，并提示添加成功
          this.SupplierListInt.push(row.Company_ID);
          this.$message({
            type: "success",
            message: "选择供应商成功",
          });
        }
      }else{ //如果不在供应商列表,保存原来选择的供应商，添加供应商至数据库，重新加载供应商下拉框，选中原+现
        //判断是否选中自己
        if(this.usernameX == row.User_Name){
          this.$message({
              type: "warning",
              message: "不能添加自己作为供应商"
            });
        }else{
          var arrCopy = this.SupplierListInt.concat();//原来选中的
          arrCopy.push(row.Company_ID);//原来选中的+当前选中的
          this.addSupplier(row.Company_ID);
          this.getAllSupplierList();//刷新
          this.SupplierListInt = arrCopy.concat();//回传
          this.$message({
              type: "success",
              message: "添加并选择供应商成功",
          });
        }
      }
    },
    //将供应商添加到数据库
    addSupplier(companyId){
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        companyId: companyId
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/tianjiaSupplier",
          data: data
        })
        .then(response => {
        });
    },
    goPatent() {
      this.isPatent = true;
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
    //查询零件种类信息
    getAllPartsList(){
      var that = this;
      var data = Qs.stringify({
    
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/selectPartsCategory",
          data: data,
        })
        .then((response) => {
         this.CategoryListoptions=response.data.allData;
        });
    },
    //查询行业类别列表
    getAllIndustryList(){
      var that = this;
      var data = Qs.stringify({
        PId: this.type,
        username: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/getAllIndustryList",
          data: data,
        })
        .then((response) => {
          // console.log(response);
          this.xuanzelist = this.getTreeData(response.data.allData);
        });
    },
    //查询供应商列表
    getAllSupplierList(){
      var that = this;
      var data = Qs.stringify({
        PId: this.type,
        username: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/getAllSupplierList",
          data: data,
        })
        .then((response) => {
          // console.log(response);
          this.supplierCompany = response.data.allData;
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
        this.busm = "inline"; //不私密-发布-全部可见
        this.sm = "none";
      } else {
        this.sm = "inline"; //私密-不发布-仅该供应方可见
        this.busm = "none";
      }
    },
    //
    leibieChanged(leibie){
        if(leibie==1){
            this.sfkjian = "inline";
            this.islingjianchaxun=true;
        }else{
          this.sfkjian = "none";
          this.islingjianchaxun=false;
        }
    },
    invitate(coo) {
      if (coo == 0) {
        this.visiblehexin = "inline";
        this.shenqing = "none";
        this.sfsmkj = true;
        this.shifoubr=false;
      } else {
        this.shenqing = "inline";
        this.visiblehexin = "none";
        this.sfsmkj = false;
        this.shifoubr=true;
      }
    },
    //供应商选择改变
    selectSupplyChanged(event) {
      if (event.length != 0) {
        this.chooseSupplySelected = true;
        this.chooseSupply = "none";
      } else {
        this.chooseSupplySelected = false;
        //this.chooseSupply="inline";//显示提示
      }
    },
    inviteEmail(){
      this.isEmail=true;

    },
    //======保存新增========
    saveAdd11() {
      //console.log(this.TaskXiangXi)
      if (
        this.technicalFile == "null" ||
        (this.sm == "inline" && this.chooseSupplySelected == false)
      ) {
        this.chooseSupply = "inline";
        this.$message({
          type: "warning",
          message: "你还有重要信息未填写，填写后再提交",
        });
      } else {
        if (this.cooList.shifousimi != 1) {
          this.cooList.shifousimi = 0;
        }
        //记录提交前的任务类别
        var bianjifahuo = this.addList.taskType;
        if(this.addList.circulationAddress==''||this.addList.circulationAddress==null){
          this.addList.circulationAddress="暂无地址";
        }
        if(this.allCategoryList==''||this.allCategoryList==null){
          this.allCategoryList="暂无零件种类";
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
          circulationAddress:this.addList.circulationAddress,
          allCategoryList:this.allCategoryList, //零件种类
          SupperListINt: this.SupplierListInt,
        });
        // console.log(data);
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/addSubstaskInformation",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((response) => {
            if (response.data !== null) {
              //存储流通清单
              // console.log(response.data);
              this.$message.success("提交成功");
              this.technicalFileWanzheng = "";
              //this.addList = {};

              //根据任务类别 显示编辑按钮
              if (bianjifahuo == 1) {
                this.fahuo = "inline";
              }
              //保存taskId
              that.taskID = response.data;
              //禁用新增子任务按钮
              this.taskSaveBtn = true;

              //此处返回到详情界面
              //this.goBack();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //======新增流通清单弹出
    bianjitanchu() {
      this.bianjiTC = true;
    },
    //======保存新增流通清单========
    deliverySave() {
      this.$refs.consignmentForm.validate((valid) => {
        if (valid) {
          var that = this;
          //1.保存数据到本地  2.调用方法存入数据库 3.弹出成功提示消息 4.清空关闭 5.刷新table
          //====流通清单数据====
          var data = Qs.stringify({
            taskId: this.taskID,
            consignmentTimeLatest: this.consignmentForm.consignmentTimeLatest,
            productName: this.consignmentForm.productName,
            productModel: this.consignmentForm.productModel,
            productNumber: this.consignmentForm.productNum,
            productPrice: this.consignmentForm.productPrice,
            totalPrice: "0", //在后台算
            consignmentNotes: this.consignmentForm.productNotes,
            contactNumber: this.consignmentForm.contactNumber,
            deliveryTime: this.consignmentForm.consignmentTimeLatest,
            //deliveryTime:"0000-00-00 00:00:00",
            consignmentState: "0", //未发货
            shippingAddress: "暂无地址",
          });
          that
            .axios({
              method: "post",
              url: "/api/addConsignment/add",
              data: data,
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then((response) => {
              if (response.data == "成功") {
                this.$message.success("添加流通清单信息成功");
                this.consignmentForm = {};
                //弹出框消失
                this.bianjiTC = false;
                that.consignmentTableShuaxin();
                this.LTQD = 1;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，填写后再提交",
          });
        }
      });
    },
    //======刷新流通清单表格========
    consignmentTableShuaxin() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/select",
          data: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          this.consignmentTable = response.data.allData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //======流通清单 查看详情========
    consignmentDetail(row) {
      //alert(row.consignmentId);
      this.fhqdxiangqingTC = true;
      var that = this;
      var data = Qs.stringify({
        consignmentId: row.consignmentId,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/selectById",
          data: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          //this.consignmentTable = response.data.allData;
          // console.log(response.data.allData);
          this.productName1 = response.data.allData[0].productName;
          this.productModel1 = response.data.allData[0].productModel;
          this.productNum1 = response.data.allData[0].productNumber;
          this.productPrice1 = response.data.allData[0].productPrice;
          this.consignmentTimeLatest1 =
            response.data.allData[0].consignmentTimeLatest;
          this.contactNumber1 = response.data.allData[0].contactNumber;
          this.productNotes1 = response.data.allData[0].consignmentNotes;
        })
        .catch((error) => {
          console.log(error);
        });
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
     this.loading= true;
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
              this.loading=false;
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
          // console.log(response);
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
    // changeTable()
    // {
    //   this.handleSearch();
    // },
    inviteEmail()
    {
      this.$confirm('此操作将对此公司发送邀请邮件，请确认操作', '', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认发送',
          cancelButtonText: '放弃发送'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '发送成功'
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '未发起邀请'
                : '未发起邀请'
            })
          });
    }
  },
  //  watch: {
  //   //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
  //   search(newVal) {
  //     this.handleSearch(newVal);


  //   },

    // isPatent(newVal)
    // {
    //   this.changeTable();
    // }
  // },
  //  mounted() {
  //   this.parentTable2 = this.parentTable;
  //   // this.tableData_length = this.tableData.length;
  // },
  // watch:{
  //   //监听productNum的值，参数val代表其值，若发生变化，则计算的productTotal值也发生变化
  //   productNum:function(val){
  //     this.productTotal = parseInt(this.productPrice) * parseInt(val);
  //     if(isNaN(this.productTotal)){
  //       this.productTotal = "";
  // 		}
  //   },
  //   //监听productPrice的值，参数val代表其值，若发生变化，则计算的productTotal值也发生变化
  //   productPrice:function(val){
  //     this.productTotal = parseInt(val) * parseInt(this.productNum);
  //     if(isNaN(this.productTotal)){
  //       this.productTotal = "";
  // 		}
  //   },
  // },
};
</script>

<style lang="scss">
.addSubTask .box {
  width: 400px;
}
.addSubTask .item {
  margin: 4px;
}
.addSubTask .biaoti {
  font-size: 18px;
  color: #303133;
  padding: 0 10px;
  border-left: 3px solid #4e58c5;
}
.addSubTask .el-upload--text {
  width: 85px;
  height: 40px;
}
/* //返回字体 */
.addSubTask .el-page-header__title {
  font-size: 18px;
}
.addSubTask .patentDialog .el-dialog__header {
padding: 0px;
}
.consignment {
  .el-dialog__body {
    padding-right: 0px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .el-dialog__header {
    padding-right: 0%;
    padding-top: 0%;
    padding-bottom: 0%;
  }
  .el-dialog__footer {
    padding-right: 40px;
    padding-top: 0px;
  }
}
.simichakan{
  float: right;
  margin-top: -18px;
  margin-right: 110px;
}
.addSubTask .companyDialogTable{
  width: 98%;
}
.addSubTask .companyDialogPagination{
  // float: right;
  text-align:right;
  margin-right: 2%;
  // display: inline;
}
</style>