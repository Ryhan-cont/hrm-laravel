<template>
<div>
  <vx-card title="">
    <div class="flex" style="border:1px solid #f0f0f0">
      <div class="" style="width:30%">
        <div class="dropdown-head">
          <div class="pb-2 mb-2 flex" style="border-bottom:1px solid rgba(0,0,0,.05)">
            <div class="flex-auto pt-1">Dropdowns</div>
            <div class="pl-1" v-if="canModify">
                <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="setDropdownModal('new')"></vs-button>
            </div>
          </div>
          <div class="flex">
            <div class="flex-auto"><vs-input size="small" type="text" class="w-full" v-model="findDropdown" /></div>
          </div>
        </div>
        <div>
          <div v-for="(item, index) in filteredDropdowns" :key="index" class="flex p-3 m-1 cursor-pointer hover:bg-gray-100 overflow-hidden"
               :style="(item.activeBtn == true)?'color:#511bc4; border:1px solid rgb(81, 27, 196,.1); background-color:#fcfaff':'border:1px solid rgba(0,0,0,.04)'" @click="setDropdownData(item,index)">
              <div class="flex-auto" style="padding:4px 0px">{{ item.name }}</div>
              <div class="flex" v-if="item.activeBtn && canModify">
                  <div class="pl-1"><vs-button size="small" icon-pack="feather" icon="icon-edit-2" @click="setDropdownModal('edit')"></vs-button></div>
                  <div class="pl-1"><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteDropdown()"></vs-button></div>
              </div>
          </div>
        </div>
      </div>

      <div class="" style="width:70%; border-left:1px solid #f0f0f0">
        <div v-if="dropdownSelectedType == 'List'">
            <dropdown-list :items="dropdownData"
                           :dropdownName="dropdownSelectedName"
                           :selectedId="dropdownSelectedId"
            />
        </div>
        <div v-if="dropdownSelectedType == 'Tree'">
            <dropdown-tree :categoryData="dropdownData"
                           :dropdownName="dropdownSelectedName"
                           :selectedId="dropdownSelectedId"  />
        </div>
      </div>
    </div>
  </vx-card>

  <vs-popup :title="dropdownModalTitle" :active.sync="dropdownModal">
    <div>
      <div>
        <vs-input label="Name" class="w-full pt-3"  v-model="dropdownName" />
        <validate-data rules="required" :value="dropdownName" name="dropdownName" altName="Name" />
        <!--<vs-input label="Title" class="w-full pt-3"  v-model="dropdownTitle" />
        <validate-data rules="required" :value="dropdownTitle" name="dropdownTitle" altName="title" />
        <div class="py-3">
          <vs-checkbox v-model="dropdownDevOnly">Dev Only</vs-checkbox>
        </div>-->

      </div>
      <div class="overflow-hidden" v-if="dropdownModalType=='new'">
        <vs-select v-model="dropdownType" class="w-full" label="Type">
            <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in dropdownTypeData" />
        </vs-select>
        <validate-data rules="required" :value="dropdownType" name="dropdownType" altName="type" />

      </div>

    </div>
    <div class="mt-6 flex">
      <div class="flex-auto"></div>
      <div v-if="dropdownModalType == 'edit'"><vs-button variant="success" @click="UpdateDropdown()" :disabled="btnDisabled">Update</vs-button></div>
      <div v-if="dropdownModalType == 'new'"><vs-button variant="success" @click="createDropdown()" :disabled="btnDisabled">Submit</vs-button></div>
    </div>
  </vs-popup>
</div>
</template>

