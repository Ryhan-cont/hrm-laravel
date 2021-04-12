(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"600D":function(t,e,a){"use strict";a.r(e);var o=a("o0o1"),r=a.n(o);function s(t,e,a,o,r,s,l){try{var i=t[s](l),n=i.value}catch(t){return void a(t)}i.done?e(n):Promise.resolve(n).then(o,r)}function l(t){return function(){var e=this,a=arguments;return new Promise((function(o,r){var l=t.apply(e,a);function i(t){s(l,o,r,i,n,"next",t)}function n(t){s(l,o,r,i,n,"throw",t)}i(void 0)}))}}var i={components:{},data:function(){return{workflowGroupModal:!1,workflowGroupModalName:null,workflowGroupName:null,workflowGroupModalSaveType:null,approvers:[],groupList:[],groupSelectedId:null,groupSelectedName:null,workflowGroupItemData:[],findGroup:"",workflowGroupItemModal:!1,workflowGroupItemModalName:null,workflowGroupItemName:null,workflowGroupItemModalSaveType:null,workflowItemSequence:null,approver:null,wf_process_id:null,work_group_id:null,final_stage:null,accept_text:null,pending_text:null,reject_text:null,sla:null,email_cc:null,workflowItemId:null,workGroupData:[],workGroupDataLoaded:!1,sla_type:null,slaTypeData:["Day","Hour"]}},created:function(){this.loadData(),this.fetchUserList()},mounted:function(){},methods:{loadData:function(){var t=arguments,e=this;return l(r.a.mark((function a(){var o;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t.length>0&&void 0!==t[0]?t[0]:null,a.prev=1,a.next=4,axios.get("/api/wf-process-defs/list");case 4:o=a.sent,e.groupList=o.data.data,a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),a.t0.response?e.notificationAlert(a.t0.response):console.log(a.t0);case 11:case"end":return a.stop()}}),a,null,[[1,8]])})))()},workflowGroup:function(t){var e=this;return l(r.a.mark((function a(){var o,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(e.btnDisabled=!0,o={name:e.workflowGroupName},a.prev=2,"create"!=t){a.next=8;break}return a.next=6,axios.post("/api/wf-process-defs/create/group",o);case 6:(s=a.sent)&&e.notificationAlert(s);case 8:if("update"!=t){a.next=13;break}return a.next=11,axios.put("/api/wf-process-defs/update/group/"+e.groupSelectedId,o);case 11:(s=a.sent)&&e.notificationAlert(s);case 13:if("delete"!=t){a.next=18;break}return a.next=16,axios.delete("/api/wf-process-defs/delete/group/"+e.groupSelectedId);case 16:(s=a.sent)&&e.notificationAlert(s);case 18:e.workflowGroupModal=!1,e.loadData(),a.next=25;break;case 22:a.prev=22,a.t0=a.catch(2),a.t0.response?e.notificationAlert(a.t0.response):console.log(a.t0);case 25:e.btnDisabled=!1;case 26:case"end":return a.stop()}}),a,null,[[2,22]])})))()},setGroupData:function(t,e){var a=this;return l(r.a.mark((function o(){return r.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:a.groupList.map((function(t){return t.activeBtn=!1,t})),a.groupList[e].activeBtn=!0,a.groupSelectedId=t.id,a.groupSelectedName=t.name,a.loadGroupData();case 5:case"end":return o.stop()}}),o)})))()},loadGroupData:function(){var t=this;return l(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.$vs.loading({container:"#wf-cont-right-box",scale:.9}),e.next=4,axios.get("/api/wf-process-defs/items/"+t.groupSelectedId);case 4:a=e.sent,t.workflowGroupItemData=a.data.data,t.$vs.loading.close("#wf-cont-right-box > .con-vs-loading"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),e.t0.response?t.notificationAlert(e.t0.response):console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},loadWorkGroupData:function(){var t=this;return l(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=t.workGroupDataLoaded){e.next=12;break}return e.prev=1,e.next=4,axios.get("/api/wf-process-defs/list/work-group");case 4:a=e.sent,t.workGroupData=a.data.data,t.workGroupDataLoaded=!0,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),e.t0.response?t.notificationAlert(e.t0.response):console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))()},manageWorkflowGroupItem:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(a){if(e.loadWorkGroupData(),"create-first"==t){a={sequence:1,wf_process_id:e.groupSelectedId,id:"create-first"};t="create"}"create"==t&&(e.workflowGroupItemModal=!0,e.workflowGroupItemModalName="Add Step in the Work Flow Process",e.workflowGroupItemModalSaveType=t,e.workflowItemSequence=a.sequence,e.approver=null,e.wf_process_id=a.wf_process_id,e.work_group_id=null,e.final_stage=!1,e.accept_text=null,e.pending_text=null,e.reject_text=null,e.sla=null,e.email_cc=null,e.workflowItemId=a.id),"update"==t&&(e.workflowGroupItemModal=!0,e.workflowGroupItemModalName="Edit Work Flow Process",e.workflowGroupItemModalSaveType=t,e.approver=a.approver,e.work_group_id=a.work_group_id,e.final_stage=a.final_stage,e.accept_text=a.accept_text,e.pending_text=a.pending_text,e.reject_text=a.reject_text,e.sla_type=a.sla_type,e.sla=a.sla,e.email_cc=a.email_cc,e.workflowItemId=a.id),"delete"==t&&(e.workflowGroupModalSaveType=t,e.workflowItemId=a.id,e.$vs.dialog({type:"confirm",color:"danger",title:"Confirm",text:"Are you sure, you want to delete this user?",acceptText:"ok",accept:e.workflowGroupItem,parameters:"delete"}))}(a)},workflowGroupItem:function(t){var e=this;return l(r.a.mark((function a(){var o,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(e.btnDisabled=!0,a.prev=1,"create"!=t){a.next=14;break}return o={sequence:e.workflowItemSequence,approver:e.approver,work_group_id:e.work_group_id,wf_process_id:e.wf_process_id,final_stage:e.final_stage,accept_text:e.accept_text,pending_text:e.pending_text,reject_text:e.reject_text,sla_type:e.sla_type,sla:e.sla,sla_minutes:e.slaInMinutes,email_cc:e.email_cc,id:e.workflowItemId},a.prev=4,a.next=7,axios.post("/api/wf-process-defs/create/item",o);case 7:(s=a.sent)&&(e.notificationAlert(s),e.workflowGroupItemModal=!1,e.loadGroupData()),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(4),a.t0.response?e.notificationAlert(a.t0.response):console.log(a.t0);case 14:if("update"!=t){a.next=26;break}return o={approver:e.approver,work_group_id:e.work_group_id,final_stage:e.final_stage,accept_text:e.accept_text,pending_text:e.pending_text,reject_text:e.reject_text,sla_type:e.sla_type,sla:e.sla,sla_minutes:e.slaInMinutes,email_cc:e.email_cc},a.prev=16,a.next=19,axios.put("/api/wf-process-defs/update/item/"+e.workflowItemId,o);case 19:(s=a.sent)&&(e.notificationAlert(s),e.workflowGroupItemModal=!1,e.loadGroupData()),a.next=26;break;case 23:a.prev=23,a.t1=a.catch(16),a.t1.response?e.notificationAlert(a.t1.response):console.log(a.t1);case 26:if("delete"!=t){a.next=31;break}return a.next=29,axios.delete("/api/wf-process-defs/delete/item/"+e.workflowItemId);case 29:(s=a.sent)&&(e.notificationAlert(s),e.loadGroupData());case 31:a.next=36;break;case 33:a.prev=33,a.t2=a.catch(1),a.t2.response?e.notificationAlert(a.t2.response):console.log(a.t2);case 36:case"end":return a.stop()}}),a,null,[[1,33],[4,11],[16,23]])})))()},fetchUserList:function(){var t=this;axios.get("/api/work-group/list/users").then((function(e){t.approvers=e.data.data})).catch((function(e){t.notificationAlert(e.response)}))}},computed:{filteredGroups:function(){var t=new RegExp(this.findGroup,"i");return this.groupList.filter((function(e){return e.name.match(t)}))},slaInMinutes:function(){var t=0;return"Hour"===this.sla_type?t=60*this.sla:"Day"===this.sla_type&&(t=24*this.sla*60),t},enableAddNew:function(){return 0===this.workflowGroupItemData.length}},watch:{}},n=(a("EPeo"),a("KHd+")),c=Object(n.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("vx-card",{attrs:{title:""}},[a("div",{staticStyle:{border:"1px solid #f0f0f0"},attrs:{id:"wf-cont-main-box"}},[a("div",{attrs:{id:"wf-cont-left-box"}},[a("div",{staticClass:"group-head"},[a("div",{staticClass:"flex"},[a("div",{staticClass:"flex-auto"},[a("vs-input",{staticClass:"w-full",attrs:{size:"small",type:"text"},model:{value:t.findGroup,callback:function(e){t.findGroup=e},expression:"findGroup"}})],1)])]),t._v(" "),a("div",t._l(t.filteredGroups,(function(e,o){return a("div",{key:o,staticClass:"flex p-3 m-1 cursor-pointer hover:bg-gray-100 overflow-hidden",style:1==e.activeBtn?"color:#511bc4; border:1px solid rgb(81, 27, 196,.1); background-color:#fcfaff":"border:1px solid rgba(0,0,0,.04)",on:{click:function(a){return t.setGroupData(e,o)}}},[a("div",{staticClass:"flex-auto",staticStyle:{padding:"4px 0px"}},[t._v(t._s(e.name))])])})),0)]),t._v(" "),a("div",{attrs:{id:"wf-cont-right-box"}},[null!=t.groupSelectedName?a("div",{staticClass:"flex"},[a("div",{staticClass:"p-3 m-1 flex-auto font-bold"},[t._v(t._s(t.groupSelectedName))]),t._v(" "),t.enableAddNew?a("div",{staticClass:"p-3 m-1"},[a("vs-button",{attrs:{disabled:t.btnDisabled,size:"small"},on:{click:function(e){return t.manageWorkflowGroupItem("create-first")}}},[t._v("Add\n                        ")])],1):t._e()]):t._e(),t._v(" "),a("div",{staticStyle:{"overflow-x":"auto"}},[a("div",{staticStyle:{"min-width":"650px"}},[null!=t.groupSelectedName?a("div",{staticClass:"p-3 bg-gray-100 m-1 flex"},[a("div",{staticClass:"flex",staticStyle:{width:"100%"}},[a("div",{staticClass:"workflow-group-item-header",staticStyle:{"max-width":"20%"}},[t._v("Sequence")]),t._v(" "),a("div",{staticClass:"workflow-group-item-header",staticStyle:{"max-width":"20%"}},[t._v("Approver")]),t._v(" "),a("div",{staticClass:"workflow-group-item-header",staticStyle:{"max-width":"20%"}},[t._v("Work Group")]),t._v(" "),a("div",{staticClass:"workflow-group-item-header",staticStyle:{"max-width":"20%"}},[t._v("Final Stage")]),t._v(" "),a("div",{staticClass:"workflow-group-item-header",staticStyle:{"max-width":"20%"}},[t._v("SLA")])]),t._v(" "),a("div",{staticClass:"text-center pt-3",staticStyle:{width:"85px"}},[t._v("Actions")])]):t._e(),t._v(" "),t._l(t.workflowGroupItemData,(function(e,o){return a("div",{key:o,staticClass:"px-3 bg-gray-50 m-1 flex"},[a("div",{staticClass:"flex",staticStyle:{width:"100%"}},[a("div",{staticClass:"workflow-group-item",staticStyle:{"max-width":"20%"}},[a("div",[t._v(t._s(e.sequence))])]),t._v(" "),a("div",{staticClass:"workflow-group-item",staticStyle:{"max-width":"20%"}},[a("div",[t._v(t._s(e.approver_name))])]),t._v(" "),a("div",{staticClass:"workflow-group-item",staticStyle:{"max-width":"20%"}},[a("div",[t._v(t._s(e.group_name))])]),t._v(" "),a("div",{staticClass:"workflow-group-item",staticStyle:{"max-width":"20%"}},[a("vs-button",{attrs:{color:"primary",icon:e.final_stage?"check":"close",type:"flat"}})],1),t._v(" "),a("div",{staticClass:"workflow-group-item",staticStyle:{"max-width":"20%"}},[a("div",[t._v(t._s(e.sla)+" "+t._s(e.sla_type))])])]),t._v(" "),a("div",{staticClass:"pt-3 px-2",staticStyle:{width:"85px"}},[a("feather-icon",{attrs:{icon:"FilePlusIcon",svgClasses:"h-5 w-5 hover:text-primary cursor-pointer"},on:{click:function(a){return t.manageWorkflowGroupItem("create",e)}}}),t._v(" "),a("feather-icon",{attrs:{icon:"Edit3Icon",svgClasses:"h-5 w-5 hover:text-primary cursor-pointer"},on:{click:function(a){return t.manageWorkflowGroupItem("update",e)}}}),t._v(" "),a("feather-icon",{attrs:{icon:"Trash2Icon",svgClasses:"h-5 w-5 hover:text-danger cursor-pointer"},on:{click:function(a){return t.manageWorkflowGroupItem("delete",e)}}})],1)])}))],2)])])])]),t._v(" "),a("vs-popup",{attrs:{active:t.workflowGroupItemModal,title:t.workflowGroupItemModalName},on:{"update:active":function(e){t.workflowGroupItemModal=e}}},[a("div",[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col md:w-1/2 w-full"},[a("vs-select",{staticClass:"w-full",attrs:{autocomplete:"",label:"Approver",placeholder:"Select an approver"},model:{value:t.approver,callback:function(e){t.approver=e},expression:"approver"}},t._l(t.approvers,(function(t,e){return a("vs-select-item",{key:e,attrs:{text:t.full_name+" ("+t.emp_id+")",value:t.user_id}})})),1)],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full"},[a("vs-select",{staticClass:"w-full",attrs:{autocomplete:"",label:"Work Group",placeholder:"Select work group"},model:{value:t.work_group_id,callback:function(e){t.work_group_id=e},expression:"work_group_id"}},t._l(t.workGroupData,(function(t,e){return a("vs-select-item",{key:e,attrs:{text:t.name,value:t.id}})})),1)],1)]),t._v(" "),a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col md:w-1/2 w-full"},[a("vs-select",{staticClass:"w-full mt-4",attrs:{autocomplete:"",label:"SLA Type"},model:{value:t.sla_type,callback:function(e){t.sla_type=e},expression:"sla_type"}},t._l(t.slaTypeData,(function(t,e){return a("vs-select-item",{key:e,attrs:{text:t,value:t}})})),1)],1),t._v(" "),a("div",{staticClass:"vx-col md:w-1/2 w-full"},[a("vs-input",{staticClass:"w-full mt-4",attrs:{label:"SLA"},model:{value:t.sla,callback:function(e){t.sla=e},expression:"sla"}}),t._v(" "),a("validate-data",{attrs:{value:t.sla,name:"sla",altName:"sla"}})],1)]),t._v(" "),a("div",{staticClass:"flex pt-2"},[a("div",{staticClass:"p-1"},[a("vs-input",{staticClass:"w-full",attrs:{label:"Accept Text"},model:{value:t.accept_text,callback:function(e){t.accept_text=e},expression:"accept_text"}}),t._v(" "),a("validate-data",{attrs:{value:t.accept_text,name:"accept_text",altName:"accept_text"}})],1),t._v(" "),a("div",{staticClass:"p-1"},[a("vs-input",{staticClass:"w-full",attrs:{label:"Reject Text"},model:{value:t.reject_text,callback:function(e){t.reject_text=e},expression:"reject_text"}}),t._v(" "),a("validate-data",{attrs:{value:t.reject_text,name:"reject_text",altName:"reject_text"}})],1),t._v(" "),a("div",{staticClass:"p-1"},[a("vs-input",{staticClass:"w-full",attrs:{label:"Pending Text"},model:{value:t.pending_text,callback:function(e){t.pending_text=e},expression:"pending_text"}}),t._v(" "),a("validate-data",{attrs:{value:t.pending_text,name:"pending_text",altName:"pending_text"}})],1)]),t._v(" "),a("div",[a("div",{staticClass:"p-1"},[a("vs-input",{staticClass:"w-full",attrs:{label:"Email CC"},model:{value:t.email_cc,callback:function(e){t.email_cc=e},expression:"email_cc"}})],1)]),t._v(" "),a("div",{staticClass:"flex pt-1"},[a("div",{staticClass:"p-2"},[a("vs-checkbox",{attrs:{size:"small"},model:{value:t.final_stage,callback:function(e){t.final_stage=e},expression:"final_stage"}},[t._v("Final Stage")])],1)])]),t._v(" "),a("div",{staticClass:"pt-6 flex"},[a("div",{staticClass:"flex-auto"}),t._v(" "),"create"==t.workflowGroupItemModalSaveType?a("div",[a("vs-button",{attrs:{disabled:t.btnDisabled,variant:"success"},on:{click:function(e){return t.workflowGroupItem("create")}}},[t._v(" Add\n                ")])],1):t._e(),t._v(" "),"update"==t.workflowGroupItemModalSaveType?a("div",[a("vs-button",{attrs:{disabled:t.btnDisabled,variant:"success"},on:{click:function(e){return t.workflowGroupItem("update")}}},[t._v(" Update\n                ")])],1):t._e()])])],1)}),[],!1,null,"af462c86",null);e.default=c.exports},EPeo:function(t,e,a){"use strict";a("oJhA")},S2Hl:function(t,e,a){(t.exports=a("I1BE")(!1)).push([t.i,"#wf-cont-main-box[data-v-af462c86]{display:flex}#wf-cont-left-box[data-v-af462c86]{width:20%}#wf-cont-right-box[data-v-af462c86]{width:80%;border-left:1px solid #f0f0f0}@media (max-width:900px){#wf-cont-left-box[data-v-af462c86]{width:30%}#wf-cont-right-box[data-v-af462c86]{width:70%}}@media (max-width:550px){#wf-cont-main-box[data-v-af462c86]{display:block}#wf-cont-left-box[data-v-af462c86]{width:100%}#wf-cont-right-box[data-v-af462c86]{width:100%;margin-top:30px}}.group-head[data-v-af462c86]{padding:10px;background-color:#f7f7f7;border-bottom:1px solid #f0f0f0}.workflow-group-item-header[data-v-af462c86]{text-overflow:ellipsis}.workflow-group-item[data-v-af462c86],.workflow-group-item-header[data-v-af462c86]{padding:10px 5px;flex:1;overflow:hidden}",""])},oJhA:function(t,e,a){var o=a("S2Hl");"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(o,r);o.locals&&(t.exports=o.locals)}}]);