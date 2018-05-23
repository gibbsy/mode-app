<template>
  <div :id="project.slug" :class="colWidth" @click="viewProject(index, project)">
    <div class="project__info--bg-image" :style="bgImage"></div>
    <div class="project__info">  
      <div class="project__info--contents" v-if="project.project_info.client">
        <h1 class="project__info--title">{{ project.title }}</h1>
        <h2 class="project__info--client">{{ project.project_info.client }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['project', 'myWidth', 'index', 'res'],
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
          'project__thumbnail--narrow hidden': this.myWidth == 'narrow',
          'project__thumbnail--wide hidden': this.myWidth == 'wide',
          'project__thumbnail--x-wide hidden': this.myWidth == 'x-wide',
          'projects__grid-item': true
        }
      } else { 
        return {
        'project__thumbnail--narrow': this.myWidth == 'narrow',
        'project__thumbnail--wide': this.myWidth == 'wide',
        'project__thumbnail--x-wide': this.myWidth == 'x-wide',
        'projects__grid-item': true
        }
      }
    },
    imgPath() {
      return 'static/thumbs-' + this.myWidth + '-assets/' + this.res + '/' + this.project.featured_image;
    },
    bgImage() {
      return { background: 'url(' + this.imgPath + ') no-repeat center/cover, #eaeaea' }
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
  mounted() {
    //console.log(this.project);
    this.getElCoords();
    this.checkInView();
  },
  watch: {
    inView: function(val) {
      if(val) {
        this.revealOnScroll();
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/mixins.scss';
@import '../../style/_variables.scss';

@mixin grid-item() {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: opacity 1s ease;
  &:hover > .project__info {
    opacity: 1;
  }
  &:hover > .project__info--bg-image {
    filter: blur(4px);
  }
  &.hidden { 
    opacity: 0;
  }
}
.project__thumbnail--wide {
  @include grid-item();
  grid-column-end: span 14;
  @include bp(med) {
    grid-column-end: span 7;
  }
  @include bp(lrg) {  
    grid-column-end: span 6;
  }
}
.project__thumbnail--x-wide {
  @include grid-item();  
  grid-column-end: span 14;
  @include bp(med) {
    grid-column-end: span 7;
  }
  @include bp(lrg) { 
    grid-column-end: span 8;
  }
}
.project__thumbnail--narrow {
  @include grid-item();
    grid-column-end: span 14;
  @include bp(med) {
    grid-column-end: span 7;
  }
  @include bp(lrg) {
    grid-column-end: span 4;
  }
}
.project__info--bg-image {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height:100%;
  z-index: 0;
}
.project__info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  border: 8px solid rgba($mode-purple, 0.6);
  background: $mode-purple; 
  background: linear-gradient(45deg, rgba($mode-purple, 0.6) 0%, rgba($mode-blue, 0.6) 100%);
  z-index: 1;

  .project__info--contents {
  text-align: left;
  padding: 2em;
  h1 {
    font-size: 1.5em;
    color: #f0f0f0;
    max-width: 100%;
  }
  h2 {
    font-size: 1em;
    color: #f0f0f0;
    max-width: 100%;
    margin-top: 8px;
  }
}
}
</style>