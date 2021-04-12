<template>
    <vx-card title="">
      <div style="">
        <div class="flex">
          <div class="flex-auto"></div>
          <div><vs-button size="small" @click="addData('cat')">Add category</vs-button></div>
        </div>
        <div v-for="(item, index) in categoryData" :key="index" class="pl-2 pb-3 my-4">
          <div>
            <div class="flex pb-2" style="border-bottom:1px solid #ededed">
              <div v-if="item.editMode == false" class="flex-auto pt-3 font-bold text-xl">{{ item.name }}</div>
              <div v-if="item.editMode == true" class="flex-auto"><vs-input label="Catagory" size="small" class="w-full pt-3" v-model="item.name" /></div>
              <div class="px-2 flex" :style="{width:actionBoxWidth}">
                <div class="flex-auto"></div>
                <div v-if="item.editMode == true" class="flex" :style="{paddingTop: '2.25rem'}">
                  <div><vs-button size="small" @click="editCategory('cat', item.id, index)">Save</vs-button></div>
                  <div class="pl-2"><vs-button size="small" color="danger" @click="catagoryManage('cancelEditCat', index)">Cancel</vs-button></div>
                </div>
                <div v-if="item.editMode == false" class="flex pt-3">
                  <div class="pl-2" v-if="item.editMode == false"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="catagoryManage('editCat', index)"></vs-button></div>
                  <div class="pl-2"><vs-button class="px-1" size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteData(item.id)"></vs-button></div>
                  <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="addData('subCat',item.id)">Sub</vs-button></div>
                </div>
              </div>
            </div>
            <!-- Children -->
            <div v-if="(item.children.length>0)">
              <div v-for="(child, childIndex) in item.children" :key="childIndex" class="ml-2 my-2">
                <div class="flex py-2" style="background-color:rgb(0,0,0,.08)">
                  <div v-if="child.editMode == false" class="flex-auto flex pt-1 px-2">{{ child.name }}</div>
                  <div v-if="child.editMode == true" class="flex-auto px-2"><vs-input size="small" label="Sub Category" class="w-full" v-model="child.name" /></div>
                  <div class="px-2 flex" :style="{width:actionBoxWidth}">
                    <div class="flex-auto"></div>
                    <div v-if="child.editMode == true" class="flex pt-6">
                      <div><vs-button size="small" @click="editCategory('subCat', child.id, index, childIndex)">Save</vs-button></div>
                      <div class="pl-2"><vs-button size="small" color="danger" @click="catagoryManage('cancelEditSubCat', index, childIndex)">Cancel</vs-button></div>
                    </div>
                    <div v-if="child.editMode == false" class="flex">
                      <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="catagoryManage('editSubCat', index, childIndex)"></vs-button></div>
                      <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteData(child.id)"></vs-button></div>
                      <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-plus" @click="addData('subCat',child.id)">Item</vs-button></div>
                    </div>
                  </div>
                </div>
                <!-- Sub Children -->
                <div v-if="(child.children.length>0)" class="pl-6">
                  <div v-for="(subChild, subChildIndex) in child.children" :key="subChildIndex" class="my-1 py-1" :style="(subChildIndex % 2)?'background-color:rgb(0,0,0,.04)':'background-color:rgb(0,0,0,.02)'">
                    <div class="flex">
                      <div v-if="subChild.editMode == false" class="flex-auto flex px-2 py-1">{{ subChild.name }}</div>
                      <div v-if="subChild.editMode == true" class="flex-auto px-2"><vs-input size="small" label="Item" class="w-full" v-model="subChild.name" /></div>
                      <div class="px-2 flex" :style="{width:actionBoxWidth}">
                        <div class="flex-auto"></div>
                        <div v-if="subChild.editMode == true" class="flex pt-6">
                          <div><vs-button size="small" @click="editCategory('item', subChild.id, index, childIndex, subChildIndex)">Save</vs-button></div>
                          <div class="pl-2"><vs-button size="small" color="danger" @click="catagoryManage('cancelEditItem', index, childIndex, subChildIndex)">Cancel</vs-button></div>
                        </div>
                        <div v-if="subChild.editMode == false" class="flex">
                          <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-edit" @click="catagoryManage('editItem', index, childIndex, subChildIndex)"></vs-button></div>
                          <div class="pl-2"><vs-button size="small" icon-pack="feather" icon="icon-x" color="danger" @click="deleteData(subChild.id)"></vs-button></div>
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
      <div></div>
      <vs-popup :title="modalName" :active.sync="addNewData">
        <div>
          <vs-input label-placeholder="Nane" class="w-full pt-3"  v-model="name" />
          <validate-data rules="required" :value="name" :name="'name'" altName="category name" />
        </div>
        <div class="mt-4 flex">
          <div class="flex-auto"></div>
          <div><vs-button variant="success" @click="createCategory()">Submit</vs-button></div>
        </div>
      </vs-popup>

    </vx-card>
