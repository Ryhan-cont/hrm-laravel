<!-- =========================================================================================
  File Name: FullPage.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="layout--full-page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  watch: {
    $route () {
      this.$store.commit('UPDATE_ERROR_DATA',[]);
      this.$store.commit('UPDATE_FULL_ERROR_FIELD',{});
    },
  }
}
</script>

