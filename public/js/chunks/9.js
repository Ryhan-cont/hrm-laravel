(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
//
//
//
//
//
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
  name: 'edu-history',
  components: {},
  props: {
    reqData: {
      "default": {}
    },
    education: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    ser: {
      "default": null
    }
  },
  data: function data() {
    return {
      defItem: {},
      editMode: false,
      userId: null,
      resultOption: ['Division', 'CGPA'],
      degreeOption: [],
      degreeData: [],
      divisionOption: [],
      divisionData: [],
      instituteData: [],
      instituteOption: [],
      passinfYearList: null
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var year, yearData, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.defItem = _.cloneDeep(_this.education);
                _this.userId = _this.reqData.userData.id;
                _this.degreeOption = _this.reqData.degreeList;
                _this.degreeData = _this.reqData.degreeData;
                _this.divisionOption = _this.reqData.divisionList;
                _this.divisionData = _this.reqData.divisionData;
                _this.instituteData = _this.reqData.instituteData;
                _this.instituteOption = _this.reqData.instituteList;
                year = new Date().getFullYear() - 80;
                yearData = [];

                for (i = 0; 80 > i; i++) {
                  yearData.unshift(year + i);
                }

                _this.passinfYearList = yearData;

                if (_this.defItem.division) {
                  _this.defItem.division = _.filter(_this.divisionData, {
                    id: Number(_this.defItem.division)
                  })[0].value;
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    manageEducation: function manageEducation(type, data) {
      if (type == 'resultType') {
        if (data.resultType != null) {
          if (data.resultType.toLowerCase() == 'division') {
            this.education.viewDivision = true;
            this.education.viewCgpa = false;
          } else if (data.resultType.toLowerCase() == 'cgpa') {
            this.education.viewDivision = false;
            this.education.viewCgpa = true;
          }
        }
      } else if (type == 'degreeType') {
        if (data.degreeName != null) {
          if (data.degreeName.toLowerCase() == 'undergraduate' || data.degreeName.toLowerCase() == 'postgraduate' || data.degreeName.toLowerCase() == 'phd') {
            this.education.viewInstituteSelect = true;
            this.education.viewInstituteinput = false;
          } else {
            this.education.viewInstituteSelect = false;
            this.education.viewInstituteinput = true;
          }
        }
      } else if (type == 'otherInstitute') {
        if (data.instituteNameSelect != null) {
          if (data.instituteNameSelect.toLowerCase() == 'others') {
            this.education.viewInstituteSelect = true;
            this.education.viewInstituteinput = true;
          } else {
            this.education.viewInstituteSelect = true;
            this.education.viewInstituteinput = false;
            this.education.instituteName = data.instituteNameSelect;
          }
        }
      }
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.education.certificateAttachment = input.files[0];
          _this2.education.attachmentName = input.files[0].name;
        }
      };
    },
    deleteEdu: function deleteEdu(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this education information?',
        acceptText: 'ok',
        accept: this.deleteDataProceed,
        parameters: deldata
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this3 = this;

      var data = {
        id: Deldata
      };
      axios.post('/api/user-edit/data/education-history-delete', data).then(function (response) {
        _this3.notificationAlert(response);

        _this3.$parent.$parent.$parent.$parent.loadData();
      })["catch"](function (error) {
        _this3.notificationAlert(error.response);
      });
    },
    saveData: function saveData() {
      var _this4 = this;

      this.btnDisabled = true;
      this.education.userId = this.userId;
      var formData = new FormData();
      formFiles(this.education, formData);
      formData.append('data', JSON.stringify(this.education));
      axios.post('/api/user-edit/data/education-history-update', formData).then(function (response) {
        _this4.notificationAlert(response);

        _this4.$parent.$parent.$parent.$parent.loadData();

        _this4.editMode = false;
        _this4.btnDisabled = false;
      })["catch"](function (error) {
        _this4.errorData = error.response.data.errors;

        _this4.notificationAlert(error.response);

        _this4.btnDisabled = false;
      });
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'employee-document',
  components: {},
  data: function data() {
    return {
      defItem: {},
      userId: null,
      documentTitle: [],
      documentData: [],
      editMode: false
    };
  },
  props: {
    reqData: {
      "default": {}
    },
    doc: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    ser: {
      "default": null
    }
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.defItem = _.cloneDeep(_this.doc);
                _this.userId = _this.reqData.userData.id;

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.doc.documentAttachment = input.files[0];
          _this2.defItem.savedFileName = input.files[0].name;
        }
      };
    },
    deleteNominee: function deleteNominee(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this document?',
        acceptText: 'ok',
        accept: this.deleteDataProceed,
        parameters: deldata
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this3 = this;

      var data = {
        id: Deldata
      };
      axios.post('/api/user-edit/data/employee-document-delete', data).then(function (response) {
        _this3.$parent.$parent.$parent.$parent.loadData();

        _this3.notificationAlert(response);
      })["catch"](function (e) {
        _this3.notificationAlert(e.response);

        _this3.btnDisabled = false;
      });
    },
    saveData: function saveData() {
      var _this4 = this;

      this.btnDisabled = true;
      this.doc.document_title = this.defItem.document_title;
      var formData = new FormData();
      formFiles(this.doc, formData);
      formData.append('data', JSON.stringify(this.doc));
      axios.post('/api/user-edit/data/employee-document-update', formData).then(function (response) {
        _this4.$parent.$parent.$parent.$parent.loadData();

        _this4.notificationAlert(response);

        _this4.editMode = false;
        _this4.btnDisabled = false;
      })["catch"](function (e) {
        _this4.notificationAlert(e.response);

        _this4.btnDisabled = false;
      });
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'feature-info',
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {
      defItem: {},
      feature: {},
      id: null,
      editMode: false,
      designation: null,
      designationOption: [],
      designationData: [],
      payRoll: null,
      payrollOption: [],
      payRollData: [],
      leavePackage: null,
      leavePackageOption: [],
      leavePackageData: [],
      assetPackage: null,
      assetPackageOption: [],
      assetPackageData: [],
      jobDescription: null,
      jobDescriptionOption: [],
      jobDescriptionData: [],
      employeeType: null,
      employeeTypeOption: [],
      employeeTypeData: []
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var defItem;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                defItem = _.cloneDeep(_this.reqData.employee);
                _this.feature = _.cloneDeep(_this.reqData);
                _this.id = _this.feature.userData.id;
                _this.designation = _this.feature.employee.designation;
                _this.payRoll = _this.feature.employee.payrollpackage;
                _this.leavePackage = _this.feature.employee.leavepackage;
                _this.assetPackage = _this.feature.employee.assetpackage;
                _this.jobDescription = _this.feature.employee.jobdescription;
                _this.employeeType = _this.feature.employee.employeetype;
                _this.designationOption = _this.reqData.designationList;
                _this.designationData = _this.reqData.designationData;
                _this.leavePackageOption = _this.feature.leaveList;
                _this.leavePackageData = _this.feature.leaveData;
                _this.assetPackageOption = _this.feature.assetList;
                _this.assetPackageData = _this.feature.assetData;
                _this.payrollOption = _this.feature.payrollList;
                _this.payRollData = _this.feature.payrollData;
                _this.jobDescriptionOption = _this.feature.jobDescriptionList;
                _this.jobDescriptionData = _this.feature.jobDescriptionData;
                _this.employeeTypeOption = _this.feature.employeeTypeList;
                _this.employeeTypeData = _this.feature.employeeTypeData;
                _this.defItem = {
                  designation: _.filter(_this.designationData, {
                    id: Number(defItem.designation)
                  })[0].value,
                  payRoll: _.filter(_this.payRollData, {
                    id: Number(defItem.payrollpackage)
                  })[0].name,
                  leavePackage: _.filter(_this.leavePackageData, {
                    id: Number(defItem.leavepackage)
                  })[0].name,
                  assetPackage: _.filter(_this.assetPackageData, {
                    id: Number(defItem.assetpackage)
                  })[0].name,
                  jobDescription: _.filter(_this.jobDescriptionData, {
                    id: Number(defItem.jobdescription)
                  })[0].name,
                  employeeType: _.filter(_this.employeeTypeData, {
                    id: Number(defItem.employeetype)
                  })[0].value
                };

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    saveData: function saveData() {
      var _this2 = this;

      var data = {
        designation: this.designation,
        payRoll: this.payRoll,
        leavePackage: this.leavePackage,
        assetPackage: this.assetPackage,
        jobDescription: this.jobDescription,
        employeeType: this.employeeType,
        id: this.id
      };

      if (this.validateInput(data)) {
        this.btnDisabled = true;
        axios.post('/api/user-edit/data/feature-update', data).then(function (response) {
          _this2.notificationAlert(response);

          _this2.$parent.$parent.$parent.$parent.loadData();

          _this2.editMode = false;
          _this2.btnDisabled = false;
        })["catch"](function (error) {
          _this2.errorData = error.response.data.errors;

          _this2.notificationAlert(error.response);

          _this2.btnDisabled = false;
        });
      }
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "GeneralInfo",
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {
      editMode: false,
      genInfo: {},
      defItem: {},
      id: null,
      //user general info
      name: null,
      personalEmail: null,
      officeEmail: null,
      personalPhone: null,
      officePhone: null,
      verificationIdOption: ['NID', 'Passport'],
      verificationidtype: null,
      verificationIdFile: null,
      verificationIdFileName: null,
      verificationIdNumber: null,
      nationalityOption: [],
      nationalityData: [],
      nationality: null,
      bloodgroup: null,
      bloodgroupOption: [],
      bloodgroupData: [],
      dateOfBirth: null,
      genderOption: [],
      genderData: [],
      gender: null,
      religion: null,
      religionOption: [],
      religionData: [],
      meritalStatus: false,
      presentAddressLine1: null,
      presentAddressLine2: null,
      presentAddressCitySelect: null,
      presentAddressCityOtherView: false,
      presentAddressCity: null,
      presentAddressPostCode: null,
      permanentAddressLine1: null,
      permanentAddressLine2: null,
      permanentAddressCitySelect: null,
      permanentAddressCityOtherView: false,
      permanentAddressCity: null,
      permanentaddressPostCode: null,
      addressCityData: [],
      addressCityList: [],
      attachment: null
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.defItem = _.cloneDeep(_this.reqData.employee);
                _this.genInfo = _.cloneDeep(_this.reqData);
                _this.attachment = '/storage/company-' + _this.genInfo.userData.companyid + '/user-' + _this.genInfo.userData.id + '/document/' + _this.defItem.verificationidfile;
                _this.id = _this.genInfo.userData.id;
                _this.personalEmail = _this.genInfo.employee.personalemail;
                _this.officeEmail = _this.genInfo.employee.officeemail;
                _this.personalPhone = _this.genInfo.employee.personalmobile;
                _this.officePhone = _this.genInfo.employee.officemobile;
                _this.verificationidtype = _this.genInfo.employee.verificationidtype;
                _this.verificationIdNumber = _this.genInfo.employee.verificationidnumber;
                _this.nationality = _this.genInfo.employee.nationality;
                _this.bloodgroup = _this.genInfo.employee.bloodgroup;
                _this.dateOfBirth = _this.genInfo.employee.dateofbirth;
                _this.gender = _this.genInfo.employee.gender;
                _this.religion = _this.genInfo.employee.religion;
                _this.meritalStatus = _this.genInfo.employee.meritalstatus;
                _this.addressCityData = _this.genInfo.cityData;
                _this.addressCityList = _this.genInfo.cityList;
                _this.presentAddressLine1 = _this.genInfo.employee.permanentaddressline1;
                _this.presentAddressLine2 = _this.genInfo.employee.permanentaddressline2;
                _this.presentAddressCity = _this.genInfo.employee.presentaddresscity;
                _this.presentAddressPostCode = _this.genInfo.employee.presentaddresspostcode;

                if (_this.addressCityList.indexOf(_this.presentaddresscity) > -1) {
                  _this.presentAddressCitySelect = _this.presentAddressCity;
                  _this.presentAddressCityOtherView = false;
                } else {
                  if (_this.presentAddressCity != null) {
                    _this.presentAddressCitySelect = 'others';
                    _this.presentAddressCityOtherView = true;
                  }
                }

                _this.permanentAddressLine1 = _this.genInfo.employee.permanentaddressline1;
                _this.permanentAddressLine2 = _this.genInfo.employee.permanentaddressline2;
                _this.permanentAddressCity = _this.genInfo.employee.permanentaddresscity;
                _this.permanentaddressPostCode = _this.genInfo.employee.permanentaddresspostcode;

                if (_this.addressCityList.indexOf(_this.permanentAddressCity) > -1) {
                  _this.permanentAddressCitySelect = _this.permanentAddressCity;
                  _this.permanentAddressCityOtherView = false;
                } else {
                  if (_this.permanentAddressCity != null) {
                    _this.permanentAddressCitySelect = 'others';
                    _this.permanentAddressCityOtherView = true;
                  }
                }

                _this.nationalityOption = _this.genInfo.nationalityList;
                _this.nationalityData = _this.genInfo.nationalityData;
                _this.bloodgroupOption = _this.genInfo.bloodgroupList;
                _this.bloodgroupData = _this.genInfo.bloodgroupData;
                _this.genderOption = _this.genInfo.genderList;
                _this.genderData = _this.genInfo.genderData;
                _this.religionOption = _this.genInfo.religionList;
                _this.religionData = _this.genInfo.religionData;

                if (_this.defItem.gender != null) {
                  _this.defItem.gender = _.filter(_this.genderData, {
                    id: Number(_this.defItem.gender)
                  })[0].value;
                }

                if (_this.defItem.religion != null) {
                  _this.defItem.religion = _.filter(_this.religionData, {
                    id: Number(_this.defItem.religion)
                  })[0].value;
                }

                if (_this.defItem.bloodgroup != null) {
                  _this.defItem.bloodgroup = _.filter(_this.bloodgroupData, {
                    id: Number(_this.defItem.bloodgroup)
                  })[0].value;
                }

                if (_this.defItem.nationality != null) {
                  _this.defItem.nationality = _.filter(_this.nationalityData, {
                    id: Number(_this.defItem.nationality)
                  })[0].value;
                }

                if (_this.defItem.meritalstatus != null) {
                  if (_this.defItem.meritalstatus == true) {
                    _this.defItem.meritalstatus = 'Married';
                  }

                  if (_this.defItem.meritalstatus == false) {
                    _this.defItem.meritalstatus = 'Unmarried';
                  }
                }

                if (_this.defItem.dateofbirth != null) {
                  _this.defItem.dateofbirth = _this.defItem.dateofbirth.split('T')[0];
                }

              case 42:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    manageInfo: function manageInfo(type) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var item = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (type == 'presentAddressCity') {
        if (this.presentAddressCitySelect != null) {
          if (this.presentAddressCitySelect.toLowerCase() == 'others') {
            this.presentAddressCityOtherView = true;
            this.presentAddressCity = '';
          } else {
            this.presentAddressCityOtherView = false;
            this.presentAddressCity = this.presentAddressCitySelect;
          }
        }
      } else if (type == 'permanentAddressCity') {
        if (this.permanentAddressCitySelect != null) {
          if (this.permanentAddressCitySelect.toLowerCase() == 'others') {
            this.permanentAddressCityOtherView = true;
            this.permanentAddressCity = '';
          } else {
            this.permanentAddressCityOtherView = false;
            this.permanentAddressCity = this.permanentAddressCitySelect;
          }
        }
      }
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.verificationIdFile = input.files[0];
          _this2.verificationIdFileName = input.files[0].name;
        }
      };
    },
    saveData: function saveData() {
      var _this3 = this;

      var data = {
        personalEmail: this.personalEmail,
        officeEmail: this.officeEmail,
        personalPhone: this.personalPhone,
        officePhone: this.officePhone,
        verificationidtype: this.verificationidtype,
        verificationIdFile: this.verificationIdFile,
        verificationIdNumber: this.verificationIdNumber,
        nationality: this.nationality,
        bloodgroup: this.bloodgroup,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        religion: this.religion,
        meritalStatus: this.meritalStatus,
        presentAddressLine1: this.presentAddressLine1,
        presentAddressLine2: this.presentAddressLine2,
        presentAddressPostCode: this.presentAddressPostCode,
        presentAddressCity: this.presentAddressCity,
        permanentAddressLine1: this.permanentAddressLine1,
        permanentAddressLine2: this.permanentAddressLine2,
        permanentaddressPostCode: this.permanentaddressPostCode,
        permanentAddressCity: this.permanentAddressCity,
        id: this.id,
        hasFile: ['verificationIdFile']
      };

      if (this.validateInput(data)) {
        this.btnDisabled = true;
        var formData = new FormData();
        formFiles(data, formData);
        formData.append('data', JSON.stringify(data));
        axios.post('/api/user-edit/data/general-info-update', formData).then(function (response) {
          _this3.notificationAlert(response);

          _this3.$parent.$parent.$parent.$parent.loadData();

          _this3.editMode = false;
          _this3.btnDisabled = false;
        })["catch"](function (error) {
          _this3.errorData = error.response.data.errors;

          _this3.notificationAlert(error.response);

          _this3.btnDisabled = false;
        });
      }
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'job-history',
  components: {},
  props: {
    reqData: {
      "default": {}
    },
    job: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    ser: {
      "default": null
    }
  },
  data: function data() {
    return {
      editMode: false,
      defItem: {},
      userId: null,
      designationOption: [],
      designationData: []
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var jobDuration;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.defItem = _.cloneDeep(_this.job);
                _this.userId = _this.reqData.userData.id;
                _this.designationOption = _this.reqData.designationList;
                _this.designationData = _this.reqData.designationData;
                _this.defItem.designation = _.filter(_this.designationData, {
                  id: Number(_this.defItem.designation)
                })[0].value;
                jobDuration = _this.defItem.jobDuration.start.split('T')[0] + ' - ' + _this.defItem.jobDuration.end.split('T')[0];
                _this.defItem.jobDuration = jobDuration;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    deleteJob: function deleteJob(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this job history?',
        acceptText: 'ok',
        accept: this.deleteDataProceed,
        parameters: deldata
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = {
                  id: Deldata
                };
                axios.post('/api/user-edit/data/job-history-delete', data).then(function (response) {
                  _this2.notificationAlert(response);

                  _this2.$parent.$parent.$parent.$parent.loadData();
                })["catch"](function (error) {
                  _this2.notificationAlert(error.response);
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    saveData: function saveData() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.btnDisabled = true;
                _this3.job.userId = _this3.userId;
                axios.post('/api/user-edit/data/job-history-update', _this3.job).then(function (response) {
                  _this3.notificationAlert(response);

                  _this3.$parent.$parent.$parent.$parent.loadData();

                  _this3.editMode = false;
                  _this3.btnDisabled = false;
                })["catch"](function (error) {
                  _this3.errorData = error.response.data.errors;

                  _this3.notificationAlert(error.response);

                  _this3.btnDisabled = false;
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-advanced-cropper */ "./node_modules/vue-advanced-cropper/dist/index.es.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'login-info',
  components: {
    Cropper: vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_1__["Cropper"]
  },
  props: {
    reqData: {
      "default": {}
    }
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
      editMode: false,
      roleData: [],
      selectedRole: null,
      roleOptions: [],
      //User Login Info
      permissionsManager: [],
      userData: {},
      dafUserData: {},
      defPerm: [],
      defLogo: null,
      defSelectedRole: null
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var userPic, req;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.userData = _defineProperty({
                  password: null,
                  name: _this.reqData.userData.name,
                  email: _this.reqData.userData.email,
                  company: _this.reqData.userData.company,
                  phone: _this.reqData.userData.phone,
                  id: _this.reqData.userData.id
                }, "company", _this.reqData.userData.company);
                _this.roleData = _this.reqData.rolaData;
                _this.roleOptions = _this.reqData['roleList'];
                _this.selectedRole = _this.reqData.userData.role;
                _this.permissionsManager = _this.reqData.userRoles;
                _this.defPerm = _.cloneDeep(_this.reqData.userRoles);
                _this.dafUserData = _.cloneDeep(_this.userData);
                _this.defSelectedRole = _this.selectedRole;
                userPic = '/storage/company-' + _this.reqData.userData.companyid + '/user-' + _this.reqData.userData.id + '/' + _this.reqData.userData.propic;

                if (!(_this.reqData.userData.propic != null)) {
                  _context.next = 21;
                  break;
                }

                _context.prev = 10;
                _context.next = 13;
                return axios.get(userPic);

              case 13:
                req = _context.sent;

                _this.imgData(userPic);

                _this.defLogo = userPic;
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](10);
                console.log(_context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[10, 18]]);
      }))();
    },
    fileInput: function fileInput() {
      var _this2 = this;

      this.cropperBoxData.width = window.innerWidth;
      this.cropperBoxData.height = window.innerHeight - 180;
      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        _this2.loadImageCropper = true;
        var input = e.target;

        if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader(); // Define a callback function to run, when FileReader finishes its job

          reader.onload = function (e) {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            _this2.cropBoxImage = e.target.result;
            _this2.cropperBoxData.name = input.files[0].name;
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
    imgData: function imgData(img) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var blob, dataUrl;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(img).then(function (r) {
                  return r.blob();
                });

              case 2:
                blob = _context2.sent;
                _context2.next = 5;
                return new Promise(function (resolve) {
                  var reader = new FileReader();

                  reader.onload = function () {
                    return resolve(reader.result);
                  };

                  reader.readAsDataURL(blob);
                });

              case 5:
                dataUrl = _context2.sent;
                _this3.logoPreviewImage = dataUrl;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    roleSelected: function roleSelected() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var selectedRoleId, data, req, selectedRole;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                selectedRoleId = _this4.roleData[_this4.selectedRole].id;
                data = {
                  id: selectedRoleId
                };
                _context3.prev = 2;
                _context3.next = 5;
                return axios.post('/api/user-edit/data/role', data);

              case 5:
                req = _context3.sent;
                selectedRole = req.data;
                _this4.permissionsManager = selectedRole;
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 10]]);
      }))();
    },
    saveData: function saveData() {
      var _this5 = this;

      var data = {
        name: this.userData.name,
        email: this.userData.email,
        phone: this.userData.phone,
        company: this.userData.company,
        role: this.selectedRole,
        permissions: this.permissionsManager,
        hasFile: ['logoData'],
        logoData: this.logoData,
        id: this.userData.id
      };

      if (this.userData.password != null && this.userData.password != '') {
        data.password = this.userData.password;
      }

      if (this.validateInput(data)) {
        this.btnDisabled = true;
        var formData = new FormData();
        formFiles(data, formData);
        formData.append('data', JSON.stringify(data));
        axios.post('/api/user-edit/data/login-info-update', formData).then(function (response) {
          _this5.notificationAlert(response);

          _this5.$parent.$parent.$parent.$parent.loadData();

          _this5.editMode = false;
          _this5.btnDisabled = false;
        })["catch"](function (error) {
          _this5.errorData = error.response.data.errors;

          _this5.notificationAlert(error.response);

          _this5.btnDisabled = false;
        });
      }
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'new-edu-history',
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {
      userId: null,
      resultOption: ['Division', 'CGPA'],
      degreeOption: [],
      degreeData: [],
      divisionOption: [],
      divisionData: [],
      instituteData: [],
      instituteOption: [],
      passinfYearList: null,
      addNew: false,
      education: {
        degreeName: null,
        instituteName: null,
        instituteNameSelect: null,
        passingYear: null,
        resultType: 'CGPA',
        cgpa: null,
        outof: null,
        division: null,
        viewCgpa: true,
        viewDivision: false,
        viewInstituteSelect: false,
        viewInstituteinput: true,
        attachmentName: null,
        certificateAttachment: null,
        hasFile: ['certificateAttachment']
      }
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var year, yearData, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.userId = _this.reqData.userData.id;
                _this.degreeOption = _this.reqData.degreeList;
                _this.degreeData = _this.reqData.degreeData;
                _this.divisionOption = _this.reqData.divisionList;
                _this.divisionData = _this.reqData.divisionData;
                _this.instituteData = _this.reqData.instituteData;
                _this.instituteOption = _this.reqData.instituteList;
                year = new Date().getFullYear() - 80;
                yearData = [];

                for (i = 0; 80 > i; i++) {
                  yearData.unshift(year + i);
                }

                _this.passinfYearList = yearData;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.education.certificateAttachment = input.files[0];
          _this2.education.attachmentName = input.files[0].name;
        }
      };
    },
    manageEducation: function manageEducation(type, item) {
      if (type == 'resultType') {
        if (item.resultType != null) {
          if (item.resultType.toLowerCase() == 'division') {
            this.education.viewDivision = true;
            this.education.viewCgpa = false;
          } else if (item.resultType.toLowerCase() == 'cgpa') {
            this.education.viewDivision = false;
            this.education.viewCgpa = true;
          }
        }
      } else if (type == 'degreeType') {
        if (item.degreeName != null) {
          if (item.degreeName.toLowerCase() == 'undergraduate' || item.degreeName.toLowerCase() == 'postgraduate' || item.degreeName.toLowerCase() == 'phd') {
            this.education.viewInstituteSelect = true;
            this.education.viewInstituteinput = false;
          } else {
            this.education.viewInstituteSelect = false;
            this.education.viewInstituteinput = true;
          }
        }
      } else if (type == 'otherInstitute') {
        if (item.instituteNameSelect != null) {
          if (item.instituteNameSelect.toLowerCase() == 'others') {
            this.education.viewInstituteSelect = true;
            this.education.viewInstituteinput = true;
          } else {
            this.education.viewInstituteSelect = true;
            this.education.viewInstituteinput = false;
            this.education.instituteName = item.instituteNameSelect;
          }
        }
      }
    },
    saveData: function saveData() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var formData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this3.btnDisabled = true;
                _this3.education.userId = _this3.userId;
                formData = new FormData();
                formFiles(_this3.education, formData);
                formData.append('data', JSON.stringify(_this3.education));
                axios.post('/api/user-edit/data/education-history-create', formData).then(function (response) {
                  _this3.notificationAlert(response);

                  _this3.$parent.$parent.$parent.$parent.loadData();

                  _this3.addNew = false;
                  _this3.education.degreeName = null;
                  _this3.education.instituteName = null;
                  _this3.education.instituteNameSelect = null;
                  _this3.education.passingYear = null;
                  _this3.education.resultType = 'CGPA';
                  _this3.education.cgpa = null;
                  _this3.education.outof = null;
                  _this3.education.division = null;
                  _this3.education.viewCgpa = true;
                  _this3.education.viewDivision = false;
                  _this3.education.viewInstituteSelect = false;
                  _this3.education.viewInstituteinput = true;
                  _this3.education.attachmentName = null;
                  _this3.education.certificateAttachment = null;
                  _this3.btnDisabled = false;
                })["catch"](function (error) {
                  _this3.errorData = error.response.data.errors;

                  _this3.notificationAlert(error.response);

                  _this3.btnDisabled = false;
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'new-employee-document',
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {
      addNew: false,
      userId: null,
      doc: {
        document_title: null,
        doc: true,
        hasFile: ['documentAttachment'],
        documentAttachmentName: null
      }
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.userId = _this.reqData.userData.id;

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.doc.documentAttachment = input.files[0];
          _this2.doc.documentAttachmentName = input.files[0].name;
        }
      };
    },
    saveData: function saveData() {
      var _this3 = this;

      this.btnDisabled = true;
      this.doc.userId = this.userId;
      var formData = new FormData();
      formFiles(this.doc, formData);
      formData.append('data', JSON.stringify(this.doc));
      axios.post('/api/user-edit/data/employee-document-create', formData).then(function (response) {
        _this3.notificationAlert(response);

        _this3.$parent.$parent.$parent.$parent.loadData();

        _this3.doc.document_title = null;
        _this3.doc.documentAttachmentName = null;
        _this3.doc.documentAttachment = null;
        _this3.addNew = false;
        _this3.btnDisabled = false;
      })["catch"](function (error) {
        _this3.errorData = error.response.data.errors;

        _this3.notificationAlert(error.response);

        _this3.btnDisabled = false;
      });
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'new-job-history',
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {
      designationOption: [],
      designationData: [],
      addNew: false,
      userId: null,
      job: {
        orgName: null,
        designation: null,
        jobDuration: {
          start: new Date(),
          end: new Date()
        },
        responsibility: null,
        skill: null
      }
    };
  },
  mounted: function mounted() {
    if (this.reqData.relationshipTypeList) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.userId = _this.reqData.userData.id;
                _this.designationOption = _this.reqData.designationList;
                _this.designationData = _this.reqData.designationData;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    saveData: function saveData() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.btnDisabled = true;
                _this2.job.userId = _this2.userId;
                axios.post('/api/user-edit/data/job-history-create', _this2.job).then(function (response) {
                  _this2.notificationAlert(response);

                  _this2.$parent.$parent.$parent.$parent.loadData();

                  _this2.addNew = false;
                  _this2.job.orgName = null;
                  _this2.job.designation = null;
                  _this2.job.jobDuration = {
                    start: new Date(),
                    end: new Date()
                  };
                  _this2.job.responsibility = null;
                  _this2.job.skill = null;
                })["catch"](function (error) {
                  _this2.errorData = error.response.data.errors;

                  _this2.notificationAlert(error.response);
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'new-nominee',
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {
      relationTypeOption: [],
      relationshipTypeData: [],
      addNew: false,
      userId: null,
      nominee: {
        familymembername: null,
        relationshiptype: null,
        nominee: true,
        hasFile: ['nomineeIdAttachment'],
        nomineeIdAttachment: null,
        nomineeAttachmentName: null
      }
    };
  },
  mounted: function mounted() {
    if (this.reqData.relationshipTypeList) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.userId = _this.reqData.userData.id;
                _this.relationTypeOption = _this.reqData.relationshipTypeList;
                _this.relationshipTypeData = _this.reqData.relationshipTypeData;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.nominee.nomineeIdAttachment = input.files[0];
          _this2.nominee.nomineeAttachmentName = input.files[0].name;
        }
      };
    },
    saveData: function saveData() {
      var _this3 = this;

      this.btnDisabled = true;
      this.nominee.userId = this.userId;
      var formData = new FormData();
      formFiles(this.nominee, formData);
      formData.append('data', JSON.stringify(this.nominee));
      console.log('Hasib', this.nominee);
      axios.post('/api/user-edit/data/nominee-create', formData).then(function (response) {
        _this3.notificationAlert(response);

        _this3.$parent.$parent.$parent.$parent.loadData();

        _this3.addNew = false;
        _this3.nominee.familymembername = null;
        _this3.nominee.relationshiptype = null;
        _this3.nominee.nominee = true;
        _this3.nominee.nomineeIdAttachment = null;
        _this3.nominee.nomineeAttachmentName = null;
        _this3.btnDisabled = false;
      })["catch"](function (error) {
        _this3.errorData = error.response.data.errors;

        _this3.notificationAlert(error.response);

        _this3.btnDisabled = false;
      });
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'new-skill',
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {
      addNew: false,
      userId: null,
      skillNameOption: [],
      skillNameData: [],
      skillScaleOption: [],
      skillScaleData: [],
      skill: {
        skillsname: null,
        skillsscale: null
      }
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.userId = _this.reqData.userData.id;
                _this.skillNameOption = _this.reqData.skillNameList;
                _this.skillNameData = _this.reqData.skillNameData;
                _this.skillScaleOption = _this.reqData.skillScaleList;
                _this.skillScaleData = _this.reqData.skillScaleData;

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    deleteSkill: function deleteSkill() {},
    saveData: function saveData() {
      var _this2 = this;

      this.btnDisabled = true;
      this.skill.userId = this.userId;
      axios.post('/api/user-edit/data/skill-create', this.skill).then(function (response) {
        _this2.notificationAlert(response);

        _this2.$parent.$parent.$parent.$parent.loadData();

        _this2.addNew = false;
        _this2.editMode = false;
        _this2.skill.skillsname = null;
        _this2.skill.skillsscale = null;
      })["catch"](function (error) {
        _this2.errorData = error.response.data.errors;

        _this2.notificationAlert(error.response);
      });
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  name: 'nominee-info',
  props: {
    reqData: {
      "default": {}
    },
    nominee: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    ser: {
      "default": null
    }
  },
  data: function data() {
    return {
      defItem: {},
      userId: null,
      relationTypeOption: [],
      relationshipTypeData: [],
      editMode: false
    };
  },
  filters: {
    truncate: function truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.defItem = _.cloneDeep(_this.nominee);
                _this.userId = _this.reqData.userData.id;
                _this.relationTypeOption = _this.reqData.relationshipTypeList;
                _this.relationshipTypeData = _this.reqData.relationshipTypeData;
                _this.defItem.relationshiptype = _.filter(_this.relationshipTypeData, {
                  id: Number(_this.defItem.relationshiptype)
                })[0].value;

                if (_this.defItem.nominee == true) {
                  _this.defItem.nominee = 'Nominee';
                } else {
                  _this.defItem.nominee = 'Family member';
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.nominee.nomineeIdAttachment = input.files[0];
          _this2.nominee.nomineeAttachmentName = input.files[0].name;
        }
      };
    },
    deleteNominee: function deleteNominee(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this nominee?',
        acceptText: 'ok',
        accept: this.deleteDataProceed,
        parameters: deldata
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this3 = this;

      var data = {
        id: Deldata
      };
      axios.post('/api/user-edit/data/nominee-delete', data).then(function (response) {
        _this3.notificationAlert(response);

        _this3.$parent.$parent.$parent.$parent.loadData();
      })["catch"](function (error) {
        _this3.errorData = error.response.data.errors;

        _this3.notificationAlert(error.response);
      });
    },
    saveData: function saveData() {
      var _this4 = this;

      this.btnDisabled = true;
      this.nominee.userId = this.userId;
      var formData = new FormData();
      formFiles(this.nominee, formData);
      formData.append('data', JSON.stringify(this.nominee));
      axios.post('/api/user-edit/data/nominee-update', formData).then(function (response) {
        _this4.notificationAlert(response);

        _this4.$parent.$parent.$parent.$parent.loadData();

        _this4.editMode = false;
        _this4.btnDisabled = false;
      })["catch"](function (error) {
        _this4.errorData = error.response.data.errors;

        _this4.notificationAlert(error.response);

        _this4.btnDisabled = false;
      });
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'skill-info',
  components: {},
  props: {
    reqData: {
      "default": {}
    },
    skill: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    ser: {
      "default": null
    }
  },
  data: function data() {
    return {
      editMode: false,
      defItem: {},
      userId: null,
      skillNameOption: [],
      skillNameData: [],
      skillScaleOption: [],
      skillScaleData: []
    };
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.defItem = _.cloneDeep(_this.skill);
                _this.userId = _this.reqData.userData.id;
                _this.skillNameOption = _this.reqData.skillNameList;
                _this.skillNameData = _this.reqData.skillNameData;
                _this.skillScaleOption = _this.reqData.skillScaleList;
                _this.skillScaleData = _this.reqData.skillScaleData;
                _this.defItem.skillsname = _.filter(_this.skillNameData, {
                  id: Number(_this.defItem.skillsname)
                })[0].value;
                _this.defItem.skillsscale = _.filter(_this.skillScaleData, {
                  id: Number(_this.defItem.skillsscale)
                })[0].value;

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    deleteSkill: function deleteSkill(deldata) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: "Confirm",
        text: 'Are you sure, you want to delete this skill?',
        acceptText: 'ok',
        accept: this.deleteDataProceed,
        parameters: deldata
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this2 = this;

      var data = {
        id: Deldata
      };
      axios.post('/api/user-edit/data/skill-delete', data).then(function (response) {
        _this2.notificationAlert(response);

        _this2.$parent.$parent.$parent.$parent.loadData();
      })["catch"](function (error) {
        _this2.errorData = error.response.data.errors;

        _this2.notificationAlert(error.response);
      });
    },
    saveData: function saveData() {
      var _this3 = this;

      this.btnDisabled = true;
      this.skill.userId = this.userId;
      axios.post('/api/user-edit/data/skill-update', this.skill).then(function (response) {
        _this3.notificationAlert(response);

        _this3.$parent.$parent.$parent.$parent.loadData();

        _this3.editMode = false;
        _this3.btnDisabled = false;
      })["catch"](function (error) {
        _this3.errorData = error.response.data.errors;

        _this3.notificationAlert(error.response);

        _this3.btnDisabled = false;
      });
    }
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'org-tree',
  components: {},
  props: {
    reqData: {
      "default": {}
    }
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    if (this.reqData.userData) {
      this.loadData();
    }
  },
  methods: {
    loadData: function loadData() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    saveData: function saveData() {}
  },
  watch: {
    reqData: function reqData() {
      this.loadData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-advanced-cropper */ "./node_modules/vue-advanced-cropper/dist/index.es.js");
/* harmony import */ var vue_jstree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-jstree */ "./node_modules/vue-jstree/dist/vue-jstree.js");
/* harmony import */ var vue_jstree__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_jstree__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _LoginInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoginInfo */ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue");
/* harmony import */ var _EduHistory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EduHistory */ "./resources/js/src/views/app/user/user-edit/EduHistory.vue");
/* harmony import */ var _NewEduHistory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NewEduHistory */ "./resources/js/src/views/app/user/user-edit/NewEduHistory.vue");
/* harmony import */ var _FeatureInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FeatureInfo */ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue");
/* harmony import */ var _GeneralInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./GeneralInfo */ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue");
/* harmony import */ var _JobHistory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./JobHistory */ "./resources/js/src/views/app/user/user-edit/JobHistory.vue");
/* harmony import */ var _NewJobHistory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NewJobHistory */ "./resources/js/src/views/app/user/user-edit/NewJobHistory.vue");
/* harmony import */ var _NomineeInfo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NomineeInfo */ "./resources/js/src/views/app/user/user-edit/NomineeInfo.vue");
/* harmony import */ var _NewNominee__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./NewNominee */ "./resources/js/src/views/app/user/user-edit/NewNominee.vue");
/* harmony import */ var _EmployeeDocument__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EmployeeDocument */ "./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue");
/* harmony import */ var _NewEmployeeDocument__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./NewEmployeeDocument */ "./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue");
/* harmony import */ var _SkillInfo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./SkillInfo */ "./resources/js/src/views/app/user/user-edit/SkillInfo.vue");
/* harmony import */ var _NewSkill__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./NewSkill */ "./resources/js/src/views/app/user/user-edit/NewSkill.vue");
/* harmony import */ var _Tree__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Tree */ "./resources/js/src/views/app/user/user-edit/Tree.vue");


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

















