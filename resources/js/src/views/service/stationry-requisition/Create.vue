<template>
    <div>
        <vx-card>
            <div>
                <div class="vx-row" v-for="(item,index) in stationary" :key="index">
                    <div class="vx-col md:w-3/12 w-full overflow-hidden">
                        <vs-select v-model="item.category" class="w-full" placeholder="Category" label="Category"
                                   autocomplete @input="catSelected(index)">
                            <vs-select-item :key="index" :value="item.id" :text="item.name"
                                            v-for="(item,index) in categoryData"/>
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-3/12 w-full overflow-hidden">
                        <vs-select v-model="item.subCategory" class="w-full" placeholder="Sub Category"
                                   label="Sub Category"
                                   autocomplete @input="subCatSelected(index)">
                            <vs-select-item :key="index" :value="item.id" :text="item.name"
                                            v-for="(item,index) in item.subCetegoryData"/>
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-3/12 w-full overflow-hidden">
                        <vs-select v-model="item.categoryItem" class="w-full" placeholder="Item" label="Item"
                                   autocomplete>
                            <vs-select-item :key="index" :value="item.id" :text="item.name"
                                            v-for="(item,index) in item.categoryItemData"/>
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-2/12 w-full overflow-hidden">
                        <vs-input class="w-full" label="Quantity" min="1" type="number" v-model="item.quantity"/>
                    </div>
                    <div class="vx-col md:w-1/12 w-full pt-6">
                <span class="centerx">
                    <vs-tooltip text="Remove">
                        <vs-button size="large" color="danger" type="flat" icon-pack="feather" icon="icon-x"
                                   class="flex-auto mr-3"
                                   v-show="index || ( !index && stationary.length > 1)"
                                   @click="assetManager('delete',index)">
                        </vs-button>
                        </vs-tooltip>
                    <vs-tooltip text="Add New">
                        <vs-button size="large" color="primary" type="flat" icon-pack="feather" icon="icon-plus"
                                   class="flex-auto"
                                   @click="assetManager('add')"
                                   v-show="index === stationary.length-1">
                        </vs-button>
                    </vs-tooltip>
                </span>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-4/12 w-full">
                        <v-date-picker v-model="requireDate" color="purple" :masks="{input: 'DD-MM-YYYY'}"
                                       :min-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <vs-input icon-pack="feather" icon="icon icon-calendar" class="w-full mt-4"
                                          label="Need by Date" :value="inputValue" v-on="inputEvents"/>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="pt-6">
                    <vs-textarea v-model="comment" label="Remarks"/>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/4">
                        <vs-checkbox v-model="is_for_other" size="small">Request for Other</vs-checkbox>
                    </div>
                </div>
                <div class="vx-row" v-if="is_for_other">
                    <div class="vx-col md:w-1/3 pt-3">
                        <vs-select class="w-full" v-model="request_for" autocomplete label="Request for" placeholder="Select an employee">
                            <vs-select-item v-for="(item, index) in employees" :key="index" :text="`${item.full_name} (${item.emp_id})`" :value="item.user_id"/>
                        </vs-select>
                    </div>
                </div>

                <div class="flex">
                    <div class="flex-auto"></div>
                    <div>
                        <vs-button size="small" class="ml-auto mt-2" icon="send" :disabled="btnDisabled"
                                   @click="createRequest()">Send
                        </vs-button>
                    </div>
                </div>
            </div>

        </vx-card>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                is_for_other: false,
                employees: [],
                request_for: null,


                ref_id: null,
                categoryData: [],
                requireDate: '',
                stationary: [],
                comment: null,


                quantity: null,
            }
        },
        mounted() {
            this.loadData();
            this.assetManager('add');
        },
        methods: {
            loadData() {
                let data = {
                    parent_id: 0,
                    dropdown_id: this.$constants.CONST_STATIONARY_ITEM,
                }
                axios.post('/api/stationary-requisition/category-list', data)
                    .then(response => {
                        this.categoryData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });

            },
            assetManager(type, index = null) {
                let data = {

                    category: null,
                    subCategory: null,
                    subCetegoryData: [],
                    categoryItem: null,
                    categoryItemData: [],
                    quantity: null,
                }
                if (type == 'add') {
                    this.stationary.push(data);
                }

                if (type == 'delete') {
                    if (index > -1) {
                        this.stationary.splice(index, 1);
                    }
                }
            },
            catSelected(index) {
                this.stationary[index].subCategory = null;
                this.stationary[index].categoryItem = null;
                let data = {
                    parent_id: this.stationary[index].category,
                    dropdown_id: this.$constants.CONST_STATIONARY_ITEM,
                }
                axios.post('/api/stationary-requisition/category-list', data)
                    .then(response => {
                        this.stationary[index].subCetegoryData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });

            },
            subCatSelected(index) {
                this.stationary[index].categoryItem = null;
                let data = {
                    parent_id: this.stationary[index].subCategory,
                    dropdown_id: this.$constants.CONST_STATIONARY_ITEM,
                }
                axios.post('/api/stationary-requisition/category-list', data)
                    .then(response => {
                        this.stationary[index].categoryItemData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            createRequest() {
                let data = {
                    module_id: this.$store.state.moduleId,
                    ref_id: this.ref_id,
                    info: this.stationary,
                    on_date: this.requireDate,
                    remarks: this.comment,
                    status: 0,
                    is_for_other: this.is_for_other,
                    request_for: this.request_for
                }
                axios.post('/api/stationary-requisition/create', data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            fetchUserList() {
                axios.get("/api/work-group/list/users")
                    .then(response => {
                        this.employees = response.data.data;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response)
                    });
            },

        },
        watch:{
            "is_for_other": function (){
                if (this.is_for_other) {
                    this.fetchUserList();
                }
            }
        }
    }
</script>

<style scoped>

</style>
