<template>
   <div id="charts1" style="height:100%; width:400px; float:left"></div>
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
    getCharts1() {
      var that = this;
      var myChart = echarts.init(document.getElementById("charts1"));
      
      var option = {
        tooltip: {},
        legend: {
         orient: 'vertical',
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
          indicator: [
                { name: "申请时长", max: 100 },
                { name: "计划时长", max: 100 },  
                { name: "审核时长", max: 100 }, 
                { name: "验收时长", max: 100 },
                { name: "任务时长", max: 100 },
            
          
           
          ]
        },
        series: [
          {
            //name:'完成统计',
            type: "radar",
             data: [
              {
                name: "完成统计",
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