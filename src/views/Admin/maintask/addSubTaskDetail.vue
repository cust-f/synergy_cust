<template>
  <el-container class="addSubTask">
    <el-header height="20px">
      <el-page-header @back="goBack" content="新增子任务"></el-page-header>
      <!-- &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; -->
    </el-header>

    <el-divider></el-divider>
    <el-main>
      <div>
        <!-- 新增基本信息 hide-required-asterisk -->
        <el-form ref="addList" :model="addList" label-width="120px" :rules="addListRules" hide-required-asterisk>
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务名称" prop="taskName">
                <el-input v-model="addList.taskName">
                  <div class="box">
                    <el-button slot="suffix" icon="el-icon-search" autofocus="false" style="
                          border: 0px;
                          font-size: 14px;
                          padding: 0px 0px;
                          margin-right: -45px;
                        " @click="goPatent()">123</el-button>
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
                  position: relative;
                  border: 0px;
                  font-size: 14px;
                  padding: 0px 0px;
                  margin-left: -430px;
                  margin-top: 60px;
                  margin-top: 13px;
                "
                @click="goPatent()"
              ></el-button>
            </el-tooltip>
            <el-col :span="11">
              <el-form-item label="联络电话" prop="Telphone">
                <el-input v-model="addList.Telphone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="发布时间" prop="beginTime">
                <el-date-picker type="datetime" placeholder="选择发布日期" v-model="addList.beginTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="截止时间" prop="deadline">
                <el-date-picker type="datetime" placeholder="选择截止日期" v-model="addList.deadline" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%" :picker-options="pickerOptions"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="行业类别" prop="selectCateKeys">
                <el-cascader style="width: 100%" expand-trigger="hover" v-model="addList.selectCateKeys" :options="industryOptions" :props="industryProps" props.checkStrictly="true" placeholder="请选择行业类别"></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="任务类别" prop="taskType">
                <el-select v-model="addList.taskType" placeholder="请选择任务类别" class="selectsupply" style="width: 100%" @change="leibieChanged">
                  <el-option v-for="leibie in Task" :key="leibie.id" :label="leibie.label" :value="leibie.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="是否邀请" prop="shifouyaoqing">
                <el-select v-model="addList.shifouyaoqing" placeholder="请选择是或者否" class="selectsupply" @change="invitate" style="width: 100%">
                  <el-option width="180" v-for="coo in shifou" :key="coo.id" :label="coo.label" :value="coo.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" v-if="sfsmkj">
              <el-form-item label="零件类别" :style="{ display: sfkjian }" prop="patrsList" :rules="(addList.shifouyaoqing == '0' && addList.taskType == '1')?addListRules.patrsList:{required: false}">
                <el-cascader style="width: 100%" expand-trigger="hover" v-model="addList.patrsList" :options="partsOptions" :props="partsProps" ref="partsCascader" placeholder="请选择零件类别"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="等待申请" :style="{ display: shenqing }" class="dengdaishenqing">
                <el-input placeholder="等待供应方申请" v-model="input" :disabled="true" :style="{ display: shenqing }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" v-if="isgongyingshang">
              <el-form-item label="供应商" :style="{ display: visiblehexin }" prop="SupplierListInt" :rules="addList.shifouyaoqing == '0'?addListRules.SupplierListInt:{required: false}">
                <el-select v-model="addList.SupplierListInt" multiple placeholder="请选择供应商" class="selectsupply" style="width: 100%" @change="selectSupplyChanged">
                  <el-option width="180" v-for="(supplier, index) in supplierCompany" :key="index" :label="supplier.companyName" :value="supplier.companyId"></el-option>
                </el-select>
                <font color="red">
                  <span :style="{ display: chooseSupply }">请选择供应商</span>
                </font>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11" v-if="sfsmkj">
              <el-form-item label="是否发布" prop="shifousimi" :rules="addList.shifouyaoqing === '0'?addListRules.shifousimi:{required: false}">
                <el-select v-model="addList.shifousimi" placeholder="请选择是或者否" class="selectsupply" @change="simizhiding" style="width: 100%">
                  <el-option width="180" v-for="coo in shifousimi" :key="coo.id" :label="coo.label" :value="coo.id"></el-option>
                </el-select>
              </el-form-item>
              <!-- <div class="el-form-item__error" :style="{ display: sm }">仅限供应方可见</div>
              <div class="el-form-item__error" :style="{ display: busm }">全部可见</div> -->
              <span class="simichakan" :style="{ display: sm }">仅限供应方可见</span>
              <span class="simichakan" :style="{ display: busm }">全部可见</span>
            </el-col>

            <el-col :span="11" v-if="islingjianchaxun">
              <el-form-item label="供应商" :style="{ display: visiblehexin }" prop="SupplierListInt" :rules="addList.shifouyaoqing == '0'?addListRules.SupplierListInt:{required: false}">
                <el-select v-model="addList.SupplierListInt" multiple placeholder="请选择供应商" class="selectsupply" style="width: 100%" @change="selectSupplyChanged">
                  <el-option width="180" v-for="(supplier, index) in supplierCompany" :key="index" :label="supplier.companyName" :value="supplier.companyId"></el-option>
                </el-select>
                <font color="red">
                  <span :style="{ display: chooseSupply }">请选择供应商</span>
                </font>
              </el-form-item>
            </el-col>
            <el-tooltip class="item" effect="dark" content="企业查询" placement="right" v-if="sfsmkj&&islingjianchaxun">
              <el-button v-if="sfsmkj&&islingjianchaxun" icon="el-icon-search" autofocus="false" style="
                      position:relative;
                      border: 0px;
                      font-size: 14px;
                      padding: 0px 0px;
                      margin-right: 15px;
                      margin-top:60px;
                      margin-top: 13px;
                    " @click="findCompanyByPartsCategory"></el-button>
            </el-tooltip>
            <!-- <el-col :span="11">
              <el-form-item label="等待申请" :style="{ display: shenqing }" class="dengdaishenqing">
                <el-input
                  placeholder="等待供应方申请"
                  v-model="input"
                  :disabled="true"
                  :style="{ display: shenqing }"
                ></el-input>
              </el-form-item>
            </el-col> -->

          </el-row>
          <!-- <br v-if="shifoubr" > -->
          <el-row>
            <el-col :span="22">
              <el-form-item label="收货地址" :style="{ display: sfkjian }" prop="circulationAddress" :rules="addList.taskType === '1'?addListRules.circulationAddress:{required: false}">
                <el-input v-model="addList.circulationAddress" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <br v-if="addList.taskType == '1'" />
          <el-row>
            <el-col :span="22">
              <el-form-item label="任务详情" prop="TaskXiangXi">
                <el-input v-model="addList.TaskXiangXi" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="添加附件">
            <el-upload class="upload-demo" action="/api/MainTaskInformation/import" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess" multiple :limit="10" ref="upload" :file-list="fileList">
              <el-button size="small" type="primary">上传文件</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
        </el-form>

        <!-- <el-button @click="addVisible = false">取 消</el-button> -->
        <div align="right">
          <el-button type="primary" @click="bianjitanchu" :style="{ display: fahuo }">新增流通清单</el-button>
          <el-button type="primary" @click="saveAdd11" :disabled="taskSaveBtn">确 定</el-button>
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
          v-if="addList.taskType == '1'"
          :src="
            require('../../../assets/images/subTask/circulationWorkflow.png')
          "
          width="100%"
          :preview-src-list="[
            require('../../../assets/images/subTask/circulationWorkflow.png'),
          ]"
        ></el-image>
        <el-image
          v-if="addList.taskType == '0'"
          :src="require('../../../assets/images/subTask/designWorkflow.png')"
          width="100%"
          :preview-src-list="[
            require('../../../assets/images/subTask/designWorkflow.png'),
          ]"
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
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
          流通清单
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <!-- 流通清单表格 -->
        <div>
          <el-table :data="consignmentTable" style="width: 100%" border highlight-current-row>
            <el-table-column type="index" label="序号" width="50">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" width="199" prop="productName"></el-table-column>
            <el-table-column label="产品数量" width="160" prop="productNumber"></el-table-column>
            <el-table-column prop="consignmentTimeLatest" label="截止时间" sortable>
              <template slot-scope="scope">
                {{ scope.row.consignmentTimeLatest | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="联系电话" width="160" prop="contactNumber"></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button @click="consignmentDetail(scope.row)" type="text" size="small ">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div>
        <el-dialog :visible.sync="isEmail"> </el-dialog>
      </div>

      <div>
        <el-dialog :visible.sync="isPatent" class="patentDialog">
          <div
            class="biaoti"
            style="padding: 0 10px; border-left: 3px solid #4e58c5"
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
              /> </el-col
          ></template>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <!-- 专利表格 -->
          <div>
            <el-table
              v-loading="loading"
              :data="parentTable"
              style="width: 100%; margin-top: 30px"
              border
              highlight-current-row
            >
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="专利名称" width="220">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-link type="primary" @click="
                        goTaskDetail(scope.row.companyId, scope.row.token)
                      " size="medium">{{ scope.row.petentName }}</el-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="企业名称" width="220">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-link type="primary" v-if="scope.row.token" @click="
                        goCompanyDetail(scope.row.companyId, scope.row.token)
                      "
                      size="medium"
                      >{{ scope.row.companyName }}</el-link
                    >
                    <el-link type="info" v-else size="medium">{{
                      scope.row.companyName
                    }}</el-link>
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
                  <el-link
                    v-else
                    type="success"
                    style="margin-left: 10px"
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
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
            流通清单
          </div>
          <br />
          <el-form ref="consignmentForm" label-width="110px" :rules="consignmentRules" :model="consignmentForm">
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
                  <el-input v-model="consignmentForm.productNum" maxlength="9"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品单价" prop="productPrice">
                  <el-input v-model="consignmentForm.productPrice" maxlength="9"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="截止时间" prop="consignmentTimeLatest">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="consignmentForm.consignmentTimeLatest" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系方式" prop="contactNumber">
                  <el-input v-model="consignmentForm.contactNumber" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
            <el-col :span="11">
              <el-form-item label="零件类别"  prop="consignmentpatrsList">
                <el-cascader style="width: 100%" expand-trigger="hover" v-model="consignmentForm.consignmentpatrsList" :options="partsOptions" :props="partsProps" ref="consigpartsCascader" placeholder="请选择零件类别"></el-cascader>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注" prop="productNotes">
                  <el-input type="textarea" :rows="3" style="width: 100%" placeholder="请输入内容" v-model="consignmentForm.productNotes" class="gongsiDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="bianjiTC = false">取 消</el-button>
            <el-button type="primary" @click="deliverySave('consignmentForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <!-- 流通清单详情弹出框 -->
      <div class="consignment">
        <el-dialog title :visible.sync="fhqdxiangqingTC" width="50%">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
            流通清单详情
          </div>
          <br />
          <el-form ref="form" label-width="110px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品名称">
                  <el-input v-model="productName1" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品规格">
                  <el-input v-model="productModel1" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品数量">
                  <el-input v-model="productNum1" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品单价">
                  <el-input v-model="productPrice1" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-date-picker type="datetime" v-model="consignmentTimeLatest1" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss" readonly="readonly"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系方式">
                  <el-input v-model="contactNumber1" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注">
                  <el-input type="textarea" :rows="3" style="width: 100%" placeholder="请输入内容" v-model="productNotes1" class="gongsiDetail" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="fhqdxiangqingTC = false">确 定</el-button>
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
          <el-dialog  :visible.sync="addCompanyVisible" width="60%" :before-close="TwohandleDialogClose">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
              新增供应商
            </div>
            <br />
            <el-table
              :data="companyTableData.slice((pageIndex1-1)*pageSize1,pageIndex1*pageSize1)"
              border
              class="companyDialogTable"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange"
              @sort-change="sortChange"
              :default-sort ="{prop:'newStars',order:'descending'}"
            >
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="Company_Name"  width="315" label="企业名称">
                <template slot-scope="scope">
                  <el-link @click.native="getCompanyInfo(scope.row)" :disabled="dialogLineChartVisible">
                    {{ scope.row.Company_Name}}
                  </el-link>
                  <span v-show="scope.row.recommend != 0">
                    <el-tag type="success" size="mini">已合作</el-tag>
                  </span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="Recommend_Stars" width="167" label="推荐" sortable='custom'>
                <template slot-scope="scope">
                  <el-rate v-model="scope.row.Recommend_Stars" disabled show-score text-color="#ff9900"></el-rate>
                </template>
            </el-table-column> -->
            <!-- 重映射  newStars 【算出的数据有问题】 -->
            <el-table-column prop="newStars" width="167" label="推荐" sortable>
                <template slot-scope="scope">
                  <el-rate v-model="scope.row.newStars" disabled show-score text-color="#ff9900"></el-rate>
                </template>
            </el-table-column>
            <el-table-column prop="Parts_Category" label="零件类别"></el-table-column>
              <el-table-column prop="Product_Name" label="零件名称"></el-table-column>
              <el-table-column prop="Reserve" width="90" label="库存量" sortable='custom'></el-table-column>
              <el-table-column prop="Sale" width="90" label="销售量" sortable='custom'></el-table-column>
              <el-table-column label="操作" width="80" align="center">
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
    <!-- 弹出折线图 -->
    <!-- <el-button
      type="danger"
      @click="showLineChart"
      :disabled="dialogLineChartVisible"
      >弹 出</el-button
    > -->
    <!-- <el-card>
        <line-chart :lineData="lineData" ref="drawLineChart"></line-chart>
        </el-card> -->
    <!-- 供应商企业信息弹出框 -->
    <div class="lineChart1">
      <el-dialog  :visible.sync="dialogLineChartVisible" center :before-close="handleDialogClose">
          <!-- <template slot="title">
             供应商企业详情
          </template> -->
       
        <el-row>
          <el-col :span="8">
            <el-row>
                <!-- 企业信息模块 -->
              <el-col>

              <el-card>
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div><br>
          <el-form ref="companyDetailForm" :model="companyDetailForm" label-width="80px" class="company-detail-form">
            <el-row :gutter="20">
              <!-- <el-col :span="7">
                <el-form-item label-width="0" class="company-detail-form-item">
                  <div class="company-detail-imgdiv">
                    <img class="company-detail-img" :src="this.companyDetailForm.logo" fit="fill" border="1"/>
                  </div>
                </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-row :gutter="20">
                  <el-col :offset="1" :span="4" style="padding-left: 0px;padding-right: 0px;">
                    <el-form-item label-width="0" class="company-detail-form-item">
                  <div class="company-detail-imgdiv">
                    <img class="company-detail-img" :src="this.companyDetailForm.logo" fit="fill" border="1"/>
                  </div>
                </el-form-item>
                  </el-col>
                  <el-col :span="19">
                  <el-form-item label-width="0" class="company-detail-form-item">
                   <span style="font-size: 18px;">{{ this.companyDetailForm.companyName }}</span>
                  </el-form-item> 
                  <el-form-item label-width="0" class="company-detail-form-item">
                    <el-rate v-model="this.companyDetailForm.star" disabled text-color="#ff9900"></el-rate>
                  </el-form-item>
                  </el-col>
                </el-row>
                  <el-divider></el-divider>
                  <el-form-item label="业务范围" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.product }}</span>
                  </el-form-item>
                  <el-form-item label="企业地址" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.address }}</span>
                  </el-form-item>
                  <el-form-item label="联系电话" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.officeNumber }}</span>
                  </el-form-item> 
                  <el-form-item label="电子邮箱" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.email }}</span>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
 
        </el-card>
              </el-col>
            </el-row>
            <el-row>
              <!-- 工作评价 -->
              <el-col>
                <!-- 流通任务模块 雷达图 -->
        <el-card>
            
                <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">工作评价</div>
               <div class="input_span" align="center">
              <el-form ref="form" :modelZL="formZL">
                <label  >完成质量:</label>
                <label id="word" style="font-size: 14px"></label>
              </el-form>
              <span id="one"></span>
              <span id="two"></span>
              <span id="three"></span>
                </div>
            <radar-chart1
                    :radarData1="radarData1"
                    ref="refradarChart1"
                    class="renwupingjia"
                    ></radar-chart1>
        <!-- <div>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">工作评价</div>
        <div class="LDT">
          <div class="input_span" align="center">
              <el-form ref="form" :modelZL="formZL">
                <label >完成质量:</label>
                <label id="word" style="font-size: 16px"></label>
                <br />
                 <br />
              </el-form>
              <span id="one"></span>
              <span id="two"></span>
              <span id="three"></span>
       </div>
       <br>

       <radar-chart1
        :radarData1="radarData1"
        ref="refradarChart1"
        class="renwupingjia"
        ></radar-chart1>
       </div>
        </div> -->
        </el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16">        
            <!-- 零件销量库存图表折线图 -->
        <el-card>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">销售/库存趋势图</div>
        <div class="type2-situation">{{this.lineTitle}}</div>
        <br/>
        <div class="type22-situation">
          <span class="title-inventory">{{"当前库存量："+this.nowInventoryNum}}</span>
          &nbsp;
          <span class="title-sale">{{"当前销售量："+this.nowSaleNum}}</span>
          <!-- <span class="title-star">
            {{"推荐星级："}}
              <el-rate v-model="this.nowStar" disabled show-score text-color="#ff9900"></el-rate>
          </span> -->
        </div>
        <br/>
        <div class="type23-situation">
          <span class="title-star">
              <el-rate v-model="this.nowStar" disabled show-score text-color="#ff9900"></el-rate>
          </span>
           <template>
             <div  style="margin-bottom:38px">
            <el-select
              style="width: 100px; float: right"
              v-model="lineYear"
              @change="lineChartChange"
            >
              <el-option
                v-for="item in options"
                placeholder="请选择"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
                width="20px"
              ></el-option>
            </el-select>
            </div>
          </template>
        </div>
        <br/>
        <!-- <div style="float: right;margin-bottom:-20px">
         
        </div> -->
        <!-- <el-card> -->
          <div  >
        <line-chart :lineData="lineData" ref="drawLineChart"></line-chart>
      </div>
        </el-card>
          </el-col>
        </el-row>
          

      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
