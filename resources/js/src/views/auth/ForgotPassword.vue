<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: Forgot Password Page
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Recover your password</h4>
                                    <p>Please enter your email address and we'll send you instructions on how to reset your password.</p>
                                </div>

                                <vs-input type="email" label-placeholder="Email" v-model="email" name="email" class="w-full"  @keyup.enter.native="resetPassword()"/>
                                <validate-data rules="required" :value="email" :name="'email'" />
                                <div style="color:green">{{status}}</div>
                                <div class="mb-8"></div>
                                <vs-button type="border" to="/login" class="px-4 w-full md:w-auto">Back To Login</vs-button>
                                <vs-button @click="resetPassword()" :disabled="btnDisabled" class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Recover Password</vs-button>
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
    data () {
        return {
            email: '',
            status:null,
        }
    },
    methods:{
        async resetPassword(){
            this.btnDisabled = true;
            var data = {
                email:this.email,
            }
            try{
                var req = await axios.post('/user/forgot-password', data);
                if(req.data.status == true){
                    this.status = req.data.message;
                    this.notificationAlert(req)
                }
            }catch(err){
                if(err.response){this.notificationAlert(err.response)}else{console.log(err)}
            }

        }

    },
    mounted() {

    }
}
</script>
