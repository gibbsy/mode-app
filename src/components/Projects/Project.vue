<template>
    <section :id="project.slug+'-full'" class="project-page__container">
      <div class="project-page__reveal" v-if="transitioning">
      <div id="reveal-1"></div><div id="reveal-2"></div><div id="reveal-3"></div><div id="reveal-4"></div><div id="reveal-5"></div>
    </div>
    <div class="grid-background__fixed" v-if="contentLoaded">
      <span v-for="track in gridTracks" :key="track"></span>
    </div>
    <transition name="fade" appear>
      <project-menu v-if="showMenu" :key="$route.params.slug"></project-menu>
    </transition>
      <div class="project-page__grid-wrapper" v-if="contentLoaded" :class="{menu: showMenu}">
        <div class="project-page__ui-right">
        <a class="ui-right__projects-btn" id="projects-btn" @click="toggleMenu"><span class="icon__plus"></span><h3>Projects</h3></a>   
          <a href="#" id="info-btn" class="info__link"><h3>Info</h3></a>
          <ul id="social" class="social-icons">
            <li id="twitter"></li>
            <li id="linkedin"></li>
            <li id="vimeo"></li>
            <li id="behance"></li>
          </ul>
        </div>
        <div class="project-page__hero-image" id="project-hero" :style="heroImg">
        </div>
        <div class="project-page__intro">
              <ul id="tags-roles" class="project-page__intro-tags">
                <li><h3>Role:</h3></li>
                <li v-for="role in project.project_info.roles">{{role.role}}</li>
              </ul>
          <ul id="tags-tech" class="project-page__intro-tags">
            <li><h3>Technology:</h3></li>
            <li v-for="technology in project.project_info.technologies">{{technology.technology}}</li>
          </ul>
          <ul id="tags-agency" class="project-page__intro-tags">
            <li><h3>Agency:</h3></li>
            <li>{{project.project_info.agency}}</li>
          </ul>
          <ul id="tags-year" class="project-page__intro-tags">
            <li><h3>Year:</h3></li>
            <li>{{project.project_info.year}}</li>
          </ul>
          <div id="project-title">
            <h1 id="main-title">{{ project.title }}</h1>
            <h2 id="subtitle">{{project.project_info.subtitle}}</h2>
          </div>
            <p id="overview-text" class="project-page__overview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet enim sit amet dolor mollis ultrices. Quisque volutpat, lorem a malesuada imperdiet, eros urna bibendum lorem, nec tempus velit justo in enim.</p>
        </div>
        <div class="project-page__project-content">
          <div class="content__block" v-for="block in project.project_media_content">
            <div class="video__container" v-for="vimeo in block.vimeo">
              <div class="video__container-inner">
                <iframe :src="'https://player.vimeo.com/video/'+vimeo.id" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
              </div>
              <div class="video__caption">
                <h3>{{ vimeo.video_caption.caption_title }}</h3>
                <p>{{ vimeo.video_caption.caption }}</p>
              </div>
            </div>
            <div class="image__container" v-for="(contentImage, i) in block.image_content_group" :key="i">
              <div :class="contentImage.image.image_class"
                  v-if="contentImage.image.image_class=='image__in-flow'">
                <img :src="contentImage.image.image_file">
              </div>
              <div class="image__caption" v-if="contentImage.image.image_class=='image__in-flow'">
                <h3>{{ contentImage.image.image_caption.caption_title }}</h3>
                <p>{{ contentImage.image.image_caption.caption }}</p>
              </div>
              <div  :class="contentImage.image.image_class" 
                    v-if="contentImage.image.image_class=='image__full-width'"
                    :style="{background: 'url(' + contentImage.image.image_file + ') no-repeat center/cover'}">
              </div>
            </div>
          </div>
        </div>
        <div class="project-page__footer"></div>
      </div>
    </section>
</template>

