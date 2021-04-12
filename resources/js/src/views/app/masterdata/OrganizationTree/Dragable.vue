<template>
  <draggable class="dragArea" tag="ul" :list="group" :group="{ name: 'g1' }">
    <li v-for="el in group" :key="el.name">
      <div class="dragtitle">{{ el.name }}</div>
      <div class="dragbox"><nested-draggable :group="el.children" /></div>
    </li>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    group: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style scoped>
.dragArea {
  padding-left: 20px;
}
.dragtitle{
    padding: 10px;
    margin:2px;
    border: 1px solid #e1e1e1;
}
</style>