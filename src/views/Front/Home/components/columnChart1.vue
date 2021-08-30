<template>
                <div id="fulfillDemandTop5" style="width: 100%;height:350%;"></div>
</template>

<script>
export default {
    data(){return{

    }},
    props:{
        cloumnData1:{
            type:Object
        }
    },
    methods:{
                getCharts() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("fulfillDemandTop5"));
     // console.log(this.cloumnData.Vintage)
      var option = {
        title: {
          text: "",
          subtext: "数据来自大数据统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: this.cloumnData1.Vintage1
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
          data: this.cloumnData1.topCompanyName1,
          inverse:true
        //   [
        //     "上海小糸车灯有限公司 ",
        //     "上海胜德塑料厂 ",
        //     "上海奥力得特种工具厂",
        //     "合肥皖仪科技有限公司",
        //     "北京京伟电器有限公司 "
        //   ]
        },
        series: [
          {
            name: this.cloumnData1.Vintage1[0],
            type: "bar",
            data: this.cloumnData1.lastTaskNumber1
            // [1245, 1523, 1587, 1689, 2567]
          },
          {
            name: this.cloumnData1.Vintage1[1],
            type: "bar",
            data: this.cloumnData1.nowTaskNumber1
            // [1389, 1530, 1750, 1890, 2899]
          }
        ]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
      charts.push(myChart);
    }
    }
}
</script>
