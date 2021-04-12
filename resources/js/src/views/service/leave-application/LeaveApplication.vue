<template>
    <div>
        <create v-if="!isViewFile" />
        <div class="vx-row" v-if="isViewFile">
            <!--LEFT COL-->
            <div class="vx-col lg:w-2/3 w-full">
                <read :data="requestInfo" />
            </div>
            <!--RIGHT COL-->
            <div class="vx-col lg:w-1/3 w-full">
                <view-right-bar :data="requestInfo" />
            </div>
        </div>
    </div>
</template>


<script>
    import Create from "./Create";
    import Read from "./Read";
    import ViewRightBar from "../ViewRightBar";
    export default {
        components: { Create, Read, ViewRightBar },
        props: {},
        data() {
            return {
                isViewFile: false,
                requestInfo: {},
            }
        },
        methods: {
            checkEditable() {
                axios.get(`/api/work-flow/data/${this.$route.query.ref_id}`)
                    .then(response => {
                        this.requestInfo = response.data.request_info;
                        this.$root.$emit('eventingPermissions', response.data.request_info);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        mounted() {
            if (this.$route.query.id) {
                this.isViewFile = true;
            }
            if (this.isViewFile) {
                this.checkEditable()
            }


        },
        created() {

        },
        watch: {
            '$route.query.id'() {
                this.isViewFile = !this.isViewFile;
            }
        },
    }
</script>
