<template>
  <div id="NavDemo">
    <qui-nav v-on:navClickEvent="dosth"></qui-nav>
    <VueUeditor v-model="content"></VueUeditor>
  </div>
</template>

<script>
  import quiNav from '../components/quiNav.vue';
  export default {
    name: 'NavDemo',
    components: {
      'qui-nav': quiNav
    },
    methods: {
      dosth: function (items, index) {
        // alert(items[index].text + index);
        console.log(items[index].text + index);
      }
    }
  };
</script>

<style scoped>

</style>
