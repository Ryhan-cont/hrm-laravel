(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[48],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ModuleManager.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/ModuleManager.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      errorData: {},
      name: '',
      apiname: '',
      url: '',
      id: '',
      icon: '',
      is_visible: null,
      is_active: null,
      site_active: null,
      disable_note: '',
      remark: '',
      moduleGroupData: ['xxx', 'yyy'],
      moduleGroup: null,
      subpermissionTitle: '',
      subpermissionName: '',
      subpermissions: [],
      defaultSubpermissions: [{
        name: 'create',
        title: 'Create',
        status: false
      }, {
        name: 'update',
        title: 'Update',
        status: false
      }, {
        name: 'delete',
        title: 'Delete',
        status: false
      }],
      type: 'Feature',
      moduleType: ['Feature', 'Dev', 'General'],
      typeId: {
        Feature: '01',
        Dev: '02',
        General: '03'
      },
      typeDecode: {
        '01': 'Feature',
        '02': 'Dev',
        '03': 'General'
      }
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var req, moduleData, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('/api/module/data');

              case 3:
                req = _context.sent;
                moduleData = req.data;

                for (i = 0; moduleData.length > i; i++) {
                  moduleData[i].filteredView = true;
                }

                _this.moduleData = moduleData;
                console.log(_this.moduleData);
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                _this.notificationAlert(_context.t0.response);

                console.log(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }))();
    },
    inputModal: function inputModal(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.inputModalSt = !this.inputModalSt;
      this.modalType = type;
      this.subpermissionName = '';
      this.addSubPermission = false;

      if (type == 'new') {
        this.modalTitle = 'Add new module';
        this.name = '';
        this.apiname = '';
        this.url = '';
        this.is_visible = true;
        this.is_active = true;
        this.site_active = true;
        this.icon = '';
        this.disable_note = '';
        this.remark = '';
        this.type = 'Feature';
        this.moduleGroup = null;
        this.subpermissions = this.defaultSubpermissions.map(function (_arrayElement) {
          return Object.assign({}, _arrayElement);
        });
        this.errorData = {};
      } else if (type == 'edit') {
        var defaultSubpermissions = this.defaultSubpermissions.map(function (_arrayElement) {
          return Object.assign({}, _arrayElement);
        });
        var oldSubPermissions = {};
        var customSubpermissions = [];

        for (var i = 0; data.subpermissions.length > i; i++) {
          var permissionName = data.subpermissions[i].name;

          if (permissionName == 'view' || permissionName == 'create' || permissionName == 'update' || permissionName == 'delete') {
            oldSubPermissions[permissionName] = data.subpermissions[i];
          } else {
            customSubpermissions.push(data.subpermissions[i]);
          }
        }

        var newSubpermissions = [];

        for (var i = 0; defaultSubpermissions.length > i; i++) {
          if (oldSubPermissions[defaultSubpermissions[i].name]) {
            newSubpermissions.push(oldSubPermissions[defaultSubpermissions[i].name]);
          } else {
            newSubpermissions.push(defaultSubpermissions[i]);
          }
        }

        for (var i = 0; customSubpermissions.length > i; i++) {
          newSubpermissions.push(customSubpermissions[i]);
        }

        this.modalTitle = 'Edit module';
        this.name = data.name;
        this.apiname = data.apiname;
        this.url = data.url;
        this.is_visible = data.is_visible;
        this.is_active = data.is_active;
        this.site_active = data.site_active;
        this.icon = data.icon;
        this.disable_note = data.disable_note;
        this.remark = data.remark;
        this.id = data.id;
        this.type = this.typeDecode[data.type];
        this.moduleGroup = data.module_group;
        this.subpermissions = newSubpermissions;
        this.errorData = {};
      }
    },
    createModule: function createModule() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.btnDisabled = true;
                _this2.errorData = {};
                _context2.prev = 2;
                data = {
                  name: _this2.name,
                  apiname: _this2.apiname,
                  url: _this2.url,
                  is_visible: _this2.is_visible,
                  is_active: _this2.is_active,
                  site_active: _this2.site_active,
                  icon: _this2.icon,
                  disable_note: _this2.disable_note,
                  remark: _this2.remark,
                  type: _this2.typeId[_this2.type],
                  module_group: _this2.moduleGroup,
                  subpermissions: _this2.cleanSubpermissions(_this2.subpermissions)
                };
                _context2.next = 6;
                return axios.post('/api/module/create', data);

              case 6:
                req = _context2.sent;

                if (req) {
                  _this2.inputModalSt = false;

                  _this2.notificationAlert(req);

                  _this2.loadData();
                }

                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);
                _this2.errorData = _context2.t0.response.data.errors;

                _this2.notificationAlert(_context2.t0.response);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 10]]);
      }))();
    },
    editModule: function editModule() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.btnDisabled = true;
                _this3.errorData = {};
                _context3.prev = 2;
                data = {
                  name: _this3.name,
                  apiname: _this3.apiname,
                  url: _this3.url,
                  is_visible: _this3.is_visible,
                  is_active: _this3.is_active,
                  site_active: _this3.site_active,
                  icon: _this3.icon,
                  disable_note: _this3.disable_note,
                  remark: _this3.remark,
                  id: _this3.id,
                  type: _this3.typeId[_this3.type],
                  module_group: _this3.moduleGroup,
                  subpermissions: _this3.cleanSubpermissions(_this3.subpermissions)
                };
                _context3.next = 6;
                return axios.post('/api/module/update', data);

              case 6:
                req = _context3.sent;

                if (req) {
                  _this3.inputModalSt = false;

                  _this3.notificationAlert(req);

                  _this3.loadData();
                }

                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);

                _this3.notificationAlert(_context3.t0.response);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 10]]);
      }))();
    },
    cleanSubpermissions: function cleanSubpermissions(data) {
      var result = [];

      for (var i = 0; data.length > i; i++) {
        if (data[i].status == true) {
          result.push(data[i]);
        }
      }

      return result;
    },
    addSubPermissions: function addSubPermissions() {
      if (this.subpermissionName != null && this.subpermissionTitle != null) {
        var subArr = {
          name: this.subpermissionName,
          title: this.subpermissionTitle,
          status: true
        };
        this.subpermissions.push(subArr);
        this.subpermissionName = null;
        this.subpermissionTitle = null;
      }
    },
    deleteData: function deleteData(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this module?',
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
                return axios.post('/api/module/delete', data);

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ModuleManager.vue?vue&type=template&id=738884f9&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/ModuleManager.vue?vue&type=template&id=738884f9& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
  return _c("vx-card", { attrs: { title: "Module Manager" } }, [
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
                  search: "",
                  pagination: "",
                  stripe: "",
                  data: _vm.moduleData
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
                                "\n                            " +
                                  _vm._s(tr.name) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.apiname } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.apiname) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.url } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.url) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.icon } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.icon) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.is_visible } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.is_visible) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.is_active } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.is_active) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.site_active } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.site_active) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.remark } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.remark) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.disable_note } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.disable_note) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.type } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.typeDecode[tr.type]) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.type } }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(tr.module_group) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "vs-td",
                              { attrs: { data: tr.subpermissions } },
                              [
                                _c(
                                  "div",
                                  { staticClass: "flex flex-wrap" },
                                  _vm._l(tr.subpermissions, function(
                                    item,
                                    index
                                  ) {
                                    return _c(
                                      "div",
                                      {
                                        key: index,
                                        staticClass:
                                          "m-1 px-2 rounded-lg bg-gray-300"
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(item.title) +
                                            "\n                                "
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              ]
                            ),
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
                    _c("vs-th", [_vm._v("Name")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("API Name")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Url")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Icon")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Visible")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Active")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Active in site")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Remark")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Disable Note")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Type")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Module Group")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Subpermissions")]),
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
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "API Name" },
                    model: {
                      value: _vm.apiname,
                      callback: function($$v) {
                        _vm.apiname = $$v
                      },
                      expression: "apiname"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.apiname
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.apiname[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "URL" },
                    model: {
                      value: _vm.url,
                      callback: function($$v) {
                        _vm.url = $$v
                      },
                      expression: "url"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.url
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.url[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-3",
                    attrs: { "label-placeholder": "Icon" },
                    model: {
                      value: _vm.icon,
                      callback: function($$v) {
                        _vm.icon = $$v
                      },
                      expression: "icon"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-2" },
                    [
                      _c("search-box", {
                        attrs: {
                          label: "Module Group",
                          items: _vm.moduleGroupData
                        },
                        model: {
                          value: _vm.moduleGroup,
                          callback: function($$v) {
                            _vm.moduleGroup = $$v
                          },
                          expression: "moduleGroup"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "flex pt-5" }, [
                    _c(
                      "div",
                      { staticClass: "flex-auto pr-1" },
                      [
                        _c(
                          "vs-checkbox",
                          {
                            model: {
                              value: _vm.is_visible,
                              callback: function($$v) {
                                _vm.is_visible = $$v
                              },
                              expression: "is_visible"
                            }
                          },
                          [_vm._v("Visible")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "flex-auto pl-1" },
                      [
                        _c(
                          "vs-checkbox",
                          {
                            model: {
                              value: _vm.is_active,
                              callback: function($$v) {
                                _vm.is_active = $$v
                              },
                              expression: "is_active"
                            }
                          },
                          [_vm._v("Active")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "flex-auto pl-1" },
                      [
                        _c(
                          "vs-checkbox",
                          {
                            model: {
                              value: _vm.site_active,
                              callback: function($$v) {
                                _vm.site_active = $$v
                              },
                              expression: "site_active"
                            }
                          },
                          [_vm._v("Active in site")]
                        )
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "pt-3 w-full",
                    attrs: { "label-placeholder": "Remark" },
                    model: {
                      value: _vm.remark,
                      callback: function($$v) {
                        _vm.remark = $$v
                      },
                      expression: "remark"
                    }
                  }),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "pt-3 w-full",
                    attrs: { "label-placeholder": "Disable Note" },
                    model: {
                      value: _vm.disable_note,
                      callback: function($$v) {
                        _vm.disable_note = $$v
                      },
                      expression: "disable_note"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex-auto pt-3" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: { placeholder: "Type", label: "Type" },
                      model: {
                        value: _vm.type,
                        callback: function($$v) {
                          _vm.type = $$v
                        },
                        expression: "type"
                      }
                    },
                    _vm._l(_vm.moduleType, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item, text: item }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "pt-3" }, [
                _c("div", { staticClass: "font-bold pt-3 pr-3" }, [
                  _vm._v("Sub-Permissions:")
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  _vm._l(_vm.subpermissions, function(item, index) {
                    return _c(
                      "div",
                      { key: index, staticClass: "pt-3" },
                      [
                        _c(
                          "vs-checkbox",
                          {
                            attrs: { size: "small" },
                            model: {
                              value: item.status,
                              callback: function($$v) {
                                _vm.$set(item, "status", $$v)
                              },
                              expression: "item.status"
                            }
                          },
                          [_vm._v(_vm._s(item.title))]
                        )
                      ],
                      1
                    )
                  }),
                  0
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "flex pt-3" }, [
                _c(
                  "div",
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: { size: "small" },
                        on: {
                          click: function($event) {
                            return _vm.addSubPermissions()
                          }
                        }
                      },
                      [_vm._v("Add custom permissions")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "px-1 flex-auto" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      attrs: { placeholder: "Title", size: "small" },
                      model: {
                        value: _vm.subpermissionTitle,
                        callback: function($$v) {
                          _vm.subpermissionTitle = $$v
                        },
                        expression: "subpermissionTitle"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "px-1 flex-auto" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      attrs: { placeholder: "Name", size: "small" },
                      model: {
                        value: _vm.subpermissionName,
                        callback: function($$v) {
                          _vm.subpermissionName = $$v
                        },
                        expression: "subpermissionName"
                      }
                    })
                  ],
                  1
                )
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
                                return _vm.createModule()
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
                                return _vm.editModule()
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

/***/ "./resources/js/src/views/app/ModuleManager.vue":
/*!******************************************************!*\
  !*** ./resources/js/src/views/app/ModuleManager.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModuleManager_vue_vue_type_template_id_738884f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModuleManager.vue?vue&type=template&id=738884f9& */ "./resources/js/src/views/app/ModuleManager.vue?vue&type=template&id=738884f9&");
/* harmony import */ var _ModuleManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModuleManager.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/ModuleManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModuleManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModuleManager_vue_vue_type_template_id_738884f9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModuleManager_vue_vue_type_template_id_738884f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/ModuleManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/ModuleManager.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/app/ModuleManager.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModuleManager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ModuleManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/ModuleManager.vue?vue&type=template&id=738884f9&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/app/ModuleManager.vue?vue&type=template&id=738884f9& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleManager_vue_vue_type_template_id_738884f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModuleManager.vue?vue&type=template&id=738884f9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ModuleManager.vue?vue&type=template&id=738884f9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleManager_vue_vue_type_template_id_738884f9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleManager_vue_vue_type_template_id_738884f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);