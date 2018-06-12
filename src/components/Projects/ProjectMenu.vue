<template>
<div class="projects-menu__wrapper">
  <ul class="projects-menu__list">
    <li class="projects-menu__list-item"
        v-for="(project, index) in projects" 
        :key="index">
        <h1 @mouseover="hovered = index" 
        @click="clickFn(index)"
        >{{project.title}}</h1>
    </li>
  </ul>
  <div class="hover-image__wrapper">
    <transition appear name="fade" mode="in-out">  -->
        <div v-for="(project, index) in projects"
            :style="bgImg(project)"
            v-if="hovered==index"
            :key="index"
            class="hover-image" 
            >
        </div>
    </transition>
  </div>
  </div>  
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      projects: {},
      hovered: 0,
      animating: false,
      scrollPos: 0
    }
  },
  computed: {
    hoverImg() {
      let theImg = this.hovered.hero.image || "hero_met_cyber.jpg";
      return {
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6)), url("static/heroes-assets/large/' +
          theImg +
          '") no-repeat center/cover'
      }
    }

  },
  methods: {
    introAni() {
      const that = this;
      const tl_intro = new TimelineMax({ paused: true });
      $('.projects-menu__list-item').each(function(i) {
        tl_intro.add( TweenMax.set(this,{x: "+=100", opacity: 0}))
      });
      $('.projects-menu__list-item').each(function(i) {
        tl_intro.add(TweenMax.to(this,1,{ x:0, opacity: 1 }), i*0.1);
      });
      tl_intro.play();
      window.setTimeout(() => {
        this.initScrollListener();
      },250);
    },
    initScrollListener() {
      const container = $(".projects-menu__wrapper");
      const menu = $(".projects-menu__list");
      const originTop = menu.offset().top;
      const padding = 150;
      container.mousemove(function(evt) {
        //console.log(evt.pageY);
        if(!this.animating) {
          this.animating = true;
          let prevPos = this.scrollPos;
          this.scrollPos = evt.pageY;
          let scrollMax = menu.height() - (window.innerHeight - originTop);
          let mouseRelative = this.scrollPos/window.innerHeight;
          let moveTo = -scrollMax*mouseRelative-padding;

          let diffY = (this.scrollPos-prevPos)/scrollMax;
          //let limitY = Math.min(Math.max(limitY, 0), 20);
          diffY = diffY > 0.15 ? 0.15 : diffY < -0.15 ? -0.15 : diffY;
          let scaleY = 1 + diffY;
          //console.log(diffY);
          //TweenMax.killAll();
          TweenMax.to(menu, 1.2, {y: moveTo, scaleY: scaleY, ease: Power2.easeOut});
          let that = this;
          $('.projects-menu__list-item').each(function(i) {
            let yPos = $(this).offset().top;
            let pushRight = Math.abs(that.scrollPos-yPos)*0.1;
            let fade = 1-(pushRight*0.01);
            TweenMax.to(this, 1.2, {x: pushRight, opacity: fade, ease: Power2.easeOut})
          })
          /* window.setTimeout(() => {
            this.animating = false;
          }, 1000/60); */
          requestAnimationFrame(() => {
            this.animating = false;
          })
        }
      })
      container.mouseout(function(evt){
        TweenMax.to(menu, 1.2, {scaleY: 1, ease: Power2.easeOut});
      })
    },
    bgImg(proj) {
      let theImg = proj.hero.image || "hero_met_cyber.jpg";
      return {
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6)), url("static/heroes-assets/large/' +
          theImg +
          '") no-repeat center/cover'
      }
    },
    clickFn(index) {
      let goTo = this.projects[index].slug;
      this.$store.dispatch('setCurrent', index);
      this.$nextTick(function(){
        this.$router.push("/project/" + goTo);
      });
    }
  },
  created() {
    this.projects = this.$store.getters.projects;
    this.hovered = 0;
  },
  mounted() {
    this.$nextTick(function(){
      this.introAni();
    })
  }
}  
</script>
<style lang="scss">
@import "../../style/_variables.scss";
@import "../../style/mixins.scss";

 .projects-menu__wrapper {
  position: fixed;
  display: grid;
  text-align: left;
  grid: {
    template-columns: repeat(16, 1fr);
    template-rows: [header-start] 4rem [header-end image-start] 80vh [image-end] auto;
  }
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  color: $mode-text;
  background-color: #fff;
  z-index: 100;
  overflow: hidden;
  .projects-menu__list {
    grid-column: 7/-2;
    grid-row: 1 / span 3;
    z-index: 110;
    margin-top: 30rem;
    li {
      list-style: none;
      h1 {
        font-family: "GT-Sectra";
        font-size: 3rem;
        margin-top: 5vh;
        color: $mode_text;
        letter-spacing: 2px;
        cursor: pointer;
        &:hover {
          color: $mode_purple;
        }
      }
    }
  }
  .hover-image__wrapper {
    position: relative;
    grid-column: 1 /span 8;
    grid-row: 2/span 1;
    .hover-image {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
} 
</style>
