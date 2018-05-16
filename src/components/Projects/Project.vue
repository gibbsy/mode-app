<template>
  <transition 
    appear 
    @enter="transitionIn"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    >
    <section :id="project.slug+'-full'" class="project-page__container">
      <div class="project-page__reveal">
      <div id="reveal-1"></div><div id="reveal-2"></div><div id="reveal-3"></div><div id="reveal-4"></div><div id="reveal-5"></div>
    </div>
    <!-- <div class="grid-background__fixed">
      <span v-for="track in gridTracks" :key="track"></span>
    </div> -->
      <div class="project-page__grid-wrapper" v-if="contentLoaded">
        <div class="project-page__ui-right">
        <a href="#" class="close" @click="closeFn"><h3>Projects</h3></a>   
          <a href="#" class="info__link"><h3>Info</h3></a>
          <ul class="social-icons">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div id="project-hero" class="project-page__hero-image" :style="heroImg">
        </div>
        <div class="project-page__intro">
            <ul id="tags-1" class="project-page__intro-tags">
              <li><h3>Role:</h3></li>
              <li>Art Direction</li>
              <li>Motion Design</li>
            </ul>
          <ul id="tags-2" class="project-page__intro-tags">
            <li><h3>Technology:</h3></li>
            <li>HTML5</li>
            <li>Vue.js</li>
          </ul>
          <ul id="tags-3" class="project-page__intro-tags">
            <li><h3>Agency:</h3></li>
            <li>Wireworks</li>
          </ul>
          <ul id="tags-4" class="project-page__intro-tags">
            <li><h3>Year:</h3></li>
            <li>2015</li>
          </ul>
          <div id="project-title">
            <h1 id="main-title">{{ project.title }}</h1>
            <h2 id="subtitle"><!-- {{ project.client }} --> UX/UI for Gatorade</h2>
          </div>
            <p id="overview-text" class="project-page__overview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet enim sit amet dolor mollis ultrices. Quisque volutpat, lorem a malesuada imperdiet, eros urna bibendum lorem, nec tempus velit justo in enim.</p>
        </div>
        <div class="project-page__project-content">
          <div class="project-content__image-portrait">
            <img src="static/dev-content/gatorade-site-02.jpg">
          </div>
          <div class="project-content__image-portrait">
            <img src="static/dev-content/gatorade-site-01.jpg">
          </div>
        </div>
        <div class="project-page__footer"></div>
      </div>
    </section>
  </transition>
</template>

