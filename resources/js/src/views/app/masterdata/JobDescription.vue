<template>
    <vx-card title="">
        <div>
            <!-- <div @click="loadData()">Load Data</div> -->

            <div class="">
                <div class="flex">
                    <div class="flex-auto"></div>
                    <div>
                        <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New </vs-button>
                    </div>
                </div>
                <div class="pt-3" style="min-height:300px">
                    <vs-table max-items="10" pagination search stripe :data="jobDescription">
                        <template slot="thead">
                            <vs-th>Title</vs-th>
                            <vs-th>Key Responsibilities</vs-th>
                            <vs-th>
                                <div class="flex w-full">
                                    <div class="flex-auto">Skill</div>
                                    <div class="flex-auto" style="max-width:50px;">Scale</div>
                                </div>
                            </vs-th>
                            <vs-th class="w-10 text-center">Action</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                                <vs-td :data="tr.name">
                                    {{ tr.name }}
                                </vs-td>

                                <vs-td :data="tr.comment">
                                    {{ tr.comment }}
                                </vs-td>

                                <vs-td :data="tr.skills">
                                    <div>
                                        <div class="flex py-1" v-for="(skillItem, skillIndex) in tr.skills"
                                             :key="skillIndex">
                                            <div class="flex-auto">{{skillItem.skill}}</div>
                                            <div class="flex-auto" style="max-width:50px;">{{skillItem.scale}}</div>
                                        </div>
                                    </div>
                                </vs-td>


                                <vs-td class="w-10">
                                    <div class="flex pt-1">
                                        <div class="flex-auto cursor-pointer" align="center"
                                             @click="inputModal('edit', tr)"><i class="material-icons text-lg icon align">edit</i></div>
                                        <div class="flex-auto cursor-pointer" align="center"
                                             @click="deleteData(tr)"><i class="material-icons text-lg icon align">delete</i></div>
                                    </div>
                                </vs-td>

                            </vs-tr>
                        </template>
                    </vs-table>
                </div>
            </div>

            <vs-popup :title="modalTitle" :active.sync="inputModalSt">
                <form>
                    <div class="">
                        <div class="">
                            <div class="flex-auto">
                                <vs-input label-placeholder="Job Title" class="w-full pt-3" v-model="jobTitle"/>
                            </div>
                            <validate-data rules="required" :value="jobTitle" :name="'jobTitle'" altName="job Title"/>
                        </div>
                        <div v-for="(item, index) in skillData" :key="index">
                            <div class="vx-row pt-1">
                                <!--<div class="vx-col md:w-1/12 w-full pt-8">{{ index+1 }}</div>-->
                                <div class="vx-col md:w-5/12 w-full">
                                    <search-box label="Skill" v-model="item.skill" :items="prefix.jobSkillData"/>
                                    <validate-data rules="required" :value="item.skill"
                                                   :name="'skillData.'+index+'.skill'" altName="skill"/>
                                </div>
                                <div class="vx-col md:w-5/12 w-full overflow-hidden">
                                    <vs-select v-model="item.scale" class="w-full" label="Skill Scale" autocomplete>
                                        <vs-select-item :key="index" :value="item.name" :text="item.name"
                                                        v-for="(item,index) in prefix.jobSkillScaleData"/>
                                    </vs-select>
                                    <validate-data rules="required" :value="item.scale"
                                                   :name="'skillData.'+index+'.scale'" altName="scale"/>
                                </div>
                                <div class="vx-col md:w-1/12 w-full pt-6">
                                    <span class="centerx">
                                        <vs-tooltip text="Remove">
                                            <vs-button size="large" color="danger" type="flat" icon-pack="feather" icon="icon-x" class="flex-auto mr-3"
                                                       v-show="index || ( !index && skillData.length > 1)"
                                                       @click="manageSkill('delete',index)">
                                            </vs-button>
                                        </vs-tooltip>
                                        <vs-tooltip text="Add New">
                                            <vs-button size="large" color="primary" type="flat" icon-pack="feather" icon="icon-plus" class="flex-auto"
                                                       @click="manageSkill('newItem')"
                                                       v-show="index === skillData.length-1">
                                            </vs-button>
                                        </vs-tooltip>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="pt-6">
                            <vs-textarea v-model="keyResponsibilities" label="Key Responsibilities"/>
                        </div>
                        <validate-data rules="required" :value="keyResponsibilities" :name="'keyResponsibilities'"
                                       altName="key responsibilities"/>
                    </div>

                    <div class="mt-8">
                        <div v-if="modalType == 'new'" align="right" class="pt-1">
                            <vs-button :disabled='btnDisabled' @click="create()">Create</vs-button>
                        </div>
                        <div v-if="modalType == 'edit'" align="right" class="pt-1">
                            <vs-button :disabled='btnDisabled' @click="update()">Update</vs-button>
                        </div>
                    </div>
                </form>
            </vs-popup>
        </div>
    </vx-card>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                moduleData: [],
                inputModalSt: false,
                modalTitle: null,
                modalType: null,

                prefix: {
                    'jobSkillData': [],
                    'jobSkillScaleData': [],
                },

                jobDescription: [],

                jobTitle: '',
                keyResponsibilities: '',

                skillData: [],

                id: null,
            }
        },
        mounted() {
            this.loadData();
        },

        methods: {
            async loadData() {
                try {
                    var req = await axios.get('/api/job-description/data')
                    this.prefix.jobSkillData = req.data.jobSkill;
                    this.prefix.jobSkillScaleData = req.data.skillScale;
                    this.jobDescription = req.data.jobDescription;
                } catch (err) {
                    this.notificationAlert(err.response);
                }
            },

            inputModal(type, data = []) {

                this.inputModalSt = !this.inputModalSt;
                this.modalType = type;
                this.resetError();

                console.log(this.$store.state.formValidationField);
                if (type == 'new') {
                    this.modalTitle = 'Add New Job Description';
                    this.jobTitle = '';
                    this.keyResponsibilities = '';

                    this.manageSkill('new');

                } else if (type == 'edit') {
                    this.modalTitle = 'Edit Job Description';

                    this.jobTitle = data.name;
                    this.keyResponsibilities = data.comment;
                    this.skillData = _.cloneDeep(data.skills);
                    this.id = data.id;
                }

            },
            manageSkill(type, index = null) {
                let data = {
                    skill: null,
                    scale: null,
                }
                if (type == 'new') {
                    this.skillData = [];
                    this.skillData.push(data);
                }
                if (type == 'newItem') {
                    this.skillData.push(data);
                }
                if (type == 'delete') {
                    if (index > -1) {
                        this.skillData.splice(index, 1);
                    }
                }
            },

            create() {

                this.errorData = {};
                var data = {
                    jobTitle: this.jobTitle,
                    keyResponsibilities: this.keyResponsibilities,
                    skillData: this.skillData,
                }
                if (this.validateInput(data)) {
                    this.btnDisabled = true;
                    axios.post('/api/job-description/data/create', data)
                        .then(response => {
                            this.inputModalSt = false;
                            this.loadData();
                            this.notificationAlert(response);
                        })
                        .catch(error => {
                            this.notificationAlert(error.response);
                        })
                    this.btnDisabled = false;
                }
            },

            update() {
                this.errorData = {};
                var data = {
                    jobTitle: this.jobTitle,
                    keyResponsibilities: this.keyResponsibilities,
                    skillData: this.skillData,
                    id: this.id,
                }
                axios.post('/api/job-description/data/update', data)
                    .then(response => {
                        this.inputModalSt = false;
                        this.loadData();
                        this.notificationAlert(response);
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
            },

            deleteData(deldata) {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: 'Are you sure, you want to delete this Job Description?',
                    acceptText: 'ok',
                    accept: this.deleteDataProceed,
                    parameters: deldata,
                })
            },
            deleteDataProceed(Deldata) {
                var data = {
                    id: Deldata.id,
                }
                axios.post('/api/job-description/data/delete', data)
                    .then(response => {
                        this.loadData();
                        this.notificationAlert(response);
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })

            },
        }
    }
</script>
<style lang="scss">
    .vs-tooltip { z-index: 99999 !important; }
</style>
