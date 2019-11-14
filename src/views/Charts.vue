<template>
  <div>
    <vue-canvas-nest :config="{color:'0,0,0', count: 137}" ></vue-canvas-nest>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header style="text-align: left; font-size: 12px">
        <esc-menu></esc-menu>
      </el-header>
    </el-container>
    <el-main style="text-align: center">
      <div class="block" style="text-align: left">
        <el-select v-model="dateRange" placeholder="请选择" @change="getStatisticByRange(dateRange)">
          <el-option label="近七天" value="-6"></el-option>
          <el-option label="近十五天" value="-14"></el-option>
          <el-option label="近六个月" value="-5"></el-option>
          <el-option label="近一年" value="-11"></el-option>
        </el-select>
      </div>
      <!--    <div id="myCharts" style="width:800px; height:500px"></div>-->
      <div>
        <div id="roomCharts" style="width:600px;height:400px;float: left"></div>
        <div id="sumCharts" style="width:600px;height:400px;float: right"></div>
      </div>
    </el-main>


  </div>

</template>

<script>
    import echarts from 'echarts'
    import EscapeMenu from '../components/EscapeMenu';
    import vueCanvasNest from 'vue-canvas-nest'
    export default {
        name: 'Charts',
        components: {
            'esc-menu': EscapeMenu,
            'vue-canvas-nest':vueCanvasNest
        },
        data() {
            return {
                dateRange: '-6',//时间范围
                legendData: ['大宋奇案', '玉观音', '鬼娃学校', '总数'],//数据label
                xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], //X轴数据，默认一周
                // seriesData:[
                //       {
                //         name:'大宋奇案',
                //         type:'bar',
                //         data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 235.6]
                //       }
                // ],
                sumData: [{
                    name: '总数',
                    type: 'line',
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
                }],
                seriesData: [
                    {
                        name: '大宋奇案',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 235.6]
                    },
                    {
                        name: '玉观音',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
                    },
                    {
                        name: '鬼娃学校',
                        type: 'bar',
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
                    }
                ],
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted() {
            this.getStatisticByRange(this.dateRange);

        },
        methods: {

            drawBar() {
                var sumCharts = echarts.init(document.getElementById('sumCharts'));
                var roomCharts = echarts.init(document.getElementById('roomCharts'));
                let roomOption = {
                    title: {
                      text: '各主题近期收入',   //图表顶部的标题
                      subtext: '',
                      x:'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: this.legendData
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.xAxisData,
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                rotate: 45,
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '收入(元)',
                            min: 0,
                            interval: 500,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '总收入(元)',
                            min: 0,
                            interval: 1000,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: this.seriesData
                };


                let sumOption = {
                    title: {
                      text: '近期总收入',   //图表顶部的标题
                        subtext: '',
                        x:'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: this.legendData
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.xAxisData,
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                rotate: 45,
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '收入(元)',
                            min: 0,
                            interval: 500,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: this.sumData
                };
                sumCharts.setOption(sumOption);
                roomCharts.setOption(roomOption);
            },
            //根据前台获取的信息修改后台对应的信息
            getStatisticByRange: function (dateRange) {
                var params = new URLSearchParams();
                params.append('dateRange', this.dateRange);
                this.$axios({
                    url: 'http://localhost:8000/statistic/getStatisticByRange',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.seriesData = response.data.data;
                        this.xAxisData = response.data.xdata;
                        this.sumData = response.data.sumData;
                        this.drawBar();
                        console.log(response.data);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },


    }
</script>

<style scoped>

</style>
