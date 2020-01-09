
<template>
  <div class="BG">
    <!--第一行  保留，不一定用-->
    <el-row :gutter="gutterCount">
      <el-col :span="24">
        <div class="grid-content0">
          <el-carousel height="400px">

            <!--备注，需要向img_list写入图片地址-->
            <el-carousel-item v-for="item in img_list" :key="item">
              <img
                style="width: 100%; height: 100%;"
                :src="item"
                 >
            </el-carousel-item>

          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <!--第二行  网站访问统计数据-->
    <el-row :gutter="gutterCount" >
      <el-col :span="20"  :push="pushCount" :pull="pullCount">
        <div class="grid-content1  fontStyle0">
        <span>本月成交任务:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{taskCountMonth}}</font>&nbsp;&nbsp;项</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>需求任务:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{demandTaskCount}}</font>&nbsp;&nbsp;项</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>流通任务:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{circulationTaskCount}}</font>&nbsp;&nbsp;项</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>认证企业:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{certifiedEnterpriseCount}}</font>&nbsp;&nbsp;家</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>认证供应商:&nbsp;&nbsp;&nbsp;<font class="fontStyle">{{certifiedSupplierCount}}</font>&nbsp;&nbsp;家</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </el-col>
    </el-row>


     <!--第三行  分类门户-->
    <el-row :gutter="5">
      <el-col :span="16" :push="pushCount">
        
        <div class="bg-purple-dark grid-content">
          <div class="category_wrap">
    	      <div class="category_box">
            <!----这里分类----->
              <div class="category_item"><div class="cate_ietm_title"><h3>交通运输设备</h3><p></p></div>          
                   <i class="cate_list">
                     <a href="">汽车</a>
                     <a href="">铁路运输设备</a>
                     <a href="">摩托车</a>
                     <a href="">自行车</a>
                     <a href="">船舶及浮动装置</a>
                     <a href="">航空航天器</a>
                     <a href="l">交通器材及其他交通运输设备</a>
                    </i>       
                </div>      
                    <div class="category_item">     
                      <div class="cate_ietm_title" style="background:#78bcaf;"><h3>仪器仪表及文化、<br>办公用机械</h3><p></p></div>           
                          <i class="cate_list">
                            <a href="">通用仪器仪表</a>
                            <a href="">专用仪器仪表</a>
                            <a href="">钟表与计时仪器</a>
                            <a href="">光学仪器及眼镜</a>
                            <a href="">文化、办公用机械</a>
                            <a href="">其他仪器仪表的制造及修理</a>
                          </i>       
                      </div>           
                      <div class="category_item">       	
                          <div class="cate_ietm_title" style="background:#be7fc5;"><h3>通信设备、<br>计算机及其他电子设备</h3><p>&nbsp;</p></div>       	
                            <i class="cate_list">
                              <a href="">通信设备</a>
                              <a href="">雷达及配套设备</a>
                              <a href="">广播电视设备</a>
                              <a href="">电子计算机</a>
                              <a href="">电子器件</a>
                              <a href="">电子元件</a>
                              <a href="">家用视听设备</a>
                              <a href="">其他电子设备</a>
                            </i>       
                          </div>         
                      <div class="category_item">       	
                        <div class="cate_ietm_title" style="background:#67aff9;"><h3>电气机械及器材</h3><p></p></div> 
                            <i class="cate_list">
                              <a href="">电机</a>
                              <a href="">输配电及控制设备</a>
                              <a href="">电池</a>
                              <a href="">家用电力器具</a>
                              <a href="">非电力家用器具</a>
                              <a href="">照明器具</a>
                              <a href="">其他电气机械及器材</a>
                            </i>   
                        </div> 
              </div>
            </div>
        </div>
      </el-col>
      
      <!-- 登录模块-->
      <el-col :span="4" :push="pushCount">
        <div class="bg-purple-dark grid-content">
          <el-card class="box-card" :body-style="{ padding: '5px' }">
            <div slot="header" class="clearfix">
              <span>HI!欢迎来到Saas应用</span>
              <div class="clearfix">
              <el-button style="float: left; padding: 3px 0px 3px 50px" type="text">登录</el-button>
              <el-button style="float: right; padding: 3px 50px 3px 0px" type="text">注册</el-button>
              </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" class="loginHeight">
              <el-tab-pane label="核心企业" name="first">
                <div class="tab-content-customer active">
<div class="tab-content-title">了解如何解决我的需求</div>
<div class="tab-content-locate customer-locate">
1分钟带你玩转猪八戒，解锁平台新玩法
<a href="/xinren" target="_blank" data-linkid="index-up-12">查看&gt;</a>
</div>
<div class="tab-content-title">了解猪八戒如何保障雇主权益</div>
<div class="tab-content-links clearfix">
<a href="//i.zbj.com/guarantee" class="tab-content-link-icon" target="_blank" data-linkid="index-up-13-0"></a>
<div class="clearfix">

<a href="https://i.zbj.com/guarantee" class="tab-content-link" target="_blank" data-linkid="index-up-11-1">资金托管</a>

<a href="https://i.zbj.com/guarantee" class="tab-content-link" target="_blank" data-linkid="index-up-11-2">实名认证</a>

<a href="https://i.zbj.com/guarantee" class="tab-content-link" target="_blank" data-linkid="index-up-11-3">官方介入</a>

