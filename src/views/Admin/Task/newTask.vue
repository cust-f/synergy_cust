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
          <el-form ref="addList" label-width="110px"  :model="addList" :rules="addListRules" hide-required-asterisk>
            <el-row>
              <el-col :span="11">
                <el-form-item label="任务名称"  prop="name"   >
                  <el-input v-model="addList.name" placeholder="资源库查询" :readonly="taskSaveBtn"></el-input>
                </el-form-item>
              </el-col>
              <el-tooltip class="item" effect="dark" content="推荐查询" placement="right">
                <el-button icon="el-icon-search" autofocus="false" 
                  style="position: relative;
                  border: 0px;
                  font-size: 14px;
                  padding: 0px 0px;
                  margin-left: -444px;
                  margin-top: 60px;
                  margin-top: 13px;" 
                  @click="jumpToAnother">
                </el-button>
              </el-tooltip>
              <!-- <el-col :span="11">
              <el-form-item label="需求项目类别">
                <el-input v-model="type"></el-input>
              </el-form-item>
              </el-col>-->
               <el-col :span="11">
              <el-form-item label="任务类别" prop="taskType">
                <el-select v-model="addList.taskType" placeholder="请选择任务类别" class="selectsupply" style="width: 100%" @change="leibieChanged" :disabled="taskSaveBtn">
                  <el-option v-for="leibie in Task" :key="leibie.id" :label="leibie.label" :value="leibie.id"></el-option>
                </el-select>
      
              </el-form-item>
              </el-col>
              
            </el-row>

            <el-row>
              <!-- 联络电话目前打算只在流通中显示 -->
                <el-col :span="11" v-if="islingjianchaxun">
              <el-form-item label="联络电话" prop="Telphone" :rules="addList.taskType ==='1'?addListRules.Telphone:{required: false}">
                <el-input v-model="addList.Telphone" :readonly="taskSaveBtn"></el-input>
              </el-form-item>
            </el-col>

              <el-col :span="11" v-if="!islingjianchaxun">
                <el-form-item label="总负责人" prop="leader"  :rules="addList.taskType != '1'?addListRules.leader:{required: false}" >
                  <el-select
                    :disabled="taskSaveBtn"
                    v-model="addList.leader"
                    placeholder="请选择总负责人"
                    class="selectsupply"
                    style="width:100%;"
                    :readonly="taskSaveBtn"
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
                <el-form-item label="发布时间" prop="publishdate">
                  <el-date-picker
                  :disabled="taskSaveBtn"
                    type="date"
                    placeholder="选择日期"
                    v-model="addList.publishdate"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="行业类别" prop="selectCateKeys">
                  <el-cascader
                  :disabled="taskSaveBtn"
                    style="width:100%;"
                    expand-trigger="hover"
                    v-model="addList.selectCateKeys"
                    :options="xuanzelist"
                    :props="cateProps"
                    @change="handleChange"
                    props.checkStrictly="true"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间" prop="deaddate">
                  <el-date-picker
                  :disabled="taskSaveBtn"
                    type="date"
                    placeholder="选择日期"
                    v-model="addList.deaddate"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              
            </el-row>
            <el-row v-if="islingjianchaxun">
            <el-col :span="11">
              <el-form-item label="是否邀请" prop="shifouyaoqing" :rules="addList.taskType === '1'?addListRules.shifouyaoqing:{required: false}">
                <el-select v-model="addList.shifouyaoqing" placeholder="请选择是或者否" class="selectsupply" @change="invitate" style="width: 100%" :disabled="taskSaveBtn">
                  <el-option width="180" v-for="coo in shifou" :key="coo.id" :label="coo.label" :value="coo.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" v-if="sfsmkj">
              <el-form-item label="零件类别" :style="{ display: sfkjian }" prop="patrsList" :rules="(addList.shifouyaoqing == '0' && addList.taskType == '1')?addListRules.patrsList:{required: false}">
                <el-cascader style="width: 100%" expand-trigger="hover" v-model="addList.patrsList" :options="partsOptions" :props="partsProps" ref="partsCascader" placeholder="请选择零件类别" :disabled="taskSaveBtn"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="等待申请" :style="{ display: shenqing }" class="dengdaishenqing">
                <el-input placeholder="等待供应方申请" v-model="input" :disabled="true" :style="{ display: shenqing }"></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row v-if="islingjianchaxun">
            <el-col :span="11" v-if="sfsmkj">
              <el-form-item label="是否发布" prop="shifousimi" :rules="addList.shifouyaoqing === '0'?addListRules.shifousimi:{required: false}">
                <el-select v-model="addList.shifousimi" placeholder="请选择是或者否" class="selectsupply" @change="simizhiding" style="width: 100%" :disabled="taskSaveBtn">
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
                <el-select v-model="addList.SupplierListInt" multiple placeholder="请选择供应商" class="selectsupply" style="width: 100%" @change="selectSupplyChanged" :disabled="taskSaveBtn">
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
                      margin-right: -15px;
                      margin-top:60px;
                      margin-top: 13px;
                    " @click="findCompanyByPartsCategory"></el-button>
            </el-tooltip>

          </el-row>
          <el-row v-if="islingjianchaxun">
            <el-col :span="22">
              <el-form-item label="收货地址" :style="{ display: sfkjian }" prop="circulationAddress" :rules="addList.taskType === '1'?addListRules.circulationAddress:{required: false}">
                <el-input v-model="addList.circulationAddress" type="textarea" :rows="2"   :readonly="taskSaveBtn"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
             <br v-if="addList.taskType == '1'" />
            <el-row>
              <el-col :span="22" class="xiangxi">
                <el-form-item label="任务详情" prop="xiangxi">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width:100%;"
                    placeholder="请输入内容"
                    v-model="addList.xiangxi"
                    class="gongsiDetail"
                      :readonly="taskSaveBtn"
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
                <el-button size="small" type="primary" :disabled="taskSaveBtn">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div id="div2" align="right">
             <el-button type="primary" @click="bianjitanchu" :style="{ display: fahuo }" :disabled="Circulationlist">新增流通清单</el-button>
            <el-button type="primary" class="button1" @click="submit" :disabled="taskSaveBtn">提交</el-button>
          </div>
        </div>
        <el-divider></el-divider>
                  <!-- 这里是流通清单详情 -->
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
            <el-table-column label="产品数量" width="100" prop="productNumber"></el-table-column>
            <el-table-column label="产品类别" width="160" prop="partsCategory"></el-table-column>
            <el-table-column prop="consignmentTimeLatest" label="截止时间" sortable>
              <template slot-scope="scope">
                {{ scope.row.consignmentTimeLatest | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="联系电话" width="160" prop="contactNumber"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="consignmentDetail(scope.row)" type="text" size="small ">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
        <!-- 这里放两张图片 -->
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
    <div class="lineChart1">
      <el-dialog  :visible.sync="dialogLineChartVisible" center :before-close="handleDialogClose">
 
       
        <el-row>
          <el-col :span="8">
            <el-row>
                <!-- 企业信息模块 -->
              <el-col>

              <el-card>
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div><br>
          <el-form ref="companyDetailForm" :model="companyDetailForm" label-width="80px" class="company-detail-form">
            <el-row :gutter="20">

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

        </el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16">        

        <el-card>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">销售/库存趋势图</div>
        <div class="type2-situation">{{this.lineTitle}}</div>
        <br/>
        <div class="type22-situation">
          <span class="title-inventory">{{"当前库存量："+this.nowInventoryNum}}</span>
          &nbsp;
          <span class="title-sale">{{"当前销售量："+this.nowSaleNum}}</span>
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
          <div  >
        <line-chart :lineData="lineData" ref="drawLineChart"></line-chart>
      </div>
        </el-card>
          </el-col>
        </el-row>
          

      </el-dialog>
    </div>

  <div class="consignment">
        <el-dialog title :visible.sync="bianjiTC" width="50%">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
            流通清单
          </div>
          <br />
          <el-form ref="consignmentForm" label-width="110px" :rules="consignmentRules" :model="consignmentForm" hide-required-asterisk>
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
                  <el-date-picker type="date" placeholder="选择日期" v-model="consignmentForm.consignmentTimeLatest" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions"></el-date-picker>
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
                <el-cascader style="width: 100%" expand-trigger="hover" v-model="consignmentForm.consignmentpatrsList" :options="partsOptions" :props="partsProps" ref="consigpartsCascader" placeholder="请选择零件类别"  :disabled="Componentsable"></el-cascader>
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
                  <el-date-picker type="" v-model="consignmentTimeLatest1" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss" readonly="readonly"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系方式">
                  <el-input v-model="contactNumber1" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品类别">
                  <el-input v-model="partsCategory" readonly="readonly"></el-input>
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


      </el-main>
    </el-container>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
import radarChart1 from "../../Admin/Enterprise_Evaluation/components/radarCharthh2"
import lineChart from "../../Admin/maintask/components/lineCharthh"; //折线图
export default {
  LTQD: 0,
  name: "newTask",
  components: {
    "radar-chart1":radarChart1,
    "line-chart": lineChart, //折线图
  },
  data() {
    return {
      Circulationlist:false,
      Componentsable:false,
      cirtaskID:"",
      fahuo: "none",
      taskSaveBtn: false,
      consignmentTable: [],
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
      bianjiTC:false,
      fhqdxiangqingTC: false,
      consignmentTimeLatest1: "",
      productName1: "",
      productModel1: "",
      productNum1: "",
      productPrice1: "",
      productNotes1: "",
      contactNumber1: "",
      partsCategory: "",
      addList: {
        name: "", //任务名称
        Telphone: "", //联络电话
        taskType: "", //任务类别
        publishdate: "", //发布时间
        deaddate: "", //截止时间
        circulationAddress: "", //收货地址
        selectCateKeys: [], //行业类别
        xiangxi: "", //任务详情
        shifouyaoqing: "", //是否邀请
        shifousimi: "", //是否发布
        SupplierListInt: [], //供应商
        patrsList: [], //零件类别
        leader:"",//总负责人
      },
      options: [],  
     form2:{
         time1:"",
         time2:"",
      } ,
      UserName:"",
          radarData1:{
        radarData1:[],
        indicatorData1:[],
      },
      type: this.$route.query.type,
      //是否申请
      shifou: [
        {
          id: "0",
          label: "是",
        },
        { id: "1", label: "否" },
      ],
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
      //任务类别绑定的model
      taskType:"",
      //禁用今天以前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      shangchuancishu: 0,
      usernameX: sessionStorage.getItem("ms_username"),
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
      //这是新增模态框
      dividename: "",
      fabuTime: "",
      endLine: "",
      TaskState: "",
      TaskState1: "",
      TaskXiangXi: "",
      islingjianchaxun:false,
      isgongyingshang:false,
      visiblehexin: "none",
      shenqing: "none",
      sfsmkj: false, //是否私密指派
      //专门用来判断等待申请的br是否出来
      shifoubr: false,
      chooseSupplySelected: false, //是否选择供应商 true未选 false选择
      chooseSupply: "none", //是否提示选择供应商
      //零件类别 选项列表
      partsOptions: [],
      //零件类别 级联选择框的配置对象
      partsProps: {
        value: "categoryID",
        label: "partsCategory",
        children: "children",
      },
      addCompanyVisible:false,
            //根据零件查询出的企业列表数组
      companyTableData: [],
            //根据零件查询出的企业列表数组的分页参数
      pageIndex1: 1, //页码
      pageSize1: 10, //每页数据
      dialogLineChartVisible: false, //显示折线图
           //弹框-(供应商)企业信息
      companyDetailForm:[],
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
            form: {
        circulationCount: 0, //流通完成质量
      },
      MainTaskID:"",
      //新增子任务 数据验证
      addListRules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        Telphone: [
          { required: true, message: "请输入联络电话", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$/,
            message: "请输入正确格式的联络电话",
            trigger: "blur",
          },
        ],
        leader: [
          { required: true, message: "请选择负责人", trigger: "blur"},
        ],
        taskType: [
          { required: true, message: "请选择任务类别", trigger: "change" },
        ],
        publishdate: [
          { required: true, message: "请选择发布时间", trigger: "change" },
        ],
        deaddate: [
          { required: true, message: "请选择截止时间", trigger: "change" },
        ],
        circulationAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
        ],
        selectCateKeys: [
          { required: true, message: "请选择行业类别", trigger: "change" },
        ],
        xiangxi: [
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
        // productNotes: [
        //   { required: true, message: "请输入备注或填写无", trigger: "blur" },
        // ],
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
    this.getDate();
    this.getAllPartsList();
    this.getAllSupplierList();
    this.getYearData();
  },
  methods: {
    //======刷新流通清单表格========
    consignmentTableShuaxin() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.cirtaskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findConsignmentByTaskId",
          data: data,
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
          this.productName1 = response.data.allData[0].productName;
          this.productModel1 = response.data.allData[0].productModel;
          this.productNum1 = response.data.allData[0].productNumber;
          this.productPrice1 = response.data.allData[0].productPrice;
          this.consignmentTimeLatest1 =
            response.data.allData[0].consignmentTimeLatest;
          this.contactNumber1 = response.data.allData[0].contactNumber;
          this.partsCategory=response.data.allData[0].partsCategory;
          this.productNotes1 = response.data.allData[0].consignmentNotes;
        })
        .catch((error) => {
          console.log(error);
        });
    },

        //======保存新增流通清单========
    deliverySave() {
      this.$refs.consignmentForm.validate((valid) => {
        if (valid) {
          console.log(this.MainTaskID)
          var that = this;
          //1.保存数据到本地  2.调用方法存入数据库 3.弹出成功提示消息 4.清空关闭 5.刷新table
          //====流通清单数据====
          var data = Qs.stringify({
            taskId: this.MainTaskID,
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
                this.consignmentTableShuaxin();
                this.LTQD = 1;
                this.Circulationlist=true;
                setTimeout(() => {
                this.$router.push({
                  path: "/admin/substaskDetailLT",
                    query: {
                mainTaskID: this.MainTaskID
                    }
              });}, 300);
              }
            })
            .catch((error) => {
              console.log(error);
            }
            );
        } else {
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，填写后再提交",
          });
        }
      });
      
    },
    //======新增流通清单弹出
    bianjitanchu() {
      this.bianjiTC = true;

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
        //获取条件选择时间数据
    getYearData() {
      let that = this;
      that.axios.post("/api/findYearsList").then(response => {
        this.lineYear = response.data.allData.nowYear;
        this.options= response.data.allData.years;  
        this.lineChartChange();
            
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
     //流通任务的任务评价样式
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
        TwohandleDialogClose(){
      this.addCompanyVisible=false;
      this.companyTableData =[];
    },
        handleDialogClose() {
        document.getElementById("one").style.background = "";
        document.getElementById("two").style.background = "";
        document.getElementById("three").style.background = "";
        document.getElementById("word").innerHTML = "";
        document.getElementById("word").style.color = "";
        this.dialogLineChartVisible=false;
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
            console.log(this.companyTableData)
          });
        //企业列表弹出框弹出
        this.addCompanyVisible = true;
      }
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
          // console.log(response);
          this.partsOptions = response.data.allData;
        });
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
      this.mainStaskTypeID = this.addList.selectCateKeys[0];
      this.subStaskTypeID = this.addList.selectCateKeys[1];
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
    submit(){
        this.$refs["addList"].validate((valid) => {
        if (valid) {
          if(this.addList.taskType==="1"){
               if (this.addList.shifousimi != "1") {
                    this.addList.shifousimi = "0";
               }
               this.cirSubmission();
          }else if(this.addList.taskType ==='0'){
            this.tijiao();
          }
        }else {
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，请填写后再提交",
          });
        }
      });
    },
    cirSubmission(){
       if (this.technicalFile == "null") {
        this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
          type: "warning",
        });
      } else {
        var that = this;
        var data = Qs.stringify({
          userName: this.usernameX,
          technicalFile: this.technicalFileWanzheng,
          name: this.addList.name,
          mainStaskTypeID: this.mainStaskTypeID,
          subStaskTypeID: this.subStaskTypeID,
          publishdate: this.addList.publishdate,
          deaddate: this.addList.deaddate,
          xiangxi: this.addList.xiangxi,
          //华丽丽的隔离线
          yaoqing: this.addList.shifouyaoqing,
          sssm: this.addList.shifousimi,
          taskType: this.addList.taskType,
          Telphone: this.addList.Telphone,
          taskID: "100086",    //这块代表啥呀
           circulationAddress:
              this.addList.circulationAddress == ""
                ? "暂无地址"
                : this.addList.circulationAddress,
            allCategoryList:
              this.addList.patrsList.length == 0
                ? "暂无零件类别"
                : this.$refs["partsCascader"].getCheckedNodes()[0].label,
            SupperListINt: this.addList.SupplierListInt,
        });
        console.log(data);
        that
          .axios({
            method: "post",
            url: "/api/MainTaskInformation/addcirSubmission",
            data: data,
          })
          .then((response) => {
            this.cirtaskID = response.data.allData;
            console.log(this.cirtaskID);
            this.zzzz = response.data.allData;
            if (this.zzzz != "null") {
              this.$message.success("提交成功");
              this.taskSaveBtn = true;
              this.fahuo = "inline";
              this.FindmaintaskID(this.cirtaskID);
              console.log(this.addList.patrsList.length)
               if(this.addList.patrsList.length == 0){
              this.Componentsable=false;
             }else{
              this.consignmentForm.consignmentpatrsList=this.addList.patrsList;
              this.Componentsable=true;
              }
              // this.Circulationlist=true;
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
    //用taskId查到maintaskID
    FindmaintaskID(cirtaskID){
         var that = this;
      var data = Qs.stringify({
        taskId: cirtaskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findmaintaskID",
          data: data,
        })
        .then((response) => {
            this.MainTaskID=response.data.allData;
            console.log(this.MainTaskID);
        });
    },
  tijiao() {
      if (this.technicalFile == "null") {
        this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
          type: "warning",
        });
      } else {
        var that = this;
        var data = Qs.stringify({
          userName: this.usernameX,
          technicalFile: this.technicalFileWanzheng,
          name: this.addList.name,
          mainStaskTypeID: this.mainStaskTypeID,
          subStaskTypeID: this.subStaskTypeID,
          publishdate: this.addList.publishdate,
          deaddate: this.addList.deaddate,
          principalName: this.addList.leader,
          xiangxi: this.addList.xiangxi
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
    // 跳转到课题一页面
    jumpToAnother(){
      // 判断输入框内容是否为空
      if(this.addList.name.replaceAll(" ","") == ""){
        this.$message.warning("请输入需求名称");
      }else{
        window.open("http://www.hccstc.cn/home/searchAll?search_param="+this.addList.name.replaceAll(" ","")+"&type=undefined");
      }
    }
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
    padding-right: 0px;
  }
  .el-upload--text {
    width: 85px;
    height: 40px;
  }

  .button1 {
    width: 100px;
    height: 40px;
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
.biaoti {
  font-size: 18px;
  color: #303133;
  padding: 0 10px;
  border-left: 3px solid #4e58c5;
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
#one {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 0px;
  margin-right: 3px;
}

#two {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
.input_span span {
    display: inline-block;
    width: 50px;
    height: 20px;
    background: #eee;
    line-height: 20px;
  }
}
</style>
<style>
      .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__body {
        padding: 30px 20px 0px 20px;
  }
</style>