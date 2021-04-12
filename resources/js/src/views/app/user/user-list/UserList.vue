<template>
    <div>
        <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" actionButtons @refresh="resetColFilters" @remove="resetColFilters">
            <div class="vx-row">
                <div class="vx-col md:w-3/12 sm:w-1/2 w-full">
                    <label class="text-sm opacity-75">Status Type</label>
                    <v-select :options="userStatus" :clearable="false" v-model="statusFilter"
                              class="mb-4 md:mb-0 mt-4"
                              @input="fetchUsers"/>
                </div>
            </div>
        </vx-card>

        <vx-card title="" >
            <div class="flex" v-if="this.$store.state.AppActiveUser.isAdmin">
                <div class="flex-auto"></div>
                <div><vs-button size="small" icon-pack="feather"
                                icon="icon-user-plus"
                                :to="{ name: 'UserCreate'}">Add New</vs-button>
                </div>
            </div>

            <vs-table max-items="10" :sst="true" @sort="handleSort" search @search="handleSearch" stripe :data="users.data">

                <template slot="thead">
                    <vs-th>Photo</vs-th>
                    <vs-th sort-key="full_name">Name</vs-th>
                    <vs-th sort-key="company_name">Company</vs-th>
                    <vs-th sort-key="emp_id">Employee ID</vs-th>
                    <vs-th sort-key="role_name">Role</vs-th>
                    <vs-th sort-key="designation">Designation</vs-th>
                    <vs-th sort-key="email">Email</vs-th>
                    <vs-th sort-key="active_status">Status</vs-th>
                    <vs-th >Action</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="tr.pro_pic">
                            <vs-avatar size="30px" :src="tr.pro_pic" />
                        </vs-td>
                        <vs-td :data="tr.full_name"> {{ tr.full_name }} </vs-td>
                        <vs-td :data="tr.company_name"> {{ tr.company_name }} </vs-td>
                        <vs-td :data="tr.emp_id"> {{ tr.emp_id }} </vs-td>
                        <vs-td :data="tr.role_name"> {{ tr.role_name }} </vs-td>
                        <vs-td :data="tr.designation"> {{ tr.designation }} </vs-td>
                        <vs-td :data="tr.email">{{tr.email}}</vs-td>
                        <vs-td :data="tr.active_status">
                            <span :class="tr.is_active === 0 ? 'text-danger' : 'text-success'" >{{ tr.active_status }} </span>
                        </vs-td>
                        <vs-td id="action-buttons">
                            <vs-dropdown vs-trigger-click>
                                <vs-button color="dark" icon="more_vert" type="flat" ></vs-button>
                                <vs-dropdown-menu>
                                    <vs-dropdown-item :to="{path:`/profile/${tr.user_id}`}">
                                        <span class="flex items-center">
                                            <vs-icon class="mr-2" icon="preview"></vs-icon>
                                            <span>View User</span>
                                        </span>
                                    </vs-dropdown-item>
                                    <vs-dropdown-item v-if="tr.is_active"
                                                      @click="actionConfirm(tr, changeUserActive, `De-Activate ${tr.full_name}`)" >
                                        <span class="flex items-center" >
                                            <vs-icon class="mr-2" icon="block" color="danger"></vs-icon>
                                            <span>De-Activate</span>
                                        </span>
                                    </vs-dropdown-item>
                                    <vs-dropdown-item v-if="!tr.is_active"
                                                      @click="actionConfirm(tr, changeUserActive, `Activate ${tr.full_name}`, 'success')">
                                        <span class="flex items-center">
                                            <vs-icon class="mr-2" icon="check" color="success"></vs-icon>
                                            <span>Activate</span>
                                        </span>
                                    </vs-dropdown-item>
                                    <vs-dropdown-item
                                        @click="actionConfirm(tr, resetPassword, `Reset Password of ${tr.full_name}`)">
                                        <span class="flex items-center">
                                            <vs-icon class="mr-2" icon="lock_open"></vs-icon>
                                            <span>Reset Password</span>
                                        </span>
                                    </vs-dropdown-item>
                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </vs-td>
                    </vs-tr>
                </template>
            </vs-table>
            <div class="vx-row">
                <div class="vx-col w-3/12">
                    <vs-button style="margin-top:17px;"
                               size="small" icon-pack="feather"
                               icon="icon-file-plus" @click="exportExcel">Excel Export</vs-button>
                </div>
                <div class="vx-col w-9/12">
                    <vs-pagination class="mt-4" :total="users.last_page" v-model="table_options.current_page" goto ></vs-pagination>

                </div>
            </div>

        </vx-card>
    </div>
