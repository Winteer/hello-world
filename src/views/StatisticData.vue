
<template>
  <div id="sumView" style="width:600px;height:400px;"></div>

</template>

<script>
    import echarts from 'echarts'
    //统计报表
    export default {
        name: "StatisticData",
        data(){
            return{
                charts:'',
                opinionData:[],
                weekData:[]
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
                        data:['近七日收益','近一周收益']
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
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:{
                        type:'category',
                        boundaryGap:false,
                        data:["1","2","3","4","5"]
                    },
                    yAxis:{
                        type:'value'
                    },
                    series:[{
                        name:'近七日收益',
                        type:'line',
                        stack:'总量',
                        data:this.opinionData
                    },{
                        name:'近一周收益',
                        type:'line',
                        stack:'总量',
                        data:this.weekData
                    }]
                })
            }
        },
        //调用
        mounted(){
            this.$nextTick(function () {
                this.drawLine('sumView')
            })
        },
    }
</script>

<style scoped>

</style>
