<template>
        <div id="quarterlySituation" style="width: 100%;height:500%;"></div>
</template>

<script>
export default {
    props:{
        pieData:{
            type:Object
        }
    },
    methods:{
      getCharts() {
      var charts = [];
      var myChart = echarts.init(document.getElementById("quarterlySituation")); // 指定图表的配置项和数据
      var option = {
        title: {
          text: `${this.pieData.nowYear}年 季度完成量`,
          subtext: " ",
          left: "center",
          y:20,
          
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 0,
          top:45,
          data: 
          // ["第一季度","第二季度","第三季度","第四季度"]
           this.pieData.searsonCount
        },
        series: [
          {
            name: "分季完成量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "25",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.pieData.seasonsFinishTaskCount
            // [
            //   { value: 335, name: "第一季度" },
            //   { value: 310, name: "第二季度" },
            //   { value: 235, name: "第三季度" },
            //   { value: 220, name: "第四季度" }
            //   // {value: 1548, name: '搜索引擎'}
            // ]
          }
        ]
      };
      myChart.setOption(option);
      charts.push(myChart);
    },
    }
}
</script>