</div>
</div>
<div class="index-quick-tools-lite-wrap">
<div class="tab-content-title">常用工具</div>
<div class="index-quick-tools-lite"><div class="quick-service-wrapper quick-service-lite-wrapper">    <div class="quick-service-hd J-qs-hd">        <div class="quick-service-panel">            <ul class="qs-tab">                <li class="qs-tab-item" data-linkid="quick-lite-1" data-module="1">                    <i class="icon-sbzc"></i>                    <p>                        <span>商标查询</span>                </p></li>                <li class="qs-tab-item" data-linkid="quick-lite-2" data-module="2">                    <i class="icon-gszc"></i>                    <p>                        <span>公司核名</span>                </p></li>                <li class="qs-tab-item" data-linkid="quick-lite-3" data-module="9">                    <i class="icon-fwgj"></i>                    <p>                        <span>服务估价</span>                </p></li>                <li class="qs-tab-item" data-linkid="quick-lite-4" data-module="more">                    <i class="icon-more"></i>                    <p>                        <span>更多工具</span>                </p></li>            </ul>        </div>    </div>    <div class="quick-service-bd J-qs-bd">        <div class="qs-cont">            <span class="qs-close J-qs-close">×</span>            <div class="qs-cont-item module-1"><div class="mark-regist-area">    <div class="mark-regist-title">         — 免费查询品牌名称能否注册商标 —    </div>    <div class="mark-regist-tab clearfix">        <span class="first curr">注册成功率测算</span>        <span class="last">商标类别查询</span>    </div>    <div class="mark-regist-cont">        <div class="regist-c0">            <div class="regist-form">                <ul>                    <li class="regist-category">                        <p><span>请选择类别</span><i class="angle"></i></p>                        <div class="regist-category-list">                                                           <label data-val="第1类 化学原料" data-linkid="quickservice-userpanel-1aa-1">第1类 化学原料</label>                                                            <label data-val="第2类 颜料油漆" data-linkid="quickservice-userpanel-1aa-2">第2类 颜料油漆</label>                                                            <label data-val="第3类 日化用品" data-linkid="quickservice-userpanel-1aa-3">第3类 日化用品</label>                                                            <label data-val="第4类 燃料油脂" data-linkid="quickservice-userpanel-1aa-4">第4类 燃料油脂</label>                                                            <label data-val="第5类 医药" data-linkid="quickservice-userpanel-1aa-5">第5类 医药</label>                                                            <label data-val="第6类 金属材料" data-linkid="quickservice-userpanel-1aa-6">第6类 金属材料</label>                                                            <label data-val="第7类 机械设备" data-linkid="quickservice-userpanel-1aa-7">第7类 机械设备</label>                                                            <label data-val="第8类 手工器械" data-linkid="quickservice-userpanel-1aa-8">第8类 手工器械</label>                                                            <label data-val="第9类 科学仪器" data-linkid="quickservice-userpanel-1aa-9">第9类 科学仪器</label>                                                            <label data-val="第10类 医疗器械" data-linkid="quickservice-userpanel-1aa-10">第10类 医疗器械</label>                                                            <label data-val="第11类 灯具空调" data-linkid="quickservice-userpanel-1aa-11">第11类 灯具空调</label>                                                            <label data-val="第12类 运输工具" data-linkid="quickservice-userpanel-1aa-12">第12类 运输工具</label>                                                            <label data-val="第13类 军火烟火" data-linkid="quickservice-userpanel-1aa-13">第13类 军火烟火</label>                                                            <label data-val="第14类 珠宝钟表" data-linkid="quickservice-userpanel-1aa-14">第14类 珠宝钟表</label>                                                            <label data-val="第15类 乐器" data-linkid="quickservice-userpanel-1aa-15">第15类 乐器</label>                                                            <label data-val="第16类 办公用品" data-linkid="quickservice-userpanel-1aa-16">第16类 办公用品</label>                                                            <label data-val="第17类 橡胶制品" data-linkid="quickservice-userpanel-1aa-17">第17类 橡胶制品</label>                                                            <label data-val="第18类 皮革皮具" data-linkid="quickservice-userpanel-1aa-18">第18类 皮革皮具</label>                                                            <label data-val="第19类 建筑材料" data-linkid="quickservice-userpanel-1aa-19">第19类 建筑材料</label>                                                            <label data-val="第20类 家具" data-linkid="quickservice-userpanel-1aa-20">第20类 家具</label>                                                            <label data-val="第21类 厨房洁具" data-linkid="quickservice-userpanel-1aa-21">第21类 厨房洁具</label>                                                            <label data-val="第22类 绳网袋篷" data-linkid="quickservice-userpanel-1aa-22">第22类 绳网袋篷</label>                                                            <label data-val="第23类 纱线丝" data-linkid="quickservice-userpanel-1aa-23">第23类 纱线丝</label>                                                            <label data-val="第24类 布料床单" data-linkid="quickservice-userpanel-1aa-24">第24类 布料床单</label>                                                            <label data-val="第25类 服装鞋帽" data-linkid="quickservice-userpanel-1aa-25">第25类 服装鞋帽</label>                                                            <label data-val="第26类 纽扣拉链" data-linkid="quickservice-userpanel-1aa-26">第26类 纽扣拉链</label>                                                            <label data-val="第27类 地毯席垫" data-linkid="quickservice-userpanel-1aa-27">第27类 地毯席垫</label>                                                            <label data-val="第28类 健身器材" data-linkid="quickservice-userpanel-1aa-28">第28类 健身器材</label>                                                            <label data-val="第29类 食品" data-linkid="quickservice-userpanel-1aa-29">第29类 食品</label>                                                            <label data-val="第30类 方便食品" data-linkid="quickservice-userpanel-1aa-30">第30类 方便食品</label>                                                            <label data-val="第31类 饲料种籽" data-linkid="quickservice-userpanel-1aa-31">第31类 饲料种籽</label>                                                            <label data-val="第32类 啤酒饮料" data-linkid="quickservice-userpanel-1aa-32">第32类 啤酒饮料</label>                                                            <label data-val="第33类 酒" data-linkid="quickservice-userpanel-1aa-33">第33类 酒</label>                                                            <label data-val="第34类 烟草烟具" data-linkid="quickservice-userpanel-1aa-34">第34类 烟草烟具</label>                                                            <label data-val="第35类 广告销售" data-linkid="quickservice-userpanel-1aa-35">第35类 广告销售</label>                                                            <label data-val="第36类 金融物管" data-linkid="quickservice-userpanel-1aa-36">第36类 金融物管</label>                                                            <label data-val="第37类 建筑修理" data-linkid="quickservice-userpanel-1aa-37">第37类 建筑修理</label>                                                            <label data-val="第38类 通讯服务" data-linkid="quickservice-userpanel-1aa-38">第38类 通讯服务</label>                                                            <label data-val="第39类 运输贮藏" data-linkid="quickservice-userpanel-1aa-39">第39类 运输贮藏</label>                                                            <label data-val="第40类 材料加工" data-linkid="quickservice-userpanel-1aa-40">第40类 材料加工</label>                                                            <label data-val="第41类 教育娱乐" data-linkid="quickservice-userpanel-1aa-41">第41类 教育娱乐</label>                                                            <label data-val="第42类 网站服务" data-linkid="quickservice-userpanel-1aa-42">第42类 网站服务</label>                                                            <label data-val="第43类 餐饮住宿" data-linkid="quickservice-userpanel-1aa-43">第43类 餐饮住宿</label>                                                            <label data-val="第44类 医疗园艺" data-linkid="quickservice-userpanel-1aa-44">第44类 医疗园艺</label>                                                            <label data-val="第45类 社会服务" data-linkid="quickservice-userpanel-1aa-45">第45类 社会服务</label>                                                    </div>                    </li>                    <li class="regist-brandname">                        <input type="text" placeholder="请输入你的品牌名字，如：猪八戒" value="" data-linkid="quickservice-userpanel-1ab" id="query-brandname-input-1">                    </li>                    <li class="regist-form-btn">                        <button id="success-rate-btn" class="success-rate-btn" data-linkid="quickservice-userpanel-1a">免费测算能否注册</button>                    </li>                </ul>            </div>            <div class="regist-result hide">            </div>        </div>        <div class="regist-c1 hide">            <div class="regist-form">                <ul>                    <li class="regist-brandname">                        <input type="text" placeholder="请输入要查询的品牌名" value="" id="query-brandname-input" data-linkid="quickservice-userpanel-1ba">                    </li>                    <li class="regist-form-btn">                        <button id="query-cate-btn" class="query-cate-btn" data-linkid="quickservice-userpanel-1b">查询所属类别</button>                    </li>                    <li class="regist-tips">                        已有9.8w+人获取到了查询结果                    </li>                </ul>            </div>        </div>    </div></div></div>            <div class="qs-cont-item module-2"><div class="company-hm">    <ul class="company-hm-form">        <li class="company-hm-tit-lite">           — 免费查询公司名能否注册 —        </li>        <li class="company-hm-tit">            免费查询公司名能否注册        </li>        <li class="company-hm-info">                <div class="hm-city">                    <span>重庆</span><i class="angle-down"></i>                    <p class="hm-city-list" style="">                                                      <label data-val="北京" class="" data-linkid="quickservice-userpanel-2a0">B 北京</label>                                                       <label data-val="重庆" class="" data-linkid="quickservice-userpanel-2a1">C 重庆</label>                                                       <label data-val="长春" class="" data-linkid="quickservice-userpanel-2a2">C 长春</label>                                                       <label data-val="长沙" class="" data-linkid="quickservice-userpanel-2a3">C 长沙</label>                                                       <label data-val="成都" class="" data-linkid="quickservice-userpanel-2a4">C 成都</label>                                                       <label data-val="大连" class="" data-linkid="quickservice-userpanel-2a5">D 大连</label>                                                       <label data-val="东莞" class="" data-linkid="quickservice-userpanel-2a6">D 东莞</label>                                                       <label data-val="佛山" class="" data-linkid="quickservice-userpanel-2a7">F 佛山</label>                                                       <label data-val="广州" class="" data-linkid="quickservice-userpanel-2a8">G 广州</label>                                                       <label data-val="贵阳" class="" data-linkid="quickservice-userpanel-2a9">G 贵阳</label>                                                       <label data-val="海口" class="" data-linkid="quickservice-userpanel-2a10">H 海口</label>                                                       <label data-val="杭州" class="" data-linkid="quickservice-userpanel-2a11">H 杭州</label>                                                       <label data-val="合肥" class="" data-linkid="quickservice-userpanel-2a12">H 合肥</label>                                                       <label data-val="呼和浩特" class="" data-linkid="quickservice-userpanel-2a13">H 呼和浩特</label>                                                       <label data-val="济南" class="" data-linkid="quickservice-userpanel-2a14">J 济南</label>                                                       <label data-val="昆明" class="" data-linkid="quickservice-userpanel-2a15">K 昆明</label>                                                       <label data-val="拉萨" class="" data-linkid="quickservice-userpanel-2a16">L 拉萨</label>                                                       <label data-val="南昌" class="" data-linkid="quickservice-userpanel-2a17">N 南昌</label>                                                       <label data-val="南京" class="" data-linkid="quickservice-userpanel-2a18">N 南京</label>                                                       <label data-val="宁波" class="" data-linkid="quickservice-userpanel-2a19">N 宁波</label>                                                       <label data-val="青岛" class="" data-linkid="quickservice-userpanel-2a20">Q 青岛</label>                                                       <label data-val="苏州" class="" data-linkid="quickservice-userpanel-2a21">S 苏州</label>                                                       <label data-val="汕头" class="" data-linkid="quickservice-userpanel-2a22">S 汕头</label>                                                       <label data-val="深圳" class="" data-linkid="quickservice-userpanel-2a23">S 深圳</label>                                                       <label data-val="沈阳" class="" data-linkid="quickservice-userpanel-2a24">S 沈阳</label>                                                       <label data-val="石家庄" class="" data-linkid="quickservice-userpanel-2a25">S 石家庄</label>                                                       <label data-val="温州" class="" data-linkid="quickservice-userpanel-2a26">W 温州</label>                                                       <label data-val="武汉" class="" data-linkid="quickservice-userpanel-2a27">W 武汉</label>                                                       <label data-val="乌鲁木齐" class="" data-linkid="quickservice-userpanel-2a28">W 乌鲁木齐</label>                                                       <label data-val="西安" class="" data-linkid="quickservice-userpanel-2a29">X 西安</label>                                                       <label data-val="郑州" class="" data-linkid="quickservice-userpanel-2a30">Z 郑州</label>                                                </p>                </div>                <div class="hm-zh">                    <input type="text" value="" placeholder="字号如：猪八戒" class="hm-zh-input" data-linkid="quickservice-userpanel-2b">                </div>                <div class="hy-name">                    <input type="text" value="" placeholder="行业如：网络科技" class="hm-hy-input"><i class="angle-down"></i>                    <div class="hy-name-options" style="">                                                    <p>科技类：                                                            <label data-linkid="quickservice-userpanel-2c00">网络科技</label>                                                            <label data-linkid="quickservice-userpanel-2c01">电子商务</label>                                                            <label data-linkid="quickservice-userpanel-2c02">信息技术</label>                                                            <label data-linkid="quickservice-userpanel-2c03">游戏</label>                                                            <label data-linkid="quickservice-userpanel-2c04">电子</label>                                                            <label data-linkid="quickservice-userpanel-2c05">软件</label>                                                            <label data-linkid="quickservice-userpanel-2c06">新材料</label>                                                            <label data-linkid="quickservice-userpanel-2c07">生物科技</label>                                                            <label data-linkid="quickservice-userpanel-2c08">教育科技</label>                                                        </p>                                                    <p>许可类：                                                            <label data-linkid="quickservice-userpanel-2c10">投资管理</label>                                                            <label data-linkid="quickservice-userpanel-2c11">金融</label>                                                            <label data-linkid="quickservice-userpanel-2c12">资产</label>                                                            <label data-linkid="quickservice-userpanel-2c13">商业管理</label>                                                            <label data-linkid="quickservice-userpanel-2c14">融资租赁</label>                                                            <label data-linkid="quickservice-userpanel-2c15">医疗机械</label>                                                            <label data-linkid="quickservice-userpanel-2c16">人力资源</label>                                                            <label data-linkid="quickservice-userpanel-2c17">食品</label>                                                            <label data-linkid="quickservice-userpanel-2c18">劳务派遣</label>                                                        </p>                                                    <p>服务类：                                                            <label data-linkid="quickservice-userpanel-2c20">广告</label>                                                            <label data-linkid="quickservice-userpanel-2c21">文化传播</label>                                                            <label data-linkid="quickservice-userpanel-2c22">建筑装潢</label>                                                            <label data-linkid="quickservice-userpanel-2c23">设计</label>                                                            <label data-linkid="quickservice-userpanel-2c24">美容美发</label>                                                            <label data-linkid="quickservice-userpanel-2c25">房地产中介</label>                                                            <label data-linkid="quickservice-userpanel-2c26">物业管理</label>                                                            <label data-linkid="quickservice-userpanel-2c27">商务咨询</label>                                                            <label data-linkid="quickservice-userpanel-2c28">企业管理</label>                                                        </p>                                                    <p>其他：                                                            <label data-linkid="quickservice-userpanel-2c30">贸易</label>                                                            <label data-linkid="quickservice-userpanel-2c31">实业</label>                                                            <label data-linkid="quickservice-userpanel-2c32">制造</label>                                                            <label data-linkid="quickservice-userpanel-2c33">服饰</label>                                                            <label data-linkid="quickservice-userpanel-2c34">化妆品</label>                                                            <label data-linkid="quickservice-userpanel-2c35">工程</label>                                                            <label data-linkid="quickservice-userpanel-2c36">农业</label>                                                            <label data-linkid="quickservice-userpanel-2c37">餐饮管理</label>                                                            <label data-linkid="quickservice-userpanel-2c38">物流</label>                                                        </p>                                            </div>                </div>                <div class="hy-name-attr">                    <span>有限公司</span><i class="angle-down"></i>                    <p style="">                        <label class="curr" data-linkid="quickservice-userpanel-2d0">有限公司</label>                        <label data-linkid="quickservice-userpanel-2d1">合作企业</label>                    </p>                </div>        </li>        <li class="company-hm-tips">            如：重庆猪八戒网络有限公司，地区是“重庆”，字号是“猪八戒”，行业是“网络”，类型是“有限公司”。        </li>        <li class="company-hm-btn">            <button id="form-hm-btn" class="form-hm-btn" data-linkid="quickservice-userpanel-2">立即免费核名</button>        </li>        <li class="company-hm-tips1">            已有10w+人获取到了查询结果        </li>    </ul>    <div class="company-hm-result hide"></div></div></div>            <div class="qs-cont-item module-3"></div>            <div class="qs-cont-item module-4"></div>            <div class="qs-cont-item module-5"></div>            <div class="qs-cont-item module-6"></div>            <div class="qs-cont-item module-7"></div>            <div class="qs-cont-item module-8"></div>            <div class="qs-cont-item module-9 active"><div class="evaluate quick-service-evaluate">    <div class="form">        <div class="evaluate-tit">            — 企业服务市场价评估 —        </div>        <div class="form-item">            <label for="J-s1">我想要的服务</label>            <div class="select">                <span class="select1" data-id="1240">LOGO</span>                <div class="scroll-wrap" style="display: none;">                    <ul class="open-box">                                                    <li class="category1 J-category1">                                <div data-linkid="quickservice-userpanel-8e0">品牌设计/营销传播</div>                                <ul class="category2-box">                                    <li class="back J-back">                                        <i class="icon-angle-left"></i>返回</li>                                    <li class="category2">占位</li>                                                                            <li data-id="1577" class="category2 J-category2" data-linkid="quickservice-userpanel-8e00">新媒体营销</li>                                                                            <li data-id="1240" class="category2 J-category2" data-linkid="quickservice-userpanel-8e01">LOGO</li>                                                                            <li data-id="1242" class="category2 J-category2" data-linkid="quickservice-userpanel-8e02">VI视觉</li>                                                                            <li data-id="87" class="category2 J-category2" data-linkid="quickservice-userpanel-8e03">宣传品设计</li>                                                                            <li data-id="3" class="category2 J-category2" data-linkid="quickservice-userpanel-8e04">包装</li>                                                                            <li data-id="1236" class="category2 J-category2" data-linkid="quickservice-userpanel-8e05">品牌策划</li>                                                                            <li data-id="1239" class="category2 J-category2" data-linkid="quickservice-userpanel-8e06">文案撰写</li>                                                                            <li data-id="89" class="category2 J-category2" data-linkid="quickservice-userpanel-8e07">广告设计</li>                                                                            <li data-id="1844" class="category2 J-category2" data-linkid="quickservice-userpanel-8e08">商业策划</li>                                                                            <li data-id="80" class="category2 J-category2" data-linkid="quickservice-userpanel-8e09">PPT</li>                                                                            <li data-id="76" class="category2 J-category2" data-linkid="quickservice-userpanel-8e010">卡片设计</li>                                                                    </ul>                            </li>                                                    <li class="category1 J-category1">                                <div data-linkid="quickservice-userpanel-8e1">官方服务</div>                                <ul class="category2-box">                                    <li class="back J-back">                                        <i class="icon-angle-left"></i>返回</li>                                    <li class="category2">占位</li>                                                                            <li data-id="1393" class="category2 J-category2" data-linkid="quickservice-userpanel-8e10">公司注册</li>                                                                            <li data-id="1412" class="category2 J-category2" data-linkid="quickservice-userpanel-8e11">代理记账</li>                                                                            <li data-id="1324" class="category2 J-category2" data-linkid="quickservice-userpanel-8e12">法律顾问</li>                                                                            <li data-id="3589" class="category2 J-category2" data-linkid="quickservice-userpanel-8e13">社保</li>                                                                            <li data-id="3243" class="category2 J-category2" data-linkid="quickservice-userpanel-8e14">版权登记</li>                                                                            <li data-id="2108" class="category2 J-category2" data-linkid="quickservice-userpanel-8e15">商标注册</li>                                                                            <li data-id="2109" class="category2 J-category2" data-linkid="quickservice-userpanel-8e16">专利</li>                                                                    </ul>                            </li>                                                    <li class="category1 J-category1">                                <div data-linkid="quickservice-userpanel-8e2">软件定制开发</div>                                <ul class="category2-box">                                    <li class="back J-back">                                        <i class="icon-angle-left"></i>返回</li>                                    <li class="category2">占位</li>                                                                            <li data-id="1261" class="category2 J-category2" data-linkid="quickservice-userpanel-8e20">网站定制开发</li>                                                                            <li data-id="1343" class="category2 J-category2" data-linkid="quickservice-userpanel-8e21">APP开发</li>                                                                            <li data-id="1344" class="category2 J-category2" data-linkid="quickservice-userpanel-8e22">微信开发</li>                                                                            <li data-id="1306" class="category2 J-category2" data-linkid="quickservice-userpanel-8e23">工具软件</li>                                                                            <li data-id="1304" class="category2 J-category2" data-linkid="quickservice-userpanel-8e24">企业软件开发</li>                                                                            <li data-id="130" class="category2 J-category2" data-linkid="quickservice-userpanel-8e25">网站UI设计</li>                                                                    </ul>                            </li>                                                    <li class="category1 J-category1">                                <div data-linkid="quickservice-userpanel-8e3">电商服务</div>                                <ul class="category2-box">                                    <li class="back J-back">                                        <i class="icon-angle-left"></i>返回</li>                                    <li class="category2">占位</li>                                                                            <li data-id="1283" class="category2 J-category2" data-linkid="quickservice-userpanel-8e30">电商设计</li>                                                                            <li data-id="1289" class="category2 J-category2" data-linkid="quickservice-userpanel-8e31">电商代运营</li>                                                                            <li data-id="5184" class="category2 J-category2" data-linkid="quickservice-userpanel-8e32">电商视频/拍照服务</li>                                                                            <li data-id="5188" class="category2 J-category2" data-linkid="quickservice-userpanel-8e33">电商营销服务</li>                                                                            <li data-id="3474" class="category2 J-category2" data-linkid="quickservice-userpanel-8e34">开店服务</li>                                                                            <li data-id="3475" class="category2 J-category2" data-linkid="quickservice-userpanel-8e35">线上销货渠道拓展</li>                                                                    </ul>                            </li>                                                    <li class="category1 J-category1">                                <div data-linkid="quickservice-userpanel-8e4">游戏</div>                                <ul class="category2-box">                                    <li class="back J-back">                                        <i class="icon-angle-left"></i>返回</li>                                    <li class="category2">占位</li>                                                                            <li data-id="3384" class="category2 J-category2" data-linkid="quickservice-userpanel-8e40">游戏上架</li>                                                                            <li data-id="5158" class="category2 J-category2" data-linkid="quickservice-userpanel-8e41">游戏联运系统</li>                                                                            <li data-id="5749" class="category2 J-category2" data-linkid="quickservice-userpanel-8e42">微信H5游戏</li>                                                                            <li data-id="5750" class="category2 J-category2" data-linkid="quickservice-userpanel-8e43">棋牌游戏</li>                                                                            <li data-id="5751" class="category2 J-category2" data-linkid="quickservice-userpanel-8e44">小程序游戏</li>                                                                            <li data-id="450" class="category2 J-category2" data-linkid="quickservice-userpanel-8e45">游戏开发</li>                                                                            <li data-id="1991" class="category2 J-category2" data-linkid="quickservice-userpanel-8e46">游戏资质</li>                                                                            <li data-id="1922" class="category2 J-category2" data-linkid="quickservice-userpanel-8e47">游戏美术/UI</li>                                                                    </ul>                            </li>                                                    <li class="category1 J-category1">                                <div data-linkid="quickservice-userpanel-8e5">装修服务</div>                                <ul class="category2-box">                                    <li class="back J-back">                                        <i class="icon-angle-left"></i>返回</li>                                    <li class="category2">占位</li>                                                                            <li data-id="1398" class="category2 J-category2" data-linkid="quickservice-userpanel-8e50">公装设计</li>                                                                            <li data-id="2977" class="category2 J-category2" data-linkid="quickservice-userpanel-8e51">新房装修</li>                                                                            <li data-id="1214" class="category2 J-category2" data-linkid="quickservice-userpanel-8e52">产品设计</li>                                                                    </ul>                            </li>                                                    <li class="category1 J-category1">                                <div data-linkid="quickservice-userpanel-8e6">动画动漫/影视制作</div>                                <ul class="category2-box">                                    <li class="back J-back">                                        <i class="icon-angle-left"></i>返回</li>                                    <li class="category2">占位</li>                                                                            <li data-id="2935" class="category2 J-category2" data-linkid="quickservice-userpanel-8e60">卡通形象</li>                                                                            <li data-id="1254" class="category2 J-category2" data-linkid="quickservice-userpanel-8e61">影视后期</li>                                                                    </ul>                            </li>                                            </ul>                </div>            </div>        </div>        <div class="J-conditions conditions">                            <div class="form-item">                    <label for="" class="text-overflow" title="设计周期">设计周期</label>                    <select name="" id="">                                                    <option value="117" data-linkid="quickservice-userpanel-8f00">0-5天</option>                                                    <option value="118" data-linkid="quickservice-userpanel-8f01">5-15天</option>                                                    <option value="119" data-linkid="quickservice-userpanel-8f02">15天以上</option>                                            </select>                </div>                            <div class="form-item">                    <label for="" class="text-overflow" title="所属行业">所属行业</label>                    <select name="" id="">                                                    <option value="120" data-linkid="quickservice-userpanel-8f10">餐饮行业</option>                                                    <option value="121" data-linkid="quickservice-userpanel-8f11">食品饮料</option>                                                    <option value="122" data-linkid="quickservice-userpanel-8f12">互联网行业</option>                                                    <option value="123" data-linkid="quickservice-userpanel-8f13">其他行业</option>                                            </select>                </div>                            <div class="form-item">                    <label for="" class="text-overflow" title="设计师资质">设计师资质</label>                    <select name="" id="">                                                    <option value="124" data-linkid="quickservice-userpanel-8f20">1-3年经验</option>                                                    <option value="125" data-linkid="quickservice-userpanel-8f21">3-5年经验</option>                                                    <option value="126" data-linkid="quickservice-userpanel-8f22">5年以上经验</option>                                            </select>                </div>                    </div>        <div class="fs-btn-gjq J-eval-btn" data-linkid="quickservice-userpanel-8a">立即估价</div>    </div>    <div class="result">        <div class="back">重新估价</div>        <div class="range">            <span class="J-lower">80000</span><span>元</span>            <span class="J-higher">- 120000元</span>        </div>        <div class="remark">以上价格仅供参考，实际价格受中标服务商资质、具体需求等因素影响</div>           <div class="quick-service-submit" data-cid="" data-type="kjfw_fwgj" data-cname="" data-desc="服务估价">            <span class="quick-service-subBtn active" data-linkid="quickservice-userpanel-8b">按此标准定制服务</span>            <div class="quick-service-phone" data-phone="">                <input type="text" class="qs-phone" readonly="" value="">                <a class="qs-rewirte" data-linkid="quickservice-userpanel-8c">修改</a>                <span class="qs-phone-btn" data-name="服务估价" data-linkid="quickservice-userpanel-8d">确认</span>            </div>            <div class="quick-validate-phone" data-name="服务估价"></div>            <div class="quick-service-result">                <i class="icon"></i><span class="msg">需求提交成功</span>            </div>        </div>    </div></div></div>        </div>    </div></div></div>
</div>
</div>
              </el-tab-pane>
              <el-tab-pane label="供应商" name="second">
                配置管理
              </el-tab-pane>
            </el-tabs>

            
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!--第四行   需求任务及已完成需求-->
    <el-row :gutter="gutterCount">
      <!--需求任务-->
      <el-col :span="8" :push="pushCount">
        <div class="grid-content2 ">
          <el-card class="grid-content2 ">
            <div slot="header">
              <span>需求任务</span>
              <el-button style="float: right; padding: 5px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="p in demandTaskList" :key="p.name" style="padding-bottom: 20px;">
              <div style="float:left; width:10%;">{{"["+p.category+"]"}}&nbsp;</div>
              <div style="float:left; width:10%">{{"["+p.companyName+"]"}}&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{p.name}}</div>
              <div style="float:right;width:30%">&nbsp;{{p.sTime}}</div>
            
            </div>
            


        </el-card>
          
        </div>
      </el-col>
      <!--已完成需求-->
      <el-col :span="8"  :push="pushCount">
        <div class="grid-content2 ">
            <el-card class="grid-content2 ">
            <div slot="header">
              <span>已完成需求</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="i in completeddemandTaskList" :key="i.name">
              <div style="float:left; width:15%;">{{"["+i.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:15%">{{"["+i.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{i.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{i.sTime}}</div>
            </div>
            

        </el-card>
          
        </div>
      </el-col>
      <!--核心企业名单-->
      <el-col :span="4"  :push="pushCount">
        <div class="grid-content2 ">
            <el-card class="grid-content2 ">
              <div slot="header">
                <span>核心企业</span>
                  <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
              </div>

              <div v-for="l in corebusinessList" :key="l.name">
                <div style="float:left; width:30%;">{{"["+l.category+"]"}}&nbsp;</div>
                <div style="float:left; width:70%">{{l.companyName}}&nbsp;&nbsp;</div>
              </div>
            </el-card>
          
        </div>
      </el-col>

    </el-row>

    <!--第五行  分割线-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>流通</a>
        </div>
      </el-col>
    </el-row>

    <!--第六行   流通需求及已完成流通-->
    <el-row :gutter="gutterCount">
      <!--流通需求-->
      <el-col :span="8" :push="pushCount">
        <div class="grid-content bg-purple-dark">
          <el-card class="grid-content2 ">
            <div slot="header">
              <span>流通需求</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="u in demandforcirculationList" :key="u.name">
              <div style="float:left; width:15%;">{{"["+u.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:15%">{{"["+u.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{u.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{u.sTime}}</div>
            </div>
            


        </el-card>
          
        </div>
      </el-col>
      <!--已完成流通-->
      <el-col :span="8"  :push="pushCount">
        <div class="grid-content bg-purple-dark">
            <el-card class="grid-content2 ">
            <div slot="header">
              <span>已完成流通</span>
              <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
            </div>

            <div v-for="j in completecirculationList" :key="j.name">
              <div style="float:left; width:15%;">{{"["+j.category+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left; width:15%">{{"["+j.companyName+"]"}}&nbsp;&nbsp;</div>
              <div style="float:left;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;width:50%">{{j.name}}</div>
              <div style="float:right;width:20%">&nbsp;&nbsp;{{j.sTime}}</div>
            </div>
            

        </el-card>
          
        </div>
      </el-col>
      <!--供应商信息-->
      <el-col :span="4"  :push="pushCount">
        <div class="grid-content bg-purple-dark">
          <el-card class="grid-content2 ">
              <div slot="header">
                <span>供应商</span>
                  <el-button style="float: right; padding: 3px 0" type="text">>>更多</el-button>
              </div>

              <div v-for="h in supplierlist" :key="h.name">
                <div style="float:left; width:40%;">{{"["+h.category+"]"}}&nbsp;&nbsp;</div>
                <div style="float:left; width:60%">{{h.companyName}}&nbsp;</div>
              </div>
            </el-card>
          
        </div>
      </el-col>

    </el-row>


    <!--第七行  分割线-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="big_bt">
            <a>网站数据</a>
        </div>
      </el-col>
    </el-row>



    <!--第八行  网站数据统计图表
    <el-row :gutter="gutterCount"d >
      <el-col :span="16" :class="charts">
          <el-card span="16" shadow="hover" style="height:482px;margin-top:10px;">
           <div slot="header" class="clearfix">
            <span>需求详情</span>
            <el-tabs v-model="activeName">
              <el-tab-pane label="分季度完成需求量统计" name="first">
                <div id="quarterlySituation" style="width: 600px;height:400px;"></div>
              </el-tab-pane>
              <el-tab-pane label="核心企业发布需求量Top5" name="second">
                <div id="releaseDemandTop5" style="width: 600px;height:400px;"></div>
              </el-tab-pane>    
              <el-tab-pane label="供应商完成需求量Top5" name="thirth">
                <div id="fulfillDemandTop5" ref="chart" style="width:600px;height:400px"></div>
              </el-tab-pane>
              <el-tab-pane label="企业评分雷达" name="forth">
                <div id="comprehensiveScore" style="width: 600px;height:400px;"></div>
              </el-tab-pane>
              <el-tab-pane label="分类别需求量统计" name="fifth">
                <div class="type-situation"></div>
                <div id="typeSituation" style="width: 900px;height:400px;"></div>
              </el-tab-pane>              
            </el-tabs>
          </div>
         </el-card>
      </el-col>
    </el-row>
    -->

    
    <!--第九行  留一行-->
    <el-row :gutter="gutterCount" >
      <el-col :span="20"  :push="pushCount" :pull="pullCount">
        <div class="grid-content4 bg-purple-dark">

          
        </div>
      </el-col>
    </el-row>

    
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

      fit:'cover',

      //第一行图片的URL
      url0:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",

      //设定el-cow的值
      gutterCount: 15,
      pushCount:2,
      pullCount:2,
      pushCount0:3,

      //第二行网站统计数据
      taskCountMonth:233,
      demandTaskCount:212,
      circulationTaskCount:666,
      certifiedEnterpriseCount:231,
      certifiedSupplierCount:526,
      // 图片地址数组
            img_list:[
              require('../../../assets/images/home/713be62978c1729c076bcebb8a3bf44a.jpg'),
              require('../../../assets/images/home/a7e942533a9e0e5056c0c67f89dcc0ae.jpeg'),
              require('../../../assets/images/home/a662f30ed18c4e6592a42747b4b412b8.jpg'),
            ],
      


       //登录注册模块
       activeName: 'second',

      //需求任务数组
      demandTaskList:
      [
        {category:"采购",companyName:"一汽",name:"危险品运输半挂车货箱采购项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"设备",companyName:"一汽",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"哈工",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"设备",companyName:"一汽",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"设备",companyName:"一汽",name:"LTE-V数据协议及性能测试设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"一汽",name:"数据中心采暖系统改造项目",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"哈工",name:"TNGA（2.5L）项目组装线安装工程",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      completeddemandTaskList:
      [
        {category:"竞价",companyName:"哈工",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"一汽",name:"MKS1632数控外圆磨尾架维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"一汽",name:"厂区维修服务",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"工程",companyName:"哈工",name:"汽车刹车片设计",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"一汽",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"一汽",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"一汽",name:"安装B30EV-试冲板料-3",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"6666",name:"MKS1632数控外圆磨尾架维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"维修",companyName:"6666",name:"MKS1632数控外圆磨尾架维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"6666",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"竞价",companyName:"6666",name:"绝缘用具更新及试验",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"6666",name:"安装B30EV-试冲板料-3",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"安装",companyName:"6666",name:"安装B30EV-试冲板料-3",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      //核心企业
      corebusinessList:
      [
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        {category:"汽车",companyName:"一汽"},
        {category:"航天",companyName:"哈工"},
        
      ],
      //流通需求
      demandforcirculationList:
      [
        {category:"制作",companyName:"一汽",name:"外销减速器总成试制件",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"拉伸垫活塞及连接螺杆修理",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡簧槽测厚工具的制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡簧槽测厚工具的制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡车厂外委修理飞轮内孔",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"卡车厂外委修理飞轮内孔",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧维修",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"一汽",name:"中心主轴双螺旋拉刀弹簧制作",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      //完成流通
      completecirculationList:
       [
        {category:"采购",companyName:"一汽",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"哈工",name:"加强板压模和连接板压模",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"制作",companyName:"哈工",name:"加强板压模和连接板压模",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"粗糙度检查仪采购",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"粗糙度检查仪采购",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"粗糙度检查仪采购",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"一汽",name:"修理UPS设备",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"修理",companyName:"哈工",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        {category:"采购",companyName:"哈工",name:"车桥厂改造DMC-75H卧式加工中心过滤系统",sTime:"2019-09-06",eTime:"2019-12-31"},
        
      ],
      //供应商
      supplierlist:
      [
        {category:"灯系",companyName:"上海小糸车灯有限公司 "},
        {category:"轮胎",companyName:"上海轮胎橡胶(集团)供销有限公司"},
        {category:"特种工具",companyName:"上海奥力得特种工具厂"},
        {category:"塑料",companyName:"上海胜德塑料厂 "},
        {category:"开关",companyName:"北京京伟电器有限公司 "},
        {category:"装饰配件",companyName:"北京中环汽车装饰件有限责任公司"},
        {category:"散热器",companyName:"合肥皖仪科技有限公司"},
        
      ],

    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
      recordTabletender(){
      },
      //登陆注册模块点击
       handleClick(tab, event) {
        console.log(tab, event);
      }
  }
};


</script>

<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->


<style>
/**中间的div块   给gutter留padding*/
.BG {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 20px;
  font-size: 18px;
}

/**第一行用css样式*/
.grid-content0
{
  border-radius: 4px;
  height: 400px;
}
/**第二行用css样式 网站访问统计数据块*/
.grid-content1
{
  border-radius: 4px;
  height: 50px;
  /**文字显示居中 */
  text-align: center;
  line-height: 50px;
}
.grid-content2
{
  border-radius: 4px;
  height: 400px;
}
.grid-content3
{
  border-radius: 4px;
  height: 400px;
}
.grid-content4
{
  border-radius: 4px;
  height: 100px;
}



/**网站统计数据字体样式 */
.fontStyle0
{
  font-size: 20px;
  color:rgb(167, 165, 165);
}
.fontStyle
{
  font-size: 24px;
  color:orangered;
}

/**划分页面标识*/
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





/** 登录模块核心企业与供应商用CSS*/
.loginHeight
{
  height: 300px;
}

/**布局测试用css*/
.el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  


/**服务入口跳转用CSS*/
.category_wrap {
    width: 100%;
    margin: 0px;
    float: left;
    overflow: hidden;
}
.category_box {
    width: 1300px;
}
.category_item {
    width: 24%;
    height: 210px;
    float: left;
    background: #f5f5f5;
    margin: 0 2px 0 0;
}
.cate_ietm_title {
    width: 100%;
    height: 70px;
    background: #fa6569;
    color: #fff;
}
.cate_list {
    line-height: 30px;
    margin: 20px;
    display: block;
}
.cate_list a {
    margin: 0 20px 0 0;
    display: inline-block;
    font-size: 10px;
}
a {
    color: #333;
    text-decoration: none;
}





.index-user-panel .user-panel-tab-content .tab-content-customer.active .user-panel-tab-content .tab-content-seller.active {
    display: block;
}
 .tab-content-title {
    font-size: 12px;
    color: #333;
    margin-bottom: 6px;
    margin-top: 7px;
    font-weight: 600;
}
.tab-content-locate.customer-locate {
    background: transparent;
    padding-left: 0;
    color: #333;
}
 .tab-content-locate.customer-locate {
    background: transparent;
    padding-left: 0;
    color: #333;
}

































ul li {
  list-style: none;
  margin-bottom: 5px;
  overflow: hidden;
}
.some-show{
  white-space: nowrap;/* 规定段落中的文本不进行换行 */
  text-overflow: ellipsis; /*文字段在容器内超宽时，截断该文字段并且续以省略号*/
  overflow: hidden;
}
.tender-notice{
border:1px solid #d3d7d4;
}
.tender-header{
    padding:15px;
    border-bottom: 1px solid #d3d7d4;
}
.tender-header span{
    font-size: 800;
    font-size: 18px;
}
.tender-header-some{
    padding:20px;
    font-size: 15px;
    color: #a1a3a6;
}
.charts{
  text-align:"center";
  align-self: auto;
  align-content: center;
  align-items: center;
  
}
/* .tender-header-some ul li{
    margin-bottom: 15px;
} */
</style>