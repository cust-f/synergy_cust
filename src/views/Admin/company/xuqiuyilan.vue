<template>
  <div class="xuqiuyilan">
    <el-col :span="20" push="2" pull="2">
      <div>
        <div>
          <div class="title" width="160px">
            <span>首页</span>
            <span>&nbsp; > &nbsp;</span>
            <span>科技成果</span>
          </div>
          <br />
        </div>

        <div class="cool">
          <table class="table1">
            <tbody>
              <tr>
                <td class="td101">限制条件：</td>
                <td class="td102">
                  <span class="cg_td_a1" width="100%">不限</span>
                  <span class="cg_td_a2" width="100%">完成任务数目</span>
                  <span class="cg_td_a2" width="100%">注册时间</span>
                  <span class="cg_td_a2" width="100%">人员数目</span>
                  <span class="cg_td_a2" width="100%">具体操作</span>
                  <span class="cg_td_a2" width="100%">公司规模</span>
                  <span class="cg_td_a2" width="100%">注册资本</span>
                </td>
              </tr>
              <tr>
                <td class="td101">交易方式：</td>
                <td class="td102">
                  <span class="cg_td_a1" width="100%">不限</span>
                  <span class="cg_td_a2" width="100%">面交</span>
                  <span class="cg_td_a2" width="100%">网银支付</span>
                  <span class="cg_td_a2" width="100%">支付宝支付</span>
                  <span class="cg_td_a2" width="100%">中国银行支付</span>
                  <span class="cg_td_a2" width="100%">农业银行支付</span>
                  <span class="cg_td_a2" width="100%">交通银行支付</span>
                </td>
              </tr>
              <tr>
                <td class="td101">任务类型</td>
                <td class="td102">
                  <span class="cg_td_a1" width="100%">不限</span>
                  <span class="cg_td_a2" width="100%">车间零部件生产</span>
                  <span class="cg_td_a2" width="100%">卫星微型零件制作</span>
                  <span class="cg_td_a2" width="100%">导弹装配与改革</span>
                  <span class="cg_td_a2" width="100%">锅炉制造装配</span>
                  <span class="cg_td_a2" width="100%">车用配件制造</span>
                  <span class="cg_td_a2" width="100%">车辆装配与制作</span>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>

        <div class="thisMiddle">
          <div class="middleLeft">
            <input name="search_text" id="search_text" type="text" placeholder="请输入搜索内容" />
            <el-button type="warning" class="button1">搜索</el-button>
          </div>
          <div>
            <p
              class="ziti1"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;若没有找到合适的技术，建议您立即发布技术需求</p>
          </div>
          <br />
        </div>
      </div>
    </el-col>
    <div class="thisAfter">
      <div class="list_div">
        <div class="cg_bottomlist">
           
          <ul class="cg_bottomLeft">
            <li class="cg_list001"> 
                <br>
                <br>
              <a class="ziti2" @click="tiaozhuan">福特汽车组装</a>
            </li>
            <li class="cg_list002">
              <a>
                <font>限制条件：</font>
                公司规模
              </a>
              <a>
                <font>任务类型：</font>
                车间零部件制作
              </a>
              <br>
              <a>
                <font>交易方式:</font>
                技术入股
              </a>
              <a>
                <font>价格:</font>
                面议
              </a>
            </li>
          </ul>
          <div class="bottomRight">
            <a href class="fabujigou">发布机构</a>
            <ul class="jgje">
              <li>
                <a style="width:435px">
                  <font>机构名称:</font>
                  辽宁省科技服务中心
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="cg_bottomlist">
          <ul class="cg_bottomLeft">
            <li class="cg_list001">
              <a class="ziti2" @click="tiaozhuan">工业管理系统</a>
            </li>
            <li class="cg_list002">
              <a>
                <font>限制条件：</font>
                人员数目
              </a>
              <a>
                <font>任务类型：</font>
                卫星微型零件制作
              </a>
              <br />
              <a>
                <font>交易方式:</font>
                农业银行交易
              </a>
              <a>
                <font>价格:</font>
                面议
              </a>
            </li>
          </ul>
          <div class="bottomRight">
            <a href class="fabujigou">发布机构</a>
            <ul class="jgje">
              <li>
                <a style="width:435px">
                  <font>机构名称:</font>
                  辽宁省科技服务中心
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="cg_bottomlist">
          <ul class="cg_bottomLeft">
            <li class="cg_list001">
              <a class="ziti2" @click="tiaozhuan">长春钢铁厂锅炉制造</a>
            </li>
            <li class="cg_list002">
              <a>
                <font>限制条件：</font>
                人员数目
              </a>
              <a>
                <font>任务类型：</font>
                锅炉装配制造
              </a>
              <br />
              <a>
                <font>交易方式：</font>
                技术入股
              </a>
              <a>
                <font>价格：</font>
                面议
              </a>
            </li>
          </ul>
          <div class="bottomRight">
            <a href class="fabujigou">发布机构</a>
            <ul class="jgje">
              <li>
                <a style="width:435px">
                  <font>机构名称:</font>
                  辽宁省科技服务中心
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="cg_bottomlist">
          <ul class="cg_bottomLeft">
            <li class="cg_list001">
              <a class="ziti2" @click="tiaozhuan">车载摄像头制作安装</a>
            </li>
            <li class="cg_list002">
              <a>
                <font>限制条件：</font>
                公司规模
              </a>
              <a>
                <font>任务类型</font>
                车辆装配制造
              </a>
              <a>
                <font>交易方式</font>
                现金交易
              </a>
              <a>
                <font>价格</font>
                面议
              </a>
            </li>
          </ul>
          <div class="bottomRight">
            <a href class="fabujigou">发布机构</a>
            <ul class="jgje">
              <li>
                <a style="width:435px">
                  <font>机构名称:</font>
                  黑龙江省大江机械集团
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "substaskDetail",
  data() {
    return {};
  },

  methods: {
    tiaozhuan(){
        
    }
  }
};
</script>
<style>
.title {
  font-size: 14px;
  font-style: normal;
  width: 160px;
}
.td101 {
  border-bottom-color: rgb(204, 204, 204);
  border-bottom-style: dashed;
  border: bottom width 1px;
  border-collapse: collapse;
  border-left-color: rgb(204, 204, 204);
  border-left-style: dashed;
  border-left-width: 1px;
  border-right-color: rgb(204, 204, 204);
  border-right-style: dashed;
  border-right-width: 1px;
  border-spacing: 0px 0px;
  border-top-color: rgb(204, 204, 204);
  border-top-style: dashed;
  border-top-width: 1px;
  color: rgb(51, 51, 51);
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  margin-bottom: 0px;
  text-align: center;
  text-decoration: none;
  width: 160px;
}
.td102 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  border-bottom-color: rgb(204, 204, 204);

  border-bottom-style: dashed;

  border-bottom-width: 1px;

  border-collapse: collapse;

  border-left-color: rgb(204, 204, 204);

  border-left-style: dashed;

  border-left-width: 1px;

  border-right-color: rgb(204, 204, 204);

  border-right-style: dashed;

  border-right-width: 1px;

  border-spacing: 0px 0px;

  border-top-color: rgb(204, 204, 204);

  border-top-style: dashed;

  border-top-width: 1px;

  color: rgb(102, 102, 102);

  font-family: "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  padding-bottom: 20px;

  padding-left: 40px;

  padding-right: 40px;

  padding-top: 20px;

  text-decoration: none;
}

