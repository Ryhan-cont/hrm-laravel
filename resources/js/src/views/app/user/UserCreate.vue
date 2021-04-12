<template>
    <div>
        <vx-card>
            <form-wizard color="rgba(var(--vs-primary), 1)" title="Create User" subtitle="Please complete all the steps"
                         :disabled="btnDisabled" finishButtonText="Preview" @on-complete="validateStep('step3')">
                <tab-content title="Login Info" icon="feather icon-user" :before-change="()=>validateStep('step1')">
                    <div class="button-wrapper bg-gray-200 cursor-pointer" @click="fileInput()"
                         style="width:150px; height:150px; background-image:url('/site/upload.png'); background-repeat: no-repeat; background-size: 20px 20px; background-position: center center; border:1px solid rgb(0,0,0,.1)">
                        <img :src="logoPreviewImage" class="w-full">
                    </div>
                    <div class="text-center p-1" style="width:150px; font-size:10px">Upload User Profile
                        picture
                    </div>
                    <div class="vx-row">

                        <div class="vx-col md:w-1/2 w-full">
                            <vs-row>
                                <vs-col class="vx-col md:w-1/2 " >
                                    <vs-input class="md:w-11/12 w-full mt-4" label="*First Name" v-model="userData.first_name"
                                              name="first_name"/>
                                    <validate-data rules="required" :value="userData.first_name" :name="'first_name'"/>
                                </vs-col>

                                <vs-col class="vx-col md:w-1/2" >
                                    <vs-input class="md:w-12/12 w-full  mt-4" label="*Last Name" v-model="userData.last_name"
                                              name="last_name"/>
                                    <validate-data rules="required" :value="userData.last_name" :name="'last_name'"/>
                                </vs-col>

                            </vs-row>


                            <vs-input class="w-full mt-4" label="Employee ID" v-model="userData.emp_id" name="emp_id"/>
                            <validate-data rules="required" :value="userData.emp_id" :name="'emp_id'"/>
                            <vs-input class="w-full mt-4" label="* Email" v-model="userData.email" type="email"
                                      name="email"/>
                            <validate-data rules="required|email" :value="userData.email" :name="'email'"/>

                        </div>

                        <div class="vx-col md:w-1/2 w-full">

                            <div class="mt-4">
                                <vs-select v-model="selectedRole" class="w-full" placeholder="Role" label="Role"
                                           @input="roleSelected(), hideValidation('roll')" autocomplete>
                                    <vs-select-item :key="index" :value="item" :text="item.label"
                                                    v-for="(item,index) in roleData"/>
                                </vs-select>

                                <div :hidden="hideRole" class="py-1 text-sm text-red-400">
                                    <div>
                                        <div>The role field is required</div>
                                    </div>
                                </div>


                            </div>
                            <vs-input class="w-full mt-5" label="Phone" v-model="userData.phone" name="phone"/>
                            <validate-data rules="required" :value="userData.phone" :name="'phone'"/>
                        </div>
                        <vx-card class="mt-base" no-shadow v-if="permissionView">

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
                                            <vs-checkbox v-model="permission.status">{{permission.title}}
                                            </vs-checkbox>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </vx-card>
                    </div>


                </tab-content>
                <tab-content label="Package" title="Package" icon="feather icon-package"
                             :before-change="()=>validateStep('step2')">

                    <div class="py-10">
                        <div class="vx-row" style="min-height:300px">
                            <div class="vx-col md:w-1/2 w-full">
                                <div class="mt-4 pt-1">
                                    <vs-select v-model="designation" autocomplete
                                               class="w-full" placeholder="Designation"
                                               label="Designation" name="designation"
                                               @input="hideValidation('designation')">
                                        <vs-select-item :key="index" :value="item" :text="item.label"
                                                        v-for="(item,index) in designationData"/>
                                    </vs-select>
                                    <div :hidden="hideDesignation" class="py-1 text-sm text-red-400">
                                        <div>
                                            <div>The designation field is required.</div>
                                        </div>
                                    </div>

                                </div>

                                <div class="mt-4 pt-1">

                                    <vs-select v-model="jobDescription" autocomplete class="w-full"
                                               placeholder="Job description"
                                               label="Job description" @input="hideValidation('job_description')">
                                        <vs-select-item :key="index" :value="item" :text="item.label"
                                                        name="job_description"
                                                        v-for="(item,index) in jobDescriptionData"/>
                                    </vs-select>
                                    <div :hidden="hideJobDescription" class="py-1 text-sm text-red-400">
                                        <div>
                                            <div>The job description field is required.</div>
                                        </div>
                                    </div>

                                </div>
                                <div class="mt-4 pt-1">

                                    <vs-select v-model="employeeType" autocomplete class="w-full"
                                               placeholder="Employee Type"
                                               label="Employee Type" name="job_description"
                                               @input="hideValidation('employee_type'), checkEmployeeType(employeeType)">
                                        <vs-select-item :key="index" :value="item" :text="item.label"
                                                        v-for="(item,index) in employeeTypeData"/>
                                    </vs-select>
                                    <div :hidden="hideEmployeeType" class="py-1 text-sm text-red-400">
                                        <div>
                                            <div>The employee type field is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 pt-1" v-if="showCalender">

                                    <v-date-picker v-model="dateRange" is-range color="purple" :masks="{input: 'YYYY-MM-DD'}" :min-date="new Date()" @input="hideValidation('date')">
                                        <template v-slot="{ inputValue, inputEvents }">
                                            <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full" label="Date Range" :value="inputValue.start+' - '+inputValue.end" v-on="inputEvents.start" />
                                        </template>
                                    </v-date-picker>
                                    <div :hidden="hideCalenderMessage" class="py-1 text-sm text-red-400">
                                        <div>
                                            <div>The date range field is required.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="vx-col md:w-1/2 w-full">

                                <div class="mt-4 pt-1">
                                    <vs-select v-model="payRoll" autocomplete class="w-full"
                                               placeholder="Payroll Package"
                                               label="Payroll Package" name="pay_roll"
                                               @input="hideValidation('pay_roll')">
                                        <vs-select-item :key="index" :value="item" :text="item.label"
                                                        v-for="(item,index) in payRollData"/>
                                    </vs-select>
                                    <div :hidden="hidePayroll" class="py-1 text-sm text-red-400">
                                        <div>
                                            <div>The payroll field is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 pt-1">
                                    <vs-select v-model="leavePackage" autocomplete class="w-full"
                                               placeholder="Leave package"
                                               label="Leave Package" name="leave_package"
                                               @input="hideValidation('leave_package')">
                                        <vs-select-item :key="index" :value="item" :text="item.label"
                                                        v-for="(item,index) in leavePackageData"/>
                                    </vs-select>

                                    <div :hidden="hideLeavePackage" class="py-1 text-sm text-red-400">
                                        <div>
                                            <div>The leave package field is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 pt-1">
                                    <vs-select v-model="assetPackage" autocomplete class="w-full"
                                               placeholder="Asset Package"
                                               label="Asset Package" name="asset_package"
                                               @input="hideValidation('asset_package')">
                                        <vs-select-item :key="index" :value="item" :text="item.label"
                                                        v-for="(item,index) in assetPackageData"/>
                                    </vs-select>

                                    <div :hidden="hideAssetPackage" class="py-1 text-sm text-red-400">
                                        <div>
                                            <div>The asset package field is required.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </tab-content>
                <tab-content label="Organization Tree" title="Organization Tree" icon="feather icon-git-pull-request">
                    <div>

                        <v-jstree :data="organizationTree" size="large" show-checkbox
                                  @item-click="treeItemClick"></v-jstree>
                    </div>
                    <div :hidden="hideTree" class="py-1 text-sm text-red-400">
                        <div>
                            <div>Select tree is required</div>
                        </div>
                    </div>

                </tab-content>
            </form-wizard>
        </vx-card>
        <vs-popup title="Crop Image" class="" :active.sync="loadImageCropper">
            <div class="bg-gray-100 w-full overflow-hidden flex justify-center"
                 :style="{height:cropperBoxData.height+'px'}">
                <cropper :src="cropBoxImage" ref="cropper" :stencil-props="{aspectRatio: 1/1}"/>
            </div>
            <div class="p-3 mt-2 text-center bg-gray-800 text-white cursor-pointer" @click="crop">Crop</div>
        </vs-popup>
        <vs-popup mediumscreen title="Preview" class="" :active.sync="previewProfile" >

            <vx-card title="" class="mb-base">
                <vs-row>
                    <!-- Avatar Col -->
                    <vs-col class="vx-col md:w-4/12 w-full"  vs-justify="center" vs-align="center" >
                        <vs-avatar size="100px" :src="logoPreviewImage"/>
                    </vs-col>


                    <!-- Information - Col 1 -->
                    <vs-col class="vx-col md:w-4/12  w-full" vs-justify="center" vs-align="center">
                            <table>
                                <tr>
                                    <td class="font-semibold">First Name</td>
                                    <td>: {{userData.first_name}}</td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Last Name</td>
                                    <td>: {{userData.last_name}}</td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Employee ID</td>
                                    <td>: {{userData.emp_id}}</td>
                                </tr>

                            </table>
                        </vs-col>
                        <vs-col class="vx-col md:w-4/12  w-full" vs-justify="center" vs-align="center">
                            <table>
                                <tr>
                                    <td class="font-semibold">Role</td>
                                    <td>: {{RoleName}}</td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Email</td>
                                    <td>: {{userData.email}}</td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Phone</td>
                                    <td>: {{userData.phone}}</td>
                                </tr>

                            </table>
                        </vs-col>
                </vs-row>
            </vx-card>

            <vx-card class="mb-base">
                <vs-row>
                    <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                            <feather-icon svgClasses="w-6 h-6" icon="GridIcon" class="mr-2"/>
                            <span class="font-medium text-lg leading-none">Organization Information</span>
                        </div>
                        <vs-divider/>
                    </div>

                    <!-- Organization - Col 1 -->
                    <div class="vx-col flex-1 page-user-view">
                        <table>
                            <tr>
                                <td class="font-semibold">Employee Type</td>
                                <td>: {{employeeType.label}}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Leave Package</td>
                                <td>: {{leavePackage.label}}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Job Description</td>
                                <td>: {{jobDescription.label}}</td>
                            </tr>
                            <tr v-if="showDateOnPreview">
                                <td class="font-semibold">Contract Date</td>
                                <td>: {{dateFormStart}} to {{dateFormEnd}}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Organization - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1 page-user-view">
                        <table>
                            <tr>
                                <td class="font-semibold">Payroll Package</td>
                                <td>: {{payRoll.label}}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Asset Package</td>
                                <td>: {{assetPackage.label}}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Designation</td>
                                <td>: {{designation.label}}</td>
                            </tr>
                        </table>
                    </div>
                </vs-row>
            </vx-card>
            <vx-card>
                <vs-row>
                    <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                            <feather-icon svgClasses="w-6 h-6" icon="GridIcon" class="mr-2"/>
                            <span class="font-medium text-lg leading-none">Organization Tree Information</span>
                        </div>
                        <vs-divider/>
                    </div>

                    <!-- Organization - Col 1 -->
                    <div class="vx-col flex-1 page-user-view">
                        <table>
                            <tr>
                                <td class="font-semibold">Position in Tree</td>
                                <td>: {{selectedTree.text}}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Organization - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1 page-user-view">
                        <table>
                            <tr>
                                <td class="font-semibold">Type</td>
                                <td>: {{selectedTree.name}}</td>
                            </tr>
                        </table>
                    </div>
                </vs-row>
            </vx-card>

            <div class="vx-row mt-3">

            </div>
            <div align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="create()">Create</vs-button>
            </div>
        </vs-popup>

    </div>
