/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/home.vue'),
                    meta: {guestOnly: true}
                },
            ]
        },
        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================

                {
                    path: '/dashboard', name: 'dashboard', component: () => import('./views/Dashboard.vue'),
                    meta: {authOnly: true, breadcrumb: [{title: 'Dashboard', active: true}], pageTitle: 'Dashboard',}
                },
                //Module, Menu, Role --------------------------------------------------
                {
                    path: '/module-manager', name: 'modules', component: () => import('./views/app/ModuleManager.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Module Manager',
                    }
                },
                {
                    path: '/menu-manager', name: 'menu', component: () => import('./views/app/MenuManager.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Menu Manager',
                    }
                },
                {
                    path: '/role-manager', name: 'role', component: () => import('./views/app/RoleManager.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Role Manager',
                    }
                },
                //Company --------------------------------------------------------------
                {
                    path: '/company-list',
                    name: 'CompanyList',
                    component: () => import('./views/app/company/CompanyList.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Company List',
                    }
                },
                {
                    path: '/company-create',
                    name: 'CompanyCreate',
                    component: () => import('./views/app/company/CompanyCreate.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Company Create',
                    }
                },
                {
                    path: '/company-edit/:id',
                    name: 'CompanyEdit',
                    component: () => import('./views/app/company/CompanyEdit.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Company Edit',
                    }
                },
                {
                    path: '/company-view/:id',
                    name: 'CompanyView',
                    component: () => import('./views/app/company/CompanyView.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Company View',
                    }
                },
                //Package ---------------------------------------------------------------
                {
                    path: '/package-manager/',
                    name: 'PackageManager',
                    component: () => import('./views/app/package/PackageManager.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Product Manager',
                    }
                },
                //User ------------------------------------------------------------------
                {
                    path: '/user-list',
                    name: 'UserList',
                    component: () => import('./views/app/user/user-list/UserList.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'User List',
                    }
                },

                {
                    path: '/user-create',
                    name: 'UserCreate',
                    component: () => import('./views/app/user/UserCreate.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'User Create',
                    }
                },
                {
                    path: '/user-edit/:id',
                    name: 'UserEdit',
                    component: () => import('./views/app/user/user-edit/UserEdit.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'User Edit',
                    }
                },
                {
                    path: '/profile/:id',
                    name: 'UserProfile',
                    component: () => import('./views/app/user/user-profile/UserSettings.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'User Profile',
                    }
                },
                {
                    path: '/my-profile/:id',
                    name: 'MyProfile',
                    component: () => import('./views/app/user/user-profile/UserSettings.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'User Profile',
                    }
                },


                //WorkFlow -------------------------------------------------------------
                {
                    path: '/workflow/work-group',
                    name: 'WorkGroup',
                    component: () => import('./views/app/workflow/WorkGroup.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Work Group',
                    }
                },
                {
                    path: '/workflow/process-defs',
                    name: 'WorkflowProcess',
                    component: () => import('./views/app/workflow/WorkflowProcessDefs.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Workflow Process Definition',
                    }
                },
                //HR Policy --------------------------
                {
                    path: '/hr-policy',
                    name: 'HRPolicy',
                    component: () => import('./views/app/hr/HRPolicy.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'HR Policy',
                    }
                },
                //COC --------------------------
                {
                    path: '/coc-maintain',
                    name: 'COCMaintain',
                    component: () => import('./views/app/coc/COCMaintain.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'COC',
                    }
                },
                //Over Time OT setting --------------------------
                {
                    path: '/ot-setting',
                    name: 'OTSetting',
                    component: () => import('./views/app/ot-setting/OTSetting.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'OT Setting',
                    }
                },

                //Master Data -----------------------------------------------------------
                {
                    path: '/organization-manager',
                    name: 'OrganizationManager',
                    component: () => import('./views/app/masterdata/OrganizationManager.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Organization Manager',
                    }
                },
                {
                    path: '/organization-tree',
                    name: 'OrganizationTree',
                    component: () => import('./views/app/masterdata/OrganizationTree/OrganizationTree.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Organization Tree',
                    }
                },
                {
                    path: '/asset-package',
                    name: 'AssetPackage',
                    component: () => import('./views/app/masterdata/AssetPackage.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Asset Package',
                    }
                },
                {
                    path: '/job-description',
                    name: 'JobDescription',
                    component: () => import('./views/app/masterdata/JobDescription.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Job Description',
                    }
                },
                {
                    path: '/leave-package',
                    name: 'LeavePackage',
                    component: () => import('./views/app/masterdata/LeavePackage.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Leave Package',
                    }
                },
                {
                    path: '/loi-organization',
                    name: 'LOIOrganization',
                    component: () => import('./views/app/masterdata/LOIOrganization.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'LOI Organization',
                    }
                },
                {
                    path: '/email-template',
                    name: 'EmailTemplate',
                    component: () => import('./views/app/masterdata/EmailTemplate.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Email Template',
                    }
                },
                {
                    path: '/payroll-package',
                    name: 'PayrollPackage',
                    component: () => import('./views/app/masterdata/PayrollPackage.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Payroll Package',
                    }
                },
                //Store
                {
                    path: '/category-manager', name: 'Category', component: () => import('./views/app/Category.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Category Manager',
                    }
                },
                {
                    path: '/dropdown-manager',
                    name: 'DropdownManage',
                    component: () => import('./views/app/dropdown/DropdownManage.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Dropdown Manager',
                    }
                },
                //Service -----------------------------------------------------------
                {
                    path: '/leave-report',
                    name: 'leaveReport',
                    component: () => import('./views/service/report/LeaveReport.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Leave Report',
                    }
                },
                {
                    path: '/overtime-report',
                    name: 'overtimeReport',
                    component: () => import('./views/service/report/OvertimeReport'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Overtime Report',
                    }
                },
                {
                    path: '/business-card-report',
                    name: 'businessCardReport',
                    component: () => import('./views/service/report/BusinessCardReport'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Business Card Report',
                    }
                },
                {
                    path: '/id-card-report',
                    name: 'idCardReport',
                    component: () => import('./views/service/report/IdCardReport'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'ID Card Report',
                    }
                },
                {
                    path: '/loi-report',
                    name: 'loiReport',
                    component: () => import('./views/service/report/LoiReport'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Loi Report',
                    }
                },
                {
                    path: '/resignation-report',
                    name: 'resignationReport',
                    component: () => import('./views/service/report/ResignationReport'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Resignation Report',
                    }
                },
                {
                    path: '/transport-report',
                    name: 'transportReport',
                    component: () => import('./views/service/report/TransportReport'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Transport Report',
                    }
                },
                {
                    path: '/stationary-report',
                    name: 'stationaryReport',
                    component: () => import('./views/service/report/StationaryReport'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Stationary Report',
                    }
                },
                {
                    path: '/service/id-card-request',
                    name: 'IdCard',
                    component: () => import('./views/service/id-card/IdCard.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'ID Card Requisition',
                    }
                },

                {
                    path: '/service/business-card',
                    name: 'BusinessCard',
                    component: () => import('./views/service/business-card/BusinessCard.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Business Card',
                    }
                },
                {
                    path: '/service/leave-application',
                    name: 'LeaveApplication',
                    component: () => import('./views/service/leave-application/LeaveApplication.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Leave Application',
                    }
                },
                {
                    path: '/service/loi', name: 'LoI', component: () => import('./views/service/loi-service/Loi.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'LOI',
                    }
                },
                {
                    path: '/service/stationary-requisition',
                    name: 'StationaryRequisition',
                    component: () => import('./views/service/stationry-requisition/Stationary.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Stationary Requisition',
                    }
                },
                {
                    path: '/service/overtime-apply',
                    name: 'OvertimeApply',
                    component: () => import('./views/service/overtime-apply/OverTime'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Overtime Apply',
                    }
                },
                {
                    path: '/service/transport-requisition',
                    name: 'TransportRequisition',
                    component: () => import('./views/service/transport-requisition/TransportRequisition'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Transport Requisition',
                    }
                },
                {
                    path: '/service/employee-resignation-process',
                    name: 'EmployeeResignationProcess',
                    component: () => import('./views/service/employee-resignation/EmployeeResignation'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Employee Resignation Process',
                    }
                },
                //Management -----------------------------------------------------------
                {
                    path: '/manage-notice-board',
                    name: 'ManageNoticeBoard',
                    component: () => import('./views/app/NoticeBoard.vue'),
                    meta: {
                        authOnly: true,
                        breadcrumb: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Dashboard', active: true}],
                        pageTitle: 'Manage Notice Board',
                    }
                },
            ],
        },
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: '/login',
                    name: 'page-login',
                    component: () => import('@/views/auth/Login.vue'),
                    meta: {guestOnly: true}
                },
                {
                    path: '/reset-password/:token',
                    name: 'page-reset-password',
                    component: () => import('@/views/auth/ResetPassword.vue')
                },
                {
                    path: '/forgot-password',
                    name: 'page-forgot-password',
                    component: () => import('@/views/auth/ForgotPassword.vue')
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue')
                },
                {
                    path: '/pages/error-403',
                    name: 'page-error-403',
                    component: () => import('@/views/pages/Error403.vue')
                },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: {redirect: to.fullPath}
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                path: "/dashboard",
                query: {redirect: to.fullPath}
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

function isLoggedIn() {
    return JSON.parse(localStorage.getItem("auth"));
}

export default router
