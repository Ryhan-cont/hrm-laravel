<template>
<div class="pt-3 mt-5" style="border-top:1px solid #f2f2f2">
    <div v-if="addNew">
        <div>
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
    </div>
    <div class="w-full flex" align="right">
        <div class="flex-auto"></div>
        <div v-if="addNew"><vs-button size="small" class="ml-auto mt-2" v-if="addNew" @click="addNew = false" color="danger">Cancel</vs-button></div>
        <div class="pl-2" v-if="addNew"><vs-button size="small" class="mt-2" :disabled='btnDisabled' @click="saveData()">Save</vs-button></div>
        <div class="pl-2" v-if="!addNew"><vs-button size="small" class="ml-auto mt-2" @click="addNew = true">Add new</vs-button></div>
    </div>
</div>
</template>


<script>
    export default {
        name: 'new-nominee',
        components: {

        },
        props: {
            reqData: {
                default: {},
            }
        },
        data() {
            return {
                relationTypeOption:[],
                relationshipTypeData:[],
                addNew:false,

                userId:null,
                nominee:{
                    familymembername:null,
                    relationshiptype:null,
                    nominee:true,
                    hasFile:['nomineeIdAttachment'],
                    nomineeIdAttachment:null,
                    nomineeAttachmentName:null,
                },
            }
        },
        mounted() {
            if (this.reqData.relationshipTypeList) { this.loadData(); }
        },
        methods: {
            async loadData() {
                this.userId = this.reqData.userData.id;

                this.relationTypeOption=this.reqData.relationshipTypeList;
                this.relationshipTypeData=this.reqData.relationshipTypeData;
            },
            attachmentInput(){
                var fileData=document.createElement('input');
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
            saveData() {
                this.btnDisabled = true;
                this.nominee.userId=this.userId;

                var formData = new FormData();
                formFiles(this.nominee, formData)
                formData.append('data', JSON.stringify(this.nominee));
                console.log('Hasib',this.nominee)
                axios.post('/api/user-edit/data/nominee-create',formData)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.addNew = false;
                        this.nominee.familymembername=null;
                        this.nominee.relationshiptype=null;
                        this.nominee.nominee=true;
                        this.nominee.nomineeIdAttachment=null;
                        this.nominee.nomineeAttachmentName=null;
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
