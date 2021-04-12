<template>
    <div id="page-request-view">
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider/>
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th>Overtime Type</vs-th>
                            <vs-th>Date</vs-th>
                            <vs-th>Start Time</vs-th>
                            <vs-th>End Time</vs-th>
                            <vs-th>Hour</vs-th>
                        </vs-tr>
                        <vs-tr :key="index" v-for="(item,index) in req_info.infos">
                            <vs-td>{{item.type_name}}</vs-td>
                            <vs-td>{{item.formatted_date}}</vs-td>
                            <vs-td>{{item.formatted_start_time}}</vs-td>
                            <vs-td>{{item.formatted_end_time}}</vs-td>
                            <vs-td>{{item.diff}}</vs-td>
                        </vs-tr>
                    </vs-table>
                    <br>
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th style="width: 20%;">Remarks</vs-th>
                            <vs-td>{{req_info.remarks}}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>
                <div v-else>

                    <div class="vx-row" v-for="(item,index) in overTime" :key="index">
                        <div class="vx-col md:w-11/12 w-full overflow-hidden pt-4">
                            <div class="vx-row">
                                <div class="vx-col md:w-6/12 w-full overflow-hidden pt-4">
                                    <vs-select v-model="item.type_id" class="w-full" placeholder="Overtime Type"
                                               label="Overtime Type"
                                               autocomplete>
                                        <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                        v-for="(item,index) in TypeData"/>
                                    </vs-select>
                                </div>
                                <div class="vx-col md:w-6/12 w-full overflow-hidden">
                                    <v-date-picker v-model="item.date" color="purple" :masks="{input: 'DD-MM-YYYY'}"
                                                   @input="dateCheck(item.date,index)">
                                        <template v-slot="{ inputValue, inputEvents }">
                                            <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4"
                                                      label="Date" :value="inputValue" v-on="inputEvents"/>
                                        </template>
                                    </v-date-picker>
                                </div>
                                <div class="vx-col md:w-5/12 w-full overflow-hidden pt-3">
                                    <label>Start Time</label>
                                    <v-date-picker mode="time" v-model="item.start_time.date" :timezone="timezone"
                                                   @input="check(item,index)"/>

                                </div>
                                <div class="vx-col md:w-5/12 w-full overflow-hidden pt-3">
                                    <label>End Time</label>
                                    <v-date-picker mode="time" v-model="item.end_time.date" :timezone="timezone"
                                                   @input="check(item,index)"/>
                                    <span class="text-danger">{{item.dateErr}}</span>
                                </div>
                                <div class="vx-col md:w-2/12 w-full pt-8">
                                    {{item.diff}} Hours
                                </div>
                            </div>
                        </div>
                        <div class="vx-col md:w-1/12 w-full overflow-hidden pt-4">
                            <div class="vx-col md:w-1/12 w-full pt-16">
                <span class="centerx">
                    <vs-tooltip text="Remove">
                        <vs-button size="large" color="danger" type="flat" icon-pack="feather" icon="icon-x"
                                   class="flex-auto mr-3"
                                   v-show="index || ( !index && overTime.length > 1)"
                                   @click="assetManager('delete',index ,item.item_id)">
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
                    </div>
                    <div class="pt-6">
                        <vs-textarea v-model="remarks" label="Remarks"/>
                    </div>
                    <div class="flex">
                        <div class="flex-auto"></div>
                        <div>
                            <vs-button size="small" :disabled="btnDisabled" class="ml-auto mt-2" icon="send" @click="updateRequest()">Send </vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </vx-card>
    </div>
</template>

<script>
    export default {
        name: "read",
        props: {
            data: {
                required: true,
            },
        },
        data() {
            return {
                req_info: {},
                tableData: [],
                overtime_id: null,
                req_id: this.$route.query.id,
                ref_id: this.$route.query.ref_id,
                TypeData: [],
                overTime: [],
                remarks: null,
                timezone: '',
                quantity: null,
                delete_ids: [],
                max_over_time: null,
            }
        },
        created() {
            this.fetchRequest();
        },
        mounted() {
        },

        methods: {
            check(data, index) {
                console.log(data)
                let a = new Date(data.start_time.date); // Current date now.
                let b = new Date(data.end_time.date); // Start of 2010.

                let d = ((b - a) / 1000 / 60 / 60).toFixed(2);
                if (d <= 0) {
                    this.overTime[index].end_time.date = a;
                    this.overTime[index].diff = '0';
                    this.overTime[index].dateErr = 'Must be grater than start time';
                } else if (this.max_over_time < d) {
                    this.overTime[index].diff = d;
                    this.overTime[index].dateErr = 'Max over time can be only ' + this.max_over_time + ' hours';
                } else {
                    this.overTime[index].diff = d;
                    this.overTime[index].dateErr = null;
                }
            },
            dateCheck(data, index) {
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let d = new Date(data);
                let dayName = days[d.getDay()];
                axios.get(`/api/overtime-apply/overtime-check/${dayName}`)
                    .then(response => {
                        this.max_over_time = response.data.max_over_time;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            assetManager(type, index = null, id = null) {
                console.log(type)
                let data = {
                    type_id: '',
                    date: '',
                    start_time: {
                        date: new Date()
                    },
                    end_time: {
                        date: new Date()
                    },
                    timezone: '',
                }
                if (type == 'add') {
                    this.overTime.push(data);
                }

                if (type == 'delete') {
                    if (index > -1) {
                        if (id !== null) {
                            this.delete_ids.push(id);
                        }
                        this.overTime.splice(index, 1);
                    }
                }
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
            fetchRequest() {
                axios.get(`/api/overtime-apply/data/${this.$route.query.id}`)
                    .then(response => {
                        this.req_info = response.data;
                        if (this.data.edit_info) {
                            this.loadData();
                            this.overtime_id = response.data.overtime_id,
                                this.overTime = response.data.infos;
                            this.max_over_time = response.data.infos[0].max_over_time;
                            this.remarks = response.data.remarks;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            updateRequest() {
                this.btnDisabled = true;
                let data = {
                    module_id: this.$store.state.moduleId,
                    overTime: this.overTime,
                    overtime_id: this.overtime_id,
                    ref_id: this.ref_id,
                    remarks: this.remarks,
                    status: 0,
                    delete_ids: this.delete_ids,
                }
                this.$http.put(`/api/overtime-apply/update/${this.req_id}`, data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },
        }
    }
</script>

<style lang="scss">

</style>
