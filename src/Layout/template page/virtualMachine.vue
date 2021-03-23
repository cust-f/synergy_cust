
<template>
  <el-container style="overflow: hidden" class="visual">
    <div style="padding: 0px">
      <header-synergy></header-synergy>
    </div>
    <div>
      <el-container style="padding: 0px; overflow: hidden">
        <el-header style="height: 50px">
          <el-page-header
            style="padding-top: 15px; margin-left: 15px"
            @back="goBack"
            content="任务工作台"
          ></el-page-header>
        </el-header>
        <el-main style="overflow: hidden">
          <el-container>
            <el-container>
              <el-main width="73%" id="kvm-left" class="work">
                <el-tabs type="border-card" v-model="activeName">
                  <el-tab-pane
                    v-for="(item, index) in VisualMachineList"
                    :key="index"
                    :label="item.taskName"
                    :name="item.taskId"
                  >
                    <div
                      class="show-iframe"
                      id="visual"
                      :style="{ height: screenHeight - 80 + 'px' }"
                    >
                      <iframe
                        style="width:100%;height:100%;                                                                                                                                                                                                                                                                                            position：absolute;width: 100%;height:90%; top: 0;left:0;bottom:0;"
                        frameborder="0"
                        scrolling="yes"
                        :src="item.ip"
                      ></iframe>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-main>

              <div
                id="movebar"
                style="width: 2px; z-index: 2; background: #cccccc"
              ></div>

              <el-aside width="30%" id="kvm-right">
                <!--任务详情列表-->
                <el-tabs v-model="activeTab" type="border-card">
                  <el-tab-pane
                    class="cur"
                    :style="{ height: (screenHeight-105)*0.4 + 'px' }"
                    label="任务详情"
                    name="first"
                  >
                    <br />
                    <el-row style="margin-bottom: 5px">
                      <el-col :span="5" align="right">公司名称:</el-col>
                      <el-col :span="15" style="margin-left: 30px">{{
                        taskDetail.taskCode
                      }}</el-col>
                    </el-row>

                    <el-row style="margin-bottom: 5px">
                      <el-col :span="5" align="right">任务名称:</el-col>
                      <el-col :span="15" style="margin-left: 30px">{{
                        taskDetail.taskName
                      }}</el-col>
                    </el-row>

                    <el-row style="margin-bottom: 5px">
                      <el-col :span="5" align="right">任务类型:</el-col>
                      <el-col :span="15" style="margin-left: 30px">{{
                        taskDetail.taskType
                      }}</el-col>
                    </el-row>

                    <el-row style="margin-bottom: 5px">
                      <el-col :span="5" align="right">截止日期:</el-col>
                      <el-col :span="16" style="margin-left: 30px">{{
                        taskDetail.taskDeadline | dataFormat("yyyy-MM-dd")
                      }}</el-col>
                    </el-row>
                    <el-row style="margin-bottom: 5px">
                      <el-col :span="5" align="right">联系电话:</el-col>
                      <el-col :span="15" style="margin-left: 30px">
                        <span>{{ taskDetail.phone }}</span>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 5px">
                      <el-col :span="5" align="right">任务详情:</el-col>
                      <el-col :span="17" style="margin-left: 30px">
                        <span>{{ taskDetail.taskDescription }}</span>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <!-- <el-tab-pane class="cur" label="文档提交" name="second">
                    假装这里有个富文本编辑器
                    <br />
                  </el-tab-pane>
                  <el-tab-pane class="cur" label="预留标签1" name="third">预留标签1</el-tab-pane>-->
                </el-tabs>

                <!--资源推荐列表-->
                <el-tabs v-model="activeTab2" type="border-card">

                <el-tab-pane
                    label="资源推荐"
                    name="first2"
                    :style="{ height: (screenHeight-105)*0.6 + 'px'}"
                    style="overflow-y:auto;overflow-x:hidden;"
                >
                <el-tabs
                  v-model="activeRecommend"
                  type="card"
                  @tab-click="handleClick"
                >
                  <el-tab-pane
                    label="期刊"
                    name="wf_mds_chn_qikan"
                    v-loading="loading"
                    :disabled="qikanDisabled"
                    style="min-height:499px;"
                  >
                    <br />
                    <div v-for="(item, index) in qikanCurrentList" :key="index" @click="qikanDetail(item)">
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">标题：</el-col>
                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="item.title" placement="bottom" v-if="item._source.title.length>=25">
                            <span style="font-weight: bold" >
                              {{ changeString(item._source.title).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span style="font-weight: bold" v-else>
                            {{ changeString(item._source.title) }}
                          </span>
                        </el-col>
                      </el-row>
                      
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">作者：</el-col>
                        <el-col :span="7">
                          {{ changeString(item._source.author) }}
                        </el-col>
                        <el-col :span="6" align="right">在线出版日期：</el-col>
                        <el-col :span="6">
                          {{ changeString(item._source.date) }}
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">分类号：</el-col>
                        <el-col :span="7">
                          {{ changeString(item._source.mcid) }}
                        </el-col>
                        <el-col :span="6" align="right">资源交易方式：</el-col>
                        <el-col :span="6">
                          <span>{{ item.charge_type }}</span>
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">资源评价数：</el-col>
                        <el-col :span="7">
                          <span>{{ item.comment_num }}</span>
                        </el-col>
                        <el-col :span="6" align="right">资源评分：</el-col>
                        <el-col :span="6">
                          <span>{{ item.comment_score }}</span>
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5
                        " align="right">关键词：</el-col>

                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="changeString(item._source.keyword)" placement="bottom" v-if="item._source.keyword.length>=25">
                            <span>
                              {{ changeString(item._source.keyword).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span v-else>
                            {{ changeString(item._source.keyword) }}
                          </span>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="17">
                        <img style="width: 25px; height: 25px; float: left;margin-right:5px" src="../../assets/img/zheda.png" />
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </el-col>
                          <el-col :span="4" align="right">资料来源：</el-col>
                        <el-col :span="3" align="left">
                          <p>{{ "万方" }}<img style="width: 17px; height: 17px;" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                        <br /><br />
                        <el-divider></el-divider>
                      </el-row>
                    </div>
                    <div>
                      <el-pagination
                        :hide-on-single-page="true"
                        layout="prev, pager, next, jumper"
                        @current-change="qikanCurrentChange"
                        :current-page="qikanCurrentPage"
                        :page-size="qikanPageSize"
                        :total="qikanTotal"
                      ></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane
                    label="成果"
                    name="wf_mds_chn_cstad"
                    v-loading="loading"
                     :disabled="chengguoDisabled"
                    style="min-height:499px;"
                  >
                    <br />
                    <div v-for="(item, index) in chengguoCurrentList" :key="index" @click="chengguoDetail(item)">
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">标题：</el-col>
                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="item.title" placement="bottom" v-if="item._source.title.length>=25">
                            <span style="font-weight: bold" >
                              {{ changeString(item._source.title).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span style="font-weight: bold" v-else>
                            {{ changeString(item._source.title) }}
                          </span>
                        </el-col>
                      </el-row>
                      
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">完成单位：</el-col>
                        <el-col :span="19">
                          {{ changeString(item._source.conname) }}
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">公布年份：</el-col>
                        <el-col :span="7">
                          {{ changeString(item._source.year) }}
                        </el-col>
                        <el-col :span="6" align="right">资源交易方式：</el-col>
                        <el-col :span="6">
                          <span>{{ item.charge_type }}</span>
                        </el-col>
                      </el-row>
                        
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">资源评分：</el-col>
                        <el-col :span="7">
                          <span>{{ item.comment_score }}</span>
                        </el-col>
                        <el-col :span="6" align="right">资源评价数：</el-col>
                        <el-col :span="6">
                          <span>{{ item.comment_num}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">关键词：</el-col>

                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="changeString(item._source.keyword)" placement="bottom" v-if="item._source.keyword.length>=25">
                            <span>
                              {{ changeString(item._source.keyword).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span v-else>
                            {{ changeString(item._source.keyword) }}
                          </span>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="17">
                        <img style="width: 25px; height: 25px; float: left;margin-right:5px" src="../../assets/img/zheda.png" />
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </el-col>
                          <el-col :span="4" align="right">资料来源：</el-col>
                        <el-col :span="3" align="left">
                          <p>{{ "万方" }}<img style="width: 17px; height: 17px;" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                        <br /><br />
                        <el-divider></el-divider>
                      </el-row>

                    </div>
                    <div>
                      <el-pagination
                        :hide-on-single-page="true"
                        layout="prev, pager, next, jumper"
                        @current-change="chengguoCurrentChange"
                        :current-page="chengguoCurrentPage"
                        :page-size="chengguoPageSize"
                        :total="chengguoTotal"
                      ></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane
                    label="专利"
                    name="wf_mds_chn_zhuanli"
                    v-loading="loading"
                    style="min-height:499px"
                     :disabled="zhuanliDisabled"
                  >
                    <br />
                    <div v-for="(item, index) in zhuanliCurrentList" :key="index" @click="zhuanliDetail(item)">
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">标题：</el-col>
                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="item.title" placement="bottom" v-if="item._source.title.length>=25">
                            <span style="font-weight: bold" >
                              {{ changeString(item._source.title).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span style="font-weight: bold" v-else>
                            {{ changeString(item._source.title) }}
                          </span>
                        </el-col>
                      </el-row>
                      
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">设计人：</el-col>
                        <el-col :span="19">
                          {{ changeString(item._source.author) }}
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">申请日期：</el-col>
                        <el-col :span="7">
                          {{ changeString(item._source.date) }}
                        </el-col>
                        <el-col :span="6" align="right">资源交易方式：</el-col>
                        <el-col :span="6">
                          <span>{{ item.charge_type }}</span>
                        </el-col>
                      </el-row>
                        
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">资源评分：</el-col>
                        <el-col :span="7">
                          <span>{{ item.comment_score }}</span>
                        </el-col>
                        <el-col :span="6" align="right">资源评价数：</el-col>
                        <el-col :span="6">
                          <span>{{ item.comment_num}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">关键词：</el-col>

                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="changeString(item._source.keyword)" placement="bottom" v-if="item._source.keyword.length>=25">
                            <span>
                              {{ changeString(item._source.keyword).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span v-else>
                            {{ changeString(item._source.keyword) }}
                          </span>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="17">
                        <img style="width: 25px; height: 25px; float: left;margin-right:5px" src="../../assets/img/zheda.png" />
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </el-col>
                          <el-col :span="4" align="right">资料来源：</el-col>
                        <el-col :span="3" align="left">
                          <p>{{ "万方" }}<img style="width: 17px; height: 17px;" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                        <br /><br />
                        <el-divider></el-divider>
                      </el-row>
                    </div>
                    <div>
                      <el-pagination
                        :hide-on-single-page="true"
                        layout="prev, pager, next, jumper"
                        @current-change="zhuanliCurrentChange"
                        :current-page="zhuanliCurrentPage"
                        :page-size="zhuanliPageSize"
                        :total="zhuanliTotal"
                      ></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane
                    label="标准"
                    name="wf_mds_chn_biaozhun"
                    v-loading="loading"
                    style="min-height:499px"
                     :disabled="biaozhunDisabled"
                  >
                    <br />
                    <div v-for="(item, index) in biaozhunCurrentList" :key="index" @click="biaozhunDetail(item)">
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">标题：</el-col>
                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="item.title" placement="bottom" v-if="item._source.title.length>=25">
                            <span style="font-weight: bold" >
                              {{ changeString(item._source.title).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span style="font-weight: bold" v-else>
                            {{ changeString(item._source.title) }}
                          </span>
                        </el-col>
                      </el-row>
                      
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">发布单位：</el-col>
                        <el-col :span="19">
                          {{ changeString(item._source.releaseunit) }}
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">标准类型：</el-col>
                        <el-col :span="7">
                          <span>{{ changeString(item._source.type) }}</span>
                        </el-col>
                         <el-col :span="6" align="right">标准编号：</el-col>
                        <el-col :span="6">
                          <span>{{ changeString(item._source.sn) }}</span>
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">实施日期：</el-col>
                        <el-col :span="7">
                          <sapn>{{ changeString(item._source.impdate) }}</sapn>
                        </el-col>
                        <el-col :span="6" align="right">资源交易方式：</el-col>
                        <el-col :span="6">
                          <span>{{ item.charge_type }}</span>
                        </el-col>
                      </el-row>
                        
                      </el-row>
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">资源评价数：</el-col>
                        <el-col :span="7">
                          <span>{{ item.comment_num }}</span>
                        </el-col>
                        <el-col :span="6" align="right">资源评分：</el-col>
                        <el-col :span="6">
                          <span>{{ item.comment_score }}</span>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="17">
                        <img style="width: 25px; height: 25px; float: left;margin-right:5px" src="../../assets/img/zheda.png" />
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </el-col>
                          <el-col :span="4" align="right">资料来源：</el-col>
                        <el-col :span="3" align="left">
                          <p>{{ "万方" }}<img style="width: 17px; height: 17px;" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                        <br /><br />
                        <el-divider></el-divider>
                      </el-row>
                    </div>
                    <div>
                      <el-pagination
                        :hide-on-single-page="true"
                        layout="prev, pager, next, jumper"
                        @current-change="biaozhunCurrentChange"
                        :current-page="biaozhunCurrentPage"
                        :page-size="biaozhunPageSize"
                        :total="biaozhunTotal"
                      ></el-pagination>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane
                    label="法规"
                    name="wf_mds_chn_claw"
                    v-loading="loading"
                    style="min-height:499px"
                     :disabled="faguiDisabled"
                  >
                    <br />
                    <div v-for="(item, index) in faguiCurrentList" :key="index" @click="faguiDetail(item)">
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">标题：</el-col>
                        <el-col :span="19">
                          <el-tooltip class="item" effect="light" :content="item.title" placement="bottom" v-if="item._source.title.length>=25">
                            <span style="font-weight: bold" >
                              {{ changeString(item._source.title).substring(0,25)+"..." }}
                            </span>
                          </el-tooltip>
                          <span style="font-weight: bold" v-else>
                            {{ changeString(item._source.title) }}
                          </span>
                        </el-col>
                      </el-row>
                      
                      <el-row class="tab-row">
                        <el-col :span="5" align="right">颁发部门：</el-col>
                        <el-col :span="19">
                          {{ changeString(item._source.org) }}
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">内容分类：</el-col>
                        <el-col :span="7">
                          {{ changeString(item._source.concls) }}
                        </el-col>
                        <el-col :span="6" align="right">颁布日期：</el-col>
                        <el-col :span="6">
                          {{ changeString(item._source.proddate) }}
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">分类号：</el-col>
                        <el-col :span="7">
                          {{ changeString(item._source.mcid) }}
                        </el-col>
                        <el-col :span="6" align="right">资源交易方式：</el-col>
                        <el-col :span="6">
                          <span>{{ item.charge_type }}</span>
                        </el-col>
                      </el-row>

                      <el-row class="tab-row">
                        <el-col :span="5" align="right">资源评价数：</el-col>
                        <el-col :span="7">
                          <span>{{ item.comment_num }}</span>
                        </el-col>
                        <el-col :span="6" align="right">资源评分：</el-col>
                        <el-col :span="6">
                          <span>{{ item.comment_score }}</span>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="17">
                        <img style="width: 25px; height: 25px; float: left;margin-right:5px" src="../../assets/img/zheda.png" />
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </el-col>
                          <el-col :span="4" align="right">资料来源：</el-col>
                        <el-col :span="3" align="left">
                          <p>{{ "万方" }}<img style="width: 17px; height: 17px;" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                        <br /><br />
                        <el-divider></el-divider>
                      </el-row>
                    </div>
                    <div>
                      <el-pagination
                        :hide-on-single-page="true"
                        layout="prev, pager, next, jumper"
                        @current-change="faguiCurrentChange"
                        :current-page="faguiCurrentPage"
                        :page-size="faguiPageSize"
                        :total="faguiTotal"
                      ></el-pagination>
                    </div>
                  </el-tab-pane>
                </el-tabs>
                </el-tab-pane>
                 </el-tabs>
                <!--资源推荐弹框-->
                <el-dialog title="期刊详情" :visible.sync="qikanVisible" width="960px" >
                   <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;font-size:18px;">资源详情</div> -->
                   <template v-if="Object.keys(qikanForm).length !== 0">
                   <el-row style="line-height:21px;" >
                        <el-col :span="20">
                          <span style="font-weight: bold;font-size:18px;">
                            {{ qikanForm._source.title }}
                          </span>
                        </el-col>
                        <el-col :span="4" align="right">
                          <p style="font-size:16px;">{{ "资料来源：万方" }}<img style="width: 20px; height: 20px; float: right" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">作者：</el-col>
                        <el-col :span="9">
                          {{ changeString(qikanForm._source.author) }}
                        </el-col>
                        <el-col :span="3" align="right">分类号：</el-col>
                        <el-col :span="9">
                          {{ changeString(qikanForm._source.mcid) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">期刊名(中)：</el-col>
                        <el-col :span="9">
                          {{ changeString(qikanForm._source.joucn) }}
                        </el-col>
                        <el-col :span="3"  align="right">期刊名(英)：</el-col>
                        <el-col :span="9">
                          {{ changeString(qikanForm._source.jouen) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">在线出版日期：</el-col>
                        <el-col :span="9">
                          {{ changeString(qikanForm._source.date) }}
                        </el-col>
                        <el-col :span="3"  align="right">资源交易方式：</el-col>
                        <el-col :span="9">
                          {{ qikanForm.charge_type }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">资源评价数：</el-col>
                        <el-col :span="9">
                          {{ qikanForm.comment_num }}
                        </el-col>
                        <el-col :span="3"  align="right">资源评分：</el-col>
                        <el-col :span="9">
                          {{ qikanForm.comment_score }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">摘要：</el-col>
                        <el-col :span="21">
                          <span>{{ changeString(qikanForm._source.abstract) }}</span>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>
                      <el-row>
                        <el-col :span="12">
                        <img style="width: 25px; height: 25px; float: left" src="../../assets/img/zheda.png" />
                        <p style=" font-size: 16px; color: #7d7974; float: left; line-height: 30px; margin-left: 10px;">
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </p>
                        </el-col>
                        <el-col :span="12">
                          <el-link :href="'http://s.wanfangdata.com.cn/periodical?q='+qikanForm.title" target="_blank" class="elLink">查看详情</el-link>
                        </el-col>
                        <br />
                      </el-row>
                   </template>
                </el-dialog>

                <el-dialog title="成果详情" :visible.sync="chengguoVisible" width="960px" >
                   <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;font-size:18px;">资源详情</div> -->
                   <template v-if="Object.keys(chengguoForm).length !== 0">
                   <el-row style="line-height:21px;" >
                        <el-col :span="20">
                          <span style="font-weight: bold;font-size:18px;">
                            {{ chengguoForm._source.title }}
                          </span>
                        </el-col>
                        <el-col :span="4" align="right">
                          <p style="font-size:16px;">{{ "资料来源：万方" }}<img style="width: 20px; height: 20px; float: right" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">完成单位：</el-col>
                        <el-col :span="9">
                          {{ changeString(chengguoForm._source.conname) }}
                        </el-col>
                        <el-col :span="3" align="right">成果类别：</el-col>
                        <el-col :span="9">
                          {{ changeString(chengguoForm._source.fitclass) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">省市：</el-col>
                        <el-col :span="9">
                          {{ changeString(chengguoForm._source.fendorgprovince) }}
                        </el-col>
                        <el-col :span="3"  align="right">限制使用：</el-col>
                        <el-col :span="9">
                          {{ changeString(chengguoForm._source.restri) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">公布年份：</el-col>
                        <el-col :span="9">
                          {{ changeString(chengguoForm._source.year) }}
                        </el-col>
                        <el-col :span="3"  align="right">资源交易方式：</el-col>
                        <el-col :span="9">
                          {{ chengguoForm.charge_type }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">资源评价数：</el-col>
                        <el-col :span="9">
                          {{ chengguoForm.comment_num }}
                        </el-col>
                        <el-col :span="3"  align="right">资源评分：</el-col>
                        <el-col :span="9">
                          {{ chengguoForm.comment_score }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">简介：</el-col>
                        <el-col :span="21">
                          <span>{{ changeString(chengguoForm._source.intro) }}</span>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>
                      <el-row>
                        <el-col :span="12">
                        <img style="width: 25px; height: 25px; float: left" src="../../assets/img/zheda.png" />
                        <p style=" font-size: 16px; color: #7d7974; float: left; line-height: 30px; margin-left: 10px;">
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </p>
                        </el-col>
                        <el-col :span="12">
                          <el-link :href="chengguoForm.url" target="_blank" class="elLink">查看详情</el-link>
                        </el-col>
                        <br />
                      </el-row>
                   </template>
                </el-dialog>


                <el-dialog title="专利详情" :visible.sync="zhuanliVisible" width="960px" >
                   <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;font-size:18px;">资源详情</div> -->
                   <template v-if="Object.keys(zhuanliForm).length !== 0">
                   <el-row style="line-height:21px;" >
                        <el-col :span="20">
                          <span style="font-weight: bold;font-size:18px;">
                            {{ zhuanliForm._source.title }}
                          </span>
                        </el-col>
                        <el-col :span="4" align="right">
                          <p style="font-size:16px;">{{ "资料来源：万方" }}<img style="width: 20px; height: 20px; float: right" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">设计人：</el-col>
                        <el-col :span="9">
                          {{ changeString(zhuanliForm._source.author) }}
                        </el-col>
                        <el-col :span="3" align="right">专利权人：</el-col>
                        <el-col :span="9">
                          {{ changeString(zhuanliForm._source.forgc) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">专利类型：</el-col>
                        <el-col :span="9">
                          {{ changeString(zhuanliForm._source.patt) }}
                        </el-col>
                        <el-col :span="3"  align="right">专利号：</el-col>
                        <el-col :span="9">
                          {{ changeString(zhuanliForm._source.reqno) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">申请日期：</el-col>
                        <el-col :span="9">
                          {{ changeString(zhuanliForm._source.date) }}
                        </el-col>
                        <el-col :span="3"  align="right">资源交易方式：</el-col>
                        <el-col :span="9">
                          {{ zhuanliForm.charge_type }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">资源评价数：</el-col>
                        <el-col :span="9">
                          {{ zhuanliForm.comment_num }}
                        </el-col>
                        <el-col :span="3"  align="right">资源评分：</el-col>
                        <el-col :span="9">
                          {{ zhuanliForm.comment_score }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">主权项：</el-col>
                        <el-col :span="21">
                          <span>{{ changeString(zhuanliForm._source.dom) }}</span>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>
                      <el-row>
                        <el-col :span="12">
                        <img style="width: 25px; height: 25px; float: left" src="../../assets/img/zheda.png" />
                        <p style=" font-size: 16px; color: #7d7974; float: left; line-height: 30px; margin-left: 10px;">
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </p>
                        </el-col>
                        <el-col :span="12">
                          <el-link :href="zhuanliForm.url" target="_blank" class="elLink">查看详情</el-link>
                        </el-col>
                        <br />
                      </el-row>
                   </template>
                </el-dialog>
                
                <el-dialog title="标准详情" :visible.sync="biaozhunVisible" width="960px" >
                   <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;font-size:18px;">资源详情</div> -->
                   <template v-if="Object.keys(biaozhunForm).length !== 0">
                   <el-row style="line-height:21px;" >
                        <el-col :span="20">
                          <span style="font-weight: bold;font-size:18px;">
                            {{ biaozhunForm._source.title }}
                          </span>
                        </el-col>
                        <el-col :span="4" align="right">
                          <p style="font-size:16px;">{{ "资料来源：万方" }}<img style="width: 20px; height: 20px; float: right" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">起草单位：</el-col>
                        <el-col :span="9">
                          {{ changeString(biaozhunForm._source.org) }}
                        </el-col>
                        <el-col :span="3" align="right">发布单位：</el-col>
                        <el-col :span="9">
                          {{ changeString(biaozhunForm._source.releaseunit) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">标准类型：</el-col>
                        <el-col :span="9">
                          {{ changeString(biaozhunForm._source.type) }}
                        </el-col>
                        <el-col :span="3"  align="right">标准编号：</el-col>
                        <el-col :span="9">
                          {{ changeString(biaozhunForm._source.sn) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">实施日期：</el-col>
                        <el-col :span="9">
                          {{ changeString(biaozhunForm._source.impdate) }}
                        </el-col>
                        <el-col :span="3"  align="right">资源交易方式：</el-col>
                        <el-col :span="9">
                          {{ biaozhunForm.charge_type }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">资源评价数：</el-col>
                        <el-col :span="9">
                          {{ biaozhunForm.comment_num }}
                        </el-col>
                        <el-col :span="3"  align="right">资源评分：</el-col>
                        <el-col :span="9">
                          {{ biaozhunForm.comment_score }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">摘要：</el-col>
                        <el-col :span="21">
                          <span>{{ changeString(biaozhunForm._source.abstract) }}</span>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>
                      <el-row>
                        <el-col :span="12">
                        <img style="width: 25px; height: 25px; float: left" src="../../assets/img/zheda.png" />
                        <p style=" font-size: 16px; color: #7d7974; float: left; line-height: 30px; margin-left: 10px;">
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </p>
                        </el-col>
                        <el-col :span="12">
                          <el-link :href="biaozhunForm.url" target="_blank" class="elLink">查看详情</el-link>
                        </el-col>
                        <br />
                      </el-row>
                   </template>
                </el-dialog>

                <el-dialog title="法规详情" :visible.sync="faguiVisible" width="960px" >
                   <!-- <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;font-size:18px;">资源详情</div> -->
                   <template v-if="Object.keys(faguiForm).length !== 0">
                   <el-row style="line-height:21px;" >
                        <el-col :span="20">
                          <span style="font-weight: bold;font-size:18px;">
                            {{ faguiForm._source.title }}
                          </span>
                        </el-col>
                        <el-col :span="4" align="right">
                          <p style="font-size:16px;">{{ "资料来源：万方" }}<img style="width: 20px; height: 20px; float: right" src="../../assets/img/wanfang.png"/></p>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">颁布部门：</el-col>
                        <el-col :span="9">
                          {{ changeString(faguiForm._source.org) }}
                        </el-col>
                        <el-col :span="3" align="right">效力级别：</el-col>
                        <el-col :span="9">
                          {{ changeString(faguiForm._source.valuelevel) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">内容分类：</el-col>
                        <el-col :span="9">
                          {{ changeString(faguiForm._source.concls) }}
                        </el-col>
                        <el-col :span="3"  align="right">发文文号：</el-col>
                        <el-col :span="9">
                          {{ changeString(faguiForm._source.pno) }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">颁布日期：</el-col>
                        <el-col :span="9">
                          {{ changeString(faguiForm._source.proddate) }}
                        </el-col>
                        <el-col :span="3"  align="right">资源交易方式：</el-col>
                        <el-col :span="9">
                          {{ faguiForm.charge_type }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">资源评价数：</el-col>
                        <el-col :span="9">
                          {{ faguiForm.comment_num }}
                        </el-col>
                        <el-col :span="3"  align="right">资源评分：</el-col>
                        <el-col :span="9">
                          {{ faguiForm.comment_score }}
                        </el-col>
                      </el-row>

                      <el-row style="margin-bottom:15px;font-size:16px;line-height:21px;">
                        <el-col :span="3" align="right">摘要：</el-col>
                        <el-col :span="21">
                          <span>{{ changeString(faguiForm._source.abstract) }}</span>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>
                      <el-row>
                        <el-col :span="12">
                        <img style="width: 25px; height: 25px; float: left" src="../../assets/img/zheda.png" />
                        <p style=" font-size: 16px; color: #7d7974; float: left; line-height: 30px; margin-left: 10px;">
                          版权所有：浙江大学、国家重点研发计划项目支持
                        </p>
                        </el-col>
                        <el-col :span="12">
                          <el-link :href="faguiForm.url" target="_blank" class="elLink">查看详情</el-link>
                        </el-col>
                        <br />
                      </el-row>
                   </template>
                </el-dialog>

              </el-aside>
            </el-container>
          </el-container>
        </el-main>
      </el-container>
    </div>
    <el-footer></el-footer>
  </el-container>
</template>


<script>
import headerSynergy from "../components/common/Front/Header";
import bus from "../components/common/Admin/bus";
import Qs from "qs";

export default {
  data() {
    return {
      //加载动画
      loading: true,
      //期刊分页数据
      qikanCurrentPage: 1,
      qikanPageSize: 2,
      qikanTotal: 0,
      qikanList: [], //期刊总数居
      qikanCurrentList: [], //期刊当前数据
      qikanForm:{},//期刊弹框表单数据
      qikanVisible:false,
      qikanDisabled:false,
      //成果分页数据
      chengguoCurrentPage: 1,
      chengguoPageSize: 2,
      chengguoTotal: 0,
      chengguoList: [], //成果总数据
      chengguoCurrentList: [], //成果当前数组
      chengguoForm:{},//成果弹框表单数据
      chengguoVisible:false,
      chengguoDisabled:false,
      //专利数据
      zhuanliCurrentPage: 1,
      zhuanliPageSize: 2,
      zhuanliTotal: 0,
      zhuanliList: [], //专利总数据
      zhuanliCurrentList: [], //专利当前数组
      zhuanliForm:{},//专利弹框表单数据
      zhuanliVisible:false,
      zhuanliDisabled:false,
      //标准分页数据
      biaozhunCurrentPage: 1,
      biaozhunPageSize: 2,
      biaozhunTotal: 0,
      biaozhunList: [], //标准总数组
      biaozhunCurrentList: [], //标准当前数组
      biaozhunForm:{},//标准弹框表单数据
      biaozhunVisible:false,
      biaozhunDisabled:false,
      //法规分页数据
      faguiCurrentPage: 1,
      faguiPageSize: 2,
      faguiTotal: 0,
      faguiList: [], //法规总数组
      faguiCurrentList: [], //法规当前数组
      faguiForm:{},//法规弹框表单数据
      faguiVisible:false,
      faguiDisabled:false,

      activeName: "first",
      taskDetail: [],
      taskName:"",
      activeTab: "first",
      activeTab2: "first2",
      activeRecommend: "wf_mds_chn_qikan",
      VisualMachineList: "",
      taskId: this.$route.query.taskId,
      screenHeight: document.documentElement.clientHeight,
    };
  },
  components: {
    "header-synergy": headerSynergy,
  },
  watch: {
    screenHeight: function (val) {
      // 监听屏幕高度变化
      var oIframe = document.getElementById("maindiv");
      // alert(this.$store.getters.screenHeight)
      oIframe.style.height = Number(val) - 40 + "px";
    },
  },
  created() {
    this.clearRecommandList();
    this.getVirtualTab();
    this.getTaskDetail(this.taskId);

  },
  mounted() {
    this.changeMobsfIframe();
    var _this = this;
    window.onresize = function () {
      // this.changeMobsfIframe();
      // var kvm_left = document.getElementById("kvm-left");
      // var kvm_right = document.getElementById("kvm-right");
      // kvm_left.style.width = "67%";
      // kvm_right.style.width = "33%";
      _this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
    /**
     * 鼠标拖动改变窗口大小
     */
    var move = true;
    this.dragControllerDiv(move);
  },
  methods: {
    //清空数组
    clearRecommandList(){
      this.zhuanliList=[];
      this.chengguoList=[];
      this.qikanList=[];
      this.faguiList=[];
      this.biaozhunList=[];
    },
    /**
     * iframe-宽高自适应显示
     */
    changeMobsfIframe() {
      const oIframe = document.getElementsByClassName("show-iframe");
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      console.log(oIframe.length);
      for (var i = 0; i < oIframe.length; i++) {
        oIframe[i].style.height = Number(deviceHeight) - 40 + "px"; //数字是页面布局高度差，其中的100可以根据自己的界面进行调整
      }
    },
    //查询任务详情
    getVirtualTab() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.$route.query.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/VisualMachine/getDesignVisualMachine",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.VisualMachineList = response.data.allData.VisualMachineList;
          this.activeName = this.VisualMachineList[0].taskId;
        });
    },
    goBack() {
      window.history.go(-1);
    },
    //获得任务详情
    getTaskDetail(id) {
      var that = this;
      var data = Qs.stringify({
        taskId: id,
      });
      that
        .axios({
          method: "post",
          url: "/api/VisualMachine/getTaskDetail",
          data: data,
        })
        .then((response) => {
          this.taskDetail = response.data.allData.taskDetail;
          // this.taskName = response.data.allData.taskDetail.taskName;
          this.showQikan("wf_mds_chn_qikan");
        });
    },
    // updataDetail(data) {
    //   this.getTaskDetail(this.activeName);
    // },
    backtolist() {
      this.$router.push("/admin/personnel_allotment/desinger");
    },
    dragControllerDiv: function (move) {
      var movebar = document.getElementById("movebar");
      movebar.onmousedown = function (e) {
        //获取左右距离
        var leftw = document.getElementById("kvm-left").offsetWidth;
        var rightw = document.getElementById("kvm-right").offsetWidth;
        //获取左右拖动快
        var kvm_left = document.getElementById("kvm-left");
        var kvm_right = document.getElementById("kvm-right");

        var mouse_start = e.pageX; //开始位置
        var mouse_end; //结束位置
        move = true;

        //插入一个全局的拖动把手（隐藏的）
        var mf = document.createElement("div");
        mf.setAttribute("id", "mf");
        mf.setAttribute(
          "style",
          "position:absolute;width:100%;height:100%;top:0;z-index:9999;cursor:w-resize"
        );
        document.body.appendChild(mf);

        window.onmousemove = function (event) {
          if (move && event.button == 0) {
            //当左键按下
            mouse_end = event.pageX;
            if (mouse_start < mouse_end) {
              //向右拖动
              if (rightw >= 10) {
                kvm_left.style.width = leftw + mouse_end - mouse_start + "px";
                leftw = leftw + mouse_end - mouse_start;

                kvm_right.style.width = rightw - mouse_end + mouse_start + "px";
                rightw = rightw - mouse_end + mouse_start;
              }
              if (rightw < 10) {
                kvm_right.style.width = 10 + "px";
                kvm_left.style.width = window.innerWidth - 10 + "px";
              }
            } else if (mouse_start > mouse_end) {
              //向左拖动
              if (leftw >= 1) {
                kvm_left.style.width = leftw - mouse_start + mouse_end + "px";
                leftw = leftw - mouse_start + mouse_end;
                kvm_right.style.width = rightw + mouse_start - mouse_end + "px";
                rightw = rightw + mouse_start - mouse_end;
              }
              if (leftw < 1) {
                kvm_left.style.width = 0 + "px";
                kvm_right.style.width = window.innerWidth + "px";
              }
            }
            mouse_start = mouse_end;
            var newleftw = document.getElementById("kvm-left").offsetWidth;
            var newrightw = document.getElementById("kvm-right").offsetWidth;
            var windows = window.innerWidth;
            if (newleftw > windows) {
              kvm_left.style.width = windows.innerWidth - 10 + "px";
              kvm_right.style.width = -10 + "px";
            }
            if (newrightw > windows) {
              kvm_right.style.width = windows.innerWidth + "px";
              kvm_left.style.width = 0 + "px";
            }
          }
        };
      };
      //释放把手
      window.onmouseup = function () {
        var mf = document.getElementById("mf");
        if (mf != null) {
          mf.remove();
          move = false;
        } 
      };
    },
    returnAcceptMession() {
      this.$router.push({ path: "/admin/designerAcceptList" });
    },
    //推荐资源tab页切换
    handleClick(tab, event) {
      this.showQikan(tab.name);
    },
    //字符串转换
    changeString(data) {
      if(data == null || data.length==0)
      return "暂无数据";
      else if(data.length >= 500)
      {
        return data.replaceAll("%",",").substring(0,500)+"...";
      }
      else{
        return data.replaceAll("%",",");
      }
    },
    //查看推荐资源
    showQikan(searchIndex) {
      if (
        (searchIndex == "wf_mds_chn_qikan" && this.qikanList.length == 0) ||
        (searchIndex == "wf_mds_chn_cstad" && this.chengguoList.length == 0) ||
        (searchIndex == "wf_mds_chn_zhuanli" && this.zhuanliList.length == 0) ||
        (searchIndex == "wf_mds_chn_biaozhun" &&this.biaozhunList.length == 0) ||
        (searchIndex == "wf_mds_chn_claw" && this.faguiList.length == 0))
      {
        this.loading = true;
        if(searchIndex == "wf_mds_chn_qikan"){
          this.chengguoDisabled = true;
          this.zhuanliDisabled = true;
          this.biaozhunDisabled = true;
          this.faguiDisabled = true;
        }
        if(searchIndex == "wf_mds_chn_cstad"){
          this.qikanDisabled = true;
          this.zhuanliDisabled = true;
          this.biaozhunDisabled = true;
          this.faguiDisabled = true;
        }
        if(searchIndex == "wf_mds_chn_zhuanli"){
          this.qikanDisabled = true;
          this.chengguoDisabled = true;
          this.biaozhunDisabled = true;
          this.faguiDisabled = true;
        }
        if(searchIndex == "wf_mds_chn_biaozhun"){
          this.qikanDisabled = true;
          this.chengguoDisabled = true;
          this.zhuanliDisabled = true;
          this.faguiDisabled = true;
        }
        if(searchIndex == "wf_mds_chn_claw"){
          this.qikanDisabled = true;
          this.chengguoDisabled = true;
          this.zhuanliDisabled = true;
          this.biaozhunDisabled = true;
        }
        var that = this;
        var data = {
          keyword: this.taskDetail.taskName,
          searchIndex: searchIndex,
        };
        that
          .axios({
            method: "get",
            url: "http://101.132.153.135:8448/demand/recommendResource",
            params: data,
          })
          .then((response) => {
            console.log(response);
            if (searchIndex == "wf_mds_chn_qikan") {
              this.qikanList = response.data.data;
              this.qikanTotal= Object.keys(response.data.data).length;
              this.qikanCurrentList = this.qikanList.slice((this.qikanCurrentPage - 1) * this.qikanPageSize,this.qikanPageSize);
              this.chengguoDisabled = false;
              this.zhuanliDisabled = false;
              this.biaozhunDisabled = false;
              this.faguiDisabled = false;
            }
            if (searchIndex == "wf_mds_chn_cstad") {
              this.chengguoList = response.data.data;
              this.chengguoTotal = Object.keys(response.data.data).length;
              this.chengguoCurrentList = this.chengguoList.slice((this.chengguoCurrentPage - 1) * this.chengguoPageSize,this.chengguoPageSize);
              this.qikanDisabled = false;
              this.zhuanliDisabled = false;
              this.biaozhunDisabled = false;
              this.faguiDisabled = false;
            }
            if (searchIndex == "wf_mds_chn_zhuanli") {
              this.zhuanliList = response.data.data;
              this.zhuanliTotal = Object.keys(response.data.data).length;
              this.zhuanliCurrentList = this.zhuanliList.slice((this.zhuanliCurrentPage - 1) * this.zhuanliPageSize,this.zhuanliPageSize);
              this.qikanDisabled = false;
              this.chengguoDisabled = false;
              this.biaozhunDisabled = false;
              this.faguiDisabled = false;
            }
            if (searchIndex == "wf_mds_chn_biaozhun") {
              this.biaozhunList = response.data.data;
              this.biaozhunTotal = Object.keys(response.data.data).length;
              this.biaozhunCurrentList = this.biaozhunList.slice((this.biaozhunCurrentPage - 1) * this.biaozhunPageSize,this.biaozhunPageSize);
              this.qikanDisabled = false;
              this.chengguoDisabled = false;
              this.zhuanliDisabled = false;
              this.faguiDisabled = false;
            }
            if (searchIndex == "wf_mds_chn_claw") {
              this.faguiList = response.data.data;
              this.faguiTotal = Object.keys(response.data.data).length;
              this.faguiCurrentList = this.faguiList.slice((this.faguiCurrentPage - 1) * this.faguiPageSize,this.faguiPageSize);
              this.qikanDisabled = false;
              this.chengguoDisabled = false;
              this.zhuanliDisabled = false;
              this.biaozhunDisabled = false;
            }
            //结束加载动画
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //期刊分页
    qikanCurrentChange(cpage) {
      this.qikanCurrentPage = cpage;
      this.qikanCurrentList = this.qikanList.slice((cpage - 1) * this.qikanPageSize, this.qikanPageSize * this.qikanCurrentPage);
    },
    //成果分页
    chengguoCurrentChange(cpage) {
      this.chengguoCurrentPage = cpage;
      this.chengguoCurrentList = this.chengguoList.slice((cpage - 1) * this.chengguoPageSize, this.chengguoPageSize * this.chengguoCurrentPage);
    },
    //专利分页
    zhuanliCurrentChange(cpage) {
      this.zhuanliCurrentPage = cpage;
      this.zhuanliCurrentList = this.zhuanliList.slice((cpage - 1) * this.zhuanliPageSize, this.zhuanliPageSize * this.zhuanliCurrentPage);
    },
    //标准分页
    biaozhunCurrentChange(cpage) {
      this.biaozhunCurrentPage = cpage;
      this.biaozhunCurrentList = this.biaozhunList.slice((cpage - 1) * this.biaozhunPageSize, this.biaozhunPageSize * this.biaozhunCurrentPage);
    },
    //法规分页
    faguiCurrentChange(cpage) {
      this.faguiCurrentPage = cpage;
      this.faguiCurrentList = this.faguiList.slice((cpage - 1) * this.faguiPageSize, this.faguiPageSize * this.faguiCurrentPage);
    },
    //期刊详情
    qikanDetail(item){
      console.log(item);
      this.qikanForm = item;
      this.qikanVisible = true;
    },
    //成果详情
    chengguoDetail(item){
      this.chengguoForm = Object.assign({}, item);
      this.chengguoVisible = true;
    },
    //标准详情
    biaozhunDetail(item){
      this.biaozhunForm = Object.assign({}, item);
      this.biaozhunVisible = true;
    },
    //专利详情
    zhuanliDetail(item){
      this.zhuanliForm = Object.assign({}, item);
      this.zhuanliVisible = true;
    },
    //法规详情
    faguiDetail(item){
      this.faguiForm = Object.assign({}, item);
      this.faguiVisible = true;
    },
  },
};
</script>
<style>
.buttons {
  margin-left: 70px;
  margin-top: 15px;
  width: 150px;
}
.visual .el-main {
  padding: 0px 0px;
  /* background-color: #F5F7FA; */
}
.visual .el-tabs__header {
  margin: 0px 0px;
}
.visual .el-tabs__content {
  padding: 0;
}
/* .visual .el-tabs__nav-scroll{
  background-color: #F5F7FA;
}
.visual .el-tabs--card>.el-tabs__header .el-tabs__nav{
  background-color: #FFF;
} */
.visual .el-dialog__body {
  padding:10px 30px 20px 30px;
}
.visual .el-divider--horizontal{
  margin: 5px 0 10px 0;
}
.visual .el-dialog__title{
  padding: 0 10px;
  border-left: 3px solid #4e58c5;
}
.visual .elLink{
  font-size: 16px;
  line-height: 30px;
  float: right;
  color: #7d7974;
}
.visual .tab-row{
  margin-bottom: 5px;
  font-size:16px;
  line-height:21px;
}
</style>