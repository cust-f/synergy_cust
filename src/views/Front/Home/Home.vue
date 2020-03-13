
<template>
  <div align="center">
    <!--第一行 首页轮播图-->
    <div class="BG0">
      <el-row :gutter="gutterCount">
        <el-col :span="24">
          <div class="grid-content0">
            <el-carousel height="400px">
              <!--备注，需要向img_list写入图片地址-->
              <el-carousel-item v-for="item in img_list" :key="item">
                <img style="width: 100%; height: 100%;" :src="item" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="BG">
      <!--第二行  网站访问统计数据-->
      <el-row :gutter="gutterCount">
        <el-col :span="24">
          <div class="grid-content1 fontStyle0">
            <span class="dataCSS">
              本月成交任务:&nbsp;&nbsp;&nbsp;
              <font class="fontStyle">{{taskCountMonth}}</font>&nbsp;&nbsp;项
            </span>

            <span class="dataCSS">
              需求任务:&nbsp;&nbsp;&nbsp;
              <font class="fontStyle">{{demandTaskCount}}</font>&nbsp;&nbsp;项
            </span>

            <span class="dataCSS">
              流通任务:&nbsp;&nbsp;&nbsp;
              <font class="fontStyle">{{circulationTaskCount}}</font>&nbsp;&nbsp;项
            </span>

            <span class="dataCSS">
              认证企业:&nbsp;&nbsp;&nbsp;
              <font class="fontStyle">{{certifiedEnterpriseCount}}</font>&nbsp;&nbsp;家
            </span>

            <span class="dataCSS">
              认证供应商:&nbsp;&nbsp;&nbsp;
              <font class="fontStyle">{{certifiedSupplierCount}}</font>&nbsp;&nbsp;家
            </span>
          </div>
        </el-col>
      </el-row>

      <!--第三行  分类门户-->
      <el-row :gutter="5">
        <el-col :span="18">
          <div class="category_wrap">
            <div class="category_box">
              <!----这里分类----->
              <div class="category_item">
                <div class="cate_ietm_title">
                  <font>交通运输设备</font>
                  <p></p>
                </div>
                <i class="cate_list">
                  <a href>汽车</a>
                  <a href>铁路运输设备</a>
                  <a href>摩托车</a>
                  <a href>自行车</a>
                  <a href>船舶及浮动装置</a>
                  <a href>航空航天器</a>
                  <a href="l">交通器材及其他交通运输设备</a>
                </i>
              </div>
              <div class="category_item">
                <div class="cate_ietm_title" style="background:#78bcaf;">
                  <font>仪器仪表及文化、办公用机械</font>
                  <p></p>
                </div>
                <i class="cate_list">
                  <a href>通用仪器仪表</a>
                  <a href>专用仪器仪表</a>
                  <a href>钟表与计时仪器</a>
                  <a href>光学仪器及眼镜</a>
                  <a href>文化、办公用机械</a>
                  <a href>其他仪器仪表的制造及修理</a>
                </i>
              </div>
              <div class="category_item">
                <div class="cate_ietm_title" style="background:#67C23A;">
                  <font>通信设备、计算机及其他电子设备</font>
                  <p>&nbsp;</p>
                </div>
                <i class="cate_list">
                  <a href>通信设备</a>
                  <a href>雷达及配套设备</a>
                  <a href>广播电视设备</a>
                  <a href>电子计算机</a>
                  <a href>电子器件</a>
                  <a href>电子元件</a>
                  <a href>家用视听设备</a>
                  <a href>其他电子设备</a>
                </i>
              </div>
              <div class="category_item">
                <div class="cate_ietm_title" style="background:#67aff9;">
                  <font>电气机械及器材</font>
                  <p></p>
                </div>
                <i class="cate_list">
                  <a href>电机</a>
                  <a href>输配电及控制设备</a>
                  <a href>电池</a>
                  <a href>家用电力器具</a>
                  <a href>非电力家用器具</a>
                  <a href>照明器具</a>
                  <a href>其他电气机械及器材</a>
                </i>
              </div>
              <div class="category_item">
                <div class="cate_ietm_title" style="background:#be7fc5;">
                  <font>专用设备</font>
                  <p>&nbsp;</p>
                </div>
                <i class="cate_list">
                  <a href>矿山、冶金、建筑专用设备</a>
                  <a href>电子和电工机械专用设备</a>
                  <a href>医疗仪器设备及器械</a>
                  <a href>农、林、牧、渔专用机械</a>
                  <a href style="float:right;">更多</a>
                </i>
              </div>
              <div class="category_item">
                <div class="cate_ietm_title" style="background:#909399;">
                  <font>通用设备</font>
                  <p>&nbsp;</p>
                </div>
                <i class="cate_list">
                  <a href>锅炉及原动机</a>
                  <a href>金属加工机械</a>
                  <a href>起重运输设备</a>
                  <a href>烘炉、熔炉及电炉</a>
                  <a href>金属铸、锻加工</a>
                  <a href>更多</a>
                </i>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 登录模块-->
        <el-col :span="6">
          <div class="grid-content">
            <div class="grid-content-top">
              <span class="grid-content-top-span">HI!欢迎来到Saas应用</span>
              <div class="grid-content-top-button">
                <el-button
                  style=" left:5px; background-color:rgb(190, 127, 197); border-color:rgb(190, 127, 197); "
                  type="primary"
                  round
                >登录</el-button>
                <el-button
                  style="right:5px;background-color:rgb(250, 101, 105); border-color:rgb(250, 101, 105);"
                  type="primary"
                  round
                >注册</el-button>
              </div>
            </div>
            <div class="grid-content-down">
              <el-card class="box-card" :body-style="{ padding: '5px' }">
                <el-tabs
                  v-model="activeName"
                  @tab-click="handleClick"
                  :stretch="true"
                  class="loginHeight"
                >
                  <el-tab-pane label="我有需求" name="first">
                    <el-button
                      class="xqelbuttonleft"
                      style="margin-top:0px ; margin-left:0px ;"
                      type="primary"
                      round
                    >协同设计</el-button>
                    <el-button
                      class="xqelbuttonright"
                      style="margin-top:0px ; margin-left:0px ;"
                      type="primary"
                      round
                    >企业标准</el-button>
                    <el-button
                      class="xqelbuttonleft"
                      style="margin-top:10px ; margin-left:0px ;"
                      type="primary"
                      round
                    >综合服务</el-button>
                    <el-button
                      class="xqelbuttonright"
                      style="margin-top:10px ; margin-left:0px ;"
                      type="primary"
                      round
                    >产业融合</el-button>
                    <el-button
                      class="xqelbuttonleft0"
                      @click="dialogVisible = true"
                      style="margin-top:10px ; margin-left:0px ;"
                      type="success"
                      round
                    >发布需求</el-button>
                  </el-tab-pane>
                  <el-tab-pane label="我有服务" name="second">
                    <el-button
                      class="xqelbuttonleft"
                      style="margin-top:0px ; margin-left:0px ;"
                      type="primary"
                      round
                    >协同设计</el-button>
                    <el-button
                      class="xqelbuttonright"
                      style="margin-top:0px ; margin-left:0px ;"
                      type="primary"
                      round
                    >企业标准</el-button>
                    <el-button
                      class="xqelbuttonleft"
                      style="margin-top:10px ; margin-left:0px ;"
                      type="primary"
                      round
                    >综合服务</el-button>
                    <el-button
                      class="xqelbuttonright"
                      style="margin-top:10px ; margin-left:0px ;"
                      type="primary"
                      round
                    >产业融合</el-button>
                    <el-button
                      class="xqelbuttonleft0"
                      @click="dialogVisible = true"
                      style="margin-top:10px ; margin-left:0px ;"
                      type="success"
                      round
                    >寻找需求</el-button>
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--发布需求 弹出框-->
      <div class="Publishingrequirements">
        <el-dialog title="发布需求" :visible.sync="dialogVisible">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" class size="medium">
            <el-form-item label="需求名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入需求名称"></el-input>
            </el-form-item>
            <el-form-item label="需求类别">
              <el-select
                v-model="form.value"
                clearable
                size="medium"
                filterable
                placeholder="选择/输入需求大类"
                @change="selectOne"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.value0"
                clearable
                size="medium"
                filterable
                placeholder="选择/输入需求子类"
              >
                <el-option
                  v-if="show0"
                  v-for="item in options0"
                  :key="item.value0"
                  :label="item.label"
                  :value="item.value0"
                ></el-option>
                <el-option
                  v-if="show1"
                  v-for="item in options1"
                  :key="item.value0"
                  :label="item.label"
                  :value="item.value0"
                ></el-option>
                <el-option
                  v-if="show2"
                  v-for="item in options2"
                  :key="item.value0"
                  :label="item.label"
                  :value="item.value0"
                ></el-option>
                <el-option
                  v-if="show3"
                  v-for="item in options3"
                  :key="item.value0"
                  :label="item.label"
                  :value="item.value0"
                ></el-option>
                <el-option
                  v-if="show4"
                  v-for="item in options4"
                  :key="item.value0"
                  :label="item.label"
                  :value="item.value0"
                ></el-option>
                <el-option
                  v-if="show5"
                  v-for="item in options5"
                  :key="item.value0"
                  :label="item.label"
                  :value="item.value0"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="需求详情" prop="details">
              <el-input
                type="textarea"
                :autosize="{ minRows:4}"
                v-model="form.Details"
                placeholder="请输入需求详情"
              ></el-input>
            </el-form-item>
            <el-form-item label="截止日期" prop="dateEnd">
              <el-col :span="10">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.dateEnd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="附件"></el-form-item>
            <el-form-item label="联系电话" prop="number">
              <el-input
                v-model="form.number"
                type="text"
                maxlength="11"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                placeholder="请输入联系电话"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="warning"
                round
                @click="submitForm('form')"
                class="CreatebuttonCSS"
              >立即发布</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>

      <!--第四行  需求一览，优质企业，服务成果-->
      <el-row :gutter="gutterCount">
        <!--需求任务-->
        <el-col :span="8">
          <div class="grid-content2">
            <el-card class="grid-content3">
              <div slot="header" class="titleColor">
                <span>需求一览</span>
                <el-button
                  style="float: right; padding: 5px 0"
                  type="text"
                  @click="serviceResults"
                >>>更多</el-button>
              </div>
              <div v-for="(item,i) in demandTaskList" :key="i" style="padding-bottom: 50px;">
                <div
                  style="float:left; width:30%; "
                  class="fontStyle1"
                >{{"["+item.Industry_Type+"]"}}&nbsp;&nbsp;</div>
                <div
                  style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:40%"
                >{{item.Main_Task_Name}}</div>
                <div
                  style="float:right;width:30%"
                  class="fontStyle2"
                >&nbsp;&nbsp;{{item.Deadline| dataFormat("yyyy-MM-dd")}}</div>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content2">
            <el-card class="grid-content3">
              <div slot="header" class="titleColor">
                <span>优质企业</span>
                <el-button
                  style="float: right; padding: 5px 0"
                  type="text"
                  @click="excellentCompany"
                >>>更多</el-button>
              </div>
              <div
                v-for="(item,i) in supplierlist.companyId"
                :key="i"
                style="padding-bottom: 50px;"
              >
                <div
                  style="float:left; width:30%; "
                  class="fontStyle1"
                >{{"["+supplierlist.companyProduct[i]+"]"}}&nbsp;&nbsp;</div>
                <div
                  style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:60%"
                >{{supplierlist.companyName[i]}}</div>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content2">
            <el-card class="grid-content3">
              <div slot="header" class="titleColor">
                <span>服务成果</span>
                <el-button style="float: right; padding: 5px 0" type="text" @click="needs">>>更多</el-button>
              </div>
              <div
                v-for="(item,index) in completeddemandTaskList"
                :key="index"
                style="padding-bottom: 50px;"
              >
                <div
                  style="float:left; width:30%;"
                  class="fontStyle1"
                >{{"["+item.Industry_Type+"]"}}&nbsp;&nbsp;</div>
                <div
                  style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:40%"
                >{{item.Main_Task_Name}}</div>
                <div
                  style="float:right;width:30%"
                  class="fontStyle2"
                >&nbsp;&nbsp;{{item.Finish_Time | dataFormat("yyyy-MM-dd")}}</div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>

      <!--第七行  平台数据分割线-->
      <el-row :gutter="gutterCount">
        <el-col :span="24">
          <div class="big_bt">
            <a>平台数据</a>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="gutterCount" d>
        <el-col :span="24">
          <el-card shadow="hover">
            <div class="demandTop5"></div>
            <div id="monthSituation" style="width: 100%;height:350%;"></div>
          </el-card>
        </el-col>
        <el-col :span="14" :push="pushCount">
          <el-card shadow="hover" style="margin-top:5px;">
            <div id="fulfillDemandTop5" style="width: 100%;height:350%;"></div>
          </el-card>
        </el-col>
        <el-col :span="6" :push="pushCount">
          <el-card shadow="hover" style="margin-top:5px;">
            <div id="quarterlySituation" style="width: 100%;height:350%;"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->

