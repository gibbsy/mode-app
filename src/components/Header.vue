<template>
  <header class="header">
    <div id="header-inner-wrapper">
      <div id="logo"> 
       <img src="../assets/mode_logo_web.png">
      </div>
      <div id="nav-wrapper">
        <ul id="nav">
          <li>Work</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.header {
  margin: 0;
  padding: 0;
  width: 100%;

  #header-inner-wrapper {
    width: 86%;
    padding: 60px 0 180px 0;
    margin: 0 auto;
    display: block;
    text-align: left;
  }

  #logo {
    margin-left: 6px;
    width: 15%;
    display: inline-block;
    img {
      max-width: 100%;
    }
  }

  #nav-wrapper {  
    float: right;
    ul {
      list-style: none;
      margin: 0;
      padding: 16px 6px 0 0;
    }
    li {
      font-size: 1.2em;
      float: left;
      margin-left: 20px;
    }
    li:first-child {
      margin-left: 0;
    }
  }
}
</style>