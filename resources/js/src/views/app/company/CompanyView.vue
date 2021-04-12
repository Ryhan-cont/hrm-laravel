<template>
    <div id="page-company-view">

        <vs-alert color="danger" title="Company Not Found" :active.sync="company_not_found">
            <span>Company record with id: {{ $route.params.id }} not found. </span>
            <span>
                <span>Check </span><router-link :to="{name:'CompanyList'}" class="text-inherit underline">All Companies</router-link>
            </span>
        </vs-alert>
        <div id="company-data" v-if="company_info">

            <vx-card title="Company Info" class="mb-base">

                <!-- Avatar -->
                <div class="vx-row">

                    <!-- Avatar Col -->
                    <div class="vx-col" id="avatar-col">
                        <div class="img-container mb-4">
                            <img :src="company_info.company_logo" class="rounded w-full">
                        </div>
                    </div>

                    <!-- Information - Col 1 -->
                    <div class="vx-col flex-1" id="account-info-col-1">
                        <table>
                            <tr>
                                <td class="font-semibold">Name </td>
                                <td>{{ company_info.name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Email </td>
                                <td>{{ company_info.email }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Phone </td>
                                <td>{{ company_info.phone }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">No. Of User </td>
                                <td>{{ package_info.nou }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1" id="account-info-col-2">
                        <table>
                            <tr>
                                <td class="font-semibold">Status </td>
                                <!--<td>{{ (company_info.is_active === 1) ? 'Active' : 'Inactive' }}</td>-->
                                <td :class="(company_info.is_active === 1) ? 'text-success' : 'text-danger'" >
                                    {{ (company_info.is_active === 1) ? 'Active' : 'Inactive' }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Website </td>
                                <td>{{ company_info.website }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Address </td>
                                <td>{{ company_info.address }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 2 -->
                    <div class="vx-col w-full flex" id="account-manage-buttons">
                        <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'CompanyEdit', params: { id: $route.params.id }}">Edit</vs-button>
                        <vs-button type="border" icon-pack="feather"
                                   @click="actionConfirm(company_info, changeCompanyActive, `${status_text_reverse.toUpperCase()} ${company_info.name}`)"
                                   :color="(company_info.is_active === 1) ? 'danger' : 'success'"
                                   :icon="`icon-${status_text_reverse}`" >
                            {{ status_text_reverse.toUpperCase()}}
                        </vs-button>

                    </div>

                </div>

            </vx-card>

            <div class="vx-row">
                <div class="vx-col lg:w-1/2 w-full">
                    <vx-card title="Admin Info" class="mb-base">
                        <table>
                            <tr>
                                <td class="font-semibold">Name </td>
                                <td>{{ admin_info.full_name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Mobile </td>
                                <td>{{ admin_info.phone }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Email </td>
                                <td>{{ admin_info.email }}</td>
                            </tr>
                        </table>
                    </vx-card>
                </div>

                <div class="vx-col lg:w-1/2 w-full">
                    <vx-card title="Package Info" class="mb-base">
                        <table>
                            <tr>
                                <td class="font-semibold">Name </td>
                                <td>{{package_info.name}}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Bill Period </td>
                                <td>{{package_info.period}}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Price </td>
                                <td>{{package_info.price}}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Currency </td>
                                <td>{{package_info.currency}}</td>
                            </tr>
                        </table>
                    </vx-card>
                </div>
            </div>

            <!-- Permissions -->
            <vx-card>

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
                            <span class="font-medium text-lg leading-none">Permissions</span>
                        </div>
                        <vs-divider />
                    </div>
                </div>

                <div class="block overflow-x-auto">
                    <div>
                        <div class="flex flex-wrap">
                            <div class="m-1 px-2 rounded-lg bg-gray-300" v-for="(item,index) in package_permission" :key="index">
                                <div>{{ item.name }}</div>
                                <div class="m-1 px-2 rounded-lg bg-gray-200" v-for="(subItem,subIndex) in item.subpermissions"
                                     :key="subIndex" v-if="subItem.status">{{subItem.title}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<table class="w-full permissions-table">
                        &lt;!&ndash;<tr>
                            <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in permission_head" :key="heading">{{ heading }}</th>
                        </tr>&ndash;&gt;
                        <tr>
                            <th class="font-semibold text-base text-left px-3 py-2">Module</th>
                            <th class="font-semibold text-base text-left px-3 py-2">Permissions</th>
                        </tr>
                        <tr v-for="(val, name) in package_permission" :key="name">
                            <td class="px-3 py-2">{{ val.name }}</td>
                            <td class="px-3 py-2 rounded-lg bg-gray-200"
                                 v-for="(permission, name) in val.subpermissions"
                                 :key="name+permission"
                                 v-if="permission.status">{{permission.title}}</td>
                            &lt;!&ndash;<td v-for="(permission, name) in val" class="px-3 py-2" :key="name+permission">
                                <vs-checkbox v-model="val[name]" class="pointer-events-none" />
                            </td>&ndash;&gt;
                            &lt;!&ndash;<td v-for="(permission, name) in val.subpermissions" class="px-3 py-2" :key="name+permission">
                                <vs-checkbox v-model="val[name]" class="pointer-events-none" />
                            </td>&ndash;&gt;
                        </tr>
                    </table>-->
                </div>

            </vx-card>
        </div>

    </div>
</template>

<script>
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    import {Cropper} from 'vue-advanced-cropper'
    import vSelect from 'vue-select'

    export default {
        components: {},
        data: () => ({
            status_text_reverse: '',
            company_info: null,
            admin_info: null,
            package_info: null,
            package_permission: null,
            permission_head: [],
            company_not_found: false,
        }),
        mounted() {
            this.fetchCompanyInfo();
        },
        methods: {
            fetchCompanyInfo() {
                axios.get(`/api/company-view/data/${this.$route.params.id}`)
                    .then(response => {
                        //console.log(response);
                        if (response.status === 200) {
                            this.company_info = response.data.company_info;
                            this.admin_info = response.data.admin_info;
                            this.package_info = response.data.package_info;
                            this.package_permission = response.data.package_permission;
                            this.permission_head = response.data.permission_head;

                            this.status_text_reverse = (this.company_info.is_active === 1) ? 'lock' : 'unlock';
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        console.log(err);
                        this.company_not_found = true
                    });
            },

            /**
             * Update Company is_active status
             * *********************************/
            changeCompanyActive(params) {
                let data = {id: params.id, is_active: params.is_active}
                this.$http.put(`/api/company-view/data/update`, data)
                    .then(response => {
                        this.fetchCompanyInfo();
                        this.notificationAlert(response)

                    }).catch(err => {
                    this.notificationAlert(err.response)
                })
            },
        }
    }
</script>
<style lang="scss">
    #avatar-col {
        width: 10rem;
    }

    #page-company-view {
        table {
            td {
                vertical-align: top;
                min-width: 140px;
                padding-bottom: .8rem;
                word-break: break-all;
            }

            &:not(.permissions-table) {
                td {
                    @media screen and (max-width:370px) {
                        display: block;
                    }
                }
            }
        }
    }

    @media screen and (min-width:1201px) and (max-width:1211px),
    only screen and (min-width:636px) and (max-width:991px) {
        #account-info-col-1 {
            width: calc(100% - 12rem) !important;
        }

    }

</style>
