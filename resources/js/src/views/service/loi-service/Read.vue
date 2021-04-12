<template>
    <div>
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider/>
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText  :data="tableData">
                        <vs-tr>
                            <vs-th>Organization Name</vs-th>
                            <vs-td>{{org_name}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Organization Type</vs-th>
                            <vs-td>{{org_type}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Date</vs-th>
                            <vs-td>{{ start_date }} - {{ end_date }}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Duration</vs-th>
                            <vs-td>{{ duration }} days</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Remarks</vs-th>
                            <vs-td>{{ remarks }}</vs-td>
                        </vs-tr>

                        <vs-tr v-show="show_salary">
                            <vs-th>Salary</vs-th>
                            <vs-td>{{ salary }}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>
                <div v-else>
                    <div class="vx-row">
                        <div class="mt-2 vx-col md:w-1/2 w-full">
                            <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                            <vs-select v-model="selectedOrgType" class="w-full" placeholder="Organization Type" label="Organization Type" @input="fetchOrgName(selectedOrgType)">
                                <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in orgTypeData" />
                            </vs-select>
                            <validate-data rules="required" :value="selectedOrgType" :name="'organization type'" />
                        </div>
                        <div class="mt-2 vx-col md:w-1/2 w-full">

                            <vs-select v-model="selectedOrg" class="w-full" placeholder="Organization" label="Organization" @input="fetchOrgAddress(selectedOrg)">
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
                                    <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="* Date Range" :value="inputValue.start+' - '+inputValue.end" v-on="inputEvents.start" />
                                </template>
                            </v-date-picker>
                            <validate-data rules="required" :value="dateRange" :name="'dateRange'" altName="Date range" />
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

        data() {
            return {
                org_name: null,
                org_type: null,
                start_date: null,
                end_date: null,
                duration: null,
                remarks: null,
                show_salary: null,
                salary: null,
                req_info: {},
                tableData:[],
                req_id: this.$route.query.id,
                ref_id: this.$route.query.ref_id,
                selectedOrgType:null,
                orgTypeData:[],
                selectedOrg:null,
                orgData:null,
                orgAddress:null,
                letterAddressTo:null,
                viewSalary:true,
                dateRange:{start: new Date(), end: new Date()},
            }
        },
        created() {
            this.fetchRequest();
            this.fetchOrgTypes();
        },
        mounted() {
        },

        methods: {
            fetchRequest() {
                axios.get(`/api/loi-service/data/${this.$route.query.id}`)
                    .then(response => {
                        this.req_info = response.data;
                        this.org_name = response.data.infos.org_name;
                        this.org_type = response.data.infos.org_type;
                        this.start_date = response.data.infos.form_start_date;
                        this.end_date = response.data.infos.form_end_date;
                        this.duration = response.data.infos.durations;
                        this.remarks = response.data.infos.remarks;
                        this.show_salary = response.data.infos.show_salary;
                        this.salary = response.data.salary;
                        if (this.data.edit_info) {
                            this.selectedOrgType = response.data.infos.org_type_id;
                            this.fetchOrgName(response.data.infos.org_type_id);
                            this.selectedOrg = response.data.infos.org_name_id;
                            this.orgAddress = response.data.infos.address;
                            this.letterAddressTo = response.data.infos.letter_to;
                            this.viewSalary = response.data.infos.show_salary;
                            this.dateRange={start: new Date(response.data.infos.start_date),end: new Date(response.data.infos.end_date)};

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
                    org_id: this.selectedOrg,
                    start_date: this.dateRange.start,
                    end_date: this.dateRange.end,
                    view_salary: this.viewSalary,
                    remarks: this.remarks,
                    status: 0,
                }

                this.$http.put(`/api/loi-service/update/${this.req_id}`, data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },

            fetchOrgTypes() {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_ORG_TYPE}`)
                    .then(response => {

                        this.orgTypeData = response.data.items;


                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            fetchOrgName(id){
                axios.get(`/api/loi-service/get-org-name/${id}`)
                    .then(response => {
                        this.orgData = response.data.items;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            fetchOrgAddress(id){

                axios.get(`/api/loi-service/get-org-address/${id}`)
                    .then(response => {
                        this.orgAddress = response.data.address;
                        this.letterAddressTo = response.data.letter_to;

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
