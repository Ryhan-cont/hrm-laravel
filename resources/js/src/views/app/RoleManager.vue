<template>
<vx-card title="Role Manager">
  <div>
    <!-- <div @click="loadData()">Load Data</div>
    <div @click="chkdata()">Chk DAta</div> -->
    <div class="flex">
      <div class="flex-auto"></div>
      <div><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New</vs-button></div>
    </div>
    <div class="pt-3" style="min-height:300px">
      <vs-table pagination search stripe :data="roleData">
        <template slot="thead">
          <vs-th>Name</vs-th>
          <vs-th>permissions</vs-th>
          <vs-th class="wd-50 text-center" style="width:50px">Action</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="tr.name">
              {{ tr.name }}
            </vs-td>

            <vs-td :data="tr.permission">
              <div class="flex flex-wrap">
                <div class="m-1 px-2 rounded-lg bg-gray-300" v-for="(item,index) in tr.permission" :key="index" v-if="item.status == true">
                  <div>{{ item.name }}</div>
                  <div class="m-1 px-2 rounded-lg bg-gray-200" v-for="(subItem,subIndex) in item.subpermissions" :key="subIndex" v-if="subItem.status == true">{{subItem.title}}</div>
                </div>
              </div>
            </vs-td>

            <vs-td class="" style="width:60px">
              <div class="flex">
                <div class="flex-auto cursor-pointer" align="center" @click="inputModal('edit', tr)"><i class="material-icons text-lg icon align">edit</i></div>
                <div class="flex-auto cursor-pointer" align="center" @click="deleteData(tr)"><i class="material-icons text-lg icon align">delete</i></div>
              </div>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </div>
    <vs-popup :title="modalTitle" :active.sync="inputModalSt">
      <div class="">
        <div @click="moduleFlat()">Load Data</div>
        <div>
          <vs-input label-placeholder="Name" class="w-full"  v-model="name" />
          <div v-if="errorData.name" class="py-1 text-sm text-red-400">{{errorData.name[0]}}</div>
        </div>
        <div class="font-bold text-1xl pt-3">Select Module</div>
        <div class="py-4 px-8">
          <div v-if="errorData.permission" class="py-1 text-sm text-red-400">{{errorData.permission[0]}}</div>
          <div class="py-4" style="border-bottom:1px solid rgb(0,0,0,.1)" v-for="(itemData, indexData) in moduleData" :key="indexData">
            <div v-if="itemData.type == 'group'">
              <div class="py-2"><vs-checkbox @change="permissionChanged(indexData,0,0,'group')" v-model="itemData.status">{{itemData.name}}</vs-checkbox></div>
              <div class="pl-5" v-for="(item, index) in itemData.data" :key="index">
                <div class="py-2"><vs-checkbox @change="permissionChanged(indexData,index,0,'module')" v-model="item.status">{{item.name}}</vs-checkbox></div>
                <div v-if="item.subpermissions" class="pl-8">
                  <div v-for="(sub, subIndex) in item.subpermissions" :key="subIndex">
                    <vs-checkbox @change="permissionChanged(indexData,index,subIndex,'sub')" v-model="sub.status">{{sub.title}}</vs-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-for="(item, index) in itemData.data" :key="index">
                <div class="py-2"><vs-checkbox @change="permissionChanged(indexData,index,0,'module')" v-model="item.status">{{item.name}}</vs-checkbox></div>
                <div v-if="item.subpermissions" class="pl-8">
                  <div v-for="(sub, subIndex) in item.subpermissions" :key="subIndex">
                    <vs-checkbox @change="permissionChanged(indexData,index,subIndex,'sub')" v-model="sub.status">{{sub.title}}</vs-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div v-if="modalType == 'new'" align="right" class="pt-3"><vs-button size="small" :disabled="btnDisabled" @click="createRole()">Create</vs-button></div>
      <div v-if="modalType == 'edit'" align="right" class="pt-3"><vs-button size="small" :disabled="btnDisabled" @click="updateRole()">Update</vs-button></div>
    </vs-popup>
  </div>
