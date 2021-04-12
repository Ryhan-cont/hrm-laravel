<template>
    <div>
        <!-- ACTIVITY TIMELINE -->
        <div class="vx-col w-full mb-base">
            <vx-timeline :data="timelineData"></vx-timeline>
        </div>
    </div>
</template>

<script>
import VxTimeline from '@/components/timeline/VxTimeline.vue'
export default {
    name: "ActivityTimeline",
    components:{
        VxTimeline
    },
    data(){
        return {
            timelineData: [],
        }
    },
    created() {
        this.fetchTimeline();
    },
    mounted() {
    },
    methods: {
        fetchTimeline(){
            axios.get(`/api/work-flow/timeline/${this.$route.query.ref_id}`)
                .then(response => {
                    this.timelineData = response.data.timeline_data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>

</style>
