<template>
    <div id="page-user-view">

        <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
            <span>User record with id: {{ $route.params.id }} not found. </span>
            <span>
                <span>Check </span><router-link :to="{name:'UserList'}" class="text-inherit underline">All Users</router-link>
            </span>
        </vs-alert>
        <div id="user-data" v-if="user_info">

            <vx-card title="User Basic Information" class="mb-base">
                <div class="vx-row" v-if="this.$store.state.AppActiveUser.isAdmin"  >
                    <div class="vx-col w-full">
                        <div class="pl-2 float-right"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="callPopup('userinfo')"></vs-button></div>
                    </div>
                </div>
                <!-- Avatar -->
                <div class="vx-row">

                    <!-- Avatar Col -->
                    <div class="vx-col" id="avatar-col">
                        <vs-avatar size="100px" :src="user_info.propic_url"/>
                        <vs-button v-if="!this.$store.state.AppActiveUser.isAdmin" size="small" color="gray" class="ml-4 mt-2" @click="callPopup('image_change')">Change</vs-button>
                    </div>

                    <!-- Information - Col 1 -->
                    <div class="vx-col flex-1" id="account-info-col-1">
                        <table>
                            <tr>
                                <td class="font-semibold">Name </td>
                                <td>{{ user_info.full_name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Employee ID </td>
                                <td>{{ user_info.emp_id }}</td>
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
                                <td class="font-semibold">Status </td>
                                <td>{{ user_info.status }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1" id="account-info-col-2">
                        <table>
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
                                <td>{{ user_info.company_name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">User Type </td>
                                <td>{{ user_info.user_type }}</td>
                            </tr>
                        </table>
                    </div>

                </div>

            </vx-card>

            <vx-card v-if="!isAdmin">

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="flex items-end ">
                            <feather-icon svgClasses="w-6 h-6" icon="GridIcon" class="mr-2" />
                            <span class="font-medium text-lg leading-none">Package Information</span>

                        </div>
                        <div v-if="this.$store.state.AppActiveUser.isAdmin" class="float-right pb-3"><vs-button  size="small" icon-pack="feather" icon="icon-edit" @click="callPopup('package')"></vs-button></div>

                        <vs-divider />

                    </div>
                    <!-- Organization - Col 1 -->
                    <div class="vx-col flex-1" id="org-info-col-1">
                        <table>
                            <tr>
                                <td class="font-semibold">Employee Type </td>
                                <td>{{ org_info.employee_type }}  <span v-if="con_show"><br>{{contract_range}}</span> </td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Leave Package </td>
                                <td>{{ org_info.leave_package }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Job Description </td>
                                <td>{{ org_info.job_description }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Organization - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1" id="org-info-col-2">
                        <table>
                            <tr>
                                <td class="font-semibold">Payroll Package </td>
                                <td>{{ org_info.payroll_package }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Asset Package </td>
                                <td>{{ org_info.asset_package }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Designation </td>
                                <td>{{ org_info.designation }}</td>
                            </tr>
                        </table>
                    </div>
                </div>


            </vx-card>
            <vs-popup title="Crop Image" class="" :active.sync="loadImageCropper">
                <div class="bg-gray-100 w-full overflow-hidden flex justify-center"
                     :style="{height:cropperBoxData.height+'px'}">
                    <cropper :src="cropBoxImage" ref="cropper" :stencil-props="{aspectRatio: 1/1}"/>
                </div>
                <div class="p-3 mt-2 text-center bg-gray-800 text-white cursor-pointer" @click="crop">Crop</div>
            </vs-popup>
            <vs-popup mediumscreen title="General Information" class="" :active.sync="basicEdit">
                <div class="button-wrapper bg-gray-200 cursor-pointer" @click="fileInput()"
                     style="width:150px; height:150px; background-image:url('/site/upload.png'); background-repeat: no-repeat; background-size: 20px 20px; background-position: center center; border:1px solid rgb(0,0,0,.1)">
                    <img :src="logoPreviewImage" class="w-full">
                </div>
                <div class="text-center p-1" style="width:150px; font-size:10px">Upload User Profile
                    picture
                </div>
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full">

                        <vs-input class="w-full mt-4 mr-1" label="*First Name" v-model="user_info.first_name" name="first_name"/>
                        <validate-data rules="required" :value="user_info.first_name" :name="'first_name'"/>
                        <div >
                        <vs-input class="w-full mt-4" label="Employee ID" v-model="user_info.emp_id" name="emp_id"/>
                        <validate-data rules="required" :value="user_info.emp_id" :name="'emp_id'"/>

                        </div>

                        <vs-input class="w-full mt-4" label="* Email" v-model="user_info.email" type="email"
                                  name="email"/>
                        <validate-data rules="required|email" :value="user_info.email" :name="'email'"/>


                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="*Last Name" v-model="user_info.last_name"
                                  name="first_name"/>
                        <validate-data rules="required" :value="user_info.last_name" :name="'last_name'"/>
                        <vs-input class="w-full mt-5" label="Phone" v-model="user_info.phone" name="phone"/>
                        <validate-data rules="required" :value="user_info.phone" :name="'phone'"/>

                        <div  class="mt-4">
                            <vs-select v-model="selectedRole" class="w-full" placeholder="Role" label="Role"
                                       @input="roleSelected()" autocomplete>
                                <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                v-for="(item,index) in role"/>
                            </vs-select>
                        </div>

                    </div>
                    <vx-card v-if="shoWPermissions" class="mt-base" no-shadow>

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
                                <tr v-for="(val, index) in roleData" :key="index">
                                    <td class="px-3 py-2">{{ val.name }}</td>
                                    <td v-for="(permission, permIndex) in val.subpermissions" class="px-3 py-2"
                                        :key="permIndex">
                                        <vs-checkbox v-model="permission.status">{{permission.title}}
                                        </vs-checkbox>
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </vx-card>
                </div>
                <div class="vx-row mt-3">

                </div>
                <div align="right" class="pt-1">
                    <vs-button :disabled='btnDisabled' @click="GeneralInfoUpdate">Update</vs-button>
                </div>
            </vs-popup>

            <vs-popup   title="Profile Picture"  :active.sync="imageEdit">

                <vs-row>
                    <vs-col vs-offset="3" vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                        <div class="button-wrapper bg-gray-200 cursor-pointer float-center"  @click="fileInput()"
                             style="width:150px; height:150px; background-image:url('/site/upload.png'); background-repeat: no-repeat; background-size: 20px 20px; background-position: center center; border:1px solid rgb(0,0,0,.1)">
                            <img  :src="logoPreviewImage" class="w-full" style="height: 150px;">
                            <span class="text-center p-1" style="width:150px; font-size:10px">Upload User Profile
                            picture</span>
                        </div>



                    </vs-col>
                </vs-row>
                <div class="vx-row mt-3">
                    <div class="vx-col-12">

                    </div>
                </div>

                <div align="right" class="pt-1">
                    <vs-button :disabled='btnDisabled' @click="GeneralInfoUpdate">Update</vs-button>
                </div>
            </vs-popup>
            <vs-popup mediumscreen title="Package" class="" :active.sync="packageEdit">

                    <div class="vx-row" style="min-height:300px">
                        <div class="vx-col md:w-1/2 w-full">
                            <div class="mt-4 pt-1">
                                <vs-select v-model="designation" autocomplete class="w-full" placeholder="Payroll package"
                                           label="Designation" name="designation">
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in designationData"/>
                                </vs-select>
                            </div>
                            <div class="mt-4 pt-1">
                                <vs-select v-model="jobDescription" autocomplete class="w-full" placeholder="Job Description"
                                           label="Job Description" name="job_description">
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in jobDescriptionData"/>
                                </vs-select>

                            </div>
                            <div class="mt-4 pt-1">
                                <vs-select v-model="employeeType" autocomplete class="w-full" placeholder="Employee Type" @input="checkEmployeeType(employeeType)"
                                           label="Employee Type" name="employee_type">
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in employeeTypeData"/>
                                </vs-select>

                            </div>
                            <div class="mt-4 pt-1" v-if="showCalender">
                                <v-date-picker v-model="dateRange" is-range color="purple" :masks="{input: 'YYYY-MM-DD'}" :min-date="new Date()">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full" label="Date Range" :value="inputValue.start+' - '+inputValue.end" v-on="inputEvents.start" />
                                    </template>
                                </v-date-picker>

                            </div>
                        </div>
                        <div class="vx-col md:w-1/2 w-full">
                            <div class="mt-4 pt-1">
                               <vs-select v-model="payRoll" autocomplete class="w-full" placeholder="Payroll Package"
                                             label="Payroll Package" name="pay_roll">
                                      <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                      v-for="(item,index) in payRollData"/>
                                  </vs-select>
                            </div>
                            <div class="mt-4 pt-1">
                                <vs-select v-model="leavePackage" autocomplete class="w-full" placeholder="Leave Package"
                                           label="Leave Package" name="leave_package">
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in leavePackageData"/>
                                </vs-select>

                            </div>
                            <div class="mt-4 pt-1">
                                <vs-select v-model="assetPackage" autocomplete class="w-full" placeholder="Asset Package"
                                           label="Asset Package" name="asset_package">
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in assetPackageData"/>
                                </vs-select>
                            </div>
                        </div>
                    </div>

                <div class="vx-row mt-3">

                </div>
                <div align="right" class="pt-1">
                    <vs-button :disabled='btnDisabled' @click="PackageUpdate()">Update</vs-button>
                </div>
            </vs-popup>
        </div>

    </div>
</template>

<script>
    import {Cropper} from 'vue-advanced-cropper'
    import vSelect from 'vue-select'
    export default {
        // props:['passChangeKey'],
        components: {
            Cropper,
            vSelect,
        },
        data: () => ({
            shoWPermissions: false,
            hideDesignation: true,
            hidePayroll: true,
            hideAssetPackage: true,
            hideJobDescription: true,
            hideLeavePackage: true,
            hideEmployeeType: true,
            con_show: false,

            previewProfile: false,
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
            userData: {
                phone: '',

            },
            basicEdit: false,
            imageEdit: false,
            packageEdit: false,
            user_info: '',
            org_info: '',
            user_not_found: false,


            role: [],
            roleData: [],
            selectedRole:'',


            designationData: [],
            designation: {
                value: null,
                label: '',
                type: '',
            },


            assetPackage: {
                value: null,
                label: '',
                type: '',
            },
            assetPackageData: [],
            assetData: [],


            leaveData: [],
            leavePackage: {
                value: null,
                label: '',
                type: '',
            },
            leavePackageOption: [],
            leavePackageData: [],


            payrollData: [],
            payRoll: {
                value: null,
                label: '',
                type: '',
            },
            payrollOption: [],
            payRollData: [],


            jobDescription: {
                value: null,
                label: '',
                type: '',
            },
            jobDescriptionOption: [],
            jobDescriptionData: [],
            employeeTypeData: [],
            employeeType: {
                value: null,
                label: '',
                type: '',
            },
            contract_range: null,
            showCalender: false,
            dateRange:{start: '', end: ''},
            con_date_info: null,
        }),
        methods: {
            fetchUserInfo() {
                axios.get(`/api/profile/basic-info/${this.$route.params.id}`)
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response.data.user_info)
                            this.user_info = response.data.user_info;
                            this.userData.phone = response.data.user_info.phone;
                            this.selectedRole = response.data.user_info.roleid;
                            this.roleData = response.data.user_info.roleData;

                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        console.log(err);
                        this.user_not_found = true
                    });
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
            roleSelected() {
                var data = {
                    id: this.selectedRole.value,
                    user_id: this.user_info.id,
                }
                axios.post('/api/profile/data/roledata', data)
                    .then(response => {
                        this.roleData = response.data.roleData;
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
            },
            fetchOrgInfo() {
                axios.get(`/api/profile/organization-info/${this.$route.params.id}`)
                    .then(response => {
                        //console.log(response);
                        if (response.status === 200) {
                            this.org_info = response.data.org_info;
                            this.contract_range = response.data.contract_info.range;
                            this.con_date_info = response.data.contract_info;
                            this.con_show = response.data.contract_info.is_contract;
                        } else {
                            this.notificationAlert(response);
                        }
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        console.log(err);
                    });
            },

            UserRole() {
                axios.get('/api/profile/role')
                    .then(response => {
                        this.role = response.data.role;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })

            },
            GetPackage() {
                axios.get('/api/profile/package')
                    .then(response => {
                        console.log(response.data)
                        this.leavePackageData = response.data.leaveData;
                        this.assetPackageData = response.data.assetData;
                        this.payRollData = response.data.payrollData;
                        this.jobDescriptionData = response.data.jobDescriptionData;
                        this.designationData = response.data.designationData;
                        this.employeeTypeData = response.data.employeeTypeData;

                        this.designation = this.org_info.designation_id;
                        this.jobDescription = this.org_info.job_description_id;
                        this.employeeType = this.org_info.employee_type_id;
                        this.payRoll = this.org_info.payroll_package_id;
                        this.leavePackage = this.org_info.leave_package_id;
                        this.assetPackage = this.org_info.asset_package_id;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })

            },
            checkEmployeeType(data){
                console.log(data)
                this.dateRange = {start: '', end: ''};
                if (data === 16){
                    this.showCalender = true;
                    this.showDateOnPreview = true;
                }else{
                    this.showCalender =false;
                    this.showDateOnPreview = false;
                }
            },
            callPopup(type) {
                if (type === 'userinfo') {
                    this.UserRole();
                    this.logoPreviewImage = this.user_info.propic_url;
                    this.basicEdit = !this.basicEdit;
                }
                if (type === 'package') {
                    this.GetPackage();
                    this.packageEdit = !this.packageEdit;
                    this.showCalender = this.con_show;
                    this.dateRange = {start: new Date(this.con_date_info.start_date), end: new Date(this.con_date_info.end_date)};
                }
                if (type === 'image_change') {
                    this.logoPreviewImage = this.user_info.propic_url;
                    //this.GetPackage();
                    this.imageEdit = !this.imageEdit;
                }

            },
            hideDisable(name) {

                switch (name) {
                    case 'designation':
                        this.hideDesignation = true;
                        break;
                    case 'pay_roll':
                        this.hidePayroll = true;
                        break;
                    case 'asset_package':
                        this.hideAssetPackage = true;
                        break;
                    case 'job_description':
                        this.hideJobDescription = true;
                        break;
                    case 'leave_package':
                        this.hideLeavePackage = true;
                        break;
                    case 'employee_type':
                        this.hideEmployeeType = true;
                        break;
                }

            },
            GeneralInfoUpdate() {
                let  data = {
                        first_name: this.user_info.first_name,
                        last_name: this.user_info.last_name,
                        emp_id: this.user_info.emp_id,
                        email: this.user_info.email,
                        phone: this.user_info.phone,
                        role: this.selectedRole,
                        permissions: this.roleData,
                        hasFile: ['logoData'],
                        logoData: this.logoData,
                        id: this.user_info.enc_user_id,
                    }

                this.btnDisabled = true;
                var formData = new FormData();
                formFiles(data, formData)
                formData.append('data', JSON.stringify(data));
                axios.post('/api/profile/basic-info-update', formData)

                    .then(response => {

                        this.notificationAlert(response);
                        this.fetchUserInfo();
                        this.basicEdit = false;
                        this.imageEdit = false;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        this.user_not_found = true
                    });
            },
            PackageUpdate() {
                this.btnDisabled = true;
                let data = {
                    designation: this.designation,
                    payRoll: this.payRoll,
                    leavePackage: this.leavePackage,
                    assetPackage: this.assetPackage,
                    jobDescription: this.jobDescription,
                    employeeType: this.employeeType,
                    id: this.user_info.enc_user_id,
                    contract_date: this.dateRange,
                }
                console.log(data)
                var formData = new FormData();
                formFiles(data, formData)
                formData.append('data', JSON.stringify(data));

                axios.post('/api/profile/package-update', formData)

                    .then(response => {

                        this.fetchOrgInfo();
                        this.notificationAlert(response);
                        this.btnDisabled = false;
                        this.packageEdit = false;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                        this.btnDisabled = false;
                        this.user_not_found = true
                    });
            },


        },

        mounted() {

        },
        created() {
            this.fetchUserInfo();
        },
        computed: {

            isAdmin(){
                let t=  this.$store.state.AppActiveUser.roleId === this.$constants.CONST_ROLE_COMPANY_ADMIN && this.$route.params.id === this.$store.state.AppActiveUser.uid;
                if (!t){
                    this.fetchOrgInfo();
                }
                return t;
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
        }
    }


    @media screen and (min-width:1201px) and (max-width:1211px),
    only screen and (min-width:636px) and (max-width:991px) {
        #account-info-col-1 {
            width: calc(100% - 12rem) !important;
        }
    }

</style>
