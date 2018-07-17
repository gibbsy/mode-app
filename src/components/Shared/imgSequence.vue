<template>
  <div class="preloader--image-sequence">
    <img :src="currentSrc" v-if="ready"/>
  </div>
</template>

<script>
export default {
  props: {
    directory: String,
    filename: String,
    numFrames: Number,
    format: String,
    delay: Number,
    loop: {
      type: Boolean,
      default: false
    },
    doneFn: Function
  },
  data() {
    return {
      urls: [],
      progress: "Initializing",
      ready: false,
      currentSrc: "",
      fps: 30,
      done: false,
      requestAni: {}
    };
  },
  methods: {
    pushToArray(i) {
      let frameNum = this.padDigits(i, 5),
        imgName = this.filename + frameNum + "." + this.format,
        fullPath = "static/" + this.directory + "/" + imgName;
      this.urls.push(fullPath);
      if (i == this.numFrames - 1) {
        this.preload();
      }
    },
    preload() {
      //console.log("preload");
      const queue = new createjs.LoadQueue();
      queue.on(
        "complete",
        function() {
          this.loaded();
        },
        this
      );

      queue.loadManifest(this.urls);

      // todo add progress percentage
      // below from pxLoader implementation
      //comp.donePercent = Math.round((e.completedCount / e.totalCount)*100).toString() +'%';
    },
    loaded() {
      this.currentSrc = this.urls[this.currentFrame];
      this.ready = true;
      this.$nextTick(() => {
        this.animate();
      });
    },
    animate() {
      let currentTime = this.getTime(),
        fps = 30,
        currentFrame = 0,
        totalFrames = this.numFrames,
        comp = this;

      const aniLoop = time => {
        let delta = (time - currentTime) / 1000;

        currentFrame += delta * fps;

        let frameNum = Math.floor(currentFrame);

        if (frameNum < totalFrames - 2) {
          this.requestAni = window.requestAnimationFrame(aniLoop);
          this.currentSrc = this.urls[frameNum];
        } else {
          window.cancelAnimationFrame(this.requestAni);
          this.doneFn();
        }
        currentTime = time;
      }; 
      
      aniLoop(currentTime);
    },
    getTime() {
      if (window["performance"] && window["performance"]["now"]) {
        return window["performance"]["now"]();
      } else {
        return +new Date();
      }
    },
    padDigits(n, numDigits) {
      //prepend the frame number with zeroes eg '00001'
      let q = "";
      for (let p = 0; p < numDigits; p++) {
        q += "0";
      }
      let s = n.toString(),
        i = s.length,
        z = q.slice(0, numDigits - i);
      return z + s;
    },
    repeat(n) {
      //http://stackoverflow.com/questions/30452263/is-there-a-mechanism-to-loop-x-times-in-es6-ecmascript-6-without-mutable-varia
      return f => {
        Array(n)
          .fill()
          .map((_, i) => f(i));
      };
    }
  },
  created() {
    for (let i = 0; i < this.numFrames; i++) {
      this.pushToArray(i);
    }
  },
  beforeDestroy() {
    if (this.requestAni) {
      window.cancelAnimationFrame(this.requestAni);
      this.requestAni = undefined;
    }
  }
};
</script>

<style lang="scss">
.preloader--image-sequence {
  text-align: center !important;
  display: block;
  max-width: 100%;
  width: 150px;
  perspective: 500px;
  img {
    display: block;
    margin: 0;
    width: 100%;
  }
}

</style>