<template>
   <div id="charts1S" style="height: 320px; width:800px; float:left"></div>
</template>

<script>
export default{
    props: {
    barDataS:{
      type:Object
    }
  },
    data() {
    return {};
  },
 methods: {
//柱形图标
    getCharts1S() {
      var that =this;
      var myChart = echarts.init(document.getElementById("charts1S"));
      var option = {
    legend: {
      //data: ['发布数量', '完成数量']
       textStyle: {
            fontSize: 16,
            
        }
    },
    tooltip: {},
    
    xAxis: {
      type: 'category',
      textStyle: {
            fontSize: 16
        },
      data:[
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
      ]
      },
    yAxis: {},
    // Declare several bar series, each will be mapped to a column of dataset.source by default.
    series: [
      
        {
          name:'承接数量',
          type: 'bar',
          
          data:this.barDataS.taskCountS
         },
        {
          name:'完成数量',
          type: 'bar',
         
         data:this.barDataS.finishTaskCountS
        },
        
    ]
};

      myChart.setOption(option);
    },
 }
};
    </script>