<template>
    <div>
        <vx-card >
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
                                      color="purple"
                                       :min-date="new Date()" >
                            <template v-slot="{ inputValue, inputEvents }">
                                <vx-input-group class="mb-base">
                                    <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full"
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
                <div class="vx-row">
                    <div class="vx-col md:w-1/4">
                        <vs-checkbox v-model="is_for_other" size="small">Request for Other</vs-checkbox>
                    </div>
                </div>
                <div class="vx-row" v-if="is_for_other">
                    <div class="vx-col md:w-1/3 pt-3">
                        <vs-select class="w-full" v-model="request_for" autocomplete label="Request for" placeholder="Select an employee">
                            <vs-select-item v-for="(item, index) in employees" :key="index" :text="`${item.full_name} (${item.emp_id})`" :value="item.user_id"/>
                        </vs-select>
                    </div>
                </div>

                <div class="flex">
                    <div class="flex-auto"></div>
                    <div><vs-button size="small" class="ml-auto mt-2" @click="createRequest" icon="send" :disabled="btnDisabled">Send</vs-button></div>
                </div>
            </form>
        </vx-card>
    </div>
</template>

<script>
export default {
    name: "create",
    data() {
        return {
            is_for_other: false,
            employees: [],
            request_for: null,

            module_id: null,
            ref_id: null,
            selectedTransport: '',
            transportData: [],
            locationData:[],
            locationFrom:'',
            locationTo:'',

            remarks: null,
            dateRange: {
                start: '',
                end: '',
            },


        }
    },
    created(){
        this.fetchTransports();

    },
    mounted(){},

    methods: {
        /**
         * Create ID Card request
         * ***************************************/
        createRequest() {
            this.btnDisabled = true;
            let data = {
                module_id: this.$store.state.moduleId,
                ref_id: this.ref_id,
                transport: this.selectedTransport,
                location_from: this.locationFrom,
                location_to: this.locationTo,
                datetime: this.dateRange,
                remarks: this.remarks,
                status: 0,
                is_for_other: this.is_for_other,
                request_for: this.request_for
            }
            this.$http.post(`/api/transport-requisition/create`, data)
                .then(response => {
                    this.notificationAlert(response)
                    this.$router.push('/dashboard');
                }).catch(err => {
                this.notificationAlert(err.response)
            })
        },

        fetchTransports() {
            axios.get(`/api/data/dropdown-items/${this.$constants.CONST_TRANSPORT_TYPES}`)
                .then(response => {
                    this.transportData = response.data.items;
                    this.$parent.$emit('eventingReasons', this.reasons);
                })
                .catch(err => {
                   this.notificationAlert(err.response);
                });
        },
        fetchLocations() {
            axios.get(`/api/data/dropdown-items/${this.$constants.CONST_LOCATION_ITEMS}`)
                .then(response => {
                    this.locationData = response.data.items;
                    this.$parent.$emit('eventingReasons', this.reasons);
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
                    this.notificationAlert(err.response)
                });
        },


    },
    watch:{
        "is_for_other": function (){
            if (this.is_for_other) {
                this.fetchUserList();
            }
        }
    }
}
</script>

<style scoped>

</style>
