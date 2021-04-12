<template>
    <div>
        <vx-card >
            <form>
                <vs-input type="hidden" v-model="ref_id" name="ref_id" />
                <div>
                    <div class="flex-auto pt-3 overflow-hidden">
                        <vs-select v-model="reason" class="w-1/2" placeholder="Reason" label="Reason *" autocomplete>
                            <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in reasons" />
                        </vs-select>
                    </div>
                    <validate-data rules="required" :value="reason" name="reason" altName="Reason" />
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
            module_id: null,
            ref_id: null,
            reasons: [],
            reason: null,
            remarks: null,
            is_for_other: false,
            employees: [],
            request_for: null
        }
    },
    created(){
        this.fetchReasons();
    },
    mounted(){},

    methods: {
        /**
         * Create ID Card request
         * ***************************************/
        createRequest() {
            if (this.is_for_other && !this.request_for) {
                this.notificationAlert(`Please select an Employee to request for`, `Error`, `danger`);
                return;
            }

            let data = {
                module_id: this.$store.state.moduleId,
                ref_id: this.ref_id,
                reason: this.reason,
                remarks: this.remarks,
                status: 0,
                is_for_other: this.is_for_other,
                request_for: this.request_for
            }
            this.btnDisabled = true;
            this.$http.post(`/api/id-card-request/create`, data)
                .then(response => {
                    this.notificationAlert(response)
                    this.$router.push('/dashboard');
                }).catch(err => {
                this.notificationAlert(err.response)
            })
        },

        fetchReasons() {
            axios.get(`/api/data/dropdown-items/${this.$constants.CONST_ID_REQ_REASON}`)
                .then(response => {
                    this.reasons = response.data.items;
                    this.$parent.$emit('eventingReasons', this.reasons);
                })
                .catch(err => {
                    this.notificationAlert(err.response)
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
    computed:{

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
