(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Create.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/id-card/Create.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "create",
  data: function data() {
    return {
      module_id: null,
      ref_id: null,
      reasons: [],
      reason: null,
      remarks: null,
      is_for_other: false,
      employees: [],
      request_for: null
    };
  },
  created: function created() {
    this.fetchReasons();
  },
  mounted: function mounted() {},
  methods: {
    /**
     * Create ID Card request
     * ***************************************/
    createRequest: function createRequest() {
      var _this = this;

      if (this.is_for_other && !this.request_for) {
        this.notificationAlert("Please select an Employee to request for", "Error", "danger");
        return;
      }

      var data = {
        module_id: this.$store.state.moduleId,
        ref_id: this.ref_id,
        reason: this.reason,
        remarks: this.remarks,
        status: 0,
        is_for_other: this.is_for_other,
        request_for: this.request_for
      };
      this.btnDisabled = true;
      this.$http.post("/api/id-card-request/create", data).then(function (response) {
        _this.notificationAlert(response);

        _this.$router.push('/dashboard');
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    fetchReasons: function fetchReasons() {
      var _this2 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ID_REQ_REASON)).then(function (response) {
        _this2.reasons = response.data.items;

        _this2.$parent.$emit('eventingReasons', _this2.reasons);
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    fetchUserList: function fetchUserList() {
      var _this3 = this;

      axios.get("/api/work-group/list/users").then(function (response) {
        _this3.employees = response.data.data;
      })["catch"](function (err) {
        _this3.notificationAlert(err.response);
      });
    }
  },
  computed: {},
  watch: {
    "is_for_other": function is_for_other() {
      if (this.is_for_other) {
        this.fetchUserList();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/IdCard.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/id-card/IdCard.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create */ "./resources/js/src/views/service/id-card/Create.vue");
/* harmony import */ var _Read__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read */ "./resources/js/src/views/service/id-card/Read.vue");
/* harmony import */ var _ViewRightBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ViewRightBar */ "./resources/js/src/views/service/ViewRightBar.vue");
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
  components: {
    Create: _Create__WEBPACK_IMPORTED_MODULE_0__["default"],
    Read: _Read__WEBPACK_IMPORTED_MODULE_1__["default"],
    ViewRightBar: _ViewRightBar__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {},
  data: function data() {
    return {
      isViewFile: false,
      requestInfo: {}
    };
  },
  methods: {
    checkEditable: function checkEditable() {
      var _this = this;

      axios.get("/api/work-flow/data/".concat(this.$route.query.ref_id)).then(function (response) {
        _this.requestInfo = response.data.request_info; //console.log(response.data.request_info);

        _this.$root.$emit('eventingPermissions', response.data.request_info);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  },
  mounted: function mounted() {
    if (this.$route.query.id) {
      this.isViewFile = true;
    }

    if (this.isViewFile) {
      this.checkEditable();
    }
  },
  created: function created() {},
  computed: {},
  watch: {
    '$route.query.id': function $routeQueryId() {
      this.isViewFile = !this.isViewFile;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Read.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/id-card/Read.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "read",
  props: {
    data: {
      required: true
    }
  },
  data: function data() {
    return {
      reasons: [],
      req_info: {},
      req_id: this.$route.query.id,
      ref_id: this.$route.query.ref_id,
      reason: '',
      remarks: null,
      tableData: []
    };
  },
  created: function created() {
    this.fetchRequest();
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.$on('eventingReasons', function (data) {
      _this.reasons = data;
    });
  },
  methods: {
    fetchRequest: function fetchRequest() {
      var _this2 = this;

      axios.get("/api/id-card-request/data/".concat(this.$route.query.id)).then(function (response) {
        _this2.req_info = response.data.req_info;

        if (_this2.data.edit_info) {
          _this2.reason = response.data.req_info.reason_id;
          _this2.remarks = response.data.req_info.remarks;
        }
      })["catch"](function (err) {
        console.log(err);
      });
    },
    updateRequest: function updateRequest() {
      var _this3 = this;

      var data = {
        module_id: this.$store.state.moduleId,
        ref_id: this.ref_id,
        req_id: this.req_id,
        reason: this.reason,
        remarks: this.remarks,
        status: 0
      };
      this.btnDisabled = true;
      this.$http.put("/api/id-card-request/update/".concat(this.req_id), data).then(function (response) {
        _this3.notificationAlert(response);

        _this3.$router.push('/dashboard');
      })["catch"](function (err) {
        _this3.notificationAlert(err.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Create.vue?vue&type=template&id=d47a8026&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/id-card/Create.vue?vue&type=template&id=d47a8026&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
      _c("vx-card", [
        _c(
          "form",
          [
            _c("vs-input", {
              attrs: { type: "hidden", name: "ref_id" },
              model: {
                value: _vm.ref_id,
                callback: function($$v) {
                  _vm.ref_id = $$v
                },
                expression: "ref_id"
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "div",
                  { staticClass: "flex-auto pt-3 overflow-hidden" },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-1/2",
                        attrs: {
                          placeholder: "Reason",
                          label: "Reason *",
                          autocomplete: ""
                        },
                        model: {
                          value: _vm.reason,
                          callback: function($$v) {
                            _vm.reason = $$v
                          },
                          expression: "reason"
                        }
                      },
                      _vm._l(_vm.reasons, function(item, index) {
                        return _c("vs-select-item", {
                          key: index,
                          attrs: { value: item.value, text: item.label }
                        })
                      }),
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.reason,
                    name: "reason",
                    altName: "Reason"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pt-6" },
              [
                _c("vs-textarea", {
                  attrs: { label: "Remark" },
                  model: {
                    value: _vm.remarks,
                    callback: function($$v) {
                      _vm.remarks = $$v
                    },
                    expression: "remarks"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c(
                "div",
                { staticClass: "vx-col md:w-1/4" },
                [
                  _c(
                    "vs-checkbox",
                    {
                      attrs: { size: "small" },
                      model: {
                        value: _vm.is_for_other,
                        callback: function($$v) {
                          _vm.is_for_other = $$v
                        },
                        expression: "is_for_other"
                      }
                    },
                    [_vm._v("Request for Other")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _vm.is_for_other
              ? _c("div", { staticClass: "vx-row" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col md:w-1/3 pt-3" },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            autocomplete: "",
                            label: "Request for",
                            placeholder: "Select an employee"
                          },
                          model: {
                            value: _vm.request_for,
                            callback: function($$v) {
                              _vm.request_for = $$v
                            },
                            expression: "request_for"
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
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "flex" }, [
              _c("div", { staticClass: "flex-auto" }),
              _vm._v(" "),
              _c(
                "div",
                [
                  _c(
                    "vs-button",
                    {
                      staticClass: "ml-auto mt-2",
                      attrs: {
                        size: "small",
                        icon: "send",
                        disabled: _vm.btnDisabled
                      },
                      on: { click: _vm.createRequest }
                    },
                    [_vm._v("Send")]
                  )
                ],
                1
              )
            ])
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/IdCard.vue?vue&type=template&id=645d963c&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/id-card/IdCard.vue?vue&type=template&id=645d963c& ***!
  \************************************************************************************************************************************************************************************************************************/
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
      !_vm.isViewFile ? _c("create") : _vm._e(),
      _vm._v(" "),
      _vm.isViewFile
        ? _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "vx-col lg:w-3/5 w-full" },
              [_c("read", { attrs: { data: _vm.requestInfo } })],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-col lg:w-2/5 w-full" },
              [_c("view-right-bar")],
              1
            )
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Read.vue?vue&type=template&id=72415dc7&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/id-card/Read.vue?vue&type=template&id=72415dc7& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "page-request-view" } },
    [
      _c("vx-card", [
        _c(
          "div",
          { staticClass: "my-6" },
          [
            _c("h5", { staticClass: "mb-2" }, [
              _vm._v("Request ID # "),
              _c("span", { staticClass: "text-primary" }, [
                _vm._v(_vm._s(this.$route.query.request_id))
              ])
            ]),
            _vm._v(" "),
            _c("vs-divider"),
            _vm._v(" "),
            !_vm.data.edit_info
              ? _c(
                  "div",
                  [
                    _c(
                      "vs-table",
                      {
                        attrs: {
                          stripe: "",
                          noDataText: "",
                          data: _vm.tableData
                        }
                      },
                      [
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Reason")]),
                            _vm._v(" "),
                            _c("vs-td", [_vm._v(_vm._s(_vm.req_info.reason))])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Remarks")]),
                            _vm._v(" "),
                            _c("vs-td", [_vm._v(_vm._s(_vm.req_info.remarks))])
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              : _c("div", [
                  _c(
                    "form",
                    [
                      _c("vs-input", {
                        attrs: { type: "hidden", name: "ref_id" },
                        model: {
                          value: _vm.ref_id,
                          callback: function($$v) {
                            _vm.ref_id = $$v
                          },
                          expression: "ref_id"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c(
                            "div",
                            { staticClass: "flex-auto pt-3 overflow-hidden" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-1/2",
                                  attrs: {
                                    placeholder: "Reason",
                                    label: "Reason *",
                                    autocomplete: ""
                                  },
                                  model: {
                                    value: _vm.reason,
                                    callback: function($$v) {
                                      _vm.reason = $$v
                                    },
                                    expression: "reason"
                                  }
                                },
                                _vm._l(_vm.reasons, function(item, index) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: {
                                      value: item.value,
                                      text: item.label
                                    }
                                  })
                                }),
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.reason,
                              name: "reason",
                              altName: "Reason"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "pt-6" },
                        [
                          _c("vs-textarea", {
                            attrs: { label: "Remark" },
                            model: {
                              value: _vm.remarks,
                              callback: function($$v) {
                                _vm.remarks = $$v
                              },
                              expression: "remarks"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "flex" }, [
                        _c("div", { staticClass: "flex-auto" }),
                        _vm._v(" "),
                        _c(
                          "div",
                          [
                            _c(
                              "vs-button",
                              {
                                staticClass: "ml-auto mt-2",
                                attrs: {
                                  size: "small",
                                  disabled: _vm.btnDisabled,
                                  icon: "send"
                                },
                                on: { click: _vm.updateRequest }
                              },
                              [_vm._v("Send")]
                            )
                          ],
                          1
                        )
                      ])
                    ],
                    1
                  )
                ])
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/service/id-card/Create.vue":
/*!***********************************************************!*\
  !*** ./resources/js/src/views/service/id-card/Create.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create_vue_vue_type_template_id_d47a8026_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=d47a8026&scoped=true& */ "./resources/js/src/views/service/id-card/Create.vue?vue&type=template&id=d47a8026&scoped=true&");
/* harmony import */ var _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/id-card/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_vue_vue_type_template_id_d47a8026_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Create_vue_vue_type_template_id_d47a8026_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d47a8026",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/id-card/Create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/id-card/Create.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/service/id-card/Create.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/id-card/Create.vue?vue&type=template&id=d47a8026&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/views/service/id-card/Create.vue?vue&type=template&id=d47a8026&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_d47a8026_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=template&id=d47a8026&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Create.vue?vue&type=template&id=d47a8026&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_d47a8026_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_d47a8026_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/id-card/IdCard.vue":
/*!***********************************************************!*\
  !*** ./resources/js/src/views/service/id-card/IdCard.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IdCard_vue_vue_type_template_id_645d963c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdCard.vue?vue&type=template&id=645d963c& */ "./resources/js/src/views/service/id-card/IdCard.vue?vue&type=template&id=645d963c&");
/* harmony import */ var _IdCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IdCard.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/id-card/IdCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IdCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IdCard_vue_vue_type_template_id_645d963c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IdCard_vue_vue_type_template_id_645d963c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/id-card/IdCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/id-card/IdCard.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/service/id-card/IdCard.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IdCard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/IdCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/id-card/IdCard.vue?vue&type=template&id=645d963c&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/views/service/id-card/IdCard.vue?vue&type=template&id=645d963c& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdCard_vue_vue_type_template_id_645d963c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IdCard.vue?vue&type=template&id=645d963c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/IdCard.vue?vue&type=template&id=645d963c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdCard_vue_vue_type_template_id_645d963c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdCard_vue_vue_type_template_id_645d963c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/id-card/Read.vue":
/*!*********************************************************!*\
  !*** ./resources/js/src/views/service/id-card/Read.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Read_vue_vue_type_template_id_72415dc7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Read.vue?vue&type=template&id=72415dc7& */ "./resources/js/src/views/service/id-card/Read.vue?vue&type=template&id=72415dc7&");
/* harmony import */ var _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/id-card/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Read_vue_vue_type_template_id_72415dc7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Read_vue_vue_type_template_id_72415dc7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/id-card/Read.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/id-card/Read.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/service/id-card/Read.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/id-card/Read.vue?vue&type=template&id=72415dc7&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/service/id-card/Read.vue?vue&type=template&id=72415dc7& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_72415dc7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=template&id=72415dc7& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/id-card/Read.vue?vue&type=template&id=72415dc7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_72415dc7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_72415dc7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);