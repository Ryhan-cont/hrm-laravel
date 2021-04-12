<template>
    <div id="page-request-view">
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider />
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th>Reason</vs-th>
                            <vs-td>{{req_info.reason}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Remarks</vs-th>
                            <vs-td>{{req_info.remarks}}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>

                <div v-else>
                    <form>
                        <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                        <div>
                            <div class="flex-auto pt-3 overflow-hidden">
                                <vs-select v-model="reason" class="w-1/2" placeholder="Reason" label="Reason *" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in reasons" />
                                </vs-select>
                            </div>
                            <validate-data rules="required" :value="reason" name="reason" altName="Reason" />
                        </div>
                        <div class="pt-6">
                            <vs-textarea v-model="remarks" label="Remark" />
                        </div>
                        <div class="flex">
                            <div class="flex-auto"></div>
                            <div><vs-button size="small" class="ml-auto mt-2" @click="updateRequest" :disabled="btnDisabled" icon="send">Send</vs-button></div>
                        </div>
                    </form>
                </div>

            </div>
        </vx-card>
    </div>
</template>

<script>

export default {
    name: "read",
    props: {
        data: {
            required: true
        },
    },
    data(){
        return {
            reasons: [],
            req_info: {},
            req_id: this.$route.query.id,
            ref_id: this.$route.query.ref_id,
            reason: '',
            remarks: null,
            tableData:[],
        }
    },
    created() {
        this.fetchRequest();
    },
    mounted() {
        this.$parent.$on('eventingReasons', data => {
            this.reasons = data;
        });
    },

    methods:{
        fetchRequest(){
            axios.get(`/api/id-card-request/data/${this.$route.query.id}`)
                .then(response => {
                    this.req_info = response.data.req_info;
                    if (this.data.edit_info) {
                        this.reason = response.data.req_info.reason_id;
                        this.remarks = response.data.req_info.remarks;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        updateRequest(){
            let data = {
                module_id: this.$store.state.moduleId,
                ref_id: this.ref_id,
                req_id: this.req_id,
                reason: this.reason,
                remarks: this.remarks,
                status: 0
            };

            this.btnDisabled = true;
            this.$http.put(`/api/id-card-request/update/${this.req_id}`, data)
                .then(response => {
                this.notificationAlert(response)
                this.$router.push('/dashboard');
            }).catch(err => {
                this.notificationAlert(err.response)
            })
        }
    }
}
</script>

<style lang="scss">

</style>
