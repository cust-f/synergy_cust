<template>
  <div>
    <el-container>
      <el-main>
        <div class="box">
          <h3>设计任务</h3>
          <el-divider></el-divider>
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <div>
          <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部任务" name="first">
                <div class="handle-box">
                  
                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="selectname" placeholder="分解任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                   :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="分解任务名称"></el-table-column>
                  <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>

                  <el-table-column prop="companyName" label="企业名称"></el-table-column>
                  <el-table-column prop="deadline" label="截止时间">
                      <template slot-scope="scope">
                    {{scope.row.deadline | formatDate}}
                    
                  </template>
                  </el-table-column>
                  <el-table-column prop="taskState" label="状态" align="center">
                  </el-table-column>
                   <el-table-column label="操作" align="center" class="box1">
                    <template slot-scope="scope">


                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>

              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData.length"
                  @current-change="handleCurrentChange"  
			            @size-change="handleSizeChange" 
                  
                ></el-pagination>
              </div>

              </el-tab-pane>

              <el-tab-pane label="待响应" name="second">
                <div class="handle-box">
                 
                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="selectname" placeholder="分解任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearchByCondition">搜索</el-button>
                </div>
                 <el-table
                  :data="tableData1.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="分解任务名称"></el-table-column>
                  <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>
                  <el-table-column prop="companyName" label="企业名称"></el-table-column>
                  <el-table-column prop="deadline" label="截止时间">
                      <template slot-scope="scope">
                    {{scope.row.deadline | formatDate}}
                    
                  </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" >
                     <template slot-scope="scope">
                    <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete1(scope.row)"
                  >废除</el-button>

                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                     </template>
                    </el-table-column>

                </el-table>
               <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData1.length"
                  @current-change="handleCurrentChange"  
			            @size-change="handleSizeChange" 
                  
                ></el-pagination>
              </div>
              </el-tab-pane>

              <el-tab-pane label="任务计划" name="third">
                <div class="handle-box">

                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="selectname" placeholder="分解任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearchByCondition">搜索</el-button>
                </div>
                <el-table
                  :data="tableData2.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="分解任务名称"></el-table-column>
                  <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>
                  <el-table-column prop="companyName" label="企业名称"></el-table-column>
                  <el-table-column prop="uploadFileTime" label="上传时间">
                      <template slot-scope="scope">
                    {{scope.row.uploadFileTime | formatDate}}
                    
                  </template>
                  </el-table-column>
                  <el-table-column prop="assignmentState" label="状态" align="center" width="80">
                  </el-table-column>
                  
                  <el-table-column label="任务书" align="center" width="55" >
                    <el-button type="text" size="small" class="box1">下载</el-button>
                  </el-table-column>
                  <el-table-column label="审核" align="center">
                    <template slot-scope="scope">
                  <el-button type="success" size="mini" plain @click="open2(scope.row)">审核通过</el-button>
                    <br>
                    <el-button type="danger" size="mini" plain @click="open(scope.row)">审核不通过</el-button>
                    </template>
                  
                  </el-table-column>
                  <el-table-column label="操作" align="center" >

                <template slot-scope="scope">
                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                </template>
                    </el-table-column>
                </el-table>
               <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData2.length"
                  @current-change="handleCurrentChange"  
			            @size-change="handleSizeChange" 
                  
                ></el-pagination>
              </div>
              </el-tab-pane>

              <el-tab-pane label="进行中" name="forth">
                <div class="handle-box">

                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="selectname" placeholder="分解任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearchByCondition">搜索</el-button>
                </div>
                <el-table
                  :data="tableData3.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>
                   <el-table-column prop="taskName" label="分解任务名称"></el-table-column>         
                   <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>
                 
                  <el-table-column prop="companyName" label="企业名称"></el-table-column>
                <el-table-column prop="deadline" label="截止时间">
                      <template slot-scope="scope">
                    {{scope.row.deadline | formatDate}}
                    
                  </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" >

                  <template slot-scope="scope">
                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                  </template>
                    </el-table-column>

                </el-table>
               <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData3.length"
                  @current-change="handleCurrentChange"  
			            @size-change="handleSizeChange" 
                  
                ></el-pagination>
              </div>
              </el-tab-pane>

              <el-tab-pane label="待审核" name="fifth">
                <div class="handle-box">
                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="selectname" placeholder="分解任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearchByCondition">搜索</el-button>
                </div>
                <el-table
                  :data="tableData4.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="分解任务名称"></el-table-column>
                  <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>
                  <el-table-column prop="companyName" label="企业名称"></el-table-column>
                   <el-table-column prop="uploadFileTime" label="上传时间">
                      <template slot-scope="scope">
                    {{scope.row.uploadFileTime | formatDate}}
                    
                  </template>
                  </el-table-column>

                  <el-table-column prop="taskCheck" label="状态" align="center" >
                  </el-table-column>
                  <el-table-column label="图纸" align="center" width="55">
                    <el-button type="text" size="small" class="box1">查看</el-button>
                  </el-table-column>
                  <el-table-column label="审核" align="center">
                    <template slot-scope="scope">
                      <el-button type="success" size="mini" plain @click="tuzhishenhe(scope.row)">审核通过</el-button>
                      <br>
                      <el-button type="danger" size="mini" plain @click="tuzhiNo(scope.row)">审核不通过</el-button>
                    </template>
                    
                  </el-table-column>
                  <el-table-column label="操作" align="center" >

                  <template slot-scope="scope">
                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                  </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData4.length"
                  @current-change="handleCurrentChange"  
			            @size-change="handleSizeChange" 
                  
                ></el-pagination>
              </div>
              </el-tab-pane>

              <el-tab-pane label="已完成" name="sixth">
                <div class="handle-box">

                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="selectname" placeholder="分解任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearchByCondition">搜索</el-button>
                </div>
                <el-table
                 :data="tableData5.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="分解任务名称"></el-table-column>
                  <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>
                  <el-table-column prop="companyName" label="企业名称"></el-table-column>
                  <el-table-column prop="finishTime" label="完成时间">
                     <template slot-scope="scope">
                    {{scope.row.finishTime | formatDate}}
                    
                  </template>
                  </el-table-column>
                    <el-table-column label="任务书" align="center" >
                    <el-button type="text" size="small" class="box1">下载</el-button>
                  </el-table-column>
                  <el-table-column label="图纸" align="center" >
                   <el-button type="text" size="small" class="box1">查看</el-button>
                  </el-table-column>

                  <el-table-column label="操作" align="center" class="box1">
                    <template slot-scope="scope">

                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                        </template></el-table-column>

                </el-table>
                <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData5.length"
                  @current-change="handleCurrentChange"  
			            @size-change="handleSizeChange" 
                  
                ></el-pagination>
              </div>
              </el-tab-pane>

              <el-tab-pane label="已废除" name="seventh">
                <div class="handle-box">
                 
                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="selectname" placeholder="分解任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearchByCondition">搜索</el-button>
                </div>
                <el-table
                  :data="tableData6.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="分解任务名称"> </el-table-column>
                 <el-table-column prop="mainTaskName" label="需求任务名称"></el-table-column>
                  <el-table-column prop="companyName" label="企业名称"></el-table-column>

                  <el-table-column label="操作" align="center" >
                        <template slot-scope="scope">

                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                        </template>
          
                  </el-table-column>
                 
                </el-table>
                <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="tableData6.length"
                  @current-change="handleCurrentChange"  
			            @size-change="handleSizeChange" 
                  
                ></el-pagination>
              </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 计划书拒绝原因弹出框 -->
        <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="addList" label-width="120px">
            <el-row>
              <el-col>
                <el-form-item label="审核拒绝原因">
                  <el-input v-model="addList.FrefuseReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd1">确 定</el-button>
          </span>
        </el-dialog>
  <!--图纸审核拒绝原因弹出框 -->
        <el-dialog title="请输入审核不通过的原因" :visible.sync="addVisible1" width="50%">
          <el-row>
            <el-col :span="8"></el-col>
          </el-row>
          <el-form ref="form" :model="addList1" label-width="120px">
            <el-row>
              <el-col>
                <el-form-item label="审核拒绝原因">
                  <el-input v-model="addList1.TrefuseReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd2">确 定</el-button>
          </span>
        </el-dialog>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import Qs from 'qs';
