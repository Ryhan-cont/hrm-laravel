<template>
<div>
  <vx-card title="">
    <div class="flex" style="border:1px solid #f0f0f0">
      <div class="" style="width:30%">
        <div class="flex dropdown-head">
          <div class="flex-auto pt-1">Dropdowns</div>
          <div><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="setDropdownModal('new')"></vs-button></div>
          <div class="pl-1" v-if="dropdownSelectName != null"><vs-button size="small" icon-pack="feather" icon="icon-edit-2" @click="setDropdownModal('edit')"></vs-button></div>
          <div class="pl-1" v-if="dropdownSelectName != null"><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteDropdown()"></vs-button></div>
        </div>
        <div>
          <div v-for="(item, index) in dropDownList" :key="index" class="p-3 bg-gray-50 m-1 cursor-pointer hover:bg-gray-100" :style="(item.activeBtn == true)?'color:red;':'color:gray'" @click="setDropdownData(item,index)"> {{ item.name }} </div>
        </div>
      </div>
      <div class="" style="width:70%; border-left:1px solid #f0f0f0">
        <div class="dropdown-head flex">
          <div class="pt-1">Dropdowns Data</div>
          <div class="px-2 flex-auto" v-if="dropdownSelectName != null">
            <vs-input placeholder="Add dropdown items" size="small" class="w-full" v-model="dropdownItemName" />
            <!-- <validate-data rules="required" :value="dropdownItemName" :name="'value'" altName="item name" /> -->
          </div>
          <div class="" v-if="dropdownSelectName != null"><vs-button size="small" @click="addDropdownItem()" :disabled='btnDisabled'>Add</vs-button></div>
        </div>
        <div>
          <div v-for="(item, index) in dropdownData" :key="index" class="p-3 bg-gray-50 m-1 flex">
            <div class="flex-auto">{{ item.value }}</div>
            <div>
              <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="setDropdownItemEdit(item, index)" />
              <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteDropdownItem(item, index)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </vx-card>
  <vs-popup :title="dropdownModalTitle" :active.sync="dropdownModal">
    <div>
      <vs-input label-placeholder="Name" class="w-full pt-3"  v-model="dropdownInpName" />
      <validate-data rules="required" :value="dropdownInpName" name="name" />
    </div>
    <div class="mt-4 flex">
      <div class="flex-auto"></div>
      <div v-if="dropdownModalType == 'edit'"><vs-button variant="success" :disabled='btnDisabled' @click="UpdateDropdown()">Update</vs-button></div>
      <div v-if="dropdownModalType == 'new'"><vs-button variant="success" :disabled='btnDisabled' @click="createDropdown()">Submit</vs-button></div>
    </div>
  </vs-popup>
  <vs-popup title="Edit dropdown item" :active.sync="editDropdownDataModal">
    <div>
      <vs-input label-placeholder="Name" class="w-full pt-3"  v-model="editDropdownDataName" />
      <validate-data rules="required" :value="editDropdownDataName" :name="'value'" altName="name" />
    </div>
    <div class="mt-4 flex">
      <div class="flex-auto"></div>
      <div><vs-button variant="success" :disabled='btnDisabled' @click="updateDropdownItem()" >Update</vs-button></div>
    </div>
  </vs-popup>
