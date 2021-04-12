<template>
    <vx-card title="">
        <div>
            <!-- <div @click="loadData()">Load Data</div> -->
            <div class="">
                <div class="flex">
                    <div class="flex-auto"></div>
                    <div>
                        <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add
                            New
                        </vs-button>
                    </div>
                </div>
                <div class="pt-3" style="min-height:300px">
                    <vs-table max-items="10" search pagination stripe :data="organizations">
                        <template slot="thead">
                            <vs-th sort-key="name">Name</vs-th>
                            <vs-th>Type</vs-th>
                            <vs-th sort-key="rccode">RC Code</vs-th>
                            <vs-th>Organization Head</vs-th>
                            <vs-th class="w-10 text-center">Action</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                                <vs-td :data="tr.name">
                                    {{ tr.name }}
                                </vs-td>

                                <vs-td :data="tr.type">
                                    {{ tr.type}}
                                </vs-td>

                                <vs-td :data="tr.rccode">
                                    {{ tr.rccode }}
                                </vs-td>

                                <vs-td :data="tr.org_head">
                                    {{tr.org_head}}
                                </vs-td>

                                <vs-td class="w-10">
                                    <div class="flex pt-1">
                                        <div class="flex-auto cursor-pointer" align="center"
                                             @click="inputModal('check', tr)"><i
                                            class="material-icons text-lg icon align">edit</i></div>
                                        <div class="flex-auto cursor-pointer" align="center"
                                             @click="actionConfirm(tr, deleteOrganization, `Delete ${tr.name}`)">
                                            <i class="material-icons text-lg icon align">delete</i>
                                        </div>
                                    </div>
                                </vs-td>

                            </vs-tr>
                        </template>
                    </vs-table>
                </div>
            </div>


            <vs-popup :title="modalTitle" :active.sync="inputModalSt">
                <form>
                    <div class="px-2">
                        <vs-input label-placeholder="Name" class="w-full pt-3" v-model="name"/>
                        <validate-data rules="required" :value="name" name="name" altName="name"/>
                        <div class="flex-auto pt-3 overflow-hidden">
                            <vs-select v-model="type" class="w-full" placeholder="Type" label="Type" autocomplete>
                                <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                v-for="(item,index) in orgTypes"/>
                            </vs-select>
                        </div>
                        <validate-data rules="required" :value="type" name="type" altName="Organization Type"/>
                        <div class="flex-auto pt-3 overflow-hidden">
                            <vs-select v-model="rccode" class="w-full" placeholder="RC Code" label="RC Code"
                                       autocomplete>
                                <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                v-for="(item,index) in rcCodes"/>
                            </vs-select>
                        </div>
                        <validate-data rules="required" :value="rccode" name="rccode" altName="rc code"/>
                        <div class="flex-auto pt-3 overflow-hidden">
                            <vs-select v-model="organizationHead" class="w-full" placeholder="Organization Head"
                                       label="Organization Head" @input="resetCheck" autocomplete>
                                <vs-select-item :key="index" :value="item.id" :text="item.full_name"
                                                v-for="(item,index) in users"/>
                            </vs-select>
                        </div>
                        <br>
                        <p :class="notify_type">{{notify}}</p>
                        <div class="mt-8">
                            <div v-if="modalType == 'new'" align="right" class="pt-1">
                                <vs-button :disabled="btnDisabled" @click="create()">Create</vs-button>
                            </div>
                            <div v-else-if="modalType == 'check'" align="right" class="pt-1">
                                <vs-button :disabled="btnDisabled" @click="updateCheck">Check</vs-button>
                            </div>
                            <div v-else-if="modalType == 'edit'" align="right" class="pt-1">
                                <vs-button :disabled="btnDisabled" @click="update">Update</vs-button>
                            </div>
                        </div>
                    </div>
                </form>
            </vs-popup>
        </div>
    </vx-card>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                notify: null,
                notify_type: null,
                moduleData: [],
                inputModalSt: false,
                modalTitle: null,

                modalType: null,

                organizations: [],
                users: [],
                orgTypes: [],
                rcCodes: [],

                name: '',
                type: '',
                rccode: '',
                organizationHead: '',
                id: null,

            }
        },
        created() {

        },
        mounted() {
            this.loadData();
            this.fetchRcCodes();
            this.fetchOrgTypes();
        },

        methods: {
            loadData() {
                axios.get('/api/organization-manager/data')
                    .then(response => {
                        this.organizations = response.data.organizations;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },
            resetCheck() {
                if (this.modalType !== 'new') {
                    this.notify = null;
                    this.modalType = 'check';
                }
            },
            inputModal(type, data = []) {
                console.log(data);
                this.notify = null;
                this.resetError();
                this.inputModalSt = !this.inputModalSt;
                this.modalType = type;
                if (type === 'new') {
                    this.fetchUserList(2);
                    this.modalTitle = 'Add New Organization';
                    this.name = '';
                    this.type = '';
                    this.rccode = '';
                    this.organizationHead = null;

                } else if (type === 'check') {
                    this.fetchUserList();
                    this.modalTitle = 'Checking Organization';
                    this.name = data.name;
                    this.type = data.org_type_id;
                    this.rccode = data.rc_code_id;
                    this.organizationHead = data.org_head_id;
                    this.id = data.id;
                }
            },

            create() {
                this.btnDisabled = true;
                var data = {
                    name: this.name,
                    type: this.type,
                    rccode: this.rccode,
                    organizationHead: this.organizationHead,
                }
                axios.post('/api/organization-manager/data/create', data)
                    .then(response => {
                        this.inputModalSt = false;
                        this.loadData();
                        this.notificationAlert(response);
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },
            updateCheck() {
                var data = {
                    name: this.name,
                    type: this.type,
                    url: this.url,
                    rccode: this.rccode,
                    organizationHead: this.organizationHead,
                    id: this.id,
                }
                axios.post("api/organization-manager/data/update-check", data)
                    .then(response => {
                        this.notify = response.data.notify;
                        this.notify_type = response.data.notify_type;
                        this.modalType = 'edit';
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            update() {
                this.btnDisabled = true;

                var data = {
                    name: this.name,
                    type: this.type,
                    url: this.url,
                    rccode: this.rccode,
                    organizationHead: this.organizationHead,
                    id: this.id,
                }

                axios.post("api/organization-manager/data/update", data)
                    .then(response => {
                        console.log(response.data)
                        this.inputModalSt = !this.inputModalSt;
                        this.loadData();
                        this.notificationAlert(response);
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },

            async deleteOrganization(Deldata) {
                this.btnDisabled = true;
                var params = {
                    id: Deldata.id,
                }
                axios.delete("/api/organization-manager/data/delete", {params})
                    .then(response => {
                        let index = this.organizations.findIndex(dcu => dcu.id === Deldata.id);
                        this.organizations.splice(index, 1);
                        this.notificationAlert(response);
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },

            fetchUserList(head_type) {
                let params = {
                    head: head_type,
                }
                axios.get("api/user-list/data/list", {params})
                    .then(response => {
                        this.users = response.data.users;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },

            fetchRcCodes() {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_RC_CODE}`)
                    .then(response => {
                        this.rcCodes = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },

            fetchOrgTypes() {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_ORG_TYPE}`)
                    .then(response => {
                        this.orgTypes = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },
        }
    }
</script>
