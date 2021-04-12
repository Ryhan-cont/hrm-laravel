(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      is_for_other: false,
      employees: [],
      request_for: null,
      max_over_time: null,
      ref_id: null,
      TypeData: [],
      overTime: [],
      remarks: null,
      timezone: '',
      quantity: null
    };
  },
  mounted: function mounted() {
    this.loadData();
    this.assetManager('add');
  },
  methods: {
    check: function check(data, index) {
      var a = data.start; // Current date now.

      var b = data.end; // Start of 2010.

      var d = ((b - a) / 1000 / 60 / 60).toFixed(2);
      console.log(this.max_over_time);

      if (d <= 0) {
        this.btnDisabled = true;
        this.overTime[index].end = data.start;
        this.overTime[index].diff = null;
        this.overTime[index].dateErr = 'Must be grater than start time';
      } else if (this.max_over_time < d) {
        this.btnDisabled = true;
        this.overTime[index].diff = d + ' Hours';
        this.overTime[index].dateErr = 'Max over time can be only ' + this.max_over_time + ' hours';
      } else {
        this.btnDisabled = false;
        this.overTime[index].diff = d + ' Hours';
        this.overTime[index].dateErr = null;
      }
    },
    dateCheck: function dateCheck(data, index) {
      var _this = this;

      console.log(data);
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(data);
      var dayName = days[d.getDay()];
      axios.get("/api/overtime-apply/overtime-check/".concat(dayName)).then(function (response) {
        _this.btnDisabled = true;
        _this.max_over_time = response.data.max_over_time;
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    loadData: function loadData() {
      var _this2 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_OVERTIME_TYPES)).then(function (response) {
        _this2.TypeData = response.data.items;
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    assetManager: function assetManager(type) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = {
        category: null,
        start: new Date(),
        end: new Date(),
        subCategory: null,
        subCetegoryData: [],
        categoryItem: null,
        categoryItemData: []
      };

      if (type == 'add') {
        this.overTime.push(data);
      }

      if (type == 'delete') {
        if (index > -1) {
          this.overTime.splice(index, 1);
        }
      }
    },
    createRequest: function createRequest() {
      var _this3 = this;

      this.btnDisabled = true;
      var data = {
        module_id: this.$store.state.moduleId,
        ref_id: this.ref_id,
        overTime: this.overTime,
        remarks: this.remarks,
        status: 0,
        is_for_other: this.is_for_other,
        request_for: this.request_for
      };
      axios.post('/api/overtime-apply/create', data).then(function (response) {
        _this3.notificationAlert(response);

        _this3.$router.push('/dashboard');
      })["catch"](function (err) {
        _this3.notificationAlert(err.response);
      });
    },
    fetchUserList: function fetchUserList() {
      var _this4 = this;

      axios.get("/api/work-group/list/users").then(function (response) {
        _this4.employees = response.data.data;
      })["catch"](function (err) {
        _this4.notificationAlert(err.response);
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create */ "./resources/js/src/views/service/overtime-apply/Create.vue");
/* harmony import */ var _Read__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read */ "./resources/js/src/views/service/overtime-apply/Read.vue");
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
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
      overtime_id: null,
      req_id: this.$route.query.id,
      ref_id: this.$route.query.ref_id,
      TypeData: [],
      overTime: [],
      remarks: null,
      timezone: '',
      quantity: null,
      delete_ids: [],
      max_over_time: null
    };
  },
  created: function created() {
    this.fetchRequest();
  },
  mounted: function mounted() {},
  methods: {
    check: function check(data, index) {
      console.log(data);
      var a = new Date(data.start_time.date); // Current date now.

      var b = new Date(data.end_time.date); // Start of 2010.

      var d = ((b - a) / 1000 / 60 / 60).toFixed(2);

      if (d <= 0) {
        this.overTime[index].end_time.date = a;
        this.overTime[index].diff = '0';
        this.overTime[index].dateErr = 'Must be grater than start time';
      } else if (this.max_over_time < d) {
        this.overTime[index].diff = d;
        this.overTime[index].dateErr = 'Max over time can be only ' + this.max_over_time + ' hours';
      } else {
        this.overTime[index].diff = d;
        this.overTime[index].dateErr = null;
      }
    },
    dateCheck: function dateCheck(data, index) {
      var _this = this;

      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(data);
      var dayName = days[d.getDay()];
      axios.get("/api/overtime-apply/overtime-check/".concat(dayName)).then(function (response) {
        _this.max_over_time = response.data.max_over_time;
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    assetManager: function assetManager(type) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      console.log(type);
      var data = {
        type_id: '',
        date: '',
        start_time: {
          date: new Date()
        },
        end_time: {
          date: new Date()
        },
        timezone: ''
      };

      if (type == 'add') {
        this.overTime.push(data);
      }

      if (type == 'delete') {
        if (index > -1) {
          if (id !== null) {
            this.delete_ids.push(id);
          }

          this.overTime.splice(index, 1);
        }
      }
    },
    loadData: function loadData() {
      var _this2 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_OVERTIME_TYPES)).then(function (response) {
        _this2.TypeData = response.data.items;
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    fetchRequest: function fetchRequest() {
      var _this3 = this;

      axios.get("/api/overtime-apply/data/".concat(this.$route.query.id)).then(function (response) {
        _this3.req_info = response.data;

        if (_this3.data.edit_info) {
          _this3.loadData();

          _this3.overtime_id = response.data.overtime_id, _this3.overTime = response.data.infos;
          _this3.max_over_time = response.data.infos[0].max_over_time;
          _this3.remarks = response.data.remarks;
        }
      })["catch"](function (err) {
        console.log(err);
      });
    },
    updateRequest: function updateRequest() {
      var _this4 = this;

      this.btnDisabled = true;
      var data = {
        module_id: this.$store.state.moduleId,
        overTime: this.overTime,
        overtime_id: this.overtime_id,
        ref_id: this.ref_id,
        remarks: this.remarks,
        status: 0,
        delete_ids: this.delete_ids
      };
      this.$http.put("/api/overtime-apply/update/".concat(this.req_id), data).then(function (response) {
        _this4.notificationAlert(response);

        _this4.$router.push('/dashboard');
      })["catch"](function (err) {
        _this4.notificationAlert(err.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".vc-date {\n  display: none !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=template&id=890074d6&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=template&id=890074d6& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
          [
            _vm._l(_vm.overTime, function(item, index) {
              return _c("div", { key: index, staticClass: "vx-row" }, [
                _c(
                  "div",
                  {
                    staticClass: "vx-col md:w-2/12 w-full overflow-hidden pt-4"
                  },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          placeholder: "Overtime Type",
                          label: "Overtime Type",
                          autocomplete: ""
                        },
                        model: {
                          value: item.type,
                          callback: function($$v) {
                            _vm.$set(item, "type", $$v)
                          },
                          expression: "item.type"
                        }
                      },
                      _vm._l(_vm.TypeData, function(item, index) {
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
                _c(
                  "div",
                  { staticClass: "vx-col md:w-2/12 w-full overflow-hidden" },
                  [
                    _c("v-date-picker", {
                      attrs: {
                        color: "purple",
                        masks: { input: "DD-MM-YYYY" }
                      },
                      on: {
                        input: function($event) {
                          return _vm.dateCheck(item.date, index)
                        }
                      },
                      scopedSlots: _vm._u(
                        [
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
                                        label: "Date",
                                        value: inputValue
                                      }
                                    },
                                    inputEvents
                                  )
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      ),
                      model: {
                        value: item.date,
                        callback: function($$v) {
                          _vm.$set(item, "date", $$v)
                        },
                        expression: "item.date"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "vx-col md:w-3/12 w-full overflow-hidden pt-3"
                  },
                  [
                    _c("label", [_vm._v("Start Time")]),
                    _vm._v(" "),
                    _c("v-date-picker", {
                      attrs: { mode: "time", timezone: _vm.timezone },
                      on: {
                        input: function($event) {
                          return _vm.check(item, index)
                        }
                      },
                      model: {
                        value: item.start,
                        callback: function($$v) {
                          _vm.$set(item, "start", $$v)
                        },
                        expression: "item.start"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "vx-col md:w-3/12 w-full overflow-hidden pt-3"
                  },
                  [
                    _c("label", [_vm._v("End Time")]),
                    _vm._v(" "),
                    _c("v-date-picker", {
                      attrs: { mode: "time", timezone: _vm.timezone },
                      on: {
                        input: function($event) {
                          return _vm.check(item, index)
                        }
                      },
                      model: {
                        value: item.end,
                        callback: function($$v) {
                          _vm.$set(item, "end", $$v)
                        },
                        expression: "item.end"
                      }
                    }),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-danger" }, [
                      _vm._v(_vm._s(item.dateErr))
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col md:w-1/12 w-full pt-8" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(item.diff) +
                      "\n                "
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col md:w-1/12 w-full pt-8" }, [
                  _c(
                    "span",
                    { staticClass: "centerx" },
                    [
                      _c(
                        "vs-tooltip",
                        { attrs: { text: "Remove" } },
                        [
                          _c("vs-button", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  index || (!index && _vm.overTime.length > 1),
                                expression:
                                  "index || ( !index && overTime.length > 1)"
                              }
                            ],
                            staticClass: "flex-auto mr-3",
                            attrs: {
                              size: "large",
                              color: "danger",
                              type: "flat",
                              "icon-pack": "feather",
                              icon: "icon-x"
                            },
                            on: {
                              click: function($event) {
                                return _vm.assetManager("delete", index)
                              }
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-tooltip",
                        { attrs: { text: "Add New" } },
                        [
                          _c("vs-button", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: index === _vm.overTime.length - 1,
                                expression: "index === overTime.length-1"
                              }
                            ],
                            staticClass: "flex-auto",
                            attrs: {
                              size: "large",
                              color: "primary",
                              type: "flat",
                              "icon-pack": "feather",
                              icon: "icon-plus"
                            },
                            on: {
                              click: function($event) {
                                return _vm.assetManager("add")
                              }
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              ])
            }),
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
                        disabled: _vm.btnDisabled,
                        icon: "send"
                      },
                      on: {
                        click: function($event) {
                          return _vm.createRequest()
                        }
                      }
                    },
                    [_vm._v(" Send ")]
                  )
                ],
                1
              )
            ])
          ],
          2
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=template&id=b60890cc&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=template&id=b60890cc& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=template&id=d958a522&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=template&id=d958a522& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
                            _c("vs-th", [_vm._v("Overtime Type")]),
                            _vm._v(" "),
                            _c("vs-th", [_vm._v("Date")]),
                            _vm._v(" "),
                            _c("vs-th", [_vm._v("Start Time")]),
                            _vm._v(" "),
                            _c("vs-th", [_vm._v("End Time")]),
                            _vm._v(" "),
                            _c("vs-th", [_vm._v("Hour")])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.req_info.infos, function(item, index) {
                          return _c(
                            "vs-tr",
                            { key: index },
                            [
                              _c("vs-td", [_vm._v(_vm._s(item.type_name))]),
                              _vm._v(" "),
                              _c("vs-td", [
                                _vm._v(_vm._s(item.formatted_date))
                              ]),
                              _vm._v(" "),
                              _c("vs-td", [
                                _vm._v(_vm._s(item.formatted_start_time))
                              ]),
                              _vm._v(" "),
                              _c("vs-td", [
                                _vm._v(_vm._s(item.formatted_end_time))
                              ]),
                              _vm._v(" "),
                              _c("vs-td", [_vm._v(_vm._s(item.diff))])
                            ],
                            1
                          )
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
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
                            _c("vs-th", { staticStyle: { width: "20%" } }, [
                              _vm._v("Remarks")
                            ]),
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
              : _c(
                  "div",
                  [
                    _vm._l(_vm.overTime, function(item, index) {
                      return _c("div", { key: index, staticClass: "vx-row" }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "vx-col md:w-11/12 w-full overflow-hidden pt-4"
                          },
                          [
                            _c("div", { staticClass: "vx-row" }, [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "vx-col md:w-6/12 w-full overflow-hidden pt-4"
                                },
                                [
                                  _c(
                                    "vs-select",
                                    {
                                      staticClass: "w-full",
                                      attrs: {
                                        placeholder: "Overtime Type",
                                        label: "Overtime Type",
                                        autocomplete: ""
                                      },
                                      model: {
                                        value: item.type_id,
                                        callback: function($$v) {
                                          _vm.$set(item, "type_id", $$v)
                                        },
                                        expression: "item.type_id"
                                      }
                                    },
                                    _vm._l(_vm.TypeData, function(item, index) {
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
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "vx-col md:w-6/12 w-full overflow-hidden"
                                },
                                [
                                  _c("v-date-picker", {
                                    attrs: {
                                      color: "purple",
                                      masks: { input: "DD-MM-YYYY" }
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.dateCheck(item.date, index)
                                      }
                                    },
                                    scopedSlots: _vm._u(
                                      [
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
                                                      icon:
                                                        "icon icon-calendar",
                                                      label: "Date",
                                                      value: inputValue
                                                    }
                                                  },
                                                  inputEvents
                                                )
                                              )
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      true
                                    ),
                                    model: {
                                      value: item.date,
                                      callback: function($$v) {
                                        _vm.$set(item, "date", $$v)
                                      },
                                      expression: "item.date"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "vx-col md:w-5/12 w-full overflow-hidden pt-3"
                                },
                                [
                                  _c("label", [_vm._v("Start Time")]),
                                  _vm._v(" "),
                                  _c("v-date-picker", {
                                    attrs: {
                                      mode: "time",
                                      timezone: _vm.timezone
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.check(item, index)
                                      }
                                    },
                                    model: {
                                      value: item.start_time.date,
                                      callback: function($$v) {
                                        _vm.$set(item.start_time, "date", $$v)
                                      },
                                      expression: "item.start_time.date"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "vx-col md:w-5/12 w-full overflow-hidden pt-3"
                                },
                                [
                                  _c("label", [_vm._v("End Time")]),
                                  _vm._v(" "),
                                  _c("v-date-picker", {
                                    attrs: {
                                      mode: "time",
                                      timezone: _vm.timezone
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.check(item, index)
                                      }
                                    },
                                    model: {
                                      value: item.end_time.date,
                                      callback: function($$v) {
                                        _vm.$set(item.end_time, "date", $$v)
                                      },
                                      expression: "item.end_time.date"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "text-danger" }, [
                                    _vm._v(_vm._s(item.dateErr))
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "vx-col md:w-2/12 w-full pt-8" },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(item.diff) +
                                      " Hours\n                            "
                                  )
                                ]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "vx-col md:w-1/12 w-full overflow-hidden pt-4"
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "vx-col md:w-1/12 w-full pt-16" },
                              [
                                _c(
                                  "span",
                                  { staticClass: "centerx" },
                                  [
                                    _c(
                                      "vs-tooltip",
                                      { attrs: { text: "Remove" } },
                                      [
                                        _c("vs-button", {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value:
                                                index ||
                                                (!index &&
                                                  _vm.overTime.length > 1),
                                              expression:
                                                "index || ( !index && overTime.length > 1)"
                                            }
                                          ],
                                          staticClass: "flex-auto mr-3",
                                          attrs: {
                                            size: "large",
                                            color: "danger",
                                            type: "flat",
                                            "icon-pack": "feather",
                                            icon: "icon-x"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.assetManager(
                                                "delete",
                                                index,
                                                item.item_id
                                              )
                                            }
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "vs-tooltip",
                                      { attrs: { text: "Add New" } },
                                      [
                                        _c("vs-button", {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value:
                                                index ===
                                                _vm.overTime.length - 1,
                                              expression:
                                                "index === overTime.length-1"
                                            }
                                          ],
                                          staticClass: "flex-auto",
                                          attrs: {
                                            size: "large",
                                            color: "primary",
                                            type: "flat",
                                            "icon-pack": "feather",
                                            icon: "icon-plus"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.assetManager("add")
                                            }
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    }),
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
                              attrs: {
                                size: "small",
                                disabled: _vm.btnDisabled,
                                icon: "send"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.updateRequest()
                                }
                              }
                            },
                            [_vm._v("Send ")]
                          )
                        ],
                        1
                      )
                    ])
                  ],
                  2
                )
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

/***/ "./resources/js/src/views/service/overtime-apply/Create.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/Create.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create_vue_vue_type_template_id_890074d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=890074d6& */ "./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=template&id=890074d6&");
/* harmony import */ var _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Create_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Create.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_vue_vue_type_template_id_890074d6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Create_vue_vue_type_template_id_890074d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/overtime-apply/Create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=template&id=890074d6&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=template&id=890074d6& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_890074d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=template&id=890074d6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Create.vue?vue&type=template&id=890074d6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_890074d6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_890074d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/OverTime.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/OverTime.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OverTime_vue_vue_type_template_id_b60890cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OverTime.vue?vue&type=template&id=b60890cc& */ "./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=template&id=b60890cc&");
/* harmony import */ var _OverTime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OverTime.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OverTime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OverTime_vue_vue_type_template_id_b60890cc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OverTime_vue_vue_type_template_id_b60890cc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/overtime-apply/OverTime.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverTime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OverTime.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverTime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=template&id=b60890cc&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=template&id=b60890cc& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OverTime_vue_vue_type_template_id_b60890cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OverTime.vue?vue&type=template&id=b60890cc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/OverTime.vue?vue&type=template&id=b60890cc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OverTime_vue_vue_type_template_id_b60890cc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OverTime_vue_vue_type_template_id_b60890cc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/Read.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/Read.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Read_vue_vue_type_template_id_d958a522___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Read.vue?vue&type=template&id=d958a522& */ "./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=template&id=d958a522&");
/* harmony import */ var _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Read.vue?vue&type=script&lang=js& */ "./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Read_vue_vue_type_template_id_d958a522___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Read_vue_vue_type_template_id_d958a522___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/service/overtime-apply/Read.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=template&id=d958a522&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=template&id=d958a522& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_d958a522___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Read.vue?vue&type=template&id=d958a522& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/service/overtime-apply/Read.vue?vue&type=template&id=d958a522&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_d958a522___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Read_vue_vue_type_template_id_d958a522___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);