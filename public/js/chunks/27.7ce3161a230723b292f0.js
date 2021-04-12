(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"/ihU":function(t,e,s){"use strict";s("Js0Q")},Js0Q:function(t,e,s){var n=s("NB12");"string"==typeof n&&(n=[[t.i,n,""]]);var l={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(n,l);n.locals&&(t.exports=n.locals)},N13g:function(t,e,s){"use strict";s.r(e);s("p1OT"),s("gJae");var n={components:{quillEditor:s("lT11").quillEditor},data:function(){return{TypeData:[],sat:{w_h:null,o_h:null,w_type:null,id:null},sun:{w_h:null,o_h:null,w_type:null,id:null},mon:{w_h:null,o_h:null,w_type:null,id:null},tue:{w_h:null,o_h:null,w_type:null,id:null},wed:{w_h:null,o_h:null,w_type:null,id:null},thu:{w_h:null,o_h:null,w_type:null,id:null},fri:{w_h:null,o_h:null,w_type:null,id:null}}},mounted:function(){this.fetchData()},computed:{},methods:{fetchData:function(){var t=this;axios.get("/api/ot-setting/data").then((function(e){t.sat=e.data.sat,t.sun=e.data.sun,t.mon=e.data.mon,t.tue=e.data.tue,t.wed=e.data.wed,t.thu=e.data.thu,t.fri=e.data.fri})).catch((function(e){t.notificationAlert(e.response)}))},createRequest:function(){var t=this,e={sat:this.sat,sun:this.sun,mon:this.mon,tue:this.tue,wed:this.wed,thu:this.thu,fri:this.fri};console.log(e),axios.post("/api/ot-setting/ot-setting",e).then((function(e){t.notificationAlert(e)})).catch((function(e){t.notificationAlert(e.response)}))},fetchOrgTypes:function(){var t=this;axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_OT_TYPES)).then((function(e){t.TypeData=e.data.items})).catch((function(e){t.notificationAlert(e.response)}))}},created:function(){this.fetchOrgTypes()}},l=(s("/ihU"),s("KHd+")),a=Object(l.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("vx-card",{attrs:{title:""}},[s("div",{staticClass:"flex"},[s("div",{staticClass:"pt-3",staticStyle:{"min-height":"300px",width:"100%"}},[s("vs-table",{attrs:{stripe:"",data:t.TypeData}},[s("template",{slot:"thead"},[s("vs-th",[t._v("Day")]),t._v(" "),s("vs-th",[t._v("Working Hour")]),t._v(" "),s("vs-th",[t._v("Over Time (Hour)")]),t._v(" "),s("vs-th",[t._v("Working Type")])],1),t._v(" "),[s("vs-tr",[s("vs-td",[t._v("Sunday")]),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Working Hour",type:"number",min:"0"},model:{value:t.sun.w_h,callback:function(e){t.$set(t.sun,"w_h",e)},expression:"sun.w_h"}})],1),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Over Time (Hour)",type:"number",min:"0"},model:{value:t.sun.o_h,callback:function(e){t.$set(t.sun,"o_h",e)},expression:"sun.o_h"}})],1),t._v(" "),s("vs-td",[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Working Type",autocomplete:""},model:{value:t.sun.w_type,callback:function(e){t.$set(t.sun,"w_type",e)},expression:"sun.w_type"}},t._l(t.TypeData,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1)],1),t._v(" "),s("vs-tr",[s("vs-td",[t._v("Monday")]),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Working Hour",type:"number",min:"0"},model:{value:t.mon.w_h,callback:function(e){t.$set(t.mon,"w_h",e)},expression:"mon.w_h"}})],1),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Over Time (Hour)",type:"number",min:"0"},model:{value:t.mon.o_h,callback:function(e){t.$set(t.mon,"o_h",e)},expression:"mon.o_h"}})],1),t._v(" "),s("vs-td",[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Working Type",autocomplete:""},model:{value:t.mon.w_type,callback:function(e){t.$set(t.mon,"w_type",e)},expression:"mon.w_type"}},t._l(t.TypeData,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1)],1),t._v(" "),s("vs-tr",[s("vs-td",[t._v("Tuesday")]),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Working Hour",type:"number",min:"0"},model:{value:t.tue.w_h,callback:function(e){t.$set(t.tue,"w_h",e)},expression:"tue.w_h"}})],1),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Over Time (Hour)",type:"number",min:"0"},model:{value:t.tue.o_h,callback:function(e){t.$set(t.tue,"o_h",e)},expression:"tue.o_h"}})],1),t._v(" "),s("vs-td",[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Working Type",autocomplete:""},model:{value:t.tue.w_type,callback:function(e){t.$set(t.tue,"w_type",e)},expression:"tue.w_type"}},t._l(t.TypeData,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1)],1),t._v(" "),s("vs-tr",[s("vs-td",[t._v("Wednesday")]),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Working Hour",type:"number",min:"0"},model:{value:t.wed.w_h,callback:function(e){t.$set(t.wed,"w_h",e)},expression:"wed.w_h"}})],1),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Over Time (Hour)",type:"number",min:"0"},model:{value:t.wed.o_h,callback:function(e){t.$set(t.wed,"o_h",e)},expression:"wed.o_h"}})],1),t._v(" "),s("vs-td",[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Working Type",autocomplete:""},model:{value:t.wed.w_type,callback:function(e){t.$set(t.wed,"w_type",e)},expression:"wed.w_type"}},t._l(t.TypeData,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1)],1),t._v(" "),s("vs-tr",[s("vs-td",[t._v("Thursday")]),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Working Hour",type:"number",min:"0"},model:{value:t.thu.w_h,callback:function(e){t.$set(t.thu,"w_h",e)},expression:"thu.w_h"}})],1),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Over Time (Hour)",type:"number",min:"0"},model:{value:t.thu.o_h,callback:function(e){t.$set(t.thu,"o_h",e)},expression:"thu.o_h"}})],1),t._v(" "),s("vs-td",[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Working Type",autocomplete:""},model:{value:t.thu.w_type,callback:function(e){t.$set(t.thu,"w_type",e)},expression:"thu.w_type"}},t._l(t.TypeData,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1)],1),t._v(" "),s("vs-tr",[s("vs-td",[t._v("Friday")]),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Working Hour",type:"number",min:"0"},model:{value:t.fri.w_h,callback:function(e){t.$set(t.fri,"w_h",e)},expression:"fri.w_h"}})],1),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Over Time (Hour)",type:"number",min:"0"},model:{value:t.fri.o_h,callback:function(e){t.$set(t.fri,"o_h",e)},expression:"fri.o_h"}})],1),t._v(" "),s("vs-td",[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Working Type",autocomplete:""},model:{value:t.fri.w_type,callback:function(e){t.$set(t.fri,"w_type",e)},expression:"fri.w_type"}},t._l(t.TypeData,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1)],1),t._v(" "),s("vs-tr",[s("vs-td",[t._v("Saturday")]),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Working Hour",type:"number",min:"0"},model:{value:t.sat.w_h,callback:function(e){t.$set(t.sat,"w_h",e)},expression:"sat.w_h"}})],1),t._v(" "),s("vs-td",[s("vs-input",{attrs:{placeholder:"Over Time (Hour)",type:"number",min:"0"},model:{value:t.sat.o_h,callback:function(e){t.$set(t.sat,"o_h",e)},expression:"sat.o_h"}})],1),t._v(" "),s("vs-td",[s("vs-select",{staticClass:"w-full",attrs:{placeholder:"Working Type",autocomplete:""},model:{value:t.sat.w_type,callback:function(e){t.$set(t.sat,"w_type",e)},expression:"sat.w_type"}},t._l(t.TypeData,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t.value,text:t.label}})})),1)],1)],1)]],2),t._v(" "),s("div",{staticClass:"flex-auto pt-6"}),t._v(" "),s("div",{attrs:{align:"right"}},[s("vs-button",{attrs:{size:"small","icon-pack":"feather",icon:"icon-plus"},on:{click:t.createRequest}},[t._v("Save")])],1)],1)])])}),[],!1,null,null,null);e.default=a.exports},NB12:function(t,e,s){(t.exports=s("I1BE")(!1)).push([t.i,".ql-editor{min-height:200px}@media print{.invoice-page *{visibility:hidden}.invoice-page #content-area{margin:0!important}.invoice-page .vs-con-table .vs-con-tbody{overflow:hidden!important}.invoice-page #invoice-container,.invoice-page #invoice-container *{visibility:visible}.invoice-page #invoice-container{position:absolute;left:0;top:0;box-shadow:none}}@page{size:auto}",""])}}]);