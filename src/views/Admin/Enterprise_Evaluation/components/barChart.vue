<template>
   <div id="charts1" style="height:100%; width:800px; float:left"></div>
</template>

<script>
export default{
    props: {
    barData:{
      type:Object
    }
  },
    data() {
    return {};
  },
 methods: {
//柱形图标
    getCharts1() {
      var that =this;
      var myChart = echarts.init(document.getElementById("charts1"));
      var option = {
    legend: {
      //data: ['发布数量', '完成数量']
       textStyle: {
            fontSize: 16
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
          name:'发布数量',
          type: 'bar',
          
          data:this.barData.taskCount
         },
         
        {
          name:'完成数量',
          type: 'bar',
         
         data:this.barData.finishTaskCount
        },
        
    ]
};

      myChart.setOption(option);
    },
 }
};
    </script>