<template>
  <div id="app">
    <transition 
      appear
      :name="transitionName" 
      :duration="transitionDuration" 
      :mode="transitionMode"
    >
    <router-view :key="currentIndex"></router-view>
  </transition>
    <!-- <project-menu></project-menu> -->
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import $ from 'jquery';
import 'yuki-createjs/lib/preloadjs-0.6.2.combined';
import { responsiveUtils } from './components/Mixins/responsiveMixin';

export default {
  name: 'app',
  mixins: [ responsiveUtils ],
  data() {
    return {
      ticking: false,
      transitionName: '',
      transitionMode: 'out-in',
      transitionDuration: 500,
      currentIndex: ''
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
    ...mapGetters([
      'projectView',
      'currentProject'
    ])
  },
  created() {
    this.setVWidth();
    this.setVHeight();
    this.currentIndex = 'home';
    Vue.http
      .get('projects?per_page=30')
      .then(response => response.json())
      .then(data => {
          this.$store.dispatch('setProjects', data);
          console.log(data)
    });

  },
  mounted() {
    this.scrollInit();
  },
  watch: {
  '$route' (to, from) {
    //this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    this.currentIndex = to.path;
    if(to.name == "Project" & from.name == "Home") {
      this.transitionName = "slide-right";
      this.transitionMode = "in-out";
    } else if (to.name == "Project" & from.name == "Project") {
      this.transitionName = "fade";
      this.transitionMode = "out-in";
      this.transitionDuration = 300;
    } else {
      this.transitionName = "";
      this.transitionMode = "out-in";
    }
    console.log(to.name)
    console.log(from.name)
  }
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
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
  background-color: $body-bg;
  width: 100%;
}

.view-toggle .header, .view-toggle .projects .projects__grid {
  display: none;
}

.slide-fade-enter-active {
  transition: all 1s ease-out;
}
.slide-fade-leave-active {
  transition: all .3s ease-out;
}
.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(50px);
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

.slide-right-enter-active {
  transition: all 0.5s ease;
}
.slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-right-enter
/* .slide-right-leave-active for <2.1.8 */ {
  transform: translateX(-100px);
}
.slide-right-leave-to
/* .slide-right-leave-active for <2.1.8 */ {
  transform: translateX(0);
}

</style>
