<template>
  <div id="preloader">
    <image-sequence
      directory="logo-reveal-black"
      filename="reveal_blk_"
      :numFrames="45"
      format="png"
      :doneFn="aniDone"
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
      Prop : 1
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

}
</style>