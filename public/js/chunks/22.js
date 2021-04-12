(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      isUser: true,
      tableData: [],
      viewModal: false,
      coc_id: null,
      moduleData: [],
      inputModalSt: false,
      modalTitle: null,
      modalType: null,
      last_update: null,
      id: null,
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
      cocData: [],
      coc: null,
      coc_name: null,
      selectedCategory: '',
      categoryList: [],
      categoryItemList: [],
      selectedItem: '',
      groupList: [],
      selectedGroup: '',
      document: {
        hasFile: ['Attachment'],
        Attachment: null,
        attachmentName: null
      },
      attachmentUrl: null,
      attachment: null,
      download: false
    };
  },
  mounted: function mounted() {},
  computed: {},
  methods: {
    pdfDownload: function pdfDownload() {
      var mywindow = window.open('', 'PRINT', 'height=600,width=900');
      mywindow.document.write('<html><head><title>' + document.title + '</title>');
      mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + document.title + '</h1>');
      mywindow.document.write(document.getElementById('content').innerHTML);
      mywindow.document.write('</body></html>');
      mywindow.document.close();
      mywindow.focus();
      mywindow.print();
      setTimeout(function () {
        mywindow.close();
      }, 1000);
    },
    fetchData: function fetchData() {
      var _this = this;

      axios.get('/api/coc-maintain/data').then(function (response) {
        _this.cocData = response.data.infos;
        _this.attachmentUrl = response.data.attachmentUrl;
        _this.isUser = response.data.isUser;
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    inputModal: function inputModal(type) {
      var _this2 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.modalType = type;

      if (type === 'new') {
        this.categoryFetch();
        this.fetchGroup();
        this.modalTitle = 'Add New COC';
        this.coc = null;
        this.coc_id = null;
        this.coc_name = null;
        this.selectedCategory = '';
        this.selectedItem = '';
        this.selectedGroup = '';
        this.document.attachmentName = null;
        this.inputModalSt = !this.inputModalSt;
      } else if (type === 'edit') {
        this.categoryFetch();
        this.fetchItem(data.category_id);
        this.fetchGroup();
        this.modalTitle = 'Edit COC';
        this.coc_id = data.id;
        this.coc = data.coc;
        this.document.attachmentName = data.attachment;
        this.coc_name = data.coc_name;
        this.selectedCategory = data.category_id;
        this.selectedItem = data.item_id;
        this.selectedGroup = data.group_id;
        this.inputModalSt = !this.inputModalSt;
      } else if (type === 'view') {
        if (data.attachment != null) {
          this.download = true;
        } else {
          this.download = false;
        }

        this.modalTitle = 'View COC';
        this.coc_id = data.id;
        this.coc = data.coc;
        this.document.attachmentName = data.attachment;
        this.coc_name = data.coc_name;
        this.selectedCategory = data.category_name;
        this.selectedItem = data.item_name;
        this.selectedGroup = data.group_name;
        this.last_update = data.last_update;
        this.viewModal = !this.viewModal;
      } else if (type === 'download') {
        this.viewModal = !this.viewModal;
        this.modalTitle = 'View COC';
        this.coc_id = data.id;
        this.coc = data.coc;
        this.document.attachmentName = data.attachment;
        this.coc_name = data.coc_name;
        this.selectedCategory = data.category_name;
        this.selectedItem = data.item_name;
        this.selectedGroup = data.group_name;
        setTimeout(function () {
          return _this2.pdfDownload();
        }, this.viewModal = !this.viewModal, 1000);
      }
    },
    attachmentInput: function attachmentInput() {
      var _this3 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this3.document.Attachment = input.files[0];
          _this3.document.attachmentName = input.files[0].name;
        }
      };
    },
    fetchItem: function fetchItem(category_id) {
      var _this4 = this;

      this.selectedItem = null;
      var data = {
        parent_id: category_id,
        dropdown_id: this.$constants.CONST_COC_ITEMS
      };
      axios.post('/api/dropdown/data/category-list', data).then(function (response) {
        _this4.categoryItemList = response.data.items;
      })["catch"](function (err) {
        _this4.notificationAlert(err.response);
      });
    },
    fetchGroup: function fetchGroup() {
      var _this5 = this;

      axios.get('/api/wf-process-defs/list/work-group').then(function (response) {
        _this5.groupList = response.data.data;
      })["catch"](function (err) {
        _this5.notificationAlert(err.response);
      });
    },
    categoryFetch: function categoryFetch() {
      var _this6 = this;

      var data = {
        parent_id: 0,
        dropdown_id: this.$constants.CONST_COC_ITEMS
      };
      axios.post('/api/dropdown/data/category-list', data).then(function (response) {
        _this6.categoryList = response.data.items;
      })["catch"](function (err) {
        _this6.notificationAlert(err.response);
      });
    },
    createRequest: function createRequest() {
      var _this7 = this;

      this.btnDisabled = true;
      var data = {
        coc: this.coc,
        coc_name: this.coc_name,
        selectedCategory: this.selectedCategory,
        selectedItem: this.selectedItem,
        selectedGroup: this.selectedGroup,
        document: this.document
      };
      var formData = new FormData();
      formFiles(this.document, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/coc-maintain/create', formData).then(function (response) {
        _this7.notificationAlert(response);

        _this7.inputModalSt = !_this7.inputModalSt;

        _this7.fetchData();
      })["catch"](function (error) {
        _this7.notificationAlert(error.response);
      });
    },
    updateRequest: function updateRequest() {
      var _this8 = this;

      this.btnDisabled = true;
      var data = {
        id: this.coc_id,
        coc: this.coc,
        coc_name: this.coc_name,
        selectedCategory: this.selectedCategory,
        selectedItem: this.selectedItem,
        selectedGroup: this.selectedGroup,
        document: this.document
      };
      var formData = new FormData();
      formFiles(this.document, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/coc-maintain/update', formData).then(function (response) {
        _this8.notificationAlert(response);

        _this8.inputModalSt = !_this8.inputModalSt;

        _this8.fetchData();
      })["catch"](function (error) {
        _this8.notificationAlert(error.response);
      });
    },
    deleteProceed: function deleteProceed(data) {
      var _this9 = this;

      axios.get("/api/coc-maintain/delete/".concat(data.id)).then(function (response) {
        _this9.fetchData();

        _this9.notificationAlert(response);
      })["catch"](function (err) {
        _this9.notificationAlert(err.response);
      });
    },
    downloadAttachment: function downloadAttachment() {
      window.open(this.attachmentUrl + this.document.attachmentName);
    }
  },
  created: function created() {
    this.fetchData();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ql-editor {\n  min-height: 200px;\n}\n@media print {\n.invoice-page * {\n    visibility: hidden;\n}\n.invoice-page #content-area {\n    margin: 0 !important;\n}\n.invoice-page .vs-con-table .vs-con-tbody {\n    overflow: hidden !important;\n}\n.invoice-page #invoice-container,\n.invoice-page #invoice-container * {\n    visibility: visible;\n}\n.invoice-page #invoice-container {\n    position: absolute;\n    left: 0;\n    top: 0;\n    box-shadow: none;\n}\n}\n@page {\n  size: auto;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./COCMaintain.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=template&id=7e1a273c&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=template&id=7e1a273c& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
        _c("div", { staticClass: "flex" }, [
          _c("div", { staticClass: "flex-auto" }),
          _vm._v(" "),
          !_vm.isUser
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
                          return _vm.inputModal("new")
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
                  pagination: "",
                  search: "",
                  stripe: "",
                  data: _vm.cocData
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
                            _c("vs-td", { attrs: { data: tr.coc_name } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.coc_name) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.category_name } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.category_name) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.item_name } }, [
                              _c("div", {
                                domProps: { innerHTML: _vm._s(tr.item_name) }
                              })
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.group_name } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.group_name) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("vs-td", { attrs: { data: tr.last_update } }, [
                              _vm._v(
                                "\r\n              " +
                                  _vm._s(tr.last_update) +
                                  "\r\n            "
                              )
                            ]),
                            _vm._v(" "),
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
                                                staticClass: "flex items-center"
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
                                                _c("span", [_vm._v("View")])
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
                                                staticClass: "flex items-center"
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
                                                _c("span", [_vm._v("Download")])
                                              ],
                                              1
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        !_vm.isUser
                                          ? _c(
                                              "vs-dropdown-item",
                                              {
                                                on: {
                                                  click: function($event) {
                                                    return _vm.inputModal(
                                                      "edit",
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
                                                    _c("span", [_vm._v("Edit")])
                                                  ],
                                                  1
                                                )
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        !_vm.isUser
                                          ? _c(
                                              "vs-dropdown-item",
                                              {
                                                on: {
                                                  click: function($event) {
                                                    return _vm.actionConfirm(
                                                      tr,
                                                      _vm.deleteProceed,
                                                      "delete"
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
                    _c("vs-th", [_vm._v("COC Name")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Category")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Sub Category")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Group")]),
                    _vm._v(" "),
                    _c("vs-th", [_vm._v("Last Update")]),
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
        ),
        _vm._v(" "),
        _c(
          "vs-popup",
          {
            attrs: {
              fullscreen: "",
              title: _vm.modalTitle,
              active: _vm.viewModal
            },
            on: {
              "update:active": function($event) {
                _vm.viewModal = $event
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
                      _c("h5", [_vm._v(_vm._s(_vm.coc_name))]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "invoice__recipient-info my-4" },
                        [
                          _c("p", [_vm._v(_vm._s(_vm.selectedCategory))]),
                          _vm._v(" "),
                          _c("p", [_vm._v(_vm._s(_vm.selectedItem))])
                        ]
                      )
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
                    _c("h5", [_vm._v("COC")]),
                    _vm._v(" "),
                    _c("vs-divider"),
                    _vm._v(" "),
                    _c("span", { domProps: { innerHTML: _vm._s(_vm.coc) } }),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("span", { staticClass: "font-bold" }, [
                      _vm._v("Last Updated: " + _vm._s(_vm.last_update))
                    ])
                  ],
                  1
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
                  [
                    _c(
                      "div",
                      { staticClass: "flex items-center" },
                      [
                        _vm.download
                          ? _c(
                              "vs-button",
                              {
                                staticClass: "mb-base mr-3",
                                attrs: {
                                  type: "border",
                                  "icon-pack": "feather",
                                  icon: "icon icon-download"
                                },
                                on: { click: _vm.downloadAttachment }
                              },
                              [_vm._v("Download Attachment")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "vs-button",
                          {
                            staticClass: "mb-base mr-3",
                            attrs: {
                              "icon-pack": "feather",
                              icon: "icon icon-file"
                            },
                            on: { click: _vm.pdfDownload }
                          },
                          [_vm._v("COC Print/Download")]
                        )
                      ],
                      1
                    )
                  ]
                )
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "vs-popup",
          {
            attrs: {
              fullscreen: "",
              title: _vm.modalTitle,
              active: _vm.inputModalSt
            },
            on: {
              "update:active": function($event) {
                _vm.inputModalSt = $event
              }
            }
          },
          [
            _c("form", [
              _c("div", { staticClass: "vx-row" }, [
                _c(
                  "div",
                  {
                    staticClass: "vx-col md:w-3/12 w-full overflow-hidden pt-4"
                  },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      attrs: { label: "COC Name", placeholder: "COC Name" },
                      model: {
                        value: _vm.coc_name,
                        callback: function($$v) {
                          _vm.coc_name = $$v
                        },
                        expression: "coc_name"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.coc_name,
                        name: "coc name",
                        altName: "coc name"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "vx-col md:w-3/12 w-full overflow-hidden pt-4"
                  },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          placeholder: "Select COC Category",
                          label: "COC Category",
                          autocomplete: ""
                        },
                        on: {
                          input: function($event) {
                            return _vm.fetchItem(_vm.selectedCategory)
                          }
                        },
                        model: {
                          value: _vm.selectedCategory,
                          callback: function($$v) {
                            _vm.selectedCategory = $$v
                          },
                          expression: "selectedCategory"
                        }
                      },
                      _vm._l(_vm.categoryList, function(item, index) {
                        return _c("vs-select-item", {
                          key: index,
                          attrs: { value: item.id, text: item.name }
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
                  {
                    staticClass: "vx-col md:w-3/12 w-full overflow-hidden pt-4"
                  },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          placeholder: "Select COC Subcategory",
                          label: "COC Subcategory",
                          autocomplete: ""
                        },
                        model: {
                          value: _vm.selectedItem,
                          callback: function($$v) {
                            _vm.selectedItem = $$v
                          },
                          expression: "selectedItem"
                        }
                      },
                      _vm._l(_vm.categoryItemList, function(item, index) {
                        return _c("vs-select-item", {
                          key: index,
                          attrs: { value: item.id, text: item.name }
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
                  {
                    staticClass: "vx-col md:w-3/12 w-full overflow-hidden pt-4"
                  },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          placeholder: "Select Notification Group",
                          label: "Notification Group",
                          autocomplete: ""
                        },
                        model: {
                          value: _vm.selectedGroup,
                          callback: function($$v) {
                            _vm.selectedGroup = $$v
                          },
                          expression: "selectedGroup"
                        }
                      },
                      _vm._l(_vm.groupList, function(item, index) {
                        return _c("vs-select-item", {
                          key: index,
                          attrs: { value: item.id, text: item.name }
                        })
                      }),
                      1
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "pt-6" },
                [
                  _c("quill-editor", {
                    attrs: { options: _vm.editorOption },
                    model: {
                      value: _vm.coc,
                      callback: function($$v) {
                        _vm.coc = $$v
                      },
                      expression: "coc"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
                _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                  _vm._v("Attachment Document:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "flex" }, [
                  _c(
                    "div",
                    [
                      _c(
                        "vs-button",
                        {
                          staticClass: "ml-auto mt-2",
                          attrs: {
                            size: "small",
                            color: "gray",
                            "icon-pack": "feather",
                            icon: "icon-upload"
                          },
                          on: {
                            click: function($event) {
                              return _vm.attachmentInput()
                            }
                          }
                        },
                        [_vm._v("Upload\r\n                      ")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "pl-3 " }, [
                    _vm._v(_vm._s(_vm.document.attachmentName))
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", [
                _vm.modalType == "new"
                  ? _c(
                      "div",
                      { staticClass: "pt-1", attrs: { align: "right" } },
                      [
                        _c(
                          "vs-button",
                          {
                            attrs: { disabled: _vm.btnDisabled },
                            on: { click: _vm.createRequest }
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
                            on: { click: _vm.updateRequest }
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
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/coc/COCMaintain.vue":
/*!********************************************************!*\
  !*** ./resources/js/src/views/app/coc/COCMaintain.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _COCMaintain_vue_vue_type_template_id_7e1a273c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./COCMaintain.vue?vue&type=template&id=7e1a273c& */ "./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=template&id=7e1a273c&");
/* harmony import */ var _COCMaintain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./COCMaintain.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _COCMaintain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./COCMaintain.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _COCMaintain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _COCMaintain_vue_vue_type_template_id_7e1a273c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _COCMaintain_vue_vue_type_template_id_7e1a273c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/coc/COCMaintain.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./COCMaintain.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./COCMaintain.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=template&id=7e1a273c&":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=template&id=7e1a273c& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_template_id_7e1a273c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./COCMaintain.vue?vue&type=template&id=7e1a273c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/coc/COCMaintain.vue?vue&type=template&id=7e1a273c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_template_id_7e1a273c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_COCMaintain_vue_vue_type_template_id_7e1a273c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);