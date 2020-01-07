<template>
    <div>
      <div id="main" 
       ref="chart" style="width:600px;height:400px;margin-right:25%；margin-top:25%"></div>
       <div id="main2" style="width: 600px;height:400px;"></div>
       <div id="main3" style="width: 600px;height:400px;"></div>
    </div>
    
</template>


<script>
export default {
    name:"charts",
    data(){
      return{
      }
    },
  mounted() {
    this.getCharts();
    this.getCharts2();
    this.getCharts3();
  },
  methods: {
    getCharts() {
      // 基于准备好的dom，初始化echarts实例

           // 基于准备好的dom，初始化echarts实例
           var myChart = echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: "世界人口总量",
          subtext: "数据来自网络"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["2011年", "2012年"]
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
          data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"]
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: "2012年",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
    },



    getCharts2(){
      // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main2'));

    // 指定图表的配置项和数据
    var option = {
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '销售（sales）', max: 6500},
            { name: '管理（Administration）', max: 16000},
            { name: '信息技术（Information Techology）', max: 30000},
            { name: '客服（Customer Support）', max: 38000},
            { name: '研发（Development）', max: 52000},
            // { name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            // {
            //     value: [4300, 10000, 28000, 35000, 50000, 19000],
            //     name: '预算分配（Allocated Budget）'
            // },
            {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
            }
        ]
    }]
};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    },



    getCharts3(){

             var myChart = echarts.init(document.getElementById('main3'));

        // 指定图表的配置项和数据

        myChart.setOption({
    series : [
        {
            name: '分季度完成量',
            type: 'pie',
            radius: '55%',
            data:[
                {value:100, name:'第一季度'},
                {value:274, name:'第二季度'},
                {value:310, name:'第三季度'},
                {value:335, name:'第四季度'}
                
            ]
        }
    ]
})
    }


    
  }
};
</script>
