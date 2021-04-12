(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      selected_users: [],
      workGroupModal: false,
      workGroupModalName: null,
      workGroupName: null,
      workGroupModalSaveType: null,
      groupList: [],
      groupSelectedId: null,
      groupSelectedName: null,
      findGroup: "",
      workGroupItemModal: false,
      workGroupItemModalName: null,
      workGroupItemName: null,
      workGroupItemModalSaveType: null,
      workGroupUserItem: [],
      userListLoaded: false,
      userList: [],
      selectedUser: null,
      selectedUserId: null
    };
  },
  created: function created() {
    this.loadData();
  },
  mounted: function mounted() {},
  methods: {
    loadData: function loadData() {
      var _arguments = arguments,
          _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var select, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                select = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
                _context.prev = 1;
                _context.next = 4;
                return axios.get("/api/work-group/list");

              case 4:
                req = _context.sent;
                _this.groupList = req.data.data;
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                if (_context.t0.response) {
                  _this.notificationAlert(_context.t0.response);
                } else {
                  console.log(_context.t0);
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }))();
    },
    manageWorkGroup: function manageWorkGroup(type) {
      if (type == 'create') {
        this.workGroupModal = true;
        this.workGroupModalName = 'Create New Workgroup';
        this.workGroupModalSaveType = type;
        this.workGroupName = null;
        this.resetError();
      }

      if (type == 'update') {
        this.workGroupModal = true;
        this.workGroupModalName = 'Edit Workgroup';
        this.workGroupModalSaveType = type;
        this.workGroupName = this.groupSelectedName;
      }
    },
    workGroup: function workGroup(type) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.btnDisabled = true;
                data = {
                  name: _this2.workGroupName
                };
                _context2.prev = 2;

                if (!(type == 'create')) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return axios.post("/api/work-group/create/group", data);

              case 6:
                req = _context2.sent;

                if (req) {
                  _this2.notificationAlert(req);
                }

              case 8:
                if (!(type == 'update')) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 11;
                return axios.put("/api/work-group/update/group/" + _this2.groupSelectedId, data);

              case 11:
                req = _context2.sent;

                if (req) {
                  _this2.notificationAlert(req);
                }

              case 13:
                _this2.workGroupModal = false;

                _this2.loadData();

                _context2.next = 20;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](2);

                if (_context2.t0.response) {
                  _this2.notificationAlert(_context2.t0.response);
                } else {
                  console.log(_context2.t0);
                }

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 17]]);
      }))();
    },
    setGroupData: function setGroupData(item, index) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.groupList.map(function (groupItem) {
                  groupItem.activeBtn = false;
                  return groupItem;
                });

                _this3.groupList[index].activeBtn = true;
                _this3.groupSelectedId = item.id;
                _this3.groupSelectedName = item.name;

                _this3.loadGroupData();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    loadGroupData: function loadGroupData() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return axios.get("/api/work-group/items/" + _this4.groupSelectedId);

              case 3:
                req = _context4.sent;
                _this4.workGroupUserItem = req.data.data;
                console.log(_this4.workGroupUserItem);
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);

                if (_context4.t0.response) {
                  _this4.notificationAlert(_context4.t0.response);
                } else {
                  console.log(_context4.t0);
                }

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }))();
    },
    loadUserList: function loadUserList() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this5.userListLoaded == false)) {
                  _context5.next = 12;
                  break;
                }

                _context5.prev = 1;
                _context5.next = 4;
                return axios.get("/api/work-group/list/users");

              case 4:
                req = _context5.sent;
                _this5.userList = req.data.data;
                _this5.userListLoaded = true;
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);

                if (_context5.t0.response) {
                  _this5.notificationAlert(_context5.t0.response);
                } else {
                  console.log(_context5.t0);
                }

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 9]]);
      }))();
    },
    manageWorkGroupItem: function manageWorkGroupItem(type) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (type == 'create') {
        this.workGroupItemModal = true;
        this.workGroupItemModalName = 'Add Employee to Work Group';
        this.workGroupItemModalSaveType = type;
        this.loadUserList();
        this.selectedUser = null;
        this.resetError();
      }
    },
    workGroupItem: function workGroupItem(type) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this6.btnDisabled = true;
                _context6.prev = 1;

                if (!(type == 'create')) {
                  _context6.next = 8;
                  break;
                }

                data = {
                  user_id: _this6.selected_users,
                  parent_id: _this6.groupSelectedId
                };
                _context6.next = 6;
                return axios.post("/api/work-group/create/item", data);

              case 6:
                req = _context6.sent;

                if (req) {
                  //this.notificationAlert(req);
                  _this6.notificationAlert("User(s) has been added to ".concat(_this6.groupSelectedName), "Add Member", "success");

                  _this6.loadGroupData();

                  _this6.selectedUser = null;
                }

              case 8:
                _context6.next = 13;
                break;

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](1);

                if (_context6.t0.response) {
                  _this6.notificationAlert(_context6.t0.response);
                } else {
                  console.log(_context6.t0);
                }

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 10]]);
      }))();
    },

    /**
     * Delete Work group
     * ***************************/
    deleteGroup: function deleteGroup(params) {
      var _this7 = this;

      this.$http["delete"]("/api/work-group/delete/group/".concat(params.id)).then(function (response) {
        if (response.status === 200) {
          _this7.notificationAlert("".concat(params.group_name, " has been deleted"), "Delete Group", "success");

          _this7.loadData();
        }
      })["catch"](function (err) {
        _this7.notificationAlert(err.response);
      });
    },

    /**
     * Remove member from the group
     * ***************************/
    removeMember: function removeMember(params) {
      var _this8 = this;

      this.$http["delete"]("/api/work-group/delete/item/".concat(params.id)).then(function (response) {
        if (response.status === 200) {
          _this8.notificationAlert("".concat(params.full_name, " has been removed from ").concat(params.group_name), "Remove Member", "success");

          _this8.loadGroupData();
        }
      })["catch"](function (err) {
        _this8.notificationAlert(err.response);
      });
    }
  },
  computed: {
    filteredGroups: function filteredGroups() {
      var filter = new RegExp(this.findGroup, "i");
      return this.groupList.filter(function (el) {
        return el.name.match(filter);
      });
    },
    filteredUserList: function filteredUserList() {
      var _this9 = this;

      return this.userList.filter(function (item) {
        //return _.find(this.workGroupUserItem, {user_id:item.user_id}) == undefined
        return _this9.workGroupUserItem.find(function (addedUser) {
          return addedUser.user_id == item.user_id;
        }) == undefined;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".group-head[data-v-5d701fb6] {\n  padding: 10px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #f0f0f0;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--7-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true& ***!
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
  return _c(
    "div",
    [
      _c("vx-card", { attrs: { title: "" } }, [
        _c(
          "div",
          { staticClass: "flex", staticStyle: { border: "1px solid #f0f0f0" } },
          [
            _c("div", { staticStyle: { width: "30%" } }, [
              _c("div", { staticClass: "group-head" }, [
                _c(
                  "div",
                  {
                    staticClass: "pb-2 mb-2 flex",
                    staticStyle: {
                      "border-bottom": "1px solid rgba(0, 0, 0, 0.05)"
                    }
                  },
                  [
                    _c("div", { staticClass: "flex-auto pt-1" }, [
                      _vm._v("Groups")
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "pl-1" },
                      [
                        _c("vs-button", {
                          attrs: {
                            size: "small",
                            "icon-pack": "feather",
                            icon: "icon-plus"
                          },
                          on: {
                            click: function($event) {
                              return _vm.manageWorkGroup("create")
                            }
                          }
                        })
                      ],
                      1
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "flex" }, [
                  _c(
                    "div",
                    { staticClass: "flex-auto" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: { size: "small", type: "text" },
                        model: {
                          value: _vm.findGroup,
                          callback: function($$v) {
                            _vm.findGroup = $$v
                          },
                          expression: "findGroup"
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
                _vm._l(_vm.filteredGroups, function(item, index) {
                  return _c(
                    "div",
                    {
                      key: index,
                      staticClass:
                        "flex p-3 m-1 cursor-pointer hover:bg-gray-100 overflow-hidden",
                      style:
                        item.activeBtn == true
                          ? "color:#511bc4; border:1px solid rgb(81, 27, 196,.1); background-color:#fcfaff"
                          : "border:1px solid rgba(0,0,0,.04)",
                      on: {
                        click: function($event) {
                          return _vm.setGroupData(item, index)
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "flex-auto",
                          staticStyle: { padding: "4px 0px" }
                        },
                        [_vm._v(_vm._s(item.name))]
                      ),
                      _vm._v(" "),
                      item.activeBtn
                        ? _c("div", { staticClass: "flex" }, [
                            _c(
                              "div",
                              { staticClass: "pl-1" },
                              [
                                _c("vs-button", {
                                  attrs: {
                                    size: "small",
                                    "icon-pack": "feather",
                                    icon: "icon-edit-2"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.manageWorkGroup("update")
                                    }
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "pl-1" },
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
                                      return _vm.actionConfirm(
                                        { id: item.id, group_name: item.name },
                                        _vm.deleteGroup,
                                        "delete " + item.name
                                      )
                                    }
                                  }
                                })
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
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticStyle: {
                  width: "70%",
                  "border-left": "1px solid #f0f0f0"
                }
              },
              [
                _vm.groupSelectedName != null
                  ? _c("div", { staticClass: "flex" }, [
                      _c(
                        "div",
                        { staticClass: "p-3 m-1 flex-auto font-bold" },
                        [_vm._v(_vm._s(_vm.groupSelectedName))]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "p-3 m-1" },
                        [
                          _c(
                            "vs-button",
                            {
                              attrs: {
                                size: "small",
                                "icon-pack": "feather",
                                disabled: _vm.btnDisabled,
                                icon: "icon-users"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.manageWorkGroupItem("create")
                                }
                              }
                            },
                            [_vm._v("Add ")]
                          )
                        ],
                        1
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  _vm._l(_vm.workGroupUserItem, function(item, index) {
                    return _c(
                      "div",
                      { key: index, staticClass: "p-3 bg-gray-50 m-1 flex" },
                      [
                        _c("div", { staticClass: "flex-auto" }, [
                          _vm._v(_vm._s(item.full_name))
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          [
                            _c("feather-icon", {
                              attrs: {
                                icon: "Trash2Icon",
                                svgClasses:
                                  "h-5 w-5 hover:text-danger cursor-pointer"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.actionConfirm(
                                    {
                                      id: item.id,
                                      full_name: item.full_name,
                                      group_name: _vm.groupSelectedName
                                    },
                                    _vm.removeMember,
                                    "remove " +
                                      item.full_name +
                                      " from " +
                                      _vm.groupSelectedName
                                  )
                                }
                              }
                            })
                          ],
                          1
                        )
                      ]
                    )
                  }),
                  0
                )
              ]
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: { title: _vm.workGroupModalName, active: _vm.workGroupModal },
          on: {
            "update:active": function($event) {
              _vm.workGroupModal = $event
            }
          }
        },
        [
          _c("div", [
            _c(
              "div",
              [
                _c("vs-input", {
                  staticClass: "w-full pt-3",
                  attrs: { label: "Name" },
                  model: {
                    value: _vm.workGroupName,
                    callback: function($$v) {
                      _vm.workGroupName = $$v
                    },
                    expression: "workGroupName"
                  }
                }),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.workGroupName,
                    name: "name",
                    altName: "name"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "mt-6 flex" }, [
              _c("div", { staticClass: "flex-auto" }),
              _vm._v(" "),
              _vm.workGroupModalSaveType == "create"
                ? _c(
                    "div",
                    [
                      _c(
                        "vs-button",
                        {
                          attrs: {
                            variant: "success",
                            disabled: _vm.btnDisabled
                          },
                          on: {
                            click: function($event) {
                              return _vm.workGroup("create")
                            }
                          }
                        },
                        [_vm._v("Save")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.workGroupModalSaveType == "update"
                ? _c(
                    "div",
                    [
                      _c(
                        "vs-button",
                        {
                          attrs: {
                            variant: "success",
                            disabled: _vm.btnDisabled
                          },
                          on: {
                            click: function($event) {
                              return _vm.workGroup("update")
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
      ),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: {
            title: _vm.workGroupItemModalName,
            active: _vm.workGroupItemModal
          },
          on: {
            "update:active": function($event) {
              _vm.workGroupItemModal = $event
            }
          }
        },
        [
          _c("div", [
            _c(
              "div",
              { staticClass: "overflow-hidden" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "Add employee to group",
                      multiple: "",
                      autocomplete: "",
                      label: "Employees"
                    },
                    model: {
                      value: _vm.selected_users,
                      callback: function($$v) {
                        _vm.selected_users = $$v
                      },
                      expression: "selected_users"
                    }
                  },
                  _vm._l(_vm.filteredUserList, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: {
                        value: item.user_id,
                        text: item.full_name + " (" + item.emp_id + ")"
                      }
                    })
                  }),
                  1
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "mt-6 flex" }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _vm.workGroupItemModalSaveType == "create"
              ? _c(
                  "div",
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: {
                          variant: "success",
                          disabled: _vm.btnDisabled
                        },
                        on: {
                          click: function($event) {
                            return _vm.workGroupItem("create")
                          }
                        }
                      },
                      [_vm._v(" Add ")]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.workGroupItemModalSaveType == "update"
              ? _c(
                  "div",
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: {
                          variant: "success",
                          disabled: _vm.btnDisabled
                        },
                        on: {
                          click: function($event) {
                            return _vm.workGroupItem()
                          }
                        }
                      },
                      [_vm._v(" Update ")]
                    )
                  ],
                  1
                )
              : _vm._e()
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

/***/ "./resources/js/src/views/app/workflow/WorkGroup.vue":
/*!***********************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkGroup.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WorkGroup_vue_vue_type_template_id_5d701fb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true& */ "./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true&");
/* harmony import */ var _WorkGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorkGroup.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _WorkGroup_vue_vue_type_style_index_0_id_5d701fb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css& */ "./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WorkGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WorkGroup_vue_vue_type_template_id_5d701fb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WorkGroup_vue_vue_type_template_id_5d701fb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5d701fb6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/workflow/WorkGroup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkGroup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_style_index_0_id_5d701fb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader??ref--7-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=style&index=0&id=5d701fb6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_style_index_0_id_5d701fb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_style_index_0_id_5d701fb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_style_index_0_id_5d701fb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_style_index_0_id_5d701fb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_template_id_5d701fb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkGroup.vue?vue&type=template&id=5d701fb6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_template_id_5d701fb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkGroup_vue_vue_type_template_id_5d701fb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);