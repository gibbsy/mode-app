<template>
  <div id="projects-outer-container">
  <transition name="fade" appear mode="out-in">
    <router-view></router-view>
  </transition>
      <!--  <h1>Layout size is {{ layoutSize }}</h1>
       <h1>Viewportwidth is {{ viewportWidth }}</h1>
       <h1>Screen Density is {{ screenDensity }}</h1>
       <h1>Image res is {{ imageRes }}</h1> -->
       <div id="projects-inner-container" v-if="contentLoaded">
       <transition name="fade" appear mode="out-in">
         <section id="project-thumbs-lrg" v-if="layoutSize=='lrg' && imagesLoaded">
            <project-thumb 
             v-for="(project, index) in projects"
             :project="project" 
             :key="index" 
             :index="index" 
             :width="gridLayoutLrg[index]"
             :res="imageRes">
            </project-thumb>
         </section>
        </transition>
        <transition name="fade" appear mode="out-in">
         <section id="project-thumbs-med" v-if="layoutSize=='med' && imagesLoaded">
            <project-thumb 
             v-for="(project, index) in projects"
             :project="project" 
             :key="index" 
             :index="index" 
             :width="index % 3 == 0 ? 'wide' : 'narrow'"
             :res="imageRes">
            </project-thumb>
         </section>
         </transition>
         <transition name="fade" appear mode="out-in">
         <section id="project-thumbs-sml" v-if="layoutSize=='sml' && imagesLoaded">
            <project-thumb 
             v-for="(project, index) in projects"
             :project="project" 
             :key="index" 
             :index="index" 
             :width="'x-wide'"
             :res="imageRes">
            </project-thumb>
         </section>
         </transition>
      </div>
 <!--      <section>
        <p>{{projects}}</p> 
      </section> -->
  </div>
</template>

<script>
import $ from 'jquery';
import Packery from 'packery';
import LazyLoad from 'vanilla-lazyload';
import ProjectThumb from './ProjectThumb.vue';
import { responsiveUtils } from '../Mixins/responsiveMixin';

export default {
  mixins: [ responsiveUtils ],
  components: {
    projectThumb: ProjectThumb
  },
  data() {
    return {
    ready: false,
    grid: {},
    gridInitialized: false,
    gridLayoutLrg : ['x-wide', 'wide',
                  'wide', 'x-wide',
                  'narrow', 'wide', 'narrow',
                  'narrow', 'narrow', 'wide',
                  'x-wide', 'wide',
                  'narrow', 'narrow', 'wide',
                  'wide', 'x-wide',
                  'wide','narrow', 'narrow',
                  'narrow', 'wide', 'narrow',
                  'x-wide', 'wide',
                  'wide', 'x-wide',
                  'narrow', 'wide', 'narrow',
                  'narrow', 'narrow', 'wide',
                  'x-wide', 'wide',
                  'wide', 'x-wide',
                  'wide','narrow', 'narrow',
                  'narrow', 'wide', 'narrow'
                  ],
    imagesLoaded: false,
    imageURLs: [],
    loaded: 0
    }
  },
  computed: {
    projects() {
      return this.$store.getters.projects;
    },
    featuredImages() {
      return this.$store.getters.featuredImages;
    },
    numProjects() {
      if (this.projects) 
        return this.projects.length;
    },
    contentLoaded() {
      return this.$store.getters.isLoaded;
    }
  },
  methods: {
    buildImageURLs() {
      switch(this.layoutSize) 
      {
        case 'lrg':
          this.imageURLs = this.lrgImageGrid();
          break;
        case 'med':
          this.imageURLs = this.medImageGrid();
          break;
        case 'sml':
          this.imageURLs = this.smlImageGrid();
          break;

        default: 
          console.log('error building array');
      }

      this.preloadImages();

    },
    lrgImageGrid() {
      let imgs = [];

       for (let i=0; i<this.featuredImages.length; i++) {

        let iLoc = 'static/thumbs-'+ this.gridLayoutLrg[i] +'-assets/' + this.imageRes + '/';

        imgs.push(iLoc + this.featuredImages[i]);
      }
      return imgs;
    },
    medImageGrid() {
      let imgs = [];

      for (let i=0; i<this.featuredImages.length; i++) {

        let iWidth = i % 3 == 0 ? 'x-wide' : 'narrow';

        let iLoc = 'static/thumbs-'+ iWidth +'-assets/' + this.imageRes + '/';

        imgs.push(iLoc + this.featuredImages[i]);
      }
      return imgs;
    },
    smlImageGrid() {
      let imgs = [];

      for (let i=0; i<this.featuredImages.length; i++) {

        let iLoc = 'static/thumbs-x-wide-assets/' + this.imageRes + '/';

        imgs.push(iLoc + this.featuredImages[i]);
      }
      return imgs;
    },
    preloadImages() {

      let l = this.imageURLs.length;
      for (let i = 0; i < l; i++) {
          this.loadImage(this.imageURLs[i]);
      }
    },
    loadImage(url) {
      let img = $( new Image() ),
          that = this;

      img.on('load', function( event ) {
          that.checkProgress(url);
      })
      .prop( 'src', url );
    },
    checkProgress(url) {
      let l = this.imageURLs.length;
      console.log('loaded ' + url );
      if (++this.loaded === l ) {
        this.triggerLayout();
      }
    },
    triggerLayout() {
      let that = this;
      this.imagesLoaded = true;
      this.$nextTick(function() {
        that.setThumbHeight();
      })
    },
    setThumbHeight() {
      let cWidth = $('#projects-inner-container').innerWidth(),
          wThumb = this.layoutSize == 'lrg' ? cWidth*(3/7) : cWidth,
          hThumb = this.layoutSize == 'lrg' ? wThumb*(9/16)-12 : wThumb*(1/2.32)-12;
          console.log(hThumb);
          $('.item').height(hThumb);
          this.$nextTick(function() {
            if ( !this.gridInitialized )
              this.initGrid();
            //preloadImages(imgURLs, function() { callBack });
            else console.log('already init grid');
          })
    },
    initGrid() {  
      let elem = document.getElementById('projects-inner-container');
      this.grid = new Packery( elem, {
            itemSelector: '.item',
            gutter: 0,
            transitionDuration: 0,
            percentPosition: true
        });
      this.gridInitialized = true;
    },
    updateGrid() {
      this.grid.packery();
    },
    resizeListener() {
      let that = this;
      $( window ).resize(function() {
        that.setVWidth();
        that.setThumbHeight();
        that.updateGrid();
      });
    }
  },
  created() {
    this.setVWidth();
    this.resizeListener();
  },
  mounted() {

  },
  watch: {
    featuredImages: function(val) {
      if(val) {
        this.$nextTick(function() {
          this.buildImageURLs();
        });
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/mixins.scss';

#projects-outer-container {
  width: 100%;
  display: block;

  #projects-inner-container {
    width: 86%;
    margin: 0 auto;
    display: block;
    padding-bottom: 200px;
  }
}

.item {
  background: #eaeaea;
  border: 6px solid #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    overflow: hidden;
    transition: opacity 0.5s ease;
  }

}
.item.item--wide {
  @include bp(lrg) {  
    width: percentage(3/7);
  }
  //@include aspect-ratio(16,9);
}
.item.item--x-wide {
  @include bp(lrg) { 
    width: percentage(4/7);
  }
  //@include aspect-ratio(100,43.68932038835);
}
.item.item--narrow {
  @include bp(med) {
    width: calc(50% - 3px);
  }
  @include bp(lrg) {
    width: percentage(2/7);
  }
  //@include aspect-ratio(100, 87.378640776699);
}

</style>