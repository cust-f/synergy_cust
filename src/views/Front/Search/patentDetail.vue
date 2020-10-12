<template>
  <div style="width: 1200px; margin: 0 auto" class="company-detail-info">
    <!--第一行 -->
    <el-row>
      <el-col :span="20">
        <div style="margin-top: 15px">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item @click="goBack()">专利搜索</el-breadcrumb-item>
            <el-breadcrumb-item>专利详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <br />
    <el-card shadow="never" class="company-detail-info-show">
      <div slot="header">
        <div
          style="
            margin: -18px -20px;
            padding: 10px 20px;
            background: #dcdfe6;
            border-bottom: 1px solid #606266;
          "
        >
          专利详情
        </div>
      </div>
      <el-row>
        <h3 style="float: left">{{ detail.title1 }}</h3>
        <p
          style="
            line-height: 36px;
            font-size: 18px;
            color: #ff7720;
            float: left;
          "
        >
          【
          <span>{{ changeString(detail.patenttypeName) }}</span
          >】
        </p>
           <div style="float: right">
            <p>
              资源来源：
              <span>{{ detail.resourceFrom }}</span>
              <el-avatar
                shape="square"
                :size="20"
                fit="fill"
                :src="detail.resourceLogo"
              ></el-avatar>
            </p>
          </div>
      </el-row>
      <el-divider></el-divider>
      <!-- 信息展示 -->
      <el-row>
        <el-col :span="9">
          <el-popover
            :content="changeString(detail.author)"
            placement="top-start"
            trigger="hover"
          >
            <p slot="reference">
              发明人:
              <span>{{ changeString(detail.author) }}</span>
            </p>
          </el-popover>
        </el-col>
        <el-col :span="9">
          <el-popover
            :content="changeString(detail.requestPeople)"
            placement="top-start"
            trigger="hover"
          >
            <p slot="reference">
              申请人:
              <span>{{ changeString(detail.requestPeople) }}</span>
            </p>
          </el-popover>
        </el-col>
        <el-col :span="6">
          <span
            >公开日期:
            {{ detail.publicationDate | dataFormat("yyyy-MM-dd") }}</span
          >
        </el-col>
      </el-row>
      <!--  -->
      <el-row>
        <el-col :span="9">
          <el-popover
            :content="changeString(detail.agent)"
            placement="top-start"
            trigger="hover"
          >
            <p slot="reference">
              专利代理人:
              <span>{{ changeString(detail.agent) }}</span>
            </p>
          </el-popover>
        </el-col>
        <el-col :span="9">
          <p>
            专利代理机构:
            <span>{{ changeString(detail.orgAgency) }}</span>
          </p>
        </el-col>
        <el-col :span="6">
          <span>公开号: {{ detail.publicationNo }}</span>
        </el-col>
      </el-row>
      <!--  -->
      <el-row>
        <el-col :span="18">
          <el-popover
            :content="changeString(detail.keyword)"
            placement="top-start"
            trigger="hover"
          >
            <p slot="reference">
              关键词:
              <span>{{ changeString(detail.keyword) }}</span>
            </p>
          </el-popover>
        </el-col>
      </el-row>
      <div>
        <el-tabs type="card">
          <el-tab-pane label="主权项">
            <div>
              <div v-html="detail.indCla"></div>
              <br />
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="摘要">
            <div>
              <div v-html="detail.abstract"></div>
              <br />
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- <el-divider></el-divider> -->
      <el-row>
        <img
          style="width: 30px; height: 30px; float: left"
          src="../../../assets/img/copyright_logo.png"
        />

        <p
          style="
            font-size: 16px;
            color: #7d7974;
            float: left;
            line-height: 30px;
            margin-left: 10px;
          "
        >
          版权所有：西南交通大学、国家重点研发计划项目支持
        </p>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "patentDetail",
  data() {
    return {
      ids: this.$route.query.id,
      detail: "",
      //   机构详情
      orgClass: "",
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      var that = this;
      var data = {
        ids: this.ids,
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      that
        .axios({
          config,
          method: "post",
          data: data,
          url: "/city/bizdesign/synergicResourceDetail",
        })
        .then((response) => {
          this.detail = response.data.data.patantDetailData[0];
          this.orgClass = response.data.orgClass;
        });
    },
    changeJson(data) {
      return JSON.parse(data);
    },
    changeString(data) {
      if (data) {
        let result = new String();
        let newData = JSON.parse(data);
        for (let i = 0; i < newData.length; i++) {
          result += newData[i];
          if (i != newData.length - 1) result += ",";
        }
        return result;
      } else return;
    },
    goBack: function () {
      window.history.go(-1);
    },
  },
};
</script>

<style>
.company-detail-info .company-detail-info-show {
  margin-bottom: 20px;
}
.company-detail-info-show .el-row {
  margin-bottom: 15px;
}
.company-detail-info-show p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>