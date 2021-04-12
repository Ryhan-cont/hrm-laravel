<template>
    <vx-card title="">
        <div class="flex">
            <div class="pt-3" style="min-height:300px; width: 100%">
                <vs-table stripe :data="TypeData">
                    <template slot="thead">
                        <vs-th>Day</vs-th>
                        <vs-th>Working Hour</vs-th>
                        <vs-th>Over Time (Hour)</vs-th>
                        <vs-th>Working Type</vs-th>
                    </template>
                    <template>

                        <vs-tr>
                            <vs-td>Sunday</vs-td>
                            <vs-td>
                                <vs-input placeholder="Working Hour" type="number" min="0" v-model="sun.w_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-input placeholder="Over Time (Hour)" type="number" min="0" v-model="sun.o_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-select v-model="sun.w_type" class="w-full" placeholder="Working Type" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in TypeData"/>
                                </vs-select>
                            </vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-td>Monday</vs-td>
                            <vs-td>
                                <vs-input placeholder="Working Hour" type="number" min="0" v-model="mon.w_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-input placeholder="Over Time (Hour)" type="number" min="0" v-model="mon.o_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-select v-model="mon.w_type" class="w-full" placeholder="Working Type" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in TypeData"/>
                                </vs-select>
                            </vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-td>Tuesday</vs-td>
                            <vs-td>
                                <vs-input placeholder="Working Hour" type="number" min="0" v-model="tue.w_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-input placeholder="Over Time (Hour)" type="number" min="0" v-model="tue.o_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-select v-model="tue.w_type" class="w-full" placeholder="Working Type" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in TypeData"/>
                                </vs-select>
                            </vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-td>Wednesday</vs-td>
                            <vs-td>
                                <vs-input placeholder="Working Hour" type="number" min="0" v-model="wed.w_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-input placeholder="Over Time (Hour)" type="number" min="0" v-model="wed.o_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-select v-model="wed.w_type" class="w-full" placeholder="Working Type" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in TypeData"/>
                                </vs-select>
                            </vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-td>Thursday</vs-td>
                            <vs-td>
                                <vs-input placeholder="Working Hour" type="number" min="0" v-model="thu.w_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-input placeholder="Over Time (Hour)" type="number" min="0" v-model="thu.o_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-select v-model="thu.w_type" class="w-full" placeholder="Working Type" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in TypeData"/>
                                </vs-select>
                            </vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-td>Friday</vs-td>
                            <vs-td>
                                <vs-input placeholder="Working Hour" type="number" min="0" v-model="fri.w_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-input placeholder="Over Time (Hour)" type="number" min="0" v-model="fri.o_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-select v-model="fri.w_type" class="w-full" placeholder="Working Type" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in TypeData"/>
                                </vs-select>
                            </vs-td>
                        </vs-tr>
                        <vs-tr>
                            <vs-td>Saturday</vs-td>
                            <vs-td>
                                <vs-input placeholder="Working Hour" type="number" min="0" v-model="sat.w_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-input placeholder="Over Time (Hour)" type="number" min="0" v-model="sat.o_h"/>
                            </vs-td>
                            <vs-td>
                                <vs-select v-model="sat.w_type" class="w-full" placeholder="Working Type" autocomplete>
                                    <vs-select-item :key="index" :value="item.value" :text="item.label"
                                                    v-for="(item,index) in TypeData"/>
                                </vs-select>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>


                <div class="flex-auto pt-6"></div>
                <div align="right">
                    <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="createRequest">Save</vs-button>
                </div>
            </div>
        </div>
    </vx-card>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import {quillEditor} from 'vue-quill-editor'

    export default {
        components: {
            quillEditor,
        },
        data() {
            return {
                TypeData: [],
                sat: {
                    w_h: null,
                    o_h: null,
                    w_type: null,
                    id: null,
                },
                sun: {
                    w_h: null,
                    o_h: null,
                    w_type: null,
                    id: null,
                },
                mon: {
                    w_h: null,
                    o_h: null,
                    w_type: null,
                    id: null,
                },
                tue: {
                    w_h: null,
                    o_h: null,
                    w_type: null,
                    id: null,
                },
                wed: {
                    w_h: null,
                    o_h: null,
                    w_type: null,
                    id: null,
                },
                thu: {
                    w_h: null,
                    o_h: null,
                    w_type: null,
                    id: null,
                },
                fri: {
                    w_h: null,
                    o_h: null,
                    w_type: null,
                    id: null,
                },
            }
        },
        mounted() {
            this.fetchData();
        },
        computed: {},

        methods: {
            fetchData() {
                axios.get('/api/ot-setting/data')
                    .then(response => {
                        this.sat = response.data.sat;
                        this.sun = response.data.sun;
                        this.mon = response.data.mon;
                        this.tue = response.data.tue;
                        this.wed = response.data.wed;
                        this.thu = response.data.thu;
                        this.fri = response.data.fri;
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            createRequest() {
                let data = {
                    sat: this.sat,
                    sun: this.sun,
                    mon: this.mon,
                    tue: this.tue,
                    wed: this.wed,
                    thu: this.thu,
                    fri: this.fri,
                }
                console.log(data)
                /* let formData = new FormData();
                 formData.append('data', JSON.stringify(data));*/
                axios.post('/api/ot-setting/ot-setting', data)
                    .then(response => {
                        this.notificationAlert(response);
                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
            fetchOrgTypes() {
                axios.get(`/api/data/dropdown-items/${this.$constants.CONST_OT_TYPES}`)
                    .then(response => {

                        this.TypeData = response.data.items;


                    })
                    .catch(err => {
                        this.notificationAlert(err.response);
                    });
            },
        },
        created() {
            this.fetchOrgTypes();
        }
    }
</script>

<style lang="scss">
    .ql-editor {
        min-height: 200px;
    }


    @media print {
        .invoice-page {
            * {
                visibility: hidden;
            }

            #content-area {
                margin: 0 !important;
            }

            .vs-con-table {
                .vs-con-tbody {
                    overflow: hidden !important;
                }
            }

            #invoice-container,
            #invoice-container * {
                visibility: visible;
            }

            #invoice-container {
                position: absolute;
                left: 0;
                top: 0;
                box-shadow: none;
            }
        }
    }

    @page {
        size: auto;
    }
</style>
