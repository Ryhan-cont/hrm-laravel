<template>

    <div id="page-company-view">
        <!-- <div @click="loadData()">xxxxxx</div> -->
        <div v-if="!editMode">
            <div class="img-container pb-4 sm:flex" style="border-bottom:1px solid rgb(0,0,0,.1)">
                <div>
                    <img :src="defLogo" class=""
                          style="max-width:200px; border-radius:50%; border:1px solid rgb(0,0,0,.1)"/>
                </div>
                <div class="text-xl pl-20 py-2 flex w-full">
                    <div class="w-full">
                    <table>
                        <tr>
                            <td class="font-semibold">Name: </td>
                            <td>{{dafUserData.name}}</td>
                        </tr>
                        <tr>
                            <td class="font-semibold">Role: </td>
                            <td>{{defSelectedRole}}</td>
                        </tr>
                        <tr>
                            <td class="font-semibold">Email: </td>
                            <td>{{ dafUserData.email }}</td>
                        </tr>
                        <tr>
                            <td class="font-semibold">Company: </td>
                            <td>{{ dafUserData.company }}</td>
                        </tr>
                    </table>
                    </div>
                    <div>
                        <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="editMode =! editMode"></vs-button></div>
                    </div>
                </div>
            </div>
            <div class="pt-12">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2"/>
                            <span class="font-medium text-lg leading-none">Permissions</span>
                        </div>
                        <vs-divider/>
                    </div>
                </div>
                <div class="block overflow-x-auto">
                    <table class="w-full">
                        <tr v-for="(val, index) in defPerm" :key="index">
                            <td class="px-3 py-2">{{ val.name }}</td>
                            <td v-for="(permission, permIndex) in val.subpermissions" class="px-3 py-2"
                                :key="permIndex">
                                <div>{{permission.title}}</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>

        <!-- Edit Part -->
        <div v-if="editMode">
            <div class="vx-row">
                <div class="ml-5">
                    <div class="button-wrapper bg-gray-200 cursor-pointer" @click="fileInput()"
                         style="width:150px; height:150px; background-image:url('/site/upload.png'); background-repeat: no-repeat; background-size: 20px 20px; background-position: center center; border:1px solid rgb(0,0,0,.1)">
                        <img :src="logoPreviewImage" class="w-full">
                    </div>
                    <div class="text-center p-1" style="width:150px; font-size:10px">Upload user profile picture</div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="* Name" v-model="userData.name" name="name"/>
                    <validate-data rules="required" :value="userData.name" :name="'name'"/>
                    <vs-input class="w-full mt-4" label="* Email" v-model="userData.email" type="email" name="email"/>
                    <validate-data rules="required|email" :value="userData.email" :name="'email'"/>
                    <!--<vs-input class="w-full mt-4" type="password" label="Password" v-model="userData.password" />-->
                    <vs-input class="w-full mt-4"
                              v-on:icon-click="showPass = !showPass"
                              :icon="showPass ? 'icon icon-eye' : 'icon icon-eye-off'"
                              :type="showPass ? 'text' : 'password'"
                              icon-pack="feather"
                              icon-no-border
                              icon-after="true"
                              label="Password"
                              v-model="userData.password"
                              name="password"
                    />
                    <validate-data rules="required" :value="userData.password" :name="'password'"/>
                </div>

                <div class="vx-col md:w-1/2 w-full">
                    <div class="mt-4">
                        <vs-select v-model="selectedRole" class="w-full" @input="roleSelected()" placeholder="Role"
                                   label="* Role">
                            <vs-select-item :key="index" :value="item.name" :text="item.name"
                                            v-for="(item,index) in roleData"/>
                        </vs-select>
                        <validate-data rules="required" :value="selectedRole" :name="'role'"/>
                    </div>
                    <vs-input class="w-full mt-5" label="Phone" v-model="userData.phone" name="phone"/>
                </div>
                <vx-card class="mt-base" no-shadow>
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <div class="flex items-end px-3">
                                <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2"/>
                                <span class="font-medium text-lg leading-none">Permissions</span>
                            </div>
                            <vs-divider/>
                        </div>
                    </div>
                    <div class="block overflow-x-auto">

                        <table class="w-full">

                            <tr v-for="(val, index) in permissionsManager" :key="index">
                                <td class="px-3 py-2">{{ val.name }}</td>
                                <td v-for="(permission, permIndex) in val.subpermissions" class="px-3 py-2"
                                    :key="permIndex">
                                    <vs-checkbox v-model="permission.status">{{permission.title}}</vs-checkbox>
                                </td>
                            </tr>
                        </table>
                    </div>
                </vx-card>
            </div>
            <div class="flex" style="border-top:1px solid rgb(0,0,0,.1)">
                <div class="flex-auto"></div>
                <div>
                    <vs-button color="danger" class="ml-auto mt-2" @click="editMode=!editMode">Cancel</vs-button>
                </div>
                <div class="pl-2">
                    <vs-button class="ml-auto mt-2" :disabled='btnDisabled'  @click="saveData()">Save</vs-button>
                </div>

            </div>
        </div>
        <vs-popup title="Crop Image" class="" :active.sync="loadImageCropper">
            <div class="bg-gray-100 w-full overflow-hidden flex justify-center"
                 :style="{height:cropperBoxData.height+'px'}">
                <cropper :src="cropBoxImage" ref="cropper" :stencil-props="{aspectRatio: 1/1}"/>
            </div>
            <div class="p-3 mt-2 text-center bg-gray-800 text-white cursor-pointer"   @click="crop()">Crop</div>
        </vs-popup>
    </div>
