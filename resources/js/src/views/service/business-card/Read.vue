<template>
    <div id="page-request-view">
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider />
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th>Card Amount</vs-th>
                            <vs-td>{{req_info.card_amount}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Need by Date</vs-th>
                            <vs-td>{{req_info.need_by_date_formatted}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th>Remarks</vs-th>
                            <vs-td>{{req_info.remarks}}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>
                <div v-else>

                    <div class="vx-row">

                        <div class="mt-2 vx-col md:w-1/2 w-full">
                            <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                            <vs-input class="w-full mt-4" label="* Number of Card" min="1" type="number" v-model="numberOFCard" />
                            <validate-data rules="required" :value="numberOFCard" :name="'numberOFCard'" altName="Number of Card" />
                        </div>
                        <div class="mt-2 vx-col md:w-1/2 w-full">
                            <v-date-picker v-model="needByDate" color="purple" :masks="{input: 'DD-MM-YYYY'}" :min-date="new Date()">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="Need by Date" :value="inputValue" v-on="inputEvents" />
                                </template>
                            </v-date-picker>
                        </div>
                    </div>
                    <div class="pt-6">
                        <vs-textarea v-model="remark" label="Remarks" />
                    </div>
                    <div class="flex">
                        <div class="flex-auto"></div>
                        <div><vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="updateRequest">Send</vs-button></div>
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
        data(){
            return {
                req_info: {},
                tableData:[],

                req_id: this.$route.query.id,
                ref_id: this.$route.query.ref_id,
                numberOFCard:null,
                needByDate:null,
                remark:null,
            }
        },
        created() {
            this.fetchRequest();
        },
        mounted() {
        },

        methods:{
            fetchRequest(){
                axios.get(`/api/business-card-request/data/${this.$route.query.id}`)
                    .then(response => {
                        this.req_info = response.data.req_info;
                        if (this.data.edit_info) {
                            this.numberOFCard = response.data.req_info.card_amount;
                            this.needByDate = response.data.req_info.need_by_date;
                            this.remark = response.data.req_info.remarks;
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
                    ref_id: this.ref_id,
                    card_amount: this.numberOFCard,
                    need_by_date: this.needByDate,
                    remark: this.remark,
                    status: 0,
                }
                this.$http.put(`/api/business-card-request/update/${this.req_id}`, data)
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