<script>
export default {
  name: "Home",
  data() {
    return {
      //首页轮播图的图片地址数组
      img_list: [
        require("../../../assets/images/home/轮播图1.png"),
        require("../../../assets/images/home/轮播图2.jpg"),
        require("../../../assets/images/home/轮播图31.png")
      ],
      //判定发布需求弹出框的bool值
      dialogVisible: false,
      //发布需求弹出框内的表单信息数据
      form: {
        //需求名称
        name: "",
        //需求类别组合
        value: "0",
        value0: "0",
        //需求详情
        Details: "",
        //截至日期
        dateEnd: "",
        //附件

        //联系电话
        number: ""
      },
      //发布需求弹出框内的表单数据验证规则
      rules: {
        name: [
          { required: true, message: "请输入需求名称", trigger: "blur" },
          { min: 3, message: "长度最少为3字符", trigger: "blur" }
        ],
        details: [
          { required: true, message: "请填写需求详情", trigger: "blur" }
        ],
        dateEnd: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        number: [{ required: true, message: "请填写联系电话", trigger: "blur" }]
      },
      //发布需求弹出框内的任务类别筛选数据大类
      options: [
        {
          value: "0",
          label: "交通运输设备"
        },
        {
          value: "1",
          label: "仪器仪表及文化、办公用机械"
        },
        {
          value: "2",
          label: "通信设备、计算机及其他电子设备"
        },
        {
          value: "3",
          label: "电气机械及器材"
        },
        {
          value: "4",
          label: "专用设备"
        },
        {
          value: "5",
          label: "通用设备"
        }
      ],
      //发布需求弹出框内的任务类别筛选数据子类bool值
      show0: true,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      //发布需求弹出框内的任务类别筛选数据子类
      //交通运输设备子类
      options0: [
        {
          value0: "0",
          label: "汽车"
        },
        {
          value0: "1",
          label: "铁路运输设备"
        },
        {
          value0: "2",
          label: "摩托车"
        },
        {
          value0: "3",
          label: "自行车"
        },
        {
          value0: "4",
          label: "船舶及浮动装置"
        },
        {
          value0: "5",
          label: "航空航天器"
        },
        {
          value0: "6",
          label: "交通器材及其他交通运输设备"
        }
      ],
      //仪器仪表及文化、办公用机械
      options1: [
        {
          value0: "0",
          label: "通用仪器仪表"
        },
        {
          value0: "1",
          label: "专用仪器仪表"
        },
        {
          value0: "2",
          label: "钟表与计时仪器"
        },
        {
          value0: "3",
          label: "光学仪器及眼镜"
        },
        {
          value0: "4",
          label: "文化、办公用机械"
        },
        {
          value0: "5",
          label: "其他仪器仪表的制造及修理"
        }
      ],
      //通信设备、计算机及其他电子设备
      options2: [
        {
          value0: "0",
          label: "通信设备"
        },
        {
          value0: "1",
          label: "雷达及配套设备"
        },
        {
          value0: "2",
          label: "广播电视设备"
        },
        {
          value0: "3",
          label: "电子计算机"
        },
        {
          value0: "4",
          label: "电子器件"
        },
        {
          value0: "5",
          label: "电子元件"
        },
        {
          value0: "6",
          label: "家用视听设备"
        },
        {
          value0: "7",
          label: "其他电子设备"
        }
      ],
      //电气机械及器材
      options3: [
        {
          value0: "0",
          label: "电机"
        },
        {
          value0: "1",
          label: "输配电及控制设备"
        },
        {
          value0: "2",
          label: "电线、电缆、光缆及电工器材"
        },
        {
          value0: "3",
          label: "电池"
        },
        {
          value0: "4",
          label: "家用电力器具"
        },
        {
          value0: "5",
          label: "非电力家用器具"
        },
        {
          value0: "6",
          label: "照明器具"
        },
        {
          value0: "7",
          label: "其他电气机械及器材"
        }
      ],
      //专用设备
      options4: [
        {
          value0: "0",
          label: "矿山、冶金、建筑专用设备"
        },
        {
          value0: "1",
          label: "化工、木材、非金属加工专用设备"
        },
        {
          value0: "2",
          label: "食品、饮料、烟草及饲料生产专用设备"
        },
        {
          value0: "3",
          label: "印刷、制药、日化生产专用设备"
        },
        {
          value0: "4",
          label: "纺织、服装和皮革工业专用设备"
        },
        {
          value0: "5",
          label: "电子和电工机械专用设备"
        },
        {
          value0: "6",
          label: "农、林、牧、渔专用机械"
        },
        {
          value0: "7",
          label: "医疗仪器设备及器械"
        },
        {
          value0: "8",
          label: "环保、社会公共安全及其他专用设备"
        }
      ],
      //通用设备
      options5: [
        {
          value0: "0",
          label: "锅炉及原动机"
        },
        {
          value0: "1",
          label: "金属加工机械"
        },
        {
          value0: "2",
          label: "起重运输设备"
        },
        {
          value0: "3",
          label: "泵、阀门、压缩机及类似机械"
        },
        {
          value0: "4",
          label: "轴承、齿轮、传动和驱动部件"
        },
        {
          value0: "5",
          label: "烘炉、熔炉及电炉"
        },
        {
          value0: "6",
          label: "风机、衡器、包装设备等通用设备"
        },
        {
          value0: "7",
          label: "通用零部件制造及机械修理"
        },
        {
          value0: "8",
          label: "金属铸、锻加工"
        }
      ],

      //设定本页面中el-cow与el-col的gutter\push\pull值
      gutterCount: 5,
      pushCount: 2,
      pullCount: 2,
      pushCount0: 3,

      //网站的近期统计简报数据
      taskCountMonth: 0,
      demandTaskCount: 0,
      circulationTaskCount: 0,
      certifiedEnterpriseCount: 0,
      certifiedSupplierCount: 0,

      //登录注册发布需求模块tag页的名称绑定数据
      activeName: "first",

      //需求一览数据表（category为需求一览类别,name为需求名称，sTime为项目发布时间）
      demandTaskList: "",
      // [
      //   {category:"交通运输",name:"危险品运输半挂车货箱采购项目",sTime:"2019-09-06"},
      //   {category:"仪器仪表",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06"},
      //   {category:"电气机械",name:"数据中心采暖系统改造项目",sTime:"2019-09-06"},
      //   {category:"通信设备",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06"},
      //   {category:"通信设备",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06"},
      //   {category:"仪器仪表",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06"},
      //   {category:"通信设备",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06"},]
      //优质企业数据表（category为企业类别，companyName为企业名称）
      supplierlist: "",
      // [
      //   {category:"交通运输",companyName:"长春富晟吉通物流设备有限公司"},
      //   {category:"仪器仪表",companyName:"长春新产业光电技术有限公司"},
      //   {category:"电气机械",companyName:"吉林省长春市盛昊电子有限公司"},
      //   {category:"通信设备",companyName:"哈尔滨哈特信息科技有限公司"},
      //   {category:"仪器仪表",companyName:"北京京伟电器有限公司 "},
      //   {category:"交通运输",companyName:"长春沃尔特仓储设备有限公司"},
      //   {category:"电气机械",companyName:"合肥皖仪科技有限公司"},]
      //服务成果数据表（category为服务成果类别，name为服务成果名称，sTime为服务成果完成时间）
      completeddemandTaskList: ""
      // [
      //   {category:"仪器仪表",name:"绝缘用具更新及试验",sTime:"2019-09-06"},
      //   {category:"电气机械",name:"MKS1632数控外圆磨尾架维修",sTime:"2019-09-06"},
      //   {category:"电气机械",name:"厂区维修服务",sTime:"2019-09-06"},
      //   {category:"电气机械",name:"汽车刹车片设计",sTime:"2019-09-06"},
      //   {category:"仪器仪表",name:"绝缘用具更新及试验",sTime:"2019-09-06"},
      //   {category:"仪器仪表",name:"绝缘用具更新及试验",sTime:"2019-09-06"},
      //   {category:"电气机械",name:"安装B30EV-试冲板料",sTime:"2019-09-06"},
      // ],
    };
  },
  //网站下方数据统计图表用（丁宅荣负责添加）
  mounted() {
    this.getCharts();
    this.getCharts2();
    this.getCharts3();
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      var that = this;
      that.axios.post("http://127.0.0.1:8082/home/detail").then(response => {
        this.taskCountMonth = response.data.allData.mainTaskCount;
        this.demandTaskCount = response.data.allData.designTaskCount;
        this.circulationTaskCount = response.data.allData.circulateTaskCount;
        this.certifiedEnterpriseCount = response.data.allData.enterpriseCount;
        this.certifiedSupplierCount = response.data.allData.supplierCount;
        this.demandTaskList = response.data.allData.demandTask;
        this.completeddemandTaskList = response.data.allData.serviceTask;
        this.supplierlist = response.data.allData.company;
      });
    },
    /*
     *转跳对应任务信息页面
     */
    serviceResults() {
      this.$router.push({ path: "/xuqiuyilan" });
    },

    excellentCompany() {
      this.$router.push({ path: "/excellentCompany" });
    },
    needs() {
      this.$router.push({ path: "/twoMenu" });
    },

    //发布需求的表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //发布需求界面
    selectOne() {
      this.form.value0 = "0";
      //直接就拿到当前的这个对象了
      if (this.form.value == "0") {
        this.show0 = true;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
      }
      if (this.form.value == "1") {
        this.show0 = false;
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
      }
      if (this.form.value == "2") {
        this.show0 = false;
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
      }
      if (this.form.value == "3") {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        this.show4 = false;
        this.show5 = false;
      }
      if (this.form.value == "4") {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = true;
        this.show5 = false;
      }
      if (this.form.value == "5") {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = true;
      }
    },

    //登陆注册模块tag页点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },

    //发布需求界面关闭前的最后一次确认
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //发布需求界面所用
    //以下为平台数据统计所用图表函数

    getCharts() {
      var charts = [];
      var myChart = echarts.init(document.getElementById("quarterlySituation")); // 指定图表的配置项和数据
      var option = {
        title: {
          text: "季度完成量",
          subtext: " ",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 0,
          data: ["第一季度", "第二季度", "第三季度", "第四季度"]
        },
        series: [
          {
            name: "分季完成量",
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
            data: [
              { value: 335, name: "第一季度" },
              { value: 310, name: "第二季度" },
              { value: 235, name: "第三季度" },
              { value: 220, name: "第四季度" }
              // {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      };
      myChart.setOption(option);
      charts.push(myChart);
    },

    getCharts2() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("fulfillDemandTop5"));
      var option = {
        title: {
          text: "供应商完成需求量TOP5",
          subtext: "数据来自大数据统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["2017年", "2018年"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: [
            "上海小糸车灯有限公司 ",
            "上海胜德塑料厂 ",
            "上海奥力得特种工具厂",
            "合肥皖仪科技有限公司",
            "北京京伟电器有限公司 "
          ]
        },
        series: [
          {
            name: "2017年",
            type: "bar",
            data: [1245, 1523, 1587, 1689, 2567]
          },
          {
            name: "2018年",
            type: "bar",
            data: [1389, 1530, 1750, 1890, 2899]
          }
        ]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
      charts.push(myChart);
    },

    getCharts3() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("monthSituation"));
      var option = {
        title: {
          text: "月度供需量"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["完成需求量", "发布需求量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "完成需求量",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 122, 331, 444, 312, 112]
          },
          {
            name: "发布需求量",
            type: "line",
            stack: "总量",
            data: [120, 182, 191, 234, 290, 330, 310, 123, 344, 354, 123, 123]
          }
        ]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
      charts.push(myChart);
    }
  }
};
</script>

