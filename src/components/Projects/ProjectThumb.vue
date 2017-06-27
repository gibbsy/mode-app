<template>
  <div :id="project.slug" :class="colWidth" @click="viewProject(index, project)">
    <div class="overlay-panel"></div>
    <div class="item-info">
      <h1 class="project-title">{{ project.title }}</h1>
      <h2 class="client-name">{{ project.custom_fields.client }}</h2>
    </div>
    <img :src="imgPath">
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['project', 'width', 'index', 'res'],
  data() {
    return {
      reveal : false
    }
  },
  methods: {
    revealTimer() {
      let t = this.index*200 + 500,
      that = this;
      window.setTimeout(function(){
        that.showImage();
        console.log('removed');
      }, t);
    },
    showImage() {
      let id = '#' + this.project.slug;
      $(id).removeClass('hidden');
      this.reveal = true;
    },
    viewProject(index, project) {
      this.$store.dispatch('setCurrent', index);
      this.$router.push('/project/' + project.slug);
    }
  },
  computed: {
    colWidth() {
      if ( !this.reveal ) {
        return {
          'item item--narrow hidden': this.width == 'narrow',
          'item item--wide hidden': this.width == 'wide',
          'item item--x-wide hidden': this.width == 'x-wide'
        }
      } else { 
        return {
        'item item--narrow': this.width == 'narrow',
        'item item--wide': this.width == 'wide',
        'item item--x-wide': this.width == 'x-wide'
        }
      }
    },
    imgPath() {
      return 'static/thumbs-' + this.width + '-assets/' + this.res + '/' + this.project.featured_image;
    }
  },
  mounted() {
    this.revealTimer();
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
  padding: 2em;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  h1 {
    font-size: 1.8em;
    color: #f0f0f0;
    padding: 5px 0;
    max-width: 100%;
  }
  h2 {
    font-size: 1.2em;
    color: #f0f0f0;
    max-width: 100%;
  }
}
.overlay-panel {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #111;
  opacity: 0.2;
}
</style>