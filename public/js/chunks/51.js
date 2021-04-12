(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[51],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-form-wizard */ "./node_modules/vue-form-wizard/dist/vue-form-wizard.js");
/* harmony import */ var vue_form_wizard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_form_wizard_dist_vue_form_wizard_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-form-wizard/dist/vue-form-wizard.min.css */ "./node_modules/vue-form-wizard/dist/vue-form-wizard.min.css");
/* harmony import */ var vue_form_wizard_dist_vue_form_wizard_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_form_wizard_dist_vue_form_wizard_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-advanced-cropper */ "./node_modules/vue-advanced-cropper/dist/index.es.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_4__);


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




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    FormWizard: vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__["FormWizard"],
    TabContent: vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__["TabContent"],
    Cropper: vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_3__["Cropper"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_4___default.a
  },
  data: function data() {
    return {
      showPass: false,
      //Crop Box
      loadImageCropper: false,
      cropperBoxData: {},
      cropBoxImage: null,
      //End Crop Box
      logoPreviewImage: null,
      logoCoordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      logoData: null,
      errorData: [],
      //company
      name: '',
      id: '',
      address: '',
      phone: '',
      website: '',
      email: '',
      //admin
      first_name: '',
      last_name: '',
      adminPhone: '',
      adminEmail: '',
      adminPassword: null,
      //package
      packageId: null,
      selectedPackage: null,
      packageOptions: [],
      packageData: [],
      selectedPackageData: [],
      packageModule: []
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  methods: {
    fileInput: function fileInput() {
      var _this = this;

      this.cropperBoxData.width = window.innerWidth;
      this.cropperBoxData.height = window.innerHeight - 180;
      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        _this.loadImageCropper = true;
        var input = e.target;

        if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader(); // Define a callback function to run, when FileReader finishes its job

          reader.onload = function (e) {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            _this.cropBoxImage = e.target.result;
            _this.cropperBoxData.name = input.files[0].name;
          }; // Start the reader job - read file as a data url (base64 format)


          reader.readAsDataURL(input.files[0]);
        }
      };
    },
    crop: function crop() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _this$$refs$cropper$g = this.$refs.cropper.getResult(),
          coordinates = _this$$refs$cropper$g.coordinates,
          canvas = _this$$refs$cropper$g.canvas;

      this.logoCoordinates = coordinates; // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result

      this.logoPreviewImage = canvas.toDataURL();
      this.logoData = dataURLtoFile(canvas.toDataURL(), this.cropperBoxData.name); // Close crop box

      this.loadImageCropper = false;
    },
    loadData: function loadData() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('api/company-create/data');

              case 3:
                req = _context.sent;
                _this2.packageOptions = req.data.packageOptions;
                _this2.packageData = req.data.packageData;
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                _this2.notificationAlert(_context.t0.response);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    loadPackage: function loadPackage() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this3.selectedPackageData = _this3.packageData[_this3.selectedPackage];
                _this3.packageId = _this3.selectedPackageData.id;
                data = {
                  id: _this3.selectedPackageData.id
                };
                _context2.prev = 3;
                _context2.next = 6;
                return axios.post('api/company-create/data/package/module', data);

              case 6:
                req = _context2.sent;
                _this3.packageModule = req.data;
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);
                console.log(_context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 10]]);
      }))();
    },
    createCompany: function createCompany() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var data, fornData, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this4.btnDisabled = true;
                _this4.errorData = {};
                _context3.prev = 2;
                data = {
                  name: _this4.name,
                  address: _this4.address,
                  logoData: _this4.logoData,
                  email: _this4.email,
                  phone: _this4.phone,
                  website: _this4.website,
                  first_name: _this4.first_name,
                  last_name: _this4.last_name,
                  adminPhone: _this4.adminPhone,
                  adminEmail: _this4.adminEmail,
                  adminPassword: _this4.adminPassword,
                  packageList: _this4.packageId
                };
                fornData = createForm(data);
                _context3.next = 7;
                return axios.post('api/company-create/data/proceed', fornData);

              case 7:
                req = _context3.sent;

                if (req) {
                  _this4.notificationAlert(req);

                  _this4.$router.push('/company-list');
                }

                _context3.next = 15;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](2);
                _this4.errorData = _context3.t0.response.data.errors;

                _this4.notificationAlert(_context3.t0.response);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 11]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=template&id=3a5767c2&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=template&id=3a5767c2& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
      _c(
        "vx-card",
        [
          _c(
            "form-wizard",
            {
              attrs: {
                color: "rgba(var(--vs-primary), 1)",
                title: "Create Company",
                subtitle: "Please complete all the steps",
                disabled: _vm.btnDisabled,
                finishButtonText: "Submit"
              },
              on: {
                "on-complete": function($event) {
                  return _vm.createCompany()
                }
              }
            },
            [
              _c(
                "tab-content",
                {
                  attrs: {
                    title: "Company General Info",
                    icon: "feather icon-home"
                  }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "button-wrapper bg-gray-200 cursor-pointer",
                      staticStyle: {
                        width: "150px",
                        height: "100px",
                        "background-image": "url('/site/upload.png')",
                        "background-repeat": "no-repeat",
                        "background-size": "20px 20px",
                        "background-position": "center center",
                        border: "1px solid rgb(0,0,0,.1)"
                      },
                      on: {
                        click: function($event) {
                          return _vm.fileInput()
                        }
                      }
                    },
                    [
                      _c("img", {
                        staticClass: "w-full",
                        attrs: { src: _vm.logoPreviewImage }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "text-center p-1",
                      staticStyle: { width: "150px", "font-size": "10px" }
                    },
                    [_vm._v("Upload Company Logo")]
                  ),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "w-full pt-4",
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
                    staticClass: "pt-3 w-full",
                    attrs: { "label-placeholder": "Address" },
                    model: {
                      value: _vm.address,
                      callback: function($$v) {
                        _vm.address = $$v
                      },
                      expression: "address"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.address
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.address[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "pt-3 w-full",
                    attrs: { "label-placeholder": "Email", type: "email" },
                    model: {
                      value: _vm.email,
                      callback: function($$v) {
                        _vm.email = $$v
                      },
                      expression: "email"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.email
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.email[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "pt-3 w-full",
                    attrs: { "label-placeholder": "Phone", type: "text" },
                    model: {
                      value: _vm.phone,
                      callback: function($$v) {
                        _vm.phone = $$v
                      },
                      expression: "phone"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errorData.phone
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.phone[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("vs-input", {
                    staticClass: "pt-3 w-full",
                    attrs: { "label-placeholder": "Website", type: "text" },
                    model: {
                      value: _vm.website,
                      callback: function($$v) {
                        _vm.website = $$v
                      },
                      expression: "website"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "tab-content",
                {
                  attrs: {
                    label: "Admin",
                    title: "Admin",
                    icon: "feather icon-user"
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "py-10" },
                    [
                      _c(
                        "vs-row",
                        [
                          _c(
                            "vs-col",
                            {
                              attrs: {
                                "vs-type": "flex",
                                "vs-justify": "center",
                                "vs-w": "6"
                              }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full mt-4 mr-1",
                                attrs: {
                                  label: "First Name",
                                  name: "first_name"
                                },
                                model: {
                                  value: _vm.first_name,
                                  callback: function($$v) {
                                    _vm.first_name = $$v
                                  },
                                  expression: "first_name"
                                }
                              }),
                              _vm._v(" "),
                              _vm.errorData.first_name
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "py-1 text-sm text-red-400"
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.errorData.first_name[0])
                                      )
                                    ]
                                  )
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            { attrs: { "vs-type": "flex", "vs-w": "6" } },
                            [
                              _c("vs-input", {
                                staticClass: "w-full mt-4",
                                attrs: {
                                  label: "Last Name",
                                  name: "last_name"
                                },
                                model: {
                                  value: _vm.last_name,
                                  callback: function($$v) {
                                    _vm.last_name = $$v
                                  },
                                  expression: "last_name"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("vs-input", {
                        staticClass: "pt-3 w-full",
                        attrs: {
                          "label-placeholder": "Email",
                          type: "email",
                          name: "email"
                        },
                        model: {
                          value: _vm.adminEmail,
                          callback: function($$v) {
                            _vm.adminEmail = $$v
                          },
                          expression: "adminEmail"
                        }
                      }),
                      _vm._v(" "),
                      _vm.errorData.adminEmail
                        ? _c(
                            "div",
                            { staticClass: "py-1 text-sm text-red-400" },
                            [_vm._v(_vm._s(_vm.errorData.adminEmail[0]))]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("vs-input", {
                        staticClass: "pt-3 w-full",
                        attrs: {
                          icon: _vm.showPass
                            ? "icon icon-eye"
                            : "icon icon-eye-off",
                          type: _vm.showPass ? "text" : "password",
                          "icon-pack": "feather",
                          "icon-no-border": "",
                          "icon-after": "true",
                          label: "Password",
                          name: "adminPassword"
                        },
                        on: {
                          "icon-click": function($event) {
                            _vm.showPass = !_vm.showPass
                          }
                        },
                        model: {
                          value: _vm.adminPassword,
                          callback: function($$v) {
                            _vm.adminPassword = $$v
                          },
                          expression: "adminPassword"
                        }
                      }),
                      _vm._v(" "),
                      _vm.errorData.adminPassword
                        ? _c(
                            "div",
                            { staticClass: "py-1 text-sm text-red-400" },
                            [_vm._v(_vm._s(_vm.errorData.adminPassword[0]))]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("vs-input", {
                        staticClass: "pt-3 w-full",
                        attrs: { "label-placeholder": "Phone", name: "phone" },
                        model: {
                          value: _vm.adminPhone,
                          callback: function($$v) {
                            _vm.adminPhone = $$v
                          },
                          expression: "adminPhone"
                        }
                      })
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "tab-content",
                {
                  attrs: {
                    label: "Package",
                    title: "Package",
                    icon: "feather icon-lock"
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "py-10" },
                    [
                      _c("v-select", {
                        attrs: {
                          clearable: false,
                          options: _vm.packageOptions,
                          placeholder: "Select",
                          name: "Select Package",
                          dir: _vm.$vs.rtl ? "rtl" : "ltr"
                        },
                        on: {
                          input: function($event) {
                            return _vm.loadPackage()
                          }
                        },
                        model: {
                          value: _vm.selectedPackage,
                          callback: function($$v) {
                            _vm.selectedPackage = $$v
                          },
                          expression: "selectedPackage"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.errorData.packageList
                    ? _c("div", { staticClass: "py-1 text-sm text-red-400" }, [
                        _vm._v(_vm._s(_vm.errorData.packageList[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "pt-3 pb-8" }, [
                    _c("div", [
                      _c("b", [_vm._v("Name:")]),
                      _vm._v(" " + _vm._s(_vm.selectedPackageData.name))
                    ]),
                    _vm._v(" "),
                    _c("div", [
                      _c("b", [_vm._v("Description:")]),
                      _vm._v(" " + _vm._s(_vm.selectedPackageData.description))
                    ]),
                    _vm._v(" "),
                    _c("div", [
                      _c("b", [_vm._v("Price:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.selectedPackageData.price) +
                          _vm._s(_vm.selectedPackageData.currency)
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", [
                      _c("b", [_vm._v("Number of user:")]),
                      _vm._v(" " + _vm._s(_vm.selectedPackageData.nou))
                    ]),
                    _vm._v(" "),
                    _c("div", [_c("b", [_vm._v("Permissions:")])]),
                    _vm._v(" "),
                    _c("div", [
                      _c(
                        "div",
                        { staticClass: "flex flex-wrap" },
                        _vm._l(_vm.packageModule, function(item, index) {
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
                                return subItem.status == true
                                  ? _c(
                                      "div",
                                      {
                                        key: subIndex,
                                        staticClass:
                                          "m-1 px-2 rounded-lg bg-gray-200"
                                      },
                                      [_vm._v(_vm._s(subItem.title))]
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
                ]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: { title: "Crop Image", active: _vm.loadImageCropper },
          on: {
            "update:active": function($event) {
              _vm.loadImageCropper = $event
            }
          }
        },
        [
          _c(
            "div",
            {
              staticClass:
                "bg-gray-100 w-full overflow-hidden flex justify-center",
              style: { height: _vm.cropperBoxData.height + "px" }
            },
            [
              _c("cropper", {
                ref: "cropper",
                attrs: {
                  src: _vm.cropBoxImage,
                  "stencil-props": { aspectRatio: 1.5 / 1 }
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
                "p-3 mt-2 text-center bg-gray-800 text-white cursor-pointer",
              on: { click: _vm.crop }
            },
            [_vm._v("Crop")]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/company/CompanyCreate.vue":
/*!**************************************************************!*\
  !*** ./resources/js/src/views/app/company/CompanyCreate.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CompanyCreate_vue_vue_type_template_id_3a5767c2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompanyCreate.vue?vue&type=template&id=3a5767c2& */ "./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=template&id=3a5767c2&");
/* harmony import */ var _CompanyCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CompanyCreate.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CompanyCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CompanyCreate_vue_vue_type_template_id_3a5767c2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CompanyCreate_vue_vue_type_template_id_3a5767c2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/company/CompanyCreate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CompanyCreate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=template&id=3a5767c2&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=template&id=3a5767c2& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyCreate_vue_vue_type_template_id_3a5767c2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CompanyCreate.vue?vue&type=template&id=3a5767c2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/company/CompanyCreate.vue?vue&type=template&id=3a5767c2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyCreate_vue_vue_type_template_id_3a5767c2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompanyCreate_vue_vue_type_template_id_3a5767c2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);