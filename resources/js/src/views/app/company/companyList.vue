<template>
  <div>
      <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" actionButtons @refresh="resetColFilters" @remove="resetColFilters">
          <div class="vx-row">
              <div class="vx-col md:w-3/12 sm:w-1/2 w-full">
                  <label class="text-sm opacity-75">Status Type</label>
                  <v-select :options="companyStatus" :clearable="false" v-model="statusFilter"
                            class="mb-4 md:mb-0 mt-4"
                            @input="fetchCompanies"
                  />
              </div>
          </div>
      </vx-card>
      <vx-card>
        <div class="flex">
          <div class="flex-auto"></div>
          <div><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="$router.push({path: '/company-create',})">Add New</vs-button></div>
        </div>
        <div class="pt-1" style="min-height:300px">
          <vs-table max-items="10" stripe search pagination :data="companyData">
            <template slot="thead">
              <vs-th>Logo</vs-th>
              <vs-th sort-key="name">Name</vs-th>
              <vs-th>Package</vs-th>
              <vs-th>Email</vs-th>
              <vs-th>Phone</vs-th>
              <vs-th>Website</vs-th>

              <vs-th class="w-10 text-center">Action</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                <vs-td :data="tr.company_logo">
                  <div class="flex">
                      <!--<vs-avatar size="50px" :src="tr.company_logo" />-->
                      <img style="width:80px" :src="tr.company_logo" alt="logo">
                  </div>
                </vs-td>

                <vs-td :data="tr.name">
                  {{ tr.name }}
                </vs-td>

                <vs-td :data="tr.package_name">
                  {{ tr.package_name }}
                </vs-td>

                <vs-td :data="tr.email">
                  {{ tr.email }}
                </vs-td>

                <vs-td :data="tr.phone">
                  {{ tr.phone }}
                </vs-td>

                <vs-td :data="tr.website">
                  {{ tr.website }}
                </vs-td>

                <vs-td class="w-10 ">
                 <!-- <div class="flex">
                    <div class="flex-auto cursor-pointer" align="center" @click="$router.push({path: '/company-view/'+tr.id})">
                        <i class="material-icons f-16 icon align">edit</i>
                    </div>
                  </div>-->
                    <vs-dropdown vs-trigger-click>
                        <vs-button color="dark" icon="more_vert" type="flat" ></vs-button>
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click="$router.push({path: '/company-view/'+tr.id})">
                                <span class="flex items-center">
                                    <vs-icon class="mr-2" icon="preview"></vs-icon>
                                    <span>View Company</span>
                                </span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </vs-td>

              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vx-card>
  </div>
</template>

<script>
    import vSelect from 'vue-select'

    export default {
        components: {vSelect},
        data() {
            return {
                companyData: [],
                inputModalSt: false,
                modalTitle: null,

                modalType: null,

                name: '',
                logo: '',
                id: '',
                address: '',
                phone: '',
                website: '',
                email: '',

                companyStatus: [{label: 'Active', value: 1}, {label: 'Inactive', value: 0}, {label: 'All', value: -1}],
                statusFilter: {label: 'Active', value: 1},
            }
        },
        mounted() {
            this.fetchCompanies();
        },

        methods: {
            async fetchCompanies() {
                try {
                    let filterParams = {
                        'is_active': this.statusFilter.value,
                    };
                    this.$vs.loading({container: '#div-with-loading', scale: 0.6});
                    var req = await axios.get(`/api/company-list/data`, {params: filterParams})
                    this.companyData = req.data;
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                } catch (err) {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                    this.notificationAlert(err.response)
                }
            },
            moduleData(data) {

                return data;
            },
            deleteData(Deldata) {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Confirm Delete',
                    text: `You are about to delete`,
                    parameters: Deldata,
                    accept: this.deleteRecord,
                    acceptText: 'Delete'
                })
            },
            deleteRecord(Deldata) {
                var data = {
                    id: Deldata.id,
                }
                axios.post('api/company-list/delete', data)
                    .then(response => {
                        this.notificationAlert(response);
                        this.fetchCompanies();

                    })
                    .catch(e => {
                        this.notificationAlert(e.response);
                    })

            },

            resetColFilters() {
                //Reset filters
                this.statusFilter = {label: 'Active', value: 1};
                this.fetchCompanies();
                this.$refs.filterCard.removeRefreshAnimation();
            },
        }
    }
</script>
<style lang="scss">
    .vc-popover-content-wrapper{
        z-index:99999 !important;
    }
    .con-vs-dropdown--menu{
        width: 15%
    }
</style>
