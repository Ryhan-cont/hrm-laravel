(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/UserCreate.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-advanced-cropper */ "./node_modules/vue-advanced-cropper/dist/index.es.js");
/* harmony import */ var vue_jstree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-jstree */ "./node_modules/vue-jstree/dist/vue-jstree.js");
/* harmony import */ var vue_jstree__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vue_jstree__WEBPACK_IMPORTED_MODULE_5__);


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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_3___default.a,
    Cropper: vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_4__["Cropper"],
    VJstree: vue_jstree__WEBPACK_IMPORTED_MODULE_5___default.a
  },
  props: {},
  data: function data() {
    return {
      showDateOnPreview: false,
      permissionView: false,
      // to showing permission, make it true;
      hideDesignation: true,
      hidePayroll: true,
      hideAssetPackage: true,
      hideCalenderMessage: true,
      hideJobDescription: true,
      hideLeavePackage: true,
      hideEmployeeType: true,
      hideTree: true,
      hideRole: true,
      previewProfile: false,
      modalTitle: '',
      showPass: false,
      showCalender: false,
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
      roleData: [],
      RoleName: "",
      makeHidden: true,
      selectedRole: {
        value: null,
        label: ''
      },
      permissionsManager: [],
      userData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        emp_id: ''
      },
      designationData: [],
      designation: {
        id: null,
        label: '',
        type: ''
      },
      assetPackage: {
        value: null,
        label: '',
        type: ''
      },
      assetPackageData: [],
      assetData: [],
      leaveData: [],
      leavePackage: {
        value: null,
        label: '',
        type: ''
      },
      leavePackageOption: [],
      leavePackageData: [],
      payrollData: [],
      payRoll: {
        value: null,
        label: '',
        type: ''
      },
      payrollOption: [],
      payRollData: [],
      jobDescription: {
        value: null,
        label: '',
        type: ''
      },
      jobDescriptionOption: [],
      jobDescriptionData: [],
      employeeType: {
        id: null,
        label: '',
        type: ''
      },
      employeeTypeOption: [],
      employeeTypeData: [],
      //Organization Tree
      selectedTree: [],
      organizationTree: [],
      dateRange: {
        start: '',
        end: ''
      }
    };
  },
  computed: {
    //check if both password and email have been set for enabling login button
    validateForm: function validateForm() {
      return this.old_password !== '' && this.new_password !== '' && this.new_password === this.confirm_new_password;
    },
    dateFormStart: function dateFormStart() {
      var d = this.dateRange.start;
      var ye = new Intl.DateTimeFormat('en', {
        year: 'numeric'
      }).format(d);
      var mo = new Intl.DateTimeFormat('en', {
        month: 'short'
      }).format(d);
      var da = new Intl.DateTimeFormat('en', {
        day: '2-digit'
      }).format(d);
      var ee = "".concat(da, "-").concat(mo, "-").concat(ye);
      return ee;
    },
    dateFormEnd: function dateFormEnd() {
      var d = this.dateRange.end;
      var ye = new Intl.DateTimeFormat('en', {
        year: 'numeric'
      }).format(d);
      var mo = new Intl.DateTimeFormat('en', {
        month: 'short'
      }).format(d);
      var da = new Intl.DateTimeFormat('en', {
        day: '2-digit'
      }).format(d);
      var ee = "".concat(da, "-").concat(mo, "-").concat(ye);
      return ee;
    }
  },
  mounted: function mounted() {
    this.loadData();
    this.orgTree();
  },
  methods: {
    chkData: function chkData() {
      this.loadData();
    },
    checkEmployeeType: function checkEmployeeType(data) {
      if (data.id === 16) {
        this.showCalender = true;
        this.showDateOnPreview = true;
      } else {
        this.showCalender = false;
        this.showDateOnPreview = false;
      }
    },
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
    validateStep: function validateStep(step) {
      if (step === 'step1') {
        var t = this.userData.first_name !== '' && this.userData.last_name !== '' && this.userData.email !== '' && this.userData.phone !== '' && this.userData.emp_id !== '' && this.selectedRole.value !== null;

        if (this.selectedRole.value == null) {
          this.hideRole = false;
        }

        if (t === true) {
          return true;
        } else {
          var data = {
            first_name: this.userData.first_name,
            last_name: this.userData.last_name,
            selectedRole: null,
            email: this.userData.email,
            phone: this.userData.phone,
            emp_id: this.userData.emp_id
          };
          this.validateInput(data);
          return false;
        }
      } else if (step === 'step2') {
        var dt = this.employeeType.id === 16 && this.dateRange.start === '' && this.dateRange.end === '';

        var _t = this.designation.id !== null && this.payRoll.value !== null && this.jobDescription.value !== null && this.leavePackage.value !== null && this.employeeType.id !== null && this.assetPackage.value !== null;

        if (_t === true && dt === false) {
          return true;
        } else {
          if (this.dateRange.start === '' || this.dateRange.end === '') {
            this.showValidation('date');
          }

          if (this.designation.id === null) {
            this.showValidation('designation');
          }

          if (this.payRoll.value == null) {
            this.showValidation('pay_roll');
          }

          if (this.jobDescription.value == null) {
            this.showValidation('job_description');
          }

          if (this.leavePackage.value == null) {
            this.showValidation('leave_package');
          }

          if (this.employeeType.id == null) {
            this.showValidation('employee_type');
          }

          if (this.assetPackage.value == null) {
            this.showValidation('asset_package');
          }

          return false;
        }
      } else if (step === 'step3') {
        if (this.selectedTree.id !== undefined) {
          this.inputModal();
          return true;
        }

        if (this.selectedTree.id === undefined) {
          this.hideTree = false;
        }

        return false;
      }

      return true;
    },
    loadData: function loadData() {
      var _this2 = this;

      this.$http.get('/api/user-create/data').then(function (response) {
        //@todo turn it off from back-end also
        //this.organizationTree = response.data.organizationTree;
        _this2.roleData = response.data.roleData;
        _this2.leavePackageData = response.data.leaveData;
        _this2.assetPackageData = response.data.assetData;
        _this2.payRollData = response.data.payrollData;
        _this2.jobDescriptionData = response.data.jobDescriptionData;
        _this2.designationData = response.data.designationData;
        _this2.employeeTypeData = response.data.employeeTypeData;
      })["catch"](function (error) {
        _this2.notificationAlert(error.response);
      });
    },
    //Load Organization Tree
    orgTree: function orgTree() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var req, organizationList;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('/api/organization-tree/data');

              case 3:
                req = _context.sent;
                organizationList = req.data;

                if (organizationList.constructor === Array) {
                  _this3.organizationTree = organizationList;
                } else {
                  _this3.organizationTree = [];
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                _this3.notificationAlert(_context.t0.response);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    treeItemClick: function treeItemClick(node, item, e) {
      this.selectedTree = item;

      var organizationTree = _.cloneDeep(this.organizationTree);

      this.organizationTree = organizationTree;
      this.hideTree = true;
    },
    hideValidation: function hideValidation(name) {
      console.log(name);

      switch (name) {
        case 'date':
          this.hideCalenderMessage = true;
          break;

        case 'designation':
          this.hideDesignation = true;
          break;

        case 'pay_roll':
          this.hidePayroll = true;
          break;

        case 'asset_package':
          this.hideAssetPackage = true;
          break;

        case 'job_description':
          this.hideJobDescription = true;
          break;

        case 'leave_package':
          this.hideLeavePackage = true;
          break;

        case 'employee_type':
          this.hideEmployeeType = true;
          break;

        case 'roll':
          this.hideRole = true;
          break;

        default:
      }
    },
    showValidation: function showValidation(name) {
      switch (name) {
        case 'date':
          this.hideCalenderMessage = false;
          break;

        case 'designation':
          this.hideDesignation = false;
          break;

        case 'pay_roll':
          this.hidePayroll = false;
          break;

        case 'asset_package':
          this.hideAssetPackage = false;
          break;

        case 'job_description':
          this.hideJobDescription = false;
          break;

        case 'leave_package':
          this.hideLeavePackage = false;
          break;

        case 'employee_type':
          this.hideEmployeeType = false;
          break;

        default:
      }
    },
    inputModal: function inputModal() {
      this.previewProfile = !this.previewProfile;
    },
    roleSelected: function roleSelected() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var selectedRoleId, data, req, selectedRole;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this4.makeHidden = true;
                selectedRoleId = _this4.selectedRole.value;
                _this4.RoleName = _this4.selectedRole.label;
                data = {
                  id: selectedRoleId
                };
                _context2.prev = 4;
                _context2.next = 7;
                return axios.post('/api/user-create/data/role', data);

              case 7:
                req = _context2.sent;
                selectedRole = req.data;
                _this4.permissionsManager = selectedRole;
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                console.log(_context2.t0);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 12]]);
      }))();
    },
    create: function create() {
      var _this5 = this;

      this.btnDisabled = true;
      var formData = new FormData();

      if (this.selectedTree != null) {
        var selectedTree = this.selectedTree.organizationid;
      } else {
        var _selectedTree = null;
      }

      var data = {
        first_name: this.userData.first_name,
        last_name: this.userData.last_name,
        emp_id: this.userData.emp_id,
        email: this.userData.email,
        password: this.userData.password,
        phone: this.userData.phone,
        role: this.selectedRole.value,
        permissions: this.permissionsManager,
        hasFile: ['logoData', 'verificationIdFile'],
        logoData: this.logoData,
        selectedTree: this.selectedTree,
        designation: this.designation,
        payRoll: this.payRoll,
        leavePackage: this.leavePackage,
        assetPackage: this.assetPackage,
        jobDescription: this.jobDescription,
        employeeType: this.employeeType,
        contract_date: this.dateRange
      };
      formFiles(data, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/user-create/data/proceed', formData).then(function (response) {
        _this5.notificationAlert(response);

        _this5.previewProfile = !_this5.previewProfile;

        _this5.$router.push('/user-list');
      })["catch"](function (error) {
        _this5.notificationAlert(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatar-col {\n  width: 10rem;\n}\n.con-vs-popup .vs-popup {\n  width: 60% !important;\n  height: auto !important;\n}\n.page-user-view table td {\n  vertical-align: top;\n  min-width: 80px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (max-width: 370px) {\n.page-user-view table:not(.permissions-table) td {\n    display: block;\n}\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserCreate.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=template&id=cf261bfa&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/UserCreate.vue?vue&type=template&id=cf261bfa& ***!
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
                title: "Create User",
                subtitle: "Please complete all the steps",
                disabled: _vm.btnDisabled,
                finishButtonText: "Preview"
              },
              on: {
                "on-complete": function($event) {
                  return _vm.validateStep("step3")
                }
              }
            },
            [
              _c(
                "tab-content",
                {
                  attrs: {
                    title: "Login Info",
                    icon: "feather icon-user",
                    "before-change": function() {
                      return _vm.validateStep("step1")
                    }
                  }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "button-wrapper bg-gray-200 cursor-pointer",
                      staticStyle: {
                        width: "150px",
                        height: "150px",
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
                    [
                      _vm._v(
                        "Upload User Profile\n                    picture\n                "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "vx-row" },
                    [
                      _c(
                        "div",
                        { staticClass: "vx-col md:w-1/2 w-full" },
                        [
                          _c(
                            "vs-row",
                            [
                              _c(
                                "vs-col",
                                { staticClass: "vx-col md:w-1/2 " },
                                [
                                  _c("vs-input", {
                                    staticClass: "md:w-11/12 w-full mt-4",
                                    attrs: {
                                      label: "*First Name",
                                      name: "first_name"
                                    },
                                    model: {
                                      value: _vm.userData.first_name,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.userData,
                                          "first_name",
                                          $$v
                                        )
                                      },
                                      expression: "userData.first_name"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("validate-data", {
                                    attrs: {
                                      rules: "required",
                                      value: _vm.userData.first_name,
                                      name: "first_name"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-col",
                                { staticClass: "vx-col md:w-1/2" },
                                [
                                  _c("vs-input", {
                                    staticClass: "md:w-12/12 w-full  mt-4",
                                    attrs: {
                                      label: "*Last Name",
                                      name: "last_name"
                                    },
                                    model: {
                                      value: _vm.userData.last_name,
                                      callback: function($$v) {
                                        _vm.$set(_vm.userData, "last_name", $$v)
                                      },
                                      expression: "userData.last_name"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("validate-data", {
                                    attrs: {
                                      rules: "required",
                                      value: _vm.userData.last_name,
                                      name: "last_name"
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
                            staticClass: "w-full mt-4",
                            attrs: { label: "Employee ID", name: "emp_id" },
                            model: {
                              value: _vm.userData.emp_id,
                              callback: function($$v) {
                                _vm.$set(_vm.userData, "emp_id", $$v)
                              },
                              expression: "userData.emp_id"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.userData.emp_id,
                              name: "emp_id"
                            }
                          }),
                          _vm._v(" "),
                          _c("vs-input", {
                            staticClass: "w-full mt-4",
                            attrs: {
                              label: "* Email",
                              type: "email",
                              name: "email"
                            },
                            model: {
                              value: _vm.userData.email,
                              callback: function($$v) {
                                _vm.$set(_vm.userData, "email", $$v)
                              },
                              expression: "userData.email"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required|email",
                              value: _vm.userData.email,
                              name: "email"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "vx-col md:w-1/2 w-full" },
                        [
                          _c(
                            "div",
                            { staticClass: "mt-4" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full",
                                  attrs: {
                                    placeholder: "Role",
                                    label: "Role",
                                    autocomplete: ""
                                  },
                                  on: {
                                    input: function($event) {
                                      _vm.roleSelected(),
                                        _vm.hideValidation("roll")
                                    }
                                  },
                                  model: {
                                    value: _vm.selectedRole,
                                    callback: function($$v) {
                                      _vm.selectedRole = $$v
                                    },
                                    expression: "selectedRole"
                                  }
                                },
                                _vm._l(_vm.roleData, function(item, index) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: { value: item, text: item.label }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hideRole }
                                },
                                [
                                  _c("div", [
                                    _c("div", [
                                      _vm._v("The role field is required")
                                    ])
                                  ])
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("vs-input", {
                            staticClass: "w-full mt-5",
                            attrs: { label: "Phone", name: "phone" },
                            model: {
                              value: _vm.userData.phone,
                              callback: function($$v) {
                                _vm.$set(_vm.userData, "phone", $$v)
                              },
                              expression: "userData.phone"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.userData.phone,
                              name: "phone"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.permissionView
                        ? _c(
                            "vx-card",
                            {
                              staticClass: "mt-base",
                              attrs: { "no-shadow": "" }
                            },
                            [
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
                                          attrs: {
                                            svgClasses: "w-6 h-6",
                                            icon: "LockIcon"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            staticClass:
                                              "font-medium text-lg leading-none"
                                          },
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
                              _c(
                                "div",
                                { staticClass: "block overflow-x-auto" },
                                [
                                  _c(
                                    "table",
                                    { staticClass: "w-full" },
                                    _vm._l(_vm.permissionsManager, function(
                                      val,
                                      index
                                    ) {
                                      return _c(
                                        "tr",
                                        { key: index },
                                        [
                                          _c(
                                            "td",
                                            { staticClass: "px-3 py-2" },
                                            [_vm._v(_vm._s(val.name))]
                                          ),
                                          _vm._v(" "),
                                          _vm._l(val.subpermissions, function(
                                            permission,
                                            permIndex
                                          ) {
                                            return _c(
                                              "td",
                                              {
                                                key: permIndex,
                                                staticClass: "px-3 py-2"
                                              },
                                              [
                                                _c(
                                                  "vs-checkbox",
                                                  {
                                                    model: {
                                                      value: permission.status,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          permission,
                                                          "status",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "permission.status"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(permission.title) +
                                                        "\n                                        "
                                                    )
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          })
                                        ],
                                        2
                                      )
                                    }),
                                    0
                                  )
                                ]
                              )
                            ]
                          )
                        : _vm._e()
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
                    icon: "feather icon-package",
                    "before-change": function() {
                      return _vm.validateStep("step2")
                    }
                  }
                },
                [
                  _c("div", { staticClass: "py-10" }, [
                    _c(
                      "div",
                      {
                        staticClass: "vx-row",
                        staticStyle: { "min-height": "300px" }
                      },
                      [
                        _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
                          _c(
                            "div",
                            { staticClass: "mt-4 pt-1" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full",
                                  attrs: {
                                    autocomplete: "",
                                    placeholder: "Designation",
                                    label: "Designation",
                                    name: "designation"
                                  },
                                  on: {
                                    input: function($event) {
                                      return _vm.hideValidation("designation")
                                    }
                                  },
                                  model: {
                                    value: _vm.designation,
                                    callback: function($$v) {
                                      _vm.designation = $$v
                                    },
                                    expression: "designation"
                                  }
                                },
                                _vm._l(_vm.designationData, function(
                                  item,
                                  index
                                ) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: { value: item, text: item.label }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hideDesignation }
                                },
                                [
                                  _c("div", [
                                    _c("div", [
                                      _vm._v(
                                        "The designation field is required."
                                      )
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
                            { staticClass: "mt-4 pt-1" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full",
                                  attrs: {
                                    autocomplete: "",
                                    placeholder: "Job description",
                                    label: "Job description"
                                  },
                                  on: {
                                    input: function($event) {
                                      return _vm.hideValidation(
                                        "job_description"
                                      )
                                    }
                                  },
                                  model: {
                                    value: _vm.jobDescription,
                                    callback: function($$v) {
                                      _vm.jobDescription = $$v
                                    },
                                    expression: "jobDescription"
                                  }
                                },
                                _vm._l(_vm.jobDescriptionData, function(
                                  item,
                                  index
                                ) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: {
                                      value: item,
                                      text: item.label,
                                      name: "job_description"
                                    }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hideJobDescription }
                                },
                                [
                                  _c("div", [
                                    _c("div", [
                                      _vm._v(
                                        "The job description field is required."
                                      )
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
                            { staticClass: "mt-4 pt-1" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full",
                                  attrs: {
                                    autocomplete: "",
                                    placeholder: "Employee Type",
                                    label: "Employee Type",
                                    name: "job_description"
                                  },
                                  on: {
                                    input: function($event) {
                                      _vm.hideValidation("employee_type"),
                                        _vm.checkEmployeeType(_vm.employeeType)
                                    }
                                  },
                                  model: {
                                    value: _vm.employeeType,
                                    callback: function($$v) {
                                      _vm.employeeType = $$v
                                    },
                                    expression: "employeeType"
                                  }
                                },
                                _vm._l(_vm.employeeTypeData, function(
                                  item,
                                  index
                                ) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: { value: item, text: item.label }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hideEmployeeType }
                                },
                                [
                                  _c("div", [
                                    _c("div", [
                                      _vm._v(
                                        "The employee type field is required."
                                      )
                                    ])
                                  ])
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.showCalender
                            ? _c(
                                "div",
                                { staticClass: "mt-4 pt-1" },
                                [
                                  _c("v-date-picker", {
                                    attrs: {
                                      "is-range": "",
                                      color: "purple",
                                      masks: { input: "YYYY-MM-DD" },
                                      "min-date": new Date()
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.hideValidation("date")
                                      }
                                    },
                                    scopedSlots: _vm._u(
                                      [
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
                                                      icon:
                                                        "icon icon-calendar",
                                                      label: "Date Range",
                                                      value:
                                                        inputValue.start +
                                                        " - " +
                                                        inputValue.end
                                                    }
                                                  },
                                                  inputEvents.start
                                                )
                                              )
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      false,
                                      59100392
                                    ),
                                    model: {
                                      value: _vm.dateRange,
                                      callback: function($$v) {
                                        _vm.dateRange = $$v
                                      },
                                      expression: "dateRange"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "py-1 text-sm text-red-400",
                                      attrs: { hidden: _vm.hideCalenderMessage }
                                    },
                                    [
                                      _c("div", [
                                        _c("div", [
                                          _vm._v(
                                            "The date range field is required."
                                          )
                                        ])
                                      ])
                                    ]
                                  )
                                ],
                                1
                              )
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
                          _c(
                            "div",
                            { staticClass: "mt-4 pt-1" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full",
                                  attrs: {
                                    autocomplete: "",
                                    placeholder: "Payroll Package",
                                    label: "Payroll Package",
                                    name: "pay_roll"
                                  },
                                  on: {
                                    input: function($event) {
                                      return _vm.hideValidation("pay_roll")
                                    }
                                  },
                                  model: {
                                    value: _vm.payRoll,
                                    callback: function($$v) {
                                      _vm.payRoll = $$v
                                    },
                                    expression: "payRoll"
                                  }
                                },
                                _vm._l(_vm.payRollData, function(item, index) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: { value: item, text: item.label }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hidePayroll }
                                },
                                [
                                  _c("div", [
                                    _c("div", [
                                      _vm._v("The payroll field is required.")
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
                            { staticClass: "mt-4 pt-1" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full",
                                  attrs: {
                                    autocomplete: "",
                                    placeholder: "Leave package",
                                    label: "Leave Package",
                                    name: "leave_package"
                                  },
                                  on: {
                                    input: function($event) {
                                      return _vm.hideValidation("leave_package")
                                    }
                                  },
                                  model: {
                                    value: _vm.leavePackage,
                                    callback: function($$v) {
                                      _vm.leavePackage = $$v
                                    },
                                    expression: "leavePackage"
                                  }
                                },
                                _vm._l(_vm.leavePackageData, function(
                                  item,
                                  index
                                ) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: { value: item, text: item.label }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hideLeavePackage }
                                },
                                [
                                  _c("div", [
                                    _c("div", [
                                      _vm._v(
                                        "The leave package field is required."
                                      )
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
                            { staticClass: "mt-4 pt-1" },
                            [
                              _c(
                                "vs-select",
                                {
                                  staticClass: "w-full",
                                  attrs: {
                                    autocomplete: "",
                                    placeholder: "Asset Package",
                                    label: "Asset Package",
                                    name: "asset_package"
                                  },
                                  on: {
                                    input: function($event) {
                                      return _vm.hideValidation("asset_package")
                                    }
                                  },
                                  model: {
                                    value: _vm.assetPackage,
                                    callback: function($$v) {
                                      _vm.assetPackage = $$v
                                    },
                                    expression: "assetPackage"
                                  }
                                },
                                _vm._l(_vm.assetPackageData, function(
                                  item,
                                  index
                                ) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: { value: item, text: item.label }
                                  })
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "py-1 text-sm text-red-400",
                                  attrs: { hidden: _vm.hideAssetPackage }
                                },
                                [
                                  _c("div", [
                                    _c("div", [
                                      _vm._v(
                                        "The asset package field is required."
                                      )
                                    ])
                                  ])
                                ]
                              )
                            ],
                            1
                          )
                        ])
                      ]
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "tab-content",
                {
                  attrs: {
                    label: "Organization Tree",
                    title: "Organization Tree",
                    icon: "feather icon-git-pull-request"
                  }
                },
                [
                  _c(
                    "div",
                    [
                      _c("v-jstree", {
                        attrs: {
                          data: _vm.organizationTree,
                          size: "large",
                          "show-checkbox": ""
                        },
                        on: { "item-click": _vm.treeItemClick }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "py-1 text-sm text-red-400",
                      attrs: { hidden: _vm.hideTree }
                    },
                    [
                      _c("div", [
                        _c("div", [_vm._v("Select tree is required")])
                      ])
                    ]
                  )
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
                  "stencil-props": { aspectRatio: 1 / 1 }
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
      ),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: {
            mediumscreen: "",
            title: "Preview",
            active: _vm.previewProfile
          },
          on: {
            "update:active": function($event) {
              _vm.previewProfile = $event
            }
          }
        },
        [
          _c(
            "vx-card",
            { staticClass: "mb-base", attrs: { title: "" } },
            [
              _c(
                "vs-row",
                [
                  _c(
                    "vs-col",
                    {
                      staticClass: "vx-col md:w-4/12 w-full",
                      attrs: { "vs-justify": "center", "vs-align": "center" }
                    },
                    [
                      _c("vs-avatar", {
                        attrs: { size: "100px", src: _vm.logoPreviewImage }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "vs-col",
                    {
                      staticClass: "vx-col md:w-4/12  w-full",
                      attrs: { "vs-justify": "center", "vs-align": "center" }
                    },
                    [
                      _c("table", [
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("First Name")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(": " + _vm._s(_vm.userData.first_name))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Last Name")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(": " + _vm._s(_vm.userData.last_name))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Employee ID")
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(": " + _vm._s(_vm.userData.emp_id))])
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "vs-col",
                    {
                      staticClass: "vx-col md:w-4/12  w-full",
                      attrs: { "vs-justify": "center", "vs-align": "center" }
                    },
                    [
                      _c("table", [
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Role")
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(": " + _vm._s(_vm.RoleName))])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Email")
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(": " + _vm._s(_vm.userData.email))])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Phone")
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(": " + _vm._s(_vm.userData.phone))])
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
            "vx-card",
            { staticClass: "mb-base" },
            [
              _c("vs-row", [
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
                          attrs: { svgClasses: "w-6 h-6", icon: "GridIcon" }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "font-medium text-lg leading-none" },
                          [_vm._v("Organization Information")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("vs-divider")
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col flex-1 page-user-view" }, [
                  _c("table", [
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Employee Type")
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(": " + _vm._s(_vm.employeeType.label))])
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Leave Package")
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(": " + _vm._s(_vm.leavePackage.label))])
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Job Description")
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(": " + _vm._s(_vm.jobDescription.label))
                      ])
                    ]),
                    _vm._v(" "),
                    _vm.showDateOnPreview
                      ? _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Contract Date")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              ": " +
                                _vm._s(_vm.dateFormStart) +
                                " to " +
                                _vm._s(_vm.dateFormEnd)
                            )
                          ])
                        ])
                      : _vm._e()
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col flex-1 page-user-view" }, [
                  _c("table", [
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Payroll Package")
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(": " + _vm._s(_vm.payRoll.label))])
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Asset Package")
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(": " + _vm._s(_vm.assetPackage.label))])
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Designation")
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(": " + _vm._s(_vm.designation.label))])
                    ])
                  ])
                ])
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "vx-card",
            [
              _c("vs-row", [
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
                          attrs: { svgClasses: "w-6 h-6", icon: "GridIcon" }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "font-medium text-lg leading-none" },
                          [_vm._v("Organization Tree Information")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("vs-divider")
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col flex-1 page-user-view" }, [
                  _c("table", [
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Position in Tree")
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(": " + _vm._s(_vm.selectedTree.text))])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col flex-1 page-user-view" }, [
                  _c("table", [
                    _c("tr", [
                      _c("td", { staticClass: "font-semibold" }, [
                        _vm._v("Type")
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(": " + _vm._s(_vm.selectedTree.name))])
                    ])
                  ])
                ])
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mt-3" }),
          _vm._v(" "),
          _c(
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
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/user/UserCreate.vue":
/*!********************************************************!*\
  !*** ./resources/js/src/views/app/user/UserCreate.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserCreate_vue_vue_type_template_id_cf261bfa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserCreate.vue?vue&type=template&id=cf261bfa& */ "./resources/js/src/views/app/user/UserCreate.vue?vue&type=template&id=cf261bfa&");
/* harmony import */ var _UserCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserCreate.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/UserCreate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserCreate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserCreate.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserCreate_vue_vue_type_template_id_cf261bfa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserCreate_vue_vue_type_template_id_cf261bfa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/UserCreate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/UserCreate.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/src/views/app/user/UserCreate.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserCreate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserCreate.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/UserCreate.vue?vue&type=template&id=cf261bfa&":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/UserCreate.vue?vue&type=template&id=cf261bfa& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_template_id_cf261bfa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserCreate.vue?vue&type=template&id=cf261bfa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/UserCreate.vue?vue&type=template&id=cf261bfa&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_template_id_cf261bfa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserCreate_vue_vue_type_template_id_cf261bfa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);