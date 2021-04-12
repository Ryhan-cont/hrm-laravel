<template>
    <vx-card title="Module Manager">
        <div>
            <div class="flex">
                <div class="flex-auto"></div>
                <div>
                    <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New
                    </vs-button>
                </div>
            </div>
            <div class="pt-3" style="min-height:300px">
                <vs-table search pagination stripe :data="moduleData">
                    <template slot="thead">
                        <vs-th>Name</vs-th>
                        <vs-th>API Name</vs-th>
                        <vs-th>Url</vs-th>
                        <vs-th>Icon</vs-th>
                        <vs-th>Visible</vs-th>
                        <vs-th>Active</vs-th>
                        <vs-th>Active in site</vs-th>
                        <vs-th>Remark</vs-th>
                        <vs-th>Disable Note</vs-th>
                        <vs-th>Type</vs-th>
                        <vs-th>Module Group</vs-th>
                        <vs-th>Subpermissions</vs-th>
                        <vs-th class="w-10 text-center">Action</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                            <vs-td :data="tr.name">
                                {{ tr.name }}
                            </vs-td>

                            <vs-td :data="tr.apiname">
                                {{ tr.apiname }}
                            </vs-td>

                            <vs-td :data="tr.url">
                                {{ tr.url }}
                            </vs-td>

                            <vs-td :data="tr.icon">
                                {{ tr.icon }}
                            </vs-td>

                            <vs-td :data="tr.is_visible">
                                {{ tr.is_visible }}
                            </vs-td>

                            <vs-td :data="tr.is_active">
                                {{ tr.is_active }}
                            </vs-td>

                            <vs-td :data="tr.site_active">
                                {{ tr.site_active }}
                            </vs-td>

                            <vs-td :data="tr.remark">
                                {{ tr.remark }}
                            </vs-td>

                            <vs-td :data="tr.disable_note">
                                {{ tr.disable_note }}
                            </vs-td>

                            <vs-td :data="tr.type">
                                {{ typeDecode[tr.type] }}
                            </vs-td>

                            <vs-td :data="tr.type">
                                {{ tr.module_group }}
                            </vs-td>

                            <vs-td :data="tr.subpermissions">
                                <div class="flex flex-wrap">
                                    <div class="m-1 px-2 rounded-lg bg-gray-300"
                                         v-for="(item,index) in tr.subpermissions" :key="index">{{ item.title }}
                                    </div>
                                </div>
                            </vs-td>

                            <vs-td class="w-10">
                                <div class="flex pt-1">
                                    <div class="flex-auto cursor-pointer" align="center"
                                         @click="inputModal('edit', tr)"><i class="material-icons text-lg icon align">edit</i>
                                    </div>
                                    <div class="flex-auto cursor-pointer" align="center" @click="deleteData(tr)"><i
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
                        <vs-input label-placeholder="Name" class="w-full pt-3" v-model="name"/>
                        <div v-if="errorData.name" class="py-1 text-sm text-red-400">{{errorData.name[0]}}</div>
                        <vs-input label-placeholder="API Name" class="w-full pt-3" v-model="apiname"/>
                        <div v-if="errorData.apiname" class="py-1 text-sm text-red-400">{{errorData.apiname[0]}}</div>
                        <vs-input label-placeholder="URL" class="w-full pt-3" v-model="url"/>
                        <div v-if="errorData.url" class="py-1 text-sm text-red-400">{{errorData.url[0]}}</div>
                        <vs-input label-placeholder="Icon" class="w-full pt-3" v-model="icon"/>
                        <div class="pt-2">
                            <search-box label="Module Group" v-model="moduleGroup" :items="moduleGroupData"/>
                        </div>
                        <div class="flex pt-5">
                            <div class="flex-auto pr-1">
                                <vs-checkbox v-model="is_visible">Visible</vs-checkbox>
                            </div>
                            <div class="flex-auto pl-1">
                                <vs-checkbox v-model="is_active">Active</vs-checkbox>
                            </div>
                            <div class="flex-auto pl-1">
                                <vs-checkbox v-model="site_active">Active in site</vs-checkbox>
                            </div>
                        </div>
                        <vs-input label-placeholder="Remark" class="pt-3 w-full" v-model="remark"/>
                        <vs-input label-placeholder="Disable Note" class="pt-3 w-full" v-model="disable_note"/>
                    </div>
                    <div class="flex-auto pt-3">
                        <vs-select v-model="type" class="w-full" placeholder="Type" label="Type">
                            <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in moduleType"/>
                        </vs-select>
                    </div>
                    <div class="pt-3">
                        <div class="font-bold pt-3 pr-3">Sub-Permissions:</div>
                        <div>
                            <div v-for="(item, index) in subpermissions" :key="index" class="pt-3">
                                <vs-checkbox size="small" v-model="item.status">{{item.title}}</vs-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="flex pt-3">
                        <div>
                            <vs-button size="small" @click="addSubPermissions()">Add custom permissions</vs-button>
                        </div>
                        <div class="px-1 flex-auto">
                            <vs-input placeholder="Title" size="small" class="w-full" v-model="subpermissionTitle"/>
                        </div>
                        <div class="px-1 flex-auto">
                            <vs-input placeholder="Name" size="small" class="w-full" v-model="subpermissionName"/>
                        </div>
                    </div>
                    <div class="mt-8">
                        <div v-if="modalType == 'new'" align="right" class="pt-1">
                            <vs-button :disabled="btnDisabled" @click="createModule()">Create</vs-button>
                        </div>
                        <div v-if="modalType == 'edit'" align="right" class="pt-1">
                            <vs-button :disabled="btnDisabled" @click="editModule()">Update</vs-button>
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


                errorData: {},

                name: '',
                apiname: '',
                url: '',
                id: '',
                icon: '',
                is_visible: null,
                is_active: null,
                site_active: null,
                disable_note: '',
                remark: '',

                moduleGroupData:['xxx','yyy'],
                moduleGroup:null,

                subpermissionTitle: '',
                subpermissionName: '',
                subpermissions: [],
                defaultSubpermissions: [{name: 'create', title: 'Create', status: false}, {
                    name: 'update',
                    title: 'Update',
                    status: false
                }, {name: 'delete', title: 'Delete', status: false}],

                type: 'Feature',

                moduleType: ['Feature', 'Dev', 'General'],
                typeId: {Feature: '01', Dev: '02', General: '03'},
                typeDecode: {'01': 'Feature', '02': 'Dev', '03': 'General'}
            }
        },
        mounted() {
            this.loadData();
        },

        methods: {
            async loadData() {
                try {
                    var req = await axios.get('/api/module/data')
                    var moduleData = req.data;
                    for (var i = 0; moduleData.length > i; i++) {
                        moduleData[i].filteredView = true;
                    }
                    this.moduleData = moduleData;
                    console.log(this.moduleData)
                } catch (err) {
                    this.notificationAlert(err.response);
                    console.log(err)
                }
            },
            inputModal(type, data = []) {
                this.inputModalSt = !this.inputModalSt;
                this.modalType = type;
                this.subpermissionName = '';
                this.addSubPermission = false;
                if (type == 'new') {

                    this.modalTitle = 'Add new module';
                    this.name = '';
                    this.apiname = '';
                    this.url = '';
                    this.is_visible = true;
                    this.is_active = true;
                    this.site_active = true;
                    this.icon = '';
                    this.disable_note = '';
                    this.remark = '';
                    this.type = 'Feature';
                    this.moduleGroup=null;
                    this.subpermissions = this.defaultSubpermissions.map((_arrayElement) => Object.assign({}, _arrayElement));

                    this.errorData = {};
                } else if (type == 'edit') {
                    var defaultSubpermissions = this.defaultSubpermissions.map((_arrayElement) => Object.assign({}, _arrayElement));
                    var oldSubPermissions = {};
                    var customSubpermissions = [];
                    for (var i = 0; data.subpermissions.length > i; i++) {
                        var permissionName = data.subpermissions[i].name;
                        if (permissionName == 'view' || permissionName == 'create' || permissionName == 'update' || permissionName == 'delete') {
                            oldSubPermissions[permissionName] = data.subpermissions[i];
                        } else {
                            customSubpermissions.push(data.subpermissions[i])
                        }

                    }
                    var newSubpermissions = [];
                    for (var i = 0; defaultSubpermissions.length > i; i++) {
                        if (oldSubPermissions[defaultSubpermissions[i].name]) {
                            newSubpermissions.push(oldSubPermissions[defaultSubpermissions[i].name]);
                        } else {
                            newSubpermissions.push(defaultSubpermissions[i]);
                        }
                    }
                    for (var i = 0; customSubpermissions.length > i; i++) {
                        newSubpermissions.push(customSubpermissions[i]);
                    }
                    this.modalTitle = 'Edit module';
                    this.name = data.name;
                    this.apiname = data.apiname;
                    this.url = data.url;
                    this.is_visible = data.is_visible;
                    this.is_active = data.is_active;
                    this.site_active = data.site_active;
                    this.icon = data.icon;
                    this.disable_note = data.disable_note;
                    this.remark = data.remark;
                    this.id = data.id;
                    this.type = this.typeDecode[data.type];
                    this.moduleGroup=data.module_group;
                    this.subpermissions = newSubpermissions;
                    this.errorData = {};
                }

            },
            async createModule() {
                this.btnDisabled = true;
                this.errorData = {};

                try {
                    var data = {
                        name: this.name,
                        apiname: this.apiname,
                        url: this.url,
                        is_visible: this.is_visible,
                        is_active: this.is_active,
                        site_active: this.site_active,
                        icon: this.icon,
                        disable_note: this.disable_note,
                        remark: this.remark,
                        type: this.typeId[this.type],
                        module_group: this.moduleGroup,
                        subpermissions: this.cleanSubpermissions(this.subpermissions),
                    }
                    var req = await axios.post('/api/module/create', data)

                    if (req) {
                        this.inputModalSt = false;
                        this.notificationAlert(req);
                        this.loadData();
                    }
                } catch (err) {
                    this.errorData =err.response.data.errors;
                    this.notificationAlert(err.response)
                }
            }
            ,
            async editModule() {
                this.btnDisabled = true;
                this.errorData = {};
                try {
                    var data = {
                        name: this.name,
                        apiname: this.apiname,
                        url: this.url,
                        is_visible: this.is_visible,
                        is_active: this.is_active,
                        site_active: this.site_active,
                        icon: this.icon,
                        disable_note: this.disable_note,
                        remark: this.remark,
                        id: this.id,
                        type: this.typeId[this.type],
                        module_group: this.moduleGroup,
                        subpermissions: this.cleanSubpermissions(this.subpermissions),
                    }
                    var req = await axios.post('/api/module/update', data)

                    if (req) {
                        this.inputModalSt = false;
                        this.notificationAlert(req);
                        this.loadData();
                    }
                } catch (err) {
                    this.notificationAlert(err.response)
                }
            },
            cleanSubpermissions(data) {
                var result = [];
                for (var i = 0; data.length > i; i++) {
                    if (data[i].status == true) {
                        result.push(data[i]);
                    }
                }
                return result;
            },
            addSubPermissions() {
                if (this.subpermissionName != null && this.subpermissionTitle != null) {
                    var subArr = {
                        name: this.subpermissionName,
                        title: this.subpermissionTitle,
                        status: true,
                    }
                    this.subpermissions.push(subArr);
                    this.subpermissionName = null;
                    this.subpermissionTitle = null;
                }
            },
            deleteData(deldata) {

                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: 'Are you sure, you want to delete this module?',
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
                    var req = await axios.post('/api/module/delete', data)

                    if (req) {
                        this.notificationAlert(req);
                        this.loadData();
                    }
                } catch (err) {
                    this.notificationAlert(err.response);
                }
            }
        }
    }
</script>
