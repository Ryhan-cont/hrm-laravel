<template>
<vx-card title="Product Manager">
  <div>
    <!-- <div @click="loadData()">vvv</div>
    <div @click="chkdata()">chkdata</div> -->
    <div class="flex">
      <div class="flex-auto"></div>
      <div><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New</vs-button></div>
    </div>
    <div class="pt-3" style="min-height:300px">
      <vs-table pagination search stripe :data="packageData">
        <template slot="thead">
          <vs-th sort-key="name">Name</vs-th>
          <vs-th>Description</vs-th>
          <vs-th>Period</vs-th>
          <vs-th>Number of user</vs-th>
          <vs-th>Price</vs-th>
          <vs-th>Currency</vs-th>
          <vs-th>Permissions</vs-th>
          <vs-th class="wd-50 text-center" style="width:50px">Action</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="tr.name">
              {{ tr.name }}
            </vs-td>
            <vs-td :data="tr.description">
              {{ tr.description }}
            </vs-td>
            <vs-td :data="tr.period">
              {{ tr.period }}
            </vs-td>
            <vs-td :data="tr.nou">
              {{ tr.nou }}
            </vs-td>
            <vs-td :data="tr.price">
              {{ tr.price }}
            </vs-td>
            <vs-td :data="tr.currency">
              {{ tr.currency }}
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
        <div>
          <vs-input label-placeholder="Name" class="w-full pt-3"  v-model="name" />
          <div v-if="errorData.name" class="py-1 text-sm text-red-400">{{errorData.name[0]}}</div>
          <div class="pt-6">
            <vs-textarea label="Description" class="" v-model="description" />
          </div>
          <div class="flex">
            <div class="flex-auto pr-1">
              <vs-select v-model="period" class="w-full" placeholder="Select" label="Select Menu">
                <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in periodOption" />
              </vs-select>
              <div v-if="errorData.period" class="py-1 text-sm text-red-400">{{errorData.period[0]}}</div>
            </div>
            <div class="flex-auto pl-1">
              <vs-input label="Period value" class="w-full"  v-model="periodvalue" />
              <div v-if="errorData.periodvalue" class="py-1 text-sm text-red-400">{{errorData.periodvalue[0]}}</div>
            </div>
          </div>
          <vs-input label-placeholder="Number of user" class="w-full pt-3"  v-model="nou" />
          <div v-if="errorData.nou" class="py-1 text-sm text-red-400">{{errorData.nou[0]}}</div>
          <vs-input label-placeholder="Price" class="w-full pt-3"  v-model="price" />
          <div v-if="errorData.price" class="py-1 text-sm text-red-400">{{errorData.price[0]}}</div>
          <vs-input label-placeholder="Currency" class="w-full pt-3"  v-model="currency" />
          <div v-if="errorData.currency" class="py-1 text-sm text-red-400">{{errorData.currency[0]}}</div>
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
      <div v-if="modalType == 'new'" align="right" class="pt-3"><vs-button size="small" :disabled="btnDisabled" @click="createPackage()">Create</vs-button></div>
      <div v-if="modalType == 'edit'" align="right" class="pt-3"><vs-button size="small" :disabled="btnDisabled" @click="updatePackage()">Update</vs-button></div>
    </vs-popup>
  </div>
</vx-card>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            packageData: [],
            moduleData: [],
            inputModalSt: false,
            modalTitle: null,
            modalType: null,

            name: '',
            description: '',
            period: '',
            periodvalue: '',
            nou: '',
            price: '',
            currency: 'BDT',

            baseModuleData: [],
            periodOption: ['day', 'week', 'month', 'year'],
            errorData: {},
        }
    },
    mounted() {
        this.loadData();
    },

    methods: {
        chkdata() {
          //  console.log(this.packageData)
        },
        async loadData() {
            try {
                var req = await axios.get('/api/package/data')
                var packageData = req.data;
                this.packageData = packageData.package;
                this.baseModuleData = packageData.module;
             //   console.log(this.packageData)
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
                this.modalTitle = 'Add new package';
                this.name = '';
                this.description = '';
                this.period = '';
                this.periodvalue = '';
                this.nou = '';
                this.price = '';
                this.currency = 'BDT';
                this.moduleData = this.moduleGrouping(_.cloneDeep(this.baseModuleData));;
            } else if (type == 'edit') {

                this.modalTitle = 'Edit package';
                this.name = data.name;
                this.description = data.description;
                this.period = data.period;
                this.periodvalue = data.periodvalue;
                this.nou = data.nou;
                this.price = data.price;
                this.currency = data.currency;
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
        async createPackage() {
          this.btnDisabled = true;
            try {
                var data = {
                    name: this.name,
                    description: this.description,
                    period: this.period,
                    periodvalue: this.periodvalue,
                    nou: this.nou,
                    price: this.price,
                    currency: this.currency,
                    permission: _.flattenDeep(_.map(this.moduleData, item => {return item.data})),
                }
                var req = await axios.post('/api/package/create', data)
                if (req) {
                    this.inputModalSt = false;
                    this.btnDisabled = false;
                    this.notificationAlert(req);
                    this.loadData();
                }
            } catch (err) {
              this.btnDisabled = false;
              this.notificationAlert(req);

            }
        },
        async updatePackage() {
          this.btnDisabled = true;
            try {
                var data = {
                    name: this.name,
                    description: this.description,
                    period: this.period,
                    periodvalue: this.periodvalue,
                    nou: this.nou,
                    price: this.price,
                    currency: this.currency,
                    permission: _.flattenDeep(_.map(this.moduleData, item => {return item.data})),
                    id: this.id,
                }
                var req = await axios.post('/api/package/update', data)
                if (req) {
                    this.inputModalSt = false;
                  this.btnDisabled = false;
                  this.notificationAlert(req);
                    this.loadData();
                }
            } catch (err) {
              this.notificationAlert(err.response);
              this.btnDisabled = false;
            }
        },
        deleteData(deldata) {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Confirm`,
                text: 'Are you sure u want to delete this package?',
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
                var req = await axios.post('/api/package/delete', data)

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
