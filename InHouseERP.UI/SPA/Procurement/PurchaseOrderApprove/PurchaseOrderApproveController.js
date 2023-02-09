app.controller("PurchaseOrderApproveController", function ($rootScope, $scope, $cookieStore, $window, $http, $filter, $window) {
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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Purchase Order Approve').ScreenId;
        GetUsersPermissionDetails();


        var today = ($filter('date')(new Date(), 'MMM dd, yyyy')).toString();
        $scope.PurchaseOrderApprove = { AcknowledgedBy: $scope.LoginUser.UserId, AcknowledgedDate: today };
        //$scope.MinDate = new Date(parseInt($scope.CurrentValuationSetup.FromDate.replace('/Date(', '')));
        $scope.FromDate = today;
        $scope.ToDate = today;



        $scope.LocalPurchaseOrderList = [];
        $scope.ImportPurchaseOrderList = [];
        $scope.pos_SalesApproveList = [];
        $scope.PurchaseOrderApproveList = [];

        GetPurchaseOrderUnApprovalList();
        ReportNotificationDetail_Get();
        GetAppNotificationSetupByReportCode();
        $scope.ReportNotificationDetailList = [];
        $scope.AppNotificationSetupList = [];


    }
    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.ListViewPermission = false;
        $scope.LocalApprovedPermission = false;
        $scope.ImportApprovedPermission = false;
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
                } else if (aPermissionDetails.FunctionName == 'Local Approved') {
                    $scope.LocalApprovedPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Import Approved') {
                    $scope.ImportApprovedPermission = aPermissionDetails.CanExecute;
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

    function GetPurchaseOrderUnApprovalList() {
        $http({
            url: '/PurchaseOrder/GetPurchaseOrderUnApprovalList',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.LocalPurchaseOrderList = [];
            $scope.ImportPurchaseOrderList = [];
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.PODate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PODate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'mediumDate')).toString();
                        aSd.PODate = date1;
                    }

                    if (aSd.IsLocal) {
                        aSd.Type = 'Local';
                        $scope.LocalPurchaseOrderList.push(aSd);
                    }
                    else {
                        aSd.Type = 'Import';
                        $scope.ImportPurchaseOrderList.push(aSd);
                    };


                })
            }
        });
    }


    $scope.OpenReport = function (POId, IsLocal) {
        if (IsLocal == true) {
            $window.open("#/PurchaseOrderReport", "popup", "width=800,height=550,left=280,top=80");
        } else {
            $window.open("#/ImportPurchaseOrderReport", "popup", "width=800,height=550,left=280,top=80");
        }
        //$window.open("#/ImportPurchaseOrderReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("POId", POId);
        event.stopPropagation();
    };


    $scope.SelectPurchaseOrderList = function (row, select) {
        //row.Ischeck = select;
        //row.IsApproved = true;
        //row.ApprovedBy = row.UpdateBy = $scope.LoginUser.UserId;

        $scope.PurchaseOrderApproveList = Enumerable.From($scope.LocalPurchaseOrderList).Where('$.IsCheck==true').ToArray();
        $scope.ImportPurchaseOrderApproveList = Enumerable.From($scope.ImportPurchaseOrderList).Where('$.IsCheck==true').ToArray();

    }

    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'POA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(PurchaseOrderApproveList, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];
        angular.forEach(PurchaseOrderApproveList, function (aPO) {
            angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
                var obj = {}
                obj = aNotify;
                obj.NotificaitonTitle = NotificaitonTitle;
                aPO.ManualPONo = aPO.ManualPONo != null ? ' ~ ' + aPO.ManualPONo : ""
                obj.NotificationDetail = 'PO No: ' + aPO.PONo  + aPO.ManualPONo + ' Supplier Name: ' + aPO.SupplierName + ' Branch Name: ' + aPO.BranchName + ' Prepared By: ' + aPO.PreparedByName + ' Approved By: ' + $scope.FullName
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

    function SavePurchaseOrderApprove() {
        angular.forEach($scope.ImportPurchaseOrderApproveList, function (aData) {
            $scope.PurchaseOrderApproveList.push(aData);
        })
        if ($scope.PurchaseOrderApproveList.length <= 0) {
            alertify.log('Please select at least one Purchase Order', 'error', '5000');
            return;
        }
        angular.forEach($scope.PurchaseOrderApproveList, function (aData) {
            aData.IsApproved = true;
            aData.ApprovedBy = $scope.LoginUser.EmployeeId;
        })
        var params = JSON.stringify({ proc_PurchaseOrderList: $scope.PurchaseOrderApproveList });
        $http.post('/PurchaseOrder/ApprovalUpdate', params).success(function (data) {



            if (data > 0) {
                AppNotificationLogPost($scope.PurchaseOrderApproveList, 'Purchase Order Approved!');
                $window.scrollTo(0, 0);
                alertify.log('Purchase Order Approved successfully!', 'success', '5000');
                $scope.PurchaseOrderApproveList = [];
                Clear();
            }
            else {
                alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });

    }
    $scope.SavePurchaseOrderApprove = function () {
        if ($scope.CreatePermission) {
            alertify.confirm("Are you sure to submit?", function (e) {
                if (e) {
                    SavePurchaseOrderApprove();
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