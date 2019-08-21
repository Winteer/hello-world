<template>
  <div class="home">
    <div>
      <router-link to="/tableDemo">按钮</router-link>
    </div>
    <div>
      <router-link to="/vueTable">单纯表格</router-link>
    </div>
    <div>
      <router-link to="/vueTabTable">菜单导航</router-link>
    </div>
    <div>
      <router-link to="/navDemo">导航demo</router-link>
    </div>
    <div>
      <router-link to="/navMenu">菜单demo</router-link>
    </div>
    <div>
      <router-link to="/markDownEditer">MarkDown</router-link>
    </div>


  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'home'
  };
</script>
