<template>
    <div>
        <vx-card title="">
            <div id="wf-cont-main-box" style="border: 1px solid #f0f0f0">
                <div id="wf-cont-left-box">
                    <div class="group-head">

                        <div class="flex">
                            <div class="flex-auto">
                                <vs-input v-model="findGroup" class="w-full" size="small" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div v-for="(item, index) in filteredGroups" :key="index"
                             :style=" item.activeBtn == true ? 'color:#511bc4; border:1px solid rgb(81, 27, 196,.1); background-color:#fcfaff' : 'border:1px solid rgba(0,0,0,.04)' "
                             class="flex p-3 m-1 cursor-pointer hover:bg-gray-100 overflow-hidden"
                             @click="setGroupData(item, index)">
                            <div class="flex-auto" style="padding: 4px 0px">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <div id="wf-cont-right-box">
                    <div v-if="groupSelectedName != null" class="flex">
                        <div class="p-3 m-1 flex-auto font-bold">{{ groupSelectedName }}</div>
                        <div v-if="enableAddNew" class="p-3 m-1">
                            <vs-button :disabled="btnDisabled" size="small"
                                       @click="manageWorkflowGroupItem('create-first')">Add
                            </vs-button>
                        </div>
                    </div>
                    <div style="overflow-x:auto">
                        <div style="min-width:650px;">
                            <div v-if="groupSelectedName != null" class="p-3 bg-gray-100 m-1 flex">
                                <div class="flex" style="width:100%">
                                    <div class="workflow-group-item-header" style="max-width: 20%">Sequence</div>
                                    <div class="workflow-group-item-header" style="max-width: 20%">Approver</div>
                                    <div class="workflow-group-item-header" style="max-width: 20%">Work Group</div>
                                    <div class="workflow-group-item-header" style="max-width: 20%">Final Stage</div>
                                    <div class="workflow-group-item-header" style="max-width: 20%">SLA</div>
                                </div>
                                <div class="text-center pt-3" style="width:85px;">Actions</div>
                            </div>
                            <div v-for="(item, index) in workflowGroupItemData" :key="index"
                                 class="px-3 bg-gray-50 m-1 flex">
                                <div class="flex" style="width:100%">
                                    <div class="workflow-group-item" style="max-width:20%">
                                        <div>{{ item.sequence }}</div>
                                    </div>
                                    <div class="workflow-group-item" style="max-width:20%">
                                        <div>{{ item.approver_name }}</div>
                                    </div>
                                    <div class="workflow-group-item" style="max-width:20%">
                                        <div>{{ item.group_name }}</div>
                                    </div>
                                    <div class="workflow-group-item" style="max-width:20%">
                                        <vs-button color="primary" :icon="(item.final_stage) ? 'check' : 'close'" type="flat" ></vs-button>
                                    </div>
                                    <div class="workflow-group-item" style="max-width:20%">
                                        <div>{{ item.sla }} {{item.sla_type}}</div>
                                    </div>
                                </div>
                                <div class="pt-3 px-2" style="width:85px;">
                                    <feather-icon icon="FilePlusIcon"
                                                  svgClasses="h-5 w-5 hover:text-primary cursor-pointer"
                                                  @click="manageWorkflowGroupItem('create',item)"/>
                                    <feather-icon icon="Edit3Icon"
                                                  svgClasses="h-5 w-5 hover:text-primary cursor-pointer"
                                                  @click="manageWorkflowGroupItem('update',item)"/>
                                    <feather-icon icon="Trash2Icon"
                                                  svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                                                  @click="manageWorkflowGroupItem('delete',item)"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </vx-card>

        <vs-popup :active.sync="workflowGroupItemModal" :title="workflowGroupItemModalName">
            <div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-select class="w-full" v-model="approver" autocomplete label="Approver" placeholder="Select an approver">
                            <vs-select-item v-for="(item, index) in approvers" :key="index" :text="`${item.full_name} (${item.emp_id})`" :value="item.user_id"/>
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-select class="w-full" v-model="work_group_id" autocomplete label="Work Group" placeholder="Select work group">
                            <vs-select-item v-for="(item, index) in workGroupData" :key="index" :text="item.name" :value="item.id"/>
                        </vs-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-select v-model="sla_type" autocomplete class="w-full mt-4" label="SLA Type">
                            <vs-select-item v-for="(item, index) in slaTypeData" :key="index" :text="item" :value="item"/>
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input v-model="sla" class="w-full mt-4" label="SLA"/>
                        <validate-data :value="sla" name="sla" altName="sla" />
                    </div>
                </div>
                <div class="flex pt-2">
                    <div class="p-1">
                        <vs-input v-model="accept_text" class="w-full" label="Accept Text"/>
                        <validate-data :value="accept_text" name="accept_text" altName="accept_text" />
                    </div>
                    <div class="p-1">
                        <vs-input v-model="reject_text" class="w-full" label="Reject Text"/>
                        <validate-data :value="reject_text" name="reject_text" altName="reject_text" />
                    </div>
                    <div class="p-1">
                        <vs-input v-model="pending_text" class="w-full" label="Pending Text"/>
                        <validate-data :value="pending_text" name="pending_text" altName="pending_text" />
                    </div>
                </div>
                <div>
                    <div class="p-1">
                        <vs-input v-model="email_cc" class="w-full" label="Email CC"/>
                    </div>
                </div>
                <div class="flex pt-1">
                    <div class="p-2">
                        <vs-checkbox v-model="final_stage" size="small">Final Stage</vs-checkbox>
                    </div>
                </div>
            </div>
            <div class="pt-6 flex">
                <div class="flex-auto"></div>
                <div v-if="workflowGroupItemModalSaveType == 'create'">
                    <vs-button :disabled="btnDisabled" variant="success" @click="workflowGroupItem('create')"> Add
                    </vs-button>
                </div>
                <div v-if="workflowGroupItemModalSaveType == 'update'">
                    <vs-button :disabled="btnDisabled" variant="success" @click="workflowGroupItem('update')"> Update
                    </vs-button>
                </div>
            </div>
        </vs-popup>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            workflowGroupModal: false,
            workflowGroupModalName: null,
            workflowGroupName: null,
            workflowGroupModalSaveType: null,
            approvers: [],

            groupList: [],
            groupSelectedId: null,
            groupSelectedName: null,

            workflowGroupItemData: [],


            findGroup: "",

            workflowGroupItemModal: false,
            workflowGroupItemModalName: null,
            workflowGroupItemName: null,
            workflowGroupItemModalSaveType: null,


            workflowItemSequence: null,
            approver: null,
            wf_process_id: null,
            work_group_id: null,
            final_stage: null,
            accept_text: null,
            pending_text: null,
            reject_text: null,
            sla: null,
            email_cc: null,
            workflowItemId: null,

            workGroupData: [],
            workGroupDataLoaded: false,

            sla_type: null,
            slaTypeData: [
                "Day",
                "Hour"
            ],

        };
    },
    created() {
        this.loadData();
        this.fetchUserList();
    },

    mounted() {
    },

    methods: {
        async loadData(select = null) {
            try {
                var req = await axios.get("/api/wf-process-defs/list");
                this.groupList = req.data.data;
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
        },

        async workflowGroup(type) {
            this.btnDisabled = true;
            var data = {
                name: this.workflowGroupName,
            }
            try {
                if (type == 'create') {
                    var req = await axios.post("/api/wf-process-defs/create/group", data);
                    if (req) {
                        this.notificationAlert(req);
                    }
                }
                if (type == 'update') {
                    var req = await axios.put("/api/wf-process-defs/update/group/" + this.groupSelectedId, data);
                    if (req) {
                        this.notificationAlert(req);
                    }
                }
                if (type == 'delete') {
                    var req = await axios.delete("/api/wf-process-defs/delete/group/" + this.groupSelectedId);
                    if (req) {
                        this.notificationAlert(req);
                    }
                }
                this.workflowGroupModal = false;
                this.loadData();
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
            this.btnDisabled = false;
        },

        async setGroupData(item, index) {

            this.groupList.map(groupItem => {
                groupItem.activeBtn = false;
                return groupItem;
            })

            this.groupList[index].activeBtn = true;

            this.groupSelectedId = item.id;
            this.groupSelectedName = item.name;
            this.loadGroupData();

        },

        async loadGroupData() {
            try {
                this.$vs.loading({container: '#wf-cont-right-box', scale: 0.9});
                var req = await axios.get("/api/wf-process-defs/items/" + this.groupSelectedId);
                this.workflowGroupItemData = req.data.data;
                this.$vs.loading.close('#wf-cont-right-box > .con-vs-loading');
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
        },

        async loadWorkGroupData() {
            if (this.workGroupDataLoaded == false) {
                try {
                    var req = await axios.get("/api/wf-process-defs/list/work-group");
                    this.workGroupData = req.data.data;
                    this.workGroupDataLoaded = true;
                } catch (err) {
                    if (err.response) {
                        this.notificationAlert(err.response);
                    } else {
                        console.log(err);
                    }
                }
            }
        },

        manageWorkflowGroupItem(type, item = {}) {
            this.loadWorkGroupData();
            if (type == 'create-first') {
                var item = {
                    sequence: 1,
                    wf_process_id: this.groupSelectedId,
                    id: 'create-first',
                }
                type = 'create';
            }
            if (type == 'create') {
                this.workflowGroupItemModal = true;
                this.workflowGroupItemModalName = 'Add Step in the Work Flow Process';
                this.workflowGroupItemModalSaveType = type;

                this.workflowItemSequence = item.sequence;
                this.approver = null;
                this.wf_process_id = item.wf_process_id;
                this.work_group_id = null;
                this.final_stage = false;
                this.accept_text = null;
                this.pending_text = null;
                this.reject_text = null;
                this.sla = null;
                this.email_cc = null;
                this.workflowItemId = item.id;

            }
            if (type == 'update') {
                this.workflowGroupItemModal = true;
                this.workflowGroupItemModalName = 'Edit Work Flow Process';
                this.workflowGroupItemModalSaveType = type;

                this.approver = item.approver;
                this.work_group_id = item.work_group_id;
                this.final_stage = item.final_stage;
                this.accept_text = item.accept_text;
                this.pending_text = item.pending_text;
                this.reject_text = item.reject_text;
                this.sla_type = item.sla_type;
                this.sla = item.sla;
                this.email_cc = item.email_cc;
                this.workflowItemId = item.id;
            }
            if (type == 'delete') {
                this.workflowGroupModalSaveType = type;
                this.workflowItemId = item.id;
                this.$vs.dialog({
                    type: "confirm",
                    color: "danger",
                    title: `Confirm`,
                    text: "Are you sure, you want to delete this user?",
                    acceptText: "ok",
                    accept: this.workflowGroupItem,
                    parameters: 'delete'
                });
            }
        },

        async workflowGroupItem(type) {
            this.btnDisabled = true;
            try {
                if (type == 'create') {
                    var data = {
                        sequence: this.workflowItemSequence,
                        approver: this.approver,
                        work_group_id: this.work_group_id,
                        wf_process_id: this.wf_process_id,
                        final_stage: this.final_stage,
                        accept_text: this.accept_text,
                        pending_text: this.pending_text,
                        reject_text: this.reject_text,
                        sla_type: this.sla_type,
                        sla: this.sla,
                        sla_minutes: this.slaInMinutes,
                        email_cc: this.email_cc,
                        id: this.workflowItemId,
                    }
                    try {
                        var req = await axios.post("/api/wf-process-defs/create/item", data);
                        if (req) {
                            this.notificationAlert(req);
                            this.workflowGroupItemModal = false;
                            this.loadGroupData();
                        }
                    } catch (err) {
                        if (err.response) {
                            this.notificationAlert(err.response);
                        } else {
                            console.log(err);
                        }
                    }
                }
                if (type == 'update') {
                    var data = {
                        approver: this.approver,
                        work_group_id: this.work_group_id,
                        final_stage: this.final_stage,
                        accept_text: this.accept_text,
                        pending_text: this.pending_text,
                        reject_text: this.reject_text,
                        sla_type: this.sla_type,
                        sla: this.sla,
                        sla_minutes: this.slaInMinutes,
                        email_cc: this.email_cc,
                    }
                    try {
                        var req = await axios.put("/api/wf-process-defs/update/item/" + this.workflowItemId, data);
                        if (req) {
                            this.notificationAlert(req);
                            this.workflowGroupItemModal = false;
                            this.loadGroupData();
                        }
                    } catch (err) {
                        if (err.response) {
                            this.notificationAlert(err.response);
                        } else {
                            console.log(err);
                        }
                    }
                }
                if (type == 'delete') {
                    var req = await axios.delete("/api/wf-process-defs/delete/item/" + this.workflowItemId);
                    if (req) {
                        this.notificationAlert(req);
                        this.loadGroupData();
                    }
                }
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
        },

        fetchUserList() {
            axios.get("/api/work-group/list/users")
                .then(response => {
                    this.approvers = response.data.data;
                })
                .catch(err => {
                    this.notificationAlert(err.response)
                });
        },

    },
    computed: {
        filteredGroups() {
            let filter = new RegExp(this.findGroup, "i");
            return this.groupList.filter((el) => el.name.match(filter));
        },
        slaInMinutes() {
            let slaMinutes = 0;
            if (this.sla_type === 'Hour') {
                slaMinutes = this.sla * 60;
            } else if (this.sla_type === 'Day') {
                slaMinutes = this.sla * 24 * 60;
            }
            return slaMinutes;
        },
        enableAddNew(){
            return this.workflowGroupItemData.length === 0;
        }
    },
    watch: {},
};
</script>

<style scoped>
#wf-cont-main-box {
    display: flex;
}

#wf-cont-left-box {
    width: 20%;
}

#wf-cont-right-box {
    width: 80%;
    border-left: 1px solid #f0f0f0;
}

@media (max-width: 900px) {
    #wf-cont-left-box {
        width: 30%;
    }

    #wf-cont-right-box {
        width: 70%;
    }
}

@media (max-width: 550px) {
    #wf-cont-main-box {
        display: block;
    }

    #wf-cont-left-box {
        width: 100%;
    }

    #wf-cont-right-box {
        width: 100%;
        margin-top: 30px;
    }
}

.group-head {
    padding: 10px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #f0f0f0;
}

.workflow-group-item-header {
    padding: 10px 5px;
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
}

.workflow-group-item {
    padding: 10px 5px;
    flex: 1;
    overflow: hidden;
}
</style>
