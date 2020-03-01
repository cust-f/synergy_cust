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
                  <el-input v-model="query.name" placeholder="需求任务名称" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                  :data="tableData"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="name" label="需求任务名称"></el-table-column>
                  <el-table-column prop="subname" label="分解任务名称"></el-table-column>
                  <el-table-column prop="company" label="企业名称"></el-table-column>
                  <el-table-column prop="time" label="截止时间"></el-table-column>
                  <el-table-column prop="state" label="状态" align="center">
                  </el-table-column>
                   <el-table-column label="操作" align="center" class="box1">
                    <template slot-scope="scope">


                  <el-button
                    @click="Detail(scope.$index, scope.row)"
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
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                  ></el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="待响应" name="second">
                <div class="handle-box">
                 
                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="query.name" placeholder="需求任务名称" class="handle-input mr10"></el-input>
                  <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                  :data="tableData1"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="name" label="需求任务名称"></el-table-column>
                  <el-table-column prop="subname" label="分解任务名称"></el-table-column>
                  <el-table-column prop="company" label="企业名称"></el-table-column>
                  <el-table-column prop="time" label="截止时间"></el-table-column>
          
                  <el-table-column label="操作" align="center" >
                    <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
                  >废除</el-button>

                  <el-button
                    @click="Detail(scope.$index, scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                  
                    </el-table-column>

                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                  ></el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="任务计划" name="third">
                <div class="handle-box">

                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="query.name" placeholder="需求任务名称" class="handle-input mr10"></el-input>
                  <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                  :data="tableData2"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="name" label="需求任务名称"></el-table-column>
                  <el-table-column prop="subname" label="分解任务名称"></el-table-column>
                  <el-table-column prop="company" label="企业名称"></el-table-column>
                  <el-table-column prop="time" label="上传时间"></el-table-column>
                  <el-table-column prop="state" label="状态" align="center" width="80">
                  </el-table-column>
                  
                  <el-table-column label="任务书" align="center" width="55" >
                    <el-button type="text" size="small" class="box1">下载</el-button>
                  </el-table-column>
                  <el-table-column label="审核" align="center">
                    <el-button type="success" size="mini" plain @click="open2">审核通过</el-button>
                    <br>
                    <el-button type="danger" size="mini" plain @click="open">审核不通过</el-button>
                  </el-table-column>
                  <el-table-column label="操作" align="center" >


                  <el-button
                    @click="Detail"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                  
                    </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                  ></el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="进行中" name="forth">
                <div class="handle-box">

                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="query.name" placeholder="需求任务名称" class="handle-input mr10"></el-input>
                  <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                  :data="tableData3"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="name" label="需求任务名称"></el-table-column>
                  <el-table-column prop="subname" label="分解任务名称"></el-table-column>
                  <el-table-column prop="company" label="企业名称"></el-table-column>
                  <el-table-column prop="time" label="截至时间"></el-table-column>
                  <el-table-column label="操作" align="center" >


                  <el-button
                    @click="Detail"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                  
                    </el-table-column>

                </el-table>
                <div class="pagination">
                  <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                  ></el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="待审核" name="fifth">
                <div class="handle-box">
                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="query.name" placeholder="需求任务名称" class="handle-input mr10"></el-input>
                  <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                  :data="tableData4"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="name" label="需求任务名称"></el-table-column>
                  <el-table-column prop="subname" label="分解任务名称"></el-table-column>
                  <el-table-column prop="company" label="企业名称"></el-table-column>
                  <el-table-column prop="time" label="上传时间"></el-table-column>
                  <el-table-column prop="state" label="状态" align="center" width="55">
                  </el-table-column>
                  <el-table-column label="图纸" align="center" width="55">
                    <el-button type="text" size="small" class="box1">查看</el-button>
                  </el-table-column>
                  <el-table-column label="审核" align="center">
                    <el-button type="success" size="mini" plain @click="open2">审核通过</el-button>
                    <br>
                    <el-button type="danger" size="mini" plain @click="open">审核不通过</el-button>
                  </el-table-column>
                  <el-table-column label="操作" align="center" >


                  <el-button
                    @click="Detail"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                  
                    </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                  ></el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="已完成" name="sisth">
                <div class="handle-box">

                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="query.name" placeholder="需求任务名称" class="handle-input mr10"></el-input>
                  <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                  :data="tableData5"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="name" label="需求任务名称"></el-table-column>
                  <el-table-column prop="subname" label="分解任务名称"></el-table-column>
                  <el-table-column prop="company" label="企业名称"></el-table-column>
                  <el-table-column prop="time" label="完成时间"></el-table-column>
                    <el-table-column label="任务书" align="center" >
                    <el-button type="text" size="small" class="box1">下载</el-button>
                  </el-table-column>
                  <el-table-column label="图纸" align="center" >
                   <el-button type="text" size="small" class="box1">查看</el-button>
                  </el-table-column>

                  <el-table-column label="操作" align="center" class="box1">
                    <template slot-scope="scope">

                  <el-button
                    @click="Detail"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                        </template></el-table-column>

                </el-table>
                <div class="pagination">
                  <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                  ></el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="已废除" name="seventh">
                <div class="handle-box">
                 
                  <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
                  <el-input v-model="query.name" placeholder="需求任务名称" class="handle-input mr10"></el-input>
                  <el-input v-model="query.state" placeholder="状态" class="handle-input mr10"></el-input>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
                <el-table
                  :data="tableData6"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                  <el-table-column prop="name" label="需求任务名称"></el-table-column>
                  <el-table-column prop="subname" label="分解任务名称"></el-table-column>
                  <el-table-column prop="company" label="企业名称"></el-table-column>

                  <el-table-column label="操作" align="center" >
                        <template slot-scope="scope">

                  <el-button
                    @click="Detail"
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
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                  ></el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Qs from 'qs';
export default {
  name: "designTask",
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      activeName: "first",
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
      form: {},
      idx: -1,
      id: -1,
      radio: "1"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //   this.tableData = res.list;
      //   this.pageTotal = tableData.length;
    },
    handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name == 'second'){
        	// 触发‘配置管理’事件
        	this.second();
        }else if(tab.name == 'first'){
        	// 触发‘用户管理’事件
        	this.first();
        }else if(tab.name == 'third'){
          this.third();
        }
      },
    second(){
      console.log(this,userName);
      var that = this;
      var data = Qs.stringify({
        userName:"aaaa",
        taskState:0,
      })
      console.log(data);
      that
        .axios({
          method:"post",
          url:"http://127.0.0.1:8082/MainTaskInformation/selectByCompanyandState",
          data:data
        })
        .then(response =>{
          console.log(response);
          this.tableData1 = response.data.allData;
        })
    },

    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
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
    Detail() {
      this.$router.push("/admin/mainStaskDetail");
    },
    open2() {
      this.$message({
        message: "审核通过",
        type: "success"
      });
    },
     open() {
        this.$prompt('请输入审核不通过的原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
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


