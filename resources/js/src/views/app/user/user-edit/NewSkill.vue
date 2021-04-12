<template>
    <div class="pt-3 mt-8" style="border-top:1px solid #f2f2f2">
        <div class="vx-row pt-3" v-if="addNew">
            <div class="vx-col md:w-1/2 w-full">
                <vs-select v-model="skill.skillsname" class="w-full" placeholder="skill name" label="* skill name">
                    <vs-select-item :key="index" :value="item.id" :text="item.value" v-for="(item,index) in skillNameData" />
                </vs-select>
                <validate-data rules="required" :value="skill.skillsname" :name="'skillsname'" altName="skill name" />
            </div>
            <div class="vx-col md:w-1/2 w-full">
                <vs-select v-model="skill.skillsscale" class="w-full" placeholder="skill scale" label="* skill scale">
                    <vs-select-item :key="index" :value="item.id" :text="item.value" v-for="(item,index) in skillScaleData" />
                </vs-select>
                <validate-data rules="required" :value="skill.skillsscale" :name="'skillsscale'" altName="skill scale" />
            </div>
        </div>
        <div class="w-full flex" align="right">
            <div class="flex-auto"></div>
            <div v-if="addNew"><vs-button size="small" class="ml-auto mt-2" v-if="addNew" @click="addNew = false" color="danger">Cancel</vs-button></div>
            <div class="pl-2" v-if="addNew"><vs-button size="small" :disabled='btnDisabled' class="mt-2" @click="saveData()">Save</vs-button></div>
            <div class="pl-2" v-if="!addNew"><vs-button size="small" class="ml-auto mt-2" @click="addNew = true">Add new</vs-button></div>
        </div>
    </div>

</template>


<script>
    export default {
        name: 'new-skill',
        components: {

        },
        props: {
            reqData: {
                default: {},
            },
        },
        data() {
            return {
                addNew:false,

                userId:null,
                skillNameOption:[],
                skillNameData:[],
                skillScaleOption:[],
                skillScaleData:[],

                skill:{
                    skillsname:null,
                    skillsscale:null,
                }
            }
        },
        mounted() {
            if (this.reqData.userData) { this.loadData(); }
        },
        methods: {
            async loadData() {
                this.userId = this.reqData.userData.id;

                this.skillNameOption = this.reqData.skillNameList;
                this.skillNameData = this.reqData.skillNameData;

                this.skillScaleOption = this.reqData.skillScaleList;
                this.skillScaleData = this.reqData.skillScaleData;
            },
            deleteSkill(){

            },
            saveData() {
                this.btnDisabled = true;
                this.skill.userId=this.userId;
                axios.post('/api/user-edit/data/skill-create',this.skill)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                        this.addNew = false;
                        this.editMode = false;
                        this.skill.skillsname =  null;
                        this.skill.skillsscale = null;

                    })
                    .catch(error => {
                        this.errorData = error.response.data.errors;
                        this.notificationAlert(error.response);

                    })

            }
        },
        watch: {
            reqData() {
                this.loadData();
            }

        },
    }
</script>
