<template>
  <div>
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
      </div>
    </el-col>

    <div class="np_top">
      <div class="preview">
        <div class="BigTime">
          <el-carousel :interval="3000" arrow="always">
            <el-carousel-item v-for="item in imagesbox" :key="item">
              <img :src="item.idView" class="image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="Right">
        <font style="color:#ff7720;font-size:20px;">[229857]</font>
        车辆装配制做
        <br>
        <ul class="ul02">
            <li>
                <a>
                    价格：
                    <font style="color:#ff7720;font-size:18px">面议</font>
                </a>
            </li>
            <li>
                <a>
                    限制类别：
                    <font style="color:#ff7720;font-size:18px">公司人数</font>
                </a>
            </li>
            <li>
                <a>
                    任务类别：
                    <font style="color:#ff7720;font-size:18px">汽车装配制造</font>
                </a>
            </li>
            <li>
                <a>
                    注册资本：
                    <font style="color:#ff7720;font-size:18px">2.5亿元</font>
                </a>
            </li>
            <li>
                <a>
                    其他：
                    <font style="color:#ff7720;font-size:18px">无</font>
                </a>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesbox: [
        { id: 0, idView: require("../company/1.png") },
        { id: 1, idView: require("../company/2.jpg") },
        { id: 2, idView: require("../company/3.jpg") }
      ]
    };
  }
};
</script>
<style>
.title {
  font-size: 14px;
  font-style: normal;
  width: 160px;
}
.np_top {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  border-bottom-color: rgb(225, 225, 225);

  border-bottom-style: solid;

  border-bottom-width: 1px;

  border-left-color: rgb(225, 225, 225);

  border-left-style: solid;

  border-left-width: 1px;

  border-right-color: rgb(225, 225, 225);

  border-right-style: solid;

  border-right-width: 1px;

  border-top-color: rgb(225, 225, 225);

  border-top-style: solid;

  border-top-width: 1px;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 125.6px;

  margin-right: 125.61px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 10px;

  padding-left: 10px;

  padding-right: 10px;

  padding-top: 10px;

  text-decoration: none;

  width: 1180px;
}
.BigTime {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: left;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  height: 200px;

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

  position: relative;

  text-decoration: none;

  width: 300px;
}
.Right {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: left;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 40px;

  margin-right: 0px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  width: 820px;
}
</style>