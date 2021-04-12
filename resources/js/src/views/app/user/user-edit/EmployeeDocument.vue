<template>
    <div>
        <div v-if="!editMode">
            <div>
                <div class="vx-col w-full flex pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                    <div class="flex-auto font-bold">Document - {{ ser+1 }}</div>
                    <div>
                        <vs-button size="small" icon-pack="feather" icon="icon-x" color="danger"
                                   @click="deleteNominee(defItem.id)"></vs-button>
                    </div>
                    <div class="pl-2">
                        <vs-button size="small" icon-pack="feather" icon="icon-edit"
                                   @click="editMode =! editMode"></vs-button>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="mt-4 vx-col md:w-1/2 w-full">
                        <div class="w-full"><span class="font-bold pr-2">Document Title:</span>{{defItem.document_title}}
                        </div>
                    </div>
                    <div class="vx-col md:w-1/2 w-full py-3" v-if="defItem.savedFileName != null">
                        <a :href="defItem.document_attachment" :download="defItem.savedFileName"
                           class="flex py-2 px-4 cursor-pointer ">
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
                    <div class="flex-auto font-bold">Document - {{ ser+1 }}</div>
                    <div>
                        <vs-button size="small" icon-pack="feather" icon="icon-x" color="danger"
                                   @click="deleteNominee()"></vs-button>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="Documnet Title" v-model="defItem.document_title"/>
                        <validate-data rules="required" :value="defItem.document_title" :name="'Document Title'"
                                       altName="Document Title"/>
                    </div>
                    <div class="vx-col md:w-1/2 w-full py-3">
                        <div class="pt-3 pr-3 font-bold">Document attachment:</div>
                        <div class="flex">
                            <div>
                                <vs-button size="small" color="gray" class="ml-auto mt-2" @click="attachmentInput()">
                                    browse
                                </vs-button>
                            </div>
                            <div class="pl-3 pt-3">{{defItem.savedFileName}}</div>
                        </div>
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
        name: 'employee-document',
        components: {},
        data() {
            return {
                defItem: {},
                userId: null,
                documentTitle: [],
                documentData: [],
                editMode: false,
            }
        },
        props: {
            reqData: {
                default: {},
            },
            doc: {
                type: Object,
                default() {
                    return {}
                }
            },
            ser: {
                default: null,
            }
        },
        mounted() {
            if (this.reqData.userData) {
                this.loadData();
            }
        },
        methods: {
            async loadData() {
                this.defItem = _.cloneDeep(this.doc);
                this.userId = this.reqData.userData.id;
            },
            attachmentInput() {
                var fileData = document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    var input = e.target;

                    if (input.files && input.files[0]) {
                        this.doc.documentAttachment = input.files[0];
                        this.defItem.savedFileName = input.files[0].name;

                    }
                }
            },
            deleteNominee(deldata) {

                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: 'Are you sure, you want to delete this document?',
                    acceptText: 'ok',
                    accept: this.deleteDataProceed,
                    parameters: deldata,
                })
            },
            deleteDataProceed(Deldata) {
                var data = {
                    id: Deldata,
                }
                axios.post('/api/user-edit/data/employee-document-delete', data)
                    .then(response => {
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.notificationAlert(response);

                    })
                    .catch(e => {
                        this.notificationAlert(e.response);
                        this.btnDisabled = false;
                    })
            },
            saveData() {
                this.btnDisabled = true;
                this.doc.document_title = this.defItem.document_title;
                var formData = new FormData();
                formFiles(this.doc, formData)
                formData.append('data', JSON.stringify(this.doc));
                axios.post('/api/user-edit/data/employee-document-update', formData)
                    .then(response => {
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.notificationAlert(response);
                        this.editMode = false;
                        this.btnDisabled = false;
                    })
                    .catch(e => {
                      this.notificationAlert(e.response);
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
