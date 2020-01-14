<template>
<el-main >
  <div class="xuqiuyilan">
    
    <el-col :span="20" push="2" pull="2" >
      <div>
        <div>
          <el-col span="8" offset="3">
          <div class="title" width="160px" >
            <span>首页</span>
            <span>&nbsp; > &nbsp;</span>
            <span>科技成果</span>
          </div>
          </el-col>
        </div>
    </div> 

    <div class="zy_kjcg_top">
    <!--<div><a>科技成果</a></div>-->
    <table cellpadding="0" cellspacing="0">
        
        <tbody><tr>
            <td class="cg_td01">需求类型：</td>
            <td class="cg_td02">
                <a>不限</a>
                <a>设计</a>
                <a>流通</a>
            </td>
        </tr><tr>
        <td class="cg_td01">需求类别：</td>
        <td class="cg_td02">
                <a @click="click0">不限</a>
                <a @click="click1">交通运输设备</a>
                <a @click="click2"> 仪器仪表及文化、办公用机械</a>
                <a @click="click3">通信设备、计算机及其他电子设备</a>
                <a @click="click4">电气机械及器材</a>
                <a @click="click5">专用设备</a>
                <a @click="click6">通用设备</a>
        </td>
    </tr>
        <tr>
            <td class="cg_td01">下分子类：</td>
            <td class="cg_td02">
                <div v-if="show0">
            <a v-for="item in options0"
              :key="item.value"
            >{{item.label}}</a>
          </div>
          <div v-if="show1">
            <a v-for="item in options1"
                  :key="item.value"
            >{{item.label}}</a>
          </div>
          <div v-if="show2">
            <a v-for="item in options2"
                  :key="item.value"
            >{{item.label}}</a>
          </div>
          <div v-if="show3" >
            <a v-for="item in options3"
                  :key="item.value"
            >{{item.label}}</a>
          </div>
          <div v-if="show4">
            <a v-for="item in options4"
                  :key="item.value"
            >{{item.label}}</a>
          </div>
          <div v-if="show5">
            <a v-for="item in options5"
                  :key="item.value"
            >{{item.label}}</a>
          </div>
            </td>
        </tr>
        
    </tbody></table>
</div>













        <div class="thisMiddle" align="middle">
          <div class="middleLeft">
            <input name="search_text" id="search_text" type="text" placeholder="请输入搜索内容" />
            <el-button type="warning" class="button1">搜索</el-button>
        </div>
        
      </div>
    </el-col>
    <div class="thisAfter" align="middle">
      <div class="list_div">




        <div class="cg_bottomlist" align="middle">
           
          <ul class="cg_bottomLeft" align="middle">
            <li class="cg_list001"> 
                <br>
                <br>
              <a href="#/admin/xuqiuyilanDetail" class="ziti2">福特汽车组装</a>
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
          <div class="bottomRight" align="middle">
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



        <div class="cg_bottomlist"   >
          <ul class="cg_bottomLeft">
            <li class="cg_list001">
              <a class="ziti2" href="#/admin/xuqiuyilanDetail" >工业管理系统</a>
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
                <a style="width:435px" align="left">
                  <font>机构名称:</font>
                  辽宁省科技服务中心
                  <br>

                   <font>联系电话:</font>
                   1231231232132
                </a>
              </li>
            </ul>
          </div>
        </div>




        <div class="cg_bottomlist">
          <ul class="cg_bottomLeft">
            <li class="cg_list001">
              <a class="ziti2" href="#/admin/xuqiuyilanDetail" >长春钢铁厂锅炉制造</a>
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
              <a class="ziti2" href="#/admin/xuqiuyilanDetail" >车载摄像头制作安装</a>
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
  </el-main>
</template>



