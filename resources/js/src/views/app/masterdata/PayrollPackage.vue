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
                    <vs-table max-items="10" pagination search stripe :data="payrollPackage">
                        <template slot="thead">
                            <vs-th>Package Title</vs-th>
                            <vs-th>
                                <div class="flex w-full">
                                    <div class="flex-auto">Payroll Head</div>
                                    <div class="flex-auto" style="max-width:80px;">Amount</div>
                                </div>
                            </vs-th>
                            <vs-th class="text-center">Total</vs-th>
                            <vs-th>Comment</vs-th>
                            <vs-th class="w-10 text-center">Action</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                                <vs-td :data="tr.name">
                                    {{ tr.name }}
                                </vs-td>

                                <vs-td :data="tr.payroll">
                                    <div class="flex py-1" v-for="(item, index) in tr.payroll" :key="index">
                                        <div class="flex-auto">{{ item.head }}</div>
                                        <div class="flex-auto text-right" style="max-width:80px;">{{item.amount|addComma}}</div>
                                    </div>
                                </vs-td>

                                <vs-td :data="tr.total" class="text-right">
                                    {{ tr.total|addComma }}
                                </vs-td>

                                <vs-td :data="tr.comment">
                                    {{ tr.comment }}
                                </vs-td>

                                <vs-td class="w-10">
                                    <div class="flex pt-1">
                                        <div class="flex-auto cursor-pointer" align="center"
                                             @click="inputModal('edit', tr)"><i
                                                class="material-icons text-lg icon align">edit</i></div>
                                        <div class="flex-auto cursor-pointer" align="center"
                                             @click="deleteData(tr)"><i
                                                class="material-icons text-lg icon align">delete</i></div>
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
                            <vs-input label-placeholder="Package Title" class="w-full pt-3" v-model="packageTitle"/>
                            <validate-data rules="required" :value="packageTitle" :name="'packageTitle'"
                                           altName="package title"/>
                        </div>

                        <div v-for="(item, index) in payrollData" :key="index">
                            <div class="vx-row">
                                <div class="vx-col md:w-5/12 w-full pt-2">
                                    <search-box label="Payroll Head" v-model="item.head"
                                                :items="prefix.payrollHeadData"/>
                                    <validate-data rules="required" :value="item.head"
                                                   :name="'payrollData.'+index+'.head'" altName="payroll head"/>
                                </div>
                                <div class="vx-col md:w-5/12 w-full overflow-hidden">
                                    <vs-input label-placeholder="Head Amount" @input="totalCalculate()"
                                              class="w-full pt-3" v-model="item.amount"/>
                                    <validate-data rules="required|integer" :value="item.amount"
                                                   :name="'payrollData.'+index+'.amount'" altName="amount"/>
                                </div>
                                <div class="vx-col md:w-2/12 w-full pt-8">
                                    <span class="centerx">
                                        <vs-tooltip text="Remove">
                                            <vs-button size="large" color="danger" type="flat" icon-pack="feather" icon="icon-x" class="flex-auto mr-3"
                                                       v-show="index || ( !index && payrollData.length > 1)"
                                                       @click="managePayroll('delete',index)">
                                            </vs-button>
                                            </vs-tooltip>
                                        <vs-tooltip text="Add New">
                                            <vs-button size="large" color="primary" type="flat" icon-pack="feather" icon="icon-plus" class="flex-auto"
                                                       @click="managePayroll('newItem')"
                                                       v-show="index === payrollData.length-1">
                                            </vs-button>
                                        </vs-tooltip>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="flex">
                                <div class="font-bold pr-2">Total:</div>
                                <div class="">{{ total | addComma }}</div>
                            </div>
                        </div>
                        <div class="pt-6">
                            <vs-textarea v-model="comment" label="Comment"/>
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

                prefix: {
                    'payrollHeadData': [],
                },

                payrollPackage: [],

                packageTitle: '',
                payrollData: [],
                total: '',
                comment: '',
                id: null,

            }
        },
        mounted() {
            this.loadData();
        },
        filters: {
            addComma(value) {
                try {
                    if (value == null) {
                        return 0
                    } else if (value == undefined) {
                        return 0
                    } else if (value == '') {
                        return 0
                    } else if (value.toString().indexOf(".") > -1) {
                        var addCommaData = value.toString().split('.');
                        return addCommaData[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + addCommaData[1]
                    } else {
                        return value.toString().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                } catch (err) {
                    console.log(value);
                    return 0;
                }
            },
        },
        methods: {
            loadData() {
                axios.get('/api/payroll-package/data')
                    .then(response => {
                        this.prefix.payrollHeadData = response.data.payrollHead;
                        this.payrollPackage = response.data.payrollPackage;
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })

            },

            inputModal(type, data = []) {
                this.inputModalSt = !this.inputModalSt;
                this.modalType = type;
                this.resetError();
                if (type == 'new') {
                    this.modalTitle = 'Add New Payroll Package';
                    this.packageTitle = '';


                    this.total = '';
                    this.comment = '';

                    this.managePayroll('new');
                } else if (type == 'edit') {
                    this.modalTitle = 'Edit Payroll Package';
                    this.packageTitle = data.name;
                    this.total = data.total;
                    this.payrollData = _.cloneDeep(data.payroll);
                    this.comment = data.comment;
                    this.id = data.id;
                }

            },
            managePayroll(type, index = null) {
                let data = {
                    head: null,
                    amount: null,
                }
                if (type == 'new') {
                    this.payrollData = [];
                    this.payrollData.push(data);
                }
                if (type == 'newItem') {
                    this.payrollData.push(data);
                }
                if (type == 'delete') {
                    if (index > -1) {
                        this.payrollData.splice(index, 1);
                    }
                }
            },
            totalCalculate() {
                var total = 0;
                for (var i = 0; this.payrollData.length > i; i++) {
                    total = Number(total) + Number(this.payrollData[i].amount);
                }
                this.total = total;
            },
            async create() {

                this.errorData = {};
                try {
                    var data = {
                        packageTitle: this.packageTitle,
                        payrollData: this.payrollData,
                        total: this.total,
                        comment: this.comment,
                    }
                    if (this.validateInput(data)) {
                        this.btnDisabled = true;
                        var req = await axios.post('/api/payroll-package/data/create', data)
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
                this.errorData = {};
                try {
                    var data = {
                        packageTitle: this.packageTitle,
                        payrollData: this.payrollData,
                        total: this.total,
                        comment: this.comment,
                        id: this.id,
                    }

                    var req = await axios.post('/api/payroll-package/data/update', data)
                    if (req) {
                        this.notificationAlert(req);
                        this.inputModalSt = false;
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
                    text: 'Are you sure, you want to delete this Payroll Package?',
                    acceptText: 'ok',
                    accept: this.deleteDataProceed,
                    parameters: deldata,
                })
            },
            deleteDataProceed(Deldata) {
                var data = {
                    id: Deldata.id,
                }
                axios.post('/api/payroll-package/data/delete', data)
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
