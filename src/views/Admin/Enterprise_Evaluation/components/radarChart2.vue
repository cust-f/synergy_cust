<template>
   <div id="radarcharts2" style="height:380px; width:800px; float:center"></div>
</template>


<script>
export default{
    props: {
    radarData2:{
      type:Object
    }
  },
    data() {
    return {};
  },
 methods: {
//雷达图
    getradarCharts2() {
      var that = this;
      var myChart = echarts.init(document.getElementById("radarcharts2"));
      
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
              padding: [3, 5],
              fontSize: 16
            }
          },
          indicator:this.radarData2.indicatorData2
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
            fontSize: 16,
            },
            data: [
              {
                name: "数据统计",
                value:this.radarData2.radarData2,
              //  label: {
              //           show: true,                       
              //           }
               
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