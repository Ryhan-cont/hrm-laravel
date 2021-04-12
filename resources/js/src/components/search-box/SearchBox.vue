<template>
    <div class="w-full">
        <vs-input  class="w-full" :label="label" v-model="listenValue" @blur="inputBlur()" @focus="inputFocus()" />
        <div class="relative">
            <div class="absolute custom-search-box-item-cont-box" v-if="showItems" @mouseenter="selectMode = true" @mouseleave="selectMode = false">
                <vuePerfectScrollbar class="custom-search-box-item-cont-scroll-area" :settings="{maxScrollbarLength: 40}">
                    <div v-for="(item, index) in suggestionItem" :key="index">
                        <div class="custom-search-box-item-cont" @click="loadItem(item)">{{item.name}}</div>
                    </div>
                </vuePerfectScrollbar>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'search-box',

    model: {
        prop: 'value',
        event: 'valueChange'
    },
    props:{
        value:{
            default: null,
        },
        items:{
            type: Array,
            default(){return []}
        },
        label:{
            default: null,
        },
        preview:{
            default: null,
        },
        return:{
            default: null,
        },
    },
    data(){
        return{
            showItems:false,
            suggestionItem:[],
            selectMode:false,
        }
    },
    mounted(){
        this.processList();
    },
    filters:{

    },
    methods:{
        processList(){
            var newList = [];
            if(this.items.constructor.name == "Array" || this.items.constructor.name == "Object"){

                for(var key in this.items){
                    var value = this.items[key];
                    if(this.preview == null){
                        var subArr = {
                            name:value,
                            return:value,
                        }
                        newList.push(subArr);
                    }else{
                        var subArr = {name:value[this.preview],}
                        if(this.return == null){
                            subArr.return = value[this.preview]
                        }else{
                            subArr.return = value[this.return]
                        }
                        newList.push(subArr);
                    }
                }
            }
            this.suggestionItem = newList;
            console.log('this.suggestionItem', this.suggestionItem)
        },
        loadItem(item){
            this.$emit('valueChange', item.name);
            this.showItems = false;
        },
        inputBlur(){
            if(this.selectMode == false){
                this.showItems = false;
            }else{
                this.selectMode = false;
            }
        },
        inputFocus(){
            if(this.items.length>0){
                this.showItems = true;
                this.processList();
            }
        },
        filterList(value){
            var newList = [];
            for(var key in this.suggestionItem){
                var item = this.suggestionItem[key].name;
                if(item != null && item != undefined && value != null && value != undefined){
                    if(item.toString().toLowerCase().indexOf(this.value.toString().toLowerCase())>-1){
                        newList.push(this.suggestionItem[key]);
                    }
                }
            }
            this.suggestionItem = newList;
        }
    },
    computed: {
        listenValue: {
            get: function() {
                return this.value
            },
            set: function(value) {
                this.$emit('valueChange', value)
            }
        }
    },
  watch:{
      value(){
            this.filterList(this.value)
      },
      items(){
            this.processList();
            this.filterList(this.value)
      },
  }
}
</script>

<style scoped>
    .custom-search-box-item-cont{
        width: 100%;
        cursor: pointer;
        padding: 8px 5px;
    }
    .custom-search-box-item-cont:hover{
        background-color: rgba(0,0,0,0.03);
    }
    .custom-search-box-item-cont-box{
        background-color: #ffffff;
        width: 100%;
        z-index: 1000;
        border: 1px solid rgba(0,0,0,0.03);
        margin-top: 4px;
        box-shadow:0px 0px 5px 0px rgba(0,0,0,0.1);
        border-radius:5px;
        max-height:150px;

    }
    .custom-search-box-item-cont-scroll-area {
        position: relative;
        margin: auto;
    }
</style>

