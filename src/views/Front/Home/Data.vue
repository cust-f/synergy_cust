<template>
  <div class="Data">
      <div class="title2">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/twoMenu' }">网站数据</el-breadcrumb-item>

          </el-breadcrumb>
        </div>
        <br>
        <el-card shadow="never" style="margin-bottom:20px;" class="tatolheader">
     
      <div slot="header">
        <div style=" margin:-18px -20px; padding:10px 20px; background: #dcdfe6;border-bottom: 1px solid #606266;">网站数据</div>
        
      </div>
    
    <el-button
      type="text"
      id="week"
      style="display:inline-block;font-size:15px;color:black"
      @click="weekDataB"
    >本周统计</el-button>
    <el-button
      type="text"
      id="month"
      style="display:inline-block;margin-left:5px;font-size:15px;color:black"
      @click="monthDataB"
    >本月统计</el-button>
    <div class="block" style="display:inline-block;margin-left:10px">
      <el-date-picker
        v-model="value1"
        type="daterange"
        unlink-panels="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <el-button type="primary" style="margin-left:15px" @click="paragraphData">搜索</el-button>

    <el-col :span="24" style="margin-top:10px;">
      <div v-show="isWeekData">
        <el-row :gutter="20" class="mgb20">
          <el-form ref="formWeek" :html="formWeek">
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-bell grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formWeek.weekCount"></div>
                    <div>本周成交任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formWeek.weekCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formWeek.weekCountRing)}}%</div>
                    <div
                      v-show="formWeek.weekCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formWeek.weekCountRing)}}%</div>
                    <div
                      v-show="formWeek.weekCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formWeek.weekCountRing)}}%</div>
                    <i
                      v-show="formWeek.weekCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formWeek.weekCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formWeek.weekCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-2">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formWeek.desingWeekCount"></div>
                    <div>设计任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formWeek.desingWeekCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formWeek.desingWeekCountRing)}}%</div>
                    <div
                      v-show="formWeek.desingWeekCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formWeek.desingWeekCountRing)}}%</div>
                    <div
                      v-show="formWeek.desingWeekCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formWeek.desingWeekCountRing)}}%</div>
                    <i
                      v-show="formWeek.desingWeekCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formWeek.desingWeekCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formWeek.desingWeekCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-3">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formWeek.circulaterWeekCount"></div>
                    <div>流通任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formWeek.circulaterWeekCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formWeek.circulaterWeekCountRing)}}%</div>
                    <div
                      v-show="formWeek.circulaterWeekCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formWeek.circulaterWeekCountRing)}}%</div>
                    <div
                      v-show="formWeek.circulaterWeekCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formWeek.circulaterWeekCountRing)}}%</div>
                    <i
                      v-show="formWeek.circulaterWeekCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formWeek.circulaterWeekCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formWeek.circulaterWeekCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-user grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formWeek.companyCount">32</div>
                    <div>认证企业</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formWeek.companyCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formWeek.companyCountRing)}}%</div>
                    <div
                      v-show="formWeek.companyCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formWeek.companyCountRing)}}%</div>
                    <div
                      v-show="formWeek.companyCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formWeek.companyCountRing)}}%</div>
                    <i
                      v-show="formWeek.companyCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formWeek.companyCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formWeek.companyCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <!-- <el-col :span="5" >
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num" v-html="form.supplierCompany">50</div>
                  <div>认证供应商</div>
                  <div style="display:inline">环比：</div>
                  <div class="" style="display:inline" v-html="form.monthCount"></div>
                  <i class="el-icon-caret-top" style="display:inline"></i>
                </div>
              </div>
            </el-card>
            </el-col>-->
          </el-form>
        </el-row>
      </div>
      <div v-show="isMonthData">
        <el-row :gutter="20" class="mgb20">
          <el-form ref="form" :html="form">
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-bell grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="form.monthCount"></div>
                    <div>本月成交任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="form.monthCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(form.monthCountRing)}}%</div>
                    <div
                      v-show="form.monthCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(form.monthCountRing)}}%</div>
                    <div
                      v-show="form.monthCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(form.monthCountRing)}}%</div>
                    <i
                      v-show="form.monthCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="form.monthCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="form.monthCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-2">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="form.desingMonthCount"></div>
                    <div>设计任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="form.desingMonthCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(form.desingMonthCountRing)}}%</div>
                    <div
                      v-show="form.desingMonthCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(form.desingMonthCountRing)}}%</div>
                    <div
                      v-show="form.desingMonthCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(form.desingMonthCountRing)}}%</div>
                    <i
                      v-show="form.desingMonthCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="form.desingMonthCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="form.desingMonthCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-3">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="form.circulaterMonthCount"></div>
                    <div>流通任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="form.circulaterMonthCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(form.circulaterMonthCountRing)}}%</div>
                    <div
                      v-show="form.circulaterMonthCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(form.circulaterMonthCountRing)}}%</div>
                    <div
                      v-show="form.circulaterMonthCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(form.circulaterMonthCountRing)}}%</div>
                    <i
                      v-show="form.circulaterMonthCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="form.circulaterMonthCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="form.circulaterMonthCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-user grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="form.companyCount">32</div>
                    <div>认证企业</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="form.companyCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(form.companyCountRing)}}%</div>
                    <div
                      v-show="form.companyCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(form.companyCountRing)}}%</div>
                    <div
                      v-show="form.companyCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(form.companyCountRing)}}%</div>
                    <i
                      v-show="form.companyCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="form.companyCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="form.companyCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div v-show="isParagraphData">
        <el-row :gutter="20" class="mgb20">
          <el-form ref="form" :html="form">
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-bell grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formParagraph.taskCount"></div>
                    <div>本段时间成交任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formParagraph.taskCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formParagraph.taskCountRing)}}%</div>
                    <div
                      v-show="formParagraph.taskCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formParagraph.taskCountRing)}}%</div>
                    <div
                      v-show="formParagraph.taskCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formParagraph.taskCountRing)}}%</div>
                    <i
                      v-show="formParagraph.taskCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formParagraph.taskCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formParagraph.taskCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-2">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formParagraph.desingCount"></div>
                    <div>设计任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formParagraph.desingCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formParagraph.desingCountRing)}}%</div>
                    <div
                      v-show="formParagraph.desingCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formParagraph.desingCountRing)}}%</div>
                    <div
                      v-show="formParagraph.desingCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formParagraph.desingCountRing)}}%</div>
                    <i
                      v-show="formParagraph.desingCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formParagraph.desingCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formParagraph.desingCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-3">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formParagraph.circulaterCount"></div>
                    <div>流通任务</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formParagraph.circulaterCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formParagraph.circulaterCountRing)}}%</div>
                    <div
                      v-show="formParagraph.circulaterCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formParagraph.circulaterCountRing)}}%</div>
                    <div
                      v-show="formParagraph.circulaterCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formParagraph.circulaterCountRing)}}%</div>
                    <i
                      v-show="formParagraph.circulaterCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formParagraph.circulaterCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formParagraph.circulaterCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-user grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" v-html="formParagraph.companyCount">32</div>
                    <div>认证企业</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                    <div
                      v-show="formParagraph.companyCountRing>0"
                      style="display:inline;font-size:5px;color:red"
                    >{{Math.abs(formParagraph.companyCountRing)}}%</div>
                    <div
                      v-show="formParagraph.companyCountRing<0"
                      style="display:inline;font-size:5px;color:green"
                    >{{Math.abs(formParagraph.companyCountRing)}}%</div>
                    <div
                      v-show="formParagraph.companyCountRing==0"
                      style="display:inline;font-size:5px"
                    >{{Math.abs(formParagraph.companyCountRing)}}%</div>
                    <i
                      v-show="formParagraph.companyCountRing>0"
                      class="el-icon-caret-top"
                      style="display:inline;color:red"
                    ></i>
                    <i
                      v-show="formParagraph.companyCountRing<0"
                      class="el-icon-caret-bottom"
                      style="display:inline;color:green"
                    ></i>
                    <i
                      v-show="formParagraph.companyCountRing==0"
                      class="el-icon-caret-top"
                      style="display:inline;"
                    ></i>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-form>
        </el-row>
      </div>
     <!--  ------------------------------------- 首页相关数据 ------------------------------------- -->
      <div v-show="isHomeData">
        <el-row :gutter="20" class="mgb20">
          <el-form ref="form" :html="form">
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-bell grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" >{{homeData.mainTask}}</div>
                    <div>服务成果数量</div>
                     <div style="display:inline;font-size:5px">环比：</div>
                   <div style="display:inline;font-size:5px;" >--%</div>
                  </div> 
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-2">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{homeData.task1}}</div>
                    <div>全部设计任务</div>
                     <div style="display:inline;font-size:5px">环比：</div>
                   <div style="display:inline;font-size:5px;" >--%</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-3">
                  <i class="el-icon-s-data grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num" >{{homeData.task2}}</div>
                    <div>全部流通任务</div>
                     <div style="display:inline;font-size:5px">环比：</div>
                   <div style="display:inline;font-size:5px;" >--%</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-user grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{homeData.companyData}}</div>
                    <div>认证企业</div>
                    <div style="display:inline;font-size:5px">环比：</div>
                   <div style="display:inline;font-size:5px;" >--%</div>
                   
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-col>

    <el-row :gutter="20">
      <el-col :span="8" style="margin-top:-5px;">
        <el-card shadow="hover" style="height:482px;margin-top: 10px;">
          <pie-chart ref="drawPieChart" :pieData="pieData"></pie-chart>
          <div v-show="noDataPie" style="margin-top: 200px;margin-left:105px;color:#ccc">无数据</div>
        </el-card>
      </el-col>

      <el-col :span="16" style="margin-top:-5px;">
        <el-card shadow="hover" style="height:482px;margin-top:10px;">
          <div slot="header" class="clearfix">
            <span>需求详情</span>
            <el-tabs v-model="activeName">
              <!-- <el-tab-pane label="分季度完成需求量统计" name="first">
                <div id="quarterlySituation" style="width: 600px;height:400px;"></div>
              </el-tab-pane>-->

              <el-tab-pane label="企业发布需求量Top5" name="first">
                <cloumn-chart1
                  ref="drawCloumnChart1"
                  :cloumnData1="cloumnData1"
                  style="width: 600px;height:400px;"
                ></cloumn-chart1>
              </el-tab-pane>
              <el-tab-pane label="企业完成需求量Top5" name="second">
                <cloumn-chart2
                  ref="drawCloumnChart2"
                  :cloumnData2="cloumnData2"
                  style="width: 600px;height:400px;"
                ></cloumn-chart2>
              </el-tab-pane>
              <!-- <el-tab-pane label="企业评分雷达" name="forth">
                <div id="comprehensiveScore" style="width: 600px;height:400px;"></div>
              </el-tab-pane>
              <el-tab-pane label="分类别需求量统计" name="fifth"> 
                <div class="demandTop5">日登录人数</div>
                <br />
                <div id="numberStatistics" style="width: 100%;height:390%;"></div>
              </el-tab-pane>-->
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>
<br/>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="type-situation">分类别需求量占比</div>
          <div style="float:right">
            <template>
              <el-select
                style="width:100px;margin-right:35px;"
                v-model="value"
                @change="pieChart"
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
            </template>
          </div>
          <br />
          <div id="typeSituation" :piedata="piedata" style="width: 100%;height:430%"></div>
          <div v-show="noData" style="margin-top: 50px;margin-left:405px;color:#ccc">无数据</div>
        </el-card>
      </el-col>
    </el-row>
    <br/>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="type-situation">流通清单类别量占比</div>
          <div style="float: right">
            <template>
              <el-select
                style="width: 100px; margin-right: 35px"
                v-model="valueL"
                @change="lineChartDataCategory"
              >
                <el-option
                  v-for="item in optionsL"
                  placeholder="请选择"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  width="20px"
                >
                </el-option>
              </el-select>
            </template>
          </div>
          <br />
          <!-- <div id="categoryLine" :lineData="lineData"  style="width: 100%;height:430%"></div> -->
          <template>
            <div
              id="categoryLine"
              :lineData="lineData"
              style="width: 100%; height: 430%"
            ></div>
            <div v-show="noData" style="margin-top: 50px;margin-left:405px;color:#ccc">无数据</div>
          </template>
        </el-card>
      </el-col>
    </el-row>
