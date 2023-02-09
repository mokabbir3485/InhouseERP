app.controller("ReportNotificationNameController", function ($scope,$rootScope, $cookieStore, $http, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.UserId = $scope.LoginUser.UserId;
    //$scope.ScreenId = parseInt(sessionStorage.getItem("ReportNotificationNameScreenId"));

    Clear();

    function Clear() {
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Email Notification Setup').ScreenId;
        GetUsersPermissionDetails();

        $scope.ScreenLockInfo = [];
        //ScreenLock();
        //Server side pagination
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetAllScreen();
        $scope.ScreenList = [];
        $scope.ReportNotificationNamelist = [];
        $scope.ReportNotificationName = {};
        $scope.ReportNotificationName.ReportId = 0;
        $scope.ReportNotificationName.IsActive = true;
        $scope.button = "Save";
        GetReportNotificationNamePaged($scope.currentPage);

        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();
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

    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/Role/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
        });
    }
    function GetAllScreen() {
        $http({
            url: '/Permission/GetAllScreen',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ScreenList = data;
        });
    }
    $scope.reloadBtn = function () {
        $('#textNotificationName').val('');
        $scope.NotificationName = null;
        GetReportNotificationNamePaged(1);
    }
    $scope.NotificationNameSearch = function () {
        GetReportNotificationNamePaged(1);

    }
    function GetReportNotificationNamePaged(curPage) {
        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var whereClause = '';

        if ($scope.NotificationName != undefined && $scope.NotificationName != "") {
            whereClause = "RN.[ReportName] LIKE '%" + $scope.NotificationName + "%' or S.[ScreenName] LIKE '%" + $scope.NotificationName + "%' or RN.[ReportCode] LIKE '%" + $scope.NotificationName + "%'";
        }
        $http({
            url: encodeURI('/EmailNotificationSetup/GetReportNotificationNamePaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&whereClause=' + whereClause + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ReportNotificationNamelist = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }

    function SaveReportNotificationName(Status) {
        var parms = JSON.stringify({ ReportNotificationName: $scope.ReportNotificationName });
        $http.post('/EmailNotificationSetup/PostReportNotificationName', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Report Notification Name ' + Status + ' successfully!', 'success', '5000');
                Clear();
                $scope.ReportNotificationNameForm.$setUntouched();
                $scope.ReportNotificationNameForm.$setPristine();

            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }


    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetReportNotificationNamePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetReportNotificationNamePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetReportNotificationNamePaged($scope.currentPage);
        }
    };

    $scope.PostReportNotificationName = function () {

        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.ReportNotificationName.ReportId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        SaveReportNotificationName('Saved');
                    }
                })
            }
            else if ($scope.ReportNotificationName.ReportId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ReportNotificationName.ReportId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        SaveReportNotificationName('Updated');
                    }
                })
            }
            else if ($scope.ReportNotificationName.ReportId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.ReportNotificationName.ReportId == 0 && $scope.CreatePermission) {
                SaveReportNotificationName('Saved');
            }
            else if ($scope.ReportNotificationName.ReportId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ReportNotificationName.ReportId > 0 && $scope.RevisePermission) {
                SaveReportNotificationName('Updated');
            }
            else if ($scope.ReportNotificationName.ReportId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
    };

    $scope.SelReportNotificationName = function (aReportNotificationName) {
        $scope.ReportNotificationName = aReportNotificationName;
        setTimeout(function () {
            $("#ddlScreen").select2({
                theme: "classic",
            }).val(aReportNotificationName.ScreenId).trigger("change");

        }, 0);
        $scope.button = "Update";
    };


    $scope.resetForm = function () {
        Clear();
        $scope.ReportNotificationNameForm.$setPristine();
        $scope.ReportNotificationNameForm.$setUntouched();
    };
});