</template>
<script>
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    import vSelect from 'vue-select'
    import {Cropper} from 'vue-advanced-cropper'
    import VJstree from 'vue-jstree';

    export default {
        components: {
            FormWizard,
            TabContent,
            vSelect,
            Cropper,
            VJstree,
        },
        props: {},
        data() {

            return {
                showDateOnPreview:false,
                permissionView: false, // to showing permission, make it true;
                hideDesignation: true,
                hidePayroll: true,
                hideAssetPackage: true,
                hideCalenderMessage:true,
                hideJobDescription: true,
                hideLeavePackage: true,
                hideEmployeeType: true,
                hideTree: true,
                hideRole: true,
                previewProfile: false,
                modalTitle: '',
                showPass: false,

                showCalender: false,
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

                roleData: [],
                RoleName: "",
                makeHidden: true,
                selectedRole: {
                    value: null,
                    label: ''
                },


                permissionsManager: [],

                userData: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    emp_id: '',
                },


                designationData: [],
                designation: {
                    id: null,
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

                employeeType: {
                    id: null,
                    label: '',
                    type: '',
                },

                employeeTypeOption: [],
                employeeTypeData: [],

                //Organization Tree
                selectedTree: [],
                organizationTree: [],
                dateRange:{start: '', end: ''},

            }
        },
        computed: {
            //check if both password and email have been set for enabling login button
            validateForm() {
                return this.old_password !== '' &&
                    this.new_password !== '' &&
                    this.new_password === this.confirm_new_password;
            },
            dateFormStart() {

                let d = this.dateRange.start;
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                let ee = `${da}-${mo}-${ye}`;
                return ee;
            },
            dateFormEnd() {

                let d = this.dateRange.end;
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                let ee = `${da}-${mo}-${ye}`;
                return ee;
            },
        },
        mounted() {
            this.loadData();
            this.orgTree();
        },
        methods: {


            chkData() {
                this.loadData();
            },
            checkEmployeeType(data){
             if (data.id === 16){
this.showCalender = true;
                 this.showDateOnPreview = true;
             }else{
                 this.showCalender =false;
                 this.showDateOnPreview = false;
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

            validateStep(step) {

                if (step === 'step1') {
                    const t = this.userData.first_name !== '' &&
                        this.userData.last_name !== '' &&
                        this.userData.email !== '' &&
                        this.userData.phone !== '' &&
                        this.userData.emp_id !== '' &&
                        this.selectedRole.value !== null;


                    if (this.selectedRole.value == null) {
                        this.hideRole = false;
                    }


                    if (t === true) {
                        return true;
                    } else {
                        const data = {
                            first_name: this.userData.first_name,
                            last_name: this.userData.last_name,
                            selectedRole: null,
                            email: this.userData.email,
                            phone: this.userData.phone,
                            emp_id: this.userData.emp_id,
                        }
                        this.validateInput(data)
                        return false;
                    }
                }
                else if (step === 'step2') {
                    const dt = this.employeeType.id === 16 &&
                        this.dateRange.start === '' &&  this.dateRange.end === '';


                    const t = this.designation.id !== null &&
                        this.payRoll.value !== null &&
                        this.jobDescription.value !== null &&
                        this.leavePackage.value !== null &&
                        this.employeeType.id !== null &&
                        this.assetPackage.value !== null;
                    if (t === true && dt === false) {
                        return true;
                    } else {
                        if (this.dateRange.start === '' || this.dateRange.end === '') {
                            this.showValidation('date');
                        }
                        if (this.designation.id === null) {
                            this.showValidation('designation');
                        }
                        if (this.payRoll.value == null) {
                            this.showValidation('pay_roll');
                        }
                        if (this.jobDescription.value == null) {
                            this.showValidation('job_description');
                        }
                        if (this.leavePackage.value == null) {
                            this.showValidation('leave_package');
                        }
                        if (this.employeeType.id == null) {
                            this.showValidation('employee_type');
                        }
                        if (this.assetPackage.value == null) {
                            this.showValidation('asset_package');
                        }
                        return false;
                    }


                } else if (step === 'step3') {
                    if (this.selectedTree.id !== undefined) {
                        this.inputModal()
                        return true;
                    }

                    if (this.selectedTree.id === undefined) {
                        this.hideTree = false;
                    }

                    return false;
                }
                return true;
            },


            loadData() {

                this.$http.get('/api/user-create/data')
                    .then(response => {
                        //@todo turn it off from back-end also
                        //this.organizationTree = response.data.organizationTree;
                        this.roleData = response.data.roleData;
                        this.leavePackageData = response.data.leaveData;
                        this.assetPackageData = response.data.assetData;
                        this.payRollData = response.data.payrollData;
                        this.jobDescriptionData = response.data.jobDescriptionData;
                        this.designationData = response.data.designationData;
                        this.employeeTypeData = response.data.employeeTypeData;



                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
            },

            //Load Organization Tree
            async orgTree() {
                try {
                    var req = await axios.get('/api/organization-tree/data')
                    var organizationList = req.data;
                    if (organizationList.constructor === Array) {
                        this.organizationTree = organizationList;
                    } else {
                        this.organizationTree = [];
                    }

                } catch (err) {
                    this.notificationAlert(err.response);
                }
            },

            treeItemClick(node, item, e) {
                this.selectedTree = item;
                var organizationTree = _.cloneDeep(this.organizationTree)
                this.organizationTree = organizationTree;
                this.hideTree = true;
            },

            hideValidation(name) {
                console.log(name)
                switch (name) {
                    case 'date':
                        this.hideCalenderMessage = true;
                        break;
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
                    case 'roll':
                        this.hideRole = true;
                        break;
                    default:
                }

            },
            showValidation(name) {
                switch (name) {
                    case 'date':
                        this.hideCalenderMessage = false;
                        break;
                    case 'designation':
                        this.hideDesignation = false;
                        break;
                    case 'pay_roll':
                        this.hidePayroll = false;
                        break;
                    case 'asset_package':
                        this.hideAssetPackage = false;
                        break;
                    case 'job_description':
                        this.hideJobDescription = false;
                        break;
                    case 'leave_package':
                        this.hideLeavePackage = false;
                        break;
                    case 'employee_type':
                        this.hideEmployeeType = false;
                        break;
                    default:
                }

            },
            inputModal() {
                this.previewProfile = !this.previewProfile;

            },
            async roleSelected() {
                this.makeHidden = true;
                var selectedRoleId = this.selectedRole.value;
                this.RoleName = this.selectedRole.label;
                var data = {
                    id: selectedRoleId,
                }
                try {
                    var req = await axios.post('/api/user-create/data/role', data)
                    var selectedRole = req.data;
                    this.permissionsManager = selectedRole;

                } catch (err) {
                    console.log(err)
                }
            },
            create() {
                this.btnDisabled = true;
                let formData = new FormData;
                if (this.selectedTree != null) {
                    let selectedTree = this.selectedTree.organizationid
                } else {
                    let selectedTree = null;
                }

                let data = {
                    first_name: this.userData.first_name,
                    last_name: this.userData.last_name,
                    emp_id: this.userData.emp_id,
                    email: this.userData.email,
                    password: this.userData.password,
                    phone: this.userData.phone,
                    role: this.selectedRole.value,
                    permissions: this.permissionsManager,
                    hasFile: ['logoData', 'verificationIdFile'],
                    logoData: this.logoData,


                    selectedTree: this.selectedTree,

                    designation: this.designation,
                    payRoll: this.payRoll,
                    leavePackage: this.leavePackage,
                    assetPackage: this.assetPackage,
                    jobDescription: this.jobDescription,
                    employeeType: this.employeeType,


                    contract_date: this.dateRange,

                };
                formFiles(data, formData)
                formData.append('data', JSON.stringify(data));

                axios.post('/api/user-create/data/proceed', formData)
                    .then(response => {
                        this.notificationAlert(response);
                        this.previewProfile = !this.previewProfile;
                        this.$router.push('/user-list');
                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })


            },

        }
    }
</script>

<style lang="scss">
    .tree-checkbox {

    }

    #avatar-col {
        width: 10rem;
    }

    .con-vs-popup .vs-popup {
        width: 60% !important;
        height: auto !important;
    }


    .page-user-view {
        table {
            td {
                vertical-align: top;
                min-width: 80px;
                padding-bottom: .8rem;
                word-break: break-all;
            }

            &:not(.permissions-table) {
                td {
                    @media screen and (max-width: 370px) {
                        display: block;
                    }
                }
            }
        }
    }


    @media screen and (min-width: 1201px) and (max-width: 1211px),
    only screen and (min-width: 636px) and (max-width: 991px) {
        #account-info-col-1 {
            width: calc(100% - 12rem) !important;
        }

    }

</style>