<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->


<style>
/**轮播图的样式表 */
.BG0 {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0px;
  font-size: 18px;
}

/**首页轮播图用样式表用于确认轮播图高度及border*/
.grid-content0 {
  height: 400px;
  padding: 0px;
}

/**轮播图下方的整块的样式表*/
.BG {
  box-sizing: border-box;
  width: 1300px;
  margin-bottom: 5px;
  padding: 25px;
  font-size: 18px;
}

/**网站访问统计数据的样式表*/
.grid-content1 {
  border-radius: 4px;
  height: 50px;
  /**文字显示居中 */
  width: 100%;
  line-height: 50px;
  overflow: hidden;
}

/**网站访问统计数据字体样式（用于访问统计数据标题） */
.fontStyle0 {
  font-size: 20px;
  color: rgb(167, 165, 165);
}
.dataCSS {
  width: 25%;
  height: 100%;
  overflow: hidden;
  padding-left: 1%;
}
/**网站访问统计数据字体样式（用于访问统计数据内容） */
.fontStyle {
  font-size: 24px;
  color: orangered;
}

/**登陆、注册模块用样式表，用于文本居中及背景色更改*/
.grid-content {
  text-align: center;
  height: 400px;
}

/**登录、注册按钮模块标题模块所用样式表，用于确认整体高度及布局  */
.grid-content-top {
  float: left;
  height: 30%;
  width: 100%;
  align-items: center;
  background-color: #ece9e9;
}
.grid-content-top-span {
  float: left;
  width: 100%;
  height: 20%;
  margin-top: 10%;
}
.grid-content-top-button {
  position: relative;
  width: 100%;
  float: left;
  height: 80%;
  margin-top: 5%;
}