<script>
import { TimelineMax } from "gsap";
export default {
  props: [],
  components: [],
  data() {
    return {
      project: {},
      contentLoaded: false,
      gridTracks: 16,
      tl_enter: {},
      tl_leave: {}
    };
  },
  methods: {
    transitionIn(el, done) {
      console.log('transition')
      let reveal1 = document.getElementById('reveal-1'),
          reveal2 = document.getElementById('reveal-2'),
          reveal3 = document.getElementById('reveal-3'),
          reveal4 = document.getElementById('reveal-4'),
          reveal5 = document.getElementById('reveal-5');

      let tl_reveal = new TimelineMax({ onComplete: done }) 
      .set(reveal5, { x: "-=100%" })
      .set(reveal3, { x: "-=100%" })
      .set(reveal2, { x: "-=100%" })
      .set(reveal4, { x: "-=100%" })
      .set(reveal1, { x: "-=100%" })
      .to(reveal5, 0.5, { x: "+=100%", ease: Power1.easeIn })
      .to(reveal4, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.1)
      .to(reveal3, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.2)
      .to(reveal2, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.3)
      .to(reveal1, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.5) 
    },
    tl_enterGo() {
      console.log('go');
      let reveal1 = document.getElementById('reveal-1'),
          reveal2 = document.getElementById('reveal-2'),
          reveal3 = document.getElementById('reveal-3'),
          reveal4 = document.getElementById('reveal-4'),
          reveal5 = document.getElementById('reveal-5'),
          tags1 = document.getElementById('tags-1'),
          tags2 = document.getElementById('tags-2'),
          tags3 = document.getElementById('tags-3'),
          tags4 = document.getElementById('tags-4'),
          hero = document.getElementById('project-hero'),
          title = document.getElementById('main-title'),
          subtitle = document.getElementById('subtitle'),
          intro = document.getElementById('overview-text');

      let tl_reveal = new TimelineMax({  })
      .set(reveal5, { x: "-=100%" })
      .set(reveal3, { x: "-=100%" })
      .set(reveal2, { x: "-=100%" })
      .set(reveal4, { x: "-=100%" })
      .set(reveal1, { x: "-=100%" })
      .set(hero, {x: '-=50'})
      .set(title, {x: '-=50'})
      .to(reveal5, 0.5, { x: "+=100%", ease: Power1.easeIn })
      .to(reveal4, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.1)
      .to(reveal3, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.2)
      .to(reveal2, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.3)
      .to(reveal1, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.5) 
      .to(reveal5, 1, { x: "100%", ease: Power4.easeOut }, 1.5)
      .to(reveal4, 1, { x: "100%", ease: Power4.easeOut }, 1.6)
      .to(reveal3, 1, { x: "100%", ease: Power4.easeOut }, 1.7)
      .to(reveal2, 1, { x: "100%", ease: Power4.easeOut }, 1.8)
      .to(reveal1, 1, { x: "100%", ease: Power4.easeOut }, 1.9)
      .to(hero, 0.5 ,{ opacity: 1, x: 0}, 1.75)

      this.tl_enter = new TimelineMax({ delay: 0.5 })
      .add(tl_reveal)

    },
     afterEnter() {
      console.log('projectView')
      this.$store.dispatch('setProjectView', true);
    },
    beforeLeave() {
      console.log('homeView')
       this.$store.dispatch('setProjectView', false);
    },
    introAni() {
      let reveal = document.querySelectorAll(".project-page__reveal");
      let ani = new TimelineMax({ delay: 0.5 }).to(reveal, 1, {
        x: "-=100%",
        ease: Power4.easeInOut
      });
    },
    closeFn() {
      this.$router.push("/");
    }
  },
  computed: {
    heroImg() {
      return {
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6)), url("static/heroes-assets/large/' +
          this.project.hero.image +
          '") no-repeat center/cover'
      };
    }
  },
  created() {
    // handle a deep link - redirect to home?
    this.project = this.$store.getters.currentProject;
  },
  mounted() {
    //console.log(this.project);
    this.$nextTick(function() {
      //this.tl_enterGo();
    })
  }
};
</script>

<style lang="scss">
@import "../../style/_variables.scss";
@import "../../style/mixins.scss";

@mixin rotate-link() {
  text-transform: uppercase;
  transform: rotate(90deg);
  letter-spacing: 4px;
  font-size: 0.8rem;
  margin-top: 3.5rem;
}

