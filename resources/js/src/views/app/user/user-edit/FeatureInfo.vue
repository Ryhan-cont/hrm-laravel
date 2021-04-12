<template>
    <div>
        <div v-if="!editMode">
            <div class="vx-row flex px-4 pb-6">
                <div class="flex-auto text-2xl">Feature</div>
                <div>
                    <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="editMode =! editMode"></vs-button></div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Designation:</div>
                    <div class="edit-prev-dt">{{defItem.designation}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Job description:</div>
                    <div class="edit-prev-dt">{{defItem.jobDescription}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Employee Type:</div>
                    <div class="edit-prev-dt">{{defItem.employeeType}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Payroll package:</div>
                    <div class="edit-prev-dt">{{defItem.payRoll}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Leave package:</div>
                    <div class="edit-prev-dt">{{defItem.leavePackage}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Asset package:</div>
                    <div class="edit-prev-dt">{{defItem.assetPackage}}</div>
                </div>
            </div>

        </div>
        <div style="min-height:300px" v-if="editMode">
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4 pt-1">
                        <vs-select v-model="designation" class="w-full" placeholder="Designation" label="* Designation">
                            <vs-select-item :key="index" :value="item.id" :text="item.value"
                                            v-for="(item,index) in designationData"/>
                        </vs-select>
                        <!-- <validate-data rules="required" :value="designation" :name="'designation'" /> -->
                    </div>
                    <div class="mt-4 pt-1">
                        <vs-select v-model="jobDescription" class="w-full" placeholder="Job description"
                                   label="* Job description">
                            <vs-select-item :key="index" :value="item.id" :text="item.name"
                                            v-for="(item,index) in jobDescriptionData"/>
                        </vs-select>
                        <!-- <validate-data rules="required" :value="jobDescription" :name="'jobDescription'" altName="job description" /> -->
                    </div>
                    <div class="mt-4 pt-1">
                        <vs-select v-model="employeeType" class="w-full" placeholder="Employee Type"
                                   label="* Employee Type">
                            <vs-select-item :key="index" :value="item.id" :text="item.value"
                                            v-for="(item,index) in employeeTypeData"/>
                        </vs-select>
                        <!-- <validate-data rules="required" :value="employeeType" :name="'employeeType'" altName="employee type" /> -->
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4 pt-1">
                        <vs-select v-model="payRoll" class="w-full" placeholder="Payroll package"
                                   label="* Payroll package">
                            <vs-select-item :key="index" :value="item.id" :text="item.name"
                                            v-for="(item,index) in payRollData"/>
                        </vs-select>
                        <!-- <validate-data rules="required" :value="payRoll" :name="'payRoll'" altName="payroll" /> -->
                    </div>
                    <div class="mt-4 pt-1">
                        <vs-select v-model="leavePackage" class="w-full" placeholder="Leave package"
                                   label="* Leave package">
                            <vs-select-item :key="index" :value="item.id" :text="item.name"
                                            v-for="(item,index) in leavePackageData"/>
                        </vs-select>
                        <!-- <validate-data rules="required" :value="leavePackage" :name="'leavePackage'" altName="leave package" /> -->
                    </div>
                    <div class="mt-4 pt-1">
                        <vs-select v-model="assetPackage" class="w-full" placeholder="Asset package"
                                   label="* Asset package">
                            <vs-select-item :key="index" :value="item.id" :text="item.name"
                                            v-for="(item,index) in assetPackageData"/>
                        </vs-select>
                        <!-- <validate-data rules="required" :value="assetPackage" :name="'assetPackage'" altName="asset package" /> -->
                    </div>
                </div>
            </div>
            <div class="w-full flex" align="right">
                <div class="flex-auto"></div>
                <div>
                    <vs-button size="small" class="ml-auto mt-2" @click="editMode = false" color="danger">Cancel
                    </vs-button>
                </div>
                <div class="pl-2">
                    <vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="saveData()">Save</vs-button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    export default {
        name: 'feature-info',
        components: {},
        props: {
            reqData: {
                default: {},
            }
        },
        data() {
            return {
                defItem: {},
                feature: {},

                id: null,

                editMode: false,

                designation: null,
                designationOption: [],
                designationData: [],

                payRoll: null,
                payrollOption: [],
                payRollData: [],

                leavePackage: null,
                leavePackageOption: [],
                leavePackageData: [],

                assetPackage: null,
                assetPackageOption: [],
                assetPackageData: [],

                jobDescription: null,
                jobDescriptionOption: [],
                jobDescriptionData: [],

                employeeType: null,
                employeeTypeOption: [],
                employeeTypeData: [],
            }
        },
        mounted() {
            if (this.reqData.userData) {
                this.loadData();
            }
        },
        methods: {
            async loadData() {
                var defItem = _.cloneDeep(this.reqData.employee);
                this.feature = _.cloneDeep(this.reqData);
                this.id = this.feature.userData.id;
                this.designation = this.feature.employee.designation;
                this.payRoll = this.feature.employee.payrollpackage;
                this.leavePackage = this.feature.employee.leavepackage;
                this.assetPackage = this.feature.employee.assetpackage;
                this.jobDescription = this.feature.employee.jobdescription;

                this.employeeType = this.feature.employee.employeetype;

                this.designationOption = this.reqData.designationList;
                this.designationData = this.reqData.designationData;

                this.leavePackageOption = this.feature.leaveList;
                this.leavePackageData = this.feature.leaveData;

                this.assetPackageOption = this.feature.assetList;
                this.assetPackageData = this.feature.assetData;

                this.payrollOption = this.feature.payrollList;
                this.payRollData = this.feature.payrollData;

                this.jobDescriptionOption = this.feature.jobDescriptionList;
                this.jobDescriptionData = this.feature.jobDescriptionData;
                this.employeeTypeOption = this.feature.employeeTypeList;
                this.employeeTypeData = this.feature.employeeTypeData;
                this.defItem = {
                    designation: _.filter(this.designationData, {id: Number(defItem.designation)})[0].value,
                    payRoll: _.filter(this.payRollData, {id: Number(defItem.payrollpackage)})[0].name,
                    leavePackage: _.filter(this.leavePackageData, {id: Number(defItem.leavepackage)})[0].name,
                    assetPackage: _.filter(this.assetPackageData, {id: Number(defItem.assetpackage)})[0].name,
                    jobDescription: _.filter(this.jobDescriptionData, {id: Number(defItem.jobdescription)})[0].name,
                    employeeType: _.filter(this.employeeTypeData, {id: Number(defItem.employeetype)})[0].value,
                }
            },
            saveData() {
                var data = {
                    designation: this.designation,
                    payRoll: this.payRoll,
                    leavePackage: this.leavePackage,
                    assetPackage: this.assetPackage,
                    jobDescription: this.jobDescription,
                    employeeType: this.employeeType,
                    id: this.id,
                }

                if (this.validateInput(data)) {
                    this.btnDisabled = true;
                    axios.post('/api/user-edit/data/feature-update', data)
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
            }
        },
        watch: {
            reqData() {
                this.loadData();
            }

        },
    }
</script>

<style scoped>
    .edit-prev-cont {
        padding: 6px 0px;
        display: flex;
        width: 100%;
    }

    .edit-prev-ttl {
        max-width: 200px;
        flex: 1;
        font-weight: bold;
        padding: 0px 10px 0px 14px;
    }

    .edit-prev-dt {
        flex: 1;
    }
</style>
