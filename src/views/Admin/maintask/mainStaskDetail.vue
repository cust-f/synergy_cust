<template >
  <div class="mainStaskDetaul">
    <el-main style="overflow:hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <!-- <el-steps >
        <el-step title="申请/邀请" icon="el-icon-edit"></el-step>
        <el-step title="计划提交" icon="el-icon-upload"></el-step>
        <el-step title="任务进行中" icon="el-icon-picture"></el-step>
        <el-step title="审核" icon="el-icon-message-solid"></el-step>
        <el-step title="验收" icon="el-icon-s-promotion"></el-step>
        <el-step title="完成" icon="el-icon-s-claim"></el-step>
      </el-steps>-->
      <el-steps :active="milepostActive" align-center>
        <el-step
          v-for="(value, key) in milepost"
          :class="milepostActive== key+1 ? stepActive: '' "
          :title="value.title"
          :icon="value.icon"
          :description="value.description"
          :key="key"
        ></el-step>
      </el-steps>
      <br />
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">基本信息</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <br />
      <el-card class="box-card">
        <el-form ref="cool" :model="cool" label-width="110px" class="form">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求名称:">
                <el-input v-model="cool.mainTaskName" :disabled="true" style="text-align:center"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="子任务名称:">
                <el-input v-model="cool.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="发布企业名称:">
                <el-input v-model="cool.companyName" :disabled="true" style="text-align:center"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="接受企业名称:">
                <el-input v-model="cool.acceptCompanyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="任务父类别:">
                <el-input
                  v-model="cool.taskCategoryMain"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务子类别:">
                <el-input v-model="cool.taskCategoryPart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="任务截止日期:">
                <el-input
                  v-bind:value="cool.deadline|formatDate"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求方电话:">
                <el-input v-model="cool.demanderTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <br />
      <br />

      <div v-show="milepostActive1">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请列表</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-table
          :data="tableData1"
          border
          class="table1"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="companyName" label="供应商" >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="companyDetail(scope.row)"
              >{{scope.row.companyName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="applyWay" label="承接方式">
            <template slot-scope="scope">
              <span v-if="+scope.row.applyWay === 0">邀请</span>
              <span v-else-if="+scope.row.applyWay === 1">申请</span>
              <span v-else>其他</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyState" label="申请/邀请状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkApplyState === 0">待审核</span>
              <span v-else-if="+scope.row.checkApplyState === 1">通过</span>
              <span v-else>拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请/邀请时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.applyTime === 0">暂未申请</el-span>
              <el-span v-if-else>{{scope.row.applyTime | formatDate}}</el-span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button
                @click="SQTG(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkApplyState===0&&scope.row.applyWay===1"
              >通过</el-button>
              <el-button
                @click="SQJJ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkApplyState===0&&scope.row.applyWay===1"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive2">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务计划</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <br />
        <el-table
          :data="tableData2"
          border
          class="table2"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="companyName" width="198" label="供应商"></el-table-column>
          <el-table-column prop="checkPlanState" width="180" label="计划审核状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkPlanState === 0">待上传</span>
              <span v-else-if="+scope.row.checkPlanState === 1">待审核</span>
              <span v-else-if="+scope.row.checkPlanState === 2">通过</span>
              <span v-else-if="+scope.row.checkPlanState === 3">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="planUploadTime" width="180" label="计划上传时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.planUploadTime === 0">暂未上传</el-span>
              <el-span v-else>{{scope.row.planUploadTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="checkPlanTime"  width="180" label="计划审核时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.checkPlanTime === 0">暂未审核</el-span>
              <el-span v-else>{{scope.row.checkPlanTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button
                @click="RWJHXZ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkPlanState !==0"
              >下载</el-button>
              <el-button
                @click="JHSTG(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkPlanState===1 || scope.row.checkPlanState===3"
              >通过</el-button>
              <el-button
                @click="JHSJJ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkPlanState===1 || scope.row.checkPlanState===3"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive3">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">合同管理</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <br />
        <el-table
          :data="tableData3"
          border
          class="table3"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="acceptCompanyName" width="198" label="供应商"></el-table-column>
          <el-table-column prop="contractState" width="180" label="合同审核状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.contractState === 0">待上传</span>
              <span v-else-if="+scope.row.contractState === 1">待审核</span>
              <span v-else-if="+scope.row.contractState === 2">通过</span>
              <span v-else-if="+scope.row.contractState === 3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadContractTime" width="180" label="合同上传时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.uploadContractTime === 0">暂未上传</el-span>
              <el-span v-else>{{scope.row.uploadContractTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="checkContractTime" width="180" label="合同审核时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.checkContractTime === 0">暂未审核</el-span>
              <el-span v-else>{{scope.row.checkContractTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button
                type="text"
                size="small"
                v-if="scope.row.contractState!==0"
                @click="HTXZ(scope.row)"
              >下载</el-button>
              <el-button
                @click="HTSHTG(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.contractState===1 || scope.row.contractState===3"
              >通过</el-button>
              <el-button
                @click="HTSHJJ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.contractState===1"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive4">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计提交</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <br />
        <el-table
          :data="tableData4"
          border
          class="table4"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="acceptCompanyName" label="供应商"></el-table-column>
          <el-table-column prop="designerName" label="设计人员姓名">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.designerName === 0">暂未分配设计人员</el-span>
              <el-span v-else>{{scope.row.designerName}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="designCount" label="设计重做次数"></el-table-column>demandorCheckDesignState
          <el-table-column prop="demandorCheckDesignState" label="设计验收状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.demandorCheckDesignState===0">待上传</span>
              <span v-else-if="+scope.row.demandorCheckDesignState===1">待审核</span>
              <span v-else-if="+scope.row.demandorCheckDesignState===2">通过</span>
              <span v-else-if="+scope.row.demandorCheckDesignState===3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadDesignTime" label="设计上传时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.uploadDesignTime === 0">暂未上传</el-span>
              <el-span v-else>{{scope.row.uploadDesignTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="demandorCheckDesignTime" label="设计审核时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.demandorCheckDesignTime === 0">暂未审核</el-span>
              <el-span v-else>{{scope.row.demandorCheckDesignTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button
                type="text"
                size="small"
                v-if="scope.row.demandorCheckDesignState===1 || scope.row.demandorCheckDesignState===2 ||scope.row.demandorCheckDesignState===3"
              >查看设计</el-button>
              <el-button
                @click="SJTG(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.demandorCheckDesignState===1"
              >通过</el-button>
              <el-button
                @click="SJJJ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.demandorCheckDesignState===1"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive5">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务评价</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <!-- <div class="SXT">
          <el-steps :active="milepostActive" align-center>
            <el-step
              v-for="(value, key) in milepost1"
              :class="milepostActive== key+1 ? stepActive: '' "
              :title="value.title"
              :icon="value.icon"
              :description="value.description|formatDate"
              :key="key"
            ></el-step>
          </el-steps>
        </div> -->

        <div class="LDT">
          
          <!-- 雷达图 -->
          
          <radar-chart :radarData="radarData" ref="QradarChart"></radar-chart>
          <div class="input_span" align="center">
            <el-form ref="form" :modelZL="formZL">
              <div class="WCZL">完成质量</div>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <br />
              <br />
            </el-form>
            <span id="one"></span>
            <span id="two"></span>
            <span id="three"></span>
          </div>
        </div>
      </div>

      <!-- 申请拒绝原因弹出框 -->
      <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible" width="50%">
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="审核拒绝原因">
                <el-input v-model="addList.SQrefuseReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="SQJJYYTJ">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 计划书拒绝原因弹出框 -->
      <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible1" width="50%">
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList1" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="审核拒绝原因">
                <el-input v-model="addList1.JHSrefuseReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="JHSJJYYTJ">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 合同拒绝原因弹出框 -->
      <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible2" width="50%">
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList2" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="审核拒绝原因">
                <el-input v-model="addList2.HTrefuseReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="HTJJYYTJ">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 设计拒绝原因弹出框 -->
      <el-dialog title="请输入设计不通过的原因" :visible.sync="addVisible3" width="50%">
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList3" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="审核拒绝原因">
                <el-input v-model="addList3.SJrefuseReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="SJJJYYTJ">确 定</el-button>
        </span>
      </el-dialog>

      <!-- detail -->
      <el-dialog title :visible.sync="addVisibleCD" width="50%">
            <div width = 500 align="center" height = 200px>
          <el-image :src="imgsrc"></el-image>
    </div>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <div align="right" class="formYS">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="form.companyName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业联络电话">
                  <el-input v-model="form.businessTel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业所在省份">
                  <el-input v-model="form.province" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业所在县市">
                  <el-input v-model="form.city" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业地址">
                  <el-input v-model="form.address" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input v-model="form.postcode" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业成立时间">
                  <el-input v-bind:value="form.foundingTime | formatDate" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工商注册号">
                  <el-input v-model="form.brNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业业务范围">
                  <el-input v-model="form.product" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱">
                  <el-input v-model="form.email" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业联系人">
                  <el-input v-model="form.businessName" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公室电话">
                  <el-input v-model="form.officeNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资产">
                  <el-input v-model="form.registeredCapital" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总资本">
                  <el-input v-model="form.totalAssets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="固定资产">
                  <el-input v-model="form.fixedAssets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流动资产">
                  <el-input v-model="form.currentAssets" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="法人代表">
                  <el-input v-model="form.legalPerson" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工人数">
                  <el-input v-model="form.workerNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户银行">
                  <el-input v-model="form.deposit_Bank" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行账户">
                  <el-input v-model="form.bankNumber" :disabled="yangshi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="详细">
                  <el-input v-model="form.introduction" :disabled="yangshi"></el-input>
                </el-form-item>
                <!-- <el-form-item label="详细" >
                            <el-input 
                            type="textarea"
                            :rows="1"
                            style="width:100%;"
                            placeholder="请输入内容" v-model="form.introduction" :disabled=yangshi ></el-input>
                    </el-form-item>
                -->
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addVisibleCD = false">关 闭</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
import radarChart from "./radarChart";

export default {
  inject: ["reload"],
  name: "mainStaskDetail",
  components: {
    "radar-chart": radarChart
  },

  data() {
    return {
      //质量完成图数据源
      formZL: {
        designCount: ""
      },

      //雷达图的数据定义
      radarData: {
        radarData: []
      },
      //申请拒绝原因       的模态框开始是否存在
      addVisible: false,
      //计划书拒绝原因    的模态框开始是否存在
      addVisible1: false,
      //合同退回原因      的模态框开始是否存在
      addVisible2: false,
      //设计退回原因     的模态框开始是否存在
      addVisible3: false,
      //商品细节的弹框
      addVisibleCD: false,
      activeBZT: "",
      mainTaskID: "",
      //SQRWButton:none,
      //申请任务的id
      applyID: "",
      //子任务的id
      taskId: "",
      //申请表ID
      ID: "",
      //控制4个table是否显示的
      milepostActive1: -1,
      milepostActive2: -1,
      milepostActive3: -1,
      milepostActive4: -1,
      milepostActive5: -1,
      cool: {
        mainTaskName: "nihao",
        taskName: "nihao",
        companyName: "",
        supplierName: "",
        deadline: "",
        demanderTel: "",
        taskCategoryPart: "",
        taskCategoryMain: ""
      },
      tableData1: [
        {
          companyName: "",
          applyWay: "",
          checkApplyState: "", //任务申请审核状态
          applyTime: "", //任务申请审核时间
          checkPlanState: "", //计划审核状态
          checkPlanTime: "" //计划审核时间
        }
      ],
      tableData2: [
        {
          acceptCompanyName: "",
          applyWay: "",
          checkPlanState: "", //计划审核状态
          checkPlanTime: "" //计划审核时间
        }
      ],
      tableData3: [
        {
          acceptCompanyName: "",
          applyWay: "",
          contractState: "", //合同审核状态
          uploadContractTime: "", //合同上传时间
          contractRefuseReason: "" //合同拒绝原因
        }
      ],
      tableData4: [
        {
          acceptCompanyName: "",
          designerName: "",
          applyWay: "",
          designCount: "",
          demandorCheckDesignState: "",
          contractState: "", //合同审核状态
          uploadDesignTime: "", //合同上传时间
          demandorCheckDesignTime: "",
          contractRefuseReason: "" //合同拒绝原因
        }
      ],
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit" ,description: ""},
        { title: "计划提交", icon: "el-icon-upload" ,description: ""},
        { title: "任务进行中", icon: "el-icon-picture" ,description: ""},
        { title: "审核", icon: "el-icon-message-solid",description: "" },
        { title: "验收", icon: "el-icon-s-promotion",description: "" },
        { title: "完成", icon: "el-icon-s-claim",description: "" }
      ],
      //下图的
      milepost1: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" }
      ],
      // 默认步骤数
      milepostActive: 1,
      // 动态添加类名
      stepActive: "stepActive",
      addList: {
        SQrefuseReason: "" //申请拒绝原因
      },
      addList1: {
        JHSrefuseReason: "" //计划书拒绝原因
      },
      addList2: {
        HTrefuseReason: "" //计划书拒绝原因
      },
      addList3: {
        SJrefuseReason: "" //设计拒绝原因
      },
      //图片信息
      imgsrc:"",
      //企业信息
      form: {
        businessName: "",
        companyID: "20191006066",
        companyName: "长光卫星国际有限公司",
        Address: "吉林省长春市卫星路8848号",
        postcode: "104300",
        foundingTime: "2015-9-10",
        brNumber: "S100934",
        officeNumber: "17866625034",
        email: "34895611@163.com",
        bussessName: "李林甫",
        product: "微电子元器件制作",
        introduction:
          "少年的肩膀，就该这样才对嘛，什么家国仇恨，浩然正气的，都不要急，先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。",
        cool: "17855555",
        province: "吉林省",
        city: "长春市绿园区",
        registeredCapital: "8.5亿",
        totalAssets: "10亿",
        currentAssets: "2.2亿",
        fixedAssets: "2亿元",
        legalPerson: "杨言",
        workerNumber: "500人",
        deposit_Bank: "中国银行",
        bankNumber: "25206589260388885222201"
        //  @input.native="changeCode"
      }
    };
  },

  filters: {
    formatDate(time) {
      if (time != 0) {
        var index = time.lastIndexOf(".");
        time = time.substring(0, index);
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
      else{
        return("暂未开始")
      }
    }
  },
  created() {
    this.getParams();
    this.showData();
  },
  methods: {
    //提交次数 背景颜色变化
    styleswith() {
      if (this.formZL.designCount >= 0 && this.formZL.designCount < 3) {
        document.getElementById("one").style.background = "#00D1B2";
      }
      if (this.formZL.designCount > 2 && this.formZL.designCount < 4) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
      }
      if (this.formZL.designCount > 4 || this.formZL.designCount == 4) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
      }
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },

    showData() {
      console.log("你好");
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        subStaskID: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/list",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData1 = response.data.allData.b;
          //判断4个table是否隐藏
          if (this.tableData1 == null) {
            this.milepostActive1 = 0;
          }
          this.tableData2 = response.data.allData.c;
          if (this.tableData2 == null) {
            this.milepostActive2 = 0;
          }
          this.tableData3 = response.data.allData.d;
          if (this.tableData3 == null) {
            this.milepostActive3 = 0;
          }
          this.tableData4 = response.data.allData.e;
          if (this.tableData4 == null) {
            this.milepostActive4 = 0;
          }

          console.log(response.data.allData.f);
          this.radarData.radarData = response.data.allData.f;
          that.$refs.QradarChart.getCharts1();
          console.log(this.radarData.radarData);

          if (response.data.allData.f == null) {
            console.log(this.milepostActive5);
            this.milepostActive5 = 0;
          }
          if (response.data.allData.f != null) {
            console.log("cao");
            this.formZL = response.data.allData.d[0];
            this.styleswith();
            
          }
              
          //判断el-step到第几步骤
          this.cool = response.data.allData.a[0];
          this.milepostActive = response.data.allData.a[0].taskState;
          if (this.milepostActive == "计划提交") {
            this.milepostActive = 1;
          } else if (this.milepostActive == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.milepostActive == "任务进行中") {
            this.milepostActive = 2;
          } else if (this.milepostActive == "审核") {
            this.milepostActive = 3;
          } else if (this.milepostActive == "验收") {
            this.milepostActive = 4;
          } else if (this.milepostActive == "完成") {
            this.milepostActive = 5;
          }
          if(this.milepostActive >=0){
               this.milepost[0].description = this.$options.filters['formatDate'](response.data.allData.a[0].applyTime);
              if(this.milepostActive>0){
                  this.milepost[1].description = this.$options.filters['formatDate'](response.data.allData.c[0].planUploadTime);
              }
              if(this.milepostActive>1){
                  this.milepost[2].description = this.$options.filters['formatDate'](response.data.allData.c[0].checkPlanTime);
              }
              if(this.milepostActive>2){
                  this.milepost[3].description = this.$options.filters['formatDate'](response.data.allData.d[0].checkContractTime);
              }
              if(this.milepostActive>3){
                 this.milepost[4].description = this.$options.filters['formatDate'](response.data.allData.e[0].designerAcceptTime);
              }
              if(this.milepostActive>0){
                this.milepost[5].description = this.$options.filters['formatDate'](response.data.allData.e[0].finishTime);
              }
          }
          console.log(this.milepostActive);
          this.mainTaskID = response.data.allData.a[0].mainTaskId;
          console.log(this.mainTaskID);
          console.log(response.data.allData.a[0].taskState);
          console.log(response.data.allData);
        });
    },
    goBack() {
      this.$router.push({
        path: "/admin/substaskDetail",
        query: {
          mainTaskID: this.mainTaskID
        }
      });
    },
    //申请通过与拒绝
    SQTG(row) {
      this.$confirm("确定将申请审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          ID: row.id,
          taskID: row.taskId,
          companyID: row.companyId,
          companyName: row.companyName
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/shenheSQ",
          data: data
        });
        this.$message({
          message: "审核通过",
          type: "success"
        });
        this.showData();
      });
    },
    SQJJ(row) {
      this.addVisible = true;
      this.applyID = row.id;
    },
    SQJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        ID: this.applyID,
        SQrefuseReason: this.addList.SQrefuseReason
      });
      console.log(data),
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/SQJJReason",
          data: data
        });
      this.$message.success("提交成功");
      this.addList = {};
      this.addVisible = false;
      this.showData();
    },
    //计划书通过与拒绝
    JHSTG(row) {
      this.$confirm("确定将任务计划书审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId,
          ID: row.id,
          companyID: row.companyId,
          companyName: row.companyName
        });
        console.log(data);
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/RWJHSH",
            data: data
          })
          .then(response => {
            if (response.data == "成功") {
              this.$message({
                message: "审核通过",
                type: "success"
              });
              this.showData();
            } else {
              this.$confirm(
                "您已经通过了一个任务计划，无法再通过另一个任务计划",
                "提示",
                {
                  type: "warning"
                }
              );
            }
          });
      });
    },
    JHSJJ(row) {
      this.addVisible1 = true;
      this.ID = row.id;
    },
    JHSJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        ID: this.ID,
        JHSrefuseReason: this.addList1.JHSrefuseReason
      });
      console.log(data),
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/JHSJJReason",
          data: data
        });
      this.$message.success("提交成功");
      this.addList1 = {};
      this.addVisible1 = false;
      this.showData();
    },
    //任务计划下载
    RWJHXZ(row) {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        ID: row.id
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadJHS",
          data: data
        })
        .then(response => {
          console.log("cap");
          console.log(response.data);
          this.download(response.data, "JHS");
        });
    },
    // 下载文件
    download(data, leixing) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      if (leixing === "JHS") {
        link.setAttribute("download", "设计文档.docx");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.docx");
      }
      document.body.appendChild(link);
      link.click();
    },
    //合同审核
    HTSHTG(row) {
      this.$confirm("确定将合同审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/HTSHTG",
          data: data
        });
        this.$message({
          message: "审核通过",
          type: "success"
        });
        this.showData();
      });
    },
    HTSHJJ(row) {
      this.addVisible2 = true;
      this.taskId = row.taskId;
    },
    HTJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        HTrefuseReason: this.addList2.HTrefuseReason
      });
      console.log(data),
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/HTJJReason",
          data: data
        });
      this.$message.success("提交成功");
      this.addList2 = {};
      this.addVisible2 = false;
      this.showData();
    },
    //合同下载
    HTXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: row.taskId
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHT",
          data: data
        })
        .then(response => {
          console.log(response.data);
          this.download(response.data, "HT");
        });
    },
    //设计通过
    SJTG(row) {
      this.$confirm("确定将设计审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/SJSHTG",
          data: data
        });
        this.showData();

        this.$message({
          message: "审核通过,并自动生成评价",
          type: "success"
        });
      });
    },
    SJJJ(row) {
      this.addVisible3 = true;
      this.taskId = row.taskId;
    },
    SJJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        HTrefuseReason: this.addList3.SJrefuseReason
      });
      console.log(data),
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/SJJJReason",
          data: data
        });
      this.$message.success("提交成功");
      this.addList3 = {};
      this.addVisible3 = false;
      this.showData();
    },
    companyDetail(row) {
      var that = this;
            var data = Qs.stringify({
                CompanyID:row.companyId
            });
            that
                .axios({
                    method:"post",
                    url:'/api/companyDetail/showCompanyDetal',
                    data:data,
                               
                })
                .then(response =>{ 
                    console.log(response);
                   
                    this.form = response.data.allData[0];
                    this.companyId = response.data.allData[0].companyId
                    this.companyName = response.data.allData[0].companyName 
                    this.imgsrc = response.data.allData[0].companyPicture 
                    console.log(this.imgsrc)      
                })
      this.addVisibleCD = true;
    }
  }
};
</script>

