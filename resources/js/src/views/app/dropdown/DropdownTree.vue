<template>
  <div>
      <div style="">
        <div class="flex  p-3">
          <div class="flex-auto font-bold">{{dropdownName}}</div>
          <div><vs-button size="small" @click="addData('cat')">Add Category</vs-button></div>
        </div>
        <div v-for="(item, index) in categoryData" :key="index" class="pl-2 pb-3 my-4">
          <div>
            <div class="flex pb-2" style="border-bottom:1px solid #ededed">
              <div class="flex-auto pt-3 font-bold text-xl">{{ item.name }}</div>
              <div class="px-2 flex" :style="{width:actionBoxWidth}">
                <div class="flex-auto"></div>
                <div class="pl-2 pt-3 flex">
                  <feather-icon icon="FilePlusIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"  @click="addData('subCat',item.id)" />
                  <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editManage('editCat',item.id, index)" />
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteData(item.id)" />
                </div>
              </div>
            </div>
            <!-- Children -->
            <div v-if="(item.children && item.children.length>0)">
              <div v-for="(child, childIndex) in item.children" :key="childIndex" class="ml-2 my-2">
                <div class="flex py-2" style="background-color:rgb(0,0,0,.08)">
                  <div class="flex-auto flex pt-1 px-2">{{ child.name }}</div>
                  <div class="px-2 flex" :style="{width:actionBoxWidth}">
                    <div class="flex-auto"></div>
                    <div class="flex">
                      <feather-icon icon="FilePlusIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"  @click="addData('item',child.id)" />
                      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editManage('editSubCat',child.id , index, childIndex)" />
                      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteData(child.id)" />
                    </div>
                  </div>
                </div>
                <!-- Sub Children -->
                <div v-if="(child.children)">
                  <div v-if="(child.children.length>0)" class="pl-6">
                    <div v-for="(subChild, subChildIndex) in child.children" :key="subChildIndex" class="my-1 py-1" :style="(subChildIndex % 2)?'background-color:rgb(0,0,0,.04)':'background-color:rgb(0,0,0,.02)'">
                      <div class="flex">
                        <div class="flex-auto flex px-2 py-1">{{ subChild.name }}</div>
                        <div class="px-2 flex" :style="{width:actionBoxWidth}">
                          <div class="flex-auto"></div>
                          <div class="flex">
                            <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editManage('editItem', subChild.id, index, childIndex, subChildIndex)" />
                            <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteData(subChild.id)" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Sub Children -->
              </div>
            </div>
            <!-- Children -->
          </div>
        </div>
      </div>
      <vs-popup :title="modalName" :active.sync="addNewData">
        <div>
          <vs-input label-placeholder="Name" class="w-full pt-3"  v-model="name" />
          <validate-data rules="required" :value="name" :name="'name'" altName="name" />
        </div>
        <div class="mt-4 flex">
          <div class="flex-auto"></div>
          <div><vs-button variant="success" @click="create()" :disabled="btnDisabled">Submit</vs-button></div>
        </div>
      </vs-popup>

      <vs-popup :title="editModalName" :active.sync="editData">
        <div>
          <vs-input label-placeholder="Name" class="w-full pt-3"  v-model="editItemValue" />
          <validate-data rules="required" :value="editItemValue" :name="'name'" altName="name" />
        </div>
        <div class="mt-4 flex">
          <div class="flex-auto"></div>
          <div><vs-button variant="success" @click="update()" :disabled="btnDisabled">Update</vs-button></div>
        </div>
      </vs-popup>
  </div>
</template>


<script>
export default {
    name: 'dropdown-list',
    props: {
        categoryData: {
            required: true,
        },
        dropdownName: {
            required: true,
        },
        selectedId: {
            required: true,
        },
    },
    data() {
        return {
            addNewData: false,

            name: null,
            modalName: null,
            saveType: null,
            dataParent: null,

            actionBoxWidth: '120px',

            editItemValue: null,
            editItemId: null,
            editModalName: null,
            editData: false,
            editType: null,

        }
    },
    mounted() {

    },

    methods: {

        addData(type, parent = null) {
            if (type == 'cat') {
                this.name = null;
                this.resetError();
                this.addNewData = true;
                this.modalName = 'Add Category';
                this.saveType = 'cat';
            }
            if (type == 'subCat') {
                this.name = null;
                this.resetError();
                this.addNewData = true;
                this.modalName = 'Add Sub Category';
                this.saveType = 'subCat';
                this.dataParent = parent;
            }
            if (type == 'item') {
                this.name = null;
                this.resetError();
                this.addNewData = true;
                this.modalName = 'Add Item';
                this.saveType = 'item';
                this.dataParent = parent;
            }
        },

        editManage(type, id, index = null, childIndex = null, itemIndex = null) {
            this.editItemId = id;
            //Category
            if (type == 'editCat') {
                this.editData = true;
                this.editItemValue = this.categoryData[index].name;
                this.editModalName = 'Edit Category';
            }
            //Sub Category
            if (type == 'editSubCat') {
                this.editData = true;
                this.editItemValue = this.categoryData[index].children[childIndex].name;
                this.editModalName = 'Edit Sub Category';
            }
            //Item
            if (type == 'editItem') {
                this.editData = true;
                this.editItemValue = this.categoryData[index].children[childIndex].children[itemIndex].name;
                this.editModalName = 'Edit Item';
            }
            //cancel
            if (type == 'cancel') {
                this.editData = false;
            }
        },

        async create() {
            this.btnDisabled = true;
            if (this.saveType == 'cat') {
                var data = {
                    dropdown_id: this.selectedId,
                    name: this.name,
                    type: 'category',
                }
            }
            if (this.saveType == 'subCat') {
                var data = {
                    dropdown_id: this.selectedId,
                    name: this.name,
                    type: 'subCategory',
                    parent: this.dataParent
                }
            }
            if (this.saveType == 'item') {
                var data = {
                    dropdown_id: this.selectedId,
                    name: this.name,
                    type: 'item',
                    parent: this.dataParent
                }
            }

            if (this.validateInput(data, ['selectedId'])) {
                try {
                    var req = await axios.post('/api/dropdown/data/category-create', data)
                    if (req.data.status == true || req.data == 1) {
                        this.addNewData = false;
                        this.$parent.$parent.loadDropdownData();
                        this.notificationAlert(req);
                    }
                } catch (err) {
                    if (err.response) {
                        this.notificationAlert(err.response)
                    } else {
                        console.log(err)
                    }
                }
            }
        },
        async update() {
            this.btnDisabled = true;
            let data = {
                name: this.editItemValue,
                id: this.editItemId,
            }
            try {
                var req = await axios.post('/api/dropdown/data/category-update', data)
                if (req.data.status == true || req.data == 1) {
                    this.$parent.$parent.loadDropdownData();
                    this.editData = false;
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
        deleteData(deldata) {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Confirm`,
                text: 'Are you sure, you want to delete this?',
                acceptText: 'ok',
                accept: this.deleteDataProceed,
                parameters: deldata,
            })
        },
        async deleteDataProceed(Deldata) {
            this.btnDisabled = true;
            try {
                var data = {
                    id: Deldata,
                }
                var req = await axios.post('/api/dropdown/data/category-delete', data)
                console.log(req)
                if (req.data.status == true || req.data == 1) {
                    this.$parent.$parent.loadDropdownData();
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
    watch: {
        categoryData() {

        }

    }
}
</script>
