
<template>
  <div class="BG">
    <!--第一行-->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="grid-content0">
          <span>首页</span>
          <span>&nbsp;>&nbsp;</span>
          <span>服务成果</span>
          <span>&nbsp;>&nbsp;</span>
          <span>成果详情</span>
        </div>
      </el-col>
    </el-row>
    <!--第二行-->
    <el-row :gutter="gutterCount">
      <el-col :span="10" :push="pushCount" :pull="pullCount">
        <div class="grid-content2 bg-purple-dark">
          <h2 style="margin:20px 0;">设计B30EV-试冲板料</h2>
          <el-divider></el-divider>
          <div class="grid-content3" style="margin-top:50px">
            <p style=" width :50%; float:left">行业类别：交通运输设备</p>
            <p style=" width :50%;float:left">所在地区：吉林省长春市</p>

            <p>&nbsp;</p>
            <p style=" width :50%; float:left">联系方式：4006917888</p>
            <p style=" width :50%; float:left">需求类型：设计</p>
            <p>&nbsp;</p>
            <p style=" width :50%; float:left">需求发布时间：2019-10-22</p>
            <p style=" width :50%; float:left">需求完成时间：2019-11-21</p>
            <p>&nbsp;</p>
            <div style="margin:20px 0;">
              <el-button type="warning">下载成果</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="5" :push="5">
        <div class="grid-content4 bg-purple-dark" style="margin-top:0px">
          <h3 style="margin:30px 0;">发布方信息</h3>
          <el-divider></el-divider>
          <div style="margin:30px 90px;">
            <el-image style="width: 100px; height: 100px" :src="SRC" />
          </div>
          <ul>
            <li>发布方名称：一汽集团有限公司</li>
            <li>&nbsp;</li>
            <li>发布方介绍：是中国汽车行业中最具实力的汽车公司之一。业务领域包括汽车的研发、生产、销售、物流、服务、汽车零部件、金融服务、汽车保险、移动出行等</li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <!--第三行-->
    <el-row :gutter="gutterCount">
      <el-col :span="16" :push="pushCount" :pull="pullCount">
        <div class="grid-content5 bg-purple-dark">
          <h3
            style="margin-top:-80px;margin-left:5px; padding: 0 10px; border-left: 3px solid #ff5500;"
          >需求介绍</h3>
          <el-divider></el-divider>
          <p
            style="line-height:40px"
          >&nbsp;&nbsp;&nbsp;&nbsp;截至2018年9月底，全国机动车保有量达3.22亿辆，其中汽车保有量达2.35亿辆，占机动车总量的72.91%。其中，以个人名义登记的小微型载客汽车（私家车）保有量达1.84亿辆，占汽车总量的78.49%。2018年以来，全国私家车保有量月均增加161万辆，保持持续快速增长。这些都是广大的流量载体，实行一贴双码，免费发放给车主挪车贴即获得广告位，庞大的广告位即可招商打广告，广告主和广告商诞生。三方进行相互促进，产生循环的可只持续发展圈子，各取所需。</p>
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
      SRC:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578498716057&di=2862e7c5e9dc83020a4698017c207fd8&imgtype=0&src=http%3A%2F%2Fstatic.yjcf360.com%2Fgegu%2Fimg%2F000800.jpg",
      //设定el-cow的值
      gutterCount: 15,
      pushCount: 4,
      pullCount: 2
    };
  },
  methods: {
    open() {
      this.$confirm("是否申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "申请成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消申请"
          });
        });
    }
  }
};
</script>



<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->



<style scoped>
/**中间的div块   给gutter留padding*/
.BG {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 20px;
}

/**第一行用css样式*/
.grid-content0 {
  border-radius: 4px;
  height: 36px;
  margin-top: 30px;
  font-size: 14px;
  font-style: normal;
}
.grid-content1 {
  border-radius: 4px;
  height: 100px;
}
.grid-content2 {
  font-size: 24px;
  height: 350px;
}
.grid-content3 {
  font-size: 17px;
}
.grid-content4 {
  font-size: 17px;
  height: 500px;
  margin: 20px 0;
}
.grid-content5 {
  font-size: 17px;
  margin: 0 0;
  height: 500px;
}

.fontStyle {
  font-size: 15px;
}

ul li {
  list-style-type: none;
}

/**布局测试用css*/
.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #ffffff44;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>