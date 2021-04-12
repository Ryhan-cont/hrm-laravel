<template>
    <div>
        <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
            <span>User record with id: {{ $route.params.id }} not found. </span>
            <span>
                <span>Check </span><router-link :to="{name:'UserList'}"
                                                class="text-inherit underline">All Users</router-link>
            </span>
        </vs-alert>
        <div v-if="user_info">

            <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none"
                     id="profile-tabs" :key="isSmallerScreen">

                <!-- GENERAL -->
                <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Basic Info' : ''">
                    <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-settings-basic/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Change Password' : ''" v-if="canChangePass">
                    <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-settings-change-password/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-info" :label="!isSmallerScreen ? 'General Info' : ''" v-if="!isAdmin">
                    <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-settings-general/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-git-pull-request" :label="!isSmallerScreen ? 'Organization Tree' : ''" v-if="!isAdmin">
                    <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-settings-tree/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-book" :label="!isSmallerScreen ? 'Education History' : ''" v-if="!isAdmin">
                    <div class="tab-social-links md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-education-info/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-briefcase" :label="!isSmallerScreen ? 'Job History' : ''" v-if="!isAdmin">
                    <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-job-history/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Family & Nominee' : ''" v-if="!isAdmin">
                    <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-nominee-info/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-sliders" :label="!isSmallerScreen ? 'Skills' : ''" v-if="!isAdmin">
                    <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-skills/>
                    </div>
                </vs-tab>
                <vs-tab icon-pack="feather" icon="icon-paperclip" :label="!isSmallerScreen ? 'Documents' : ''" v-if="!isAdmin">
                    <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
                        <user-docs/>
                    </div>
                </vs-tab>
            </vs-tabs>
        </div>
    </div>
</template>

<script>
    import UserSettingsBasic from './UserSettingsBasic.vue'
    import UserSettingsChangePassword from './UserSettingsChangePassword.vue'
    import UserSettingsGeneral from './UserSettingsGeneral.vue'
    import UserEducationInfo from './UserEducationInfo.vue'
    import UserJobHistory from './UserJobHistory.vue'
    import UserNomineeInfo from './UserNomineeInfo.vue'
    import UserSkills from './UserSkills.vue'
    import UserDocs from './UserDocs.vue'
    import UserSettingsTree from './UserSettingsTree.vue'

    export default {
        components: {
            UserSettingsBasic,
            UserSettingsChangePassword,
            UserSettingsGeneral,
            UserEducationInfo,
            UserJobHistory,
            UserNomineeInfo,
            UserSkills,
            UserDocs,
            UserSettingsTree,
        },
        data() {
            return {
                user_not_found: false,
                user_info: true,
            }
        },
        methods: {},
        mounted() {
        },
        computed: {
            isSmallerScreen() {
                return this.$store.state.windowWidth < 768
            },

            canChangePass() {
                console.log('Hasib',this.$store.state)
                return this.$route.params.id === this.$store.state.AppActiveUser.uid
            },
            isAdmin(){
                return this.$store.state.AppActiveUser.roleId === this.$constants.CONST_ROLE_COMPANY_ADMIN && this.$route.params.id === this.$store.state.AppActiveUser.uid
            }
        }
    }
</script>

<style lang="scss">
    #profile-tabs {
        .vs-tabs--content {
            padding: 0;
        }
    }
</style>
