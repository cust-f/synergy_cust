<template>
   <div id="charts2" style="height:380px; width:800px; float:center"></div>
</template>


<script>
export default{
    props: {
    radarData:{
      type:Object
    }
  },
    data() {
    return {};
  },
 methods: {
//雷达图
    getCharts2() {
      var that = this;
      var myChart = echarts.init(document.getElementById("charts2"));
      
      var option = {
        tooltip: {},
        legend: {
          orient: 'vertical',
          x: "right",
          y: "top",
          textStyle: {
            fontSize: 16
        },
          data: ["数据统计"]
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
          indicator: [
            { name: "任务时长", max: 150 },
            { name: "计划时长", max: 50 },
            { name: "审核时长", max: 50 },
            { name: "验收时长", max: 50 },
            { name: "申请时长", max: 50 },
            
          ]
        },
        series: [
          {
            type: "radar",
            textStyle: {
            fontSize: 16,
            },
            data: [
              {
                name: "数据统计(单位：天)",
                value:this.radarData.radarData,
               
              },
             
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
 
  }
};
</script>