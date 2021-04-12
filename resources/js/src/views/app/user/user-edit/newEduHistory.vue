<template>
<div class="pt-3 mt-5" style="border-top:1px solid #f2f2f2">
    <div v-if="addNew" class="vx-row">
        <div class="vx-col md:w-1/2 w-full">
            <div class="mt-4">
                <vs-select v-model="education.degreeName" class="w-full" placeholder="Degree Name" label="* Degree Name" @input="manageEducation('degreeType', education)">
                    <vs-select-item :key="degreeIndex" :value="degreeItIem.value" :text="degreeItIem.value" v-for="(degreeItIem,degreeIndex) in degreeData" />
                </vs-select>
                <validate-data rules="required" :value="education.degreeName" :name="'degreeName'" altName="degree name" />
            </div>
            <div class="mt-4" v-if="education.viewInstituteSelect">
                <vs-select v-model="education.instituteNameSelect" class="w-full" placeholder="Institute name" label="* Institute name" @input="manageEducation('otherInstitute', education)">
                    <vs-select-item :key="instituteIndex" :value="instituteItem.value" :text="instituteItem.value" v-for="(instituteItem,instituteIndex) in instituteData" />
                </vs-select>
                <validate-data rules="required" :value="education.instituteName" :name="'instituteName'" altName="institute name" />
            </div>
            <div class="mt-4" v-if="education.viewInstituteinput">
                <vs-input class="w-full mt-4" label="* Institute name" v-model="education.instituteName" />
                <validate-data rules="required" :value="education.instituteName" :name="'instituteName'" altName="institute name" />
            </div>
            <div class="mt-4">
                <vs-select v-model="education.passingYear" class="w-full" placeholder="Passing year" label="* Passing year">
                    <vs-select-item :key="passingYearIndex" :value="passingYearItem" :text="passingYearItem" v-for="(passingYearItem,passingYearIndex) in passinfYearList" />
                </vs-select>
                <validate-data rules="required" :value="education.passingYear" :name="'passingYear'" altName="passing year" />
            </div>
        </div>
        <div class="vx-col md:w-1/2 w-full">
            <div class="mt-4">
                <div class="mt-4">
                    <vs-select v-model="education.resultType" class="w-full" placeholder="Result type" label="* Result type" @input="manageEducation('resultType', education)">
                        <vs-select-item :key="resultIndex" :value="resultIem" :text="resultIem" v-for="(resultIem,resultIndex) in resultOption" />
                    </vs-select>
                    <validate-data rules="required" :value="education.resultType" :name="'resultType'" altName="result type" />
                </div>
            </div>
            <div class="mt-3" v-if="education.viewCgpa">
                <vs-input class="w-full" label="* Out of" v-model="education.outof" />
                <validate-data rules="required" :value="education.outof" :name="'outof'" altName="out of" />
            </div>
            <div class="mt-3" v-if="education.viewCgpa">
                <vs-input class="w-full mt-4" label="* CGPA  " v-model="education.cgpa" />
                <validate-data rules="required" :value="education.cgpa" :name="'cgpa'" altName="CGPA" />
            </div>
            <div class="mt-4" v-if="education.viewDivision">
                <div class="mt-4">
                    <vs-select v-model="education.division" class="w-full" placeholder="Division" label="* Division">
                        <vs-select-item :key="divisionIndex" :value="divisionItem.id" :text="divisionItem.value" v-for="(divisionItem,divisionIndex) in divisionData" />
                    </vs-select>
                    <validate-data rules="required" :value="education.division" :name="'division'" altName="division" />
                </div>
            </div>
        </div>
        <div class="vx-col md:w-1/2 w-full py-3">
            <div class="pt-3 pr-3 font-bold">Certificate attachment: </div>
            <div class="flex">
                <div>
                    <vs-button size="small" color="gray" class="ml-auto mt-2"  @click="attachmentInput('certificate', index)">browse</vs-button>
                </div>
                <div class="pl-3 pt-3">{{education.attachmentName}}</div>
            </div>
        </div>
    </div>
    <div class="w-full flex pr-2">
        <div class="flex-auto"></div>
        <div v-if="addNew">
            <vs-button size="small" class="ml-auto mt-2" @click="addNew = false" color="danger">Cancel</vs-button>
        </div>
        <div class="pl-2" v-if="addNew">
            <vs-button size="small" class="mt-2" :disabled='btnDisabled' @click="saveData()">Save</vs-button>
        </div>
        <div class="pl-2" v-if="!addNew">
            <vs-button size="small" class="ml-auto mt-2" @click="addNew = true">Add new</vs-button>
        </div>
    </div>

