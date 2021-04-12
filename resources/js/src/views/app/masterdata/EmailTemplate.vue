<template>
<vx-card title="">
  <div>
    <div class="flex">
      <div class="flex-auto"></div>
      <div><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New</vs-button></div>
    </div>
    <div class="pt-3" style="min-height:300px">
      <vs-table pagination search stripe :data="emailData">
        <template slot="thead">
          <vs-th>Email code</vs-th>
          <vs-th>Subject</vs-th>
          <vs-th>Body</vs-th>
          <vs-th>Purpose</vs-th>
          <vs-th class="w-10 text-center">Action</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="tr.emailcode">
              {{ tr.emailcode }}
            </vs-td>

            <vs-td :data="tr.subject">
              {{ tr.subject }}
            </vs-td>

            <vs-td :data="tr.body">
              <div v-html="tr.body"></div>
            </vs-td>

            <vs-td :data="tr.purpse">
              {{ tr.purpse }}
            </vs-td>
            <vs-td class="w-10">
              <div class="flex pt-1">
                <div class="flex-auto cursor-pointer" align="center" @click="inputModal('edit', tr)"><i class="material-icons text-lg icon align">edit</i></div>
                <div class="flex-auto cursor-pointer" align="center" @click="deleteData(tr)"><i class="material-icons text-lg icon align">delete</i></div>
              </div>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </div>

    <vs-popup fullscreen  :title="modalTitle" :active.sync="inputModalSt">
      <form>
      <div class="">
        <vs-input label-placeholder="Email code" class="w-full pt-3" v-model="emailCode" />
        <div v-if="errorData.emailCode" class="py-1 text-sm text-red-400">{{errorData.emailCode[0]}}</div>
        <vs-input label-placeholder="Subject" class="w-full pt-3" v-model="subject" />
        <div v-if="errorData.subject" class="py-1 text-sm text-red-400">{{errorData.subject[0]}}</div>
        <div class="pt-6" style="min-height:300px"><quill-editor style="min-height:300px" v-model="body" :options="editorOption" /></div>
        <div v-if="errorData.body" class="py-1 text-sm text-red-400">{{errorData.body[0]}}</div>
        <div class="pt-6"><vs-textarea v-model="purpse" label="Purpose" /></div>
        <div v-if="errorData.purpse" class="py-1 text-sm text-red-400">{{errorData.purpse[0]}}</div>
      </div>
      <div class="mt-8">
        <div v-if="modalType == 'new'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="create()">Create</vs-button></div>
        <div v-if="modalType == 'edit'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="update()">Update</vs-button></div>
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
        quillEditor
    },
    data() {
        return {
            moduleData: [],
            inputModalSt: false,
            modalTitle: null,
            modalType: null,

            prefix: {
                'OrgType': null,
                'orgTypeData': [],
                'RcCode': null,
                'rcCodeData': [],

            },

            emailData: [],

            emailCode: '',
            subject: '',
            body: '',
            purpse: '',
            id: null,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'font': []}],
                        [{ 'color': [] }, { 'background': [] }], 
                        ['image', 'video'],
                    ],
                },
                placeholder: 'Message'
            },
            // prefixEditModal: false,
            // prefixEditVal: null,
            // prefixEditId: null,
            // prefixEditType: null,
        }
    },
    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
            try {
                var req = await axios.get('/api/email-template/data')
                this.emailData = req.data.emailData;
            } catch (err) {
                this.notificationAlert(err.response);
            }
        },

        inputModal(type, data = []) {
            this.inputModalSt = !this.inputModalSt;
            this.modalType = type;
            if (type == 'new') {
                this.modalTitle = 'Add New Template';
                this.emailCode = '';
                this.subject = '';
                this.body = '';
                this.purpse = '';

                this.errorData = {};
            } else if (type == 'edit') {
                this.modalTitle = 'Edit Template';
                this.emailCode = data.emailcode;
                this.subject = data.subject;
                this.body = data.body;
                this.purpse = data.purpse;
                this.id = data.id;
                    this.errorData = {};
            }

        },
        async create() {
            this.btnDisabled = true;
            this.errorData = {};
            try {
                var data = {
                    emailCode: this.emailCode,
                    subject: this.subject,
                    body: this.body,
                    purpse: this.purpse,
                }
                var req = await axios.post('/api/email-template/data/create', data)
                if (req) {
                    this.inputModalSt = false;
                    this.loadData();
                    this.notificationAlert(req);
                }
            } catch (err) {
                if (err.response.data.errors) {
                    this.errorData = err.response.data.errors;
                } else {
                    this.errorData = err.response.data.message;
                }
                this.notificationAlert(err.response);

            }
            this.btnDisabled = false;
        },
        async update() {
            this.btnDisabled = true;
            this.errorData = {};
            try {
                var data = {
                    emailCode: this.emailCode,
                    subject: this.subject,
                    body: this.body,
                    purpse: this.purpse,
                    id: this.id,
                }
                var req = await axios.post('/api/email-template/data/update', data)
                if (req) {
                    this.notificationAlert(req);
                    this.inputModalSt = false;
                    this.loadData();
                }
            } catch (err) {
                this.btnDisabled = false;
                if (err.response.data.errors) {
                    this.errorData = err.response.data.errors;
                } else {
                    this.errorData = err.response.data.message;
                }
                this.notificationAlert(err.response);

            }
            this.btnDisabled = false;
        },

        deleteData(deldata) {
            console.log(this)
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Confirm`,
                text: 'Are you sure, you want to delete this Template?',
                acceptText: 'ok',
                accept: this.deleteDataProceed,
                parameters: deldata,
            })
        },
        async deleteDataProceed(Deldata) {
            try {
                var data = {
                    id: Deldata.id,
                }
                var req = await axios.post('/api/email-template/data/delete', data)
                if (req) {
                    this.notificationAlert(req);
                    this.loadData();
                }
            } catch (err) {

            }
        },
    }
}
</script>

<style>
  .ql-editor{
    min-height:300px;
  }
</style>
