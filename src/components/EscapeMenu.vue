<template>
<div id="EscapeMenu">
  <div class="line"></div>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item index="/CustomInfo">预约登记</el-menu-item>
    <el-menu-item index="/Charts">统计图表</el-menu-item>
  </el-menu>
</div>
</template>

<script>
  export default {
    name: 'EscapeMenu',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style scoped>

</style>
