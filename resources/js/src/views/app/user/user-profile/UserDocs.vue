<template>
    <div id="docs-view">
        <vs-popup mediumscreen :title="pop_title" class="" :active.sync="popUp" >
            <div class="vx-row">
                <div class="vx-col md:w-full w-full">
                    <vs-select v-model="selectedType" class="w-full" placeholder="Document Title" label="Document Title" autocomplete>
                        <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in employee_documents_type" />
                    </vs-select>

                    <validate-data rules="required" :value="selectedType" :name="'document_title'" altName="result type" />

                </div>
                <div class="vx-col md:w-full w-full">
                    <vs-input class="w-full" label="Document Information" v-model="doc.document_info" />
                    <validate-data rules="required" :value="doc.document_info" :name="'information'" altName="information" />
                </div>
                <div class="vx-col md:w-full w-full py-3">
                    <div class="pt-3 pr-3 font-bold">Document Attachment: </div>
                    <div class="flex">
                        <div>
                            <vs-button size="small" color="gray" class="ml-auto mt-2"  icon-pack="feather" icon="icon-upload" @click="attachmentInput()">Upload</vs-button>
                        </div>
                        <div class="pl-3 pt-3">{{doc.attachmentName}}</div>
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
                      <feather-icon svgClasses="w-6 h-6" icon="PaperclipIcon" class="mr-2" />
                      <span class="font-medium text-lg leading-none">Employee Documents</span>

                  </div>
              </div>
              <div class="vx-col w-1/2">

                  <div class="float-right pr-3">
                      <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="callPopup('add')"></vs-button>

                  </div>
              </div>
          </div>
          <vs-divider />
      </div>
      <vx-card class="mb-base">
          <div class="vx-row">
              <div class="vx-col w-full" >
                  <vs-table stripe :data="employee_documents">
                      <template slot="thead">
                          <vs-th sort-key="document_title">Document Title</vs-th>

                          <vs-th >Information</vs-th>
                          <vs-th >Document Attachment</vs-th>
                          <vs-th >Action</vs-th>
                      </template>

                      <template slot-scope="{data}">
                          <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                              <vs-td :data="tr.document_title">
                                  {{ tr.document_title.label }}
                              </vs-td>
                              <vs-td :data="tr.document_info">
                                  {{ tr.document_info }}
                              </vs-td>
                              <vs-td :data="tr.attachment_link" >
                                  <a :href="tr.attachment_link"
                                     :download="tr.attachmentName"
                                     v-if="tr.attachment_name"
                                     class="flex py-2 px-4 cursor-pointer " >
                                      <feather-icon icon="PaperclipIcon" svgClasses="w-4 h-4"/>
                                      <span class="ml-2">{{tr.attachment_name}}</span>
                                  </a>
                              </vs-td>
                              <vs-td class="px-0" :data="tr.action">
                                  <div class="float-right pr-3"><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="actionConfirm(tr, deleteDataProceed, `delete this  ${tr.document_title.label}`)"></vs-button></div>

                                  <div class="float-right  pr-3"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="callPopup('edit',tr)"></vs-button></div>

                              </vs-td>

                          </vs-tr>
                      </template>
                  </vs-table>
              </div>
          </div>
      </vx-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            employee_documents: [],
            employee_documents_type:[],
            doc_id: null,
            popUp: false,
            skill_id:null,
            mode:{
                add:true,
                edit:false,
            },
            pop_title: "Add New Skill",
            selectedType:'',
            doc:{
                doc:true,
                document_info:null,
                hasFile:['Attachment'],
                attachmentName:null,
                Attachment:null,
            },
        }
    },

    methods: {
        fetchDocInfo() {
            axios.get(`/api/profile/employee-docs/${this.$route.params.id}`)
                .then(response => {

                    if (response.status === 200) {

                        this.employee_documents = [];
                        this.employee_documents= response.data.employee_documents;
                    } else {
                        this.notificationAlert(response);
                    }
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                    this.user_not_found = true
                });
        },
        callPopup(type,data) {
            this.doc.Attachment = null;
            axios.get(`/api/data/dropdown-items/${this.$constants.CONST_DD_DOCUMENT_TYPES}`)
                .then(response => {

                    this.employee_documents_type = response.data.items;
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
            if (type === 'add'){
                this.pop_title= 'New Document';
                this.doc.attachmentName = null;
                this.doc.document_title = null;
                this.doc.document_info = null;
                this.mode.save = true;
                this.mode.edit = false;
                this.popUp = !this.popUp;
                this.selectedType= '';
            }
            if(type === 'edit'){
                this.pop_title= 'Edit Document';
                this.mode.save = false;
                this.mode.edit = true;
                this.doc_id = data.document_id;
                this.doc.attachmentName = data.attachment_name;
                this.selectedType = data.document_title.value;
                this.doc.document_info = data.document_info;
                this.popUp = !this.popUp;

            }

        },
        create(){
            var data ={
                'id' : this.$route.params.id,
                'doc': this.doc,
                'type': this.selectedType,
                'attachment':this.doc.Attachment,
            }

            var formData = new FormData();
            formFiles(this.doc, formData)
            formData.append('data', JSON.stringify(data));

            this.btnDisabled= true;
            axios.post('/api/profile/employee-document-create',formData)
                .then(response => {
                    this.notificationAlert(response);
                    this.popUp = !this.popUp;
                    this.fetchDocInfo();
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
            this.btnDisabled= false;
        },
        update(){
            this.btnDisabled= true;
            var data ={
                'id' : this.$route.params.id,
                "doc_id":this.doc_id,
                'type': this.selectedType,
                'doc': this.doc,
                'attachment':this.doc.Attachment,
            }
            var formData = new FormData();
            formFiles(this.doc, formData)
            formData.append('data', JSON.stringify(data));


            axios.post('/api/profile/employee-document-update', formData)
                .then(response => {
                    this.notificationAlert(response);
                    this.popUp = !this.popUp;
                    this.fetchDocInfo();
                    this.btnDisabled= false;
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                    this.btnDisabled= false;
                })

        },
        attachmentInput(){
            var fileData=document.createElement('input');
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
        deleteDataProceed(Deldata) {
            axios.get(`/api/profile/employee-document-delete/${Deldata.document_id}`)
                .then(response => {
                    this.notificationAlert(response);
                    this.fetchDocInfo();
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })

        },


    },
    mounted() {

    },
    created() {
        this.fetchDocInfo();
    },
    computed: {

    }
}
</script>

<style lang="scss">
</style>
