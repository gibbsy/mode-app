import $ from 'jquery';
import { device_pixel_ratio } from 'javascript-retina-detect';

export const responsiveUtils = {
  computed: {
    viewportWidth() {
      return this.$store.getters.viewportWidth;
    },
    viewportHeight() {
      return this.$store.getters.viewportHeight;
    },
    layoutSize() {
      return this.$store.getters.layoutSize;
    },
    screenDensity() {
      return device_pixel_ratio();
    },
    imageRes() {
      if ( this.viewportWidth > 1199 && this.screenDensity > 1 )
        return 'x-large';
      else if ( this.viewportWidth > 1599 && this.screenDensity == 1 )
        return 'x-large';
      else if ( this.viewportWidth > 1199 && this.viewportWidth < 1600 && this.screenDensity == 1 )
        return 'large';
      else if ( this.viewportWidth > 959 && this.viewportWidth < 1200 && this.screenDensity > 1 )
        return 'large';
      else if ( this.viewportWidth > 959 && this.viewportWidth < 1200 && this.screenDensity == 1 )
        return 'medium';
      else if ( this.viewportWidth > 767 && this.viewportWidth < 960 && this.screenDensity > 1 )
        return 'medium';
      else if ( this.viewportWidth > 767 && this.viewportWidth < 960 && this.screenDensity == 1 )
        return 'tablet';
      else if ( this.viewportWidth < 768 && this.screenDensity > 1 )
        return 'tablet';
      else if ( this.viewportWidth < 768 && this.screenDensity == 1 )
        return 'mobile';
        else return 'large';
    }
  },
  methods: {
    setVWidth() {
      this.$store.dispatch('setVWidth', $(window).width() );
    },
    setVHeight() {
      this.$store.dispatch('setVHeight', $(window).height() );
    }
  }
}