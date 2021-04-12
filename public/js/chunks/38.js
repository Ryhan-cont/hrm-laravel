(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      leavesData: [],
      employees: [],
      employee: null,
      isAdmin: false
    };
  },
  created: function created() {
    this.fetchReport('all');
    this.fetchUserList();
  },
  methods: {
    fetchUserList: function fetchUserList() {
      var _this = this;

      axios.get("/api/work-group/list/users").then(function (response) {
        _this.employees = response.data.data;
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    resetColFilters: function resetColFilters() {
      //Reset filters
      this.statusFilter = {
        label: 'Active',
        value: 1
      };
      this.fetchReport('all');
      this.employee = null;
      this.$refs.filterCard.removeRefreshAnimation();
    },
    fetchReport: function fetchReport(target) {
      var _this2 = this;

      axios.get("/api/report/leave-report", {
        params: {
          target: target
        }
      }).then(function (response) {
        _this2.leavesData = response.data.leave_data;
        _this2.isAdmin = response.data.isAdmin;
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    exportExcel: function exportExcel() {
      var params = {
        id: this.employee
      };
      var paramString = new URLSearchParams(params);
      window.open("/export-leave?".concat(paramString.toString()));
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".con-vs-dropdown--menu {\n  width: 15%;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LeaveReport.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=template&id=eed8b518&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=template&id=eed8b518& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.isAdmin
        ? _c(
            "vx-card",
            {
              ref: "filterCard",
              staticClass: "user-list-filters mb-8",
              attrs: { actionButtons: "" },
              on: { refresh: _vm.resetColFilters, remove: _vm.resetColFilters }
            },
            [
              _c("div", { staticClass: "vx-row" }, [
                _c(
                  "div",
                  { staticClass: "vx-col md:w-3/12 sm:w-1/2 w-full" },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          autocomplete: "",
                          label: "Employee",
                          placeholder: "Select an employee"
                        },
                        on: {
                          input: function($event) {
                            return _vm.fetchReport(_vm.employee)
                          }
                        },
                        model: {
                          value: _vm.employee,
                          callback: function($$v) {
                            _vm.employee = $$v
                          },
                          expression: "employee"
                        }
                      },
                      _vm._l(_vm.employees, function(item, index) {
                        return _c("vs-select-item", {
                          key: index,
                          attrs: {
                            text: item.full_name + " (" + item.emp_id + ")",
                            value: item.user_id
                          }
                        })
                      }),
                      1
                    )
                  ],
                  1
                )
              ])
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "vx-card",
        [
          _c(
            "vs-table",
            {
              attrs: {
                "max-items": "10",
                pagination: "",
                search: "",
                stripe: "",
                data: _vm.leavesData
              },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(ref) {
                    var data = ref.data
                    return _vm._l(data, function(tr, indextr) {
                      return _c(
                        "vs-tr",
                        { key: indextr },
                        [
                          _c("vs-td", { attrs: { data: tr.full_name } }, [
                            _vm._v(" " + _vm._s(tr.full_name) + " ")
                          ]),
                          _vm._v(" "),
                          _c("vs-td", { attrs: { data: tr.leave_type } }, [
                            _vm._v(" " + _vm._s(tr.leave_type) + " ")
                          ]),
                          _vm._v(" "),
                          _c("vs-td", { attrs: { data: tr.reason } }, [
                            _vm._v(" " + _vm._s(tr.reason) + " ")
                          ]),
                          _vm._v(" "),
                          _c("vs-td", { attrs: { data: tr.date_range } }, [
                            _vm._v(" " + _vm._s(tr.date_range) + " ")
                          ]),
                          _vm._v(" "),
                          _c("vs-td", { attrs: { data: tr.total_days } }, [
                            _vm._v(" " + _vm._s(tr.total_days) + " ")
                          ]),
                          _vm._v(" "),
                          _c("vs-td", { attrs: { data: tr.status } }, [
                            _vm._v(_vm._s(tr.status))
                          ]),
                          _vm._v(" "),
                          _c(
                            "vs-td",
                            { attrs: { id: "action-buttons" } },
                            [
                              _c(
                                "vs-dropdown",
                                { attrs: { "vs-trigger-click": "" } },
                                [
                                  _c("vs-button", {
                                    attrs: {
                                      color: "dark",
                                      icon: "more_vert",
                                      type: "flat"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "vs-dropdown-menu",
                                    [
                                      _c(
                                        "vs-dropdown-item",
                                        {
                                          attrs: {
                                            to: {
                                              path: "/profile/" + tr.user_id
                                            }
                                          }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c("vs-icon", {
                                                staticClass: "mr-2",
                                                attrs: { icon: "preview" }
                                              }),
                                              _vm._v(" "),
                                              _c("span", [
                                                _vm._v("Request Details")
                                              ])
                                            ],
                                            1
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    })
                  }
                }
              ])
            },
            [
              _c(
                "template",
                { slot: "thead" },
                [
                  _c("vs-th", { attrs: { "sort-key": "" } }, [
                    _vm._v("Employee")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "" } }, [
                    _vm._v("Leave Type")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "" } }, [
                    _vm._v("Reason")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "" } }, [
                    _vm._v("Date Range")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "" } }, [
                    _vm._v("Total Days")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "" } }, [
                    _vm._v("Status")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("Action")])
                ],
                1
              )
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "vs-button",
            {
              staticStyle: { "margin-top": "17px" },
              attrs: {
                size: "small",
                "icon-pack": "feather",
                icon: "icon-file-plus"
              },
              on: { click: _vm.exportExcel }
            },
            [_vm._v("Excel Export")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/service/report/LeaveReport.vue":
/*!***************************************************************!*\
  !*** ./resources/js/src/views/service/report/LeaveReport.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LeaveReport_vue_vue_type_template_id_eed8b518___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LeaveReport.vue?vue&type=template&id=eed8b518& */ "./resources/js/src/views/service/report/LeaveReport.vue?vue&type=template&id=eed8b518&");
/* harmony import */ var _LeaveReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LeaveReport.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/report/LeaveReport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _LeaveReport_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LeaveReport.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LeaveReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LeaveReport_vue_vue_type_template_id_eed8b518___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LeaveReport_vue_vue_type_template_id_eed8b518___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/report/LeaveReport.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/report/LeaveReport.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/service/report/LeaveReport.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LeaveReport.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LeaveReport.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/service/report/LeaveReport.vue?vue&type=template&id=eed8b518&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/service/report/LeaveReport.vue?vue&type=template&id=eed8b518& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_template_id_eed8b518___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LeaveReport.vue?vue&type=template&id=eed8b518& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/report/LeaveReport.vue?vue&type=template&id=eed8b518&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_template_id_eed8b518___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveReport_vue_vue_type_template_id_eed8b518___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);