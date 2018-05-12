<template>
  <section :id="project.slug+'-full'" class="project-page__container">
  <div class="project-page__reveal"></div>
    <div class="project-page__header">
      <div class="project-page__header--logo">
        <img src="">
      </div>
      <a href="#" class="close" @click="closeFn"/> 
    </div>
  <div class="project-page__content">   
    <div class="project-page__hero-image" :style="heroImg">
    </div>
    <div class="project-page__intro">
      <ul class="project-page__info">
        <li>Art Direction</li>
        <li>Motion Design</li>
        <li>Agency: <span class="credits__agency">Penna</span></li>
      </ul>
      <div id="divider-1" class="divider--horizontal"></div>
       <h1>{{ project.title }}</h1>
      <h2><!-- {{ project.client }} --> Brand films for Gatorade</h2>
        <p class="project-page__overview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet enim sit amet dolor mollis ultrices. Quisque volutpat, lorem a malesuada imperdiet, eros urna bibendum lorem, nec tempus velit justo in enim.</p>
        <div id="divider-2" class="divider--horizontal"></div>
    </div>
  </div>
  </section>
</template>

<script>
import { TimelineMax } from "gsap";
export default {
  props: [],
  components: [],
  data() {
    return {
      imagesLoaded: false
    };
  },
  methods: {
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
    project() {
      return this.$store.getters.currentProject;
    },
    heroImg() {
      return {
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6)), url("static/heroes-assets/large/' +
          this.project.hero.image +
          '") no-repeat center/cover'
      };
    }
  },
  mounted() {
    this.introAni();
    console.log(this.project);
  }
};
</script>

<style lang="scss">
@import "../../style/_variables.scss";
@import "../../style/mixins.scss";

.project-page__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: #fff;
  z-index: 100;

  .project-page__reveal {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: $mode-purple;
    //background: $mode-gradient;
    z-index: 100;
  }

  .project-page__header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(180deg, rgba(#fff, 0.6), transparent 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    .close {
      width: 32px;
      height: 32px;
      opacity: 0.5;
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
  }

  .project-page__content {
    position: relative;
    display: grid;
    text-align: left;
    grid: {
      template-columns: repeat(16, 1fr);
      template-rows: 80vh auto;
    }
    width: 100%;
    margin: 0;
    padding: 0;
    color: $mode-text;
    background-color: #fff;
  }
  .project-page__hero-image {
    grid-column: 1/span 8;
    grid-row: 1/span 1;
  }
  .project-page__intro {
    grid-column: 7/ -1;
    grid-row: 1/ span 1;
    display: grid;
    grid: {
      template-columns: repeat(8, 1fr);
      template-rows: 18vh 5.5rem 3rem 7.5rem 4rem 3rem auto;
      gap: 1rem;
    }
    h1,
    h2,
    h3 {
      font-family: "GT-Sectra";
      color: $mode-purple;
    }
    h1 {
      font-size: 6.75rem;
      grid-column: 1/-1;
      grid-row: 4 / span 1;
    }
    h2 {
      font-size: 3rem;
      grid-column: 3/ -1;
      grid-row: 5 / span 1;
    }
    #divider-1 {
      grid-column: 3 / span 2;
      grid-row: 3 / span 1;
      border-top: $divider;
    }
    #divider-2 {
      grid-column: 3 / span 2;
      grid-row: 6 / span 1;
      border-bottom: $divider;
    }
    .project-page__info {
      grid-column: 3/ span 2;
      grid-row: 2/ span 1;
      list-style: none;
      li {
        font-size: 0.95rem;
        padding-top: 0.5rem;
        letter-spacing: 1px;
      }
    }
    .project-page__overview {
      grid-column: 3/ -3;
      grid-row: -2/-1;
      padding-top: 2rem;
      padding-right: 1rem;
      line-height: 2.2rem;
      font-size: 1.3rem;
      letter-spacing: 1px;
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
</style>