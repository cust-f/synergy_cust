<template>
  <div class="substaskDetailLT">
    <div>
      <el-container>
        <el-main style="overflow: hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="mainTaskInfo" :model="mainTaskInfo" label-width="110px" class="formYS">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称">
                  <template slot-scope="scope">
                    <el-button class="anniu" @click="showMainTaskDetail(scope.row)">
                      {{ mainTaskInfo.mainTaskName }}
                    </el-button>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品名称">
                  <el-input v-if="mainTaskInfo.consignmentInfo == undefined " value="暂无产品" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.consignmentInfo.productName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="项目负责人">
                  <el-input v-model="mainTaskInfo.principalName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="需求类别">
                  <el-input v-if="mainTaskInfo.mainTaskType == 0" value="设计需求" :disabled="true"></el-input>
                  <el-input v-else value="流通需求" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-input v-bind:value="mainTaskInfo.publishTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-input v-bind:value="mainTaskInfo.deadline | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求状态">
                  <el-input v-if="mainTaskInfo.taskState == 0" value="进行中" :disabled="true"></el-input>
                  <el-input v-else value="已完成" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="完成日期">
                  <el-input v-if="mainTaskInfo.finishTime == null" value="暂未完成" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.finishTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="一级行业类别">
                  <el-input v-model="mainTaskInfo.taskCategoryMain" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="二级行业类别">
                  <el-input v-model="mainTaskInfo.taskCategoryPart" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品报价">
                  <el-input v-if="mainTaskInfo.consignmentInfo == undefined " value="暂无报价" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.consignmentInfo.productPrice" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="数量总计">
                  <el-input v-if="mainTaskInfo.consignmentInfo == undefined " value="暂无数量" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.consignmentInfo.productNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="附件下载">
                  <div>
                    <el-table :data="technicalFile" class="customer-table" :show-header="false">
                      <el-table-column label="序号" type="index" width="20" align="center"></el-table-column>
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-link style="color: #409eff" @click.native="downloadFile(scope.row)">{{ scope.row.realName }}</el-link>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <br /> -->
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="completeMainTask()">完成任务</el-button>

            <!-- transition="el-zoom-in-bottom" trigger="click" -->
            <el-popover placement="top" width="200" v-model="popoverVisible">
              <p style="margin:0px 0px 10px 0px;"><i class="el-icon-edit" style="color:#409EFF;"></i>请选择需要修改的内容：</p>
              <div style="text-align: right; margin: 0">
                <el-button type="text" size="mini" @click="showMainTaskChange()">需求信息</el-button>
                <el-button type="text" size="mini" @click="showConsignmentChange()" :disabled="consignmentEditButtonDisabled">流通清单</el-button>
              </div>
              <el-button type="primary" class="button1" slot="reference">修改</el-button>
            </el-popover>
            <el-button type="primary" class="button1" @click="downloadFiles()">打包下载</el-button>
          </div>
          <el-divider></el-divider>

          <!-- <div v-show="applyListVisible"> -->
          <div>
            <el-row>
              <el-col :span="24">
                <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
                  申请列表
                </div>
              </el-col>
            </el-row>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <el-table :data="applyTableData" border ref="multipleTable" header-cell-class-name="table-header">
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="Company_Name" align="center" label="供应商">
                <template slot-scope="scope">
                  <el-button type="text" @click="showCompanyDetail(scope.row)">{{ scope.row.Company_Name }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="Product_Name" label="产品名称" align="center" width="92">
                <template slot-scope="scope">
                  <span v-if="scope.row.Product_Name != undefined">{{scope.row.Product_Name}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Parts_Category" label="类别" align="center" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.Parts_Category != undefined">{{scope.row.Parts_Category}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Sale" label="销量" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Sale != undefined">{{scope.row.Sale}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Reserve" label="库存" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Reserve != undefined">{{scope.row.Reserve}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Price" label="价格" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Price != undefined">{{scope.row.Price}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Apply_Way" label="申请/邀请" align="center" width="53">
                <template slot-scope="scope">
                  <span v-if="scope.row.Apply_Way == 0">邀请</span>
                  <span v-else-if="scope.row.Apply_Way == 1">申请</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column prop="Check_Apply_State" label="申请/邀请状态" align="center" width="82">
                <template slot-scope="scope">
                  <el-tag v-if="+scope.row.Check_Apply_State === 0">待审核</el-tag>
                  <el-tag v-else-if="+scope.row.Check_Apply_State === 1" type="success">通过</el-tag>
                  <el-tag v-else type="danger">拒绝</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" width="97">
                <template slot-scope="scope" v-if="scope.row.Apply_Way == 1 && scope.row.Check_Apply_State == 0">
                  <el-button @click="checkApply(scope.row,1)" type="text" size="small">通过</el-button>
                  <el-button @click="checkApply(scope.row,2)" type="text" size="small">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br />
            <br />
          </div>

          <div v-show="quotaListVisible">
            <el-row>
              <el-col :span="13">
                <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
                  配额分配
                </div>
              </el-col>
              <el-col :span="11">
                <div id="div2" align="right">
                  <el-button v-show="quotaButtonVisible == true" type="primary" size="medium" style="margin-top: -20px"  @click="setQuota()">智能分配</el-button>
                  <el-button v-show="quotaEditButtonVisible == true" type="primary" size="medium" style="margin-top: -20px" @click="showQuotaChange()" >修改配额</el-button>
                </div>
              </el-col>
            </el-row>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <!-- <br /> -->
            <el-table :data="quotaTableData" border class="quotaTable" ref="multipleTable" header-cell-class-name="table-header">
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="Company_Name" align="center" label="供应商">
                <!-- <template slot-scope="scope">
                  <el-button type="text" @click="showCompanyDetail(scope.row)">
                    {{ scope.row.Company_Name }}
                  </el-button>
                </template> -->
              </el-table-column>
              <el-table-column prop="Task_State" align="center" label="需求状态" width="80">
                <template slot-scope="scope">
                  <el-tag v-if="+scope.row.Task_State === 5" type="success">已完成</el-tag>
                  <el-tag v-else>进行中</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="Product_Name" label="产品名称" align="center" width="92">
                <template slot-scope="scope">
                  <span v-if="scope.row.Product_Name != undefined">{{scope.row.Product_Name}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Parts_Category" label="类别" align="center" width="92">
                <template slot-scope="scope">
                  <span v-if="scope.row.Parts_Category != undefined">{{scope.row.Parts_Category}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Sale" label="销量" align="center" width="53">
                <template slot-scope="scope">
                  <span v-if="scope.row.Sale != undefined">{{scope.row.Sale}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Reserve" label="库存" align="center" width="53">
                <template slot-scope="scope">
                  <span v-if="scope.row.Reserve != undefined">{{scope.row.Reserve}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Price" label="价格" align="center" width="53">
                <template slot-scope="scope">
                  <span v-if="scope.row.Price != undefined">{{scope.row.Price}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Apply_Way" label="申请/邀请" align="center" width="53">
                <template slot-scope="scope">
                  <span v-if="+scope.row.Apply_Way === 0">邀请</span>
                  <span v-else-if="+scope.row.Apply_Way === 1">申请</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column prop="Quota_Number" label="配额" align="center" width="53" >
                <template slot-scope="scope">
                  <span v-if="scope.row.Quota_Number != undefined">{{scope.row.Quota_Number}}</span>
                  <span v-else>0</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="72">
                <template slot-scope="scope">
                  <el-button @click="substaskDetailLT(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br />
            <br />
          </div>

          <!-- 修改主需求 弹出框 -->
          <el-dialog title :visible.sync="mainTaskEditVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">修改需求信息</div>
            <br />
            <el-form ref="mainTaskEditInfo" :model="mainTaskEditInfo" :rules="mainTaskEditRules" label-width="110px" class="box">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="需求名称" prop="mainTaskName">
                    <el-input v-model="mainTaskEditInfo.mainTaskName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="发布时间" prop="publishTime">
                    <el-date-picker v-model="mainTaskEditInfo.publishTime" type="datetime" placeholder="选择发布时间" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="11">
                  <el-form-item label="项目负责人" prop="principalName">
                    <el-select v-model="mainTaskEditInfo.principalName" placeholder="请选择总负责人" class="selectsupply" style="width:100%;">
                      <el-option width="180" v-for="coo1 in demanderPrincipal" :key="coo1" :label="coo1" :value="coo1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="截止时间" prop="deadline">
                    <el-date-picker v-model="mainTaskEditInfo.deadline" type="datetime" placeholder="选择截止时间" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="行业类别" prop="selectCateKeys">
                    <el-cascader style="width: 100%" expand-trigger="hover" v-model="mainTaskEditInfo.selectCateKeys" :options="industryOptions" :props="industryProps" placeholder="请选择行业类别">
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="完成时间" prop="finishTime">
                    <el-date-picker v-model="mainTaskEditInfo.finishTime" type="datetime" placeholder="选择完成时间" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" v-if="+mainTaskEditInfo.taskState === 1">
                    </el-date-picker>
                    <el-input v-else value="1970-01-01 08:00:00" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22" class="xiangxi">
                  <el-form-item label="需求详情" prop="mainTaskDetail">
                    <el-input type="textarea" :rows="3" style="width:100%;font-family:'PingFang SC';" placeholder="请输入内容" v-model="mainTaskEditInfo.mainTaskDetail" class="gongsiDetail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22" class="xiangxi">
                  <el-form-item label="附件管理">
                    <div>
                      <el-table :data="technicalFile" class="customer-table" :show-header="false">
                        <el-table-column label="序号" type="index" width="20" align="center"></el-table-column>
                        <el-table-column>
                          <template slot-scope="scope">
                            <el-link style="color:#409EFF" @click.native="downloadFile(scope.row)">{{scope.row.realName}}</el-link>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="120">
                          <template slot-scope="scope">
                            <el-button size="small" type="text" icon="el-icon-delete" @click="deleteFile(scope.row)">删除文件</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22">
                  <el-form-item label="添加附件">
                    <el-upload 
                      class="upload-demo" 
                      action="/api/MainTaskInformation/import" 
                      :on-success="handleAvatarSuccess" 
                      multiple 
                      :limit="3" 
                      ref="upload">
                      <el-button size="small" type="primary">上传文件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="mainTaskEditVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveMainTaskChange()">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 修改流通清单 弹出框 -->
          <el-dialog title :visible.sync="consignmentVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
              修改流通清单
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
                  <el-form-item label="产品数量" prop="productNumber">
                    <el-input v-model="consignmentForm.productNumber" maxlength="9" :disabled="consignmentNumberDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="产品单价" prop="productPrice">
                    <el-input v-model="consignmentForm.productPrice" maxlength="9" :disabled="consignmentPriceDisabled"></el-input>
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
                  <el-form-item label="零件类别" prop="consignmentpatrsList">
                    <el-cascader style="width: 100%" expand-trigger="hover" v-model="consignmentForm.consignmentpatrsList" :options="partsOptions" :props="partsProps" ref="partsCascader" placeholder="请选择零件类别">
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="收货地址" prop="shippingAddress">
                    <el-input v-model="consignmentForm.shippingAddress" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="备注" prop="consignmentNotes">
                    <el-input type="textarea" :rows="3" style="width: 100%" placeholder="请输入内容" v-model="consignmentForm.consignmentNotes" class="gongsiDetail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="consignmentVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveConsignmentChange()">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 修改配额数 弹出框 -->
          <el-dialog title :visible.sync="quotaEditVisible" width="50%" class="quotaEditDialog">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
              修改配额分配
            </div>
            <br />
            <el-table :data="quotaEditTableData" class="quotaTable" ref="multipleTable" header-cell-class-name="table-header" show-summary :summary-method="getSummaries">
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="Company_Name" align="center" label="供应商">
              </el-table-column>
              <el-table-column prop="Product_Name" label="产品名称" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.Product_Name != undefined">{{scope.row.Product_Name}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Parts_Category" label="类别" align="center" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.Parts_Category != undefined">{{scope.row.Parts_Category}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Sale" label="销量" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.Sale != undefined">{{scope.row.Sale}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Reserve" label="库存" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.Reserve != undefined">{{scope.row.Reserve}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Price" label="价格" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.Price != undefined">{{scope.row.Price}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Apply_Way" label="申请/邀请" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="+scope.row.Apply_Way === 0">邀请</span>
                  <span v-else-if="+scope.row.Apply_Way === 1">申请</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column prop="Quota_Number" label="配额" align="center" width="82" >
                <template slot-scope="scope">
                  <template v-if="scope.row.Quota_Number != undefined">
                    <el-input type="number" oninput ="value=value.replace(/[^\d]/g,'')" size="small" v-model="scope.row.Quota_Number">{{ scope.row.Quota_Number }}</el-input>
                  </template>
                  <template v-else>
                    <el-input size="small" v-model="scope.row.Quota_Number">{{ 0 }}</el-input>
                  </template>
                </template>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelQuotaChange()">取 消</el-button>
              <el-button type="primary" @click="saveQuotaChange()">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 主需求详情 弹框 -->
          <el-dialog :visible.sync="mainTaskDetailVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
              需求详情
            </div>
            <br />
            <el-form ref="form" :model="mainTaskInfo" label-width="10px">
              <el-row>
                <el-col>
                  <el-form-item label>
                    <div class="wenzi">{{ mainTaskInfo.mainTaskDetail }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <br />
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="mainTaskDetailVisible = false">关 闭</el-button>
            </span>
          </el-dialog>
          <!-- 企业信息详情 弹框 -->
          <el-dialog :visible.sync="companyDetailVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
              企业信息
            </div>
            <br />
            <el-form ref="companyDetailForm" :model="companyDetailForm" label-width="80px" class="company-detail-form">
              <el-row :gutter="20">
                <el-col :span="7" style="padding-left: 0px; padding-right: 0px;margin-left:10px;">
                  <el-form-item label-width="0" class="company-detail-form-item">
                    <div class="company-detail-imgdiv">
                      <img class="company-detail-img" :src="this.companyDetailForm.logo" fit="fill" border="1" />
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label-width="0" class="company-detail-form-item">
                    <span style="font-size: 18px">{{ this.companyDetailForm.companyName }}</span>
                  </el-form-item>
                  <el-form-item label-width="0" class="company-detail-form-item">
                    <el-rate v-model="this.companyDetailForm.star" disabled text-color="#ff9900"></el-rate>
                  </el-form-item>
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
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="companyDetailVisible = false">关 闭</el-button>
            </span>
          </el-dialog>

          <!-- 供应商企业信息弹出框 -->
          <!-- <div class="lineChart1">
            <el-dialog :visible.sync="dialogLineChartVisible" center :before-close="handleDialogClose">
              <el-row>
                <el-col :span="8">
                  <el-row> -->
                    <!-- 企业信息模块 -->
                    <!-- <el-col>
                      <el-card>
                        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div><br>
                        <el-form ref="companyDetailForm" :model="companyDetailForm" label-width="80px" class="company-detail-form">
                          <el-row :gutter="20">

                            <el-col :span="24">
                              <el-row :gutter="20">
                                <el-col :offset="1" :span="4" style="padding-left: 0px;padding-right: 0px;">
                                  <el-form-item label-width="0" class="company-detail-form-item">
                                    <div class="company-detail-imgdiv">
                                      <img class="company-detail-img" :src="this.companyDetailForm.logo" fit="fill" border="1" />
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
                  <el-row> -->
                    <!-- 工作评价 -->
                    <!-- <el-col> -->
                      <!-- 流通任务模块 雷达图 -->
                      <!-- <el-card>
                        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">工作评价</div>
                        <div class="input_span" align="center">
                          <el-form ref="form" :modelZL="formZL">
                            <label>完成质量:</label>
                            <label id="word" style="font-size: 14px"></label>
                          </el-form>
                          <span id="one"></span>
                          <span id="two"></span>
                          <span id="three"></span>
                        </div>
                        <radar-chart1 :radarData1="radarData1" ref="refradarChart1" class="renwupingjia"></radar-chart1>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="16">
                  <el-card>
                    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">销售/库存趋势图</div>
                    <div class="type2-situation">{{this.lineTitle}}</div>
                    <br />
                    <div class="type22-situation">
                      <span class="title-inventory">{{"当前库存量："+this.nowInventoryNum}}</span>
                      &nbsp;
                      <span class="title-sale">{{"当前销售量："+this.nowSaleNum}}</span>
                    </div>
                    <br />
                    <div class="type23-situation">
                      <span class="title-star">
                        <el-rate v-model="this.nowStar" disabled show-score text-color="#ff9900"></el-rate>
                      </span>
                      <template>
                        <div style="margin-bottom:38px">
                          <el-select style="width: 100px; float: right" v-model="lineYear" @change="lineChartChange">
                            <el-option v-for="item in options" placeholder="请选择" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" width="20px"></el-option>
                          </el-select>
                        </div>
                      </template>
                    </div>
                    <br />
                    <div>
                      <line-chart :lineData="lineData" ref="drawLineChart"></line-chart>
                    </div>
                  </el-card>
                </el-col>
              </el-row>

            </el-dialog>
          </div> -->

        </el-main>
      </el-container>
    </div>
  </div>
</template>




<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
import lineChart from "./components/lineChart"; //折线图
import radarChart1 from "../../Admin/Enterprise_Evaluation/components/radarCharthh";//雷达图

export default {
  name: "substaskDetailLT",
   components: {
    "line-chart": lineChart, // 折线图
    "radar-chart1": radarChart1,// 雷达图 
  },
  prop: {},
  inject: ["reload"],
  data() {
    return {
      //禁用今天以前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      usernameX: sessionStorage.getItem("ms_username"),
      mainTaskID: this.$route.query.mainTaskID,
      mainTaskDetailVisible: false, //主需求详情弹框显示
      mainTaskEditVisible: false, //主需求修改弹框显示
      consignmentVisible: false, // 流通清单弹出框显示
      consignmentEditButtonDisabled: true,// 流通清单修改按钮禁用
      companyDetailVisible: false, //企业信息弹框显示
      applyListVisible: false, //申请列表列表显示
      quotaListVisible: false, //配额分配列表显示
      quotaButtonVisible: false, //配额分配按钮显示
      popoverVisible:false, // 修改选项小框显示
      quotaEditButtonVisible:false, //配额修改按钮显示
      quotaEditVisible:false, // 配额修改弹框显示
      // 需求方负责人信息
      demanderPrincipal: [],
      //行业类别 选项列表
      industryOptions: [],
      //行业类别 级联选择框的配置对象
      industryProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: false,
      },
      //零件类别 选项列表
      partsOptions: [],
      //零件类别 级联选择框的配置对象
      partsProps: {
        value: "categoryID",
        label: "partsCategory",
        children: "children",
      },
      //主需求基本信息数据
      mainTaskInfo: {},
      //主需求基本信息修改数据
      mainTaskEditInfo: {},
      //弹框-(供应商)企业信息
      consignmentForm: {},
      //企业信息详情数据
      companyDetailForm: [],
      //申请列表数据
      applyTableData: [],
      //配额分配数据
      quotaTableData: [],
      // 配额修改总和
      quotaSum:0,
      // 配额修改行数
      quotaEditNum:0,
      //主任务需求书数据
      technicalFile: [],
      technicalFileWanzheng: "",
      shangchuancishu: 0,
      WJSM:"",
      // 主任务 编辑 表单验证
      mainTaskEditRules: {
        mainTaskName: [
          { required: true, message: "请输入需求名称", trigger: 'blur' },
          { min: 1, max: 255, message: "长度在 1 到 255 个字符", trigger: 'blur'},
        ],
        publishTime:[
          { required: true, message: "请选择发布时间", trigger: ['blur','change'] },
        ],
        principalName:[
          { required: true, message: "请选择项目负责人", trigger: 'blur' },
        ],
        deadline:[
          { required: true, message: "请选择截止时间", trigger: ['blur','change'] },
        ],
        selectCateKeys:[
          { required: true, message: "请选择行业类别", trigger:  ['blur','change'] },
        ],
        finishTime:[
          { required: true, message: "请选择完成时间", trigger:  ['blur','change'] },
        ],
        mainTaskDetail:[
          { required: true, message: "请输入需求详情", trigger: 'blur' },
          { min: 1, max: 255, message: "长度在 1 到 255 个字符", trigger: 'blur'},
        ],
      },
      //编辑流通清单 数据验证
      consignmentRules: {
        consignmentTimeLatest: [
          { required: true, message: "请选择截止时间", trigger: 'blur' },
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: 'blur' },
          { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的名称", trigger: 'blur' },
        ],
        productModel: [
          { required: true, message: "请输入产品规格", trigger: 'blur' },
          { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的规格", trigger: 'blur' },
        ],
        productNumber: [
          { required: true, message: "请输入产品数量", trigger: 'blur' },
          { pattern: /^\d{1,9}$/, message: "请输入1到9位的整数", trigger: 'blur'},
        ],
        productPrice: [
          { required: true, message: "请输入产品单价", trigger: 'blur' },
          { pattern: /^\d{1,9}$/, message: "请输入为1到9位的整数", trigger: 'blur'},
        ],
        consignmentNotes: [
          { required: true, message: "请输入备注或填写无", trigger: 'blur'},
          { min: 1, max: 255, message: "长度在 1 到 255 个字符", trigger: 'blur'},
        ],
        contactNumber: [
          { required: true, message: "请输入联系方式", trigger: 'blur'},
          { pattern: /^1\d{10}$/, message: "请输入正确的联系方式", trigger: 'blur'},
        ],
        consignmentpatrsList: [
          { required: true, message: "请选择零件类别", trigger: 'blur' },
        ],
        shippingAddress:[
          { required: true, message: "请输入收货地址", trigger: 'blur' },
          { min: 1, max: 255, message: "长度在 1 到 255 个字符", trigger: 'blur'},
        ],
      },
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
      radarData1: {
        radarData1: [],
        indicatorData1: [],
      },
      form: {
        circulationCount: 0, //流通完成质量
      },
    };
  },

  filters: {
    formatDate(time) {
      if (time === "尚未完成") {
        return "暂未完成";
      }
      // var index = time.lastIndexOf(".");
      // time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },

  created() {
    this.getMainTaskData(); // 获得主任务信息
    this.getAllPartsList(); // 获得零件下拉框 
  },

  methods: {
    // 返回需求管理
    goBack() {
      this.$router.push("/admin/mainStaskShow");
    },
    // 获取负责人信息
    getPrincipal() {
      var that = this;
      var data = Qs.stringify({
        userName: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/findPrincipal",
          data: data,
        })
        .then((response) => {
          this.demanderPrincipal = response.data.allData;
        });
    },
    // 查询零件类别信息
    getAllPartsList() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/selectPartsCategory",
        })
        .then((response) => {
          this.partsOptions = response.data.allData;
          
        });
    },
    // 获得流通清单零件一级ID 二级ID
    getPartsId(partsCategory){
      // 加载零件一级ID 和 二级 ID + 选中
        var that = this;
        var data = Qs.stringify({
          partsName:partsCategory,
        });
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/findPartsCategoryTableByPartsCategory",
            data: data,
          })
          .then((response) => {
            if(response.data.allData == null){
              this.consignmentpatrsList = [1,74];
            } else {
              this.consignmentpatrsList = response.data.allData;
            }
          })
    },
    // 查询行业类别列表
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
    // -
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
      console.log(data);
      return data;
    },
    // 获取需求基本信息
    getMainTaskData() {
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data,
        })
        .then((response) => {
          this.mainTaskInfo = response.data.allData.a[0];
          this.technicalFile = response.data.allData.c;
          this.mainTaskInfo.consignmentInfo = response.data.allData.d[0];
          this.WJSM = response.data.allData.SM;
          // 获得子任务信息
          this.getSubtaskData();
          // 获得流通清单零件一级ID 二级ID
          if(this.mainTaskInfo.consignmentInfo != undefined){
            this.getPartsId(this.mainTaskInfo.consignmentInfo.partsCategory);
          }
          this.consignmentNumberDisabled = response.data.allData.consignmentNumberDisabled;
          this.consignmentPriceDisabled = response.data.allData.consignmentPriceDisabled;
        });
    },
    // 获取子任务基本信息
    getSubtaskData() {
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID,
        productName:
          this.mainTaskInfo.consignmentInfo == undefined
            ? ""
            : this.mainTaskInfo.consignmentInfo.productName,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/circulationSubtaskApplyInfo",
          data: data,
        })
        .then((response) => {
          this.applyTableData = response.data.allData.applyList;
          this.quotaTableData = response.data.allData.quotaList;
          this.quotaButtonVisible = response.data.allData.quotaButtonVisible;
          this.applyListVisible = response.data.allData.applyListVisible;
          this.quotaListVisible = response.data.allData.quotaListVisible;
          this.quotaEditButtonVisible = response.data.allData.quotaEditButtonVisible;
          this.consignmentEditButtonDisabled = response.data.allData.consignmentEditButtonDisabled;
        });
    },
    // 主需求基本信息 - 查看需求详情（点击需求名）
    showMainTaskDetail(row) {
      this.mainTaskDetailVisible = true;
    },
    // 主需求基本信息 - 完成任务
    completeMainTask() {
      this.$confirm("确定要完成任务吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          var that = this;
          var data = Qs.stringify({
            mainStaskID: this.mainTaskID,
          });
          that
            .axios({
              method: "post",
              url: "/api/MainTaskInformation/achieveMainTask",
              data: data,
            })
            .then((response) => {
              if (response.data == "成功") {
                this.$message.success("主任务完成");
                this.getMainTaskData();
              } else {
                this.$message.error("主任务完成失败");
              }
            });
        })
        .catch(() => {
          this.$message.info("取消完成主任务");
        });
    },
    // 主需求基本信息 - 修改弹出
    showMainTaskChange() {
      this.popoverVisible = false;
      this.getPrincipal(); // 查询负责人
      this.getAllIndustryList(); // 查询行业类别
      this.mainTaskEditInfo = JSON.parse(JSON.stringify(this.mainTaskInfo));
      // 行业类别单选 赋值
      this.mainTaskEditInfo.selectCateKeys = [this.mainTaskEditInfo.taskCategoryMainId,this.mainTaskEditInfo.taskCategoryPartId];
      // 转换时间格式 否则（字符串）无法用时间选择器修改
      this.mainTaskEditInfo.publishTime = new Date(this.mainTaskEditInfo.publishTime);
      this.mainTaskEditInfo.deadline = new Date(this.mainTaskEditInfo.deadline);
      this.mainTaskEditInfo.finishTime = new Date(this.mainTaskEditInfo.finishTime);

      this.mainTaskEditVisible = true;
    },
    // 主需求基本信息 弹框 - 修改保存
    saveMainTaskChange() {
      this.$refs["mainTaskEditInfo"].validate((valid) => {
        if (valid) {
          var that = this;
          var data = Qs.stringify({
            mainTaskID: this.mainTaskID,
            mainTaskName: this.mainTaskEditInfo.mainTaskName,
            principalName: this.mainTaskEditInfo.principalName,
            publishTime1: this.mainTaskEditInfo.publishTime,
            deadline1: this.mainTaskEditInfo.deadline,
            taskCategoryMainId: this.mainTaskEditInfo.selectCateKeys[0],
            taskCategoryPartId: this.mainTaskEditInfo.selectCateKeys[1],
            mainTaskDetail: this.mainTaskEditInfo.mainTaskDetail,
            finishTime1: this.mainTaskEditInfo.finishTime,
          });
          // console.log(data);
          // this.$message.success("修改成功");
          that
            .axios({
              method: "post",
              url: "/api/MainTaskInformation/updateMainLT",
              data: data,
            })
            .then((response) => {
              this.mainStaskID = response.data.allData;
              if (this.mainStaskID != "null") {
                this.$message.success("修改需求信息成功");
                this.mainTaskEditVisible = false; 
                this.getMainTaskData();
              }
            })
        } else {
          this.$message.warning("你还有重要信息未填写，请填写后再提交");
        }
      });
    },
    // 主需求基本信息 - 附件下载（单独 点击文件名）
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        //taskID: this.taskId,
        url: row.realPath,
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
          console.log(response);
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/octet-stream" })
          );
          link.setAttribute("download", row.realName);
          document.body.appendChild(link);
          link.click();
        });
    },
    // 主需求基本信息 - 附件删除（待修改 不可用）
    deleteFile(row) {
      let ks = this.WZLJ.indexOf(row.realPath);
      let qianzui, houzui;
      if (row.wenjiancixu == this.WJSM - 1) {//只有一个文件
        qianzui = this.WZLJ.substr(0, ks - 8);
        houzui = "";
      } else {
        qianzui = this.WZLJ.substr(0, ks);
        houzui = this.WZLJ.substr(ks + row.realPath.length + 8);
      }
      this.WZLJ = qianzui + houzui;
      this.fujian.splice(row.wenjiancixu, 1);
    },
    // 主需求基本信息 弹框 - 上传文件成功后的返回值（待修改 不可用）
    handleAvatarSuccess(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      if (this.technicalFileWanzheng.length > 0) {
        this.technicalFileWanzheng = this.technicalFileWanzheng + "linklink" + this.technicalFile[this.shangchuancishu];
      } else {
        this.technicalFileWanzheng = this.technicalFileWanzheng + this.technicalFile[this.shangchuancishu];
      }
      this.shangchuancishu = this.shangchuancishu + 1;
    },
    // 流通清单 - 修改弹出
    showConsignmentChange() {
      // 关闭选择弹出框
      this.popoverVisible = false;
      // 深拷贝修改信息
      if (this.mainTaskInfo.consignmentInfo == undefined) {
        this.consignmentForm = {};
        this.consignmentForm.consignmentpatrsList = [];
      } else {
        this.consignmentForm = JSON.parse(JSON.stringify(this.mainTaskInfo.consignmentInfo));
        this.consignmentForm.consignmentpatrsList = this.consignmentpatrsList;
      }
      // 显示修改弹框
      this.consignmentVisible = true;
    },
    // 流通清单 - 修改保存
    saveConsignmentChange() {
      this.$refs["consignmentForm"].validate((valid) => {
        if (valid) {
          var that = this;
          this.consignmentForm.partsCategory = this.$refs["partsCascader"].getCheckedNodes()[0].label;
          that
            .axios({
              method: "post",
              url: "/api/addConsignment/updateConsignment/"+this.mainTaskID,
              data: JSON.stringify(this.consignmentForm),
              headers: {
								"Content-Type": "application/json;charset=utf-8" //头部信息
							}
            })
            .then((response) => {
              if(response.data.code == 200){
                this.$message.success("修改流通清单成功");
                this.getMainTaskData();
              }else{
                this.$message.warning("修改流通清单失败");
              }
              this.consignmentVisible = false;
            })
        }else{
          this.$message.warning("你还有重要信息未填写，请填写后再提交");
          return false;
        }
      })
    },
    // 主需求基本信息 - 打包下载
    downloadFiles() {
      var that = this;
      var data = Qs.stringify({
        taskID: this.mainTaskID,
        leixing: "ZRWFJ",
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob",
        })
        .then((response) => {
          response.data = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/octet-stream" })
          );
          this.download(response.data, "ZFJ");
        });
    },
    // 主需求基本信息 - 打包下载 - 下载文件
    download(data, leixing) {
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
      } else if (leixing === "ZFJ") {
        link.setAttribute("download", "主任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
    // 申请列表 - 点击标题查看企业详情弹框 (供应商)企业 详情显示 ：
    // 1.企业信息 2.仓库库存趋势折线图 3.流通任务雷达图
    getCompanyInfo(row){
      // 1.企业信息 
      this.showCompanyDetail(row);
      // 2.仓库库存趋势折线图 
      this.showLineChart(row);
      // 3.流通任务雷达图
      this.showCirculationSubtaskRadar(row);
    }, 
    // 1.企业信息
    showCompanyDetail(row) {
      this.companyDetailForm = [];
      var that = this;
      var data = Qs.stringify({
        CompanyID: row.Company_ID,
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
          this.companyDetailVisible = true;
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
    // 申请列表 - 1通过/2拒绝 申请
    checkApply(row, acceptState) {
      var checkTip = acceptState == 1 ? "通过" : "拒绝";
      this.$confirm("确定要" + checkTip + "申请吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          var that = this;
          var data = Qs.stringify({
            mainTaskId: this.mainTaskID,
            companyId: row.Company_ID,
            companyName: row.Company_Name,
            acceptState: acceptState,
          });
          that
            .axios({
              method: "post",
              url: "/api/SubstaskInformation/checkApplyMainLT",
              data: data,
            })
            .then((response) => {
              this.$message.success(checkTip + "申请成功");
              this.getSubtaskData();
            });
        })
        .catch(() => {
          this.$message.info("取消" + checkTip + "申请");
        });
    },
    // 配额分配
    setQuota() {
      // 如果没有流通清单 提示修改流通清单
      if( this.mainTaskInfo.consignmentInfo == undefined ){
        this.$confirm("暂无可分配数量，请修改流通清单！", "提示", {
        type: "warning",
      })
        .then(() => {
          this.consignmentVisible = true;
        })
      } else{
      // 如果有数量 分配
      this.$confirm("确定要智能分配吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          var that = this;
          var data = Qs.stringify({
          mainTaskId:this.mainTaskID,
          });
          that
            .axios({
              method: "post",
              url:"/api/SubstaskInformation/checkQuotaMainLT",
              data: data,
            })
            .then((response) => {
              this.getMainTaskData();
              this.getSubtaskData();
            });
        }).catch(() => {
          this.$message.info("取消智能分配");
        });
      }
    },
    // 配额数 - 修改弹出
    showQuotaChange(){
      // 保存原来的数据
      this.quotaEditTableData = JSON.parse(JSON.stringify(this.quotaTableData));
      this.quotaEditTableData.forEach((v,i)=>{
        if(v.Quota_Number != null){
          v.oldQuotaNum = v.Quota_Number;
        }
      })
      // 显示弹出框
      this.quotaEditVisible = true;
    },
    // 配额数 - 修改保存
    saveQuotaChange(){
      this.quotaSum = 0; // 修改后的总和
      this.quotaEditNum = 0; // 修改的行数
      this.quotaEditTableData.forEach((v,i)=>{
        if(v.Quota_Number != null){
          this.quotaSum = parseInt(this.quotaSum) + parseInt(v.Quota_Number);
        }
        if(v.Quota_Number != v.oldQuotaNum){
          this.quotaEditNum = parseInt(this.quotaEditNum) + 1;
        }
      })
      if(parseInt(this.quotaSum) != parseInt(this.mainTaskInfo.consignmentInfo.productNumber)){
        this.$message.warning("配额分配总和应为"+this.mainTaskInfo.consignmentInfo.productNumber+"，请重新修改后再次保存");
      }else{
        if(parseInt(this.quotaEditNum) == 0){
          this.$message.warning("配额数未修改，无需保存");
          this.cancelQuotaChange();
        }else{
          this.$confirm("确定要修改配额数量吗？", "提示", {
            type: "warning",
          })
          .then(() => {
            // 调用接口
            this.quotaEditTableData.forEach((v,i)=>{
              var that = this;
              var data = Qs.stringify({
                mainTaskId: this.mainTaskID,
                companyId: v.Company_ID,
                quotaNumber: v.Quota_Number,
                quotaPrice: v.Quota_Number * this.mainTaskInfo.consignmentInfo.productPrice
              });
              that
                .axios({
                  method: "post",
                  url:"/api/SubstaskInformation/updateQuotaNumberByMainTaskIdAndCompanyId",
                  data: data,
                })
            })
            // this.getSubtaskData(); // 接口运行慢 会刷新不出来 直接拷贝
            this.quotaTableData = JSON.parse(JSON.stringify(this.quotaEditTableData));
            this.$message.success("修改配额成功");
            this.quotaEditVisible = false;
          })
          .catch(() => {
            this.$message.warning("取消修改配额");
            this.cancelQuotaChange();// 恢复数据
          })
        }
      }
    },
    // 配额数 - 修改取消
    cancelQuotaChange(){
      // 恢复原来的数据
      this.quotaEditTableData.forEach((v,i)=>{
        if(v.Quota_Number != null){
          v.Quota_Number = v.oldQuotaNum;
        }
      })
      this.quotaEditVisible = false;
    },
    // 修改配额分配 - 获得合计数
    getSummaries(param){
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 8) {
					const values = data.map(item => Number(item[column.property]))
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr)
							if (!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
					} else {
						sums[index] = '';
					}
				} else {
					sums[index] = ''
				}
      });
      sums[5] = '应分配：';
      sums[6] = this.mainTaskInfo.consignmentInfo.productNumber;
      sums[7] = '已分配：';
      return sums;
    },
    // 配额列表 - 查看子任务详情
    substaskDetailLT(row) {
      this.$router.push({
        path: "/admin/mainStaskDetailLT",
        query: {
          taskId: row.Main_Task_ID,
          acceptCompanyId: row.Company_ID,
        },
      });
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
    findALLCirculationCount(companyID) {
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
    finduserNameBycompanyID(companyID) {
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
          this.UserName = response.data.allData;
          console.log("AA" + this.UserName);
          this.getTimeData();
        });
    },
    //获取条件选择时间数据
    getTimeData() {
      let that = this;
      that.axios.post("/api/findTimes").then((response) => {
        // this.form2.time1 = response.data.allData[0];//本年第一天

        this.form2.time2 = response.data.allData[1]; //当天时间
        this.form2.time1 = "2019-01-01";
        this.getRadarData1();
      });
    },
    //雷达图-制造
    getRadarData1() {
      var that = this;
      var data = Qs.stringify({
        userName: this.UserName,
        startTime: this.form2.time1,
        finishTime: this.form2.time2,
      });
      that

        .axios({
          method: "post",
          url: "/api/findCirculaterRemarkTimes1",
          data: data,
        })
        .then((response) => {
          this.radarData1.radarData1 = response.data.allData.AllRemarkLength;
          this.radarData1.indicatorData1 = response.data.allData.indicator;
          console.log("输出为" + this.radarData1.radarData1);
          that.$refs.refradarChart1.getradarCharts1();
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
    handleDialogClose() {
      document.getElementById("one").style.background = "";
      document.getElementById("two").style.background = "";
      document.getElementById("three").style.background = "";
      document.getElementById("word").innerHTML = "";
      document.getElementById("word").style.color = "";
      this.dialogLineChartVisible = false;
    },

  },
};
</script>

<style lang="scss" >
.substaskDetailLT {
  .wenzi {
    padding-right: 18px;
  }

  .shenhe {
    color: #ff8040;
    background-color: #ffe6d9;
    border-color: #ffdcb9;
  }
  .yanshou {
    color: #e066ff;
    background-color: #ffe1ff;
    border-color: #fff0f5;
  }
  .el-upload-list__item {
    width: 90%;
  }
  .first-child.el-upload-list__item {
    width: 90%;
  }

  .el-dialog__footer {
    padding-right: 40px;
  }
  .anniu .el-dialog__footer {
    padding-right: 20px;
  }
  .anniu {
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
  .el-table__empty-block {
    min-height: 40px;
  }
  .el-table td,
  .el-table th {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .simichakan {
    line-height: 40px;
  }
  .formYS .el-input__inner {
    /* // 表格样式调整 */

    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }

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
  .quotaTable {
    .el-input--small .el-input__inner {
      text-align: center;
      font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
      font-size: 14px;
      padding: 0px 0px 0px 8px;
    }
    // .el-table .cell{
    //   text-align: center;
    // }
  }
  .quotaEditDialog{
    .el-dialog__body{
      padding-right: 20px;
    }
    /* 垂直居中 */ 
    // .el-dialog{
    //   display: flex;
    //   display: -ms-flex; /* 兼容IE */
    //   flex-direction: column;
    //   -ms-flex-direction: column; /* 兼容IE */
    //   margin:0 !important;
    //   position:absolute;
    //   top:50%;
    //   left:50%;
    //   transform:translate(-50%,-50%);
    //   max-height:calc(100% - 30px);
    //   max-width:calc(100% - 30px);
    // }
    // .el-dialog .el-dialog__body{
    //   max-height: 100%;
    //   flex: 1;
    //   -ms-flex: 1 1 auto; /* 兼容IE */
    //   overflow-y: auto;
    //   overflow-x: hidden;
    // }
    // .el-dialog__wrapper {
    //   /*隐藏ie和edge中遮罩的滚动条*/
    //   overflow: hidden;
    // }
  }

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
.el-textarea__inner {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "microsoft yahei",
    arial, STHeiTi, sans-serif;
}

.lineChart1 {
  .el-dialog__header {
    padding: 20px 20px 0px;
  }
  .el-dialog {
    width: 1300px;
  }
}
.company-detail-form {
  .company-detail-form-item {
    margin-bottom: 0px;
    .company-detail-imgdiv {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      .company-detail-img {
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
        border-radius: 5px;
      }
    }
  }
  .company-detail-divider {
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
//完成质量
.addSubTask .LDT {
  margin-left: 5px;
}
// .addSubTask .renwupingjia{
//   margin-left: 60px;
// }
.addSubTask .wanchengzhiliang {
  margin-left: 10px;
}
</style>