<br/>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="type-situation">流通零件类别销量趋势</div>
          <div style="float: left">
            <template>
              <el-select
                style="width: 200px; margin-left: 5px"
                v-model="lineCategory"
                @change="lineChartChangePre"
              >
                <el-option
                  v-for="item in optionsCate"
                  placeholder="请选择"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  width="20px"
                >
                </el-option>
              </el-select>
            </template>
          </div>
          <div style="float: right">
            <template>
              <el-select
                style="width: 100px; margin-right: 35px"
                v-model="lineYear"
                @change="lineChartChangePre"
              >
                <el-option
                  v-for="item in optionsPre"
                  placeholder="请选择"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  width="20px"
                >
                </el-option>
              </el-select>
            </template>
          </div>
          <br /><br /><br />
          <!-- <div id="categoryLine" :lineData="lineData"  style="width: 100%;height:430%"></div> -->
          <template>
            <line-chart :linePreData="linePreData" ref="drawLineChartPre"></line-chart>
            <div v-show="noData" style="margin-top: 50px;margin-left:405px;color:#ccc">无数据</div>
          </template>
        </el-card>
      </el-col>
    </el-row>

    <br />
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="partsPieChart" style="width: 100%;height:430%"></div>
          <!-- <template>
            <line-chart :linePreData="linePreData" ref="drawLineChartPre"></line-chart>
            <div v-show="noData" style="margin-top: 50px;margin-left:405px;color:#ccc">无数据</div>
          </template> -->
        </el-card>
      </el-col>
    </el-row>

    </el-card>
  </div>