.project-page__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: none;
  z-index: 100;
  overflow-x: hidden;

  .project-page__reveal {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: none;
    //background: $mode-gradient;
    z-index: 100;
    div {
      position: relative;
      width: 100%;
      height: 20vh;
      background-color: #111;
    }
  }

  .grid-background__fixed {
    position: fixed;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    span {
      border-left: 1px solid #eee;
    }
  }
  .project-page__grid-wrapper {
    position: relative;
    display: grid;
    text-align: left;
    grid: {
      template-columns: repeat(16, 1fr);
      template-rows: [header-start] 4rem [header-end intro-start] 80vh
        [intro-end project-content-start] auto [project-content-end footer-start] 20rem [footer-end];
    }
    width: 100%;
    margin: 0;
    padding: 0;
    color: $mode-text;
    background: none;
    h3 {
      font-family: 'Apercu-Medium';
    }
    .project-page__ui-right {
      grid-column: -2/-1;
      grid-row: 1/span 2;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      opacity: 0;
      .info__link {
        position: relative;
        text-decoration: none;
        &:before {
            content: "";
            position: absolute;
            left: 50%;
            top: 0;
            width: 2px;
            height: 2rem;
            background: $mode-purple;
          }
        h3 {
          @include rotate-link();
        }
      }
      .close {
        position: relative;
        display: block;
        width: 32px;
        height: 32px;
        margin-top: 16px;
        text-decoration: none;
        margin-bottom: auto;
        h3 {
          @include rotate-link();
        }
      }
      .close:hover {
        opacity: 1;
      }
      .close:before,
      .close:after {
        position: absolute;
        left: 15px;
        content: " ";
        height: 33px;
        width: 2px;
        background-color: $mode-purple;
      }
      .close:before {
        transform: rotate(45deg);
      }
      .close:after {
        transform: rotate(-45deg);
      }
      .social-icons {
        margin-top: 2rem;
        li {
          list-style: none;
          width: 22px;
          height: 20px;
          margin-top: 1rem;
          opacity: 0.2;
          transition: opacity 0.5s ease;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
          &:first-child {
            background: url('../../assets/twitter@2x.png') left top/100% no-repeat;
          }
          &:nth-child(2) {
            background: url('../../assets/linkedin@2x.png') left top/100% no-repeat;
          }
          &:nth-child(3) {
            background: url('../../assets/vimeo@2x.png') left top/100% no-repeat;
          }
          &:nth-child(4) {
            background: url('../../assets/behance@2x.png') left top/100% no-repeat;
          }
        }
      }
    }
    .project-page__hero-image {
      grid-column: 1/span 8;
      grid-row: 1/intro-end;
      opacity: 0;
    }
    .project-page__intro {
      grid-column: 7/ -2;
      grid-row: intro-start/intro-end;
      display: grid;
      grid: {
        template-columns: repeat(9, 1fr);
        template-rows: [tags-start] 24vh [tags-end title-start] auto [title-end overview-start] auto [overview-end];
        gap: 0;
      }
      h1,
      h2
      {
        font-family: "GT-Sectra";
        color: $mode-purple;
      }
    
      .project-page__intro-tags {
        position: relative;
        list-style: none;
        grid-row: tags-start / tags-end;
        &:before {
          content: "";
          position: absolute;
          width: 2rem;
          height: 2px;
          background-color: $mode-purple;
        }
        li {
          font-size: 0.9rem;
          padding-top: 0.5rem;
          letter-spacing: 1px;
          &:first-child {
            margin-top: 0.5rem;
          }
          h3 {
            text-transform: uppercase;
            color: $mode-purple;
            font-size: 0.7rem;
            letter-spacing: 2px;
          }
        }
        &:first-child {
          grid-column: 4/ span 2;
          transition-delay: 2s;
        }
        &:nth-child(2) {
          grid-column: 5/ span 2;
          margin-top: 9rem;
          transition-delay: 2.2s;
        }
        &:nth-child(3) {
          grid-column: 7/ span 2;
          margin-top: 3rem;
          transition-delay: 2.4s;
        }
        &:nth-child(4) {
          grid-column: 8/ span 2;
          margin-top: 12rem;
          transition-delay: 2.6s;
        }
      }
      #project-title {
        grid-column: 1/-1;
        grid-row: title-start / title-end;
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        grid-template-rows: 8rem 5rem;
        align-content: center;
        h1 {
          font-size: 6.75rem;
          grid-column: 1/-1;
          grid-row: 1/span 1;
        }
        h2 {
          font-size: 3rem;
          grid-column: 4/ -1;
          grid-row: 2/span 1;
        }
      }
      .project-page__overview {
        grid-column: 4/ -2;
        grid-row: -2/-1;
        padding-top: 2rem;
        padding-right: 1rem;
        line-height: 2.2rem;
        font-size: 1.2rem;
        letter-spacing: 1px;
      }
    }
    .project-page__project-content {
      grid-column: 1/-2;
      grid-row: project-content-start/project-content-end;
      display: grid;
      grid-template-columns: repeat(15,1fr);
      grid-row-gap: 4rem;
      .project-content__image-portrait {
        grid-column: 3/span 11; 
        &:first-of-type {
          margin-top: 12rem;
        }
        img {
          max-width: 100%;
        }
      }
    }
    .project-page__footer {
      grid-column: 1/-1;
      grid-row: footer-start/footer-end;
      background: rgba(#eee, 0.5);
      margin-top: 8rem;
    }
  }
}

.stage-right-enter-active {
  transition: all 0.5s ease;
}
.stage-right-leave-active {
  transition: all 0.5s ease;
}
.stage-right-enter {
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

.tags-ani-enter-active {
  transition: all 0.5s ease-out;
}
.tags-ani-leave-active {
  transition: all 0.5s ease-in;
}
.tags-ani-enter {
  transform: translateX(50px);
  opacity: 0;
}


</style>