<template>
  <div class="Info">
    <button type="button" v-on:click="add()">添加</button>
    <router-link to="/tableDemo">表格</router-link>
  </div>
</template>

<script>
  import store from '@/store'
export default {
  name: 'Info',
  store,
  methods: {
    add() {
      console.log('add event from info!')
      store.commit('increase')
    }
  }
}
</script>

<style scoped>

</style>
