<template>
  <div
    id="radarcharts1"
    style="height:380px; width:540px; float:left"
  ></div>
</template>


<script>
export default {
  props: {
    radarData1: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    //雷达图
    getradarCharts1() {
      var that = this;
      var myChart = echarts.init(document.getElementById("radarcharts1"));

      var option = {
        tooltip: {},
        legend: {
          orient: "vertical",
          x: "right",
          y: "top",
          textStyle: {
            fontSize: 15,
          },
          data: ["数据统计"],
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
              fontSize: 14,
            },
          },
          indicator: this.radarData1.indicatorData1,
          // [
          //   { name: "协同交互效能", max: 150 },
          //   { name: "技术方案匹配度", max: 50 },
          //   { name: "变更控制效能", max: 50 },
          //   { name: "过程管理效能", max: 50 },
          //   { name: "任务响应时效", max: 50 },

          // ]
        },
        series: [
          {
            type: "radar",
            textStyle: {
              fontSize: 15,
            },
            data: [
              {
                name: "数据统计(单位：天)",
                value: this.radarData1.radarData1,
                //  label: {
                //           show: true,
                //           }
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>