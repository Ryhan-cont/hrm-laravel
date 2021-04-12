<template>
<div>
    <vx-card title="">
        <div class="">
            <div class="flex">
                <div class="flex-auto" @click="sendNotice()">Send Notice</div>
                <div class="flex-auto"></div>
                <div v-if="permissions.create.status"><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('create')">Add New</vs-button></div>
            </div>
            <div class="pt-3" style="min-height:300px">
                <vs-table max-items="10" pagination search stripe :data="notineList">
                    <template slot="thead">
                        <vs-th>Title</vs-th>
                        <!-- <vs-th>Notice</vs-th> -->
                        <vs-th>Publish date time</vs-th>
                        <vs-th>Expired Date Time</vs-th>
                        <vs-th>Notice Group</vs-th>
                        <vs-th>Notice Type</vs-th>
                        <vs-th class="w-10 text-center">Action</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="tr.title">{{ tr.title }}</vs-td>
                            <!-- <vs-td :data="tr.notice">{{tr.notice}}</vs-td> -->
                            <vs-td :data="tr.publisDateTime">{{ tr.publisDateTime | datetime }}</vs-td>
                            <vs-td :data="tr.expireDateTime">{{ tr.expireDateTime | datetime }}</vs-td>
                            <vs-td :data="tr.noticeGroup">{{ tr.noticeGroup }}</vs-td>
                            <vs-td :data="tr.noticeType">{{ noticeTypeData[tr.noticeType] }}</vs-td>
                            <vs-td class="w-10">
                                <vs-td id="action-buttons">
                                    <vs-dropdown vs-trigger-click>
                                        <vs-button color="dark" icon="more_vert" type="flat" ></vs-button>
                                        <vs-dropdown-menu>
                                            <vs-dropdown-item @click="inputModal('view', tr)" >
                                                <span class="flex items-center" >
                                                    <vs-icon class="mr-2" icon="visibility" color="primary"></vs-icon>
                                                    <span>View</span>
                                                </span>
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="inputModal('download', tr)" >
                                                <span class="flex items-center" >
                                                    <vs-icon class="mr-2" icon="download" color="success"></vs-icon>
                                                    <span>Download</span>
                                                </span>
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="inputModal('update', tr)"  v-if="permissions.update.status">
                                                <span class="flex items-center" >
                                                    <vs-icon class="mr-2" icon="edit" color="warning"></vs-icon>
                                                    <span>Edit</span>
                                                </span>
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="inputModal('delete',tr)" v-if="permissions.delete.status">
                                                <span class="flex items-center" >
                                                    <vs-icon class="mr-2" icon="block" color="danger"></vs-icon>
                                                    <span>Delete</span>
                                                </span>
                                            </vs-dropdown-item>
                                        </vs-dropdown-menu>
                                    </vs-dropdown>
                                </vs-td>

                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </div>
        </div>


    </vx-card>
    <vs-popup fullscreen :title="noticeBoardModalNmae" :active.sync="noticeBoardModal">
        <div>
            <div>
                <div class="p-1">
                    <vs-input label="Title *" class="w-full pt-3" v-model="noticeTitle"/>
                    <validate-data rules="required" :value="noticeTitle" :name="'noticeTitle'" altName="notice title" />
                </div>
                <div class="px-1 pt-5" style="height: 280px">
                    <quill-editor v-model="notice" style="height: 200px" :options="editorOption" />
                    <validate-data rules="required" :value="notice" :name="'notice'" />
                </div>
                <div class="flex">
                    <div class="p-1">
                        <v-date-picker v-model="publishDateTime" color="purple"  mode="dateTime" is12hr :min-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full" label="Publish Date Time *" :value="inputValue" v-on="inputEvents" />
                            </template>
                        </v-date-picker>
                        <validate-data rules="required" :value="publishDateTime" :name="'publishDateTime'" altName="publish date time" />
                    </div>
                    <div class="p-1">
                        <v-date-picker v-model="expireDateTime" color="purple" mode="dateTime" is12hr :min-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full " label="Expire Date Time *" :value="inputValue" v-on="inputEvents" />
                            </template>
                        </v-date-picker>
                        <validate-data rules="required" :value="expireDateTime" :name="'expireDateTime'" altName="expire date time" />
                    </div>
                    <div class="p-1">
                        <vs-select v-model="noticeGroup" class="w-full"  label="Notice Group *" autocomplete>
                            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in noticeGroupData" />
                        </vs-select>
                        <validate-data rules="required" :value="noticeGroup" :name="'noticeGroup'" altName="notice group" />
                    </div>
                </div>
                <div class="flex mt-5 p-1">
                    <div class="font-bold pr-3">Notification type:</div>
                    <div class="px-2"><vs-radio v-model="notificationType" vs-name="radios1" vs-value="1">Email</vs-radio></div>
                    <div class="px-1"><vs-radio v-model="notificationType" vs-name="radios1" vs-value="2">SMS</vs-radio></div>
                    <div class="px-1"><vs-radio v-model="notificationType" vs-name="radios1" vs-value="3">All</vs-radio></div>
                </div>
                <validate-data rules="required" :value="notificationType" :name="'notificationType'" altName="notification type" />
            </div>
            <div class="mt-8">
                <div v-if="noticeBoardModalsaveType == 'create'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="noticeBoard('create')">Create</vs-button></div>
                <div v-if="noticeBoardModalsaveType == 'update'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="noticeBoard('update')">Update</vs-button></div>
            </div>

        </div>
    </vs-popup>

    <vs-popup fullscreen  :title="'Notice'" :active.sync="previewModal">
        <div id="invoice-page">
            <div id="content">
            <!-- INVOICE METADATA -->
            <div class="vx-row leading-loose p-base" style="padding-bottom: 10px !important;">
                <div class="vx-col w-1/2">
                    <h5>{{noticeTitle}}</h5>
                    <div class="invoice__recipient-info my-4">
                        <div><b>Publish date time:&nbsp;&nbsp;</b>{{publishDateTime}}</div>
                        <div><b>Expired Date Time:&nbsp;&nbsp;</b>{{expireDateTime}}</div>
                        <!-- <div><b>Notice Group:&nbsp;&nbsp;</b>{{noticeGroup}}</div>
                        <div><b>Notice Type:&nbsp;&nbsp;</b>{{notificationType}}</div> -->
                    </div>
                </div>
            </div>

            <!-- INVOICE CONTENT -->
            <div class="p-base" style="padding-top: 0px !important;">
                <h5 class="pb-2">Notice</h5>
                <span v-html="notice"></span>
            </div>
            </div>
            <!-- INVOICE FOOTER -->
            <div class="invoice__footer text-right p-base">
                <div class="flex flex-wrap items-center justify-between" align="">
                    <div class="flex items-center">
                        <!-- <vs-button class="mb-base mr-3" type="border" icon-pack="feather" icon="icon icon-download" @click="downloadAttachment">Download Attachment</vs-button>
                        <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="pdfDownload">Policy Print/Download</vs-button> -->
                    </div>
                </div>
            </div>
        </div>
    </vs-popup>

