<template>
    <div>
        <vx-card>
            <div class="my-6">
                <h5 class="mb-2">Request ID # <span class="text-primary">{{ this.$route.query.request_id }}</span></h5>
                <vs-divider/>
                <div v-if="!data.edit_info">
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th>Category Name</vs-th>
                            <vs-th>Subcategory Name</vs-th>
                            <vs-th>Item</vs-th>
                            <vs-th>Qty.</vs-th>
                        </vs-tr>
                        <vs-tr :key="index" v-for="(item,index) in req_info.infos">
                            <vs-td>{{item.category}}</vs-td>
                            <vs-td>{{item.subcategory}}</vs-td>
                            <vs-td>{{item.item}}</vs-td>
                            <vs-td>{{item.quantity}}</vs-td>
                        </vs-tr>
                    </vs-table>
                    <br>
                    <vs-table stripe noDataText :data="tableData">
                        <vs-tr>
                            <vs-th style="width: 20%;">Need by Date</vs-th>
                            <vs-td>{{req_info.need_by_formatted}}</vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-th style="width: 20%;">Remarks</vs-th>
                            <vs-td>{{req_info.remarks}}</vs-td>
                        </vs-tr>
                    </vs-table>
                </div>
                <div v-else>
                    <vs-input type="hidden" v-model="st_id"/>
                    <div class="vx-row" v-for="(item,index) in stationary" :key="index">
                        <div class="vx-col md:w-3/12 w-full overflow-hidden">
                            <vs-select v-model="item.category_id" class="w-full" placeholder="Category" label="Category"
                                       autocomplete @input="catSelected(index)">
                                <vs-select-item :key="index" :value="item.id" :text="item.name"
                                                v-for="(item,index) in categoryData"/>
                            </vs-select>
                        </div>
                        <div class="vx-col md:w-3/12 w-full overflow-hidden">
                            <vs-select v-model="item.subcategory_id" class="w-full" placeholder="Sub Category"
                                       label="Sub Category"
                                       autocomplete @input="subCatSelected(index)">
                                <vs-select-item :key="index" :value="item.id" :text="item.name"
                                                v-for="(item,index) in item.subCategoryData"/>
                            </vs-select>
                        </div>
                        <div class="vx-col md:w-3/12 w-full overflow-hidden">
                            <vs-select v-model="item.item_id" class="w-full" placeholder="Item" label="Item"
                                       autocomplete>
                                <vs-select-item :key="index" :value="item.id" :text="item.name"
                                                v-for="(item,index) in item.itemData"/>
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
                                   @click="assetManager('delete',index,item.st_item_id)">
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
                    <div class="flex">
                        <div class="flex-auto"></div>
                        <div>
                            <vs-button size="small" class="ml-auto mt-2" @click="updateRequest()">Send</vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </vx-card>
    </div>
</template>

<script>
    export default {
        name: "read",
        props: {
            data: {
                required: true,

            },
        },

        data() {
            return {

                categoryData: [],
                requireDate: new Date(),
                stationary: [],
                comment: null,
                st_id: null,

                quantity: null,
                delete_ids: [],
                req_info: {},
                tableData: [],
                req_id: this.$route.query.id,
                ref_id: this.$route.query.ref_id,

            }
        },
        created() {
            this.fetchRequest();
        },
        mounted() {
            this.loadData();
            this.assetManager('add');
        },
        methods: {
            fetchRequest() {

                axios.get(`/api/stationary-requisition/show/${this.$route.query.id}`)
                    .then(response => {
                        this.req_info = response.data;

                        if (this.data.edit_info) {
                            this.stationary = response.data.infos;
                            this.requireDate = new Date(response.data.need_by);
                            this.comment = response.data.remarks;
                            this.st_id = response.data.st_id;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            loadData() {
                axios.get('/api/stationary-requisition/data')
                    .then(response => {
                        this.categoryData = response.data.categoryData;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            assetManager(type, index = null, id = null) {
                let data = {
                    category_id: null,
                    subcategory_id: null,
                    item_id: null,
                    quantity: null,
                    subCategoryData: [],
                    itemData: [],
                }
                if (type == 'add') {
                    this.stationary.push(data);
                }

                if (type == 'delete') {
                    if (index > -1) {
                        if (id !== null) {
                            this.delete_ids.push(id);
                        }
                        this.stationary.splice(index, 1);
                    }
                }
            },
            catSelected(index) {
                this.stationary[index].subcategory_id = null;
                this.stationary[index].item_id = null;
                let data = {
                    parent_id: this.stationary[index].category_id,
                    dropdown_id: this.$constants.CONST_STATIONARY_ITEM,
                }
                axios.post('/api/stationary-requisition/category-list', data)
                    .then(response => {
                        this.stationary[index].subCategoryData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });

            },
            subCatSelected(index) {
                this.stationary[index].categoryItem = null;
                let data = {
                    parent_id: this.stationary[index].subcategory_id,
                    dropdown_id: this.$constants.CONST_STATIONARY_ITEM,
                }
                axios.post('/api/stationary-requisition/category-list', data)
                    .then(response => {
                        this.stationary[index].itemData = response.data.items;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },

            updateRequest() {
                let data = {
                    module_id: this.$store.state.moduleId,
                    ref_id: this.ref_id,
                    info: this.stationary,
                    on_date: this.requireDate,
                    remarks: this.comment,
                    st_id: this.st_id,
                    status: 0,
                    delete_ids: this.delete_ids,
                }
                this.$http.put(`/api/stationary-requisition/update/${this.req_id}`, data)
                    .then(response => {
                        this.notificationAlert(response)
                        this.$router.push('/dashboard');
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            }

        }
    }
</script>

<style lang="scss">

</style>
