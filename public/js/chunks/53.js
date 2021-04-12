(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[53],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      moduleData: [],
      inputModalSt: false,
      modalTitle: null,
      modalType: null,
      loiOrgTypeData: [],
      loiOrganization: [],
      orgType: '',
      orgName: '',
      organizationAddress: '',
      letterAddressTo: '',
      id: null
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                axios.get('/api/loi-organization/data').then(function (response) {
                  _this.loiOrganization = response.data.loiOrganization;
                })["catch"](function (error) {
                  _this.notificationAlert(error.response);
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    inputModal: function inputModal(type) {
      var _this2 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ORG_TYPE)).then(function (response) {
        _this2.loiOrgTypeData = response.data.items;
      })["catch"](function (err) {
        console.log(err);
      });
      this.inputModalSt = !this.inputModalSt;
      this.modalType = type;

      if (type == 'new') {
        this.modalTitle = 'Add New LOI Organization';
        this.orgType = '';
        this.orgName = '';
        this.organizationAddress = '';
        this.letterAddressTo = '';
        this.errorData = {};
      } else if (type == 'edit') {
        this.modalTitle = 'Edit LOI Organization';
        this.orgType = data.type;
        this.orgName = data.name;
        this.organizationAddress = data.address;
        this.letterAddressTo = data.letter_to;
        this.id = data.id;
        this.errorData = {};
      }
    },
    create: function create() {
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
                  orgType: _this3.orgType,
                  orgName: _this3.orgName,
                  organizationAddress: _this3.organizationAddress,
                  letterAddressTo: _this3.letterAddressTo
                };
                _this3.btnDisabled = true;
                _context2.next = 6;
                return axios.post('/api/loi-organization/data/create', data);

              case 6:
                req = _context2.sent;

                if (req.data) {
                  _this3.inputModalSt = false;

                  _this3.notificationAlert(req);

                  _this3.loadData();
                }

                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);

                if (_context2.t0.response.data.errors) {
                  _this3.errorData = _context2.t0.response.data.errors;
                } else {
                  _this3.errorData = _context2.t0.response.data.message;
                }

                _this3.notificationAlert(_context2.t0.response);

              case 14:
                _this3.btnDisabled = false;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }))();
    },
    update: function update() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this4.errorData = {};
                _context3.prev = 1;
                data = {
                  orgType: _this4.orgType,
                  orgName: _this4.orgName,
                  organizationAddress: _this4.organizationAddress,
                  letterAddressTo: _this4.letterAddressTo,
                  id: _this4.id
                };
                _this4.btnDisabled = true;
                _context3.next = 6;
                return axios.post('/api/loi-organization/data/update', data);

              case 6:
                req = _context3.sent;

                if (req.data) {
                  _this4.inputModalSt = false;

                  _this4.notificationAlert(req);

                  _this4.loadData();
                }

                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);

                if (_context3.t0.response.data.errors) {
                  _this4.errorData = _context3.t0.response.data.errors;
                } else {
                  _this4.errorData = _context3.t0.response.data.message;
                }

                _this4.notificationAlert(_context3.t0.response);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }))();
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this5 = this;

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
                return axios.post('/api/loi-organization/data/delete', data);

              case 4:
                req = _context4.sent;

                if (req.data) {
                  _this5.loadData();

                  _this5.notificationAlert(req);
                }

                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);

                _this5.notificationAlert(_context4.t0.response);

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=template&id=48a1f6a4&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=template&id=48a1f6a4& ***!
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
  return _c("vx-card", { attrs: { title: "" } }, [
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
                [_vm._v("Add New\n                ")]
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
                  data: _vm.loiOrganization
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
                            _c("vs-td", { attrs: { data: tr.type_name } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.type_name) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.name } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.name) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.address } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.address) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.letter_to } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.letter_to) +
                                  "\n                        "
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
                                        return _vm.actionConfirm(
                                          tr,
                                          _vm.deleteDataProceed,
                                          "delete " + tr.degree_name
                                        )
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
                    _c("vs-th", [_vm._v("Organization Type")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Organization Name")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Organization Address")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Letter Address To")]),
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
            _c("form", [
              _c(
                "div",
                {},
                [
                  _c(
                    "div",
                    { staticClass: "flex-auto pt-3" },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "Organization Type",
                            label: "Organization Type",
                            autocomplete: ""
                          },
                          model: {
                            value: _vm.orgType,
                            callback: function($$v) {
                              _vm.orgType = $$v
                            },
                            expression: "orgType"
                          }
                        },
                        _vm._l(_vm.loiOrgTypeData, function(LoiItem, LoiIndex) {
                          return _c("vs-select-item", {
                            key: LoiIndex,
                            attrs: { value: LoiItem.value, text: LoiItem.label }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.orgType,
                          name: "Organization Type",
                          altName: "Organization Type"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.errorData.orgType
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.orgType[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Organization Name" },
                    model: {
                      value: _vm.orgName,
                      callback: function($$v) {
                        _vm.orgName = $$v
                      },
                      expression: "orgName"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.orgName
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.orgName[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Organization Address" },
                    model: {
                      value: _vm.organizationAddress,
                      callback: function($$v) {
                        _vm.organizationAddress = $$v
                      },
                      expression: "organizationAddress"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.organizationAddress
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.errorData.organizationAddress[0]) +
                            "\n                    "
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Letter Address To" },
                    model: {
                      value: _vm.letterAddressTo,
                      callback: function($$v) {
                        _vm.letterAddressTo = $$v
                      },
                      expression: "letterAddressTo"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.letterAddressTo
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.errorData.letterAddressTo[0]) +
                            "\n                    "
                        )
                      ])
                    : _vm._e()
                ],
                1
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

/***/ "./resources/js/src/views/app/masterdata/LOIOrganization.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/LOIOrganization.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LOIOrganization_vue_vue_type_template_id_48a1f6a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LOIOrganization.vue?vue&type=template&id=48a1f6a4& */ "./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=template&id=48a1f6a4&");
/* harmony import */ var _LOIOrganization_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LOIOrganization.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LOIOrganization_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LOIOrganization_vue_vue_type_template_id_48a1f6a4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LOIOrganization_vue_vue_type_template_id_48a1f6a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/masterdata/LOIOrganization.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LOIOrganization_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LOIOrganization.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LOIOrganization_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=template&id=48a1f6a4&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=template&id=48a1f6a4& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LOIOrganization_vue_vue_type_template_id_48a1f6a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LOIOrganization.vue?vue&type=template&id=48a1f6a4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/LOIOrganization.vue?vue&type=template&id=48a1f6a4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LOIOrganization_vue_vue_type_template_id_48a1f6a4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LOIOrganization_vue_vue_type_template_id_48a1f6a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);