<style lang="scss">
.mainStaskDetaul {
  #demo{
width:20px; /*设置div宽度为500像素*/
background:#000; /*设置div背景色为zhidao黑色*/
}
  //时序图
  .SXT {
    height: 150px;
  }
  //雷达图
  .LDT {
    height: 300px;
  }

  //完成质量
  .WCZL {
    font-size: 13px;
    color: #303133;
  }

  .table {
    font-size: 13px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 960px;
    /* border: 1px solid #00a2e6 ; */
  }
  //返回字体
  .el-page-header__title {
    font-size: 18px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  // /* 表格字体粗细 */
  // .el-table thead {
  //   font-weight: 200;
  // }
  // /* 表格下方每列有无竖线 */
  // .el-table__row > td {
  //   border: none;
  // }
  // 表格样式调整
  .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }

  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }
  // 进度样式调整
  .el-step__head.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }

  .el-step__title.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }
  //质量图样式调整
  #inputValue {
    width: 240px;
    margin-left: 0px;
    padding-left: 10px;
    border-radius: 3px;
  }
  .input_span span {
    display: inline-block;
    width: 100px;
    height: 30px;
    background: #eee;
    line-height: 20px;
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
  #font span:nth-child(1) {
    color: #00d1b2;
    margin-left: 80px;
  }
  #font span:nth-child(2) {
    color: orange;
    margin: 0 60px;
  }
  #font span:nth-child(3) {
    color: red;
  }
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
//图片样式
 .el-image__error, .el-image__inner, .el-image__placeholder{
    width:500px;
    height: 200px;
}
.table2 {
   display: table-cell!important;
  /* width: 100%; */
}
.table3 {
   display: table-cell!important;
  /* width: 100%; */
}
}
</style>
