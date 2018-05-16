<template>
  <div class="projects">
 <preloader v-if="!dataLoaded || !imagesLoaded || gridRecalculating"></preloader>    
  <transition name="fade" appear mode="out-in">
    <div class="projects__grid" v-if="imagesLoaded">
        <project-thumb 
        v-for="(project, index) in projects"
        :project="project" 
        :key="index" 
        :index="index" 
        :myWidth="gridLayoutLrg[index]"
        :res="imageRes">
        </project-thumb>
    </div>
  </transition>
  <router-view></router-view>
</div>
</template>

<script>
import $ from 'jquery';
import ProjectThumb from './projects/ProjectThumb.vue';
import Preloader from './Shared/Preloader.vue';
import { responsiveUtils } from './Mixins/responsiveMixin';

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
    gridLayoutLrg : [
                  'x-wide', 'wide',
                  'wide', 'x-wide',
                  'narrow', 'wide', 'narrow',
                  'narrow', 'narrow', 'wide',
                  'wide', 'x-wide',
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
      /* switch(this.layoutSize) 
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
      } */
      this.imageURLs = this.lrgImageGrid();
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
      this.imagesLoaded = true;
      this.imageCache[this.layoutSize] = true;
    },
    /* setThumbHeight() {
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
    }, */
    /* initGrid() {  
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
    }, */
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
        //console.log('layout size is ' + val + '... watching');
        // reset grid if the layout size changes
        this.gridRecalculating = true;
        this.resetGrid();
      }
    }
  }
}
</script>

<style lang="scss">
@import '../style/mixins.scss';
@import '../style/_variables.scss';

.projects {
  width: 100%;
  display: block;

  .projects__grid {
    width: 100%;
    margin: 0 auto;
    display: grid;
    padding-bottom: 200px;
    grid: {
      template-columns: repeat(14, 1fr);
      auto-rows: 18rem;
      gap: 0.75rem;
    }
    @include bp(lrg) {  
         grid-auto-rows: 20rem;
     }
      @include bp(xlrg) {  
         grid-auto-rows: 22rem;
         grid-gap: 1rem;
     }
      @include bp(huge) {  
          grid-auto-rows: 24rem;
          grid-gap: 1.4rem;
      }
  }
}


</style>