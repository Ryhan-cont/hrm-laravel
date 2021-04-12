(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/package/PackageManager.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/package/PackageManager.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      packageData: [],
      moduleData: [],
      inputModalSt: false,
      modalTitle: null,
      modalType: null,
      name: '',
      description: '',
      period: '',
      periodvalue: '',
      nou: '',
      price: '',
      currency: 'BDT',
      baseModuleData: [],
      periodOption: ['day', 'week', 'month', 'year'],
      errorData: {}
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  methods: {
    chkdata: function chkdata() {//  console.log(this.packageData)
    },
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var req, packageData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('/api/package/data');

              case 3:
                req = _context.sent;
                packageData = req.data;
                _this.packageData = packageData["package"];
                _this.baseModuleData = packageData.module; //   console.log(this.packageData)

                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);

                _this.notificationAlert(_context.t0.response);

                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }))();
    },
    moduleGrouping: function moduleGrouping(moduleData) {
      var modulesRec = _.cloneDeep(moduleData);

      var modules = {};

      for (var i = 0; modulesRec.length > i; i++) {
        modules[modulesRec[i]['id']] = modulesRec[i];
      }

      var result = {};

      for (var i = 0; this.baseModuleData.length > i; i++) {
        var moduleItem = this.baseModuleData[i];

        if (modules[moduleItem.id]) {
          var moduleGroup = moduleItem.module_group;

          if (moduleGroup != null && moduleGroup != '' && moduleGroup != undefined) {
            if (!result[moduleGroup]) {
              var subArr = {
                status: false,
                name: moduleGroup,
                type: 'group',
                data: []
              };
              result[moduleGroup] = subArr;
            }

            if (modules[moduleItem.id].status == true) {
              result[moduleGroup].status = true;
            }

            result[moduleGroup].data.push(modules[moduleItem.id]);
          } else {
            var subArr = {
              name: "general - ".concat(moduleItem.id),
              type: 'general',
              data: [modules[moduleItem.id]]
            };
            result["general - ".concat(moduleItem.id)] = subArr;
          }
        }
      }

      return _.values(result);
    },
    inputModal: function inputModal(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.inputModalSt = !this.inputModalSt;
      this.modalType = type;

      if (type == 'new') {
        this.modalTitle = 'Add new package';
        this.name = '';
        this.description = '';
        this.period = '';
        this.periodvalue = '';
        this.nou = '';
        this.price = '';
        this.currency = 'BDT';
        this.moduleData = this.moduleGrouping(_.cloneDeep(this.baseModuleData));
        ;
      } else if (type == 'edit') {
        this.modalTitle = 'Edit package';
        this.name = data.name;
        this.description = data.description;
        this.period = data.period;
        this.periodvalue = data.periodvalue;
        this.nou = data.nou;
        this.price = data.price;
        this.currency = data.currency;
        this.id = data.id;

        var baseModuleData = _.cloneDeep(this.baseModuleData);

        var oldModuleData = _.cloneDeep(data.permission);

        var newModelData = baseModuleData.map(function (moduleData) {
          var checkModule = oldModuleData.filter(function (oldModule) {
            return oldModule.moduleid == moduleData.id;
          });

          if (checkModule.length > 0) {
            moduleData.status = true;
            var subPermissions = moduleData.subpermissions.map(function (item) {
              var chksubPermissions = checkModule[0].subpermissions.filter(function (sp) {
                return sp.name == item.name;
              });

              if (chksubPermissions.length > 0) {
                return chksubPermissions[0];
              } else {
                return item;
              }
            });
            moduleData.subpermissions = subPermissions;
          }

          return moduleData;
        });
        this.moduleData = this.moduleGrouping(_.cloneDeep(newModelData));
      }
    },
    permissionChanged: function permissionChanged(indexData, moduleIndex, subModuleIndex) {
      var click = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (click == 'group') {
        var status = this.moduleData[indexData].status;
        this.moduleData[indexData].data.forEach(function (itemData) {
          itemData.subpermissions.forEach(function (item) {
            return item.status = status;
          });
          return itemData.status = status;
        });
      } else if (click == 'module') {
        var status = this.moduleData[indexData].data[moduleIndex].status;

        if (status == true) {
          this.moduleData[indexData].status = true;
        }

        this.moduleData[indexData].data[moduleIndex].subpermissions.forEach(function (item) {
          return item.status = status;
        });
      } else if (click == 'sub') {
        var status = this.moduleData[indexData].data[moduleIndex].subpermissions[subModuleIndex].status;

        if (status == true) {
          this.moduleData[indexData].data[moduleIndex].status = true;
        }
      }
    },
    createPackage: function createPackage() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.btnDisabled = true;
                _context2.prev = 1;
                data = {
                  name: _this2.name,
                  description: _this2.description,
                  period: _this2.period,
                  periodvalue: _this2.periodvalue,
                  nou: _this2.nou,
                  price: _this2.price,
                  currency: _this2.currency,
                  permission: _.flattenDeep(_.map(_this2.moduleData, function (item) {
                    return item.data;
                  }))
                };
                _context2.next = 5;
                return axios.post('/api/package/create', data);

              case 5:
                req = _context2.sent;

                if (req) {
                  _this2.inputModalSt = false;
                  _this2.btnDisabled = false;

                  _this2.notificationAlert(req);

                  _this2.loadData();
                }

                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                _this2.btnDisabled = false;

                _this2.notificationAlert(req);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }))();
    },
    updatePackage: function updatePackage() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.btnDisabled = true;
                _context3.prev = 1;
                data = {
                  name: _this3.name,
                  description: _this3.description,
                  period: _this3.period,
                  periodvalue: _this3.periodvalue,
                  nou: _this3.nou,
                  price: _this3.price,
                  currency: _this3.currency,
                  permission: _.flattenDeep(_.map(_this3.moduleData, function (item) {
                    return item.data;
                  })),
                  id: _this3.id
                };
                _context3.next = 5;
                return axios.post('/api/package/update', data);

              case 5:
                req = _context3.sent;

                if (req) {
                  _this3.inputModalSt = false;
                  _this3.btnDisabled = false;

                  _this3.notificationAlert(req);

                  _this3.loadData();
                }

                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);

                _this3.notificationAlert(_context3.t0.response);

                _this3.btnDisabled = false;

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 9]]);
      }))();
    },
    deleteData: function deleteData(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure u want to delete this package?',
        acceptText: 'ok',
        accept: this.deleteDataProceed,
        parameters: deldata
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                data = {
                  id: Deldata.id
                };
                _context4.next = 4;
                return axios.post('/api/package/delete', data);

              case 4:
                req = _context4.sent;

                if (req) {
                  _this4.notificationAlert(req);

                  _this4.loadData();
                }

                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);

                _this4.notificationAlert(_context4.t0.response);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/package/PackageManager.vue?vue&type=template&id=c562ce70&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/package/PackageManager.vue?vue&type=template&id=c562ce70& ***!
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
  return _c("vx-card", { attrs: { title: "Product Manager" } }, [
    _c(
      "div",
      [
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
                [_vm._v("Add New")]
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
                  pagination: "",
                  search: "",
                  stripe: "",
                  data: _vm.packageData
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
                                "\r\n              " +
                                  _vm._s(tr.name) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.description } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.description) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.period } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.period) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.nou } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.nou) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.price } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.price) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.currency } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.currency) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.permission } }, [
                              _c(
                                "div",
                                { staticClass: "flex flex-wrap" },
                                _vm._l(tr.permission, function(item, index) {
                                  return item.status == true
                                    ? _c(
                                        "div",
                                        {
                                          key: index,
                                          staticClass:
                                            "m-1 px-2 rounded-lg bg-gray-300"
                                        },
                                        [
                                          _c("div", [
                                            _vm._v(_vm._s(item.name))
                                          ]),
                                          _vm._v(" "),
                                          _vm._l(item.subpermissions, function(
                                            subItem,
                                            subIndex
                                          ) {
                                            return subItem.status == true
                                              ? _c(
                                                  "div",
                                                  {
                                                    key: subIndex,
                                                    staticClass:
                                                      "m-1 px-2 rounded-lg bg-gray-200"
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(subItem.title)
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          })
                                        ],
                                        2
                                      )
                                    : _vm._e()
                                }),
                                0
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { staticStyle: { width: "60px" } }, [
                              _c("div", { staticClass: "flex" }, [
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
                    _c("vs-th", { attrs: { "sort-key": "name" } }, [
                      _vm._v("Name")
                    ]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Description")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Period")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Number of user")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Price")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Currency")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Permissions")]),
                    _vm._v(" "),
                    _c(
                      "vs-th",
                      {
                        staticClass: "wd-50 text-center",
                        staticStyle: { width: "50px" }
                      },
                      [_vm._v("Action")]
                    )
                  ],
                  1
                )
              ],
              2
            )
          ],
          1
        ),
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
            _c("div", {}, [
              _c(
                "div",
                [
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Name" },
                    model: {
                      value: _vm.name,
                      callback: function($$v) {
                        _vm.name = $$v
                      },
                      expression: "name"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.name
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.name[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-6" },
                    [
                      _c("vs-textarea", {
                        attrs: { label: "Description" },
                        model: {
                          value: _vm.description,
                          callback: function($$v) {
                            _vm.description = $$v
                          },
                          expression: "description"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "flex" }, [
                    _c(
                      "div",
                      { staticClass: "flex-auto pr-1" },
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Select",
                              label: "Select Menu"
                            },
                            model: {
                              value: _vm.period,
                              callback: function($$v) {
                                _vm.period = $$v
                              },
                              expression: "period"
                            }
                          },
                          _vm._l(_vm.periodOption, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item, text: item }
                            })
                          }),
                          1
                        ),
                        _vm._v(" "),
                        _vm.errorData.period
                          ? _c(
                              "div",
                              { staticClass: "py-1 text-sm text-red-400" },
                              [_vm._v(_vm._s(_vm.errorData.period[0]))]
                            )
                          : _vm._e()
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "flex-auto pl-1" },
                      [
                        _c("vs-input", {
                          staticClass: "w-full",
                          attrs: { label: "Period value" },
                          model: {
                            value: _vm.periodvalue,
                            callback: function($$v) {
                              _vm.periodvalue = $$v
                            },
                            expression: "periodvalue"
                          }
                        }),
                        _vm._v(" "),
                        _vm.errorData.periodvalue
                          ? _c(
                              "div",
                              { staticClass: "py-1 text-sm text-red-400" },
                              [_vm._v(_vm._s(_vm.errorData.periodvalue[0]))]
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Number of user" },
                    model: {
                      value: _vm.nou,
                      callback: function($$v) {
                        _vm.nou = $$v
                      },
                      expression: "nou"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.nou
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.nou[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Price" },
                    model: {
                      value: _vm.price,
                      callback: function($$v) {
                        _vm.price = $$v
                      },
                      expression: "price"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.price
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.price[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Currency" },
                    model: {
                      value: _vm.currency,
                      callback: function($$v) {
                        _vm.currency = $$v
                      },
                      expression: "currency"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.currency
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.currency[0]))
                      ])
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "font-bold text-1xl pt-3" }, [
                _vm._v("Select Module")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "py-4 px-8" },
                [
                  _vm.errorData.permission
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.permission[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._l(_vm.moduleData, function(itemData, indexData) {
                    return _c(
                      "div",
                      {
                        key: indexData,
                        staticClass: "py-4",
                        staticStyle: {
                          "border-bottom": "1px solid rgb(0,0,0,.1)"
                        }
                      },
                      [
                        itemData.type == "group"
                          ? _c(
                              "div",
                              [
                                _c(
                                  "div",
                                  { staticClass: "py-2" },
                                  [
                                    _c(
                                      "vs-checkbox",
                                      {
                                        on: {
                                          change: function($event) {
                                            return _vm.permissionChanged(
                                              indexData,
                                              0,
                                              0,
                                              "group"
                                            )
                                          }
                                        },
                                        model: {
                                          value: itemData.status,
                                          callback: function($$v) {
                                            _vm.$set(itemData, "status", $$v)
                                          },
                                          expression: "itemData.status"
                                        }
                                      },
                                      [_vm._v(_vm._s(itemData.name))]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm._l(itemData.data, function(item, index) {
                                  return _c(
                                    "div",
                                    { key: index, staticClass: "pl-5" },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "py-2" },
                                        [
                                          _c(
                                            "vs-checkbox",
                                            {
                                              on: {
                                                change: function($event) {
                                                  return _vm.permissionChanged(
                                                    indexData,
                                                    index,
                                                    0,
                                                    "module"
                                                  )
                                                }
                                              },
                                              model: {
                                                value: item.status,
                                                callback: function($$v) {
                                                  _vm.$set(item, "status", $$v)
                                                },
                                                expression: "item.status"
                                              }
                                            },
                                            [_vm._v(_vm._s(item.name))]
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      item.subpermissions
                                        ? _c(
                                            "div",
                                            { staticClass: "pl-8" },
                                            _vm._l(
                                              item.subpermissions,
                                              function(sub, subIndex) {
                                                return _c(
                                                  "div",
                                                  { key: subIndex },
                                                  [
                                                    _c(
                                                      "vs-checkbox",
                                                      {
                                                        on: {
                                                          change: function(
                                                            $event
                                                          ) {
                                                            return _vm.permissionChanged(
                                                              indexData,
                                                              index,
                                                              subIndex,
                                                              "sub"
                                                            )
                                                          }
                                                        },
                                                        model: {
                                                          value: sub.status,
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              sub,
                                                              "status",
                                                              $$v
                                                            )
                                                          },
                                                          expression:
                                                            "sub.status"
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(sub.title)
                                                        )
                                                      ]
                                                    )
                                                  ],
                                                  1
                                                )
                                              }
                                            ),
                                            0
                                          )
                                        : _vm._e()
                                    ]
                                  )
                                })
                              ],
                              2
                            )
                          : _c(
                              "div",
                              _vm._l(itemData.data, function(item, index) {
                                return _c("div", { key: index }, [
                                  _c(
                                    "div",
                                    { staticClass: "py-2" },
                                    [
                                      _c(
                                        "vs-checkbox",
                                        {
                                          on: {
                                            change: function($event) {
                                              return _vm.permissionChanged(
                                                indexData,
                                                index,
                                                0,
                                                "module"
                                              )
                                            }
                                          },
                                          model: {
                                            value: item.status,
                                            callback: function($$v) {
                                              _vm.$set(item, "status", $$v)
                                            },
                                            expression: "item.status"
                                          }
                                        },
                                        [_vm._v(_vm._s(item.name))]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  item.subpermissions
                                    ? _c(
                                        "div",
                                        { staticClass: "pl-8" },
                                        _vm._l(item.subpermissions, function(
                                          sub,
                                          subIndex
                                        ) {
                                          return _c(
                                            "div",
                                            { key: subIndex },
                                            [
                                              _c(
                                                "vs-checkbox",
                                                {
                                                  on: {
                                                    change: function($event) {
                                                      return _vm.permissionChanged(
                                                        indexData,
                                                        index,
                                                        subIndex,
                                                        "sub"
                                                      )
                                                    }
                                                  },
                                                  model: {
                                                    value: sub.status,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        sub,
                                                        "status",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "sub.status"
                                                  }
                                                },
                                                [_vm._v(_vm._s(sub.title))]
                                              )
                                            ],
                                            1
                                          )
                                        }),
                                        0
                                      )
                                    : _vm._e()
                                ])
                              }),
                              0
                            )
                      ]
                    )
                  })
                ],
                2
              )
            ]),
            _vm._v(" "),
            _vm.modalType == "new"
              ? _c(
                  "div",
                  { staticClass: "pt-3", attrs: { align: "right" } },
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: { size: "small", disabled: _vm.btnDisabled },
                        on: {
                          click: function($event) {
                            return _vm.createPackage()
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
                  { staticClass: "pt-3", attrs: { align: "right" } },
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: { size: "small", disabled: _vm.btnDisabled },
                        on: {
                          click: function($event) {
                            return _vm.updatePackage()
                          }
                        }
                      },
                      [_vm._v("Update")]
                    )
                  ],
                  1
                )
              : _vm._e()
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

/***/ "./resources/js/src/views/app/package/PackageManager.vue":
/*!***************************************************************!*\
  !*** ./resources/js/src/views/app/package/PackageManager.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PackageManager_vue_vue_type_template_id_c562ce70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PackageManager.vue?vue&type=template&id=c562ce70& */ "./resources/js/src/views/app/package/PackageManager.vue?vue&type=template&id=c562ce70&");
/* harmony import */ var _PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PackageManager.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/package/PackageManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PackageManager_vue_vue_type_template_id_c562ce70___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PackageManager_vue_vue_type_template_id_c562ce70___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/package/PackageManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/package/PackageManager.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/app/package/PackageManager.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PackageManager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/package/PackageManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/package/PackageManager.vue?vue&type=template&id=c562ce70&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/app/package/PackageManager.vue?vue&type=template&id=c562ce70& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_template_id_c562ce70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PackageManager.vue?vue&type=template&id=c562ce70& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/package/PackageManager.vue?vue&type=template&id=c562ce70&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_template_id_c562ce70___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PackageManager_vue_vue_type_template_id_c562ce70___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);