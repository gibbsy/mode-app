<template>
  <div id="intro">
    <transition name="fade">
      <div class="intro__progress-bar progress-bar" v-if="loadingFrames"></div>
    </transition>
    <image-sequence
      directory="logo-reveal-black"
      filename="reveal_blk_"
      :numFrames="45"
      format="png"
      v-on:update-progress="updateProgress($event)"
      v-on:loaded-frames="loadingFrames = false"
      v-on:animation-done="aniDone = true"
    ></image-sequence>
  </div>
</template>

<script>
import $ from 'jquery';
import ImgSequenceIntro from './imgSequenceIntro';
export default {
  props: ['parentReady'],
  components: {
    imageSequence: ImgSequenceIntro
  },
  data() {
    return {
      loadingFrames: true,
      aniDone: false
    }
  },
  computed: {
    appReady() {
      return this.aniDone & this.parentReady;
    }
  },
  methods: {
    animateOut() {
      const logo = $('.intro__image-sequence img');
      TweenMax.to(logo, 1, { 
                rotationY: 90, 
                opacity: 0.2, 
                ease: Power2.easeIn, 
                onComplete: () => {
                  // tell parent we're done
                  this.$emit('intro-complete')
                },
                delay: 1
              })
    },
    updateProgress(progress) {
      const bar = $('.intro__progress-bar');
      TweenMax.to(bar, 0.2, { scaleX: progress })
    }
  },
  watch: {
    appReady: function(val) {
      if (val) {
        this.animateOut();
      }
    }
  }
}
</script>

<style lang="scss">
#intro {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1000;
}
</style>