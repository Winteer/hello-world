<template>
<div>
  <div id="myCharts" style="width:500px; height:500px"></div>

</div>

</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'eCharts',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        var myCharts = echarts.init(document.getElementById('myCharts'));
        let options = {
          title: {
            text: '未来一周气温变化',   //图表顶部的标题
            subtext: '纯属虚构'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
            trigger: 'axis'
          },
          legend: {
            data:['最高气温','最低气温']
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
          }],
          yAxis : [{   //y轴坐标数据
            type : 'value',
            axisLabel : {
              formatter: '{value} °C'
            }
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"最高气温",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[11, 11, 15, 13, 12, 13, 10],
            },
            {
              name:"最低气温",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[1, -2, 2, 5, 3, 2, 0],
            }
          ]}

         myCharts.setOption(options);
      }
    }
  }
</script>

<style scoped>

</style>
