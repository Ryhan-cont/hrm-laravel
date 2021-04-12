<template>
  <div>
    <vx-card title="">
      <div class="flex" style="border: 1px solid #f0f0f0">
        <div class="" style="width: 30%">
          <div class="group-head">
            <div class="pb-2 mb-2 flex" style="border-bottom: 1px solid rgba(0, 0, 0, 0.05)" >
                <div class="flex-auto pt-1">Groups</div>
                <div class="pl-1">
                    <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="manageWorkGroup('create')"></vs-button>
                </div>
            </div>
            <div class="flex">
              <div class="flex-auto">
                <vs-input size="small" type="text" class="w-full" v-model="findGroup" />
              </div>
            </div>
          </div>
          <div>
            <div v-for="(item, index) in filteredGroups" :key="index" class="flex p-3 m-1 cursor-pointer hover:bg-gray-100 overflow-hidden" :style=" item.activeBtn == true ? 'color:#511bc4; border:1px solid rgb(81, 27, 196,.1); background-color:#fcfaff' : 'border:1px solid rgba(0,0,0,.04)' " @click="setGroupData(item, index)" >
              <div class="flex-auto" style="padding: 4px 0px">{{ item.name }}</div>
              <div class="flex" v-if="item.activeBtn">
                <div class="pl-1">
                    <vs-button size="small" icon-pack="feather" icon="icon-edit-2" @click="manageWorkGroup('update')" ></vs-button>
                </div>
                <div class="pl-1">
                    <vs-button size="small" icon-pack="feather" icon="icon-x" color="danger"
                               @click="actionConfirm({id: item.id, group_name: item.name}, deleteGroup, `delete ${item.name}`)">
                    </vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="" style="width: 70%; border-left: 1px solid #f0f0f0">
          <div class="flex" v-if="groupSelectedName != null">
              <div class="p-3 m-1 flex-auto font-bold">{{groupSelectedName}}</div>
              <div class="p-3 m-1">
                  <vs-button size="small" @click="manageWorkGroupItem('create')" icon-pack="feather" :disabled="btnDisabled" icon="icon-users">Add </vs-button>
              </div>
          </div>
          <div>
            <div v-for="(item, index) in workGroupUserItem" :key="index" class="p-3 bg-gray-50 m-1 flex">
                <div class="flex-auto">{{item.full_name}}</div>
                <div>
                    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                                  @click="actionConfirm({id: item.id, full_name: item.full_name, group_name: groupSelectedName},
                                  removeMember, `remove ${item.full_name} from ${groupSelectedName}`)" />
                </div>
            </div>

          </div>

        </div>
      </div>
    </vx-card>
    <vs-popup :title="workGroupModalName" :active.sync="workGroupModal">
      <div>
        <div>
            <vs-input label="Name" class="w-full pt-3" v-model="workGroupName" />
            <validate-data rules="required" :value="workGroupName" name="name" altName="name" />
        </div>
        <div class="mt-6 flex">
            <div class="flex-auto"></div>
            <div v-if="workGroupModalSaveType == 'create'">
                <vs-button variant="success" @click="workGroup('create')" :disabled="btnDisabled" >Save</vs-button>
            </div>
            <div v-if="workGroupModalSaveType == 'update'">
                <vs-button variant="success" @click="workGroup('update')" :disabled="btnDisabled" >Update</vs-button>
            </div>
        </div>
      </div>
    </vs-popup>
    <vs-popup :title="workGroupItemModalName" :active.sync="workGroupItemModal">
      <div>
        <div class="overflow-hidden">