/**登录、注册按钮模块tag页模块所用样式表，用于确认整体高度及布局*/
.grid-content-down {
  float: left;
  height: 70%;
  width: 100%;
  background-color: rgb(255, 255, 255);
}
.box-card {
  width: 100%;
  height: 100%;
}
/*我有需求标签页下的按钮展示样式表*/
/**左侧按钮的样式表*/
.xqelbuttonleft {
  float: left;
  position: relative;
  left: 5%;
  width: 40%;
  margin-top: 10%;
}
/** 鼠标悬浮左侧按钮的样式表*/
.xqelbuttonleft:hover {
  background-color: rgb(192, 189, 189);
  border-color: rgb(192, 189, 189);
}
/**下方大按钮用的样式表*/
.xqelbuttonleft0 {
  float: left;
  position: relative;
  left: 25%;
  width: 50%;
  height: 50px;
}
/**右侧按钮的样式表*/
.xqelbuttonright {
  float: right;
  position: relative;
  right: 5%;
  width: 40%;
  margin-top: 10%;
}
/** 鼠标悬浮右侧按钮的样式表*/
.xqelbuttonright:hover {
  background-color: rgb(192, 189, 189);
  border-color: rgb(192, 189, 189);
}

/**发布需求的弹出窗口的CSS */

