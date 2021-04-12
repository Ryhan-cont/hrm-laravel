<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
========================================================================================== -->


<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
        <!--<p>
          <span>Powered by</span>
          <a href="http://aqa.technology" target="_blank" rel="nofollow">Aqa Technology</a>
        </p>-->
        <span class="md:flex hidden items-center">

        </span>
    </footer>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
