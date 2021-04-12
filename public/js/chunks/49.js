(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/NoticeBoard.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/NoticeBoard.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill/dist/quill.core.css */ "./node_modules/quill/dist/quill.core.css");
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quill/dist/quill.snow.css */ "./node_modules/quill/dist/quill.snow.css");
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-quill-editor */ "./node_modules/vue-quill-editor/dist/vue-quill-editor.js");
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_quill_editor__WEBPACK_IMPORTED_MODULE_3__);


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



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    quillEditor: vue_quill_editor__WEBPACK_IMPORTED_MODULE_3__["quillEditor"]
  },
  data: function data() {
    return {
      permissions: {
        create: {},
        update: {},
        "delete": {}
      },
      previewModal: false,
      noticeBoardModal: false,
      noticeBoardModalNmae: null,
      noticeBoardModalsaveType: null,
      notineList: [],
      noticeTitle: null,
      notice: null,
      noticeGroup: null,
      publishDateTime: null,
      expireDateTime: null,
      notificationType: null,
      noticeId: null,
      noticeGroupData: [],
      noticeGroupLoaded: false,
      editorOption: {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'], [{
            'header': 1
          }, {
            'header': 2
          }], [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }], [{
            'font': []
          }]]
        },
        placeholder: 'Message'
      },
      noticeTypeData: {
        1: 'Email',
        2: 'SMS',
        3: 'All'
      }
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  filters: {
    datetime: function datetime(value) {
      //return moment(value).format('hh:mm A');
      var dateArr = value.split(/[ T]/);

      if (dateArr[1]) {
        var timeArr = dateArr[1].split(/[:-]/);

        if (timeArr[2]) {
          if (Number(timeArr[0] > 12)) {
            return "".concat(dateArr[0], " ").concat(timeArr[0] - 12, ":").concat(timeArr[1], " PM");
          } else {
            return "".concat(dateArr[0], " ").concat(timeArr[0], ":").concat(timeArr[1], " AM");
          }
        } else {
          return value;
        }
      } else {
        return value;
      }
    }
  },
  methods: {
    sendNotice: function sendNotice() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('/api/notice-board/data/send-notice');

              case 3:
                req = _context.sent;
                console.log(req);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                _this.notificationAlert(_context.t0.response);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    loadData: function loadData() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return axios.get('/api/notice-board/data');

              case 3:
                req = _context2.sent;
                _this2.notineList = req.data.data;
                _this2.permissions = req.data.permissions;
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);

                _this2.notificationAlert(_context2.t0.response);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }))();
    },
    pdfDownload: function pdfDownload() {
      var mywindow = window.open('', 'PRINT', 'height=600,width=900');
      mywindow.document.write('<html><head><title>' + this.noticeTitle + '</title>');
      mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + this.noticeTitle + '</h1>');
      mywindow.document.write(document.getElementById('content').innerHTML);
      mywindow.document.write('</body></html>');
      mywindow.document.close(); // necessary for IE >= 10

      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      setTimeout(function () {
        mywindow.close();
      }, 1000);
    },
    reqNoticeGroup: function reqNoticeGroup() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this3.noticeGroupLoaded == false)) {
                  _context3.next = 12;
                  break;
                }

                _context3.prev = 1;
                _context3.next = 4;
                return axios.get('/api/notice-board/data/work-group');

              case 4:
                req = _context3.sent;
                //console.log(req)
                _this3.noticeGroupData = req.data.data;
                _this3.noticeGroupLoaded = true;
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);

                _this3.notificationAlert(_context3.t0.response);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 9]]);
      }))();
    },
    inputModal: function inputModal(type) {
      var _arguments = arguments,
          _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var item;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                item = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : [];

                _this4.resetError();

                _this4.reqNoticeGroup();

                if (type === 'setData') {
                  _this4.noticeTitle = item.title;
                  _this4.notice = item.notice;
                  _this4.noticeGroup = item.noticeGroupId;
                  _this4.publishDateTime = item.publisDateTime;
                  _this4.expireDateTime = item.expireDateTime;
                  _this4.notificationType = item.noticeType;
                  _this4.noticeId = item.id;
                }

                if (type == 'create') {
                  _this4.noticeBoardModal = true;
                  _this4.noticeBoardModalNmae = 'Add Notice';
                  _this4.noticeBoardModalsaveType = 'create';
                  _this4.noticeTitle = null;
                  _this4.notice = null;
                  _this4.noticeGroup = null;
                  _this4.publishDateTime = null;
                  _this4.expireDateTime = null;
                  _this4.notificationType = null;
                }

                if (!(type == 'update')) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 8;
                return _this4.inputModal('setData', item);

              case 8:
                _this4.noticeBoardModal = true;
                _this4.noticeBoardModalNmae = 'Update Notice';
                _this4.noticeBoardModalsaveType = 'update';

              case 11:
                if (type == 'delete') {
                  _this4.noticeId = item.id;
                  _this4.noticeBoardModalsaveType = 'delete';

                  _this4.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: "Confirm",
                    text: 'Are you sure, you want to delete this notice?',
                    acceptText: 'ok',
                    accept: _this4.noticeBoard
                  });
                }

                if (!(type == 'view')) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 15;
                return _this4.inputModal('setData', item);

              case 15:
                _this4.previewModal = true;

              case 16:
                if (!(type === 'download')) {
                  _context4.next = 20;
                  break;
                }

                _context4.next = 19;
                return _this4.inputModal('setData', item);

              case 19:
                _this4.pdfDownload();

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    noticeBoard: function noticeBoard() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.btnDisabled = true;

                if (_this5.noticeBoardModalsaveType == 'create' || _this5.noticeBoardModalsaveType == 'update') {
                  data = {
                    noticeTitle: _this5.noticeTitle,
                    notice: _this5.notice,
                    noticeGroup: _this5.noticeGroup,
                    publishDateTime: dateString(_this5.publishDateTime),
                    expireDateTime: dateString(_this5.expireDateTime),
                    notificationType: _this5.notificationType
                  };
                  console.log(data);
                }

                if (!(_this5.noticeBoardModalsaveType == 'create')) {
                  _context5.next = 15;
                  break;
                }

                _context5.prev = 3;
                _context5.next = 6;
                return axios.post('/api/notice-board/create', data);

              case 6:
                req = _context5.sent;
                _this5.noticeBoardModal = false;

                _this5.loadData();

                _this5.notificationAlert(req);

                _context5.next = 15;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](3);

                _this5.notificationAlert(_context5.t0.response);

              case 15:
                if (!(_this5.noticeBoardModalsaveType == 'update')) {
                  _context5.next = 28;
                  break;
                }

                _context5.prev = 16;
                _context5.next = 19;
                return axios.put('/api/notice-board/update/' + _this5.noticeId, data);

              case 19:
                req = _context5.sent;
                _this5.noticeBoardModal = false;

                _this5.loadData();

                _this5.notificationAlert(req);

                _context5.next = 28;
                break;

              case 25:
                _context5.prev = 25;
                _context5.t1 = _context5["catch"](16);

                _this5.notificationAlert(_context5.t1.response);

              case 28:
                if (!(_this5.noticeBoardModalsaveType == 'delete')) {
                  _context5.next = 40;
                  break;
                }

                _context5.prev = 29;
                _context5.next = 32;
                return axios.put('/api/notice-board/delete/' + _this5.noticeId);

              case 32:
                req = _context5.sent;

                _this5.loadData();

                _this5.notificationAlert(req);

                _context5.next = 40;
                break;

              case 37:
                _context5.prev = 37;
                _context5.t2 = _context5["catch"](29);

                _this5.notificationAlert(_context5.t2.response);

              case 40:
                _this5.btnDisabled = false;

              case 41:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 12], [16, 25], [29, 37]]);
      }))();
    }
  },
  watch: {
    publishDateTime: function publishDateTime() {
      console.log(dateString(this.publishDateTime));
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true& ***!
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
    [
      _c("vx-card", { attrs: { title: "" } }, [
        _c("div", {}, [
          _c("div", { staticClass: "flex" }, [
            _c(
              "div",
              {
                staticClass: "flex-auto",
                on: {
                  click: function($event) {
                    return _vm.sendNotice()
                  }
                }
              },
              [_vm._v("Send Notice")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _vm.permissions.create.status
              ? _c(
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
                            return _vm.inputModal("create")
                          }
                        }
                      },
                      [_vm._v("Add New")]
                    )
                  ],
                  1
                )
              : _vm._e()
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
                    data: _vm.notineList
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
                              _c("vs-td", { attrs: { data: tr.title } }, [
                                _vm._v(_vm._s(tr.title))
                              ]),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: tr.publisDateTime } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("datetime")(tr.publisDateTime)
                                    )
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: tr.expireDateTime } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("datetime")(tr.expireDateTime)
                                    )
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("vs-td", { attrs: { data: tr.noticeGroup } }, [
                                _vm._v(_vm._s(tr.noticeGroup))
                              ]),
                              _vm._v(" "),
                              _c("vs-td", { attrs: { data: tr.noticeType } }, [
                                _vm._v(
                                  _vm._s(_vm.noticeTypeData[tr.noticeType])
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { staticClass: "w-10" },
                                [
                                  _c(
                                    "vs-td",
                                    { attrs: { id: "action-buttons" } },
                                    [
                                      _c(
                                        "vs-dropdown",
                                        { attrs: { "vs-trigger-click": "" } },
                                        [
                                          _c("vs-button", {
                                            attrs: {
                                              color: "dark",
                                              icon: "more_vert",
                                              type: "flat"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "vs-dropdown-menu",
                                            [
                                              _c(
                                                "vs-dropdown-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.inputModal(
                                                        "view",
                                                        tr
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "flex items-center"
                                                    },
                                                    [
                                                      _c("vs-icon", {
                                                        staticClass: "mr-2",
                                                        attrs: {
                                                          icon: "visibility",
                                                          color: "primary"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("span", [
                                                        _vm._v("View")
                                                      ])
                                                    ],
                                                    1
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "vs-dropdown-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.inputModal(
                                                        "download",
                                                        tr
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "flex items-center"
                                                    },
                                                    [
                                                      _c("vs-icon", {
                                                        staticClass: "mr-2",
                                                        attrs: {
                                                          icon: "download",
                                                          color: "success"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("span", [
                                                        _vm._v("Download")
                                                      ])
                                                    ],
                                                    1
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _vm.permissions.update.status
                                                ? _c(
                                                    "vs-dropdown-item",
                                                    {
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.inputModal(
                                                            "update",
                                                            tr
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "span",
                                                        {
                                                          staticClass:
                                                            "flex items-center"
                                                        },
                                                        [
                                                          _c("vs-icon", {
                                                            staticClass: "mr-2",
                                                            attrs: {
                                                              icon: "edit",
                                                              color: "warning"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("span", [
                                                            _vm._v("Edit")
                                                          ])
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.permissions.delete.status
                                                ? _c(
                                                    "vs-dropdown-item",
                                                    {
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.inputModal(
                                                            "delete",
                                                            tr
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "span",
                                                        {
                                                          staticClass:
                                                            "flex items-center"
                                                        },
                                                        [
                                                          _c("vs-icon", {
                                                            staticClass: "mr-2",
                                                            attrs: {
                                                              icon: "block",
                                                              color: "danger"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("span", [
                                                            _vm._v("Delete")
                                                          ])
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  )
                                                : _vm._e()
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
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
                      _c("vs-th", [_vm._v("Title")]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Publish date time")]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Expired Date Time")]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Notice Group")]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Notice Type")]),
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
        ])
      ]),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: {
            fullscreen: "",
            title: _vm.noticeBoardModalNmae,
            active: _vm.noticeBoardModal
          },
          on: {
            "update:active": function($event) {
              _vm.noticeBoardModal = $event
            }
          }
        },
        [
          _c("div", [
            _c(
              "div",
              [
                _c(
                  "div",
                  { staticClass: "p-1" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full pt-3",
                      attrs: { label: "Title *" },
                      model: {
                        value: _vm.noticeTitle,
                        callback: function($$v) {
                          _vm.noticeTitle = $$v
                        },
                        expression: "noticeTitle"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.noticeTitle,
                        name: "noticeTitle",
                        altName: "notice title"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "px-1 pt-5",
                    staticStyle: { height: "280px" }
                  },
                  [
                    _c("quill-editor", {
                      staticStyle: { height: "200px" },
                      attrs: { options: _vm.editorOption },
                      model: {
                        value: _vm.notice,
                        callback: function($$v) {
                          _vm.notice = $$v
                        },
                        expression: "notice"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.notice,
                        name: "notice"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "flex" }, [
                  _c(
                    "div",
                    { staticClass: "p-1" },
                    [
                      _c("v-date-picker", {
                        attrs: {
                          color: "purple",
                          mode: "dateTime",
                          is12hr: "",
                          "min-date": new Date()
                        },
                        scopedSlots: _vm._u([
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
                                      staticClass: "w-full",
                                      attrs: {
                                        "icon-pack": "feather",
                                        icon: "icon icon-calendar",
                                        label: "Publish Date Time *",
                                        value: inputValue
                                      }
                                    },
                                    inputEvents
                                  )
                                )
                              ]
                            }
                          }
                        ]),
                        model: {
                          value: _vm.publishDateTime,
                          callback: function($$v) {
                            _vm.publishDateTime = $$v
                          },
                          expression: "publishDateTime"
                        }
                      }),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.publishDateTime,
                          name: "publishDateTime",
                          altName: "publish date time"
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
                      _c("v-date-picker", {
                        attrs: {
                          color: "purple",
                          mode: "dateTime",
                          is12hr: "",
                          "min-date": new Date()
                        },
                        scopedSlots: _vm._u([
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
                                      staticClass: "w-full ",
                                      attrs: {
                                        "icon-pack": "feather",
                                        icon: "icon icon-calendar",
                                        label: "Expire Date Time *",
                                        value: inputValue
                                      }
                                    },
                                    inputEvents
                                  )
                                )
                              ]
                            }
                          }
                        ]),
                        model: {
                          value: _vm.expireDateTime,
                          callback: function($$v) {
                            _vm.expireDateTime = $$v
                          },
                          expression: "expireDateTime"
                        }
                      }),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.expireDateTime,
                          name: "expireDateTime",
                          altName: "expire date time"
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
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: { label: "Notice Group *", autocomplete: "" },
                          model: {
                            value: _vm.noticeGroup,
                            callback: function($$v) {
                              _vm.noticeGroup = $$v
                            },
                            expression: "noticeGroup"
                          }
                        },
                        _vm._l(_vm.noticeGroupData, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.id, text: item.name }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.noticeGroup,
                          name: "noticeGroup",
                          altName: "notice group"
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "flex mt-5 p-1" }, [
                  _c("div", { staticClass: "font-bold pr-3" }, [
                    _vm._v("Notification type:")
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "px-2" },
                    [
                      _c(
                        "vs-radio",
                        {
                          attrs: { "vs-name": "radios1", "vs-value": "1" },
                          model: {
                            value: _vm.notificationType,
                            callback: function($$v) {
                              _vm.notificationType = $$v
                            },
                            expression: "notificationType"
                          }
                        },
                        [_vm._v("Email")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "px-1" },
                    [
                      _c(
                        "vs-radio",
                        {
                          attrs: { "vs-name": "radios1", "vs-value": "2" },
                          model: {
                            value: _vm.notificationType,
                            callback: function($$v) {
                              _vm.notificationType = $$v
                            },
                            expression: "notificationType"
                          }
                        },
                        [_vm._v("SMS")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "px-1" },
                    [
                      _c(
                        "vs-radio",
                        {
                          attrs: { "vs-name": "radios1", "vs-value": "3" },
                          model: {
                            value: _vm.notificationType,
                            callback: function($$v) {
                              _vm.notificationType = $$v
                            },
                            expression: "notificationType"
                          }
                        },
                        [_vm._v("All")]
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.notificationType,
                    name: "notificationType",
                    altName: "notification type"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "mt-8" }, [
              _vm.noticeBoardModalsaveType == "create"
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
                              return _vm.noticeBoard("create")
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
              _vm.noticeBoardModalsaveType == "update"
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
                              return _vm.noticeBoard("update")
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
          attrs: { fullscreen: "", title: "Notice", active: _vm.previewModal },
          on: {
            "update:active": function($event) {
              _vm.previewModal = $event
            }
          }
        },
        [
          _c("div", { attrs: { id: "invoice-page" } }, [
            _c("div", { attrs: { id: "content" } }, [
              _c(
                "div",
                {
                  staticClass: "vx-row leading-loose p-base",
                  staticStyle: { "padding-bottom": "10px !important" }
                },
                [
                  _c("div", { staticClass: "vx-col w-1/2" }, [
                    _c("h5", [_vm._v(_vm._s(_vm.noticeTitle))]),
                    _vm._v(" "),
                    _c("div", { staticClass: "invoice__recipient-info my-4" }, [
                      _c("div", [
                        _c("b", [_vm._v("Publish date time:  ")]),
                        _vm._v(_vm._s(_vm.publishDateTime))
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("b", [_vm._v("Expired Date Time:  ")]),
                        _vm._v(_vm._s(_vm.expireDateTime))
                      ])
                    ])
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "p-base",
                  staticStyle: { "padding-top": "0px !important" }
                },
                [
                  _c("h5", { staticClass: "pb-2" }, [_vm._v("Notice")]),
                  _vm._v(" "),
                  _c("span", { domProps: { innerHTML: _vm._s(_vm.notice) } })
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "invoice__footer text-right p-base" }, [
              _c(
                "div",
                {
                  staticClass: "flex flex-wrap items-center justify-between",
                  attrs: { align: "" }
                },
                [_c("div", { staticClass: "flex items-center" })]
              )
            ])
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

/***/ "./resources/js/src/views/app/NoticeBoard.vue":
/*!****************************************************!*\
  !*** ./resources/js/src/views/app/NoticeBoard.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NoticeBoard_vue_vue_type_template_id_8a1eb474_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true& */ "./resources/js/src/views/app/NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true&");
/* harmony import */ var _NoticeBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NoticeBoard.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/NoticeBoard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NoticeBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NoticeBoard_vue_vue_type_template_id_8a1eb474_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NoticeBoard_vue_vue_type_template_id_8a1eb474_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8a1eb474",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/NoticeBoard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/NoticeBoard.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/views/app/NoticeBoard.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NoticeBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NoticeBoard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/NoticeBoard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NoticeBoard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/app/NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NoticeBoard_vue_vue_type_template_id_8a1eb474_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/NoticeBoard.vue?vue&type=template&id=8a1eb474&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NoticeBoard_vue_vue_type_template_id_8a1eb474_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NoticeBoard_vue_vue_type_template_id_8a1eb474_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);