/**此样式表内 el-input的样式 */
.Publishingrequirements .el-input {
  width: 300px;
  float: left;
}
/**此样式表内 .el-dialog__title的样式*/
.Publishingrequirements .el-dialog__title {
  font-size: 25px;
  color: #4c4e52;
  float: left;
  margin-left: 8%;
}
.Publishingrequirements .el-select {
  width: 300px;
  float: left;
}
/**此样式表内 立即发布按钮的CSS样式 */
.CreatebuttonCSS {
  width: 50%;
  height: 60px;
  font-size: 30px;
  position: relative;
  left: -5%;
}

/** 登录模块核心企业与供应商用CSS*/
.loginHeight {
  height: 210px;
}

/**需求一览，优质企业，服务成果 用的外部样式表 */
.grid-content2 {
  border-radius: 4px;
  height: 400px;
  padding-bottom: 50px;
}
/**需求一览，优质企业，服务成果 用的内部样式表 */
.grid-content3 {
  border-radius: 4px;
  height: 400px;
  padding-bottom: 50px;
  overflow: hidden;
}

/**需求一览 优质企业 服务成果 卡片内的字体样式（用于需求，企业，服务的类别字体）*/
.fontStyle1 {
  color: rgb(230, 158, 24);
}

/**需求一览 优质企业 服务成果 卡片内的字体样式（用于需求，服务的时间字体）*/
.fontStyle2 {
  color: rgb(150, 144, 144);
  font-size: 15px;
}

