(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/Category.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/Category.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      addNewData: false,
      name: null,
      modalName: null,
      saveType: null,
      dataParent: null,
      categoryData: [],
      actionBoxWidth: '175px'
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  methods: {
    chk: function chk() {
      this.catagoryManage('addCat');
      console.log(this.categoryData);
    },
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('/api/category-manager/data');

              case 3:
                req = _context.sent;
                _this.categoryData = req.data.categoryData, console.log('cat', _this.categoryData);
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                _this.notificationAlert(_context.t0.response);

                console.log(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    addData: function addData(type) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (type == 'cat') {
        this.name = null;
        this.resetError();
        this.addNewData = true;
        this.modalName = 'Add Catagory';
        this.saveType = 'cat';
      }

      if (type == 'subCat') {
        this.name = null;
        this.resetError();
        this.addNewData = true;
        this.modalName = 'Add Sub Catagory';
        this.saveType = 'subCat';
        this.dataParent = parent;
      }

      if (type == 'item') {
        this.name = null;
        this.resetError();
        this.addNewData = true;
        this.modalName = 'Add Item';
        this.saveType = 'item';
        this.dataParent = parent;
      }
    },
    catagoryManage: function catagoryManage(type) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var childIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var itemIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var data = {
        name: null,
        children: [],
        editMode: true
      }; //Category

      if (type == 'editCat') {
        this.categoryData[index].editMode = true;
      }

      if (type == 'cancelEditCat') {
        this.categoryData[index].editMode = false;
      } //Sub Category


      if (type == 'editSubCat') {
        this.categoryData[index].children[childIndex].editMode = true;
      }

      if (type == 'cancelEditSubCat') {
        console.log('xxx');
        this.categoryData[index].children[childIndex].editMode = false;
      } //Item


      if (type == 'editItem') {
        this.categoryData[index].children[childIndex].children[itemIndex].editMode = true;
      }

      if (type == 'cancelEditItem') {
        this.categoryData[index].children[childIndex].children[itemIndex].editMode = false;
      }
    },
    createCategory: function createCategory() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.saveType == 'cat') {
                  data = {
                    name: _this2.name,
                    type: 'category'
                  };
                }

                if (_this2.saveType == 'subCat') {
                  data = {
                    name: _this2.name,
                    type: 'subCategory',
                    parent: _this2.dataParent
                  };
                }

                if (_this2.saveType == 'item') {
                  data = {
                    name: _this2.name,
                    type: 'item',
                    parent: _this2.dataParent
                  };
                }

                if (!_this2.validateInput(data)) {
                  _context2.next = 15;
                  break;
                }

                _context2.prev = 4;
                _context2.next = 7;
                return axios.post('/api/category-manager/create', data);

              case 7:
                req = _context2.sent;

                if (req.data == 1) {
                  _this2.addNewData = false;

                  _this2.loadData();
                }

                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](4);

                _this2.notificationAlert(_context2.t0.response);

                console.log(_context2.t0);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 11]]);
      }))();
    },
    editCategory: function editCategory(type, id) {
      var _arguments = arguments,
          _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var index, childIndex, itemIndex, value, data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                index = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : null;
                childIndex = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : null;
                itemIndex = _arguments.length > 4 && _arguments[4] !== undefined ? _arguments[4] : null;

                if (type == 'cat') {
                  value = _this3.categoryData[index].name;
                }

                if (type == 'subCat') {
                  value = _this3.categoryData[index].children[childIndex].name;
                }

                if (type == 'item') {
                  value = _this3.categoryData[index].children[childIndex].children[itemIndex].name;
                }

                data = {
                  name: value,
                  id: id
                };
                _context3.prev = 7;
                _context3.next = 10;
                return axios.post('/api/category-manager/update', data);

              case 10:
                req = _context3.sent;

                if (req.data == 1) {
                  _this3.loadData();
                }

                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](7);

                _this3.notificationAlert(_context3.t0.response);

                console.log(_context3.t0);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[7, 14]]);
      }))();
    },
    deleteData: function deleteData(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this?',
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
                console.log(Deldata);
                _context4.prev = 1;
                data = {
                  id: Deldata
                };
                _context4.next = 5;
                return axios.post('/api/category-manager/delete', data);

              case 5:
                req = _context4.sent;
                console.log(req);

                if (req.data == 1) {
                  _this4.loadData();
                }

                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](1);
                console.log(_context4.t0);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 10]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/Category.vue?vue&type=template&id=93774554&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/Category.vue?vue&type=template&id=93774554& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    "vx-card",
    { attrs: { title: "" } },
    [
      _c(
        "div",
        {},
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
                    attrs: { size: "small" },
                    on: {
                      click: function($event) {
                        return _vm.addData("cat")
                      }
                    }
                  },
                  [_vm._v("Add category")]
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _vm._l(_vm.categoryData, function(item, index) {
            return _c("div", { key: index, staticClass: "pl-2 pb-3 my-4" }, [
              _c("div", [
                _c(
                  "div",
                  {
                    staticClass: "flex pb-2",
                    staticStyle: { "border-bottom": "1px solid #ededed" }
                  },
                  [
                    item.editMode == false
                      ? _c(
                          "div",
                          { staticClass: "flex-auto pt-3 font-bold text-xl" },
                          [_vm._v(_vm._s(item.name))]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    item.editMode == true
                      ? _c(
                          "div",
                          { staticClass: "flex-auto" },
                          [
                            _c("vs-input", {
                              staticClass: "w-full pt-3",
                              attrs: { label: "Catagory", size: "small" },
                              model: {
                                value: item.name,
                                callback: function($$v) {
                                  _vm.$set(item, "name", $$v)
                                },
                                expression: "item.name"
                              }
                            })
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "px-2 flex",
                        style: { width: _vm.actionBoxWidth }
                      },
                      [
                        _c("div", { staticClass: "flex-auto" }),
                        _vm._v(" "),
                        item.editMode == true
                          ? _c(
                              "div",
                              {
                                staticClass: "flex",
                                style: { paddingTop: "2.25rem" }
                              },
                              [
                                _c(
                                  "div",
                                  [
                                    _c(
                                      "vs-button",
                                      {
                                        attrs: { size: "small" },
                                        on: {
                                          click: function($event) {
                                            return _vm.editCategory(
                                              "cat",
                                              item.id,
                                              index
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("Save")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "pl-2" },
                                  [
                                    _c(
                                      "vs-button",
                                      {
                                        attrs: {
                                          size: "small",
                                          color: "danger"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.catagoryManage(
                                              "cancelEditCat",
                                              index
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("Cancel")]
                                    )
                                  ],
                                  1
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        item.editMode == false
                          ? _c("div", { staticClass: "flex pt-3" }, [
                              item.editMode == false
                                ? _c(
                                    "div",
                                    { staticClass: "pl-2" },
                                    [
                                      _c("vs-button", {
                                        attrs: {
                                          size: "small",
                                          "icon-pack": "feather",
                                          icon: "icon-edit"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.catagoryManage(
                                              "editCat",
                                              index
                                            )
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "pl-2" },
                                [
                                  _c("vs-button", {
                                    staticClass: "px-1",
                                    attrs: {
                                      size: "small",
                                      "icon-pack": "feather",
                                      icon: "icon-x",
                                      color: "danger"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteData(item.id)
                                      }
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "pl-2" },
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
                                          return _vm.addData("subCat", item.id)
                                        }
                                      }
                                    },
                                    [_vm._v("Sub")]
                                  )
                                ],
                                1
                              )
                            ])
                          : _vm._e()
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                item.children.length > 0
                  ? _c(
                      "div",
                      _vm._l(item.children, function(child, childIndex) {
                        return _c(
                          "div",
                          { key: childIndex, staticClass: "ml-2 my-2" },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "flex py-2",
                                staticStyle: {
                                  "background-color": "rgb(0,0,0,.08)"
                                }
                              },
                              [
                                child.editMode == false
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "flex-auto flex pt-1 px-2"
                                      },
                                      [_vm._v(_vm._s(child.name))]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                child.editMode == true
                                  ? _c(
                                      "div",
                                      { staticClass: "flex-auto px-2" },
                                      [
                                        _c("vs-input", {
                                          staticClass: "w-full",
                                          attrs: {
                                            size: "small",
                                            label: "Sub Category"
                                          },
                                          model: {
                                            value: child.name,
                                            callback: function($$v) {
                                              _vm.$set(child, "name", $$v)
                                            },
                                            expression: "child.name"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "px-2 flex",
                                    style: { width: _vm.actionBoxWidth }
                                  },
                                  [
                                    _c("div", { staticClass: "flex-auto" }),
                                    _vm._v(" "),
                                    child.editMode == true
                                      ? _c(
                                          "div",
                                          { staticClass: "flex pt-6" },
                                          [
                                            _c(
                                              "div",
                                              [
                                                _c(
                                                  "vs-button",
                                                  {
                                                    attrs: { size: "small" },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.editCategory(
                                                          "subCat",
                                                          child.id,
                                                          index,
                                                          childIndex
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Save")]
                                                )
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "pl-2" },
                                              [
                                                _c(
                                                  "vs-button",
                                                  {
                                                    attrs: {
                                                      size: "small",
                                                      color: "danger"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.catagoryManage(
                                                          "cancelEditSubCat",
                                                          index,
                                                          childIndex
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Cancel")]
                                                )
                                              ],
                                              1
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    child.editMode == false
                                      ? _c("div", { staticClass: "flex" }, [
                                          _c(
                                            "div",
                                            { staticClass: "pl-2" },
                                            [
                                              _c("vs-button", {
                                                attrs: {
                                                  size: "small",
                                                  "icon-pack": "feather",
                                                  icon: "icon-edit"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.catagoryManage(
                                                      "editSubCat",
                                                      index,
                                                      childIndex
                                                    )
                                                  }
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "pl-2" },
                                            [
                                              _c("vs-button", {
                                                attrs: {
                                                  size: "small",
                                                  "icon-pack": "feather",
                                                  icon: "icon-x",
                                                  color: "danger"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.deleteData(
                                                      child.id
                                                    )
                                                  }
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "pl-2" },
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
                                                      return _vm.addData(
                                                        "subCat",
                                                        child.id
                                                      )
                                                    }
                                                  }
                                                },
                                                [_vm._v("Item")]
                                              )
                                            ],
                                            1
                                          )
                                        ])
                                      : _vm._e()
                                  ]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            child.children.length > 0
                              ? _c(
                                  "div",
                                  { staticClass: "pl-6" },
                                  _vm._l(child.children, function(
                                    subChild,
                                    subChildIndex
                                  ) {
                                    return _c(
                                      "div",
                                      {
                                        key: subChildIndex,
                                        staticClass: "my-1 py-1",
                                        style:
                                          subChildIndex % 2
                                            ? "background-color:rgb(0,0,0,.04)"
                                            : "background-color:rgb(0,0,0,.02)"
                                      },
                                      [
                                        _c("div", { staticClass: "flex" }, [
                                          subChild.editMode == false
                                            ? _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "flex-auto flex px-2 py-1"
                                                },
                                                [_vm._v(_vm._s(subChild.name))]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          subChild.editMode == true
                                            ? _c(
                                                "div",
                                                {
                                                  staticClass: "flex-auto px-2"
                                                },
                                                [
                                                  _c("vs-input", {
                                                    staticClass: "w-full",
                                                    attrs: {
                                                      size: "small",
                                                      label: "Item"
                                                    },
                                                    model: {
                                                      value: subChild.name,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          subChild,
                                                          "name",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "subChild.name"
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "px-2 flex",
                                              style: {
                                                width: _vm.actionBoxWidth
                                              }
                                            },
                                            [
                                              _c("div", {
                                                staticClass: "flex-auto"
                                              }),
                                              _vm._v(" "),
                                              subChild.editMode == true
                                                ? _c(
                                                    "div",
                                                    {
                                                      staticClass: "flex pt-6"
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        [
                                                          _c(
                                                            "vs-button",
                                                            {
                                                              attrs: {
                                                                size: "small"
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.editCategory(
                                                                    "item",
                                                                    subChild.id,
                                                                    index,
                                                                    childIndex,
                                                                    subChildIndex
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [_vm._v("Save")]
                                                          )
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        { staticClass: "pl-2" },
                                                        [
                                                          _c(
                                                            "vs-button",
                                                            {
                                                              attrs: {
                                                                size: "small",
                                                                color: "danger"
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.catagoryManage(
                                                                    "cancelEditItem",
                                                                    index,
                                                                    childIndex,
                                                                    subChildIndex
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [_vm._v("Cancel")]
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              subChild.editMode == false
                                                ? _c(
                                                    "div",
                                                    { staticClass: "flex" },
                                                    [
                                                      _c(
                                                        "div",
                                                        { staticClass: "pl-2" },
                                                        [
                                                          _c("vs-button", {
                                                            attrs: {
                                                              size: "small",
                                                              "icon-pack":
                                                                "feather",
                                                              icon: "icon-edit"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.catagoryManage(
                                                                  "editItem",
                                                                  index,
                                                                  childIndex,
                                                                  subChildIndex
                                                                )
                                                              }
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        { staticClass: "pl-2" },
                                                        [
                                                          _c("vs-button", {
                                                            attrs: {
                                                              size: "small",
                                                              "icon-pack":
                                                                "feather",
                                                              icon: "icon-x",
                                                              color: "danger"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.deleteData(
                                                                  subChild.id
                                                                )
                                                              }
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  )
                                                : _vm._e()
                                            ]
                                          )
                                        ])
                                      ]
                                    )
                                  }),
                                  0
                                )
                              : _vm._e()
                          ]
                        )
                      }),
                      0
                    )
                  : _vm._e()
              ])
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c("div"),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: { title: _vm.modalName, active: _vm.addNewData },
          on: {
            "update:active": function($event) {
              _vm.addNewData = $event
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
                  altName: "category name"
                }
              })
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
                    attrs: { variant: "success" },
                    on: {
                      click: function($event) {
                        return _vm.createCategory()
                      }
                    }
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/Category.vue":
/*!*************************************************!*\
  !*** ./resources/js/src/views/app/Category.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Category_vue_vue_type_template_id_93774554___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Category.vue?vue&type=template&id=93774554& */ "./resources/js/src/views/app/Category.vue?vue&type=template&id=93774554&");
/* harmony import */ var _Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Category.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/Category.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Category_vue_vue_type_template_id_93774554___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Category_vue_vue_type_template_id_93774554___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/Category.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/Category.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/src/views/app/Category.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Category.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/Category.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/Category.vue?vue&type=template&id=93774554&":
/*!********************************************************************************!*\
  !*** ./resources/js/src/views/app/Category.vue?vue&type=template&id=93774554& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_93774554___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Category.vue?vue&type=template&id=93774554& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/Category.vue?vue&type=template&id=93774554&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_93774554___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_93774554___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);