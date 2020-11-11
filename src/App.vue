<template>
  <div id="app">
    <slide-verify></slide-verify>
  </div>
</template>

<script>
import SlideVerify from "./components/slide-verify.vue";

export default {
  name: "App",
  components: {
    SlideVerify
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
