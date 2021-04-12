<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@assets/images/pages/reset-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Reset Password</h4>
                                    <p>Please enter your new password.</p>
                                </div>
                                <!-- <vs-input type="email" label-placeholder="Email" v-model="value1" class="w-full mb-6" /> -->
                                <vs-input type="password"
                                          label-placeholder="Password"
                                          v-on:icon-click="showPass = !showPass"
                                          :icon="showPass ? 'icon icon-eye' : 'icon icon-eye-off'"
                                          :type="showPass ? 'text' : 'password'"
                                          icon-pack="feather"
                                          icon-no-border
                                          icon-after="true"
                                          v-model="password" class="w-full mb-6" />
                                <vs-input type="password"
                                          label-placeholder="Confirm Password"
                                          v-on:icon-click="showPass1 = !showPass1"
                                          :icon="showPass1 ? 'icon icon-eye' : 'icon icon-eye-off'"
                                          :type="showPass1 ? 'text' : 'password'"
                                          icon-pack="feather"
                                          icon-no-border
                                          icon-after="true"
                                          v-model="password_confirmation" class="w-full mb-8" />

                                <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                                    <vs-button type="border" to="/login" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Go Back To Login</vs-button>
                                    <vs-button class="w-full sm:w-auto" @click="resetPassword()" disable="request">Reset</vs-button>
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
            showPass1: false,
            password: '',
            password_confirmation: '',
            email: '',
            token: '',
        }
    },
    mounted() {
        if (this.$route.query.email) {
            this.email = this.$route.query.email;
        } else {
            this.btnDisabled = true;
        }
        if (this.$route.params.token) {
            this.token = this.$route.params.token;
        } else {
            this.btnDisabled = true;
        }
    },
    methods: {
        async resetPassword() {

            var data = {
                password: this.password,
                email: this.email,
                token: this.token,
                password_confirmation: this.password_confirmation
            }
            try {
                var req = await axios.post('/user/reset-password', data);
                if (req.data.status == true) {
                    this.notificationAlert(req);
                    this.$router.push('/login');
                }
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response)
                } else {
                    console.log(err)
                }
            }
        }

    },
}
</script>
