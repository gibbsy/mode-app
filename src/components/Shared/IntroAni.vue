<template>
  <div id="preloader">
    <div class="progress-bar" v-if="loadingFrames"></div>
    <image-sequence
      directory="logo-reveal-black"
      filename="reveal_blk_"
      :numFrames="45"
      format="png"
      :doneFn="aniDone"
      v-on:update-progress="updateProgress($event)"
      v-on:loaded-frames="loadingFrames = false"
    ></image-sequence>
  </div>
</template>

<script>
import $ from 'jquery';
import ImgSequence from './imgSequence';
export default {
  props: ["doneFn"],
  components: {
    imageSequence: ImgSequence
  },
  data() {
    return {
      loadingFrames: true
    }
  },
  methods: {
    aniDone() {
      const logo = $('.preloader--image-sequence img');
      TweenMax.to(logo, 1, { 
                rotationY: 90, 
                opacity: 0.2, 
                ease: Power2.easeIn, 
                onComplete: () => {
                  // tell parent we're done
                  this.$emit('preload-done')
                },
                delay: 1
              })
    },
    updateProgress(progress) {
      const bar = $('.progress-bar');
      TweenMax.to(bar, 0.2, { scaleX: progress })
    }
  }
}
</script>

<style lang="scss">
#preloader {
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
  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #000;
    transform-origin: 0 0;
    transform: scaleX(0);
  }
}
</style>