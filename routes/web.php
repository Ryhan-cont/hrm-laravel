<?php

use App\Http\Controllers\app\COCMaintainController;
use App\Http\Controllers\app\DashboardController;
use App\Http\Controllers\app\DropdownServiceController;
use App\Http\Controllers\app\ExcelController;
use App\Http\Controllers\app\NoticeBoardController;
use App\Http\Controllers\app\hr\HRController;
use App\Http\Controllers\app\user\ProfileController;
use App\Http\Controllers\app\user\ProfileCreateController;
use App\Http\Controllers\app\user\ProfileDeleteController;
use App\Http\Controllers\app\user\ProfileUpdateController;
use App\Http\Controllers\auth\PasswordResetController;
use App\Http\Controllers\report\ReportController;
use App\Http\Controllers\service\BusinessCardController;
use App\Http\Controllers\service\IdCardReqController;
use App\Http\Controllers\service\LeaveApplicationController;
use App\Http\Controllers\service\LoiServiceController;
use App\Http\Controllers\service\OverTimeController;
use App\Http\Controllers\service\ResignationApplicationController;
use App\Http\Controllers\service\TransportRequisitionController;
use App\Http\Controllers\setup\SetupBackupController;
use App\Http\Controllers\setup\SetupController;
use App\Http\Controllers\workflow\WfActionLogController;
use App\Models\LeaveApplication;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DummyDataController;
use App\Http\Controllers\app\LayoutController;
use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\LogoutController;

use App\Http\Controllers\app\ModuleController;
use App\Http\Controllers\app\RoleController;
use App\Http\Controllers\app\MenuController;

use App\Http\Controllers\app\PrefixController;
use App\Http\Controllers\app\DropdownController;
use App\Http\Controllers\app\CategoryController;

use App\Http\Controllers\app\user\UserCreateController;
use App\Http\Controllers\app\user\UserListController;
use App\Http\Controllers\app\user\UserEditController;

use App\Http\Controllers\app\company\CompanyController;
use App\Http\Controllers\app\company\CompanyCreateController;
use App\Http\Controllers\app\company\CompanyEditController;

use App\Http\Controllers\app\package\PackageController;

use App\Http\Controllers\app\masterdata\AssetPackageController;
use App\Http\Controllers\app\masterdata\EmailTemplateController;
use App\Http\Controllers\app\masterdata\JobDescriptionController;
use App\Http\Controllers\app\masterdata\LeavePackageController;
use App\Http\Controllers\app\masterdata\LOIOrganizationController;
use App\Http\Controllers\app\masterdata\OrganizationController;
use App\Http\Controllers\app\masterdata\OrganizationTreeController;
use App\Http\Controllers\app\masterdata\PayrollPackageController;

use App\Http\Controllers\workflow\WorkGroupController;
use App\Http\Controllers\workflow\WfProcessController;
use App\Http\Controllers\workflow\WfProcessDefController;

use App\Http\Controllers\service\StationaryRequisitionController;
use Laravel\Telescope\Http\Controllers\MailController;
use Spatie\Activitylog\Models\Activity;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('site/mail-data', [MailController::class, 'index']);

Route::get('site/setup', [SetupController::class, 'index']);
Route::get('site/setup-backup', [SetupBackupController::class, 'index']);

