<template>
  <div class="info__container">
     <div class="info-page__reveal" v-if="tranisitioning">
      <div id="reveal-1"></div>
      <div id="reveal-2"></div>
      <div id="reveal-3"></div>
      <div id="reveal-4"></div>
    </div>
    <transition name="fade" appear>
      <project-menu v-if="showMenu" :scrollPos="scrollPos"></project-menu>
    </transition>
    <div class="info-page__inner" v-if="transitionDone">
      <router-link href="#" id="home-btn" class="info__home-link" to="/"><h3>Back</h3></router-link>
    <div class="info__ui-right">
       <div class="info__ui-right-logo"> 
        <img src="../assets/mode_sq_white.svg">
      </div>
      <a href="#" id="projects-btn" class="info__projects-link" @click.prevent="toggleMenu"><h3>Projects</h3></a>
    </div>
      <div class="info__modes">
        <h1><img src="../assets/mode_logo_horizontal_white.svg"/></h1>
        <div class="design" @mouseenter="hovered='design'" @mouseleave="hovered=''">
          <h2 v-typewriter="{txt: 'Design', delay: 2000}"></h2>
          <transition 
            appear 
            name="push-down">
            <ul v-if="hovered=='design'">
              <li>UX / UI</li>
              <li>Sketch</li>
              <li>Adobe CS</li>
            </ul>
          </transition>
        </div>
        <div class="animate" @mouseenter="hovered='animate'" @mouseleave="hovered=''">
          <h2 v-typewriter="{txt: 'Animate', delay: 2500}"></h2>
          <transition 
            appear 
            name="push-down">
            <ul v-if="hovered=='animate'">
              <li>After Effects</li>
              <li>Cinema 4D</li>
            </ul>
          </transition>
        </div>
        <div class="build"  @mouseenter="hovered='build'" @mouseleave="hovered=''">
          <h2 v-typewriter="{txt: 'Build', delay: 3000}"></h2>
          <transition 
            appear 
            name="push-down">
            <ul v-if="hovered=='build'">
              <li>HTML5</li>
              <li>Javascript</li>
              <li>CSS / SASS</li>
              <li>Vue</li>
              <li>Wordpress</li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="info__contents">
        <h1><span>Mode Studio is the</span><span>independent studio of</span><span>designer / developer</span><span>Andy Gillon.</span></h1>
        <ul class="info__contact">
          <li><span>madebymode</span><span>@gmail.com</span></li>
          <li>twitter</li>
          <li>linkedin</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectMenu from "./Projects/ProjectMenu.vue";
import { mapGetters } from 'vuex';
import $ from 'jquery';