<!--            <vs-select v-model="selectedUser" class="w-full" label="Employees" autocomplete>
                <vs-select-item :key="index" :value="item.user_id" :text="`${item.full_name} (${item.emp_id})`" v-for="(item, index) in filteredUserList" />
            </vs-select>
            <validate-data :value="selectedUser" name="selectedUser" altName="user" />-->
            <vs-select placeholder="Add employee to group" multiple autocomplete class="w-full" label="Employees" v-model="selected_users" >
                <vs-select-item :key="index" :value="item.user_id" :text="`${item.full_name} (${item.emp_id})`" v-for="(item,index) in filteredUserList" />
            </vs-select>
        </div>
      </div>
      <div class="mt-6 flex">
        <div class="flex-auto"></div>
        <div v-if="workGroupItemModalSaveType == 'create'">
            <vs-button variant="success" @click="workGroupItem('create')" :disabled="btnDisabled" > Add </vs-button>
        </div>
        <div v-if="workGroupItemModalSaveType == 'update'">
            <vs-button variant="success" @click="workGroupItem()" :disabled="btnDisabled" > Update </vs-button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            selected_users: [],
            workGroupModal: false,
            workGroupModalName: null,
            workGroupName: null,
            workGroupModalSaveType: null,


            groupList: [],
            groupSelectedId: null,
            groupSelectedName: null,


            findGroup: "",

            workGroupItemModal: false,
            workGroupItemModalName: null,
            workGroupItemName: null,
            workGroupItemModalSaveType: null,

            workGroupUserItem: [],

            userListLoaded: false,
            userList: [],
            selectedUser: null,
            selectedUserId: null,

        };
    },
    created() {
        this.loadData();
    },

    mounted() {
    },

    methods: {
        async loadData(select = null) {
            try {
                var req = await axios.get("/api/work-group/list");
                this.groupList = req.data.data;
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
        },

        manageWorkGroup(type) {
            if (type == 'create') {
                this.workGroupModal = true;
                this.workGroupModalName = 'Create New Workgroup';
                this.workGroupModalSaveType = type;
                this.workGroupName = null;
                this.resetError();
            }
            if (type == 'update') {
                this.workGroupModal = true;
                this.workGroupModalName = 'Edit Workgroup';
                this.workGroupModalSaveType = type;
                this.workGroupName = this.groupSelectedName;
            }
        },

        async workGroup(type) {
            this.btnDisabled = true;
            var data = {
                name: this.workGroupName,
            }
            try {
                if (type == 'create') {
                    var req = await axios.post("/api/work-group/create/group", data);
                    if (req) {
                        this.notificationAlert(req);
                    }
                }
                if (type == 'update') {
                    var req = await axios.put("/api/work-group/update/group/" + this.groupSelectedId, data);
                    if (req) {
                        this.notificationAlert(req);
                    }
                }
                this.workGroupModal = false;
                this.loadData();
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
        },

        async setGroupData(item, index) {

            this.groupList.map(groupItem => {
                groupItem.activeBtn = false;
                return groupItem;
            })

            this.groupList[index].activeBtn = true;

            this.groupSelectedId = item.id;
            this.groupSelectedName = item.name;
            this.loadGroupData();

        },

        async loadGroupData() {
            try {
                var req = await axios.get("/api/work-group/items/" + this.groupSelectedId);
                this.workGroupUserItem = req.data.data;
                console.log(this.workGroupUserItem);
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
        },

        async loadUserList() {
            if (this.userListLoaded == false) {
                try {
                    var req = await axios.get("/api/work-group/list/users");
                    this.userList = req.data.data;
                    this.userListLoaded = true;
                } catch (err) {
                    if (err.response) {
                        this.notificationAlert(err.response);
                    } else {
                        console.log(err);
                    }
                }
            }
        },

        manageWorkGroupItem(type, id = null) {
            if (type == 'create') {
                this.workGroupItemModal = true;
                this.workGroupItemModalName = 'Add Employee to Work Group';
                this.workGroupItemModalSaveType = type;
                this.loadUserList();
                this.selectedUser = null;
                this.resetError();
            }
        },

        async workGroupItem(type) {
            this.btnDisabled = true;
            try {
                if (type == 'create') {
                        var data = {
                            user_id: this.selected_users,
                            parent_id: this.groupSelectedId
                        }
                        var req = await axios.post("/api/work-group/create/item", data);
                        if (req) {
                            //this.notificationAlert(req);
                            this.notificationAlert(`User(s) has been added to ${this.groupSelectedName}`, "Add Member", "success");
                            this.loadGroupData();
                            this.selectedUser = null;
                        }

                }
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response);
                } else {
                    console.log(err);
                }
            }
        },

        /**
         * Delete Work group
         * ***************************/
        deleteGroup(params){
            this.$http.delete(`/api/work-group/delete/group/${params.id}`)
                .then(response => {
                    if (response.status === 200) {
                        this.notificationAlert(`${params.group_name} has been deleted`, "Delete Group", "success");
                        this.loadData();
                    }
                }).catch(err => {
                this.notificationAlert(err.response)
            })
        },

        /**
         * Remove member from the group
         * ***************************/
        removeMember(params){
            this.$http.delete(`/api/work-group/delete/item/${params.id}`)
                .then(response => {
                    if (response.status === 200) {
                        this.notificationAlert(`${params.full_name} has been removed from ${params.group_name}`, "Remove Member", "success");
                        this.loadGroupData();
                    }

                }).catch(err => {
                this.notificationAlert(err.response)
            })
        },

    },
    computed: {
        filteredGroups() {
            let filter = new RegExp(this.findGroup, "i");
            return this.groupList.filter((el) => el.name.match(filter));
        },
        filteredUserList() {
            return this.userList.filter(item => {
                //return _.find(this.workGroupUserItem, {user_id:item.user_id}) == undefined
                return this.workGroupUserItem.find(addedUser => {
                    return addedUser.user_id == item.user_id
                }) == undefined
            })
        }

    },
};
</script>

<style scoped>
.group-head {
  padding: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
}
</style>
