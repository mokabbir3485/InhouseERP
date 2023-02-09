app.controller("EmailNotificationSetupController", function ($scope, $rootScope, $http, $window, $filter) {

    Clear();

    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.FullName = $scope.LoginUser.FullName;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Email Notification Setup').ScreenId;
        GetUsersPermissionDetails();

        $scope.IsUpdate = false;

        $scope.ReportNameForNotificationList = [];
        $scope.DeletedEmailNotificationSetupDetaillist = [];
        $scope.employeeList = [];
        $scope.IsDisable = true;
        $scope.EmailNotificationSetupDetaillist = [];
        $scope.EmailNotificationSetupDetail = {};
        $scope.EmailNotificationSetupDetail.IsActive = true;
        GetReportNameForNotification();
        GetAllEmployee();

        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();
    }
    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/Role/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
        });
    }
    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.RemovePermission = false;
        $scope.ListViewPermission = false;

        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                if (aPermissionDetails.FunctionName == 'Create') {
                    $scope.CreatePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Revise') {
                    $scope.RevisePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Remove') {
                    $scope.RemovePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }

    function GetReportNameForNotification() {
        $http({
            url: '/EmailNotificationSetup/GetReportNameForNotification',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ReportNameForNotificationList = data;
        });

    }
    $scope.ReportNotificationDetail_Get = function (ReportCode) {
        $scope.IsDisable = false;
        $http({
            url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + ReportCode,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length != 0) {
                alert("Email Notification Setup Detail has already saved.You can update it.");
                $scope.EmailNotificationSetupDetaillist = data;
                $scope.IsUpdate = true;
            } else {
                alertify.log('Email Notification Setup Detail not found! Add data Manually.', 'error', '7000');
            }
        });

    }
    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
        });
    }

    $scope.ResetEmailNotificationSetupDetail = function () {
        $scope.EmailNotificationSetupDetaillist = [];
    }


    $scope.AddEmailNotificationSetupDetail = function () {
        $scope.EmailNotificationSetupDetaillist.push($scope.EmailNotificationSetupDetail);
        $scope.EmailNotificationSetupDetail = {};
        $scope.EmailNotificationSetupDetail.IsActive = true;
        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val('').select2({
            placeholder: "Select Employee"
        });
        $scope.EmailNotificationSetupForm.$setPristine();
        $scope.EmailNotificationSetupForm.$setUntouched();

    };

    $scope.removeEmailNotificationSetupDetail = function (aEmailNotificationSetupDetail) {
        var ind = $scope.EmailNotificationSetupDetaillist.indexOf(aEmailNotificationSetupDetail);
        $scope.EmailNotificationSetupDetaillist.splice(ind, 1);
        if (aEmailNotificationSetupDetail.NotificationReportDetailId) {
            $scope.DeletedEmailNotificationSetupDetaillist.push(aEmailNotificationSetupDetail);
        }
        

    };
    function PostEmailNotificationSetup() {
        angular.forEach($scope.EmailNotificationSetupDetaillist, function (aData) {
            aData.ReportId = $scope.ddlReportName.ReportId;
        })
        var params = JSON.stringify({ EmailNotificationSetupDetaillist: $scope.EmailNotificationSetupDetaillist, DeletedEmailNotificationSetupDetaillist: $scope.DeletedEmailNotificationSetupDetaillist });
        $http.post('/EmailNotificationSetup/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Email notification setup saved successfully!', 'success', '5000');
                Clear();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
    }

    $scope.Save = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.IsUpdate == false && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostEmailNotificationSetup();
                    }
                })
            }
            else if ($scope.IsUpdate == false && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.IsUpdate == true && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostEmailNotificationSetup();
                    }
                })
            }
            else if ($scope.IsUpdate == true && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.IsUpdate == false && $scope.CreatePermission) {
                PostEmailNotificationSetup();
            }
            else if ($scope.IsUpdate == false && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.IsUpdate == true && $scope.RevisePermission) {
                PostEmailNotificationSetup();
            }
            else if ($scope.IsUpdate == true && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

    }


    $scope.Reset = function () {
        Clear();
    }


})