<template>
    <div id="nominee-info-view">
        <vs-popup mediumscreen :title="pop_title" class="" :active.sync="popUp">
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="Nominee Name" v-model="nominee.familymembername"/>
                    <validate-data rules="required" :value="nominee.familymembername" :name="'familymembername'"
                                   altName="family member name"/>
                </div>
                <div class="mt-4 vx-col md:w-1/2 w-full">
                    <vs-select v-model="selectedType" class="w-full" placeholder="Relationship type"
                               label="Relationship Type" autocomplete>
                        <vs-select-item :key="index" :value="item.value" :text="item.label"
                                        v-for="(item,index) in relationshipTypeData"/>
                    </vs-select>
                    <validate-data rules="required" :value="selectedType" :name="'relationshiptype'"
                                   altName="relationship type"/>
                </div>

                <div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="Nominee Contact Number" v-model="nominee.phone_number"/>
                    <validate-data rules="required" :value="nominee.phone_number" :name="'nominee_phone'"
                                   altName="nominee phone number"/>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <v-date-picker v-model="nominee.birth_date" color="purple" :masks="{ input: 'YYYY-MM-DD' }"
                                   :max-date="new Date()">
                        <template v-slot="{ inputValue, inputEvents }">
                            <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4"
                                      label="Nominee Date of Birth" :value="inputValue" v-on="inputEvents"/>
                        </template>
                    </v-date-picker>
                </div>
                <div class="vx-col md:w-1/2 w-full py-3">
                    <div class="pt-3 pr-3 font-bold">Identification Document:</div>
                    <div class="flex">
                        <div>
                            <vs-button size="small" color="gray" class="ml-auto mt-2" icon-pack="feather"
                                       icon="icon-upload" @click="attachmentInput()">Upload
                            </vs-button>
                        </div>
                        <div class="pl-3 pt-3">{{nominee.attachmentName}}</div>
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full" v-if="showShare">

                    <vs-input class="w-full mt-4" type="number"
                              :label="'Share (%) (Available: '+ shareData.not_used+'%)'" min="0"
                              :max="shareData.not_used" v-model="nominee.share"/>
                    <validate-data rules="required" :value="nominee.share" :name="'share'" altName="Share"/>
                </div>

                <div class="vx-col  w-full">
                    <div class="mt-4 pt-1">
                        <vs-checkbox v-model="nominee.is_nominee">Nominee</vs-checkbox>
                    </div>
                </div>

            </div>

            <div class="vx-row mt-3">

            </div>
            <div v-show="mode.save" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="create()">Save</vs-button>
            </div>
            <div v-show="mode.edit" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="update()">Update</vs-button>
            </div>
        </vs-popup>
        <div class="vx-col w-full bg-white pt-3">
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <div class="flex items-end px-3">
                        <feather-icon svgClasses="w-6 h-6" icon="BriefcaseIcon" class="mr-2"/>
                        <span class="font-medium text-lg leading-none">Family & Nominee</span>
                    </div>
                </div>
                <div class="vx-col w-1/2">

                    <div class="float-right pr-3">
                        <vs-button size="small" icon-pack="feather" icon="icon-plus"
                                   @click="callPopup('add')"></vs-button>

                    </div>
                </div>
            </div>
            <vs-divider/>
        </div>
        <div v-for="(tr,k) in nominees" :key="k">
            <vx-card class="mb-base">
                <div class="vx-row">
                    <div class="vx-col  lg:w-10/12 md:w-10/12 w-7/12">
                       <div class="vx-row">
                           <!-- Education - Col 1 -->
                           <div class="vx-col lg:w-6/12 md:w-6/12 w-full ">

                               <table>
                                   <tr>
                                       <td class="font-semibold">Nominee Name</td>
                                       <td>{{tr.nominee_name}}</td>
                                   </tr>
                                   <tr>
                                       <td class="font-semibold">Nominee Birtdate</td>
                                       <td>{{tr.formatted_birth_date}}</td>
                                   </tr>
                                   <tr v-if="tr.attachment_name">
                                       <td class="font-semibold">Identification Attachment</td>
                                       <td >
                                           <a :href="tr.file_path"
                                              :download="tr.attachment_name"
                                              class="flex py-2 px-4 cursor-pointer ">
                                               <feather-icon icon="PaperclipIcon" svgClasses="w-4 h-4"/>
                                               <span class="ml-2">{{tr.attachment_name}}</span>
                                           </a>

                                       </td>
                                   </tr>
                               </table>
                           </div>
                           <!-- Education - Col 2 -->
                           <div class="vx-col lg:w-6/12 md:w-6/12 w-full ">
                               <table>
                                   <tr>
                                       <td class="font-semibold">Relation</td>
                                       <td>{{tr.relation}}</td>
                                   </tr>
                                   <tr v-if="tr.is_nominee">
                                       <td class="font-semibold">Nominee Share</td>
                                       <td>{{tr.nominee_share}}%</td>
                                   </tr>
                                   <tr>
                                       <td class="font-semibold">Phone Number</td>
                                       <td>{{tr.phone_number}}</td>
                                   </tr>
                               </table>
                           </div>
                       </div>
                    </div>
                    <div class="vx-col lg:w-2/12 md:w-2/12 w-5/12">
                        <div class="float-right pr-3">
                            <vs-button size="small" icon-pack="feather" icon="icon-edit"
                                       @click="callPopup('edit',tr)"></vs-button>
                        </div>
                        <div class="float-right pr-3">
                            <vs-button size="small" icon-pack="feather" icon="icon-x" color="danger"
                                       @click="actionConfirm(tr.nominee_id, deleteDataProceed, `delete ${tr.nominee_name}`)"
                            ></vs-button>
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
                nominees: [],
                shareData: {
                    not_used: 100,
                    used: null,
                },
                popUp: false,
                mode: {
                    add: true,
                    edit: false,
                },
                pop_title: "New Nominee/Family",


                total_used_percent: null,
                relationshipTypeData: [],
                addNew: false,
                nominee_id: null,
                userId: null,
                selectedType: '',
                nominee: {
                    familymembername: null,
                    relationshiptype: null,
                    birth_date: null,
                    phone_number: null,
                    hasFile: ['Attachment'],
                    Attachment: null,
                    attachmentName: null,
                    share: null,
                    is_nominee: false,
                },
                show_share: false,
            }
        },
        computed: {
            showShare() {
               // let st = this.show_share;
                if (this.nominee.is_nominee === true){
                    var st = true;
                }else{
                    this.nominee.share= null;
                    st =false;
                }
                return st;
            },
        },
        methods: {
            fetchNomineeInfo() {
                axios.get(`/api/profile/nominee-info/${this.$route.params.id}`)
                    .then(response => {
                        if (response.status === 200) {
                            this.nominees = [];
                            this.shareData.not_used = response.data.share_data.available_percent;
                            this.shareData.used = response.data.share_data.total_percent;
                            this.nominees = response.data.nominees;
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        this.user_not_found = true
                    });
            },

            attachmentInput() {
                var fileData = document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    var input = e.target;
                    if (input.files && input.files[0]) {
                        this.nominee.Attachment = input.files[0];
                        this.nominee.attachmentName = input.files[0].name;

                    }
                }
            },

            callPopup(type, data) {

                this.nominee.Attachment = null;
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_RELATIONSHIP_TYPE}`)
                    .then(response => {
                        this.relationshipTypeData = response.data.items;
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })


                if (type === 'add') {
                    this.pop_title = 'New Nominee/Family';
                    this.mode.save = true;
                    this.mode.edit = false;
                    this.nominee_id = null;
                    this.nominee.familymembername = null;
                    this.selectedType = '';
                    this.nominee.birth_date = null;
                    this.nominee.share = null;
                    this.nominee.phone_number = null;
                    this.nominee.attachmentName = null;
                    this.popUp = !this.popUp;
                    this.nominee.is_nominee = false;
                    this.show_share = false;

                }
                if (type === 'edit') {
                    this.pop_title = 'Edit Nominee/Family Information';
                    this.mode.save = false;
                    this.mode.edit = true;
                    this.popUp = !this.popUp;
                    this.nominee_id = data.nominee_id;
                    this.nominee.familymembername = data.nominee_name;
                    this.selectedType = data.type_id;
                    this.nominee.birth_date = data.nominee_birth_date;
                    this.nominee.share = data.nominee_share;
                    this.nominee.phone_number = data.phone_number;
                    this.nominee.attachmentName = data.attachment_name;

                    if (data.is_nominee === 1){
                        this.nominee.is_nominee = true;
                    }else{
                        this.nominee.is_nominee = false;
                    }


                }


            },
            create() {
                this.btnDisabled = true;
                var data = {
                    'userid': this.$route.params.id,
                    'data': this.nominee,
                    'relation_type': this.selectedType,
                    'attachment': this.nominee.Attachment,
                }
                var formData = new FormData();
                formFiles(this.nominee, formData)
                formData.append('data', JSON.stringify(data));
                axios.post('/api/profile/nominee-create', formData)
                    .then(response => {
                        this.notificationAlert(response);
                        this.popUp = !this.popUp;
                        this.btnDisabled = false;
                        this.fetchNomineeInfo();
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                        this.btnDisabled = false;
                    })

            },
            update() {
                this.btnDisabled = true;
                var data = {
                    'nominee_id': this.nominee_id,
                    'user_id': this.$route.params.id,
                    'relation_type': this.selectedType,
                    'data': this.nominee,
                    'attachment': this.nominee.Attachment,
                }
                var formData = new FormData();
                formFiles(this.nominee, formData)
                formData.append('data', JSON.stringify(data));
                axios.post('/api/profile/nominee-update', formData)
                    .then(response => {
                        this.notificationAlert(response);
                        this.popUp = !this.popUp;
                        this.btnDisabled = false;
                        this.fetchNomineeInfo();
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                        this.btnDisabled = false;
                    })

            },

            deleteDataProceed(Deldata) {

                axios.get(`/api/profile/nominee-delete/${Deldata}`)
                    .then(response => {
                        this.notificationAlert(response);
                        this.fetchNomineeInfo();
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })

            },

        },
        mounted() {

        },
        created() {
            this.fetchNomineeInfo();
        },
    }
</script>

<style lang="scss">
    #nominee-info-view {
        table {
            td {
                vertical-align: top;
                min-width: 140px;
                padding-bottom: .8rem;

            }
        }
    }

    @media screen and (min-width: 1201px) and (max-width: 1211px),
    only screen and (min-width: 636px) and (max-width: 991px) {
        .nominee-info-col-1 {
            width: calc(100% - 12rem) !important;
        }

    }

</style>
