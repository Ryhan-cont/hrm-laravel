<template>
    <div id="page-request-view">
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider />
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th style="width: 20%">Need by Date</vs-th>
                            <vs-td>{{req_info.applicable_date}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Remarks</vs-th>
                            <vs-td>{{req_info.remarks}}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>
                <div v-else>

                    <div class="vx-row">
                        <div class="mt-2 vx-col md:w-1/2 w-full">
                            <v-date-picker v-model="applicable_date" color="purple" :masks="{input: 'DD-MM-YYYY'}"  :min-date="new Date()" >
                                <template v-slot="{ inputValue, inputEvents }">
                                    <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="Applicable Date" :value="inputValue" v-on="inputEvents" />
                                </template>
                            </v-date-picker>
                        </div>
                    </div>
                    <div class="pt-6">
                        <vs-textarea v-model="remarks" label="Remarks/Reasons" />
                    </div>
                    <div class="flex">
                        <div class="flex-auto"></div>
                        <div><vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="updateRequest">Send</vs-button></div>
                    </div>
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
                required: true,
            },
        },
        data(){
            return {
                req_info: {},
                tableData:[],

                req_id: this.$route.query.id,
                ref_id: this.$route.query.ref_id,
                applicable_date:null,
                remarks:null,
            }
        },
        created() {
            this.fetchRequest();
        },
        mounted() {
        },

        methods:{
            fetchRequest(){
                axios.get(`/api/employee-resignation-process/data/${this.$route.query.id}`)
                    .then(response => {
                        this.req_info = response.data.req_info;
                        if (this.data.edit_info) {
                            this.applicable_date = response.data.req_info.applicable_date;
                            this.remarks = response.data.req_info.remarks;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            updateRequest() {
                this.btnDisabled = true;
                let data = {
                    module_id: this.$store.state.moduleId,
                    ref_id: this.ref_id,
                    applicable_date: this.applicable_date,
                    remarks: this.remarks,
                    status: 0,
                }
                this.$http.put(`/api/employee-resignation-process/update/${this.req_id}`, data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },
        }
    }
</script>

<style lang="scss">

</style>
