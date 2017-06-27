<template>
  <div :id="project.slug+'-full'" class="project-full-container">
  <h1>PROJECT DETAILS</h1>
  </div>
</template>

<script>
export default {
  props: [ ],
  components: [],
  data() {
    return {
      imagesLoaded : false
    }
  },
  computed: {
    project() {
      return this.$store.getters.currentProject;
    }
  }
}
</script>

<style lang="scss" scoped>
#project.slug {

}
</style>