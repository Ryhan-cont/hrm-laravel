<template>
  <vx-card title="Menu Manager">
    <!-- <div @click="chkData()">Check Daata</div> -->
    <div class="content">
        <div class="flex">
          <div class="flex-auto" style="max-width:300px">
            <vs-select v-model="selectedMenu" @input="loadMenu()" class="w-full" placeholder="Select" label="Select Menu">
              <vs-select-item :key="index" :value="item.name" :text="item.name" v-for="(item,index) in listData.menus" />
            </vs-select>
          </div>
          <div class="flex-auto"></div>
          <div class="flex-auto ml-6" style="max-width:300px">
            <div class="flex">
              <div class="flex-auto"></div>
              <div class="px-1"><vs-button size="small" variant="success" @click="addNewMenu = true; newMenuName = ''; newMenuTitle = '';">Add new</vs-button></div>
              <div class="px-1" v-if="selectedMenu !=null"><vs-button size="small" color="danger" @click="deleteMenu()">Delete</vs-button></div>
              <div class="px-1" v-if="selectedMenu !=null"><vs-button size="small" :disabled="btnDisabled" color="success" @click="updateMenu()">Save</vs-button></div>
            </div>
            <div class="pt-2" v-if="selectedMenu">
              <vs-input placeholder="Menu Name" size="small" class="w-full" v-model="name" />
              <div v-if="errorData.name" class="py-1 text-sm text-red-400">{{errorData.name[0]}}</div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex" style="border:1px solid rgb(0,0,0,.1)">
          <div class="" style="width:50%">
            <div class="menu-widget-title-cont" @click="loadList()">Options</div>
            <div class="p-2">
              <draggable :list="allBtn" class="list-group parent-dragarea" style="height:500px;" draggable=".item" :group="optionGroupName" >
                <div @mousedown="optionGroupName='swapGroup'" class="list-group-item item" v-for="element in allBtn" :key="element.name">
                  <div class="draggablejs-item-css">{{ element.name }}</div>
                </div>
              </draggable>
            </div>
          </div>

          <div class="" style="width:50%">
            <div class="menu-widget-title-cont flex" style="border-left:1px solid rgb(226, 226, 226);">
              <div class="flex-auto">Menu</div>
              <div class="text-small" v-if="selectedMenu !=null"><vs-button size="small" icon-pack="feather" icon="icon-plus-square" @click="addGroup()">Add Group</vs-button></div>
            </div>
            <div class="p-2" style="border-left:1px solid rgb(226, 226, 226); height:500px">
              <draggable :list="filteredMenu" class="parent-dragarea" style="height:500px;" draggable=".groupItem" group="optionGroup" >
                <!--------------------------------------------------------->
                <div class="groupItem" v-for="(groupItem,groupindex) in filteredMenu" :key="groupindex">
                  <div class="flex p-2 mb-1 bg-gray-200">
                    <div class="flex-auto"><vs-input placeholder="Group name" size="small" class="w-full" v-model="groupItem.name" /></div>
                    <div class="flex-auto"><vs-input placeholder="Group icon" size="small" class="w-full" v-model="groupItem.icon" /></div>
                    <div class="ml-3"><vs-button size="small" icon-pack="feather" icon="icon-plus-square" @click="addSubGroup(groupindex)"></vs-button></div>
                    <div class="ml-1"><vs-button size="small" icon-pack="feather" icon="icon-x-square" color="danger" @click="deleteGroup(groupindex)"></vs-button></div>
                  </div>
                  <div>
                    <draggable :list="groupItem.list" class="ml-6" style="min-height:30px;" draggable=".item" :group="menuGroupName" >
                      <div class="list-group-item item" v-for="(baseItem,baseIndex) in groupItem.list" :key="baseIndex">
                        <div v-if="baseItem.rowtype=='btn'" class="draggablejs-item-css" @mousedown="optionGroupName='swapGroup'">{{ baseItem.name }}</div>
                        <div v-if="baseItem.rowtype=='subgroup'" class="">
                          <div class="flex p-2 bg-gray-200" style="margin:4px 2px" @mousedown="optionGroupName='independent'" @mouseup="optionGroupName='swapGroup'">
                            <div class="flex-auto text-bold"><vs-input placeholder="Sub group name" size="small" class="w-full" v-model="baseItem.name" /></div>
                            <div class="flex-auto text-bold"><vs-input placeholder="Sub group icon" size="small" class="w-full" v-model="baseItem.icon" /></div>
                            <div class="ml-3"><vs-button size="small" color="danger" icon-pack="feather" icon="icon-x-square" @click="deleteSubGroup(groupindex,baseIndex)"></vs-button></div>
                          </div>
                          <div>
                            <draggable :list="baseItem.list" class="ml-8" style="min-height:30px" draggable=".item" :group="menuGroupName" >
                              <div class="list-group-item item" v-for="(subitem,subIndex) in baseItem.list" :key="subIndex">
                                  <div class="draggablejs-item-css" @mousedown="optionGroupName='swapGroup'">{{ subitem.name }}</div>
                              </div>
                            </draggable>
                          </div>
                        </div>
                      </div>
                    </draggable>
                  </div>
                </div>
                <!--------------------------------------------------------->
              </draggable>
            </div>
          </div>
        </div>

      <vs-popup title="Add new menu" :active.sync="addNewMenu">
        <div>
          <vs-input label-placeholder="Nane" class="w-full pt-3"  v-model="newMenuName" />
          <div v-if="addNewMenuValidation.name" class="py-1 text-sm text-red-400">{{addNewMenuValidation.name[0]}}</div>
        </div>
        <div class="mt-4 flex">
          <div class="flex-auto"></div>
          <div><vs-button variant="success" :disabled="btnDisabled"  @click="createMenu">Submit</vs-button></div>
        </div>
      </vs-popup>


    </div>
  </vx-card>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data () {
    return {
      optionGroupName:'swapGroup',
      menuGroupName:'swapGroup',
      allBtnHistry:[],
      addNewMenu:false,
      addNewMenuValidation:[],


      newMenuName:'',
      name:'',

      allBtnData:[],
      allBtn: [],
      filteredMenu: [],


      listData:{},
      selectedMenu:null,

      errorData:[],
    }
  },
  mounted(){
    this.loadList();
   // console.log(this)
  },

  methods:{
    chkData(){
      //console.log(this.filteredMenu)
    },
    async loadList(){
      try{
        var req = await axios.get('api/menu/data/all')
        //console.log(req);
        this.listData = req.data;
        this.allBtnData=req.data.buttons;
      }catch(err){
          this.notificationAlert(err.response);
        console.log(err)
      }
    },
    addGroup(){
      if(this.selectedMenu != null){
        var defGroup = {
          name:'',
          icon:'',
          rowtype:'group',
          list:[],
        }
        this.filteredMenu.push(defGroup);
      }
    },
    addSubGroup(index){
      var defSubGroup = {
        name:'',
        icon:'',
        rowtype:'subgroup',
        list:[],
      }
      this.filteredMenu[index].list.push(defSubGroup);
    },
    deleteGroup(index){
      for(var i=0; this.filteredMenu[index].list.length>i; i++){
        this.allBtn.push(this.filteredMenu[index].list[i]);
      }
      this.filteredMenu.splice(index, 1);
    },
    deleteSubGroup(gIndex, bIndex){
     // console.log(this.filteredMenu[gIndex].list[bIndex].list);
      for(var i=0; this.filteredMenu[gIndex].list[bIndex].list.length>i; i++){
        this.allBtn.push(this.filteredMenu[gIndex].list[bIndex].list[i]);
      }
      this.filteredMenu[gIndex].list.splice(bIndex, 1);
    },
    async loadMenu(){
      if(this.selectedMenu != null){
        var data = {
          id:this.listData.idTracker[this.selectedMenu]
        }
        var req = await axios.post('/api/menu/data',data)
        var savedData=req.data;
        var idList = [];

        for(var i=0; savedData.length>i; i++){
          for(var x=0; savedData[i].list.length>x; x++){
            var baseList = savedData[i].list[x];
            if(baseList.rowtype == 'btn'){
              idList.push(baseList.id)
            }
            if(baseList.rowtype == 'subgroup'){
              for(var o=0; baseList.list.length>o; o++){
                idList.push(baseList.list[o].id)
              }
            }
          }
        }
        var newBtnArr = [];
        //console.log(idList);
        for(var i=0; this.allBtnData.length>i; i++){
          if(idList.indexOf(this.allBtnData[i].id) < 0){
            newBtnArr.push(this.allBtnData[i]);
          }
        }
        this.name=this.selectedMenu;
        this.allBtn=newBtnArr;
        this.filteredMenu=req.data;
      }
    },

    async createMenu(){
      this.btnDisabled = true;
      try{
        this.addNewMenuValidation = [];
        var data = {
          name:this.newMenuName,
        }
        var req = await axios.post('/api/menu/create',data)
        if(req){
          this.addNewMenu=false;
          this.notificationAlert(req);

          this.loadList();
        }
      }catch(err){
        this.addNewMenuValidation =err.response.data.errors;
        this.notificationAlert(err.response);
      }

    },
    async updateMenu(){
      this.btnDisabled = true;
      try{
        var data = {
          name:this.name,
          id:this.listData.idTracker[this.selectedMenu],
          data:this.filteredMenu,
        }
        var req = await axios.post('api/menu/update',data)
        if(req){
          this.notificationAlert(req);
        }
      }catch(err){
        this.notificationAlert(err.response);
      }
    },
    deleteMenu(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure, you want to delete "'+this.selectedMenu+'" menu?',
        acceptText:'ok',
        accept: this.deleteMenuPreceed,
        parameters:deldata,
      })
    },
    async deleteMenuPreceed(){
      try{
        var data = {
          id:this.listData.idTracker[this.selectedMenu],
        }
        var req = await axios.post('api/menu/delete',data);
        if(req){
          this.notificationAlert(req);
          this.selectedMenu=null;
          this.allBtn=[];
          this.filteredMenu=[];
          this.loadList();
        }

      }catch(err){
        this.notificationAlert(err.response);
      }
    },
  },
  watch:{
  }
}
</script>
<style scoped>
  .item{
    display: block;
    width: auto;
    height: auto;
  }
  .list-group-item{
    padding: 0px;
    border: 0px;
  }
  .draggablejs-item-css{
    padding: 10px;
    margin: 2px;
    border: 1px solid rgb(238, 238, 238);
    background-color: rgb(247, 247, 247);
  }
  .parent-dragarea{
    overflow-y: auto;
  }
  .child-dragarea{
    margin-left: 20px;
  }
  .child-child-dragarea{
    margin-left: 20px;
  }
  .menu-widget-title-cont{
    background-color:#ededed;
    border-bottom:1px solid rgb(226, 226, 226);
    font-weight: bold;
    padding:10px;
    height: 50px;
  }
  .modal-backdrop {
    opacity:0.5 !important;
    background-color: coral;

  }
  .options li{
    padding: 10px;
  }
</style>
