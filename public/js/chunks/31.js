(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill/dist/quill.core.css */ "./node_modules/quill/dist/quill.core.css");
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill/dist/quill.snow.css */ "./node_modules/quill/dist/quill.snow.css");
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-quill-editor */ "./node_modules/vue-quill-editor/dist/vue-quill-editor.js");
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_quill_editor__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    quillEditor: vue_quill_editor__WEBPACK_IMPORTED_MODULE_2__["quillEditor"]
  },
  data: function data() {
    return {
      TypeData: [],
      sat: {
        w_h: null,
        o_h: null,
        w_type: null,
        id: null
      },
      sun: {
        w_h: null,
        o_h: null,
        w_type: null,
        id: null
      },
      mon: {
        w_h: null,
        o_h: null,
        w_type: null,
        id: null
      },
      tue: {
        w_h: null,
        o_h: null,
        w_type: null,
        id: null
      },
      wed: {
        w_h: null,
        o_h: null,
        w_type: null,
        id: null
      },
      thu: {
        w_h: null,
        o_h: null,
        w_type: null,
        id: null
      },
      fri: {
        w_h: null,
        o_h: null,
        w_type: null,
        id: null
      }
    };
  },
  mounted: function mounted() {
    this.fetchData();
  },
  computed: {},
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      axios.get('/api/ot-setting/data').then(function (response) {
        _this.sat = response.data.sat;
        _this.sun = response.data.sun;
        _this.mon = response.data.mon;
        _this.tue = response.data.tue;
        _this.wed = response.data.wed;
        _this.thu = response.data.thu;
        _this.fri = response.data.fri;
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    createRequest: function createRequest() {
      var _this2 = this;

      var data = {
        sat: this.sat,
        sun: this.sun,
        mon: this.mon,
        tue: this.tue,
        wed: this.wed,
        thu: this.thu,
        fri: this.fri
      };
      console.log(data);
      /* let formData = new FormData();
       formData.append('data', JSON.stringify(data));*/

      axios.post('/api/ot-setting/ot-setting', data).then(function (response) {
        _this2.notificationAlert(response);
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    },
    fetchOrgTypes: function fetchOrgTypes() {
      var _this3 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_OT_TYPES)).then(function (response) {
        _this3.TypeData = response.data.items;
      })["catch"](function (err) {
        _this3.notificationAlert(err.response);
      });
    }
  },
  created: function created() {
    this.fetchOrgTypes();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ql-editor {\n  min-height: 200px;\n}\n@media print {\n.invoice-page * {\n    visibility: hidden;\n}\n.invoice-page #content-area {\n    margin: 0 !important;\n}\n.invoice-page .vs-con-table .vs-con-tbody {\n    overflow: hidden !important;\n}\n.invoice-page #invoice-container,\n.invoice-page #invoice-container * {\n    visibility: visible;\n}\n.invoice-page #invoice-container {\n    position: absolute;\n    left: 0;\n    top: 0;\n    box-shadow: none;\n}\n}\n@page {\n  size: auto;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OTSetting.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=template&id=5cf95208&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=template&id=5cf95208& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "flex" }, [
      _c(
        "div",
        {
          staticClass: "pt-3",
          staticStyle: { "min-height": "300px", width: "100%" }
        },
        [
          _c(
            "vs-table",
            { attrs: { stripe: "", data: _vm.TypeData } },
            [
              _c(
                "template",
                { slot: "thead" },
                [
                  _c("vs-th", [_vm._v("Day")]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("Working Hour")]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("Over Time (Hour)")]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("Working Type")])
                ],
                1
              ),
              _vm._v(" "),
              [
                _c(
                  "vs-tr",
                  [
                    _c("vs-td", [_vm._v("Sunday")]),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Working Hour",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.sun.w_h,
                            callback: function($$v) {
                              _vm.$set(_vm.sun, "w_h", $$v)
                            },
                            expression: "sun.w_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Over Time (Hour)",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.sun.o_h,
                            callback: function($$v) {
                              _vm.$set(_vm.sun, "o_h", $$v)
                            },
                            expression: "sun.o_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Working Type",
                              autocomplete: ""
                            },
                            model: {
                              value: _vm.sun.w_type,
                              callback: function($$v) {
                                _vm.$set(_vm.sun, "w_type", $$v)
                              },
                              expression: "sun.w_type"
                            }
                          },
                          _vm._l(_vm.TypeData, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.value, text: item.label }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vs-tr",
                  [
                    _c("vs-td", [_vm._v("Monday")]),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Working Hour",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.mon.w_h,
                            callback: function($$v) {
                              _vm.$set(_vm.mon, "w_h", $$v)
                            },
                            expression: "mon.w_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Over Time (Hour)",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.mon.o_h,
                            callback: function($$v) {
                              _vm.$set(_vm.mon, "o_h", $$v)
                            },
                            expression: "mon.o_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Working Type",
                              autocomplete: ""
                            },
                            model: {
                              value: _vm.mon.w_type,
                              callback: function($$v) {
                                _vm.$set(_vm.mon, "w_type", $$v)
                              },
                              expression: "mon.w_type"
                            }
                          },
                          _vm._l(_vm.TypeData, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.value, text: item.label }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vs-tr",
                  [
                    _c("vs-td", [_vm._v("Tuesday")]),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Working Hour",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.tue.w_h,
                            callback: function($$v) {
                              _vm.$set(_vm.tue, "w_h", $$v)
                            },
                            expression: "tue.w_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Over Time (Hour)",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.tue.o_h,
                            callback: function($$v) {
                              _vm.$set(_vm.tue, "o_h", $$v)
                            },
                            expression: "tue.o_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Working Type",
                              autocomplete: ""
                            },
                            model: {
                              value: _vm.tue.w_type,
                              callback: function($$v) {
                                _vm.$set(_vm.tue, "w_type", $$v)
                              },
                              expression: "tue.w_type"
                            }
                          },
                          _vm._l(_vm.TypeData, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.value, text: item.label }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vs-tr",
                  [
                    _c("vs-td", [_vm._v("Wednesday")]),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Working Hour",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.wed.w_h,
                            callback: function($$v) {
                              _vm.$set(_vm.wed, "w_h", $$v)
                            },
                            expression: "wed.w_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Over Time (Hour)",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.wed.o_h,
                            callback: function($$v) {
                              _vm.$set(_vm.wed, "o_h", $$v)
                            },
                            expression: "wed.o_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Working Type",
                              autocomplete: ""
                            },
                            model: {
                              value: _vm.wed.w_type,
                              callback: function($$v) {
                                _vm.$set(_vm.wed, "w_type", $$v)
                              },
                              expression: "wed.w_type"
                            }
                          },
                          _vm._l(_vm.TypeData, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.value, text: item.label }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vs-tr",
                  [
                    _c("vs-td", [_vm._v("Thursday")]),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Working Hour",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.thu.w_h,
                            callback: function($$v) {
                              _vm.$set(_vm.thu, "w_h", $$v)
                            },
                            expression: "thu.w_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Over Time (Hour)",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.thu.o_h,
                            callback: function($$v) {
                              _vm.$set(_vm.thu, "o_h", $$v)
                            },
                            expression: "thu.o_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Working Type",
                              autocomplete: ""
                            },
                            model: {
                              value: _vm.thu.w_type,
                              callback: function($$v) {
                                _vm.$set(_vm.thu, "w_type", $$v)
                              },
                              expression: "thu.w_type"
                            }
                          },
                          _vm._l(_vm.TypeData, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.value, text: item.label }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vs-tr",
                  [
                    _c("vs-td", [_vm._v("Friday")]),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Working Hour",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.fri.w_h,
                            callback: function($$v) {
                              _vm.$set(_vm.fri, "w_h", $$v)
                            },
                            expression: "fri.w_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Over Time (Hour)",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.fri.o_h,
                            callback: function($$v) {
                              _vm.$set(_vm.fri, "o_h", $$v)
                            },
                            expression: "fri.o_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Working Type",
                              autocomplete: ""
                            },
                            model: {
                              value: _vm.fri.w_type,
                              callback: function($$v) {
                                _vm.$set(_vm.fri, "w_type", $$v)
                              },
                              expression: "fri.w_type"
                            }
                          },
                          _vm._l(_vm.TypeData, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.value, text: item.label }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vs-tr",
                  [
                    _c("vs-td", [_vm._v("Saturday")]),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Working Hour",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.sat.w_h,
                            callback: function($$v) {
                              _vm.$set(_vm.sat, "w_h", $$v)
                            },
                            expression: "sat.w_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c("vs-input", {
                          attrs: {
                            placeholder: "Over Time (Hour)",
                            type: "number",
                            min: "0"
                          },
                          model: {
                            value: _vm.sat.o_h,
                            callback: function($$v) {
                              _vm.$set(_vm.sat, "o_h", $$v)
                            },
                            expression: "sat.o_h"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-td",
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Working Type",
                              autocomplete: ""
                            },
                            model: {
                              value: _vm.sat.w_type,
                              callback: function($$v) {
                                _vm.$set(_vm.sat, "w_type", $$v)
                              },
                              expression: "sat.w_type"
                            }
                          },
                          _vm._l(_vm.TypeData, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.value, text: item.label }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ]
            ],
            2
          ),
          _vm._v(" "),
          _c("div", { staticClass: "flex-auto pt-6" }),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { align: "right" } },
            [
              _c(
                "vs-button",
                {
                  attrs: {
                    size: "small",
                    "icon-pack": "feather",
                    icon: "icon-plus"
                  },
                  on: { click: _vm.createRequest }
                },
                [_vm._v("Save")]
              )
            ],
            1
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/ot-setting/OTSetting.vue":
/*!*************************************************************!*\
  !*** ./resources/js/src/views/app/ot-setting/OTSetting.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OTSetting_vue_vue_type_template_id_5cf95208___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OTSetting.vue?vue&type=template&id=5cf95208& */ "./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=template&id=5cf95208&");
/* harmony import */ var _OTSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OTSetting.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _OTSetting_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OTSetting.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OTSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OTSetting_vue_vue_type_template_id_5cf95208___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OTSetting_vue_vue_type_template_id_5cf95208___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/ot-setting/OTSetting.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OTSetting.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OTSetting.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=template&id=5cf95208&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=template&id=5cf95208& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_template_id_5cf95208___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OTSetting.vue?vue&type=template&id=5cf95208& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/ot-setting/OTSetting.vue?vue&type=template&id=5cf95208&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_template_id_5cf95208___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OTSetting_vue_vue_type_template_id_5cf95208___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);