<template>
  <div class="Det">
    <el-main style="overflow:hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-steps :active="milepostActive1" align-center>
            <el-step
              v-for="(stpesdata, key) in milepost1"
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
                <el-form-item label="需求名称:">
                  <el-input v-model="cool.mainTaskName" :readonly="true" style="text-align:center"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="子任务名称:">
                  <el-input v-model="cool.taskName" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="发布企业名称:">
                  <el-input v-model="cool.companyName" :readonly="true" style="text-align:center"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="接受企业名称:">
                  <el-input v-model="cool.acceptCompanyName" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="任务截止日期:">
                  <el-input
                    v-bind:value="cool.deadline|formatDate"
                    :readonly="true"
                    style="text-align:center"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="需求方电话:">
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
              <el-span v-if="+scope.row.applyTime === 0">暂未上传</el-span>
              <el-span v-else>{{scope.row.applyTime | formatDate}}</el-span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyTime" label="审核时间">
            <template slot-scope="scope">
              <el-span v-if="+scope.row.checkApplyTime === 0">暂未上传</el-span>
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
          <el-table-column prop="checkPlanState" width="100" label="计划审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.checkPlanState === 0">待上传</span>
              <span v-else-if="scope.row.checkPlanState === 1">待审核</span>
              <span v-else-if="scope.row.checkPlanState === 2">通过</span>
              <span v-else-if="scope.row.checkPlanState === 3">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="planUploadTime" label="上传时间">
            <template slot-scope="scope">
              <span v-if="+scope.row.planUploadTime === 0">尚未上传</span>
              <span v-else>{{scope.row.planUploadTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkPlanTime" label="审核时间">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkPlanTime === 0">尚未上传</span>
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
            <el-table-column prop="contractState" width="100" label="合同审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.contractState === 0">待上传</span>
                <span v-else-if="scope.row.contractState === 1">待审核</span>
                <span v-else-if="scope.row.contractState === 2">通过</span>
                <span v-else-if="scope.row.contractState === 3">未通过</span>
              </template>
            </el-table-column>
            <el-table-column prop="uploadContractTime" label="上传时间">
              <template slot-scope="scope">
                <span v-if="+scope.row.uploadContractTime === 0">尚未上传</span>
                <span v-else>{{scope.row.uploadContractTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="checkContractTime" label="合同审核时间">
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

                <div v-show="scope.row.contractState===1">
                  <el-button @click="HTXZ(scope.row)" type="text" size="small">下载</el-button>
                </div>
                <div v-show="scope.row.contractState===2">
                  <el-button @click="HTXZ(scope.row)" type="text" size="small">下载</el-button>
                </div>
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
        <div v-show="state3 === 2">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">内部审核</div>
          <br />
          <el-table
            :data="tableData3"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="taskName" label="需求名称"></el-table-column>
            <el-table-column prop="supplierCheckDesignState" width="100" label="审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.supplierCheckDesignState === 0">待提交</span>
                <span v-else-if="scope.row.supplierCheckDesignState === 1">待审核</span>
                <span v-else-if="scope.row.supplierCheckDesignState === 2">通过</span>
                <span v-else-if="scope.row.supplierCheckDesignState === 3">未通过</span>
              </template>
            </el-table-column>
            <el-table-column prop="designerName" width="120" label="设计师">
              <template slot-scope="scope">
                <el-span v-if="+scope.row.designerName === 0">暂未分配设计人员</el-span>
                <el-span v-else>{{scope.row.designerName}}</el-span>
              </template>
            </el-table-column>
            <el-table-column prop="uploadDesignTime" label="设计上传时间">
              <template slot-scope="scope">
                <el-span v-if="+scope.row.uploadDesignTime === 0">暂未上传</el-span>
                <el-span v-else>{{scope.row.uploadDesignTime | formatDate}}</el-span>
              </template>
            </el-table-column>
            <el-table-column prop="supplierCheckDesignTime" label="审核时间">
              <template slot-scope="scope">
                <el-span v-if="+scope.row.supplierCheckDesignTime === 0">暂未上传</el-span>
                <el-span v-else>{{scope.row.supplierCheckDesignTime| formatDate}}</el-span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <div v-show="scope.row.supplierCheckDesignState ===0">
                  <div v-if="giveDesigner === 1">
                    <el-button @click="assignDesigners(scope.row)" type="text" size="small">分配设计人员</el-button>
                  </div>
                </div>
                <div v-show="scope.row.supplierCheckDesignState > 0">
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">查看成果</el-button>
                </div>
                <div v-show="scope.row.supplierCheckDesignState === 1">
                  <el-button @click="designSuccess(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="designRefuse(scope.row)" type="text" size="small">拒绝</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <br />
        </div>
      </div>

      <div v-show="show>1">
        <div v-show="designcount > 0">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计提交</div>
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

            <el-table-column prop="designCount" label="重做次数"></el-table-column>

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
                <el-span v-if="+scope.row.demandorCheckDesignTime === 0">暂未上传</el-span>
                <el-span v-else>{{scope.row.demandorCheckDesignTime | formatDate}}</el-span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  v-show="designcount > 1"
                  @click="refuseDesignReason(scope.row)"
                  type="text"
                  size="small"
                >拒绝原因</el-button>
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
        <!-- 步骤图片 -->
        <div v-if="reMarkId === 1">
          <el-steps :active="milepostActive1" align-center>
            <el-step
              v-for="(stpesdata, key) in milepost1"
              :title="stpesdata.title"
              :icon="stpesdata.icon"
              :description="stpesdata.description"
              :key="key"
            ></el-step>
          </el-steps>
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

      <!-- 分配设计人员 -->
      <el-dialog title="分配设计师" :visible.sync="dialogTableVisible" width="30%">
        <el-form :model="form1">
          <el-form-item label="设计师" :label-width="formLabelWidth">
            <el-select v-model="design1" placeholder="请选择分配人员">
              <el-option
                v-for="designName in designTask"
                :key="designName.userName"
                :label="designName.userName"
                :value="designName.userName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="tijiao()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 申请拒绝原因弹出框 -->
      <el-dialog title="申请被拒绝的原因" :visible.sync="addVisible1" width="50%">
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

      <!-- 任务计划拒绝原因弹出框 -->
      <el-dialog title="计划书被拒绝的原因" :visible.sync="addVisible2" width="50%">
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

      <!-- 合同拒绝原因弹出框 -->
      <el-dialog title="合同拒绝原因弹出框" :visible.sync="addVisible3" width="50%">
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

      <!-- 设计验收拒绝原因弹出框 -->
      <el-dialog title="设计验收拒绝原因弹出框" :visible.sync="addVisible4" width="50%">
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
      </el-dialog>

      <!-- 计划书上传 -->
      <el-dialog title="上传计划书" :visible.sync="planbook" width="400px" :before-close="handleClose">
        <el-upload
          ref="upload"
          action="http://127.0.0.1:8081/supplier/import"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess1"
          multiple
          :before-remove="beforeRemove"
          :limit="1"
          :auto-upload="false"
          :on-exceed="handleExceed"
          :file-list="fileList"
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
          <div slot="tip" class="el-upload__tip">只能上传单个文件，若要上传多个文件请将全部文件打包压缩成一个文件之后上传</div>
        </el-upload>
      </el-dialog>

      <!-- 上传合同 -->
      <el-dialog title="上传合同" :visible.sync="conbook" width="400px" :before-close="handleClose">
        <el-upload
          ref="upload"
          action="http://127.0.0.1:8081/supplier/import"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :limit="1"
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
          <div slot="tip" class="el-upload__tip">只能上传单个文件，若要上传多个文件请将全部文件打包压缩成一个文件之后上传</div>
        </el-upload>
      </el-dialog>

      <!-- 设计拒绝原因弹出框 -->
      <el-dialog title="请输入设计不通过的原因" :visible.sync="designRefuseReason" width="50%">
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form ref="form" :model="addList4" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="设计拒绝原因">
                <el-input v-model="addList4.SJrefuseReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="designRefuseReason = false">取 消</el-button>
          <el-button type="primary" @click="SJJJYYTJ">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "../designDetails/dataChange";
import radarChart from "../designDetails/detailComponents/radarChart";
export default {
  components: {
    "radar-chart": radarChart
  },
  name: "det",
  data() {
    return {
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
      cool: {
        mainTaskName: "",
        industry_Type: "",
        publishTime: "",
        deadline: "",
        mainTaskDetail: "",
        leader: "",
        taskState: 0,
        acceptCompanyName: ""
      },
      designTask: [
        {
          Id: "",
          userId: "",
          userName: ""
        }
      ],
      //申请表数据
      tableData1: [
        {
          checkApplyState: "",
          applyTime: "",
          checkApplyTime: "",
          applyWay: "",
          taskName: ""
        }
      ],

      //任务计划表数据
      tableData2: [
        {
          applyWay: "",
          checkPlanState: "",
          planUploadTime: "",
          checkPlanTime: "",
          taskName: ""
        }
      ],

      //内部审核表数据
      tableData3: [
        {
          designerName: "",
          supplierCheckDesignState: "",
          uploadDesignTime: "",
          supplierCheckDesignTime: "",
          demandorCheckDesignState: "",
          demandorCheckDesignTime: "",
          taskName: ""
        }
      ],
      //合同管理数据
      tableData4: [
        {
          contractState: "",
          uploadContractTime: "",
          checkContractTime: "",
          taskName: ""
        }
      ],
      //设计提交数据
      tableData5: [
        {
          demandorCheckDesignState: "",
          demandorCheckDesignTime: "",
          designCount: "",
          taskName: ""
        }
      ],
      //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" }
      ],
      //评价步骤条数据
      milepost1: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
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
      //设计人员分配
      dialogTableVisible: false,
      //申请计划拒绝弹窗
      addVisible1: false,
      //计划书拒绝弹窗
      addVisible2: false,
      //合同拒绝弹窗
      addVisible3: false,
      //设计拒绝弹窗
      addVisible4: false,
      //状态
      state: "",
      state2: 0,
      state3: 0,
      designcount: 0,
      // 评价默认步骤数
      milepostActive1: 5,
      // 默认步骤数
      milepostActive: 0,
      // 动态添加类名
      stepActive: "stepActive",
      //任务Id
      taskId: 0,
      //表格显示控制
      show: 0,
      show1: 0,
      show3: 0,
      //文件上传数据
      limitNum: 1,
      formLabelWidth: "100px",
      form: {},
      fileList: [],
      userName: "",
      design1: "",
      technicalFile: "",
      technicalFile1: "",
      giveDesigner: 0, //人员分配按钮控制
      designerNub: 0,
      reMarkId: 1,
      designRefuseReason: false
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
    this.getBZData(); //步骤图数据查找
    this.getLDData(); //雷达图数据查找
    this.styleswith(); //提交次数 背景颜色变化
  },
  methods: {
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },
    //提交次数 背景颜色变化
    styleswith() {
      if (this.form.designCount > 0 && this.form.designCount < 3) {
        document.getElementById("one").style.background = "#00D1B2";
      }
      if (this.form.designCount > 2 && this.form.designCount < 4) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
      }
      if (this.form.designCount > 4 || this.form.designCount == 4) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
      }
    },
    //任务计划下载
    RWJHXZ(row) {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/DownloadJHS",
          data: data
        })
        .then(response => {
          console.log("cap");
          console.log(response.data);
          this.download(response.data);
        });
    },
    // 下载计划书文件
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "设计文档.doc");
      document.body.appendChild(link);
      link.click();
    },

    //合同下载
    HTXZ(row) {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/DownLoadCon",
          data: data
        })
        .then(response => {
          console.log("cap");
          console.log(response.data);
          this.downloadCon(response.data);
        });
    },
    // 下载合同文件
    downloadCon(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "合同.pdf");
      document.body.appendChild(link);
      link.click();
    },
    //数据显示
    showData() {
      console.log("你好");
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/getList",
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
          if (this.state == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.state == "计划提交") {
            this.milepostActive = 1;
            this.show = 1;
          } else if (this.state == "任务进行中") {
            this.milepostActive = 2;
            this.show = 2;
          } else if (this.state == "审核") {
            this.milepostActive = 3;
            this.show = 3;
          } else if (this.state == "验收") {
            this.milepostActive = 4;
            this.show = 4;
          } else if (this.state == "完成") {
            this.milepostActive = 5;
            this.show = 5;
          } else if (this.state2 == 2) {
            this.show1 = 2;
          } else if (this.state3 == 2) {
            this.show3 = 2;
            console.log(this.show3);
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
          // this.taskId = response.data.allData.a[0].taskId;
          console.log(response.data.allData.a[0].taskState);
          console.log(response.data.allData);
          console.log(this.state2);
          console.log(this.show);
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
          url: "http://127.0.0.1:8081/supplier/accept",
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
          url: "http://127.0.0.1:8081/supplier/noAccept",
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
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/getList",
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
          url: "http://127.0.0.1:8081/supplier/getList",
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
          url: "http://127.0.0.1:8081/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList3 = response.data.allData.a[0];
        });
    },
    //设计拒绝原因
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
          url: "http://127.0.0.1:8081/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList5 = response.data.allData.a[0];
        });
    },
    //设计通过
    designSuccess(row) {
      this.$confirm("确定将设计审核通过么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: this.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/designSuccess",
          data: data
        });
        this.$message({
          message: "审核通过",
          type: "success"
        });
        this.showData();
      });
    },
    //设计不通过
    designRefuse(row) {
      this.designRefuseReason = true;
    },
    //分配设计人员
    assignDesigners() {
      this.dialogTableVisible = true;
      var that = this;
      var data = Qs.stringify({
        userName: "supplier"
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/findDesigner",
          data: data
        })
        .then(response => {
          console.log(response);
          this.designTask = response.data.allData.a;
          // this.designTask.id = response.data.allData.b;
          console.log(response);
        });
      this.showData();
    },
    //分配设计人员上传
    tijiao() {
      console.log(this.design1);
      console.log("哈哈哈");
      var that = this;
      var data = Qs.stringify({
        userName: this.design1,
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/supplier/assignDesigners",
          data: data
        })
        .then(response => {
          this.$message.success("提交成功");
          this.dialogTableVisible = false;
        });
      this.showData();
    },
    //上传计划书方法
    upLoadPlanT() {
      this.planbook = true;
    },
    //上传合同方法
    upLoadConT() {
      this.conbook = true;
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
          url: "http://127.0.0.1:8081/evaluateDetils",
          data: data
        })
        .then(response => {
          // that.stpesdata = response.data.allData[0];
          that.form.designCount = response.data.allData[6]; //完成质量数据
          this.milepost1[0].description = response.data.allData[0];
          this.milepost1[1].description = response.data.allData[1];
          this.milepost1[2].description = response.data.allData[2];
          this.milepost1[3].description = response.data.allData[3];
          this.milepost1[4].description = response.data.allData[4];
          this.milepost1[5].description = response.data.allData[5];
          this.styleswith();
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
          url: "http://127.0.0.1:8081/remarkDetils",
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
      this.technicalFile = response;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File: this.technicalFile
      });
      console.log(data);
      that.axios({
        method: "post",
        url: "http://127.0.0.1:8081/supplier/textImportCon",
        data: data
      });
      this.$router.go(0);
    },
    handleAvatarSuccess1(response, file, fileList) {
      this.technicalFile1 = response;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File1: this.technicalFile1
      });
      console.log(data);
      that.axios({
        method: "post",
        url: "http://127.0.0.1:8081/supplier/textImportPlan",
        data: data
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
          url: "http://127.0.0.1:8081/supplier/designRefuse",
          data: data
        });
      this.$message.success("提交成功");
      this.addList4 = {};
      this.designRefuseReason = false;
      this.showData();
    }
  }
};
</script>

<style lang="scss">
.Det {
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
}
</style>