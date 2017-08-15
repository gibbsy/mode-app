<template>
  <div id="contents-outer-container">
  <transition 
    name="stage-right" 
    appear mode="out-in"
    v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave">
    <router-view></router-view>
  </transition>
      <!-- <h1>Layout size is {{ layoutSize }}</h1>
       <h1>Viewportwidth is {{ viewportWidth }}</h1>
       <h1>Screen Density is {{ screenDensity }}</h1>
       <h1>Image res is {{ imageRes }}</h1> -->
 <preloader v-if="!dataLoaded || !imagesLoaded || gridRecalculating"></preloader>    
 <div id="projects-thumbs-container">
 <transition name="fade" appear mode="out-in">
   <section id="project-thumbs-lrg" v-if="layoutSize=='lrg' && imagesLoaded">
      <project-thumb 
       v-for="(project, index) in projects"
       :project="project" 
       :key="index" 
       :index="index" 
       :myWidth="gridLayoutLrg[index]"
       :myHeight="thumbHeight"
       :res="imageRes"
       :gridReady="gridReady">
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
       :myWidth="index % 3 == 0 ? 'wide' : 'narrow'"
       :myHeight="thumbHeight"
       :res="imageRes"
       :gridReady="gridReady">
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
       :myWidth="'x-wide'"
       :myHeight="thumbHeight"
       :res="imageRes"
       :gridReady="gridReady">
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
import Preloader from '../Shared/Preloader.vue';
import { responsiveUtils } from '../Mixins/responsiveMixin';

export default {
  mixins: [ responsiveUtils ],
  components: {
    projectThumb: ProjectThumb,
    preloader: Preloader
  },
  data() {
    return {
    grid: false,
    gridReady: false,
    packeryInit: false,
    gridRecalculating: false,
    resizing: false,
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
    imageCache: {
      'lrg': false,
      'med': false,
      'sml': false
    },
    loaded: 0,
    thumbHeight: null
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
    dataLoaded() {
      return this.$store.getters.isLoaded;
    },
    layoutReady() {
      // new prop to show / hide grid on resize
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
      //console.log('loaded ' + url );
      if (++this.loaded === l ) {
        this.triggerLayout();
      }
    },
    triggerLayout() {
      let that = this;
      this.imagesLoaded = true;
      this.imageCache[this.layoutSize] = true;
      console.dir(this.imageCache);
      this.$nextTick(function() {
        that.setThumbHeight();
      })
    },
    setThumbHeight() {
      let cWidth = $('#projects-thumbs-container').innerWidth(),
          wThumb = this.layoutSize == 'lrg' ? cWidth*(3/7) : cWidth,
          hThumb = this.layoutSize == 'lrg' ? wThumb*(9/16)-12 : wThumb*(1/2.32)-12;
          //console.log(hThumb);
          this.thumbHeight = hThumb;
          $('.item').height(hThumb);
          this.$nextTick(function() {
            if ( !this.gridReady )
              this.initGrid();
              else console.log('already init grid');
          })
    },
    initGrid() {  
      if(!this.grid) {
      let elem = document.getElementById('projects-thumbs-container');
      this.grid = new Packery( elem, {
            itemSelector: '.item',
            gutter: 0,
            transitionDuration: 0,
            percentPosition: true
        });
    } else {
      this.grid.reloadItems();
    }

      if (this.gridRecalculating == true) {
        let that = this;
        setTimeout(function() {   
         that.gridRecalculating = false;
         that.gridReady = true;
         that.packeryInit = true;
         that.updateGrid();
        },1200);
      } else {
        this.gridReady = true;
        this.packeryInit = true;
      }
     
    },
    updateGrid() {
      // called after window resize
      this.setVWidth();
      this.setVHeight();
      this.setThumbHeight();
      this.grid.layout();
    },
    /*reloadGrid() {
      // called after dom updates
      this.grid.reloadItems();
      this.gridReady = true;
      //this.updateGrid();
      let that = this;
      let showGrid = setTimeout(function() {   
       that.gridRecalculating = false;
      },2000);
    },*/
    resizeListener() {
      let that = this,
          resizeTimer;
      $( window ).resize(function(e) {
        that.resizing = true;
        resizeTimer = setTimeout(function() {
              that.resizing = false;
        }, 250);
        if(!that.gridRecalculating && that.packeryInit) {  
          that.updateGrid(); 
        }
      });
    },
    afterEnter() {
      console.log('projectView')
      this.$store.dispatch('setProjectView', true);
    },
    beforeLeave() {
      console.log('homeView')
       this.$store.dispatch('setProjectView', false);
    },
    resetGrid() {
      /*this.grid.destroy();
      this.grid = {};*/
      this.gridReady = false;
      this.imagesLoaded = false;
      this.packeryInit = false;
      this.setVWidth();
      this.setVHeight();
      this.checkImageCache();
    },
    checkImageCache() {
      // see if required images are already cached if not commence loading
      if (!this.imageCache[this.layoutSize]) {  
        this.imageURLs = [];
        this.loaded = 0;
        this.buildImageURLs();
      } else {
        this.triggerLayout();
      }
    }
  },
  created() {
    this.setVWidth();
    this.setVHeight();
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
    },
    layoutSize: function(val) {
      if(this.packeryInit) {  
        console.log('layout size is ' + val + '... watching');
        // reset grid if the layout size changes
        this.gridRecalculating = true;
        this.resetGrid();
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/mixins.scss';

#contents-outer-container {
  width: 100%;
  display: block;

  #projects-thumbs-container {
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
  cursor: pointer;
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    overflow: hidden;
    transition: opacity 1s ease;
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