<script>
import DropdownList from './DropdownList';
import DropdownTree from './DropdownTree';
export default {
    components: {
        DropdownList, DropdownTree
    },
    data() {
        return {
            findDropdown: '',
            canModify: false,
            dropdownModal: false,
            dropdownModalTitle: null,
            dropdownName: null,
            dropdownTitle: null,
            dropdownDevOnly: false,
            dropdownType: null,
            dropdownTypeData: ['List', 'Tree'],
            dropdownModalType: null,


            dropdownSelectedId: null,
            dropdownSelectedName: null,
            dropdownSelectedType: '',
            dropdownSelectedTitle: null,
            dropdownSelectedDevOnly: null,


            dropDownList: [],
            dropdownData: [],
        }
    },
    created() {
        this.loadData();
    },

    mounted() {

    },

    methods: {
        async loadData(select = null) {
            try {
                var req = await axios.get('/api/dropdown/data')
                var data = req.data.dropdowns;
                this.canModify = req.data.can_modify;
                this.dropDownList = data;
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response)
                } else {
                    console.log(err)
                }
            }
        },

        async setDropdownData(item, index) {
            //console.log(item);
            this.dropdownData = [];
            for (var i = 0; this.dropDownList.length > i; i++) {
                this.dropDownList[i].activeBtn = false;
            }
            this.dropDownList[index].activeBtn = true;

            this.dropdownSelectedId = item.id;
            this.dropdownSelectedName = item.name;
            this.dropdownSelectedType = item.type;
            this.dropdownSelectedTitle = item.title;
            this.dropdownSelectedDevOnly = item.devonly !== 0;

            this.loadDropdownData();
        },

        async loadDropdownData() {
            var data = {
                id: this.dropdownSelectedId,
            }
            try {
                if (this.dropdownSelectedType == 'List') {
                    var req = await axios.post('/api/dropdown/data/items', data)
                }
                if (this.dropdownSelectedType == 'Tree') {
                    var req = await axios.post('/api/dropdown/data/categories', data)
                }
                this.dropdownData = req.data;
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response)
                } else {
                    console.log(err)
                }
            }
        },

        setDropdownModal(type) {
            if (type == 'new') {
                this.dropdownName = null;
                this.dropdownType = null;
                this.dropdownTitle = null;
                this.dropdownDevOnly = false;
                this.dropdownModalTitle = 'Add new dropdown';
                this.dropdownModalType = 'new';
            } else if (type == 'edit') {
                this.dropdownName = this.dropdownSelectedName;
                this.dropdownTitle = this.dropdownSelectedTitle;
                this.dropdownDevOnly = this.dropdownSelectedDevOnly;
                this.dropdownModalTitle = 'Update dropdown';
                this.dropdownModalType = 'edit';
            }

            this.dropdownModal = true;
            this.resetError();
        },

        async createDropdown() {
            this.resetError();
            this.btnDisabled = true;
            var data = {
                dropdownName: this.dropdownName,
                dropdownType: this.dropdownType,
                dropdownTitle: this.dropdownTitle,
                dropdownDevOnly: this.dropdownDevOnly,
            }
            try {
                var req = await axios.post('/api/dropdown/create', data)
                if (req.data.status == true || req.data == 1) {
                    this.notificationAlert(req);
                    this.dropdownModal = false;
                    this.dropdownName = null;
                    this.dropdownType = null;
                    this.dropdownTitle = null;
                    this.dropdownDevOnly = false;
                    this.loadData();
                }
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response)
                } else {
                    console.log(err)
                }
            }
        },

        async UpdateDropdown() {
            this.resetError();
            this.btnDisabled = true;
            var data = {
                dropdownName: this.dropdownName,
                dropdownTitle: this.dropdownTitle,
                dropdownDevOnly: this.dropdownDevOnly,
                id: this.dropdownSelectedId,
            }
            try {
                var req = await axios.post('/api/dropdown/update', data)
                if (req.data.status == true || req.data == 1) {
                    this.notificationAlert(req);
                    this.dropdownModal = false;
                    this.dropdownSelectedName = this.dropdownName;
                    this.dropdownSelectedTitle = this.dropdownTitle;
                    this.dropdownSelectedDevOnly = this.dropdownDevOnly;

                    this.loadData(this.dropdownName);
                    this.loadDropdownData();
                    this.dropdownName = null;
                }
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response)
                } else {
                    console.log(err)
                }
            }
        },

        deleteDropdown() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Confirm`,
                text: 'Are you sure, you want to delete this dropdown?',
                acceptText: 'ok',
                accept: this.deleteDropdownProceed,
            })
        },

        async deleteDropdownProceed() {
            this.btnDisabled = true;
            var data = {
                id: this.dropdownSelectedId,
            }
            try {
                var req = await axios.post('/api/dropdown/delete', data)
                if (req.data.status == true || req.data == 1) {
                    this.loadData();
                    this.dropdownData = [];
                    this.dropdownSelectedName = null;
                    this.notificationAlert(req);
                }
            } catch (err) {
                if (err.response) {
                    this.notificationAlert(err.response)
                } else {
                    console.log(err)
                }
            }
        },

    },

    computed: {
        filteredDropdowns() {
            let filter = new RegExp(this.findDropdown, 'i')
            return this.dropDownList.filter(el => el.name.match(filter));
        },
    }
}
</script>

<style scoped>
  .dropdown-head{
    padding:10px ;
    background-color: #f7f7f7;
    border-bottom: 1px solid #f0f0f0;
  }
</style>
