<template>
  <div id="app">
    <home-page></home-page>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';
export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
