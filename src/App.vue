<template>
  <div id="app">
    <page-transition>
    <router-view :key="routeKey"></router-view>
  </page-transition>
  <transition name="fade" mode="out-in">
    <app-intro 
          v-if="introViewed === false" 
          :parent-ready="routeImagesLoaded"
          v-on:intro-complete="introComplete"
          >
    </app-intro>
  </transition>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import $ from 'jquery';
import 'yuki-createjs/lib/preloadjs-0.6.2.combined';
import { responsiveUtils } from './components/Mixins/responsiveMixin';
import AppIntro from "./components/Intro/AppIntro.vue";
import PageTransition from "./components/Shared/PageTransition.vue";

export default {
  name: 'app',
  mixins: [ responsiveUtils ],
  components: {
    appIntro: AppIntro,
    pageTransition: PageTransition
  },
  data() {
    return {
      ticking: false,
      currentIndex: ''
    }
  },
  computed: {
    ...mapGetters([
      'scrollPos',
      'introViewed',
      'dataLoaded',
      'homeImagesLoaded',
      'projectImagesLoaded',
      'currentProject'
    ]),
    routeImagesLoaded() {
     if(this.currentIndex == 'Home') {
       return this.homeImagesLoaded;
     } else if (this.currentIndex =='Project') {
       return this.projectImagesLoaded;
     } else if (this.currentIndex =='Info') {
       return true;
     } else {
       console.log('Unknown Index');
       this.$router.push("/")
       return false;
     }
    },
    routeKey() {
      return this.currentProject.slug || this.currentIndex;
    }
  },
  created() {
    this.setVWidth();
    this.setVHeight();
    this.currentIndex = this.$route.name;
    //console.log(this.$route.name)

    Vue.http
      .get('projects?per_page=30')
      .then(response => response.json())
      .then(data => {
          this.$store.dispatch('setProjects', data);
          //console.log(data)
    });

  },
  methods: {
    onScroll() {
      this.$store.dispatch('onScrolled', $(window).scrollTop());
      this.requestTick();    
    },
    requestTick() {
      if (!this.ticking) {
          //  var self = this;
            window.requestAnimationFrame(() => {
              this.updateScroll();   
            });
          }
      this.ticking = true;
    },
    updateScroll() {
      this.ticking = false;
      let currentScrollY = this.$store.getters.scrollPos;
      //console.log(this.scrollPos);
    },
    scrollInit() {
      window.addEventListener('scroll', this.onScroll);
    },
    introComplete() {
      this.$store.commit('INTRO_VIEWED');
    }
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

body.transitioning {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  position: relative;
  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #111;
    transform-origin: 0 0;
    transform: scaleX(0);
  }
}

.view-toggle .header, .view-toggle .projects .projects__grid {
  display: none;
}

</style>
