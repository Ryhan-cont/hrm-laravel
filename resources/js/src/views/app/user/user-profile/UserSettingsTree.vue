<template>
    <div id="org-tree-view">
          <div id="tree-data" >
              <vx-card title="Organization Tree" class="mb-base">
                  <div class="vx-row">

                      <!-- Information - Col 1 -->
                      <div class="vx-col flex-1" id="account-info-col-1">
                          <div>
                              <validate-data rules="required" :value="selectedTree" :name="'selectedTree'"
                                             altName="organization tree"/>
                              <v-jstree :data="organizationTree" size="large" show-checkbox
                                        @item-click="treeItemClick"></v-jstree>
                          </div>
                          <!--{{organizationTree}}-->
                      </div>
                      <div class="vx-col w-full" v-if="this.$store.state.AppActiveUser.isAdmin">
                          <div class="float-right pb-2"><vs-button size="small" @click=" UpdateOrg()">Update</vs-button></div>
                      </div>
                  </div>

              </vx-card>
          </div>
    </div>
</template>

<script>
    import VJstree from 'vue-jstree';
export default {
    components: {
        VJstree,
    },
    data() {
        return {
            //Organization Tree
            selectedTree: [],
            organizationTree: {
                disabled:true,
            },
        }
    },
    computed: {

    },
    methods: {

        fetchTreeInfo() {
            let params ={
                id:this.$route.params.id,
            };

            axios.get('/api/organization-tree/data', {params})
                .then(response => {
                    var organizationList = response.data;
                    if(organizationList.constructor === Array){
                        this.organizationTree = organizationList;

                    }else{
                        this.organizationTree = [];
                    }
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                });
        },
        treeItemClick(node, item, e) {
            this.selectedTree = item;
            var organizationTree = _.cloneDeep(this.organizationTree)
            this.organizationTree = organizationTree;
        },
        UpdateOrg(){
          let info ={
              id:this.$route.params.id,
              organization_id:this.selectedTree.organizationid,
          }
            axios.post('/api/profile/profile-tree-update', info)
                .then(response => {
                    this.notificationAlert(response);

                })
                .catch(error => {
                    this.notificationAlert(error.response);
                })
        },


    },

    mounted() {
        this.fetchTreeInfo();
    },
    created() {

    },
}
</script>
<style lang="scss">
    #avatar-col {
        width: 10rem;
    }

    #org-tree-view {
        table {
            td {
                vertical-align: top;
                min-width: 100px;
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

    }

</style>
