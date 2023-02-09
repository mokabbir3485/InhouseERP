var app = angular.module('AngularDemoApp', ['ngRoute', 'ngCookies', 'angular.filter', 'cfp.hotkeys', 'ngSanitize', 'ui.select', 'angularUtils.directives.dirPagination', 'ui.bootstrap', 'components', 'angularjs-dropdown-multiselect']);


//Check page parmission from cookies which is defined by 'IndexController'
app.config(function ($routeProvider, $controllerProvider) {
    $routeProvider
        .when('/Attendee', {
            templateUrl: '/SPA/Attendee/Attendee.html',
            controller: 'AttendeeController'
        })
        .when('/SystemControl', {
            title: "System Control",
            templateUrl: '/SPA/SECURITY/SystemControl/SystemControl.html',
            controller: 'SystemControlController',
            resolve: {
                "check": function () {
                    //var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); } //Check Logged In or not
                    //if (login != undefined) {
                    //    //var permission = sessionStorage.getItem("SystemControlPermission")
                    //    //if (permission != 'true') {
                    //    //    alertify.alert("You don't have parmission to access this page");
                    //    //    window.location = '/Home/Index#/Home';
                    //    //}
                    //}
                    //else {
                    //    window.location = '/Home/Login#/';
                    //}


                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) {
                        var login = JSON.parse(sessionStorage.UserDataSession);
                    }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) {
                        var Permission = JSON.parse(sessionStorage.PermissionDataSession);
                    }

                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'System Control');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/FiscalYearEntry', {
            title: "Fiscal Year",
            //templateUrl: '/SPA/ADMIN/FiscalYear/FiscalYearEntry.html?nd=' + Date.now(),
            templateUrl: '/SPA/ADMIN/FiscalYear/FiscalYearEntry.html',
            controller: 'FiscalYearEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) {var Permission = JSON.parse(sessionStorage.PermissionDataSession);}
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'FiscalYear');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {window.location = '/Home/Login#/';}
                }
            }
        })
        .when('/CompanyEntry', {
            title: 'Company Entry',
            templateUrl: '/SPA/ADMIN/CompanyEntry/CompanyEntry.html',
            controller: 'CompanyEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/PaymentGroup', {

            templateUrl: '/SPA/Admin/PaymentGroup/PaymentGroup.html',
            controller: 'PaymentGroupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Payment Group');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/PaymentSubType', {

            templateUrl: '/SPA/Admin/PaymentSubType/PaymentSubTypeEntry.html',
            controller: 'PaymentSubTypeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Payment Sub Type');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/BankEntry', {
            templateUrl: '/SPA/ADMIN/BankEntry/BankEntry.html',
            controller: 'BankEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Bank');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/BondEntry', {
            templateUrl: '/SPA/ADMIN/BondEntry/BondEntry.html',
            controller: 'BondEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Bond Entry');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/BillOfMaterial', {
            templateUrl: '/SPA/ADMIN/BillOfMaterial/BillOfMaterial.html',
            controller: 'BillOfMaterialController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Bill Of Material');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/Overhead', {
            templateUrl: '/SPA/ADMIN/OverheadEntry/OverheadEntry.html',
            controller: 'OverheadEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Overhead');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PurchaseOrder', {
            templateUrl: '/SPA/Procurement/PurchaseOrder/PurchaseOrderEntry.html',
            controller: 'PurchaseOrderEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Purchase Order');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/PurchaseOrderApprove', {
            templateUrl: '/SPA/Procurement/PurchaseOrderApprove/PurchaseOrderApprove.html',
            controller: 'PurchaseOrderApproveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Purchase Order Approve');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/SupplierEntry', {
            templateUrl: '/SPA/ADMIN/SupplierEntry/SupplierEntry.html',
            controller: 'SupplierEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/SupplierVat', {
            templateUrl: '/SPA/VAT/SupplierVat/SupplierVatEntry.html',
            controller: 'SupplierVatController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Vat');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CompanyVAT', {
            templateUrl: '/SPA/VAT/CompanyVAT/CompanyVAT.html',
            controller: 'CompanyVATController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company VAT');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/BranchEntry', {
            templateUrl: '/SPA/ADMIN/BranchEntry/BranchEntry.html',
            controller: 'BranchEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Branch');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/CancelProcess', {
            templateUrl: '/SPA/ADMIN/CancelProcess/CancelProcessEntry.html',
            controller: 'CancelProcessEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Cancel Process');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/ReportNotificationName', {
            templateUrl: '/SPA/EMAIL/ReportNotificationName/ReportNotificationName.html',
            controller: 'ReportNotificationNameController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Report Notification Name');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/EmailNotificationSetup', {
            templateUrl: '/SPA/EMAIL/EmailNotificationSetup/EmailNotificationSetup.html',
            controller: 'EmailNotificationSetupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Email Notification Setup');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/AppNotificationSetup', {
            templateUrl: '/SPA/EMAIL/AppNotificationSetup/AppNotificationSetup.html',
            controller: 'AppNotificationSetupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'App Notification Setup');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/EmailSendEntry', {
            templateUrl: '/SPA/EMAIL/EmailSendEntry/EmailSendEntry.html',
            controller: 'EmailSendEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Email Send');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/BranchTypeEntry', {
            templateUrl: '/SPA/BranchTypeEntry/BranchTypeEntry.html',
            controller: 'BranchTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Branch Type');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CategoryEntry', {
            templateUrl: '/SPA/ADMIN/CategoryEntry/CategoryEntry.html',
            controller: 'CategoryEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Category');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ChangePassword', {
            templateUrl: '/SPA/ChangePassword/ChangePassword.html',
            controller: 'ChangePasswordController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Change Password');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/Sync', {
            templateUrl: '/SPA/Sync//Sync.html',
            controller: 'SyncController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sync');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/PaymentType', {
            templateUrl: '/SPA/ADMIN/PaymentType/PaymentType.html',
            controller: 'PaymentTypeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Payment Type');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/DepartmentEntry', {
            templateUrl: '/SPA/ADMIN/DepartmentEntry/DepartmentEntry.html',
            controller: 'DepartmentEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Department');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/DepartmentTypeEntry', {
            templateUrl: '/SPA/ADMIN/DepartmentTypeEntry/DepartmentTypeEntry.html',
            controller: 'DepartmentTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Department Type');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/DesignationEntry', {
            templateUrl: '/SPA/ADMIN/DesignationEntry/DesignationEntry.html',
            controller: 'DesignationEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Designation');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/DeclarationTypeEntry', {
            templateUrl: '/SPA/ADMIN/DeclarationTypeEntry/DeclarationTypeEntry.html',
            controller: 'DeclarationTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Declaration Type Entry');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/Employee', {
            templateUrl: '/SPA/ADMIN/EmployeeEntry/EmployeeEntry.html',
            controller: 'EmployeeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Employee');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ItemStatus', {
            templateUrl: '/SPA/ADMIN/ItemStatus/ItemStatus.html',
            controller: 'ItemStatusController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Item Status');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ItemEntry', {
            templateUrl: '/SPA/ADMIN/ItemEntry/ItemEntryTwo.html',
            controller: 'ItemEntryTwoController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Product');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/MaterialTypeEntry', {
            templateUrl: '/SPA/ADMIN/MaterialTypeEntry/MaterialTypeEntry.html',
            controller: 'MaterialTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'MaterialTypeEntry');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/ModuleEntry', {
            templateUrl: '/SPA/ModuleEntry/ModuleEntry.html',
            controller: 'ModuleEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Module');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PermissionEntry', {
            templateUrl: '/SPA/PermissionEntry/PermissionEntry.html',
            controller: 'PermissionEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Permission');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/RoleEntry', {
            templateUrl: '/SPA/RoleEntry/RoleEntry.html',
            controller: 'RoleEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Role');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ScreenEntry', {
            templateUrl: '/SPA/ScreenEntry/ScreenEntry.html',
            controller: 'ScreenEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Screen');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/FunctionEntry', {
            templateUrl: '/SPA/FunctionEntry/FunctionEntry.html',
            controller: 'FunctionEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Function');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SubcategoryEntry', {
            templateUrl: '/SPA/ADMIN/SubcategoryEntry/SubcategoryEntry.html',
            controller: 'SubcategoryEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Subcategory');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/LabelBrand', {
            templateUrl: '/SPA/ADMIN/LabelBrand/LabelBrand.html',
            controller: 'LabelBrandController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Label Brand');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/Unit', {
            templateUrl: '/SPA/ADMIN/Unit/Unit.html',
            controller: 'UnitController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Unit');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PriceType', {
            templateUrl: '/SPA/ADMIN/PriceTypeEntry/PriceTypeEntry.html',
            controller: 'PriceTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Price Type');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ChargeTypeEntry', {
            templateUrl: '/SPA/ADMIN/ChargeTypeEntry/ChargeTypeEntry.html',
            controller: 'ChargeTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Charge Type');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/Terminal', {
            templateUrl: '/SPA/ADMIN/TerminalEntry/TerminalEntry.html',
            controller: 'TerminalEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Terminal');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/RequisitionPurposeEntry', {
            templateUrl: '/SPA/ADMIN/RequisitionPurposeEntry/RequisitionPurposeEntry.html',
            controller: 'RequisitionPurposeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Requisition Purpose');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ProductionEntry', {
            templateUrl: '/SPA/PRODUCTION/ProductionEntry/ProductionEntry.html',
            controller: 'ProductionEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Production Entry');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/StockReceiveEntry', {

            templateUrl: '/SPA/INVENTORY/StockReceive/StockReceive.html',
            controller: 'StockReceiveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Receive');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })

        .when('/InternalStockIssue', {

            templateUrl: '/SPA/INVENTORY/InternalStockIssue/InternalStockIssueEntry.html',
            controller: 'InternalStockIssueController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Receive');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
    

        .when('/StockTransferLog', {

            templateUrl: '/SPA/INVENTORY/StockTransferLog/StockTransferLog.html',
            controller: 'StockTransferLogController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Transfer Log');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/StockReceiveDashboard', {

            templateUrl: '/SPA/INVENTORY/StockReceiveDashboard/StockReceiveDashboard.html',
            controller: 'StockReceiveDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Receive Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/StockStatus', {

            templateUrl: '/SPA/INVENTORY/StockStatus/StockStatus.html',
            controller: 'StockStatusController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Status');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/MaterialsDemand', {

            templateUrl: '/SPA/INVENTORY/MaterialsDemand/MaterialsDemand.html',
            controller: 'MaterialsDemandController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Materials Demand');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/MaterialsDemandApprove', {

            templateUrl: '/SPA/INVENTORY/MaterialsDemandApprove/MaterialsDemandApprove.html',
            controller: 'MaterialsDemandApproveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Materials Demand Approve');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ProductionStatus', {

            templateUrl: '/SPA/PRODUCTION/ProductionStatus/ProductionStatus.html',
            controller: 'ProductionStatusController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Production Status');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/ProductionReportsUI', {

            templateUrl: '/SPA/PRODUCTION/ProductionReportsUI/ProductionReportsUI.html',
            controller: 'ProductionReportsUIController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Production Reports UI');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/ProductionDashboard', {

            templateUrl: '/SPA/PRODUCTION/ProductionDashboard/ProductionDashboard.html',
            controller: 'ProductionDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Production Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }

                }
            }
        })
        .when('/StockOpeningQuantity', {
            templateUrl: '/SPA/INVENTORY/StockOpeningQtyEntry/StockOpeningQtyEntry.html',
            controller: 'StockOpeningQtyEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Opening Quantity');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/StockAdjustment', {
            templateUrl: '/SPA/INVENTORY/StockAdjustment/StockAdjustment.html',
            controller: 'StockAdjustmentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Adjustment');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/StockIssue', {
            templateUrl: '/SPA/INVENTORY/IssueEntry/IssueEntry.html',
            controller: 'IssueEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Issue');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/JumboStockIssueEntry', {
            templateUrl: '/SPA/INVENTORY/JumboStockIssueEntry/JumboStockIssueEntry.html',
            controller: 'JumboStockIssueEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Jumbo Stock Issue Entry');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/JumboStockIssueReport', {
            templateUrl: '/SPA/INVENTORY/JumboStockIssueReport/JumboStockIssueReport.html',
            controller: 'JumboStockIssueReportController'
        })

        .when('/InternalStockIssueReport', {
            templateUrl: '/SPA/INVENTORY/InternalStockIssueReport/InternalStockIssueReport.html',
            controller: 'InternalStockIssueReportController'
        })

        .when('/StockTransferLogReport', {
            templateUrl: '/SPA/INVENTORY/StockTransferLogReport/StockTransferLogReport.html',
            controller: 'StockTransferLogReportController'
        })
        .when('/StockIssueWithoutRequisition', {
            templateUrl: '/SPA/INVENTORY/IssueWithoutRequisition/IssueWithoutRequisition.html',
            controller: 'IssueWithoutRequisitionController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Transfer');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CIFReport', {
            templateUrl: '/SPA/POS/CIFReport/CIFReport.html',
            controller: 'CIFReportController'
        })
        .when('/CompanyPaymentStatusReport', {
            templateUrl: '/SPA/POS/CompanyPaymentStatusReport/CompanyPaymentStatusReport.html',
            controller: 'CompanyPaymentStatusReportController'
        })
        .when('/SalesProductivtyReport', {
            templateUrl: '/SPA/POS/SalesProductivtyReport/SalesProductivtyReportEntry.html',
            controller: 'SalesProductivtyController'
        })
        .when('/WagesSlipReport', {
            templateUrl: '/SPA/HRAndPayroll/WagesSlipReport/WagesSlipReport.html',
            controller: 'WagesSlipReportController'
        })
        .when('/PaySlipReport', {
            templateUrl: '/SPA/HRAndPayroll/PaySlipReport/PaySlipReport.html',
            controller: 'PaySlipReportController'
        })
        .when('/AttendanceSummaryWithOTReport', {
            templateUrl: '/SPA/HRAndPayroll/AttendanceSummaryWithOTReport/AttendanceSummaryWithOTReport.html',
            controller: 'AttendanceSummaryWithOTReportController'
        })
        .when('/AttendanceDetailReport', {
            templateUrl: '/SPA/HRAndPayroll/AttendanceDetailReport/AttendanceDetailReport.html',
            controller: 'AttendanceDetailReportController'
        })
        .when('/LabelRibbonExportReport', {
            templateUrl: '/SPA/EXPORT/LabelRibbonExportReport/LabelRibbonExportReport.html',
            controller: 'LabelRibbonExportReportController'
        })
        .when('/BondImportExportBalanceReport', {
            templateUrl: '/SPA/EXPORT/BondImportExportBalanceReport/BondImportExportBalanceReport.html',
            controller: 'BondImportExportBalanceReportController'
        })

        .when('/WarrentyAndSerialNoReport', {
            templateUrl: '/SPA/Procurement/WarrentyAndSerialNoReport/WarrentyAndSerialReport.html',
            controller: 'WarrentyAndSerialReportController'
        })

        .when('/StockReciveReport', {
            templateUrl: '/SPA/INVENTORY/StockReciveReport/StockReciveReport.html',
            controller: 'StockReciveReportController'
        })

        .when('/StockDeclarationReport', {
            templateUrl: '/SPA/INVENTORY/StockDeclarationReport/StockDeclarationReport.html',
            controller: 'StockDeclarationReportController'
        })


        .when('/CompanyPaymentReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyPaymentReport/CompanyPaymentReportEntry.html',
            controller: 'CompanyPaymentReportController'
        })

        .when('/SaleAcknowledgeReport', {
            templateUrl: '/SPA/RECEIVABLE/SaleAcknowledgeReport/SaleAcknowledgeReport.html',
            controller: 'SaleAcknowledgeReportControlller'
        })

        .when('/CompanyAdjustmentReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdjustmentReport/CompanyAdjustmentReportEntry.html',
            controller: 'CompanyAdjustmentReportController'
        })

        .when('/CompanyRefundReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyRefundReport/CompanyRefundReportEntry.html',
            controller: 'CompanyRefundReportController'
        })

        .when('/HRReports', {   //added by tofael 28102016
            templateUrl: '/SPA/HRAndPayroll/HRReports/HRReports.html',
            controller: 'HRReportsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'HR Reports');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/LeaveBalanceReport', {
            templateUrl: '/SPA/HRAndPayroll/LeaveBalanceReport/LeaveBalanceReport.html',
            controller: 'LeaveBalanceController'
        })

        .when('/SalarySheet', {
            templateUrl: '/SPA/HRAndPayroll/SalarySheet/SalarySheetReport.html',
            controller: 'SalarySheetController'
        })
        .when('/SalarySheetSreepur', {
            templateUrl: '/SPA/HRAndPayroll/SalarySheetSreepur/SalarySheetSreepur.html',
            controller: 'SalarySheetSreepurController'
        })
        .when('/SalarySheetEPZ', {
            templateUrl: '/SPA/HRAndPayroll/SalarySheetEPZ/SalarySheetEPZ.html',
            controller: 'SalarySheetEPZController'
        })

        .when('/SalaryHistory', {
            templateUrl: '/SPA/HRAndPayroll/SalaryHistory/SalaryHistoryReport.html',
            controller: 'SalaryHistoryController'
        })



        .when('/ExportReportUI', {   //added by tofael 28102016
            templateUrl: '/SPA/EXPORT/ExportReportUI/ExportReportUI.html',
            controller: 'ExportReportUIController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Export Report UI');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/InventoryAndSaleReportsMushak', {
            templateUrl: '/SPA/INVENTORY/InventoryReportsMushak/InventoryReportsMushak.html',
            controller: 'InventoryReportsMushakController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Mushak');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SupplierAIT', {
            templateUrl: '/SPA/VAT/SupplierAIT/SupplierAIT.html',
            controller: 'SupplierAITController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier AIT');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/Delivery', {
            templateUrl: '/SPA/INVENTORY/Delivery/Delivery.html',
            controller: 'DeliveryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Delivery');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/ManualDelivery', {
            templateUrl: '/SPA/INVENTORY/ManualDelivery/ManualDeliveryEntry.html',
            controller: 'ManualDeliveryEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Manual Delivery');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/InventoryApprovals', {
            templateUrl: '/SPA/POS/InventoryApprovals/InventoryApprovals.html',
            controller: 'InventoryApprovalsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Inventory Approvals');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PurchaseRequisition', {
            templateUrl: '/SPA/INVENTORY/PurchaseRequisition/PurchaseRequisitionEntry.html',
            controller: 'PurchaseRequisitionEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Purchase Requisition');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/ImportPurchaseBill', {
            templateUrl: '/SPA/Procurement/ImportPurchaseBill/ImportPurchaseBillEntry.html',
            controller: 'ImportPurchaseBillEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Import Purchase');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/LocalPurchaseBillEntry', {
            templateUrl: '/SPA/Procurement/LocalPurchaseBillEntry/LocalPurchaseBill.html',
            controller: 'LocalPurchaseBillController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Local Purchase Bill');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/AccessoriesPurchase', {
            templateUrl: '/SPA/Procurement/AccessoriesPurchase/AccessoriesPurchase.html',
            controller: 'AccessoriesPurchaseController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Accessories Purchase');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ProcurementDashboard', {
            templateUrl: '/SPA/Procurement/ProcurementDashboard/ProcurementDashboard.html',
            controller: 'ProcurementDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Procurement Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PurchaseDashboard', {
            templateUrl: '/SPA/Procurement/PurchaseDashboard/PurchaseDashboard.html',
            controller: 'PurchaseDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Purchase Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SupplierDashboard', {
            templateUrl: '/SPA/PAYABLE/SupplierDashboard/SupplierDashboardEntry.html',
            controller: 'SupplierDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PayableDashboard', {
            templateUrl: '/SPA/PAYABLE/PayableDashboard/PayableDashboard.html',
            controller: 'PayableDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Payable Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/SupplierPayment', {
            templateUrl: '/SPA/PAYABLE/SupplierPaymentEntry/SupplierPayment.html',
            controller: 'SuppilerPaymentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Payment');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/SalesInvoiceAditionalCost', {
            templateUrl: '/SPA/POS/SalesInvoiceAditionalCost/SalesInvoiceAditionalCostEntry.html',
            controller: 'SalesInvoiceAditionalCostController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sales Invoice Aditional Discount');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/PaymentVoucherReport', {
            templateUrl: '/SPA/PAYABLE/PaymentVoucherReport/PaymentVoucherReport.html',
            controller: 'PaymentVoucherReportController'
        })
        .when('/ReceiptVoucherReport', {
            templateUrl: '/SPA/RECEIVABLE/ReceiptVoucherReport/ReceiptVoucherReport.html',
            controller: 'ReceiptVoucherReportController'
        })



        .when('/WarrentyAndSerialNo', {
            templateUrl: '/SPA/Procurement/WarrentyAndSerialNo/WarrentyAndSerialNoEntry.html',
            controller: 'WarrentyAndSerialNoEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Warrenty And Serial No');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ImportReportUI', {
            templateUrl: '/SPA/Procurement/ImportReportUI/ImportReportUI.html',
            controller: 'ImportReportUIController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Import Report UI');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/MaterialReturnSlipReport', {
            templateUrl: '/SPA/INVENTORY/MaterialReturnSlipReport/MaterialReturnSlipReport.html',
            controller: 'MaterialReturnSlipReportController'
        })
        .when('/MaterialsDemandReport', {
            templateUrl: '/SPA/INVENTORY/MaterialsDemandReport/MaterialsDemandReport.html',
            controller: 'MaterialsDemandReportController'
        })
        .when('/MaterialDemandedIssuedReport', {
            templateUrl: '/SPA/INVENTORY/MaterialDemandedIssuedReport/MaterialDemandedIssuedReport.html',
            controller: 'MaterialDemandedIssuedReportController'
        })
        .when('/ISTMReport', {
            templateUrl: '/SPA/INVENTORY/ISTMReport/ISTMReport.html',
            controller: 'ISTMReportController'
        })
        .when('/StoreAndItemTransfer', {
            templateUrl: '/SPA/INVENTORY/StoreAndItemTransfer/StoreAndItemTransferEntry.html',
            controller: 'StoreAndItemTransferController'
        })
        .when('/SalesRegisterReport', {
            templateUrl: '/SPA/POS/SalesRegisterReport/SalesRegisterReport.html',
            controller: 'SalesRegisterReportController'
        })
        .when('/CompanyWiseTotalSalesReport', {
            templateUrl: '/SPA/POS/CompanyWiseTotalSalesReport/CompanyWiseTotalSalesReport.html',
            controller: 'CompanyWiseTotalSalesReportController'
        })
        .when('/SalesProductivityReport', {
            templateUrl: '/SPA/POS/SalesProductivityReport/SalesProductivityReport.html',
            controller: 'SalesProductivityReportController'
        })

        //INVENTORY REPORT

        .when('/LocalPurchaseReport', {
            templateUrl: '/SPA/Procurement/LocalPurchaseReport/LocalPBReport.html',
            controller: 'LocalPBReportController'
        })
        .when('/AccessoriesPurchaseReport', {
            templateUrl: '/SPA/Procurement/AccessoriesPurchaseReport/AccessoriesPurchaseReport.html',
            controller: 'AccessoriesPurchaseReportController'
        })
        .when('/PurchaseOrderReport', {
            templateUrl: '/SPA/Procurement/PurchaseOrderReport/PurchaseOrderReport.html',
            controller: 'PurchaseOrderReportController'
        })
        .when('/ImportPurchaseOrderReport', {
            templateUrl: '/SPA/Procurement/ImportPurchaseOrderReport/ImportPurchaseOrderReport.html',
            controller: 'ImportPurchaseOrderReportController'
        })

        .when('/SupplierPaymentReport', {
            templateUrl: '/SPA/PAYABLE/SupplierPaymentReport/SupplierPaymentReport.html',
            controller: 'SupplierPaymentReportController'
        })
        .when('/PurchaseAcknowledgementReport', {
            templateUrl: '/SPA/PAYABLE/PurchaseAcknowledgementReport/PurchaseAcknowledgementReport.html',
            controller: 'PurchaseAcknowledgementReportController'
        })
        .when('/SalesInvoice', {
            templateUrl: '/SPA/POS/SalesInvoice/SalesInvoice.html',
            controller: 'SalesInvoiceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sales Invoice');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ManualSalesInvoice', {
            templateUrl: '/SPA/POS/ManualSalesInvoice/ManualSalesInvoice.html',
            controller: 'ManualSalesInvoiceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Manual Sales Invoice');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/SalesReport', {
            templateUrl: '/SPA/POS/SalesReport/SalesReportUI.html',
            controller: 'SalesReportUIController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sales Report');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SalesTracking', {
            templateUrl: '/SPA/POS/SalesTracking/SalesTracking.html',
            controller: 'SalesTrackingController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sales Tracking');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SalesInvoiceReport', {
            templateUrl: '/SPA/POS/SalesInvoiceReport/SalesInvoiceReportEntry.html',
            controller: 'SalesInvoiceReportController'
        })
        .when('/RequisitionEntry', {
            templateUrl: '/SPA/PRODUCTION/RequisitionEntry/RequisitionEntry.html',
            controller: 'RequisitionController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Requisition Entry');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ReorderLevelSetup', {
            templateUrl: '/SPA/INVENTORY/ReorderLevelSetup/ReorderLevelSetup.html',
            controller: 'ReorderLevelSetupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Reorder Level Setup');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/StockDeclarationEntry', {
            templateUrl: '/SPA/INVENTORY/StockDeclarationEntry/StockDeclarationEntry.html',
            controller: 'StockDeclarationEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Stock Declaration');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SalesOrder', {
            templateUrl: '/SPA/POS/SalesOrder/SalesOrderEntry.html',
            controller: 'SalesOrderEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sales Order');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PosDashboard', {
            templateUrl: '/SPA/POS/PosDashboard/PosDashboard.html',
            controller: 'PosDashboardController',
            resolve: {
                "check": function () {

                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Pos Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ReviseSalesOrder', {
            templateUrl: '/SPA/POS/ReviseSalesOrder/ReviseSalesOrderEntry.html',
            controller: 'ReviseSalesOrderEntryController',
            resolve: {
                "check": function () {

                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Revise Sales Order');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/CIFDashboard', {
            templateUrl: '/SPA/POS/CIFDashboard/CIFDashboard.html',
            controller: 'CIFDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'CIF Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SalesOrderApprove', {
            templateUrl: '/SPA/POS/SalesOrderApprove/SalesOrderApprove.html',
            controller: 'SalesOrderApproveController',
            resolve: {
                "check": function () {

                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sales Order Approve');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SalesOrderReport', {
            templateUrl: '/SPA/POS/SalesOrderReport/SalesOrderReport.html',
            controller: 'SalesOrderReportController'
        })

        .when('/ReviseInternalWorkOrder', {
            templateUrl: '/SPA/POS/ReviseInternalWorkOrder/ReviseInternalWorkOrderEntry.html',
            controller: 'ReviseInternalWorkOrderController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Revise InternalWork Order');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/InternalWorkOrder', {
            templateUrl: '/SPA/POS/InternalWorkOrder/InternalWorkOrderEntry.html',
            controller: 'InternalWorkOrderEntryController',

            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Internal Work Order');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CompanyAdvance', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdvance/CompanyAdvanceEntry.html',
            controller: 'CompanyAdvanceEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Advance');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PaymentOnAccount', {
            templateUrl: '/SPA/RECEIVABLE/PaymentOnAccount/PaymentOnAccount.html',
            controller: 'PaymentOnAccountController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Payment On Account');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PaymentOnAccountReport', {
            templateUrl: '/SPA/RECEIVABLE/PaymentOnAccountReport/PaymentOnAccountReport.html',
            controller: 'PaymentOnAccountReportController'
        })
        .when('/CompanyOpeningReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyOpeningReport/CompanyOpeningReport.html',
            controller: 'CompanyOpeningReportController'
        })
        .when('/BankStatementReport', {
            templateUrl: '/SPA/RECEIVABLE/BankStatementReport/BankStatementReport.html',
            controller: 'BankStatementReportController'
        })
        .when('/CompanyDashboard', {
            templateUrl: '/SPA/RECEIVABLE/CompanyDashboard/CompanyDashboard.html',
            controller: 'CompanyDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CompanyPayment', {
            templateUrl: '/SPA/RECEIVABLE/CompanyPayment/CompanyPaymentEntry.html',
            controller: 'CompanyPaymentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Payment');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CompanyAdjustment', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdjustment/CompanyAdjustmentEntry.html',
            controller: 'CompanyAdjustmentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Adjustment');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CompanyOpening', {
            templateUrl: '/SPA/RECEIVABLE/CompanyOpening/CompanyOpening.html',
            controller: 'CompanyOpeningController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Opening');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ReceivableDashboard', {
            templateUrl: '/SPA/RECEIVABLE/ReceivableDashboard/ReceivableDashboard.html',
            controller: 'ReceivableDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Receivable Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ReceivableReportsUI', {
            templateUrl: '/SPA/RECEIVABLE/ReceivableReportsUI/ReceivableReportsUI.html',
            controller: 'ReceivableReportsUIController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Receivable Reports UI');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CompanyRefund', {
            templateUrl: '/SPA/RECEIVABLE/CompanyRefund/CompanyRefundEntry.html',
            controller: 'CompanyRefundEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Refund');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/AgingReport', {
            templateUrl: '/SPA/RECEIVABLE/AgingReport/AgingReport.html',
            controller: 'AgingReportController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Aging Report');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/PaybleAgingReport', {
            templateUrl: '/SPA/PAYABLE/PaybleAgingReport/AgingPayableReport.html',
            controller: 'AgingPayableReportController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Payable Aging Report');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PayableReports', {
            templateUrl: '/SPA/PAYABLE/PayableReports/PayableReports.html',
            controller: 'PayableReportsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Payable Reports');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
         
        .when('/CompanyVatAit', {
            templateUrl: '/SPA/RECEIVABLE/CompanyVatAit/CompanyVatAit.html',
            controller: 'CompanyVatAitController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Vat Ait');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SaleAcknowledgement', {
            templateUrl: '/SPA/RECEIVABLE/SaleAcknowledgement/SaleAcknowledgementEntry.html',
            controller: 'SaleAcknowledgementEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Sale Acknowledgement');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SupplierRefund', {
            templateUrl: '/SPA/PAYABLE/SupplierRefund/SupplierRefundEntry.html',
            controller: 'SupplierRefundEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Refund');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SupplierRefundReport', {
            templateUrl: '/SPA/PAYABLE/SupplierRefundReport/SupplierRefundReport.html',
            controller: 'SupplierRefundReportController'
        })
        .when('/SupplierAdvance', {
            templateUrl: '/SPA/PAYABLE/SupplierAdvance/SupplierAdvanceEntry.html',
            controller: 'SupplierAdvanceEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Advance');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SupplierAdvanceReport', {
            templateUrl: '/SPA/PAYABLE/SupplierAdvanceReport/SupplierAdvanceReport.html',
            controller: 'SupplierAdvanceReportController'
        })
        .when('/SupplierPaymentHistoryReport', {
            templateUrl: '/SPA/PAYABLE/SupplierPaymentHistoryReport/SupplierPaymentHistoryReport.html',
            controller: 'SupplierPaymentHistoryReportController'
        })
        .when('/CompanyAdvanceReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdvanceReport/CompanyAdvanceReport.html',
            controller: 'CompanyAdvanceReportController'
        })
        .when('/SupplierPaymentAdjustment', {
            templateUrl: '/SPA/PAYABLE/SupplierAdjustment/SupplierAdjustmentEntry.html',
            controller: 'SupplierAdjustmentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Payment Adjustment');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SupplierAdjustmentReport', {
            templateUrl: '/SPA/PAYABLE/SupplierAdjustmentReport/SupplierAdjustmentReport.html',
            controller: 'SupplierAdjustmentReportController'
        })
        .when('/SupplierOpeningBalance', {
            templateUrl: '/SPA/PAYABLE/SupplierOpeningBalance/SupplierOpeningBalanceEntry.html',
            controller: 'SupplierOpeningBalanceEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Opening Balance');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/SupplierOpeningBalanceReport', {
            templateUrl: '/SPA/PAYABLE/SupplierOpeningBalanceReport/SupplierOpeningBalanceReport.html',
            controller: 'SupplierOpeningBalanceReportController'
        })

        .when('/SupplierLedger', {
            templateUrl: '/SPA/PAYABLE/SupplierLedger/SupplierLedgersEntry.html',
            controller: 'SupplierLedgersController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Supplier Ledger');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/CompanyLedger', {
            templateUrl: '/SPA/RECEIVABLE/CompanyLedger/CompanyLedger.html',
            controller: 'CompanyLedgerController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Company Ledger');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PurchaseAcknowledgement', {
            templateUrl: '/SPA/PAYABLE/PurchaseAcknowledgement/PurchaseAcknowledgementEntry.html',
            controller: 'PurchaseAcknowledgementEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Purchase Acknowledgement');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/ProformaInvoice', {
            templateUrl: '/SPA/EXPORT/ProformaInvoice/ProformaInvoice.html',
            controller: 'ProformaInvoiceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Proforma Invoice');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ExportDashboard', {
            templateUrl: '/SPA/EXPORT/ExportDashboard/ExportDashboard.html',
            controller: 'ExportDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Export Dashboard');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ProformaInvoiceReport', {
            templateUrl: '/SPA/EXPORT/ProformaInvoiceReport/ProformaInvoiceReport.html',
            controller: 'ProformaInvoiceReportController'
        })
        .when('/CommercialInvoiceReport', {
            templateUrl: '/SPA/EXPORT/CommercialInvoiceReport/CommercialInvoiceReport.html',
            controller: 'CommercialInvoiceReportController'
        })
        .when('/DeliveryChallanReport', {
            templateUrl: '/SPA/EXPORT/DeliveryChallanReport/DeliveryChallanReport.html',
            controller: 'DeliveryChallanReportController'
        })
        .when('/PackingReport', {
            templateUrl: '/SPA/EXPORT/PackingReport/PackingReport.html',
            controller: 'PackingReportController'
        })
        .when('/PackingDocumentReport', {
            templateUrl: '/SPA/EXPORT/PackingDocumentReport/PackingDocumentReport.html',
            controller: 'PackingDocumentReportController'
        })
        .when('/TruckChallanReport', {
            templateUrl: '/SPA/EXPORT/TruckChallanReport/TruckChallanReport.html',
            controller: 'TruckChallanReportController'
        })
        .when('/BankReport', {
            templateUrl: '/SPA/EXPORT/BankReport/BankReport.html',
            controller: 'BankReportController'
        })
        .when('/BillOfExchangeReport', {
            templateUrl: '/SPA/EXPORT/BillOfExchangeReport/BillOfExchangeReport.html',
            controller: 'BillOfExchangeReportController'
        })

        .when('/BillOfExchangeReport2', {
            templateUrl: '/SPA/EXPORT/BillOfExchangeReport2/BillOfExchangeReport2.html',
            controller: 'BillOfExchangeReport2Controller'
        })

        .when('/BeneficiaryCertificateReport', {
            templateUrl: '/SPA/EXPORT/BeneficiaryCertificateReport/BeneficiaryCertificateReport.html',
            controller: 'BeneficiaryCertificateReportController'
        })

        .when('/ConsumptionCertificateReport', {
            templateUrl: '/SPA/EXPORT/ConsumptionCertificateReport/ConsumptionCertificateReport.html',
            controller: 'ConsumptionCertificateReportController'
        })
        .when('/DeliveryChalan', {
            templateUrl: '/SPA/EXPORT/DeliveryChalan/DeliveryChalan.html',
            controller: 'DeliveryChalanController'
        })


        .when('/CertificateReport', {
            templateUrl: '/SPA/EXPORT/CertificateReport/CertifaciateOfOrigin.html',
            controller: 'CertificateOfOriginController'
        })
        .when('/CertificatePreReport', {
            templateUrl: '/SPA/EXPORT/CertificatePreReport/CertifaciateOfPreInspection.html',
            controller: 'CertifaciateOfPreInspectionController'
        })
        ///IwoReport
        .when('/IWOReport', {
            templateUrl: '/SPA/POS/IWOReport/InternalWorkOrderReport.html',
            controller: 'InternalWorkOrderReportController'
        })

        .when('/ImportPurchaseReport', {
            templateUrl: '/SPA/Procurement/ImportPurchaseReport/ImportPurchaseReport.html',
            controller: 'ImportPurchaseReportController'
        })

        .when('/ProductionReport', {
            templateUrl: '/SPA/PRODUCTION/ProductionReport/ProductionReportEntry.html',
            controller: 'ProductionReportController'
        })
        .when('/ProductionHistoryReport', {
            templateUrl: '/SPA/PRODUCTION/ProductionHistoryReport/ProductionHistoryReport.html',
            controller: 'ProductionHistoryReportController'
        })
        .when('/DeliveryReport', {
            templateUrl: '/SPA/Inventory/DeliveryReport/DeliveryReport.html',
            controller: 'DeliveryReportController'
        })

        .when('/StockIssueHistory', {
            templateUrl: '/SPA/Inventory/StockIssueHistory/StockIssueHistoryReport.html',
            controller: 'StockIssueHistoryController'
        })

        .when('/DeliveryHistory', {
            templateUrl: '/SPA/Inventory/DeliveryHistory/DeliveryHistoryReport.html',
            controller: 'DeliveryHistoryReportController'
        })
        .when('/StockStatusReport', {
            templateUrl: '/SPA/Inventory/StockStatusReport/StockStatusReport.html',
            controller: 'StockStatusReportController'
        })

        .when('/Mushak4_3', {
            templateUrl: '/SPA/VAT/Mushak4_3/Mushak4_3Report.html',
            controller: 'Mushak4_3ReportController'
        })
        .when('/TreasuryChallan', {
            templateUrl: '/SPA/VAT/TreasuryChallan/TreasuryChallanReport.html',
            controller: 'TreasuryChallanReportController'
        })
        .when('/Mushak6_1', {
            templateUrl: '/SPA/VAT/Mushak6_1/Mushak6_1Report.html',
            controller: 'Mushak6_1ReportController'
        })

        .when('/Mushak6_2', {
            templateUrl: '/SPA/VAT/Mushak6_2/Mushak6_2Report.html',
            controller: 'Mushak6_2ReportController'
        })
        .when('/Mushak6_3', {
            templateUrl: '/SPA/VAT/Mushak6_3/Mushak6_3Report.html',
            controller: 'Mushak6_3ReportController'
        })
        .when('/Mushak6_6', {
            templateUrl: '/SPA/VAT/Mushak6_6/mushak_6_6_Report.html',
            controller: 'Mushak_6_6_ReportController'
        })
        .when('/SupplierLedgerReport', {
            templateUrl: '/SPA/PAYABLE/SupplierLedgerReport/SupplierLedgerReport.html',
            controller: 'SupplierLedgerReportController'
        })

        .when('/CompanyLedgerReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyLedgerReport/CompanyLedgerReport.html',
            controller: 'CompanyLedgerReportController'
        })




        .when('/ImportReport', {
            templateUrl: '/SPA/Procurement/ImportReport/ImportRecordReport.html',
            controller: 'ImportRecordReportController'
        })


        .when('/InventroyReportsUI', {
            templateUrl: '/SPA/INVENTORY/InventroyReportsUI/InventroyReportsUI.html',
            controller: 'InventroyReportsControlller',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Inventory Reports');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/ExpGenerate', {
            templateUrl: '/SPA/EXPORT/ExpGenerate/ExpGenerate.html',
            controller: 'ExpGenerateController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Exp Generate');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/CommercialInvoice', {
            templateUrl: '/SPA/EXPORT/CommercialInvoice/CommercialInvoice.html',
            controller: 'CommercialInvoiceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Commercial Invoice');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/ProformaInvoiceApprove', {
            templateUrl: '/SPA/EXPORT/ProformaInvoiceApprove/ProformaInvoiceApprove.html',
            controller: 'ProformaInvoiceApproveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Proforma Invoice Approve');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ExpGenerateApprove', {
            templateUrl: '/SPA/EXPORT/ExpGenerateApprove/ExpGenerateApprove.html',
            controller: 'ExpGenerateApproveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Exp Generate Approve');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })


        .when('/Mushak_6_6_Generate', {
            templateUrl: '/SPA/VAT/Mushak_6_6_Generate/Mushak_6_6_Generate.html',
            controller: 'Mushak_6_6_GenerateController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Mushak_6_6');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/CommercialInvoiceApprove', {
            templateUrl: '/SPA/EXPORT/CommercialInvoiceApprove/CommercialInvoiceApprove.html',
            controller: 'CommercialInvoiceApproveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Commercial Invoice Approve');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/PostCiProcess', {
            templateUrl: '/SPA/EXPORT/PostCiProcess/PostCiProcess.html',
            controller: 'PostCiProcessController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'After CI Process');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
      
        .when('/ReviseProformaInvoice', {
            templateUrl: '/SPA/EXPORT/ReviseProformaInvoice/ReviseProformaInvoice.html',
            controller: 'ReviseProformaInvoiceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Revise Proforma Invoice');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ReviseExpGenerate', {
            templateUrl: '/SPA/EXPORT/ReviseExpGenerate/ReviseExpGenerate.html',
            controller: 'ReviseExpGenerateController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Revise Exp Generate');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/ReviseCommercialInvoice', {
            templateUrl: '/SPA/EXPORT/ReviseCommercialInvoice/ReviseCommercialInvoice.html',
            controller: 'ReviseCommercialInvoiceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Revise Commercial Invoice');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/Reports', {
            templateUrl: '/SPA/ACCOUNTS/Reports/Reports.html',
            controller: 'ReportsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Reports');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })

        .when('/BankAccount', {
            templateUrl: '/SPA/ADMIN/BankAccount/BankAccount.html',
            controller: 'BankAccountController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Bank Account');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/BankDocumentEntry', {
            templateUrl: '/SPA/ADMIN/BankDocumentEntry/BankDocumentEntry.html',
            controller: 'BankDocumentEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Bank Document');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/AdvanceToEmployee', {
            templateUrl: '/SPA/AdvanceAndLoan/AdvanceToEmployee/AdvanceToEmployee.html',
            controller: 'AdvanceToEmployeeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Advance To Employee');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/AdvanceToEmployeeHistory', {
            templateUrl: '/SPA/AdvanceAndLoan/AdvanceToEmployeeHistory/AdvanceToEmployeeHistory.html',
            controller: 'AdvanceToEmployeeHistoryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Advance To Employee History');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/AdvanceToEmployeeReport', {
            templateUrl: '/SPA/AdvanceAndLoan/AdvanceToEmployeeReport/AdvanceToEmployeeReport.html',
            controller: 'AdvanceToEmployeeReportController'
        })
        .when('/FactoryExpenses', {
            templateUrl: '/SPA/Expenses/FactoryExpenses/FactoryExpenses.html',
            controller: 'FactoryExpensesController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    var PermissionData = sessionStorage.getItem("PermissionDataSession");
                    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                    if (login != undefined) {
                        var permissionAccess = Permission.find(v => v.ScreenName == 'Factory Expenses');
                        if (permissionAccess == undefined) {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else { window.location = '/Home/Login#/'; }
                }
            }
        })
        .when('/FactoryExpensesReport', {
            templateUrl: '/SPA/Expenses/FactoryExpensesReport/FactoryExpensesReport.html',
            controller: 'FactoryExpensesReportController'
        })
        .when('/Home', {
            templateUrl: '/SPA/Home/Home.html',
            controller: 'HomeController',

            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) {
                        var login = JSON.parse(sessionStorage.UserDataSession);
                    }
                    if (login != undefined) {

                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })


        .when('/', {
            templateUrl: '/SPA/Login/Login.html',
            controller: 'LoginController'
        })

        //.when('/LazyLoad', {
        //    templateUrl: '/SPA/LazyLoad/LazyEntry.html',
        //    controller: 'LazyController',
        //    resolve: {
        //        load: function () {
        //            controllers(['LazyController'])
        //        }
        //    }
        //})
        .otherwise({ redirectTo: '/' });


    app.registerCtrl = $controllerProvider.register;

    //jquery to dynamically include controllers as needed
    function controllers(controllers) {
        var numLoaded = 0;
        for (i = 0; i < controllers.length; i++) {
            $.ajaxSetup({ async: false });
            $.getScript('js/controllers/' + controllers[i] + '.js').success(function () {
                numLoaded++;
                if (numLoaded == controllers.length) {
                    return true; //only return after all scripts are loaded, this is blocking, and will fail if all scripts aren't loaded.
                }
            });
        }
    }



});