export default {
  components: {
    projectMenu: ProjectMenu
  },
  data() {
    return {
      tranisitioning: true,
      transitionDone: false,
      showMenu: false,
      hovered: '',
      animating: false,
      modeAnimating: false,
      mousePos: 0
    };
  },
  computed: {
    ...mapGetters(['scrollPos']),
    showContent() {
      return this.transitionDone;
    }
  },
  methods: {
    transitionIn() {
      const reveal1 = document.getElementById("reveal-1"),
            reveal2 = document.getElementById("reveal-2"),
            reveal3 = document.getElementById("reveal-3"),
            reveal4 = document.getElementById("reveal-4"),
            that = this;

      const tl_transition = new TimelineMax({ onComplete: that.afterTransition })
        .set(reveal1, {x: "-100%"})
        .set(reveal2, {x: "-100%"})
        .set(reveal3, {x: "-100%"})
        .set(reveal4, {x: "-100%"})
        .to(reveal1, 0.75, { x: "+=100%", ease: Power1.easeIn }, 0)
        .to(reveal2, 0.75, { x: "+=100%", ease: Power1.easeIn }, 0.2)
        .to(reveal3, 0.75, { x: "+=100%", ease: Power1.easeIn }, 0.4)
        .to(reveal4, 0.75, { x: "+=100%", ease: Power1.easeIn }, 0.6)
    },
    afterTransition() {
      this.transitionDone = true;
      this.$nextTick( () => {
        this.tranisitioning = false;
        this.revealContent();
      })
    },
    revealContent() {
      const logo = $('.info__ui-right-logo'),
            logoBg = $('.info__modes h1'),
            content = $('.info__contents'),
            contact = $('.info__contact'),
            modes = $('.info__modes'),
            intro = $('.info__contents h1'),
            intro1 = $('.info__contents h1 span:nth-child(1)'),
            intro2 = $('.info__contents h1 span:nth-child(2)'),
            intro3 = $('.info__contents h1 span:nth-child(3)'),
            intro4 = $('.info__contents h1 span:nth-child(4)'),
            email = $('.info__contact li:nth-child(1)'),
            twitter = $('.info__contact li:nth-child(2)'),
            linkedin = $('.info__contact li:nth-child(3)'),
            mode = $('.info__modes h1'),
            design= $('.info__modes .design'),
            animate = $('.info__modes .animate'),
            build = $('.info__modes .build');

      const tl_reveal = new TimelineMax()
            .set(intro1, {x: '-=200', opacity: 0})
            .set(intro2, {x: '-=200', opacity: 0})
            .set(intro3, {x: '-=200', opacity: 0})
            .set(intro4, {x: '-=200', opacity: 0})
            .set(email, {x: '-=200', opacity: 0})
            .set(twitter, {x: '-=200', opacity: 0})
            .set(linkedin, {x: '-=200', opacity: 0})
            .set(logoBg, {x: '-=200', opacity: 0})
            .set(content, {opacity: 1})
            .set(contact, {opacity: 1})
            .set(modes, {opacity: 1})
            .to(intro1, 1.5, {x: 0, opacity: 1, ease: Power2.easeOut}, 0)
            .to(intro2, 1.5, {x: 0, opacity: 1, ease: Power2.easeOut}, 0.1)
            .to(intro3, 1.5, {x: 0, opacity: 1, ease: Power2.easeOut}, 0.2)
            .to(intro4, 1.5, {x: 0, opacity: 1, ease: Power2.easeOut}, 0.3)
            .to(email, 1.5, {x: 0, opacity: 1, ease: Power2.easeOut}, 0.4)
            .to(twitter, 1.5, {x: 0, opacity: 1, ease: Power2.easeOut}, 0.5)
            .to(linkedin, 1.5, {x: 0, opacity: 1, ease: Power2.easeOut}, 0.6)
            .to(logoBg, 3, {x: 0, opacity: 1, ease: Power2.easeOut}, 0.6)

      this.initScrollListener();
    },
    initScrollListener() {
      const container = $(".info__container");
      const content = $(".info__contents");
      const modes = $(".info__modes");
      
      container.mousemove((evt) => {
        //console.log(evt.pageY);
        if(!this.animating) {
          this.animating = true;
          let prevPos = this.mousePos;
          this.mousePos = evt.pageY - (window.innerHeight/2);
          let scrollMaxContent = 100;
          let scrollMaxModes = scrollMaxContent/3;
          let mouseRelative = this.mousePos/window.innerHeight;
          let moveContent = -scrollMaxContent*mouseRelative;
          let moveModes = -scrollMaxModes*mouseRelative;
          TweenMax.to(content, 2, {y: moveContent, ease: Power2.easeOut});
          TweenMax.to(modes, 3, {y: moveModes, ease: Power2.easeOut});
          requestAnimationFrame(() => {
            this.animating = false;
          })
        }
      })
      container.mouseout(function(evt){
        TweenMax.to(content, 1.2, {scaleY: 1, ease: Power2.easeOut});
      })
    },
     toggleMenu() {
      if(!this.showMenu) {
        this.scrollPos = $(document).scrollTop();
        console.log(this.scrollPos + ' scrollpos')
        //$('body').css({top: this.scrollPos});
        $('body').toggleClass("menu-open");
        this.showMenu = !this.showMenu;
      } else if (this.showMenu) {
        $('body').toggleClass("menu-open");
        this.showMenu = !this.showMenu;
        $(document).scrollTop(this.scrollPos);
      }
    }
  },
  beforeCreate() {
    if(!this.$store.getters.dataLoaded) {
      //console.log("push home")
      this.$router.push("/");
    }
  },
  mounted() {
    this.transitionIn();
  }
};
</script>
<style lang="scss">
@import '../style/mixins.scss';
@import '../style/_variables.scss';
.info__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: none;
  //z-index: 2000;
  .info-page__reveal {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    div {
      position: relative;
      width: 100%;
      height: 25vh;
      background-color:#111;
    }
  }
  .info-page__inner {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    height: auto;
    background-color: #111;

    .info__modes {
      position: absolute;
      left: 10vw;
      top: 20vh;
      color: #222;
      font-family: 'gt-sectra';
      user-select: none;
      opacity: 0;
      div {
        display: block;
      }
      h1, h2 {
        transition: color 0.5s ease;
        text-transform: uppercase;
        &:hover {
         color: #ccc; 
        }
      }
      h1 {
        font-size: 12rem;
        letter-spacing: 3rem;
        width: 50vw;
        margin-bottom: 8rem;
        img {
          display: block;
          width: 100%;
          height: auto;
          opacity: 0.05;
          transition: opacity 0.5s ease;
          &:hover {
            opacity: 0.7;
          }
        }
      }
      h2 {
        font-size: 2.7rem;
        letter-spacing: 1.2rem;
        margin-top: 5rem;
        margin-left: 5rem;
        cursor: pointer;
      }
      ul {
        list-style: none;
        height: auto;
        width: 100%;
        margin-left: 5rem;
        display: block;
        li {
          font-size: 1.3rem;
          padding-top: 2rem;
          padding-left: 2rem;
          letter-spacing: 0.6rem;
          transition: color 0.5s ease;
          width: 100%;
          text-transform: uppercase;
          cursor: pointer;
          &:hover {
            color: #eee;
          }
        }
      }
    }

    .info__contents {
      position: absolute;
      left: 40vw;
      top: 20vh;
      width: 45vw;
      opacity: 0;
      h1 {
        font-family: 'apercu';
        color: #fff !important;
        font-size: 4rem;
        line-height: 1.3;
        span {
          display: block;
        }
      }
      ul {
        list-style: none;
        width: 30vw;
        li {
          font-family: 'apercu';
          color: #fff !important;
          font-size: 4rem;
          line-height: 1.3;
          word-wrap: break-word;
          margin-top: 3vh;
          &:first-child {
            margin-top: 6vh;
          }
        }
      }
    }
    .info__home-link {
        position: absolute;
        top: 6.5rem;
        left: 0;
        //opacity: 0;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 2rem;
          height: 2px;
          background: #fff;
        }
        h3 {
          padding-left: 2.5rem;
          color: #fff;
        }
      }
    .info__ui-right {
      position: fixed;
      width: 14rem;
      height: 100vh;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .info__ui-right-logo {
        margin-top: 4.5rem;
        width: 5rem;
        perspective: 200px;
        img {
          max-width: 100%;
          //opacity: 0;
        }
      }
      .info__projects-link {
        position: relative;
        text-decoration: none;
        margin-top: auto;
        margin-bottom: 6rem;
        //opacity: 0;
        &:before {
          content: "";
          position: absolute;
          left: 50%;
          top: -1.5rem;
          width: 2px;
          height: 2rem;
          background: #fff;
        }
        h3 {
          @include rotate-link();
          color: #fff;
        }
      }
    }
  }
}
.push-down-enter-active {
  max-height: 300px;
  transition: all 1.5s  cubic-bezier(0.250, 0.460, 0.450, 0.940);
  transition-delay: 0.25s;
}

.push-down-leave-active {
  max-height: 300px;
  transition: all 1.5s  cubic-bezier(0.250, 0.460, 0.450, 0.940);
}

.push-down-enter, .push-down-leave-to {
  height: 0;
  max-height: 0;
  opacity: 0;
}
</style>
