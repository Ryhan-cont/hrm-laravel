(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Create.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/loi-service/Create.vue?vue&type=script&lang=js& ***!
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
//
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
      ref_id: null,
      remarks: null,
      selectedOrgType: null,
      orgTypeData: [],
      selectedOrg: null,
      orgData: null,
      orgAddress: null,
      letterAddressTo: null,
      viewSalary: true,
      dateRange: {
        start: '',
        end: ''
      }
    };
  },
  created: function created() {
    this.fetchOrgTypes();
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
        org_id: this.selectedOrg,
        start_date: this.dateRange.start,
        end_date: this.dateRange.end,
        view_salary: this.viewSalary,
        remarks: this.remarks,
        status: 0,
        is_for_other: this.is_for_other,
        request_for: this.request_for
      };
      this.$http.post("/api/loi-service/create", data).then(function (response) {
        _this.notificationAlert(response);

        _this.$router.push('/dashboard');
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    fetchOrgTypes: function fetchOrgTypes() {
      var _this2 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ORG_TYPE)).then(function (response) {
        _this2.orgTypeData = response.data.items;
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    fetchOrgName: function fetchOrgName(id) {
      var _this3 = this;

      axios.get("/api/loi-service/get-org-name/".concat(id)).then(function (response) {
        _this3.orgData = response.data.items;
      })["catch"](function (err) {
        _this3.notificationAlert(err.response);
      });
    },
    fetchOrgAddress: function fetchOrgAddress(id) {
      var _this4 = this;

      axios.get("/api/loi-service/get-org-address/".concat(id)).then(function (response) {
        _this4.orgAddress = response.data.address;
        _this4.letterAddressTo = response.data.letter_to;
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Loi.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/loi-service/Loi.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create */ "./resources/js/src/views/service/loi-service/Create.vue");
/* harmony import */ var _Read__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read */ "./resources/js/src/views/service/loi-service/Read.vue");
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Read.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/loi-service/Read.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
      org_name: null,
      org_type: null,
      start_date: null,
      end_date: null,
      duration: null,
      remarks: null,
      show_salary: null,
      salary: null,
      req_info: {},
      tableData: [],
      req_id: this.$route.query.id,
      ref_id: this.$route.query.ref_id,
      selectedOrgType: null,
      orgTypeData: [],
      selectedOrg: null,
      orgData: null,
      orgAddress: null,
      letterAddressTo: null,
      viewSalary: true,
      dateRange: {
        start: new Date(),
        end: new Date()
      }
    };
  },
  created: function created() {
    this.fetchRequest();
    this.fetchOrgTypes();
  },
  mounted: function mounted() {},
  methods: {
    fetchRequest: function fetchRequest() {
      var _this = this;

      axios.get("/api/loi-service/data/".concat(this.$route.query.id)).then(function (response) {
        _this.req_info = response.data;
        _this.org_name = response.data.infos.org_name;
        _this.org_type = response.data.infos.org_type;
        _this.start_date = response.data.infos.form_start_date;
        _this.end_date = response.data.infos.form_end_date;
        _this.duration = response.data.infos.durations;
        _this.remarks = response.data.infos.remarks;
        _this.show_salary = response.data.infos.show_salary;
        _this.salary = response.data.salary;

        if (_this.data.edit_info) {
          _this.selectedOrgType = response.data.infos.org_type_id;

          _this.fetchOrgName(response.data.infos.org_type_id);

          _this.selectedOrg = response.data.infos.org_name_id;
          _this.orgAddress = response.data.infos.address;
          _this.letterAddressTo = response.data.infos.letter_to;
          _this.viewSalary = response.data.infos.show_salary;
          _this.dateRange = {
            start: new Date(response.data.infos.start_date),
            end: new Date(response.data.infos.end_date)
          };
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
        org_id: this.selectedOrg,
        start_date: this.dateRange.start,
        end_date: this.dateRange.end,
        view_salary: this.viewSalary,
        remarks: this.remarks,
        status: 0
      };
      this.$http.put("/api/loi-service/update/".concat(this.req_id), data).then(function (response) {
        _this2.notificationAlert(response);

        _this2.$router.push('/dashboard');
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    fetchOrgTypes: function fetchOrgTypes() {
      var _this3 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ORG_TYPE)).then(function (response) {
        _this3.orgTypeData = response.data.items;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    fetchOrgName: function fetchOrgName(id) {
      var _this4 = this;

      axios.get("/api/loi-service/get-org-name/".concat(id)).then(function (response) {
        _this4.orgData = response.data.items;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    fetchOrgAddress: function fetchOrgAddress(id) {
      var _this5 = this;

      axios.get("/api/loi-service/get-org-address/".concat(id)).then(function (response) {
        _this5.orgAddress = response.data.address;
        _this5.letterAddressTo = response.data.letter_to;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Create.vue?vue&type=template&id=a466507e&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/loi-service/Create.vue?vue&type=template&id=a466507e&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
            _c(
              "div",
              { staticClass: "mt-2 vx-col md:w-1/2 w-full" },
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
                      placeholder: "Organization Type",
                      label: "Organization Type",
                      autocomplete: ""
                    },
                    on: {
                      input: function($event) {
                        return _vm.fetchOrgName(_vm.selectedOrgType)
                      }
                    },
                    model: {
                      value: _vm.selectedOrgType,
                      callback: function($$v) {
                        _vm.selectedOrgType = $$v
                      },
                      expression: "selectedOrgType"
                    }
                  },
                  _vm._l(_vm.orgTypeData, function(item, index) {
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
                    value: _vm.selectedOrgType,
                    name: "organization type"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "mt-2 vx-col md:w-1/2 w-full" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "Organization",
                      label: "Organization",
                      autocomplete: ""
                    },
                    on: {
                      input: function($event) {
                        return _vm.fetchOrgAddress(_vm.selectedOrg)
                      }
                    },
                    model: {
                      value: _vm.selectedOrg,
                      callback: function($$v) {
                        _vm.selectedOrg = $$v
                      },
                      expression: "selectedOrg"
                    }
                  },
                  _vm._l(_vm.orgData, function(item, index) {
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
                    value: _vm.selectedOrg,
                    name: "organization"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row py-6" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Organization Address:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.orgAddress))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Letter Address To:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.letterAddressTo))
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "mt-16 vx-col md:w-1/2 w-full" },
              [
                _c(
                  "vs-checkbox",
                  {
                    model: {
                      value: _vm.viewSalary,
                      callback: function($$v) {
                        _vm.viewSalary = $$v
                      },
                      expression: "viewSalary"
                    }
                  },
                  [_vm._v("View Salary")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "mt-2 vx-col md:w-1/2 w-full" },
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
                    on: {
                      click: function($event) {
                        return _vm.createRequest()
                      }
                    }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Loi.vue?vue&type=template&id=b144505e&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/loi-service/Loi.vue?vue&type=template&id=b144505e& ***!
  \*************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Read.vue?vue&type=template&id=d0514aca&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/loi-service/Read.vue?vue&type=template&id=d0514aca& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
                            _c("vs-th", [_vm._v("Organization Name")]),
                            _vm._v(" "),
                            _c("vs-td", [_vm._v(_vm._s(_vm.org_name))])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Organization Type")]),
                            _vm._v(" "),
                            _c("vs-td", [_vm._v(_vm._s(_vm.org_type))])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Date")]),
                            _vm._v(" "),
                            _c("vs-td", [
                              _vm._v(
                                _vm._s(_vm.start_date) +
                                  " - " +
                                  _vm._s(_vm.end_date)
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          [
                            _c("vs-th", [_vm._v("Duration")]),
                            _vm._v(" "),
                            _c("vs-td", [
                              _vm._v(_vm._s(_vm.duration) + " days")
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
                            _c("vs-td", [_vm._v(_vm._s(_vm.remarks))])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-tr",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.show_salary,
                                expression: "show_salary"
                              }
                            ]
                          },
                          [
                            _c("vs-th", [_vm._v("Salary")]),
                            _vm._v(" "),
                            _c("vs-td", [_vm._v(_vm._s(_vm.salary))])
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
                    _c(
                      "div",
                      { staticClass: "mt-2 vx-col md:w-1/2 w-full" },
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
                              placeholder: "Organization Type",
                              label: "Organization Type"
                            },
                            on: {
                              input: function($event) {
                                return _vm.fetchOrgName(_vm.selectedOrgType)
                              }
                            },
                            model: {
                              value: _vm.selectedOrgType,
                              callback: function($$v) {
                                _vm.selectedOrgType = $$v
                              },
                              expression: "selectedOrgType"
                            }
                          },
                          _vm._l(_vm.orgTypeData, function(item, index) {
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
                            value: _vm.selectedOrgType,
                            name: "organization type"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "mt-2 vx-col md:w-1/2 w-full" },
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Organization",
                              label: "Organization"
                            },
                            on: {
                              input: function($event) {
                                return _vm.fetchOrgAddress(_vm.selectedOrg)
                              }
                            },
                            model: {
                              value: _vm.selectedOrg,
                              callback: function($$v) {
                                _vm.selectedOrg = $$v
                              },
                              expression: "selectedOrg"
                            }
                          },
                          _vm._l(_vm.orgData, function(item, index) {
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
                            value: _vm.selectedOrg,
                            name: "organization"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "vx-row py-6" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col md:w-1/2 edit-prev-cont" },
                      [
                        _c("div", { staticClass: "edit-prev-ttl" }, [
                          _vm._v("Organization Address:")
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "edit-prev-dt" }, [
                          _vm._v(_vm._s(_vm.orgAddress))
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "vx-col md:w-1/2 edit-prev-cont" },
                      [
                        _c("div", { staticClass: "edit-prev-ttl" }, [
                          _vm._v("Letter Address To:")
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "edit-prev-dt" }, [
                          _vm._v(_vm._s(_vm.letterAddressTo))
                        ])
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "mt-16 vx-col md:w-1/2 w-full" },
                      [
                        _c(
                          "vs-checkbox",
                          {
                            model: {
                              value: _vm.viewSalary,
                              callback: function($$v) {
                                _vm.viewSalary = $$v
                              },
                              expression: "viewSalary"
                            }
                          },
                          [_vm._v("View Salary")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "mt-2 vx-col md:w-1/2 w-full" },
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
                                          label: "* Date Range",
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

/***/ "./resources/js/src/views/service/loi-service/Create.vue":
/*!***************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Create.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create_vue_vue_type_template_id_a466507e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=a466507e&scoped=true& */ "./resources/js/src/views/service/loi-service/Create.vue?vue&type=template&id=a466507e&scoped=true&");
/* harmony import */ var _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/loi-service/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_vue_vue_type_template_id_a466507e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Create_vue_vue_type_template_id_a466507e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a466507e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/loi-service/Create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Create.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Create.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Create.vue?vue&type=template&id=a466507e&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Create.vue?vue&type=template&id=a466507e&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_a466507e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=template&id=a466507e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Create.vue?vue&type=template&id=a466507e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_a466507e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_a466507e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Loi.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Loi.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loi_vue_vue_type_template_id_b144505e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loi.vue?vue&type=template&id=b144505e& */ "./resources/js/src/views/service/loi-service/Loi.vue?vue&type=template&id=b144505e&");
/* harmony import */ var _Loi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loi.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/loi-service/Loi.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Loi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Loi_vue_vue_type_template_id_b144505e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Loi_vue_vue_type_template_id_b144505e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/loi-service/Loi.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Loi.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Loi.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Loi.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Loi.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Loi.vue?vue&type=template&id=b144505e&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Loi.vue?vue&type=template&id=b144505e& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Loi_vue_vue_type_template_id_b144505e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Loi.vue?vue&type=template&id=b144505e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Loi.vue?vue&type=template&id=b144505e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Loi_vue_vue_type_template_id_b144505e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Loi_vue_vue_type_template_id_b144505e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Read.vue":
/*!*************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Read.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Read_vue_vue_type_template_id_d0514aca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Read.vue?vue&type=template&id=d0514aca& */ "./resources/js/src/views/service/loi-service/Read.vue?vue&type=template&id=d0514aca&");
/* harmony import */ var _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/loi-service/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Read_vue_vue_type_template_id_d0514aca___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Read_vue_vue_type_template_id_d0514aca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/loi-service/Read.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Read.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Read.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/loi-service/Read.vue?vue&type=template&id=d0514aca&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/service/loi-service/Read.vue?vue&type=template&id=d0514aca& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_d0514aca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=template&id=d0514aca& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/loi-service/Read.vue?vue&type=template&id=d0514aca&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_d0514aca___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_d0514aca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);