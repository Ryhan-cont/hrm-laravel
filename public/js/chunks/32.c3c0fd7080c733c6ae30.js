(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{"/zG2":function(t,e,s){"use strict";s.r(e);var a={components:{},data:function(){return{loiData:[],employees:[],employee:null,isAdmin:!1}},created:function(){this.fetchReport("all"),this.fetchUserList()},methods:{fetchUserList:function(){var t=this;axios.get("/api/work-group/list/users").then((function(e){t.employees=e.data.data})).catch((function(e){t.notificationAlert(e.response)}))},resetColFilters:function(){this.statusFilter={label:"Active",value:1},this.fetchReport("all"),this.employee=null,this.$refs.filterCard.removeRefreshAnimation()},fetchReport:function(t){var e=this;axios.get("/api/report/loi-report",{params:{target:t}}).then((function(t){e.loiData=t.data.loi_data,e.isAdmin=t.data.isAdmin})).catch((function(t){e.notificationAlert(t.response)}))},exportExcel:function(){var t={id:this.employee},e=new URLSearchParams(t);window.open("/export-loi?".concat(e.toString()))}}},r=(s("jnVj"),s("KHd+")),o=Object(r.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.isAdmin?s("vx-card",{ref:"filterCard",staticClass:"user-list-filters mb-8",attrs:{actionButtons:""},on:{refresh:t.resetColFilters,remove:t.resetColFilters}},[s("div",{staticClass:"vx-row"},[s("div",{staticClass:"vx-col md:w-3/12 sm:w-1/2 w-full"},[s("vs-select",{staticClass:"w-full",attrs:{autocomplete:"",label:"Employee",placeholder:"Select an employee"},on:{input:function(e){return t.fetchReport(t.employee)}},model:{value:t.employee,callback:function(e){t.employee=e},expression:"employee"}},t._l(t.employees,(function(t,e){return s("vs-select-item",{key:e,attrs:{text:t.full_name+" ("+t.emp_id+")",value:t.user_id}})})),1)],1)])]):t._e(),t._v(" "),s("vx-card",[s("vs-table",{attrs:{"max-items":"10",pagination:"",search:"",stripe:"",data:t.loiData},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data;return t._l(a,(function(e,a){return s("vs-tr",{key:a},[s("vs-td",{attrs:{data:e.full_name}},[t._v(" "+t._s(e.full_name)+" ")]),t._v(" "),s("vs-td",{attrs:{data:e.type}},[t._v(" "+t._s(e.type)+" ")]),t._v(" "),s("vs-td",{attrs:{data:e.org_name}},[t._v(" "+t._s(e.org_name)+" ")]),t._v(" "),s("vs-td",{attrs:{data:e.date_range}},[t._v(" "+t._s(e.date_range)+" ")]),t._v(" "),s("vs-td",{attrs:{data:e.address}},[t._v(" "+t._s(e.address)+" ")]),t._v(" "),s("vs-td",{attrs:{data:e.letter_to}},[t._v(" "+t._s(e.letter_to)+" ")]),t._v(" "),s("vs-td",{attrs:{data:e.status}},[t._v(t._s(e.status))]),t._v(" "),s("vs-td",{attrs:{id:"action-buttons"}},[s("vs-dropdown",{attrs:{"vs-trigger-click":""}},[s("vs-button",{attrs:{color:"dark",icon:"more_vert",type:"flat"}}),t._v(" "),s("vs-dropdown-menu",[s("vs-dropdown-item",{attrs:{to:{path:"/profile/"+e.user_id}}},[s("span",{staticClass:"flex items-center"},[s("vs-icon",{staticClass:"mr-2",attrs:{icon:"preview"}}),t._v(" "),s("span",[t._v("Request Details")])],1)])],1)],1)],1)],1)}))}}])},[s("template",{slot:"thead"},[s("vs-th",{attrs:{"sort-key":""}},[t._v("Employee")]),t._v(" "),s("vs-th",{attrs:{"sort-key":""}},[t._v("Org Type")]),t._v(" "),s("vs-th",{attrs:{"sort-key":""}},[t._v("Org Name")]),t._v(" "),s("vs-th",{attrs:{"sort-key":""}},[t._v("Date Range")]),t._v(" "),s("vs-th",{attrs:{"sort-key":""}},[t._v("Address")]),t._v(" "),s("vs-th",{attrs:{"sort-key":""}},[t._v("Letter To")]),t._v(" "),s("vs-th",{attrs:{"sort-key":""}},[t._v("Status")]),t._v(" "),s("vs-th",[t._v("Action")])],1)],2),t._v(" "),s("vs-button",{staticStyle:{"margin-top":"17px"},attrs:{size:"small","icon-pack":"feather",icon:"icon-file-plus"},on:{click:t.exportExcel}},[t._v("Excel Export")])],1)],1)}),[],!1,null,null,null);e.default=o.exports},MIkI:function(t,e,s){var a=s("gcUg");"string"==typeof a&&(a=[[t.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,r);a.locals&&(t.exports=a.locals)},gcUg:function(t,e,s){(t.exports=s("I1BE")(!1)).push([t.i,".con-vs-dropdown--menu{width:15%}",""])},jnVj:function(t,e,s){"use strict";s("MIkI")}}]);