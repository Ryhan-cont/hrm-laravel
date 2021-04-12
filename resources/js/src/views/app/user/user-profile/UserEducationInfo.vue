<template>
    <div id="edu-info-view">
        <vs-popup mediumscreen :title="popup_title" class="" :active.sync="eduAdd">

            <div class="vx-row">

                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">

                        <vs-select v-model="selectedDegree" class="w-full" placeholder="Degree Name"
                                   label="Degree Name" @input="manageEducation('degreeType', selectedDegree)"
                                   autocomplete>
                            <vs-select-item :key="degreeIndex" :value="degreeItIem.value" :text="degreeItIem.label"
                                            v-for="(degreeItIem,degreeIndex) in degreeData"/>
                        </vs-select>
                        <validate-data rules="required" :value="selectedDegree" :name="'degreeName'"
                                       altName="degree name"/>
                    </div>
                    <div class="mt-4" v-show="viewInstituteList">
                        <vs-select v-model="selectedInstitute" class="w-full" placeholder="Institute Name"
                                   label="Institute Name"
                                   @input="manageEducation('otherInstitute', selectedInstitute)" autocomplete>
                            <vs-select-item :key="instituteIndex" :value="instituteItem.value"
                                            :text="instituteItem.label"
                                            v-for="(instituteItem,instituteIndex) in instituteData"/>
                        </vs-select>
                        <validate-data rules="required" :value="selectedInstitute" :name="'instituteName'"
                                       altName="institute name"/>
                    </div>
                    <div class="mt-4" v-show="!viewInstituteList">
                        <vs-input class="w-full mt-4" label="Institute Name" v-model="instituteName"/>
                        <validate-data rules="required" :value="instituteName" :name="'instituteName'"
                                       altName="institute name"/>
                    </div>
                    <div class="mt-4">
                        <vs-select v-model="passingYear" class="w-full" placeholder="Passing Year"
                                   label="Passing Year" autocomplete>
                            <vs-select-item :key="passingYearIndex" :value="passingYearItem" :text="passingYearItem"
                                            v-for="(passingYearItem,passingYearIndex) in yearList"/>
                        </vs-select>
                        <validate-data rules="required" :value="passingYear" :name="'passingYear'"
                                       altName="passing year"/>
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">
                        <div class="mt-4">
                            <vs-select v-model="selectedResultType" class="w-full" placeholder="Result Type"
                                       label="Result Type" @input="manageEducation('resultType', selectedResultType)"
                                       autocomplete>
                                <vs-select-item :key="resultIndex" :value="resultIem" :text="resultIem"
                                                v-for="(resultIem,resultIndex) in resultOption"/>
                            </vs-select>
                            <validate-data rules="required" :value="selectedResultType" :name="'resultType'"
                                           altName="result type"/>
                        </div>
                    </div>
                    <div class="mt-3" v-show="viewForCGPA">
                        <vs-input class="w-full" label="Out Of" v-model="result.outof" min="1" max="5"/>
                        <validate-data rules="required" :value="result.outof" :name="'outof'" altName="out of"/>
                    </div>
                    <div class="mt-3" v-show="viewForCGPA">
                        <vs-input class="w-full mt-4" label="CGPA" v-model="result.cgpa" min="1" max="5"/>
                        <validate-data rules="required" :value="result.cgpa" :name="'cgpa'" altName="CGPA"/>
                    </div>
                    <div class="mt-4" v-show="!viewForCGPA">
                        <div class="mt-4">
                            <vs-select v-model="result.division" class="w-full" placeholder="Division"
                                       label="Division" autocomplete>
                                <vs-select-item :key="divisionIndex" :value="divisionItem.value"
                                                :text="divisionItem.label"
                                                v-for="(divisionItem,divisionIndex) in divisionData"/>
                            </vs-select>
                            <validate-data rules="required" :value="result.division" :name="'division'"
                                           altName="division"/>
                        </div>
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full py-3">
                    <div class="pt-3 pr-3 font-bold">Certificate Attachment:</div>
                    <div class="flex">
                        <div>
                            <vs-button size="small" color="gray" class="ml-auto mt-2" icon-pack="feather"
                                       icon="icon-upload" @click="attachmentInput()">Upload
                            </vs-button>
                        </div>
                        <div class="pl-3 pt-3">{{doc.attachmentName}}</div>
                    </div>
                </div>
            </div>

            <div class="vx-row mt-3">

            </div>
            <div v-show="mode.save" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="EducationAdd()">Save</vs-button>
            </div>
            <div v-show="mode.edit" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="EducationEdit()">Update</vs-button>
            </div>
        </vs-popup>
        <div class="vx-col w-full bg-white pt-3">
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <div class="flex items-end px-3">
                        <feather-icon svgClasses="w-6 h-6" icon="BookIcon" class="mr-2"/>
                        <span class="font-medium text-lg leading-none">Education History</span>

                    </div>
                </div>
                <div class="vx-col w-1/2">
                    <div class="float-right pr-3">
                        <vs-button size="small" icon-pack="feather" icon="icon-plus"
                                   @click="callPopup('edu_add')"></vs-button>
                    </div>
                </div>
            </div>


            <vs-divider/>
        </div>

        <div v-for="(tr,k) in edu_infos" :key="k">
            <vx-card class="mb-base">
                <div class="vx-row">
                    <div class="vx-col  lg:w-10/12 w-8/12">
                        <div class="vx-row">

                            <div class="vx-col lg:w-6/12 md:w-8/12 w-full">
                                <table style="width: 100%">
                                    <tr>
                                        <td class="font-semibold" style="width: 35%">Degree Name</td>
                                        <td style="width: 65%">{{tr.degree_name}}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold" style="width: 35%">Institute</td>
                                        <td style="width: 65%">{{tr.institute_name}}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold" style="width: 35%">Passing Year</td>
                                        <td style="width: 65%">{{tr.passing_year}}</td>
                                    </tr>
                                </table>
                            </div>
                            <!-- Education - Col 2 -->
                            <div class="vx-col lg:w-6/12 md:w-8/12">
                                <table style="width: 100%">
                                    <tr>
                                        <td class="font-semibold" style="width: 35%">Result Type</td>
                                        <td style="width: 65%">{{tr.result_type}}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold" style="width: 35%">Result</td>
                                        <td style="width: 65%" v-if="tr.result.cgpa"> {{tr.result.cgpa}} out of {{tr.result.out_of}}</td>
                                        <td style="width: 65%" v-else> {{tr.result.division}}</td>
                                    </tr>
                                    <tr v-if="tr.attachment_name">
                                        <td class="font-semibold" style="width: 35%">Attachment</td>
                                        <td style="width: 65%" >
                                            <a :href="tr.attachment_link"
                                               :download="tr.attachment_name"
                                               class="flex py-2  cursor-pointer ">
                                                <feather-icon icon="PaperclipIcon" svgClasses="w-4 h-4"/>
                                                <span class="ml-2">{{tr.attachment_name}}</span>
                                            </a>

                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="vx-col  lg:w-2/12 w-4/12">
                        <div class="float-right pr-3">
                            <vs-button size="small" icon-pack="feather" icon="icon-edit"
                                       @click="callPopup('edu_edit',tr)"></vs-button>
                        </div>
                        <div class="float-right pr-3">
                            <vs-button size="small" icon-pack="feather" icon="icon-x" color="danger"
                                       @click="actionConfirm(tr.edu_id, deleteDataProceed, `delete ${tr.degree_name}`)" ></vs-button>
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

                popup_title: 'New Education History',
                eduAdd: false,
                isDisabled: false,
                viewInstituteList: false,
                viewForCGPA: true,
                //viewForDivision: false,
                mode: {
                    save: true,
                    edit: false,
                },

                degreeData: [],
                edu_infos: [],
                instituteData: [],
                resultOption: ['Division', 'CGPA'],
                divisionData: [],
                //yearList:[],
                selectedDegree: '',
                selectedInstitute: '',
                selectedResultType: '',

                instituteName: null,
                passingYear: null,
                edu_id: null,
                result: {
                    cgpa: null,
                    outof: null,
                    division: null,
                },
                doc:{
                    doc:true,
                    hasFile:['Attachment'],
                    attachmentName:null,
                    Attachment:null,
                },
            }
        },

        methods: {
            fetchEduInfo() {
                axios.get(`/api/profile/edu-info/${this.$route.params.id}`)
                    .then(response => {
                        //console.log(response);
                        if (response.status === 200) {
                            this.edu_infos = [];
                            this.edu_infos = response.data.education_info;
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        this.user_not_found = true
                    });
            },
            callPopup(type, data) {
                console.log('Hasib', data)
                axios.get('/api/profile/education-data')
                    .then(response => {
                        console.log(response)
                        this.instituteData = response.data.instituteData;
                        this.divisionData = response.data.divisionData;
                        this.degreeData = response.data.degreeData;
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                if (type === 'edu_edit') {
                    this.edu_id = data.edu_id
                    this.mode.save = false;
                    this.mode.edit = true;
                    this.popup_title = 'Edit Education History'

                    this.selectedDegree = data.degree_id;
                    this.selectedResultType = data.result_type;
                    this.passingYear = data.passing_year;

                    if (data.result_type.toLowerCase() === "division"){
                        this.viewForCGPA = false;
                        this.result.division = data.result.division_id;
                        this.result.cgpa = null;
                        this.result.outof = null;
                    }else if(data.result_type.toLowerCase() === 'cgpa'){
                        this.viewForCGPA = true;
                        this.result.cgpa = data.result.cgpa;
                        this.result.outof = data.result.out_of;
                        this.result.division = null;
                    }
                    if (data.degree_id === this.$constants.CONST_GRADUATION || data.degree_id === this.$constants.CONST_POST_GRAD) {
                        this.viewInstituteList = true;
                        this.selectedInstitute = data.institute_info;
                    } else {
                        this.viewInstituteList = false;
                        this.instituteName = data.institute_name;
                    }

                    this.doc.Attachment = null;
                    this.doc.attachmentName = data.attachment_name;

                    this.eduAdd = !this.eduAdd;

                }
                if (type === 'edu_add') {
                    this.mode.save = true;
                    this.mode.edit = false;
                    this.popup_title = 'Add Education History'

                    this.selectedDegree = '';
                    this.selectedResultType = '';
                    this.passingYear = '';
                    this.result.cgpa = '';
                    this.result.outof = '';
                    this.result.division = '';
                    this.doc.Attachment = null;
                    this.instituteName = '';
                    this.selectedInstitute = '';
                    this.doc.Attachment = null;
                    this.doc.attachmentName = null;

                    this.eduAdd = !this.eduAdd;
                }
            },
            manageEducation(type, item) {
                console.log(item)
                if (type === 'resultType') {
                    if (item != null) {
                        if (item.toLowerCase() === 'division') {
                            this.result.cgpa = null;
                            this.result.outof = null;
                            this.viewForCGPA = false;
                        } else if (item.toLowerCase() === 'cgpa') {
                            this.result.division = null;
                            this.viewForCGPA = true;
                        }
                    }
                }
                if (type === 'degreeType') {
                    if (item != null) {
                        if (item === this.$constants.CONST_GRADUATION || item === this.$constants.CONST_POST_GRAD) {
                            this.viewInstituteList = true;
                            this.instituteName = '';
                        } else {
                            this.selectedInstitute = '';
                            this.viewInstituteList = false;
                        }
                    }
                }
            },
            attachmentInput() {
                var fileData = document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    var input = e.target;
                    if (input.files && input.files[0]) {
                        this.doc.Attachment = input.files[0];
                        this.doc.attachmentName = input.files[0].name;

                    }
                }
            },
            EducationAdd() {
                this.btnDisabled = true;
                let institute = null;
                if (this.instituteName !== '') {
                    institute = this.instituteName;
                } else {
                    institute = this.selectedInstitute;
                }
                var data = {
                    'id': this.$route.params.id,
                    'degree_name': this.selectedDegree,
                    'degree_type': this.selectedResultType,
                    'passing_year': this.passingYear,
                    'edu_id': this.edu_id,
                    'institute_name': institute,
                    'result': this.result,
                    'attachment':this.doc.Attachment,
                }
                var formData = new FormData();
                formFiles(this.doc, formData)
                formData.append('data', JSON.stringify(data));
                console.log(data)
                if (this.validateInput(data)) {
                    axios.post('/api/profile/education-history-add', formData)
                        .then(response => {
                            this.notificationAlert(response);
                            this.eduAdd = !this.eduAdd;
                            this.fetchEduInfo();
                        })
                        .catch(error => {
                            this.notificationAlert(error.response);
                        })
                }
            },
            deleteDataProceed(Deldata) {

                axios.get(`/api/profile/edu-delete/${Deldata}`)
                    .then(response => {
                        this.notificationAlert(response);
                        this.fetchEduInfo();
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })

            },
            EducationEdit() {
                this.btnDisabled = true;
                let institute = null;
                if (this.instituteName !== '') {
                    institute = this.instituteName;
                } else {
                    institute = this.selectedInstitute;
                }
                var data = {
                    'id': this.$route.params.id,
                    'degree_name': this.selectedDegree,
                    'degree_type': this.selectedResultType,
                    'passing_year': this.passingYear,
                    'edu_id': this.edu_id,
                    'institute_name': institute,
                    'result': this.result,
                    'attachment':this.doc.Attachment,
                }
                console.log('Hasib', data)
                var formData = new FormData();
                formFiles(this.doc, formData)
                formData.append('data', JSON.stringify(data));
                axios.post('/api/profile/education-history-edit', formData)
                    .then(response => {
                        this.notificationAlert(response);
                        this.eduAdd = !this.eduAdd;
                        this.fetchEduInfo();
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
            },

        },
        mounted() {
            //this.yearList();
        },
        created() {
            this.fetchEduInfo();
        },

        computed: {
            yearList() {
                let year = new Date().getFullYear() - 100;
                let yearData = [];
                for (let i = 0; 104 > i; i++) {
                    yearData.unshift(year + i)
                }
                return yearData;
            }
        }
    }
</script>

<style lang="scss">
    #edu-info-view {
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
