<template>
    <div>
        <vx-card ref="filterCard" class="user-list-filters mb-8" actionButtons @refresh="resetColFilters" @remove="resetColFilters">
            <div class="vx-row">
                <div class="vx-col md:w-3/12 sm:w-1/2 w-full">
                    <vs-select class="w-full" v-model="employee" autocomplete label="Employee" placeholder="Select an employee">
                        <vs-select-item v-for="(item, index) in employees" :key="index" :text="`${item.full_name} (${item.emp_id})`" :value="item.user_id"/>
                    </vs-select>
                </div>
            </div>
        </vx-card>
    </div>
</template>

<script>
export default {
name: "ReportFilters",
    data(){
        return {
            employees: [],
            employee: null
        }
    },
    methods:{
        fetchUserList() {
            axios.get("/api/work-group/list/users")
                .then(response => {
                    this.employees = response.data.data;
                })
                .catch(err => {
                    this.notificationAlert(err.response)
                });
        },

        resetColFilters() {
            //Reset filters
            this.statusFilter = {label: 'Active', value: 1};
            this.fetchUsers();
            this.$refs.filterCard.removeRefreshAnimation();
        },
    },
    created() {
        this.fetchUserList()
    },
    watch:{
        "employee":function () {
            this.$parent.$emit('eventingReasons', this.employee);
        }
    }
}
</script>

<style scoped>

</style>