</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    components: {
        quillEditor,
    },
    data(){
        return{
            permissions:{create:{}, update:{},delete:{}},
            previewModal:false,

            noticeBoardModal:false,
            noticeBoardModalNmae:null,
            noticeBoardModalsaveType:null,

            notineList:[],

            noticeTitle:null,
            notice:null,
            noticeGroup:null,
            publishDateTime:null,
            expireDateTime:null,
            notificationType:null,
            noticeId:null,

            noticeGroupData:[],
            noticeGroupLoaded:false,

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

            noticeTypeData: {
                1:'Email',
                2:'SMS',
                3:'All',
            }
        }
    },

    mounted(){
        this.loadData();
    },
    filters:{
        datetime(value){
            //return moment(value).format('hh:mm A');
            var dateArr = value.split(/[ T]/);
            if(dateArr[1]){
                var timeArr = dateArr[1].split(/[:-]/);
                if(timeArr[2]){
                    if(Number(timeArr[0]>12)){
                        return `${dateArr[0]} ${timeArr[0] - 12}:${timeArr[1]} PM` ;
                    }else{
                        return `${dateArr[0]} ${timeArr[0]}:${timeArr[1]} AM` ;
                    }
                }else{
                    return value;
                }
            }else{
                return value;
            }
        }
    },
    methods:{
        async sendNotice(){
            try {
                var req = await axios.get('/api/notice-board/data/send-notice')
                console.log(req)
            } catch (err) {
                this.notificationAlert(err.response);

            }
        },
        async loadData() {
            try {
                var req = await axios.get('/api/notice-board/data')
                this.notineList = req.data.data;
                this.permissions = req.data.permissions;
            } catch (err) {
                this.notificationAlert(err.response);

            }
        },
        pdfDownload(){
            let mywindow = window.open('', 'PRINT', 'height=600,width=900');
            mywindow.document.write('<html><head><title>' + this.noticeTitle  + '</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write('<h1>' + this.noticeTitle  + '</h1>');
            mywindow.document.write(document.getElementById('content').innerHTML);
            mywindow.document.write('</body></html>');
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/
            mywindow.print();
            setTimeout(function(){mywindow.close();},1000)
        },
        async reqNoticeGroup(){
            if(this.noticeGroupLoaded == false){
                try {
                    var req = await axios.get('/api/notice-board/data/work-group')
                    //console.log(req)
                    this.noticeGroupData = req.data.data
                    this.noticeGroupLoaded = true;
                } catch (err) {
                    this.notificationAlert(err.response);
                }
            }

        },
        async inputModal(type, item = []){
            this.resetError();
            this.reqNoticeGroup();
            if(type === 'setData') {
                this.noticeTitle = item.title;
                this.notice = item.notice;
                this.noticeGroup = item.noticeGroupId;
                this.publishDateTime = item.publisDateTime;
                this.expireDateTime = item.expireDateTime;
                this.notificationType = item.noticeType;
                this.noticeId = item.id;
            }
            if(type == 'create'){
                this.noticeBoardModal=true;
                this.noticeBoardModalNmae='Add Notice';
                this.noticeBoardModalsaveType='create';

                this.noticeTitle = null;
                this.notice = null;
                this.noticeGroup = null;
                this.publishDateTime = null;
                this.expireDateTime = null;
                this.notificationType = null;
            }
            if(type == 'update'){
                await this.inputModal('setData', item)

                this.noticeBoardModal=true;
                this.noticeBoardModalNmae='Update Notice';
                this.noticeBoardModalsaveType='update';
            }
            if(type == 'delete'){
                this.noticeId = item.id;
                this.noticeBoardModalsaveType='delete';
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: 'Are you sure, you want to delete this notice?',
                    acceptText: 'ok',
                    accept: this.noticeBoard,
                })
            }
            if(type == 'view'){
                await this.inputModal('setData', item)
                this.previewModal=true;
            }
            if(type === 'download') {
                await this.inputModal('setData', item)
                this.pdfDownload();
            }
        },
        async noticeBoard(){
            this.btnDisabled = true;
            if(this.noticeBoardModalsaveType == 'create' || this.noticeBoardModalsaveType == 'update'){
                var data = {
                    noticeTitle:this.noticeTitle,
                    notice:this.notice,
                    noticeGroup:this.noticeGroup,
                    publishDateTime:dateString(this.publishDateTime),
                    expireDateTime:dateString(this.expireDateTime),
                    notificationType:this.notificationType,
                }
                console.log(data)
            }
            if(this.noticeBoardModalsaveType == 'create'){
                try {
                    var req = await axios.post('/api/notice-board/create', data)
                    this.noticeBoardModal=false;
                    this.loadData();
                    this.notificationAlert(req);
                } catch (err) {
                    this.notificationAlert(err.response);
                }
            }
            if(this.noticeBoardModalsaveType == 'update'){
                try {
                    var req = await axios.put('/api/notice-board/update/'+this.noticeId, data)
                    this.noticeBoardModal=false;
                    this.loadData();
                    this.notificationAlert(req);
                } catch (err) {
                    this.notificationAlert(err.response);
                }
            }
            if(this.noticeBoardModalsaveType == 'delete'){
                try {
                    var req = await axios.put('/api/notice-board/delete/'+this.noticeId)
                    this.loadData();
                    this.notificationAlert(req);
                } catch (err) {
                    this.notificationAlert(err.response);
                }
            }
            this.btnDisabled = false;
        }

    },
    watch:{
        publishDateTime(){
            console.log(dateString(this.publishDateTime))
        }
    }

}
</script>

<style scoped>

</style>