</template>


<script>
    import {Cropper} from 'vue-advanced-cropper'

    export default {
        name: 'login-info',
        components: {
            Cropper,
        },
        props: {
            reqData: {
                default: {},
            }
        },
        data() {
            return {
                showPass: false,
                //Crop Box
                loadImageCropper: false,
                cropperBoxData: {},
                cropBoxImage: null,
                //End Crop Box

                logoPreviewImage: null,
                logoCoordinates: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                },
                logoData: null,

                editMode: false,

                roleData: [],

                selectedRole: null,
                roleOptions: [],

                //User Login Info
                permissionsManager: [],
                userData: {},

                dafUserData: {},
                defPerm: [],
                defLogo: null,
                defSelectedRole: null,
            }
        },
        mounted() {
            if (this.reqData.userData) {
                this.loadData();
            }
        }
        ,
        methods: {
            async loadData() {
                this.userData = {
                    password: null,
                    name: this.reqData.userData.name,
                    email: this.reqData.userData.email,
                    company: this.reqData.userData.company,
                    phone: this.reqData.userData.phone,
                    id: this.reqData.userData.id,
                    company: this.reqData.userData.company,
                };
                this.roleData = this.reqData.rolaData;
                this.roleOptions = this.reqData['roleList'];
                this.selectedRole = this.reqData.userData.role;
                this.permissionsManager = this.reqData.userRoles;

                this.defPerm = _.cloneDeep(this.reqData.userRoles);
                this.dafUserData = _.cloneDeep(this.userData);

                this.defSelectedRole = this.selectedRole;

                var userPic = '/storage/company-' + this.reqData.userData.companyid + '/user-' + this.reqData.userData.id + '/' + this.reqData.userData.propic;
                if (this.reqData.userData.propic != null) {
                    try {
                        var req = await axios.get(userPic);
                        this.imgData(userPic);
                        this.defLogo = userPic;
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            fileInput() {
                this.cropperBoxData.width = window.innerWidth;
                this.cropperBoxData.height = window.innerHeight - 180;
                var fileData = document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    this.loadImageCropper = true;

                    var input = e.target;
                    if (input.files && input.files[0]) {
                        // create a new FileReader to read this image and convert to base64 format
                        var reader = new FileReader();
                        // Define a callback function to run, when FileReader finishes its job
                        reader.onload = (e) => {
                            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                            // Read image as base64 and set to imageData
                            this.cropBoxImage = e.target.result;
                            this.cropperBoxData.name = input.files[0].name;
                        };
                        // Start the reader job - read file as a data url (base64 format)
                        reader.readAsDataURL(input.files[0]);
                    }
                }
            },
            crop(name = null) {
                const {coordinates, canvas,} = this.$refs.cropper.getResult();
                this.logoCoordinates = coordinates;
                // You able to do different manipulations at a canvas
                // but there we just get a cropped image, that can be used
                // as src for <img/> to preview result

                this.logoPreviewImage = canvas.toDataURL();
                this.logoData = dataURLtoFile(canvas.toDataURL(), this.cropperBoxData.name);

                // Close crop box
                this.loadImageCropper = false;
            },
            async imgData(img) {
                let blob = await fetch(img).then(r => r.blob());
                let dataUrl = await new Promise(resolve => {
                    let reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
                this.logoPreviewImage = dataUrl;
            },
            async roleSelected() {

                var selectedRoleId = this.roleData[this.selectedRole].id;
                var data = {
                    id: selectedRoleId,
                }
                try {
                    var req = await axios.post('/api/user-edit/data/role', data)
                    var selectedRole = req.data;
                    this.permissionsManager = selectedRole;
                } catch (err) {
                    console.log(err)
                }
            },
            saveData() {
                var data = {
                    name: this.userData.name,
                    email: this.userData.email,
                    phone: this.userData.phone,
                    company: this.userData.company,
                    role: this.selectedRole,
                    permissions: this.permissionsManager,
                    hasFile: ['logoData'],
                    logoData: this.logoData,
                    id: this.userData.id,
                }
                if (this.userData.password != null && this.userData.password != '') {
                    data.password = this.userData.password;
                }
                if (this.validateInput(data)) {
                    this.btnDisabled = true;
                    var formData = new FormData();
                    formFiles(data, formData)
                    formData.append('data', JSON.stringify(data));
                    axios.post('/api/user-edit/data/login-info-update', formData)
                        .then(response => {
                            this.notificationAlert(response);
                            this.$parent.$parent.$parent.$parent.loadData();
                            this.editMode = false;
                            this.btnDisabled = false;
                        })
                        .catch(error => {
                            this.errorData = error.response.data.errors;
                            this.notificationAlert(error.response);
                            this.btnDisabled = false;

                        })

                }
            }
        },

        watch: {
            reqData() {
                this.loadData();
            }

        },
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
