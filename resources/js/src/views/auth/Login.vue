<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">

                    <div class="vx-row no-gutter justify-center items-center">

                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img src="@assets/images/pages/login.png" alt="login" class="mx-auto">
                        </div>

                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                            <div class="p-8 login-tabs-container">

                                <div class="vx-card__title mb-4">
                                    <h4 class="mb-4">Login</h4>
                                    <p>Welcome back, please login to your account.</p>
                                </div>

                                <div>
                                    <vs-input
                                        name="email"
                                        icon-no-border
                                        icon="icon icon-user"
                                        icon-pack="feather"
                                        label-placeholder="Email"
                                        v-model="email"
                                        class="w-full"
                                        @keyup.enter.native="login"
                                    />
                                    <div v-if="errorData.email" class="py-1 text-sm text-red-400">{{errorData.email[0]}}</div>

                                    <vs-input
                                        v-on:icon-click="showPass = !showPass"
                                        :icon="showPass ? 'icon icon-eye' : 'icon icon-eye-off'"
                                        :type="showPass ? 'text' : 'password'"
                                        v-model="password"
                                        icon-pack="feather"
                                        label-placeholder="Password"
                                        name="password"
                                        icon-no-border
                                        icon-after="true"
                                        class="w-full mt-6"
                                        @keyup.enter.native="login"
                                    />
                                    <div v-if="errorData.password" class="py-1 text-sm text-red-400">{{errorData.password[0]}}</div>
                                    <div v-if="errorData.fail" class="py-1 text-sm text-red-400">{{errorData.fail[0]}}</div>

                                    <div class="flex flex-wrap justify-between my-5">
                                        <vs-checkbox v-model="remember" class="mb-3">Remember Me</vs-checkbox>
                                        <router-link to="/forgot-password">Forgot Password?</router-link>
                                    </div>
                                    <div class="pb-12">
                                        <vs-button :disabled="!validateForm || btnDisabled" @click="login()" class="float-right">Login</vs-button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showPass: false,
                email: "developer@example.com",
                password: "123456",
                remember: false,

                errorData: [],
            }
        },
        computed: {
            //check if both password and email have been set for enabling login button
            validateForm() {
                return this.email !== '' && this.password !== '';
            },

        },
        methods: {
            login() {
                let data = {
                    email: this.email,
                    password: this.password,
                    remember: this.remember,
                }
                this.btnDisabled = true;
                axios.post(`/user/login`, data)
                    .then(response => {
                        //console.log(response);
                        if (response.status === 200) {
                            localStorage.setItem("auth", "true");
                            //this.$router.push('/dashboard');
                            this.$router.push(this.$route.query.redirect || '/dashboard')
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        console.log(err);
                    });
            }
        },
        mounted() {

          /*  window.addEventListener("keypress", e => {
               if(e.key === "Enter" && (this.email !== '' && this.password !== '')){
                 this.login();
               }
            });*/
        }

    }
</script>

<style lang="scss">

</style>
