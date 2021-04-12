<template>
<vx-card title="">
  <div>
    <div class="">
        <div class="flex">
          <div class="flex-auto"></div>
          <div><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New</vs-button></div>
        </div>
        <div class="pt-3" style="min-height:300px">
          <vs-table max-items="10" pagination search stripe :data="assetPackage">
            <template slot="thead">
              <vs-th>Asset Name</vs-th>
              <vs-th>
                <div class="flex w-full">
                  <div class="flex-auto">Asset</div>
                  <div class="flex-auto" style="max-width:80px;">Quantity</div>
                  <div class="flex-auto" style="max-width:80px;">Duration</div>
                  <div class="flex-auto" style="max-width:80px;">Interval</div>
                </div>
              </vs-th>
              <vs-th>Comment</vs-th>
              <vs-th class="w-10 text-center">Action</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                <vs-td :data="tr.name">
                  {{ tr.name }}
                </vs-td>

                <vs-td :data="tr.asset">
                  <div class="flex py-1" v-for="(item, index) in tr.asset" :key="index">
                    <div class="flex-auto">{{ item.asset }}</div>
                    <div class="flex-auto" style="max-width:80px;">{{ item.quantity }}</div>
                    <div class="flex-auto" style="max-width:80px;">{{ item.duration }}</div>
                    <div class="flex-auto" style="max-width:80px;">{{ item.interval }}</div>
                  </div>
                </vs-td>

                <vs-td :data="tr.comment">
                  {{ tr.comment }}
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
    </div>
    <vs-popup :title="modalTitle" :active.sync="inputModalSt">
      <form>
      <div class="">
        <div>
          <vs-input label-placeholder="Asset Title" class="vx-col md:w-11/12 w-full pt-3" v-model="packageTitle" />
          <validate-data rules="required" :value="packageTitle" :name="'packageTitle'" altName="Package Title" />
        </div>
        <div v-for="(item, index) in assetData" :key="index">
          <div class="vx-col md:w-11/12 w-full pt-3">
              <search-box label="Asset Name" v-model="item.asset" :items="prefix.assetNameData" />
              <validate-data rules="required" :value="item.asset" :name="'assetData.'+index+'.asset'" altName="asset" />
          </div>
          <div class="vx-row">
            <div class="vx-col md:w-3/12 w-full overflow-hidden">
              <vs-input label="Quantity" class="w-full pt-2" v-model="item.quantity" />
              <validate-data rules="required|integer" :value="item.quantity" :name="'assetData.'+index+'.quantity'" altName="quantity" />
            </div>
              <div class="vx-col md:w-4/12 w-full overflow-hidden">
                  <vs-select v-model="item.interval" class="w-full pt-2" placeholder="Interval" label="Interval">
                      <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in intervalData" />
                  </vs-select>
                  <validate-data rules="required" :value="item.interval" :name="'assetData.'+index+'.interval'" altName="interval" />
              </div>
            <div class="vx-col md:w-3/12 w-full overflow-hidden">
              <vs-input label="Duration" class="w-full pt-2" v-model="item.duration" />
              <validate-data rules="required|integer" :value="item.duration" :name="'assetData.'+index+'.duration'" altName="duration" />
            </div>
              <div class="vx-col md:w-1/12 w-full pt-6">
                <span class="centerx">
                    <vs-tooltip text="Remove">
                        <vs-button size="large" color="danger" type="flat" icon-pack="feather" icon="icon-x" class="flex-auto mr-3"
                                   v-show="index || ( !index && assetData.length > 1)"
                                   @click="manageAsset('delete',index)">
                        </vs-button>
                        </vs-tooltip>
                    <vs-tooltip text="Add New">
                        <vs-button size="large" color="primary" type="flat" icon-pack="feather" icon="icon-plus" class="flex-auto"
                                   @click="manageAsset('newItem')"
                                   v-show="index === assetData.length-1">
                        </vs-button>
                    </vs-tooltip>
                </span>
              </div>
          </div>
            <vs-divider />
        </div>
        <div class="pt-3"><vs-textarea v-model="comment" label="Comment" /></div>
        <div class="mt-8">
          <div v-if="modalType == 'new'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="create()">Create</vs-button></div>
          <div v-if="modalType == 'edit'" align="right" class="pt-1"><vs-button :disabled='btnDisabled'  @click="update()">Update</vs-button></div>
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

            prefix: {
                'assetNameData': [],
            },

            assetPackage: [],

            packageTitle: '',
            intervalData: ['Day', 'Month', 'Year'],
            assetData: [],
            comment: '',
            id: null,

        }
    },
    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
            try {
                var req = await axios.get('/api/asset-package/data')
                this.prefix.assetNameData = req.data.assetName;
                this.assetPackage = req.data.assetPackage;
            } catch (err) {
                this.notificationAlert(err.response);

            }
        },

        inputModal(type, data = []) {
            this.inputModalSt = !this.inputModalSt;
            this.modalType = type;
            this.resetError();
            if (type == 'new') {
                this.modalTitle = 'Add New Asset Package';
                this.packageTitle = '';
                this.comment = '';
                this.manageAsset('new');
            } else if (type == 'edit') {
                this.modalTitle = 'Edit Asset Package';
                this.packageTitle = data.name;
                this.assetData = _.cloneDeep(data.asset);
                this.comment = data.comment;
                this.id = data.id;
            }

        },

        manageAsset(type, index = null) {
            let data = {
                asset: null,
                quantity: null,
                duration: null,
                interval: null,
            }
            if (type == 'new') {
                this.assetData = [];
                this.assetData.push(data);
            }
            if (type == 'newItem') {
                this.assetData.push(data);
            }
            if (type == 'delete') {
                if (index > -1) {
                    this.assetData.splice(index, 1);
                }
            }
        },

        async create() {

            this.errorData = {};
            try {
                var data = {
                    packageTitle: this.packageTitle,
                    assetData: this.assetData,
                    comment: this.comment,
                }
                if (this.validateInput(data)) {
                    this.btnDisabled = true;
                    var req = await axios.post('/api/asset-package/data/create', data)
                    if (req) {
                        this.inputModalSt = false;
                        this.notificationAlert(req);
                        this.loadData();
                    }
                }
            } catch (err) {
                this.notificationAlert(err.response);
            }
        },
        async update() {
            this.btnDisabled = true;
            this.errorData = {};
            try {
                var data = {
                    packageTitle: this.packageTitle,
                    assetData: this.assetData,
                    comment: this.comment,
                    id: this.id,
                }
                var req = await axios.post('/api/asset-package/data/update', data)
                if (req) {
                    this.inputModalSt = false;
                    this.notificationAlert(req);
                    this.loadData();
                }
            } catch (err) {
                this.notificationAlert(err.response);
            }
        },

        deleteData(deldata) {
            console.log(this)
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Confirm`,
                text: 'Are you sure, you want to delete this Asset Package?',
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
                var req = await axios.post('/api/asset-package/data/delete', data)
                if (req) {
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

<style lang="scss">
    .vs-tooltip { z-index: 99999 !important; }
</style>
