<template>
    <div id="skill-view">
        <vs-popup mediumscreen :title="pop_title" class="" :active.sync="popUp" >
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                    <vs-select v-model="selectedSkillName" class="w-full" placeholder="Skill Name" label="Skill Name">
                        <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in skillNames" />
                    </vs-select>
                    <validate-data rules="required" :value="selectedSkillName" :name="'skillsname'" altName="nkill name" />
                </div>
                <div class="vx-col md:w-1/2 w-full">
                    <vs-select v-model="selectedScale" class="w-full" placeholder="Skill Scale" label="Skill Scale">
                        <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in scales" />
                    </vs-select>
                    <validate-data rules="required" :value="selectedScale" :name="'skillsscale'" altName="skill scale" />
                </div>

            </div>

            <div class="vx-row mt-3">

            </div>
            <div v-show="mode.save" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="create()">Save</vs-button>
            </div>
            <div v-show="mode.edit" align="right" class="pt-1">
                <vs-button :disabled='btnDisabled' @click="update()">Update</vs-button>
            </div>
        </vs-popup>
      <div class="vx-col w-full bg-white pt-3">
          <div class="vx-row">
              <div class="vx-col w-1/2">
                  <div class="flex items-end px-3">
                      <feather-icon svgClasses="w-6 h-6" icon="SlidersIcon" class="mr-2" />
                      <span class="font-medium text-lg leading-none">Skill Matrix</span>

                  </div>
              </div>
              <div class="vx-col w-1/2">

                  <div class="float-right pr-3">
                      <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="callPopup('add')"></vs-button>

                  </div>
              </div>
          </div>
          <vs-divider />
      </div>
      <vx-card class="mb-base">
          <div class="vx-row">
              <div class="vx-col w-full ">
              <vs-table stripe :data="skills" >
                  <template slot="thead" >
                      <vs-th sort-key="skill_name" style="width: 50%">Skill Name</vs-th>
                      <vs-th sort-key="skill_scale" style="width: 30%">Skill Scale</vs-th>
                      <vs-th style="width: 20%">Action</vs-th>
                  </template>

                  <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                          <vs-td :data="tr.skill_name">
                              {{ tr.skill_name }}
                          </vs-td>
                          <vs-td :data="tr.skill_scale">
                              {{ tr.skill_scale }}
                          </vs-td>
                          <vs-td class="px-0" :data="tr.skill_action" >
                              <div class="float-right pr-3"><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="actionConfirm(tr, deleteDataProceed, `delete ${tr.skill_name}`)" ></vs-button></div>
                              <div class="float-right pr-3"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="callPopup('edit',tr)"></vs-button></div>
                         </vs-td>

                      </vs-tr>
                  </template>
              </vs-table>
              </div>
          </div>
      </vx-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            skills: [],
            skillNames: [],
            scales:[],

            popUp: false,
            skill_id:null,
            mode:{
                add:true,
                edit:false,
            },
            pop_title: "Add New Skill",



            skillNameOption:[],
            skillNameData:[],
            skillScaleOption:[],
            skillScaleData:[],
            selectedSkillName: '',
            selectedScale: '',

        }
    },

    methods: {
        fetchSkillInfo() {
            axios.get(`/api/profile/skill-matrix/${this.$route.params.id}`)
                .then(response => {
                    //console.log(response);
                    if (response.status === 200) {
                        this.skills = response.data.skills;

                    } else {
                        this.notificationAlert(response);
                    }
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                    console.log(err);
                    this.user_not_found = true
                });
        },
        callPopup(type,data) {
            axios.get(`/api/data/dropdown-items/${this.$constants.CONST_SKILL_NAME}`)
                .then(response => {
                    this.skillNames = response.data.items;

                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
            axios.get(`/api/data/dropdown-items/${this.$constants.CONST_SKILL_SCALE}`)
                .then(response => {
                    this.scales = response.data.items;

                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
            if (type === 'add'){
                this.pop_title= 'New Skill';
                this.mode.save = true;
                this.mode.edit = false;
                this.popUp = !this.popUp;
                this.selectedSkillName = '';
                this. selectedScale = '';


            }
            if(type === 'edit'){
                console.log(data)
                this.pop_title= 'Edit Skill';

                this.selectedSkillName = data.skill_id;
                this. selectedScale = data.scale_id;
                this.skill_id = data.id;
                this.mode.save = false;
                this.mode.edit = true;
                this.popUp = !this.popUp;
                console.log(data)
            }


        },
        create(){
            this.btnDisabled= true;
            var data = {
                'user_id': this.$route.params.id,
                'skill': this.selectedSkillName,
                'scale': this.selectedScale,
            }


            axios.post('/api/profile/skill-create', data)
                .then(response => {
                    this.notificationAlert(response);
                    this.popUp = !this.popUp;
                    this.fetchSkillInfo();
                    this.btnDisabled= false;
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                    this.btnDisabled= false;
                })

        },
        update(){
            this.btnDisabled= true;
            var data = {
                'user_id': this.$route.params.id,
                'skill': this.selectedSkillName,
                'scale': this.selectedScale,
                'skill_id': this.skill_id,
            }

            this.btnDisabled= true;
            axios.post('/api/profile/skill-update', data)
                .then(response => {
                    this.notificationAlert(response);
                    this.popUp = !this.popUp;
                    this.btnDisabled= false;
                    this.fetchSkillInfo();
                })
                .catch(error => {
                    this.btnDisabled= false;
                    this.notificationAlert(error.response);
                })

        },

        deleteDataProceed(Deldata) {

            axios.get(`/api/profile/skill-delete/${Deldata.id}`)
                .then(response => {
                    this.notificationAlert(response);
                    this.fetchSkillInfo();
                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })

        },

    },
    mounted() {

    },
    created() {
        this.fetchSkillInfo();
    },
    computed: {

    }
}
</script>

<style lang="scss">

</style>
