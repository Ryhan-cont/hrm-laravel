<template>
    <div>
        <div v-if="!editMode">
            <div class="vx-col w-full flex pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                <div class="flex-auto font-bold">Job History - {{ ser+1 }}</div>
                <div><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteJob(defItem.id)"></vs-button></div>
                <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="editMode =! editMode"></vs-button></div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">
                        <div class="w-full"><span class="font-bold pr-2">Organization name:</span>{{defItem.orgName}}</div>
                    </div>
                    <div class="mt-2">
                        <div class="w-full"><span class="font-bold pr-2">Designation:</span>{{defItem.designation}}</div>
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-2">
                        <div class="w-full pt-1"><span class="font-bold pr-2">job duration:</span>{{defItem.jobDuration}}</div>
                    </div>
                </div>
                <div class="vx-col w-full pt-8">
                    <div>
                        <div class="w-full mt-3"><span class="font-bold pr-2">Responsibility:</span>{{defItem.responsibility}}</div>
                    </div>
                    <div>
                        <div class="w-full mt-3"><span class="font-bold pr-2">Skill:</span>{{defItem.skill}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="editMode">
            <div class="vx-col w-full flex pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                <div class="flex-auto font-bold">Job History - {{ ser+1 }}</div>
                <div><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteJob()"></vs-button></div>
                <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="editMode =! editMode"></vs-button></div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">
                        <vs-input class="w-full mt-4" label="* Organization name" v-model="job.orgName" />
                        <validate-data rules="required" :value="job.orgName" :name="'orgName'" altName="organization name" />
                    </div>
                    <div class="mt-2">
                        <vs-select v-model="job.designation" class="w-full" placeholder="Designation" label="* Designation">
                            <vs-select-item :key="index" :value="item.id" :text="item.value" v-for="(item,index) in designationData" />
                        </vs-select>
                        <validate-data rules="required" :value="job.designation" :name="'designation'" altName="designation" />
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">
                        <v-date-picker v-model="job.jobDuration" is-range color="purple" :masks="{input: 'YYYY-MM-DD'}">
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="* Job Duration" :value="inputValue.start+' - '+inputValue.end" v-on="inputEvents.start" />
                            </template>
                        </v-date-picker>
                        <validate-data rules="required" :value="job.jobDuration" :name="'jobDuration'" altName="job duration" />
                    </div>
                </div>
                <div class="vx-col w-full">
                    <div class="pt-6">
                        <vs-textarea v-model="job.responsibility" label="* Responsibility" />
                        <validate-data rules="required" :value="job.responsibility" :name="'responsibility'" altName="responsibility" />
                    </div>
                    <div>
                        <vs-input class="w-full" label="* Skill " v-model="job.skill" />
                        <validate-data rules="required" :value="job.skill" :name="'skill'" altName="skill" />
                    </div>
                </div>

            </div>
            <div class="w-full flex" align="right">
                <div class="flex-auto"></div>
                <div><vs-button size="small" class="ml-auto mt-2" @click="editMode = false" color="danger">Cancel</vs-button></div>
                <div class="pl-2"><vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="saveData()">Save</vs-button></div>
            </div>
        </div>

    </div>
</template>


<script>
    export default {
        name: 'job-history',
        components: {

        },
        props: {
            reqData: {
                default: {},
            },
            job: {
                type: Object,
                default(){return {}}
            },
            ser: {
                default: null,
            }
        },
        data() {
            return {
                editMode:false,
                defItem:{},

                userId:null,

                designationOption:[],
                designationData:[],
            }
        },
        mounted() {
            if (this.reqData.userData) { this.loadData(); }
        },
        methods: {
            async loadData() {
                this.defItem =  _.cloneDeep(this.job);
                this.userId = this.reqData.userData.id;

                this.designationOption=this.reqData.designationList;
                this.designationData=this.reqData.designationData;

                this.defItem.designation = _.filter(this.designationData, {id: Number(this.defItem.designation)})[0].value;
                var jobDuration = this.defItem.jobDuration.start.split('T')[0]+' - '+this.defItem.jobDuration.end.split('T')[0];
                this.defItem.jobDuration=jobDuration;
            },
            deleteJob(deldata) {

                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: 'Are you sure, you want to delete this job history?',
                    acceptText:'ok',
                    accept: this.deleteDataProceed,
                    parameters:deldata,
                })
            },
            async deleteDataProceed(Deldata){

                    var data = {
                        id:Deldata,
                    }
                    axios.post('/api/user-edit/data/job-history-delete',data)
                        .then(response => {
                            this.notificationAlert(response);
                            this.$parent.$parent.$parent.$parent.loadData();
                        })
                        .catch(error => {
                            this.notificationAlert(error.response);

                        })
            },
            async saveData() {
                this.btnDisabled = true;
                this.job.userId=this.userId;
                axios.post('/api/user-edit/data/job-history-update',this.job)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.editMode = false;
                        this.btnDisabled = false;
                    })
                    .catch(error => {
                        this.errorData = error.response.data.errors;
                        this.notificationAlert(error.response);
                        this.btnDisabled = false;

                    })
            }
        },
        watch: {
            reqData() {
                this.loadData();
            }

        },
    }
</script>
