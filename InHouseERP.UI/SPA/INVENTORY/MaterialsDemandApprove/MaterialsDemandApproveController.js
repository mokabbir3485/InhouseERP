app.controller("MaterialsDemandApproveController", function ($rootScope, $scope, $cookieStore, $window, $http, $filter, $window) {
    //#region GLOBAL VARIABLES & METHODS CALL

    Clear();


    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            $scope.FullName = $scope.LoginUser.FullName;
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Materials Demand Approve').ScreenId;
        GetUsersPermissionDetails();


        var today = ($filter('date')(new Date(), 'MMM dd, yyyy')).toString();
        $scope.MaterialsDemandApprove = { AcknowledgedBy: $scope.LoginUser.UserId, AcknowledgedDate: today };
        //$scope.MinDate = new Date(parseInt($scope.CurrentValuationSetup.FromDate.replace('/Date(', '')));
        $scope.FromDate = today;
        $scope.ToDate = today;



        $scope.MaterialsDemandList = [];
        $scope.pos_SalesApproveList = [];
        $scope.MaterialsDemandApproveList = [];

        GetMaterialsDemandUnApprovalList();
        ReportNotificationDetail_Get();
        GetAppNotificationSetupByReportCode();
        $scope.ReportNotificationDetailList = [];
        $scope.AppNotificationSetupList = [];
    }
    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.ListViewPermission = false;
        $scope.ApprovedPermission = false;
        $scope.AmendmentApprovedPermission = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            var LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var searchCriteria = 'P.RoleId=' + LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                //if (aPermissionDetails.FunctionName == 'Create') {
                //    $scope.CreatePermission = aPermissionDetails.CanExecute;
                //}
                //else if (aPermissionDetails.FunctionName == 'Revise') {
                //    $scope.RevisePermission = aPermissionDetails.CanExecute;
                //}
                //else if (aPermissionDetails.FunctionName == 'ListView') {
                //    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                //}
                if (aPermissionDetails.FunctionName == 'Create') {
                    $scope.CreatePermission = aPermissionDetails.CanExecute;
                } else if (aPermissionDetails.FunctionName == 'Approved') {
                    $scope.ApprovedPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Amendment Approved') {
                    $scope.AmendmentApprovedPermission = aPermissionDetails.CanExecute;
                }

            });
        });
    }
    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'MDA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.ReportNotificationDetailList = notification;
        });

    }

    function GetMaterialsDemandUnApprovalList() {
        $http({
            url: '/MaterialsDemand/GetMaterialsDemandUnApprovalList',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.DemandDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DemandDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'mediumDate')).toString();
                        aSd.DemandDate = date1;
                    }
                })
            }
            $scope.MaterialsDemandList = data;
        });
    }


    function OpenReport(aDemand) {
        $window.open("#/MaterialsDemandReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesOrderId", JSON.stringify(SOId));
        $cookieStore.put("MaterialsDemandData", aDemand);
        event.stopPropagation();
    }
    $scope.OpenReport = function (aDemand) {
        OpenReport(aDemand);
    };


    $scope.SelectMaterialsDemandList = function (row, select) {
        //row.Ischeck = select;
        //row.IsApproved = true;
        //row.ApprovedBy = row.UpdateBy = $scope.LoginUser.UserId;

        $scope.MaterialsDemandApproveList = Enumerable.From($scope.MaterialsDemandList).Where('$.IsCheck==true').ToArray();

    }

    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'MDA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(MaterialsDemandApproveList, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];
        angular.forEach(MaterialsDemandApproveList, function (aMD) {
            angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
                var obj = {}
                obj = aNotify;
                obj.NotificaitonTitle = NotificaitonTitle

                obj.NotificationDetail = 'Demand No: ' + aMD.MaterialsDemandNo + ' Branch Name: ' + aMD.BranchName + ' From Department: ' + aMD.FromDepartmentName  + ' To Department: ' + aMD.ToDepartmentName + ' Approved By: ' + $scope.FullName
                $scope.AppNotificationLogList.push(obj);
                    

            })
        })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $scope.AppNotificationLogList = [];
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
            if (data > 0) {

            }
            else {
                //alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            //alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });
    }

    function SaveMaterialsDemandApprove() {
        if ($scope.MaterialsDemandApproveList.length <= 0) {
            alertify.log('Please select at least one Materials Demand', 'error', '5000');
            return;
        }
        angular.forEach($scope.MaterialsDemandApproveList, function (aData) {
            aData.IsApproved = true;
            aData.ApprovedBy = $scope.LoginUser.UserId;
        })
        var params = JSON.stringify({ inv_MaterialsDemandList: $scope.MaterialsDemandApproveList });
        $http.post('/MaterialsDemand/ApprovalUpdate', params).success(function (data) {



            if (data > 0) {
                AppNotificationLogPost($scope.MaterialsDemandApproveList, 'Materials Demand Approved!');
                $window.scrollTo(0, 0);
                alertify.log('Materials Demand Approved successfully!', 'success', '5000');
                $scope.MaterialsDemandApproveList = [];
                Clear();
            }
            else {
                alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });

    }
    $scope.SaveMaterialsDemandApprove = function () {
        if ($scope.CreatePermission) {
            alertify.confirm("Are you sure to submit?", function (e) {
                if (e) {
                    SaveMaterialsDemandApprove();
                }
            })
        }
        else if (!$scope.CreatePermission) {
            alertify.log('You do not have permission to submit!', 'error', '5000');
        }

    }



    $scope.ResetForm = function () {
        Clear();
    }

    //#endregion

})