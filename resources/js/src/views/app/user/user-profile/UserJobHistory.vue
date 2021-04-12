<template>
    <div id="job-info-view">
        <vs-popup mediumscreen :title="pop_title" class="" :active.sync="jobAdd">
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">
                        <vs-input class="w-full mt-4" label="Organization Name" v-model="job.orgName"/>
                        <validate-data rules="required" :value="job.orgName" :name="'orgName'"
                                       altName="organization name"/>
                    </div>
                    <div class="mt-2">
                        <vs-select v-model="selectdDesignation" class="w-full" placeholder="Designation"
                                   label="Designation">
                            <vs-select-item :key="index" :value="item.value" :text="item.label"
                                            v-for="(item,index) in designationData"/>
                        </vs-select>
                        <validate-data rules="required" :value="selectdDesignation" :name="'designation'"
                                       altName="designation"/>
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">
                        <v-date-picker v-model="jobDuration" is-range color="purple" :masks="{input: 'YYYY-MM-DD'}"
                                       :max-date="new Date()" >
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4"
                                          label="Job Duration" :value="inputValue.start+' - '+inputValue.end"
                                          v-on="inputEvents.start"/>
                            </template>
                        </v-date-picker>
                        <validate-data rules="required" :value="job.jobDuration" :name="'jobDuration'"
                                       altName="job duration"/>
                    </div>
                </div>
                <div class="vx-col w-full">
                    <div class="pt-6">
                        <vs-textarea v-model="job.responsibility" label="Duties"/>
                        <validate-data rules="required" :value="job.responsibility" :name="'responsibility'"
                                       altName="responsibility"/>
                    </div>
                </div>

            </div>


            <div class="vx-row mt-3">

            </div>
            <div v-show="mode.save" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="educationAdd()">Save</vs-button>
            </div>
            <div v-show="mode.edit" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="educationEdit()">Update</vs-button>
            </div>
        </vs-popup>
        <div class="vx-col w-full bg-white pt-3">
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <div class="flex items-end px-3">
                        <feather-icon svgClasses="w-6 h-6" icon="BriefcaseIcon" class="mr-2"/>
                        <span class="font-medium text-lg leading-none">Job History</span>

                    </div>
                </div>
                <div class="vx-col w-1/2">

                    <div class="float-right pr-3">
                        <vs-button size="small" icon-pack="feather" icon="icon-plus"
                                   @click="callPopup('job_add')"></vs-button>
                    </div>
                </div>
            </div>
            <vs-divider/>
        </div>

        <div v-for="(tr,k) in job_histories" :key="k">
            <vx-card class="mb-base">
                <div class="vx-row">
                    <div class="vx-col lg:w-10/12 w-7/12">
                        <div class="vx-row">
                            <div class="vx-col lg:w-6/12 md:w-8/12 w-full ">
                                <table style="width: 100%">
                                    <tr>
                                        <td style="width: 35%" class="font-semibold">Organization</td>
                                        <td style="width: 65%">{{tr.orgname}}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 35%" class="font-semibold">Designation</td>
                                        <td style="width: 65%">{{tr.designation}}</td>
                                    </tr>

                                </table>
                            </div>
                            <div class="vx-col lg:w-6/12 md:w-8/12 w-full">
                                <table style="width: 100%">
                                    <tr>
                                        <td style="width: 35%" class="font-semibold">Job Duration</td>
                                        <td style="width: 65%">{{tr.job_duration}} </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 35%" class="font-semibold">Duties</td>
                                        <td style="width: 65%">{{tr.responsibility}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="vx-col lg:w-2/12 w-5/12">
                            <div class="float-right pr-3">
                                <vs-button size="small" icon-pack="feather" icon="icon-edit"
                                           @click="callPopup('job_edit',tr)"></vs-button>
                            </div>
                            <div class="float-right pr-3">
                                <vs-button size="small" icon-pack="feather" icon="icon-x" color="danger"
                                           @click="actionConfirm(tr, deleteDataProceed, `delete`)"></vs-button>
                            </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pop_title: 'New Job History',
                job_id: null,
                mode: {
                    save: true,
                    edit: false,
                },

                jobAdd: false,
                job_histories: [],
                designationOption: [],
                designationData: [],
                selectdDesignation: '',
                jobDuration: {
                    start: new Date(),
                    end: new Date(),
                },
                job: {
                    orgName: null,
                    designation: null,
                    responsibility: null,

                },
            }
        },

        methods: {
            fetchJobHistory() {
                axios.get(`/api/profile/job-history/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response)
                        if (response.status === 200) {
                            this.job_histories = [];
                            this.job_histories = response.data.job_histories;
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);

                        this.user_not_found = true
                    });
            }, callPopup(type, data) {

                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_DESIGNATION}`)
                    .then(response => {
                        this.designationData = response.data.items;


                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                if (type === 'job_add') {
                    this.pop_title = 'New Job History';
                    this.mode.save = true;
                    this.mode.edit = false;

                    this.job.orgName = null;
                    this.job.designation = null;
                    this.job.responsibility = null;

                    this.jobDuration ={start:new Date(), end:new Date()};
                    this.selectdDesignation = '';


                    this.jobAdd = !this.jobAdd;

                }
                if (type === 'job_edit') {
                    console.log(data)
                    this.pop_title = 'Edit Job History';
                    this.mode.save = false;
                    this.mode.edit = true;
                    this.jobAdd = !this.jobAdd;
                    this.job_id = data.job_id;
                    this.job.orgName = data.orgname;
                    this.selectdDesignation = data.designation_id;
                    this.job.designation = data.designation;
                    this.job.responsibility = data.responsibility;
                    this.jobDuration ={start:new Date(data.jobstartdate), end:new Date(data.jobclosedate)};

                }


            },
            educationAdd() {
                this.btnDisabled = true;
                var data = {
                    org_name: this.job.orgName,
                    designation: this.selectdDesignation,
                    responsibility: this.job.responsibility,
                    duration: this.jobDuration,
                    user_id: this.$route.params.id,
                }
                axios.post('/api/profile/job-history-create', data)
                    .then(response => {
                        this.notificationAlert(response);
                        this.fetchJobHistory();
                        this.jobAdd = !this.jobAdd;
                        this.btnDisabled = false;
                    })
                    .catch(error => {

                        this.notificationAlert(error.response);
                        this.btnDisabled = false;

                    })
            },
            educationEdit() {
                this.btnDisabled = true;
                var data = {
                    job_id: this.job_id,
                    org_name: this.job.orgName,
                    designation: this.selectdDesignation,
                    responsibility: this.job.responsibility,
                    duration: this.jobDuration,
                }
                axios.post('/api/profile/job-history-update', data)
                    .then(response => {
                        this.notificationAlert(response);
                        this.fetchJobHistory();
                        this.jobAdd = !this.jobAdd;
                        this.btnDisabled = false;
                    })
                    .catch(error => {

                        this.notificationAlert(error.response);
                        this.btnDisabled = false;

                    })
            },
            deleteDataProceed(Deldata) {
                axios.get(`/api/profile/job-history-delete/${Deldata.job_id}`)
                    .then(response => {
                        this.notificationAlert(response);
                        this.fetchJobHistory();
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })

            },


        },
        mounted() {

        },
        created() {
            this.fetchJobHistory();
        },
        computed: {
            dateRangeText() {
                return this.job.jobDuration.join(' ~ ')
            },
        }
    }
</script>

<style lang="scss">
    #job-info-view {
        table {
            td {
                vertical-align: top;
                min-width: 140px;
                padding-bottom: .8rem;
                word-break: break-all;
            }
        }
    }


    @media screen and (min-width: 1201px) and (max-width: 1211px),
    only screen and (min-width: 636px) and (max-width: 991px) {
        .edu-info-col-1 {
            width: calc(100% - 12rem) !important;
        }

    }

</style>
