(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      employee_documents: [],
      employee_documents_type: [],
      doc_id: null,
      popUp: false,
      skill_id: null,
      mode: {
        add: true,
        edit: false
      },
      pop_title: "Add New Skill",
      selectedType: '',
      doc: {
        doc: true,
        document_info: null,
        hasFile: ['Attachment'],
        attachmentName: null,
        Attachment: null
      }
    };
  },
  methods: {
    fetchDocInfo: function fetchDocInfo() {
      var _this = this;

      axios.get("/api/profile/employee-docs/".concat(this.$route.params.id)).then(function (response) {
        if (response.status === 200) {
          _this.employee_documents = [];
          _this.employee_documents = response.data.employee_documents;
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        _this.user_not_found = true;
      });
    },
    callPopup: function callPopup(type, data) {
      var _this2 = this;

      this.doc.Attachment = null;
      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_DD_DOCUMENT_TYPES)).then(function (response) {
        _this2.employee_documents_type = response.data.items;
      })["catch"](function (error) {
        _this2.notificationAlert(error.response);
      });

      if (type === 'add') {
        this.pop_title = 'New Document';
        this.doc.attachmentName = null;
        this.doc.document_title = null;
        this.doc.document_info = null;
        this.mode.save = true;
        this.mode.edit = false;
        this.popUp = !this.popUp;
        this.selectedType = '';
      }

      if (type === 'edit') {
        this.pop_title = 'Edit Document';
        this.mode.save = false;
        this.mode.edit = true;
        this.doc_id = data.document_id;
        this.doc.attachmentName = data.attachment_name;
        this.selectedType = data.document_title.value;
        this.doc.document_info = data.document_info;
        this.popUp = !this.popUp;
      }
    },
    create: function create() {
      var _this3 = this;

      var data = {
        'id': this.$route.params.id,
        'doc': this.doc,
        'type': this.selectedType,
        'attachment': this.doc.Attachment
      };
      var formData = new FormData();
      formFiles(this.doc, formData);
      formData.append('data', JSON.stringify(data));
      this.btnDisabled = true;
      axios.post('/api/profile/employee-document-create', formData).then(function (response) {
        _this3.notificationAlert(response);

        _this3.popUp = !_this3.popUp;

        _this3.fetchDocInfo();
      })["catch"](function (error) {
        _this3.notificationAlert(error.response);
      });
      this.btnDisabled = false;
    },
    update: function update() {
      var _this4 = this;

      this.btnDisabled = true;
      var data = {
        'id': this.$route.params.id,
        "doc_id": this.doc_id,
        'type': this.selectedType,
        'doc': this.doc,
        'attachment': this.doc.Attachment
      };
      var formData = new FormData();
      formFiles(this.doc, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/profile/employee-document-update', formData).then(function (response) {
        _this4.notificationAlert(response);

        _this4.popUp = !_this4.popUp;

        _this4.fetchDocInfo();

        _this4.btnDisabled = false;
      })["catch"](function (error) {
        _this4.notificationAlert(error.response);

        _this4.btnDisabled = false;
      });
    },
    attachmentInput: function attachmentInput() {
      var _this5 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this5.doc.Attachment = input.files[0];
          _this5.doc.attachmentName = input.files[0].name;
        }
      };
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this6 = this;

      axios.get("/api/profile/employee-document-delete/".concat(Deldata.document_id)).then(function (response) {
        _this6.notificationAlert(response);

        _this6.fetchDocInfo();
      })["catch"](function (error) {
        _this6.notificationAlert(error.response);
      });
    }
  },
  mounted: function mounted() {},
  created: function created() {
    this.fetchDocInfo();
  },
  computed: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      popup_title: 'New Education History',
      eduAdd: false,
      isDisabled: false,
      viewInstituteList: false,
      viewForCGPA: true,
      //viewForDivision: false,
      mode: {
        save: true,
        edit: false
      },
      degreeData: [],
      edu_infos: [],
      instituteData: [],
      resultOption: ['Division', 'CGPA'],
      divisionData: [],
      //yearList:[],
      selectedDegree: '',
      selectedInstitute: '',
      selectedResultType: '',
      instituteName: null,
      passingYear: null,
      edu_id: null,
      result: {
        cgpa: null,
        outof: null,
        division: null
      },
      doc: {
        doc: true,
        hasFile: ['Attachment'],
        attachmentName: null,
        Attachment: null
      }
    };
  },
  methods: {
    fetchEduInfo: function fetchEduInfo() {
      var _this = this;

      axios.get("/api/profile/edu-info/".concat(this.$route.params.id)).then(function (response) {
        //console.log(response);
        if (response.status === 200) {
          _this.edu_infos = [];
          _this.edu_infos = response.data.education_info;
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        _this.user_not_found = true;
      });
    },
    callPopup: function callPopup(type, data) {
      var _this2 = this;

      console.log('Hasib', data);
      axios.get('/api/profile/education-data').then(function (response) {
        console.log(response);
        _this2.instituteData = response.data.instituteData;
        _this2.divisionData = response.data.divisionData;
        _this2.degreeData = response.data.degreeData;
      })["catch"](function (error) {
        _this2.notificationAlert(error.response);
      });

      if (type === 'edu_edit') {
        this.edu_id = data.edu_id;
        this.mode.save = false;
        this.mode.edit = true;
        this.popup_title = 'Edit Education History';
        this.selectedDegree = data.degree_id;
        this.selectedResultType = data.result_type;
        this.passingYear = data.passing_year;

        if (data.result_type.toLowerCase() === "division") {
          this.viewForCGPA = false;
          this.result.division = data.result.division_id;
          this.result.cgpa = null;
          this.result.outof = null;
        } else if (data.result_type.toLowerCase() === 'cgpa') {
          this.viewForCGPA = true;
          this.result.cgpa = data.result.cgpa;
          this.result.outof = data.result.out_of;
          this.result.division = null;
        }

        if (data.degree_id === this.$constants.CONST_GRADUATION || data.degree_id === this.$constants.CONST_POST_GRAD) {
          this.viewInstituteList = true;
          this.selectedInstitute = data.institute_info;
        } else {
          this.viewInstituteList = false;
          this.instituteName = data.institute_name;
        }

        this.doc.Attachment = null;
        this.doc.attachmentName = data.attachment_name;
        this.eduAdd = !this.eduAdd;
      }

      if (type === 'edu_add') {
        this.mode.save = true;
        this.mode.edit = false;
        this.popup_title = 'Add Education History';
        this.selectedDegree = '';
        this.selectedResultType = '';
        this.passingYear = '';
        this.result.cgpa = '';
        this.result.outof = '';
        this.result.division = '';
        this.doc.Attachment = null;
        this.instituteName = '';
        this.selectedInstitute = '';
        this.doc.Attachment = null;
        this.doc.attachmentName = null;
        this.eduAdd = !this.eduAdd;
      }
    },
    manageEducation: function manageEducation(type, item) {
      console.log(item);

      if (type === 'resultType') {
        if (item != null) {
          if (item.toLowerCase() === 'division') {
            this.result.cgpa = null;
            this.result.outof = null;
            this.viewForCGPA = false;
          } else if (item.toLowerCase() === 'cgpa') {
            this.result.division = null;
            this.viewForCGPA = true;
          }
        }
      }

      if (type === 'degreeType') {
        if (item != null) {
          if (item === this.$constants.CONST_GRADUATION || item === this.$constants.CONST_POST_GRAD) {
            this.viewInstituteList = true;
            this.instituteName = '';
          } else {
            this.selectedInstitute = '';
            this.viewInstituteList = false;
          }
        }
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
          _this3.doc.Attachment = input.files[0];
          _this3.doc.attachmentName = input.files[0].name;
        }
      };
    },
    EducationAdd: function EducationAdd() {
      var _this4 = this;

      this.btnDisabled = true;
      var institute = null;

      if (this.instituteName !== '') {
        institute = this.instituteName;
      } else {
        institute = this.selectedInstitute;
      }

      var data = {
        'id': this.$route.params.id,
        'degree_name': this.selectedDegree,
        'degree_type': this.selectedResultType,
        'passing_year': this.passingYear,
        'edu_id': this.edu_id,
        'institute_name': institute,
        'result': this.result,
        'attachment': this.doc.Attachment
      };
      var formData = new FormData();
      formFiles(this.doc, formData);
      formData.append('data', JSON.stringify(data));
      console.log(data);

      if (this.validateInput(data)) {
        axios.post('/api/profile/education-history-add', formData).then(function (response) {
          _this4.notificationAlert(response);

          _this4.eduAdd = !_this4.eduAdd;

          _this4.fetchEduInfo();
        })["catch"](function (error) {
          _this4.notificationAlert(error.response);
        });
      }
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this5 = this;

      axios.get("/api/profile/edu-delete/".concat(Deldata)).then(function (response) {
        _this5.notificationAlert(response);

        _this5.fetchEduInfo();
      })["catch"](function (error) {
        _this5.notificationAlert(error.response);
      });
    },
    EducationEdit: function EducationEdit() {
      var _this6 = this;

      this.btnDisabled = true;
      var institute = null;

      if (this.instituteName !== '') {
        institute = this.instituteName;
      } else {
        institute = this.selectedInstitute;
      }

      var data = {
        'id': this.$route.params.id,
        'degree_name': this.selectedDegree,
        'degree_type': this.selectedResultType,
        'passing_year': this.passingYear,
        'edu_id': this.edu_id,
        'institute_name': institute,
        'result': this.result,
        'attachment': this.doc.Attachment
      };
      console.log('Hasib', data);
      var formData = new FormData();
      formFiles(this.doc, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/profile/education-history-edit', formData).then(function (response) {
        _this6.notificationAlert(response);

        _this6.eduAdd = !_this6.eduAdd;

        _this6.fetchEduInfo();
      })["catch"](function (error) {
        _this6.notificationAlert(error.response);
      });
    }
  },
  mounted: function mounted() {//this.yearList();
  },
  created: function created() {
    this.fetchEduInfo();
  },
  computed: {
    yearList: function yearList() {
      var year = new Date().getFullYear() - 100;
      var yearData = [];

      for (var i = 0; 104 > i; i++) {
        yearData.unshift(year + i);
      }

      return yearData;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      pop_title: 'New Job History',
      job_id: null,
      mode: {
        save: true,
        edit: false
      },
      jobAdd: false,
      job_histories: [],
      designationOption: [],
      designationData: [],
      selectdDesignation: '',
      jobDuration: {
        start: new Date(),
        end: new Date()
      },
      job: {
        orgName: null,
        designation: null,
        responsibility: null
      }
    };
  },
  methods: {
    fetchJobHistory: function fetchJobHistory() {
      var _this = this;

      axios.get("/api/profile/job-history/".concat(this.$route.params.id)).then(function (response) {
        console.log(response);

        if (response.status === 200) {
          _this.job_histories = [];
          _this.job_histories = response.data.job_histories;
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        _this.user_not_found = true;
      });
    },
    callPopup: function callPopup(type, data) {
      var _this2 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_DESIGNATION)).then(function (response) {
        _this2.designationData = response.data.items;
      })["catch"](function (error) {
        _this2.notificationAlert(error.response);
      });

      if (type === 'job_add') {
        this.pop_title = 'New Job History';
        this.mode.save = true;
        this.mode.edit = false;
        this.job.orgName = null;
        this.job.designation = null;
        this.job.responsibility = null;
        this.jobDuration = {
          start: new Date(),
          end: new Date()
        };
        this.selectdDesignation = '';
        this.jobAdd = !this.jobAdd;
      }

      if (type === 'job_edit') {
        console.log(data);
        this.pop_title = 'Edit Job History';
        this.mode.save = false;
        this.mode.edit = true;
        this.jobAdd = !this.jobAdd;
        this.job_id = data.job_id;
        this.job.orgName = data.orgname;
        this.selectdDesignation = data.designation_id;
        this.job.designation = data.designation;
        this.job.responsibility = data.responsibility;
        this.jobDuration = {
          start: new Date(data.jobstartdate),
          end: new Date(data.jobclosedate)
        };
      }
    },
    educationAdd: function educationAdd() {
      var _this3 = this;

      this.btnDisabled = true;
      var data = {
        org_name: this.job.orgName,
        designation: this.selectdDesignation,
        responsibility: this.job.responsibility,
        duration: this.jobDuration,
        user_id: this.$route.params.id
      };
      axios.post('/api/profile/job-history-create', data).then(function (response) {
        _this3.notificationAlert(response);

        _this3.fetchJobHistory();

        _this3.jobAdd = !_this3.jobAdd;
        _this3.btnDisabled = false;
      })["catch"](function (error) {
        _this3.notificationAlert(error.response);

        _this3.btnDisabled = false;
      });
    },
    educationEdit: function educationEdit() {
      var _this4 = this;

      this.btnDisabled = true;
      var data = {
        job_id: this.job_id,
        org_name: this.job.orgName,
        designation: this.selectdDesignation,
        responsibility: this.job.responsibility,
        duration: this.jobDuration
      };
      axios.post('/api/profile/job-history-update', data).then(function (response) {
        _this4.notificationAlert(response);

        _this4.fetchJobHistory();

        _this4.jobAdd = !_this4.jobAdd;
        _this4.btnDisabled = false;
      })["catch"](function (error) {
        _this4.notificationAlert(error.response);

        _this4.btnDisabled = false;
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this5 = this;

      axios.get("/api/profile/job-history-delete/".concat(Deldata.job_id)).then(function (response) {
        _this5.notificationAlert(response);

        _this5.fetchJobHistory();
      })["catch"](function (error) {
        _this5.notificationAlert(error.response);
      });
    }
  },
  mounted: function mounted() {},
  created: function created() {
    this.fetchJobHistory();
  },
  computed: {
    dateRangeText: function dateRangeText() {
      return this.job.jobDuration.join(' ~ ');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      nominees: [],
      shareData: {
        not_used: 100,
        used: null
      },
      popUp: false,
      mode: {
        add: true,
        edit: false
      },
      pop_title: "New Nominee/Family",
      total_used_percent: null,
      relationshipTypeData: [],
      addNew: false,
      nominee_id: null,
      userId: null,
      selectedType: '',
      nominee: {
        familymembername: null,
        relationshiptype: null,
        birth_date: null,
        phone_number: null,
        hasFile: ['Attachment'],
        Attachment: null,
        attachmentName: null,
        share: null,
        is_nominee: false
      },
      show_share: false
    };
  },
  computed: {
    showShare: function showShare() {
      // let st = this.show_share;
      if (this.nominee.is_nominee === true) {
        var st = true;
      } else {
        this.nominee.share = null;
        st = false;
      }

      return st;
    }
  },
  methods: {
    fetchNomineeInfo: function fetchNomineeInfo() {
      var _this = this;

      axios.get("/api/profile/nominee-info/".concat(this.$route.params.id)).then(function (response) {
        if (response.status === 200) {
          _this.nominees = [];
          _this.shareData.not_used = response.data.share_data.available_percent;
          _this.shareData.used = response.data.share_data.total_percent;
          _this.nominees = response.data.nominees;
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        _this.user_not_found = true;
      });
    },
    attachmentInput: function attachmentInput() {
      var _this2 = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this2.nominee.Attachment = input.files[0];
          _this2.nominee.attachmentName = input.files[0].name;
        }
      };
    },
    callPopup: function callPopup(type, data) {
      var _this3 = this;

      this.nominee.Attachment = null;
      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_RELATIONSHIP_TYPE)).then(function (response) {
        _this3.relationshipTypeData = response.data.items;
      })["catch"](function (error) {
        _this3.notificationAlert(error.response);
      });

      if (type === 'add') {
        this.pop_title = 'New Nominee/Family';
        this.mode.save = true;
        this.mode.edit = false;
        this.nominee_id = null;
        this.nominee.familymembername = null;
        this.selectedType = '';
        this.nominee.birth_date = null;
        this.nominee.share = null;
        this.nominee.phone_number = null;
        this.nominee.attachmentName = null;
        this.popUp = !this.popUp;
        this.nominee.is_nominee = false;
        this.show_share = false;
      }

      if (type === 'edit') {
        this.pop_title = 'Edit Nominee/Family Information';
        this.mode.save = false;
        this.mode.edit = true;
        this.popUp = !this.popUp;
        this.nominee_id = data.nominee_id;
        this.nominee.familymembername = data.nominee_name;
        this.selectedType = data.type_id;
        this.nominee.birth_date = data.nominee_birth_date;
        this.nominee.share = data.nominee_share;
        this.nominee.phone_number = data.phone_number;
        this.nominee.attachmentName = data.attachment_name;

        if (data.is_nominee === 1) {
          this.nominee.is_nominee = true;
        } else {
          this.nominee.is_nominee = false;
        }
      }
    },
    create: function create() {
      var _this4 = this;

      this.btnDisabled = true;
      var data = {
        'userid': this.$route.params.id,
        'data': this.nominee,
        'relation_type': this.selectedType,
        'attachment': this.nominee.Attachment
      };
      var formData = new FormData();
      formFiles(this.nominee, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/profile/nominee-create', formData).then(function (response) {
        _this4.notificationAlert(response);

        _this4.popUp = !_this4.popUp;
        _this4.btnDisabled = false;

        _this4.fetchNomineeInfo();
      })["catch"](function (error) {
        _this4.notificationAlert(error.response);

        _this4.btnDisabled = false;
      });
    },
    update: function update() {
      var _this5 = this;

      this.btnDisabled = true;
      var data = {
        'nominee_id': this.nominee_id,
        'user_id': this.$route.params.id,
        'relation_type': this.selectedType,
        'data': this.nominee,
        'attachment': this.nominee.Attachment
      };
      var formData = new FormData();
      formFiles(this.nominee, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/profile/nominee-update', formData).then(function (response) {
        _this5.notificationAlert(response);

        _this5.popUp = !_this5.popUp;
        _this5.btnDisabled = false;

        _this5.fetchNomineeInfo();
      })["catch"](function (error) {
        _this5.notificationAlert(error.response);

        _this5.btnDisabled = false;
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this6 = this;

      axios.get("/api/profile/nominee-delete/".concat(Deldata)).then(function (response) {
        _this6.notificationAlert(response);

        _this6.fetchNomineeInfo();
      })["catch"](function (error) {
        _this6.notificationAlert(error.response);
      });
    }
  },
  mounted: function mounted() {},
  created: function created() {
    this.fetchNomineeInfo();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettingsBasic_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettingsBasic.vue */ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue");
/* harmony import */ var _UserSettingsChangePassword_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSettingsChangePassword.vue */ "./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue");
/* harmony import */ var _UserSettingsGeneral_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSettingsGeneral.vue */ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue");
/* harmony import */ var _UserEducationInfo_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserEducationInfo.vue */ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue");
/* harmony import */ var _UserJobHistory_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserJobHistory.vue */ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue");
/* harmony import */ var _UserNomineeInfo_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserNomineeInfo.vue */ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue");
/* harmony import */ var _UserSkills_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserSkills.vue */ "./resources/js/src/views/app/user/user-profile/UserSkills.vue");
/* harmony import */ var _UserDocs_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserDocs.vue */ "./resources/js/src/views/app/user/user-profile/UserDocs.vue");
/* harmony import */ var _UserSettingsTree_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UserSettingsTree.vue */ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    UserSettingsBasic: _UserSettingsBasic_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    UserSettingsChangePassword: _UserSettingsChangePassword_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    UserSettingsGeneral: _UserSettingsGeneral_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    UserEducationInfo: _UserEducationInfo_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    UserJobHistory: _UserJobHistory_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    UserNomineeInfo: _UserNomineeInfo_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    UserSkills: _UserSkills_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    UserDocs: _UserDocs_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    UserSettingsTree: _UserSettingsTree_vue__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  data: function data() {
    return {
      user_not_found: false,
      user_info: true
    };
  },
  methods: {},
  mounted: function mounted() {},
  computed: {
    isSmallerScreen: function isSmallerScreen() {
      return this.$store.state.windowWidth < 768;
    },
    canChangePass: function canChangePass() {
      console.log('Hasib', this.$store.state);
      return this.$route.params.id === this.$store.state.AppActiveUser.uid;
    },
    isAdmin: function isAdmin() {
      return this.$store.state.AppActiveUser.roleId === this.$constants.CONST_ROLE_COMPANY_ADMIN && this.$route.params.id === this.$store.state.AppActiveUser.uid;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-advanced-cropper */ "./node_modules/vue-advanced-cropper/dist/index.es.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_2__);


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


/* harmony default export */ __webpack_exports__["default"] = ({
  // props:['passChangeKey'],
  components: {
    Cropper: vue_advanced_cropper__WEBPACK_IMPORTED_MODULE_1__["Cropper"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  data: function data() {
    return {
      shoWPermissions: false,
      hideDesignation: true,
      hidePayroll: true,
      hideAssetPackage: true,
      hideJobDescription: true,
      hideLeavePackage: true,
      hideEmployeeType: true,
      con_show: false,
      previewProfile: false,
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
      userData: {
        phone: ''
      },
      basicEdit: false,
      imageEdit: false,
      packageEdit: false,
      user_info: '',
      org_info: '',
      user_not_found: false,
      role: [],
      roleData: [],
      selectedRole: '',
      designationData: [],
      designation: {
        value: null,
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
      employeeTypeData: [],
      employeeType: {
        value: null,
        label: '',
        type: ''
      },
      contract_range: null,
      showCalender: false,
      dateRange: {
        start: '',
        end: ''
      },
      con_date_info: null
    };
  },
  methods: {
    fetchUserInfo: function fetchUserInfo() {
      var _this = this;

      axios.get("/api/profile/basic-info/".concat(this.$route.params.id)).then(function (response) {
        if (response.status === 200) {
          console.log(response.data.user_info);
          _this.user_info = response.data.user_info;
          _this.userData.phone = response.data.user_info.phone;
          _this.selectedRole = response.data.user_info.roleid;
          _this.roleData = response.data.user_info.roleData;
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        console.log(err);
        _this.user_not_found = true;
      });
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

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var blob, dataUrl;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(img).then(function (r) {
                  return r.blob();
                });

              case 2:
                blob = _context.sent;
                _context.next = 5;
                return new Promise(function (resolve) {
                  var reader = new FileReader();

                  reader.onload = function () {
                    return resolve(reader.result);
                  };

                  reader.readAsDataURL(blob);
                });

              case 5:
                dataUrl = _context.sent;
                _this3.logoPreviewImage = dataUrl;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    roleSelected: function roleSelected() {
      var _this4 = this;

      var data = {
        id: this.selectedRole.value,
        user_id: this.user_info.id
      };
      axios.post('/api/profile/data/roledata', data).then(function (response) {
        _this4.roleData = response.data.roleData;
      })["catch"](function (error) {
        _this4.notificationAlert(error.response);
      });
    },
    fetchOrgInfo: function fetchOrgInfo() {
      var _this5 = this;

      axios.get("/api/profile/organization-info/".concat(this.$route.params.id)).then(function (response) {
        //console.log(response);
        if (response.status === 200) {
          _this5.org_info = response.data.org_info;
          _this5.contract_range = response.data.contract_info.range;
          _this5.con_date_info = response.data.contract_info;
          _this5.con_show = response.data.contract_info.is_contract;
        } else {
          _this5.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this5.notificationAlert(err.response);

        console.log(err);
      });
    },
    UserRole: function UserRole() {
      var _this6 = this;

      axios.get('/api/profile/role').then(function (response) {
        _this6.role = response.data.role;
      })["catch"](function (error) {
        _this6.notificationAlert(error.response);
      });
    },
    GetPackage: function GetPackage() {
      var _this7 = this;

      axios.get('/api/profile/package').then(function (response) {
        console.log(response.data);
        _this7.leavePackageData = response.data.leaveData;
        _this7.assetPackageData = response.data.assetData;
        _this7.payRollData = response.data.payrollData;
        _this7.jobDescriptionData = response.data.jobDescriptionData;
        _this7.designationData = response.data.designationData;
        _this7.employeeTypeData = response.data.employeeTypeData;
        _this7.designation = _this7.org_info.designation_id;
        _this7.jobDescription = _this7.org_info.job_description_id;
        _this7.employeeType = _this7.org_info.employee_type_id;
        _this7.payRoll = _this7.org_info.payroll_package_id;
        _this7.leavePackage = _this7.org_info.leave_package_id;
        _this7.assetPackage = _this7.org_info.asset_package_id;
      })["catch"](function (error) {
        _this7.notificationAlert(error.response);
      });
    },
    checkEmployeeType: function checkEmployeeType(data) {
      console.log(data);
      this.dateRange = {
        start: '',
        end: ''
      };

      if (data === 16) {
        this.showCalender = true;
        this.showDateOnPreview = true;
      } else {
        this.showCalender = false;
        this.showDateOnPreview = false;
      }
    },
    callPopup: function callPopup(type) {
      if (type === 'userinfo') {
        this.UserRole();
        this.logoPreviewImage = this.user_info.propic_url;
        this.basicEdit = !this.basicEdit;
      }

      if (type === 'package') {
        this.GetPackage();
        this.packageEdit = !this.packageEdit;
        this.showCalender = this.con_show;
        this.dateRange = {
          start: new Date(this.con_date_info.start_date),
          end: new Date(this.con_date_info.end_date)
        };
      }

      if (type === 'image_change') {
        this.logoPreviewImage = this.user_info.propic_url; //this.GetPackage();

        this.imageEdit = !this.imageEdit;
      }
    },
    hideDisable: function hideDisable(name) {
      switch (name) {
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
      }
    },
    GeneralInfoUpdate: function GeneralInfoUpdate() {
      var _this8 = this;

      var data = {
        first_name: this.user_info.first_name,
        last_name: this.user_info.last_name,
        emp_id: this.user_info.emp_id,
        email: this.user_info.email,
        phone: this.user_info.phone,
        role: this.selectedRole,
        permissions: this.roleData,
        hasFile: ['logoData'],
        logoData: this.logoData,
        id: this.user_info.enc_user_id
      };
      this.btnDisabled = true;
      var formData = new FormData();
      formFiles(data, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/profile/basic-info-update', formData).then(function (response) {
        _this8.notificationAlert(response);

        _this8.fetchUserInfo();

        _this8.basicEdit = false;
        _this8.imageEdit = false;
      })["catch"](function (err) {
        _this8.notificationAlert(err.response);

        _this8.user_not_found = true;
      });
    },
    PackageUpdate: function PackageUpdate() {
      var _this9 = this;

      this.btnDisabled = true;
      var data = {
        designation: this.designation,
        payRoll: this.payRoll,
        leavePackage: this.leavePackage,
        assetPackage: this.assetPackage,
        jobDescription: this.jobDescription,
        employeeType: this.employeeType,
        id: this.user_info.enc_user_id,
        contract_date: this.dateRange
      };
      console.log(data);
      var formData = new FormData();
      formFiles(data, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/profile/package-update', formData).then(function (response) {
        _this9.fetchOrgInfo();

        _this9.notificationAlert(response);

        _this9.btnDisabled = false;
        _this9.packageEdit = false;
      })["catch"](function (err) {
        _this9.notificationAlert(err.response);

        _this9.btnDisabled = false;
        _this9.user_not_found = true;
      });
    }
  },
  mounted: function mounted() {},
  created: function created() {
    this.fetchUserInfo();
  },
  computed: {
    isAdmin: function isAdmin() {
      var t = this.$store.state.AppActiveUser.roleId === this.$constants.CONST_ROLE_COMPANY_ADMIN && this.$route.params.id === this.$store.state.AppActiveUser.uid;

      if (!t) {
        this.fetchOrgInfo();
      }

      return t;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showPassOld: false,
      showPassNew: false,
      showPassConfirm: false,
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    };
  },
  computed: {
    //check if both password and email have been set for enabling login button
    validateForm: function validateForm() {
      return this.old_password !== '' && this.new_password !== '' && this.new_password === this.confirm_new_password;
    }
  },
  methods: {
    changePassword: function changePassword() {
      var _this = this;

      this.$http.put("/api/profile/change-password", {
        old_password: this.old_password,
        new_password: this.new_password,
        confirm_new_password: this.confirm_new_password
      }).then(function (response) {
        _this.notificationAlert(response);
      })["catch"](function (err) {
        console.log(err);

        _this.notificationAlert(err.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      country1Other: false,
      address_same: false,
      permanentAddressLine1: null,
      permanentAddressLine2: null,
      permanentCitySelect: null,
      permanentProvinceSelect: null,
      permanentCountrySelect: null,
      permanentAddressPostCode: null,
      permanentAddressCityOtherView: false,
      permanentAddressCity: null,
      presentAddressLine1: null,
      presentAddressLine2: null,
      presentCitySelect: null,
      presentProvinceSelect: null,
      presentCountrySelect: null,
      presentAddressPostCode: null,
      presentAddressCityOtherView: false,
      presentAddressCity: null,
      countryData: [],
      ProvinceData: [],
      CityData: [],
      countryData2: [],
      ProvinceData2: [],
      CityData2: [],
      custom_info: [],
      user_id: null,
      formatted_birthdate: null,
      user_info: {
        personal_email: null,
        emergency_number: null,
        work_number: null
      },
      dropdown: [],
      general_info: [],
      geninfoEdit: false,
      addressEdit: false,
      defItem: [],
      attachment: null,
      bloodGroup: [],
      blood: '',
      GenderData: [],
      gender: '',
      maritalData: [],
      marital_status: '',
      religionData: [],
      religion: '',
      nationalityData: [],
      nationality: ''
    };
  },
  computed: {},
  methods: {
    attachmentInput: function attachmentInput() {
      var _this = this;

      var fileData = document.createElement('input');
      fileData.type = 'file';
      fileData.click();

      fileData.onchange = function (e) {
        var input = e.target;

        if (input.files && input.files[0]) {
          _this.verificationIdFile = input.files[0];
          _this.verificationIdFileName = input.files[0].name;
        }
      };
    },
    fetchGeneralInfo: function fetchGeneralInfo() {
      var _this2 = this;

      axios.get("/api/profile/general-info/".concat(this.$route.params.id)).then(function (response) {
        if (response.status === 200) {
          _this2.general_info = response.data.general_info;
          _this2.user_id = response.data.user_id;
          _this2.formatted_birthdate = response.data.formatted_date;
        } else {
          _this2.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this2.notificationAlert(err.response);

        _this2.user_not_found = true;
      });
    },
    makeSame: function makeSame(status) {
      if (status) {
        this.presentAddressLine1 = this.permanentAddressLine1;
        this.presentAddressLine2 = this.permanentAddressLine2;
        this.presentCitySelect = this.permanentCitySelect;
        this.presentProvinceSelect = this.permanentProvinceSelect;
        this.presentCountrySelect = this.permanentCountrySelect;
        this.presentAddressPostCode = this.permanentAddressPostCode;
      }
    },
    callPopup: function callPopup(type, data) {
      var _this3 = this;

      if (type === 'gen_info') {
        // this.user_info = this.general_info;
        this.user_info.emergency_number = this.general_info.personalmobile;
        this.user_info.personal_email = this.general_info.personalemail;
        this.user_info.work_number = this.general_info.officemobile;
        this.gender = this.general_info.gender_id;
        this.blood = this.general_info.blood_id;
        this.marital_status = this.general_info.marital_id;
        this.religion = this.general_info.religion_id;
        this.nationality = this.general_info.nationality_id;
        axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_BLOOD_GROUP)).then(function (response) {
          _this3.bloodGroup = response.data.items;
        })["catch"](function (error) {
          _this3.notificationAlert(error.response);
        });
        axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_GENDER)).then(function (response) {
          _this3.GenderData = response.data.items;
        })["catch"](function (error) {
          _this3.notificationAlert(error.response);
        });
        axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_MARITAL)).then(function (response) {
          _this3.maritalData = response.data.items;
        })["catch"](function (error) {
          _this3.notificationAlert(error.response);
        });
        axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_RELIGION)).then(function (response) {
          _this3.religionData = response.data.items;
        })["catch"](function (error) {
          _this3.notificationAlert(error.response);
        });
        axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_NATIONALITY)).then(function (response) {
          _this3.nationalityData = response.data.items;
        })["catch"](function (error) {
          _this3.notificationAlert(error.response);
        });
        this.geninfoEdit = !this.geninfoEdit;
      }

      if (type === 'address') {
        this.getAddressData(data.permanent_address_country_id, 'province');
        this.getAddressData(data.permanent_address_province_id, 'city');
        this.getAddressData(data.present_address_country_id, 'province2');
        this.getAddressData(data.present_address_province_id, 'city2');
        this.permanentAddressLine1 = data.permanentaddressline1;
        this.permanentAddressLine2 = data.permanentaddressline2;
        this.permanentCitySelect = data.permanent_address_city_id;
        this.permanentProvinceSelect = data.permanent_address_province_id;
        this.permanentCountrySelect = data.permanent_address_country_id;
        this.permanentAddressPostCode = data.permanentaddresspostcode;
        this.presentAddressLine1 = data.presentaddressline1;
        this.presentAddressLine2 = data.presentaddressline2;
        this.presentCitySelect = data.present_address_city_id;
        this.presentProvinceSelect = data.present_address_province_id;
        this.presentCountrySelect = data.present_address_country_id;
        this.presentAddressPostCode = data.presentaddresspostcode;
        this.presentAddressCityOtherView = false;
        axios.get('/api/profile/get-country-data').then(function (response) {
          _this3.countryData = response.data.country;
          _this3.countryData2 = response.data.country;
        })["catch"](function (error) {
          _this3.notificationAlert(error.response);
        });
        this.addressEdit = !this.addressEdit;
      }
    },
    generalInfoUpdate: function generalInfoUpdate() {
      var _this4 = this;

      this.btnDisabled = true;
      var data = {
        'personal_number': this.user_info.emergency_number,
        'personal_email': this.user_info.personal_email,
        'work_number': this.user_info.work_number,
        'gender': this.gender,
        'date_of_birth': this.general_info.dateofbirth,
        'blood': this.blood,
        'marital_status': this.marital_status,
        'religion': this.religion,
        'nationality': this.nationality,
        'id': this.user_id
      };
      var formData = new FormData();
      formFiles(data, formData);
      formData.append('data', JSON.stringify(data));
      axios.post('/api/profile/general-info-update', formData).then(function (response) {
        _this4.geninfoEdit = !_this4.geninfoEdit;

        _this4.fetchGeneralInfo();

        _this4.notificationAlert(response);
      })["catch"](function (error) {
        _this4.notificationAlert(error.response);
      });
    },
    addressUpdate: function addressUpdate() {
      var _this5 = this;

      this.btnDisabled = true;
      var data = {
        'id': this.user_id,
        'per_a_line1': this.permanentAddressLine1,
        'per_a_line2': this.permanentAddressLine2,
        'per_city': this.permanentCitySelect,
        'per_province': this.permanentProvinceSelect,
        'per_country': this.permanentCountrySelect,
        'per_post_code': this.permanentAddressPostCode,
        'same_address': this.address_same,
        'pre_a_line1': this.presentAddressLine1,
        'pre_a_line2': this.presentAddressLine2,
        'pre_city': this.presentCitySelect,
        'pre_province': this.presentProvinceSelect,
        'pre_country': this.presentCountrySelect,
        'pre_post_code': this.presentAddressPostCode
      };
      axios.post('/api/profile/address-update', data).then(function (response) {
        _this5.addressEdit = !_this5.addressEdit;

        _this5.notificationAlert(response);

        _this5.fetchGeneralInfo();
      })["catch"](function (error) {
        _this5.notificationAlert(error.response);
      });
    },
    getAddressData: function getAddressData(data, type) {
      var _this6 = this;

      var id = data;

      switch (type) {
        case 'province':
          axios.get("/api/profile/get-province-data/".concat(id)).then(function (response) {
            _this6.ProvinceData = response.data.province;
          })["catch"](function (error) {
            _this6.notificationAlert(error.response);
          });
          break;

        case 'city':
          axios.get("/api/profile/get-city-data/".concat(id)).then(function (response) {
            _this6.CityData = response.data.city;
          })["catch"](function (error) {
            _this6.notificationAlert(error.response);
          });
          break;

        case 'province2':
          axios.get("/api/profile/get-province-data/".concat(id)).then(function (response) {
            _this6.ProvinceData2 = response.data.province;
          })["catch"](function (error) {
            _this6.notificationAlert(error.response);
          });
          break;

        case 'city2':
          axios.get("/api/profile/get-city-data/".concat(id)).then(function (response) {
            _this6.CityData2 = response.data.city;
          })["catch"](function (error) {
            _this6.notificationAlert(error.response);
          });
          break;
      }
    }
  },
  mounted: function mounted() {
    this.fetchGeneralInfo();
  },
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_jstree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-jstree */ "./node_modules/vue-jstree/dist/vue-jstree.js");
/* harmony import */ var vue_jstree__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_jstree__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    VJstree: vue_jstree__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      //Organization Tree
      selectedTree: [],
      organizationTree: {
        disabled: true
      }
    };
  },
  computed: {},
  methods: {
    fetchTreeInfo: function fetchTreeInfo() {
      var _this = this;

      var params = {
        id: this.$route.params.id
      };
      axios.get('/api/organization-tree/data', {
        params: params
      }).then(function (response) {
        var organizationList = response.data;

        if (organizationList.constructor === Array) {
          _this.organizationTree = organizationList;
        } else {
          _this.organizationTree = [];
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);
      });
    },
    treeItemClick: function treeItemClick(node, item, e) {
      this.selectedTree = item;

      var organizationTree = _.cloneDeep(this.organizationTree);

      this.organizationTree = organizationTree;
    },
    UpdateOrg: function UpdateOrg() {
      var _this2 = this;

      var info = {
        id: this.$route.params.id,
        organization_id: this.selectedTree.organizationid
      };
      axios.post('/api/profile/profile-tree-update', info).then(function (response) {
        _this2.notificationAlert(response);
      })["catch"](function (error) {
        _this2.notificationAlert(error.response);
      });
    }
  },
  mounted: function mounted() {
    this.fetchTreeInfo();
  },
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
//
//
//
//
//
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
      skills: [],
      skillNames: [],
      scales: [],
      popUp: false,
      skill_id: null,
      mode: {
        add: true,
        edit: false
      },
      pop_title: "Add New Skill",
      skillNameOption: [],
      skillNameData: [],
      skillScaleOption: [],
      skillScaleData: [],
      selectedSkillName: '',
      selectedScale: ''
    };
  },
  methods: {
    fetchSkillInfo: function fetchSkillInfo() {
      var _this = this;

      axios.get("/api/profile/skill-matrix/".concat(this.$route.params.id)).then(function (response) {
        //console.log(response);
        if (response.status === 200) {
          _this.skills = response.data.skills;
        } else {
          _this.notificationAlert(response);
        }
      })["catch"](function (err) {
        _this.notificationAlert(err.response);

        console.log(err);
        _this.user_not_found = true;
      });
    },
    callPopup: function callPopup(type, data) {
      var _this2 = this;

      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_SKILL_NAME)).then(function (response) {
        _this2.skillNames = response.data.items;
      })["catch"](function (error) {
        _this2.notificationAlert(error.response);
      });
      axios.get("/api/data/dropdown-items/".concat(this.$constants.CONST_SKILL_SCALE)).then(function (response) {
        _this2.scales = response.data.items;
      })["catch"](function (error) {
        _this2.notificationAlert(error.response);
      });

      if (type === 'add') {
        this.pop_title = 'New Skill';
        this.mode.save = true;
        this.mode.edit = false;
        this.popUp = !this.popUp;
        this.selectedSkillName = '';
        this.selectedScale = '';
      }

      if (type === 'edit') {
        console.log(data);
        this.pop_title = 'Edit Skill';
        this.selectedSkillName = data.skill_id;
        this.selectedScale = data.scale_id;
        this.skill_id = data.id;
        this.mode.save = false;
        this.mode.edit = true;
        this.popUp = !this.popUp;
        console.log(data);
      }
    },
    create: function create() {
      var _this3 = this;

      this.btnDisabled = true;
      var data = {
        'user_id': this.$route.params.id,
        'skill': this.selectedSkillName,
        'scale': this.selectedScale
      };
      axios.post('/api/profile/skill-create', data).then(function (response) {
        _this3.notificationAlert(response);

        _this3.popUp = !_this3.popUp;

        _this3.fetchSkillInfo();

        _this3.btnDisabled = false;
      })["catch"](function (error) {
        _this3.notificationAlert(error.response);

        _this3.btnDisabled = false;
      });
    },
    update: function update() {
      var _this4 = this;

      this.btnDisabled = true;
      var data = {
        'user_id': this.$route.params.id,
        'skill': this.selectedSkillName,
        'scale': this.selectedScale,
        'skill_id': this.skill_id
      };
      this.btnDisabled = true;
      axios.post('/api/profile/skill-update', data).then(function (response) {
        _this4.notificationAlert(response);

        _this4.popUp = !_this4.popUp;
        _this4.btnDisabled = false;

        _this4.fetchSkillInfo();
      })["catch"](function (error) {
        _this4.btnDisabled = false;

        _this4.notificationAlert(error.response);
      });
    },
    deleteDataProceed: function deleteDataProceed(Deldata) {
      var _this5 = this;

      axios.get("/api/profile/skill-delete/".concat(Deldata.id)).then(function (response) {
        _this5.notificationAlert(response);

        _this5.fetchSkillInfo();
      })["catch"](function (error) {
        _this5.notificationAlert(error.response);
      });
    }
  },
  mounted: function mounted() {},
  created: function created() {
    this.fetchSkillInfo();
  },
  computed: {}
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#edu-info-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n.edu-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#job-info-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n.edu-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#nominee-info-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  padding-bottom: 0.8rem;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n.nominee-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#profile-tabs .vs-tabs--content {\n  padding: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatar-col {\n  width: 10rem;\n}\n#page-user-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatar-col {\n  width: 10rem;\n}\n#gen-info-view table td {\n  vertical-align: top;\n  min-width: 140px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (max-width: 370px) {\n#gen-info-view table:not(.permissions-table) td {\n    display: block;\n}\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n#account-info-col-2 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatar-col {\n  width: 10rem;\n}\n#org-tree-view table td {\n  vertical-align: top;\n  min-width: 100px;\n  padding-bottom: 0.8rem;\n  word-break: break-all;\n}\n@media screen and (max-width: 370px) {\n#org-tree-view table:not(.permissions-table) td {\n    display: block;\n}\n}\n@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {\n#account-info-col-1 {\n    width: calc(100% - 12rem) !important;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEducationInfo.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserJobHistory.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserNomineeInfo.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsBasic.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsTree.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=template&id=993509bc&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=template&id=993509bc& ***!
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
  return _c(
    "div",
    { attrs: { id: "docs-view" } },
    [
      _c(
        "vs-popup",
        {
          attrs: { mediumscreen: "", title: _vm.pop_title, active: _vm.popUp },
          on: {
            "update:active": function($event) {
              _vm.popUp = $event
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "vx-col md:w-full w-full" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: {
                      placeholder: "Document Title",
                      label: "Document Title",
                      autocomplete: ""
                    },
                    model: {
                      value: _vm.selectedType,
                      callback: function($$v) {
                        _vm.selectedType = $$v
                      },
                      expression: "selectedType"
                    }
                  },
                  _vm._l(_vm.employee_documents_type, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.value, text: item.label }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.selectedType,
                    name: "document_title",
                    altName: "result type"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-col md:w-full w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: { label: "Document Information" },
                  model: {
                    value: _vm.doc.document_info,
                    callback: function($$v) {
                      _vm.$set(_vm.doc, "document_info", $$v)
                    },
                    expression: "doc.document_info"
                  }
                }),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.doc.document_info,
                    name: "information",
                    altName: "information"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-full w-full py-3" }, [
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
                      [_vm._v("Upload")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "pl-3 pt-3" }, [
                  _vm._v(_vm._s(_vm.doc.attachmentName))
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mt-3" }),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.save,
                  expression: "mode.save"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
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
                [_vm._v("Save")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.edit,
                  expression: "mode.edit"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
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
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vx-col w-full bg-white pt-3" },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "flex items-end px-3" },
                [
                  _c("feather-icon", {
                    staticClass: "mr-2",
                    attrs: { svgClasses: "w-6 h-6", icon: "PaperclipIcon" }
                  }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "font-medium text-lg leading-none" },
                    [_vm._v("Employee Documents")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "float-right pr-3" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-plus"
                    },
                    on: {
                      click: function($event) {
                        return _vm.callPopup("add")
                      }
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("vs-divider")
        ],
        1
      ),
      _vm._v(" "),
      _c("vx-card", { staticClass: "mb-base" }, [
        _c("div", { staticClass: "vx-row" }, [
          _c(
            "div",
            { staticClass: "vx-col w-full" },
            [
              _c(
                "vs-table",
                {
                  attrs: { stripe: "", data: _vm.employee_documents },
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
                              _c(
                                "vs-td",
                                { attrs: { data: tr.document_title } },
                                [
                                  _vm._v(
                                    "\n                              " +
                                      _vm._s(tr.document_title.label) +
                                      "\n                          "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: tr.document_info } },
                                [
                                  _vm._v(
                                    "\n                              " +
                                      _vm._s(tr.document_info) +
                                      "\n                          "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: tr.attachment_link } },
                                [
                                  tr.attachment_name
                                    ? _c(
                                        "a",
                                        {
                                          staticClass:
                                            "flex py-2 px-4 cursor-pointer ",
                                          attrs: {
                                            href: tr.attachment_link,
                                            download: tr.attachmentName
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
                                            _vm._v(_vm._s(tr.attachment_name))
                                          ])
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  staticClass: "px-0",
                                  attrs: { data: tr.action }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "float-right pr-3" },
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
                                            return _vm.actionConfirm(
                                              tr,
                                              _vm.deleteDataProceed,
                                              "delete this  " +
                                                tr.document_title.label
                                            )
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "float-right  pr-3" },
                                    [
                                      _c("vs-button", {
                                        attrs: {
                                          size: "small",
                                          "icon-pack": "feather",
                                          icon: "icon-edit"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.callPopup("edit", tr)
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]
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
                      _c("vs-th", { attrs: { "sort-key": "document_title" } }, [
                        _vm._v("Document Title")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Information")]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Document Attachment")]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Action")])
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
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=template&id=b6155dc2&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=template&id=b6155dc2& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "edu-info-view" } },
    [
      _c(
        "vs-popup",
        {
          attrs: {
            mediumscreen: "",
            title: _vm.popup_title,
            active: _vm.eduAdd
          },
          on: {
            "update:active": function($event) {
              _vm.eduAdd = $event
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row" }, [
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
                        label: "Degree Name",
                        autocomplete: ""
                      },
                      on: {
                        input: function($event) {
                          return _vm.manageEducation(
                            "degreeType",
                            _vm.selectedDegree
                          )
                        }
                      },
                      model: {
                        value: _vm.selectedDegree,
                        callback: function($$v) {
                          _vm.selectedDegree = $$v
                        },
                        expression: "selectedDegree"
                      }
                    },
                    _vm._l(_vm.degreeData, function(degreeItIem, degreeIndex) {
                      return _c("vs-select-item", {
                        key: degreeIndex,
                        attrs: {
                          value: degreeItIem.value,
                          text: degreeItIem.label
                        }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.selectedDegree,
                      name: "degreeName",
                      altName: "degree name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.viewInstituteList,
                      expression: "viewInstituteList"
                    }
                  ],
                  staticClass: "mt-4"
                },
                [
                  _c(
                    "vs-select",
                    {
                      staticClass: "w-full",
                      attrs: {
                        placeholder: "Institute Name",
                        label: "Institute Name",
                        autocomplete: ""
                      },
                      on: {
                        input: function($event) {
                          return _vm.manageEducation(
                            "otherInstitute",
                            _vm.selectedInstitute
                          )
                        }
                      },
                      model: {
                        value: _vm.selectedInstitute,
                        callback: function($$v) {
                          _vm.selectedInstitute = $$v
                        },
                        expression: "selectedInstitute"
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
                          text: instituteItem.label
                        }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.selectedInstitute,
                      name: "instituteName",
                      altName: "institute name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.viewInstituteList,
                      expression: "!viewInstituteList"
                    }
                  ],
                  staticClass: "mt-4"
                },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "Institute Name" },
                    model: {
                      value: _vm.instituteName,
                      callback: function($$v) {
                        _vm.instituteName = $$v
                      },
                      expression: "instituteName"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.instituteName,
                      name: "instituteName",
                      altName: "institute name"
                    }
                  })
                ],
                1
              ),
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
                        placeholder: "Passing Year",
                        label: "Passing Year",
                        autocomplete: ""
                      },
                      model: {
                        value: _vm.passingYear,
                        callback: function($$v) {
                          _vm.passingYear = $$v
                        },
                        expression: "passingYear"
                      }
                    },
                    _vm._l(_vm.yearList, function(
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
                      value: _vm.passingYear,
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
                          placeholder: "Result Type",
                          label: "Result Type",
                          autocomplete: ""
                        },
                        on: {
                          input: function($event) {
                            return _vm.manageEducation(
                              "resultType",
                              _vm.selectedResultType
                            )
                          }
                        },
                        model: {
                          value: _vm.selectedResultType,
                          callback: function($$v) {
                            _vm.selectedResultType = $$v
                          },
                          expression: "selectedResultType"
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
                        value: _vm.selectedResultType,
                        name: "resultType",
                        altName: "result type"
                      }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.viewForCGPA,
                      expression: "viewForCGPA"
                    }
                  ],
                  staticClass: "mt-3"
                },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: { label: "Out Of", min: "1", max: "5" },
                    model: {
                      value: _vm.result.outof,
                      callback: function($$v) {
                        _vm.$set(_vm.result, "outof", $$v)
                      },
                      expression: "result.outof"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.result.outof,
                      name: "outof",
                      altName: "out of"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.viewForCGPA,
                      expression: "viewForCGPA"
                    }
                  ],
                  staticClass: "mt-3"
                },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "CGPA", min: "1", max: "5" },
                    model: {
                      value: _vm.result.cgpa,
                      callback: function($$v) {
                        _vm.$set(_vm.result, "cgpa", $$v)
                      },
                      expression: "result.cgpa"
                    }
                  }),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.result.cgpa,
                      name: "cgpa",
                      altName: "CGPA"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.viewForCGPA,
                      expression: "!viewForCGPA"
                    }
                  ],
                  staticClass: "mt-4"
                },
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
                            placeholder: "Division",
                            label: "Division",
                            autocomplete: ""
                          },
                          model: {
                            value: _vm.result.division,
                            callback: function($$v) {
                              _vm.$set(_vm.result, "division", $$v)
                            },
                            expression: "result.division"
                          }
                        },
                        _vm._l(_vm.divisionData, function(
                          divisionItem,
                          divisionIndex
                        ) {
                          return _c("vs-select-item", {
                            key: divisionIndex,
                            attrs: {
                              value: divisionItem.value,
                              text: divisionItem.label
                            }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.result.division,
                          name: "division",
                          altName: "division"
                        }
                      })
                    ],
                    1
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
              _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                _vm._v("Certificate Attachment:")
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
                      [_vm._v("Upload\n                        ")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "pl-3 pt-3" }, [
                  _vm._v(_vm._s(_vm.doc.attachmentName))
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mt-3" }),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.save,
                  expression: "mode.save"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
            [
              _c(
                "vs-button",
                {
                  attrs: { disabled: _vm.btnDisabled },
                  on: {
                    click: function($event) {
                      return _vm.EducationAdd()
                    }
                  }
                },
                [_vm._v("Save")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.edit,
                  expression: "mode.edit"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
            [
              _c(
                "vs-button",
                {
                  attrs: { disabled: _vm.btnDisabled },
                  on: {
                    click: function($event) {
                      return _vm.EducationEdit()
                    }
                  }
                },
                [_vm._v("Update")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vx-col w-full bg-white pt-3" },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "flex items-end px-3" },
                [
                  _c("feather-icon", {
                    staticClass: "mr-2",
                    attrs: { svgClasses: "w-6 h-6", icon: "BookIcon" }
                  }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "font-medium text-lg leading-none" },
                    [_vm._v("Education History")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "float-right pr-3" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-plus"
                    },
                    on: {
                      click: function($event) {
                        return _vm.callPopup("edu_add")
                      }
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("vs-divider")
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.edu_infos, function(tr, k) {
        return _c(
          "div",
          { key: k },
          [
            _c("vx-card", { staticClass: "mb-base" }, [
              _c("div", { staticClass: "vx-row" }, [
                _c("div", { staticClass: "vx-col  lg:w-10/12 w-8/12" }, [
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col lg:w-6/12 md:w-8/12 w-full" },
                      [
                        _c("table", { staticStyle: { width: "100%" } }, [
                          _c("tr", [
                            _c(
                              "td",
                              {
                                staticClass: "font-semibold",
                                staticStyle: { width: "35%" }
                              },
                              [_vm._v("Degree Name")]
                            ),
                            _vm._v(" "),
                            _c("td", { staticStyle: { width: "65%" } }, [
                              _vm._v(_vm._s(tr.degree_name))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c(
                              "td",
                              {
                                staticClass: "font-semibold",
                                staticStyle: { width: "35%" }
                              },
                              [_vm._v("Institute")]
                            ),
                            _vm._v(" "),
                            _c("td", { staticStyle: { width: "65%" } }, [
                              _vm._v(_vm._s(tr.institute_name))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c(
                              "td",
                              {
                                staticClass: "font-semibold",
                                staticStyle: { width: "35%" }
                              },
                              [_vm._v("Passing Year")]
                            ),
                            _vm._v(" "),
                            _c("td", { staticStyle: { width: "65%" } }, [
                              _vm._v(_vm._s(tr.passing_year))
                            ])
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "vx-col lg:w-6/12 md:w-8/12" }, [
                      _c("table", { staticStyle: { width: "100%" } }, [
                        _c("tr", [
                          _c(
                            "td",
                            {
                              staticClass: "font-semibold",
                              staticStyle: { width: "35%" }
                            },
                            [_vm._v("Result Type")]
                          ),
                          _vm._v(" "),
                          _c("td", { staticStyle: { width: "65%" } }, [
                            _vm._v(_vm._s(tr.result_type))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "td",
                            {
                              staticClass: "font-semibold",
                              staticStyle: { width: "35%" }
                            },
                            [_vm._v("Result")]
                          ),
                          _vm._v(" "),
                          tr.result.cgpa
                            ? _c("td", { staticStyle: { width: "65%" } }, [
                                _vm._v(
                                  " " +
                                    _vm._s(tr.result.cgpa) +
                                    " out of " +
                                    _vm._s(tr.result.out_of)
                                )
                              ])
                            : _c("td", { staticStyle: { width: "65%" } }, [
                                _vm._v(" " + _vm._s(tr.result.division))
                              ])
                        ]),
                        _vm._v(" "),
                        tr.attachment_name
                          ? _c("tr", [
                              _c(
                                "td",
                                {
                                  staticClass: "font-semibold",
                                  staticStyle: { width: "35%" }
                                },
                                [_vm._v("Attachment")]
                              ),
                              _vm._v(" "),
                              _c("td", { staticStyle: { width: "65%" } }, [
                                _c(
                                  "a",
                                  {
                                    staticClass: "flex py-2  cursor-pointer ",
                                    attrs: {
                                      href: tr.attachment_link,
                                      download: tr.attachment_name
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
                                      _vm._v(_vm._s(tr.attachment_name))
                                    ])
                                  ],
                                  1
                                )
                              ])
                            ])
                          : _vm._e()
                      ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col  lg:w-2/12 w-4/12" }, [
                  _c(
                    "div",
                    { staticClass: "float-right pr-3" },
                    [
                      _c("vs-button", {
                        attrs: {
                          size: "small",
                          "icon-pack": "feather",
                          icon: "icon-edit"
                        },
                        on: {
                          click: function($event) {
                            return _vm.callPopup("edu_edit", tr)
                          }
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "float-right pr-3" },
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
                            return _vm.actionConfirm(
                              tr.edu_id,
                              _vm.deleteDataProceed,
                              "delete " + tr.degree_name
                            )
                          }
                        }
                      })
                    ],
                    1
                  )
                ])
              ])
            ])
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=template&id=87655484&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=template&id=87655484& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "job-info-view" } },
    [
      _c(
        "vs-popup",
        {
          attrs: { mediumscreen: "", title: _vm.pop_title, active: _vm.jobAdd },
          on: {
            "update:active": function($event) {
              _vm.jobAdd = $event
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col md:w-1/2 w-full" }, [
              _c(
                "div",
                { staticClass: "mt-4" },
                [
                  _c("vs-input", {
                    staticClass: "w-full mt-4",
                    attrs: { label: "Organization Name" },
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
                        label: "Designation"
                      },
                      model: {
                        value: _vm.selectdDesignation,
                        callback: function($$v) {
                          _vm.selectdDesignation = $$v
                        },
                        expression: "selectdDesignation"
                      }
                    },
                    _vm._l(_vm.designationData, function(item, index) {
                      return _c("vs-select-item", {
                        key: index,
                        attrs: { value: item.value, text: item.label }
                      })
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("validate-data", {
                    attrs: {
                      rules: "required",
                      value: _vm.selectdDesignation,
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
                      masks: { input: "YYYY-MM-DD" },
                      "max-date": new Date()
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
                                  staticClass: "w-full mt-4",
                                  attrs: {
                                    "icon-pack": "feather",
                                    icon: "icon icon-calendar",
                                    label: "Job Duration",
                                    value:
                                      inputValue.start + " - " + inputValue.end
                                  }
                                },
                                inputEvents.start
                              )
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.jobDuration,
                      callback: function($$v) {
                        _vm.jobDuration = $$v
                      },
                      expression: "jobDuration"
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
                    attrs: { label: "Duties" },
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
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mt-3" }),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.save,
                  expression: "mode.save"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
            [
              _c(
                "vs-button",
                {
                  attrs: { disabled: _vm.btnDisabled },
                  on: {
                    click: function($event) {
                      return _vm.educationAdd()
                    }
                  }
                },
                [_vm._v("Save")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.edit,
                  expression: "mode.edit"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
            [
              _c(
                "vs-button",
                {
                  attrs: { disabled: _vm.btnDisabled },
                  on: {
                    click: function($event) {
                      return _vm.educationEdit()
                    }
                  }
                },
                [_vm._v("Update")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vx-col w-full bg-white pt-3" },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "flex items-end px-3" },
                [
                  _c("feather-icon", {
                    staticClass: "mr-2",
                    attrs: { svgClasses: "w-6 h-6", icon: "BriefcaseIcon" }
                  }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "font-medium text-lg leading-none" },
                    [_vm._v("Job History")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "float-right pr-3" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-plus"
                    },
                    on: {
                      click: function($event) {
                        return _vm.callPopup("job_add")
                      }
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("vs-divider")
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.job_histories, function(tr, k) {
        return _c(
          "div",
          { key: k },
          [
            _c("vx-card", { staticClass: "mb-base" }, [
              _c("div", { staticClass: "vx-row" }, [
                _c("div", { staticClass: "vx-col lg:w-10/12 w-7/12" }, [
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col lg:w-6/12 md:w-8/12 w-full " },
                      [
                        _c("table", { staticStyle: { width: "100%" } }, [
                          _c("tr", [
                            _c(
                              "td",
                              {
                                staticClass: "font-semibold",
                                staticStyle: { width: "35%" }
                              },
                              [_vm._v("Organization")]
                            ),
                            _vm._v(" "),
                            _c("td", { staticStyle: { width: "65%" } }, [
                              _vm._v(_vm._s(tr.orgname))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c(
                              "td",
                              {
                                staticClass: "font-semibold",
                                staticStyle: { width: "35%" }
                              },
                              [_vm._v("Designation")]
                            ),
                            _vm._v(" "),
                            _c("td", { staticStyle: { width: "65%" } }, [
                              _vm._v(_vm._s(tr.designation))
                            ])
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "vx-col lg:w-6/12 md:w-8/12 w-full" },
                      [
                        _c("table", { staticStyle: { width: "100%" } }, [
                          _c("tr", [
                            _c(
                              "td",
                              {
                                staticClass: "font-semibold",
                                staticStyle: { width: "35%" }
                              },
                              [_vm._v("Job Duration")]
                            ),
                            _vm._v(" "),
                            _c("td", { staticStyle: { width: "65%" } }, [
                              _vm._v(_vm._s(tr.job_duration) + " ")
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c(
                              "td",
                              {
                                staticClass: "font-semibold",
                                staticStyle: { width: "35%" }
                              },
                              [_vm._v("Duties")]
                            ),
                            _vm._v(" "),
                            _c("td", { staticStyle: { width: "65%" } }, [
                              _vm._v(_vm._s(tr.responsibility))
                            ])
                          ])
                        ])
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-col lg:w-2/12 w-5/12" }, [
                  _c(
                    "div",
                    { staticClass: "float-right pr-3" },
                    [
                      _c("vs-button", {
                        attrs: {
                          size: "small",
                          "icon-pack": "feather",
                          icon: "icon-edit"
                        },
                        on: {
                          click: function($event) {
                            return _vm.callPopup("job_edit", tr)
                          }
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "float-right pr-3" },
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
                            return _vm.actionConfirm(
                              tr,
                              _vm.deleteDataProceed,
                              "delete"
                            )
                          }
                        }
                      })
                    ],
                    1
                  )
                ])
              ])
            ])
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=template&id=1a75ebf0&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=template&id=1a75ebf0& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "nominee-info-view" } },
    [
      _c(
        "vs-popup",
        {
          attrs: { mediumscreen: "", title: _vm.pop_title, active: _vm.popUp },
          on: {
            "update:active": function($event) {
              _vm.popUp = $event
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "vx-col md:w-1/2 w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full mt-4",
                  attrs: { label: "Nominee Name" },
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
                      label: "Relationship Type",
                      autocomplete: ""
                    },
                    model: {
                      value: _vm.selectedType,
                      callback: function($$v) {
                        _vm.selectedType = $$v
                      },
                      expression: "selectedType"
                    }
                  },
                  _vm._l(_vm.relationshipTypeData, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.value, text: item.label }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.selectedType,
                    name: "relationshiptype",
                    altName: "relationship type"
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
                  attrs: { label: "Nominee Contact Number" },
                  model: {
                    value: _vm.nominee.phone_number,
                    callback: function($$v) {
                      _vm.$set(_vm.nominee, "phone_number", $$v)
                    },
                    expression: "nominee.phone_number"
                  }
                }),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.nominee.phone_number,
                    name: "nominee_phone",
                    altName: "nominee phone number"
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
                  attrs: {
                    color: "purple",
                    masks: { input: "YYYY-MM-DD" },
                    "max-date": new Date()
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
                                staticClass: "w-full mt-4",
                                attrs: {
                                  "icon-pack": "feather",
                                  icon: "icon icon-calendar",
                                  label: "Nominee Date of Birth",
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
                    value: _vm.nominee.birth_date,
                    callback: function($$v) {
                      _vm.$set(_vm.nominee, "birth_date", $$v)
                    },
                    expression: "nominee.birth_date"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col md:w-1/2 w-full py-3" }, [
              _c("div", { staticClass: "pt-3 pr-3 font-bold" }, [
                _vm._v("Identification Document:")
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
                      [_vm._v("Upload\n                        ")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "pl-3 pt-3" }, [
                  _vm._v(_vm._s(_vm.nominee.attachmentName))
                ])
              ])
            ]),
            _vm._v(" "),
            _vm.showShare
              ? _c(
                  "div",
                  { staticClass: "vx-col md:w-1/2 w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full mt-4",
                      attrs: {
                        type: "number",
                        label:
                          "Share (%) (Available: " +
                          _vm.shareData.not_used +
                          "%)",
                        min: "0",
                        max: _vm.shareData.not_used
                      },
                      model: {
                        value: _vm.nominee.share,
                        callback: function($$v) {
                          _vm.$set(_vm.nominee, "share", $$v)
                        },
                        expression: "nominee.share"
                      }
                    }),
                    _vm._v(" "),
                    _c("validate-data", {
                      attrs: {
                        rules: "required",
                        value: _vm.nominee.share,
                        name: "share",
                        altName: "Share"
                      }
                    })
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col  w-full" }, [
              _c(
                "div",
                { staticClass: "mt-4 pt-1" },
                [
                  _c(
                    "vs-checkbox",
                    {
                      model: {
                        value: _vm.nominee.is_nominee,
                        callback: function($$v) {
                          _vm.$set(_vm.nominee, "is_nominee", $$v)
                        },
                        expression: "nominee.is_nominee"
                      }
                    },
                    [_vm._v("Nominee")]
                  )
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mt-3" }),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.save,
                  expression: "mode.save"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
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
                [_vm._v("Save")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.edit,
                  expression: "mode.edit"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
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
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vx-col w-full bg-white pt-3" },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "flex items-end px-3" },
                [
                  _c("feather-icon", {
                    staticClass: "mr-2",
                    attrs: { svgClasses: "w-6 h-6", icon: "BriefcaseIcon" }
                  }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "font-medium text-lg leading-none" },
                    [_vm._v("Family & Nominee")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "float-right pr-3" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-plus"
                    },
                    on: {
                      click: function($event) {
                        return _vm.callPopup("add")
                      }
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("vs-divider")
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.nominees, function(tr, k) {
        return _c(
          "div",
          { key: k },
          [
            _c("vx-card", { staticClass: "mb-base" }, [
              _c("div", { staticClass: "vx-row" }, [
                _c(
                  "div",
                  { staticClass: "vx-col  lg:w-10/12 md:w-10/12 w-7/12" },
                  [
                    _c("div", { staticClass: "vx-row" }, [
                      _c(
                        "div",
                        { staticClass: "vx-col lg:w-6/12 md:w-6/12 w-full " },
                        [
                          _c("table", [
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Nominee Name")
                              ]),
                              _vm._v(" "),
                              _c("td", [_vm._v(_vm._s(tr.nominee_name))])
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Nominee Birtdate")
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _vm._v(_vm._s(tr.formatted_birth_date))
                              ])
                            ]),
                            _vm._v(" "),
                            tr.attachment_name
                              ? _c("tr", [
                                  _c("td", { staticClass: "font-semibold" }, [
                                    _vm._v("Identification Attachment")
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "flex py-2 px-4 cursor-pointer ",
                                        attrs: {
                                          href: tr.file_path,
                                          download: tr.attachment_name
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
                                          _vm._v(_vm._s(tr.attachment_name))
                                        ])
                                      ],
                                      1
                                    )
                                  ])
                                ])
                              : _vm._e()
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "vx-col lg:w-6/12 md:w-6/12 w-full " },
                        [
                          _c("table", [
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Relation")
                              ]),
                              _vm._v(" "),
                              _c("td", [_vm._v(_vm._s(tr.relation))])
                            ]),
                            _vm._v(" "),
                            tr.is_nominee
                              ? _c("tr", [
                                  _c("td", { staticClass: "font-semibold" }, [
                                    _vm._v("Nominee Share")
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(tr.nominee_share) + "%")
                                  ])
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Phone Number")
                              ]),
                              _vm._v(" "),
                              _c("td", [_vm._v(_vm._s(tr.phone_number))])
                            ])
                          ])
                        ]
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col lg:w-2/12 md:w-2/12 w-5/12" },
                  [
                    _c(
                      "div",
                      { staticClass: "float-right pr-3" },
                      [
                        _c("vs-button", {
                          attrs: {
                            size: "small",
                            "icon-pack": "feather",
                            icon: "icon-edit"
                          },
                          on: {
                            click: function($event) {
                              return _vm.callPopup("edit", tr)
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "float-right pr-3" },
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
                              return _vm.actionConfirm(
                                tr.nominee_id,
                                _vm.deleteDataProceed,
                                "delete " + tr.nominee_name
                              )
                            }
                          }
                        })
                      ],
                      1
                    )
                  ]
                )
              ])
            ])
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=template&id=3b4d3cec&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=template&id=3b4d3cec& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
        "vs-alert",
        {
          attrs: {
            color: "danger",
            title: "User Not Found",
            active: _vm.user_not_found
          },
          on: {
            "update:active": function($event) {
              _vm.user_not_found = $event
            }
          }
        },
        [
          _c("span", [
            _vm._v(
              "User record with id: " +
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
                  attrs: { to: { name: "UserList" } }
                },
                [_vm._v("All Users")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _vm.user_info
        ? _c(
            "div",
            [
              _c(
                "vs-tabs",
                {
                  key: _vm.isSmallerScreen,
                  staticClass: "tabs-shadow-none",
                  attrs: {
                    position: _vm.isSmallerScreen ? "top" : "left",
                    id: "profile-tabs"
                  }
                },
                [
                  _c(
                    "vs-tab",
                    {
                      attrs: {
                        "icon-pack": "feather",
                        icon: "icon-user",
                        label: !_vm.isSmallerScreen ? "Basic Info" : ""
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "tab-general md:ml-4 md:mt-0 mt-4 ml-0"
                        },
                        [_c("user-settings-basic")],
                        1
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.canChangePass
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-lock",
                            label: !_vm.isSmallerScreen ? "Change Password" : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-settings-change-password")],
                            1
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.isAdmin
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-info",
                            label: !_vm.isSmallerScreen ? "General Info" : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "tab-info md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-settings-general")],
                            1
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.isAdmin
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-git-pull-request",
                            label: !_vm.isSmallerScreen
                              ? "Organization Tree"
                              : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "tab-info md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-settings-tree")],
                            1
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.isAdmin
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-book",
                            label: !_vm.isSmallerScreen
                              ? "Education History"
                              : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "tab-social-links md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-education-info")],
                            1
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.isAdmin
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-briefcase",
                            label: !_vm.isSmallerScreen ? "Job History" : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "tab-text md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-job-history")],
                            1
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.isAdmin
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-user",
                            label: !_vm.isSmallerScreen
                              ? "Family & Nominee"
                              : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "tab-text md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-nominee-info")],
                            1
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.isAdmin
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-sliders",
                            label: !_vm.isSmallerScreen ? "Skills" : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "tab-text md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-skills")],
                            1
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.isAdmin
                    ? _c(
                        "vs-tab",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-paperclip",
                            label: !_vm.isSmallerScreen ? "Documents" : ""
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "tab-text md:ml-4 md:mt-0 mt-4 ml-0"
                            },
                            [_c("user-docs")],
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
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=template&id=5d6e9018&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=template&id=5d6e9018& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "page-user-view" } },
    [
      _c(
        "vs-alert",
        {
          attrs: {
            color: "danger",
            title: "User Not Found",
            active: _vm.user_not_found
          },
          on: {
            "update:active": function($event) {
              _vm.user_not_found = $event
            }
          }
        },
        [
          _c("span", [
            _vm._v(
              "User record with id: " +
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
                  attrs: { to: { name: "UserList" } }
                },
                [_vm._v("All Users")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _vm.user_info
        ? _c(
            "div",
            { attrs: { id: "user-data" } },
            [
              _c(
                "vx-card",
                {
                  staticClass: "mb-base",
                  attrs: { title: "User Basic Information" }
                },
                [
                  this.$store.state.AppActiveUser.isAdmin
                    ? _c("div", { staticClass: "vx-row" }, [
                        _c("div", { staticClass: "vx-col w-full" }, [
                          _c(
                            "div",
                            { staticClass: "pl-2 float-right" },
                            [
                              _c("vs-button", {
                                attrs: {
                                  size: "small",
                                  "icon-pack": "feather",
                                  icon: "icon-edit"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.callPopup("userinfo")
                                  }
                                }
                              })
                            ],
                            1
                          )
                        ])
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col", attrs: { id: "avatar-col" } },
                      [
                        _c("vs-avatar", {
                          attrs: {
                            size: "100px",
                            src: _vm.user_info.propic_url
                          }
                        }),
                        _vm._v(" "),
                        !this.$store.state.AppActiveUser.isAdmin
                          ? _c(
                              "vs-button",
                              {
                                staticClass: "ml-4 mt-2",
                                attrs: { size: "small", color: "gray" },
                                on: {
                                  click: function($event) {
                                    return _vm.callPopup("image_change")
                                  }
                                }
                              },
                              [_vm._v("Change")]
                            )
                          : _vm._e()
                      ],
                      1
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
                            _c("td", [_vm._v(_vm._s(_vm.user_info.full_name))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Employee ID ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.user_info.emp_id))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Email ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.user_info.email))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Phone ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.user_info.phone))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Status ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.user_info.status))])
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
                              _vm._v("Username ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.user_info.username))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Address ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.user_info.address))])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("Company ")
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(_vm._s(_vm.user_info.company_name))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "font-semibold" }, [
                              _vm._v("User Type ")
                            ]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(_vm.user_info.user_type))])
                          ])
                        ])
                      ]
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              !_vm.isAdmin
                ? _c("vx-card", [
                    _c("div", { staticClass: "vx-row" }, [
                      _c(
                        "div",
                        { staticClass: "vx-col w-full" },
                        [
                          _c(
                            "div",
                            { staticClass: "flex items-end " },
                            [
                              _c("feather-icon", {
                                staticClass: "mr-2",
                                attrs: {
                                  svgClasses: "w-6 h-6",
                                  icon: "GridIcon"
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "font-medium text-lg leading-none"
                                },
                                [_vm._v("Package Information")]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          this.$store.state.AppActiveUser.isAdmin
                            ? _c(
                                "div",
                                { staticClass: "float-right pb-3" },
                                [
                                  _c("vs-button", {
                                    attrs: {
                                      size: "small",
                                      "icon-pack": "feather",
                                      icon: "icon-edit"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.callPopup("package")
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("vs-divider")
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "vx-col flex-1",
                          attrs: { id: "org-info-col-1" }
                        },
                        [
                          _c("table", [
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Employee Type ")
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _vm._v(
                                  _vm._s(_vm.org_info.employee_type) + "  "
                                ),
                                _vm.con_show
                                  ? _c("span", [
                                      _c("br"),
                                      _vm._v(_vm._s(_vm.contract_range))
                                    ])
                                  : _vm._e()
                              ])
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Leave Package ")
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _vm._v(_vm._s(_vm.org_info.leave_package))
                              ])
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Job Description ")
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _vm._v(_vm._s(_vm.org_info.job_description))
                              ])
                            ])
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "vx-col flex-1",
                          attrs: { id: "org-info-col-2" }
                        },
                        [
                          _c("table", [
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Payroll Package ")
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _vm._v(_vm._s(_vm.org_info.payroll_package))
                              ])
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Asset Package ")
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _vm._v(_vm._s(_vm.org_info.asset_package))
                              ])
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", { staticClass: "font-semibold" }, [
                                _vm._v("Designation ")
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _vm._v(_vm._s(_vm.org_info.designation))
                              ])
                            ])
                          ])
                        ]
                      )
                    ])
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
                    title: "General Information",
                    active: _vm.basicEdit
                  },
                  on: {
                    "update:active": function($event) {
                      _vm.basicEdit = $event
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
                        "Upload User Profile\n                picture\n            "
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
                          _c("vs-input", {
                            staticClass: "w-full mt-4 mr-1",
                            attrs: { label: "*First Name", name: "first_name" },
                            model: {
                              value: _vm.user_info.first_name,
                              callback: function($$v) {
                                _vm.$set(_vm.user_info, "first_name", $$v)
                              },
                              expression: "user_info.first_name"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.user_info.first_name,
                              name: "first_name"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c("vs-input", {
                                staticClass: "w-full mt-4",
                                attrs: { label: "Employee ID", name: "emp_id" },
                                model: {
                                  value: _vm.user_info.emp_id,
                                  callback: function($$v) {
                                    _vm.$set(_vm.user_info, "emp_id", $$v)
                                  },
                                  expression: "user_info.emp_id"
                                }
                              }),
                              _vm._v(" "),
                              _c("validate-data", {
                                attrs: {
                                  rules: "required",
                                  value: _vm.user_info.emp_id,
                                  name: "emp_id"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("vs-input", {
                            staticClass: "w-full mt-4",
                            attrs: {
                              label: "* Email",
                              type: "email",
                              name: "email"
                            },
                            model: {
                              value: _vm.user_info.email,
                              callback: function($$v) {
                                _vm.$set(_vm.user_info, "email", $$v)
                              },
                              expression: "user_info.email"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required|email",
                              value: _vm.user_info.email,
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
                          _c("vs-input", {
                            staticClass: "w-full mt-4",
                            attrs: { label: "*Last Name", name: "first_name" },
                            model: {
                              value: _vm.user_info.last_name,
                              callback: function($$v) {
                                _vm.$set(_vm.user_info, "last_name", $$v)
                              },
                              expression: "user_info.last_name"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.user_info.last_name,
                              name: "last_name"
                            }
                          }),
                          _vm._v(" "),
                          _c("vs-input", {
                            staticClass: "w-full mt-5",
                            attrs: { label: "Phone", name: "phone" },
                            model: {
                              value: _vm.user_info.phone,
                              callback: function($$v) {
                                _vm.$set(_vm.user_info, "phone", $$v)
                              },
                              expression: "user_info.phone"
                            }
                          }),
                          _vm._v(" "),
                          _c("validate-data", {
                            attrs: {
                              rules: "required",
                              value: _vm.user_info.phone,
                              name: "phone"
                            }
                          }),
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
                                    placeholder: "Role",
                                    label: "Role",
                                    autocomplete: ""
                                  },
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
                                _vm._l(_vm.role, function(item, index) {
                                  return _c("vs-select-item", {
                                    key: index,
                                    attrs: {
                                      value: item.value,
                                      text: item.label
                                    }
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
                      _vm.shoWPermissions
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
                                    _vm._l(_vm.roleData, function(val, index) {
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
                                                        "\n                                    "
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
                          on: { click: _vm.GeneralInfoUpdate }
                        },
                        [_vm._v("Update")]
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "vs-popup",
                {
                  attrs: { title: "Profile Picture", active: _vm.imageEdit },
                  on: {
                    "update:active": function($event) {
                      _vm.imageEdit = $event
                    }
                  }
                },
                [
                  _c(
                    "vs-row",
                    [
                      _c(
                        "vs-col",
                        {
                          attrs: {
                            "vs-offset": "3",
                            "vs-type": "flex",
                            "vs-justify": "center",
                            "vs-align": "center",
                            "vs-w": "6"
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "button-wrapper bg-gray-200 cursor-pointer float-center",
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
                                staticStyle: { height: "150px" },
                                attrs: { src: _vm.logoPreviewImage }
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass: "text-center p-1",
                                  staticStyle: {
                                    width: "150px",
                                    "font-size": "10px"
                                  }
                                },
                                [
                                  _vm._v(
                                    "Upload User Profile\n                        picture"
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "vx-row mt-3" }, [
                    _c("div", { staticClass: "vx-col-12" })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-1", attrs: { align: "right" } },
                    [
                      _c(
                        "vs-button",
                        {
                          attrs: { disabled: _vm.btnDisabled },
                          on: { click: _vm.GeneralInfoUpdate }
                        },
                        [_vm._v("Update")]
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
                  attrs: {
                    mediumscreen: "",
                    title: "Package",
                    active: _vm.packageEdit
                  },
                  on: {
                    "update:active": function($event) {
                      _vm.packageEdit = $event
                    }
                  }
                },
                [
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
                                  placeholder: "Payroll package",
                                  label: "Designation",
                                  name: "designation"
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
                                  attrs: { value: item.value, text: item.label }
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
                                  autocomplete: "",
                                  placeholder: "Job Description",
                                  label: "Job Description",
                                  name: "job_description"
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
                                  attrs: { value: item.value, text: item.label }
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
                                  autocomplete: "",
                                  placeholder: "Employee Type",
                                  label: "Employee Type",
                                  name: "employee_type"
                                },
                                on: {
                                  input: function($event) {
                                    return _vm.checkEmployeeType(
                                      _vm.employeeType
                                    )
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
                                  attrs: { value: item.value, text: item.label }
                                })
                              }),
                              1
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
                                                    icon: "icon icon-calendar",
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
                                })
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
                                  attrs: { value: item.value, text: item.label }
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
                                  autocomplete: "",
                                  placeholder: "Leave Package",
                                  label: "Leave Package",
                                  name: "leave_package"
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
                                  attrs: { value: item.value, text: item.label }
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
                                  autocomplete: "",
                                  placeholder: "Asset Package",
                                  label: "Asset Package",
                                  name: "asset_package"
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
                                  attrs: { value: item.value, text: item.label }
                                })
                              }),
                              1
                            )
                          ],
                          1
                        )
                      ])
                    ]
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
                              return _vm.PackageUpdate()
                            }
                          }
                        },
                        [_vm._v("Update")]
                      )
                    ],
                    1
                  )
                ]
              )
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=template&id=4b966315&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=template&id=4b966315& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
        "div",
        { staticClass: "vx-col w-full bg-white pt-3" },
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
              _c("span", { staticClass: "font-medium text-lg leading-none" }, [
                _vm._v("Change Password")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("vs-divider")
        ],
        1
      ),
      _vm._v(" "),
      _c("vx-card", { attrs: { "no-shadow": "" } }, [
        _c(
          "form",
          [
            _c("vs-input", {
              staticClass: "w-full mb-base",
              attrs: {
                icon: _vm.showPassOld ? "icon icon-eye" : "icon icon-eye-off",
                type: _vm.showPassOld ? "text" : "password",
                "icon-pack": "feather",
                "icon-no-border": "",
                "icon-after": "true",
                "label-placeholder": "Old Password"
              },
              on: {
                "icon-click": function($event) {
                  _vm.showPassOld = !_vm.showPassOld
                }
              },
              model: {
                value: _vm.old_password,
                callback: function($$v) {
                  _vm.old_password = $$v
                },
                expression: "old_password"
              }
            }),
            _vm._v(" "),
            _c("vs-input", {
              staticClass: "w-full mb-base",
              attrs: {
                icon: _vm.showPassNew ? "icon icon-eye" : "icon icon-eye-off",
                type: _vm.showPassNew ? "text" : "password",
                "icon-pack": "feather",
                "icon-no-border": "",
                "icon-after": "true",
                "label-placeholder": "New Password"
              },
              on: {
                "icon-click": function($event) {
                  _vm.showPassNew = !_vm.showPassNew
                }
              },
              model: {
                value: _vm.new_password,
                callback: function($$v) {
                  _vm.new_password = $$v
                },
                expression: "new_password"
              }
            }),
            _vm._v(" "),
            _c("vs-input", {
              staticClass: "w-full mb-base",
              attrs: {
                icon: _vm.showPassConfirm
                  ? "icon icon-eye"
                  : "icon icon-eye-off",
                type: _vm.showPassConfirm ? "text" : "password",
                "icon-pack": "feather",
                "icon-no-border": "",
                "icon-after": "true",
                "label-placeholder": "Confirm Password"
              },
              on: {
                "icon-click": function($event) {
                  _vm.showPassConfirm = !_vm.showPassConfirm
                }
              },
              model: {
                value: _vm.confirm_new_password,
                callback: function($$v) {
                  _vm.confirm_new_password = $$v
                },
                expression: "confirm_new_password"
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "flex flex-wrap items-center justify-end" },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-auto mt-2",
                    attrs: { disabled: !_vm.validateForm },
                    on: { click: _vm.changePassword }
                  },
                  [_vm._v("Save Changes\n                ")]
                ),
                _vm._v(" "),
                _c(
                  "vs-button",
                  {
                    staticClass: "ml-4 mt-2",
                    attrs: { type: "border", color: "warning" }
                  },
                  [_vm._v("Reset")]
                )
              ],
              1
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=template&id=4694ac2e&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=template&id=4694ac2e& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "gen-info-view" } }, [
    _vm.general_info
      ? _c(
          "div",
          { attrs: { id: "gen-data" } },
          [
            _c(
              "vx-card",
              {
                staticClass: "mb-base",
                attrs: { title: "General Information" }
              },
              [
                _c("div", { staticClass: "vx-row" }, [
                  _c("div", { staticClass: "vx-col w-full" }, [
                    _c(
                      "div",
                      { staticClass: "float-right pb-2" },
                      [
                        _c("vs-button", {
                          attrs: {
                            size: "small",
                            "icon-pack": "feather",
                            icon: "icon-edit"
                          },
                          on: {
                            click: function($event) {
                              return _vm.callPopup("gen_info")
                            }
                          }
                        })
                      ],
                      1
                    )
                  ]),
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
                            _vm._v("Personal Email ")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(_vm._s(_vm.general_info.personalemail))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Gender ")
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.general_info.gender))])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Date of Birth ")
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.formatted_birthdate))])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Religion ")
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.general_info.religion))])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Marital Status ")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(_vm._s(_vm.general_info.marital_status))
                          ])
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
                            _vm._v("Emergency Contact ")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              " " + _vm._s(_vm.general_info.personalmobile)
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Work Mobile ")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(" " + _vm._s(_vm.general_info.officemobile))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Nationality ")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(_vm._s(_vm.general_info.nationality))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { staticClass: "font-semibold" }, [
                            _vm._v("Blood Group ")
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(_vm._s(_vm.general_info.blood_group))
                          ])
                        ])
                      ])
                    ]
                  )
                ])
              ]
            ),
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
                          attrs: { svgClasses: "w-6 h-6", icon: "HomeIcon" }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "font-medium text-lg leading-none" },
                          [_vm._v("Permanent Address")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "float-right pb-3" },
                      [
                        _c("vs-button", {
                          attrs: {
                            size: "small",
                            "icon-pack": "feather",
                            icon: "icon-edit"
                          },
                          on: {
                            click: function($event) {
                              return _vm.callPopup("address", _vm.general_info)
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("vs-divider")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "vx-col flex-1",
                    attrs: { id: "addr-info-col-1" }
                  },
                  [
                    _c("table", [
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Address ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(_vm._s(_vm.general_info.permanent_address))
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("table", [
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("City ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm.general_info.permanent_address_city)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Province ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm.general_info.permanent_address_province)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Country ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm.general_info.permanent_address_country)
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Post Code ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm.general_info.permanentaddresspostcode)
                          )
                        ])
                      ])
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col w-full md:mt-10" },
                  [
                    _c(
                      "div",
                      { staticClass: "flex items-end px-3" },
                      [
                        _c("feather-icon", {
                          staticClass: "mr-2",
                          attrs: { svgClasses: "w-6 h-6", icon: "HomeIcon" }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "font-medium text-lg leading-none" },
                          [_vm._v("Present Address")]
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
                _c(
                  "div",
                  {
                    staticClass: "vx-col flex-1",
                    attrs: { id: "addr-info-col-2" }
                  },
                  [
                    _c("table", [
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Address ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(_vm._s(_vm.general_info.present_address))
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("table", [
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("City ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(_vm._s(_vm.general_info.present_address_city))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Province ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm.general_info.present_address_province)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Country ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm.general_info.present_address_country)
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", { staticClass: "font-semibold" }, [
                          _vm._v("Post Code ")
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm.general_info.presentaddresspostcode)
                          )
                        ])
                      ])
                    ])
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "vs-popup",
              {
                attrs: {
                  mediumscreen: "",
                  title: "General Information",
                  active: _vm.geninfoEdit
                },
                on: {
                  "update:active": function($event) {
                    _vm.geninfoEdit = $event
                  }
                }
              },
              [
                _c("div", { staticClass: "vx-row" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col md:w-1/2 w-full" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "Personal email" },
                        model: {
                          value: _vm.user_info.personal_email,
                          callback: function($$v) {
                            _vm.$set(_vm.user_info, "personal_email", $$v)
                          },
                          expression: "user_info.personal_email"
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
                        attrs: { label: "Emergency Contact" },
                        model: {
                          value: _vm.user_info.emergency_number,
                          callback: function($$v) {
                            _vm.$set(_vm.user_info, "emergency_number", $$v)
                          },
                          expression: "user_info.emergency_number"
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
                        attrs: { label: "Work Phone" },
                        model: {
                          value: _vm.user_info.work_number,
                          callback: function($$v) {
                            _vm.$set(_vm.user_info, "work_number", $$v)
                          },
                          expression: "user_info.work_number"
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
                        attrs: {
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
                          value: _vm.general_info.dateofbirth,
                          callback: function($$v) {
                            _vm.$set(_vm.general_info, "dateofbirth", $$v)
                          },
                          expression: "general_info.dateofbirth"
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
                            placeholder: "blood group",
                            label: "Blood Group"
                          },
                          model: {
                            value: _vm.blood,
                            callback: function($$v) {
                              _vm.blood = $$v
                            },
                            expression: "blood"
                          }
                        },
                        _vm._l(_vm.bloodGroup, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.blood,
                          name: "blood",
                          altName: "blood group"
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
                          attrs: { placeholder: "gender", label: "Gender" },
                          model: {
                            value: _vm.gender,
                            callback: function($$v) {
                              _vm.gender = $$v
                            },
                            expression: "gender"
                          }
                        },
                        _vm._l(_vm.GenderData, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.gender,
                          name: "gender",
                          altName: "gender"
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
                            placeholder: "marital status",
                            label: "Marital Status"
                          },
                          model: {
                            value: _vm.marital_status,
                            callback: function($$v) {
                              _vm.marital_status = $$v
                            },
                            expression: "marital_status"
                          }
                        },
                        _vm._l(_vm.maritalData, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.marital_status,
                          name: "gender",
                          altName: "marital status"
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
                          attrs: { placeholder: "religion", label: "Religion" },
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
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.marital_status,
                          name: "religion",
                          altName: "religion"
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
                            placeholder: "nationality",
                            label: "Nationality"
                          },
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
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  )
                ]),
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
                            return _vm.generalInfoUpdate()
                          }
                        }
                      },
                      [_vm._v("Update")]
                    )
                  ],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "vs-popup",
              {
                attrs: {
                  mediumscreen: "",
                  title: "Address",
                  active: _vm.addressEdit
                },
                on: {
                  "update:active": function($event) {
                    _vm.addressEdit = $event
                  }
                }
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "font-bold pb-2",
                    staticStyle: { "border-bottom": "1px solid #f2f2f2" }
                  },
                  [_vm._v(" Permanent Address")]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col  w-full" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "Address Line 1" },
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
                    { staticClass: "vx-col w-full" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "Address Line 2" },
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
                  _c(
                    "div",
                    {
                      staticClass: "vx-col md:w-1/2 w-full",
                      staticStyle: { "padding-top": "15px" }
                    },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: { placeholder: "Country", label: "Country" },
                          on: {
                            input: function($event) {
                              return _vm.getAddressData(
                                _vm.permanentCountrySelect,
                                "province"
                              )
                            }
                          },
                          model: {
                            value: _vm.permanentCountrySelect,
                            callback: function($$v) {
                              _vm.permanentCountrySelect = $$v
                            },
                            expression: "permanentCountrySelect"
                          }
                        },
                        _vm._l(_vm.countryData, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
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
                      staticClass: "vx-col md:w-1/2 w-full",
                      staticStyle: { "padding-top": "15px" }
                    },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "Province/Division",
                            label: "Province/Division"
                          },
                          on: {
                            input: function($event) {
                              return _vm.getAddressData(
                                _vm.permanentProvinceSelect,
                                "city"
                              )
                            }
                          },
                          model: {
                            value: _vm.permanentProvinceSelect,
                            callback: function($$v) {
                              _vm.permanentProvinceSelect = $$v
                            },
                            expression: "permanentProvinceSelect"
                          }
                        },
                        _vm._l(_vm.ProvinceData, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _vm.country1Other
                        ? _c("vs-input", {
                            staticClass: "w-full mt-4",
                            attrs: { label: "Address line 2" },
                            model: {
                              value: _vm.permanentProvinceSelect,
                              callback: function($$v) {
                                _vm.permanentProvinceSelect = $$v
                              },
                              expression: "permanentProvinceSelect"
                            }
                          })
                        : _vm._e()
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "vx-col md:w-1/2 w-full",
                      staticStyle: { "padding-top": "15px" }
                    },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: { placeholder: "City", label: "City" },
                          model: {
                            value: _vm.permanentCitySelect,
                            callback: function($$v) {
                              _vm.permanentCitySelect = $$v
                            },
                            expression: "permanentCitySelect"
                          }
                        },
                        _vm._l(_vm.CityData, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.permanentAddressCityOtherView
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
                    { staticClass: "vx-col md:w-1/2 w-full" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "Post Code" },
                        model: {
                          value: _vm.permanentAddressPostCode,
                          callback: function($$v) {
                            _vm.permanentAddressPostCode = $$v
                          },
                          expression: "permanentAddressPostCode"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "vx-col w-full",
                      staticStyle: { "padding-top": "15px" }
                    },
                    [
                      _c(
                        "vs-checkbox",
                        {
                          on: {
                            change: function($event) {
                              return _vm.makeSame(_vm.address_same)
                            }
                          },
                          model: {
                            value: _vm.address_same,
                            callback: function($$v) {
                              _vm.address_same = $$v
                            },
                            expression: "address_same"
                          }
                        },
                        [_vm._v("Same as Permanent Address")]
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "font-bold pb-2 pt-8",
                    staticStyle: { "border-bottom": "1px solid #f2f2f2" }
                  },
                  [_vm._v(" Present Address")]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col  w-full" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "Address Line 1" },
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
                    { staticClass: "vx-col w-full" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "Address Line 2" },
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
                  _c(
                    "div",
                    {
                      staticClass: "vx-col md:w-1/2 w-full",
                      staticStyle: { "padding-top": "15px" }
                    },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: { placeholder: "Country", label: "Country" },
                          on: {
                            input: function($event) {
                              return _vm.getAddressData(
                                _vm.permanentCountrySelect,
                                "province2"
                              )
                            }
                          },
                          model: {
                            value: _vm.presentCountrySelect,
                            callback: function($$v) {
                              _vm.presentCountrySelect = $$v
                            },
                            expression: "presentCountrySelect"
                          }
                        },
                        _vm._l(_vm.countryData2, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
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
                      staticClass: "vx-col md:w-1/2 w-full",
                      staticStyle: { "padding-top": "15px" }
                    },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: {
                            placeholder: "Province/Division",
                            label: "Province/Division"
                          },
                          on: {
                            input: function($event) {
                              return _vm.getAddressData(
                                _vm.presentProvinceSelect,
                                "city2"
                              )
                            }
                          },
                          model: {
                            value: _vm.presentProvinceSelect,
                            callback: function($$v) {
                              _vm.presentProvinceSelect = $$v
                            },
                            expression: "presentProvinceSelect"
                          }
                        },
                        _vm._l(_vm.ProvinceData2, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
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
                      staticClass: "vx-col md:w-1/2 w-full",
                      staticStyle: { "padding-top": "15px" }
                    },
                    [
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          attrs: { placeholder: "City", label: "City" },
                          model: {
                            value: _vm.presentCitySelect,
                            callback: function($$v) {
                              _vm.presentCitySelect = $$v
                            },
                            expression: "presentCitySelect"
                          }
                        },
                        _vm._l(_vm.CityData2, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.label }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  ),
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
                    { staticClass: "vx-col md:w-1/2 w-full" },
                    [
                      _c("vs-input", {
                        staticClass: "w-full mt-4",
                        attrs: { label: "Post Code" },
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
                            return _vm.addressUpdate()
                          }
                        }
                      },
                      [_vm._v("Update")]
                    )
                  ],
                  1
                )
              ]
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=template&id=2e131d70&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=template&id=2e131d70& ***!
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
  return _c("div", { attrs: { id: "org-tree-view" } }, [
    _c(
      "div",
      { attrs: { id: "tree-data" } },
      [
        _c(
          "vx-card",
          { staticClass: "mb-base", attrs: { title: "Organization Tree" } },
          [
            _c("div", { staticClass: "vx-row" }, [
              _c(
                "div",
                {
                  staticClass: "vx-col flex-1",
                  attrs: { id: "account-info-col-1" }
                },
                [
                  _c(
                    "div",
                    [
                      _c("validate-data", {
                        attrs: {
                          rules: "required",
                          value: _vm.selectedTree,
                          name: "selectedTree",
                          altName: "organization tree"
                        }
                      }),
                      _vm._v(" "),
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
                  )
                ]
              ),
              _vm._v(" "),
              this.$store.state.AppActiveUser.isAdmin
                ? _c("div", { staticClass: "vx-col w-full" }, [
                    _c(
                      "div",
                      { staticClass: "float-right pb-2" },
                      [
                        _c(
                          "vs-button",
                          {
                            attrs: { size: "small" },
                            on: {
                              click: function($event) {
                                return _vm.UpdateOrg()
                              }
                            }
                          },
                          [_vm._v("Update")]
                        )
                      ],
                      1
                    )
                  ])
                : _vm._e()
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=template&id=54a6742e&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=template&id=54a6742e& ***!
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
    { attrs: { id: "skill-view" } },
    [
      _c(
        "vs-popup",
        {
          attrs: { mediumscreen: "", title: _vm.pop_title, active: _vm.popUp },
          on: {
            "update:active": function($event) {
              _vm.popUp = $event
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c(
              "div",
              { staticClass: "vx-col md:w-1/2 w-full" },
              [
                _c(
                  "vs-select",
                  {
                    staticClass: "w-full",
                    attrs: { placeholder: "Skill Name", label: "Skill Name" },
                    model: {
                      value: _vm.selectedSkillName,
                      callback: function($$v) {
                        _vm.selectedSkillName = $$v
                      },
                      expression: "selectedSkillName"
                    }
                  },
                  _vm._l(_vm.skillNames, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.value, text: item.label }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.selectedSkillName,
                    name: "skillsname",
                    altName: "nkill name"
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
                    attrs: { placeholder: "Skill Scale", label: "Skill Scale" },
                    model: {
                      value: _vm.selectedScale,
                      callback: function($$v) {
                        _vm.selectedScale = $$v
                      },
                      expression: "selectedScale"
                    }
                  },
                  _vm._l(_vm.scales, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.value, text: item.label }
                    })
                  }),
                  1
                ),
                _vm._v(" "),
                _c("validate-data", {
                  attrs: {
                    rules: "required",
                    value: _vm.selectedScale,
                    name: "skillsscale",
                    altName: "skill scale"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mt-3" }),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.save,
                  expression: "mode.save"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
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
                [_vm._v("Save")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode.edit,
                  expression: "mode.edit"
                }
              ],
              staticClass: "pt-1",
              attrs: { align: "right" }
            },
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
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vx-col w-full bg-white pt-3" },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "flex items-end px-3" },
                [
                  _c("feather-icon", {
                    staticClass: "mr-2",
                    attrs: { svgClasses: "w-6 h-6", icon: "SlidersIcon" }
                  }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "font-medium text-lg leading-none" },
                    [_vm._v("Skill Matrix")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-1/2" }, [
              _c(
                "div",
                { staticClass: "float-right pr-3" },
                [
                  _c("vs-button", {
                    attrs: {
                      size: "small",
                      "icon-pack": "feather",
                      icon: "icon-plus"
                    },
                    on: {
                      click: function($event) {
                        return _vm.callPopup("add")
                      }
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("vs-divider")
        ],
        1
      ),
      _vm._v(" "),
      _c("vx-card", { staticClass: "mb-base" }, [
        _c("div", { staticClass: "vx-row" }, [
          _c(
            "div",
            { staticClass: "vx-col w-full " },
            [
              _c(
                "vs-table",
                {
                  attrs: { stripe: "", data: _vm.skills },
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
                              _c("vs-td", { attrs: { data: tr.skill_name } }, [
                                _vm._v(
                                  "\n                          " +
                                    _vm._s(tr.skill_name) +
                                    "\n                      "
                                )
                              ]),
                              _vm._v(" "),
                              _c("vs-td", { attrs: { data: tr.skill_scale } }, [
                                _vm._v(
                                  "\n                          " +
                                    _vm._s(tr.skill_scale) +
                                    "\n                      "
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  staticClass: "px-0",
                                  attrs: { data: tr.skill_action }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "float-right pr-3" },
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
                                            return _vm.actionConfirm(
                                              tr,
                                              _vm.deleteDataProceed,
                                              "delete " + tr.skill_name
                                            )
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "float-right pr-3" },
                                    [
                                      _c("vs-button", {
                                        attrs: {
                                          size: "small",
                                          "icon-pack": "feather",
                                          icon: "icon-edit"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.callPopup("edit", tr)
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]
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
                      _c(
                        "vs-th",
                        {
                          staticStyle: { width: "50%" },
                          attrs: { "sort-key": "skill_name" }
                        },
                        [_vm._v("Skill Name")]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        {
                          staticStyle: { width: "30%" },
                          attrs: { "sort-key": "skill_scale" }
                        },
                        [_vm._v("Skill Scale")]
                      ),
                      _vm._v(" "),
                      _c("vs-th", { staticStyle: { width: "20%" } }, [
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
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserDocs.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserDocs.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserDocs_vue_vue_type_template_id_993509bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserDocs.vue?vue&type=template&id=993509bc& */ "./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=template&id=993509bc&");
/* harmony import */ var _UserDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserDocs.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserDocs_vue_vue_type_template_id_993509bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserDocs_vue_vue_type_template_id_993509bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserDocs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserDocs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=template&id=993509bc&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=template&id=993509bc& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDocs_vue_vue_type_template_id_993509bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserDocs.vue?vue&type=template&id=993509bc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserDocs.vue?vue&type=template&id=993509bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDocs_vue_vue_type_template_id_993509bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDocs_vue_vue_type_template_id_993509bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserEducationInfo_vue_vue_type_template_id_b6155dc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserEducationInfo.vue?vue&type=template&id=b6155dc2& */ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=template&id=b6155dc2&");
/* harmony import */ var _UserEducationInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserEducationInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserEducationInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserEducationInfo.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserEducationInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserEducationInfo_vue_vue_type_template_id_b6155dc2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserEducationInfo_vue_vue_type_template_id_b6155dc2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserEducationInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEducationInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEducationInfo.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=template&id=b6155dc2&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=template&id=b6155dc2& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_template_id_b6155dc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEducationInfo.vue?vue&type=template&id=b6155dc2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserEducationInfo.vue?vue&type=template&id=b6155dc2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_template_id_b6155dc2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEducationInfo_vue_vue_type_template_id_b6155dc2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserJobHistory.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserJobHistory_vue_vue_type_template_id_87655484___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserJobHistory.vue?vue&type=template&id=87655484& */ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=template&id=87655484&");
/* harmony import */ var _UserJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserJobHistory.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserJobHistory_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserJobHistory.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserJobHistory_vue_vue_type_template_id_87655484___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserJobHistory_vue_vue_type_template_id_87655484___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserJobHistory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserJobHistory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserJobHistory.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=template&id=87655484&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=template&id=87655484& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_template_id_87655484___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserJobHistory.vue?vue&type=template&id=87655484& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserJobHistory.vue?vue&type=template&id=87655484&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_template_id_87655484___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserJobHistory_vue_vue_type_template_id_87655484___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserNomineeInfo_vue_vue_type_template_id_1a75ebf0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserNomineeInfo.vue?vue&type=template&id=1a75ebf0& */ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=template&id=1a75ebf0&");
/* harmony import */ var _UserNomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserNomineeInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserNomineeInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserNomineeInfo.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserNomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserNomineeInfo_vue_vue_type_template_id_1a75ebf0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserNomineeInfo_vue_vue_type_template_id_1a75ebf0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserNomineeInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserNomineeInfo.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=template&id=1a75ebf0&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=template&id=1a75ebf0& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_template_id_1a75ebf0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserNomineeInfo.vue?vue&type=template&id=1a75ebf0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserNomineeInfo.vue?vue&type=template&id=1a75ebf0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_template_id_1a75ebf0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserNomineeInfo_vue_vue_type_template_id_1a75ebf0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettings.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettings.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettings_vue_vue_type_template_id_3b4d3cec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettings.vue?vue&type=template&id=3b4d3cec& */ "./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=template&id=3b4d3cec&");
/* harmony import */ var _UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSettings.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSettings.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSettings_vue_vue_type_template_id_3b4d3cec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSettings_vue_vue_type_template_id_3b4d3cec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=template&id=3b4d3cec&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=template&id=3b4d3cec& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_template_id_3b4d3cec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=template&id=3b4d3cec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettings.vue?vue&type=template&id=3b4d3cec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_template_id_3b4d3cec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_template_id_3b4d3cec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettingsBasic_vue_vue_type_template_id_5d6e9018___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettingsBasic.vue?vue&type=template&id=5d6e9018& */ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=template&id=5d6e9018&");
/* harmony import */ var _UserSettingsBasic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSettingsBasic.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSettingsBasic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSettingsBasic.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSettingsBasic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSettingsBasic_vue_vue_type_template_id_5d6e9018___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSettingsBasic_vue_vue_type_template_id_5d6e9018___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsBasic.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsBasic.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=template&id=5d6e9018&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=template&id=5d6e9018& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_template_id_5d6e9018___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsBasic.vue?vue&type=template&id=5d6e9018& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsBasic.vue?vue&type=template&id=5d6e9018&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_template_id_5d6e9018___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsBasic_vue_vue_type_template_id_5d6e9018___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettingsChangePassword_vue_vue_type_template_id_4b966315___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettingsChangePassword.vue?vue&type=template&id=4b966315& */ "./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=template&id=4b966315&");
/* harmony import */ var _UserSettingsChangePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSettingsChangePassword.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserSettingsChangePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSettingsChangePassword_vue_vue_type_template_id_4b966315___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSettingsChangePassword_vue_vue_type_template_id_4b966315___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsChangePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsChangePassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsChangePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=template&id=4b966315&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=template&id=4b966315& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsChangePassword_vue_vue_type_template_id_4b966315___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsChangePassword.vue?vue&type=template&id=4b966315& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsChangePassword.vue?vue&type=template&id=4b966315&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsChangePassword_vue_vue_type_template_id_4b966315___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsChangePassword_vue_vue_type_template_id_4b966315___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue":
/*!******************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettingsGeneral_vue_vue_type_template_id_4694ac2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettingsGeneral.vue?vue&type=template&id=4694ac2e& */ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=template&id=4694ac2e&");
/* harmony import */ var _UserSettingsGeneral_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSettingsGeneral.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSettingsGeneral_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSettingsGeneral_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSettingsGeneral_vue_vue_type_template_id_4694ac2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSettingsGeneral_vue_vue_type_template_id_4694ac2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsGeneral.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=template&id=4694ac2e&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=template&id=4694ac2e& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_template_id_4694ac2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsGeneral.vue?vue&type=template&id=4694ac2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsGeneral.vue?vue&type=template&id=4694ac2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_template_id_4694ac2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsGeneral_vue_vue_type_template_id_4694ac2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettingsTree_vue_vue_type_template_id_2e131d70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettingsTree.vue?vue&type=template&id=2e131d70& */ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=template&id=2e131d70&");
/* harmony import */ var _UserSettingsTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSettingsTree.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSettingsTree_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSettingsTree.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSettingsTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSettingsTree_vue_vue_type_template_id_2e131d70___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSettingsTree_vue_vue_type_template_id_2e131d70___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserSettingsTree.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsTree.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsTree.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=template&id=2e131d70&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=template&id=2e131d70& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_template_id_2e131d70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettingsTree.vue?vue&type=template&id=2e131d70& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSettingsTree.vue?vue&type=template&id=2e131d70&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_template_id_2e131d70___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettingsTree_vue_vue_type_template_id_2e131d70___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSkills.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSkills.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSkills_vue_vue_type_template_id_54a6742e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSkills.vue?vue&type=template&id=54a6742e& */ "./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=template&id=54a6742e&");
/* harmony import */ var _UserSkills_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSkills.vue?vue&type=script&lang=js& */ "./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserSkills_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSkills_vue_vue_type_template_id_54a6742e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSkills_vue_vue_type_template_id_54a6742e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/app/user/user-profile/UserSkills.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSkills_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSkills.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSkills_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=template&id=54a6742e&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=template&id=54a6742e& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSkills_vue_vue_type_template_id_54a6742e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSkills.vue?vue&type=template&id=54a6742e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/app/user/user-profile/UserSkills.vue?vue&type=template&id=54a6742e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSkills_vue_vue_type_template_id_54a6742e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSkills_vue_vue_type_template_id_54a6742e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);