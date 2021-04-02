<template>
   <div id="charts2" style="height:100%; width:400px; float:left"></div>
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
          x: "left",
          y: "top",
          data: ["数据统计(单位：天)"]
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
          indicator:this.radarData1.indicator,
          //  [
          //   { name: "任务响应时效", max: 60 },
          //   { name: "技术方案匹配度", max: 60 },
          //   { name: "过程管理效能", max: 20},
          //   { name: "协同交互效能", max: 20 }
          // ]
        },
        series: [
          {
            //name:'完成统计',
            type: "radar",
             data: [
              {
                name: "数据统计(单位：天)",
                value:this.radarData1.radarData,
     
              },
             
            ]
          }
        ]
      };
      myChart.setOption(option,true);
    },
 
  }
};
</script>