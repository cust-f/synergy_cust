<template>
  <div class="substaskDetail">
    <div>
      <el-container>
        <el-main style="overflow:hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="cool" :model="cool" label-width="110px" class="formYS">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称">
                  <template slot-scope="scope">
                    <el-button class="anniu" @click="xuqiuXX(scope.row)">{{cool.mainTaskName}}</el-button>
                  </template>
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
                  <el-input v-model="cool.taskState" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="完成日期">
                  <el-input v-if="cool.finishTime === 0" :disabled="true">暂未完成</el-input>
                  <el-input v-else v-bind:value="cool.finishTime |formatDate" :disabled="true"></el-input>
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
            <!-- 
            <el-row>
              <el-col :span="22">
                <el-form-item label="需求详情">
                  <template slot-scope="scope">
                    <el-button
                      class="anniu"
                      @click="xuqiuXX(scope.row)"
                    >{{cool.mainTaskDetail}}</el-button>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>-->
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
                    </el-table>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-card class="box-card"> -->

            <!-- </el-card> -->
          </el-form>
          <br />
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="achieveMain">完成任务</el-button>
            <!-- <el-button type="primary" class="button1" @click="feichuAll">废除需求任务</el-button> -->
            <el-button type="primary" class="button1" @click="xiugaitanchu">修改</el-button>
            <el-button type="primary" class="button1" @click="xiazaiMAINmoban">打包下载</el-button>
          </div>

          <el-divider></el-divider>
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">需求分解</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <div>
            <div class="container">
              <div>
                <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button>
                <el-button type="primary" class="handle-del mr10" @click="bianjifhqdtanchu" :style="{display:fahuo}" :disabled="consignmentUpdateBtn">编辑发货清单</el-button>
              </div>
              <br />
              <el-table
                :data="shuju"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="50" align="center" :reserve-selection="true" :selectable="multipleTableSelectable"></el-table-column>
                <el-table-column prop="id" label="序号" type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="taskName" label="需求名称"></el-table-column>
                <el-table-column prop="taskState" label="需求状态" align="center">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.taskState ==='申请或邀请中'">待响应</el-tag>
                    <el-tag
                      v-else-if="scope.row.taskState ==='计划提交'||scope.row.taskState ==='任务进行中'"
                      type="warning"
                    >进行中</el-tag>
                    <el-tag v-else-if="scope.row.taskState ==='审核'" class="shenhe">审核</el-tag>
                    <el-tag v-else-if="scope.row.taskState ==='验收'" class="yanshou">验收</el-tag>
                    <el-tag v-else-if="scope.row.taskState ==='完成'" type="success">已完成</el-tag>
                    <el-tag v-else-if="scope.row.taskState ==='失败'" type="danger">失败</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="taskType" label="需求类型">
                  <template slot-scope="scope">
                    <span v-if="+scope.row.taskType === 0">设计任务</span>
                    <span v-else-if="+scope.row.taskType === 1">流通任务</span>
                  </template>
                </el-table-column>
                <el-table-column prop="publishTime" label="开始时间">
                  <template slot-scope="scope">{{scope.row.publishTime |formatDate}}</template>
                </el-table-column>
                <el-table-column prop="deadline" label="截止时间">
                  <template slot-scope="scope">{{scope.row.deadline |formatDate}}</template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      type="text"
                      icon="el-icon-delete"
                      @click="handleDelete1(scope.row)"
                    >删除任务</el-button>
                    <el-button @click="mainStaskDetail(scope.row)" type="text" size="small">查看详情</el-button>
                    <el-button @click="updateSubXqAndFile(scope.row)" type="text" size="small">修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :current-page="query.pageIndex"
                  :page-size="query.pageSize"
                  :total="shuju.length"
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
                        value-format
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
                    <el-span class="simichakan" :style="{display:sm}">仅该供应方可见</el-span>
                    <el-span class="simichakan" :style="{display:busm}">全部可见</el-span>
                  </font>
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
                    ref="upload"
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
              <br />
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
                        v-model="publishTime1"
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
                        v-model="deadline1"
                        style="width: 100%;"
                         value-format="yyyy-MM-dd HH:mm:ss"
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
                    <el-form-item label="完成时间">
                      <el-date-picker
                        type="datetime"
                        placeholder="选择日期"
                        :disabled = "finishTimeState"
                        v-model="finishTime1"
                        style="width: 100%;"
                        value-format="yyyy-MM-dd hh:mm:ss"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="11">
                    <el-form-item label="完成时间">
                      <el-date-picker
                        type="datetime"
                        format="yyyy-MM-dd hh:mm:ss"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        placeholder="选择日期"
                        :disable="finishTimeState"
                        v-model="cool.finishTime"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col> -->
                </el-row>

                <el-row>
                  <el-col :span="22" class="xiangxi">
                    <el-form-item label="需求任务详情">
                      <el-input
                        type="textarea"
                        :rows="3"
                        style="width:100%;"
                        placeholder="请输入内容"
                        v-model="cool.mainTaskDetail"
                        class="gongsiDetail"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="22" class="xiangxi">
                    <el-form-item label="附件管理">
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
                    ref="upload"
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

            <!-- 子任务详情 + 下载 -->
            <el-dialog :visible.sync="RWXQ" width="50%">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">需求详情</div>
              <br />
              <el-form ref="form" :model="addList3" label-width="10px">
                <el-row>
                  <el-col>
                    <el-form-item label>
                      <div class="wenzi">{{ cool.mainTaskDetail}}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <br />
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="RWXQ = false">关 闭</el-button>
              </span>
            </el-dialog>

            <!-- 查看所有发货清单 弹出框 -->
            <el-dialog :visible.sync="fhqdTC" width="1000px">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">发货清单</div>
              <div style="padding: 0 10px; border-left: 3px solid #4e58c5"></div>
              <br />
              <el-button @click="consignmentInsert" type="primary" size="small">新增</el-button>
              <br /><br />
              <el-form ref="form" label-width="100px" class="box">
                <el-table ref="multipleTable1" :data="consignmentTable" tooltip-effect="dark" style="width: 100%">
                  <el-table-column type="index" label="序号" width="50">
                    <template slot-scope="scope">
                      <span>{{ scope.$index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="产品名称" width="199" prop="productName"></el-table-column>
                  <el-table-column label="产品数量" width="160" prop="productNumber"></el-table-column>
                  <el-table-column prop="consignmentTimeLatest" label="截止时间" sortable>
                    <template slot-scope="scope">
                      {{scope.row.consignmentTimeLatest | formatDate}}
                    </template>
                  </el-table-column>
                  <el-table-column label="联系电话" width="160" prop="contactNumber"></el-table-column>
                  <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                      <el-button @click="consignmentUpdate(scope.row)" type="text" size="small">修改</el-button>
                      <el-button @click="consignmentDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </el-dialog>
            
            <!--子任务修改 -->
           <el-dialog :visible.sync="ZRWXG" width="50%">
           <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">信息修改</div>
           <br />
           <el-form>
                <el-row>
                  <el-col :span="22" >
                    <el-form-item label="分解任务详情">
                      <el-input
                        type="textarea"
                        :rows="3"
                        style="width:100%;"
                        placeholder="请输入内容"
                        v-model="SubDetail"
                        class="gongsiDetail"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

          <el-row>
            <el-col :span="22">
              <el-form-item label="附件下载">
                <div>
                  <el-table :data="Subfujian" class="customer-table" :show-header="false">
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
                          @click="Subshanchuwenjian(scope.row)"
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
              :on-success="SubhandleAvatarSuccess"
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
          </div>

      <!-- 新增 发货清单 弹出框 -->
      <div class="consignment">
        <el-dialog title :visible.sync="fhqdxinzengTC" width="50%">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">新增发货清单</div>
          <br />
          <el-form ref="consignmentForm2" label-width="110px" class="box" :rules="consignmentRules2" :model="consignmentForm2">
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品名称" prop="productName2">
                  <el-input v-model="consignmentForm2.productName2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品规格" prop="productModel2">
                  <el-input v-model="consignmentForm2.productModel2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品数量" prop="productNum2">
                  <el-input v-model="consignmentForm2.productNum2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品单价" prop="productPrice2">
                  <el-input v-model="consignmentForm2.productPrice2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="截止时间" prop="consignmentTimeLatest2">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期"
                    v-model="consignmentForm2.consignmentTimeLatest2"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系方式" prop="contactNumber2">
                  <el-input v-model="consignmentForm2.contactNumber2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注" prop="productNotes2">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width:100%;"
                    placeholder="请输入内容"
                    v-model="consignmentForm2.productNotes2"
                    class="gongsiDetail"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="fhqdxinzengTC = false">取 消</el-button>
            <el-button type="primary" @click="consignmentSaveNew('consignmentForm2')">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <!--修改 发货清单 弹出框-->
      <div class="consignment">
        <el-dialog title :visible.sync="fhqdxiugaiTC" width="50%">
          <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">修改发货清单</div>
          <br />
          <el-form ref="consignmentForm1" label-width="110px" class="box" :rules="consignmentRules1" :model="consignmentForm1">
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品名称" prop="productName1">
                  <el-input v-model="consignmentForm1.productName1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品规格" prop="productModel1">
                  <el-input v-model="consignmentForm1.productModel1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品数量" prop="productNum1">
                  <el-input v-model="consignmentForm1.productNum1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品单价" prop="productPrice1">
                  <el-input v-model="consignmentForm1.productPrice1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="截止时间" prop="consignmentTimeLatest1">                
                    <el-date-picker
                      type="datetime"
                      v-model="consignmentForm1.consignmentTimeLatest1"
                      style="width: 100%;"
                      value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>                  
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系方式" prop="contactNumber1">
                  <el-input v-model="consignmentForm1.contactNumber1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注" prop="productNotes1">
                  <el-input
                    type="textarea"
                    :rows="3"
                    style="width:100%;"
                    placeholder="请输入内容"
                    v-model="consignmentForm1.productNotes1"
                    class="gongsiDetail"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="fhqdxiugaiTC = false">取 消</el-button>
            <el-button type="primary" @click="consignmentSaveUpdate('consignmentForm1')">修 改</el-button>
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
  inject: ["reload"],
  data() {
    return {
      //子任务详细
      SubDetail:"",
      //子任务完整文件路径
      SubtechnicalFileWanzheng:"",
      //要修改的子任务ID
      SubtaskId:"",
            //子任务修改
      ZRWXG: false,
      //完成时间
      finishTimeState: true,
      //任务详情
      RWXQ: false,
      //初始完整路径
      WZLJ: "",
      //文件数目
      WJSM: "",
      //xiugaixuqiu
      zhurenwuxiangxi: "",
      sfsmkj: false, //是否私密指派
      usernameX: sessionStorage.getItem("ms_username"),
      //级联选择框的配置对象
      cateProps: {
        value: "id",
        label: "industryName",
        children: "children",
        checkStrictly: true,
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
      //上传子文件路径
      SubtechnicalFile: [],
      technicalFileWanzheng: "",
      shangchuancishu: 0,
      Subshangchuancishu:0,
      dialogVisible: false,
      type: "", //主任务类型
      personnel: ["许知远", "王添", "白泽"], //总负责人
      statuses: ["数控机床制造", "精密汽车零部件制造"], //任务类别
      supplyCompanies: [
        "沈阳机床集团有限责任公司",
        "起重集团有限公司",
        "长光电子",
      ], //供应商列表
      Task: ["设计任务", "流通任务"],
      selVal: "",
      visiblehexin: "none",
      shenqing: "none",
      sm: "none", //私密
      busm: "none", //不私秘
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
        taskCategoryPart: "",
        finishTime: "",
      }, 
      publishTime1: "",
      deadline1: "",
      finishTime1: "",
      query: {
        pageIndex: 1,
        pageSize: 10,
      },
      subStaskTypeID: "",
      mainStaskTypeID: "",
      shuju: [
        {
          taskName: "",
          taskType: "",
          beginTime: "",
          publishTime: "",
          taskState: "",
          deadline: "",
          taskCategoryMain: "",
          taskCategoryPart: "",
        },
      ],
      subStaskType: [
        {
          id: "",
          industryName: "",
          pId: "",
        },
      ],
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
        },
      ],
      //附件
      fujian: [
        {
          realName: "",
          realPath: "",
        },
      ],
            //子附件
      Subfujian: [
        {
          realName: "",
          realPath: "",
        },
      ],
      SubFile:"",
      //是否申请
      shifou: [
        {
          id: "0",
          label: "是",
        },
        { id: "1", label: "否" },
      ],
      //是否私密
      shifousimi: [
        { id: "0", label: "是" },
        {
          id: "1",
          label: "否",
        },
      ],
      //fuzeren
      FZR: [{}],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      xiugaiTC: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      mainTaskID: "",
      cooList: { shifouyaoqing: "", shifousimi: "" },
      SupplierListInt: "",
      liebieList: { supplyCompany: "" },
      form: {},
      name: "",
      type: "",
      publishdate: "",
      deaddate: "",
      leader: "",
      xiangxi: "",
      Time: "",

      fahuo:"none",
      fhqdTC:false,
      consignmentTable:[],
      selectTaskId:"",
      selectConsignmentId:"",
      fhqdxiugaiTC:false,
      consignmentForm1:{
        consignmentTimeLatest1: "",
        productName1:"",
        productModel1:"",
        productNum1:"",
        productPrice1:"", 
        productTotal1:"", 
        productNotes1:"",
        contactNumber1:"",
      },
      //编辑发货清单 数据验证
      consignmentRules1:{
        consignmentTimeLatest1:[
          {required: true, message: '请选择截止时间', trigger: 'blur'},
        ],
        productName1:[
          {required: true, message: '请输入产品名称', trigger: 'blur'},
          { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的名称", trigger: "blur" },
        ],
        productModel1:[
          {required: true, message: '请输入产品规格', trigger: 'blur'},
           { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的规格", trigger: "blur" },
        ],
        productNum1:[
          {required: true, message: '请输入产品数量', trigger: 'blur'},
          {pattern:/^\d{1,9}$/, message: "请输入长度为 1 到 9 个字符的整数", trigger: "blur"},
        ],
        productPrice1:[
          {required: true, message: '请输入产品单价', trigger: 'blur'},
          {pattern:/^\d{1,9}$/, message: "请输入长度为 1 到 9 个字符的整数", trigger: "blur"},
        ],
        productNotes1:[
          {required: true, message: '请输入备注或填写无', trigger: 'blur'},
        ],
        contactNumber1:[
          {required: true, message: '请输入联系方式', trigger: 'blur'},
          {pattern:/^1\d{10}$/, message: "请输入正确的联系方式", trigger: "blur"},
          // {validator:function(rule,value,callback){
          //   if(/^1\d{10}$/.test(value) == false){
          //       callback(new Error("请输入正确的联系方式"));
          //   }else{
          //       callback();
          //   }
          //   }, trigger: 'blur'
          // },
        ],
      },
      fhqdxinzengTC:false,
      consignmentForm2:{
        consignmentTimeLatest2: "",
        productName2:"",
        productModel2:"",
        productNum2:"",
        productPrice2:"", 
        productTotal2:"", 
        productNotes2:"",
        contactNumber2:"",
      },
      //新增发货清单 数据验证
      consignmentRules2:{
        consignmentTimeLatest2:[
          {required: true, message: '请选择截止时间', trigger: 'blur'},
        ],
        productName2:[
          {required: true, message: '请输入产品名称', trigger: 'blur'},
          { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的名称", trigger: "blur" },
        ],
        productModel2:[
          {required: true, message: '请输入产品规格', trigger: 'blur'},
           { min: 1, max: 10, message: "请输入长度在 1 到 10 个字符的规格", trigger: "blur" },
        ],
        productNum2:[
          {required: true, message: '请输入产品数量', trigger: 'blur'},
          {pattern:/^\d{1,9}$/, message: "请输入长度为 1 到 9 个字符的整数", trigger: "blur"},
        ],
        productPrice2:[
          {required: true, message: '请输入产品单价', trigger: 'blur'},
          {pattern:/^\d{1,9}$/, message: "请输入长度为 1 到 9 个字符的整数", trigger: "blur"},
        ],
        productNotes2:[
          {required: true, message: '请输入备注或填写无', trigger: 'blur'},
        ],
        contactNumber2:[
          {required: true, message: '请输入联系方式', trigger: 'blur'},
          {pattern:/^1\d{10}$/, message: "请输入正确的联系方式", trigger: "blur"},
        ],
      },
      consignmentUpdateBtn:false,
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
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },

  created() {
    this.getParams();
    this.getData();
    //fuzeren
    this.getDate();
  },

  methods: {
    xuqiuXX(row) {
      this.RWXQ = true;
    },
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
          console.log(response)
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
    getDate() {
      var that = this;
      var data = Qs.stringify({
        aaaa: this.usernameX,
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/SubstaskInformation/selectMainType",
          data: data,
        })
        .then((response) => {
          // this.mainStaskType = response.data.allData.a;
          //this.shuju = response.data.allData.b;
          this.xuanzelist = this.getTreeData(response.data.allData.c);
          this.FZR = response.data.allData.d;
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

    // dateFormat: function (time) {
    //   var index = time.lastIndexOf(".");
    //   time = time.substring(0, index);
    //   var date = new Date(time);
    //   var year = date.getFullYear();
    //   /* 在日期格式中，月份是从0开始的，因此要加0
    //    * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
    //    * */
    //   var month =
    //     date.getMonth() + 1 < 10
    //       ? "0" + (date.getMonth() + 1)
    //       : date.getMonth() + 1;
    //   var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    //   var hours =
    //     date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    //   var minutes =
    //     date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    //   var seconds =
    //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    //   // 拼接
    //   return (
    //     year +
    //     "-" +
    //     month +
    //     "-" +
    //     day +
    //     " " +
    //     hours +
    //     ":" +
    //     minutes +
    //     ":" +
    //     seconds
    //   );
    // },

    //级联选中框选中变化项会用到这个函数
    handleChange() {
      this.mainStaskTypeID = this.selectCateKeys[0];
      this.subStaskTypeID = this.selectCateKeys[1];
    },
    //保存新增
    saveAdd11() {
      //console.log(this.TaskXiangXi)
      if (this.technicalFile == "null") {
        this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
          type: "warning",
        });
      } else {
        if (this.cooList.shifousimi != 1) {
          this.cooList.shifousimi = 0;
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
          mainTaskID: this.mainStaskID,
          Technonlgy_File: this.technicalFileWanzheng,
          Telphone: this.addList.Telphone,
          taskID: "100086",
          SupperListINt: this.SupplierListInt,
        });

        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/addSubstaskInformation",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((response) => {
            if (response.data == "成功") {
              this.$message.success("提交成功");
            }
          })
          .catch((error) => {
            if (error != null) {
              this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
                type: "warning",
              });
            } else {
              this.$message.success("提交成功");
            }
          });
        this.$message.success("提交成功");
        this.addVisible = false;
        this.shuju.push(this.addList);
        this.technicalFileWanzheng = "";
        this.addList = {};
        this.getData();
        // location.reload()
      }
    },

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

    simizhiding(coo) {
      if (coo == 0) {
        this.busm = "inline";
        this.sm = "none";
      } else {
        this.sm = "inline";
        this.busm = "none";
      }
    },
    xiugaixuqiuxinxi() {
      var mainTaskState;
      if (this.technicalFileWanzheng != 0 && this.WZLJ != 0) {
        this.technicalFileWanzheng =
          this.WZLJ + "linklink" + this.technicalFileWanzheng;
        //console.log("nihao" + this.technicalFileWanzheng);
      }
      if (this.technicalFileWanzheng == 0 && this.WZLJ != 0) {
        this.technicalFileWanzheng = this.WZLJ;
      }
      if(this.cool.taskState === "进行中"){
        mainTaskState = 0
      }else   if(this.cool.taskState === "已完成"){
        mainTaskState = 1
      }
      this.mainStaskTypeID = this.selectCateKeys[0];
      this.subStaskTypeID = this.selectCateKeys[1];
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID,
        mainTaskName: this.name,
        principalName: this.cool.principalName,
        publishTime1: this.cool.publishTime,
        deadline1: this.cool.deadline,
        taskCategoryMainId: this.mainStaskTypeID,
        taskCategoryPartId: this.subStaskTypeID,
        technicalFile: this.technicalFileWanzheng,
        mainTaskDetail: this.cool.mainTaskDetail,
        username: this.usernameX,
        finishTime1: this.finishTime1,
        taskState:mainTaskState,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/updateMainXX",
          data: data,
          // data:this.$store.state.userName
        })
        .then((response) => {
          this.mainStaskID = response.data.allData;
          this.zzzz = response.data.allData;
          if (this.zzzz != "null") {
            this.$message.success("提交成功");
            this.xiugaiTC = false;
            this.$refs.upload.clearFiles();
            this.technicalFileWanzheng = "";
            this.technicalFile = "";
            (this.shangchuancishu = ""), this.getData();
          }
        })
        .catch((error) => {
          if (error != null) {
            this.$confirm("你还有重要信息未填写，填写后再提交", "提示", {
              type: "warning",
            });
            this.$refs.upload.clearFiles();
            (this.technicalFileWanzheng = ""), (this.technicalFile = "");
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
    },

    getData() {
      //console.log(this.mainTaskID);
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data,

          // data:this.$store.state.userName
        })
        .then((response) => {
          this.cool = response.data.allData.a[0];
          this.updateTime = response.data.allData.a[0];
          this.publishTime1 = response.data.allData.a[0].publishTime
          this.publishTime1 = new Date(this.publishTime1);
                    this.deadline1 = response.data.allData.a[0].deadline
          this.deadline1 = new Date(this.deadline1);
                    this.finishTime1 = response.data.allData.a[0].finishTime
          this.finishTime1 = new Date(this.finishTime1);


          this.mainStaskID = response.data.allData.a[0].mainTaskID;
          this.name = response.data.allData.a[0].mainTaskName;
          this.shuju = response.data.allData.b;
          this.fujian = response.data.allData.c;
          this.type = response.data.allData.a[0].industry_Type;
          this.WZLJ = response.data.allData.WZLJ;
          this.WJSM = response.data.allData.SM;
          this.selectCateKeys[0] =
            response.data.allData.a[0].taskCategoryMainId;
          this.selectCateKeys[1] =
            response.data.allData.a[0].taskCategoryPartId;
          if (this.cool.taskState === 0) {
            this.cool.taskState = "进行中";
          } else if (this.cool.taskState === 1) {
            this.cool.taskState = "已完成";
            this.finishTimeState = false;
          } else if (this.cool.taskState === 2) {
            this.cool.taskState = "废除";
          }
          if (this.cool.finishTime === null) {
            this.cool.finishTime = "尚未完成";
          } 
          // else {
          //   this.cool.finishTime =this.cool.finishTime;
          // }
        });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },

    // 删除操作
    handleDelete1(row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          substakeId: row.taskId,
        });
        that
          .axios({
            method: "post",
            url: "/api/MainTaskInformation/feicuBySubstaskstaskID",
            data: data,

            // data:this.$store.state.userName
          })
          .then((response) => {
            console.log(response);
            if (response.data === "成功") {
              this.shuju.splice(row, 1);
              this.$message.success("删除成功");
            }
          });
      });
      //   .then(response => {
      //     this.cool = response.data.allData.a[0];
      //     this.tableData = response.data.allData.b;
      //   });
      // 二次确认删除

      //   .catch(() => {});
    },
    //子任务修改
    updateSubXqAndFile(row){
            //子任务修改
      this.ZRWXG=true;
      this.SubtaskId = row.taskId
      this.selectFile(row.taskId)
    },
    selectFile(taskId){
      var that = this;
      var data = Qs.stringify({
        subTaskID:taskId
      });
      that.axios({
        method:"post",
        url:"/api/SubstaskInformation/selectFile",
        data:data
      })
      .then((response)=>{
        console.log(response)
          this.Subfujian = response.data.allData.QBWJ;
          this.SubWZLJ = response.data.allData.WZLJ;
          this.SubWJSM = response.data.allData.SM;
          this.SubDetail = response.data.allData.SubFile;
      })
    },
      Subshanchuwenjian(row) {
      let ks = this.SubWZLJ.indexOf(row.realPath);
      let qianzui, houzui;
      console.log("KS的大小是"+ks)
      if (row.wenjiancixu == this.WJSM - 1) {
        qianzui = this.SubWZLJ.substr(0, ks - 8);
        houzui = "";
      } else {
        qianzui = this.SubWZLJ.substr(0, ks);
        houzui = this.SubWZLJ.substr(ks + row.realPath.length + 8);
      }
      this.SubWZLJ = qianzui + houzui;
      console.log(this.SubWZLJ)
      console.log("文件前缀"+qianzui)
      console.log("文件后缀"+houzui)
      console.log("完整路径"+this.SubWZLJ)
      this.Subfujian.splice(row.wenjiancixu, 1);
    },
      XGZRW() {
      //设置文件路径
      if (this.SubtechnicalFileWanzheng != 0 && this.SubWZLJ != 0) {
        this.SubtechnicalFileWanzheng =
          this.SubWZLJ + "linklink" + this.SubtechnicalFileWanzheng;
          console.log("第一版"+this.SubtechnicalFileWanzheng)
      }
      if (this.SubtechnicalFileWanzheng == 0 && this.WZLJ != 0) {
        this.SubtechnicalFileWanzheng = this.SubWZLJ;
        console.log("第二版"+this.SubtechnicalFileWanzheng)
      }
      console.log("第三版"+this.SubtechnicalFileWanzheng)
      //先对要修改的文件进行判断
        var that = this;
        var data = Qs.stringify({
          TechnicalFile: this.SubtechnicalFileWanzheng,
          taskDtail:this.SubDetail,
          taskId: this.SubtaskId,
        });
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/updateTaskDetail",
            data: data,
          })
          .then((response) => {
            if (response.data != null) {
              this.$message.success("修改成功");
              this.$refs.upload.clearFiles();
              this.technicalFileWanzheng = "";
              this.technicalFile = "";
              this.shangchuancishu = "";
              this.showData();
              //this.getData();
            }
          })
          .catch((error) => {
            if (error != null) {
             
              this.$refs.upload.clearFiles();
              this.technicalFileWanzheng = "";
              this.technicalFile = "";
              this.shangchuancishu = "";
            }
          });

        this.ZRWXG = false;
      },
    
    feichuAll() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          mainStaskID: this.mainTaskID,
        });
        that.axios({
          method: "post",
          url: "/api/MainTaskInformation/feichuByMainstaskID",
          data: data,

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
      });
    },
    achieveMain() {
      this.$confirm("确定要完成任务吗？", "提示", {
        type: "warning",
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          mainStaskID: this.mainTaskID,
        });
        that
          .axios({
            method: "post",
            url: "/api/MainTaskInformation/achieveMainTask",
            data: data,

            // data:this.$store.state.userName
          })
          .then((response) => {
            if (response.data == "成功") {
              this.$message.success("主任务完成");
            } else {
              this.$message.error("主任务完成失败");
            }
          });
      });
    },
    downLoad() {
      var that = this;
      var data = Qs.stringify({
        technicalFile: this.technicalFile,
      });
      that.axios({
        method: "post",
        url: "/api/MainTaskInformation/feichuByMainstaskID",
        data: data,

        // data:this.$store.state.userName
      });
    },
    xiugaitanchu() {
      this.xiugaiTC = true;
    },

    // //新增操作 查询子任务列别及供应商列表
    addData() {
      // 传递this.type
      this.$router.push({
        path: "/admin/addSubTask",
        query: {
          type: this.type,
          mainTaskID: this.mainTaskID,
          name: this.name,
        },
      });
    },
    //保存新增
    saveAdd() {
      this.tableData.push(this.addList);
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
      if (row.taskType == 0) {
        this.$router.push({
          path: "/admin/mainStaskDetail",
          query: {
            taskId: row.taskId,
          },
        });
      } else {
        this.$router.push({
          path: "/admin/mainStaskDetailLT",
          query: {
            taskId: row.taskId,
          },
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
        SubhandleAvatarSuccess(response, file, fileList) {
      this.SubtechnicalFile[this.Subshangchuancishu] = response;
      if (this.SubtechnicalFileWanzheng.length > 0) {
        this.SubtechnicalFileWanzheng =
          this.SubtechnicalFileWanzheng +
          "linklink" +
          this.SubtechnicalFile[this.Subshangchuancishu];
      } else {
        this.SubtechnicalFileWanzheng =
          this.SubtechnicalFileWanzheng + this.SubtechnicalFile[this.Subshangchuancishu];
      }
      console.log(this.SubtechnicalFileWanzheng)
      this.Subshangchuancishu = this.Subshangchuancishu + 1;

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
    //任务计划下载
    xiazaiMAINmoban() {
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

    // 下载文件
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
    
    //复选框做单选
    handleSelectionChange(val) {
      //控制单选，当选择个数大于1时，清空所有，选择第二个，也就是说当一点击选到第二个时就清空，然后只选第二个
      if(val.length > 1){
        let arrays = val.splice(0,val.length-1)
        arrays.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row); //除了当前点击的，其他的全部取消选中
          this.fahuo="inline";//显示编辑发货清单按钮
          //根据选中行任务状态 判断 是否禁用"编辑发货清单"按钮
          if(val[0].taskState == "完成"){
            this.consignmentUpdateBtn = true;
          }
          else{
            this.consignmentUpdateBtn = false;
          }
        })
         this.selectTaskId=val[0].taskId;
      }
      if(val.length == 1){
        this.fahuo = "inline";//显示编辑发货清单按钮
        //根据选中行任务状态 判断 是否禁用"编辑发货清单"按钮
        if(val[0].taskState == "完成"){
          this.consignmentUpdateBtn = true;
        }
        else{
          this.consignmentUpdateBtn = false;
        }
        this.selectTaskId=val[0].taskId;
      }
      if(val.length == 0){
        this.fahuo="none";//隐藏编辑发货清单按钮
        this.selectTaskId="";
      }
    },
    //根绝任务类别判断是否禁用
    multipleTableSelectable:function(row, index) {
        return row.taskType == 1 ? true : false;
    },
    //弹出发货清单表格弹出框
    bianjifhqdtanchu(){
      var that = this;
      var data = Qs.stringify({
        taskId: this.selectTaskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findConsignmentByTaskId",
          data: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          this.consignmentTable = response.data.allData;
          this.fhqdTC=true;
        })
        .catch((error) => {
          console.log(error);
      });
    },
    //======发货清单 修改 弹出========
    consignmentUpdate(row){
      this.selectConsignmentId = row.consignmentId;
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
          this.fhqdxiugaiTC = true;
          this.consignmentForm1.productName1 = response.data.allData[0].productName;
          this.consignmentForm1.productModel1 = response.data.allData[0].productModel;
          this.consignmentForm1.productNum1 = response.data.allData[0].productNumber;
          this.consignmentForm1.productPrice1 = response.data.allData[0].productPrice;
          this.consignmentForm1.consignmentTimeLatest1 = response.data.allData[0].consignmentTimeLatest;
          this.consignmentForm1.contactNumber1 = response.data.allData[0].contactNumber;
          this.consignmentForm1.productNotes1 = response.data.allData[0].consignmentNotes;
        })
        .catch((error) => {
          console.log(error);
      });
    },
    //发货清单 单行 修改
    consignmentSaveUpdate(){
       this.$refs.consignmentForm1.validate((valid) => {
        if(valid){
          var that = this;
          //1.保存数据到本地  2.调用方法存入数据库 3.弹出成功提示消息 4.清空关闭 5.刷新table
          //====发货清单数据====
          var data = Qs.stringify({
            taskId: this.selectTaskId,
            consignmentId:this.selectConsignmentId,
            consignmentTimeLatest: this.consignmentForm1.consignmentTimeLatest1,
            productName:this.consignmentForm1.productName1,
            productModel:this.consignmentForm1.productModel1,
            productNumber:this.consignmentForm1.productNum1,
            productPrice:this.consignmentForm1.productPrice1, 
            totalPrice:"0",//在后台算
            consignmentNotes:this.consignmentForm1.productNotes1,
            contactNumber:this.consignmentForm1.contactNumber1,
            deliveryTime:this.consignmentForm1.consignmentTimeLatest1,
            consignmentState:"0",//未发货
            shippingAddress:"暂无地址",
          });
          that
            .axios({
              method: "post",
              url: "/api/addConsignment/saveconsignmentIdtaskId",
              data: data,
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then((response) => {
              if (response.data == "成功") {
                this.$message.success("修改发货信息成功");
                //this.consignmentForm1 = {};
                //弹出框消失
                this.fhqdxiugaiTC = false;
                that.bianjifhqdtanchu();
              }
            })
            .catch((error) => {
              console.log(error.response);
            })
        }
        else{
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，填写后再提交",
          });
        }
      })
    },
    //发货清单 单行 删除
    consignmentDelete(row){
      var that = this;
      var data = Qs.stringify({
        consignmentId: row.consignmentId,
      });
       that
        .axios({
          method: "post",
          url: "/api/addConsignment/deleteByconsignmentId",
          data: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          if (response.data == "成功") {
                this.$message.success("删除发货信息成功");
                that.bianjifhqdtanchu();
              }
        })
        .catch((error) => {
          console.log(error);
      });
    },
    //======发货清单 新增 弹出========
    consignmentInsert(){
      this.fhqdxinzengTC = true;
    },
    //======发货清单 新增========
    consignmentSaveNew(){
      this.$refs.consignmentForm2.validate((valid) => {
        if(valid){
          var that = this;
          //1.保存数据到本地  2.调用方法存入数据库 3.弹出成功提示消息 4.清空关闭 5.刷新table
          //====发货清单数据====
          var data = Qs.stringify({
            taskId: this.selectTaskId,
            consignmentTimeLatest: this.consignmentForm2.consignmentTimeLatest2,
            productName:this.consignmentForm2.productName2,
            productModel:this.consignmentForm2.productModel2,
            productNumber:this.consignmentForm2.productNum2,
            productPrice:this.consignmentForm2.productPrice2, 
            totalPrice:"0",//在后台算
            consignmentNotes:this.consignmentForm2.productNotes2,
            contactNumber:this.consignmentForm2.contactNumber2,
            deliveryTime:this.consignmentForm2.consignmentTimeLatest2,
            consignmentState:"0",//未发货
            shippingAddress:"暂无地址",
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
                this.$message.success("新增发货信息成功");
                this.consignmentForm2 = {};
                //弹出框消失
                this.fhqdxinzengTC = false;
                that.bianjifhqdtanchu();
              }
            })
            .catch((error) => {
              console.log(error.response);
            })
        }
        else{
          this.$message({
            type: "warning",
            message: "你还有重要信息未填写，填写后再提交",
          });
        }
      })
    },
},
};
</script>

<style lang="scss" >
.substaskDetail {
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
}
.consignment{
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
</style>