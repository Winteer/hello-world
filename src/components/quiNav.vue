<template>
  <div class="qui-nav">
    <a v-for="(item,index) in items" :class="[commonClass,item.active ? activeClass : '']" v-on:click="navClickEvent(items,index)" > <!--关键代码 v-for -->
      <span class="nav-txt">{{item.text}}</span>
    </a>
  </div>
</template>

<script type="text/javascript">
  import VueTable from '../views/VueTable';
  export default{
    components: {
      'vue-table': VueTable
    },
    data:function(){
      return{
        commonClass:'nav-item',
        activeClass:'active',
        items:[
          {
            text:'首页',
            active:true
          },
          {
            text:'列表',
            active:false
          },
          {
            text:'关于',
            active:false
          },
          {
            text:'是否删除',
            active:false
          }
        ]
      }
    },
    methods:{
      navClickEvent:function(items,index){
        this.tableVisible = false;
        /*默认切换类的动作*/
        items.forEach(function(el){
          el.active = false;
        });
        items[index].active = true;
        console.log('ddddd');
        /*开放用户自定义接口*/
        this.$emit('navClickEvent',items,index);
      }
    }
  }
</script>
<style scoped>
  @import '../assets/reset.import.css';
  @import '../assets/qui-nav.import.css';
</style>
