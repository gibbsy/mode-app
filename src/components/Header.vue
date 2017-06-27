<template>
  <div id="header-outer-wrapper">
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
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

#header-outer-wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  display: block;

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
    ul {
      list-style: none;
      float: right;
      margin: 0;
      padding: 0;
    }
    li {
      float: left;
    }
  }
}
</style>