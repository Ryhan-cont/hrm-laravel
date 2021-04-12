<template>
    <div id="gen-info-view">
          <div id="gen-data" v-if="general_info">
              <vx-card title="General Information" class="mb-base">
                  <div class="vx-row">
                      <div class="vx-col w-full">
                          <div class="float-right pb-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="callPopup('gen_info')"></vs-button></div>
                      </div>
                      <!-- Information - Col 1 -->
                      <div class="vx-col flex-1" id="account-info-col-1">
                          <table>
                              <tr>
                                  <td class="font-semibold">Personal Email </td>
                                  <td>{{general_info.personalemail}}</td>
                              </tr>

                              <tr>
                                  <td class="font-semibold">Gender </td>
                                  <td>{{ general_info.gender }}</td>
                              </tr>
                              <tr>
                                  <td class="font-semibold">Date of Birth </td>
                                  <td>{{ formatted_birthdate }}</td>
                              </tr>

                              <tr>
                                  <td class="font-semibold">Religion </td>
                                  <td>{{ general_info.religion }}</td>
                              </tr>
                              <tr>
                                  <td class="font-semibold">Marital Status </td>
                                  <td>{{ general_info.marital_status }}</td>
                              </tr>

                          </table>
                      </div>
                      <!-- /Information - Col 1 -->

                      <!-- Information - Col 2 -->
                      <div class="vx-col flex-1" id="account-info-col-2">
                          <table>
                              <tr>
                                  <td class="font-semibold">Emergency Contact </td>
                                  <td> {{ general_info.personalmobile }}</td>
                              </tr>
                              <tr>
                                  <td class="font-semibold">Work Mobile </td>
                                  <td> {{ general_info.officemobile }}</td>
                              </tr>
                              <tr>
                                  <td class="font-semibold">Nationality </td>
                                  <td>{{ general_info.nationality }}</td>
                              </tr>
                              <tr>
                                  <td class="font-semibold">Blood Group </td>
                                  <td>{{ general_info.blood_group }}</td>
                              </tr>

                          </table>
                      </div>

                  </div>

              </vx-card>

              <vx-card>
                  <div class="vx-row">

                      <div class="vx-col w-full">
                          <div class="flex items-end px-3">
                              <feather-icon svgClasses="w-6 h-6" icon="HomeIcon" class="mr-2" />
                              <span class="font-medium text-lg leading-none">Permanent Address</span>
                          </div>

                              <div class="float-right pb-3"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="callPopup('address',general_info)"></vs-button></div>
                          <vs-divider />
                      </div>

                      <!-- Organization - Col 1 -->
                      <div class="vx-col flex-1" id="addr-info-col-1">
                          <table>
                              <tr>
                                  <td class="font-semibold">Address </td>
                                  <td>{{ general_info.permanent_address }}</td>
                              </tr>
                          </table>
                          <table>

                              <tr>
                                  <td class="font-semibold">City </td>
                                  <td>{{ general_info.permanent_address_city }}</td>
                                  <td class="font-semibold">Province </td>
                                  <td>{{ general_info.permanent_address_province }}</td>
                                  <td class="font-semibold">Country </td>
                                  <td>{{ general_info.permanent_address_country }}</td>
                              </tr>
                              <tr>
                                  <td class="font-semibold">Post Code </td>
                                  <td>{{ general_info.permanentaddresspostcode }}</td>
                              </tr>
                          </table>
                      </div>
                      <!-- /Organization - Col 1 -->


                      <div class="vx-col w-full md:mt-10">

                          <div class="flex items-end px-3">
                                 <feather-icon svgClasses="w-6 h-6" icon="HomeIcon" class="mr-2" />
                                 <span class="font-medium text-lg leading-none">Present Address</span>
                          </div>
                          <vs-divider />
                      </div>
                      <!-- Information - Col 2 -->
                      <div class="vx-col flex-1" id="addr-info-col-2">
                          <table>
                              <tr>
                                  <td class="font-semibold">Address </td>
                                  <td>{{ general_info.present_address }}</td>
                              </tr>
                          </table>
                          <table>

                              <tr>
                                  <td class="font-semibold">City </td>
                                  <td>{{ general_info.present_address_city }}</td>
                                  <td class="font-semibold">Province </td>
                                  <td>{{ general_info.present_address_province }}</td>
                                  <td class="font-semibold">Country </td>
                                  <td>{{ general_info.present_address_country }}</td>
                              </tr>
                              <tr>
                                  <td class="font-semibold">Post Code </td>
                                  <td>{{ general_info.presentaddresspostcode }}</td>
                              </tr>
                          </table>
                      </div>

                  </div>
              </vx-card>
              <vs-popup mediumscreen title="General Information" class="" :active.sync="geninfoEdit" >

                  <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full">
                          <vs-input class="w-full mt-4"  label="Personal email" v-model="user_info.personal_email"/>
                      </div>
                      <div class="vx-col md:w-1/2 w-full">
                          <vs-input class="w-full mt-4" label="Emergency Contact" v-model="user_info.emergency_number"/>
                      </div>
                      <div class="vx-col md:w-1/2 w-full">
                          <vs-input class="w-full mt-4" label="Work Phone" v-model="user_info.work_number"/>
                      </div>
                      <div class="vx-col md:w-1/2 w-full">
                          <v-date-picker v-model="general_info.dateofbirth" color="purple" :masks="{ input: 'YYYY-MM-DD' }">
                              <template v-slot="{ inputValue, inputEvents }">
                                  <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4"
                                            label="* Date of birth" :value="inputValue" v-on="inputEvents"/>
                              </template>
                          </v-date-picker>
                      </div>
                      <div class="vx-col md:w-1/2 w-full">
                          <vs-select v-model="blood" class="w-full" placeholder="blood group" label="Blood Group">
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in bloodGroup" />
                          </vs-select>
                          <validate-data rules="required" :value="blood" :name="'blood'" altName="blood group" />

                      </div>
                      <div class="vx-col md:w-1/2 w-full">

                          <vs-select v-model="gender" class="w-full" placeholder="gender" label="Gender">
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in GenderData" />
                          </vs-select>
                          <validate-data rules="required" :value="gender" :name="'gender'" altName="gender" />


                      </div>
                      <div class="vx-col md:w-1/2 w-full">
                          <vs-select v-model="marital_status" class="w-full" placeholder="marital status" label="Marital Status">
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in maritalData" />
                          </vs-select>
                          <validate-data rules="required" :value="marital_status" :name="'gender'" altName="marital status" />


                      </div>

                      <div class="vx-col md:w-1/2 w-full">
                          <vs-select v-model="religion" class="w-full" placeholder="religion" label="Religion">
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in religionData" />
                          </vs-select>
                          <validate-data rules="required" :value="marital_status" :name="'religion'" altName="religion" />


                      </div>
                     <div class="vx-col md:w-1/2 w-full">
                         <vs-select v-model="nationality" class="w-full" placeholder="nationality" label="Nationality">
                             <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in nationalityData" />
                         </vs-select>

                      </div>


                  </div>


                  <div class="vx-row mt-3">

                  </div>
                  <div align="right" class="pt-1">
                      <vs-button :disabled='btnDisabled' @click="generalInfoUpdate()">Update</vs-button>
                  </div>
              </vs-popup>
              <vs-popup mediumscreen title="Address" class="" :active.sync="addressEdit" >
                  <div class="font-bold pb-2" style="border-bottom:1px solid #f2f2f2"> Permanent Address</div>
                  <div class="vx-row">


                      <div class="vx-col  w-full">
                          <vs-input class="w-full mt-4"  label="Address Line 1" v-model="permanentAddressLine1"/>
                      </div>
                      <div class="vx-col w-full">
                          <vs-input class="w-full mt-4" label="Address Line 2" v-model="permanentAddressLine2"/>
                      </div>

                      <div class="vx-col md:w-1/2 w-full" style="padding-top: 15px;">
                          <vs-select v-model="permanentCountrySelect" class="w-full" placeholder="Country" label="Country"  @input="getAddressData(permanentCountrySelect,'province')">
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in countryData" />
                          </vs-select>
                      </div>
                      <div class="vx-col md:w-1/2 w-full" style="padding-top: 15px;">
                          <vs-select v-model="permanentProvinceSelect" class="w-full" placeholder="Province/Division" label="Province/Division"  @input="getAddressData(permanentProvinceSelect,'city')">

                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in ProvinceData" />
                          </vs-select>
                          <vs-input v-if="country1Other" class="w-full mt-4" label="Address line 2" v-model="permanentProvinceSelect"/>
                      </div>
                      <div class="vx-col md:w-1/2 w-full" style="padding-top: 15px;">
                          <vs-select v-model="permanentCitySelect" class="w-full" placeholder="City" label="City" >
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in CityData" />
                          </vs-select>
                      </div>

                      <div v-if="permanentAddressCityOtherView" >
                          <vs-input class="w-full mt-4" label="City/Area" v-model="presentAddressCity"/>
                      </div>

                      <div class="vx-col md:w-1/2 w-full">
                          <vs-input class="w-full mt-4" label="Post Code" v-model="permanentAddressPostCode"/>
                      </div>

                      <div class="vx-col w-full" style="padding-top: 15px;">
                          <vs-checkbox v-model="address_same" @change="makeSame(address_same)">Same as Permanent Address</vs-checkbox>
                      </div>

                  </div>

                  <div class="font-bold pb-2 pt-8" style="border-bottom:1px solid #f2f2f2"> Present Address</div>

                  <div class="vx-row">

                      <div class="vx-col  w-full">
                          <vs-input class="w-full mt-4"  label="Address Line 1" v-model="presentAddressLine1" />
                      </div>
                      <div class="vx-col w-full">
                          <vs-input class="w-full mt-4" label="Address Line 2" v-model="presentAddressLine2"/>
                      </div>

                      <div class="vx-col md:w-1/2 w-full" style="padding-top: 15px;">
                          <vs-select v-model="presentCountrySelect" class="w-full" placeholder="Country" label="Country"  @input="getAddressData(permanentCountrySelect,'province2')">
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in countryData2" />
                          </vs-select>

                      </div>
                      <div class="vx-col md:w-1/2 w-full" style="padding-top: 15px;">
                          <vs-select v-model="presentProvinceSelect" class="w-full" placeholder="Province/Division" label="Province/Division"  @input="getAddressData(presentProvinceSelect,'city2')">
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in ProvinceData2" />
                          </vs-select>
                      </div>
                      <div class="vx-col md:w-1/2 w-full" style="padding-top: 15px;">
                          <vs-select v-model="presentCitySelect" class="w-full" placeholder="City" label="City" >
                              <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in CityData2" />
                          </vs-select>
                      </div>

                      <div v-if="presentAddressCityOtherView" >
                          <vs-input class="w-full mt-4" label="City/Area" v-model="presentAddressCity"/>
                      </div>

                      <div class="vx-col md:w-1/2 w-full">
                          <vs-input class="w-full mt-4" label="Post Code" v-model="presentAddressPostCode"/>
                      </div>


                  </div>
                  <div class="vx-row mt-3">

                  </div>
                  <div align="right" class="pt-1">
                      <vs-button :disabled='btnDisabled' @click="addressUpdate()">Update</vs-button>
                  </div>
              </vs-popup>
          </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select'
