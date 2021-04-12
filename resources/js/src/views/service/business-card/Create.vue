<template>
    <div>
        <vx-card>
            <div>

                <div class="vx-row">

                    <div class="mt-2 vx-col md:w-1/3 w-full">
                        <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                        <vs-input class="w-full mt-4" label="* Number of Card" min="1" type="number" v-model="numberOFCard" />
                        <validate-data rules="required" :value="numberOFCard" :name="'numberOFCard'" altName="Number of Card" />
                    </div>
                    <div class="mt-2 vx-col md:w-1/3 w-full">
                        <v-date-picker v-model="need_by_date" color="purple" :masks="{input: 'DD-MM-YYYY'}"  :min-date="new Date()" >
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="Need by Date" :value="inputValue" v-on="inputEvents" />
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="pt-6">
                    <vs-textarea v-model="remark" label="Remarks" />
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
                    <div><vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="createRequest" >Send</vs-button></div>
                </div>
            </div>

        </vx-card>
    </div>
</template>

<script>
    export default {
        name: "create",
        data() {
            return {
                req_id: this.$route.query.id,
                ref_id: this.$route.query.ref_id,
                numberOFCard:null,
                need_by_date: '',
                remark:null,
                is_for_other: false,
                employees: [],
                request_for: null
            }
        },
        created(){},
        mounted(){},

        methods: {
            /**
             * Create Business Card request
             * ***************************************/
            createRequest() {
                this.btnDisabled = true;
                let data = {
                    module_id: this.$store.state.moduleId,
                    ref_id: this.ref_id,
                    card_amount: this.numberOFCard,
                    need_by_date: this.need_by_date,
                    remark: this.remark,
                    status: 0,
                    is_for_other: this.is_for_other,
                    request_for: this.request_for
                }
                this.btnDisabled = true;
                this.$http.post(`/api/business-card-request/create`, data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },
            fetchUserList() {
                axios.get("/api/work-group/list/users")
                    .then(response => {
                        this.employees = response.data.data;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            }

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
