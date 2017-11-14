<template>
  <div id="preloader">
  <h1>LOADING</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Prop : 1
    }
  }
}
</script>

<style lang="scss" scoped>
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: #ccc;
  z-index: 1000;
  h1 {
    position: absolute;
    top: 50vh;
    width: 100%;
  }
}
</style>