<template>
  <div>
    <div id="main" style="width:900px;height:400px;"></div>
    <div id="month" style="width:600px;height:400px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "enhanceEcharts",
        data(){
            return{
                charts:''
            }
        },
        methods:{
            drawLine(id){
                this.charts=echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip:{
                        trigger: 'axis'
                    },
                    legend:{
                    },
                    grid:{
                        left:'3%',
                        right:'4%',
                        bottom:'3%',
                        containLabel:true
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            magicType: {type: ['bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataset: {
                        // dimensions: ['product', '大宋奇案', '玉观音', '鬼娃学校'],
                        source: [
                            ['product', '大宋奇案', '玉观音', '鬼娃学校'],
                            [ '9-13',  '43.3',  '85.8',  '93.7'],
                            ['9-14', '83.1',  '73.4', '55.1'],
                            ['9-15',  '86.4', '65.2', '82.5']
                        ]
                    },
                    xAxis:{
                        type:'category'
                    },
                    yAxis:{
                        type:'value'
                    },
                    series:[{
                        type:'line'
                    },{
                        type:'line'
                    },{
                        type:'line'
                    }]
                })
            }
        },
        //调用
        mounted(){
            this.$nextTick(function () {
                this.drawLine('main')
                this.drawLine('month')
            })
        }
    }
</script>

<style scoped>
*{
  margin:0;
  padding: 0;
  list-style: none;
}
</style>
