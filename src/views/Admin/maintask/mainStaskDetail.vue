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
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
        基本信息
        <el-button
          v-if="this.milepostActive === 0"
          type="text"
          class="XG"
          style="float:right"
          @click="XG"
        >修改</el-button>
      </div>

      <br />
      <el-card class="box-card">
        <div class="formYS">
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
                    @click="xiazaiTaskDetail()"
                  >{{cool.taskName}}</el-button>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="需求类型">
                  <el-input v-model="cool.taskType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="供应方">
                  <el-input v-model="cool.acceptCompanyName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="一级行业类别">
                  <el-input
                    v-model="cool.taskCategoryMain"
                    :disabled="true"
                    style="text-align:center"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="二级行业类别">
                  <el-input v-model="cool.taskCategoryPart" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="截止日期">
                  <el-input
                    v-bind:value="cool.deadline|formatDate"
                    :disabled="true"
                    style="text-align:center"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="需求方电话">
                  <el-input v-model="cool.demanderTel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
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
          <el-table-column prop="companyName" width="250" label="供应商">
            <template slot-scope="scope">
              <el-button type="text" @click="companyDetail(scope.row)">{{scope.row.companyName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="supplierTel" label="联络电话" width="120"></el-table-column>
          <el-table-column prop="applyWay" label="承接方式" width="80">
            <template slot-scope="scope">
              <span v-if="+scope.row.applyWay === 0">邀请</span>
              <span v-else-if="+scope.row.applyWay === 1">申请</span>
              <span v-else>其他</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyState" label="申请/邀请状态" align="center">
            <template slot-scope="scope">
              <el-tag  v-if="+scope.row.checkApplyState === 0">待审核</el-tag>
              <el-tag  v-else-if="+scope.row.checkApplyState === 1" type="success">通过</el-tag>
              <el-tag v-else type="danger">拒绝</el-tag>
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
          class="table1"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="companyName" label="供应商" width="250"></el-table-column>
          <el-table-column prop="checkPlanState" label="审核状态" align="center">
            <template slot-scope="scope">
              <el-tag  v-if="+scope.row.checkPlanState === 0" type="info">待上传</el-tag>
              <el-tag  v-else-if="+scope.row.checkPlanState === 1">待审核</el-tag>
              <el-tag  v-else-if="+scope.row.checkPlanState === 2" type="success">通过</el-tag>
              <el-tag v-else type="danger">拒绝</el-tag>
              
            </template>
          </el-table-column>
          <el-table-column prop="planUploadTime" label="上传时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.planUploadTime === 0">暂未上传</el-span>
              <el-span v-else>{{scope.row.planUploadTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="checkPlanTime" label="审核时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.checkPlanTime === 0">暂未审核</el-span>
              <el-span v-else>{{scope.row.checkPlanTime | formatDate}}</el-span>
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
                @click="RWJHXZ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkPlanState !==0"
              >下载</el-button>
              <el-button
                @click="JHSTG(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkPlanState===1"
              >通过</el-button>
              <el-button
                @click="JHSJJ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.checkPlanState===1"
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
          class="table1"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="acceptCompanyName" label="供应商" width="250"></el-table-column>
          <el-table-column prop="contractState" label="审核状态" align="center">
            <template slot-scope="scope">
              <el-tag  v-if="+scope.row.contractState === 0" type="info">待上传</el-tag>
              <el-tag  v-else-if="+scope.row.contractState === 1">待审核</el-tag>
              <el-tag  v-else-if="+scope.row.contractState === 2" type="success">通过</el-tag>
              <el-tag v-else type="danger">拒绝</el-tag>
              
            </template>
          </el-table-column>
          <el-table-column prop="uploadContractTime" label="上传时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.uploadContractTime === 0">暂未上传</el-span>
              <el-span v-else>{{scope.row.uploadContractTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="checkContractTime" label="审核时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.checkContractTime === 0">暂未审核</el-span>
              <el-span v-else>{{scope.row.checkContractTime | formatDate}}</el-span>
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
                type="text"
                size="small"
                v-if="scope.row.contractState!==0"
                @click="HTXZ(scope.row)"
              >下载</el-button>

              <el-button
                @click="HTSHTG(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.contractState===1 "
              >通过</el-button>
              <el-button
                @click="HTSHJJ(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.contractState===1"
              >拒绝</el-button>
              <el-button type="text" size="small" @click="CKLSHT(scope.row)">历史上传</el-button>
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
          <el-table-column prop="acceptCompanyName"  width="200" label="供应商"></el-table-column>
          <!-- <el-table-column prop="designerName" label="设计人员" widht="70">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.designerName === 0">暂未分配设计人员</el-span>
              <el-span v-else>{{scope.row.designerName}}</el-span>
            </template>
          </el-table-column> -->
          <el-table-column prop="designCount" label="重做次数" width="80"></el-table-column>demandorCheckDesignState
          <el-table-column prop="demandorCheckDesignState" width="80" label="验收状态" align="center">
            <template slot-scope="scope">
              <el-tag  v-if="+scope.row.demandorCheckDesignState === 0" type="info">待供应商审核</el-tag>
              <el-tag  v-else-if="+scope.row.demandorCheckDesignState === 1">待审核</el-tag>
              <el-tag  v-else-if="+scope.row.demandorCheckDesignState === 2" type="success">通过</el-tag>
              <el-tag v-else type="danger">拒绝</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="uploadDesignTime" label="上传时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.uploadDesignTime === 0">暂未上传</el-span>
              <el-span v-else>{{scope.row.uploadDesignTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="demandorCheckDesignTime" label="审核时间">
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
                @click="LJTZ(scope.row)"
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
        </div>-->
        <!-- 雷达图 --> 
                 <!-- 评价模块 -->
        <div v-if="reMarkId === 0">
          <div
            class="loading1"
            v-loading="loading"
            element-loading-text="评价生成中......"
          >
            <radar-chart :radarData="radarData" ref="QradarChart"></radar-chart>

            <div class="input_span" align="center">
              <el-form ref="form" :modelZL="formZL">
                <label  style="font-size:13px">完成质量:</label>
                <label id="word" style="font-size:13px"></label>
                <br />
                <br />
              </el-form>
               <span id="one"></span>
              <span id="two"></span>
              <span id="three"></span>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div v-if="reMarkId === 1">
          <!-- 雷达图 -->
                      

          <div class="LDT">
            <!-- 雷达图 -->

              <radar-chart :radarData="radarData" ref="QradarChart"></radar-chart>
            <div class="input_span" align="center">
              <el-form ref="form" :modelZL="formZL">
                <label ></label>
                <label  style="font-size:13px">完成质量:</label>
                                <label id="word" style="font-size:13px"></label>

                <br />
                <br />
              </el-form>
              <span id="one"></span>
              <span id="two"></span>
              <span id="three"></span>
            </div>
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

      <!-- qiyedetail -->

      <el-dialog title :visible.sync="addVisibleCD" width="50%">
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
                <br />
        <div style="width:800px;height:250px">
        
          <div style="float: left" >
            <el-image
              align="left"
              style="width:200px;height:200px"
              :src="logo"
              :onerror="errorImg00"
            ></el-image>
          </div>

          <div style="float: right;width:490px;height:250px">
              <br>
            <el-rate label="企业级别：" v-model="form.star" disabled text-color="#ff9900"></el-rate>
            <br>
            <div align="">
              <font size="5">{{ form.companyName}}</font>
            </div>
            <br>
            <div align="">
              <font size="4">{{ form.officeNumber}}</font>
            </div>
          </div>
        </div>
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
                  <el-input v-model="form.province" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业所在县市">
                  <el-input v-model="form.city" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业地址">
                  <el-input v-model="form.address" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input v-model="form.postcode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业成立时间">
                  <el-input v-bind:value="form.foundingTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工商注册号">
                  <el-input v-model="form.brNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业业务范围">
                  <el-input v-model="form.product" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱">
                  <el-input v-model="form.email" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业联系人">
                  <el-input v-model="form.businessName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公室电话">
                  <el-input v-model="form.officeNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资产">
                  <el-input v-model="form.registeredCapital" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总资本">
                  <el-input v-model="form.totalAssets" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="固定资产">
                  <el-input v-model="form.fixedAssets" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流动资产">
                  <el-input v-model="form.currentAssets" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="法人代表">
                  <el-input v-model="form.legalPerson" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工人数">
                  <el-input v-model="form.workerNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户银行">
                  <el-input v-model="form.deposit_Bank" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行账户">
                  <el-input v-model="form.bankNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="企业详情">
                  
                </el-form-item><div class="leftDet" v-html="companyDetailContent"></div>
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
      <!-- 全部子任务 -->
      <el-dialog :visible.sync="quanbuzirenwu" width="40%">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">全部子任务</div>
        <br />
        <el-table
          :data="zirenwu"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
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
      <!-- 子任务详情 + 下载 -->
      <el-dialog :visible.sync="XZJXQ" width="50%">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">子任务详情</div>
        <br />
        <el-form ref="form" :model="addList3" label-width="10px">
          <el-row>
            <el-col>
              <el-form-item label>
                <div>{{ zirenwuXX}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <br />
          <!-- <el-card class="box-card"> -->
          <div slot="header" class="clearfix"></div>
          <div>
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">附件下载</div>
            <el-table :data="fujian" class="customer-table" :show-header="false">
              <el-table-column label="序号" type="index" width="20" align="center"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-link @click.native="downloadFile(scope.row)">{{scope.row.realName}}</el-link>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="realPath" label="真实地址" v-if="YinCang===0"></el-table-column> -->
            </el-table>
          </div>
          <!-- </el-card> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="xiazaiZRWFJ">打包下载</el-button>
          <el-button type="primary" @click="XZJXQ = false">关 闭</el-button>
        </span>
      </el-dialog>
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
              class="upload-demo"
              action="/api/MainTaskInformation/import"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleAvatarSuccess"
              multiple
              :limit="10"
              ref="upload"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传文件不能超过3个</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ZRWXG = false">取 消</el-button>
          <el-button type="primary" @click="XGZRW">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 文件历史 -->
      <el-dialog title :visible.sync="fileHistoryDia" width="55%">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">文件历史</div>
        <br />
        <div>
          <el-table
            :data="tableData6"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="序号" type="index" width="55" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fileName" label="文件名">
              <template slot-scope="scope">
                <el-link @click.native="downloadFile(scope.row)">{{scope.row.fileName}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="publishingCompanyName" label="发布企业" width="180" align="center"></el-table-column>
            <el-table-column prop="fileType" width="100" label="文件类型">
              <template slot-scope="scope">
                <span v-if="scope.row.fileType === 0">合同文件</span>
                <span v-else-if="scope.row.fileType === 1">发货清单</span>
              </template>
            </el-table-column>
            <el-table-column prop="filePath" width="100" label="文件地址" v-if="yinCang === 0"></el-table-column>
            <el-table-column prop="uploadTime" label="上传时间">
              <template slot-scope="scope">
                <el-span>{{scope.row.uploadTime | formatDate}}</el-span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
            logo: "",
      //显示评价的
      reMarkId:0,
      //
      loading:true,
      //图片赋值次数
      TPDZCS:1,
      //企业详情路径
      companyDetailContent: "",
            errorImg00: 'this.src="' + require("../company/2.jpg") + '"',
      //默认企业图片
      errorImg01: 'this.src="' + require("../company/1.png") + '"',
      //默认营业执照
      errorImg02: 'this.src="' + require("../company/营业执照.jpg") + '"',
      //默认税务登记
      errorImg03: 'this.src="' + require("../company/税务登记证.jpg") + '"',
      usernameX: localStorage.getItem("ms_username"),
      //
      zirenwuXX: "",
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
      //全部子任务
      quanbuzirenwu: false,
      //子任务详情和下载
      XZJXQ: false,
      //子任务修改
      ZRWXG: false,
      //合同历史记录
      fileHistoryDia: false,
      activeBZT: "",
      //主任务ID
      mainTaskID: 0,
      //主任务名称
      mainTaskName: "",
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
      //行业分类列表
      xuanzelist: [],
      cateProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: true
      },
      //选择是设计任务还是流通任务
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
        { id: "0", label: "是" },
        {
          id: "1",
          label: "否"
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
      //申请显示
      shenqing: "none",
      //供应商列表显示
      visiblehexin: "none",
      sm: "none", //私密
      busm: "none", //不私秘
      //上传的文件路径
      technicalFile: [],
      //全部路径
      technicalFileWanzheng: "",
      //拆解文件个数
      shangchuancishu: 0,
      //yaoqing，simi的
      cooList: { shifouyaoqing: "", shifousimi: "" },
      //供应商列表
      SupplierListInt: "",
      //级联选择框双向绑定到的数组
      selectCateKeys: [],
      //主行业列别ID
      mainStaskTypeID: "",
      //子行业类别ID
      subStaskTypeID: "",
      //附件
      fujian: [
        {
          realName: "",
          realPath: ""
        }
      ],
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
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      zirenwu: [],
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" }
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
      imgsrc: "",
      taskID: "",
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
      },
      shuiwudengjizheng: require("../company/税务登记证.jpg"),
      qiyezhizhao: require("../company/营业执照.jpg")
    };
  },

  filters: {
    formatDate(time) {
      if (time != 0) {
        var index = time.lastIndexOf(".");
        time = time.substring(0, index);
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      } else {
        return "暂未开始";
      }
    }
  },
  created() {
    this.getParams();
    this.showData();
  },
  methods: {
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
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        //taskID: this.taskId,
        url: row.filePath
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/DownloadTelFile",
          data: data,
          responseType: "blob", //服务器返回的数据类型
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/octet-stream" })
          );
          link.setAttribute("download", row.fileRealName);
          document.body.appendChild(link);
          link.click();
        });
    },
    CKLSHT(row) {
      this.fileHistoryDia = true;
      var that = this;
      var data = Qs.stringify({
        taskId: row.taskId,
        fileType: "0"
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/getFileHistory",
          data: data
        })
        .then(response => {
          console.log(response)
          this.tableData6 = response.data.allData;
          this.fileHistoryDia = true;
        });
    },
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
          type: "warning"
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
          SupperListINt: this.SupplierListInt
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
            data: data
          })
          .then(response => {
            if (response.data != null) {
              this.$message.success("修改成功");
              this.$refs.upload.clearFiles();
              this.technicalFileWanzheng = "";
              this.technicalFile = "";
              this.shangchuancishu = "";
              //this.getData();
            }
          })
          .catch(error => {
            if (error != null) {
              this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
                type: "warning"
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
    //XG
    XG() {
      this.addData();
      this.ZRWXG = true;
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
    //上传后文件路径赋值
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
    //是否发布（私密）
    simizhiding(coo) {

      if (coo == 0) {
        this.busm = "inline";
        this.sm = "none";
      } else {
        this.sm = "inline";
        this.busm = "none";
      }
    },
    //申请与邀请的显示变化
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

    //级联选中框选中变化项会用到这个函数主
    handleChange() {
      this.mainStaskTypeID = this.selectCateKeys[0];
      this.subStaskTypeID = this.selectCateKeys[1];

    },
    // 查询任务列别及供应商列表
    addData() {
      var that = this;
      var data = Qs.stringify({
        PId: "0",
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
    xiazaiTaskDetail() {
      this.XZJXQ = true;
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskID
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/selectZXX",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          this.zirenwuXX = response.data.allData;
        });
    },
    ziTaskDetail(row) {
      this.quanbuzirenwu = true;
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          this.zirenwu = response.data.allData.b;
        });
    },
    //提交次数 背景颜色变化
    styleswith() {
      if (this.formZL.designCount >= 0 && this.formZL.designCount < 3) {
        document.getElementById("word").innerHTML="优"
        document.getElementById("word").style.color = "#00D1B2"
        document.getElementById("one").style.background = "#00D1B2";
      }
      if (this.formZL.designCount > 2 && this.formZL.designCount < 4) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
                document.getElementById("word").innerHTML="良"
        document.getElementById("word").style.color = "orange"
      }
      if (this.formZL.designCount > 4 || this.formZL.designCount == 4) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
                document.getElementById("word").innerHTML="差"
        document.getElementById("word").style.color = "red"
      }
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },

    showData() {

      var that = this;
      var data = Qs.stringify({
        subStaskID: this.taskId
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/list",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response)
          this.fujian = response.data.allData.QBWJ;
          this.WZLJ = response.data.allData.WZLJ;
          this.WJSM = response.data.allData.SM;
          this.tableData1 = response.data.allData.b;
          this.cooList.shifousimi = response.data.allData.a[0].sssm;
          this.selectCateKeys[0] =
            response.data.allData.a[0].taskCategoryMainId;
          this.selectCateKeys[1] = response.data.allData.a[0].taskCategory;
          if (this.cooList.shifousimi == 0) {
            this.cooList.shifousimi = "是";
          } else {
            this.cooList.shifousimi = "否";
          }
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

          this.radarData.radarData = response.data.allData.f;

          that.$refs.QradarChart.getCharts1();
          if (response.data.allData.f === null) {
            this.milepostActive5 = 0;
          }
          if (response.data.allData.f != null) {
            this.formZL = response.data.allData.d[0];
                                  this.reMarkId = 1;

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
          if (this.cool.taskType === 0) {
            this.cool.taskType = "设计任务";
          } else {
            this.cool.taskType = "流通任务";
          }
          if (this.milepostActive >= 0) {
            this.milepost[0].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].applyTime
            );
            if (this.milepostActive > 0) {
              this.milepost[1].description = this.$options.filters[
                "formatDate"
              ](response.data.allData.c[0].planUploadTime);
            }
            if (this.milepostActive > 1) {
              this.milepost[2].description = this.$options.filters[
                "formatDate"
              ](response.data.allData.c[0].checkPlanTime);
            }
            if (this.milepostActive > 2) {
              this.milepost[3].description = this.$options.filters[
                "formatDate"
              ](response.data.allData.d[0].checkContractTime);
            }
            if (this.milepostActive > 3) {
              this.milepost[4].description = this.$options.filters[
                "formatDate"
              ](response.data.allData.e[0].designerAcceptTime);
            }
            if (this.milepostActive > 4) {

              this.milepost[5].description = this.$options.filters[
                "formatDate"
              ](response.data.allData.e[0].finishTime);
            }
          }
          this.mainTaskID = response.data.allData.a[0].mainTaskId;
          this.mainTaskName = response.data.allData.a[0].mainTaskName;
          this.taskID = response.data.allData.a[0].taskId;

        });
    },
    goBack() {
      if (this.mainTaskID == 0) {
        this.$router.push({
          path: "/admin/designTask"
        });
      } else {
        this.$router.push({
          path: "/admin/substaskDetail",
          query: {
            mainTaskID: this.mainTaskID
          }
        });
      }
    },
    //申请通过与拒绝
    SQTG(row) {
      this.$confirm("确定将申请审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          ID: row.id,
          taskID: row.taskId,
          companyID: row.companyId,
          companyName: row.companyName
        });
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
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId,
          ID: row.id,
          companyID: row.companyId,
          companyName: row.companyName
        });
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
        var that = this;
        var data = Qs.stringify({
          taskID: row.id,
          companyId: row.companyId,
          leixing: "jihuashu"
        });
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/DownloadHTHT",
            data: data,
            responseType: "blob"
          })
          .then(response => {

            this.download(response.data, "JHS");
          })
           .catch(error => {
            if (error != null) {
              this.$confirm("文件不存在或者文件路径有误", "提示", {
                type: "warning"
              });
              
            }
         });
      
    },
    //下载子任务附件
    xiazaiZRWFJ() {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskID,
        leixing: "ZIRWHJ"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {

          this.download(response.data, "ZRWFJ");
        });
    },

    // 下载文件
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
        link.setAttribute("download", "计划书.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "ZRWFJ") {
        link.setAttribute("download", "子任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
    //合同审核
    HTSHTG(row) {
      this.$confirm("确定将合同审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/HTSHTG",
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
              this.$message({
                message: "审核失败",
                type: "warning"
              });
            }
          });
    
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
        taskID: row.taskId,
        leixing: "hetong"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          this.download(response.data, "HT");
        });
    },
    //跳转虚拟机
    LJTZ(row) {
        console.log(row.gitadress)
        window.location.href = row.gitadress; 
    },
    //设计通过
    SJTG(row) {
      this.$confirm("确定将设计审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/SJSHTG",
          data: data
        });
        this.GBXJ();
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
        //改变星级别
    GBXJ() {
        var that = this;
        var data = Qs.stringify({
          username: this.usernameX
        });
        that.axios({
          method: "post",
          url: "/api/sumRemarkData",
          data: data
        })
        .then(response => {
        });
        this.showData();

    },
    companyDetail(row) {
      var that = this;
      var data = Qs.stringify({
        CompanyID: row.companyId
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/showCompanyDetal",
          data: data
        })
        .then(response => {
          if(this.TPDZCS ==1){
            this.logo = response.data.allData.logo;
            this.form = response.data.allData.companyDetail[0];
          this.companyId = response.data.allData.companyDetail[0].companyId;
          this.companyName = response.data.allData.companyDetail[0].companyName;
                    this.companyDetailContent =
            response.data.allData.companyDetailContent;
          this.imgsrc = response.data.allData.companyPicture;
          this.qiyezhizhao =
            response.data.allData.BusinessLicence;
          this.shuiwudengjizheng =
            response.data.allData.tRCertificate;
            this.TPDZCS = this.TPDZCS + 1;
          }
          

        });
      this.addVisibleCD = true;
    }
  }
};
</script>