</div>
</template>


<script>
    export default {
        name: 'new-edu-history',
        components: {

        },
        props: {
            reqData: {
                default: {},
            }
        },
        data() {
            return {
                userId:null,
                resultOption:['Division', 'CGPA'],
                degreeOption:[],
                degreeData:[],
                divisionOption:[],
                divisionData:[],
                instituteData:[],
                instituteOption:[],

                passinfYearList:null,

                addNew:false,

                education:{
                    degreeName:null,
                    instituteName:null,
                    instituteNameSelect:null,
                    passingYear:null,
                    resultType:'CGPA',
                    cgpa:null,
                    outof:null,
                    division:null,
                    viewCgpa:true,
                    viewDivision:false,
                    viewInstituteSelect:false,
                    viewInstituteinput:true,
                    attachmentName:null,
                    certificateAttachment:null,
                    hasFile:['certificateAttachment'],
                },
            }
        },
        mounted() {
            if (this.reqData.userData) { this.loadData(); }
        },
        methods: {
            async loadData() {
                this.userId = this.reqData.userData.id;

                this.degreeOption = this.reqData.degreeList;
                this.degreeData = this.reqData.degreeData;

                this.divisionOption = this.reqData.divisionList;
                this.divisionData = this.reqData.divisionData;

                this.instituteData = this.reqData.instituteData;
                this.instituteOption = this.reqData.instituteList;

                var year = new Date().getFullYear()-80;
                var yearData = [];
                for(var i=0; 80>i; i++){yearData.unshift(year+i)}
                this.passinfYearList = yearData;

            },
            attachmentInput(){
                var fileData=document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    var input = e.target;
                    if (input.files && input.files[0]) {
                        this.education.certificateAttachment = input.files[0];
                        this.education.attachmentName = input.files[0].name;

                    }
                }
            },
            manageEducation(type, item){
                if(type == 'resultType'){
                    if(item.resultType != null){
                        if(item.resultType.toLowerCase() == 'division'){
                            this.education.viewDivision=true;
                            this.education.viewCgpa=false;
                        }else if(item.resultType.toLowerCase() == 'cgpa'){
                            this.education.viewDivision=false;
                            this.education.viewCgpa=true;
                        }
                    }
                }else if(type == 'degreeType'){
                    if(item.degreeName != null){
                        if(item.degreeName.toLowerCase() == 'undergraduate' || item.degreeName.toLowerCase() == 'postgraduate' || item.degreeName.toLowerCase() == 'phd'){
                            this.education.viewInstituteSelect=true;
                            this.education.viewInstituteinput=false;
                        }else{
                            this.education.viewInstituteSelect=false;
                            this.education.viewInstituteinput=true;
                        }
                    }
                }else if(type == 'otherInstitute'){
                    if(item.instituteNameSelect != null){
                        if(item.instituteNameSelect.toLowerCase() == 'others'){
                            this.education.viewInstituteSelect=true;
                            this.education.viewInstituteinput=true;
                        }else{
                            this.education.viewInstituteSelect=true;
                            this.education.viewInstituteinput=false;
                            this.education.instituteName=item.instituteNameSelect;
                        }
                    }
                }
            },
            async saveData() {
                this.btnDisabled = true;
                this.education.userId=this.userId;
                var formData = new FormData();
                formFiles(this.education, formData)
                formData.append('data', JSON.stringify(this.education));

                axios.post('/api/user-edit/data/education-history-create',formData)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.addNew = false;
                        this.education.degreeName=null;
                        this.education.instituteName=null;
                        this.education.instituteNameSelect=null;
                        this.education.passingYear=null;
                        this.education.resultType='CGPA';
                        this.education.cgpa=null;
                        this.education.outof=null;
                        this.education.division=null;
                        this.education.viewCgpa=true;
                        this.education.viewDivision=false;
                        this.education.viewInstituteSelect=false;
                        this.education.viewInstituteinput=true;
                        this.education.attachmentName=null;
                        this.education.certificateAttachment=null;
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
