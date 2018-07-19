<template>
  <header class="header">
    <div class="header__inner-wrapper">
      <div class="header__logo"> 
       <img src="../assets/mode_logo_web.png">
      </div>
      <ul class="header__nav">
        <li class="active">Work</li>
        <li>Info</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
@import '../style/variables.scss';
.header {
  margin: 0;
  padding: 2.5rem 0 0 0;
  width: 100%;
  .header__inner-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header__logo {
    margin: 0;
    width: 18%;
    max-width: 250px;
    img {
      max-width: 100%;
    }
  }

  .header__nav {  
      list-style: none;
      margin: 0;
      font-family: 'Apercu-Medium', Helvetica, Arial, sans-serif;
      letter-spacing: 2px;
      li {
        font-size: 1rem;
        float: left;
        margin-left: 1.6rem;
        text-transform: uppercase;
        cursor: pointer;
        &:first-child {
        margin-left: 0;
        }
        &:hover {
          color: $mode-blue;
        }
        &.active {
          color: $mode-blue;
          font-weight: bold;
        }
      }
    }
  }
}
</style>