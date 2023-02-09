app.controller("FiscalYearEntryController", function ($scope, $rootScope, $route, $http, $window, $filter) {

    //Clear() Method For Loading Initial Data For Fiscal Year Page
    Clear();
    function Clear() {
        //For Loading Session Data
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'FiscalYear').ScreenId;
        GetUsersPermissionDetails();

        GetAllBranch();
        $scope.ad_FiscalYear = {};
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.FiscalYearList = [];
        GetFiscalYearPaged($scope.currentPage);
        $scope.ad_FiscalYear.FiscalYearId = 0;
        $scope.ad_FiscalYear.FiscalYearName = "";
        $scope.Btn = "Save";
        $scope.ad_FiscalYear.FromDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM d, yyyy');
        $scope.ad_FiscalYear.ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM d, yyyy');
        $scope.ad_FiscalYear.IsActive = true;
        $scope.ddlBranch = null;

        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();

        $("#textFYFromDate").datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true
        });
        $scope.CalendartextFYFromDate1 = function () {
            $("#textFYFromDate").focus();
            $("#textFYFromDate").trigger("click");
        }
        $("#textFYToDate").datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true
        });
        $scope.CalendartextFYToDate1 = function () {
            $("#textFYToDate").focus();
            $("#textFYToDate").trigger("click");
        }
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
    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Branchlist = data;
        });
    }

    $scope.fiscalYearConcate=function() {

        var from = $("#textFYFromDate").val().split(", ");
        var fPart = from[1];//.substring(2,4);
        var from = $("#textFYToDate").val().split(", ");
        var tPart = from[1];//.substring(2,4);

        var fiscalYarConcat = fPart + "-" + tPart;
        $scope.ad_FiscalYear.FiscalYearName = fiscalYarConcat;
    }


    //For Save 
    //function DateConversion() {
    //    var from = $("#textFYFromDate").val().split("/");
    //    var f = new Date(from[2], from[1] - 1, from[0]);
    //    $scope.ad_FiscalYear.FromDate = f;

    //    var from = $("#textFYToDate").val().split("/");
    //    var t = new Date(from[2], from[1] - 1, from[0]);
    //    $scope.ad_FiscalYear.ToDate = t;
    //}


    $scope.AddFiscalYear = function () {

        $scope.ad_FiscalYear.CreatorId = $scope.UserId;
        $scope.ad_FiscalYear.UpdatorId = $scope.UserId;
        $scope.ad_FiscalYear.BranchId = $scope.ddlBranch.BranchId;


        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.ad_FiscalYear.FiscalYearId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        //DateConversion();
                        FiscalYearSave('Saved');
                    }
                })
            }
            else if ($scope.ad_FiscalYear.FiscalYearId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ad_FiscalYear.FiscalYearId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        //DateConversion();
                        FiscalYearSave('Updated');
                    }
                })
            }
            else if ($scope.ad_FiscalYear.FiscalYearId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.ad_FiscalYear.FiscalYearId == 0 && $scope.CreatePermission) {
                //DateConversion();
                FiscalYearSave('Saved');
            }
            else if ($scope.ad_FiscalYear.FiscalYearId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ad_FiscalYear.FiscalYearId > 0 && $scope.RevisePermission) {
                //DateConversion();
                FiscalYearSave('Updated');
            }
            else if ($scope.ad_FiscalYear.FiscalYearId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
          
    }



    function FiscalYearSave(Status) {     
        var parms = JSON.stringify({ _ad_FiscalYear: $scope.ad_FiscalYear });
        $http.post('/FiscalYear/AddFiscalYear', parms).success(function (data) {
            if (data > 0) {               
                alertify.log('Fiscal Year ' + Status + ' Successfully!', 'success', '5000');
                Clear();            
            } else {
                alertify.log('Save Failed!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }
  

    //For Edit 

    $scope.getUpdateFiscalYear = function (aFiscalYearList) {
        $scope.ad_FiscalYear = aFiscalYearList;
        $scope.ddlBranch = { "BranchId": aFiscalYearList.BranchId };

        //var FDate = aFiscalYearList.FromDate.substring(0, 5);
        //if (FDate == "/Date") {
        //    var parsedDate = new Date(parseInt(aFiscalYearList.FromDate.substr(6)));
        //    aFiscalYearList.FromDate = $filter('date')(parsedDate, 'dd/MM/yyyy');
        //}

        //var TDate = aFiscalYearList.ToDate.substring(0, 5);
        //if (TDate == "/Date") {
        //    var parsedDate = new Date(parseInt(aFiscalYearList.ToDate.substr(6)));
        //    aFiscalYearList.ToDate = $filter('date')(parsedDate, 'dd/MM/yyyy');
        //}

        
        $scope.Btn = "Update";

        $window.scrollTo(0, 0);
    }



    // For Pagination

    $scope.reloadBtn = function () {
        $('#textFiscalYear').val('');
        $scope.FiscalYear = null;
        GetFiscalYearPaged(1);
    }
    $scope.FiscalYearSearch = function () {
        GetFiscalYearPaged(1);

    }


    function GetFiscalYearPaged(curPage) {
        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var whereClause = '';

        if ($scope.FiscalYear != undefined && $scope.FiscalYear != "") {
            whereClause = "[BranchName] LIKE '%" + $scope.FiscalYear +
                "%' OR [FiscalYearName] LIKE '%" + $scope.FiscalYear + "%'";
        }
        $http({
            //url: '/FiscalYear/FiscalYearGetPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&rows=' + 0,
            url: encodeURI("/FiscalYear/FiscalYearGetPaged?StartRecordNo=" + StartRecordNo + "&RowPerPage=" + $scope.PerPage + "&WhereClause=" + whereClause + "&rows=" + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.FiscalYearList = data.ListData;
            $scope.total_count = data.TotalRecord;

            if ($scope.FiscalYearList.length > 0) {
                angular.forEach($scope.FiscalYearList, function (fy) {
                    var res1 = fy.FromDate.substring(0, 5);
                    var res2 = fy.ToDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(fy.FromDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        fy.FromDate = date1;
                    }

                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(fy.ToDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        fy.ToDate = date2;
                    }
                })

            }
            else {
                alertify.log('Fiscal Year Not Found', 'error', '5000');
            }


        });
    }

    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetFiscalYearPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetFiscalYearPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetFiscalYearPaged($scope.currentPage);
        }
    }

    //For Reset Button

    $scope.reset = function () {
        $scope.ad_FiscalYear = {};
        $scope.Btn = "Save";
        $scope.ad_FiscalYear.IsActive = true;
      
    }


});