/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_1___default.a,
    Cropper: vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_2__["Cropper"],
    VJstree: vue_jstree__WEBPACK_IMPORTED_MODULE_3___default.a,
    loginInfo: _LoginInfo__WEBPACK_IMPORTED_MODULE_4__["default"],
    eduHistory: _EduHistory__WEBPACK_IMPORTED_MODULE_5__["default"],
    newEduHistory: _NewEduHistory__WEBPACK_IMPORTED_MODULE_6__["default"],
    featureInfo: _FeatureInfo__WEBPACK_IMPORTED_MODULE_7__["default"],
    generalInfo: _GeneralInfo__WEBPACK_IMPORTED_MODULE_8__["default"],
    jobHistory: _JobHistory__WEBPACK_IMPORTED_MODULE_9__["default"],
    newJobHistory: _NewJobHistory__WEBPACK_IMPORTED_MODULE_10__["default"],
    nomineeInfo: _NomineeInfo__WEBPACK_IMPORTED_MODULE_11__["default"],
    newNominee: _NewNominee__WEBPACK_IMPORTED_MODULE_12__["default"],
    EmployeeDocument: _EmployeeDocument__WEBPACK_IMPORTED_MODULE_13__["default"],
    newEmployeeDocument: _NewEmployeeDocument__WEBPACK_IMPORTED_MODULE_14__["default"],
    skillInfo: _SkillInfo__WEBPACK_IMPORTED_MODULE_15__["default"],
    newSkill: _NewSkill__WEBPACK_IMPORTED_MODULE_16__["default"],
    tree: _Tree__WEBPACK_IMPORTED_MODULE_17__["default"]
  },
  props: {},
  data: function data() {
    return {
      reqData: {},
      treeSaveBtn: false,
      //Organization Tree
      selectedTree: null,
      organizationTree: [],
      //Education
      educationData: [],
      instituteData: [],
      instituteOption: [],
      //Job History
      jobHistoryData: [],
      //Nominee
      nomineeData: [],
      //Skillmatrix
      skillMatrixData: [],
      //Employee Document
      EmployeeDocumentData: []
    };
  },
  mounted: function mounted() {
    this.loadData();
  },
  methods: {
    chkData: function chkData() {
      this.loadData();
    },
    loadData: function loadData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var data, req, educationHistory, i, eduData, _data, jobHistory, job, _data2, nomineeData, nominee, _data3, skillMatrix, skill, _data4, documentData, doc, _data5;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = {
                  id: _this.$route.params.id
                };
                _context.prev = 1;
                _context.next = 4;
                return axios.post('/api/user-edit/data', data);

              case 4:
                req = _context.sent;
                _this.reqData = req.data; //Org Tree

                _this.organizationTree = req.data.organizationTree; //Others

                _this.userData = {
                  password: null,
                  name: req.data.userData.name,
                  email: req.data.userData.email,
                  company: req.data.userData.company,
                  phone: req.data.userData.phone,
                  id: req.data.userData.id
                };
                _this.instituteData = req.data.instituteData;
                _this.instituteOption = req.data.instituteList;
                educationHistory = [];

                for (i = 0; req.data.educationhistory.length > i; i++) {
                  eduData = req.data.educationhistory[i];
                  _data = {
                    attachmentName: null,
                    certificateAttachment: null,
                    hasFile: ['certificateAttachment']
                  };
                  _data.degreeName = eduData.degreename;
                  _data.instituteName = eduData.institutename;
                  _data.instituteNameSelect = eduData.institutename;
                  _data.passingYear = eduData.passingyear;
                  _data.resultType = eduData.resulttype;
                  _data.savedFileName = eduData.certificateattachment;
                  _data.id = eduData.id;
                  _data.eduAttachment = '/storage/company-' + req.data.userData.companyid + '/user-' + req.data.userData.id + '/document/' + eduData.certificateattachment;
                  _data.cgpa = eduData.cgpa;
                  _data.outof = eduData.outof;

                  if (eduData.resulttype == 'CGPA') {
                    _data.viewCgpa = true;
                  }

                  _data.division = eduData.division;

                  if (eduData.resulttype == 'Division') {
                    _data.viewDivision = true;
                  }

                  if (eduData.degreename.toLowerCase() == 'undergraduate' || eduData.degreename.toLowerCase() == 'postgraduate' || eduData.degreename.toLowerCase() == 'phd') {
                    if (_this.instituteOption.indexOf(eduData.institutename) > -1) {
                      _data.viewInstituteSelect = true;
                      _data.viewInstituteinput = false;
                    } else {
                      _data.viewInstituteSelect = false;
                      _data.viewInstituteinput = true;
                    }
                  } else {
                    _data.viewInstituteSelect = false;
                    _data.viewInstituteinput = true;
                  }

                  _data.attachmentDownload = eduData.certificateattachment;
                  educationHistory.push(_data);
                }

                _this.educationData = educationHistory;
                jobHistory = [];

                for (i = 0; req.data.jobhistory.length > i; i++) {
                  job = req.data.jobhistory[i];
                  _data2 = {};
                  _data2.orgName = job.orgname;
                  _data2.designation = job.designation;
                  _data2.jobDuration = {
                    'start': job.jobstartdate,
                    'end': job.jobclosedate
                  };
                  _data2.responsibility = job.responsibility;
                  _data2.skill = job.skill;
                  _data2.id = job.id;
                  jobHistory.push(_data2);
                }

                _this.jobHistoryData = jobHistory;
                nomineeData = [];

                for (i = 0; req.data.nominee.length > i; i++) {
                  nominee = req.data.nominee[i];
                  _data3 = {
                    hasFile: ['nomineeIdAttachment'],
                    nomineeIdAttachment: null,
                    nomineeAttachmentName: null
                  };
                  _data3.familymembername = nominee.familymembername;
                  _data3.relationshiptype = nominee.relationshiptype;
                  _data3.nominee = nominee.nominee;
                  _data3.id = nominee.id;
                  _data3.nomineeAttachment = '/storage/company-' + req.data.userData.companyid + '/user-' + req.data.userData.id + '/document/' + nominee.verificationidfile;
                  _data3.savedFileName = nominee.verificationidfile;
                  nomineeData.push(_data3);
                }

                _this.nomineeData = nomineeData;
                skillMatrix = [];

                for (i = 0; req.data.skillmatrice.length > i; i++) {
                  skill = req.data.skillmatrice[i];
                  _data4 = {};
                  _data4.skillsname = skill.skillsname;
                  _data4.skillsscale = skill.skillsscale;
                  _data4.id = skill.id;
                  skillMatrix.push(_data4);
                }

                _this.skillMatrixData = skillMatrix;
                documentData = [];

                for (i = 0; req.data.employee_document.length > i; i++) {
                  doc = req.data.employee_document[i];
                  _data5 = {
                    documentTitle: null,
                    documentFiles: null,
                    hasFile: ['documentAttachment'],
                    documentAttachment: null,
                    documentAttachmentName: null
                  };
                  _data5.document_title = doc.document_title;
                  _data5.document = doc.employee_document;
                  _data5.id = doc.id;
                  _data5.document_attachment = '/storage/company-' + req.data.userData.companyid + '/user-' + req.data.userData.id + '/document/' + doc.document_attachment;
                  _data5.savedFileName = doc.document_attachment;
                  documentData.push(_data5);
                }

                _this.EmployeeDocumentData = documentData;
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](1);

                _this.notificationAlert(_context.t0.response);

                console.log(_context.t0);

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 27]]);
      }))();
    },
    treeItemClick: function treeItemClick(node, item, e) {
      this.selectedTree = item;
      this.treeSaveBtn = true;
    },
    updateTree: function updateTree() {
      var _this2 = this;

      if (this.selectedTree != null) {
        var data = {
          id: this.reqData.userData.id,
          selectedTree: this.selectedTree.organizationid
        };
        axios.post('/api/user-edit/data/organization-tree-update', data).then(function (response) {
          _this2.notificationAlert(response);

          _this2.loadData();

          _this2.treeSaveBtn = false;
        })["catch"](function (error) {
          _this2.errorData = error.response.data.errors;

          _this2.notificationAlert(error.response);
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatar-col {\n  width: 10rem;\n}\n#page-company-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (max-width: 370px) {\n#page-company-view table:not(.permissions-table) td {\n    display: block;\n}\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".edit-prev-cont[data-v-41eb5755] {\n  padding: 6px 0px;\n  display: flex;\n  width: 100%;\n}\n.edit-prev-ttl[data-v-41eb5755] {\n  max-width: 200px;\n  flex: 1;\n  font-weight: bold;\n  padding: 0px 10px 0px 14px;\n}\n.edit-prev-dt[data-v-41eb5755] {\n  flex: 1;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".edit-prev-cont[data-v-5b55d347] {\n  padding: 6px 0px;\n  display: flex;\n  width: 100%;\n}\n.edit-prev-ttl[data-v-5b55d347] {\n  max-width: 200px;\n  flex: 1;\n  font-weight: bold;\n  padding: 0px 10px 0px 14px;\n}\n.edit-prev-dt[data-v-5b55d347] {\n  flex: 1;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginInfo.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader??ref--7-1!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader??ref--7-1!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=template&id=23fb9e7d&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=template&id=23fb9e7d& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    !_vm.editMode
      ? _c("div", { staticClass: "vx-row" }, [
          _c(
            "div",
            {
              staticClass: "vx-col w-full flex pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [
              _c("div", { staticClass: "flex-auto font-bold" }, [
                _vm._v("Education History - " + _vm._s(_vm.ser + 1))
              ]),
              _vm._v(" "),
              _c(
                "div",
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
                        return _vm.deleteEdu(_vm.defItem.id)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "pl-2" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-edit"
                    },
                    on: {
                      click: function($event) {
                        _vm.editMode = !_vm.editMode
                      }
                    }
                  })
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
            _c("div", { staticClass: "mt-4" }, [
              _c("div", { staticClass: "w-full" }, [
                _c("span", { staticClass: "font-bold pr-2" }, [
                  _vm._v("Degree Name:")
                ]),
                _vm._v(_vm._s(_vm.defItem.degreeName))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "mt-4" }, [
              _c("div", { staticClass: "w-full" }, [
                _c("span", { staticClass: "font-bold pr-2" }, [
                  _vm._v("Institute name:")
                ]),
                _vm._v(_vm._s(_vm.defItem.instituteName) + "\n                ")
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "mt-4" }, [
              _c("div", { staticClass: "w-full" }, [
                _c("span", { staticClass: "font-bold pr-2" }, [
                  _vm._v("Passing year:")
                ]),
                _vm._v(_vm._s(_vm.defItem.passingYear))
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
            _c("div", { staticClass: "mt-4" }, [
              _c("div", { staticClass: "mt-4" }, [
                _c("div", { staticClass: "w-full" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Result type:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.resultType))
                ])
              ])
            ]),
            _vm._v(" "),
            _vm.education.viewCgpa
              ? _c("div", { staticClass: "mt-3" }, [
                  _c("div", { staticClass: "w-full" }, [
                    _c("span", { staticClass: "font-bold pr-2" }, [
                      _vm._v("Out of:")
                    ]),
                    _vm._v(_vm._s(_vm.defItem.outof))
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.education.viewCgpa
              ? _c("div", { staticClass: "mt-3" }, [
                  _c("div", { staticClass: "w-full" }, [
                    _c("span", { staticClass: "font-bold pr-2" }, [
                      _vm._v("CGPA:")
                    ]),
                    _vm._v(_vm._s(_vm.defItem.cgpa))
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.education.viewDivision
              ? _c("div", { staticClass: "mt-4" }, [
                  _c("div", { staticClass: "mt-4" }, [
                    _c("div", { staticClass: "w-full" }, [
                      _c("span", { staticClass: "font-bold pr-2" }, [
                        _vm._v("Division:")
                      ]),
                      _vm._v(_vm._s(_vm.defItem.division))
                    ])
                  ])
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
            _c("div", { staticClass: "pt-3 pr-3" }, [
              _vm.defItem.savedFileName != null
                ? _c("div", [
                    _c(
                      "a",
                      {
                        staticClass: "flex py-2 px-4 cursor-pointer",
                        attrs: {
                          href: _vm.defItem.eduAttachment,
                          target: "_blank",
                          download: _vm.defItem.savedFileName
                        }
                      },
                      [
                        _c("feather-icon", {
                          attrs: {
                            icon: "PaperclipIcon",
                            svgClasses: "w-4 h-4"
                          }
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "ml-2 " }, [
                          _vm._v(_vm._s(_vm.defItem.savedFileName))
                        ])
                      ],
                      1
                    )
                  ])
                : _vm._e()
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", { staticClass: "vx-row" }, [
          _c(
            "div",
            {
              staticClass: "vx-col w-full flex pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [
              _c("div", { staticClass: "flex-auto font-bold" }, [
                _vm._v("Education History - " + _vm._s(_vm.ser + 1))
              ]),
              _vm._v(" "),
              _c(
                "div",
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
                        return _vm.deleteNominee()
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "pl-2" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-edit"
                    },
                    on: {
                      click: function($event) {
                        _vm.editMode = !_vm.editMode
                      }
                    }
                  })
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
            _c(
              "div",
              { staticClass: "mt-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "Degree Name",
                      label: "* Degree Name"
                    },
                    on: {
                      input: function($event) {
                        return _vm.manageEducation("degreeType", _vm.education)
                      }
                    },
                    model: {
                      value: _vm.education.degreeName,
                      callback: function($$v) {
                        _vm.$set(_vm.education, "degreeName", $$v)
                      },
                      expression: "education.degreeName"
                    }
                  },
                  _vm._l(_vm.degreeData, function(degreeItIem, degreeIndex) {
                    return _c("vs-select-item", {
                      key: degreeIndex,
                      attrs: {
                        value: degreeItIem.value,
                        text: degreeItIem.value
                      }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.education.degreeName,
                    name: "degreeName",
                    altName: "degree name"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm.education.viewInstituteSelect
              ? _c(
                  "div",
                  { staticClass: "mt-4" },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          placeholder: "Institute name",
                          label: "* Institute name"
                        },
                        on: {
                          input: function($event) {
                            return _vm.manageEducation(
                              "otherInstitute",
                              _vm.education
                            )
                          }
                        },
                        model: {
                          value: _vm.education.instituteNameSelect,
                          callback: function($$v) {
                            _vm.$set(_vm.education, "instituteNameSelect", $$v)
                          },
                          expression: "education.instituteNameSelect"
                        }
                      },
                      _vm._l(_vm.instituteData, function(
                        instituteItem,
                        instituteIndex
                      ) {
                        return _c("vs-select-item", {
                          key: instituteIndex,
                          attrs: {
                            value: instituteItem.value,
                            text: instituteItem.value
                          }
                        })
                      }),
                      1
                    ),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.education.instituteName,
                        name: "instituteName",
                        altName: "institute name"
                      }
                    })
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.education.viewInstituteinput
              ? _c(
                  "div",
                  { staticClass: "mt-4" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: { label: "* Institute name" },
                      model: {
                        value: _vm.education.instituteName,
                        callback: function($$v) {
                          _vm.$set(_vm.education, "instituteName", $$v)
                        },
                        expression: "education.instituteName"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.education.instituteName,
                        name: "instituteName",
                        altName: "institute name"
                      }
                    })
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "mt-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "Passing year",
                      label: "* Passing year"
                    },
                    model: {
                      value: _vm.education.passingYear,
                      callback: function($$v) {
                        _vm.$set(_vm.education, "passingYear", $$v)
                      },
                      expression: "education.passingYear"
                    }
                  },
                  _vm._l(_vm.passinfYearList, function(
                    passingYearItem,
                    passingYearIndex
                  ) {
                    return _c("vs-select-item", {
                      key: passingYearIndex,
                      attrs: { value: passingYearItem, text: passingYearItem }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.education.passingYear,
                    name: "passingYear",
                    altName: "passing year"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
            _c("div", { staticClass: "mt-4" }, [
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Result type",
                        label: "* Result type"
                      },
                      on: {
                        input: function($event) {
                          return _vm.manageEducation(
                            "resultType",
                            _vm.education
                          )
                        }
                      },
                      model: {
                        value: _vm.education.resultType,
                        callback: function($$v) {
                          _vm.$set(_vm.education, "resultType", $$v)
                        },
                        expression: "education.resultType"
                      }
                    },
                    _vm._l(_vm.resultOption, function(resultIem, resultIndex) {
                      return _c("vs-select-item", {
                        key: resultIndex,
                        attrs: { value: resultIem, text: resultIem }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.education.resultType,
                      name: "resultType",
                      altName: "result type"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _vm.education.viewCgpa
              ? _c(
                  "div",
                  { staticClass: "mt-3" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      attrs: { label: "* Out of" },
                      model: {
                        value: _vm.education.outof,
                        callback: function($$v) {
                          _vm.$set(_vm.education, "outof", $$v)
                        },
                        expression: "education.outof"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.education.outof,
                        name: "outof",
                        altName: "out of"
                      }
                    })
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.education.viewCgpa
              ? _c(
                  "div",
                  { staticClass: "mt-3" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: { label: "* CGPA  " },
                      model: {
                        value: _vm.education.cgpa,
                        callback: function($$v) {
                          _vm.$set(_vm.education, "cgpa", $$v)
                        },
                        expression: "education.cgpa"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.education.cgpa,
                        name: "cgpa",
                        altName: "CGPA"
                      }
                    })
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.education.viewDivision
              ? _c("div", { staticClass: "mt-4" }, [
                  _c(
                    "div",
                    { staticClass: "mt-4" },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "Division",
                            label: "* Division"
                          },
                          model: {
                            value: _vm.education.division,
                            callback: function($$v) {
                              _vm.$set(_vm.education, "division", $$v)
                            },
                            expression: "education.division"
                          }
                        },
                        _vm._l(_vm.divisionData, function(
                          divisionItem,
                          divisionIndex
                        ) {
                          return _c("vs-select-item", {
                            key: divisionIndex,
                            attrs: {
                              value: divisionItem.id,
                              text: divisionItem.value
                            }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.education.division,
                          name: "division",
                          altName: "division"
                        }
                      })
                    ],
                    1
                  )
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
            _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
              _vm._v("Certificate attachment:")
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
                      attrs: { size: "small", color: "gray" },
                      on: {
                        click: function($event) {
                          return _vm.attachmentInput()
                        }
                      }
                    },
                    [_vm._v("browse\n                    ")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "pl-3 pt-3" }, [
                _vm._v(_vm._s(_vm.education.attachmentName))
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-full flex pr-2" }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.editMode = false
                      }
                    }
                  },
                  [_vm._v("Cancel\n                ")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=template&id=69278cb0&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=template&id=69278cb0& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    !_vm.editMode
      ? _c("div", [
          _c("div", [
            _c(
              "div",
              {
                staticClass: "vx-col w-full flex pt-8 pb-2",
                staticStyle: { "border-bottom": "1px solid #f2f2f2" }
              },
              [
                _c("div", { staticClass: "flex-auto font-bold" }, [
                  _vm._v("Document - " + _vm._s(_vm.ser + 1))
                ]),
                _vm._v(" "),
                _c(
                  "div",
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
                          return _vm.deleteNominee(_vm.defItem.id)
                        }
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "pl-2" },
                  [
                    _c("vs-button", {
                      attrs: {
                        size: "small",
                        "icon-pack": "feather",
                        icon: "icon-edit"
                      },
                      on: {
                        click: function($event) {
                          _vm.editMode = !_vm.editMode
                        }
                      }
                    })
                  ],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "mt-4 vx-col md:w-1/2 w-full" }, [
                _c("div", { staticClass: "w-full" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Document Title:")
                  ]),
                  _vm._v(
                    _vm._s(_vm.defItem.document_title) +
                      "\n                    "
                  )
                ])
              ]),
              _vm._v(" "),
              _vm.defItem.savedFileName != null
                ? _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
                    _c(
                      "a",
                      {
                        staticClass: "flex py-2 px-4 cursor-pointer ",
                        attrs: {
                          href: _vm.defItem.document_attachment,
                          download: _vm.defItem.savedFileName
                        }
                      },
                      [
                        _c("feather-icon", {
                          attrs: {
                            icon: "PaperclipIcon",
                            svgClasses: "w-4 h-4"
                          }
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "ml-2" }, [
                          _vm._v(_vm._s(_vm.defItem.savedFileName))
                        ])
                      ],
                      1
                    )
                  ])
                : _vm._e()
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", [
          _c("div", [
            _c(
              "div",
              {
                staticClass: "vx-col w-full flex pt-8 pb-2",
                staticStyle: { "border-bottom": "1px solid #f2f2f2" }
              },
              [
                _c("div", { staticClass: "flex-auto font-bold" }, [
                  _vm._v("Document - " + _vm._s(_vm.ser + 1))
                ]),
                _vm._v(" "),
                _c(
                  "div",
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
                          return _vm.deleteNominee()
                        }
                      }
                    })
                  ],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c(
                "div",
                { staticClass: "vx-col md:w-1/2 w-full" },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "Documnet Title" },
                    model: {
                      value: _vm.defItem.document_title,
                      callback: function($$v) {
                        _vm.$set(_vm.defItem, "document_title", $$v)
                      },
                      expression: "defItem.document_title"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.defItem.document_title,
                      name: "Document Title",
                      altName: "Document Title"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
                _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                  _vm._v("Document attachment:")
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
                          attrs: { size: "small", color: "gray" },
                          on: {
                            click: function($event) {
                              return _vm.attachmentInput()
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                                browse\n                            "
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "pl-3 pt-3" }, [
                    _vm._v(_vm._s(_vm.defItem.savedFileName))
                  ])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.editMode = false
                      }
                    }
                  },
                  [_vm._v("Cancel\n                ")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    !_vm.editMode
      ? _c("div", [
          _c("div", { staticClass: "vx-row flex px-4 pb-6" }, [
            _c("div", { staticClass: "flex-auto text-2xl" }, [
              _vm._v("Feature")
            ]),
            _vm._v(" "),
            _c("div", [
              _c(
                "div",
                { staticClass: "pl-2" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-edit"
                    },
                    on: {
                      click: function($event) {
                        _vm.editMode = !_vm.editMode
                      }
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Designation:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.defItem.designation))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Job description:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.defItem.jobDescription))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Employee Type:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.defItem.employeeType))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Payroll package:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.defItem.payRoll))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Leave package:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.defItem.leavePackage))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [
                _vm._v("Asset package:")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(_vm._s(_vm.defItem.assetPackage))
              ])
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", { staticStyle: { "min-height": "300px" } }, [
          _c("div", { staticClass: "vx-row" }, [
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
                        placeholder: "Designation",
                        label: "* Designation"
                      },
                      model: {
                        value: _vm.designation,
                        callback: function($$v) {
                          _vm.designation = $$v
                        },
                        expression: "designation"
                      }
                    },
                    _vm._l(_vm.designationData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item.id, text: item.value }
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
                { staticClass: "mt-4 pt-1" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Job description",
                        label: "* Job description"
                      },
                      model: {
                        value: _vm.jobDescription,
                        callback: function($$v) {
                          _vm.jobDescription = $$v
                        },
                        expression: "jobDescription"
                      }
                    },
                    _vm._l(_vm.jobDescriptionData, function(item, index) {
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
                { staticClass: "mt-4 pt-1" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Employee Type",
                        label: "* Employee Type"
                      },
                      model: {
                        value: _vm.employeeType,
                        callback: function($$v) {
                          _vm.employeeType = $$v
                        },
                        expression: "employeeType"
                      }
                    },
                    _vm._l(_vm.employeeTypeData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item.id, text: item.value }
                      })
                    }),
                    1
                  )
                ],
                1
              )
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
                        placeholder: "Payroll package",
                        label: "* Payroll package"
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
                { staticClass: "mt-4 pt-1" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Leave package",
                        label: "* Leave package"
                      },
                      model: {
                        value: _vm.leavePackage,
                        callback: function($$v) {
                          _vm.leavePackage = $$v
                        },
                        expression: "leavePackage"
                      }
                    },
                    _vm._l(_vm.leavePackageData, function(item, index) {
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
                { staticClass: "mt-4 pt-1" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Asset package",
                        label: "* Asset package"
                      },
                      model: {
                        value: _vm.assetPackage,
                        callback: function($$v) {
                          _vm.assetPackage = $$v
                        },
                        expression: "assetPackage"
                      }
                    },
                    _vm._l(_vm.assetPackageData, function(item, index) {
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
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.editMode = false
                      }
                    }
                  },
                  [_vm._v("Cancel\n                ")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    !_vm.editMode
      ? _c(
          "div",
          [
            _c("div", { staticClass: "vx-row flex px-4 pb-6" }, [
              _c("div", { staticClass: "flex-auto text-2xl" }, [
                _vm._v("General Info")
              ]),
              _vm._v(" "),
              _c("div", [
                _c(
                  "div",
                  { staticClass: "pl-2" },
                  [
                    _c("vs-button", {
                      attrs: {
                        size: "small",
                        "icon-pack": "feather",
                        icon: "icon-edit"
                      },
                      on: {
                        click: function($event) {
                          _vm.editMode = !_vm.editMode
                        }
                      }
                    })
                  ],
                  1
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Office Email:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.officeemail))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Personal Phone:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.personalmobile))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Office Phone:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.officemobile))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Date of Birth:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.dateofbirth))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Gender:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.gender))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Marital Status:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.meritalstatus))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Religion:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.religion))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Blood Group:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.bloodgroup))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Nationality:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.nationality))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Verification ID No.:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(
                    _vm._s(_vm.defItem.verificationidnumber) +
                      " (" +
                      _vm._s(_vm.defItem.verificationidtype) +
                      ")"
                  )
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "pt-3 pr-3" }, [
                  _vm.defItem.verificationidfile != null
                    ? _c("div", [
                        _c(
                          "a",
                          {
                            staticClass: "flex py-2 px-4 cursor-pointer ",
                            attrs: {
                              href: _vm.attachment,
                              target: "_blank",
                              download: _vm.defItem.verificationidfile
                            }
                          },
                          [
                            _c("feather-icon", {
                              attrs: {
                                icon: "PaperclipIcon",
                                svgClasses: "w-4 h-4"
                              }
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "ml-2" }, [
                              _vm._v(_vm._s(_vm.defItem.verificationidfile))
                            ])
                          ],
                          1
                        )
                      ])
                    : _vm._e()
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "font-bold pt-12" }, [
              _vm._v("Present Address")
            ]),
            _vm._v(" "),
            _c("vs-divider", {}),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row flex pb-2" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [_vm._v("Address:")]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(
                  _vm._s(_vm.defItem.presentaddressline1) +
                    " " +
                    _vm._s(_vm.defItem.presentAddressL2)
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [_vm._v("City:")]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.presentaddresscity))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Post Code:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.presentaddresspostcode))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "font-bold pt-12" }, [
              _vm._v("Permanent Address")
            ]),
            _vm._v(" "),
            _c("vs-divider", {}),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row flex pb-2" }, [
              _c("div", { staticClass: "edit-prev-ttl" }, [_vm._v("Address:")]),
              _vm._v(" "),
              _c("div", { staticClass: "edit-prev-dt" }, [
                _vm._v(
                  _vm._s(_vm.defItem.permanentaddressline1) +
                    " " +
                    _vm._s(_vm.defItem.permanentaddressline2)
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [_vm._v("City:")]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.permanentaddresscity))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 edit-prev-cont" }, [
                _c("div", { staticClass: "edit-prev-ttl" }, [
                  _vm._v("Post Code:")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "edit-prev-dt" }, [
                  _vm._v(_vm._s(_vm.defItem.permanentaddresspostcode))
                ])
              ])
            ])
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", [
          _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "vx-col md:w-1/2 w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full mt-4",
                  attrs: { label: "Office email" },
                  model: {
                    value: _vm.officeEmail,
                    callback: function($$v) {
                      _vm.officeEmail = $$v
                    },
                    expression: "officeEmail"
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
                _c("vs-input", {
                  staticClass: "w-full mt-4",
                  attrs: { label: "Personal phone" },
                  model: {
                    value: _vm.personalPhone,
                    callback: function($$v) {
                      _vm.personalPhone = $$v
                    },
                    expression: "personalPhone"
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
                _c("vs-input", {
                  staticClass: "w-full mt-4",
                  attrs: { label: "Office Phone" },
                  model: {
                    value: _vm.officePhone,
                    callback: function($$v) {
                      _vm.officePhone = $$v
                    },
                    expression: "officePhone"
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
                _c("v-date-picker", {
                  attrs: { color: "purple", masks: { input: "YYYY-MM-DD" } },
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
                                  staticClass: "w-full mt-4",
                                  attrs: {
                                    "icon-pack": "feather",
                                    icon: "icon icon-calendar",
                                    label: "* Date of birth",
                                    value: inputValue
                                  }
                                },
                                inputEvents
                              )
                            )
                          ]
                        }
                      }
                    ],
                    null,
                    false,
                    2857588128
                  ),
                  model: {
                    value: _vm.dateOfBirth,
                    callback: function($$v) {
                      _vm.dateOfBirth = $$v
                    },
                    expression: "dateOfBirth"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "mt-4 vx-col md:w-1/2 w-full px-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "Bloodgroup", label: "Bloodgroup" },
                    model: {
                      value: _vm.bloodgroup,
                      callback: function($$v) {
                        _vm.bloodgroup = $$v
                      },
                      expression: "bloodgroup"
                    }
                  },
                  _vm._l(_vm.bloodgroupData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
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
              { staticClass: "mt-4 md:w-1/2 w-full pt-1 px-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "Gender", label: "Gender" },
                    model: {
                      value: _vm.gender,
                      callback: function($$v) {
                        _vm.gender = $$v
                      },
                      expression: "gender"
                    }
                  },
                  _vm._l(_vm.genderData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
                    })
                  }),
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full flex pt-10" }, [
              _c(
                "div",
                [
                  _c(
                    "vs-checkbox",
                    {
                      model: {
                        value: _vm.meritalStatus,
                        callback: function($$v) {
                          _vm.meritalStatus = $$v
                        },
                        expression: "meritalStatus"
                      }
                    },
                    [_vm._v("Marital status")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "mt-4 md:w-1/2 w-full px-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "Religion", label: "Religion" },
                    model: {
                      value: _vm.religion,
                      callback: function($$v) {
                        _vm.religion = $$v
                      },
                      expression: "religion"
                    }
                  },
                  _vm._l(_vm.religionData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
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
              { staticClass: "mt-4 md:w-1/2 w-full px-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "Nationality", label: "Nationality" },
                    model: {
                      value: _vm.nationality,
                      callback: function($$v) {
                        _vm.nationality = $$v
                      },
                      expression: "nationality"
                    }
                  },
                  _vm._l(_vm.nationalityData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
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
              { staticClass: "mt-4 md:w-1/2 w-full px-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "NID/Passport",
                      label: "NID/Passport"
                    },
                    model: {
                      value: _vm.verificationidtype,
                      callback: function($$v) {
                        _vm.verificationidtype = $$v
                      },
                      expression: "verificationidtype"
                    }
                  },
                  _vm._l(_vm.verificationIdOption, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item, text: item }
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
                  attrs: { label: "NID/Passport number" },
                  model: {
                    value: _vm.verificationIdNumber,
                    callback: function($$v) {
                      _vm.verificationIdNumber = $$v
                    },
                    expression: "verificationIdNumber"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
              _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                _vm._v("NID/Passport:")
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
                        attrs: { size: "small", color: "gray" },
                        on: {
                          click: function($event) {
                            return _vm.attachmentInput()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                            browse\n                        "
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "pl-3 pt-3" }, [
                  _vm._v(_vm._s(_vm.verificationIdFileName))
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "font-bold pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [_vm._v(" Present address\n        ")]
          ),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("vs-input", {
                staticClass: "w-full mt-4",
                attrs: { label: "Address line 1" },
                model: {
                  value: _vm.presentAddressLine1,
                  callback: function($$v) {
                    _vm.presentAddressLine1 = $$v
                  },
                  expression: "presentAddressLine1"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("vs-input", {
                staticClass: "w-full mt-4",
                attrs: { label: "Address line 2" },
                model: {
                  value: _vm.presentAddressLine2,
                  callback: function($$v) {
                    _vm.presentAddressLine2 = $$v
                  },
                  expression: "presentAddressLine2"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "flex" }, [
            _c(
              "div",
              { staticClass: "w-full pr-1 pt-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "City", label: "City" },
                    on: {
                      input: function($event) {
                        return _vm.manageInfo("presentAddressCity")
                      }
                    },
                    model: {
                      value: _vm.presentAddressCitySelect,
                      callback: function($$v) {
                        _vm.presentAddressCitySelect = $$v
                      },
                      expression: "presentAddressCitySelect"
                    }
                  },
                  _vm._l(_vm.addressCityData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.value, text: item.value }
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
              { staticClass: "w-full pl-1" },
              [
                _c("vs-input", {
                  staticClass: "w-full mt-4",
                  attrs: { label: "post code" },
                  model: {
                    value: _vm.presentAddressPostCode,
                    callback: function($$v) {
                      _vm.presentAddressPostCode = $$v
                    },
                    expression: "presentAddressPostCode"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _vm.presentAddressCityOtherView
            ? _c(
                "div",
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "City/Area" },
                    model: {
                      value: _vm.presentAddressCity,
                      callback: function($$v) {
                        _vm.presentAddressCity = $$v
                      },
                      expression: "presentAddressCity"
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "font-bold pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [_vm._v("\n            Permanent address\n        ")]
          ),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("vs-input", {
                staticClass: "w-full mt-4",
                attrs: { label: "Address  line 1" },
                model: {
                  value: _vm.permanentAddressLine1,
                  callback: function($$v) {
                    _vm.permanentAddressLine1 = $$v
                  },
                  expression: "permanentAddressLine1"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("vs-input", {
                staticClass: "w-full mt-4",
                attrs: { label: "Address line 2" },
                model: {
                  value: _vm.permanentAddressLine2,
                  callback: function($$v) {
                    _vm.permanentAddressLine2 = $$v
                  },
                  expression: "permanentAddressLine2"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "flex" }, [
            _c(
              "div",
              { staticClass: "w-full pr-1 pt-4" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "City", label: "City" },
                    on: {
                      input: function($event) {
                        return _vm.manageInfo("permanentAddressCity")
                      }
                    },
                    model: {
                      value: _vm.permanentAddressCitySelect,
                      callback: function($$v) {
                        _vm.permanentAddressCitySelect = $$v
                      },
                      expression: "permanentAddressCitySelect"
                    }
                  },
                  _vm._l(_vm.addressCityData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.value, text: item.value }
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
              { staticClass: "w-full pl-1" },
              [
                _c("vs-input", {
                  staticClass: "w-full mt-4",
                  attrs: { label: "post code" },
                  model: {
                    value: _vm.permanentaddressPostCode,
                    callback: function($$v) {
                      _vm.permanentaddressPostCode = $$v
                    },
                    expression: "permanentaddressPostCode"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _vm.permanentAddressCityOtherView
            ? _c(
                "div",
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "City/Area" },
                    model: {
                      value: _vm.permanentAddressCity,
                      callback: function($$v) {
                        _vm.permanentAddressCity = $$v
                      },
                      expression: "permanentAddressCity"
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.editMode = false
                      }
                    }
                  },
                  [_vm._v("Cancel\n                ")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
                      }
                    }
                  },
                  [_vm._v("Save\n                ")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=template&id=3ac29016&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=template&id=3ac29016& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    !_vm.editMode
      ? _c("div", [
          _c(
            "div",
            {
              staticClass: "vx-col w-full flex pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [
              _c("div", { staticClass: "flex-auto font-bold" }, [
                _vm._v("Job History - " + _vm._s(_vm.ser + 1))
              ]),
              _vm._v(" "),
              _c(
                "div",
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
                        return _vm.deleteJob(_vm.defItem.id)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "pl-2" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-edit"
                    },
                    on: {
                      click: function($event) {
                        _vm.editMode = !_vm.editMode
                      }
                    }
                  })
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c("div", { staticClass: "mt-4" }, [
                _c("div", { staticClass: "w-full" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Organization name:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.orgName))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "mt-2" }, [
                _c("div", { staticClass: "w-full" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Designation:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.designation))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c("div", { staticClass: "mt-2" }, [
                _c("div", { staticClass: "w-full pt-1" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("job duration:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.jobDuration))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-full pt-8" }, [
              _c("div", [
                _c("div", { staticClass: "w-full mt-3" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Responsibility:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.responsibility))
                ])
              ]),
              _vm._v(" "),
              _c("div", [
                _c("div", { staticClass: "w-full mt-3" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Skill:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.skill))
                ])
              ])
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", [
          _c(
            "div",
            {
              staticClass: "vx-col w-full flex pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [
              _c("div", { staticClass: "flex-auto font-bold" }, [
                _vm._v("Job History - " + _vm._s(_vm.ser + 1))
              ]),
              _vm._v(" "),
              _c(
                "div",
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
                        return _vm.deleteJob()
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "pl-2" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-edit"
                    },
                    on: {
                      click: function($event) {
                        _vm.editMode = !_vm.editMode
                      }
                    }
                  })
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "* Organization name" },
                    model: {
                      value: _vm.job.orgName,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "orgName", $$v)
                      },
                      expression: "job.orgName"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.orgName,
                      name: "orgName",
                      altName: "organization name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mt-2" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Designation",
                        label: "* Designation"
                      },
                      model: {
                        value: _vm.job.designation,
                        callback: function($$v) {
                          _vm.$set(_vm.job, "designation", $$v)
                        },
                        expression: "job.designation"
                      }
                    },
                    _vm._l(_vm.designationData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item.id, text: item.value }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.designation,
                      name: "designation",
                      altName: "designation"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c("v-date-picker", {
                    attrs: {
                      "is-range": "",
                      color: "purple",
                      masks: { input: "YYYY-MM-DD" }
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
                                    staticClass: "w-full mt-4",
                                    attrs: {
                                      "icon-pack": "feather",
                                      icon: "icon icon-calendar",
                                      label: "* Job Duration",
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
                      3755079664
                    ),
                    model: {
                      value: _vm.job.jobDuration,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "jobDuration", $$v)
                      },
                      expression: "job.jobDuration"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.jobDuration,
                      name: "jobDuration",
                      altName: "job duration"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-full" }, [
              _c(
                "div",
                { staticClass: "pt-6" },
                [
                  _c("vs-textarea", {
                    attrs: { label: "* Responsibility" },
                    model: {
                      value: _vm.job.responsibility,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "responsibility", $$v)
                      },
                      expression: "job.responsibility"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.responsibility,
                      name: "responsibility",
                      altName: "responsibility"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: { label: "* Skill " },
                    model: {
                      value: _vm.job.skill,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "skill", $$v)
                      },
                      expression: "job.skill"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.skill,
                      name: "skill",
                      altName: "skill"
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.editMode = false
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=template&id=4e11d308&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=template&id=4e11d308& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
      !_vm.editMode
        ? _c("div", [
            _c(
              "div",
              {
                staticClass: "img-container pb-4 sm:flex",
                staticStyle: { "border-bottom": "1px solid rgb(0,0,0,.1)" }
              },
              [
                _c("div", [
                  _c("img", {
                    staticStyle: {
                      "max-width": "200px",
                      "border-radius": "50%",
                      border: "1px solid rgb(0,0,0,.1)"
                    },
                    attrs: { src: _vm.defLogo }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-xl pl-20 py-2 flex w-full" }, [
                  _c("div", { staticClass: "w-full" }, [
                    _c("table", [
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Name: ")
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(_vm.dafUserData.name))])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Role: ")
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(_vm.defSelectedRole))])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Email: ")
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(_vm.dafUserData.email))])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Company: ")
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(_vm.dafUserData.company))])
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", [
                    _c(
                      "div",
                      { staticClass: "pl-2" },
                      [
                        _c("vs-button", {
                          attrs: {
                            size: "small",
                            "icon-pack": "feather",
                            icon: "icon-edit"
                          },
                          on: {
                            click: function($event) {
                              _vm.editMode = !_vm.editMode
                            }
                          }
                        })
                      ],
                      1
                    )
                  ])
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "pt-12" }, [
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
                _c(
                  "table",
                  { staticClass: "w-full" },
                  _vm._l(_vm.defPerm, function(val, index) {
                    return _c(
                      "tr",
                      { key: index },
                      [
                        _c("td", { staticClass: "px-3 py-2" }, [
                          _vm._v(_vm._s(val.name))
                        ]),
                        _vm._v(" "),
                        _vm._l(val.subpermissions, function(
                          permission,
                          permIndex
                        ) {
                          return _c(
                            "td",
                            { key: permIndex, staticClass: "px-3 py-2" },
                            [_c("div", [_vm._v(_vm._s(permission.title))])]
                          )
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
        : _vm._e(),
      _vm._v(" "),
      _vm.editMode
        ? _c("div", [
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "ml-5" }, [
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
                  [_vm._v("Upload user profile picture")]
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-row" },
              [
                _c(
                  "div",
                  { staticClass: "vx-col md:w-1/2 w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: { label: "* Name", name: "name" },
                      model: {
                        value: _vm.userData.name,
                        callback: function($$v) {
                          _vm.$set(_vm.userData, "name", $$v)
                        },
                        expression: "userData.name"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.userData.name,
                        name: "name"
                      }
                    }),
                    _vm._v(" "),
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: { label: "* Email", type: "email", name: "email" },
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
                    }),
                    _vm._v(" "),
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: {
                        icon: _vm.showPass
                          ? "icon icon-eye"
                          : "icon icon-eye-off",
                        type: _vm.showPass ? "text" : "password",
                        "icon-pack": "feather",
                        "icon-no-border": "",
                        "icon-after": "true",
                        label: "Password",
                        name: "password"
                      },
                      on: {
                        "icon-click": function($event) {
                          _vm.showPass = !_vm.showPass
                        }
                      },
                      model: {
                        value: _vm.userData.password,
                        callback: function($$v) {
                          _vm.$set(_vm.userData, "password", $$v)
                        },
                        expression: "userData.password"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.userData.password,
                        name: "password"
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
                            attrs: { placeholder: "Role", label: "* Role" },
                            on: {
                              input: function($event) {
                                return _vm.roleSelected()
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
                              attrs: { value: item.name, text: item.name }
                            })
                          }),
                          1
                        ),
                        _vm._v(" "),
                        _c("validate-data", {
                          attrs: {
                            rules: "required",
                            value: _vm.selectedRole,
                            name: "role"
                          }
                        })
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
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vx-card",
                  { staticClass: "mt-base", attrs: { "no-shadow": "" } },
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
                    _c("div", { staticClass: "block overflow-x-auto" }, [
                      _c(
                        "table",
                        { staticClass: "w-full" },
                        _vm._l(_vm.permissionsManager, function(val, index) {
                          return _c(
                            "tr",
                            { key: index },
                            [
                              _c("td", { staticClass: "px-3 py-2" }, [
                                _vm._v(_vm._s(val.name))
                              ]),
                              _vm._v(" "),
                              _vm._l(val.subpermissions, function(
                                permission,
                                permIndex
                              ) {
                                return _c(
                                  "td",
                                  { key: permIndex, staticClass: "px-3 py-2" },
                                  [
                                    _c(
                                      "vs-checkbox",
                                      {
                                        model: {
                                          value: permission.status,
                                          callback: function($$v) {
                                            _vm.$set(permission, "status", $$v)
                                          },
                                          expression: "permission.status"
                                        }
                                      },
                                      [_vm._v(_vm._s(permission.title))]
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
                    ])
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "flex",
                staticStyle: { "border-top": "1px solid rgb(0,0,0,.1)" }
              },
              [
                _c("div", { staticClass: "flex-auto" }),
                _vm._v(" "),
                _c(
                  "div",
                  [
                    _c(
                      "vs-button",
                      {
                        staticClass: "ml-auto mt-2",
                        attrs: { color: "danger" },
                        on: {
                          click: function($event) {
                            _vm.editMode = !_vm.editMode
                          }
                        }
                      },
                      [_vm._v("Cancel")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "pl-2" },
                  [
                    _c(
                      "vs-button",
                      {
                        staticClass: "ml-auto mt-2",
                        attrs: { disabled: _vm.btnDisabled },
                        on: {
                          click: function($event) {
                            return _vm.saveData()
                          }
                        }
                      },
                      [_vm._v("Save")]
                    )
                  ],
                  1
                )
              ]
            )
          ])
        : _vm._e(),
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
              on: {
                click: function($event) {
                  return _vm.crop()
                }
              }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=template&id=2e46c10f&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=template&id=2e46c10f& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
      staticClass: "pt-3 mt-5",
      staticStyle: { "border-top": "1px solid #f2f2f2" }
    },
    [
      _vm.addNew
        ? _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Degree Name",
                        label: "* Degree Name"
                      },
                      on: {
                        input: function($event) {
                          return _vm.manageEducation(
                            "degreeType",
                            _vm.education
                          )
                        }
                      },
                      model: {
                        value: _vm.education.degreeName,
                        callback: function($$v) {
                          _vm.$set(_vm.education, "degreeName", $$v)
                        },
                        expression: "education.degreeName"
                      }
                    },
                    _vm._l(_vm.degreeData, function(degreeItIem, degreeIndex) {
                      return _c("vs-select-item", {
                        key: degreeIndex,
                        attrs: {
                          value: degreeItIem.value,
                          text: degreeItIem.value
                        }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.education.degreeName,
                      name: "degreeName",
                      altName: "degree name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _vm.education.viewInstituteSelect
                ? _c(
                    "div",
                    { staticClass: "mt-4" },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "Institute name",
                            label: "* Institute name"
                          },
                          on: {
                            input: function($event) {
                              return _vm.manageEducation(
                                "otherInstitute",
                                _vm.education
                              )
                            }
                          },
                          model: {
                            value: _vm.education.instituteNameSelect,
                            callback: function($$v) {
                              _vm.$set(
                                _vm.education,
                                "instituteNameSelect",
                                $$v
                              )
                            },
                            expression: "education.instituteNameSelect"
                          }
                        },
                        _vm._l(_vm.instituteData, function(
                          instituteItem,
                          instituteIndex
                        ) {
                          return _c("vs-select-item", {
                            key: instituteIndex,
                            attrs: {
                              value: instituteItem.value,
                              text: instituteItem.value
                            }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.education.instituteName,
                          name: "instituteName",
                          altName: "institute name"
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.education.viewInstituteinput
                ? _c(
                    "div",
                    { staticClass: "mt-4" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "* Institute name" },
                        model: {
                          value: _vm.education.instituteName,
                          callback: function($$v) {
                            _vm.$set(_vm.education, "instituteName", $$v)
                          },
                          expression: "education.instituteName"
                        }
                      }),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.education.instituteName,
                          name: "instituteName",
                          altName: "institute name"
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Passing year",
                        label: "* Passing year"
                      },
                      model: {
                        value: _vm.education.passingYear,
                        callback: function($$v) {
                          _vm.$set(_vm.education, "passingYear", $$v)
                        },
                        expression: "education.passingYear"
                      }
                    },
                    _vm._l(_vm.passinfYearList, function(
                      passingYearItem,
                      passingYearIndex
                    ) {
                      return _c("vs-select-item", {
                        key: passingYearIndex,
                        attrs: { value: passingYearItem, text: passingYearItem }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.education.passingYear,
                      name: "passingYear",
                      altName: "passing year"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c("div", { staticClass: "mt-4" }, [
                _c(
                  "div",
                  { staticClass: "mt-4" },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          placeholder: "Result type",
                          label: "* Result type"
                        },
                        on: {
                          input: function($event) {
                            return _vm.manageEducation(
                              "resultType",
                              _vm.education
                            )
                          }
                        },
                        model: {
                          value: _vm.education.resultType,
                          callback: function($$v) {
                            _vm.$set(_vm.education, "resultType", $$v)
                          },
                          expression: "education.resultType"
                        }
                      },
                      _vm._l(_vm.resultOption, function(
                        resultIem,
                        resultIndex
                      ) {
                        return _c("vs-select-item", {
                          key: resultIndex,
                          attrs: { value: resultIem, text: resultIem }
                        })
                      }),
                      1
                    ),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.education.resultType,
                        name: "resultType",
                        altName: "result type"
                      }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _vm.education.viewCgpa
                ? _c(
                    "div",
                    { staticClass: "mt-3" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: { label: "* Out of" },
                        model: {
                          value: _vm.education.outof,
                          callback: function($$v) {
                            _vm.$set(_vm.education, "outof", $$v)
                          },
                          expression: "education.outof"
                        }
                      }),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.education.outof,
                          name: "outof",
                          altName: "out of"
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.education.viewCgpa
                ? _c(
                    "div",
                    { staticClass: "mt-3" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "* CGPA  " },
                        model: {
                          value: _vm.education.cgpa,
                          callback: function($$v) {
                            _vm.$set(_vm.education, "cgpa", $$v)
                          },
                          expression: "education.cgpa"
                        }
                      }),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.education.cgpa,
                          name: "cgpa",
                          altName: "CGPA"
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.education.viewDivision
                ? _c("div", { staticClass: "mt-4" }, [
                    _c(
                      "div",
                      { staticClass: "mt-4" },
                      [
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            attrs: {
                              placeholder: "Division",
                              label: "* Division"
                            },
                            model: {
                              value: _vm.education.division,
                              callback: function($$v) {
                                _vm.$set(_vm.education, "division", $$v)
                              },
                              expression: "education.division"
                            }
                          },
                          _vm._l(_vm.divisionData, function(
                            divisionItem,
                            divisionIndex
                          ) {
                            return _c("vs-select-item", {
                              key: divisionIndex,
                              attrs: {
                                value: divisionItem.id,
                                text: divisionItem.value
                              }
                            })
                          }),
                          1
                        ),
                        _vm._v(" "),
                        _c("validate-data", {
                          attrs: {
                            rules: "required",
                            value: _vm.education.division,
                            name: "division",
                            altName: "division"
                          }
                        })
                      ],
                      1
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
              _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                _vm._v("Certificate attachment: ")
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
                        attrs: { size: "small", color: "gray" },
                        on: {
                          click: function($event) {
                            return _vm.attachmentInput("certificate", _vm.index)
                          }
                        }
                      },
                      [_vm._v("browse")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "pl-3 pt-3" }, [
                  _vm._v(_vm._s(_vm.education.attachmentName))
                ])
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "w-full flex pr-2" }, [
        _c("div", { staticClass: "flex-auto" }),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.addNew = false
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                )
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
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
        !_vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small" },
                    on: {
                      click: function($event) {
                        _vm.addNew = true
                      }
                    }
                  },
                  [_vm._v("Add new")]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "pt-3 mt-5",
      staticStyle: { "border-top": "1px solid #f2f2f2" }
    },
    [
      _vm.addNew
        ? _c("div", [
            _c("div", [
              _c("div", { staticClass: "vx-row" }, [
                _c(
                  "div",
                  { staticClass: "vx-col md:w-1/2 w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: { label: "Document Title" },
                      model: {
                        value: _vm.doc.document_title,
                        callback: function($$v) {
                          _vm.$set(_vm.doc, "document_title", $$v)
                        },
                        expression: "doc.document_title"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.doc.document_title,
                        name: "document_title",
                        altName: "Document Title"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
                  _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                    _vm._v("Document Attachment: ")
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
                            attrs: { size: "small", color: "gray" },
                            on: {
                              click: function($event) {
                                return _vm.attachmentInput()
                              }
                            }
                          },
                          [_vm._v("browse")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "pl-3 pt-3" }, [
                      _vm._v(_vm._s(_vm.doc.documentAttachmentName))
                    ])
                  ])
                ])
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
        _c("div", { staticClass: "flex-auto" }),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              [
                _vm.addNew
                  ? _c(
                      "vs-button",
                      {
                        staticClass: "ml-auto mt-2",
                        attrs: { size: "small", color: "danger" },
                        on: {
                          click: function($event) {
                            _vm.addNew = false
                          }
                        }
                      },
                      [_vm._v("Cancel")]
                    )
                  : _vm._e()
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
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
        !_vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small" },
                    on: {
                      click: function($event) {
                        _vm.addNew = true
                      }
                    }
                  },
                  [_vm._v("Add new")]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=template&id=450db2a8&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=template&id=450db2a8& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
      staticClass: "pt-3 mt-5",
      staticStyle: { "border-top": "1px solid #f2f2f2" }
    },
    [
      _vm.addNew
        ? _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "* Organization name" },
                    model: {
                      value: _vm.job.orgName,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "orgName", $$v)
                      },
                      expression: "job.orgName"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.orgName,
                      name: "orgName",
                      altName: "organization name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mt-2" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Designation",
                        label: "* Designation"
                      },
                      model: {
                        value: _vm.job.designation,
                        callback: function($$v) {
                          _vm.$set(_vm.job, "designation", $$v)
                        },
                        expression: "job.designation"
                      }
                    },
                    _vm._l(_vm.designationData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item.id, text: item.value }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.designation,
                      name: "designation",
                      altName: "designation"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c("v-date-picker", {
                    attrs: {
                      "is-range": "",
                      color: "purple",
                      masks: { input: "YYYY-MM-DD" }
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
                                    staticClass: "w-full mt-4",
                                    attrs: {
                                      "icon-pack": "feather",
                                      icon: "icon icon-calendar",
                                      label: "* Job Duration",
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
                      3755079664
                    ),
                    model: {
                      value: _vm.job.jobDuration,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "jobDuration", $$v)
                      },
                      expression: "job.jobDuration"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.jobDuration,
                      name: "jobDuration",
                      altName: "job duration"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-full" }, [
              _c(
                "div",
                { staticClass: "pt-6" },
                [
                  _c("vs-textarea", {
                    attrs: { label: "* Responsibility" },
                    model: {
                      value: _vm.job.responsibility,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "responsibility", $$v)
                      },
                      expression: "job.responsibility"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.responsibility,
                      name: "responsibility",
                      altName: "responsibility"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: { label: "* Skill " },
                    model: {
                      value: _vm.job.skill,
                      callback: function($$v) {
                        _vm.$set(_vm.job, "skill", $$v)
                      },
                      expression: "job.skill"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.job.skill,
                      name: "skill",
                      altName: "skill"
                    }
                  })
                ],
                1
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
        _c("div", { staticClass: "flex-auto" }),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              [
                _vm.addNew
                  ? _c(
                      "vs-button",
                      {
                        staticClass: "ml-auto mt-2",
                        attrs: { size: "small", color: "danger" },
                        on: {
                          click: function($event) {
                            _vm.addNew = false
                          }
                        }
                      },
                      [_vm._v("Cancel")]
                    )
                  : _vm._e()
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
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
        !_vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small" },
                    on: {
                      click: function($event) {
                        _vm.addNew = true
                      }
                    }
                  },
                  [_vm._v("Add new")]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=template&id=0d4c4490&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=template&id=0d4c4490& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
      staticClass: "pt-3 mt-5",
      staticStyle: { "border-top": "1px solid #f2f2f2" }
    },
    [
      _vm.addNew
        ? _c("div", [
            _c("div", [
              _c("div", { staticClass: "vx-row" }, [
                _c(
                  "div",
                  { staticClass: "vx-col md:w-1/2 w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: { label: "* family member name " },
                      model: {
                        value: _vm.nominee.familymembername,
                        callback: function($$v) {
                          _vm.$set(_vm.nominee, "familymembername", $$v)
                        },
                        expression: "nominee.familymembername"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.nominee.familymembername,
                        name: "familymembername",
                        altName: "family member name"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "mt-4 vx-col md:w-1/2 w-full" },
                  [
                    _c(
                      "vs-select",
                      {
                        staticClass: "w-full",
                        attrs: {
                          placeholder: "Relationship type",
                          label: "* Relationship type"
                        },
                        model: {
                          value: _vm.nominee.relationshiptype,
                          callback: function($$v) {
                            _vm.$set(_vm.nominee, "relationshiptype", $$v)
                          },
                          expression: "nominee.relationshiptype"
                        }
                      },
                      _vm._l(_vm.relationshipTypeData, function(item, index) {
                        return _c("vs-select-item", {
                          key: index,
                          attrs: { value: item.id, text: item.value }
                        })
                      }),
                      1
                    ),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.nominee.relationshiptype,
                        name: "relationshiptype",
                        altName: "relationship type"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
                  _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                    _vm._v("Id attachment: ")
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
                            attrs: { size: "small", color: "gray" },
                            on: {
                              click: function($event) {
                                return _vm.attachmentInput()
                              }
                            }
                          },
                          [_vm._v("browse")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "pl-3 pt-3" }, [
                      _vm._v(_vm._s(_vm.nominee.nomineeAttachmentName))
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
                  _c(
                    "div",
                    { staticClass: "mt-4 pt-1" },
                    [
                      _c(
                        "vs-checkbox",
                        {
                          model: {
                            value: _vm.nominee.nominee,
                            callback: function($$v) {
                              _vm.$set(_vm.nominee, "nominee", $$v)
                            },
                            expression: "nominee.nominee"
                          }
                        },
                        [_vm._v("Nominee")]
                      )
                    ],
                    1
                  )
                ])
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
        _c("div", { staticClass: "flex-auto" }),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              [
                _vm.addNew
                  ? _c(
                      "vs-button",
                      {
                        staticClass: "ml-auto mt-2",
                        attrs: { size: "small", color: "danger" },
                        on: {
                          click: function($event) {
                            _vm.addNew = false
                          }
                        }
                      },
                      [_vm._v("Cancel")]
                    )
                  : _vm._e()
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
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
        !_vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small" },
                    on: {
                      click: function($event) {
                        _vm.addNew = true
                      }
                    }
                  },
                  [_vm._v("Add new")]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=template&id=93f83960&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=template&id=93f83960& ***!
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
    {
      staticClass: "pt-3 mt-8",
      staticStyle: { "border-top": "1px solid #f2f2f2" }
    },
    [
      _vm.addNew
        ? _c("div", { staticClass: "vx-row pt-3" }, [
            _c(
              "div",
              { staticClass: "vx-col md:w-1/2 w-full" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "skill name", label: "* skill name" },
                    model: {
                      value: _vm.skill.skillsname,
                      callback: function($$v) {
                        _vm.$set(_vm.skill, "skillsname", $$v)
                      },
                      expression: "skill.skillsname"
                    }
                  },
                  _vm._l(_vm.skillNameData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.skill.skillsname,
                    name: "skillsname",
                    altName: "skill name"
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
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "skill scale",
                      label: "* skill scale"
                    },
                    model: {
                      value: _vm.skill.skillsscale,
                      callback: function($$v) {
                        _vm.$set(_vm.skill, "skillsscale", $$v)
                      },
                      expression: "skill.skillsscale"
                    }
                  },
                  _vm._l(_vm.skillScaleData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.skill.skillsscale,
                    name: "skillsscale",
                    altName: "skill scale"
                  }
                })
              ],
              1
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
        _c("div", { staticClass: "flex-auto" }),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              [
                _vm.addNew
                  ? _c(
                      "vs-button",
                      {
                        staticClass: "ml-auto mt-2",
                        attrs: { size: "small", color: "danger" },
                        on: {
                          click: function($event) {
                            _vm.addNew = false
                          }
                        }
                      },
                      [_vm._v("Cancel")]
                    )
                  : _vm._e()
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
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
        !_vm.addNew
          ? _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small" },
                    on: {
                      click: function($event) {
                        _vm.addNew = true
                      }
                    }
                  },
                  [_vm._v("Add new")]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=template&id=42f71ab0&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=template&id=42f71ab0& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    !_vm.editMode
      ? _c("div", [
          _c("div", [
            _c(
              "div",
              {
                staticClass: "vx-col w-full flex pt-8 pb-2",
                staticStyle: { "border-bottom": "1px solid #f2f2f2" }
              },
              [
                _c("div", { staticClass: "flex-auto font-bold" }, [
                  _vm._v("Nominee - " + _vm._s(_vm.ser + 1))
                ]),
                _vm._v(" "),
                _c(
                  "div",
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
                          return _vm.deleteNominee(_vm.defItem.id)
                        }
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "pl-2" },
                  [
                    _c("vs-button", {
                      attrs: {
                        size: "small",
                        "icon-pack": "feather",
                        icon: "icon-edit"
                      },
                      on: {
                        click: function($event) {
                          _vm.editMode = !_vm.editMode
                        }
                      }
                    })
                  ],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c("div", { staticClass: "mt-4 vx-col md:w-1/2 w-full" }, [
                _c("div", { staticClass: "w-full" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Family member name:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.familymembername))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "mt-4 vx-col md:w-1/2 w-full" }, [
                _c("div", { staticClass: "w-full" }, [
                  _c("span", { staticClass: "font-bold pr-2" }, [
                    _vm._v("Relationship type:")
                  ]),
                  _vm._v(_vm._s(_vm.defItem.relationshiptype))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
                _c("div", { staticClass: "mt-4 pt-1" }, [
                  _c("div", { staticClass: "w-full" }, [
                    _c("span", { staticClass: "font-bold pr-2" }, [
                      _vm._v("Status:")
                    ]),
                    _vm._v(_vm._s(_vm.defItem.nominee))
                  ])
                ])
              ]),
              _vm._v(" "),
              _vm.defItem.savedFileName != null
                ? _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
                    _c(
                      "a",
                      {
                        staticClass: "flex py-2 px-4 cursor-pointer ",
                        attrs: {
                          href: _vm.defItem.nomineeAttachment,
                          download: _vm.defItem.savedFileName
                        }
                      },
                      [
                        _c("feather-icon", {
                          attrs: {
                            icon: "PaperclipIcon",
                            svgClasses: "w-4 h-4"
                          }
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "ml-2" }, [
                          _vm._v(_vm._s(_vm.defItem.savedFileName))
                        ])
                      ],
                      1
                    )
                  ])
                : _vm._e()
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", [
          _c("div", [
            _c(
              "div",
              {
                staticClass: "vx-col w-full flex pt-8 pb-2",
                staticStyle: { "border-bottom": "1px solid #f2f2f2" }
              },
              [
                _c("div", { staticClass: "flex-auto font-bold" }, [
                  _vm._v("Nominee - " + _vm._s(_vm.ser + 1))
                ]),
                _vm._v(" "),
                _c(
                  "div",
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
                          return _vm.deleteNominee()
                        }
                      }
                    })
                  ],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-row" }, [
              _c(
                "div",
                { staticClass: "vx-col md:w-1/2 w-full" },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "* family member name " },
                    model: {
                      value: _vm.nominee.familymembername,
                      callback: function($$v) {
                        _vm.$set(_vm.nominee, "familymembername", $$v)
                      },
                      expression: "nominee.familymembername"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.nominee.familymembername,
                      name: "familymembername",
                      altName: "family member name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mt-4 vx-col md:w-1/2 w-full" },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Relationship type",
                        label: "* Relationship type"
                      },
                      model: {
                        value: _vm.nominee.relationshiptype,
                        callback: function($$v) {
                          _vm.$set(_vm.nominee, "relationshiptype", $$v)
                        },
                        expression: "nominee.relationshiptype"
                      }
                    },
                    _vm._l(_vm.relationshipTypeData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item.id, text: item.value }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.nominee.relationshiptype,
                      name: "relationshiptype",
                      altName: "relationship type"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
                _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                  _vm._v("Id attachment: ")
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
                          attrs: { size: "small", color: "gray" },
                          on: {
                            click: function($event) {
                              return _vm.attachmentInput()
                            }
                          }
                        },
                        [_vm._v("browse")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "pl-3 pt-3" }, [
                    _vm._v(_vm._s(_vm.nominee.nomineeAttachmentName))
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
                _c(
                  "div",
                  { staticClass: "mt-4 pt-1" },
                  [
                    _c(
                      "vs-checkbox",
                      {
                        model: {
                          value: _vm.nominee.nominee,
                          callback: function($$v) {
                            _vm.$set(_vm.nominee, "nominee", $$v)
                          },
                          expression: "nominee.nominee"
                        }
                      },
                      [_vm._v("Nominee")]
                    )
                  ],
                  1
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.editMode = false
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=template&id=da057420&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=template&id=da057420& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    !_vm.editMode
      ? _c("div", [
          _c(
            "div",
            {
              staticClass: "vx-col w-full flex pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [
              _c("div", { staticClass: "flex-auto font-bold" }, [
                _vm._v("Skill matrix - " + _vm._s(_vm.ser + 1))
              ]),
              _vm._v(" "),
              _c(
                "div",
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
                        return _vm.deleteSkill(_vm.defItem.id)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "pl-2" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-edit"
                    },
                    on: {
                      click: function($event) {
                        _vm.editMode = !_vm.editMode
                      }
                    }
                  })
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row pt-3" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c("div", { staticClass: "w-full" }, [
                _c("span", { staticClass: "font-bold pr-2" }, [
                  _vm._v("Skill name:")
                ]),
                _vm._v(_vm._s(_vm.defItem.skillsname))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c("div", { staticClass: "w-full" }, [
                _c("span", { staticClass: "font-bold pr-2" }, [
                  _vm._v("Skill scale:")
                ]),
                _vm._v(_vm._s(_vm.defItem.skillsscale))
              ])
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", [
          _c(
            "div",
            {
              staticClass: "vx-col w-full flex pt-8 pb-2",
              staticStyle: { "border-bottom": "1px solid #f2f2f2" }
            },
            [
              _c("div", { staticClass: "flex-auto font-bold" }, [
                _vm._v("Skill matrix - " + _vm._s(_vm.ser + 1))
              ]),
              _vm._v(" "),
              _c(
                "div",
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
                        return _vm.deleteSkill()
                      }
                    }
                  })
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row pt-3" }, [
            _c(
              "div",
              { staticClass: "vx-col md:w-1/2 w-full" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "skill name", label: "* skill name" },
                    model: {
                      value: _vm.skill.skillsname,
                      callback: function($$v) {
                        _vm.$set(_vm.skill, "skillsname", $$v)
                      },
                      expression: "skill.skillsname"
                    }
                  },
                  _vm._l(_vm.skillNameData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.skill.skillsname,
                    name: "skillsname",
                    altName: "skill name"
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
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "skill scale",
                      label: "* skill scale"
                    },
                    model: {
                      value: _vm.skill.skillsscale,
                      callback: function($$v) {
                        _vm.$set(_vm.skill, "skillsscale", $$v)
                      },
                      expression: "skill.skillsscale"
                    }
                  },
                  _vm._l(_vm.skillScaleData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.value }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.skill.skillsscale,
                    name: "skillsscale",
                    altName: "skill scale"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-full flex", attrs: { align: "right" } }, [
            _c("div", { staticClass: "flex-auto" }),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", color: "danger" },
                    on: {
                      click: function($event) {
                        _vm.editMode = false
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "pl-2" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { size: "small", disabled: _vm.btnDisabled },
                    on: {
                      click: function($event) {
                        return _vm.saveData()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=template&id=92158146&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=template&id=92158146& ***!
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
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=template&id=5ee70d34&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=template&id=5ee70d34& ***!
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
    _c("div", [
      _c(
        "div",
        [
          _c(
            "vs-tabs",
            { staticClass: "tab-action-btn-fill-container" },
            [
              _c(
                "vs-tab",
                {
                  attrs: {
                    label: "Login Info",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [_c("login-info", { attrs: { reqData: _vm.reqData } })],
                1
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  staticStyle: { "min-height": "300px" },
                  attrs: {
                    label: "General Info",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [_c("general-info", { attrs: { reqData: _vm.reqData } })],
                1
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  attrs: {
                    label: "Feature",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [_c("feature-info", { attrs: { reqData: _vm.reqData } })],
                1
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  staticStyle: { "min-height": "300px" },
                  attrs: {
                    label: "Organization tree",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [
                  _c("div", [
                    _c(
                      "div",
                      { staticStyle: { "min-height": "220px" } },
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
                    _vm.treeSaveBtn
                      ? _c("div", { staticClass: "flex" }, [
                          _c("div", { staticClass: "flex-auto" }),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c(
                                "vs-button",
                                {
                                  staticClass: "mt-2",
                                  attrs: { size: "small" },
                                  on: {
                                    click: function($event) {
                                      return _vm.updateTree()
                                    }
                                  }
                                },
                                [_vm._v("Save")]
                              )
                            ],
                            1
                          )
                        ])
                      : _vm._e()
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  staticStyle: { "min-height": "300px" },
                  attrs: {
                    label: "Education History",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [
                  _vm._l(_vm.educationData, function(item, index) {
                    return _c(
                      "div",
                      { key: index },
                      [
                        _c("edu-history", {
                          attrs: {
                            reqData: _vm.reqData,
                            education: item,
                            ser: index
                          }
                        })
                      ],
                      1
                    )
                  }),
                  _vm._v(" "),
                  _c("new-edu-history", { attrs: { reqData: _vm.reqData } })
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  staticStyle: { "min-height": "300px" },
                  attrs: {
                    label: "Job History",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [
                  _vm._l(_vm.jobHistoryData, function(item, index) {
                    return _c(
                      "div",
                      { key: index },
                      [
                        _c("job-history", {
                          attrs: { reqData: _vm.reqData, job: item, ser: index }
                        })
                      ],
                      1
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "w-full" },
                    [
                      _c("new-job-history", { attrs: { reqData: _vm.reqData } })
                    ],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  staticStyle: { "min-height": "300px" },
                  attrs: {
                    label: "Nominee",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [
                  _vm._l(_vm.nomineeData, function(item, index) {
                    return _c(
                      "div",
                      { key: index },
                      [
                        _c("nominee-info", {
                          attrs: {
                            reqData: _vm.reqData,
                            nominee: item,
                            ser: index
                          }
                        })
                      ],
                      1
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [_c("new-nominee", { attrs: { reqData: _vm.reqData } })],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  staticStyle: { "min-height": "300px" },
                  attrs: {
                    label: "Skill Matrix",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [
                  _vm._l(_vm.skillMatrixData, function(item, index) {
                    return _c(
                      "div",
                      { key: index },
                      [
                        _c("skill-info", {
                          attrs: {
                            reqData: _vm.reqData,
                            skill: item,
                            ser: index
                          }
                        })
                      ],
                      1
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [_c("new-skill", { attrs: { reqData: _vm.reqData } })],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "vs-tab",
                {
                  staticStyle: { "min-height": "300px" },
                  attrs: {
                    label: "Employee Docs",
                    "icon-pack": "feather",
                    icon: "icon-file-text"
                  }
                },
                [
                  _vm._l(_vm.EmployeeDocumentData, function(item, index) {
                    return _c(
                      "div",
                      { key: index },
                      [
                        _c("employee-document", {
                          attrs: { reqData: _vm.reqData, doc: item, ser: index }
                        })
                      ],
                      1
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("new-employee-document", {
                        attrs: { reqData: _vm.reqData }
                      })
                    ],
                    1
                  )
                ],
                2
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

/***/ "./resources/js/src/views/app/user/user-edit/EduHistory.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/EduHistory.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EduHistory_vue_vue_type_template_id_23fb9e7d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EduHistory.vue?vue&type=template&id=23fb9e7d& */ "./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=template&id=23fb9e7d&");
/* harmony import */ var _EduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EduHistory.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EduHistory_vue_vue_type_template_id_23fb9e7d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EduHistory_vue_vue_type_template_id_23fb9e7d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/EduHistory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EduHistory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=template&id=23fb9e7d&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=template&id=23fb9e7d& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EduHistory_vue_vue_type_template_id_23fb9e7d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EduHistory.vue?vue&type=template&id=23fb9e7d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EduHistory.vue?vue&type=template&id=23fb9e7d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EduHistory_vue_vue_type_template_id_23fb9e7d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EduHistory_vue_vue_type_template_id_23fb9e7d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EmployeeDocument_vue_vue_type_template_id_69278cb0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EmployeeDocument.vue?vue&type=template&id=69278cb0& */ "./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=template&id=69278cb0&");
/* harmony import */ var _EmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmployeeDocument.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EmployeeDocument_vue_vue_type_template_id_69278cb0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EmployeeDocument_vue_vue_type_template_id_69278cb0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/EmployeeDocument.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EmployeeDocument.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=template&id=69278cb0&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=template&id=69278cb0& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EmployeeDocument_vue_vue_type_template_id_69278cb0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EmployeeDocument.vue?vue&type=template&id=69278cb0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/EmployeeDocument.vue?vue&type=template&id=69278cb0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EmployeeDocument_vue_vue_type_template_id_69278cb0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EmployeeDocument_vue_vue_type_template_id_69278cb0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/FeatureInfo.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FeatureInfo_vue_vue_type_template_id_41eb5755_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true& */ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true&");
/* harmony import */ var _FeatureInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeatureInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _FeatureInfo_vue_vue_type_style_index_0_id_41eb5755_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css& */ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FeatureInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FeatureInfo_vue_vue_type_template_id_41eb5755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FeatureInfo_vue_vue_type_template_id_41eb5755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "41eb5755",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/FeatureInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FeatureInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_style_index_0_id_41eb5755_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader??ref--7-1!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=style&index=0&id=41eb5755&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_style_index_0_id_41eb5755_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_style_index_0_id_41eb5755_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_style_index_0_id_41eb5755_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_style_index_0_id_41eb5755_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_template_id_41eb5755_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/FeatureInfo.vue?vue&type=template&id=41eb5755&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_template_id_41eb5755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureInfo_vue_vue_type_template_id_41eb5755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/GeneralInfo.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GeneralInfo_vue_vue_type_template_id_5b55d347_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true& */ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true&");
/* harmony import */ var _GeneralInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GeneralInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _GeneralInfo_vue_vue_type_style_index_0_id_5b55d347_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css& */ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GeneralInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GeneralInfo_vue_vue_type_template_id_5b55d347_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GeneralInfo_vue_vue_type_template_id_5b55d347_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5b55d347",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/GeneralInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneralInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_style_index_0_id_5b55d347_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader??ref--7-1!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=style&index=0&id=5b55d347&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_style_index_0_id_5b55d347_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_style_index_0_id_5b55d347_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_style_index_0_id_5b55d347_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_style_index_0_id_5b55d347_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_template_id_5b55d347_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/GeneralInfo.vue?vue&type=template&id=5b55d347&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_template_id_5b55d347_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneralInfo_vue_vue_type_template_id_5b55d347_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/JobHistory.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/JobHistory.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _JobHistory_vue_vue_type_template_id_3ac29016___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JobHistory.vue?vue&type=template&id=3ac29016& */ "./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=template&id=3ac29016&");
/* harmony import */ var _JobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JobHistory.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _JobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _JobHistory_vue_vue_type_template_id_3ac29016___WEBPACK_IMPORTED_MODULE_0__["render"],
  _JobHistory_vue_vue_type_template_id_3ac29016___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/JobHistory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_JobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./JobHistory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_JobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=template&id=3ac29016&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=template&id=3ac29016& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_JobHistory_vue_vue_type_template_id_3ac29016___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./JobHistory.vue?vue&type=template&id=3ac29016& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/JobHistory.vue?vue&type=template&id=3ac29016&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_JobHistory_vue_vue_type_template_id_3ac29016___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_JobHistory_vue_vue_type_template_id_3ac29016___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/LoginInfo.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginInfo_vue_vue_type_template_id_4e11d308___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginInfo.vue?vue&type=template&id=4e11d308& */ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=template&id=4e11d308&");
/* harmony import */ var _LoginInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _LoginInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginInfo.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LoginInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginInfo_vue_vue_type_template_id_4e11d308___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginInfo_vue_vue_type_template_id_4e11d308___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/LoginInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginInfo.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=template&id=4e11d308&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=template&id=4e11d308& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_template_id_4e11d308___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginInfo.vue?vue&type=template&id=4e11d308& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/LoginInfo.vue?vue&type=template&id=4e11d308&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_template_id_4e11d308___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInfo_vue_vue_type_template_id_4e11d308___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewEduHistory.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewEduHistory.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewEduHistory_vue_vue_type_template_id_2e46c10f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewEduHistory.vue?vue&type=template&id=2e46c10f& */ "./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=template&id=2e46c10f&");
/* harmony import */ var _NewEduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewEduHistory.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewEduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewEduHistory_vue_vue_type_template_id_2e46c10f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewEduHistory_vue_vue_type_template_id_2e46c10f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/NewEduHistory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewEduHistory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEduHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=template&id=2e46c10f&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=template&id=2e46c10f& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEduHistory_vue_vue_type_template_id_2e46c10f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewEduHistory.vue?vue&type=template&id=2e46c10f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEduHistory.vue?vue&type=template&id=2e46c10f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEduHistory_vue_vue_type_template_id_2e46c10f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEduHistory_vue_vue_type_template_id_2e46c10f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewEmployeeDocument_vue_vue_type_template_id_70a3a6ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba& */ "./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba&");
/* harmony import */ var _NewEmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewEmployeeDocument.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewEmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewEmployeeDocument_vue_vue_type_template_id_70a3a6ba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewEmployeeDocument_vue_vue_type_template_id_70a3a6ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewEmployeeDocument.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEmployeeDocument_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEmployeeDocument_vue_vue_type_template_id_70a3a6ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewEmployeeDocument.vue?vue&type=template&id=70a3a6ba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEmployeeDocument_vue_vue_type_template_id_70a3a6ba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewEmployeeDocument_vue_vue_type_template_id_70a3a6ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewJobHistory.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewJobHistory.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewJobHistory_vue_vue_type_template_id_450db2a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewJobHistory.vue?vue&type=template&id=450db2a8& */ "./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=template&id=450db2a8&");
/* harmony import */ var _NewJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewJobHistory.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewJobHistory_vue_vue_type_template_id_450db2a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewJobHistory_vue_vue_type_template_id_450db2a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/NewJobHistory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewJobHistory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=template&id=450db2a8&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=template&id=450db2a8& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewJobHistory_vue_vue_type_template_id_450db2a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewJobHistory.vue?vue&type=template&id=450db2a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewJobHistory.vue?vue&type=template&id=450db2a8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewJobHistory_vue_vue_type_template_id_450db2a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewJobHistory_vue_vue_type_template_id_450db2a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewNominee.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewNominee.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewNominee_vue_vue_type_template_id_0d4c4490___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewNominee.vue?vue&type=template&id=0d4c4490& */ "./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=template&id=0d4c4490&");
/* harmony import */ var _NewNominee_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewNominee.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewNominee_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewNominee_vue_vue_type_template_id_0d4c4490___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewNominee_vue_vue_type_template_id_0d4c4490___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/NewNominee.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewNominee_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewNominee.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewNominee_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=template&id=0d4c4490&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=template&id=0d4c4490& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewNominee_vue_vue_type_template_id_0d4c4490___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewNominee.vue?vue&type=template&id=0d4c4490& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewNominee.vue?vue&type=template&id=0d4c4490&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewNominee_vue_vue_type_template_id_0d4c4490___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewNominee_vue_vue_type_template_id_0d4c4490___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewSkill.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewSkill.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewSkill_vue_vue_type_template_id_93f83960___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewSkill.vue?vue&type=template&id=93f83960& */ "./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=template&id=93f83960&");
/* harmony import */ var _NewSkill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewSkill.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewSkill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewSkill_vue_vue_type_template_id_93f83960___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewSkill_vue_vue_type_template_id_93f83960___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/NewSkill.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewSkill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewSkill.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewSkill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=template&id=93f83960&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=template&id=93f83960& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewSkill_vue_vue_type_template_id_93f83960___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewSkill.vue?vue&type=template&id=93f83960& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NewSkill.vue?vue&type=template&id=93f83960&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewSkill_vue_vue_type_template_id_93f83960___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewSkill_vue_vue_type_template_id_93f83960___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NomineeInfo.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NomineeInfo.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NomineeInfo_vue_vue_type_template_id_42f71ab0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NomineeInfo.vue?vue&type=template&id=42f71ab0& */ "./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=template&id=42f71ab0&");
/* harmony import */ var _NomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NomineeInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NomineeInfo_vue_vue_type_template_id_42f71ab0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NomineeInfo_vue_vue_type_template_id_42f71ab0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/NomineeInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NomineeInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=template&id=42f71ab0&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=template&id=42f71ab0& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NomineeInfo_vue_vue_type_template_id_42f71ab0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NomineeInfo.vue?vue&type=template&id=42f71ab0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/NomineeInfo.vue?vue&type=template&id=42f71ab0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NomineeInfo_vue_vue_type_template_id_42f71ab0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NomineeInfo_vue_vue_type_template_id_42f71ab0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/SkillInfo.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/SkillInfo.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SkillInfo_vue_vue_type_template_id_da057420___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SkillInfo.vue?vue&type=template&id=da057420& */ "./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=template&id=da057420&");
/* harmony import */ var _SkillInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SkillInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SkillInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SkillInfo_vue_vue_type_template_id_da057420___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SkillInfo_vue_vue_type_template_id_da057420___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/SkillInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SkillInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SkillInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SkillInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=template&id=da057420&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=template&id=da057420& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SkillInfo_vue_vue_type_template_id_da057420___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SkillInfo.vue?vue&type=template&id=da057420& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/SkillInfo.vue?vue&type=template&id=da057420&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SkillInfo_vue_vue_type_template_id_da057420___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SkillInfo_vue_vue_type_template_id_da057420___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/Tree.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/Tree.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tree_vue_vue_type_template_id_92158146___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tree.vue?vue&type=template&id=92158146& */ "./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=template&id=92158146&");
/* harmony import */ var _Tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tree.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tree_vue_vue_type_template_id_92158146___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tree_vue_vue_type_template_id_92158146___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/Tree.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Tree.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=template&id=92158146&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=template&id=92158146& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tree_vue_vue_type_template_id_92158146___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Tree.vue?vue&type=template&id=92158146& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/Tree.vue?vue&type=template&id=92158146&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tree_vue_vue_type_template_id_92158146___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tree_vue_vue_type_template_id_92158146___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/UserEdit.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/UserEdit.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserEdit_vue_vue_type_template_id_5ee70d34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserEdit.vue?vue&type=template&id=5ee70d34& */ "./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=template&id=5ee70d34&");
/* harmony import */ var _UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserEdit.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserEdit_vue_vue_type_template_id_5ee70d34___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserEdit_vue_vue_type_template_id_5ee70d34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-edit/UserEdit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEdit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=template&id=5ee70d34&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=template&id=5ee70d34& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_template_id_5ee70d34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEdit.vue?vue&type=template&id=5ee70d34& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-edit/UserEdit.vue?vue&type=template&id=5ee70d34&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_template_id_5ee70d34___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_template_id_5ee70d34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);