Route::post('user/login', [LoginController::class, 'authenticate']);
Route::post('user/logout', [LogoutController::class, 'logout']);
Route::post('user/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('user/reset-password', [PasswordResetController::class, 'passwordReset']);

Route::prefix('api/data')->group(function () {
    Route::get('layout', [LayoutController::class, 'menu']);
});

Route::prefix('api/module')->group(function () {
    Route::get('data', [ModuleController::class, 'data']);
    Route::post('create', [ModuleController::class, 'create']);
    Route::post('update', [ModuleController::class, 'update']);
    Route::post('delete', [ModuleController::class, 'delete']);
});
Route::prefix('api/role')->group(function () {
    Route::get('data', [RoleController::class, 'data']);
    Route::post('create', [RoleController::class, 'create']);
    Route::post('update', [RoleController::class, 'update']);
    Route::post('delete', [RoleController::class, 'delete']);
});
Route::prefix('api/menu')->group(function () {
    Route::get('data/all', [MenuController::class, 'data']);
    Route::post('data', [MenuController::class, 'menuData']);
    Route::post('create', [MenuController::class, 'create']);
    Route::post('update', [MenuController::class, 'update']);
    Route::post('delete', [MenuController::class, 'delete']);
});
Route::prefix('api/company-list')->group(function () {
    Route::get('data', [CompanyController::class, 'data']);
    Route::post('delete', [CompanyController::class, 'delete']);
});
Route::prefix('api/company-create')->group(function () {
    Route::get('data', [CompanyCreateController::class, 'data']);
    Route::post('data/package/module', [CompanyCreateController::class, 'package']);
    Route::post('data/proceed', [CompanyCreateController::class, 'create']);
});
Route::prefix('api/company-edit')->group(function () {
    Route::post('data', [CompanyEditController::class, 'data']);
    Route::post('data/package/module', [CompanyCreateController::class, 'package']);
    Route::post('data/proceed', [CompanyEditController::class, 'update']);
});
Route::prefix('api/company-view')->group(function () {
    Route::get('data/{id}', [CompanyController::class, 'companyInfo']);
    Route::put('data/update', [CompanyController::class, 'changeCompanyActive']);
});
Route::prefix('api/package')->group(function () {
    Route::get('data', [PackageController::class, 'data']);
    Route::post('create', [PackageController::class, 'create']);
    Route::post('update', [PackageController::class, 'update']);
    Route::post('delete', [PackageController::class, 'delete']);
});

Route::get('/linkstorage', function () {
    $folderPath = public_path('storage');
    if (file_exists($folderPath)) {
        rmdir($folderPath);
    }
    Artisan::call('storage:link');
});
Route::prefix('api/user-create')->group(function () {
    Route::get('data', [UserCreateController::class, 'data']);
    Route::post('data/role', [UserCreateController::class, 'roleData']);
    Route::post('data/proceed', [UserCreateController::class, 'create']);
});
Route::prefix('api/user-list')->group(function () {
    Route::get('data', [UserListController::class, 'data']);
    Route::put('data/update', [UserListController::class, 'changeUserActive']);
    Route::get('data/list', [UserListController::class, 'userList']);
    //Route::post('delete/user', [UserListController::class, 'deleteUser']);
});
Route::prefix('api/user-edit')->group(function () {
    Route::post('data', [UserEditController::class, 'data']);
    Route::post('data/role', [UserEditController::class, 'roleData']);
    Route::post('data/login-info-update', [UserEditController::class, 'loginInfoUpdate']);
    Route::post('data/general-info-update', [UserEditController::class, 'generalInfoUpdate']);
    Route::post('data/feature-update', [UserEditController::class, 'featureUpdate']);
    Route::post('data/organization-tree-update', [UserEditController::class, 'organizationTreeUpdate']);
    Route::post('data/education-history-update', [UserEditController::class, 'educationHistoryUpdate']);
    Route::post('data/education-history-delete', [UserEditController::class, 'educationHistoryDelete']);
    Route::post('data/job-history-update', [UserEditController::class, 'jobHistoryUpdate']);
    Route::post('data/job-history-delete', [UserEditController::class, 'jobHistoryDelete']);
    Route::post('data/nominee-update', [UserEditController::class, 'nomineeUpdate']);
    Route::post('data/nominee-delete', [UserEditController::class, 'nomineeDelete']);
    Route::post('data/skill-update', [UserEditController::class, 'skillUpdate']);
    Route::post('data/skill-delete', [UserEditController::class, 'skillDelete']);

    Route::post('data/employee-document-update', [UserEditController::class, 'DocumentUpdate']);
    Route::post('data/employee-document-delete', [UserEditController::class, 'DocumentDelete']);
    //create
    /*Route::post('data/education-history-create', [UserEditController::class, 'educationHistoryCreate']);
    Route::post('data/job-history-create', [UserEditController::class, 'jobHistoryCreate']);
    Route::post('data/nominee-create', [UserEditController::class, 'nomineeCreate']);
    Route::post('data/skill-create', [UserEditController::class, 'skillCreate']);
    Route::post('data/employee-document-create', [UserEditController::class, 'DocumentCreate']);*/
});

//User Profile
Route::prefix('api/profile')->group(function () {
    Route::get('role', [ProfileController::class, 'role']);
    Route::post('data/roledata', [ProfileController::class, 'roleData']);
    Route::get('basic-info/{id}', [ProfileController::class, 'basicInfo']);
    Route::get('organization-info/{id}', [ProfileController::class, 'orgInfo']);
    Route::put('change-password', [ProfileController::class, 'changePassword']);
    Route::get('general-info/{id}', [ProfileController::class, 'generalInfo']);
    Route::get('edu-info/{id}', [ProfileController::class, 'eduInfo']);
    Route::get('job-history/{id}', [ProfileController::class, 'jobHistory']);
    Route::get('nominee-info/{id}', [ProfileController::class, 'nomineeInfo']);
    Route::get('skill-matrix/{id}', [ProfileController::class, 'skillMatrix']);
    Route::get('employee-docs/{id}', [ProfileController::class, 'employeeDocs']);

    Route::get('package', [ProfileController::class, 'PackageData']);
    Route::get('education-data', [ProfileController::class, 'EducationData']);
    Route::get('general-dropdown-data', [ProfileController::class, 'GenDropdown']);
    Route::get('get-country-data', [ProfileController::class, 'CountryData']);
    Route::get('get-province-data/{id}', [ProfileController::class, 'ProvinceData']);
    Route::get('get-city-data/{id}', [ProfileController::class, 'CityData']);

    Route::post('job-history-create', [ProfileCreateController::class, 'JobHistoryCreate']);
    Route::post('skill-create', [ProfileCreateController::class, 'SkillCreate']);
    Route::post('nominee-create', [ProfileCreateController::class, 'NomineeCreate']);
    Route::post('education-history-add', [ProfileCreateController::class, 'AddEducation']);
    Route::post('employee-document-create', [ProfileCreateController::class, 'EmployeeDocumentCreate']);

    Route::post('job-history-update', [ProfileUpdateController::class, 'JobHistoryUpdate']);
    Route::post('nominee-update', [ProfileUpdateController::class, 'NomineeUpdate']);
    Route::post('basic-info-update', [ProfileUpdateController::class, 'basicInfoUpdate']);
    Route::post('general-info-update', [ProfileUpdateController::class, 'generalInfoUpdate']);
    Route::post('address-update', [ProfileUpdateController::class, 'addressUpdate']);
    Route::post('package-update', [ProfileUpdateController::class, 'packageUpdate']);
    Route::post('education-history-edit', [ProfileUpdateController::class, 'EditEducation']);
    Route::post('skill-update', [ProfileUpdateController::class, 'SkillUpdate']);
    Route::post('employee-document-update', [ProfileUpdateController::class, 'EmployeeDocumentUpdate']);
    Route::post('profile-tree-update', [ProfileUpdateController::class, 'TreeUpdate']);

    Route::get('edu-delete/{id}', [ProfileDeleteController::class, 'eduDelete']);
    Route::get('job-history-delete/{id}', [ProfileDeleteController::class, 'JobHistoryDelete']);
    Route::get('nominee-delete/{id}', [ProfileDeleteController::class, 'NomineeDelete']);
    Route::get('skill-delete/{id}', [ProfileDeleteController::class, 'SkillDelete']);
    Route::get('employee-document-delete/{id}', [ProfileDeleteController::class, 'EmployeeDocumentDelete']);


});

//Dropdown Data
Route::prefix('api/data')->group(function () {
    Route::get('general-info-dropdown', [DropdownServiceController::class, 'GeneralDropdown']);
    Route::get('features-dropdown', [DropdownServiceController::class, 'featureDropdown']);
    Route::get('education-history-dropdown', [DropdownServiceController::class, 'educationHistoryDropdown']);
    Route::get('job-history-dropdown', [DropdownServiceController::class, 'jobHistoryDropdown']);
    Route::get('nominee-dropdown', [DropdownServiceController::class, 'nomineeDropdown']);
    Route::get('skill-dropdown', [DropdownServiceController::class, 'skillDropdown']);
    Route::get('dropdown-items/{id}', [DropdownServiceController::class, 'dropDownItems']);
});

// Dashboard
Route::prefix('api/dashboard')->group(function () {
    Route::get('pending/{other}', [DashboardController::class, 'pending']);
});

//Category Manager
Route::prefix('api/category-manager')->group(function () {
    Route::get('data', [CategoryController::class, 'data']);
    Route::post('create', [CategoryController::class, 'create']);
    Route::post('update', [CategoryController::class, 'update']);
    Route::post('delete', [CategoryController::class, 'delete']);
});

//MaterData
Route::prefix('api/asset-package')->group(function () {
    Route::get('data', [AssetPackageController::class, 'data']);
    Route::post('data/delete-lookup', [AssetPackageController::class, 'deleteLookup']);
    Route::post('data/create', [AssetPackageController::class, 'create']);
    Route::post('data/update', [AssetPackageController::class, 'update']);
    Route::post('data/delete', [AssetPackageController::class, 'delete']);
});
Route::prefix('api/email-template')->group(function () {
    Route::get('data', [EmailTemplateController::class, 'data']);
    Route::post('data/delete-lookup', [EmailTemplateController::class, 'deleteLookup']);
    Route::post('data/create', [EmailTemplateController::class, 'create']);
    Route::post('data/update', [EmailTemplateController::class, 'update']);
    Route::post('data/delete', [EmailTemplateController::class, 'delete']);
});
Route::prefix('api/job-description')->group(function () {
    Route::get('data', [JobDescriptionController::class, 'data']);
    Route::post('data/delete-lookup', [JobDescriptionController::class, 'deleteLookup']);
    Route::post('data/create', [JobDescriptionController::class, 'create']);
    Route::post('data/update', [JobDescriptionController::class, 'update']);
    Route::post('data/delete', [JobDescriptionController::class, 'delete']);
});
Route::prefix('api/leave-package')->group(function () {
    Route::get('data', [LeavePackageController::class, 'data']);
    Route::post('data/delete-lookup', [LeavePackageController::class, 'deleteLookup']);
    Route::post('data/create', [LeavePackageController::class, 'create']);
    Route::post('data/update', [LeavePackageController::class, 'update']);
    Route::post('data/delete', [LeavePackageController::class, 'delete']);
});
Route::prefix('api/loi-organization')->group(function () {
    Route::get('data', [LOIOrganizationController::class, 'data']);
    Route::post('data/delete-lookup', [LOIOrganizationController::class, 'deleteLookup']);
    Route::post('data/create', [LOIOrganizationController::class, 'create']);
    Route::post('data/update', [LOIOrganizationController::class, 'update']);
    Route::post('data/delete', [LOIOrganizationController::class, 'delete']);
});
Route::prefix('api/organization-manager')->group(function () {
    Route::get('data', [OrganizationController::class, 'data']);
    Route::post('data/delete-lookup', [OrganizationController::class, 'deleteLookup']);
    Route::post('data/create', [OrganizationController::class, 'create']);
    Route::post('data/update', [OrganizationController::class, 'update']);
    Route::post('data/update-check', [OrganizationController::class, 'organizationCheck']);
    Route::delete('data/delete', [OrganizationController::class, 'delete']);
});
Route::prefix('api/organization-tree')->group(function () {
    Route::get('data', [OrganizationTreeController::class, 'data']);
    Route::post('data/update', [OrganizationTreeController::class, 'update']);
});
Route::prefix('api/payroll-package')->group(function () {
    Route::get('data', [PayrollPackageController::class, 'data']);
    Route::post('data/delete-lookup', [PayrollPackageController::class, 'deleteLookup']);
    Route::post('data/create', [PayrollPackageController::class, 'create']);
    Route::post('data/update', [PayrollPackageController::class, 'update']);
    Route::post('data/delete', [PayrollPackageController::class, 'delete']);
});
Route::prefix('api/prefix')->group(function () {
    Route::post('/data/create', [PrefixController::class, 'create']);
    Route::post('/data/update', [PrefixController::class, 'update']);
    Route::post('/data/delete', [PrefixController::class, 'delete']);
});

Route::prefix('api/dropdown')->group(function () {
    Route::get('data', [DropdownController::class, 'data']);
    Route::post('create', [DropdownController::class, 'create']);
    Route::post('update', [DropdownController::class, 'update']);
    Route::post('delete', [DropdownController::class, 'delete']);

    Route::post('data/items', [DropdownController::class, 'items']);
    Route::post('data/item-create', [DropdownController::class, 'createItem']);
    Route::post('data/item-delete', [DropdownController::class, 'deleteItem']);
    Route::post('data/item-update', [DropdownController::class, 'updateItem']);

    Route::post('data/categories', [DropdownController::class, 'categories']);
    Route::post('data/category-create', [DropdownController::class, 'createCategory']);
    Route::post('data/category-update', [DropdownController::class, 'updateCategory']);
    Route::post('data/category-delete', [DropdownController::class, 'deleteCategory']);

    Route::post('data/category-list', [DropdownController::class, 'categoryList']);

});

//Workflow action log

Route::prefix('api/work-flow')->group(function () {
    Route::get('timeline/{id}', [WfActionLogController::class, 'activityTimeline']);
    Route::get('data/{id}', [WfActionLogController::class, 'checkEditable']);
    Route::post('create-action', [WfActionLogController::class, 'store']);
});

//Employee Self Service
Route::prefix('api/stationary-requisition')->group(function () {
    Route::get('/data', [StationaryRequisitionController::class, 'data']);
    Route::get('/show/{id}', [StationaryRequisitionController::class, 'show']);
    Route::post('create', [StationaryRequisitionController::class, 'store']);
    Route::put('update/{id}', [StationaryRequisitionController::class, 'update']);
    Route::post('/data/sub-category', [StationaryRequisitionController::class, 'subCategory']);
    Route::post('/data/items', [StationaryRequisitionController::class, 'items']);
    Route::post('category-list', [DropdownController::class, 'categoryList']);
});

Route::prefix('api/id-card-request')->group(function () {
    Route::post('create', [IdCardReqController::class, 'store']);
    Route::put('update/{id}', [IdCardReqController::class, 'update']);
    Route::get('data/{id}', [IdCardReqController::class, 'show']);
});

Route::prefix('api/leave-application')->group(function () {
    Route::post('create', [LeaveApplicationController::class, 'store']);
    Route::put('update/{id}', [LeaveApplicationController::class, 'update']);
    Route::get('data/{id}', [LeaveApplicationController::class, 'show']);
    Route::get('leave-package-data', [LeaveApplicationController::class, 'LeavePackage']);
    Route::get('leave-days-check/{id}', [LeaveApplicationController::class, 'LeaveCheck']);
});

Route::prefix('api/business-card-request')->group(function () {
    Route::post('create', [BusinessCardController::class, 'store']);
    Route::put('update/{id}', [BusinessCardController::class, 'update']);
    Route::get('data/{id}', [BusinessCardController::class, 'show']);

});
Route::prefix('api/employee-resignation-process')->group(function () {
    Route::post('create', [ResignationApplicationController::class, 'store']);
    Route::put('update/{id}', [ResignationApplicationController::class, 'update']);
    Route::get('data/{id}', [ResignationApplicationController::class, 'show']);

});
Route::prefix('api/transport-requisition')->group(function () {
    Route::get('show/{id}', [TransportRequisitionController::class, 'show']);
    Route::post('create', [TransportRequisitionController::class, 'store']);
    Route::put('update/{id}', [TransportRequisitionController::class, 'update']);
    Route::get('data/{id}', [TransportRequisitionController::class, 'data']);

});
Route::prefix('api/loi-service')->group(function () {
    Route::post('create', [LoiServiceController::class, 'store']);
    Route::put('update/{id}', [LoiServiceController::class, 'update']);
    Route::get('data/{id}', [LoiServiceController::class, 'show']);
    Route::get('get-org-name/{id}', [LoiServiceController::class, 'orgName']);
    Route::get('get-org-address/{id}', [LoiServiceController::class, 'orgAddress']);

});
Route::prefix('api/overtime-apply')->group(function () {
    Route::post('create', [OverTimeController::class, 'store']);
    Route::put('update/{id}', [OverTimeController::class, 'update']);
    Route::get('data/{id}', [OverTimeController::class, 'show']);
    Route::get('overtime-check/{id}', [OverTimeController::class, 'DayCheck']);
    Route::get('get-org-name/{id}', [OverTimeController::class, 'orgName']);
    Route::get('get-org-address/{id}', [OverTimeController::class, 'orgAddress']);

});
Route::prefix('api/ot-setting')->group(function () {
    Route::post('ot-setting', [OverTimeController::class, 'otStore']);
    Route::get('data', [OverTimeController::class, 'otData']);
});

//HR-Policy
Route::prefix('api/hr-policy')->group(function () {
    Route::get('data', [HRController::class, 'index']);
    Route::get('delete/{id}', [HRController::class, 'destroy']);
    Route::post('create', [HRController::class, 'store']);
    Route::post('update', [HRController::class, 'update']);
});

//COC
Route::prefix('api/coc-maintain')->group(function () {
    Route::get('data', [COCMaintainController::class, 'index']);
    Route::get('delete/{id}', [COCMaintainController::class, 'destroy']);
    Route::post('create', [COCMaintainController::class, 'store']);
    Route::post('update', [COCMaintainController::class, 'update']);
});

Route::prefix('api/notice-board')->group(function () {
    Route::get('data', [NoticeBoardController::class, 'index']);
    Route::get('data/work-group', [WorkGroupController::class, 'index']);
    Route::post('create', [NoticeBoardController::class, 'store']);
    Route::put('update/{id}', [NoticeBoardController::class, 'update']);
    Route::put('delete/{id}', [NoticeBoardController::class, 'destroy']);

    Route::get('data/send-notice', [NoticeBoardController::class, 'sendNotice']);
});
//report
Route::prefix('api/report')->group(function () {
    Route::get('leave-report', [ReportController::class, 'leaveReport']);
    Route::get('overtime-report', [ReportController::class, 'OTReport']);
    Route::get('business-card-report', [ReportController::class, 'BusinessCardReport']);
    Route::get('idcard-report', [ReportController::class, 'IDCardReport']);
    Route::get('loi-report', [ReportController::class, 'LoiReport']);
    Route::get('resignation-report', [ReportController::class, 'ResignationReport']);
    Route::get('transport-report', [ReportController::class, 'TransportReport']);
    Route::get('stationary-report', [ReportController::class, 'StationaryReport']);
});


//Workflow
Route::prefix('api/work-group')->group(function () {
    Route::get('list', [WorkGroupController::class, 'index']);
    Route::post('create/group', [WorkGroupController::class, 'workGroupStore']);
    Route::put('update/group/{id}', [WorkGroupController::class, 'workGroupUpdate']);
    Route::delete('delete/group/{id}', [WorkGroupController::class, 'workGroupDestroy']);

    Route::get('list/users', [WorkGroupController::class, 'userList']);
    Route::get('items/{id}', [WorkGroupController::class, 'workGroupItemsShow']);
    Route::post('create/item', [WorkGroupController::class, 'workGroupItemStore']);
    Route::put('update/item/{id}', [WorkGroupController::class, 'workGroupItemUpdate']);
    Route::delete('delete/item/{id}', [WorkGroupController::class, 'workGroupItemDestroy']);
});
Route::prefix('api/wf-process-defs')->group(function () {
    Route::get('list', [WfProcessDefController::class, 'index']);
    Route::get('list/work-group', [WorkGroupController::class, 'index']);

    Route::get('items/{id}', [WfProcessDefController::class, 'workflowGroupItemsShow']);
    Route::post('create/item', [WfProcessDefController::class, 'workflowItemStore']);
    Route::put('update/item/{id}', [WfProcessDefController::class, 'workflowItemUpdate']);
    Route::delete('delete/item/{id}', [WfProcessDefController::class, 'workflowItemDestroy']);
});
Route::get('/activity-log', function () {
    return Activity::all();
});


Route::get('export-user', [ExcelController::class, 'exportUser'])->name('exportUser');
Route::get('export-business-card', [ExcelController::class, 'exportBusinessCard'])->name('exportBusinessCard');
Route::get('export-id-card', [ExcelController::class, 'exportIDCard'])->name('exportIDCard');
Route::get('export-loi', [ExcelController::class, 'exportLoi'])->name('exportLoi');
Route::get('export-leave', [ExcelController::class, 'exportLeave'])->name('exportLeave');
Route::get('export-overtime', [ExcelController::class, 'exportOvertime'])->name('exportOvertime');
Route::get('export-resignation', [ExcelController::class, 'exportResignation'])->name('exportResignation');
Route::get('export-stationary', [ExcelController::class, 'exportStationary'])->name('exportStationary');
Route::get('export-transport', [ExcelController::class, 'exportTransport'])->name('exportTransport');
Route::get('importExportView', 'MyController@importExportView');
Route::post('import', 'MyController@import')->name('import');

Route::get('/{any}', [ApplicationController::class, '__invoke'])->where('any', '.*');
Route::get('reset-password/{token}')->name('password.reset');