<script>
export default {
  name: "substaskDetail",
  data() {
    







    return { 
      //需求大类下的下分子类
    //交通运输设备子类
        options0: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '汽车'
        }, {
          value0: '2',
          label: '铁路运输设备'
        }, {
          value0: '3',
          label: '摩托车'
        }, {
          value0: '4',
          label: '自行车'
        }, {
          value0: '5',
          label: '船舶及浮动装置'
        }, {
          value0: '6',
          label: '航空航天器'
        },{
          value0: '7',
          label: '交通器材及其他交通运输设备'
        }],
        //仪器仪表及文化、办公用机械
        options1: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '通用仪器仪表'
        }, {
          value0: '2',
          label: '专用仪器仪表'
        }, {
          value0: '3',
          label: '钟表与计时仪器'
        }, {
          value0: '4',
          label: '光学仪器及眼镜'
        }, {
          value0: '5',
          label: '文化、办公用机械'
        }, {
          value0: '6',
          label: '其他仪器仪表的制造及修理'
        }],
        //通信设备、计算机及其他电子设备
        options2: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '通信设备'
        }, {
          value0: '2',
          label: '雷达及配套设备'
        }, {
          value0: '3',
          label: '广播电视设备'
        }, {
          value0: '4',
          label: '电子计算机'
        }, {
          value0: '5',
          label: '电子器件'
        }, {
          value0: '6',
          label: '电子元件'
        }, {
          value0: '7',
          label: '家用视听设备'
        }, {
          value0: '8',
          label: '其他电子设备'
        }],
        //电气机械及器材
        options3: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '电机'
        }, {
          value0: '2',
          label: '输配电及控制设备'
        }, {
          value0: '3',
          label: '电线、电缆、光缆及电工器材'
        }, {
          value0: '4',
          label: '电池'
        }, {
          value0: '5',
          label: '家用电力器具'
        }, {
          value0: '6',
          label: '非电力家用器具'
        }, {
          value0: '7',
          label: '照明器具'
        }, {
          value0: '8',
          label: '其他电气机械及器材'
        }],
        //专用设备
        options4: [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '矿山、冶金、建筑专用设备'
        }, {
          value0: '2',
          label: '化工、木材、非金属加工专用设备'
        }, {
          value0: '3',
          label: '食品、饮料、烟草及饲料生产专用设备'
        }, {
          value0: '4',
          label: '印刷、制药、日化生产专用设备'
        }, {
          value0: '5',
          label: '纺织、服装和皮革工业专用设备'
        }, {
          value0: '6',
          label: '电子和电工机械专用设备'
        }, {
          value0: '7',
          label: '农、林、牧、渔专用机械'
        }, {
          value0: '8',
          label: '医疗仪器设备及器械'
        }, {
          value0: '9',
          label: '环保、社会公共安全及其他专用设备'
        }],
        //通用设备
        options5:  [{
          value0: '0',
          label: '不限'
        },{
          value0: '1',
          label: '锅炉及原动机'
        }, {
          value0: '2',
          label: '金属加工机械'
        }, {
          value0: '3',
          label: '起重运输设备'
        }, {
          value0: '4',
          label: '泵、阀门、压缩机及类似机械'
        }, {
          value0: '5',
          label: '轴承、齿轮、传动和驱动部件'
        }, {
          value0: '6',
          label: '烘炉、熔炉及电炉'
        }, {
          value0: '7',
          label: '风机、衡器、包装设备等通用设备'
        }, {
          value0: '8',
          label: '通用零部件制造及机械修理'
        }, {
          value0: '9',
          label: '金属铸、锻加工'
        }],
        //各子类显示判定bool值
        show0: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,

        //判断当前选项是否为第一次点击，若被点击此值为1
        fclick0: true,
        fclick1: true,
        fclick2: true,
        fclick3: true,
        fclick4: true,
        fclick5: true,
        fclick6: true,










      activeName: 'first',
      checkList1: [],
      checkList2: [],
      checkList3: [],
      checkList4: [],
      checkList5: [],
      checkList6: [],
      checkList7: [],
    };
     radio: '1'
     
       
      
      
  },

  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
      },
    
    tiaozhuan(){
        this.router.push("/admin/circulationTask")

    },
    
    click0()
    {
      
      if(this.fclick6==true)
        {
          this.show0=true;
      this.show1=true;
      this.show2=true;
      this.show3=true;
      this.show4=true;
      this.show5=true;
          this.fclick6=false;
          return ;
        }
        if(this.fclick6==false)
        {
          this.show0=false;
          this.show1=false;
          this.show2=false;
          this.show3=false;
          this.show4=false;
          this.show5=false;
          this.fclick6=true;
          return;
        }
    },
    click1()
    {
        if(this.fclick0==true)
        {
          this.show0=true;
          this.fclick0=false;
          return ;
        }
        if(this.fclick0==false)
        {
          this.show0=false;
          this.fclick0=true;
          return;
        }
    },

    click2()
    {
       if(this.fclick1==true)
        {
          this.show1=true;
          this.fclick1=false;
          return ;
        }
        if(this.fclick1==false)
        {
          this.show1=false;
          this.fclick1=true;
          return;
        }
    },

    click3()
    {
       if(this.fclick2==true)
        {
          this.show2=true;
          this.fclick2=false;
          return ;
        }
        if(this.fclick2==false)
        {
          this.show2=false;
          this.fclick2=true;
          return;
        }
    }
    ,
    click4()
    {
       if(this.fclick3==true)
        {
          this.show3=true;
          this.fclick3=false;
          return ;
        }
        if(this.fclick3==false)
        {
          this.show3=false;
          this.fclick3=true;
          return;
        }
    },

    click5()
    {
        if(this.fclick4==true)
        {
          this.show4=true;
          this.fclick4=false;
          return ;
        }
        if(this.fclick4==false)
        {
          this.show4=false;
          this.fclick4=true;
          return;
        }
    },

    click6()
    {
        if(this.fclick5==true)
        {
          this.show5=true;
          this.fclick5=false;
          return ;
        }
        if(this.fclick5==false)
        {
          this.show5=false;
          this.fclick5=true;
          return;
        }
    },

  },
  /* selectas(e){
    let checked=e.target.checked;
      let checkDom=this.$refs.table.getElementByClassName("selBtn");
      let idArray=[];
      if(checked){
        for(var i=0;i<checkDom.length;i++)
        {
          checkDom[i].checked=false;
        }
      }else{
         for(var i=0;i<checkDom.length;i++)
        {
          checkDom[i].checked=true;
        }
      }
      alert("运行了");
  } */
};
  /*  $(function() {

                //已被选择的选项变成红色
                $(".tag_1 .check input:checked").next("span").css("color", "red");
                $(".tag_1").each(function() {
                    $tagEachCheckedInputSize = $(this).find("input:checked").size();
                    if ($tagEachCheckedInputSize==0) {
                        $(this).find("input:first").attr("checked", true).next("span").css("color", "red");
                    }
                })

                //点击选项为true的时候, 颜色变红, "不限"选项取消并变成黑色. 当所有的选项为取消的时候, "不限"被选择并变成红色,其他选项取消
                $(".tag_1 .check input").live("click", function() {
                    $firstInput = $(this).parents(".tag_1").find("input:first");
                    if ($(this).attr("checked")) {
                        if ($(this).val()!=0) {
                            $firstInput.attr("checked", false).next("span").css("color", "black");
                        } else {
                            $(this).parents(".tag_1").find("input:gt(0)").attr("checked", false).next("span").css("color", "black");
                        }
                        $(this).next("span").css("color", "red");
                    } else {
                        var $siblingsCheckedInputNum = $(this).parents(".tag_1").find("input:checked").size();
                        $(this).next("span").css("color", "black");
                        if ($siblingsCheckedInputNum==0) {
                            $firstInput.attr("checked", true).next("span").css("color", "red");
                        }
                    }
                })
                $(".tag_1 .check_radio input:checked").next("span").css("color", "red");
                $(".tag_1 .check_radio input").live("click", function() {
                    $('.check_radio').find("input").next("span").css('color', 'black');
                    $(this).next("span").css("color", "red");
                })
            }) */
