<template>
<transition 
      appear
      :name="transitionName" 
      :duration="transitionDuration" 
      :mode="transitionMode"
    >
    <slot/>
  </transition>
  
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';
const DEFAULT_TRANSITION = 'fade';
const DEFAULT_MODE = 'in-out';

export default {
  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_MODE,
      transitionDuration: 500,
    };
  },
  computed: {
    ...mapGetters([
      'scrollPos'
    ])
  },
  methods: {
   /*  enterFn(el) {
      console.log(el);
      if($(el).hasClass('info-page__outer-wrapper')) {
        ////
         console.log("transition");
      const that = this;
      const reveal1 = document.getElementById("reveal-1"),
            reveal2 = document.getElementById("reveal-2");

      const tl_transition = new TimelineMax()
        .set(reveal2, { x: "-=100%" })
        .set(reveal1, { x: "-=100%" })
        .to(reveal2, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.3)
        .to(reveal1, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.5);
      
      }
    } */
  },
  watch: {
    $route(to, from) {
      this.currentIndex = to.path;
      if (to.name == "Project" && from.name == "Home") {
        this.transitionName = "fade";
        this.transitionMode = "out-in";
      } else if (to.name == "Project" && from.name == "Project") {
        this.transitionName = "fade";
        this.transitionMode = "out-in";
        this.transitionDuration = 300;
      } else if (to.name == "Info") {
        this.transitionName = "info-in";
        this.transitionMode = "out-in";
        this.transitionDuration = 500;
        /* $('.home__container')
          .css({top: -(this.scrollPos)})
          .addClass('transitioning'); */
      } else if (from.name == "Info") {
        this.transitionName = "info-out";
        this.transitionMode = "out-in";
        this.transitionDuration = 500;
      } else {
        this.transitionName = "fade";
        this.transitionMode = "out-in";
      }
    }
  }
};
</script>
<style lang="scss">

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

.info-in-leave-active, .info-out-enter-active {
  transition: all .5s ease;
}

.info-in-leave-to, .info-out-enter {
  opacity: 0;
}

</style>
