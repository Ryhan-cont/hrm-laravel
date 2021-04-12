<template>
    <div>
        <vx-card>
            <div>

                <div class="vx-row">
                    <div class="mt-2 vx-col md:w-1/2 w-full">
                        <div>
                            <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                            <vs-select v-model="selectedLeaveType" class="w-full" placeholder="Leave Type" label="Leave Type" autocomplete @input="CheckLeave(selectedLeaveType)">
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
                            <vs-select v-model="selectedReason" class="w-full" placeholder="Reason" autocomplete label="Reason">
                                <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in reasonData" />
                            </vs-select>
                            <validate-data rules="required" :value="selectedReason" :name="'reason'" />
                        </div>
                    </div>
                </div>

                <div class="pt-6">
                    <vs-textarea v-model="remarks" label="Remarks" />
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/4">
                        <vs-checkbox v-model="is_for_other" size="small">Request for Other</vs-checkbox>
                    </div>
                </div>
                <div class="vx-row" v-if="is_for_other">
                    <div class="vx-col md:w-1/3 pt-3">
                        <vs-select class="w-full" v-model="request_for" autocomplete label="Request for" placeholder="Select an employee">
                            <vs-select-item v-for="(item, index) in employees" :key="index" :text="`${item.full_name} (${item.emp_id})`" :value="item.user_id"/>
                        </vs-select>
                    </div>
                </div>

                <div class="flex">
                    <div class="flex-auto"></div>
                    <div><vs-button size="small" class="ml-auto mt-2" icon="send"  :disabled='btnDisabled' @click="createRequest">Send</vs-button></div>
                </div>
            </div>

        </vx-card>
    </div>
</template>

<script>
    export default {
        name: "create",
        data() {
            return {
                is_for_other: false,
                employees: [],
                request_for: null,


                hideMsg: true,
                msg:null,
                green:null,
                selectedLeaveType:null,
                leaveTypeData:[],
                ref_id:null,
                dateRange:{start: '', end: ''},

                selectedReason:null,
                reasonData:[],
                remarks:null,
            }
        },
        created(){
            this.fetchReasons();
            this.fetchLeaveType();
        },
        mounted(){},

        methods: {
            /**
             * Create Business Card request
             * ***************************************/
            createRequest() {
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
                    is_for_other: this.is_for_other,
                    request_for: this.request_for,
                }
                this.$http.post(`/api/leave-application/create`, data)
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
                        this.notificationAlert(err.response)
                    });
            },
            fetchLeaveType() {
                axios.get('/api/leave-application/leave-package-data')
                    .then(response => {
                        this.leaveTypeData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
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
                        this.notificationAlert(err.response)
                    });
            },
            fetchUserList() {
                axios.get("/api/work-group/list/users")
                    .then(response => {
                        this.employees = response.data.data;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },

        },
        watch:{
            "is_for_other": function (){
                if (this.is_for_other) {
                    this.fetchUserList();
                }
            }
        }
    }
</script>

<style scoped>

</style>
