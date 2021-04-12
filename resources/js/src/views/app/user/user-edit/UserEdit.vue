<template>
    <vx-card title="">
        <div>
            <!-- <div @click="chkData()">Check Daata</div> -->
            <div>

                <vs-tabs class="tab-action-btn-fill-container">
                    <vs-tab label="Login Info" icon-pack="feather" icon="icon-file-text">
                        <login-info :reqData="reqData"/>
                    </vs-tab>
                    <vs-tab label="General Info" icon-pack="feather" icon="icon-file-text" style="min-height:300px">
                        <general-info :reqData="reqData"/>
                    </vs-tab>
                    <vs-tab label="Feature" icon-pack="feather" icon="icon-file-text">
                        <feature-info :reqData="reqData"/>
                    </vs-tab>
                    <vs-tab label="Organization tree" icon-pack="feather" icon="icon-file-text"
                            style="min-height:300px">
                        <div>
                            <div class="" style="min-height:220px">
                                <v-jstree :data="organizationTree" size="large"  show-checkbox
                                          @item-click="treeItemClick"></v-jstree>
                            </div>
                            <div class="flex" v-if="treeSaveBtn">
                                <div class="flex-auto"></div>
                                <div>
                                    <vs-button size="small" class="mt-2" @click="updateTree()">Save</vs-button>
                                </div>
                            </div>
                        </div>
                    </vs-tab>
                    <vs-tab label="Education History" icon-pack="feather" icon="icon-file-text"
                            style="min-height:300px">
                        <div v-for="(item, index) in educationData" :key="index">
                            <edu-history :reqData="reqData" :education="item" :ser="index"/>
                        </div>
                        <new-edu-history :reqData="reqData"/>
                    </vs-tab>
                    <vs-tab label="Job History" icon-pack="feather" icon="icon-file-text" style="min-height:300px">
                        <div v-for="(item, index) in jobHistoryData" :key="index">
                            <job-history :reqData="reqData" :job="item" :ser="index"/>
                        </div>
                        <div class="w-full">
                            <new-job-history :reqData="reqData"/>
                        </div>
                    </vs-tab>
                    <vs-tab label="Nominee" icon-pack="feather" icon="icon-file-text" style="min-height:300px">
                        <div v-for="(item, index) in nomineeData" :key="index">
                            <nominee-info :reqData="reqData" :nominee="item" :ser="index"/>
                        </div>
                        <div>
                            <new-nominee :reqData="reqData"/>
                        </div>
                    </vs-tab>
                    <vs-tab label="Skill Matrix" icon-pack="feather" icon="icon-file-text" style="min-height:300px">
                        <div v-for="(item, index) in skillMatrixData" :key="index">
                            <skill-info :reqData="reqData" :skill="item" :ser="index"/>
                        </div>
                        <div>
                            <new-skill :reqData="reqData"/>
                        </div>
                    </vs-tab>
                    <vs-tab label="Employee Docs" icon-pack="feather" icon="icon-file-text" style="min-height:300px">
                        <div v-for="(item, index) in EmployeeDocumentData" :key="index">
                            <employee-document :reqData="reqData" :doc="item" :ser="index"/>
                        </div>
                        <div>
                            <new-employee-document :reqData="reqData"/>
                        </div>
                    </vs-tab>
                </vs-tabs>
            </div>
        </div>

    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
    import {Cropper} from 'vue-advanced-cropper'
    import VJstree from 'vue-jstree';

    import loginInfo from './LoginInfo';
    import eduHistory from './EduHistory';
    import newEduHistory from './NewEduHistory';
    import featureInfo from './FeatureInfo';
    import generalInfo from './GeneralInfo';
    import jobHistory from './JobHistory';
    import newJobHistory from './NewJobHistory';
    import nomineeInfo from './NomineeInfo';
    import newNominee from './NewNominee';
    import EmployeeDocument from './EmployeeDocument';
    import newEmployeeDocument from './NewEmployeeDocument';
    import skillInfo from './SkillInfo';
    import newSkill from './NewSkill';
    import tree from './Tree';

    export default {
        components: {
            vSelect,
            Cropper,
            VJstree,

            loginInfo,
            eduHistory,
            newEduHistory,
            featureInfo,
            generalInfo,
            jobHistory,
            newJobHistory,
            nomineeInfo,
            newNominee,
            EmployeeDocument,
            newEmployeeDocument,
            skillInfo,
            newSkill,
            tree,

        },
        props: {},
        data() {
            return {
                reqData: {},

                treeSaveBtn: false,

                //Organization Tree
                selectedTree: null,
                organizationTree: [],

                //Education
                educationData: [],
                instituteData: [],
                instituteOption: [],

                //Job History
                jobHistoryData: [],

                //Nominee
                nomineeData: [],

                //Skillmatrix
                skillMatrixData: [],

                //Employee Document
                EmployeeDocumentData: []


            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            chkData() {
                this.loadData();
            },

            async loadData() {
                var data = {
                    id: this.$route.params.id,
                }
                try {
                    var req = await axios.post('/api/user-edit/data', data);
                    this.reqData = req.data;


                    //Org Tree
                    this.organizationTree = req.data.organizationTree;

                    //Others
                    this.userData = {
                        password: null,
                        name: req.data.userData.name,
                        email: req.data.userData.email,
                        company: req.data.userData.company,
                        phone: req.data.userData.phone,
                        id: req.data.userData.id,
                    };

                    this.instituteData = req.data.instituteData;
                    this.instituteOption = req.data.instituteList;

                    var educationHistory = [];
                    for (var i = 0; req.data.educationhistory.length > i; i++) {
                        let eduData = req.data.educationhistory[i];
                        let data = {
                            attachmentName: null,
                            certificateAttachment: null,
                            hasFile: ['certificateAttachment'],
                        }
                        data.degreeName = eduData.degreename;
                        data.instituteName = eduData.institutename;
                        data.instituteNameSelect = eduData.institutename;
                        data.passingYear = eduData.passingyear;
                        data.resultType = eduData.resulttype;
                        data.savedFileName = eduData.certificateattachment;
                        data.id = eduData.id;
                        data.eduAttachment = '/storage/company-' + req.data.userData.companyid + '/user-' + req.data.userData.id + '/document/' + eduData.certificateattachment;


                        data.cgpa = eduData.cgpa;
                        data.outof = eduData.outof;
                        if (eduData.resulttype == 'CGPA') {
                            data.viewCgpa = true;
                        }

                        data.division = eduData.division;
                        if (eduData.resulttype == 'Division') {
                            data.viewDivision = true
                        }

                        if (eduData.degreename.toLowerCase() == 'undergraduate' || eduData.degreename.toLowerCase() == 'postgraduate' || eduData.degreename.toLowerCase() == 'phd') {
                            if (this.instituteOption.indexOf(eduData.institutename) > -1) {
                                data.viewInstituteSelect = true;
                                data.viewInstituteinput = false;
                            } else {
                                data.viewInstituteSelect = false;
                                data.viewInstituteinput = true;
                            }
                        } else {
                            data.viewInstituteSelect = false;
                            data.viewInstituteinput = true;
                        }
                        data.attachmentDownload = eduData.certificateattachment;
                        educationHistory.push(data);
                    }
                    this.educationData = educationHistory;

                    var jobHistory = [];
                    for (var i = 0; req.data.jobhistory.length > i; i++) {
                        let job = req.data.jobhistory[i];
                        let data = {}
                        data.orgName = job.orgname;
                        data.designation = job.designation;
                        data.jobDuration = {'start': job.jobstartdate, 'end': job.jobclosedate};
                        data.responsibility = job.responsibility;
                        data.skill = job.skill;
                        data.id = job.id;
                        jobHistory.push(data);
                    }
                    this.jobHistoryData = jobHistory;


                    var nomineeData = [];
                    for (var i = 0; req.data.nominee.length > i; i++) {
                        let nominee = req.data.nominee[i];
                        let data = {
                            hasFile: ['nomineeIdAttachment'],
                            nomineeIdAttachment: null,
                            nomineeAttachmentName: null,
                        }
                        data.familymembername = nominee.familymembername;
                        data.relationshiptype = nominee.relationshiptype;
                        data.nominee = nominee.nominee;
                        data.id = nominee.id;
                        data.nomineeAttachment = '/storage/company-' + req.data.userData.companyid + '/user-' + req.data.userData.id + '/document/' + nominee.verificationidfile;
                        data.savedFileName = nominee.verificationidfile;
                        nomineeData.push(data);
                    }
                    this.nomineeData = nomineeData;

                    var skillMatrix = [];
                    for (var i = 0; req.data.skillmatrice.length > i; i++) {
                        let skill = req.data.skillmatrice[i];
                        let data = {}
                        data.skillsname = skill.skillsname;
                        data.skillsscale = skill.skillsscale;
                        data.id = skill.id;
                        skillMatrix.push(data);
                    }
                    this.skillMatrixData = skillMatrix;

                    var documentData = [];
                    for (var i = 0; req.data.employee_document.length > i; i++) {
                        let doc = req.data.employee_document[i];
                        let data = {
                            documentTitle: null,
                            documentFiles: null,
                            hasFile: ['documentAttachment'],
                            documentAttachment: null,
                            documentAttachmentName: null,
                        }
                        data.document_title = doc.document_title;
                        data.document = doc.employee_document;
                        data.id = doc.id;
                        data.document_attachment = '/storage/company-' + req.data.userData.companyid + '/user-' + req.data.userData.id + '/document/' + doc.document_attachment;
                        data.savedFileName = doc.document_attachment;
                        documentData.push(data);
                    }
                    this.EmployeeDocumentData = documentData;
                } catch (err) {
                    this.notificationAlert(err.response);
                    console.log(err)
                }
            },

            treeItemClick(node, item, e) {

                this.selectedTree = item;
                this.treeSaveBtn = true;
            },

            updateTree() {
                if (this.selectedTree != null) {

                    let data = {
                        id: this.reqData.userData.id,
                        selectedTree: this.selectedTree.organizationid,
                    }

                     axios.post('/api/user-edit/data/organization-tree-update', data)
                         .then(response => {
                             this.notificationAlert(response);
                             this.loadData();
                             this.treeSaveBtn = false;
                         })
                         .catch(error => {
                             this.errorData = error.response.data.errors;
                             this.notificationAlert(error.response);

                         })

                }
            },
        }
    }
</script>