import radarChart1 from "../../Admin/Enterprise_Evaluation/components/radarCharthh"
import { Popover } from "element-ui";
import lineChart from "./components/lineChart"; //折线图
// Vue.use(Popover);
export default {
  name: "addSubTaskDetail",
  components: {
    "line-chart": lineChart, //折线图
    "radar-chart1":radarChart1,
  },
  data() {
    return {
      form: {
        circulationCount: 0, //流通完成质量
      },
      userName: sessionStorage.getItem("ms_username"),
      UserName:"",
      form2:{
         time1:"",
         time2:"",
      } ,
      radarData1:{
        radarData1:[],
        indicatorData1:[],
      },
       options: [],  
      loading: true,
      dialogLineChartVisible: false, //显示折线图
      lineYear: "",
      productCompanyId:"",
      productCompanyName:"",
      productName1:"",
      lineTitle:"",
      //当前库存量
      nowInventoryNum:"",
      //当前销售量
      nowSaleNum:"",
      //当前推荐星级
      nowStar:"",
      //当前月份
      nowMonth:"",
      /**
       * 数据统计
       */
      //折线图
      lineData: {
        //发布任务总量
        saleCount: [],
        //完成任务总量
        inventoryCount: [],
        //月份数量
        months: [],
        //销售量(预测)
        salePredictionCount:[],
        //库存量(预测)
        inventoryPredictionCount:[],
      },
      //禁用今天以前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      chooseSupplySelected: false, //是否选择供应商 true未选 false选择
      chooseSupply: "none", //是否提示选择供应商
      LTQD: 0,
      usernameX: sessionStorage.getItem("ms_username"),
      mainTaskID: this.$route.query.mainTaskID,
      name: this.$route.query.name,
      type: this.$route.query.type,
      // =====================================================================
      // 新增子任务
      addList: {
        taskName: "", //任务名称
        Telphone: "", //联络电话
        taskType: "", //任务类别
        beginTime: "", //发布时间
        deadline: "", //截止时间
        circulationAddress: "", //收货地址
        selectCateKeys: [], //行业类别
        TaskXiangXi: "", //任务详情
        shifouyaoqing: "", //是否邀请
        shifousimi: "", //是否发布
        SupplierListInt: [], //供应商
        patrsList: [], //零件类别
      },
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
      //行业类别 选项列表
      industryOptions: [],
      //行业类别 级联选择框的配置对象
      industryProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: true,
      },
      //零件类别 选项列表
      partsOptions: [],
      //零件类别 级联选择框的配置对象
      partsProps: {
        value: "categoryID",
        label: "partsCategory",
        children: "children",
      },
      //任务类别
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
      sfkjian: "none",
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
      shifoubr: false,
      //根据零件查询出的企业列表弹窗
      addCompanyVisible: false,
      //根据零件查询出的企业列表数组
      companyTableData: [],
      //根据零件查询出的企业列表数组的分页参数
      pageIndex1: 1, //页码
      pageSize1: 10, //每页数据

      isgongyingshang: false,
      twogongyingshang: false,
      liebieList: { supplyCompany: "" },
      fileList: [],

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

      cooList: { shifouyaoqing: "", shifousimi: "" },
      //判断流通时候的零件类别是否显示
      islingjianchaxun: false,
      SupplierListInt: [],
      //零件类别的数据
      allCategoryList:[],
      //所有零件类别下拉框
      CategoryListoptions:[],
      islingjianchaxun:false,
      form: {},

      publishdate: "",
      deaddate: "",
      leader: "",
      xiangxi: "",
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      shangchuancishu: 0,
      dialogVisible: false,
      // // 级联选择框双向绑定到的数组 =--子
      // selectCateKeys1: [],
      // //行业类别级联选择框双向绑定到的数组
      // selectCateKeys: [],

      //弹框-(供应商)企业信息
      companyDetailForm:[],

      subStaskTypeID: "",
      // ==============================================================================
      //专利列表
      parentTable: "",
      parentTable2: "",
      isPatent: false,
      isEmail: false,
      //新增子任务 数据验证
      addListRules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        Telphone: [
          { required: true, message: "请输入联络电话", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确格式的联络电话",
            trigger: "blur",
          },
        ],
        taskType: [
          { required: true, message: "请选择行业类别", trigger: "change" },
        ],
        beginTime: [
          { required: true, message: "请选择发布时间", trigger: "change" },
        ],
        deadline: [
          { required: true, message: "请选择截止时间", trigger: "change" },
        ],
        circulationAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
        ],
        selectCateKeys: [
          { required: true, message: "请选择行业类别", trigger: "change" },
        ],
        TaskXiangXi: [
          { required: true, message: "请输入任务详情", trigger: "blur" },
        ],
        shifouyaoqing: [
          {
            required: true,
            message: "请选择是或者否",
            trigger: ["change", "blur"],
          },
        ],
        shifousimi: [
          {
            required: true,
            message: "请选择是或者否",
            trigger: ["change", "blur"],
          },
        ],
        patrsList: [
          {
            required: true,
            message: "请选择零件类别",
            trigger: ["change", "blur"],
          },
        ],
        SupplierListInt: [
          { required: true, message: "请选择供应商", trigger: "change" },
        ],
      },
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
        consignmentpatrsList: [
          { required: true, message: "请输入零件类别", trigger: "blur" },
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
    // this.getRadarData1();//流通任务-雷达图-接收
    this.consignmentTableShuaxin();
    this.getYearData();
    // this.lineChart();
    this.getAllIndustryList();
    this.getAllSupplierList();
    this.getAllPartsList();
    that.consignmentTableShuaxin();
  },
  methods: {

    //获取条件选择时间数据
    getYearData() {
      let that = this;
      that.axios.post("/api/findYearsList").then(response => {
        this.lineYear = response.data.allData.nowYear;
        this.options= response.data.allData.years;  
        this.lineChartChange();
            
      });
    },
    //(供应商)企业 详情显示 ：1.企业信息 2.仓库库存趋势折线图 3.流通任务雷达图
    getCompanyInfo(row){
      // 1.企业信息 
      this.showCompanyDetail(row.Company_ID);
      // 2.仓库库存趋势折线图 
      this.showLineChart(row);
      // 3.流通任务雷达图
      this.showCirculationSubtaskRadar(row);
    },
    // 1.(供应商)企业信息
    showCompanyDetail(companyId){
      var that = this;
      var data = Qs.stringify({
        CompanyID: companyId,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/showCompanyDetal",
          data: data,
        })
        .then((response) => {
          this.companyDetailForm = response.data.allData.companyDetail[0];
          this.companyDetailForm.logo = response.data.allData.logo;
        });
    },
    // 2.折线图数据显示-仓库库存趋势折线图
    showLineChart(row) {
      this.dialogLineChartVisible = true;
      // this.lineTitle = row.Company_Name + " / " + row.Product_Name + "销量趋势图";
      this.lineTitle = row.Product_Name + "销量趋势图";
      this.nowStar = row.newStars;
      this.lineChart(row);
      this.getYearData();
    },
    // 3.(供应方)所有流通任务雷达图
    showCirculationSubtaskRadar(row){
      this.findALLCirculationCount(row.Company_ID);
      this.finduserNameBycompanyID(row.Company_ID);
    },
    findALLCirculationCount(companyID){
       var that = this;
      var data = Qs.stringify({
        companyID: companyID,
      });
      that
        .axios({
          method: "post",
          url: "/api/findALLCirculationCount",
          data: data,
        })
        .then((response) => {
            this.form.circulationCount = response.data.allData;
            this.styleswith();
        });
    },
    //根据companyID查询userName
    finduserNameBycompanyID(companyID){
      var that = this;
      var data = Qs.stringify({
        companyID: companyID,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/finduserNameBycompanyID",
          data: data,
        })
        .then((response) => {
            this.UserName=response.data.allData;
            console.log("AA"+this.UserName)
            this.getTimeData();
        });
    },
     //获取条件选择时间数据
    getTimeData() {
      let that = this;
      that.axios.post("/api/findTimes").then(response => {
        // this.form2.time1 = response.data.allData[0];//本年第一天
        this.form2.time1="2019-01-01";
        this.form2.time2= response.data.allData[1];  //当天时间
        this.getRadarData1();
           
      });
    },
     //雷达图-制造
    getRadarData1(){
     var that = this;
      var data = Qs.stringify({
        userName:this.UserName,
        startTime:this.form2.time1,
        finishTime:this.form2.time2,
      });
      that
      
        .axios({
          method: "post",
          url:
            "/api/findCirculaterRemarkTimes1",
          data: data
        })
        .then(response => {

        this.radarData1.radarData1=response.data.allData.AllRemarkLength;
         this.radarData1.indicatorData1=response.data.allData.indicator;
         console.log("输出为"+this.radarData1.radarData1);
         that.$refs.refradarChart1.getradarCharts1();   
         this.styleswith();
        });
    },
    //提交次数 背景颜色变化
    styleswith() {
      if (this.form.circulationCount > -4 || this.form.circulationCount == -4) {
        document.getElementById("one").style.background = "#00D1B2";
        document.getElementById("word").innerHTML = "优";
        document.getElementById("word").style.color = "#00D1B2";
      }
      if (this.form.circulationCount < -4 && this.form.circulationCount > -8) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
        document.getElementById("word").innerHTML = "良";
        document.getElementById("word").style.color = "orange";
      }
      if (this.form.circulationCount < -8 || this.form.circulationCount == -8) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
        document.getElementById("word").innerHTML = "差";
        document.getElementById("word").style.color = "red";
      }
    },
    TwohandleDialogClose(){
      this.companyTableData =[];
      this.addCompanyVisible=false;
    },
    handleDialogClose() {
        document.getElementById("one").style.background = "";
        document.getElementById("two").style.background = "";
        document.getElementById("three").style.background = "";
        document.getElementById("word").innerHTML = "";
        document.getElementById("word").style.color = "";
        this.dialogLineChartVisible=false;
    },
    //按要求显示
    lineChart(row) {
      var that = this;
      var date = new Date();
      this.nowMonth = date.getMonth() + 1;
      var newMonth = this.nowMonth;
      console.log(this.nowMonth)
      this.productName1 = row.Product_Name;
      this.productCompanyId = row.Company_ID;
      console.log(row.productName)
      var data = Qs.stringify({
          // companyId: row.companyId,
          companyId: this.productCompanyId,
          year: this.lineYear,
          productName: this.productName1,
        });
        console.log(this.productCompanyId)
        console.log(data)
        console.log(this.productName1)
      that
      .axios({
            method: "post",
            url: "/api/dataStatistics/allMonthSaleAndInventoryCountPrediction",
            data: data,
          })
        .then((response) => {
          this.lineData.saleCount = response.data.allData.saleCount;
          this.lineData.inventoryCount = response.data.allData.inventoryCount;
          this.lineData.months = response.data.allData.monthCount;
          this.lineData.salePredictionCount = response.data.allData.salePredictionCount;
          this.lineData.inventoryPredictionCount = response.data.allData.inventoryPredictionCount;
          this.nowInventoryNum = response.data.allData.nowMonthInventoryCount;
          this.nowSaleNum = response.data.allData.nowMonthSaleCount;
          that.$refs.drawLineChart.getCharts();
          console.log(allData);
        });
    },
    //时间变换查询折线图
    lineChartChange() {
      var that = this;
      var data = Qs.stringify({
          companyId: this.productCompanyId,
          year: this.lineYear,
          productName: this.productName1,
        });
        console.log(this.productCompanyId)
        console.log(data)
        console.log(this.productName1)
      that
      .axios({
            method: "post",
            url: "/api/dataStatistics/allMonthSaleAndInventoryCountPrediction",
            data: data,
          })
        .then((response) => {
          this.lineData.saleCount = response.data.allData.saleCount;
          this.lineData.inventoryCount = response.data.allData.inventoryCount;
          this.lineData.months = response.data.allData.monthCount;
          this.lineData.salePredictionCount = response.data.allData.salePredictionCount;
          this.lineData.inventoryPredictionCount = response.data.allData.inventoryPredictionCount;
          that.$refs.drawLineChart.getCharts();
          console.log(allData);
        });
    },
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
    //查询零件类别
    supplierInquire(allCategoryList) {
      this.partsPopup = true;
    },
    //根据零件类别查询企业
    findCompanyByPartsCategory() {
      if (this.addList.patrsList == "" || this.addList.patrsList == null) {
        this.$message({
          type: "warning",
          message: "请选择零件类别",
        });
      } else {
        var that = this;
        var data = Qs.stringify({
          userName: this.usernameX,
          partsCategory: this.$refs["partsCascader"].getCheckedNodes()[0].label,
        });
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/findCompanyByPartsCategory",
            data: data,
          })
          .then((response) => {
            this.companyTableData = response.data.allData; //接收返回的企业列表
          });
        //企业列表弹出框弹出
        this.addCompanyVisible = true;
      }
    },
    // 企业列表(待加入供应商列表)分页改变
    companyDialogHandleCurrentChange(cpage) {
      this.pageIndex1 = cpage;
    },
    // 企业列表(待加入供应商列表)全部排序[不止排当前页]
    sortChange(column) {
      this.pageIndex1 = 1; // 排序后返回第一页
      if (column.order === "descending") {
        this.companyTableData.sort((a, b) => b[column.prop] - a[column.prop]);
      } else if (column.order === "ascending") {
        this.companyTableData.sort((a, b) => a[column.prop] - b[column.prop]);
      }
    },
    //判断供应商集合中是否存在某值
    supplierIsExist(selectSupplierId) {
      var supplierExist = false;
      this.supplierCompany.forEach(function (element) {
        for (let [key, value] of Object.entries(element)) {
          if (key == "companyId" && value == selectSupplierId)
            supplierExist = true;
        }
      });
      return supplierExist;
    },
    //判断选中的供应商ID数组中是否存在某值
    selectedSupplierIsExist(selectSupplierId) {
      var selectedSupplierExist = false;
      this.addList.SupplierListInt.forEach(function (element) {
        if (element == selectSupplierId) selectedSupplierExist = true;
      });
      return selectedSupplierExist;
    },
    //选择供应商至选中框
    addSelectdSupplier(row) {
      // 判断是否选中自己 -- 修改数据库返回数据为不含有自己
      // if(this.usernameX == row.User_Name){
      //   this.$message({
      //     type: "warning",
      //     message: "不能添加自己作为供应商"
      //   });
      // }else{
      //如果选中的在供应商列表
      if (this.supplierIsExist(row.Company_ID)) {
        //如果在选中列表，提示已添加
        if (this.selectedSupplierIsExist(row.Company_ID)) {
          this.$message({
            type: "info",
            message: "已选择供应商",
          });
        } else {
          //如果不在选中列表，加入选中列表，并提示添加成功
          this.addList.SupplierListInt.push(row.Company_ID);
          this.$message({
            type: "success",
            message: "选择供应商成功",
          });
        }
      } else {
        //如果不在供应商列表,保存原来选中的供应商，添加供应商至数据库，重新加载供应商下拉框，选中原+现
        var arrCopy = this.addList.SupplierListInt.concat(); //原来选中的
        arrCopy.push(row.Company_ID); //原来选中的+当前选中的
        this.addSupplier(row.Company_ID);
        this.getAllSupplierList(); //刷新
        this.addList.SupplierListInt = arrCopy.concat(); //回传
        this.$message({
          type: "success",
          message: "添加并选择供应商成功",
        });
      }
      // }
    },
    //将供应商添加到数据库
    addSupplier(companyId) {
      var that = this;
      var data = Qs.stringify({
        username: this.usernameX,
        companyId: companyId,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/tianjiaSupplier",
          data: data,
        })
        .then((response) => {});
    },
    goPatent() {
      this.isPatent = true;
    },
    //查询零件类别信息
    getAllPartsList() {
      var that = this;
      var data = Qs.stringify({});
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/selectPartsCategory",
        })
        .then((response) => {
          this.CategoryListoptions = response.data.allData;
          // console.log(response);
          this.partsOptions = response.data.allData;
        });
    },
    //查询行业类别列表
    getAllIndustryList() {
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
          this.industryOptions = this.getTreeData(response.data.allData);
        });
    },
    //查询供应商列表
    getAllSupplierList() {
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
    // handleChange1() {
    //   this.mainStaskTypeID = this.selectCateKeys1[0];
    //   this.subStaskTypeID = this.selectCateKeys1[1];
    // },
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
    leibieChanged(leibie) {
      if (leibie == 1) {
        this.sfkjian = "inline";
        this.islingjianchaxun = true;
        this.isgongyingshang = false;
      } else {
        this.sfkjian = "none";
        this.islingjianchaxun = false;
        this.isgongyingshang = true;
      }
      // console.log(this.addList.taskType);
    },
    invitate(coo) {
      if (coo == 0) {
        this.visiblehexin = "inline";
        this.shenqing = "none";
        this.sfsmkj = true;
        this.shifoubr = false;
      } else {
        this.shenqing = "inline";
        this.visiblehexin = "none";
        this.sfsmkj = false;
        this.shifoubr = true;
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
    inviteEmail() {
      this.isEmail = true;
    },
    // =====================保存新增子任务=====================
    saveAdd11() {
      // this.bianjiTC = true;
      this.$refs["addList"].validate((valid) => {
        if (valid) {
          if (this.addList.shifousimi != "1") {
            this.addList.shifousimi = "0";
          }
          //记录提交前的任务类别
          var bianjifahuo = this.addList.taskType;
          var that = this;
          var data = Qs.stringify({
            userName: this.usernameX,
            taskName: this.addList.taskName,
            publishTime: this.addList.beginTime,
            endLine: this.addList.deadline,
            mainStaskTypeID: this.addList.selectCateKeys[0],
            subStaskTypeID: this.addList.selectCateKeys[1],
            yaoqing: this.addList.shifouyaoqing,
            sssm: this.addList.shifousimi,
            taskType: this.addList.taskType,
            mainTaskName: this.name,
            taskXiangxi: this.addList.TaskXiangXi,
            mainTaskID: this.mainTaskID,
            Technonlgy_File: this.technicalFileWanzheng,
            Telphone: this.addList.Telphone,
            taskID: "100086",
            circulationAddress:
              this.addList.circulationAddress == ""
                ? "暂无地址"
                : this.addList.circulationAddress,
            // allCategoryList:this.addList.patrsList==undefined ? "暂无零件类别" : this.addList.patrsList[1], //零件类别
            allCategoryList:
              this.addList.patrsList.length == 0
                ? "暂无零件类别"
                : this.$refs["partsCascader"].getCheckedNodes()[0].label,
            SupperListINt: this.addList.SupplierListInt,
          });
          console.log(data.allCategoryList);
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
        } else {
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，请填写后再提交",
          });
        }
      });
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
            partsCategory:this.$refs["consigpartsCascader"].getCheckedNodes()[0].label,
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
      this.loading = true;
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
              this.loading = false;
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
            for (let i = 0; i < this.addList.SupplierListInt.length; i++) {
              if (companyId == this.addList.SupplierListInt[i]) token = true;
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
              this.addList.SupplierListInt.push(companyId);
            }
          } else if (response.data.allData.token == 0) {
            //如果不是企业名录里面的企业
            this.supplierCompany.push({
              companyName: companyName,
              companyId: companyId,
            });
            this.addList.SupplierListInt.push(companyId);
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
    inviteEmail() {
      this.$confirm("此操作将对此公司发送邀请邮件，请确认操作", "", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认发送",
        cancelButtonText: "放弃发送",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发送成功",
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "未发起邀请" : "未发起邀请",
          });
        });
    },


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
};
</script>

