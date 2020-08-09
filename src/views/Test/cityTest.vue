<template>
  <div>
    <el-button @click="getData()">点击测试</el-button>
    <el-divider></el-divider>
    <el-input type="textarea" placeholder="请输入内容" v-model="info" ></el-input>
    <el-divider></el-divider>
    <ul>
        <li v-for="(item,index) in keyword" :key="index" style="float:left;margin-right:15px;">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "test",
  data() {
    return {
      info: "",
      test:{
        ids: "ZLW20200603000000932507"
      },
      keyword:[]
    };
  },
  methods: {
    getData() {
      //   let params = {
      //     ids: "ZLW20200603000000932507"
      //   };
        var data = Qs.parse(
            this.test
        );
    //   var data = {
    //     "ids": "ZLW20200603000000932507"
    //   };
    // var data= JSON.stringify(this.test)
      var that = this;
      console.log("传参:" + data);
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      that
        .axios({
          method: "post",
          url: "/city/bizdesign/synergicResourceDetail",
          data: data,
          config
        })
        .then(response => {
          console.log(response);
          this.info = JSON.stringify(response.data.data);
          this.keyword= JSON.parse(response.data.data.patantDetailData[0].keyword)
          console.log(this.keyword)
        });
    }
  }
};
</script>