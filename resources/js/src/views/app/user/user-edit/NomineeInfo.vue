<template>
    <div>
        <div v-if="!editMode">
            <div>
                <div class="vx-col w-full flex pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                    <div class="flex-auto font-bold">Nominee - {{ ser+1 }}</div>
                    <div><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteNominee(defItem.id)"></vs-button></div>
                    <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="editMode =! editMode"></vs-button></div>
                </div>
                <div class="vx-row">
                    <div class="mt-4 vx-col md:w-1/2 w-full">
                        <div class="w-full"><span class="font-bold pr-2">Family member name:</span>{{defItem.familymembername}}</div>
                    </div>
                    <div class="mt-4 vx-col md:w-1/2 w-full">
                        <div class="w-full"><span class="font-bold pr-2">Relationship type:</span>{{defItem.relationshiptype}}</div>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <div class="mt-4 pt-1">
                            <div class="w-full"><span class="font-bold pr-2">Status:</span>{{defItem.nominee}}</div>
                        </div>
                    </div>
                    <div class="vx-col md:w-1/2 w-full py-3" v-if="defItem.savedFileName != null">
                          <a :href="defItem.nomineeAttachment" :download="defItem.savedFileName"
                                class="flex py-2 px-4 cursor-pointer "
                               >
                            <feather-icon icon="PaperclipIcon" svgClasses="w-4 h-4"/>
                            <span class="ml-2">{{defItem.savedFileName}}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="editMode">
            <div>
                <div class="vx-col w-full flex pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                    <div class="flex-auto font-bold">Nominee - {{ ser+1 }}</div>
                    <div>
                        <vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteNominee()"></vs-button>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="* family member name " v-model="nominee.familymembername" />
                        <validate-data rules="required" :value="nominee.familymembername" :name="'familymembername'" altName="family member name" />
                    </div>
                    <div class="mt-4 vx-col md:w-1/2 w-full">
                        <vs-select v-model="nominee.relationshiptype" class="w-full" placeholder="Relationship type" label="* Relationship type">
                            <vs-select-item :key="index" :value="item.id" :text="item.value" v-for="(item,index) in relationshipTypeData" />
                        </vs-select>
                        <validate-data rules="required" :value="nominee.relationshiptype" :name="'relationshiptype'" altName="relationship type" />
                    </div>
                    <div class="vx-col md:w-1/2 w-full py-3">
                        <div class="pt-3 pr-3 font-bold">Id attachment: </div>
                        <div class="flex">
                            <div>
                                <vs-button size="small" color="gray" class="ml-auto mt-2" @click="attachmentInput()">browse</vs-button>
                            </div>
                            <div class="pl-3 pt-3">{{nominee.nomineeAttachmentName}}</div>
                        </div>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <div class="mt-4 pt-1">
                            <vs-checkbox v-model="nominee.nominee">Nominee</vs-checkbox>
                        </div>
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
        components: {},
        name: 'nominee-info',
        props: {
            reqData: {
                default: {},
            },
            nominee: {
                type: Object,
                default() {
                    return {}
                }
            },
            ser: {
                default: null,
            }
        },
        data() {
            return {
                defItem: {},
                userId: null,
                relationTypeOption: [],
                relationshipTypeData: [],
                editMode: false,
            }
        },
        filters: {
            truncate: function (text, length, suffix) {
                if (text.length > length) {
                    return text.substring(0, length) + suffix;
                } else {
                    return text;
                }
            },
        },
        mounted() {
            if (this.reqData.userData) {
                this.loadData();
            }
        },
        methods: {
            async loadData() {
                this.defItem = _.cloneDeep(this.nominee);
                this.userId = this.reqData.userData.id;

                this.relationTypeOption = this.reqData.relationshipTypeList;
                this.relationshipTypeData = this.reqData.relationshipTypeData;

                this.defItem.relationshiptype = _.filter(this.relationshipTypeData, {id: Number(this.defItem.relationshiptype)})[0].value;
                if (this.defItem.nominee == true) {
                    this.defItem.nominee = 'Nominee'
                } else {
                    this.defItem.nominee = 'Family member'
                }

            },
            attachmentInput() {
                var fileData = document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    var input = e.target;
                    if (input.files && input.files[0]) {
                        this.nominee.nomineeIdAttachment = input.files[0];
                        this.nominee.nomineeAttachmentName = input.files[0].name;

                    }
                }
            },
            deleteNominee(deldata) {

                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: 'Are you sure, you want to delete this nominee?',
                    acceptText: 'ok',
                    accept: this.deleteDataProceed,
                    parameters: deldata,
                })
            },
            deleteDataProceed(Deldata) {
                var data = {
                    id: Deldata,
                }
                axios.post('/api/user-edit/data/nominee-delete', data)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                    })
                    .catch(error => {
                        this.errorData = error.response.data.errors;
                        this.notificationAlert(error.response);

                    })
            },
            saveData() {
                this.btnDisabled = true;
                this.nominee.userId = this.userId;

                var formData = new FormData();
                formFiles(this.nominee, formData)
                formData.append('data', JSON.stringify(this.nominee));
                axios.post('/api/user-edit/data/nominee-update', formData)
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