<style lang="scss">
  //企业详情
  .leftDet {
    float: left;
    text-align: left;
    width: 90%;
    padding: 0px 30px 0px;
  }
.mainStaskDetaul {
  .customer-table{
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .el-dialog__header{
    padding-top:0%;
    padding-bottom: 0%;
  }
  .loading1 {
    height: 400px;
  }
  .el-dialog__footer {
  padding-right: 20px;
}
  .el-dialog__body {
    padding-right: 20px;
  }
  #demo {
    width: 20px; /*设置div宽度为500像素*/
    background: #000; /*设置div背景色为zhidao黑色*/
  }
  //详细里面的文字颜色
  .el-textarea.is-disabled .el-textarea__inner {
    color: #606266;
  }
  //修改按钮样式
  .XG {
    padding-top: 3px;
    padding-bottom: 3px;
  }
  //按钮样式
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

.el-table{
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
  .formYS .el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }

  .formYS .el-input.is-disabled .el-input__inner {
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
    width: 85px;
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

  //图片样式
  .el-image__error,
  .el-image__inner,
  .el-image__placeholder {
    width: 500px;
    height: 200px;
  }
  .table2 {
    display: table-cell !important;
    /* width: 100%; */
  }
  .table3 {
    display: table-cell !important;
    /* width: 100%; */
  }
  //营业制造
  .yingyezhizhao {
    width: 600px;
    height: 300px;
  }
  .XX {
    text-align: left;
  }
}
</style>
