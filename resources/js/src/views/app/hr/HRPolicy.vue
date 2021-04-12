<template>
<vx-card title="">
  <div>
    <div class="flex">
      <div class="flex-auto"></div>
      <div v-if="!isUser"><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New</vs-button></div>
    </div>
    <div class="pt-3" style="min-height:300px">
    <vs-table pagination search stripe :data="policyData">
        <template slot="thead">
          <vs-th>Policy Name</vs-th>
          <vs-th>Category</vs-th>
          <vs-th>Sub Category</vs-th>
          <vs-th>Group</vs-th>
          <vs-th>Last Update</vs-th>
          <vs-th class="w-10 text-center">Action</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="tr.policy_name">
              {{ tr.policy_name }}
            </vs-td>

            <vs-td :data="tr.category_name">
              {{ tr.category_name }}
            </vs-td>

            <vs-td :data="tr.item_name">
              <div v-html="tr.item_name"></div>
            </vs-td>

            <vs-td :data="tr.group_name">
              {{ tr.group_name }}
            </vs-td>

              <vs-td :data="tr.last_update">
              {{ tr.last_update }}
            </vs-td>
              <vs-td id="action-buttons">
                  <vs-dropdown vs-trigger-click>
                      <vs-button color="dark" icon="more_vert" type="flat" ></vs-button>
                      <vs-dropdown-menu>
                          <vs-dropdown-item
                              @click="inputModal('view', tr)" >
                                        <span class="flex items-center" >
                                            <vs-icon class="mr-2" icon="visibility" color="primary"></vs-icon>
                                            <span>View</span>
                                        </span>
                          </vs-dropdown-item>
                          <vs-dropdown-item
                              @click="inputModal('download', tr)" >
                                        <span class="flex items-center" >
                                            <vs-icon class="mr-2" icon="download" color="success"></vs-icon>
                                            <span>Download</span>
                                        </span>
                          </vs-dropdown-item>
                          <vs-dropdown-item
                                             @click="inputModal('edit', tr)"  v-if="!isUser">
                                        <span class="flex items-center" >
                                            <vs-icon class="mr-2" icon="edit" color="warning"></vs-icon>
                                            <span>Edit</span>
                                        </span>
                          </vs-dropdown-item>
                          <vs-dropdown-item
                                            @click="actionConfirm(tr, deleteProceed, `delete`)" v-if="!isUser">
                                        <span class="flex items-center" >
                                            <vs-icon class="mr-2" icon="block" color="danger"></vs-icon>
                                            <span>Delete</span>
                                        </span>
                          </vs-dropdown-item>
                      </vs-dropdown-menu>
                  </vs-dropdown>
              </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </div>

      <vs-popup fullscreen  :title="modalTitle" :active.sync="viewModal">
          <div id="invoice-page">
              <div id="content">
              <!-- INVOICE METADATA -->
              <div class="vx-row leading-loose p-base" style="padding-bottom: 10px !important;">
                  <div class="vx-col w-1/2">
                      <h5>{{policy_name}}</h5>
                      <div class="invoice__recipient-info my-4">
                          <p>{{ selectedCategory }}</p>
                          <p>{{ selectedItem }}</p>
                      </div>
                  </div>
              </div>

              <!-- INVOICE CONTENT -->
              <div class="p-base" style="padding-top: 0px !important;">
                  <h5>Policy</h5>
                  <vs-divider />
                  <span v-html="policy"></span>
                  <br>
                  <span class="font-bold">Last Updated: {{last_update}}</span>
                </div>

              </div>
              <!-- INVOICE FOOTER -->
              <div class="invoice__footer text-right p-base">
                  <div class="flex flex-wrap items-center justify-between" align="">
                      <div class="flex items-center">
                          <vs-button v-if="download" class="mb-base mr-3" type="border" icon-pack="feather" icon="icon icon-download" @click="downloadAttachment">Download Attachment</vs-button>
                          <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="pdfDownload">Policy Print/Download</vs-button>
                      </div>
                  </div>
              </div>
          </div>
      </vs-popup>
    <vs-popup fullscreen  :title="modalTitle" :active.sync="inputModalSt">
      <form>
      <div class="vx-row">
              <div class="vx-col md:w-6/12 w-full overflow-hidden pt-4">
                  <vs-input class="w-full" label="Policy Name" placeholder="Policy Name" v-model="policy_name"/>
                  <validate-data rules="required" :value="policy_name" :name="'policy name'"
                                 altName="policy name"/>
              </div>
          <div class="vx-col md:w-6/12 w-full overflow-hidden pt-4">
              <vs-input class="w-full" label="Keyword" placeholder="E.G: Keyword-1, Keyword-2, Keyword-3..." v-model="key_word"/>
              <validate-data rules="required" :value="key_word" :name="'key_word'"
                             altName="key word"/>
          </div>
          <div class="vx-col md:w-4/12 w-full overflow-hidden pt-4">
                  <vs-select v-model="selectedCategory" class="w-full" placeholder="Select Policy Category" label="Policy Category"
                             autocomplete @input="fetchItem(selectedCategory)">
                      <vs-select-item :key="index" :value="item.id" :text="item.name"
                                      v-for="(item,index) in categoryList"/>
                  </vs-select>
              </div>
          <div class="vx-col md:w-4/12 w-full overflow-hidden pt-4">
              <vs-select v-model="selectedItem" class="w-full" placeholder="Select Policy Subcategory" label="Policy Subcategory"
                         autocomplete>
                  <vs-select-item :key="index" :value="item.id" :text="item.name"
                                  v-for="(item,index) in categoryItemList"/>
              </vs-select>
          </div>
          <div class="vx-col md:w-4/12 w-full overflow-hidden pt-4">
              <vs-select v-model="selectedGroup" class="w-full" placeholder="Select Notification Group" label="Notification Group"
                         autocomplete>
                  <vs-select-item :key="index" :value="item.id" :text="item.name"
                                  v-for="(item,index) in groupList"/>
              </vs-select>
          </div>


          </div>

              <div class="pt-6" ><quill-editor v-model="policy" :options="editorOption" />
              </div>

          <div class="vx-col md:w-1/2 w-full py-3">
              <div class="pt-3 pr-3 font-bold">Attachment Document:</div>
              <div class="flex">
                  <div>
                      <vs-button size="small" color="gray" class="ml-auto mt-2" icon-pack="feather"
                                 icon="icon-upload" @click="attachmentInput()">Upload
                      </vs-button>
                  </div>
                  <div class="pl-3 ">{{document.attachmentName}}</div>
              </div>
          </div>
      <div>
        <div v-if="modalType == 'new'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="createRequest">Create</vs-button></div>
        <div v-if="modalType == 'edit'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="updateRequest">Update</vs-button></div>
      </div>
      </form>
    </vs-popup>
  </div>
