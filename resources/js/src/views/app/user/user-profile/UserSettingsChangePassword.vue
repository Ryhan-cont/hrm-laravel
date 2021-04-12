<template>
    <div>
        <div class="vx-col w-full bg-white pt-3">
            <div class="flex items-end px-3">
                <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
                <span class="font-medium text-lg leading-none">Change Password</span>
            </div>
            <vs-divider />
        </div>
        <vx-card no-shadow>

            <form>
                <vs-input class="w-full mb-base"
                          v-on:icon-click="showPassOld = !showPassOld"
                          :icon="showPassOld ? 'icon icon-eye' : 'icon icon-eye-off'"
                          :type="showPassOld ? 'text' : 'password'"
                          icon-pack="feather"
                          icon-no-border
                          icon-after="true"
                          label-placeholder="Old Password"
                          v-model="old_password"
                />
                <vs-input class="w-full mb-base"
                          v-on:icon-click="showPassNew = !showPassNew"
                          :icon="showPassNew ? 'icon icon-eye' : 'icon icon-eye-off'"
                          :type="showPassNew ? 'text' : 'password'"
                          icon-pack="feather"
                          icon-no-border
                          icon-after="true"
                          label-placeholder="New Password"
                          v-model="new_password"
                />
                <vs-input class="w-full mb-base"
                          v-on:icon-click="showPassConfirm = !showPassConfirm"
                          :icon="showPassConfirm ? 'icon icon-eye' : 'icon icon-eye-off'"
                          :type="showPassConfirm ? 'text' : 'password'"
                          icon-pack="feather"
                          icon-no-border
                          icon-after="true"
                          label-placeholder="Confirm Password"
                          v-model="confirm_new_password"
                />

                <!-- Save & Reset Button -->
                <div class="flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" :disabled="!validateForm" @click="changePassword">Save Changes
                    </vs-button>
                    <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
                </div>
            </form>
        </vx-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showPassOld: false,
                showPassNew: false,
                showPassConfirm: false,
                old_password: '',
                new_password: '',
                confirm_new_password: ''
            }
        },
        computed: {
            //check if both password and email have been set for enabling login button
            validateForm() {
                return this.old_password !== '' &&
                    this.new_password !== '' &&
                    this.new_password === this.confirm_new_password;
            },
        },
        methods: {
            changePassword() {
                this.$http.put(`/api/profile/change-password`, {
                    old_password: this.old_password,
                    new_password: this.new_password,
                    confirm_new_password: this.confirm_new_password
                })
                    .then(response => {
                        this.notificationAlert(response);
                    })
                    .catch(err => {
                        console.log(err);
                        this.notificationAlert(err.response)
                    });
            }
        }
    }
</script>
