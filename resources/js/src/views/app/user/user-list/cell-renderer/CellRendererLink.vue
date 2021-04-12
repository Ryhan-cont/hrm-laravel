<template>
  <div class="flex items-center">
    <vs-avatar :src="params.value" class="flex-shrink-0 mr-2" size="30px" />
  </div>
</template>

<script>
export default {
  name: 'CellRendererLink',
  mounted(){
    console.log(this.params.value)
  },
  computed: {
  }
}
</script>
