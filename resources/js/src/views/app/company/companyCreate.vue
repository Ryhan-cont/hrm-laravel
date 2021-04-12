
<template>
<div>
    <vx-card >
      <form-wizard color="rgba(var(--vs-primary), 1)" title="Create Company" subtitle="Please complete all the steps" :disabled="btnDisabled" finishButtonText="Submit" @on-complete="createCompany()">
        <tab-content title="Company General Info" icon="feather icon-home">
          <div class="button-wrapper bg-gray-200 cursor-pointer" @click="fileInput()" style="width:150px; height:100px; background-image:url('/site/upload.png'); background-repeat: no-repeat; background-size: 20px 20px; background-position: center center; border:1px solid rgb(0,0,0,.1)">
            <img :src="logoPreviewImage" class="w-full">
          </div>
          <div class="text-center p-1" style="width:150px; font-size:10px">Upload Company Logo</div>
          <vs-input label-placeholder="Name" class="w-full pt-4"  v-model="name" />
          <div v-if="errorData.name" class="py-1 text-sm text-red-400">{{errorData.name[0]}}</div>
          <vs-input label-placeholder="Address" class="pt-3 w-full" v-model="address" />
          <div v-if="errorData.address" class="py-1 text-sm text-red-400">{{errorData.address[0]}}</div>
          <vs-input label-placeholder="Email" type="email" class="pt-3 w-full" v-model="email" />
          <div v-if="errorData.email" class="py-1 text-sm text-red-400">{{errorData.email[0]}}</div>
          <vs-input label-placeholder="Phone" type="text" class="pt-3 w-full" v-model="phone" />
          <div v-if="errorData.phone" class="py-1 text-sm text-red-400">{{errorData.phone[0]}}</div>
          <vs-input label-placeholder="Website" type="text" class="pt-3 w-full" v-model="website" />

        </tab-content>
        <tab-content label="Admin" title="Admin" icon="feather icon-user">

          <div class="py-10">
            <!--<vs-input label-placeholder="Name" class="w-full pt-4"  v-model="adminName" />-->
              <vs-row>
                  <vs-col vs-type="flex" vs-justify="center" vs-w="6">
                      <vs-input class="w-full mt-4 mr-1" label="First Name" v-model="first_name" name="first_name"/>
                      <div v-if="errorData.first_name" class="py-1 text-sm text-red-400">{{errorData.first_name[0]}}</div>
                  </vs-col>
                  <vs-col vs-type="flex" vs-w="6">
                      <vs-input class="w-full mt-4" label="Last Name" v-model="last_name" name="last_name"/>
                  </vs-col>
              </vs-row>
            <vs-input label-placeholder="Email" type="email" class="pt-3 w-full" name="email" v-model="adminEmail" />
            <div v-if="errorData.adminEmail" class="py-1 text-sm text-red-400">{{errorData.adminEmail[0]}}</div>
              <vs-input class="pt-3 w-full"
                        v-on:icon-click="showPass = !showPass"
                        :icon="showPass ? 'icon icon-eye' : 'icon icon-eye-off'"
                        :type="showPass ? 'text' : 'password'"
                        icon-pack="feather"
                        icon-no-border
                        icon-after="true"
                        label="Password"
                        v-model="adminPassword"
                        name="adminPassword"
              />
            <div v-if="errorData.adminPassword" class="py-1 text-sm text-red-400">{{errorData.adminPassword[0]}}</div>
            <vs-input label-placeholder="Phone" class="pt-3 w-full" name="phone" v-model="adminPhone" />
          </div>

        </tab-content>
        <tab-content label="Package" title="Package" icon="feather icon-lock">

          <div class="py-10">
            <v-select v-model="selectedPackage" @input="loadPackage()" :clearable="false" :options="packageOptions" placeholder="Select" name="Select Package" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          </div>
          <div v-if="errorData.packageList" class="py-1 text-sm text-red-400">{{errorData.packageList[0]}}</div>
          <div class="pt-3 pb-8">
            <div><b>Name:</b> {{selectedPackageData.name}}</div>
            <div><b>Description:</b> {{selectedPackageData.description}}</div>
            <div><b>Price:</b> {{selectedPackageData.price}}{{selectedPackageData.currency}}</div>
            <div><b>Number of user:</b> {{selectedPackageData.nou}}</div>
            <div><b>Permissions:</b> </div>
            <div>
              <div class="flex flex-wrap">
                <div class="m-1 px-2 rounded-lg bg-gray-300" v-for="(item,index) in packageModule" :key="index">
                  <div>{{ item.name }}</div>
                  <div class="m-1 px-2 rounded-lg bg-gray-200" v-for="(subItem,subIndex) in item.subpermissions" :key="subIndex" v-if="subItem.status == true">{{subItem.title}}</div>
                </div>
              </div>
            </div>

          </div>

        </tab-content>
      </form-wizard>
    </vx-card>
    <vs-popup title="Crop Image" class="" :active.sync="loadImageCropper">
      <div class="bg-gray-100 w-full overflow-hidden flex justify-center" :style="{height:cropperBoxData.height+'px'}">
        <cropper :src="cropBoxImage" ref="cropper" 	:stencil-props="{aspectRatio: 1.5/1}"/>
      </div>
      <div class="p-3 mt-2 text-center bg-gray-800 text-white cursor-pointer" @click="crop">Crop</div>
    </vs-popup>

</div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { Cropper } from 'vue-advanced-cropper'
import vSelect from 'vue-select'
export default {
    components: {
        FormWizard,
        TabContent,
        Cropper,
        vSelect
    },
    data: () => ({
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

        errorData: [],

        //company
        name: '',
        id: '',
        address: '',
        phone: '',
        website: '',
        email: '',

        //admin
        first_name: '',
        last_name: '',
        adminPhone: '',
        adminEmail: '',
        adminPassword: null,

        //package
        packageId: null,
        selectedPackage: null,
        packageOptions: [],
        packageData: [],
        selectedPackageData: [],
        packageModule: [],

    }),
    mounted() {
        this.loadData();
    },
    methods: {
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
        async loadData() {
            try {
                var req = await axios.get('api/company-create/data')
                this.packageOptions = req.data.packageOptions;
                this.packageData = req.data.packageData;
            } catch (err) {
                this.notificationAlert(err.response);

            }
        },
        async loadPackage() {
            this.selectedPackageData = this.packageData[this.selectedPackage];
            this.packageId = this.selectedPackageData.id;
            var data = {
                id: this.selectedPackageData.id,
            }
            try {
                var req = await axios.post('api/company-create/data/package/module', data);
                this.packageModule = req.data;
            } catch (err) {
                console.log(err)
            }
        },
        async createCompany() {
            this.btnDisabled = true;
            this.errorData = {};
            try {
                var data = {
                    name: this.name,
                    address: this.address,
                    logoData: this.logoData,
                    email: this.email,
                    phone: this.phone,
                    website: this.website,

                    first_name: this.first_name,
                    last_name: this.last_name,
                    adminPhone: this.adminPhone,
                    adminEmail: this.adminEmail,
                    adminPassword: this.adminPassword,

                    packageList: this.packageId,

                }
                var fornData = createForm(data);
                var req = await axios.post('api/company-create/data/proceed', fornData)
                if (req) {
                    this.notificationAlert(req);
                    this.$router.push('/company-list');
                }
            } catch (err) {
                this.errorData = err.response.data.errors;
                this.notificationAlert(err.response);

            }

        },
    }
}
</script>
