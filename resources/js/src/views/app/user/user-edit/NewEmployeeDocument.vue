<template>
    <div class="pt-3 mt-5" style="border-top:1px solid #f2f2f2">
        <div v-if="addNew">
            <div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="Document Title" v-model="doc.document_title" />
                        <validate-data rules="required" :value="doc.document_title" :name="'document_title'" altName="Document Title" />
                    </div>
                    <div class="vx-col md:w-1/2 w-full py-3">
                        <div class="pt-3 pr-3 font-bold">Document Attachment: </div>
                        <div class="flex">
                            <div>
                                <vs-button size="small" color="gray" class="ml-auto mt-2" @click="attachmentInput()">browse</vs-button>
                            </div>
                            <div class="pl-3 pt-3">{{doc.documentAttachmentName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex" align="right">
            <div class="flex-auto"></div>
            <div v-if="addNew"><vs-button size="small" class="ml-auto mt-2" v-if="addNew" @click="addNew = false" color="danger">Cancel</vs-button></div>
            <div class="pl-2" v-if="addNew"><vs-button size="small" :disabled='btnDisabled' class="mt-2" @click="saveData()">Save</vs-button></div>
            <div class="pl-2" v-if="!addNew"><vs-button size="small" class="ml-auto mt-2" @click="addNew = true">Add new</vs-button></div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'new-employee-document',
        components: {

        },
        props: {
            reqData: {
                default: {},
            }
        },
        data() {
            return {
                addNew:false,
                userId:null,
                doc:{
                    document_title:null,
                    doc:true,
                    hasFile:['documentAttachment'],
                    documentAttachmentName:null,
                },
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            async loadData() {
                this.userId = this.reqData.userData.id;
            },

            attachmentInput(){
                var fileData=document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    var input = e.target;
                    if (input.files && input.files[0]) {
                        this.doc.documentAttachment = input.files[0];
                        this.doc.documentAttachmentName = input.files[0].name;

                    }
                }
            },
            saveData() {
                this.btnDisabled = true;
                this.doc.userId=this.userId;
                var formData = new FormData();
                formFiles(this.doc, formData)
                formData.append('data', JSON.stringify(this.doc));
                axios.post('/api/user-edit/data/employee-document-create',formData)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.doc.document_title = null;
                        this.doc.documentAttachmentName = null;
                        this.doc.documentAttachment = null;
                        this.addNew = false;
                        this.btnDisabled =  false;
                    })
                    .catch(error => {
                        this.errorData = error.response.data.errors;
                        this.notificationAlert(error.response);
                        this.btnDisabled =  false;

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
