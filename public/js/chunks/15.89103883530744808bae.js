(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"7pj3":function(t,e,s){"use strict";s("POw6")},CgeC:function(t,e,s){(t.exports=s("I1BE")(!1)).push([t.i,".vx-timeline{margin-left:1.5rem;padding-left:40px;border-left:2px solid #e5e8eb}.theme-dark .vx-timeline{border-color:#414561}.vx-timeline li{position:relative;margin-bottom:20px}.vx-timeline li .timeline-icon{position:absolute;top:0;left:-4.3rem;border-radius:50%;padding:.75rem .75rem .4rem}.vx-timeline li .activity-desc{font-size:.9rem}.vx-timeline li .activity-e-time{font-size:.8rem}",""])},Dxee:function(t,e,s){"use strict";var i={name:"RequestAction",data:function(){return{request_id:this.$route.query.request_id,req_id:this.$route.query.id,ref_id:this.$route.query.ref_id,remarks:null,request_Info:"",backgroundLoading:"primary",colorLoading:"#fff"}},created:function(){},mounted:function(){var t=this;this.$root.$on("eventingPermissions",(function(e){t.request_Info=e}))},methods:{createWfLog:function(t){var e=this,s={module_id:this.$store.state.moduleId,req_id:this.req_id,ref_id:this.ref_id,remarks:this.remarks,status:t.status};-1!==s.status&&-2!==s.status||s.remarks?(this.$vs.loading({container:"#div-with-loading",scale:.6}),this.btnDisabled=!0,this.$http.post("/api/work-flow/create-action",s).then((function(t){e.notificationAlert(t),e.$vs.loading.close("#div-with-loading > .con-vs-loading"),e.$router.push("/dashboard")})).catch((function(t){e.$vs.loading.close("#div-with-loading > .con-vs-loading"),e.notificationAlert(t.response)}))):this.notificationAlert("Please write ".concat(-1===s.status?"rejection":"cancellation"," cause"),"".concat(-1===s.status?"Rejection":"Cancellation"," Cause"),"".concat(-1===s.status?"danger":"warning"))}}},a=s("KHd+"),n=Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",[s("vs-input",{attrs:{type:"hidden",name:"ref_id"},model:{value:t.ref_id,callback:function(e){t.ref_id=e},expression:"ref_id"}}),t._v(" "),s("div",{staticClass:"pt-6"},[s("vs-textarea",{attrs:{label:"Remark"},model:{value:t.remarks,callback:function(e){t.remarks=e},expression:"remarks"}})],1),t._v(" "),s("div",{staticClass:"flex justify-between flex-wrap"},[s("vs-button",{staticClass:"mt-4",attrs:{size:"small",color:"warning",disabled:t.btnDisabled},on:{click:function(e){return t.actionConfirm({status:-2},t.createWfLog,"Cancel "+t.request_id,"warning")}}},[t._v("Cancel\n            ")]),t._v(" "),t.request_Info.action_buttons?s("span",[s("vs-button",{staticClass:"mt-4",attrs:{size:"small",color:"danger",disabled:t.btnDisabled},on:{click:function(e){return t.actionConfirm({status:-1},t.createWfLog,"Reject "+t.request_id)}}},[t._v("Reject\n                ")]),t._v(" "),s("vs-button",{staticClass:"mt-4 vs-con-loading__container",attrs:{size:"small",disabled:t.btnDisabled},on:{click:function(e){return t.actionConfirm({status:0},t.createWfLog,"Accept "+t.request_id,"success")}}},[t._v("Accept\n                ")])],1):t._e()],1)],1)])}),[],!1,null,"ea8c3af8",null).exports,r={name:"vx-timeline",props:{data:{type:Array,required:!0}},data:function(){return{}}},o=(s("7pj3"),{name:"ActivityTimeline",components:{VxTimeline:Object(a.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"vx-timeline"},t._l(t.data,(function(e){return s("li",{key:e.ref_id},[s("div",{staticClass:"timeline-icon",class:"bg-"+e.color},[s("feather-icon",{attrs:{icon:e.icon,svgClasses:"text-white stroke-current w-5 h-5"}})],1),t._v(" "),s("div",{staticClass:"timeline-info"},[s("p",{staticClass:"font-semibold"},[t._v(t._s(e.action_by_name))]),t._v(" "),s("span",{staticClass:"activity-desc"},[t._v(t._s(e.action_text))]),t._v(" "),s("span",{staticClass:"activity-desc font-semibold"},[t._v(t._s(e.actual_requester_name?" by "+e.actual_requester_name+" on behalf of "+e.action_by_name:""))]),t._v(" "),s("span",{staticClass:"activity-desc italic"},[t._v(t._s(e.remarks))])]),t._v(" "),s("small",{staticClass:"text-grey activity-e-time"},[t._v(t._s(e.created_at))])])})),0)}),[],!1,null,null,null).exports},data:function(){return{timelineData:[]}},created:function(){this.fetchTimeline()},mounted:function(){},methods:{fetchTimeline:function(){var t=this;axios.get("/api/work-flow/timeline/".concat(this.$route.query.ref_id)).then((function(e){t.timelineData=e.data.timeline_data})).catch((function(t){console.log(t)}))}}}),l={name:"ViewRightBar",components:{RequestAction:n,ActivityTimeline:Object(a.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"vx-col w-full mb-base"},[e("vx-timeline",{attrs:{data:this.timelineData}})],1)])}),[],!1,null,"7155c98a",null).exports},data:function(){return{}},created:function(){},mounted:function(){},methods:{},computed:{isSmallerScreen:function(){return this.$store.state.windowWidth<768}},watch:{}},c=Object(a.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("vx-card",[e("vs-tabs",{key:this.isSmallerScreen,staticClass:"tabs-shadow-none",attrs:{position:(this.isSmallerScreen,"top"),id:"pending-tabs"}},[e("vs-tab",{attrs:{"icon-pack":"feather",icon:"icon-check-square",label:this.isSmallerScreen?"":"Action"}},[e("div",{staticClass:"tab-my-pending md:ml-4 md:mt-4 mt-4 ml-0"},[e("request-action")],1)]),this._v(" "),e("vs-tab",{attrs:{"icon-pack":"feather",icon:"icon-activity",label:this.isSmallerScreen?"":"History"}},[e("div",{staticClass:"tab-other-pending md:ml-4 md:mt-4 mt-4 ml-0"},[e("activity-timeline")],1)])],1)],1)}),[],!1,null,"628af762",null);e.a=c.exports},OFse:function(t,e,s){"use strict";s.r(e);var i={name:"create",data:function(){return{module_id:null,ref_id:null,reasons:[],reason:null,remarks:null,is_for_other:!1,employees:[],request_for:null}},created:function(){this.fetchReasons()},mounted:function(){},methods:{createRequest:function(){var t=this;if(!this.is_for_other||this.request_for){var e={module_id:this.$store.state.moduleId,ref_id:this.ref_id,reason:this.reason,remarks:this.remarks,status:0,is_for_other:this.is_for_other,request_for:this.request_for};this.btnDisabled=!0,this.$http.post("/api/id-card-request/create",e).then((function(e){t.notificationAlert(e),t.$router.push("/dashboard")})).catch((function(e){t.notificationAlert(e.response)}))}else this.notificationAlert("Please select an Employee to request for","Error","danger")},fetchReasons:function(){var t=this;axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ID_REQ_REASON)).then((function(e){t.reasons=e.data.items,t.$parent.$emit("eventingReasons",t.reasons)})).catch((function(e){t.notificationAlert(e.response)}))},fetchUserList:function(){var t=this;axios.get("/api/work-group/list/users").then((function(e){t.employees=e.data.data})).catch((function(e){t.notificationAlert(e.response)}))}},computed:{},watch:{is_for_other:function(){this.is_for_other&&this.fetchUserList()}}},a=s("KHd+"),n={name:"read",props:{data:{required:!0}},data:function(){return{reasons:[],req_info:{},req_id:this.$route.query.id,ref_id:this.$route.query.ref_id,reason:"",remarks:null,tableData:[]}},created:function(){this.fetchRequest()},mounted:function(){var t=this;this.$parent.$on("eventingReasons",(function(e){t.reasons=e}))},methods:{fetchRequest:function(){var t=this;axios.get("/api/id-card-request/data/".concat(this.$route.query.id)).then((function(e){t.req_info=e.data.req_info,t.data.edit_info&&(t.reason=e.data.req_info.reason_id,t.remarks=e.data.req_info.remarks)})).catch((function(t){console.log(t)}))},updateRequest:function(){var t=this,e={module_id:this.$store.state.moduleId,ref_id:this.ref_id,req_id:this.req_id,reason:this.reason,remarks:this.remarks,status:0};this.btnDisabled=!0,this.$http.put("/api/id-card-request/update/".concat(this.req_id),e).then((function(e){t.notificationAlert(e),t.$router.push("/dashboard")})).catch((function(e){t.notificationAlert(e.response)}))}}},r={components:{Create:Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("vx-card",[s("form",[s("vs-input",{attrs:{type:"hidden",name:"ref_id"},model:{value:t.ref_id,callback:function(e){t.ref_id=e},expression:"ref_id"}}),t._v(" "),s("div",[s("div",{staticClass:"flex-auto pt-3 overflow-hidden"},[s("vs-select",{staticClass:"w-1/2",attrs:{placeholder:"Reason",label:"Reason *",autocomplete:""},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}},t._l(t.reasons,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1),t._v(" "),s("validate-data",{attrs:{rules:"required",value:t.reason,name:"reason",altName:"Reason"}})],1),t._v(" "),s("div",{staticClass:"pt-6"},[s("vs-textarea",{attrs:{label:"Remark"},model:{value:t.remarks,callback:function(e){t.remarks=e},expression:"remarks"}})],1),t._v(" "),s("div",{staticClass:"vx-row"},[s("div",{staticClass:"vx-col md:w-1/4"},[s("vs-checkbox",{attrs:{size:"small"},model:{value:t.is_for_other,callback:function(e){t.is_for_other=e},expression:"is_for_other"}},[t._v("Request for Other")])],1)]),t._v(" "),t.is_for_other?s("div",{staticClass:"vx-row"},[s("div",{staticClass:"vx-col md:w-1/3 pt-3"},[s("vs-select",{staticClass:"w-full",attrs:{autocomplete:"",label:"Request for",placeholder:"Select an employee"},model:{value:t.request_for,callback:function(e){t.request_for=e},expression:"request_for"}},t._l(t.employees,(function(t,e){return s("vs-select-item",{key:e,attrs:{text:t.full_name+" ("+t.emp_id+")",value:t.user_id}})})),1)],1)]):t._e(),t._v(" "),s("div",{staticClass:"flex"},[s("div",{staticClass:"flex-auto"}),t._v(" "),s("div",[s("vs-button",{staticClass:"ml-auto mt-2",attrs:{size:"small",icon:"send",disabled:t.btnDisabled},on:{click:t.createRequest}},[t._v("Send")])],1)])],1)])],1)}),[],!1,null,"9d9c8406",null).exports,Read:Object(a.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"page-request-view"}},[s("vx-card",[s("div",{staticClass:"my-6"},[s("h5",{staticClass:"mb-2"},[t._v("Request ID # "),s("span",{staticClass:"text-primary"},[t._v(t._s(this.$route.query.request_id))])]),t._v(" "),s("vs-divider"),t._v(" "),t.data.edit_info?s("div",[s("form",[s("vs-input",{attrs:{type:"hidden",name:"ref_id"},model:{value:t.ref_id,callback:function(e){t.ref_id=e},expression:"ref_id"}}),t._v(" "),s("div",[s("div",{staticClass:"flex-auto pt-3 overflow-hidden"},[s("vs-select",{staticClass:"w-1/2",attrs:{placeholder:"Reason",label:"Reason *",autocomplete:""},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}},t._l(t.reasons,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1),t._v(" "),s("validate-data",{attrs:{rules:"required",value:t.reason,name:"reason",altName:"Reason"}})],1),t._v(" "),s("div",{staticClass:"pt-6"},[s("vs-textarea",{attrs:{label:"Remark"},model:{value:t.remarks,callback:function(e){t.remarks=e},expression:"remarks"}})],1),t._v(" "),s("div",{staticClass:"flex"},[s("div",{staticClass:"flex-auto"}),t._v(" "),s("div",[s("vs-button",{staticClass:"ml-auto mt-2",attrs:{size:"small",disabled:t.btnDisabled,icon:"send"},on:{click:t.updateRequest}},[t._v("Send")])],1)])],1)]):s("div",[s("vs-table",{attrs:{stripe:"",noDataText:"",data:t.tableData}},[s("vs-tr",[s("vs-th",[t._v("Reason")]),t._v(" "),s("vs-td",[t._v(t._s(t.req_info.reason))])],1),t._v(" "),s("vs-tr",[s("vs-th",[t._v("Remarks")]),t._v(" "),s("vs-td",[t._v(t._s(t.req_info.remarks))])],1)],1)],1)],1)])],1)}),[],!1,null,null,null).exports,ViewRightBar:s("Dxee").a},props:{},data:function(){return{isViewFile:!1,requestInfo:{}}},methods:{checkEditable:function(){var t=this;axios.get("/api/work-flow/data/".concat(this.$route.query.ref_id)).then((function(e){t.requestInfo=e.data.request_info,t.$root.$emit("eventingPermissions",e.data.request_info)})).catch((function(t){console.log(t)}))}},mounted:function(){this.$route.query.id&&(this.isViewFile=!0),this.isViewFile&&this.checkEditable()},created:function(){},computed:{},watch:{"$route.query.id":function(){this.isViewFile=!this.isViewFile}}},o=Object(a.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.isViewFile?this._e():e("create"),this._v(" "),this.isViewFile?e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col lg:w-3/5 w-full"},[e("read",{attrs:{data:this.requestInfo}})],1),this._v(" "),e("div",{staticClass:"vx-col lg:w-2/5 w-full"},[e("view-right-bar")],1)]):this._e()],1)}),[],!1,null,null,null);e.default=o.exports},POw6:function(t,e,s){var i=s("CgeC");"string"==typeof i&&(i=[[t.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(i,a);i.locals&&(t.exports=i.locals)}}]);