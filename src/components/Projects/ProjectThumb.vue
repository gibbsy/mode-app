<template>
  <div :id="project.slug" :class="colWidth" @click="viewProject(index, project)">
    <div class="overlay-panel">  
      <div class="overlay-bg"></div>
      <div class="item-info">
        <h1 class="project-title">{{ project.title }}</h1>
        <h2 class="client-name">{{ project.custom_fields.client }}</h2>

      </div>
    </div>
    <img :src="imgPath">
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['project', 'myWidth', 'myHeight', 'index', 'res', 'gridInit'],
  data() {
    return {
      reveal : false,
      offsetPos: {top: null},
      scrollPadding: 150,
      delay: 0
    }
  },
  computed: {
    colWidth() {
      if ( !this.reveal ) {
        return {
          'item item--narrow hidden': this.myWidth == 'narrow',
          'item item--wide hidden': this.myWidth == 'wide',
          'item item--x-wide hidden': this.myWidth == 'x-wide'
        }
      } else { 
        return {
        'item item--narrow': this.myWidth == 'narrow',
        'item item--wide': this.myWidth == 'wide',
        'item item--x-wide': this.myWidth == 'x-wide'
        }
      }
    },
    imgPath() {
      return 'static/thumbs-' + this.myWidth + '-assets/' + this.res + '/' + this.project.featured_image;
    },
    windowScrolled() {
      return this.$store.getters.scrollPos;
    },
    viewportHeight() {
      return this.$store.getters.viewportHeight;
    },
    inView() {
      return this.windowScrolled - this.scrollPadding > this.offsetPos.top - this.viewportHeight;
    }
  },
  methods: {
    showImmediately() {
      let t = this.index*200,
      that = this;
      window.setTimeout(function(){
        that.showImage();
      }, t);
    },
    revealOnScroll() {
      let that = this;
      window.setTimeout(function(){
        that.showImage();
      }, this.delay);
    },
    showImage() {
      let id = '#' + this.project.slug;
      $(id).removeClass('hidden');
      this.reveal = true;
    },
    viewProject(index, project) {
      this.$store.dispatch('setCurrent', index);
      this.$router.push('/project/' + project.slug);
    },
    getElCoords() {
      this.offsetPos = $('#'+this.project.slug).offset();
      this.delay = this.offsetPos.left / 2;
    },
    checkInView() {
      if(this.windowScrolled - this.scrollPadding > this.offsetPos.top - this.viewportHeight) {
         this.showImmediately();
      }
    }
  },
  watch: {
    gridInit: function(val) {
      if(val) {
        this.getElCoords();
        this.checkInView();
      }
    },
    inView: function(val) {
      if(val) {
        this.revealOnScroll();
      }
    }
  }
}
</script>

<style lang="scss">
.hidden {
  img {  
    opacity: 0;
  }
}
.item-info {
  position: absolute;
  text-align: left;
  padding: 18em 2em 2em 2em;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  h1 {
    font-size: 1.5em;
    color: #f0f0f0;
    padding: 5px 0;
    max-width: 100%;
  }
  h2 {
    font-size: 1em;
    color: #f0f0f0;
    max-width: 100%;
  }
}
.item:hover > .overlay-panel {
  opacity: 0.9;
}

.overlay-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #111;
  opacity: 0.7;
  border: 8px solid #33007e;
  box-sizing: border-box;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#8b4be9+0,1b7af1+100 */
  background: #33007e; /* Old browsers */
  background: -moz-linear-gradient(45deg, #33007e 0%, #1b7af1 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(45deg, #33007e 0%,#1b7af1 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(45deg, #33007e 0%,#1b7af1 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8b4be9', endColorstr='#1b7af1',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  
}
.overlay-panel {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>