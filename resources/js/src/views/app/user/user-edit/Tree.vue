<template>
<div>


</div>
</template>


<script>
export default {
    name: 'org-tree',
    components: {

    },
    props: {
        reqData:{
            default:{},
        }
    },
    data () {
        return {

        }
    },
    mounted(){
        if(this.reqData.userData){this.loadData();}
    },
    methods:{
        async loadData(){


        },
        saveData(){

        }
    },
    watch:{
        reqData(){
            this.loadData();
        }

    },
}
</script>