</template>

<script>
    import vSelect from 'vue-select'

    export default {
        name: "UserList",
        components: {
            vSelect
        },
        data() {
            return {
                errorData: {},
                attendanceLogData: [],
                rangeValue: {startDate: "", endDate: ""},
                users: {
                    data: [],
                    per_page: 0,
                    total: 0,
                    last_page: 0,
                },
                table_options: {
                    current_page: 1,
                    search_keyword: '',
                    sort_data: {
                        sort_column: '',
                        sort_direction: ''
                    }
                },
                userStatus: [{label: 'Active', value: 1}, {label: 'Inactive', value: 0}, {label: 'All', value: -1}],
                statusFilter: {label: 'Active', value: 1},
            }
        },
        methods: {
            handleSearch(searchTerm) {
                this.table_options.search_keyword = searchTerm;
            },

            fetchUsers() {
                let filterParams = {
                    'is_active': this.statusFilter.value,
                    'sort_column': this.table_options.sort_data.sort_column,
                    'sort_direction': this.table_options.sort_data.sort_direction,
                };
                this.$vs.loading({container: '#div-with-loading', scale: 0.6});
                this.$http.get(`api/user-list/data?page=${this.table_options.current_page}&q=${this.table_options.search_keyword}`, {params: filterParams})
                    .then(response => {
                        this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                        if (response.status === 200) {
                            this.users.data = response.data.users.data;
                            this.users.per_page = response.data.users.per_page;
                            this.users.total = response.data.users.total;
                            this.users.last_page = response.data.users.last_page;
                            this.table_options.current_page = response.data.users.current_page;

                        } else {
                            this.notificationAlert(response)
                        }
                    })
                    .catch(err => {
                        this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                        console.log(err);
                        this.notificationAlert(err.response)
                    });
            },

            resetColFilters() {
                //Reset filters
                this.statusFilter = {label: 'Active', value: 1};
                this.fetchUsers();
                this.$refs.filterCard.removeRefreshAnimation();
            },

            handleSort(key, active) {
                //console.log(`the user ordered: ${key} ${active}\n`);
                this.table_options.sort_data.sort_column = key;
                this.table_options.sort_data.sort_direction = active;
            },
            exportExcel(){
                let params = {
                    id:this.statusFilter.value
                };
                let paramString = new URLSearchParams(params);
                window.open(`/export-user?${paramString.toString()}`);

            },

            /**
             * Update user active/inactive status
             * *********************************/
            changeUserActive(params) {
                let data = {id: params.user_id, is_active: params.is_active, company_id: params.companyid}
                this.$http.put(`api/user-list/data/update`, data)
                    .then(response => {
                        this.fetchUsers();
                        this.notificationAlert(response)

                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },

            /**
             * Reset Password
             * ***************************************/
            resetPassword(params) {
                let data = {email: params.email}
                this.$vs.loading({container: '#div-with-loading', scale: 0.6})
                this.$http.post(`/user/forgot-password`, data)
                    .then(response => {
                        this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                        this.notificationAlert(response)
                    }).catch(err => {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                    this.notificationAlert(err.response)
                })
                this.$vs.loading.close('#div-with-loading > .con-vs-loading')
            }
        },
        mounted() {
            this.fetchUsers();
        },
        created() {

        },
        watch: {
            "table_options.current_page": function () {
                this.fetchUsers();
            },
            "table_options.search_keyword": function () {
                /*if (this.table_options.search_keyword.length > 1) {
                    this.fetchUsers();
                }*/
                this.fetchUsers();
            },
            "table_options.sort_data": {
                handler(newVal, oldVal) {
                    this.fetchUsers();
                },
                deep: true,
            },

        },
    }
</script>

<style lang="scss">
    .vc-popover-content-wrapper{
        z-index:99999 !important;
    }
    .con-vs-dropdown--menu{
        width: 15%
    }
</style>