</vx-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor,
    },
    data() {
        return {
            isUser:true,
            tableData:[],
            viewModal:false,
            policy_id:null,
            moduleData: [],
            inputModalSt: false,
            modalTitle: null,
            modalType: null,
            last_update:null,


            id: null,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'],
                        [{'header': 1}, {'header': 2}],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'font': []}]
                    ]
                },
                placeholder: 'Message'
            },



            policyData:[],
            policy:null,
            policy_name:null,
            selectedCategory:'',
            categoryList:[],
            key_word:null,
            categoryItemList:[],
            selectedItem:'',
            groupList:[],
            selectedGroup:'',
            document: {
                hasFile: ['Attachment'],
                Attachment: null,
                attachmentName: null,
            },

          attachmentUrl: null,
          attachment: null,
          download: false,
        }
    },
    mounted() {

    },
    computed:{

    },

    methods: {
        pdfDownload(){
            let mywindow = window.open('', 'PRINT', 'height=600,width=900');
            mywindow.document.write('<html><head><title>' + document.title  + '</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write('<h1>' + document.title  + '</h1>');
            mywindow.document.write(document.getElementById('content').innerHTML);
            mywindow.document.write('</body></html>');
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/
            mywindow.print();
            setTimeout(function(){mywindow.close();},1000)
        },
        fetchData(){
            axios.get('/api/hr-policy/data')
                .then(response => {
                    this.policyData = response.data.infos;
                    this.attachmentUrl = response.data.attachmentUrl;
                    this.isUser = response.data.isUser;
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                });
        },
        inputModal(type, data = []) {

            this.modalType = type;
            if (type === 'new') {
                this.categoryFetch();
                this.fetchGroup();
                this.modalTitle = 'Add New HR Policy';
                this.policy = null;
                this.policy_id= null;
                this.policy_name=null;
                this.selectedCategory='';
                this.key_word=null;
                this.selectedItem='';
                this.selectedGroup='';
                this.document.attachmentName = null;
                this.inputModalSt = !this.inputModalSt;

            } else if (type === 'edit') {
                this.categoryFetch();
                this.fetchItem(data.category_id);
                this.fetchGroup();
                this.modalTitle = 'Edit HR Policy';
                this.policy_id = data.id;
                this.policy = data.policy;
                this.document.attachmentName = data.attachment;
                this.policy_name= data.policy_name;
                this.selectedCategory= data.category_id;
                this.key_word= data.policy_keyword;
                this.selectedItem= data.item_id;
                this.selectedGroup= data.group_id;
                this.inputModalSt = !this.inputModalSt;
            }
            else if (type === 'view') {
                if (data.attachment != null){
                    this.download=true;
                }else{
                    this.download=false;
                }
                this.modalTitle = 'View HR Policy';
                this.policy_id = data.id;
                this.policy = data.policy;
                this.document.attachmentName = data.attachment;
                this.policy_name= data.policy_name;
                this.selectedCategory= data.category_name;
                this.key_word= data.policy_keyword;
                this.selectedItem= data.item_name;
                this.selectedGroup= data.group_name;
                this.last_update = data.last_update
                this.viewModal = !this.viewModal;

            }
            else if (type === 'download') {

                this.viewModal = !this.viewModal;
                this.modalTitle = 'View HR Policy';
                this.policy_id = data.id;
                this.policy = data.policy;
                this.document.attachmentName = data.attachment;
                this.policy_name= data.policy_name;
                this.selectedCategory= data.category_name;
                this.key_word= data.policy_keyword;
                this.selectedItem= data.item_name;
                this.selectedGroup= data.group_name;
                setTimeout(() => this.pdfDownload(),this.viewModal = !this.viewModal, 3000);




             //


            }

        },
        attachmentInput() {
            let fileData = document.createElement('input');
            fileData.type = 'file';
            fileData.click();
            fileData.onchange = e => {
                var input = e.target;
                if (input.files && input.files[0]) {
                    this.document.Attachment = input.files[0];
                    this.document.attachmentName = input.files[0].name;

                }
            }
        },
        fetchItem(category_id) {
           this.selectedItem = null;
            let data = {
                parent_id: category_id,
                dropdown_id: this.$constants.CONST_HR_ITEMS,
            }
            axios.post('/api/dropdown/data/category-list', data)
                .then(response => {
                    this.categoryItemList = response.data.items;
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                });
        },
        fetchGroup() {
            axios.get('/api/wf-process-defs/list/work-group')
                .then(response => {
                    this.groupList = response.data.data;
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                });
        },
        categoryFetch() {

            let data = {
                parent_id: 0,
                dropdown_id: this.$constants.CONST_HR_ITEMS,
            }
            axios.post('/api/dropdown/data/category-list', data)
                .then(response => {
                    this.categoryList = response.data.items;
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                });

        },
        createRequest(){
            this.btnDisabled = true;
           let data = {
               policy: this.policy,
               policy_name: this.policy_name,
               selectedCategory: this.selectedCategory,
               selectedItem: this.selectedItem,
               selectedGroup: this.selectedGroup,
               key_word: this.key_word,
               document: this.document,
           }
            let formData = new FormData();
            formFiles(this.document, formData)
            formData.append('data', JSON.stringify(data));
            axios.post('/api/hr-policy/create', formData)
                .then(response => {
                    this.notificationAlert(response);
                    this.inputModalSt = !this.inputModalSt;
                    this.fetchData();
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
        },
        updateRequest(){
            this.btnDisabled = true;
           let data = {
               id: this.policy_id,
               policy: this.policy,
               policy_name: this.policy_name,
               selectedCategory: this.selectedCategory,
               selectedItem: this.selectedItem,
               selectedGroup: this.selectedGroup,
               key_word: this.key_word,
               document: this.document,
           }
            let formData = new FormData();
            formFiles(this.document, formData)
            formData.append('data', JSON.stringify(data));
            axios.post('/api/hr-policy/update', formData)
                .then(response => {
                    this.notificationAlert(response);
                    this.inputModalSt = !this.inputModalSt;
                    this.fetchData();
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
        },
        deleteProceed(data){
            axios.get(`/api/hr-policy/delete/${data.id}`)
                .then(response => {
                    this.fetchData();
                    this.notificationAlert(response);
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                });
        },
        downloadAttachment(){
            window.open(this.attachmentUrl+this.document.attachmentName)
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<style lang="scss">
  .ql-editor{
    min-height:200px;
  }



  @media print {
      .invoice-page {
      * {
          visibility: hidden;
      }

      #content-area {
          margin: 0 !important;
      }

      .vs-con-table {
      .vs-con-tbody {
          overflow: hidden !important;
      }
  }

  #invoice-container,
  #invoice-container * {
      visibility: visible;
  }
  #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
  }
  }
  }

  @page {
      size: auto;
  }
  </style>