/**平台数据分割线用的样式表*/
.big_bt {
  width: 370px;
  margin: 0 auto;
  border-bottom: solid 3px #000;
  margin-bottom: 40px;
}
.big_bt a {
  display: block;
  font-size: 26px;
  color: #000;
  font-family: "微软雅黑";
  width: 180px;
  background: #fff;
  text-align: center;
  margin: 0 auto;
  position: relative;
  top: 18px;
}

/**布局测试用css*/
.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}

.box-card {
  width: 100%;
}

/** */

/**分类门户的样式表*/
.category_wrap {
  width: 100%;
  margin: 0px;
  float: left;
  overflow: hidden;
  height: 400px;
}
.category_box {
  width: 100%;
  height: 100%;
}
.category_item {
  width: 33.1%;
  height: 50%;
  float: left;
  background: #f5f5f5;
  margin: 0 2px 0 0;
}
.cate_ietm_title {
  width: 100%;
  height: 25%;
  background: #fa6569;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
}
.cate_list {
  line-height: 30px;
  margin: 20px;
  display: block;
  height: 75%;
}
.cate_list a {
  margin: 0 15px 0 0;
  display: inline-block;
  font-size: 16px;
  font-style: normal;
}
a {
  color: #333;
  text-decoration: none;
}
a:hover {
  color: #fa6569;
}

ul li {
  list-style: none;
  margin-bottom: 5px;
  overflow: hidden;
}
.some-show {
  white-space: nowrap; /* 规定段落中的文本不进行换行 */
  text-overflow: ellipsis; /*文字段在容器内超宽时，截断该文字段并且续以省略号*/
  overflow: hidden;
}
.tender-notice {
  border: 1px solid #d3d7d4;
}
.tender-header {
  padding: 15px;
  border-bottom: 1px solid #d3d7d4;
}
.tender-header span {
  font-size: 800;
  font-size: 18px;
}
.tender-header-some {
  padding: 20px;
  font-size: 15px;
  color: #a1a3a6;
}
.charts {
  text-align: "center";
  align-self: auto;
  align-content: center;
  align-items: center;
}
.demandTop5 {
  font-size: 1.2rem;
}
/* .tender-header-some ul li{
    margin-bottom: 15px;
} */
</styles>