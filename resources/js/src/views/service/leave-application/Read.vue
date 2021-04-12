<template>
    <div id="page-request-view">
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider />
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th>Leave Type</vs-th>
                            <vs-td>{{req_info.type_name}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Leave Dates</vs-th>
                            <vs-td>{{ req_info.form_start_date }} - {{ req_info.form_end_date }}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Requested Leave</vs-th>
                            <vs-td>{{ req_info.requested_for }} days</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Available Leave</vs-th>
                            <vs-td>{{ req_info.available }} days</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Used Leave</vs-th>
                            <vs-td>{{ req_info.used }} days</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Remarks</vs-th>
                            <vs-td>{{ req_info.remarks }}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>
                <div v-else>

                    <div class="vx-row">
                        <div class="mt-2 vx-col md:w-1/2 w-full">
                            <div>
                                <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                                <vs-select v-model="selectedLeaveType" class="w-full" placeholder="Leave Type" label="Leave Type" @input="CheckLeave(selectedLeaveType)">
                                    <vs-select-item :key="index" :value="item.value" :text="item.label+' - '+item.days+ ' Days'" v-for="(item,index) in leaveTypeData" />
                                </vs-select>
                                <div v-if="green" :hidden="hideMsg" class="py-1 text-sm text-green-400">
                                    <div>
                                        <div>{{msg}}</div>
                                    </div>
                                </div>
                                <div v-else :hidden="hideMsg" class="py-1 text-sm text-red-400">
                                    <div>
                                        <div>{{msg}}</div>
                                    </div>
                                </div>
                                <validate-data rules="required" :value="selectedLeaveType" :name="'leaveType'" />
                            </div>
                            <div>
                                <v-date-picker v-model="dateRange" is-range color="purple" :masks="{input: 'YYYY-MM-DD'}" :min-date="new Date()">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="Date Range" :value="inputValue.start+' - '+inputValue.end" v-on="inputEvents.start" />
                                    </template>
                                </v-date-picker>
                                <validate-data rules="required" :value="dateRange" :name="'dateRange'" altName="Date range" />
                            </div>
                        </div>
                        <div class="mt-2 vx-col md:w-1/2 w-full">
                            <div>
                                <vs-select v-model="selectedReason" class="w-full" placeholder="Reason" label="Reason">
                                    <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in reasonData" />
                                </vs-select>
                                <validate-data rules="required" :value="selectedReason" :name="'reason'" />
                            </div>
                        </div>
                    </div>

                    <div class="pt-6">
                        <vs-textarea v-model="remarks" label="Remarks" />
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

                hideMsg: true,
                msg:null,
                green:null,
                req_id: this.$route.query.id,
                ref_id: this.$route.query.ref_id,
                selectedLeaveType:null,
                leaveTypeData:[],
                dateRange:{start: new Date(), end: new Date()},

                selectedReason:null,
                reasonData:[],
                remarks:null,
            }
        },
        created() {
            this.fetchReasons();
            this.fetchLeaveType();
            this.fetchRequest();
        },
        mounted() {
        },

        methods:{
            fetchRequest(){
                axios.get(`/api/leave-application/data/${this.$route.query.id}`)
                    .then(response => {
                        this.req_info = response.data;
                        if (this.data.edit_info) {
                            this.selectedLeaveType= response.data.type_id;
                            this.selectedReason= response.data.reason_id;
                            this.dateRange= {start: new Date(response.data.start_date),end: new Date(response.data.end_date)};
                            this.remarks= response.data.remarks;
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
                    leave_type: this.selectedLeaveType,
                    reason: this.selectedReason,
                    start_date: this.dateRange.start,
                    end_date: this.dateRange.end,
                    remarks: this.remarks,
                    status: 0,
                }

                this.$http.put(`/api/leave-application/update/${this.req_id}`, data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },
            fetchReasons() {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_ID_REQ_REASON}`)
                    .then(response => {
                        this.reasonData = response.data.items;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            fetchLeaveType() {
                axios.get('/api/leave-application/leave-package-data')
                    .then(response => {
                        this.leaveTypeData = response.data.items;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            CheckLeave(id){
                axios.get(`/api/leave-application/leave-days-check/${id}`)
                    .then(response => {
                        this.msg = response.data.message;
                        this.hideMsg = false;
                        this.green = response.data.info;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>

<style lang="scss">

</style>
