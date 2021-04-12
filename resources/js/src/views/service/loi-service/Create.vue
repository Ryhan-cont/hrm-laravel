<template>
    <div>
        <vx-card>
            <div>
                <div class="vx-row">
                    <div class="mt-2 vx-col md:w-1/2 w-full">
                        <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                        <vs-select v-model="selectedOrgType" class="w-full" placeholder="Organization Type" label="Organization Type" autocomplete @input="fetchOrgName(selectedOrgType)">
                            <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in orgTypeData" />
                        </vs-select>
                        <validate-data rules="required" :value="selectedOrgType" :name="'organization type'" />
                    </div>
                    <div class="mt-2 vx-col md:w-1/2 w-full">
                        <vs-select v-model="selectedOrg" class="w-full" placeholder="Organization" label="Organization" autocomplete @input="fetchOrgAddress(selectedOrg)">
                            <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in orgData" />
                        </vs-select>
                        <validate-data rules="required" :value="selectedOrg" :name="'organization'" />
                    </div>
                </div>
                <div class="vx-row py-6">
                    <div class="vx-col md:w-1/2 edit-prev-cont">
                        <div class="edit-prev-ttl">Organization Address:</div>
                        <div class="edit-prev-dt">{{orgAddress}}</div>
                    </div>
                    <div class="vx-col md:w-1/2 edit-prev-cont">
                        <div class="edit-prev-ttl">Letter Address To:</div>
                        <div class="edit-prev-dt">{{letterAddressTo}}</div>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="mt-16 vx-col md:w-1/2 w-full">
                        <vs-checkbox v-model="viewSalary">View Salary</vs-checkbox>
                    </div>
                    <div class="mt-2 vx-col md:w-1/2 w-full">
                        <v-date-picker v-model="dateRange" is-range color="purple" :masks="{input: 'YYYY-MM-DD'}" :min-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="Date Range" :value="inputValue.start+' - '+inputValue.end" v-on="inputEvents.start" />
                            </template>
                        </v-date-picker>
                        <validate-data rules="required" :value="dateRange" :name="'dateRange'" altName="Date range" />
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
                    <div><vs-button size="small" class="ml-auto mt-2" icon="send"  :disabled='btnDisabled' @click="createRequest()">Send</vs-button></div>
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


                ref_id: null,
                remarks:null,
                selectedOrgType:null,
                orgTypeData:[],
                selectedOrg:null,
                orgData:null,
                orgAddress:null,
                letterAddressTo:null,
                viewSalary:true,
                dateRange:{start: '', end: ''},
            }
        },
        created(){
            this.fetchOrgTypes();
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
                    org_id: this.selectedOrg,
                    start_date: this.dateRange.start,
                    end_date: this.dateRange.end,
                    view_salary: this.viewSalary,
                    remarks: this.remarks,
                    status: 0,
                    is_for_other: this.is_for_other,
                    request_for: this.request_for
                }

                this.$http.post(`/api/loi-service/create`, data)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$router.push('/dashboard');
                    }).catch(err => {
                    this.notificationAlert(err.response);
                })
            },

            fetchOrgTypes() {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_ORG_TYPE}`)
                    .then(response => {

                        this.orgTypeData = response.data.items;


                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            fetchOrgName(id){
                axios.get(`/api/loi-service/get-org-name/${id}`)
                    .then(response => {
                       this.orgData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            fetchOrgAddress(id){

                axios.get(`/api/loi-service/get-org-address/${id}`)
                    .then(response => {
                        this.orgAddress = response.data.address;
                        this.letterAddressTo = response.data.letter_to;

                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
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