</div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      dropdownModal:false,
      dropdownModalTitle:null,
      dropdownInpName:null,
      dropdownModalType:null,
      editDropdownDataModal:false,
      editDropdownDataName:null,
      editDropdownDataId:null,

      dropdownSelectedId:null,
      dropdownSelectName:null,

      dropDownList:[],
      dropdownData:[],
      dropdownItemName:null,
    }
  },
  mounted(){
    this.loadData();
  },

  methods:{
    async loadData(select = null){
      try{
        var req = await axios.get('/api/dropdown/data')
        var data = req.data;
        for(var i=0; data.length>i; i++){
          if(select != null && select == data[i].name){
            data[i].activeBtn = true;
          }else{
            data[i].activeBtn = false;
          }

        }
        this.dropDownList=data;
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
    setDropdownModal(type){
      if(type == 'new'){
        this.dropdownInpName=null;
        this.dropdownModalTitle='Add new dropdown';
        this.dropdownModalType='new';
      }else if(type == 'edit'){
        this.dropdownInpName=this.dropdownSelectName;
        this.dropdownModalTitle='Update dropdown';
        this.dropdownModalType='edit';
      }

      this.dropdownModal=true;
      this.resetError();
    },
    async createDropdown(){

      this.resetError();
      var data = {
        name:this.dropdownInpName,
      }
      try{
        var req = await axios.post('/api/dropdown/create',data)
        this.notificationAlert(req);
        var data = req.data;
        if(req.data.status==1 || req.data == 1){
          this.successLog(req.data);
          this.dropdownModal=false;
          this.dropdownInpName=null;
          this.loadData();
        }
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
    async UpdateDropdown(){
      this.resetError();
      var data = {
        name:this.dropdownInpName,
        id:this.dropdownSelectedId,
      }
      try{
        var req = await axios.post('/api/dropdown/update',data)
        if(req){
          this.notificationAlert(req);
          this.dropdownModal=false;
          this.dropdownSelectName=this.dropdownInpName;
          this.loadData(this.dropdownInpName);
          this.loadDropdownData();
          this.dropdownInpName=null;
        }
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
    deleteDropdown(){
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure, you want to delete this dropdown?',
        acceptText:'ok',
        accept: this.deleteDropdownProceed,
      })
    },
    async deleteDropdownProceed(){
      var data = {
        id:this.dropdownSelectedId,
      }
      try{
        var req = await axios.post('/api/dropdown/delete',data)
        if(req){
          this.notificationAlert(req);
          this.loadData();
          this.dropdownData=[];
          this.dropdownSelectName=null;
        }
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
    async setDropdownData(item, index){
      for(var i=0; this.dropDownList.length>i; i++){
        this.dropDownList[i].activeBtn = false;
      }
      this.dropDownList[index].activeBtn = true;

      this.dropdownSelectedId=item.id;
      this.dropdownSelectName=item.name;

      this.loadDropdownData();
    },
    async loadDropdownData(){
      var data = {
        id:this.dropdownSelectedId,
      }
      try{
        var req = await axios.post('/api/dropdown/data/items',data)
        var data = req.data;
        this.notificationAlert(req);
        this.dropdownData = data;
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
    async addDropdownItem(){
      this.btnDisabled = true;
      var data = {
        dropdownName:this.dropdownSelectName,
        value:this.dropdownItemName,
      }
      try{
        var req = await axios.post('/api/dropdown/data/item-add',data)
        if(req){
          this.notificationAlert(req);
          this.dropdownItemName=null;
          this.loadDropdownData();
        }
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
    setDropdownItemEdit(item, index){
      this.editDropdownDataModal = !this.editDropdownDataModal;
      this.editDropdownDataName=item.value;
      this.editDropdownDataId=item.id;
    },
    async updateDropdownItem(){
      this.btnDisabled = true;
      var data = {
        dropdownName:this.dropdownSelectName,
        value:this.editDropdownDataName,
        id:this.editDropdownDataId,
      }
      try{
        var req = await axios.post('/api/dropdown/data/item-update',data)
        if(req){
          this.notificationAlert(req);
          this.editDropdownDataModal=false;
          this.loadDropdownData();
        }
      }catch(err){
        this.notificationAlert(err.response);
      }
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
      var data = {
        id:item.id,
      }
      try{
        var req = await axios.post('/api/dropdown/data/item-delete',data)
        if(req){
          this.notificationAlert(req);
          this.loadDropdownData();
        }
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
  }
}
</script>

<style scoped>
  .dropdown-head{
    padding:10px ;
    background-color: #f7f7f7;
    height: 50px;
    border-bottom: 1px solid #f0f0f0;
  }
</style>
