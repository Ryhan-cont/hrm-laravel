<template>
    <div id="page-user-view">

        <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
            <span>User record with id: {{ $route.params.id }} not found. </span>
            <span>
                <span>Check </span><router-link :to="{name:'UserList'}" class="text-inherit underline">All Users</router-link>
            </span>
        </vs-alert>
        <div id="company-data" v-if="user_info">

            <vx-card title="User Info" class="mb-base">

                <!-- Avatar -->
                <div class="vx-row">

                    <!-- Avatar Col -->
                    <div class="vx-col" id="avatar-col">
                        <div class="img-container mb-4">
                            <img :src="$store.state.AppActiveUser.photoURL || '/storage/default/company-logo.png'"
                                 class="rounded w-full">
                        </div>
                    </div>

                    <!-- Information - Col 1 -->
                    <div class="vx-col flex-1" id="account-info-col-1">
                        <table>
                            <tr>
                                <td class="font-semibold">Name </td>
                                <td>{{ user_info.name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Email </td>
                                <td>{{ user_info.email }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Phone </td>
                                <td>{{ user_info.phone }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Designation </td>
                                <td>{{ user_info.designation }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1" id="account-info-col-2">
                        <table>
                            <tr>
                                <td class="font-semibold">Status </td>
                                <td>{{ user_info.status }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Username </td>
                                <td>{{ user_info.username }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Address </td>
                                <td>{{ user_info.address }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Company </td>
                                <td>{{ user_info.company }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 2 -->
                    <div class="vx-col w-full flex" id="account-manage-buttons">
                        <vs-button size="small" icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'UserEdit', params: { id: $route.params.id }}">Edit</vs-button>
                    </div>

                </div>

            </vx-card>

            <!--<div class="vx-row">
                <div class="vx-col lg:w-1/2 w-full">
                    <vx-card title="Admin Info" class="mb-base">
                        <table>
                            <tr>
                                <td class="font-semibold">Name </td>
                                <td>{{ admin_info.name }}</td>
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
            </div>-->

            <!-- Permissions -->
            <!--<vx-card>

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
                </div>

            </vx-card>-->
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
            user_info: null,
            admin_info: null,
            package_info: null,
            package_permission: null,
            permission_head: [],
            user_not_found: false,
        }),
        mounted() {
            this.fetchUserInfo();
        },
        methods: {
            fetchUserInfo() {
                axios.get(`/api/profile/read/${this.$route.params.id}`)
                    .then(response => {
                        //console.log(response);
                        if (response.status === 200) {
                            this.user_info = response.data.user_info;
                            this.admin_info = response.data.admin_info;
                            this.package_info = response.data.package_info;
                            this.package_permission = response.data.package_permission;
                            this.permission_head = response.data.permission_head;
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err);
                        console.log(err);
                        this.user_not_found = true
                    });
            },

        }
    }
</script>
<style lang="scss">
    #avatar-col {
        width: 10rem;
    }

    #page-user-view {
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

    // #account-info-col-1 {
    //   // flex-grow: 1;
    //   width: 30rem !important;
    //   @media screen and (min-width:1200px) {
    //     & {
    //       flex-grow: unset !important;
    //     }
    //   }
    // }


    @media screen and (min-width:1201px) and (max-width:1211px),
    only screen and (min-width:636px) and (max-width:991px) {
        #account-info-col-1 {
            width: calc(100% - 12rem) !important;
        }

        // #account-manage-buttons {
        //   width: 12rem !important;
        //   flex-direction: column;

        //   > button {
        //     margin-right: 0 !important;
        //     margin-bottom: 1rem;
        //   }
        // }

    }

</style>