import { formatDate } from "./dataChange";
export default {
  name: "designTask",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      activeName: "first",
      addVisible: false,
      addVisible1: false,
      taskId:"",
      addList: [
        {
          FrefuseReason:''
        }
      ],
      addList1: [
        {
          TrefuseReason:''
        }
      ],
      tableData: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "待完成",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time: "2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "待完成",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time: "2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "待完成",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time: "2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "待完成",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "待完成",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time: "2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "待完成",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time: "2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "待完成",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time: "2019-11-15"
        }
      ],
      tableData1: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "待响应",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time: "2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "待响应",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time: "2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "待响应",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time: "2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "待响应",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "待响应",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time: "2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "待响应",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time: "2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "待响应",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time: "2019-11-15"
        }
      ],
      tableData2: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "待完成",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time: "2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "待完成",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time: "2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "待完成",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time: "2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "待完成",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "待完成",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time: "2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "待完成",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time: "2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "待完成",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time: "2019-11-15"
        }
      ],
      tableData3: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "进行中",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time: "2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "进行中",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time: "2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "进行中",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time: "2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "进行中",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "进行中",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time: "2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "进行中",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time: "2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "进行中",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time: "2019-11-15"
        }
      ],
      tableData4: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "待审核",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time: "2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "待审核",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time: "2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "待审核",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time: "2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "待审核",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "待审核",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time: "2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "待审核",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time: "2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "待审核",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time: "2019-11-15"
        }
      ],
      tableData5: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "已完成",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time: "2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "已完成",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time: "2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "已完成",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time: "2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "已完成",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "已完成",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time: "2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "已完成",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time: "2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "已完成",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time: "2019-11-15"
        }
      ],
      tableData6: [
        {
          id: 1,
          name: "光电测控仪器设备",
          remarkstate: "未评价",
          state: "已废除",
          subname: "电视测角仪",
          company: "长春奥普光电技术股份有限公司",
          time: "2019-11-15"
        },
        {
          id: 2,
          name: "磨床生产",
          remarkstate: "未评价",
          state: "已废除",
          subname: "平面磨床制作",
          company: "杭机集团长春一机有限公司",
          time: "2019-12-15"
        },
        {
          id: 3,
          name: "汽车电子产品研发",
          remarkstate: "未评价",
          state: "已废除",
          subname: "汽车集成服务",
          company: "启明信息技术股份有限公司",
          time: "2020-01-05"
        },
        {
          id: 4,
          name: "卫星应用数据创新",
          remarkstate: "未评价",
          state: "已废除",
          subname: "卫星应用数据",
          company: "哈尔滨航天恒星数据系统科技有限公司",
          time: "2019-11-15"
        },
        {
          id: 5,
          name: "通信技术设计",
          remarkstate: "未评价",
          state: "已废除",
          subname: "通信技术",
          company: "哈尔滨海邻科信息技术有限公司",
          time: "2019-11-30"
        },
        {
          id: 6,
          name: "高分子材料创新",
          remarkstate: "未评价",
          state: "已废除",
          subname: "高分子材料创新",
          company: "黑龙江省润特科技有限公司",
          time: "2020-01-07"
        },
        {
          id: 7,
          name: "发电智能制造",
          remarkstate: "未评价",
          state: "已废除",
          subname: "发电装备",
          company: "哈尔滨电机厂有限责任公司",
          time: "2019-11-15"
        }
      ],
      addList: {
        id: null,
        address: "",
        name: "",
        money: null,
        state: null,
        date: null
      },
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      form: {},
      idx: -1,
      id: -1,
      radio: "1",
      selectname:"",
      taskState:"",
      taskCheck:'',
    };
    
  },  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
      },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        userName: "aaaa"
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/SubstaskInformation/selectLiutongByCompanyID1",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },
    handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name == 'second'){
          // 触发‘配置管理’事件
          this.taskState = 0,
          this.second(this.taskState);
        }else if(tab.name == 'third'){
           this.taskState = 2,
          this.second(this.taskState);
        }else if(tab.name == 'forth'){
          this.taskState = 4,
          this.second(this.taskState);
        }else if(tab.name == 'fifth'){
          this.taskState = 5,
          this.second(this.taskState);
        }else if(tab.name == 'sixth'){
           this.taskState = 6,
          this.second(this.taskState);
        }else if(tab.name == 'seventh'){
          this.taskState = 7,
          this.second(this.taskState);
        }
      },
    second(taskState){
      console.log(this.taskState);
      var that = this;
      var data = Qs.stringify({
        userName:"aaaa",
        taskState:taskState,
      })
      console.log(data);
      that
        .axios({
          method:"post",
          url:"http://127.0.0.1:8082/MainTaskInformation/selectByCompanyandState",
          data:data
        })
        .then(response =>{
          if(this.taskState == 0){
            console.log(response);
          this.tableData1 = response.data.allData;
          }
              else if(this.taskState == 2){
            console.log(response);
          this.tableData2 = response.data.allData;
          }
           else if(this.taskState == 4){
            console.log(response);
          this.tableData3 = response.data.allData;
          } 
          else if(this.taskState == 5){
            console.log(response);
          this.tableData4 = response.data.allData;
          }
           else if(this.taskState == 6){
            console.log(response);
          this.tableData5 = response.data.allData;
          } 
          else if(this.taskState == 7){
            console.log(response);
          this.tableData6 = response.data.allData;
          }
        })
    },

    

    // 触发搜索按钮
     handleSearch() {
      console.log(this.selectname);
      var that = this;
      var data = Qs.stringify({
        username: "aaaa",
        taskName: this.selectname
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/SubstaskInformation/selectByCompanyandTaskNameandTaskType",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });

      //this.getData();
    },
    // 触发搜索按钮
     handleSearchByCondition() {
      console.log(this.selectname);
      console.log(this.taskState);
      var that = this;
      var data = Qs.stringify({
        username: "aaaa",
        taskName: this.selectname,
        taskState: this.taskState
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/SubstaskInformation/selectByCIDandTNandTS",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData1 = response.data.allData;
        });

      //this.getData();
    },
    // 废除操作
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
          url:
            "http://127.0.0.1:8082/MainTaskInformation/feicuBySubstaskstaskID",
          data: data

          // data:this.$store.state.userName
        });
        this.$message.success("废除成功");
        this.tableData.splice(index, 1);
      });
    },




    saveAdd1(){
      var that =this;
      var data = Qs.stringify({
        taskId:this.taskId,
        FrefuseReason:this.addList.FrefuseReason,
      })
      console.log(data),
      that
        .axios({
          method:"post",
          url:'http://127.0.0.1:8082/SubstaskInformation/tijiaoFreason',
          data:data,
          
        })
    this.$message.success("提交成功");
    this.addList = {};
    this.addVisible = false;
    },



    saveAdd2(){
      var that =this;
      var data = Qs.stringify({
        taskId:this.taskId,
        TrefuseReason:this.addList1.TrefuseReason,
      })
      console.log(data),
      that
        .axios({
          method:"post",
          url:'http://127.0.0.1:8082/SubstaskInformation/tijiaoTreason',
          data:data,
          
        })
    this.$message.success("提交成功");
    this.addList1 = {};
    this.addVisible1 = false;
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    delAllSelection() {
      let length = this.multipleSelection.length;
      let str = "";
      for (let j = 0; j < length; j++) {
        this.tableData.splice(this.multipleSelection[j], 1);
        str += this.multipleSelection[j].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    //新增操作
    addData() {
      this.addVisible = true;
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
    /*
     *转跳对应任务信息页面
     */
    Detail(row) {
      console.log(row.taskId);
      this.$router.push({
       path: "/admin/taskDetail",
       query:{
         taskId:row.taskId
       }
       });
    },
   
    open2(row) {
      if(row.assignmentState == "待审核"||row.assignmentState =="审核未通过"){
        this.$confirm("确定将任务计划书审核通过么？", "提示", {
        type: "warning"
      }).then(()=>{
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          substakeID:row.taskId
        });
        console.log(data);
        that.axios({
          method:"post",
          url:
          "http://127.0.0.1:8082/SubstaskInformation/updateRWJHtoIng",
          data:data
        });  
         this.$message({
        message: "审核通过",
        type: "success"
      });
      })
      }
      else {
        this.$confirm("任务计划书已审核通过无需再次审核", "提示", {
        type: "warning"
      })
      }
        
   
    },
    tuzhishenhe(row){
      this.taskCheck = row.taskCheck;
      if(this.taskCheck == "企业验收不通过"||this.taskCheck == "供应商审核通过"){
        this.$confirm("确定将设计图纸审核通过么？", "提示", {
        type: "warning"
      }).then(()=>{
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          substakeID:row.taskId
        });
        console.log(data);
        that.axios({
          method:"post",
          url:
          "http://127.0.0.1:8082/SubstaskInformation/updatetoDSHtoAcc",
          data:data
        });  
         this.$message({
        message: "审核通过",
        type: "success"
      });
      })
      }
            else if(this.taskCheck =="企业验收通过"){ this.$confirm("企业已审核通过无需再审核", "提示", {
        type: "warning"
      })
      }

      else{ this.$confirm("待供应商将图纸审核完毕后，企业再行审核", "提示", {
        type: "warning"
      })
      }

    },
     open(row) {
       if(row.assignmentState == "待审核"||row.assignmentState =="审核未通过"){
                 this.addVisible = true;
        this.taskId = row.taskId;
        console.log(this.taskId);
       }
      else {
        this.$confirm("任务计划书已审和通过，无需再次审核", "提示", {
        type: "warning"
      })
      }

        
      },
     tuzhiNo(row) {
       if(this.taskCheck == "供应商审核通过"||this.taskCheck == "企业验收不通过"){
        this.addVisible1 = true;
        this.taskId = row.taskId;
        console.log(this.taskId);
       }

      else if(this.taskCheck == "待审核"||this.taskCheck == "供应商验收不通过"){ 
                this.$confirm("等待供应商将图纸审核完毕后，企业再行审核", "提示", {
        type: "warning"
      })
      }
      else{
        this.$confirm("企业已通过设计图纸，无法拒绝", "提示", {
        type: "warning"
      })
      }
      },
      	handleCurrentChange(cpage) {

					this.pageIndex = cpage;

				},

				handleSizeChange(psize) {

					this.pageSize = psize;

                },

                handleSelectionChange(val) {

                    console.log(val)

                }
    }
  }
  

</script>
<style>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
  font-size: 14px;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.box {
  font-size: 24px;
}
.box1 {
  font-size: 14px;
}

</style>


