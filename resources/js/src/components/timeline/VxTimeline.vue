<!-- =========================================================================================
    File Name: VxTimeline.vue
    Description: Timeline Component
    Component Name: VxTimeline
    ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <ul class="vx-timeline">
      <li v-for="item in data" :key="item.ref_id">
          <div class="timeline-icon" :class="`bg-${item.color}`">
              <feather-icon :icon="item.icon" svgClasses="text-white stroke-current w-5 h-5" />
          </div>
          <div class="timeline-info">
              <p class="font-semibold">{{ item.action_by_name }}</p>
              <span class="activity-desc">{{ item.action_text }}</span>
              <span class="activity-desc font-semibold">{{(item.actual_requester_name) ? ` by ${item.actual_requester_name} on behalf of ${item.action_by_name}` : ''}}</span>
              <span class="activity-desc italic">{{ item.remarks }}</span>
          </div>
          <small class="text-grey activity-e-time">{{ item.created_at }}</small>
      </li>
  </ul>
</template>

<script>
export default {
    name: 'vx-timeline',
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="scss">
@import "@sass/vuexy/components/vxTimeline.scss";
</style>
