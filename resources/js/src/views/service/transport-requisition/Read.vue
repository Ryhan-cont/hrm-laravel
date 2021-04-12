<template>
    <div id="page-request-view">
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider />
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th>Transport Type</vs-th>
                            <vs-td>{{ req_info.transport}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Location From</vs-th>
                            <vs-td>{{req_info.location_from }}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Location To</vs-th>
                            <vs-td>{{req_info.location_to }}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Date Range</vs-th>
                            <vs-td>{{req_info.formatted_start_datetime}} - {{req_info.formatted_end_datetime}}</vs-td>
                        </vs-tr> <vs-tr>
                            <vs-th>Remarks</vs-th>
                            <vs-td>{{ req_info.remarks}}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>

                <div v-else>
                    <form>
                        <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                        <div class="vx-row">

                            <div class="vx-col md:w-6/12 w-full overflow-hidden">
                                <vs-select v-model="selectedTransport" class="w-full" placeholder="Transport Type" label="Transport Type"
                                           autocomplete >
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in transportData"/>
                                </vs-select>
                            </div>
                            <div class="vx-col md:w-6/12 w-full overflow-hidden">
                                <label>Date Range</label>
                                <v-date-picker v-model="dateRange" mode="dateTime" is12hr is-range
                                               color="purple" class="mycutomclass"
                                               :min-date="new Date()" :popover="{ placement: $screens({ default: 'bottom', md: 'left-start' }) }"
                                                >
                                    <template v-slot="{ inputValue, inputEvents }" >
                                        <vx-input-group class="mb-base">
                                            <vs-input  icon-pack="feather" icon="icon icon-calendar" class="w-full"
                                                      :value="inputValue.start+' - '+inputValue.end" v-on="inputEvents.start" />
                                        </vx-input-group>
                                    </template>
                                </v-date-picker>
                            </div>
                            <div class="vx-col md:w-6/12 w-full overflow-hidden">
                                <vs-input class="w-full" label="From" type="text" placeholder="From" v-model="locationFrom" />
                            </div>
                            <div class="vx-col md:w-6/12 w-full overflow-hidden">
                                <vs-input class="w-full" label="To" type="text" placeholder="To" v-model="locationTo" />
                            </div>
                        </div>

                        <div class="pt-6">
                            <vs-textarea v-model="remarks" label="Remark" />
                        </div>
                        <div class="flex">
                            <div class="flex-auto"></div>
                            <div><vs-button size="small" class="ml-auto mt-2"  icon="send" :disabled="btnDisabled"  @click="updateRequest">Send</vs-button></div>
                        </div>
                    </form>
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
            required: true
        },
    },
    data(){
        return {

            req_info: {},
            trans_id: null,
            req_id: this.$route.query.id,
            ref_id: this.$route.query.ref_id,
            selectedTransport: '',
            transportData: [],
            locationData:[],
            locationFrom:'',
            locationTo:'',

            remarks: null,
            dateRange:{start: new Date(), end: new Date()},
            tableData:[],
        }
    },
    created() {
        this.fetchRequest();
        this.fetchTransports();
    },
    mounted() {
        this.$parent.$on('eventingReasons', data => {
            this.reasons = data;
        });
    },

    methods:{
        fetchTransports() {
            axios.get(`/api/data/dropdown-items/${this.$constants.CONST_TRANSPORT_TYPES}`)
                .then(response => {
                    this.transportData = response.data.items;
                    this.$parent.$emit('eventingReasons', this.reasons);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        fetchRequest(){
            axios.get(`/api/transport-requisition/data/${this.$route.query.id}`)
                .then(response => {
                    console.log(response.data.infos)
                    this.req_info = response.data.infos;
                    if (this.data.edit_info) {
                        this.selectedTransport = response.data.infos.transport_selected_id;
                        this.locationFrom = response.data.infos.location_from;
                        this.locationTo = response.data.infos.location_to;
                        this.remarks = response.data.infos.remarks;
                        this.trans_id = response.data.infos.transport_id;
                        this.dateRange ={start: new Date(response.data.infos.start_date),end: new Date(response.data.infos.end_date)};
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        updateRequest(){
            this.btnDisabled = true;
            let data = {
                module_id: this.$store.state.moduleId,
                ref_id: this.ref_id,
                req_id: this.req_id,
                transport: this.selectedTransport,
                dateRange: this.dateRange,
                location_from: this.locationFrom,
                location_to: this.locationTo,
                remarks: this.remarks,
                trans_id: this.trans_id,
                status: 0
            };

            this.$http.put(`/api/transport-requisition/update/${this.req_id}`, data)
                .then(response => {
                this.notificationAlert(response)
                this.$router.push('/dashboard');
            }).catch(err => {
                this.notificationAlert(err.response)
            })
        }
    },
    computed: {
    }
}
</script>

<style lang="scss">
   /* .vc-day-content {
        height : 10px !important; // size of date cell - set your custom size here
        width : 10px !important;
        font-size: 6px !important;
        padding: 3px;
    }*/
</style>