</script>
<style>
/* .el-col{
  float: right;
  
} */

.zy_kjcg_top {
    width: 1200px;
    margin: 0 auto;
}

.zy_kjcg_top table {
    border: solid 1px #ccc;
    width: 1198px;
    border-collapse: collapse;
    background: #fafafa;

    white-space: normal;
    line-height: normal;
    font-weight: normal;
    font-size: medium;
    font-style: normal;
    color: -internal-quirk-inherit;
    text-align: start;
}
.cg_td01 {
    color: #333;
    width: 160px;
    text-align: center;
    padding: 0px;
}
.zy_kjcg_top table td {
    border: dashed 1px #ccc;
    line-height: 30px;
    font-size: 14px;
    font-family: "微软雅黑";
    color: #666;
    padding: 20px 40px;
}
.cg_td02 a {
    display: block;
    float: left;
    margin-right: 50px;
    color: #666;
}






































.title {
  font-size: 14px;
  font-style: normal;
  width: 160px;
  
}
.td101 {
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
.title{
 
}
.zuo{
  width: 300px;
  float: left;
}
.you{
  width: 600px;
 margin-top: 20px;
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
  width: 1200px;
 height: 200px;

 

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

  float: center;

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
.qwe{
  float: left;
  width: 900px;
  height: 180px;
  border: 1px solid black;
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
  float:right;



}
.thisMiddle{}
.xuqiuyilan .ziti2 {
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

  width: 560px;
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

  width: 1350px;
}
.table1 {
  background-attachment: scroll;

  background-clip: border-box;

  background-color: rgb(255, 255, 255);

  background-image: none;

  background-origin: padding-box;

  background-position-x: 0%;

  background-position-y: 0%;

  background-repeat: repeat;

  background-size: auto;

  
  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  text-decoration: none;

  width: 300px;
}

</style>
