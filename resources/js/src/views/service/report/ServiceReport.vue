<template>
<div>
    <vx-card title="">
      <div id="wf-cont-main-box">
        <div id="wf-cont-left-box">
          <div class="group-head">
            <div class="pb-2 mb-2 flex" style="border-bottom: 1px solid rgba(0, 0, 0, 0.05)" >
                <div class="flex-auto pt-1">Report</div>
                <div class="pl-1">
                    <vs-button size="small" icon-pack="feather" icon="icon-plus" @click="manageReport('create')"></vs-button>
                </div>
            </div>
            <div class="flex">
              <div class="flex-auto">
                <vs-input size="small" type="text" class="w-full" v-model="findReport" />
              </div>
            </div>
          </div>
          <div>
            <div v-for="(item, index) in filteredGroups" :key="index" class="flex p-3 m-1 cursor-pointer hover:bg-gray-100 overflow-hidden" :style=" item.activeBtn == true ? 'color:#511bc4; border:1px solid rgb(81, 27, 196,.1); background-color:#fcfaff' : 'border:1px solid rgba(0,0,0,.04)' " @click="setGroupData(item, index)" >
              <div class="flex-auto" style="padding: 4px 0px">{{ item.name }}</div>
            </div>
          </div>
        </div>

        <div id="wf-cont-right-box">
            <div class="flex" v-if="reportSelectedName != null">
                <div class="p-3 m-1 flex-auto font-bold">{{reportSelectedName}}</div>
            </div>
            <div class="p-3">
                <div v-if="moduleSelected == 27"><id-card-report /></div>
                <div v-if="moduleSelected == 28"><business-card-report /></div>
            </div>
        </div>
      </div>
    </vx-card>
</div>
    
</template>

<script>
import IdCardReport from "./IdCardReport";
import BusinessCardReport from "./BusinessCardReport";
export default {
    components: {
        'id-card-report':IdCardReport,
        'business-card-report':BusinessCardReport
    },
    data() {
        return {
            reportList:[],
            findReport:'',

            loadReport:null,

            reportSelectedName:null,
            moduleSelected:null,


        };
    },
    created() {
        
    },

    mounted(){
        this.loadData();
    },

    methods: {
        async loadData(select = null) {
            try {
                var req = await axios.get("/api/workflow-process/list");
                this.reportList = req.data.data;
            } catch (err) {
                if(err.response){this.notificationAlert(err.response);}else{console.log(err);}
            }
        },
        async setGroupData(item, index) {
            var reportList = _.cloneDeep(this.reportList);
            reportList.map(reportItem => {reportItem.activeBtn = false; return reportItem;})
            reportList[index].activeBtn = true;
            this.reportList = reportList;

            this.reportSelectedName = item.name;
            this.moduleSelected = item.moduleId;

        },
    },
    computed: {
        filteredGroups() {
            let filter = new RegExp(this.findReport, "i");
            return this.reportList.filter((el) => el.name.match(filter));
        },
    },
}
</script>

<style scoped>
#wf-cont-main-box{
  display:flex;
  border: 1px solid #f0f0f0
}
#wf-cont-left-box{
  width: 20%;
}
#wf-cont-right-box{
  width: 80%;
  border-left: 1px solid #f0f0f0;
}
@media (max-width:900px) {
  #wf-cont-left-box{width: 30%;}
  #wf-cont-right-box{ width: 70%;}
}
@media (max-width:650px) {
  #wf-cont-main-box{display:block;}
  #wf-cont-left-box{width: 100%;}
  #wf-cont-right-box{ width: 100%; margin-top:30px;}
}
</style>