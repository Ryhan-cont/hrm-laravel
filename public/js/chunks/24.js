(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/company/CompanyView.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_form_wizard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-form-wizard */ "./node_modules/vue-form-wizard/dist/vue-form-wizard.js");
/* harmony import */ var vue_form_wizard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_form_wizard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_form_wizard_dist_vue_form_wizard_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-form-wizard/dist/vue-form-wizard.min.css */ "./node_modules/vue-form-wizard/dist/vue-form-wizard.min.css");
/* harmony import */ var vue_form_wizard_dist_vue_form_wizard_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_form_wizard_dist_vue_form_wizard_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-advanced-cropper */ "./node_modules/vue-advanced-cropper/dist/index.es.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      status_text_reverse: '',
      company_info: null,
      admin_info: null,
      package_info: null,
      package_permission: null,
      permission_head: [],
      company_not_found: false
    };
  },
  mounted: function mounted() {
    this.fetchCompanyInfo();
  },
  methods: {
    fetchCompanyInfo: function fetchCompanyInfo() {
      var _this = this;

      axios.get("/api/company-view/data/".concat(this.$route.params.id)).then(function (response) {
        //console.log(response);
        if (response.status === 200) {
          _this.company_info = response.data.company_info;
          _this.admin_info = response.data.admin_info;
          _this.package_info = response.data.package_info;
          _this.package_permission = response.data.package_permission;
          _this.permission_head = response.data.permission_head;
          _this.status_text_reverse = _this.company_info.is_active === 1 ? 'lock' : 'unlock';
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        console.log(err);
        _this.company_not_found = true;
      });
    },

    /**
     * Update Company is_active status
     * *********************************/
    changeCompanyActive: function changeCompanyActive(params) {
      var _this2 = this;

      var data = {
        id: params.id,
        is_active: params.is_active
      };
      this.$http.put("/api/company-view/data/update", data).then(function (response) {
        _this2.fetchCompanyInfo();

        _this2.notificationAlert(response);
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatar-col {\n  width: 10rem;\n}\n#page-company-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (max-width: 370px) {\n#page-company-view table:not(.permissions-table) td {\n    display: block;\n}\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CompanyView.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=template&id=11491008&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/company/CompanyView.vue?vue&type=template&id=11491008& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "page-company-view" } },
    [
      _c(
        "vs-alert",
        {
          attrs: {
            color: "danger",
            title: "Company Not Found",
            active: _vm.company_not_found
          },
          on: {
            "update:active": function($event) {
              _vm.company_not_found = $event
            }
          }
        },
        [
          _c("span", [
            _vm._v(
              "Company record with id: " +
                _vm._s(_vm.$route.params.id) +
                " not found. "
            )
          ]),
          _vm._v(" "),
          _c(
            "span",
            [
              _c("span", [_vm._v("Check ")]),
              _c(
                "router-link",
                {
                  staticClass: "text-inherit underline",
                  attrs: { to: { name: "CompanyList" } }
                },
                [_vm._v("All Companies")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _vm.company_info
        ? _c(
            "div",
            { attrs: { id: "company-data" } },
            [
              _c(
                "vx-card",
                { staticClass: "mb-base", attrs: { title: "Company Info" } },
                [
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col", attrs: { id: "avatar-col" } },
                      [
                        _c("div", { staticClass: "img-container mb-4" }, [
                          _c("img", {
                            staticClass: "rounded w-full",
                            attrs: { src: _vm.company_info.company_logo }
                          })
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "vx-col flex-1",
                        attrs: { id: "account-info-col-1" }
                      },
                      [
                        _c("table", [
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Name ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.company_info.name))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Email ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.company_info.email))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Phone ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.company_info.phone))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("No. Of User ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.package_info.nou))])
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "vx-col flex-1",
                        attrs: { id: "account-info-col-2" }
                      },
                      [
                        _c("table", [
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Status ")
                            ]),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                class:
                                  _vm.company_info.is_active === 1
                                    ? "text-success"
                                    : "text-danger"
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm.company_info.is_active === 1
                                        ? "Active"
                                        : "Inactive"
                                    ) +
                                    "\n                            "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Website ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.company_info.website))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Address ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.company_info.address))])
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "vx-col w-full flex",
                        attrs: { id: "account-manage-buttons" }
                      },
                      [
                        _c(
                          "vs-button",
                          {
                            staticClass: "mr-4",
                            attrs: {
                              "icon-pack": "feather",
                              icon: "icon-edit",
                              to: {
                                name: "CompanyEdit",
                                params: { id: _vm.$route.params.id }
                              }
                            }
                          },
                          [_vm._v("Edit")]
                        ),
                        _vm._v(" "),
                        _c(
                          "vs-button",
                          {
                            attrs: {
                              type: "border",
                              "icon-pack": "feather",
                              color:
                                _vm.company_info.is_active === 1
                                  ? "danger"
                                  : "success",
                              icon: "icon-" + _vm.status_text_reverse
                            },
                            on: {
                              click: function($event) {
                                _vm.actionConfirm(
                                  _vm.company_info,
                                  _vm.changeCompanyActive,
                                  _vm.status_text_reverse.toUpperCase() +
                                    " " +
                                    _vm.company_info.name
                                )
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.status_text_reverse.toUpperCase()) +
                                "\n                    "
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row" }, [
                _c(
                  "div",
                  { staticClass: "vx-col lg:w-1/2 w-full" },
                  [
                    _c(
                      "vx-card",
                      {
                        staticClass: "mb-base",
                        attrs: { title: "Admin Info" }
                      },
                      [
                        _c("table", [
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Name ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.admin_info.full_name))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Mobile ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.admin_info.phone))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Email ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.admin_info.email))])
                          ])
                        ])
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col lg:w-1/2 w-full" },
                  [
                    _c(
                      "vx-card",
                      {
                        staticClass: "mb-base",
                        attrs: { title: "Package Info" }
                      },
                      [
                        _c("table", [
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Name ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.package_info.name))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Bill Period ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.package_info.period))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Price ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.package_info.price))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Currency ")
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(_vm._s(_vm.package_info.currency))
                            ])
                          ])
                        ])
                      ]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("vx-card", [
                _c("div", { staticClass: "vx-row" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c(
                        "div",
                        { staticClass: "flex items-end px-3" },
                        [
                          _c("feather-icon", {
                            staticClass: "mr-2",
                            attrs: { svgClasses: "w-6 h-6", icon: "LockIcon" }
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "font-medium text-lg leading-none" },
                            [_vm._v("Permissions")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("vs-divider")
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "block overflow-x-auto" }, [
                  _c("div", [
                    _c(
                      "div",
                      { staticClass: "flex flex-wrap" },
                      _vm._l(_vm.package_permission, function(item, index) {
                        return _c(
                          "div",
                          {
                            key: index,
                            staticClass: "m-1 px-2 rounded-lg bg-gray-300"
                          },
                          [
                            _c("div", [_vm._v(_vm._s(item.name))]),
                            _vm._v(" "),
                            _vm._l(item.subpermissions, function(
                              subItem,
                              subIndex
                            ) {
                              return subItem.status
                                ? _c(
                                    "div",
                                    {
                                      key: subIndex,
                                      staticClass:
                                        "m-1 px-2 rounded-lg bg-gray-200"
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(subItem.title) +
                                          "\n                            "
                                      )
                                    ]
                                  )
                                : _vm._e()
                            })
                          ],
                          2
                        )
                      }),
                      0
                    )
                  ])
                ])
              ])
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/company/CompanyView.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/views/app/company/CompanyView.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CompanyView_vue_vue_type_template_id_11491008___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompanyView.vue?vue&type=template&id=11491008& */ "./resources/js/src/views/app/company/CompanyView.vue?vue&type=template&id=11491008&");
/* harmony import */ var _CompanyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CompanyView.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/company/CompanyView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _CompanyView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CompanyView.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CompanyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CompanyView_vue_vue_type_template_id_11491008___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CompanyView_vue_vue_type_template_id_11491008___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/company/CompanyView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/company/CompanyView.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/app/company/CompanyView.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CompanyView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CompanyView.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/company/CompanyView.vue?vue&type=template&id=11491008&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/app/company/CompanyView.vue?vue&type=template&id=11491008& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_template_id_11491008___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CompanyView.vue?vue&type=template&id=11491008& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyView.vue?vue&type=template&id=11491008&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_template_id_11491008___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyView_vue_vue_type_template_id_11491008___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);