<template>
<div class="pt-3 mt-5" style="border-top:1px solid #f2f2f2">

    <div class="vx-row" v-if="addNew">
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
        <div v-if="addNew"><vs-button size="small" class="ml-auto mt-2" v-if="addNew" @click="addNew = false" color="danger">Cancel</vs-button></div>
        <div class="pl-2" v-if="addNew"><vs-button size="small" class="mt-2" :disabled='btnDisabled' @click="saveData()">Save</vs-button></div>
        <div class="pl-2" v-if="!addNew"><vs-button size="small" class="ml-auto mt-2" @click="addNew = true">Add new</vs-button></div>
    </div>
</div>
</template>


<script>
    export default {
        name: 'new-job-history',
        components: {

        },
        props: {
            reqData: {
                default: {},
            }
        },
        data() {
            return {
                designationOption:[],
                designationData:[],
                addNew:false,
                userId:null,
                job:{
                    orgName:null,
                    designation:null,
                    jobDuration:{start: new Date(), end: new Date()},
                    responsibility:null,
                    skill:null,
                },
            }
        },
        mounted() {
            if (this.reqData.relationshipTypeList) { this.loadData(); }
        },
        methods: {
            async loadData() {
                this.userId = this.reqData.userData.id;
                this.designationOption=this.reqData.designationList;
                this.designationData=this.reqData.designationData;
            },
            async saveData() {
                this.btnDisabled = true;
                this.job.userId=this.userId;
                axios.post('/api/user-edit/data/job-history-create',this.job)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.addNew = false;
                        this.job.orgName=null;
                        this.job.designation=null;
                        this.job.jobDuration={start: new Date(), end: new Date()};
                        this.job.responsibility=null;
                        this.job.skill=null;
                    })
                    .catch(error => {
                        this.errorData = error.response.data.errors;
                        this.notificationAlert(error.response);

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
