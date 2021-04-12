<template>
    <vx-card title="">
        <div>
            <div class="flex">
                <div class="flex-auto"></div>
                <div>
                    <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New
                    </vs-button>
                </div>
            </div>
            <div class="pt-3" style="min-height:300px">
                <vs-table max-items="10" pagination search stripe :data="loiOrganization">
                    <template slot="thead">
                        <vs-th>Organization Type</vs-th>
                        <vs-th>Organization Name</vs-th>
                        <vs-th>Organization Address</vs-th>
                        <vs-th>Letter Address To</vs-th>
                        <vs-th class="w-10 text-center">Action</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                            <vs-td :data="tr.type_name">
                                {{ tr.type_name }}
                            </vs-td>

                            <vs-td :data="tr.name">
                                {{ tr.name }}
                            </vs-td>

                            <vs-td :data="tr.address">
                                {{ tr.address }}
                            </vs-td>

                            <vs-td :data="tr.letter_to">
                                {{ tr.letter_to }}
                            </vs-td>

                            <vs-td class="w-10">
                                <div class="flex pt-1">
                                    <div class="flex-auto cursor-pointer" align="center"
                                         @click="inputModal('edit', tr)"><i class="material-icons text-lg icon align">edit</i>
                                    </div>
                                    <div class="flex-auto cursor-pointer" align="center"
                                         @click="actionConfirm(tr, deleteDataProceed, `delete ${tr.degree_name}`)"><i
                                        class="material-icons text-lg icon align">delete</i></div>
                                </div>
                            </vs-td>

                        </vs-tr>
                    </template>
                </vs-table>
            </div>
            <vs-popup :title="modalTitle" :active.sync="inputModalSt">
                <form>
                    <div class="">
                        <div class="flex-auto pt-3">
                            <vs-select v-model="orgType" class="w-full" placeholder="Organization Type"
                                       label="Organization Type"
                                       autocomplete>
                                <vs-select-item :key="LoiIndex" :value="LoiItem.value" :text="LoiItem.label"
                                                v-for="(LoiItem,LoiIndex) in loiOrgTypeData"/>
                            </vs-select>
                            <validate-data rules="required" :value="orgType" :name="'Organization Type'"
                                           altName="Organization Type"/>

                        </div>
                        <div v-if="errorData.orgType" class="py-1 text-sm text-red-400">{{errorData.orgType[0]}}</div>
                        <vs-input label-placeholder="Organization Name" class="w-full pt-3" v-model="orgName"/>
                        <div v-if="errorData.orgName" class="py-1 text-sm text-red-400">{{errorData.orgName[0]}}</div>
                        <vs-input label-placeholder="Organization Address" class="w-full pt-3"
                                  v-model="organizationAddress"/>
                        <div v-if="errorData.organizationAddress" class="py-1 text-sm text-red-400">
                            {{errorData.organizationAddress[0]}}
                        </div>
                        <vs-input label-placeholder="Letter Address To" class="w-full pt-3" v-model="letterAddressTo"/>
                        <div v-if="errorData.letterAddressTo" class="py-1 text-sm text-red-400">
                            {{errorData.letterAddressTo[0]}}
                        </div>
                    </div>
                    <div class="mt-8">
                        <div v-if="modalType == 'new'" align="right" class="pt-1">
                            <vs-button :disabled='btnDisabled' @click="create()">Create</vs-button>
                        </div>
                        <div v-if="modalType == 'edit'" align="right" class="pt-1">
                            <vs-button :disabled='btnDisabled' @click="update()">Update</vs-button>
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
                moduleData: [],
                inputModalSt: false,
                modalTitle: null,
                modalType: null,

                loiOrgTypeData: [],
                loiOrganization: [],

                orgType: '',
                orgName: '',
                organizationAddress: '',
                letterAddressTo: '',
                id: null,

            }
        },
        mounted() {
            this.loadData();
        },

        methods: {
            async loadData() {
                axios.get('/api/loi-organization/data')
                    .then(response => {
                        this.loiOrganization = response.data.loiOrganization;
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
            },

            inputModal(type, data = []) {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_ORG_TYPE}`)
                    .then(response => {
                        this.loiOrgTypeData = response.data.items;
                    })
                    .catch(err => {
                        console.log(err);
                    });


                this.inputModalSt = !this.inputModalSt;
                this.modalType = type;
                if (type == 'new') {
                    this.modalTitle = 'Add New LOI Organization';

                    this.orgType = '';
                    this.orgName = '';
                    this.organizationAddress = '';
                    this.letterAddressTo = '';

                    this.errorData = {};
                } else if (type == 'edit') {
                    this.modalTitle = 'Edit LOI Organization';
                    this.orgType = data.type;
                    this.orgName = data.name;
                    this.organizationAddress = data.address;
                    this.letterAddressTo = data.letter_to;
                    this.id = data.id;
                    this.errorData = {};
                }

            },
            async create() {
                this.errorData = {};
                try {
                    var data = {
                        orgType: this.orgType,
                        orgName: this.orgName,
                        organizationAddress: this.organizationAddress,
                        letterAddressTo: this.letterAddressTo,
                    }
                    this.btnDisabled = true;
                    var req = await axios.post('/api/loi-organization/data/create', data)
                    if (req.data) {
                        this.inputModalSt = false;
                        this.notificationAlert(req);
                        this.loadData();
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
                this.errorData = {};
                try {
                    var data = {
                        orgType: this.orgType,
                        orgName: this.orgName,
                        organizationAddress: this.organizationAddress,
                        letterAddressTo: this.letterAddressTo,
                        id: this.id,
                    }
                    this.btnDisabled = true;
                    var req = await axios.post('/api/loi-organization/data/update', data)
                    if (req.data) {
                        this.inputModalSt = false;
                        this.notificationAlert(req);
                        this.loadData();
                    }
                } catch (err) {
                    if (err.response.data.errors) {
                        this.errorData = err.response.data.errors;
                    } else {
                        this.errorData = err.response.data.message;
                    }
                    this.notificationAlert(err.response);
                }
               // this.btnDisabled = false;
            },


            async deleteDataProceed(Deldata) {
                try {
                    var data = {
                        id: Deldata.id,
                    }
                    var req = await axios.post('/api/loi-organization/data/delete', data)
                    if (req.data) {
                        this.loadData();
                        this.notificationAlert(req);
                    }
                } catch (err) {
                    this.notificationAlert(err.response);
                }
            },
        }
    }
</script>
