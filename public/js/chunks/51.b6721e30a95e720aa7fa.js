(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{pVUI:function(t,e,s){"use strict";s.r(e);var a=s("o0o1"),i=s.n(a);function n(t,e,s,a,i,n,l){try{var r=t[n](l),o=r.value}catch(t){return void s(t)}r.done?e(o):Promise.resolve(o).then(a,i)}function l(t){return function(){var e=this,s=arguments;return new Promise((function(a,i){var l=t.apply(e,s);function r(t){n(l,a,i,r,o,"next",t)}function o(t){n(l,a,i,r,o,"throw",t)}r(void 0)}))}}var r={components:{},data:function(){return{moduleData:[],inputModalSt:!1,modalTitle:null,modalType:null,errorData:{},name:"",apiname:"",url:"",id:"",icon:"",is_visible:null,is_active:null,site_active:null,disable_note:"",remark:"",moduleGroupData:["xxx","yyy"],moduleGroup:null,subpermissionTitle:"",subpermissionName:"",subpermissions:[],defaultSubpermissions:[{name:"create",title:"Create",status:!1},{name:"update",title:"Update",status:!1},{name:"delete",title:"Delete",status:!1}],type:"Feature",moduleType:["Feature","Dev","General"],typeId:{Feature:"01",Dev:"02",General:"03"},typeDecode:{"01":"Feature","02":"Dev","03":"General"}}},mounted:function(){this.loadData()},methods:{loadData:function(){var t=this;return l(i.a.mark((function e(){var s,a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("/api/module/data");case 3:for(s=e.sent,a=s.data,n=0;a.length>n;n++)a[n].filteredView=!0;t.moduleData=a,console.log(t.moduleData),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),t.notificationAlert(e.t0.response),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()},inputModal:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(this.inputModalSt=!this.inputModalSt,this.modalType=t,this.subpermissionName="",this.addSubPermission=!1,"new"==t)this.modalTitle="Add new module",this.name="",this.apiname="",this.url="",this.is_visible=!0,this.is_active=!0,this.site_active=!0,this.icon="",this.disable_note="",this.remark="",this.type="Feature",this.moduleGroup=null,this.subpermissions=this.defaultSubpermissions.map((function(t){return Object.assign({},t)})),this.errorData={};else if("edit"==t){for(var s=this.defaultSubpermissions.map((function(t){return Object.assign({},t)})),a={},i=[],n=0;e.subpermissions.length>n;n++){var l=e.subpermissions[n].name;"view"==l||"create"==l||"update"==l||"delete"==l?a[l]=e.subpermissions[n]:i.push(e.subpermissions[n])}var r=[];for(n=0;s.length>n;n++)a[s[n].name]?r.push(a[s[n].name]):r.push(s[n]);for(n=0;i.length>n;n++)r.push(i[n]);this.modalTitle="Edit module",this.name=e.name,this.apiname=e.apiname,this.url=e.url,this.is_visible=e.is_visible,this.is_active=e.is_active,this.site_active=e.site_active,this.icon=e.icon,this.disable_note=e.disable_note,this.remark=e.remark,this.id=e.id,this.type=this.typeDecode[e.type],this.moduleGroup=e.module_group,this.subpermissions=r,this.errorData={}}},createModule:function(){var t=this;return l(i.a.mark((function e(){var s,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.btnDisabled=!0,t.errorData={},e.prev=2,s={name:t.name,apiname:t.apiname,url:t.url,is_visible:t.is_visible,is_active:t.is_active,site_active:t.site_active,icon:t.icon,disable_note:t.disable_note,remark:t.remark,type:t.typeId[t.type],module_group:t.moduleGroup,subpermissions:t.cleanSubpermissions(t.subpermissions)},e.next=6,axios.post("/api/module/create",s);case 6:(a=e.sent)&&(t.inputModalSt=!1,t.notificationAlert(a),t.loadData()),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(2),t.errorData=e.t0.response.data.errors,t.notificationAlert(e.t0.response);case 14:case"end":return e.stop()}}),e,null,[[2,10]])})))()},editModule:function(){var t=this;return l(i.a.mark((function e(){var s,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.btnDisabled=!0,t.errorData={},e.prev=2,s={name:t.name,apiname:t.apiname,url:t.url,is_visible:t.is_visible,is_active:t.is_active,site_active:t.site_active,icon:t.icon,disable_note:t.disable_note,remark:t.remark,id:t.id,type:t.typeId[t.type],module_group:t.moduleGroup,subpermissions:t.cleanSubpermissions(t.subpermissions)},e.next=6,axios.post("/api/module/update",s);case 6:(a=e.sent)&&(t.inputModalSt=!1,t.notificationAlert(a),t.loadData()),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),t.notificationAlert(e.t0.response);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})))()},cleanSubpermissions:function(t){for(var e=[],s=0;t.length>s;s++)1==t[s].status&&e.push(t[s]);return e},addSubPermissions:function(){if(null!=this.subpermissionName&&null!=this.subpermissionTitle){var t={name:this.subpermissionName,title:this.subpermissionTitle,status:!0};this.subpermissions.push(t),this.subpermissionName=null,this.subpermissionTitle=null}},deleteData:function(t){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm",text:"Are you sure, you want to delete this module?",acceptText:"ok",accept:this.deleteDataProceed,parameters:t})},deleteDataProceed:function(t){var e=this;return l(i.a.mark((function s(){var a,n;return i.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,a={id:t.id},s.next=4,axios.post("/api/module/delete",a);case 4:(n=s.sent)&&(e.notificationAlert(n),e.loadData()),s.next=11;break;case 8:s.prev=8,s.t0=s.catch(0),e.notificationAlert(s.t0.response);case 11:case"end":return s.stop()}}),s,null,[[0,8]])})))()}}},o=s("KHd+"),u=Object(o.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("vx-card",{attrs:{title:"Module Manager"}},[s("div",[s("div",{staticClass:"flex"},[s("div",{staticClass:"flex-auto"}),t._v(" "),s("div",[s("vs-button",{attrs:{size:"small","icon-pack":"feather",icon:"icon-plus"},on:{click:function(e){return t.inputModal("new")}}},[t._v("Add New\n                ")])],1)]),t._v(" "),s("div",{staticClass:"pt-3",staticStyle:{"min-height":"300px"}},[s("vs-table",{attrs:{search:"",pagination:"",stripe:"",data:t.moduleData},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data;return t._l(a,(function(e,a){return s("vs-tr",{key:a},[s("vs-td",{attrs:{data:e.name}},[t._v("\n                            "+t._s(e.name)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.apiname}},[t._v("\n                            "+t._s(e.apiname)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.url}},[t._v("\n                            "+t._s(e.url)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.icon}},[t._v("\n                            "+t._s(e.icon)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.is_visible}},[t._v("\n                            "+t._s(e.is_visible)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.is_active}},[t._v("\n                            "+t._s(e.is_active)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.site_active}},[t._v("\n                            "+t._s(e.site_active)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.remark}},[t._v("\n                            "+t._s(e.remark)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.disable_note}},[t._v("\n                            "+t._s(e.disable_note)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.type}},[t._v("\n                            "+t._s(t.typeDecode[e.type])+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.type}},[t._v("\n                            "+t._s(e.module_group)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:e.subpermissions}},[s("div",{staticClass:"flex flex-wrap"},t._l(e.subpermissions,(function(e,a){return s("div",{key:a,staticClass:"m-1 px-2 rounded-lg bg-gray-300"},[t._v(t._s(e.title)+"\n                                ")])})),0)]),t._v(" "),s("vs-td",{staticClass:"w-10"},[s("div",{staticClass:"flex pt-1"},[s("div",{staticClass:"flex-auto cursor-pointer",attrs:{align:"center"},on:{click:function(s){return t.inputModal("edit",e)}}},[s("i",{staticClass:"material-icons text-lg icon align"},[t._v("edit")])]),t._v(" "),s("div",{staticClass:"flex-auto cursor-pointer",attrs:{align:"center"},on:{click:function(s){return t.deleteData(e)}}},[s("i",{staticClass:"material-icons text-lg icon align"},[t._v("delete")])])])])],1)}))}}])},[s("template",{slot:"thead"},[s("vs-th",[t._v("Name")]),t._v(" "),s("vs-th",[t._v("API Name")]),t._v(" "),s("vs-th",[t._v("Url")]),t._v(" "),s("vs-th",[t._v("Icon")]),t._v(" "),s("vs-th",[t._v("Visible")]),t._v(" "),s("vs-th",[t._v("Active")]),t._v(" "),s("vs-th",[t._v("Active in site")]),t._v(" "),s("vs-th",[t._v("Remark")]),t._v(" "),s("vs-th",[t._v("Disable Note")]),t._v(" "),s("vs-th",[t._v("Type")]),t._v(" "),s("vs-th",[t._v("Module Group")]),t._v(" "),s("vs-th",[t._v("Subpermissions")]),t._v(" "),s("vs-th",{staticClass:"w-10 text-center"},[t._v("Action")])],1)],2)],1),t._v(" "),s("vs-popup",{attrs:{title:t.modalTitle,active:t.inputModalSt},on:{"update:active":function(e){t.inputModalSt=e}}},[s("form",[s("div",{},[s("vs-input",{staticClass:"w-full pt-3",attrs:{"label-placeholder":"Name"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),t.errorData.name?s("div",{staticClass:"py-1 text-sm text-red-400"},[t._v(t._s(t.errorData.name[0]))]):t._e(),t._v(" "),s("vs-input",{staticClass:"w-full pt-3",attrs:{"label-placeholder":"API Name"},model:{value:t.apiname,callback:function(e){t.apiname=e},expression:"apiname"}}),t._v(" "),t.errorData.apiname?s("div",{staticClass:"py-1 text-sm text-red-400"},[t._v(t._s(t.errorData.apiname[0]))]):t._e(),t._v(" "),s("vs-input",{staticClass:"w-full pt-3",attrs:{"label-placeholder":"URL"},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}}),t._v(" "),t.errorData.url?s("div",{staticClass:"py-1 text-sm text-red-400"},[t._v(t._s(t.errorData.url[0]))]):t._e(),t._v(" "),s("vs-input",{staticClass:"w-full pt-3",attrs:{"label-placeholder":"Icon"},model:{value:t.icon,callback:function(e){t.icon=e},expression:"icon"}}),t._v(" "),s("div",{staticClass:"pt-2"},[s("search-box",{attrs:{label:"Module Group",items:t.moduleGroupData},model:{value:t.moduleGroup,callback:function(e){t.moduleGroup=e},expression:"moduleGroup"}})],1),t._v(" "),s("div",{staticClass:"flex pt-5"},[s("div",{staticClass:"flex-auto pr-1"},[s("vs-checkbox",{model:{value:t.is_visible,callback:function(e){t.is_visible=e},expression:"is_visible"}},[t._v("Visible")])],1),t._v(" "),s("div",{staticClass:"flex-auto pl-1"},[s("vs-checkbox",{model:{value:t.is_active,callback:function(e){t.is_active=e},expression:"is_active"}},[t._v("Active")])],1),t._v(" "),s("div",{staticClass:"flex-auto pl-1"},[s("vs-checkbox",{model:{value:t.site_active,callback:function(e){t.site_active=e},expression:"site_active"}},[t._v("Active in site")])],1)]),t._v(" "),s("vs-input",{staticClass:"pt-3 w-full",attrs:{"label-placeholder":"Remark"},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}}),t._v(" "),s("vs-input",{staticClass:"pt-3 w-full",attrs:{"label-placeholder":"Disable Note"},model:{value:t.disable_note,callback:function(e){t.disable_note=e},expression:"disable_note"}})],1),t._v(" "),s("div",{staticClass:"flex-auto pt-3"},[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Type",label:"Type"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.moduleType,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t,text:t}})})),1)],1),t._v(" "),s("div",{staticClass:"pt-3"},[s("div",{staticClass:"font-bold pt-3 pr-3"},[t._v("Sub-Permissions:")]),t._v(" "),s("div",t._l(t.subpermissions,(function(e,a){return s("div",{key:a,staticClass:"pt-3"},[s("vs-checkbox",{attrs:{size:"small"},model:{value:e.status,callback:function(s){t.$set(e,"status",s)},expression:"item.status"}},[t._v(t._s(e.title))])],1)})),0)]),t._v(" "),s("div",{staticClass:"flex pt-3"},[s("div",[s("vs-button",{attrs:{size:"small"},on:{click:function(e){return t.addSubPermissions()}}},[t._v("Add custom permissions")])],1),t._v(" "),s("div",{staticClass:"px-1 flex-auto"},[s("vs-input",{staticClass:"w-full",attrs:{placeholder:"Title",size:"small"},model:{value:t.subpermissionTitle,callback:function(e){t.subpermissionTitle=e},expression:"subpermissionTitle"}})],1),t._v(" "),s("div",{staticClass:"px-1 flex-auto"},[s("vs-input",{staticClass:"w-full",attrs:{placeholder:"Name",size:"small"},model:{value:t.subpermissionName,callback:function(e){t.subpermissionName=e},expression:"subpermissionName"}})],1)]),t._v(" "),s("div",{staticClass:"mt-8"},["new"==t.modalType?s("div",{staticClass:"pt-1",attrs:{align:"right"}},[s("vs-button",{attrs:{disabled:t.btnDisabled},on:{click:function(e){return t.createModule()}}},[t._v("Create")])],1):t._e(),t._v(" "),"edit"==t.modalType?s("div",{staticClass:"pt-1",attrs:{align:"right"}},[s("vs-button",{attrs:{disabled:t.btnDisabled},on:{click:function(e){return t.editModule()}}},[t._v("Update")])],1):t._e()])])])],1)])}),[],!1,null,null,null);e.default=u.exports}}]);