</template>
<script>
import Qs from "qs";
import axios from 'axios';
import columnChart1 from "./components/columnChart1";
import columnChart2 from "./components/columnChart2";
import piechart1 from "./components/piechart1";
import lineChartPre from "./components/lineChartPre"; //销售预测折线图
import bus from "../../../Layout/components/common/Admin/bus";
export default {
  name: "Data",
  components: {
      "cloumn-chart1": columnChart1,
      "cloumn-chart2": columnChart2,
      "pie-chart": piechart1,
      "line-chart": lineChartPre
  },
  data() {
    return {
      //显示折线图
      optionsCate: [],
      lineCategory: "",
      optionsPre: [],
      lineYear: "",
      productCompanyId:"5561",
      productCompanyName:"",
      productName1:"离合器盒",
      lineTitle:"",
      /**
       * 数据统计
       */
      //销售折线图
      linePreData: {
        //销售量
        saleCount: [],
        //库存量
        inventoryCount: [],
        //月份数量
        months: [],
        //销售量(预测)
        salePredictionCount:[],
        //库存量(预测)
        inventoryPredictionCount:[],
      },
      name: sessionStorage.getItem("ms_username"),
      isWeekData: false,
      isMonthData: false,
      isParagraphData:false,
      isHomeData:true,
      noDataPie:true,
      noData:true,
      activeName: 'first',
      options: [],        
       value: '',
      optionsL:[],
      valueL:"",
       value1:[],//时间段选择数据定义
       dateValue0:'',
       dateValue1:'',
       //本周数据统计
       formWeek:{
        weekCount:[],
        desingWeekCount:[],
        circulaterWeekCount:[],
        companyCount:[],
        weekCountRing:[],
        desingWeekCountRing:[],
        circulaterWeekCountRing:[],
        companyCountRing:[],
       },
       //本月数据统计
      form:{
        monthCount:'',        
        desingMonthCount:[],
        circulaterMonthCount:[],
        companyCount:[],
       
        monthCountRing:'',
        desingMonthCountRing:[],
        circulaterMonthCountRing:[],
        companyCountRing:[],
      },
      //本段数据统计
      formParagraph:{
        taskCount:'',        
        desingCount:[],
        circulaterCount:[],
        companyCount:[],
       
        taskCountRing:'',
        desingCountRing:[],
        circulaterCountRing:[],
        companyCountRing:[],
      },
      homeData:{
        mainTask:[],
        task1:[],
        task2:[],
        companyData:[],
      },
      
     //柱状图1
      cloumnData1: {
        //年份
        Vintage1: [],
        //最高五家公司名称
        topCompanyName1: [],
        //今年任务完成量
        nowTaskNumber1: [],
        //去年任务完成量
        lastTaskNumber1: []
      },
       //柱状图2
      cloumnData2: {
        //年份
        Vintage2: [],
        //最高五家公司名称
        topSupplierName2: [],
        //今年任务完成量
        nowTaskNumber2: [],
        //去年任务完成量
        lastTaskNumber2: []
      },
      pieData: {
        searsonCount: [],
        seasonsFinishTaskCount: [],
        nowYear:""
      },
      piedata:{
        Count:[],
        categoryFinishTaskList:[],
      },
      //饼图的数据定义
      lineData: {
        categoryFinishTaskList: [],
        categoryName: [],
        nowYear: "",
        
      },
      partsPieData:{},
    };
  },computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
 
  //初始化方法
   created() {
    this.homeDataB();
    this.getYearData(); //获取条件选择时间数据
    this.getYearData1();
    this.getYearDataPre();
    this.getLineMainCategory();//获取条件选择零件类别数据
    this.getTimeData();//获取今年元旦和现在时间数据
    this.getStatistics();
    this.lineChartDataCategory();
    this.getLineChart1();
    this.getPartsPieData();//获得零件年度销售量环形图
    this.lineChartChangePre();
    
  },
  // mounted() {
   
  //    this.getCharts5()
  // //   this.getCharts6();
  //  },

  methods: {
    //获取条件选择时间数据
    getYearDataPre() {
      let that = this;
      that.axios.post("/api/findYearsList").then(response => {
        this.lineYear = response.data.allData.nowYear;
        this.optionsPre= response.data.allData.years;  
        this.lineChartChangePre(); 
      });
    },
    //获取条件选择零件类别数据
    getLineMainCategory() {
      let that = this;
      that.axios.post("/api/dataStatistics/findLineMainCategory").then(response => {
        this.lineCategory = response.data.allData.firstOne;
        this.optionsCate= response.data.allData.mainCategoryList;  
        this.lineChartChangePre(); 
      });
    },
    //时间变换查询销售折线图
    lineChartChangePre() {
      var that = this;
      var categoryId;
      if(this.lineCategory === "滤清器"){
        categoryId = 1
      }else{
        categoryId = this.lineCategory
      }
      var data = Qs.stringify({
          mainCategoryId: categoryId,
          // companyId: this.productCompanyId,
          // productName: this.productName1,
          year: this.lineYear,
        });
        console.log(this.lineCategory)
        console.log(data)
      that
      .axios({
            method: "post",
            url: "/api/dataStatistics/allMonthCategorySaleAndInventoryCountPrediction",
            data: data,
          })
        .then((response) => {
          this.linePreData.saleCount = response.data.allData.saleCount;
          this.linePreData.inventoryCount = response.data.allData.inventoryCount;
          this.linePreData.months = response.data.allData.monthCount;
          this.linePreData.salePredictionCount = response.data.allData.salePredictionCount;
          this.linePreData.inventoryPredictionCount = response.data.allData.inventoryPredictionCount;
          that.$refs.drawLineChartPre.getCharts();
          console.log(allData);
        });
    },

    handleClick(tab, event) {
        console.log(tab, event);
      },
       //获取今年元旦和现在时间数据
    getTimeData() {
      let that = this;
      that.axios.post("/api/findTimeNow").then(response => {
        
        this.value1=response.data.allData;
        //this.homeData();
        //this.paragraphData();
            
      });
    },
         
      //获取条件选择时间数据
    getYearData() {
      let that = this;
      that.axios.post("/api/findYearsList").then(response => {
        this.value = response.data.allData.nowYear;
        this.options= response.data.allData.years;  
        this.pieChart() ;
            
      });
    },
    getYearData1() {
      let that = this;
      that.axios.post("/api/findYearsList").then((response) => {
        this.valueL = response.data.allData.nowYear;
        this.optionsL = response.data.allData.years;
        // this.pieChart();
        this.lineChartDataCategory();
      });
    },
    //数据统计-四个数据
    homeDataB() {
      var that = this;
      var data = Qs.stringify({});
      that
        .axios({
          method: "post",
          url: "/api/findHomeData"
        })
        .then((response) => {
          this.homeData.mainTask = response.data.allData[0];//服务成果数量-主任务完成数量
          this.homeData.task1 = response.data.allData[1];//设计任务数量
          this.homeData.task2 = response.data.allData[2];//流通任务数量
          this.homeData.companyData = response.data.allData[3];//注册的企业数量

         console.log(response.data.allData);
          
        });
    },
      //本周数据切换和查询
    weekDataB:function(){
        this.isMonthData =false;
         this.isWeekData =true;
         this.isParagraphData=false;
         this.isHomeData=false;
        document.getElementById("week").style.color = "rgb(45, 140, 240)";
        document.getElementById("month").style.color = "black";
         var that = this;
      
      var data = Qs.stringify({
      
      });
       // console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/findTaskWeekCount",
          data: data
        })
        .then(response => {
          this.formWeek.weekCount=response.data.allData[0];
          this.formWeek.desingWeekCount=response.data.allData[1];
          this.formWeek.circulaterWeekCount=response.data.allData[2];
          this.formWeek.companyCount=response.data.allData[3];         
          this.formWeek.weekCountRing=response.data.allData[4];
          this.formWeek.desingWeekCountRing=response.data.allData[5];
          this.formWeek.circulaterWeekCountRing=response.data.allData[6];
          this.formWeek.companyCountRing=response.data.allData[7];
           // console.log(response.data.allData);
          
        });

     },
   
     //每月数据切换和查询
     monthDataB:function(){
       this.isMonthData =true;
       this.isWeekData =false;
       this.isParagraphData=false;
       this.isHomeData=false;
       document.getElementById("month").style.color = "rgb(45, 140, 240)";
       document.getElementById("week").style.color = "black";
    
       var that = this;
      
      var data = Qs.stringify({
      
      });
       // console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/findTaskMonthCount",
          data: data
        })
        .then(response => {
          this.form.monthCount=response.data.allData[0];
          this.form.desingMonthCount=response.data.allData[1];
          this.form.circulaterMonthCount=response.data.allData[2];
          this.form.companyCount=response.data.allData[3];         
          this.form.monthCountRing=response.data.allData[4];
          this.form.desingMonthCountRing=response.data.allData[5];
          this.form.circulaterMonthCountRing=response.data.allData[6];
          this.form.companyCountRing=response.data.allData[7];
           // console.log(response.data.allData);
          
        });
    },
    //通过时间段数据切换与查询
    paragraphData(){
      this.isMonthData =false;
       this.isWeekData =false;
       this.isParagraphData=true;
       this.isHomeData=false;
        document.getElementById("week").style.color = "black";
         document.getElementById("month").style.color = "black";
      var that = this;
     
      var data = Qs.stringify({
        dateValue0:this.value1[0],
        dateValue1:this.value1[1],
      });
       
            
      that
        .axios({
          method: "post",
          url:
            "/api/findTaskCount",
          data: data
        })
        .then(response => {
          this.formParagraph.taskCount=response.data.allData[0];
          this.formParagraph.desingCount=response.data.allData[1];
          this.formParagraph.circulaterCount=response.data.allData[2];
          this.formParagraph.companyCount=response.data.allData[3];         
          this.formParagraph.taskCountRing=response.data.allData[4];
          this.formParagraph.desingCountRing=response.data.allData[5];
          this.formParagraph.circulaterCountRing=response.data.allData[6];
          this.formParagraph.companyCountRing=response.data.allData[7];
          
           //console.log(response.data.allData);
          
        });
    },
    //数据统计
    getStatistics() {
      // var myDate = new Date();
      // var nowMonth = myDate.getMonth() + 1;
    
      this.columnChart();
      this.columnChart2();
      this.pipChart();
      this.pieChart();
      this.lineChartDataCategory();
    },
    //柱形图数据1
    columnChart() {
      let that = this;
      that.axios.post("/api/companyRank").then(response => {
        this.cloumnData1.Vintage1 = response.data.allData.Vintage;
        this.cloumnData1.topCompanyName1 = response.data.allData.companyName;
        this.cloumnData1.nowTaskNumber1 = response.data.allData.countYear;
        this.cloumnData1.lastTaskNumber1 = response.data.allData.countLastYear;
        that.$refs.drawCloumnChart1.getCharts();
      
      });
    },
    //柱形图数据2
    columnChart2() {
      let that = this;
      that.axios.post("/api/dataStatistics/supplierRank").then(response => {
        this.cloumnData2.Vintage2 = response.data.allData.Vintage;
        this.cloumnData2.topSupplierName2 = response.data.allData.supplierName;
        this.cloumnData2.nowTaskNumber2 = response.data.allData.countYear;
        this.cloumnData2.lastTaskNumber2 = response.data.allData.countLastYear;
        this.$refs.drawCloumnChart2.getCharts2();
       //   console.log(response.data.allData);
      });
    },
    //饼图数据
    pipChart() {
      let that = this;
      that.axios.post("/api/seasonsTaskCount").then(response => {
        this.pieData.searsonCount = response.data.allData.searsonCount;
        this.pieData.seasonsFinishTaskCount = response.data.allData.seasonsFinishTaskCount;
        this.pieData.nowYear = response.data.allData.nowYear;
         this.$refs.drawPieChart.getCharts();           
        this.noDataPie=false;
       
       
             
        
      });
    },
    //行业类别饼图数据
    pieChart() {
       let that = this;
      
      var data = Qs.stringify({
           year:this.value,
      });
      // console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/findTaskCategoryList",
          data: data
        })
        .then(response => {
        this.piedata.Count=response.data.allData.Count;
        this.piedata.categoryFinishTaskList=response.data.allData.categoryFinishTaskList;    
           this.getCharts5();  
           this.noData=false;
      
        
      });
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    },
    


    getCharts5() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("typeSituation"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: this.piedata.Count,
          // [
          //   "交通运输设备",
          //   "仪器仪表及文化、办公用机械",           
          //   "通信设备、计算机及其他电子设备",
          //   "电器机械及器材",
          //   "专用设备",
          //   "通用设备",        
            
           
          // ]
        },
        series: [
          
          {
            name: "占比来源",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 14,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: this.piedata.categoryFinishTaskList,
            // [            
             
            //   { value:"", name: "交通运输设备" },
            //   { value:"", name: "仪器仪表及文化、办公用机械",},
            //   { value:"", name:  "通信设备、计算机及其他电子设备", },
            //   { value:"", name: "电器机械及器材", },
            //   { value:"", name: "专用设备", },
            //   { value:"", name: "通用设备",  },
             
            // ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      charts.push(myChart);
    },

  //饼图数据获取-流通清单类别
    lineChartDataCategory() {
      var that = this;
      var data = Qs.stringify({
        year: this.valueL,
      });

      that
        .axios({
          method: "post",
          url: "/api/addConsignment/selectAllConsignmentCategory",
          data: data,
        })
        .then((response) => {
          this.lineData.categoryFinishTaskList =response.data.allData.categoryFinishTaskList,
          this.lineData.categoryName = response.data.allData.categoryName,
             // console.log(response.data.allData),
            that.getLineChart1();
        });
    },
    //饼图  饼图  饼图
    getLineChart1() {
      var that = this;
      var myChart = echarts.init(document.getElementById("categoryLine"));
      var option = {
        
        tooltip: {
          
        },
        legend: {
          orient: "vertical",
           left: 'left',
          data: this.lineData.categoryName,
          textStyle: {
            fontSize: 12,
          },
        },
        toolbox: {
           feature: {
            
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
            
        }
        },

        // Declare several bar series, each will be mapped to a column of dataset.source by default.
        series: [
          {
            name: "占比来源",
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 14,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: this.lineData.categoryFinishTaskList,
          },
        ],
      };

      myChart.setOption(option);
    },
    //获得零件年度销售量环形数据
    getPartsPieData(){
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/dataStatistics/findPartsPieData",
        })
        .then((response) => {
          this.partsPieData.year = response.data.allData.year;
          this.partsPieData.mainPartsName = response.data.allData.mainPartsName;
          this.partsPieData.partsSaleNum = response.data.allData.partsSaleNum;
          this.setPartsPieChart();
        });
    },
    //设置零件年度销售量环形图
    setPartsPieChart(){
      var charts = [];
      var myChart = echarts.init(document.getElementById("partsPieChart")); // 指定图表的配置项和数据
      var option = {
        title: {
          text: `${this.partsPieData.year}年 零件销售量`,
          subtext: " ",
          left: "center",
          y:20,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 0,
          top:45,
          data: this.partsPieData.mainPartsName
        },
        series: [
          {
            name: "零件年度销售量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "25",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.partsPieData.partsSaleNum
          }
        ]
      };
      myChart.setOption(option);
      charts.push(myChart);
    },
    
  }

  
};
</script>

<style lang="scss">
.Data {
  width: 1150px;
  margin: 0 auto;
  padding-bottom: 40px;


/* .el-row {
  margin-bottom: 20px;
} */

.grid-content {
  display: flex;
  align-items: center;
  height: 80px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 15px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

.type-situation {
  margin-left: 35%;
  font-size: 1.8rem;
  font-weight: bold;
}

.quarterly-situation {
  margin-left: 21%;
  font-weight: bold;
  font-size: 1.2rem;
}

.demandTop5 {
  font-size: 1.2rem;
  font-weight: bold;
}
.title2 {
  font-size: 14px;
  font-style: normal;
  width: 250px;
  margin-top: 10px;
}
}

</style>