.cg_td_a1 {
  border-collapse: collapse;
  border-spacing: 0px 0px;
  color: rgb(225, 119, 32);
  display: block;
  float: left;
  font-family: "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  margin-right: 50px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  text-decoration: none;
}
.cg_td_a2 {
  border-collapse: collapse;
  border-spacing: 0px 0px;
  display: block;
  float: left;
  font-family: "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  margin-right: 50px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  text-decoration: none;
}
.cool {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  margin-right: 126.61px;

  text-decoration: none;
}
.middleLeft {
  -webkit-tap-highlight-color: rgba(31, 12, 12, 0);

  border-bottom-color: rgb(255, 119, 32);

  border-bottom-style: solid;

  border-bottom-width: 1px;

  border-left-color: rgb(255, 119, 32);

  border-left-style: solid;

  border-left-width: 1px;

  border-right-color: rgb(255, 119, 32);

  border-right-style: solid;

  border-right-width: 1px;

  border-top-color: rgb(255, 119, 32);

  border-top-style: solid;

  border-top-width: 1px;

  float: left;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  width: 700px;
}
.xuqiuyilan .button1 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  background-attachment: scroll;

  background-clip: border-box;

  background-color: rgb(255, 119, 32);

  background-image: none;

  background-origin: padding-box;

  background-position-x: 0%;

  background-position-y: 0%;

  background-repeat: repeat;

  background-size: auto;

  border-bottom-color: rgb(255, 255, 255);

  border-bottom-style: none;

  border-bottom-width: 0px;

  border-left-color: rgb(255, 255, 255);

  border-left-style: none;

  border-left-width: 0px;

  border-right-color: rgb(255, 255, 255);

  border-right-style: none;

  border-right-width: 0px;

  border-top-color: rgb(255, 255, 255);

  border-top-style: none;

  border-top-width: 0px;

  color: rgb(255, 255, 255);

  cursor: pointer;

  float: right;

  font-family: "微软雅黑";

  font-size: 16px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 30px;

  margin-bottom: 0px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 0px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  width: 120px;
}
.ziti1 {
  font-size: 14px;
}
.cg_bottomLeft {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  background-attachment: scroll;

  background-clip: border-box;

  background-color: transparent;

  background-image: none;

  background-origin: padding-box;

  background-position-x: 0%;

  background-position-y: 0%;

  background-repeat: repeat;

  background-size: auto;

  color: rgb(51, 51, 51);

  float: left;

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  list-style-image: none;

  list-style-position: outside;

  list-style-type: none;

  margin-bottom: 0px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 0px;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  vertical-align: baseline;

  width: 660px;

  word-break: break-all;

  height: 160px;
}
.cg_list001 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  color: rgb(51, 51, 51);

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  word-break: break-all;
}
.cg_list002 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  color: rgb(51, 51, 51);

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 14px;

  font-weight: 400;

  list-style-position: outside;

  word-break: break-all;
}
.cg_bottomlist {



}
.ziti2 {
  -webkit-text-size-adjust: auto;

  color: rgb(0, 153, 234);

  display: block;

  font-family: "微软雅黑";

  font-size: 18px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: 40px;

  list-style-image: none;

  list-style-position: outside;

  list-style-type: none;

  outline-color: invert;

  outline-style: none;

  outline-width: 0px;

  overflow: hidden;

  text-decoration: none;

  text-overflow: ellipsis;

  white-space: nowrap;

  width: 600px;

  word-break: break-all;
}
.fabujigou {
  background-attachment: scroll;

  background-clip: border-box;

  background-color: rgb(255, 230, 197);

  background-origin: padding-box;

  background-repeat: repeat;

  background-size: auto;

  color: rgb(255, 119, 32);

  display: block;

  font-family: "微软雅黑";

  font-size: 16px;

  font-weight: 400;

  left: 20px;

  line-height: 30px;

  outline-color: invert;

  position: relative;

  text-align: center;

  top: 15px;

  width: 100px;
}
.jgje {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-text-size-adjust: auto;

  background-attachment: scroll;

  background-clip: border-box;

  background-color: transparent;

  background-origin: padding-box;

  background-repeat: repeat;

  background-size: auto;

  border-bottom-color: rgb(244, 156, 37);

  border-bottom-style: dashed;

  border-bottom-width: 1px;

  border-left-color: rgb(244, 156, 37);

  border-left-style: dashed;

  border-left-width: 1px;

  border-right-color: rgb(244, 156, 37);

  border-right-style: dashed;

  border-right-width: 1px;

  border-top-color: rgb(244, 156, 37);

  border-top-style: dashed;

  border-top-width: 1px;

  color: rgb(51, 51, 51);

  font-family: Arial, Verdana, "微软雅黑";

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  height: 70px;

  outline-color: invert;

  overflow: hidden;

  padding-bottom: 10px;

  padding-left: 10px;

  padding-right: 10px;

  padding-top: 20px;

  text-decoration: none;

  vertical-align: baseline;

  word-break: break-all;
}
.bottomRight {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: right;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-weight: 400;

  line-height: normal;

  position: relative;

  top: -15px;

  width: 460px;
}
.list_div {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 0px;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;
}
.thisAfter {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 20px;

  margin-left: 126.6px;

  margin-right: 126.61px;

  margin-top: 0px;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  width: 1200px;
}
.table1 {
  background-attachment: scroll;

  background-clip: border-box;

  background-color: rgb(250, 250, 250);

  background-image: none;

  background-origin: padding-box;

  background-position-x: 0%;

  background-position-y: 0%;

  background-repeat: repeat;

  background-size: auto;

  border-bottom-color: rgb(204, 204, 204);

  border-bottom-style: solid;

  border-bottom-width: 0.5px;

  border-collapse: collapse;

  border-left-color: rgb(204, 204, 204);

  border-left-style: solid;

  border-left-width: 0.5px;

  border-right-color: rgb(204, 204, 204);

  border-right-style: solid;

  border-right-width: 0.5px;

  border-spacing: 0px 0px;

  border-top-color: rgb(204, 204, 204);

  border-top-style: solid;

  border-top-width: 0.5px;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  text-decoration: none;

  width: 1198px;
}
</style>
