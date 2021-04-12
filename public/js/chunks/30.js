(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      moduleData: [],
      inputModalSt: false,
      modalTitle: null,
      modalType: null,
      prefix: {
        'payrollHeadData': []
      },
      payrollPackage: [],
      packageTitle: '',
      payrollData: [],
      total: '',
      comment: '',
      id: null
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  filters: {
    addComma: function addComma(value) {
      try {
        if (value == null) {
          return 0;
        } else if (value == undefined) {
          return 0;
        } else if (value == '') {
          return 0;
        } else if (value.toString().indexOf(".") > -1) {
          var addCommaData = value.toString().split('.');
          return addCommaData[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + addCommaData[1];
        } else {
          return value.toString().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      } catch (err) {
        console.log(value);
        return 0;
      }
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      axios.get('/api/payroll-package/data').then(function (response) {
        _this.prefix.payrollHeadData = response.data.payrollHead;
        _this.payrollPackage = response.data.payrollPackage;
      })["catch"](function (error) {
        _this.notificationAlert(error.response);
      });
    },
    inputModal: function inputModal(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.inputModalSt = !this.inputModalSt;
      this.modalType = type;
      this.resetError();

      if (type == 'new') {
        this.modalTitle = 'Add New Payroll Package';
        this.packageTitle = '';
        this.total = '';
        this.comment = '';
        this.managePayroll('new');
      } else if (type == 'edit') {
        this.modalTitle = 'Edit Payroll Package';
        this.packageTitle = data.name;
        this.total = data.total;
        this.payrollData = _.cloneDeep(data.payroll);
        this.comment = data.comment;
        this.id = data.id;
      }
    },
    managePayroll: function managePayroll(type) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = {
        head: null,
        amount: null
      };

      if (type == 'new') {
        this.payrollData = [];
        this.payrollData.push(data);
      }

      if (type == 'newItem') {
        this.payrollData.push(data);
      }

      if (type == 'delete') {
        if (index > -1) {
          this.payrollData.splice(index, 1);
        }
      }
    },
    totalCalculate: function totalCalculate() {
      var total = 0;

      for (var i = 0; this.payrollData.length > i; i++) {
        total = Number(total) + Number(this.payrollData[i].amount);
      }

      this.total = total;
    },
    create: function create() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.errorData = {};
                _context.prev = 1;
                data = {
                  packageTitle: _this2.packageTitle,
                  payrollData: _this2.payrollData,
                  total: _this2.total,
                  comment: _this2.comment
                };

                if (!_this2.validateInput(data)) {
                  _context.next = 9;
                  break;
                }

                _this2.btnDisabled = true;
                _context.next = 7;
                return axios.post('/api/payroll-package/data/create', data);

              case 7:
                req = _context.sent;

                if (req) {
                  _this2.inputModalSt = false;

                  _this2.loadData();

                  _this2.notificationAlert(req);
                }

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                _this2.notificationAlert(_context.t0.response);

              case 14:
                _this2.btnDisabled = false;

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11]]);
      }))();
    },
    update: function update() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this3.errorData = {};
                _context2.prev = 1;
                data = {
                  packageTitle: _this3.packageTitle,
                  payrollData: _this3.payrollData,
                  total: _this3.total,
                  comment: _this3.comment,
                  id: _this3.id
                };
                _context2.next = 5;
                return axios.post('/api/payroll-package/data/update', data);

              case 5:
                req = _context2.sent;

                if (req) {
                  _this3.notificationAlert(req);

                  _this3.inputModalSt = false;

                  _this3.loadData();
                }

                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);

                _this3.notificationAlert(_context2.t0.response);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }))();
    },
    deleteData: function deleteData(deldata) {
      console.log(this);
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this Payroll Package?',
        acceptText: 'ok',
        accept: this.deleteDataProceed,
        parameters: deldata
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this4 = this;

      var data = {
        id: Deldata.id
      };
      axios.post('/api/payroll-package/data/delete', data).then(function (response) {
        _this4.notificationAlert(response);

        _this4.loadData();
      })["catch"](function (error) {
        _this4.notificationAlert(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".vs-tooltip {\n  z-index: 99999 !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PayrollPackage.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=template&id=8b8d9a48&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=template&id=8b8d9a48& ***!
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
  return _c("vx-card", { attrs: { title: "" } }, [
    _c(
      "div",
      [
        _c("div", {}, [
          _c("div", { staticClass: "flex" }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-plus"
                    },
                    on: {
                      click: function($event) {
                        return _vm.inputModal("new")
                      }
                    }
                  },
                  [
                    _vm._v(
                      "Add\n                        New\n                    "
                    )
                  ]
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "pt-3", staticStyle: { "min-height": "300px" } },
            [
              _c(
                "vs-table",
                {
                  attrs: {
                    "max-items": "10",
                    pagination: "",
                    search: "",
                    stripe: "",
                    data: _vm.payrollPackage
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
                              _c("vs-td", { attrs: { data: tr.name } }, [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(tr.name) +
                                    "\n                            "
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: tr.payroll } },
                                _vm._l(tr.payroll, function(item, index) {
                                  return _c(
                                    "div",
                                    { key: index, staticClass: "flex py-1" },
                                    [
                                      _c("div", { staticClass: "flex-auto" }, [
                                        _vm._v(_vm._s(item.head))
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "flex-auto text-right",
                                          staticStyle: { "max-width": "80px" }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("addComma")(item.amount)
                                            )
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                }),
                                0
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  staticClass: "text-right",
                                  attrs: { data: tr.total }
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(_vm._f("addComma")(tr.total)) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("vs-td", { attrs: { data: tr.comment } }, [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(tr.comment) +
                                    "\n                            "
                                )
                              ]),
                              _vm._v(" "),
                              _c("vs-td", { staticClass: "w-10" }, [
                                _c("div", { staticClass: "flex pt-1" }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "flex-auto cursor-pointer",
                                      attrs: { align: "center" },
                                      on: {
                                        click: function($event) {
                                          return _vm.inputModal("edit", tr)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "i",
                                        {
                                          staticClass:
                                            "material-icons text-lg icon align"
                                        },
                                        [_vm._v("edit")]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "flex-auto cursor-pointer",
                                      attrs: { align: "center" },
                                      on: {
                                        click: function($event) {
                                          return _vm.deleteData(tr)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "i",
                                        {
                                          staticClass:
                                            "material-icons text-lg icon align"
                                        },
                                        [_vm._v("delete")]
                                      )
                                    ]
                                  )
                                ])
                              ])
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
                      _c("vs-th", [_vm._v("Package Title")]),
                      _vm._v(" "),
                      _c("vs-th", [
                        _c("div", { staticClass: "flex w-full" }, [
                          _c("div", { staticClass: "flex-auto" }, [
                            _vm._v("Payroll Head")
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "flex-auto",
                              staticStyle: { "max-width": "80px" }
                            },
                            [_vm._v("Amount")]
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { staticClass: "text-center" }, [
                        _vm._v("Total")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Comment")]),
                      _vm._v(" "),
                      _c("vs-th", { staticClass: "w-10 text-center" }, [
                        _vm._v("Action")
                      ])
                    ],
                    1
                  )
                ],
                2
              )
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c(
          "vs-popup",
          {
            attrs: { title: _vm.modalTitle, active: _vm.inputModalSt },
            on: {
              "update:active": function($event) {
                _vm.inputModalSt = $event
              }
            }
          },
          [
            _c("form", [
              _c(
                "div",
                {},
                [
                  _c(
                    "div",
                    [
                      _c("vs-input", {
                        staticClass: "w-full pt-3",
                        attrs: { "label-placeholder": "Package Title" },
                        model: {
                          value: _vm.packageTitle,
                          callback: function($$v) {
                            _vm.packageTitle = $$v
                          },
                          expression: "packageTitle"
                        }
                      }),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.packageTitle,
                          name: "packageTitle",
                          altName: "package title"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.payrollData, function(item, index) {
                    return _c("div", { key: index }, [
                      _c("div", { staticClass: "vx-row" }, [
                        _c(
                          "div",
                          { staticClass: "vx-col md:w-5/12 w-full pt-2" },
                          [
                            _c("search-box", {
                              attrs: {
                                label: "Payroll Head",
                                items: _vm.prefix.payrollHeadData
                              },
                              model: {
                                value: item.head,
                                callback: function($$v) {
                                  _vm.$set(item, "head", $$v)
                                },
                                expression: "item.head"
                              }
                            }),
                            _vm._v(" "),
                            _c("validate-data", {
                              attrs: {
                                rules: "required",
                                value: item.head,
                                name: "payrollData." + index + ".head",
                                altName: "payroll head"
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
                              "vx-col md:w-5/12 w-full overflow-hidden"
                          },
                          [
                            _c("vs-input", {
                              staticClass: "w-full pt-3",
                              attrs: { "label-placeholder": "Head Amount" },
                              on: {
                                input: function($event) {
                                  return _vm.totalCalculate()
                                }
                              },
                              model: {
                                value: item.amount,
                                callback: function($$v) {
                                  _vm.$set(item, "amount", $$v)
                                },
                                expression: "item.amount"
                              }
                            }),
                            _vm._v(" "),
                            _c("validate-data", {
                              attrs: {
                                rules: "required|integer",
                                value: item.amount,
                                name: "payrollData." + index + ".amount",
                                altName: "amount"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "vx-col md:w-2/12 w-full pt-8" },
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
                                              _vm.payrollData.length > 1),
                                          expression:
                                            "index || ( !index && payrollData.length > 1)"
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
                                          return _vm.managePayroll(
                                            "delete",
                                            index
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
                                            _vm.payrollData.length - 1,
                                          expression:
                                            "index === payrollData.length-1"
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
                                          return _vm.managePayroll("newItem")
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
                      ])
                    ])
                  }),
                  _vm._v(" "),
                  _c("div", [
                    _c("div", { staticClass: "flex" }, [
                      _c("div", { staticClass: "font-bold pr-2" }, [
                        _vm._v("Total:")
                      ]),
                      _vm._v(" "),
                      _c("div", {}, [
                        _vm._v(_vm._s(_vm._f("addComma")(_vm.total)))
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-6" },
                    [
                      _c("vs-textarea", {
                        attrs: { label: "Comment" },
                        model: {
                          value: _vm.comment,
                          callback: function($$v) {
                            _vm.comment = $$v
                          },
                          expression: "comment"
                        }
                      })
                    ],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "mt-8" }, [
                _vm.modalType == "new"
                  ? _c(
                      "div",
                      { staticClass: "pt-1", attrs: { align: "right" } },
                      [
                        _c(
                          "vs-button",
                          {
                            attrs: { disabled: _vm.btnDisabled },
                            on: {
                              click: function($event) {
                                return _vm.create()
                              }
                            }
                          },
                          [_vm._v("Create")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.modalType == "edit"
                  ? _c(
                      "div",
                      { staticClass: "pt-1", attrs: { align: "right" } },
                      [
                        _c(
                          "vs-button",
                          {
                            attrs: { disabled: _vm.btnDisabled },
                            on: {
                              click: function($event) {
                                return _vm.update()
                              }
                            }
                          },
                          [_vm._v("Update")]
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ])
            ])
          ]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/masterdata/PayrollPackage.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/PayrollPackage.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PayrollPackage_vue_vue_type_template_id_8b8d9a48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PayrollPackage.vue?vue&type=template&id=8b8d9a48& */ "./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=template&id=8b8d9a48&");
/* harmony import */ var _PayrollPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PayrollPackage.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PayrollPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PayrollPackage.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PayrollPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PayrollPackage_vue_vue_type_template_id_8b8d9a48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PayrollPackage_vue_vue_type_template_id_8b8d9a48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/masterdata/PayrollPackage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PayrollPackage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PayrollPackage.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=template&id=8b8d9a48&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=template&id=8b8d9a48& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_template_id_8b8d9a48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PayrollPackage.vue?vue&type=template&id=8b8d9a48& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/PayrollPackage.vue?vue&type=template&id=8b8d9a48&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_template_id_8b8d9a48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PayrollPackage_vue_vue_type_template_id_8b8d9a48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);