export default {
    components: {
        vSelect,
    },
    data() {
        return {
            country1Other: false,
            address_same: false,
            permanentAddressLine1:null,
            permanentAddressLine2:null,
            permanentCitySelect:null,
            permanentProvinceSelect:null,
            permanentCountrySelect:null,
            permanentAddressPostCode:null,
            permanentAddressCityOtherView:false,
            permanentAddressCity:null,

            presentAddressLine1:null,
            presentAddressLine2:null,
            presentCitySelect:null,
            presentProvinceSelect:null,
            presentCountrySelect:null,
            presentAddressPostCode:null,
            presentAddressCityOtherView:false,
            presentAddressCity:null,

            countryData:[],
            ProvinceData:[],
            CityData:[],
            countryData2:[],
            ProvinceData2:[],
            CityData2:[],


            custom_info:[],
            user_id: null,
            formatted_birthdate: null,
            user_info:{
                personal_email: null,
                emergency_number : null,
                work_number : null,
            },
            dropdown:[],
            general_info: [],
            geninfoEdit: false,
            addressEdit:false,
            defItem:[],
            attachment:null,

            bloodGroup:[],
            blood:'',

            GenderData:[],
            gender: '',
            maritalData:[],
            marital_status:'',
            religionData:[],
            religion:'',
            nationalityData:[],
            nationality:'',
        }
    },
    computed: {

    },
    methods: {
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

        fetchGeneralInfo() {
            axios.get(`/api/profile/general-info/${this.$route.params.id}`)
                .then(response => {
                    if (response.status === 200) {
                        this.general_info = response.data.general_info;
                        this.user_id = response.data.user_id;
                       this.formatted_birthdate = response.data.formatted_date;
                    } else {
                        this.notificationAlert(response);
                    }
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                    this.user_not_found = true
                });
        },
        makeSame(status){
           if(status){
              this.presentAddressLine1 =  this.permanentAddressLine1;
              this.presentAddressLine2 =  this.permanentAddressLine2;
              this.presentCitySelect =  this.permanentCitySelect;
              this.presentProvinceSelect =  this.permanentProvinceSelect;
              this.presentCountrySelect =  this.permanentCountrySelect;
              this.presentAddressPostCode =  this.permanentAddressPostCode;

           }
        },

        callPopup(type,data) {
            if (type === 'gen_info'){
              // this.user_info = this.general_info;
                this.user_info.emergency_number = this.general_info.personalmobile;
                this.user_info.personal_email = this.general_info.personalemail;
                this.user_info.work_number = this.general_info.officemobile;
                this.gender = this.general_info.gender_id;
                this.blood = this.general_info.blood_id;
                this.marital_status = this.general_info.marital_id;
                this.religion = this.general_info.religion_id;
                this.nationality = this.general_info.nationality_id;
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_BLOOD_GROUP}`)
                    .then(response => {
                        this.bloodGroup = response.data.items;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_GENDER}`)
                    .then(response => {
                        this.GenderData = response.data.items;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_MARITAL}`)
                    .then(response => {
                        this.maritalData = response.data.items;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_RELIGION}`)
                    .then(response => {
                        this.religionData = response.data.items;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_NATIONALITY}`)
                    .then(response => {
                        this.nationalityData = response.data.items;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                this.geninfoEdit = !this.geninfoEdit;
            }

            if (type === 'address'){

                this.getAddressData(data.permanent_address_country_id,'province');
                this.getAddressData(data.permanent_address_province_id,'city');
                this.getAddressData(data.present_address_country_id,'province2');
                this.getAddressData(data.present_address_province_id,'city2');

                    this.permanentAddressLine1 = data.permanentaddressline1;
                    this.permanentAddressLine2 = data.permanentaddressline2;
                    this.permanentCitySelect = data.permanent_address_city_id;
                    this.permanentProvinceSelect = data.permanent_address_province_id;
                    this.permanentCountrySelect = data.permanent_address_country_id;
                    this.permanentAddressPostCode = data.permanentaddresspostcode;

                    this.presentAddressLine1 = data.presentaddressline1;
                    this.presentAddressLine2 = data.presentaddressline2;
                    this.presentCitySelect =  data.present_address_city_id;
                    this.presentProvinceSelect = data.present_address_province_id;
                    this.presentCountrySelect = data.present_address_country_id;
                    this.presentAddressPostCode = data.presentaddresspostcode;
                    this.presentAddressCityOtherView = false;




                axios.get('/api/profile/get-country-data')
                    .then(response => {
                    this.countryData = response.data.country;

                        this.countryData2 = response.data.country;

                    })
                    .catch(error => {
                        this.notificationAlert(error.response);
                    })
                this.addressEdit = !this.addressEdit;

            }

        },

        generalInfoUpdate(){
            this.btnDisabled = true;
            const data ={
                'personal_number':this.user_info.emergency_number,
                'personal_email': this.user_info.personal_email,
                'work_number': this.user_info.work_number,
                'gender': this.gender,
                'date_of_birth': this.general_info.dateofbirth,
                'blood': this.blood,
                'marital_status': this.marital_status,
                'religion': this.religion,
                'nationality': this.nationality,
                'id':this.user_id,

            }

            var formData = new FormData();
            formFiles(data, formData)
            formData.append('data', JSON.stringify(data));
            axios.post('/api/profile/general-info-update',formData)
                .then(response => {

                    this.geninfoEdit = !this.geninfoEdit;
                    this.fetchGeneralInfo();
                    this.notificationAlert(response);
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })



        },

        addressUpdate(){
            this.btnDisabled = true;
            var data = {
                'id':this.user_id,
                'per_a_line1': this.permanentAddressLine1,
                'per_a_line2' : this.permanentAddressLine2,
                'per_city': this.permanentCitySelect,
                'per_province' : this.permanentProvinceSelect,
                'per_country' : this.permanentCountrySelect,
                'per_post_code': this.permanentAddressPostCode,
                'same_address': this.address_same,
                'pre_a_line1': this.presentAddressLine1,
                'pre_a_line2' : this.presentAddressLine2,
                'pre_city': this.presentCitySelect,
                'pre_province' : this.presentProvinceSelect,
                'pre_country' : this.presentCountrySelect,
                'pre_post_code': this.presentAddressPostCode,

            }
            axios.post('/api/profile/address-update',data)
                .then(response => {
                    this.addressEdit = !this.addressEdit;
                    this.notificationAlert(response);
                    this.fetchGeneralInfo()
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
        },

        getAddressData(data,type){
            var id = data;
            switch (type) {
                case 'province':
                    axios.get(`/api/profile/get-province-data/${id}`)
                        .then(response => {

                            this.ProvinceData = response.data.province;
                        })
                        .catch(error => {
                            this.notificationAlert(error.response);
                        })

                    break;
                case 'city':
                    axios.get(`/api/profile/get-city-data/${id}`)
                        .then(response => {

                            this.CityData = response.data.city;
                        })
                        .catch(error => {
                            this.notificationAlert(error.response);
                        })
                    break;
                case 'province2':
                    axios.get(`/api/profile/get-province-data/${id}`)
                        .then(response => {

                            this.ProvinceData2 = response.data.province;
                        })
                        .catch(error => {
                            this.notificationAlert(error.response);
                        })

                    break;
                case 'city2':
                    axios.get(`/api/profile/get-city-data/${id}`)
                        .then(response => {

                            this.CityData2 = response.data.city;
                        })
                        .catch(error => {
                            this.notificationAlert(error.response);
                        })
                    break;

            }
        },

    },

    mounted() {
        this.fetchGeneralInfo();
    },
    created() {

    },
}
</script>
<style lang="scss">
    #avatar-col {
        width: 10rem;
    }

    #gen-info-view {
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


    @media screen and (min-width:1201px) and (max-width:1211px),
    only screen and (min-width:636px) and (max-width:991px) {
        #account-info-col-1 {
            width: calc(100% - 12rem) !important;
        }
        #account-info-col-2 {
            width: calc(100% - 12rem) !important;
        }

    }

</style>
