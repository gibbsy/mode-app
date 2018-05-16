<template>
  <div id="app" :class="{'view-toggle': projectView}">
  <transition name="fade" appear mode="out-in">
  <app-header></app-header>
  </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import $ from 'jquery';
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    appHeader: Header
  },
  data() {
    return {
      ticking : false
    }
  },
  methods: {
    onScroll() {
      this.$store.dispatch('onScrolled', $(window).scrollTop());
      this.requestTick();    
    },
    requestTick() {
      if (!this.ticking) {
            var self = this;
            window.requestAnimationFrame(function() {
              self.updateScroll();   
            });
          }
      this.ticking = true;
    },
    updateScroll() {
      this.ticking = false;
      let currentScrollY = this.$store.getters.scrollPos;
    },
    scrollInit() {
      window.addEventListener('scroll', this.onScroll);
    }
  },
  computed: {
    projectView() {
      return this.$store.getters.projectView;
    }
  },
  created() {
    this.$store.dispatch('loadData');

  },
  mounted() {
    this.scrollInit();
  }
}
</script>

<style lang="scss">
@import 'style/html5reset.css';
@import 'style/mixins.scss';
@import 'style/_variables.scss';

* {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
}

body {
  background-color: $body-bg;
}

#app {
  font-family: 'Apercu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
  background-color: $body-bg;
  display: grid;
  width: 92%;
  max-width: $max-layout-width;
  grid: {
    template-columns: 100%;
    template-rows: 14rem auto 12rem;
  }
}

.view-toggle .header, .view-toggle .projects .projects__grid {
  display: none;
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}

</style>
