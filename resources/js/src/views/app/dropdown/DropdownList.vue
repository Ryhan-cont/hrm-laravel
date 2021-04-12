<template>
<div>
    <div class="p-2">
        <div class="flex">
            <div class="p-3 m-1 flex-auto font-bold">{{dropdownName}}</div>
            <div class=""><vs-button size="small" @click="addDropdownSetup()" :disabled="btnDisabled">Add</vs-button></div>
        </div>
        <div class="pt-2">
            <div v-for="(item, index) in items" :key="index" class="p-3 bg-gray-50 m-1 flex">
                <div class="flex-auto">{{ item.name }}</div>
                <div v-if="item.can_modify">
                    <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editDropdownSetup(item, index)" />
                    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteDropdownItem(item, index)" />
                </div>
            </div>
        </div>
    </div>
    <vs-popup title="Edit dropdown item" :active.sync="editDropdownModal">
        <div>
            <vs-input type="hidden" v-model="selectedId" />
            <vs-input label-placeholder="Name" class="w-full pt-3"  v-model="editItemName" />
            <validate-data rules="required" :value="editItemName" :name="'name'" altName="name" />
        </div>
        <div class="mt-4 flex">
            <div class="flex-auto"></div>
            <div><vs-button variant="success" @click="updateDropdownItem()" :disabled="btnDisabled">Update</vs-button></div>
        </div>
    </vs-popup>

    <vs-popup title="Add dropdown item" :active.sync="addDropdownModal">
        <div>
            <vs-input type="hidden" v-model="selectedId" />
            <vs-input label-placeholder="Name" class="w-full pt-3" v-model="itemName" />
            <validate-data rules="required" :value="itemName" :name="'itemName'" altName="name" />
        </div>
        <div class="mt-4 flex">
            <div class="flex-auto"></div>
            <div><vs-button variant="success" @click="addDropdownItem()" :disabled="btnDisabled">Add</vs-button></div>
        </div>
    </vs-popup>
</div>
</template>

<script>
export default {
    name: 'dropdown-list',
    props:{
        items:{
            required: true,
        },
        dropdownName:{
            required: true,
        },
        selectedId:{
            required: true,
        },
    },
    data () {
        return {
            itemName:null,

            editDropdownModal:false,
            addDropdownModal:false,

            editItemName:null,
            editItemId:null,
        }
    },
    mounted(){

    },

    methods:{
        editDropdownSetup(item, index){
            console.log(item);
            this.editDropdownModal = true;
            this.editItemName=item.name;
            this.editItemId=item.id;
            this.resetError();
        },
        addDropdownSetup(item, index){
            this.addDropdownModal = true;
            this.itemName=null;
            this.resetError();
        },
        async addDropdownItem(){
            this.btnDisabled = true;
            var data = {
                dropdown_id:this.selectedId,
                itemName:this.itemName,
            }
            try{
                var req = await axios.post('/api/dropdown/data/item-create',data)
                if(req.data.status == true || req.data == 1){
                    this.addDropdownModal = false;
                    this.$parent.$parent.loadDropdownData();
                    this.itemName=null;
                    this.notificationAlert(req);
                }
            }catch(err){
                if(err.response){this.notificationAlert(err.response)}else{console.log(err)}
            }
            this.btnDisabled=false;
        },

        async updateDropdownItem(){
            this.btnDisabled = true;
            var data = {
                dropdown_id:this.selectedId,
                itemName:this.editItemName,
                id:this.editItemId,
            }
            try{
                var req = await axios.post('/api/dropdown/data/item-update',data)
                if(req.data.status == true || req.data == 1){
                    this.editDropdownModal=false;
                    this.$parent.$parent.loadDropdownData();
                    this.notificationAlert(req);
                }
            }catch(err){
                if(err.response){this.notificationAlert(err.response)}else{console.log(err)}
            }
            this.btnDisabled=false;
        },
        deleteDropdownItem(item, index){
            this.$vs.dialog({
            type: 'confirm',
            color: 'danger',
            title: `Confirm`,
            text: 'Are you sure, you want to delete this item?',
            acceptText:'ok',
            accept: this.deleteDropdownItemProceed,
            parameters:item,
            })
        },
        async deleteDropdownItemProceed(item){
            this.btnDisabled = true;
            var data = {
            id:item.id,
            }
            try{
                var req = await axios.post('/api/dropdown/data/item-delete',data)
                if(req.data.status == true || req.data == 1){
                    this.$parent.$parent.loadDropdownData();
                    this.notificationAlert(req);
                }
            }catch(err){
                if(err.response){this.notificationAlert(err.response)}else{console.log(err)}
            }
        },
    }
}
</script>

<style scoped>

</style>
