<template>
                <div id="SupplierTop5" style="width: 100%;height:350%;"></div>
</template>

<script>
export default {
    data(){return{

    }},
    props:{
        cloumnData2:{
            type:Object
        }
    },
    methods:{
      getCharts2() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("SupplierTop5"));
      //console.log(this.cloumnData2.vintage2)
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
          data: this.cloumnData2.Vintage2
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
          data: this.cloumnData2.topSupplierName2
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
            name: this.cloumnData2.Vintage2[0],
            type: "bar",
            data: this.cloumnData2.lastTaskNumber2
            // [1245, 1523, 1587, 1689, 2567]
          },
          {
            name: this.cloumnData2.Vintage2[1],
            type: "bar",
            data: this.cloumnData2.nowTaskNumber2
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