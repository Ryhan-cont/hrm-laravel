<template>
    <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.displayName">

        <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
            <small>{{activeUserInfo.userRole}}</small>
        </div>

        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

            <div class="con-img ml-3">
                <img v-if="activeUserInfo.photoURL" key="onlineImg" :src="activeUserInfo.photoURL" alt="user-img"
                     width="40" height="40" class="rounded-full shadow-md cursor-pointer block"/>
            </div>

            <vs-dropdown-menu class="vx-navbar-dropdown">
                <ul style="min-width: 9rem">

                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="$router.push(`/profile/${activeUserInfo.uid}`).catch(() => {})">
                        <feather-icon icon="UserIcon" svgClasses="w-4 h-4"/>
                        <span class="ml-2">Profile</span>
                    </li>

                    <vs-divider class="m-1"/>

                    <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="logout">
                        <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"/>
                        <span class="ml-2">Logout</span>
                    </li>
                </ul>
            </vs-dropdown-menu>
        </vs-dropdown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
                warningTimer: null,
                logoutTimer: null,
                warningZone: false,
            }
        },
        mounted() {
            this.events.forEach(function (event) {
                window.addEventListener(event, this.resetTimer);
            }, this);
            this.setTimers();
        },
        destroyed() {
            this.events.forEach(function (event) {
                window.removeEventListener(event, this.resetTimer);
            }, this);
            this.resetTimer();
        },
        computed: {
            activeUserInfo() {
                return this.$store.state.AppActiveUser
            }
        },
        watch: {
            "warningZone": function () {
                if (this.warningZone) {
                    this.notificationAlert("Are you still with us?", "Logout Alert", "primary");
                }
            },
        },
        methods: {
            logout() {
                axios.post(`/user/logout`)
                    .then(response => {
                        //console.log(response);
                        if (response.status === 200) {
                            localStorage.removeItem('auth');
                            localStorage.removeItem('userInfo');
                            this.$router.push('/login');
                            console.log('Logout Success')
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        console.log(err);
                    });
            },

            setTimers() {
                this.warningTimer = setTimeout(this.warningMessage, 49 * 60 * 1000); // 20 minutes = 20 * 60 * 1000
                this.logoutTimer = setTimeout(this.logout, 50 * 60 * 1000); // 21 minutes = 21 * 60 * 1000
                /*this.warningTimer = setTimeout(this.warningMessage, 4 * 1000); // 20 minutes = 20 * 60 * 1000
                this.logoutTimer = setTimeout(this.logout, 15 * 1000); // 21 minutes = 21 * 60 * 1000*/
                this.warningZone = false;
            },
            warningMessage() {
                this.warningZone = true;
            },
            resetTimer() {
                clearTimeout(this.warningTimer);
                clearTimeout(this.logoutTimer);
                this.setTimers();
            }
        }
    }
</script>
