<template>
    <div>
        <div v-if="!editMode">
            <div class="vx-row flex px-4 pb-6">
                <div class="flex-auto text-2xl">General Info</div>
                <div>
                    <div class="pl-2">
                        <vs-button size="small" icon-pack="feather" icon="icon-edit"
                                   @click="editMode =! editMode"></vs-button>
                    </div>
                </div>
            </div>
            <div class="vx-row">
                <!-- <div class="vx-col md:w-1/2 edit-prev-cont">
                     <div class="edit-prev-ttl">Personal Email:</div>
                     <div class="edit-prev-dt">{{defItem.personalemail}}</div>
                 </div>-->
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Office Email:</div>
                    <div class="edit-prev-dt">{{defItem.officeemail}}</div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Personal Phone:</div>
                    <div class="edit-prev-dt">{{defItem.personalmobile}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Office Phone:</div>
                    <div class="edit-prev-dt">{{defItem.officemobile}}</div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Date of Birth:</div>
                    <div class="edit-prev-dt">{{defItem.dateofbirth}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Gender:</div>
                    <div class="edit-prev-dt">{{defItem.gender}}</div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Marital Status:</div>
                    <div class="edit-prev-dt">{{defItem.meritalstatus}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Religion:</div>
                    <div class="edit-prev-dt">{{defItem.religion}}</div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Blood Group:</div>
                    <div class="edit-prev-dt">{{defItem.bloodgroup}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Nationality:</div>
                    <div class="edit-prev-dt">{{defItem.nationality}}</div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Verification ID No.:</div>
                    <div class="edit-prev-dt">{{defItem.verificationidnumber}} ({{defItem.verificationidtype}})</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="pt-3 pr-3">
                        <div v-if="defItem.verificationidfile!=null">
                            <a :href="attachment" target="_blank" :download="defItem.verificationidfile"
                               class="flex py-2 px-4 cursor-pointer ">
                                <feather-icon icon="PaperclipIcon" svgClasses="w-4 h-4"/>
                                <span class="ml-2">{{defItem.verificationidfile}}</span>
                            </a>

                        </div>
                    </div>

                </div>
            </div>

            <div class="font-bold pt-12">Present Address</div>
            <vs-divider class=""></vs-divider>
            <div class="vx-row flex pb-2">
                <div class="edit-prev-ttl">Address:</div>
                <div class="edit-prev-dt">{{defItem.presentaddressline1}} {{defItem.presentAddressL2}}</div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">City:</div>
                    <div class="edit-prev-dt">{{defItem.presentaddresscity}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Post Code:</div>
                    <div class="edit-prev-dt">{{defItem.presentaddresspostcode}}</div>
                </div>
            </div>


            <div class="font-bold pt-12">Permanent Address</div>
            <vs-divider class=""></vs-divider>
            <div class="vx-row flex pb-2">
                <div class="edit-prev-ttl">Address:</div>
                <div class="edit-prev-dt">{{defItem.permanentaddressline1}} {{defItem.permanentaddressline2}}</div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">City:</div>
                    <div class="edit-prev-dt">{{defItem.permanentaddresscity}}</div>
                </div>
                <div class="vx-col md:w-1/2 edit-prev-cont">
                    <div class="edit-prev-ttl">Post Code:</div>
                    <div class="edit-prev-dt">{{defItem.permanentaddresspostcode}}</div>
                </div>
            </div>
        </div>

        <div v-if="editMode">
            <div class="vx-row">
                <!--<div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="Personal email" v-model="personalEmail"/>
                </div>-->
                <div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="Office email" v-model="officeEmail"/>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="Personal phone" v-model="personalPhone"/>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="Office Phone" v-model="officePhone"/>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <v-date-picker v-model="dateOfBirth" color="purple" :masks="{ input: 'YYYY-MM-DD' }">
                        <template v-slot="{ inputValue, inputEvents }">
                            <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4"
                                      label="* Date of birth" :value="inputValue" v-on="inputEvents"/>
                        </template>
                    </v-date-picker>
                </div>
                <div class="mt-4 vx-col md:w-1/2 w-full px-4">
                    <vs-select v-model="bloodgroup" class="w-full" placeholder="Bloodgroup" label="Bloodgroup">
                        <vs-select-item :key="index" :value="item.id" :text="item.value"
                                        v-for="(item, index) in bloodgroupData"/>
                    </vs-select>
                </div>
                <div class="mt-4 md:w-1/2 w-full pt-1 px-4">
                    <vs-select v-model="gender" class="w-full" placeholder="Gender" label="Gender">
                        <vs-select-item :key="index" :value="item.id" :text="item.value"
                                        v-for="(item, index) in genderData"/>
                    </vs-select>
                </div>
                <div class="vx-col md:w-1/2 w-full flex pt-10">
                    <div>
                        <vs-checkbox v-model="meritalStatus">Marital status</vs-checkbox>
                    </div>
                </div>
                <div class="mt-4 md:w-1/2 w-full px-4">
                    <vs-select v-model="religion" class="w-full" placeholder="Religion" label="Religion">
                        <vs-select-item :key="index" :value="item.id" :text="item.value"
                                        v-for="(item, index) in religionData"/>
                    </vs-select>
                </div>
                <div class="mt-4 md:w-1/2 w-full px-4">
                    <vs-select v-model="nationality" class="w-full" placeholder="Nationality" label="Nationality">
                        <vs-select-item :key="index" :value="item.id" :text="item.value"
                                        v-for="(item, index) in nationalityData"/>
                    </vs-select>
                </div>
                <div class="mt-4 md:w-1/2 w-full px-4">
                    <vs-select v-model="verificationidtype" class="w-full" placeholder="NID/Passport"
                               label="NID/Passport">
                        <vs-select-item :key="index" :value="item" :text="item"
                                        v-for="(item, index) in verificationIdOption"/>
                    </vs-select>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <vs-input class="w-full mt-4" label="NID/Passport number" v-model="verificationIdNumber"/>
                </div>
                <div class="vx-col md:w-1/2 w-full py-3">
                    <div class="pt-3 pr-3 font-bold">NID/Passport:</div>
                    <div class="flex">
                        <div>
                            <vs-button size="small" color="gray" class="ml-auto mt-2" @click="attachmentInput()">
                                browse
                            </vs-button>
                        </div>
                        <div class="pl-3 pt-3">{{ verificationIdFileName }}</div>
                    </div>
                </div>
            </div>
            <div class="font-bold pt-8 pb-2" style="border-bottom:1px solid #f2f2f2"> Present address
            </div>
            <div>
                <vs-input class="w-full mt-4" label="Address line 1" v-model="presentAddressLine1"/>
            </div>
            <div>
                <vs-input class="w-full mt-4" label="Address line 2" v-model="presentAddressLine2"/>
            </div>
            <div class="flex">
                <div class="w-full pr-1 pt-4">
                    <vs-select v-model="presentAddressCitySelect" class="w-full" placeholder="City" label="City"
                               @input="manageInfo('presentAddressCity')">
                        <vs-select-item :key="index" :value="item.value" :text="item.value"
                                        v-for="(item, index) in addressCityData"/>
                    </vs-select>
                </div>
                <div class="w-full pl-1">
                    <vs-input class="w-full mt-4" label="post code" v-model="presentAddressPostCode"/>
                </div>
            </div>
            <div v-if="presentAddressCityOtherView">
                <vs-input class="w-full mt-4" label="City/Area" v-model="presentAddressCity"/>
            </div>
            <div class="font-bold pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                Permanent address
            </div>
            <div>
                <vs-input class="w-full mt-4" label="Address  line 1" v-model="permanentAddressLine1"/>
            </div>
            <div>
                <vs-input class="w-full mt-4" label="Address line 2" v-model="permanentAddressLine2"/>
            </div>
            <div class="flex">
                <div class="w-full pr-1 pt-4">
                    <vs-select v-model="permanentAddressCitySelect" class="w-full" placeholder="City" label="City"
                               @input="manageInfo('permanentAddressCity')">
                        <vs-select-item :key="index" :value="item.value" :text="item.value"
                                        v-for="(item, index) in addressCityData"/>
                    </vs-select>
                </div>
                <div class="w-full pl-1">
                    <vs-input class="w-full mt-4" label="post code" v-model="permanentaddressPostCode"/>
                </div>
            </div>
            <div v-if="permanentAddressCityOtherView">
                <vs-input class="w-full mt-4" label="City/Area" v-model="permanentAddressCity"/>
            </div>
            <div class="w-full flex" align="right">
                <div class="flex-auto"></div>
                <div>
                    <vs-button size="small" class="ml-auto mt-2" @click="editMode = false" color="danger">Cancel
                    </vs-button>
                </div>
                <div class="pl-2">
                    <vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="saveData()">Save
                    </vs-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GeneralInfo",
        components: {},
        props: {
            reqData: {
                default: {}
            }
        },
        data() {
            return {
                editMode: false,
                genInfo: {},
                defItem: {},

                id: null,

                //user general info
                name: null,
                personalEmail: null,
                officeEmail: null,
                personalPhone: null,
                officePhone: null,
                verificationIdOption: ['NID', 'Passport'],
                verificationidtype: null,
                verificationIdFile: null,
                verificationIdFileName: null,
                verificationIdNumber: null,
                nationalityOption: [],
                nationalityData: [],
                nationality: null,
                bloodgroup: null,
                bloodgroupOption: [],
                bloodgroupData: [],
                dateOfBirth: null,
                genderOption: [],
                genderData: [],
                gender: null,
                religion: null,
                religionOption: [],
                religionData: [],
                meritalStatus: false,

                presentAddressLine1: null,
                presentAddressLine2: null,
                presentAddressCitySelect: null,
                presentAddressCityOtherView: false,
                presentAddressCity: null,
                presentAddressPostCode: null,

                permanentAddressLine1: null,
                permanentAddressLine2: null,
                permanentAddressCitySelect: null,
                permanentAddressCityOtherView: false,
                permanentAddressCity: null,
                permanentaddressPostCode: null,

                addressCityData: [],
                addressCityList: [],
                attachment: null,
            };
        },
        mounted() {
            if (this.reqData.userData) {
                this.loadData();
            }
        },
        methods: {
            async loadData() {

                this.defItem = _.cloneDeep(this.reqData.employee);
                this.genInfo = _.cloneDeep(this.reqData);
                this.attachment = '/storage/company-' + this.genInfo.userData.companyid + '/user-' + this.genInfo.userData.id + '/document/' + this.defItem.verificationidfile;
                this.id = this.genInfo.userData.id;
                this.personalEmail = this.genInfo.employee.personalemail;
                this.officeEmail = this.genInfo.employee.officeemail;
                this.personalPhone = this.genInfo.employee.personalmobile;
                this.officePhone = this.genInfo.employee.officemobile;

                this.verificationidtype = this.genInfo.employee.verificationidtype;
                this.verificationIdNumber = this.genInfo.employee.verificationidnumber;
                this.nationality = this.genInfo.employee.nationality;
                this.bloodgroup = this.genInfo.employee.bloodgroup;
                this.dateOfBirth = this.genInfo.employee.dateofbirth;
                this.gender = this.genInfo.employee.gender;
                this.religion = this.genInfo.employee.religion;
                this.meritalStatus = this.genInfo.employee.meritalstatus;

                this.addressCityData = this.genInfo.cityData;
                this.addressCityList = this.genInfo.cityList;

                this.presentAddressLine1 = this.genInfo.employee.permanentaddressline1;
                this.presentAddressLine2 = this.genInfo.employee.permanentaddressline2;
                this.presentAddressCity = this.genInfo.employee.presentaddresscity;
                this.presentAddressPostCode = this.genInfo.employee.presentaddresspostcode;
                if (this.addressCityList.indexOf(this.presentaddresscity) > -1) {
                    this.presentAddressCitySelect = this.presentAddressCity;
                    this.presentAddressCityOtherView = false;
                } else {
                    if (this.presentAddressCity != null) {
                        this.presentAddressCitySelect = 'others';
                        this.presentAddressCityOtherView = true;
                    }
                }

                this.permanentAddressLine1 = this.genInfo.employee.permanentaddressline1;
                this.permanentAddressLine2 = this.genInfo.employee.permanentaddressline2;
                this.permanentAddressCity = this.genInfo.employee.permanentaddresscity;
                this.permanentaddressPostCode = this.genInfo.employee.permanentaddresspostcode;

                if (this.addressCityList.indexOf(this.permanentAddressCity) > -1) {
                    this.permanentAddressCitySelect = this.permanentAddressCity;
                    this.permanentAddressCityOtherView = false;
                } else {
                    if (this.permanentAddressCity != null) {
                        this.permanentAddressCitySelect = 'others';
                        this.permanentAddressCityOtherView = true;
                    }
                }

                this.nationalityOption = this.genInfo.nationalityList;
                this.nationalityData = this.genInfo.nationalityData;

                this.bloodgroupOption = this.genInfo.bloodgroupList;
                this.bloodgroupData = this.genInfo.bloodgroupData;

                this.genderOption = this.genInfo.genderList;
                this.genderData = this.genInfo.genderData;

                this.religionOption = this.genInfo.religionList;
                this.religionData = this.genInfo.religionData;

                if (this.defItem.gender != null) {
                    this.defItem.gender = _.filter(this.genderData, {id: Number(this.defItem.gender)})[0].value;
                }
                if (this.defItem.religion != null) {
                    this.defItem.religion = _.filter(this.religionData, {id: Number(this.defItem.religion)})[0].value;
                }
                if (this.defItem.bloodgroup != null) {
                    this.defItem.bloodgroup = _.filter(this.bloodgroupData, {id: Number(this.defItem.bloodgroup)})[0].value;
                }
                if (this.defItem.nationality != null) {
                    this.defItem.nationality = _.filter(this.nationalityData, {id: Number(this.defItem.nationality)})[0].value;
                }
                if (this.defItem.meritalstatus != null) {
                    if (this.defItem.meritalstatus == true) {
                        this.defItem.meritalstatus = 'Married';
                    }
                    if (this.defItem.meritalstatus == false) {
                        this.defItem.meritalstatus = 'Unmarried';
                    }
                }

                if (this.defItem.dateofbirth != null) {
                    this.defItem.dateofbirth = this.defItem.dateofbirth.split('T')[0]
                }

            },

            manageInfo(type, index = null, item = []) {
                if (type == 'presentAddressCity') {
                    if (this.presentAddressCitySelect != null) {
                        if (this.presentAddressCitySelect.toLowerCase() == 'others') {
                            this.presentAddressCityOtherView = true;
                            this.presentAddressCity = '';
                        } else {
                            this.presentAddressCityOtherView = false;
                            this.presentAddressCity = this.presentAddressCitySelect;
                        }
                    }
                } else if (type == 'permanentAddressCity') {
                    if (this.permanentAddressCitySelect != null) {
                        if (this.permanentAddressCitySelect.toLowerCase() == 'others') {
                            this.permanentAddressCityOtherView = true;
                            this.permanentAddressCity = '';
                        } else {
                            this.permanentAddressCityOtherView = false;
                            this.permanentAddressCity = this.permanentAddressCitySelect;
                        }
                    }
                }
            },

            attachmentInput() {
                var fileData = document.createElement('input');
                fileData.type = 'file';
                fileData.click();
                fileData.onchange = e => {
                    var input = e.target;
                    if (input.files && input.files[0]) {
                        this.verificationIdFile = input.files[0];
                        this.verificationIdFileName = input.files[0].name;

                    }
                }
            },

            saveData() {
                var data = {
                    personalEmail: this.personalEmail,
                    officeEmail: this.officeEmail,
                    personalPhone: this.personalPhone,
                    officePhone: this.officePhone,
                    verificationidtype: this.verificationidtype,
                    verificationIdFile: this.verificationIdFile,
                    verificationIdNumber: this.verificationIdNumber,
                    nationality: this.nationality,
                    bloodgroup: this.bloodgroup,
                    dateOfBirth: this.dateOfBirth,
                    gender: this.gender,
                    religion: this.religion,
                    meritalStatus: this.meritalStatus,
                    presentAddressLine1: this.presentAddressLine1,
                    presentAddressLine2: this.presentAddressLine2,
                    presentAddressPostCode: this.presentAddressPostCode,
                    presentAddressCity: this.presentAddressCity,
                    permanentAddressLine1: this.permanentAddressLine1,
                    permanentAddressLine2: this.permanentAddressLine2,
                    permanentaddressPostCode: this.permanentaddressPostCode,
                    permanentAddressCity: this.permanentAddressCity,
                    id: this.id,
                    hasFile: ['verificationIdFile'],
                }
                if (this.validateInput(data)) {
                    this.btnDisabled = true;
                    var formData = new FormData();
                    formFiles(data, formData)
                    formData.append('data', JSON.stringify(data));
                    axios.post('/api/user-edit/data/general-info-update', formData)
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
        }
    };
</script>


<style scoped>
    .edit-prev-cont {
        padding: 6px 0px;
        display: flex;
        width: 100%;
    }

    .edit-prev-ttl {
        max-width: 200px;
        flex: 1;
        font-weight: bold;
        padding: 0px 10px 0px 14px;
    }

    .edit-prev-dt {
        flex: 1;
    }
</style>
