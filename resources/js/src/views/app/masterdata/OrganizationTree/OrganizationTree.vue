<template>
    <vx-card title="">
        <div class="flex pb-3">
            <div class="flex-auto font-bold">Organization tree</div>
            <div><vs-button size="small"  @click="saveTree()">Update</vs-button></div>
        </div>
        <div><nested-draggable :group="organizationList" /></div>
    </vx-card>
</template>

<script>
import nestedDraggable from "./Dragable";
export default {
    components: {
        nestedDraggable
    },
    data(){
        return{
            organizationList:[],

        }
    },
    mounted(){
        this.loadData();
    },
    methods:{
        async loadData(){
            try{
                var req = await axios.get('/api/organization-tree/data')
                var organizationList = req.data;
                if(organizationList.constructor === Array){
                    this.organizationList = organizationList;
                }else{
                    this.organizationList = [];
                }
                //console.log(this.organizationList)
                //this.organizationList = organizationList;

            }catch(err){
                this.notificationAlert(err.response);
            }
        },
        async saveTree(){
            var data = {
                organizationList:this.organizationList,
            }
            axios.post('/api/organization-tree/data/update',data)
                .then(response => {
                    this.inputModalSt=false;
                    this.notificationAlert(response);
                })
                .catch(error => {

                    this.notificationAlert(error.response);
                })

        },

    }

}
</script>

<style>

</style>
