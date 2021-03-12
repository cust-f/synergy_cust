<template>
  <div class="patent-list">
    <!-- 专利列表 -->
    <el-row
      v-for="(item, index) in patentList"
      :key="index"
      class="patent-info"
    >
      <div @click="patentDetail(item.wfId)">
        <el-row>
          <div style="float: left">
            <h2 style="float: left">{{ item.title1 }}</h2>
            <p
              style="
                line-height: 36px;
                font-size: 18px;
                color: #ff7720;
                float: left;
              "
            >
              【
              <span>{{ changeString(item.patenttypeName) }}</span
              >】
            </p>
          </div>
          <div style="float: right">
            <p>
              资源来源：
              <span>{{ item.resourceFrom }}</span>
              <el-avatar
                shape="square"
                :size="20"
                fit="fill"
                :src="item.resourceLogo"
              ></el-avatar>
            </p>
          </div>
        </el-row>
        <el-row>
          <el-col :span="9">
            <!-- <el-popover
              :content="changeString(item.author)"
              placement="top-start"
              trigger="hover"
            > -->
              <!-- <p slot="reference">
                发明人:
                <span>{{ changeString(item.author) }}</span>
              </p> -->
              <p>
                发明人:
                <span>{{ changeString(item.author) }}</span>
              </p>
            <!-- </el-popover> -->
          </el-col>
          <el-col :span="9">
            <!-- <el-popover
              :content="changeString(item.requestPeople)"
              placement="top-start"
              trigger="hover"
            > -->
              <p>
                申请人:
                <span>{{ changeString(item.requestPeople) }}</span>
              </p>
            <!-- </el-popover> -->
          </el-col>
          <el-col :span="6">
            <span
              >公开日期:
              {{ item.publicationDate | dataFormat("yyyy-MM-dd") }}</span
            >
          </el-col>
        </el-row>
        <!--  -->
        <el-row>
          <el-col :span="18">
            <!-- <el-popover
              :content="changeString(item.keyword)"
              placement="top-start"
              trigger="hover"
            > -->
              <p>
                关键词:
                <span>{{ changeString(item.keyword) }}</span>
              </p>
            <!-- </el-popover> -->
          </el-col>
          <el-col :span="6">
            <span>公开号: {{ item.publicationNo }}</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <img
          style="width: 30px; height: 30px;float:left;"
          src="../../../../assets/img/copyright_logo.png"
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
      <!-- <el-divider></el-divider> -->
    </el-row>
    <!-- 企业列表 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    patentList: {
      default: [],
      type: Array,
    },
  },
  methods: {
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
    // 转跳详情界面
    patentDetail(id) {
      this.$router.push({
        path: "/patentDetail",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style >
.patent-list {
  width: 100%;
}
.patent-info {
  padding: 20px;
  border-bottom: 1px solid #f3f3f3;
  -webkit-transition: -webkit-box-shadow 0.3s;
  transition: -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}
.patent-info:hover {
  position: relative;
  z-index: 1;
  -webkit-box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
}
.patent-info:hover h2 {
  color: #0084ff;
}
.patent-info .el-row {
  margin-bottom: 10px;
}
.patent-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>