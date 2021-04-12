<template>
    <div>
        <div v-if="!editMode">
            <div class="vx-col w-full flex pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                <div class="flex-auto font-bold">Skill matrix - {{ ser+1 }}</div>
                <div><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteSkill(defItem.id)"></vs-button></div>
                <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="editMode =! editMode"></vs-button></div>
            </div>
            <div class="vx-row pt-3">
                <div class="vx-col md:w-1/2 w-full">
                    <div class="w-full"><span class="font-bold pr-2">Skill name:</span>{{defItem.skillsname}}</div>
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <div class="w-full"><span class="font-bold pr-2">Skill scale:</span>{{defItem.skillsscale}}</div>
                </div>
            </div>

        </div>
        <div v-if="editMode">
            <div class="vx-col w-full flex pt-8 pb-2" style="border-bottom:1px solid #f2f2f2">
                <div class="flex-auto font-bold">Skill matrix - {{ ser+1 }}</div>
                <div><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteSkill()"></vs-button></div>
            </div>
            <div class="vx-row pt-3">
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
                <div><vs-button size="small" class="ml-auto mt-2" @click="editMode = false" color="danger">Cancel</vs-button></div>
                <div class="pl-2"><vs-button size="small" class="ml-auto mt-2" :disabled='btnDisabled' @click="saveData()">Save</vs-button></div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'skill-info',
        components: {

        },
        props: {
            reqData: {
                default: {},
            },
            skill: {
                type: Object,
                default(){return {}}
            },
            ser: {
                default: null,
            }
        },
        data() {
            return {
                editMode:false,
                defItem:{},
                userId:null,
                skillNameOption:[],
                skillNameData:[],
                skillScaleOption:[],
                skillScaleData:[],
            }
        },
        mounted() {
            if (this.reqData.userData) { this.loadData(); }
        },
        methods: {
            async loadData() {
                this.defItem =  _.cloneDeep(this.skill);
                this.userId = this.reqData.userData.id;

                this.skillNameOption = this.reqData.skillNameList;
                this.skillNameData = this.reqData.skillNameData;

                this.skillScaleOption = this.reqData.skillScaleList;
                this.skillScaleData = this.reqData.skillScaleData;

                this.defItem.skillsname =_.filter(this.skillNameData, {id: Number(this.defItem.skillsname)})[0].value;
                this.defItem.skillsscale =_.filter(this.skillScaleData, {id: Number(this.defItem.skillsscale)})[0].value;
            },
            deleteSkill(deldata) {


                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: 'Are you sure, you want to delete this skill?',
                    acceptText:'ok',
                    accept: this.deleteDataProceed,
                    parameters:deldata,
                })
            },
           deleteDataProceed(Deldata){
               var data = {
                   id:Deldata,
               }
                axios.post('/api/user-edit/data/skill-delete',data)
                    .then(response => {
                        this.notificationAlert(response);
                        this.$parent.$parent.$parent.$parent.loadData();
                    })
                    .catch(error => {
                        this.errorData = error.response.data.errors;
                        this.notificationAlert(error.response);

                    })
            },
            saveData() {
                this.btnDisabled = true;
                this.skill.userId=this.userId;
                axios.post('/api/user-edit/data/skill-update',this.skill)
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
        },
        watch: {
            reqData() {
                this.loadData();
            }

        },
    }
</script>
