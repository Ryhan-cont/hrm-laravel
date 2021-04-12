(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Create.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/leave-application/Create.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
      is_for_other: false,
      employees: [],
      request_for: null,
      hideMsg: true,
      msg: null,
      green: null,
      selectedLeaveType: null,
      leaveTypeData: [],
      ref_id: null,
      dateRange: {
        start: '',
        end: ''
      },
      selectedReason: null,
      reasonData: [],
      remarks: null
    };
  },
  created: function created() {
    this.fetchReasons();
    this.fetchLeaveType();
  },
  mounted: function mounted() {},
  methods: {
    /**
     * Create Business Card request
     * ***************************************/
    createRequest: function createRequest() {
      var _this = this;

      this.btnDisabled = true;
      var data = {
        module_id: this.$store.state.moduleId,
        ref_id: this.ref_id,
        leave_type: this.selectedLeaveType,
        reason: this.selectedReason,
        start_date: this.dateRange.start,
        end_date: this.dateRange.end,
        remarks: this.remarks,
        status: 0,
        is_for_other: this.is_for_other,
        request_for: this.request_for
      };
      this.$http.post("/api/leave-application/create", data).then(function (response) {
        _this.notificationAlert(response);

        _this.$router.push('/dashboard');
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    fetchReasons: function fetchReasons() {
      var _this2 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ID_REQ_REASON)).then(function (response) {
        _this2.reasonData = response.data.items;
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    fetchLeaveType: function fetchLeaveType() {
      var _this3 = this;

      axios.get('/api/leave-application/leave-package-data').then(function (response) {
        _this3.leaveTypeData = response.data.items;
      })["catch"](function (err) {
        _this3.notificationAlert(err.response);
      });
    },
    CheckLeave: function CheckLeave(id) {
      var _this4 = this;

      axios.get("/api/leave-application/leave-days-check/".concat(id)).then(function (response) {
        _this4.msg = response.data.message;
        _this4.hideMsg = false;
        _this4.green = response.data.info;
      })["catch"](function (err) {
        _this4.notificationAlert(err.response);
      });
    },
    fetchUserList: function fetchUserList() {
      var _this5 = this;

      axios.get("/api/work-group/list/users").then(function (response) {
        _this5.employees = response.data.data;
      })["catch"](function (err) {
        _this5.notificationAlert(err.response);
      });
    }
  },
  watch: {
    "is_for_other": function is_for_other() {
      if (this.is_for_other) {
        this.fetchUserList();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create */ "./resources/js/src/views/service/leave-application/Create.vue");
/* harmony import */ var _Read__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read */ "./resources/js/src/views/service/leave-application/Read.vue");
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
        _this.requestInfo = response.data.request_info;

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
  watch: {
    '$route.query.id': function $routeQueryId() {
      this.isViewFile = !this.isViewFile;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Read.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/leave-application/Read.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
      req_info: {},
      tableData: [],
      hideMsg: true,
      msg: null,
      green: null,
      req_id: this.$route.query.id,
      ref_id: this.$route.query.ref_id,
      selectedLeaveType: null,
      leaveTypeData: [],
      dateRange: {
        start: new Date(),
        end: new Date()
      },
      selectedReason: null,
      reasonData: [],
      remarks: null
    };
  },
  created: function created() {
    this.fetchReasons();
    this.fetchLeaveType();
    this.fetchRequest();
  },
  mounted: function mounted() {},
  methods: {
    fetchRequest: function fetchRequest() {
      var _this = this;

      axios.get("/api/leave-application/data/".concat(this.$route.query.id)).then(function (response) {
        _this.req_info = response.data;

        if (_this.data.edit_info) {
          _this.selectedLeaveType = response.data.type_id;
          _this.selectedReason = response.data.reason_id;
          _this.dateRange = {
            start: new Date(response.data.start_date),
            end: new Date(response.data.end_date)
          };
          _this.remarks = response.data.remarks;
        }
      })["catch"](function (err) {
        console.log(err);
      });
    },
    updateRequest: function updateRequest() {
      var _this2 = this;

      this.btnDisabled = true;
      var data = {
        module_id: this.$store.state.moduleId,
        ref_id: this.ref_id,
        leave_type: this.selectedLeaveType,
        reason: this.selectedReason,
        start_date: this.dateRange.start,
        end_date: this.dateRange.end,
        remarks: this.remarks,
        status: 0
      };
      this.$http.put("/api/leave-application/update/".concat(this.req_id), data).then(function (response) {
        _this2.notificationAlert(response);

        _this2.$router.push('/dashboard');
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    fetchReasons: function fetchReasons() {
      var _this3 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ID_REQ_REASON)).then(function (response) {
        _this3.reasonData = response.data.items;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    fetchLeaveType: function fetchLeaveType() {
      var _this4 = this;

      axios.get('/api/leave-application/leave-package-data').then(function (response) {
        _this4.leaveTypeData = response.data.items;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    CheckLeave: function CheckLeave(id) {
      var _this5 = this;

      axios.get("/api/leave-application/leave-days-check/".concat(id)).then(function (response) {
        _this5.msg = response.data.message;
        _this5.hideMsg = false;
        _this5.green = response.data.info;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Create.vue?vue&type=template&id=3cadc996&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/leave-application/Create.vue?vue&type=template&id=3cadc996&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
        _c("div", [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "mt-2 vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
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
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Leave Type",
                        label: "Leave Type",
                        autocomplete: ""
                      },
                      on: {
                        input: function($event) {
                          return _vm.CheckLeave(_vm.selectedLeaveType)
                        }
                      },
                      model: {
                        value: _vm.selectedLeaveType,
                        callback: function($$v) {
                          _vm.selectedLeaveType = $$v
                        },
                        expression: "selectedLeaveType"
                      }
                    },
                    _vm._l(_vm.leaveTypeData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: {
                          value: item.value,
                          text: item.label + " - " + item.days + " Days"
                        }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _vm.green
                    ? _c(
                        "div",
                        {
                          staticClass: "py-1 text-sm text-green-400",
                          attrs: { hidden: _vm.hideMsg }
                        },
                        [_c("div", [_c("div", [_vm._v(_vm._s(_vm.msg))])])]
                      )
                    : _c(
                        "div",
                        {
                          staticClass: "py-1 text-sm text-red-400",
                          attrs: { hidden: _vm.hideMsg }
                        },
                        [_c("div", [_c("div", [_vm._v(_vm._s(_vm.msg))])])]
                      ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.selectedLeaveType,
                      name: "leaveType"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                [
                  _c("v-date-picker", {
                    attrs: {
                      "is-range": "",
                      color: "purple",
                      masks: { input: "YYYY-MM-DD" },
                      "min-date": new Date()
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var inputValue = ref.inputValue
                          var inputEvents = ref.inputEvents
                          return [
                            _c(
                              "vs-input",
                              _vm._g(
                                {
                                  staticClass: "w-full mt-4",
                                  attrs: {
                                    "icon-pack": "feather",
                                    icon: "icon icon-calendar",
                                    label: "Date Range",
                                    value:
                                      inputValue.start + " - " + inputValue.end
                                  }
                                },
                                inputEvents.start
                              )
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.dateRange,
                      callback: function($$v) {
                        _vm.dateRange = $$v
                      },
                      expression: "dateRange"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.dateRange,
                      name: "dateRange",
                      altName: "Date range"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "mt-2 vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Reason",
                        autocomplete: "",
                        label: "Reason"
                      },
                      model: {
                        value: _vm.selectedReason,
                        callback: function($$v) {
                          _vm.selectedReason = $$v
                        },
                        expression: "selectedReason"
                      }
                    },
                    _vm._l(_vm.reasonData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item.value, text: item.label }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.selectedReason,
                      name: "reason"
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "pt-6" },
            [
              _c("vs-textarea", {
                attrs: { label: "Remarks" },
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
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=template&id=4c9eb6dc&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=template&id=4c9eb6dc& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
              { staticClass: "vx-col lg:w-2/3 w-full" },
              [_c("read", { attrs: { data: _vm.requestInfo } })],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-col lg:w-1/3 w-full" },
              [_c("view-right-bar", { attrs: { data: _vm.requestInfo } })],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Read.vue?vue&type=template&id=2115eb0f&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/leave-application/Read.vue?vue&type=template&id=2115eb0f& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
                            _c("vs-th", [_vm._v("Leave Type")]),
                            _vm._v(" "),
                            _c("vs-td", [
                              _vm._v(_vm._s(_vm.req_info.type_name))
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Leave Dates")]),
                            _vm._v(" "),
                            _c("vs-td", [
                              _vm._v(
                                _vm._s(_vm.req_info.form_start_date) +
                                  " - " +
                                  _vm._s(_vm.req_info.form_end_date)
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Requested Leave")]),
                            _vm._v(" "),
                            _c("vs-td", [
                              _vm._v(
                                _vm._s(_vm.req_info.requested_for) + " days"
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Available Leave")]),
                            _vm._v(" "),
                            _c("vs-td", [
                              _vm._v(_vm._s(_vm.req_info.available) + " days")
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Used Leave")]),
                            _vm._v(" "),
                            _c("vs-td", [
                              _vm._v(_vm._s(_vm.req_info.used) + " days")
                            ])
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
                  _c("div", { staticClass: "vx-row" }, [
                    _c("div", { staticClass: "mt-2 vx-col md:w-1/2 w-full" }, [
                      _c(
                        "div",
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
                            "vs-select",
                            {
                              staticClass: "w-full",
                              attrs: {
                                placeholder: "Leave Type",
                                label: "Leave Type"
                              },
                              on: {
                                input: function($event) {
                                  return _vm.CheckLeave(_vm.selectedLeaveType)
                                }
                              },
                              model: {
                                value: _vm.selectedLeaveType,
                                callback: function($$v) {
                                  _vm.selectedLeaveType = $$v
                                },
                                expression: "selectedLeaveType"
                              }
                            },
                            _vm._l(_vm.leaveTypeData, function(item, index) {
                              return _c("vs-select-item", {
                                key: index,
                                attrs: {
                                  value: item.value,
                                  text: item.label + " - " + item.days + " Days"
                                }
                              })
                            }),
                            1
                          ),
                          _vm._v(" "),
                          _vm.green
                            ? _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-green-400",
                                  attrs: { hidden: _vm.hideMsg }
                                },
                                [
                                  _c("div", [
                                    _c("div", [_vm._v(_vm._s(_vm.msg))])
                                  ])
                                ]
                              )
                            : _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hideMsg }
                                },
                                [
                                  _c("div", [
                                    _c("div", [_vm._v(_vm._s(_vm.msg))])
                                  ])
                                ]
                              ),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.selectedLeaveType,
                              name: "leaveType"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c("v-date-picker", {
                            attrs: {
                              "is-range": "",
                              color: "purple",
                              masks: { input: "YYYY-MM-DD" },
                              "min-date": new Date()
                            },
                            scopedSlots: _vm._u([
                              {
                                key: "default",
                                fn: function(ref) {
                                  var inputValue = ref.inputValue
                                  var inputEvents = ref.inputEvents
                                  return [
                                    _c(
                                      "vs-input",
                                      _vm._g(
                                        {
                                          staticClass: "w-full mt-4",
                                          attrs: {
                                            "icon-pack": "feather",
                                            icon: "icon icon-calendar",
                                            label: "Date Range",
                                            value:
                                              inputValue.start +
                                              " - " +
                                              inputValue.end
                                          }
                                        },
                                        inputEvents.start
                                      )
                                    )
                                  ]
                                }
                              }
                            ]),
                            model: {
                              value: _vm.dateRange,
                              callback: function($$v) {
                                _vm.dateRange = $$v
                              },
                              expression: "dateRange"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.dateRange,
                              name: "dateRange",
                              altName: "Date range"
                            }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "mt-2 vx-col md:w-1/2 w-full" }, [
                      _c(
                        "div",
                        [
                          _c(
                            "vs-select",
                            {
                              staticClass: "w-full",
                              attrs: { placeholder: "Reason", label: "Reason" },
                              model: {
                                value: _vm.selectedReason,
                                callback: function($$v) {
                                  _vm.selectedReason = $$v
                                },
                                expression: "selectedReason"
                              }
                            },
                            _vm._l(_vm.reasonData, function(item, index) {
                              return _c("vs-select-item", {
                                key: index,
                                attrs: { value: item.value, text: item.label }
                              })
                            }),
                            1
                          ),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.selectedReason,
                              name: "reason"
                            }
                          })
                        ],
                        1
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-6" },
                    [
                      _c("vs-textarea", {
                        attrs: { label: "Remarks" },
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
                            attrs: { size: "small", disabled: _vm.btnDisabled },
                            on: { click: _vm.updateRequest }
                          },
                          [_vm._v("Send")]
                        )
                      ],
                      1
                    )
                  ])
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

/***/ "./resources/js/src/views/service/leave-application/Create.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/Create.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create_vue_vue_type_template_id_3cadc996_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=3cadc996&scoped=true& */ "./resources/js/src/views/service/leave-application/Create.vue?vue&type=template&id=3cadc996&scoped=true&");
/* harmony import */ var _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/leave-application/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_vue_vue_type_template_id_3cadc996_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Create_vue_vue_type_template_id_3cadc996_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3cadc996",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/leave-application/Create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/leave-application/Create.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/Create.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/leave-application/Create.vue?vue&type=template&id=3cadc996&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/Create.vue?vue&type=template&id=3cadc996&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_3cadc996_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=template&id=3cadc996&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Create.vue?vue&type=template&id=3cadc996&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_3cadc996_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_3cadc996_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/leave-application/LeaveApplication.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/LeaveApplication.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LeaveApplication_vue_vue_type_template_id_4c9eb6dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LeaveApplication.vue?vue&type=template&id=4c9eb6dc& */ "./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=template&id=4c9eb6dc&");
/* harmony import */ var _LeaveApplication_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LeaveApplication.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LeaveApplication_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LeaveApplication_vue_vue_type_template_id_4c9eb6dc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LeaveApplication_vue_vue_type_template_id_4c9eb6dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/leave-application/LeaveApplication.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveApplication_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LeaveApplication.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveApplication_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=template&id=4c9eb6dc&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=template&id=4c9eb6dc& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveApplication_vue_vue_type_template_id_4c9eb6dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LeaveApplication.vue?vue&type=template&id=4c9eb6dc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/LeaveApplication.vue?vue&type=template&id=4c9eb6dc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveApplication_vue_vue_type_template_id_4c9eb6dc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaveApplication_vue_vue_type_template_id_4c9eb6dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/leave-application/Read.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/Read.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Read_vue_vue_type_template_id_2115eb0f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Read.vue?vue&type=template&id=2115eb0f& */ "./resources/js/src/views/service/leave-application/Read.vue?vue&type=template&id=2115eb0f&");
/* harmony import */ var _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/leave-application/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Read_vue_vue_type_template_id_2115eb0f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Read_vue_vue_type_template_id_2115eb0f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/leave-application/Read.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/leave-application/Read.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/Read.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/leave-application/Read.vue?vue&type=template&id=2115eb0f&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/service/leave-application/Read.vue?vue&type=template&id=2115eb0f& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_2115eb0f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=template&id=2115eb0f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/leave-application/Read.vue?vue&type=template&id=2115eb0f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_2115eb0f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_2115eb0f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);