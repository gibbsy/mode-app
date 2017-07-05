<template>
  <div id="app" :class="{'view-toggle': projectView}">
  <transition name="fade" appear mode="out-in">
  <app-header></app-header>
  </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import picturefill from 'picturefill';
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
@import 'style/col.css';
@import 'style/decimal.scss';
@import 'style/grid.scss';
@import 'style/mixins.scss';


#app {
  font-family: 'gothamsl-book', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background: #fff;
}

.header {
  display: block;
}

.view-toggle .header, .view-toggle #contents-outer-container #projects-thumbs-container {
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
