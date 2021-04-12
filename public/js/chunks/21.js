(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/MenuManager.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_1__);


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
  components: {
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      optionGroupName: 'swapGroup',
      menuGroupName: 'swapGroup',
      allBtnHistry: [],
      addNewMenu: false,
      addNewMenuValidation: [],
      newMenuName: '',
      name: '',
      allBtnData: [],
      allBtn: [],
      filteredMenu: [],
      listData: {},
      selectedMenu: null,
      errorData: []
    };
  },
  mounted: function mounted() {
    this.loadList(); // console.log(this)
  },
  methods: {
    chkData: function chkData() {//console.log(this.filteredMenu)
    },
    loadList: function loadList() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('api/menu/data/all');

              case 3:
                req = _context.sent;
                //console.log(req);
                _this.listData = req.data;
                _this.allBtnData = req.data.buttons;
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                _this.notificationAlert(_context.t0.response);

                console.log(_context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    addGroup: function addGroup() {
      if (this.selectedMenu != null) {
        var defGroup = {
          name: '',
          icon: '',
          rowtype: 'group',
          list: []
        };
        this.filteredMenu.push(defGroup);
      }
    },
    addSubGroup: function addSubGroup(index) {
      var defSubGroup = {
        name: '',
        icon: '',
        rowtype: 'subgroup',
        list: []
      };
      this.filteredMenu[index].list.push(defSubGroup);
    },
    deleteGroup: function deleteGroup(index) {
      for (var i = 0; this.filteredMenu[index].list.length > i; i++) {
        this.allBtn.push(this.filteredMenu[index].list[i]);
      }

      this.filteredMenu.splice(index, 1);
    },
    deleteSubGroup: function deleteSubGroup(gIndex, bIndex) {
      // console.log(this.filteredMenu[gIndex].list[bIndex].list);
      for (var i = 0; this.filteredMenu[gIndex].list[bIndex].list.length > i; i++) {
        this.allBtn.push(this.filteredMenu[gIndex].list[bIndex].list[i]);
      }

      this.filteredMenu[gIndex].list.splice(bIndex, 1);
    },
    loadMenu: function loadMenu() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req, savedData, idList, i, x, baseList, o, newBtnArr;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.selectedMenu != null)) {
                  _context2.next = 13;
                  break;
                }

                data = {
                  id: _this2.listData.idTracker[_this2.selectedMenu]
                };
                _context2.next = 4;
                return axios.post('/api/menu/data', data);

              case 4:
                req = _context2.sent;
                savedData = req.data;
                idList = [];

                for (i = 0; savedData.length > i; i++) {
                  for (x = 0; savedData[i].list.length > x; x++) {
                    baseList = savedData[i].list[x];

                    if (baseList.rowtype == 'btn') {
                      idList.push(baseList.id);
                    }

                    if (baseList.rowtype == 'subgroup') {
                      for (o = 0; baseList.list.length > o; o++) {
                        idList.push(baseList.list[o].id);
                      }
                    }
                  }
                }

                newBtnArr = []; //console.log(idList);

                for (i = 0; _this2.allBtnData.length > i; i++) {
                  if (idList.indexOf(_this2.allBtnData[i].id) < 0) {
                    newBtnArr.push(_this2.allBtnData[i]);
                  }
                }

                _this2.name = _this2.selectedMenu;
                _this2.allBtn = newBtnArr;
                _this2.filteredMenu = req.data;

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    createMenu: function createMenu() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.btnDisabled = true;
                _context3.prev = 1;
                _this3.addNewMenuValidation = [];
                data = {
                  name: _this3.newMenuName
                };
                _context3.next = 6;
                return axios.post('/api/menu/create', data);

              case 6:
                req = _context3.sent;

                if (req) {
                  _this3.addNewMenu = false;

                  _this3.notificationAlert(req);

                  _this3.loadList();
                }

                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                _this3.addNewMenuValidation = _context3.t0.response.data.errors;

                _this3.notificationAlert(_context3.t0.response);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }))();
    },
    updateMenu: function updateMenu() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.btnDisabled = true;
                _context4.prev = 1;
                data = {
                  name: _this4.name,
                  id: _this4.listData.idTracker[_this4.selectedMenu],
                  data: _this4.filteredMenu
                };
                _context4.next = 5;
                return axios.post('api/menu/update', data);

              case 5:
                req = _context4.sent;

                if (req) {
                  _this4.notificationAlert(req);
                }

                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);

                _this4.notificationAlert(_context4.t0.response);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
      }))();
    },
    deleteMenu: function deleteMenu(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete "' + this.selectedMenu + '" menu?',
        acceptText: 'ok',
        accept: this.deleteMenuPreceed,
        parameters: deldata
      });
    },
    deleteMenuPreceed: function deleteMenuPreceed() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                data = {
                  id: _this5.listData.idTracker[_this5.selectedMenu]
                };
                _context5.next = 4;
                return axios.post('api/menu/delete', data);

              case 4:
                req = _context5.sent;

                if (req) {
                  _this5.notificationAlert(req);

                  _this5.selectedMenu = null;
                  _this5.allBtn = [];
                  _this5.filteredMenu = [];

                  _this5.loadList();
                }

                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);

                _this5.notificationAlert(_context5.t0.response);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 8]]);
      }))();
    }
  },
  watch: {}
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".item[data-v-a763bfb4]{\n  display: block;\n  width: auto;\n  height: auto;\n}\n.list-group-item[data-v-a763bfb4]{\n  padding: 0px;\n  border: 0px;\n}\n.draggablejs-item-css[data-v-a763bfb4]{\n  padding: 10px;\n  margin: 2px;\n  border: 1px solid rgb(238, 238, 238);\n  background-color: rgb(247, 247, 247);\n}\n.parent-dragarea[data-v-a763bfb4]{\n  overflow-y: auto;\n}\n.child-dragarea[data-v-a763bfb4]{\n  margin-left: 20px;\n}\n.child-child-dragarea[data-v-a763bfb4]{\n  margin-left: 20px;\n}\n.menu-widget-title-cont[data-v-a763bfb4]{\n  background-color:#ededed;\n  border-bottom:1px solid rgb(226, 226, 226);\n  font-weight: bold;\n  padding:10px;\n  height: 50px;\n}\n.modal-backdrop[data-v-a763bfb4] {\n  opacity:0.5 !important;\n  background-color: coral;\n}\n.options li[data-v-a763bfb4]{\n  padding: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true& ***!
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
  return _c("vx-card", { attrs: { title: "Menu Manager" } }, [
    _c(
      "div",
      { staticClass: "content" },
      [
        _c("div", { staticClass: "flex" }, [
          _c(
            "div",
            { staticClass: "flex-auto", staticStyle: { "max-width": "300px" } },
            [
              _c(
                "vs-select",
                {
                  staticClass: "w-full",
                  attrs: { placeholder: "Select", label: "Select Menu" },
                  on: {
                    input: function($event) {
                      return _vm.loadMenu()
                    }
                  },
                  model: {
                    value: _vm.selectedMenu,
                    callback: function($$v) {
                      _vm.selectedMenu = $$v
                    },
                    expression: "selectedMenu"
                  }
                },
                _vm._l(_vm.listData.menus, function(item, index) {
                  return _c("vs-select-item", {
                    key: index,
                    attrs: { value: item.name, text: item.name }
                  })
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "flex-auto" }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "flex-auto ml-6",
              staticStyle: { "max-width": "300px" }
            },
            [
              _c("div", { staticClass: "flex" }, [
                _c("div", { staticClass: "flex-auto" }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "px-1" },
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: { size: "small", variant: "success" },
                        on: {
                          click: function($event) {
                            _vm.addNewMenu = true
                            _vm.newMenuName = ""
                            _vm.newMenuTitle = ""
                          }
                        }
                      },
                      [_vm._v("Add new")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.selectedMenu != null
                  ? _c(
                      "div",
                      { staticClass: "px-1" },
                      [
                        _c(
                          "vs-button",
                          {
                            attrs: { size: "small", color: "danger" },
                            on: {
                              click: function($event) {
                                return _vm.deleteMenu()
                              }
                            }
                          },
                          [_vm._v("Delete")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.selectedMenu != null
                  ? _c(
                      "div",
                      { staticClass: "px-1" },
                      [
                        _c(
                          "vs-button",
                          {
                            attrs: {
                              size: "small",
                              disabled: _vm.btnDisabled,
                              color: "success"
                            },
                            on: {
                              click: function($event) {
                                return _vm.updateMenu()
                              }
                            }
                          },
                          [_vm._v("Save")]
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.selectedMenu
                ? _c(
                    "div",
                    { staticClass: "pt-2" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: { placeholder: "Menu Name", size: "small" },
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
                        ? _c(
                            "div",
                            { staticClass: "py-1 text-sm text-red-400" },
                            [_vm._v(_vm._s(_vm.errorData.name[0]))]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                : _vm._e()
            ]
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "mt-6 flex",
            staticStyle: { border: "1px solid rgb(0,0,0,.1)" }
          },
          [
            _c("div", { staticStyle: { width: "50%" } }, [
              _c(
                "div",
                {
                  staticClass: "menu-widget-title-cont",
                  on: {
                    click: function($event) {
                      return _vm.loadList()
                    }
                  }
                },
                [_vm._v("Options")]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "p-2" },
                [
                  _c(
                    "draggable",
                    {
                      staticClass: "list-group parent-dragarea",
                      staticStyle: { height: "500px" },
                      attrs: {
                        list: _vm.allBtn,
                        draggable: ".item",
                        group: _vm.optionGroupName
                      }
                    },
                    _vm._l(_vm.allBtn, function(element) {
                      return _c(
                        "div",
                        {
                          key: element.name,
                          staticClass: "list-group-item item",
                          on: {
                            mousedown: function($event) {
                              _vm.optionGroupName = "swapGroup"
                            }
                          }
                        },
                        [
                          _c("div", { staticClass: "draggablejs-item-css" }, [
                            _vm._v(_vm._s(element.name))
                          ])
                        ]
                      )
                    }),
                    0
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticStyle: { width: "50%" } }, [
              _c(
                "div",
                {
                  staticClass: "menu-widget-title-cont flex",
                  staticStyle: { "border-left": "1px solid rgb(226, 226, 226)" }
                },
                [
                  _c("div", { staticClass: "flex-auto" }, [_vm._v("Menu")]),
                  _vm._v(" "),
                  _vm.selectedMenu != null
                    ? _c(
                        "div",
                        { staticClass: "text-small" },
                        [
                          _c(
                            "vs-button",
                            {
                              attrs: {
                                size: "small",
                                "icon-pack": "feather",
                                icon: "icon-plus-square"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.addGroup()
                                }
                              }
                            },
                            [_vm._v("Add Group")]
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "p-2",
                  staticStyle: {
                    "border-left": "1px solid rgb(226, 226, 226)",
                    height: "500px"
                  }
                },
                [
                  _c(
                    "draggable",
                    {
                      staticClass: "parent-dragarea",
                      staticStyle: { height: "500px" },
                      attrs: {
                        list: _vm.filteredMenu,
                        draggable: ".groupItem",
                        group: "optionGroup"
                      }
                    },
                    _vm._l(_vm.filteredMenu, function(groupItem, groupindex) {
                      return _c(
                        "div",
                        { key: groupindex, staticClass: "groupItem" },
                        [
                          _c(
                            "div",
                            { staticClass: "flex p-2 mb-1 bg-gray-200" },
                            [
                              _c(
                                "div",
                                { staticClass: "flex-auto" },
                                [
                                  _c("vs-input", {
                                    staticClass: "w-full",
                                    attrs: {
                                      placeholder: "Group name",
                                      size: "small"
                                    },
                                    model: {
                                      value: groupItem.name,
                                      callback: function($$v) {
                                        _vm.$set(groupItem, "name", $$v)
                                      },
                                      expression: "groupItem.name"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "flex-auto" },
                                [
                                  _c("vs-input", {
                                    staticClass: "w-full",
                                    attrs: {
                                      placeholder: "Group icon",
                                      size: "small"
                                    },
                                    model: {
                                      value: groupItem.icon,
                                      callback: function($$v) {
                                        _vm.$set(groupItem, "icon", $$v)
                                      },
                                      expression: "groupItem.icon"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "ml-3" },
                                [
                                  _c("vs-button", {
                                    attrs: {
                                      size: "small",
                                      "icon-pack": "feather",
                                      icon: "icon-plus-square"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.addSubGroup(groupindex)
                                      }
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "ml-1" },
                                [
                                  _c("vs-button", {
                                    attrs: {
                                      size: "small",
                                      "icon-pack": "feather",
                                      icon: "icon-x-square",
                                      color: "danger"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteGroup(groupindex)
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c(
                                "draggable",
                                {
                                  staticClass: "ml-6",
                                  staticStyle: { "min-height": "30px" },
                                  attrs: {
                                    list: groupItem.list,
                                    draggable: ".item",
                                    group: _vm.menuGroupName
                                  }
                                },
                                _vm._l(groupItem.list, function(
                                  baseItem,
                                  baseIndex
                                ) {
                                  return _c(
                                    "div",
                                    {
                                      key: baseIndex,
                                      staticClass: "list-group-item item"
                                    },
                                    [
                                      baseItem.rowtype == "btn"
                                        ? _c(
                                            "div",
                                            {
                                              staticClass:
                                                "draggablejs-item-css",
                                              on: {
                                                mousedown: function($event) {
                                                  _vm.optionGroupName =
                                                    "swapGroup"
                                                }
                                              }
                                            },
                                            [_vm._v(_vm._s(baseItem.name))]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      baseItem.rowtype == "subgroup"
                                        ? _c("div", {}, [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "flex p-2 bg-gray-200",
                                                staticStyle: {
                                                  margin: "4px 2px"
                                                },
                                                on: {
                                                  mousedown: function($event) {
                                                    _vm.optionGroupName =
                                                      "independent"
                                                  },
                                                  mouseup: function($event) {
                                                    _vm.optionGroupName =
                                                      "swapGroup"
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "flex-auto text-bold"
                                                  },
                                                  [
                                                    _c("vs-input", {
                                                      staticClass: "w-full",
                                                      attrs: {
                                                        placeholder:
                                                          "Sub group name",
                                                        size: "small"
                                                      },
                                                      model: {
                                                        value: baseItem.name,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            baseItem,
                                                            "name",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "baseItem.name"
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
                                                      "flex-auto text-bold"
                                                  },
                                                  [
                                                    _c("vs-input", {
                                                      staticClass: "w-full",
                                                      attrs: {
                                                        placeholder:
                                                          "Sub group icon",
                                                        size: "small"
                                                      },
                                                      model: {
                                                        value: baseItem.icon,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            baseItem,
                                                            "icon",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "baseItem.icon"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "ml-3" },
                                                  [
                                                    _c("vs-button", {
                                                      attrs: {
                                                        size: "small",
                                                        color: "danger",
                                                        "icon-pack": "feather",
                                                        icon: "icon-x-square"
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.deleteSubGroup(
                                                            groupindex,
                                                            baseIndex
                                                          )
                                                        }
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              [
                                                _c(
                                                  "draggable",
                                                  {
                                                    staticClass: "ml-8",
                                                    staticStyle: {
                                                      "min-height": "30px"
                                                    },
                                                    attrs: {
                                                      list: baseItem.list,
                                                      draggable: ".item",
                                                      group: _vm.menuGroupName
                                                    }
                                                  },
                                                  _vm._l(
                                                    baseItem.list,
                                                    function(
                                                      subitem,
                                                      subIndex
                                                    ) {
                                                      return _c(
                                                        "div",
                                                        {
                                                          key: subIndex,
                                                          staticClass:
                                                            "list-group-item item"
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "draggablejs-item-css",
                                                              on: {
                                                                mousedown: function(
                                                                  $event
                                                                ) {
                                                                  _vm.optionGroupName =
                                                                    "swapGroup"
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  subitem.name
                                                                )
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      )
                                                    }
                                                  ),
                                                  0
                                                )
                                              ],
                                              1
                                            )
                                          ])
                                        : _vm._e()
                                    ]
                                  )
                                }),
                                0
                              )
                            ],
                            1
                          )
                        ]
                      )
                    }),
                    0
                  )
                ],
                1
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "vs-popup",
          {
            attrs: { title: "Add new menu", active: _vm.addNewMenu },
            on: {
              "update:active": function($event) {
                _vm.addNewMenu = $event
              }
            }
          },
          [
            _c(
              "div",
              [
                _c("vs-input", {
                  staticClass: "w-full pt-3",
                  attrs: { "label-placeholder": "Nane" },
                  model: {
                    value: _vm.newMenuName,
                    callback: function($$v) {
                      _vm.newMenuName = $$v
                    },
                    expression: "newMenuName"
                  }
                }),
                _vm._v(" "),
                _vm.addNewMenuValidation.name
                  ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                      _vm._v(_vm._s(_vm.addNewMenuValidation.name[0]))
                    ])
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "mt-4 flex" }, [
              _c("div", { staticClass: "flex-auto" }),
              _vm._v(" "),
              _c(
                "div",
                [
                  _c(
                    "vs-button",
                    {
                      attrs: { variant: "success", disabled: _vm.btnDisabled },
                      on: { click: _vm.createMenu }
                    },
                    [_vm._v("Submit")]
                  )
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

/***/ "./resources/js/src/views/app/MenuManager.vue":
/*!****************************************************!*\
  !*** ./resources/js/src/views/app/MenuManager.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuManager_vue_vue_type_template_id_a763bfb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true& */ "./resources/js/src/views/app/MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true&");
/* harmony import */ var _MenuManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuManager.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/MenuManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _MenuManager_vue_vue_type_style_index_0_id_a763bfb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css& */ "./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MenuManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MenuManager_vue_vue_type_template_id_a763bfb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MenuManager_vue_vue_type_template_id_a763bfb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a763bfb4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/MenuManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/MenuManager.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/views/app/MenuManager.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MenuManager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_style_index_0_id_a763bfb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=style&index=0&id=a763bfb4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_style_index_0_id_a763bfb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_style_index_0_id_a763bfb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_style_index_0_id_a763bfb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_style_index_0_id_a763bfb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/app/MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_template_id_a763bfb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/MenuManager.vue?vue&type=template&id=a763bfb4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_template_id_a763bfb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuManager_vue_vue_type_template_id_a763bfb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);