<template>
  <div id="charts1" style="height:380px; width:450px; float:left"></div>
</template>


<script>
export default {
  props: {
    radarData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    //雷达图
    getCharts1() {
      var that = this;
      var myChart = echarts.init(document.getElementById("charts1"));

      var option = {
        tooltip: {},
        legend: {
          orient: "vertical",
          x: "left",
          y: "top",
          data: ["完成统计"]
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator:this.radarData.indicatorData,
          //  [
          //   { name: "任务时长", max: 60 },
          //   { name: "计划时长", max: 60 },
          //   { name: "申请时长", max: 20 },
          //   { name: "验收时长", max: 20 }
          // ]
        },
        series: [
          {
            type: "radar",
            textStyle: {
              fontSize: 16
            },
            data: [
              {
                name: "数据统计(单位：天)",
                value: this.radarData.radarData
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>