<style lang="scss">
 //完成质量
.addSubTask .LDT{
  margin-left: 5px;
}
// .addSubTask .renwupingjia{
//   margin-left: 60px;
// }
.addSubTask .wanchengzhiliang{
  margin-left: 10px;
}
.addSubTask .input_span span {
    display: inline-block;
    width: 50px;
    height: 20px;
    background: #eee;
    line-height: 20px;
  }

.addSubTask .WCZL {
    font-size: 11px;
  }
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
.simichakan {
  // float: right;
  // margin-top: -18px;
  // margin-right: 110px;
  float: left;
  margin-top: -18px;
  margin-left: 120px;
  color: #f56c6c;
  font-size: 12px;
  text-align: left;
}
.addSubTask .companyDialogTable {
  width: 98%;
}
.addSubTask .companyDialogPagination {
  // float: right;
  text-align: right;
  margin-right: 2%;
  // display: inline;
}
.lineChart1{
    .el-dialog__header {
    padding: 20px 20px 0px;
  }
  .el-dialog {
    width: 1300px;
  }
}
.company-detail-form{
  .company-detail-form-item{
    margin-bottom: 0px;
    .company-detail-imgdiv{
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      .company-detail-img{
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-filter: drop-shadow(5px 5px 5px rgba(0,0,0,.1));
        filter: drop-shadow(5px 5px 5px rgba(0,0,0,.1));
        border-radius:5px;
      }
    }
  }
  .company-detail-divider{
    margin: 13px 0;
  }
}
.type2-situation {
  // margin-left: 35%;
  text-align: center;
  // font-size: 1.8rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.type22-situation {
  // margin-left: 36%;
  text-align: center;
  font-size: 14;
  // font-weight: bold;
}
.type23-situation {
  // margin-left: 40%;
  text-align: center;
  font-size: 14;
  // font-weight: bold;
}
</style>