<script>
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
      imageUrls: [],
      contentLoaded: false,
      gridTracks: 16,
      transitioning: true,
      showMenu: false
    };
  },
  computed: {
    heroImg() {
      return {
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6)), url("static/heroes-assets/large/' +
          this.project.hero.image +
          '") no-repeat center/cover'
      }
    }
  },
  methods: {
    transitionIn() {
      console.log("transition");
      let that = this;
      let reveal1 = document.getElementById("reveal-1"),
        reveal2 = document.getElementById("reveal-2"),
        reveal3 = document.getElementById("reveal-3"),
        reveal4 = document.getElementById("reveal-4"),
        reveal5 = document.getElementById("reveal-5");

      let tl_transition = new TimelineMax({ onComplete: that.loadHero })
        .set(reveal5, { x: "-=100%" })
        .set(reveal3, { x: "-=100%" })
        .set(reveal2, { x: "-=100%" })
        .set(reveal4, { x: "-=100%" })
        .set(reveal1, { x: "-=100%" })
        .to(reveal5, 0.5, { x: "+=100%", ease: Power1.easeIn })
        .to(reveal4, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.1)
        .to(reveal3, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.2)
        .to(reveal2, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.3)
        .to(reveal1, 0.5, { x: "+=100%", ease: Power1.easeIn }, 0.5);
    },
    revealContent() {
      const that = this;
      const reveal1 = document.getElementById("reveal-1"),
            reveal2 = document.getElementById("reveal-2"),
            reveal3 = document.getElementById("reveal-3"),
            reveal4 = document.getElementById("reveal-4"),
            reveal5 = document.getElementById("reveal-5"),
            tags1 = $("#tags-roles"),
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

        let tl_reveal = new TimelineMax({delay: 0.5, onComplete: function() {
          that.transitioning = false;
        }})
        .set(tags1, { x: "+=50px", opacity: 0 })
        .set(tags2, { x: "+=50px", opacity: 0 })
        .set(tags3, { x: "+=50px", opacity: 0 })
        .set(tags4, { x: "+=50px", opacity: 0 })
        .set(hero, { x: "-=200px", opacity: 0 })
        .set(title, { y: "+=50px" })
        .set(subtitle, { y: "+=50px" })
        .set(intro, { y: "+=50px", opacity: 0 })
        .to(reveal1, 0.5, { x: "100%", ease: Power1.easeIn })
        .to(reveal2, 0.5, { x: "100%", ease: Power1.easeIn }, 0.1)
        .to(reveal3, 0.5, { x: "100%", ease: Power1.easeIn }, 0.2)
        .to(reveal4, 0.5, { x: "100%", ease: Power1.easeIn }, 0.3)
        .to(reveal5, 0.5, { x: "100%", ease: Power1.easeIn }, 0.5)
        .to(tags1, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.5)
        .to(hero, 1, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.25)
        .to(tags2, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.7)
        .to(tags3, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.8)
        .to(tags4, 0.75, { opacity: 1, x: 0, ease: Power2.easeOut }, 0.9)
        .add(tl_rightNav, 1)
        .to(title, 1, { opacity: 1, y: 0, ease: Power2.easeOut }, 1)
        .to(subtitle, 1, { opacity: 1, y: 0, ease: Power2.easeOut }, 1.1)
        .to(intro, 1, { opacity: 1, y: 0, ease: Power2.easeOut }, 1.2)

    },
    loadHero() {
      const queue = new createjs.LoadQueue();
      queue.on("complete", function() {
        console.log('hero loaded');
        this.loadContent();
      }, this);
      let hero = 'static/heroes-assets/large/' + this.project.hero.image;
      queue.loadFile(hero);
    },
    loadContent() {
      //this.$store.dispatch('setProjectView', true);
      const queue = new createjs.LoadQueue();
      const that = this;
      queue.on("complete", function() {
        console.log('finished loading');
        this.contentLoaded = true;
        console.log('reveal')
        this.$nextTick(function() {
          that.revealContent();
        })
      }, this);
      queue.on("fileload", this.handleFileLoad, this);

      const contentImages = this.project.project_media_content.map(obj => ({
        imageGroups: obj.image_content_group
      }));
      console.log(contentImages[0].imageGroups);
      if(contentImages) {
        for (let o of contentImages) {
          for (let i=0; i< o.imageGroups.length; i++) {
            //console.log(o.imageGroups[i].image);
            let url = o.imageGroups[i].image.image_file;
            let l = new createjs.LoadItem().set({src:url, crossOrigin:"http://localhost:8080"});
            queue.loadFile(l);
            console.log("loading" + url)
          }
        }
      } else {
        console.log('no images to load');
        this.contentLoaded = true;
        this.$nextTick(function() {
          this.revealContent();
        })
      }
    },
    handleFileLoad(event) {
     var item = event.item; 
     var type = item.type;
      console.log(item);
      console.log(type);
    },
    beforeLeave() {
      console.log("homeView");
      this.$store.dispatch("setProjectView", false);
    },
    introAni() {
      let reveal = document.querySelectorAll(".project-page__reveal");
      let ani = new TimelineMax({ delay: 0.5 }).to(reveal, 1, {
        x: "-=100%",
        ease: Power4.easeInOut
      });
    },
    closeFn() {
      //this.$router.push("/");
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
  beforeCreate() {
    if (!this.$store.getters.dataLoaded) {
      console.log("redirect");
      this.$router.push("/");
    }
  },
  created() {
    // handle a deep link - redirect to home?
    if (this.$store.getters.dataLoaded) {
      //console.log(this.$route.params.slug);
      this.project = this.$store.getters.currentProject;
      this.isLoaded = true;
    }
  },
  mounted() {
    //console.log(this.project);
    if (this.project && this.isLoaded) {
      this.$nextTick(function() {
        this.transitionIn();
      });
    } else {
      // load data and wait
      console.log("no data");
    }
  }
};
</script>

<style lang="scss">
@import "../../style/_variables.scss";
@import "../../style/mixins.scss";

@mixin rotate-link() {
  text-transform: uppercase;
  transform: rotate(90deg);
  letter-spacing: 4px;
  font-size: 0.8rem;
  margin-top: 3.5rem;
}

@mixin rule-above() {
  &:before {
    content: "";
    position: absolute;
    width: 2rem;
    height: 2px;
    background-color: $mode-purple;
  }
}

@mixin content-shadow() {
  box-shadow: #ccc 1px 1px 8px 2px;
}

@mixin caption-styles() {
  h3 {
    text-transform: uppercase;
    color: $mode_purple;
    font-size: 0.8rem;
    letter-spacing: 2px;
    margin-top: 1.2rem;
  }
  p {
    font-size: 0.9rem;
    padding-top: 0.5rem;
    letter-spacing: 1px;
    line-height: 1.4;
  }
}

.project-page__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: none;
  z-index: 100;
  overflow-x: hidden;

  .project-page__reveal {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: none;
    //background: $mode-gradient;
    z-index: 100;
    div {
      position: relative;
      width: 100%;
      height: 20vh;
      background-color: $mode-purple;
    }
  }

  .grid-background__fixed {
    position: fixed;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    span {
      border-left: 1px solid #eee;
    }
  }
  .project-page__grid-wrapper {
    position: relative;
    display: grid;
    text-align: left;
    grid: {
      template-columns: repeat(16, 1fr);
      template-rows: [header-start] 4rem [header-end intro-start] 80vh
        [intro-end project-content-start] auto [project-content-end
        footer-start] 20rem [footer-end];
    }
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    color: $mode-text;
    background: none;
    &.menu {
      height: 100vh;
      overflow: hidden;
    }
    h3 {
      font-family: "Apercu-Medium";
    }
    .project-page__ui-right {
      grid-column: -2/-1;
      grid-row: 1/span 2;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      z-index: 100;
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
          margin-top: 2rem;
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
    .project-page__hero-image {
      position: relative;
      grid-column: 1/span 8;
      grid-row: 2/intro-end;
    }
    .project-page__intro {
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
      h1,
      h2 {
        font-family: "GT-Sectra";
        color: $mode-purple;
      }

      .project-page__intro-tags {
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
        grid-column: 1/-1;
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
      .project-page__overview {
        grid-column: 4/ -1;
        grid-row: -2/-1;
        padding-top: 2rem;
        padding-right: 1rem;
        line-height: 2.2rem;
        font-size: 1.2rem;
        letter-spacing: 1px;
      }
    }
    .project-page__project-content {
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
          grid-row-gap: 4rem;
          
          .video__container-inner {
            grid-column: 3/span 11;
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
            grid-column: -4/span 2;
            margin-left: 1.5rem;
            @include rule-above();
            @include caption-styles();
          }
        } 
        .image__container {
          grid-column: 1/-1;
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          grid-row-gap: 4rem;
          .image__in-flow {
            grid-column: 3/span 11;
            @include content-shadow();
            img {
              width: 100%;
              display: block;
            }
          }
          .image__caption {
            grid-column: -4/span 2;
            margin-left: 1.5rem;
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
    .project-page__footer {
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