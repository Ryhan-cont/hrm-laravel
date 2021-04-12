<template>
    <div>
        <vx-card>
            <div>

                <div class="vx-row">
                    <div class="mt-2 vx-col md:w-1/2 w-full">
                        <v-date-picker v-model="applicable_date" color="purple" :masks="{input: 'DD-MM-YYYY'}"  :min-date="new Date()" >
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4" label="Applicable Date" :value="inputValue" v-on="inputEvents" />
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="pt-6">
                    <vs-textarea v-model="remark" label="Remarks/Reasons" />
                </div>
                <div class="flex">
                    <div class="flex-auto"></div>
                    <div><vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="createRequest">Send</vs-button></div>
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
                applicable_date:null,
                remark:null,
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
                    applicable_date: this.applicable_date,
                    remark: this.remark,
                    status: 0,
                }
                this.btnDisabled = true;
                this.$http.post(`/api/employee-resignation-process/create`, data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },

        },
    }
</script>

<style scoped>

</style>
