<template>
  <div class="gobla">
      <div>
    <el-row :gutter="70">
      <el-col :span="60" push="2">
        <div>
          <div>
            <div class="title1" width="160px">
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
                  <td class="td101">行业分类：</td>
                  <td class="td102">
                    <span class="cg_td_a1" width="100%">不限</span>
                    <span class="cg_td_a2" width="100%">交通运输设备</span>
                    <span class="cg_td_a2" width="100%">仪器仪表及文化、办公用机械</span>
                    <span class="cg_td_a2" width="100%">通信设备、计算机及其他电子设备</span>
                    <span class="cg_td_a2" width="100%">电器机械及器械</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </div>
        <el-input placeholder="请输入内容" v-model="input3" class="sogo">
        <el-button slot="append" icon="el-icon-search"></el-button>
        
      </el-input>
      <br>
      </el-col>
      
      <br>
    </el-row></div><br>
    <el-row :gutter="20">
      <el-col :span="20" push="2" pull="2">
        <el-col :span="18">
          <div class="cardgroup">
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="20" push="6">
              <div class="page">
                <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>热门企业</span>
              </div>

              <div class="hotCompany">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="hotCompanyimage"
                />
                <div class="hotCompanyDesign" @click="achieve">哈尔滨科大志远科技有限公司</div>
              </div>

              <div class="hotCompany">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="hotCompanyimage"
                />
                <div class="hotCompanyDesign" @click="achieve">哈尔滨科大志远科技有限公司</div>
              </div>

              <div class="hotCompany">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="hotCompanyimage"
                />
                <div class="hotCompanyDesign" @click="achieve">哈尔滨科大志远科技有限公司</div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "excellentCompany"
};
</script>
<style>
.sogo{
    width: 60%;
}
.page {
  float: left;
  position: relative;
  top: 50px;
}
.gobla {
  padding: 0 15px;
  height: 600px;
}

.image {
  width: 80%;
  /* height: 110px; */
}
.hotCompany {
}
.hotCompanyimage {
  width: 20%;
  /* height: 110px; */
}

.inline {
  width: 50%;
  float: left;
}
.designbutten {
  position: relative;
  top: 30px;
  float: left;
}
.design {
  position: relative;
  top: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
}
.title {
  position: relative;
  top: 20px;
  float: top, left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 17px;
  color: dodgerblue;
}
.hotCompanyDesign {
  width: 60%;
  top: 5px;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  float: right;
}
.title1 {
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
</style>
