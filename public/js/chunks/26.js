(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      moduleData: [],
      inputModalSt: false,
      modalTitle: null,
      modalType: null,
      prefix: {
        'assetNameData': []
      },
      assetPackage: [],
      packageTitle: '',
      intervalData: ['Day', 'Month', 'Year'],
      assetData: [],
      comment: '',
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
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('/api/asset-package/data');

              case 3:
                req = _context.sent;
                _this.prefix.assetNameData = req.data.assetName;
                _this.assetPackage = req.data.assetPackage;
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                _this.notificationAlert(_context.t0.response);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    inputModal: function inputModal(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.inputModalSt = !this.inputModalSt;
      this.modalType = type;
      this.resetError();

      if (type == 'new') {
        this.modalTitle = 'Add New Asset Package';
        this.packageTitle = '';
        this.comment = '';
        this.manageAsset('new');
      } else if (type == 'edit') {
        this.modalTitle = 'Edit Asset Package';
        this.packageTitle = data.name;
        this.assetData = _.cloneDeep(data.asset);
        this.comment = data.comment;
        this.id = data.id;
      }
    },
    manageAsset: function manageAsset(type) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = {
        asset: null,
        quantity: null,
        duration: null,
        interval: null
      };

      if (type == 'new') {
        this.assetData = [];
        this.assetData.push(data);
      }

      if (type == 'newItem') {
        this.assetData.push(data);
      }

      if (type == 'delete') {
        if (index > -1) {
          this.assetData.splice(index, 1);
        }
      }
    },
    create: function create() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.errorData = {};
                _context2.prev = 1;
                data = {
                  packageTitle: _this2.packageTitle,
                  assetData: _this2.assetData,
                  comment: _this2.comment
                };

                if (!_this2.validateInput(data)) {
                  _context2.next = 9;
                  break;
                }

                _this2.btnDisabled = true;
                _context2.next = 7;
                return axios.post('/api/asset-package/data/create', data);

              case 7:
                req = _context2.sent;

                if (req) {
                  _this2.inputModalSt = false;

                  _this2.notificationAlert(req);

                  _this2.loadData();
                }

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](1);

                _this2.notificationAlert(_context2.t0.response);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 11]]);
      }))();
    },
    update: function update() {
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
                  packageTitle: _this3.packageTitle,
                  assetData: _this3.assetData,
                  comment: _this3.comment,
                  id: _this3.id
                };
                _context3.next = 6;
                return axios.post('/api/asset-package/data/update', data);

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
    deleteData: function deleteData(deldata) {
      console.log(this);
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this Asset Package?',
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
                return axios.post('/api/asset-package/data/delete', data);

              case 4:
                req = _context4.sent;

                if (req) {
                  _this4.loadData();

                  _this4.notificationAlert(req);
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

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".vs-tooltip {\n  z-index: 99999 !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetPackage.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=template&id=537e361e&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=template&id=537e361e& ***!
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
                    "max-items": "10",
                    pagination: "",
                    search: "",
                    stripe: "",
                    data: _vm.assetPackage
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
                                  "\r\n                  " +
                                    _vm._s(tr.name) +
                                    "\r\n                "
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: tr.asset } },
                                _vm._l(tr.asset, function(item, index) {
                                  return _c(
                                    "div",
                                    { key: index, staticClass: "flex py-1" },
                                    [
                                      _c("div", { staticClass: "flex-auto" }, [
                                        _vm._v(_vm._s(item.asset))
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "flex-auto",
                                          staticStyle: { "max-width": "80px" }
                                        },
                                        [_vm._v(_vm._s(item.quantity))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "flex-auto",
                                          staticStyle: { "max-width": "80px" }
                                        },
                                        [_vm._v(_vm._s(item.duration))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "flex-auto",
                                          staticStyle: { "max-width": "80px" }
                                        },
                                        [_vm._v(_vm._s(item.interval))]
                                      )
                                    ]
                                  )
                                }),
                                0
                              ),
                              _vm._v(" "),
                              _c("vs-td", { attrs: { data: tr.comment } }, [
                                _vm._v(
                                  "\r\n                  " +
                                    _vm._s(tr.comment) +
                                    "\r\n                "
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
                      _c("vs-th", [_vm._v("Asset Name")]),
                      _vm._v(" "),
                      _c("vs-th", [
                        _c("div", { staticClass: "flex w-full" }, [
                          _c("div", { staticClass: "flex-auto" }, [
                            _vm._v("Asset")
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "flex-auto",
                              staticStyle: { "max-width": "80px" }
                            },
                            [_vm._v("Quantity")]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "flex-auto",
                              staticStyle: { "max-width": "80px" }
                            },
                            [_vm._v("Duration")]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "flex-auto",
                              staticStyle: { "max-width": "80px" }
                            },
                            [_vm._v("Interval")]
                          )
                        ])
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
                        staticClass: "vx-col md:w-11/12 w-full pt-3",
                        attrs: { "label-placeholder": "Asset Title" },
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
                          altName: "Package Title"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.assetData, function(item, index) {
                    return _c(
                      "div",
                      { key: index },
                      [
                        _c(
                          "div",
                          { staticClass: "vx-col md:w-11/12 w-full pt-3" },
                          [
                            _c("search-box", {
                              attrs: {
                                label: "Asset Name",
                                items: _vm.prefix.assetNameData
                              },
                              model: {
                                value: item.asset,
                                callback: function($$v) {
                                  _vm.$set(item, "asset", $$v)
                                },
                                expression: "item.asset"
                              }
                            }),
                            _vm._v(" "),
                            _c("validate-data", {
                              attrs: {
                                rules: "required",
                                value: item.asset,
                                name: "assetData." + index + ".asset",
                                altName: "asset"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "vx-row" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "vx-col md:w-3/12 w-full overflow-hidden"
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full pt-2",
                                attrs: { label: "Quantity" },
                                model: {
                                  value: item.quantity,
                                  callback: function($$v) {
                                    _vm.$set(item, "quantity", $$v)
                                  },
                                  expression: "item.quantity"
                                }
                              }),
                              _vm._v(" "),
                              _c("validate-data", {
                                attrs: {
                                  rules: "required|integer",
                                  value: item.quantity,
                                  name: "assetData." + index + ".quantity",
                                  altName: "quantity"
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
                                "vx-col md:w-4/12 w-full overflow-hidden"
                            },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full pt-2",
                                  attrs: {
                                    placeholder: "Interval",
                                    label: "Interval"
                                  },
                                  model: {
                                    value: item.interval,
                                    callback: function($$v) {
                                      _vm.$set(item, "interval", $$v)
                                    },
                                    expression: "item.interval"
                                  }
                                },
                                _vm._l(_vm.intervalData, function(item, index) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: { value: item, text: item }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c("validate-data", {
                                attrs: {
                                  rules: "required",
                                  value: item.interval,
                                  name: "assetData." + index + ".interval",
                                  altName: "interval"
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
                                "vx-col md:w-3/12 w-full overflow-hidden"
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full pt-2",
                                attrs: { label: "Duration" },
                                model: {
                                  value: item.duration,
                                  callback: function($$v) {
                                    _vm.$set(item, "duration", $$v)
                                  },
                                  expression: "item.duration"
                                }
                              }),
                              _vm._v(" "),
                              _c("validate-data", {
                                attrs: {
                                  rules: "required|integer",
                                  value: item.duration,
                                  name: "assetData." + index + ".duration",
                                  altName: "duration"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "vx-col md:w-1/12 w-full pt-6" },
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
                                                _vm.assetData.length > 1),
                                            expression:
                                              "index || ( !index && assetData.length > 1)"
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
                                            return _vm.manageAsset(
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
                                              _vm.assetData.length - 1,
                                            expression:
                                              "index === assetData.length-1"
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
                                            return _vm.manageAsset("newItem")
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
                        ]),
                        _vm._v(" "),
                        _c("vs-divider")
                      ],
                      1
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-3" },
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
                ],
                2
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

/***/ "./resources/js/src/views/app/masterdata/AssetPackage.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/AssetPackage.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AssetPackage_vue_vue_type_template_id_537e361e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssetPackage.vue?vue&type=template&id=537e361e& */ "./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=template&id=537e361e&");
/* harmony import */ var _AssetPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssetPackage.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AssetPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssetPackage.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AssetPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AssetPackage_vue_vue_type_template_id_537e361e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AssetPackage_vue_vue_type_template_id_537e361e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/masterdata/AssetPackage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetPackage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetPackage.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=template&id=537e361e&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=template&id=537e361e& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_template_id_537e361e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetPackage.vue?vue&type=template&id=537e361e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/masterdata/AssetPackage.vue?vue&type=template&id=537e361e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_template_id_537e361e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetPackage_vue_vue_type_template_id_537e361e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);