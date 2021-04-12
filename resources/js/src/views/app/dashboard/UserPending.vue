<template>
    <vx-card>
        <vs-tabs :position="isSmallerScreen ? 'top' : 'top'" class="tabs-shadow-none" id="pending-tabs"
                 :key="isSmallerScreen">
            <vs-tab icon-pack="feather" icon="icon-layers" :label="!isSmallerScreen ? 'My Pending' : ''">
                <div class="tab-my-pending md:ml-4 md:mt-4 mt-4 ml-0">
                    <my-pending/>
                </div>
            </vs-tab>
            <vs-tab icon-pack="feather" icon="icon-grid" :label="!isSmallerScreen ? 'Other Pending' : ''">
                <div class="tab-other-pending md:ml-4 md:mt-4 mt-4 ml-0">
                    <other-pending/>
                </div>
            </vs-tab>
<!--            <vs-tab icon-pack="feather" icon="icon-x" :label="!isSmallerScreen ? 'Cancelled Request' : ''">
              <div class="tab-other-pending md:ml-4 md:mt-4 mt-4 ml-0">
                <cancelled-request />
              </div>
            </vs-tab>-->
        </vs-tabs>
    </vx-card>
</template>

<script>
import MyPending from './MyPending.vue'
import OtherPending from './OtherPending.vue'
import CancelledRequest from './CancelledRequest.vue'

export default {
    components: {MyPending, OtherPending, CancelledRequest},
    data() {
        return {}
    },
    computed: {
        isSmallerScreen() {
            return this.$store.state.windowWidth < 768
        }
    }
}
</script>

<style lang="scss">
#pending-tabs {
    .vs-tabs--content {
        padding: 0;
    }
}
</style>
