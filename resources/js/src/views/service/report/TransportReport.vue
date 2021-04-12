<template>
    <div>

        <vx-card v-if="isAdmin" ref="filterCard" class="user-list-filters mb-8" actionButtons @refresh="resetColFilters" @remove="resetColFilters">
            <div class="vx-row">
                <div class="vx-col md:w-3/12 sm:w-1/2 w-full">
                    <vs-select class="w-full" v-model="employee" autocomplete label="Employee" placeholder="Select an employee" @input="fetchReport(employee)">
                        <vs-select-item v-for="(item, index) in employees" :key="index" :text="`${item.full_name} (${item.emp_id})`" :value="item.user_id"/>
                    </vs-select>
                </div>
            </div>
        </vx-card>

        <vx-card >
            <vs-table max-items="10" pagination search stripe :data="transportData">

                <template slot="thead">
                    <vs-th sort-key="">Employee</vs-th>
                    <vs-th sort-key="">Transport Type</vs-th>
                    <vs-th sort-key="">Date Range</vs-th>
                    <vs-th sort-key="">To</vs-th>
                    <vs-th sort-key="">From</vs-th>
                    <vs-th sort-key="">Status</vs-th>
                    <vs-th >Action</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="tr.full_name"> {{ tr.full_name }} </vs-td>
                        <vs-td :data="tr.transport_type"> {{ tr.transport_type }} </vs-td>
                        <vs-td :data="tr.date_range"> {{ tr.date_range }} </vs-td>
                        <vs-td :data="tr.location_to"> {{ tr.location_to }} </vs-td>
                        <vs-td :data="tr.location_from"> {{ tr.location_from }} </vs-td>
                        <vs-td :data="tr.status">{{tr.status}}</vs-td>
                        <vs-td id="action-buttons">
                            <vs-dropdown vs-trigger-click>
                                <vs-button color="dark" icon="more_vert" type="flat" ></vs-button>
                                <vs-dropdown-menu>
                                    <vs-dropdown-item :to="{path:`/profile/${tr.user_id}`}">
                                        <span class="flex items-center">
                                            <vs-icon class="mr-2" icon="preview"></vs-icon>
                                            <span>Request Details</span>
                                        </span>
                                    </vs-dropdown-item>

                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </vs-td>
                    </vs-tr>
                </template>
            </vs-table>
            <vs-button style="margin-top:17px;"
                       size="small" icon-pack="feather"
                       icon="icon-file-plus" @click="exportExcel">Excel Export</vs-button>
        </vx-card>
    </div>
</template>

<script>

    export default {
        components:{

        },
        data (){
            return {
                transportData: [],
                employees: [],
                employee: null,
                isAdmin: false,
            }
        },
        created() {
            this.fetchReport('all');
            this.fetchUserList();
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
                this.fetchReport('all');
                this.employee = null;
                this.$refs.filterCard.removeRefreshAnimation();
            },
            fetchReport(target) {
                axios.get("/api/report/transport-report",{
                    params: {
                        target: target
                    }
                })
                    .then(response => {
                        this.transportData = response.data.transport_data;
                        this.isAdmin = response.data.isAdmin;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },
            exportExcel(){
                let params = {
                    id:this.employee
                };
                let paramString = new URLSearchParams(params);
                window.open(`/export-transport?${paramString.toString()}`);

            },
        },
    }
</script>

<style lang="scss">
    .con-vs-dropdown--menu{
        width: 15%
    }
</style>