</vx-card>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            roleData: [],
            moduleData: [],
            inputModalSt: false,
            modalTitle: null,
            modalType: null,

            name: '',

            baseModuleData: [],
            errorData: {},
        }
    },
    mounted() {
        this.loadData();
    },

    methods: {
        chkdata() {
            // console.log(this.baseModuleData)
        },
        async loadData() {
            try {
                var req = await axios.get('api/role/data')
                var roleData = req.data;
                this.roleData = roleData.role;
                this.baseModuleData = roleData.module;
                console.log('req',req)
            } catch (err) {
                this.notificationAlert(err.response);
                console.log(err)
            }
        },
        moduleGrouping(moduleData){
          var modulesRec = _.cloneDeep(moduleData);
          var modules = {};
          for(var i=0; modulesRec.length>i; i++){
            modules[modulesRec[i]['id']]=modulesRec[i];
          }
          var result = {};
          for(var i=0; this.baseModuleData.length>i; i++){
            var moduleItem = this.baseModuleData[i];
            if(modules[moduleItem.id]){
              var moduleGroup = moduleItem.module_group;
              if(moduleGroup != null && moduleGroup != '' && moduleGroup != undefined){
                if(!result[moduleGroup]){
                  var subArr = {
                    status:false,
                    name: moduleGroup,
                    type: 'group',
                    data: [],
                  }
                  result[moduleGroup]=subArr;
                }
                if(modules[moduleItem.id].status == true){result[moduleGroup].status = true;}
                result[moduleGroup].data.push(modules[moduleItem.id]);
              }else{
                var subArr = {
                  name: `general - ${moduleItem.id}`,
                  type: 'general',
                  data: [modules[moduleItem.id]],
                }
                result[`general - ${moduleItem.id}`]=subArr;
              }
            }
          }
          return _.values(result);
        },
        inputModal(type, data = []) {
            this.inputModalSt = !this.inputModalSt;
            this.modalType = type;
            if (type == 'new') {
                this.modalTitle = 'Add new role';
                this.name = '';
                this.moduleData = this.moduleGrouping(_.cloneDeep(this.baseModuleData));
            } else if (type == 'edit') {
                this.modalTitle = 'Edit role';
                this.name = data.name;
                this.id = data.id;

                var baseModuleData = _.cloneDeep(this.baseModuleData);
                var oldModuleData = _.cloneDeep(data.permission);

                var newModelData = baseModuleData.map(moduleData => {
                    var checkModule = oldModuleData.filter(oldModule => oldModule.moduleid == moduleData.id);
                    if (checkModule.length > 0) {
                        moduleData.status = true;
                        var subPermissions = moduleData.subpermissions.map(item => {
                            var chksubPermissions = checkModule[0].subpermissions.filter(sp => sp.name == item.name);
                            if (chksubPermissions.length > 0) {
                                return chksubPermissions[0];
                            } else {
                                return item;
                            }
                        })
                        moduleData.subpermissions = subPermissions;
                    }
                    return moduleData;
                });
                this.moduleData = this.moduleGrouping(_.cloneDeep(newModelData));
            }
        },
        permissionChanged(indexData, moduleIndex, subModuleIndex, click = null) {
            if (click == 'group') {
              var status = this.moduleData[indexData].status;
              this.moduleData[indexData].data.forEach(itemData => {
                itemData.subpermissions.forEach(item => {
                  return item.status = status;
                })
                return itemData.status = status;

              })
            }else if (click == 'module') {
              var status = this.moduleData[indexData].data[moduleIndex].status;
              if(status == true){this.moduleData[indexData].status = true;}
              this.moduleData[indexData].data[moduleIndex].subpermissions.forEach(item => {
                  return item.status = status;
              })
            }else if (click == 'sub') {
              var status = this.moduleData[indexData].data[moduleIndex].subpermissions[subModuleIndex].status;
              if(status == true){this.moduleData[indexData].data[moduleIndex].status = true;}
            }
        },
        async createRole() {
            this.btnDisabled = true;
            try {
                var data = {
                    name: this.name,
                    permission: _.flattenDeep(_.map(this.moduleData, item => {return item.data})),
                }
                var req = await axios.post('api/role/create', data)
                if (req) {
                    this.inputModalSt = false;
                    this.loadData();
                    this.notificationAlert(req);
                }
            } catch (err) {
                this.notificationAlert(err.response);
            }
        },
        async updateRole() {
            this.btnDisabled = true;
            try {
                var data = {
                    name: this.name,
                    permission: _.flattenDeep(_.map(this.moduleData, item => {return item.data})),
                    id: this.id,
                }
                var req = await axios.post('api/role/update', data)
                if (req) {
                    this.inputModalSt = false;
                    this.loadData();
                    this.notificationAlert(req);
                }
            } catch (err) {
                this.notificationAlert(err.response);
            }
        },
        deleteData(deldata) {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Confirm`,
                acceptText: 'ok',
                text: 'Are you sure, you want to delete this role?',
                accept: this.deleteDataProceed,
                parameters: deldata,
            })
        },
        async deleteDataProceed(Deldata) {
            try {
                var data = {
                    id: Deldata.id,
                }
                var req = await axios.post('api/role/delete', data)

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