</template>


<script>
export default {
  components: {
  },
  data () {
    return {
      addNewData:false,

      name:null,
      modalName:null,
      saveType:null,
      dataParent:null,

      categoryData:[],
      actionBoxWidth:'175px'
    }
  },
  mounted(){
    this.loadData();
  },

  methods:{
      chk(){
        this.catagoryManage('addCat')
        console.log(this.categoryData);
      },
      async loadData(){
        try{
          var req = await axios.get('/api/category-manager/data')
          this.categoryData=req.data.categoryData,
          console.log('cat',this.categoryData)
        }catch(err){
            this.notificationAlert(err.response);
          console.log(err)
        }
      },
       addData(type,parent=null){
        if(type=='cat'){
          this.name=null;
          this.resetError();
          this.addNewData=true;
          this.modalName='Add Catagory';
          this.saveType='cat';
        }
        if(type=='subCat'){
          this.name=null;
          this.resetError();
          this.addNewData=true;
          this.modalName='Add Sub Catagory';
          this.saveType='subCat';
          this.dataParent=parent;
        }
        if(type=='item'){
          this.name=null;
          this.resetError();
          this.addNewData=true;
          this.modalName='Add Item';
          this.saveType='item';
          this.dataParent=parent;
        }
      },
      catagoryManage(type, index = null, childIndex= null, itemIndex = null){
        let data = {
          name:null,
          children:[],
          editMode:true,
        }

        //Category
        if(type=='editCat'){
          this.categoryData[index].editMode = true;
        }
        if(type=='cancelEditCat'){
          this.categoryData[index].editMode = false;
        }

        //Sub Category
        if(type=='editSubCat'){
          this.categoryData[index].children[childIndex].editMode = true;
        }
        if(type=='cancelEditSubCat'){
          console.log('xxx',)
          this.categoryData[index].children[childIndex].editMode = false;
        }

        //Item
        if(type=='editItem'){
          this.categoryData[index].children[childIndex].children[itemIndex].editMode = true;
        }
        if(type=='cancelEditItem'){
          this.categoryData[index].children[childIndex].children[itemIndex].editMode = false;
        }
      },
      async createCategory(){
        if(this.saveType == 'cat'){
          var data = {
            name:this.name,
            type:'category',
          }
        }
        if(this.saveType == 'subCat'){
          var data = {
            name:this.name,
            type:'subCategory',
            parent:this.dataParent
          }
        }
        if(this.saveType == 'item'){
          var data = {
            name:this.name,
            type:'item',
            parent:this.dataParent
          }
        }
        if(this.validateInput(data)){
          try{
            var req = await axios.post('/api/category-manager/create',data)
            if(req.data==1){
              this.addNewData=false;
              this.loadData();
            }
          }catch(err){
              this.notificationAlert(err.response);
            console.log(err);
          }
        }
      },
      async editCategory(type, id, index = null, childIndex= null, itemIndex = null){
        if(type == 'cat'){
          var value = this.categoryData[index].name;
        }
        if(type == 'subCat'){
          var value = this.categoryData[index].children[childIndex].name;
        }
        if(type == 'item'){
          var value = this.categoryData[index].children[childIndex].children[itemIndex].name;
        }
        let data = {
          name:value,
          id:id,
        }
        try{
          var req = await axios.post('/api/category-manager/update',data)
          if(req.data==1){
            this.loadData();
          }
        }catch(err){
            this.notificationAlert(err.response);
          console.log(err);
        }
      },
    deleteData(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure, you want to delete this?',
        acceptText:'ok',
        accept: this.deleteDataProceed,
        parameters:deldata,
      })
    },
    async deleteDataProceed(Deldata){
      console.log(Deldata)
      try{
        var data = {
          id:Deldata,
        }
        var req = await axios.post('/api/category-manager/delete',data)
        console.log(req)
        if(req.data==1){
          this.loadData();
        }
      }catch(err){
        console.log(err)
      }
    },
  }
}
</script>
