<template>
<div>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header style="text-align: left; font-size: 12px">
      <esc-menu></esc-menu>
    </el-header>
  </el-container>
  <el-main style="text-align: center">
        <div class="block" style="text-align: left">
          <el-select v-model="dateRange"  placeholder="请选择">
            <el-option label="近七天" value="7"></el-option>
            <el-option label="近十五天" value="15"></el-option>
            <el-option label="近六个月" value="6"></el-option>
            <el-option label="近一年" value="1"></el-option>
          </el-select>
        </div>
<!--    <div id="myCharts" style="width:800px; height:500px"></div>-->
    <div id="myCharts" style="width:1500px; height:500px"></div>
  </el-main>


</div>

</template>

<script>
  import echarts from 'echarts'
  import EscapeMenu from '../components/EscapeMenu';
  export default {
    name: 'Charts',
    components:{
      'esc-menu':EscapeMenu
    },
    data () {
      return {
        dateRange:'7',//时间范围
        legendData:['大宋奇案','玉观音','鬼娃学校'],//数据label
        xAxisData:['周一','周二','周三','周四','周五','周六','周日'], //X轴数据，默认一周
        seriesData: [
          {
            name:'大宋奇案',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 235.6]
          },
          {
            name:'玉观音',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
          },
          {
            name:'鬼娃学校',
            type:'bar',
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
          }
        ],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      this.drawBar();
    },
    methods: {
      drawBar(){
        var myCharts = echarts.init(document.getElementById('myCharts'));
        let option = {
          // title: {
          //   text: '未来一周气温变化',   //图表顶部的标题
          // },
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
            data:this.legendData
          },
          xAxis: [
            {
              type: 'category',
              data: this.xAxisData,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '收入(元)',
              min: 0,
              interval: 50,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: this.seriesData
        };
         myCharts.setOption(option);
      }
    },

    //根据前台获取的信息修改后台对应的信息
    getStatisticByRange: function (userFormData) {
      this.modifyDialogFormVisible = false;
      var params = new URLSearchParams();
      params.append('serial_no', userFormData.serial_no);
      params.append('user_name', userFormData.user_name);
      params.append('user_photo', userFormData.user_photo);
      params.append('user_code', userFormData.user_code);
      params.append('user_cookie', userFormData.user_cookie);
      params.append('user_mob', userFormData.user_mob);
      params.append('company_code', userFormData.company_code);
      params.append('user_roles', userFormData.user_roles);
      params.append('user_post', userFormData.user_post);
      params.append('user_flag', userFormData.user_flag);
      params.append('sort', userFormData.sort);
      this.$axios({
        url: 'http://localhost:8000/statistic/getStatisticByRange',
        method: 'post',
        data: params
      })
        .then((response) => {
          this.modifFlag = response.data;
          if (this.modifFlag > 0) {
            // this.getInfoByPage(this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
            this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
            // this.selectDemo();
            this.$message('修改成功！');
          }
          console.log(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  }
</script>

<style scoped>

</style>
