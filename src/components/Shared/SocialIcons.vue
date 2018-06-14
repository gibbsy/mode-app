<template>
 <ul id="social" class="social-icons">
  <li id="twitter"></li>
  <li id="linkedin"></li>
  <li id="vimeo"></li>
  <li id="behance"></li>
</ul>  
</template>

<script>
export default {

}
</script>
<style lang="scss">
.social-icons {
  
  li {
    list-style: none;
    width: 22px;
    height: 20px;
    margin-top: 1rem;
    opacity: 0.2;
    transition: opacity 0.2s ease;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    &:first-child {
      background: url("../../assets/twitter@2x.png") left top/100% no-repeat;
    }
    &:nth-child(2) {
      background: url("../../assets/linkedin@2x.png") left top/100% no-repeat;
    }
    &:nth-child(3) {
      background: url("../../assets/vimeo@2x.png") left top/100% no-repeat;
    }
    &:nth-child(4) {
      background: url("../../assets/behance@2x.png") left top/100% no-repeat;
    }
  }
}
</style>
