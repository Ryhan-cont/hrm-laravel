(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      workflowGroupModal: false,
      workflowGroupModalName: null,
      workflowGroupName: null,
      workflowGroupModalSaveType: null,
      approvers: [],
      groupList: [],
      groupSelectedId: null,
      groupSelectedName: null,
      workflowGroupItemData: [],
      findGroup: "",
      workflowGroupItemModal: false,
      workflowGroupItemModalName: null,
      workflowGroupItemName: null,
      workflowGroupItemModalSaveType: null,
      workflowItemSequence: null,
      approver: null,
      wf_process_id: null,
      work_group_id: null,
      final_stage: null,
      accept_text: null,
      pending_text: null,
      reject_text: null,
      sla: null,
      email_cc: null,
      workflowItemId: null,
      workGroupData: [],
      workGroupDataLoaded: false,
      sla_type: null,
      slaTypeData: ["Day", "Hour"]
    };
  },
  created: function created() {
    this.loadData();
    this.fetchUserList();
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
                return axios.get("/api/wf-process-defs/list");

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
    workflowGroup: function workflowGroup(type) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.btnDisabled = true;
                data = {
                  name: _this2.workflowGroupName
                };
                _context2.prev = 2;

                if (!(type == 'create')) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return axios.post("/api/wf-process-defs/create/group", data);

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
                return axios.put("/api/wf-process-defs/update/group/" + _this2.groupSelectedId, data);

              case 11:
                req = _context2.sent;

                if (req) {
                  _this2.notificationAlert(req);
                }

              case 13:
                if (!(type == 'delete')) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 16;
                return axios["delete"]("/api/wf-process-defs/delete/group/" + _this2.groupSelectedId);

              case 16:
                req = _context2.sent;

                if (req) {
                  _this2.notificationAlert(req);
                }

              case 18:
                _this2.workflowGroupModal = false;

                _this2.loadData();

                _context2.next = 25;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](2);

                if (_context2.t0.response) {
                  _this2.notificationAlert(_context2.t0.response);
                } else {
                  console.log(_context2.t0);
                }

              case 25:
                _this2.btnDisabled = false;

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 22]]);
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

                _this4.$vs.loading({
                  container: '#wf-cont-right-box',
                  scale: 0.9
                });

                _context4.next = 4;
                return axios.get("/api/wf-process-defs/items/" + _this4.groupSelectedId);

              case 4:
                req = _context4.sent;
                _this4.workflowGroupItemData = req.data.data;

                _this4.$vs.loading.close('#wf-cont-right-box > .con-vs-loading');

                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);

                if (_context4.t0.response) {
                  _this4.notificationAlert(_context4.t0.response);
                } else {
                  console.log(_context4.t0);
                }

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }))();
    },
    loadWorkGroupData: function loadWorkGroupData() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this5.workGroupDataLoaded == false)) {
                  _context5.next = 12;
                  break;
                }

                _context5.prev = 1;
                _context5.next = 4;
                return axios.get("/api/wf-process-defs/list/work-group");

              case 4:
                req = _context5.sent;
                _this5.workGroupData = req.data.data;
                _this5.workGroupDataLoaded = true;
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
    manageWorkflowGroupItem: function manageWorkflowGroupItem(type) {
      var _this6 = this;

      var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return function (item) {
        _this6.loadWorkGroupData();

        if (type == 'create-first') {
          var item = {
            sequence: 1,
            wf_process_id: _this6.groupSelectedId,
            id: 'create-first'
          };
          type = 'create';
        }

        if (type == 'create') {
          _this6.workflowGroupItemModal = true;
          _this6.workflowGroupItemModalName = 'Add Step in the Work Flow Process';
          _this6.workflowGroupItemModalSaveType = type;
          _this6.workflowItemSequence = item.sequence;
          _this6.approver = null;
          _this6.wf_process_id = item.wf_process_id;
          _this6.work_group_id = null;
          _this6.final_stage = false;
          _this6.accept_text = null;
          _this6.pending_text = null;
          _this6.reject_text = null;
          _this6.sla = null;
          _this6.email_cc = null;
          _this6.workflowItemId = item.id;
        }

        if (type == 'update') {
          _this6.workflowGroupItemModal = true;
          _this6.workflowGroupItemModalName = 'Edit Work Flow Process';
          _this6.workflowGroupItemModalSaveType = type;
          _this6.approver = item.approver;
          _this6.work_group_id = item.work_group_id;
          _this6.final_stage = item.final_stage;
          _this6.accept_text = item.accept_text;
          _this6.pending_text = item.pending_text;
          _this6.reject_text = item.reject_text;
          _this6.sla_type = item.sla_type;
          _this6.sla = item.sla;
          _this6.email_cc = item.email_cc;
          _this6.workflowItemId = item.id;
        }

        if (type == 'delete') {
          _this6.workflowGroupModalSaveType = type;
          _this6.workflowItemId = item.id;

          _this6.$vs.dialog({
            type: "confirm",
            color: "danger",
            title: "Confirm",
            text: "Are you sure, you want to delete this user?",
            acceptText: "ok",
            accept: _this6.workflowGroupItem,
            parameters: 'delete'
          });
        }
      }(item);
    },
    workflowGroupItem: function workflowGroupItem(type) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this7.btnDisabled = true;
                _context6.prev = 1;

                if (!(type == 'create')) {
                  _context6.next = 14;
                  break;
                }

                data = {
                  sequence: _this7.workflowItemSequence,
                  approver: _this7.approver,
                  work_group_id: _this7.work_group_id,
                  wf_process_id: _this7.wf_process_id,
                  final_stage: _this7.final_stage,
                  accept_text: _this7.accept_text,
                  pending_text: _this7.pending_text,
                  reject_text: _this7.reject_text,
                  sla_type: _this7.sla_type,
                  sla: _this7.sla,
                  sla_minutes: _this7.slaInMinutes,
                  email_cc: _this7.email_cc,
                  id: _this7.workflowItemId
                };
                _context6.prev = 4;
                _context6.next = 7;
                return axios.post("/api/wf-process-defs/create/item", data);

              case 7:
                req = _context6.sent;

                if (req) {
                  _this7.notificationAlert(req);

                  _this7.workflowGroupItemModal = false;

                  _this7.loadGroupData();
                }

                _context6.next = 14;
                break;

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6["catch"](4);

                if (_context6.t0.response) {
                  _this7.notificationAlert(_context6.t0.response);
                } else {
                  console.log(_context6.t0);
                }

              case 14:
                if (!(type == 'update')) {
                  _context6.next = 26;
                  break;
                }

                data = {
                  approver: _this7.approver,
                  work_group_id: _this7.work_group_id,
                  final_stage: _this7.final_stage,
                  accept_text: _this7.accept_text,
                  pending_text: _this7.pending_text,
                  reject_text: _this7.reject_text,
                  sla_type: _this7.sla_type,
                  sla: _this7.sla,
                  sla_minutes: _this7.slaInMinutes,
                  email_cc: _this7.email_cc
                };
                _context6.prev = 16;
                _context6.next = 19;
                return axios.put("/api/wf-process-defs/update/item/" + _this7.workflowItemId, data);

              case 19:
                req = _context6.sent;

                if (req) {
                  _this7.notificationAlert(req);

                  _this7.workflowGroupItemModal = false;

                  _this7.loadGroupData();
                }

                _context6.next = 26;
                break;

              case 23:
                _context6.prev = 23;
                _context6.t1 = _context6["catch"](16);

                if (_context6.t1.response) {
                  _this7.notificationAlert(_context6.t1.response);
                } else {
                  console.log(_context6.t1);
                }

              case 26:
                if (!(type == 'delete')) {
                  _context6.next = 31;
                  break;
                }

                _context6.next = 29;
                return axios["delete"]("/api/wf-process-defs/delete/item/" + _this7.workflowItemId);

              case 29:
                req = _context6.sent;

                if (req) {
                  _this7.notificationAlert(req);

                  _this7.loadGroupData();
                }

              case 31:
                _context6.next = 36;
                break;

              case 33:
                _context6.prev = 33;
                _context6.t2 = _context6["catch"](1);

                if (_context6.t2.response) {
                  _this7.notificationAlert(_context6.t2.response);
                } else {
                  console.log(_context6.t2);
                }

              case 36:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 33], [4, 11], [16, 23]]);
      }))();
    },
    fetchUserList: function fetchUserList() {
      var _this8 = this;

      axios.get("/api/work-group/list/users").then(function (response) {
        _this8.approvers = response.data.data;
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
    slaInMinutes: function slaInMinutes() {
      var slaMinutes = 0;

      if (this.sla_type === 'Hour') {
        slaMinutes = this.sla * 60;
      } else if (this.sla_type === 'Day') {
        slaMinutes = this.sla * 24 * 60;
      }

      return slaMinutes;
    },
    enableAddNew: function enableAddNew() {
      return this.workflowGroupItemData.length === 0;
    }
  },
  watch: {}
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#wf-cont-main-box[data-v-234abca6] {\n  display: flex;\n}\n#wf-cont-left-box[data-v-234abca6] {\n  width: 20%;\n}\n#wf-cont-right-box[data-v-234abca6] {\n  width: 80%;\n  border-left: 1px solid #f0f0f0;\n}\n@media (max-width: 900px) {\n#wf-cont-left-box[data-v-234abca6] {\n    width: 30%;\n}\n#wf-cont-right-box[data-v-234abca6] {\n    width: 70%;\n}\n}\n@media (max-width: 550px) {\n#wf-cont-main-box[data-v-234abca6] {\n    display: block;\n}\n#wf-cont-left-box[data-v-234abca6] {\n    width: 100%;\n}\n#wf-cont-right-box[data-v-234abca6] {\n    width: 100%;\n    margin-top: 30px;\n}\n}\n.group-head[data-v-234abca6] {\n  padding: 10px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #f0f0f0;\n}\n.workflow-group-item-header[data-v-234abca6] {\n  padding: 10px 5px;\n  flex: 1;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.workflow-group-item[data-v-234abca6] {\n  padding: 10px 5px;\n  flex: 1;\n  overflow: hidden;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--7-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
          {
            staticStyle: { border: "1px solid #f0f0f0" },
            attrs: { id: "wf-cont-main-box" }
          },
          [
            _c("div", { attrs: { id: "wf-cont-left-box" } }, [
              _c("div", { staticClass: "group-head" }, [
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
                      )
                    ]
                  )
                }),
                0
              )
            ]),
            _vm._v(" "),
            _c("div", { attrs: { id: "wf-cont-right-box" } }, [
              _vm.groupSelectedName != null
                ? _c("div", { staticClass: "flex" }, [
                    _c("div", { staticClass: "p-3 m-1 flex-auto font-bold" }, [
                      _vm._v(_vm._s(_vm.groupSelectedName))
                    ]),
                    _vm._v(" "),
                    _vm.enableAddNew
                      ? _c(
                          "div",
                          { staticClass: "p-3 m-1" },
                          [
                            _c(
                              "vs-button",
                              {
                                attrs: {
                                  disabled: _vm.btnDisabled,
                                  size: "small"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.manageWorkflowGroupItem(
                                      "create-first"
                                    )
                                  }
                                }
                              },
                              [_vm._v("Add\n                        ")]
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticStyle: { "overflow-x": "auto" } }, [
                _c(
                  "div",
                  { staticStyle: { "min-width": "650px" } },
                  [
                    _vm.groupSelectedName != null
                      ? _c("div", { staticClass: "p-3 bg-gray-100 m-1 flex" }, [
                          _c(
                            "div",
                            {
                              staticClass: "flex",
                              staticStyle: { width: "100%" }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item-header",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [_vm._v("Sequence")]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item-header",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [_vm._v("Approver")]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item-header",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [_vm._v("Work Group")]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item-header",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [_vm._v("Final Stage")]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item-header",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [_vm._v("SLA")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "text-center pt-3",
                              staticStyle: { width: "85px" }
                            },
                            [_vm._v("Actions")]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.workflowGroupItemData, function(item, index) {
                      return _c(
                        "div",
                        { key: index, staticClass: "px-3 bg-gray-50 m-1 flex" },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "flex",
                              staticStyle: { width: "100%" }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [_c("div", [_vm._v(_vm._s(item.sequence))])]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [
                                  _c("div", [
                                    _vm._v(_vm._s(item.approver_name))
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [_c("div", [_vm._v(_vm._s(item.group_name))])]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [
                                  _c("vs-button", {
                                    attrs: {
                                      color: "primary",
                                      icon: item.final_stage
                                        ? "check"
                                        : "close",
                                      type: "flat"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "workflow-group-item",
                                  staticStyle: { "max-width": "20%" }
                                },
                                [
                                  _c("div", [
                                    _vm._v(
                                      _vm._s(item.sla) +
                                        " " +
                                        _vm._s(item.sla_type)
                                    )
                                  ])
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "pt-3 px-2",
                              staticStyle: { width: "85px" }
                            },
                            [
                              _c("feather-icon", {
                                attrs: {
                                  icon: "FilePlusIcon",
                                  svgClasses:
                                    "h-5 w-5 hover:text-primary cursor-pointer"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.manageWorkflowGroupItem(
                                      "create",
                                      item
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("feather-icon", {
                                attrs: {
                                  icon: "Edit3Icon",
                                  svgClasses:
                                    "h-5 w-5 hover:text-primary cursor-pointer"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.manageWorkflowGroupItem(
                                      "update",
                                      item
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("feather-icon", {
                                attrs: {
                                  icon: "Trash2Icon",
                                  svgClasses:
                                    "h-5 w-5 hover:text-danger cursor-pointer"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.manageWorkflowGroupItem(
                                      "delete",
                                      item
                                    )
                                  }
                                }
                              })
                            ],
                            1
                          )
                        ]
                      )
                    })
                  ],
                  2
                )
              ])
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: {
            active: _vm.workflowGroupItemModal,
            title: _vm.workflowGroupItemModalName
          },
          on: {
            "update:active": function($event) {
              _vm.workflowGroupItemModal = $event
            }
          }
        },
        [
          _c("div", [
            _c("div", { staticClass: "vx-row" }, [
              _c(
                "div",
                { staticClass: "vx-col md:w-1/2 w-full" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        autocomplete: "",
                        label: "Approver",
                        placeholder: "Select an approver"
                      },
                      model: {
                        value: _vm.approver,
                        callback: function($$v) {
                          _vm.approver = $$v
                        },
                        expression: "approver"
                      }
                    },
                    _vm._l(_vm.approvers, function(item, index) {
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
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "vx-col md:w-1/2 w-full" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        autocomplete: "",
                        label: "Work Group",
                        placeholder: "Select work group"
                      },
                      model: {
                        value: _vm.work_group_id,
                        callback: function($$v) {
                          _vm.work_group_id = $$v
                        },
                        expression: "work_group_id"
                      }
                    },
                    _vm._l(_vm.workGroupData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { text: item.name, value: item.id }
                      })
                    }),
                    1
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c(
                "div",
                { staticClass: "vx-col md:w-1/2 w-full" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full mt-4",
                      attrs: { autocomplete: "", label: "SLA Type" },
                      model: {
                        value: _vm.sla_type,
                        callback: function($$v) {
                          _vm.sla_type = $$v
                        },
                        expression: "sla_type"
                      }
                    },
                    _vm._l(_vm.slaTypeData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { text: item, value: item }
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
                { staticClass: "vx-col md:w-1/2 w-full" },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "SLA" },
                    model: {
                      value: _vm.sla,
                      callback: function($$v) {
                        _vm.sla = $$v
                      },
                      expression: "sla"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: { value: _vm.sla, name: "sla", altName: "sla" }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "flex pt-2" }, [
              _c(
                "div",
                { staticClass: "p-1" },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: { label: "Accept Text" },
                    model: {
                      value: _vm.accept_text,
                      callback: function($$v) {
                        _vm.accept_text = $$v
                      },
                      expression: "accept_text"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      value: _vm.accept_text,
                      name: "accept_text",
                      altName: "accept_text"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "p-1" },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: { label: "Reject Text" },
                    model: {
                      value: _vm.reject_text,
                      callback: function($$v) {
                        _vm.reject_text = $$v
                      },
                      expression: "reject_text"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      value: _vm.reject_text,
                      name: "reject_text",
                      altName: "reject_text"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "p-1" },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: { label: "Pending Text" },
                    model: {
                      value: _vm.pending_text,
                      callback: function($$v) {
                        _vm.pending_text = $$v
                      },
                      expression: "pending_text"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      value: _vm.pending_text,
                      name: "pending_text",
                      altName: "pending_text"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", [
              _c(
                "div",
                { staticClass: "p-1" },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: { label: "Email CC" },
                    model: {
                      value: _vm.email_cc,
                      callback: function($$v) {
                        _vm.email_cc = $$v
                      },
                      expression: "email_cc"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "flex pt-1" }, [
              _c(
                "div",
                { staticClass: "p-2" },
                [
                  _c(
                    "vs-checkbox",
                    {
                      attrs: { size: "small" },
                      model: {
                        value: _vm.final_stage,
                        callback: function($$v) {
                          _vm.final_stage = $$v
                        },
                        expression: "final_stage"
                      }
                    },
                    [_vm._v("Final Stage")]
                  )
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "pt-6 flex" }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _vm.workflowGroupItemModalSaveType == "create"
              ? _c(
                  "div",
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: {
                          disabled: _vm.btnDisabled,
                          variant: "success"
                        },
                        on: {
                          click: function($event) {
                            return _vm.workflowGroupItem("create")
                          }
                        }
                      },
                      [_vm._v(" Add\n                ")]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.workflowGroupItemModalSaveType == "update"
              ? _c(
                  "div",
                  [
                    _c(
                      "vs-button",
                      {
                        attrs: {
                          disabled: _vm.btnDisabled,
                          variant: "success"
                        },
                        on: {
                          click: function($event) {
                            return _vm.workflowGroupItem("update")
                          }
                        }
                      },
                      [_vm._v(" Update\n                ")]
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

/***/ "./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WorkflowProcessDefs_vue_vue_type_template_id_234abca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true& */ "./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true&");
/* harmony import */ var _WorkflowProcessDefs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorkflowProcessDefs.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _WorkflowProcessDefs_vue_vue_type_style_index_0_id_234abca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css& */ "./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WorkflowProcessDefs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WorkflowProcessDefs_vue_vue_type_template_id_234abca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WorkflowProcessDefs_vue_vue_type_template_id_234abca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "234abca6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/workflow/WorkflowProcessDefs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkflowProcessDefs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css&":
/*!******************************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_style_index_0_id_234abca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader??ref--7-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=style&index=0&id=234abca6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_style_index_0_id_234abca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_style_index_0_id_234abca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_style_index_0_id_234abca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_style_index_0_id_234abca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_template_id_234abca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/workflow/WorkflowProcessDefs.vue?vue&type=template&id=234abca6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_template_id_234abca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkflowProcessDefs_vue_vue_type_template_id_234abca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);