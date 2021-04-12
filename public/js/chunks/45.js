(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/auth/Login.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/auth/Login.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      showPass: false,
      email: "developer@example.com",
      password: "123456",
      remember: false,
      errorData: []
    };
  },
  computed: {
    //check if both password and email have been set for enabling login button
    validateForm: function validateForm() {
      return this.email !== '' && this.password !== '';
    }
  },
  methods: {
    login: function login() {
      var _this = this;

      var data = {
        email: this.email,
        password: this.password,
        remember: this.remember
      };
      this.btnDisabled = true;
      axios.post("/user/login", data).then(function (response) {
        //console.log(response);
        if (response.status === 200) {
          localStorage.setItem("auth", "true"); //this.$router.push('/dashboard');

          _this.$router.push(_this.$route.query.redirect || '/dashboard');
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        console.log(err);
      });
    }
  },
  mounted: function mounted() {
    /*  window.addEventListener("keypress", e => {
         if(e.key === "Enter" && (this.email !== '' && this.password !== '')){
           this.login();
         }
      });*/
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/auth/Login.vue?vue&type=template&id=d9ffc4a8&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/auth/Login.vue?vue&type=template&id=d9ffc4a8& ***!
  \************************************************************************************************************************************************************************************************************/
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
    {
      staticClass:
        "h-screen flex w-full bg-img vx-row no-gutter items-center justify-center",
      attrs: { id: "page-login" }
    },
    [
      _c(
        "div",
        {
          staticClass: "vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"
        },
        [
          _c("vx-card", [
            _c(
              "div",
              {
                staticClass: "full-page-bg-color",
                attrs: { slot: "no-body" },
                slot: "no-body"
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "vx-row no-gutter justify-center items-center"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "vx-col hidden lg:block lg:w-1/2" },
                      [
                        _c("img", {
                          staticClass: "mx-auto",
                          attrs: {
                            src: __webpack_require__(/*! @assets/images/pages/login.png */ "./resources/assets/images/pages/login.png"),
                            alt: "login"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg"
                      },
                      [
                        _c("div", { staticClass: "p-8 login-tabs-container" }, [
                          _c("div", { staticClass: "vx-card__title mb-4" }, [
                            _c("h4", { staticClass: "mb-4" }, [
                              _vm._v("Login")
                            ]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "Welcome back, please login to your account."
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  name: "email",
                                  "icon-no-border": "",
                                  icon: "icon icon-user",
                                  "icon-pack": "feather",
                                  "label-placeholder": "Email"
                                },
                                nativeOn: {
                                  keyup: function($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      _vm._k(
                                        $event.keyCode,
                                        "enter",
                                        13,
                                        $event.key,
                                        "Enter"
                                      )
                                    ) {
                                      return null
                                    }
                                    return _vm.login($event)
                                  }
                                },
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
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "py-1 text-sm text-red-400"
                                    },
                                    [_vm._v(_vm._s(_vm.errorData.email[0]))]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c("vs-input", {
                                staticClass: "w-full mt-6",
                                attrs: {
                                  icon: _vm.showPass
                                    ? "icon icon-eye"
                                    : "icon icon-eye-off",
                                  type: _vm.showPass ? "text" : "password",
                                  "icon-pack": "feather",
                                  "label-placeholder": "Password",
                                  name: "password",
                                  "icon-no-border": "",
                                  "icon-after": "true"
                                },
                                on: {
                                  "icon-click": function($event) {
                                    _vm.showPass = !_vm.showPass
                                  }
                                },
                                nativeOn: {
                                  keyup: function($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      _vm._k(
                                        $event.keyCode,
                                        "enter",
                                        13,
                                        $event.key,
                                        "Enter"
                                      )
                                    ) {
                                      return null
                                    }
                                    return _vm.login($event)
                                  }
                                },
                                model: {
                                  value: _vm.password,
                                  callback: function($$v) {
                                    _vm.password = $$v
                                  },
                                  expression: "password"
                                }
                              }),
                              _vm._v(" "),
                              _vm.errorData.password
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "py-1 text-sm text-red-400"
                                    },
                                    [_vm._v(_vm._s(_vm.errorData.password[0]))]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.errorData.fail
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "py-1 text-sm text-red-400"
                                    },
                                    [_vm._v(_vm._s(_vm.errorData.fail[0]))]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex flex-wrap justify-between my-5"
                                },
                                [
                                  _c(
                                    "vs-checkbox",
                                    {
                                      staticClass: "mb-3",
                                      model: {
                                        value: _vm.remember,
                                        callback: function($$v) {
                                          _vm.remember = $$v
                                        },
                                        expression: "remember"
                                      }
                                    },
                                    [_vm._v("Remember Me")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "router-link",
                                    { attrs: { to: "/forgot-password" } },
                                    [_vm._v("Forgot Password?")]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "pb-12" },
                                [
                                  _c(
                                    "vs-button",
                                    {
                                      staticClass: "float-right",
                                      attrs: {
                                        disabled:
                                          !_vm.validateForm || _vm.btnDisabled
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.login()
                                        }
                                      }
                                    },
                                    [_vm._v("Login")]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ])
                      ]
                    )
                  ]
                )
              ]
            )
          ])
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/images/pages/login.png":
/*!*************************************************!*\
  !*** ./resources/assets/images/pages/login.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/login.png?d814adb752d2d047b8292d6de603025f";

/***/ }),

/***/ "./resources/js/src/views/auth/Login.vue":
/*!***********************************************!*\
  !*** ./resources/js/src/views/auth/Login.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_d9ffc4a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=d9ffc4a8& */ "./resources/js/src/views/auth/Login.vue?vue&type=template&id=d9ffc4a8&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/src/views/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_d9ffc4a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_d9ffc4a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/auth/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/auth/Login.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/src/views/auth/Login.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/auth/Login.vue?vue&type=template&id=d9ffc4a8&":
/*!******************************************************************************!*\
  !*** ./resources/js/src/views/auth/Login.vue?vue&type=template&id=d9ffc4a8& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_d9ffc4a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=d9ffc4a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/auth/Login.vue?vue&type=template&id=d9ffc4a8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_d9ffc4a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_d9ffc4a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);