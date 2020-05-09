<template>
  <div class="circulationDet">
    <el-main style="overflow:hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-steps :active="milepostActive" align-center>
        <el-step
          v-for="(stpesdata, key) in milepost"
          :title="stpesdata.title"
          :icon="stpesdata.icon"
          :description="stpesdata.description"
          :key="key"
        ></el-step>
      </el-steps>
      <br />
      <br />

      <div>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">基本信息</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <br />
        <el-card class="box-card">
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
                  <el-input v-bind:value="taskTpyeName" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="一级行业类别">
                  <el-input
                    v-model="cool.taskCategoryMain"
                    :readonly="true"
                    style="text-align:center"
                  ></el-input>
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
                <el-form-item label="截止时间">
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
      </div>
      <br />
      <br />
      <div>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请列表</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-table
          :data="tableData1"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="taskName" label="需求名称"></el-table-column>
          <el-table-column prop="applyWay" width="100" label="获取方式">
            <template slot-scope="scope">
              <span v-if="scope.row.applyWay === 0">邀请</span>
              <span v-else-if="scope.row.applyWay === 1">申请</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyState" width="120" label="申请/邀请状态">
            <template slot-scope="scope">
              <span v-if="scope.row.checkApplyState === 0">待审核</span>
              <span v-else-if="scope.row.checkApplyState === 1">通过</span>
              <span v-else>拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请/邀请时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.applyTime === 0">暂未开始</el-span>
              <el-span v-else>{{scope.row.applyTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyTime" label="审核时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.checkApplyTime === 0">暂未审核</el-span>
              <el-span v-else>{{scope.row.checkApplyTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <div v-if="milepostActive === 0">
                <div v-if="scope.row.checkApplyState <2">
                  <el-button @click="accept(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="noAccept(scope.row)" type="text" size="small">拒绝</el-button>
                </div>
              </div>
              <div v-if="scope.row.checkApplyState === 2">
                <el-button @click="refuseReason(scope.row)" type="text" size="small">拒绝原因</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="show>0">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务计划</div>
        <br />
        <el-table
          :data="tableData2"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="taskName" label="需求名称"></el-table-column>
          <el-table-column prop="checkPlanState" width="100" label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.checkPlanState === 0">待上传</span>
              <span v-else-if="scope.row.checkPlanState === 1">待审核</span>
              <span v-else-if="scope.row.checkPlanState === 2">通过</span>
              <span v-else-if="scope.row.checkPlanState === 3">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="planUploadTime" label="上传时间">
            <template slot-scope="scope">
              <span v-if="+scope.row.planUploadTime === 0">暂未上传</span>
              <span v-else>{{scope.row.planUploadTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkPlanTime" label="审核时间">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkPlanTime === 0">暂未审核</span>
              <span v-else>{{scope.row.checkPlanTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                @click="upLoadPlanT()"
                type="text"
                size="small"
                v-show="scope.row.checkPlanState === 0"
              >上传</el-button>
              <el-button
                @click="RWJHXZ(scope.row)"
                type="text"
                size="small"
                v-show="scope.row.checkPlanState > 0"
              >下载</el-button>
              <el-button
                @click="refusePlanReason(scope.row)"
                type="text"
                size="small"
                v-show="scope.row.checkPlanState === 3"
              >拒绝原因</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <br />

      <div v-show="show > 0">
        <div v-show="state2 === 2">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">合同管理</div>
          <br />
          <el-table
            :data="tableData4"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="taskName" label="需求名称"></el-table-column>
            <el-table-column prop="contractState" width="100" label="审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.contractState === 0">待上传</span>
                <span v-else-if="scope.row.contractState === 1">待审核</span>
                <span v-else-if="scope.row.contractState === 2">通过</span>
                <span v-else-if="scope.row.contractState === 3">未通过</span>
              </template>
            </el-table-column>
            <el-table-column prop="uploadContractTime" label="上传时间">
              <template slot-scope="scope">
                <span v-if="+scope.row.uploadContractTime === 0">暂未上传</span>
                <span v-else>{{scope.row.uploadContractTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="checkContractTime" label="审核时间">
              <template slot-scope="scope">
                <span v-if="+scope.row.checkContractTime === 0">暂未审核</span>
                <span v-else>{{scope.row.checkContractTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="upLoadConT(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.contractState===0"
                >上传</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="HTFileHistory()"
                  v-show="scope.row.contractState > 0"
                >历史上传</el-button>

                <el-button
                  v-show="scope.row.contractState===1"
                  @click="HTXZ(scope.row)"
                  type="text"
                  size="small"
                >下载</el-button>
                <el-button
                  v-show="scope.row.contractState===2"
                  @click="HTXZ(scope.row)"
                  type="text"
                  size="small"
                >下载</el-button>
                <el-button
                  @click="upLoadConT(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.contractState===3"
                >重新上传</el-button>
                <el-button
                  @click="refuseConReason(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.contractState===3"
                >拒绝原因</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <br />
        </div>
      </div>

      <div v-show="show>1">
        <div v-show="state3===2">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">发货清单</div>
          <br />
          <el-table
            :data="tableData5"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="taskName" label="需求名称"></el-table-column>
            <el-table-column prop="taskCategory" label="需求类别"></el-table-column>
            <el-table-column prop="taskCategoryPart" label="需求类别"></el-table-column>

            <el-table-column prop="demandorCheckDesignState" width="100" label="验收状态">
              <template slot-scope="scope">
                <span v-if="scope.row.demandorCheckDesignState === 0">待提交</span>
                <span v-else-if="scope.row.demandorCheckDesignState === 1">待审核</span>
                <span v-else-if="scope.row.demandorCheckDesignState === 2">通过</span>
                <span v-else-if="scope.row.demandorCheckDesignState === 3">未通过</span>
              </template>
            </el-table-column>

            <el-table-column prop="demandorCheckDesignTime" label="验收时间">
              <template slot-scope="scope">
                <el-span v-if="+scope.row.demandorCheckDesignTime === 0">暂未验收</el-span>
                <el-span v-else>{{scope.row.demandorCheckDesignTime | formatDate}}</el-span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="upLoadCirculationPlan(scope.row)"
                  type="text"
                  size="small"
                  v-show="scope.row.demandorCheckDesignState===0"
                >上传</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="FHQDFileHistory()"
                  v-show="scope.row.demandorCheckDesignState > 0"
                >历史上传</el-button>
                <div v-show="scope.row.demandorCheckDesignState > 1">
                  <el-button @click="FFQDXZ(scope.row)" type="text" size="small">下载</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div v-show="show > 4" class="det">
        <br />
        <br />
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务评价</div>
        <br />
        <br />
        <div v-if="reMarkId === 0">
          <h3 align-center>核心企业暂未评价</h3>
        </div>
        <div v-if="reMarkId === 1">
          <!-- 雷达图 -->
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
      </div>

      <!-- 申请拒绝原因 -->
      <el-dialog :visible.sync="addVisible1" width="50%">
        <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请被拒绝的原因</div>
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList1" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="被拒绝原因">
                <el-input v-model="addList1.refuseApplyMessage" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible1 = false">确定</el-button>
        </span>
      </el-dialog>

      <!-- 任务计划拒绝原因 -->
      <el-dialog :visible.sync="addVisible2" width="50%">
        <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">计划书被拒绝的原因</div>
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList2" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="被拒绝原因">
                <el-input v-model="addList2.refusePlanMessage" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible2 = false">确定</el-button>
        </span>
      </el-dialog>

      <!-- 合同拒绝原因 -->
      <el-dialog :visible.sync="addVisible3" width="50%">
        <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">合同拒绝原因</div>
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList3" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="被拒绝原因">
                <el-input v-model="addList3.contractRefuseReason" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible3 = false">确定</el-button>
        </span>
      </el-dialog>

      <!-- 流通验收拒绝原因 -->
      <!-- <el-dialog :visible.sync="addVisible4" width="50%">
        <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">流通验收拒绝原因</div>
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList5" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="被拒绝原因">
                <el-input v-model="addList5.demandorRefuseReason" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible4 = false">确定</el-button>
        </span>
      </el-dialog>-->

      <!-- 计划书上传 -->
      <el-dialog :visible.sync="planbook" width="400px" :before-close="handleClose">
        <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">计划书上传</div>
        <el-upload
          ref="upload"
          action="/api/supplier/import"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess1"
          multiple
          :auto-upload="false"
        >
          <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
          <br />
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
            align-center
          >上传到服务器</el-button>
        </el-upload>
      </el-dialog>

      <!-- 上传合同 -->
      <el-dialog title="上传合同" :visible.sync="conbook" width="400px" :before-close="handleClose">
        <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">上传合同</div>
        <el-upload
          ref="upload"
          action="/api/supplier/import"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          multiple
          :auto-upload="false"
        >
          <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
          <br />
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
            align-center
          >上传到服务器</el-button>
        </el-upload>
      </el-dialog>

      <!-- 上传流通规格书 -->
      <el-dialog :visible.sync="upCirculation" width="400px" :before-close="handleClose">
        <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">上传发货清单</div>
        <br />
        <br />
        <el-upload
          ref="upload"
          action="/api/supplier/import"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess2"
          multiple
          :auto-upload="false"
        >
          <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
          <br />
          <el-button
            style="margin-left:10px;"
            size="small"
            type="success"
            @click="submitUpload"
            align-center
          >上传到服务器</el-button>
        </el-upload>
      </el-dialog>

      <!-- 文件历史 -->
      <el-dialog title :visible.sync="fileHistoryDia" width="55%">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">文件历史</div>
        <br />
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

      <!-- 公司信息 -->
      <el-dialog :visible.sync="companyDag" width="50%">
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业图片</div>
        <div width="500" align="center" height="200px">
          <el-image :src="imgsrc" :onerror="errorImg01"></el-image>
        </div>
        <br />
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业营业执照</div>
        <div width="500" align="center" height="200px">
          <el-image :src="qiyezhizhao" :onerror="errorImg02"></el-image>
        </div>
        <br />
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业税务登记证</div>
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
          <el-form ref="form" :model="form" label-width="100px">
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
                  <el-input
                    v-bind:value="companyMessage.foundingTime | formatDate"
                    :readonly="true"
                  ></el-input>
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
                <el-form-item label="企业详情">
                  <br />
                  <div class="leftDet" v-html="companyDetailContent"></div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="companyDag = false">关 闭</el-button>
        </span>
      </el-dialog>

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
          <el-table :data="tableData7" class="customer-table" :show-header="false">
            <el-table-column>
              <template slot-scope="scope">
                <el-link @click.native="downloadFile(scope.row)">{{scope.row.fileName}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="filePath" label="真实地址" v-if="yinCang===0"></el-table-column>
          </el-table>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="xiazaiZRWFJ">打包下载</el-button>
          <el-button type="primary" @click="taskDetilDag = false">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- 子任务详情 -->
      <el-dialog :visible.sync="quanbuzirenwu" width="50%">
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
    </el-main>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "../../design/designDetails/dataChange";
import radarChart from "../../circulation/circulationDetails/radarChart";
export default {
  components: {
    "radar-chart": radarChart
  },
  name: "circulationDet",
  data() {
    return {
      companyDetailContent: "",
      //默认企业图片
      errorImg01: 'this.src="' + require("../../../company/2.jpg") + '"',
      //默认营业执照
      errorImg02:
        'this.src="' + require("../../../company/税务登记证.jpg") + '"',
      //默认税务登记
      errorImg03: 'this.src="' + require("../../../company/营业执照.jpg") + '"',
      //商品细节的弹框
      companyDag: false,
      //全部子任务
      quanbuzirenwu: false,
      //子任务详情和下载
      taskDetilDag: false,
      //质量完成图数据源
      form: {
        designCount: ""
      },
      stpesdata: [],
      //雷达图的数据定义
      radarData: {
        radarData: []
      },
      //表单数据
      cool: {},
      designTask: [
        {
          Id: "",
          userId: "",
          userName: ""
        }
      ],
      //申请表数据
      tableData1: [],
      mainTaskID: 0,
      taskTpyeName: "",
      //任务计划表数据
      tableData2: [],
      tableData4: [],
      //流通提交数据
      tableData5: [],

      //文件历史数据
      tableData6: [
        {
          taskName: "",
          uploadTime: "",
          filePath: "",
          fileName: "",
          fileType: 0,
          publishingCompanyName: ""
        }
      ],
      tableData7: [],
      zirenwu: [],
      fileHistoryDia: false,
      //文件类型
      fileType: 0,
      //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" }
      ],
      //申请被拒绝原因
      addList1: {
        refuseApplyMessage: ""
      },
      //计划书拒绝原因
      addList2: {
        refusePlanMessage: ""
      },
      addList3: {
        contractRefuseReason: ""
      },
      addList4: {
        SJrefuseReason: ""
      },
      addList5: {
        demandorRefuseReason: ""
      },
      //计划书上传
      planbook: false,
      //合同上传
      conbook: false,
      //流通人员分配
      dialogTableVisible: false,
      //申请计划拒绝弹窗
      addVisible1: false,
      //计划书拒绝弹窗
      addVisible2: false,
      //合同拒绝弹窗
      addVisible3: false,
      //流通拒绝弹窗
      addVisible4: false,
      //状态
      state: "",
      state2: 0,
      state3: 0,
      designcount: 0,
      // 默认步骤数
      milepostActive: 0,
      // 动态添加类名
      stepActive: "stepActive",
      //任务Id
      taskId: 0,
      //表格显示控制
      show: 0,
      //文件上传数据
      limitNum: 1,
      formLabelWidth: "100px",
      form: {},
      fileList: [],
      userName: localStorage.getItem("ms_username"),
      design1: "",
      //文件上传数
      shangchuancishu: 0,
      jingyingfanwei: "",
      companyId:0,
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      giveDesigner: 0, //人员分配按钮控制
      designerNub: 0,
      reMarkId: 1,
      designRefuseReason: false,
      upCirculation: false,
      //需要隐藏控制器
      yinCang: 1,
      //测试用taskId
      textTaskId: 40,
      circulationCount: "", //流通完成质量
      companyMessage: [
        {
          companyId: 0,
          companyName: "",
          businessTel: 0,
          province: "",
          city: "",
          companyName: "",
          companyCategory: "",
          address: "",
          postcode: 0,
          foundingTime: "",
          brNumber: "",
          product: "",
          email: "",
          businessName: "",
          officeNumber: 0,
          registeredCapital: 0,
          totalAssets: 0,
          fixedAssets: 0,
          currentAssets: 0,
          legalPerson: "",
          workerNumber: 0,
          deposit_Bank: "",
          bankNumber: 0,
          introduction: ""
        }
      ],
      imgsrc: require("../../../company/2.jpg"),
      shuiwudengjizheng: require("../../../company/税务登记证.jpg"),
      qiyezhizhao: require("../../../company/营业执照.jpg")
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  created() {
    this.getParams();
    this.showData();
    this.getLDData(); //雷达图数据查找
    this.getCirculationCount(); //提交次数 背景颜色变化
    this.getFilePath();
  },
  methods: {
    //技术文件
    getFilePath() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getFilePath",
          data: data
        })
        .then(response => {
          console.log(response);
          this.tableData7 = response.data.allData;
        });
    },
    //下载子任务附件
    xiazaiZRWFJ() {
      console.log("shenme");
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
          console.log("cap");
          console.log(response);
          this.download(response.data, "ZRWFJ");
        });
    },
    FHQDFileHistory() {
      this.fileType = 1;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        fileType: this.fileType
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getFileHistory",
          data: data
        })
        .then(response => {
          // console.log(response);
          this.tableData6 = response.data.allData;
          this.fileHistoryDia = true;
        });
    },
    HTFileHistory() {
      this.fileType = 0;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        fileType: this.fileType
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getFileHistory",
          data: data
        })
        .then(response => {
          // console.log(response);
          this.tableData6 = response.data.allData;
          this.fileHistoryDia = true;
        });
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },
    //提交次数 背景颜色变化
    styleswith() {
      if (this.form.circulationCount > -4) {
        document.getElementById("one").style.background = "#00D1B2";
      }
      if (this.form.circulationCount < -3 && this.form.circulationCount > -8) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
      }
      if (this.form.circulationCount < -7 || this.form.circulationCount == -8) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
      }
    },
    //任务计划下载
    RWJHXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
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
          console.log(response);
          this.download(response.data, "JHS");
        });
    },
    //合同下载
    HTXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "hetong"
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/Download",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          console.log(response);
          this.download(response.data, "HT");
        });
    },
    //发货清单下载
    FFQDXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "fahuoqingdan",
        responseType: "blob"
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/Download",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          console.log(response);
          this.download(response.data, "FFQD");
        });
    },
    getCirculationCount() {
      var that = this;
      var data = Qs.stringify({
        // taskId: this.taskId
        taskId: this.taskId
      });
      that
        .axios({
          method: "post",
          url: "/api/findCirculationCount",
          data: data
        })
        .then(response => {
          (this.form.circulationCount = response.data.allData),
            this.styleswith();
        });
    },
    //个别文件下载
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
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
          console.log(response);
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
        link.setAttribute("download", "设计文档.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "FFQD") {
        link.setAttribute("download", "发货清单.zip");
      } else if (leixing === "ZRWFJ") {
        link.setAttribute("download", "子任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
    //数据显示
    showData() {
      console.log("你好");
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.tableData1 = response.data.allData.b;
          this.tableData2 = response.data.allData.b;
          this.tableData3 = response.data.allData.a;
          this.tableData4 = response.data.allData.a;
          this.tableData5 = response.data.allData.a;
          this.cool = response.data.allData.a[0];
          this.state = response.data.allData.a[0].taskState;
          this.state2 = response.data.allData.b[0].checkPlanState;
          this.state3 = response.data.allData.a[0].contractState;
          this.designcount = response.data.allData.a[0].designCount;
          this.companyId = response.date.allData.a[0].companyId;
          if (this.taskType == 0) {
            this.taskTpyeName = "设计需求";
          } else {
            this.taskTpyeName = "流通需求";
          }
          if (this.state == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.state == "计划提交") {
            this.milepostActive = 1;
            this.show = 1;
          } else if (this.state == "任务进行中") {
            this.milepostActive = 2;
            this.show = 2;
          } else if (this.state == "验收") {
            this.milepostActive = 3;
            this.show = 4;
          } else if (this.state == "完成") {
            this.milepostActive = 4;
            this.show = 5;
          } else {
            this.milepostActive = 6;
            if (response.data.allData.b[0].refuseApplyMessage != null) {
              this.show = 0;
            } else if (response.data.allData.b[0].refusePlanMessage != null) {
              this.show = 1;
            }
          }
          if (response.data.allData.a[0].supplierDistributionState == 0) {
            this.giveDesigner = 1;
          }

          if (this.milepostActive > 0) {
            this.milepost[0].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].applyTime
            );
          }
          if (this.milepostActive > 1) {
            this.milepost[1].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].checkPlanTime
            );
          }
          if (this.milepostActive > 2) {
            this.milepost[2].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].publishTime
            );
          }
          if (this.milepostActive > 3) {
            this.milepost[4].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].demandorCheckDesignTime
            );
          }
          if (this.milepostActive >= 4) {
            this.milepost[5].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].finishTime
            );
          }
          this.mainTaskID = response.data.allData.a[0].mainTaskId;
          console.log("合同状态" + this.show3);
        });
    },
    //返回列表
    goBack() {
      this.$router.push({
        path: "/admin/designTaskq",
        query: {
          taskId: this.taskId
        }
      });
    },
    //接受通过
    accept(row) {
      this.$confirm("确定接受需求么？", "提示", {
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
          url: "/api/supplier/accept",
          data: data
        });
        this.$message({
          message: "接受成功",
          type: "success"
        });
        this.showData();
      });
    },
    //接受不通过
    noAccept(row) {
      this.$confirm("确定拒绝需求么？", "提示", {
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
          url: "/api/supplier/noAccept",
          data: data
        });
        this.$message({
          message: "拒绝通过",
          type: "success"
        });
        this.showData();
      });
    },
    //申请拒绝原因
    refuseReason(row) {
      this.addVisible1 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,  
        userName: this.userName
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList1 = response.data.allData.b[0];
        });
    },
    //计划书拒绝原因
    refusePlanReason(row) {
      this.addVisible2 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList2 = response.data.allData.b[0];
        });
    },
    //合同拒绝原因
    refuseConReason(row) {
      this.addVisible3 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList3 = response.data.allData.a[0];
        });
    },
    //流通拒绝原因
    refuseDesignReason(row) {
      this.addVisible4 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList5 = response.data.allData.a[0];
        });
    },
    //上传计划书方法
    upLoadPlanT() {
      this.planbook = true;
    },
    //上传合同方法
    upLoadConT() {
      this.conbook = true;
    },
    //上传流通计划书
    upLoadCirculationPlan() {
      this.upCirculation = true;
    },
    //步骤图数据查找
    getBZData() {
      var that = this;
      // console.log(this.taskId);
      var data = Qs.stringify({
        taskId: this.taskId
      });
      //console.log(data);

      that
        .axios({
          method: "post",
          url: "/api/evaluateDetils",
          data: data
        })
        .then(response => {
          if (this.milepostActive > 0) {
            this.milepost[0].description = this.$options.filters["formatDate"](
              response.data.allData[0]
            );
          }
          if (this.milepostActive > 1) {
            this.milepost[1].description = this.$options.filters["formatDate"](
              response.data.allData[1]
            );
          }
          if (this.milepostActive > 2) {
            this.milepost[2].description = this.$options.filters["formatDate"](
              response.data.allData[2]
            );
          }
          if (this.milepostActive > 3) {
            this.milepost[3].description = this.$options.filters["formatDate"](
              response.data.allData[4]
            );
          }
          if (this.milepostActive >= 4) {
            this.milepost[4].description = this.$options.filters["formatDate"](
              response.data.allData[5]
            );
          }
        });
    },
    //雷达图数据查找
    getLDData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      that
        .axios({
          method: "post",
          url: "/api/remarkDetils",
          data: data
        })
        .then(response => {
          // this.radarData.radarData.push( response.data.allData.taskLength),
          // this.radarData.radarData.push( response.data.allData.planLength),
          // this.radarData.radarData.push( response.data.allData.checkLength),
          // this.radarData.radarData.push( response.data.allData.applyLength),
          // this.radarData.radarData.push( response.data.allData.demandorCheckLength),
          this.radarData.radarData = response.data.allData;
          if (response.data.allData[0] == null) {
            this.reMarkId = 0;
          }

          that.$refs.QradarChart.getCharts1();
          // this.$refs.QadarChart.getCharts();
          // this.getCharts1();
          // console.log(response.data.allData);
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      this.technicalFileWanzheng =
        this.technicalFileWanzheng +
        this.technicalFile[this.shangchuancishu] +
        "linklink";
      this.shangchuancishu = this.shangchuancishu + 1;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File: this.technicalFileWanzheng
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/textImportCon",
          data: data
        })
        .then(response => {
          this.technicalFileWanzheng = "";
          this.shangchuancishu = 0;
        });
      // this.$router.go(0);
    },
    handleAvatarSuccess1(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      this.technicalFileWanzheng =
        this.technicalFileWanzheng +
        this.technicalFile[this.shangchuancishu] +
        "linklink";
      this.shangchuancishu = this.shangchuancishu + 1;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File1: this.technicalFileWanzheng
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/textImportPlan",
          data: data
        })
        .then(response => {
          this.technicalFileWanzheng = "";
          this.shangchuancishu = 0;
        });
      this.$router.go(0);
    },

    handleAvatarSuccess2(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      this.technicalFileWanzheng =
        this.technicalFileWanzheng +
        this.technicalFile[this.shangchuancishu] +
        "linklink";
      this.shangchuancishu = this.shangchuancishu + 1;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File2: this.technicalFileWanzheng
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/textImportCir",
          data: data
        })
        .then(response => {
          this.technicalFileWanzheng = "";
          this.shangchuancishu = 0;
        });
      this.$router.go(0);
    },
    //提交拒绝原因
    SJJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        HTrefuseReason: this.addList4.SJrefuseReason
      });
      console.log(data),
        that.axios({
          method: "post",
          url: "/api/supplier/designRefuse",
          data: data
        });
      this.$message.success("提交成功");
      this.addList4 = {};
      this.designRefuseReason = false;
      this.showData();
    },
    companyDetil(row) {
      this.getCompay();
      this.companyDag = true;
    },
    taskDetil(row) {
      this.taskDetilDag = true;
    },
    //需求方信息弹窗
    getCompay() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/getCompanyFormBytaskId",
          data: data
        })
        .then(response => {
          this.companyMessage = response.data.allData.companyDetail[0];
          this.companyId = response.data.allData.companyDetail[0].companyId;
          this.companyName = response.data.allData.companyDetail[0].companyName;
          this.imgsrc = response.data.allData.companyDetail[0].companyPicture;
          this.qiyezhizhao =
            response.data.allData.companyDetail[0].businessLicence;
          this.shuiwudengjizheng =
            response.data.allData.companyDetail[0].tRCertificate;
          this.jingyingfanwei = response.data.allData.b;
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
          response.data.allData.companyDetail[0].tRCertificate;
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
        });
    },
    ziTaskDetail() {
      this.quanbuzirenwu = true;
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
        })
        .then(response => {
          this.zirenwu = response.data.allData.b;
          console.log(this.zirenwu);
        });
    }
  }
};
</script>

<style lang="scss">
.circulationDet {
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
    font-size: 11px;
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
  .leftDet {
    float: left;
    text-align: left;
    width: 95%;
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
  .el-dialog__header {
    padding: 0px 0px 0px;
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
}
</style>