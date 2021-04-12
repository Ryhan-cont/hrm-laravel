<template>
    <div>
        <form>
            <vs-input type="hidden" v-model="ref_id" name="ref_id" />
            <div class="pt-6">
                <vs-textarea v-model="remarks" label="Remark" />
            </div>
            <div class="flex justify-between flex-wrap">
                <vs-button size="small" class="mt-4" color="warning" :disabled="btnDisabled"
                           @click="actionConfirm({status: -2}, createWfLog, `Cancel ${request_id}`, 'warning')" >Cancel
                </vs-button>
                <span v-if="request_Info.action_buttons">
                    <vs-button size="small" class="mt-4" color="danger" :disabled="btnDisabled"
                               @click="actionConfirm({status: -1}, createWfLog, `Reject ${request_id}`)" >Reject
                    </vs-button>
                    <vs-button size="small" class="mt-4 vs-con-loading__container" :disabled="btnDisabled"
                               @click="actionConfirm({status: 0}, createWfLog, `Accept ${request_id}`, 'success')">Accept
                    </vs-button>
                </span>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "RequestAction",
    data() {
        return {
            request_id: this.$route.query.request_id,
            req_id: this.$route.query.id,
            ref_id: this.$route.query.ref_id,
            remarks: null,
            request_Info : '',
            backgroundLoading:'primary',
            colorLoading:'#fff'
        }
    },

    created() {

    },
    mounted() {
        this.$root.$on('eventingPermissions', data => {
            this.request_Info = data;
        });
    },

    methods: {

        createWfLog(params) {
            let data = {
                module_id: this.$store.state.moduleId,
                req_id: this.req_id,
                ref_id: this.ref_id,
                remarks: this.remarks,
                status: params.status,
            }
            if ((data.status === -1 || data.status === -2) && !data.remarks) {
                this.notificationAlert(`Please write ${(data.status === -1) ? 'rejection' : 'cancellation'} cause`,
                    `${(data.status === -1) ? 'Rejection' : 'Cancellation'} Cause`,
                    `${(data.status === -1) ? 'danger' : 'warning'}`);
                return;
            }

            this.$vs.loading({container: '#div-with-loading', scale: 0.6});
            this.btnDisabled = true;
            this.$http.post(`/api/work-flow/create-action`, data)
                .then(response => {
                    this.notificationAlert(response);
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                    this.$router.push('/dashboard');
                }).catch(err => {
                this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                this.notificationAlert(err.response)
            })
        }
    }

}
</script>

<style scoped>

</style>