app.directive('moveNextOnEnter', function () {
    return {
        restrict: "A",
        link: function ($scope, element) {
            element.bind("keyup", function (e) {
                if (e.which == 13) {
                    var $nextElement = element.next();
                    //if ($nextElement.length) {
                    $nextElement[0].focus();
                    //}
                }
            });
            event.preventDefault();
        }
    }
});
app.directive("selectNgFiles", function () {
    return {
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
            elem.on("change", function (e) {
                var files = elem[0].files;
                ngModel.$setViewValue(files);
            })
        }
    }
});
app.factory('MyService', function () {
    return {
        data: {
            userName: '',
            role: '',
            permission: []
        },
        update: function (username, role) {
            this.data.userName = username;
            this.data.role = role;
        },
        permissionUpdate: function (permission) {
            this.data.permission = permission;
        }
    };
});

app.config(function ($provide) {
    $provide.decorator('$exceptionHandler', function ($delegate, $cookieStore) {
        return function (exception, cause) {
            $delegate(exception, cause);
            var message = exception.message;
            $cookieStore.put('errorMassage', message);
        };

    });
});

app.run(function ($http, $cookieStore, $rootScope, $templateCache) {
    var message = $cookieStore.get('errorMassage');
    if (message != undefined) {
        var megs = $cookieStore.get('errorMassage');
        var parms = { message: megs };
        $http.post('/ErrorLog/CreateErrorLogForClintSite', parms).success(function (data) {
        });
    }

    //$rootScope.$on('$viewContentLoaded', function () {
    //    $templateCache.removeAll();
    //});


    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof (current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
    });
});

