<template>
<vx-card title="">
  <div>
    <!-- <div @click="loadData()">Load Data</div> -->
    <div class="">
        <div class="flex">
          <div class="flex-auto"></div>
          <div><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="inputModal('new')">Add New</vs-button></div>
        </div>
        <div class="pt-3" style="min-height:300px">
          <vs-table max-items="10" pagination search stripe :data="leavePackage">
            <template slot="thead">
              <vs-th>Package Title</vs-th>
              <vs-th>
                <div class="flex w-full">
                  <div class="flex-auto">Type</div>
                  <div class="flex-auto" style="max-width:80px;">No. of Days</div>
                </div>
              </vs-th>
              <vs-th>Comment</vs-th>
              <vs-th class="w-10 text-center">Action</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in leavePackage">

                <vs-td :data="tr.name">
                  {{ tr.name }}
                </vs-td>

                <vs-td :data="tr.leave">
                  <div class="flex py-1" v-for="(item, index) in tr.leave" :key="index">
                    <div class="flex-auto">{{ item.type }}</div>
                    <div class="flex-auto" style="max-width:80px;">{{ item.balance }}</div>
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
          <vs-input label-placeholder="Package Title" class="w-full pt-3" v-model="packageTitle" />
          <validate-data rules="required" :value="packageTitle" :name="'packageTitle'" altName="package Title" />
        </div>
        <div v-for="(item, index) in leaveData" :key="index">
          <div class="vx-row pt-1">
            <div class="vx-col md:w-5/12 w-full">
                <search-box label="Leave Type" v-model="item.type" :items="prefix.leaveTypeData" />
                <validate-data rules="required" :value="item.type" :name="'leaveData.'+index+'.type'" altName="leave type" />
            </div>
            <div class="vx-col md:w-5/12 w-full overflow-hidden">
                <vs-input label="No. of Days" class="w-full" v-model="item.balance" />
                <validate-data rules="required|integer" :value="item.balance" :name="'leaveData.'+index+'.balance'" altName="No. of Days" />
            </div>
              <div class="vx-col md:w-1/12 w-full pt-6">
                <span class="centerx">
                    <vs-tooltip text="Remove">
                        <vs-button size="large" color="danger" type="flat" icon-pack="feather" icon="icon-x" class="flex-auto mr-3"
                                   v-show="index || ( !index && leaveData.length > 1)"
                                   @click="manageLeave('delete',index)">
                        </vs-button>
                        </vs-tooltip>
                    <vs-tooltip text="Add New">
                        <vs-button size="large" color="primary" type="flat" icon-pack="feather" icon="icon-plus" class="flex-auto"
                                   @click="manageLeave('newItem')"
                                   v-show="index === leaveData.length-1">
                        </vs-button>
                    </vs-tooltip>
                </span>
              </div>
          </div>
        </div>
        <div class="pt-6"><vs-textarea v-model="comment" label="Comment" /></div>
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
export default {
    components: {},
    data() {
        return {
            moduleData: [],
            inputModalSt: false,
            modalTitle: null,
            modalType: null,

            prefix: {
                'leaveTypeData': [],
            },

            leavePackage: [],

            packageTitle: '',
            leaveData: [],
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
                var req = await axios.get('/api/leave-package/data')
                this.prefix.leaveTypeData = req.data.leaveType;
                this.leavePackage = req.data.leavePackage;
            } catch (err) {
                this.notificationAlert(err.response);
            }
        },

        inputModal(type, data = []) {
            this.inputModalSt = !this.inputModalSt;
            this.modalType = type;
            this.resetError();
            if (type == 'new') {
                this.modalTitle = 'Add New Leave Package';

                this.packageTitle = '';
                this.comment = '';
                this.manageLeave('new');

            } else if (type == 'edit') {
                this.modalTitle = 'Edit Leave Package';

                this.packageTitle = data.name;
                this.leaveData = _.cloneDeep(data.leave);
                this.comment = data.comment;

                this.id = data.id;
            }

        },
        manageLeave(type, index = null) {
            let data = {
                type: null,
                balance: null,
            }
            if (type == 'new') {
                this.leaveData = [];
                this.leaveData.push(data);
            }
            if (type == 'newItem') {
                this.leaveData.push(data);
            }
            if (type == 'delete') {
                if (index > -1) {
                    this.leaveData.splice(index, 1);
                }
            }
        },
        async create() {

            this.errorData = {};
            try {
                var data = {
                    packageTitle: this.packageTitle,
                    leaveData: this.leaveData,
                    comment: this.comment,
                }

                if (this.validateInput(data)) {
                    this.btnDisabled = true;
                    var req = await axios.post('/api/leave-package/data/create', data)
                    if (req) {
                        this.inputModalSt = false;
                        this.loadData();
                        this.notificationAlert(req);
                    }
                }
            } catch (err) {
                this.notificationAlert(err.response);
            }
            this.btnDisabled = false;
        },
        async update() {
            var data = {
                packageTitle: this.packageTitle,
                leaveData: this.leaveData,
                comment: this.comment,
                id: this.id,
            }
            try {
                var req = await axios.post('/api/leave-package/data/update', data)
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
            console.log(this)
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Confirm`,
                text: 'Are you sure, you want to delete this Leave Package?',
                acceptText: 'ok',
                accept: this.deleteDataProceed,
                parameters: deldata,
            })
        },
        deleteDataProceed(Deldata) {
            var data = {
                id: Deldata.id,
            }
            axios.post('/api/leave-package/data/delete', data)
                .then(response => {
                    this.notificationAlert(response);
                    this.loadData();
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
        },
    }
}
</script>

<style lang="scss">
    .vs-tooltip { z-index: 99999 !important; }
</style>
