<template>
<div class="home__container">
   <transition name="fade">
      <div class="home__progress-bar progress-bar" v-if="imagesLoaded==false"></div>
      </transition>
 <div class="home__ui-right">
   <div class="ui-right__logo"> 
       <img src="../assets/mode_sq_blk.svg">
    </div>
    <router-link href="#" id="info-btn" class="info__link" to="/info"><h3>Info</h3></router-link>
    <social-icons></social-icons>
 </div>
  <div class="projects">
    <transition name="fade" appear mode="out-in">
      <div class="projects__grid" v-if="showContent">
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
  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import $ from "jquery";
import ProjectThumb from "./Projects/ProjectThumb.vue";
import SocialIcons from "./Shared/SocialIcons.vue";
import { responsiveUtils } from "./Mixins/responsiveMixin";

export default {
  mixins: [responsiveUtils],
  components: {
    projectThumb: ProjectThumb,
    socialIcons: SocialIcons
  },
  data() {
    return {
      layoutSize: null,
      resizing: false,
      contentOn: false,
      imagesLoadedCount: 0,
      gridLayoutLrg: [
        "x-wide",
        "wide",
        "wide",
        "x-wide",
        "x-wide",
        "wide",
        "wide",
        "x-wide",
        "x-wide",
        "wide",
        "wide",
        "x-wide",
        "x-wide",
        "wide",
        "wide",
        "x-wide",
        "x-wide",
        "wide",
        "wide",
        "x-wide",
        "x-wide",
        "wide",
        "wide",
        "x-wide"
      ],
      imageURLs: []
    };
  },
  computed: {
    ...mapGetters({
      imagesLoaded: "homeImagesLoaded",
      introComplete: "introViewed"
    }),
    projects() {
      return this.$store.getters.projects;
    },
    featuredImages() {
      return this.$store.getters.featuredImages;
    },
    numProjects() {
      if (this.projects) return this.projects.length;
    },
    dataLoaded() {
      return this.$store.getters.dataLoaded;
    },
    showContent() {
      return this.imagesLoaded && this.introComplete;
    }
  },
  methods: {
    buildImageURLs() {
      //console.log(this.projects);
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

      for (let i = 0; i < this.featuredImages.length; i++) {
        let iLoc =
          "static/thumbs-" +
          this.gridLayoutLrg[i] +
          "-assets/" +
          this.imageRes +
          "/";

        imgs.push(iLoc + this.featuredImages[i]);
      }
      return imgs;
    },
    medImageGrid() {
      let imgs = [];

      for (let i = 0; i < this.featuredImages.length; i++) {
        let iWidth = i % 3 == 0 ? "x-wide" : "narrow";

        let iLoc = "static/thumbs-" + iWidth + "-assets/" + this.imageRes + "/";

        imgs.push(iLoc + this.featuredImages[i]);
      }
      return imgs;
    },
    smlImageGrid() {
      let imgs = [];

      for (let i = 0; i < this.featuredImages.length; i++) {
        let iLoc = "static/thumbs-x-wide-assets/" + this.imageRes + "/";

        imgs.push(iLoc + this.featuredImages[i]);
      }
      return imgs;
    },
    preloadImages() {
      console.log("preload");
      const queue = new createjs.LoadQueue();
      queue.on(
        "complete",
        function() {
          //this.imagesLoaded = true;
          setTimeout(() => {
            this.$store.commit("HOME_IMAGES_LOADED");
          }, 200);
          console.log("images loaded");
        }, this);
      queue.on("fileload",this.updateProgress, this);
      queue.loadManifest(this.imageURLs);
    },
    updateProgress(event) {
      const bar = $('.home__progress-bar');
      const progress = ++this.imagesLoadedCount/this.featuredImages.length;
      const item = event.item; 
      const type = item.type;
      //console.log(item);
      //console.log(type);
      TweenMax.to(bar, 0.2, { scaleX: progress })
    },
    scrollListener() {
      $(window).scroll(function() {
        const grid = $(".projects__grid");
        $(".projects__grid-item").each(function(el) {
          TweenMax.to(this, 1, { marginTop: "+=50" });
        });
        console.log("scroll");
      });
    },
    showLayout(delay) {
      const logo = $(".ui-right__logo img"),
        info = $("#info-btn"),
        social = $("#social"),
        tl_intro = new TimelineMax({ delay: delay, onComplete: () => {
          this.contentOn = true;
        } })
          .set(logo, { rotationY: -90, opacity: 0 })
          .set(info, { y: "-=20px", opacity: 0 })
          .set(social, { y: "-=20px", opacity: 0 })
          .to(logo, 1, { rotationY: 0, opacity: 1, ease: Power2.easeOut }, 0)
          .to(info, 1, { y: 0, opacity: 1, ease: Power2.easeOut }, 0.2)
          .to(social, 1, { y: 0, opacity: 1, ease: Power2.easeOut }, 0.4);
    }
  },
  /* resizeListener() {
      let that = this,
          resizeTimer;
      $( window ).resize(function(e) {
        that.resizing = true;
        resizeTimer = setTimeout(function() {
              that.resizing = false;
        }, 250);
      });
    }
  }, */
  created() {
    this.layoutSize = this.$store.getters.layoutSize;
  },
  mounted() {
    //console.log('show ' + this.showContent)
    if (this.showContent==true && this.contentOn==false) {
      this.showLayout(0.25);
    } else if ( this.dataLoaded && this.layoutSize ) {
      // data already loaded must have come via deeplink
      // load the homepage content
      this.buildImageURLs();
    }
  },
  watch: {
    dataLoaded: function(val) {
      if (val) {
        console.log('val ' + val);
        this.layoutSize = this.$store.getters.layoutSize;
        this.$nextTick(function() {
          this.buildImageURLs();
        });
      }
    },
    showContent: function(val) {
      console.log("watcher" + val);
      if (val && this.contentOn === false) {
        this.showLayout(0.5);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../style/mixins.scss";
@import "../style/_variables.scss";

.home__container {
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
  background-color: $body-bg;
  display: grid;
  width: 100%;
  max-width: $max-layout-width;
  grid: {
    template-columns: 1fr 14rem;
    template-rows: 14rem auto 14rem;
  }
  &.transitioning {
    position: fixed;
    overflow: hidden;
  }
}

.home__ui-right {
  position: fixed;
  width: 14rem;
  height: 100vh;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .ui-right__logo {
    margin-top: 4.5rem;
    width: 5rem;
    perspective: 200px;
    img {
      max-width: 100%;
      opacity: 0;
    }
  }
  .info__link {
    position: relative;
    text-decoration: none;
    margin-top: auto;
    margin-bottom: 2rem;
    opacity: 0;
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 0;
      width: 2px;
      height: 2rem;
      background: $mode-purple;
    }
    h3 {
      @include rotate-link();
    }
  }
  .social-icons {
    opacity: 0;
    margin-bottom: 5rem;
  }
}

.projects {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;

  .projects__grid {
    width: 100%;
    margin: 0 auto;
    padding-left: 5px;
    display: grid;
    grid: {
      template-columns: repeat(14, 1fr);
      auto-rows: 18rem;
      //gap: 0.75rem;
      gap: 5px;
    }
    @include bp(lrg) {
      grid-auto-rows: 20rem;
    }
    @include bp(xlrg) {
      grid-auto-rows: 28rem;
      //grid-gap: 1rem;
    }
    @include bp(huge) {
      grid-auto-rows: 34rem;
      //grid-gap: 1.4rem;
    }
  }
}
</style>