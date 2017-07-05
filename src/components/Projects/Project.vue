<template>
  <section :id="project.slug+'-full'" class="project-full-container">
  <div class="project-content">   
  <a href="#" class="close" @click="closeFn"/> 
  <h1>{{ project.title }}</h1>
  <h2>{{ project.client }}</h2>

  </div>
  </section>
</template>

<script>
export default {
  props: [ ],
  components: [],
  data() {
    return {
      imagesLoaded : false
    }
  },
  methods: {
    closeFn() {
      this.$router.push( '/');
    }
  },
  computed: {
    project() {
      return this.$store.getters.currentProject;
    }
  }
}
</script>

<style lang="scss">

.project-full-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: #222;
  z-index: 100;

  .project-content {
    position: relative;
    display: block;
    width: 70%;
    margin: 0 auto; 
    padding: 100px 0;
    color: #fff;
    background-color: #2e2e2e;
  }
  h1 {
    font-size: 2em;
  }

}
.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #ccc;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

.stage-right-enter-active {
  transition: all .5s ease;
}
.stage-right-leave-active {
  transition: all .5s ease;
}
.stage-right-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  position: fixed;
  top: 0;
  left: 100%;
  min-height: 100%;
}
.stage-right-enter-to {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
}
.stage-right-leave-to {
  position: absolute;
  top: 0;
  left: -100%;
  min-height: 100%;
}


</style>