(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      notify: null,
      notify_type: null,
      moduleData: [],
      inputModalSt: false,
      modalTitle: null,
      modalType: null,
      organizations: [],
      users: [],
      orgTypes: [],
      rcCodes: [],
      name: '',
      type: '',
      rccode: '',
      organizationHead: '',
      id: null
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.loadData();
    this.fetchRcCodes();
    this.fetchOrgTypes();
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      axios.get('/api/organization-manager/data').then(function (response) {
        _this.organizations = response.data.organizations;
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    resetCheck: function resetCheck() {
      if (this.modalType !== 'new') {
        this.notify = null;
        this.modalType = 'check';
      }
    },
    inputModal: function inputModal(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      console.log(data);
      this.notify = null;
      this.resetError();
      this.inputModalSt = !this.inputModalSt;
      this.modalType = type;

      if (type === 'new') {
        this.fetchUserList(2);
        this.modalTitle = 'Add New Organization';
        this.name = '';
        this.type = '';
        this.rccode = '';
        this.organizationHead = null;
      } else if (type === 'check') {
        this.fetchUserList();
        this.modalTitle = 'Checking Organization';
        this.name = data.name;
        this.type = data.org_type_id;
        this.rccode = data.rc_code_id;
        this.organizationHead = data.org_head_id;
        this.id = data.id;
      }
    },
    create: function create() {
      var _this2 = this;

      this.btnDisabled = true;
      var data = {
        name: this.name,
        type: this.type,
        rccode: this.rccode,
        organizationHead: this.organizationHead
      };
      axios.post('/api/organization-manager/data/create', data).then(function (response) {
        _this2.inputModalSt = false;

        _this2.loadData();

        _this2.notificationAlert(response);
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    updateCheck: function updateCheck() {
      var _this3 = this;

      var data = {
        name: this.name,
        type: this.type,
        url: this.url,
        rccode: this.rccode,
        organizationHead: this.organizationHead,
        id: this.id
      };
      axios.post("api/organization-manager/data/update-check", data).then(function (response) {
        _this3.notify = response.data.notify;
        _this3.notify_type = response.data.notify_type;
        _this3.modalType = 'edit';
      })["catch"](function (err) {
        console.log(err);
      });
    },
    update: function update() {
      var _this4 = this;

      this.btnDisabled = true;
      var data = {
        name: this.name,
        type: this.type,
        url: this.url,
        rccode: this.rccode,
        organizationHead: this.organizationHead,
        id: this.id
      };
      axios.post("api/organization-manager/data/update", data).then(function (response) {
        console.log(response.data);
        _this4.inputModalSt = !_this4.inputModalSt;

        _this4.loadData();

        _this4.notificationAlert(response);
      })["catch"](function (err) {
        _this4.notificationAlert(err.response);
      });
    },
    deleteOrganization: function deleteOrganization(Deldata) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var params;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this5.btnDisabled = true;
                params = {
                  id: Deldata.id
                };
                axios["delete"]("/api/organization-manager/data/delete", {
                  params: params
                }).then(function (response) {
                  var index = _this5.organizations.findIndex(function (dcu) {
                    return dcu.id === Deldata.id;
                  });

                  _this5.organizations.splice(index, 1);

                  _this5.notificationAlert(response);
                })["catch"](function (err) {
                  _this5.notificationAlert(err.response);
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    fetchUserList: function fetchUserList(head_type) {
      var _this6 = this;

      var params = {
        head: head_type
      };
      axios.get("api/user-list/data/list", {
        params: params
      }).then(function (response) {
        _this6.users = response.data.users;
      })["catch"](function (err) {
        _this6.notificationAlert(err.response);
      });
    },
    fetchRcCodes: function fetchRcCodes() {
      var _this7 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_RC_CODE)).then(function (response) {
        _this7.rcCodes = response.data.items;
      })["catch"](function (err) {
        _this7.notificationAlert(err.response);
      });
    },
    fetchOrgTypes: function fetchOrgTypes() {
      var _this8 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_ORG_TYPE)).then(function (response) {
        _this8.orgTypes = response.data.items;
      })["catch"](function (err) {
        _this8.notificationAlert(err.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=template&id=057f890f&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=template&id=057f890f& ***!
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
                    search: "",
                    pagination: "",
                    stripe: "",
                    data: _vm.organizations
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
                              _c("vs-td", { attrs: { data: tr.type } }, [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(tr.type) +
                                    "\n                            "
                                )
                              ]),
                              _vm._v(" "),
                              _c("vs-td", { attrs: { data: tr.rccode } }, [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(tr.rccode) +
                                    "\n                            "
                                )
                              ]),
                              _vm._v(" "),
                              _c("vs-td", { attrs: { data: tr.org_head } }, [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(tr.org_head) +
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
                                          return _vm.inputModal("check", tr)
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
                                            _vm.deleteOrganization,
                                            "Delete " + tr.name
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
                      _c("vs-th", { attrs: { "sort-key": "name" } }, [
                        _vm._v("Name")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Type")]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "rccode" } }, [
                        _vm._v("RC Code")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Organization Head")]),
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
                { staticClass: "px-2" },
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
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.name,
                      name: "name",
                      altName: "name"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "flex-auto pt-3 overflow-hidden" },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "Type",
                            label: "Type",
                            autocomplete: ""
                          },
                          model: {
                            value: _vm.type,
                            callback: function($$v) {
                              _vm.type = $$v
                            },
                            expression: "type"
                          }
                        },
                        _vm._l(_vm.orgTypes, function(item, index) {
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
                      value: _vm.type,
                      name: "type",
                      altName: "Organization Type"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "flex-auto pt-3 overflow-hidden" },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "RC Code",
                            label: "RC Code",
                            autocomplete: ""
                          },
                          model: {
                            value: _vm.rccode,
                            callback: function($$v) {
                              _vm.rccode = $$v
                            },
                            expression: "rccode"
                          }
                        },
                        _vm._l(_vm.rcCodes, function(item, index) {
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
                      value: _vm.rccode,
                      name: "rccode",
                      altName: "rc code"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "flex-auto pt-3 overflow-hidden" },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "Organization Head",
                            label: "Organization Head",
                            autocomplete: ""
                          },
                          on: { input: _vm.resetCheck },
                          model: {
                            value: _vm.organizationHead,
                            callback: function($$v) {
                              _vm.organizationHead = $$v
                            },
                            expression: "organizationHead"
                          }
                        },
                        _vm._l(_vm.users, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.id, text: item.full_name }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c("p", { class: _vm.notify_type }, [
                    _vm._v(_vm._s(_vm.notify))
                  ]),
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
                      : _vm.modalType == "check"
                      ? _c(
                          "div",
                          { staticClass: "pt-1", attrs: { align: "right" } },
                          [
                            _c(
                              "vs-button",
                              {
                                attrs: { disabled: _vm.btnDisabled },
                                on: { click: _vm.updateCheck }
                              },
                              [_vm._v("Check")]
                            )
                          ],
                          1
                        )
                      : _vm.modalType == "edit"
                      ? _c(
                          "div",
                          { staticClass: "pt-1", attrs: { align: "right" } },
                          [
                            _c(
                              "vs-button",
                              {
                                attrs: { disabled: _vm.btnDisabled },
                                on: { click: _vm.update }
                              },
                              [_vm._v("Update")]
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ])
                ],
                1
              )
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

/***/ "./resources/js/src/views/app/masterdata/OrganizationManager.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/OrganizationManager.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrganizationManager_vue_vue_type_template_id_057f890f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrganizationManager.vue?vue&type=template&id=057f890f& */ "./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=template&id=057f890f&");
/* harmony import */ var _OrganizationManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrganizationManager.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrganizationManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrganizationManager_vue_vue_type_template_id_057f890f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrganizationManager_vue_vue_type_template_id_057f890f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/masterdata/OrganizationManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganizationManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OrganizationManager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganizationManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=template&id=057f890f&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=template&id=057f890f& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganizationManager_vue_vue_type_template_id_057f890f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OrganizationManager.vue?vue&type=template&id=057f890f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/OrganizationManager.vue?vue&type=template&id=057f890f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganizationManager_vue_vue_type_template_id_057f890f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganizationManager_vue_vue_type_template_id_057f890f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);