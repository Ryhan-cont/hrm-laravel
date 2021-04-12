<template>
    <div>
        <vx-card>
            <div>
                <div class="vx-row" v-for="(item,index) in overTime" :key="index">
                    <div class="vx-col md:w-2/12 w-full overflow-hidden pt-4">
                        <vs-select v-model="item.type" class="w-full" placeholder="Overtime Type" label="Overtime Type"
                                   autocomplete>
                            <vs-select-item :key="index" :value="item.value" :text="item.label"
                                            v-for="(item,index) in TypeData"/>
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-2/12 w-full overflow-hidden">
                        <v-date-picker v-model="item.date" color="purple" :masks="{input: 'DD-MM-YYYY'}"
                                       @input="dateCheck(item.date,index)">
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="Date"
                                          :value="inputValue" v-on="inputEvents"/>
                            </template>
                        </v-date-picker>
                    </div>
                    <div class="vx-col md:w-3/12 w-full overflow-hidden pt-3">
                        <label>Start Time</label>
                        <v-date-picker mode="time" v-model="item.start" :timezone="timezone"
                                       @input="check(item,index)"/>
                    </div>
                    <div class="vx-col md:w-3/12 w-full overflow-hidden pt-3">
                        <label>End Time</label>
                        <v-date-picker mode="time" v-model="item.end" :timezone="timezone" @input="check(item,index)"/>
                        <span class="text-danger">{{item.dateErr}}</span>
                    </div>
                    <div class="vx-col md:w-1/12 w-full pt-8">
                        {{item.diff}}
                    </div>
                    <div class="vx-col md:w-1/12 w-full pt-8">
                <span class="centerx">
                    <vs-tooltip text="Remove">
                        <vs-button size="large" color="danger" type="flat" icon-pack="feather" icon="icon-x"
                                   class="flex-auto mr-3"
                                   v-show="index || ( !index && overTime.length > 1)"
                                   @click="assetManager('delete',index)">
                        </vs-button>
                        </vs-tooltip>
                    <vs-tooltip text="Add New">
                        <vs-button size="large" color="primary" type="flat" icon-pack="feather" icon="icon-plus"
                                   class="flex-auto"
                                   @click="assetManager('add')"
                                   v-show="index === overTime.length-1">
                        </vs-button>
                    </vs-tooltip>
                </span>
                    </div>
                </div>

                <div class="pt-6">
                    <vs-textarea v-model="remarks" label="Remarks"/>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/4">
                        <vs-checkbox v-model="is_for_other" size="small">Request for Other</vs-checkbox>
                    </div>
                </div>
                <div class="vx-row" v-if="is_for_other">
                    <div class="vx-col md:w-1/3 pt-3">
                        <vs-select class="w-full" v-model="request_for" autocomplete label="Request for"
                                   placeholder="Select an employee">
                            <vs-select-item v-for="(item, index) in employees" :key="index"
                                            :text="`${item.full_name} (${item.emp_id})`" :value="item.user_id"/>
                        </vs-select>
                    </div>
                </div>

                <div class="flex">
                    <div class="flex-auto"></div>
                    <div>
                        <vs-button size="small" :disabled="btnDisabled" class="ml-auto mt-2" @click="createRequest()" icon="send"> Send </vs-button>
                    </div>
                </div>
            </div>

        </vx-card>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                is_for_other: false,
                employees: [],
                request_for: null,
                max_over_time: null,

                ref_id: null,
                TypeData: [],

                overTime: [],
                remarks: null,
                timezone: '',
                quantity: null,
            }
        },
        mounted() {
            this.loadData();
            this.assetManager('add');
        },
        methods: {
            check(data, index) {
                let a = data.start; // Current date now.
                let b = data.end; // Start of 2010.
                let d = ((b - a) / 1000 / 60 / 60).toFixed(2);
                console.log(this.max_over_time)
                if (d <= 0) {
                    this.btnDisabled = true;
                    this.overTime[index].end = data.start;
                    this.overTime[index].diff = null;
                    this.overTime[index].dateErr = 'Must be grater than start time';
                } else if (this.max_over_time < d) {
                    this.btnDisabled = true;
                    this.overTime[index].diff = d + ' Hours';
                    this.overTime[index].dateErr = 'Max over time can be only ' + this.max_over_time + ' hours';
                } else {
                    this.btnDisabled = false;
                    this.overTime[index].diff = d + ' Hours';
                    this.overTime[index].dateErr = null;
                }
            },
            dateCheck(data, index) {
                console.log(data)
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let d = new Date(data);
                let dayName = days[d.getDay()];

                axios.get(`/api/overtime-apply/overtime-check/${dayName}`)
                    .then(response => {
                        this.btnDisabled = true;
                        this.max_over_time = response.data.max_over_time;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            loadData() {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_OVERTIME_TYPES}`)
                    .then(response => {
                        this.TypeData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            assetManager(type, index = null) {
                let data = {
                    category: null,
                    start: new Date(),
                    end: new Date(),
                    subCategory: null,
                    subCetegoryData: [],
                    categoryItem: null,
                    categoryItemData: [],
                }
                if (type == 'add') {
                    this.overTime.push(data);
                }

                if (type == 'delete') {
                    if (index > -1) {
                        this.overTime.splice(index, 1);
                    }
                }
            },

            createRequest() {
                this.btnDisabled = true;
                let data = {
                    module_id: this.$store.state.moduleId,
                    ref_id: this.ref_id,
                    overTime: this.overTime,
                    remarks: this.remarks,
                    status: 0,
                    is_for_other: this.is_for_other,
                    request_for: this.request_for,
                }
                axios.post('/api/overtime-apply/create', data)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$router.push('/dashboard');
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            fetchUserList() {
                axios.get("/api/work-group/list/users")
                    .then(response => {
                        this.employees = response.data.data;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },

        },
        watch: {
            "is_for_other": function () {
                if (this.is_for_other) {
                    this.fetchUserList();
                }
            }
        }
    }
</script>

<style lang="scss">
    .vc-date {
        display: none !important;
    }
</style>
