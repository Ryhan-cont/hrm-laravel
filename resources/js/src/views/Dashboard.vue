<template>
    <div id="dashboard-items">
        <div class="vx-row">
            <!-- CARD 1: User Pending -->
            <div class="vx-col w-full lg:w-3/3 mb-base" v-if="
            this.$store.state.AppActiveUser.roleId === this.$constants.CONST_ROLE_COMPANY_ADMIN ||
            this.$store.state.AppActiveUser.roleId === this.$constants.CONST_ROLE_USER ">
                <user-pending />
            </div>
        </div>
    </div>
</template>

<script>
import UserPending from "./app/dashboard/UserPending";

export default {
    name: "Dashboard",
    components: {
        UserPending
    },
    data(){
        return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }

}
</script>

<style scoped>

</style>
