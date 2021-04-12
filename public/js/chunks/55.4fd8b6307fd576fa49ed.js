(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{UGTm:function(t,a,e){"use strict";e.r(a);var i=e("o0o1"),n=e.n(i);function o(t,a,e,i,n,o,s){try{var r=t[o](s),c=r.value}catch(t){return void e(t)}r.done?a(c):Promise.resolve(c).then(i,n)}var s={components:{},data:function(){return{notify:null,notify_type:null,moduleData:[],inputModalSt:!1,modalTitle:null,modalType:null,organizations:[],users:[],orgTypes:[],rcCodes:[],name:"",type:"",rccode:"",organizationHead:"",id:null}},created:function(){},mounted:function(){this.loadData(),this.fetchRcCodes(),this.fetchOrgTypes()},methods:{loadData:function(){var t=this;axios.get("/api/organization-manager/data").then((function(a){t.organizations=a.data.organizations})).catch((function(a){t.notificationAlert(a.response)}))},resetCheck:function(){"new"!==this.modalType&&(this.notify=null,this.modalType="check")},inputModal:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];console.log(a),this.notify=null,this.resetError(),this.inputModalSt=!this.inputModalSt,this.modalType=t,"new"===t?(this.fetchUserList(2),this.modalTitle="Add New Organization",this.name="",this.type="",this.rccode="",this.organizationHead=null):"check"===t&&(this.fetchUserList(),this.modalTitle="Checking Organization",this.name=a.name,this.type=a.org_type_id,this.rccode=a.rc_code_id,this.organizationHead=a.org_head_id,this.id=a.id)},create:function(){var t=this;this.btnDisabled=!0;var a={name:this.name,type:this.type,rccode:this.rccode,organizationHead:this.organizationHead};axios.post("/api/organization-manager/data/create",a).then((function(a){t.inputModalSt=!1,t.loadData(),t.notificationAlert(a)})).catch((function(a){t.notificationAlert(a.response)}))},updateCheck:function(){var t=this,a={name:this.name,type:this.type,url:this.url,rccode:this.rccode,organizationHead:this.organizationHead,id:this.id};axios.post("api/organization-manager/data/update-check",a).then((function(a){t.notify=a.data.notify,t.notify_type=a.data.notify_type,t.modalType="edit"})).catch((function(t){console.log(t)}))},update:function(){var t=this;this.btnDisabled=!0;var a={name:this.name,type:this.type,url:this.url,rccode:this.rccode,organizationHead:this.organizationHead,id:this.id};axios.post("api/organization-manager/data/update",a).then((function(a){console.log(a.data),t.inputModalSt=!t.inputModalSt,t.loadData(),t.notificationAlert(a)})).catch((function(a){t.notificationAlert(a.response)}))},deleteOrganization:function(t){var a,e=this;return(a=n.a.mark((function a(){var i;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e.btnDisabled=!0,i={id:t.id},axios.delete("/api/organization-manager/data/delete",{params:i}).then((function(a){var i=e.organizations.findIndex((function(a){return a.id===t.id}));e.organizations.splice(i,1),e.notificationAlert(a)})).catch((function(t){e.notificationAlert(t.response)}));case 3:case"end":return a.stop()}}),a)})),function(){var t=this,e=arguments;return new Promise((function(i,n){var s=a.apply(t,e);function r(t){o(s,i,n,r,c,"next",t)}function c(t){o(s,i,n,r,c,"throw",t)}r(void 0)}))})()},fetchUserList:function(t){var a=this,e={head:t};axios.get("api/user-list/data/list",{params:e}).then((function(t){a.users=t.data.users})).catch((function(t){a.notificationAlert(t.response)}))},fetchRcCodes:function(){var t=this;axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_RC_CODE)).then((function(a){t.rcCodes=a.data.items})).catch((function(a){t.notificationAlert(a.response)}))},fetchOrgTypes:function(){var t=this;axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ORG_TYPE)).then((function(a){t.orgTypes=a.data.items})).catch((function(a){t.notificationAlert(a.response)}))}}},r=e("KHd+"),c=Object(r.a)(s,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("vx-card",{attrs:{title:""}},[e("div",[e("div",{},[e("div",{staticClass:"flex"},[e("div",{staticClass:"flex-auto"}),t._v(" "),e("div",[e("vs-button",{attrs:{size:"small","icon-pack":"feather",icon:"icon-plus"},on:{click:function(a){return t.inputModal("new")}}},[t._v("Add\n                        New\n                    ")])],1)]),t._v(" "),e("div",{staticClass:"pt-3",staticStyle:{"min-height":"300px"}},[e("vs-table",{attrs:{"max-items":"10",search:"",pagination:"",stripe:"",data:t.organizations},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.data;return t._l(i,(function(a,i){return e("vs-tr",{key:i},[e("vs-td",{attrs:{data:a.name}},[t._v("\n                                "+t._s(a.name)+"\n                            ")]),t._v(" "),e("vs-td",{attrs:{data:a.type}},[t._v("\n                                "+t._s(a.type)+"\n                            ")]),t._v(" "),e("vs-td",{attrs:{data:a.rccode}},[t._v("\n                                "+t._s(a.rccode)+"\n                            ")]),t._v(" "),e("vs-td",{attrs:{data:a.org_head}},[t._v("\n                                "+t._s(a.org_head)+"\n                            ")]),t._v(" "),e("vs-td",{staticClass:"w-10"},[e("div",{staticClass:"flex pt-1"},[e("div",{staticClass:"flex-auto cursor-pointer",attrs:{align:"center"},on:{click:function(e){return t.inputModal("check",a)}}},[e("i",{staticClass:"material-icons text-lg icon align"},[t._v("edit")])]),t._v(" "),e("div",{staticClass:"flex-auto cursor-pointer",attrs:{align:"center"},on:{click:function(e){return t.actionConfirm(a,t.deleteOrganization,"Delete "+a.name)}}},[e("i",{staticClass:"material-icons text-lg icon align"},[t._v("delete")])])])])],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"name"}},[t._v("Name")]),t._v(" "),e("vs-th",[t._v("Type")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"rccode"}},[t._v("RC Code")]),t._v(" "),e("vs-th",[t._v("Organization Head")]),t._v(" "),e("vs-th",{staticClass:"w-10 text-center"},[t._v("Action")])],1)],2)],1)]),t._v(" "),e("vs-popup",{attrs:{title:t.modalTitle,active:t.inputModalSt},on:{"update:active":function(a){t.inputModalSt=a}}},[e("form",[e("div",{staticClass:"px-2"},[e("vs-input",{staticClass:"w-full pt-3",attrs:{"label-placeholder":"Name"},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),t._v(" "),e("validate-data",{attrs:{rules:"required",value:t.name,name:"name",altName:"name"}}),t._v(" "),e("div",{staticClass:"flex-auto pt-3 overflow-hidden"},[e("vs-select",{staticClass:"w-full",attrs:{placeholder:"Type",label:"Type",autocomplete:""},model:{value:t.type,callback:function(a){t.type=a},expression:"type"}},t._l(t.orgTypes,(function(t,a){return e("vs-select-item",{key:a,attrs:{value:t.value,text:t.label}})})),1)],1),t._v(" "),e("validate-data",{attrs:{rules:"required",value:t.type,name:"type",altName:"Organization Type"}}),t._v(" "),e("div",{staticClass:"flex-auto pt-3 overflow-hidden"},[e("vs-select",{staticClass:"w-full",attrs:{placeholder:"RC Code",label:"RC Code",autocomplete:""},model:{value:t.rccode,callback:function(a){t.rccode=a},expression:"rccode"}},t._l(t.rcCodes,(function(t,a){return e("vs-select-item",{key:a,attrs:{value:t.value,text:t.label}})})),1)],1),t._v(" "),e("validate-data",{attrs:{rules:"required",value:t.rccode,name:"rccode",altName:"rc code"}}),t._v(" "),e("div",{staticClass:"flex-auto pt-3 overflow-hidden"},[e("vs-select",{staticClass:"w-full",attrs:{placeholder:"Organization Head",label:"Organization Head",autocomplete:""},on:{input:t.resetCheck},model:{value:t.organizationHead,callback:function(a){t.organizationHead=a},expression:"organizationHead"}},t._l(t.users,(function(t,a){return e("vs-select-item",{key:a,attrs:{value:t.id,text:t.full_name}})})),1)],1),t._v(" "),e("br"),t._v(" "),e("p",{class:t.notify_type},[t._v(t._s(t.notify))]),t._v(" "),e("div",{staticClass:"mt-8"},["new"==t.modalType?e("div",{staticClass:"pt-1",attrs:{align:"right"}},[e("vs-button",{attrs:{disabled:t.btnDisabled},on:{click:function(a){return t.create()}}},[t._v("Create")])],1):"check"==t.modalType?e("div",{staticClass:"pt-1",attrs:{align:"right"}},[e("vs-button",{attrs:{disabled:t.btnDisabled},on:{click:t.updateCheck}},[t._v("Check")])],1):"edit"==t.modalType?e("div",{staticClass:"pt-1",attrs:{align:"right"}},[e("vs-button",{attrs:{disabled:t.btnDisabled},on:{click:t.update}},[t._v("Update")])],1):t._e()])],1)])])],1)])}),[],!1,null,null,null);a.default=c.exports}}]);