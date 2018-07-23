<template>
    <section :id="project.slug+'-full'" class="project__container">
      <transition name="fade">
        <div class="project__progress-bar progress-bar" v-if="contentLoaded==false"></div>
      </transition>
    <transition name="fade" appear mode="in-out">
      <project-menu v-if="showMenu" :key="$route.params.slug" :scrollPos="scrollPos"></project-menu>
    </transition>
      <div class="project__grid-wrapper" v-if="contentLoaded" :class="{menu: showMenu}">
        <div class="project__back-button">
          <router-link to="/" class="back-arrow"></router-link>
        </div>
       <!--  <div class="project__ui-left">
        <a class="ui-left__projects-btn" id="projects-btn" @click="toggleMenu"><span class="icon__plus"></span><h3>Projects</h3></a>   
        </div> -->
        <div class="project__ui-right">
         <!--  <div class="ui-right__logo">
          <img src="../../assets/mode_sq_blk.svg">
          </div> -->
        <a class="ui-right__projects-btn" id="projects-btn" @click="toggleMenu"><span class="icon__plus"></span><h3>Projects</h3></a>   
          <router-link href="#" id="info-btn" class="info__link" to="/info"><h3>Info</h3></router-link>
          <ul id="social" class="social-icons">
            <li id="twitter"></li>
            <li id="linkedin"></li>
            <li id="vimeo"></li>
            <li id="behance"></li>
          </ul>
        </div>
        <div class="project__hero-image" id="project-hero" :style="heroImg">
        </div>
        <div class="project__intro">
              <ul id="tags-roles" class="project__intro-tags">
                <li><h3>Role:</h3></li>
                <li v-for="role in project.project_info.roles">{{role.role}}</li>
              </ul>
          <ul id="tags-tech" class="project__intro-tags">
            <li><h3>Technology:</h3></li>
            <li v-for="technology in project.project_info.technologies">{{technology.technology}}</li>
          </ul>
          <ul id="tags-agency" class="project__intro-tags">
            <li><h3>Agency:</h3></li>
            <li>{{project.project_info.agency}}</li>
          </ul>
          <ul id="tags-year" class="project__intro-tags">
            <li><h3>Year:</h3></li>
            <li>{{project.project_info.year}}</li>
          </ul>
          <div id="project-title">
            <h1 id="main-title">{{ project.title }}</h1>
            <h2 id="subtitle">{{project.project_info.subtitle}}</h2>
          </div>
            <p id="overview-text" class="project__overview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet enim sit amet dolor mollis ultrices. Quisque volutpat, lorem a malesuada imperdiet, eros urna bibendum lorem, nec tempus velit justo in enim.</p>
        </div>
        <div class="project__project-content">
          <div class="content__block" v-for="block in project.project_media_content">
            <div class="video__container" v-for="vimeo in block.vimeo">
              <div class="video__caption">
                <h3>{{ vimeo.video_caption.caption_title }}</h3>
                <p>{{ vimeo.video_caption.caption }}</p>
              </div>
              <div class="video__container-inner">
                <iframe :src="'https://player.vimeo.com/video/'+vimeo.id" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
              </div>
            </div>
            <div class="image__container" v-for="(contentImage, i) in block.image_content_group" :key="i">
              <div class="image__caption" v-if="contentImage.image.image_class=='image__in-flow' && contentImage.image.image_caption">
                <h3>{{ contentImage.image.image_caption.caption_title }}</h3>
                <p>{{ contentImage.image.image_caption.caption }}</p>
              </div>
              <div :class="contentImage.image.image_class"
                  v-if="contentImage.image.image_class=='image__in-flow'">
                <img :src="contentImage.image.image_file">
              </div>
              <div  :class="contentImage.image.image_class" 
                    v-if="contentImage.image.image_class=='image__full-width'"
                    :style="{background: 'url(' + contentImage.image.image_file + ') no-repeat center/cover'}">
              </div>
            </div>
          </div>
        </div>
        <div class="project__footer"></div>
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { TimelineMax } from "gsap";
import $ from 'jquery';
import ProjectMenu from "./ProjectMenu";
export default {
  props: [],
  components: {
    projectMenu: ProjectMenu
  },
  data() {
    return {
      project: {},
      contentLoaded: false,
      queueLength: 1,
      imagesLoaded: 0,
      contentImages: [],
      gridTracks: 8,
      transitioning: true,
      showMenu: false,
      contentOn: false,
      scrollPos: 0
    };
  },
  computed: {
    ...mapGetters([
      'dataLoaded',
      'introViewed',
      'projects'
    ]),
    heroImg() {
      return {
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6)), url("static/heroes-assets/large/' +
          this.project.hero.image +
          '") no-repeat center/cover'
      }
    },
    showContent() {
      return this.contentLoaded && this.introViewed;
    }
  },
  methods: {
    revealContent(delay) {
      const wait = delay || 0.5;
      const tags1 = $("#tags-roles"),
            tags2 = document.getElementById("tags-tech"),
            tags3 = document.getElementById("tags-agency"),
            tags4 = document.getElementById("tags-year"),
            hero = document.getElementById("project-hero"),
            title = document.getElementById("main-title"),
            subtitle = document.getElementById("subtitle"),
            intro = document.getElementById("overview-text"), 
            projects = document.getElementById("projects-btn"),
            info = document.getElementById("info-btn"),
            social = document.getElementById("social"),
            twitter = document.getElementById("twitter"),
            linkedin = document.getElementById("linkedin"),
            vimeo = document.getElementById("vimeo"),
            behance = document.getElementById("behance");

        let tl_rightNav = new TimelineMax()
        .set(info, { y: "-=50px", opacity: 0 })
        .set(projects, { y: "+=50px", opacity: 0 })
        .set(twitter, { y: "+=50px", opacity: 0 })
        .set(linkedin, { y: "+=50px", opacity: 0 })
        .set(vimeo, { y: "+=50px", opacity: 0 })
        .set(behance, { y: "+=50px", opacity: 0 })
        .to(info, 1, {y: 0, opacity: 1},0)
        .to(projects, 1, {y: 0, opacity: 1},0)
        .to(twitter, 1, {y: 0, opacity: 0.2},0.1)
        .to(linkedin, 1, {y: 0, opacity: 0.2}, 0.2)
        .to(vimeo, 1, {y: 0, opacity: 0.2}, 0.3)
        .to(behance, 1, {y: 0, opacity: 0.2}, 0.4)
        .set(twitter, { clearProps:"opacity" })
        .set(linkedin, { clearProps:"opacity" })
        .set(vimeo, { clearProps:"opacity" })
        .set(behance, { clearProps:"opacity" })

        let tl_reveal = new TimelineMax({delay: wait})
        .set(tags1, { x: "+=50px", opacity: 0 })
        .set(tags2, { x: "+=50px", opacity: 0 })
        .set(tags3, { x: "+=50px", opacity: 0 })
        .set(tags4, { x: "+=50px", opacity: 0 })
        .set(hero, { width: 0 })
        .set(title, { y: "+=50px" })
        .set(subtitle, { y: "+=50px" })
        .set(intro, { y: "+=50px", opacity: 0 })
        .to(tags1, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.5)
        .to(hero, 1, { width: '100%', ease: Power2.easeOut }, 0.25)
        .to(tags2, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.7)
        .to(tags3, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.8)
        .to(tags4, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.9)
        .add(tl_rightNav, 1)
        .to(title, 1, { opacity: 1, y: 0, ease: Power2.easeOut }, 1)
        .to(subtitle, 1, { opacity: 1, y: 0, ease: Power2.easeOut }, 1.1)
        .to(intro, 1, { opacity: 1, y: 0, ease: Power2.easeOut }, 1.2);

        this.contentOn = true;

    },
    extractImages() {
      this.contentImages = this.project.project_media_content.map(obj => ({
        imageGroups: obj.image_content_group
      }));
      for (let o of this.contentImages) {
        for (let i=0; i< o.imageGroups.length; i++) {
          this.queueLength++;
          console.log(this.queueLength)
        }
      }
      this.loadHero();
    },
    loadHero() {
      const queue = new createjs.LoadQueue();
      queue.on("complete", function() {
        console.log('hero loaded');
        this.imagesLoaded = 1;
        this.loadContent();
      }, this);
      let hero = 'static/heroes-assets/large/' + this.project.hero.image;
      queue.loadFile(hero);
    },
    loadContent() {
      const queue = new createjs.LoadQueue();
      const that = this;
      queue.on("complete", function() {
       this.$store.commit('PROJECT_IMAGES_LOADED');
      }, this);
      queue.on("fileload",this.updateProgress, this);
      //console.log(contentImages[0].imageGroups);
      if(this.contentImages) {
        for (let o of this.contentImages) {
          for (let i=0; i< o.imageGroups.length; i++) {
            //console.log(o.imageGroups[i].image);
            let url = o.imageGroups[i].image.image_file;
            let l = new createjs.LoadItem().set({src:url, crossOrigin:"http://localhost:8080"});
            queue.loadFile(l);
            //console.log("loading" + url)
          }
        }
      } else {
        console.log('no images to load');
        this.contentLoaded = true;
      }
    },
    updateProgress(event) {
      const bar = $('.project__progress-bar');
      const progress = ++this.imagesLoaded/this.queueLength;
      const item = event.item; 
      const type = item.type;
      //console.log(item);
      //console.log(type);
      TweenMax.to(bar, 0.2, { scaleX: progress, onComplete: this.checkProgress })
    },
    checkProgress() {
      if(this.imagesLoaded === this.queueLength) {
        console.log('finished loading');
        this.contentLoaded = true;
        console.log('reveal')
      }
    },
    introAni() {
      let reveal = document.querySelectorAll(".project__reveal");
      let ani = new TimelineMax({ delay: 0.5 }).to(reveal, 1, {
        x: "-=100%",
        ease: Power4.easeInOut
      });
    },
    toggleMenu() {
      if(!this.showMenu) {
        this.scrollPos = $(document).scrollTop();
        console.log(this.scrollPos + ' scrollpos')
        //$('body').css({top: this.scrollPos});
        $('body').toggleClass("menu-open");
        this.showMenu = !this.showMenu;
      } else if (this.showMenu) {
        $('body').toggleClass("menu-open");
        this.showMenu = !this.showMenu;
        $(document).scrollTop(this.scrollPos);
      }
    }
  },
  created() {
    if (this.$store.getters.dataLoaded) {
      this.project = this.$store.getters.currentProject;
    }
  },
  mounted() {
    if (this.project && this.dataLoaded) {
      this.$nextTick(function() {
        this.extractImages();
      });
    } else {
      this.deepLink = true;
      console.log("deeplink - wait for data");
    }
  },
  watch: {
    dataLoaded: function(val) {
      if (val == true && this.deepLink == true) {
        // get the slug from $route
        // find the index and set current project
        // then load
        const slug = this.$route.params.slug;
        const selectedIndex = this.projects.findIndex( el => el.slug == slug );
        console.log(selectedIndex)
        console.log(this.projects)
        console.log(slug)
        if(selectedIndex !== -1) {
          this.$store.dispatch('setCurrent', selectedIndex);
          this.project = this.projects[selectedIndex];
          this.$nextTick(function() {
            this.extractImages();
          });
        } else {
          //unknown route
          console.log("unknown route")
          this.$router.push("/");
        }
      }
    },
    showContent: function(val) {
      if (val && this.contentOn === false) {
        this.$nextTick(this.revealContent);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../style/_variables.scss";
@import "../../style/mixins.scss";
body.menu-open {
    overflow: hidden;
    position: absolute;
    height: 100vh;
}
@mixin caption-styles() {
  h3 {
    text-transform: uppercase;
    color: $mode_purple;
    font-size: 0.8rem;
    letter-spacing: 2px;
    margin-top: 1.2rem;
    line-height: 1.4;
  }
  p {
    font-size: 0.9rem;
    padding-top: 0.5rem;
    letter-spacing: 1px;
    line-height: 1.4;
  }
}

.project__container {
  position: relative;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background: none;
  //z-index: 100;
  overflow-x: hidden;

  .grid-background__fixed {
    position: fixed;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    span {
      border-left: 1px solid #eee;
    }
  }
  .project__grid-wrapper {
    position: relative;
    display: grid;
    text-align: left;
    grid: {
      template-columns: repeat(16, 1fr);
      template-rows: [header-start] 5rem [header-end intro-start] 70vh
        [intro-end project-content-start] auto [project-content-end
        footer-start] 14rem [footer-end];
    }
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    color: $mode-text;
    background: none;
    h1,h2 {
        font-family: "GT-Sectra";
        color: #111;
      }
    &.menu {
     //height: 100vh;
      overflow: hidden;
    }
    h3 {
      font-family: "Apercu-Medium";
    }
    .project__back-button {
      position: relative;
      grid-column: 1/span 1;
      grid-row: 1/span 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .back-arrow {
        position: relative;
        display: block;
        width: 28px;
        height: 12px;
        background: url('../../assets/back_arrow.svg') no-repeat left top/ 100% 100%;
      }
    }
  
    .project__ui-right {
      position: fixed;
      width: 10rem;
      height: 94vh;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      z-index: 100;
      /* .ui-right__logo {
        width: 5rem;
        height: auto;
        img {
          width: 100%;
        }
      } */
      .info__link {
        position: relative;
        text-decoration: none;
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
      .icon__plus {
        &:before, &:after {
          position: absolute;
          left: 15px;
          content: " ";
          height: 13px;
          width: 2px;
          background-color: $mode-purple;
        }
        &:after {
          transform: rotate(90deg);
        }
      }
      .ui-right__projects-btn {
        position: relative;
        display: block;
        width: 32px;
        height: 32px;
        margin-top: 2rem;
        text-decoration: none;
        margin-bottom: auto;
        opacity: 0.5;
        user-select: none;
        cursor: pointer;
        h3 {
          @include rotate-link();
          margin-top: 2.1rem;
        }
        &:hover {
          opacity: 1;
        }
      }
      .social-icons {
        margin-top: 2rem;
        li {
          list-style: none;
          width: 22px;
          height: 20px;
          margin-top: 1rem;
          opacity: 0.2;
          transition: opacity 0.2s ease;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
          &:first-child {
            background: url("../../assets/twitter@2x.png") left top/100% no-repeat;
          }
          &:nth-child(2) {
            background: url("../../assets/linkedin@2x.png") left top/100% no-repeat;
          }
          &:nth-child(3) {
            background: url("../../assets/vimeo@2x.png") left top/100% no-repeat;
          }
          &:nth-child(4) {
            background: url("../../assets/behance@2x.png") left top/100% no-repeat;
          }
        }
      }
    }
    .project__hero-image {
      position: relative;
      grid-column: 1/span 8;
      grid-row: 2/intro-end;
    }
    .project__intro {
      position: relative;
      grid-column: 7/ -2;
      grid-row: intro-start/intro-end;
      display: grid;
      grid: {
        template-columns: repeat(9, 1fr);
        template-rows: [tags-start] auto [tags-end title-start] auto [title-end
          overview-start] auto [overview-end];
        gap: 0;
      }

      .project__intro-tags {
        position: relative;
        list-style: none;
        grid-row: tags-start / tags-end;

        &:before {
          content: "";
          position: absolute;
          width: 2rem;
          height: 2px;
          background-color: $mode-purple;
        }
        li {
          font-size: 0.9rem;
          padding-top: 0.5rem;
          letter-spacing: 1px;
          &:first-child {
            margin-top: 0.5rem;
          }
          h3 {
            text-transform: uppercase;
            color: $mode-purple;
            font-size: 0.7rem;
            letter-spacing: 2px;
          }
        }
        &:first-child {
          grid-column: 4/ span 2;
        }
        &:nth-child(2) {
          grid-column: 5/ span 2;
          margin-top: 9rem;
        }
        &:nth-child(3) {
          grid-column: 7/ span 2;
          margin-top: 3rem;
        }
        &:nth-child(4) {
          grid-column: 8/ span 2;
          margin-top: 12rem;
        }
      }
      #project-title {
        grid-column: 1/-2;
        grid-row: title-start / title-end;
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        align-content: center;
        h1 {
          font-size: 6.75rem;
          line-height: 7rem;
          grid-column: 1/-1;
          grid-row: 1/span 1;
          margin-bottom: 4rem;
          color: $mode_text;
          opacity: 0;
        }
        h2 {
          font-size: 3rem;
          line-height: 3.5rem;
          grid-column: 4/ -1;
          grid-row: 2/span 1;
          color: $mode_text;
          opacity: 0;
        }
      }
      .project__overview {
        grid-column: 4/ -2;
        grid-row: -2/-1;
        padding-top: 2rem;
        padding-right: 1rem;
        line-height: 2.2rem;
        font-size: 1.1rem;
        letter-spacing: 1px;
      }
    }
    .project__project-content {
      grid-column: 1/-1;
      grid-row: project-content-start/project-content-end;
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      grid-row-gap: 4rem;
      .content__block {
        grid-column: 1/-1;
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-row-gap: 6rem;
        &:first-of-type {
            margin-top: 12rem;
          }
        .video__container { 
          grid-column: 1/-1;
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          grid-row-gap: 2rem;
          
          .video__container-inner {
            grid-column: 4/span 10;
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden; 
            max-width: 100%; 
            @include content-shadow();
            iframe , object, embed {
              position: absolute;
              width: 100%;
              height: 100%;
              
            }
          }
          .video__caption {
            grid-column: 3/span 4;
            margin: 0;
            @include rule-above();
            @include caption-styles();
          }
        } 
        .image__container {
          grid-column: 1/-1;
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          grid-row-gap: 2rem;
          .image__in-flow {
            grid-column: 4/span 10;
            @include content-shadow();
            img {
              width: 100%;
              display: block;
            }
          }
          .image__caption {
            grid-column: 3/span 4;
            margin: 0;
            @include rule-above();
            @include caption-styles();
          }
          .image__full-width {
            grid-column: 1/-1;
            height: 48rem;
            margin: 8rem 0;
            img {
              max-width: 100%;
            }
          }
        }
      }
    }
    .project__footer {
      grid-column: 1/-1;
      grid-row: footer-start/footer-end;
      background: rgba(#eee, 0.5);
      margin-top: 8rem;
    }
  }
}

.stage-right-enter-active {
  transition: all 0.5s ease;
}
.stage-right-leave-active {
  transition: all 0.5s ease;
}
.stage-right-enter {
  position: fixed;
  top: 0;
  left: 100%;
  min-height: 100%;
}
.stage-right-enter-to {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
}
.stage-right-leave-to {
  position: absolute;
  top: 0;
  left: -100%;
  min-height: 100%;
}

.tags-ani-enter-active {
  transition: all 0.5s ease-out;
}
.tags-ani-leave-active {
  transition: all 0.5s ease-in;
}
.tags-ani-enter {
  transform: translateX(50px);
  opacity: 0;
}
</style>