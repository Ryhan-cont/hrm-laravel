<template>
    <vx-card>
        <vs-tabs :position="isSmallerScreen ? 'top' : 'top'" class="tabs-shadow-none" id="pending-tabs" :key="isSmallerScreen">
            <vs-tab icon-pack="feather" icon="icon-check-square" :label="!isSmallerScreen ? 'Action' : ''" >
                <div class="tab-my-pending md:ml-4 md:mt-4 mt-4 ml-0">
                    <request-action />
                </div>
            </vs-tab>
            <vs-tab icon-pack="feather" icon="icon-activity" :label="!isSmallerScreen ? 'History' : ''">
                <div class="tab-other-pending md:ml-4 md:mt-4 mt-4 ml-0">
                    <activity-timeline />
                </div>
            </vs-tab>
        </vs-tabs>
    </vx-card>
</template>

<script>
import RequestAction from "./RequestAction";
import ActivityTimeline from "./ActivityTimeline";

export default {
    name: "ViewRightBar",

    components: {
        RequestAction, ActivityTimeline,
    },
    data() {
        return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {},
    computed: {
        isSmallerScreen() {
            return this.$store.state.windowWidth < 768
        },

    },
    watch: {}
}
</script>

<style scoped>

</style>
