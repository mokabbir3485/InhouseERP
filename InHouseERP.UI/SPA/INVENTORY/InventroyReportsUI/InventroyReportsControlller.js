
﻿app.controller("InventroyReportsControlller", function ($scope, $cookieStore, $rootScope, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.ScreenId = parseInt(sessionStorage.getItem("InventoryReportsScreenId"));

    Clear();

    function Clear() {

        if ($rootScope.$PermissionList !== undefined) {
            $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Inventory Reports').ScreenId;

            GetUsersPermissionDetails();
        }
        else {
            setTimeout(function () {
                $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Inventory Reports').ScreenId;
                GetUsersPermissionDetails();
            }, 500);
        }


        $scope.StockIssueReportName = "Stock Issue History";
        $scope.DeliveryReportName = "Delivery History";
        $scope.StockStatusReportName = "Stock Status Report";
       
        $scope.salesReport = "StockIssueReport";


        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.StatusDate = null;
        $scope.ddlCategory = null;
        $scope.ddlSubCategory = null;
        $scope.ddlStore = null;

        GetAllCategory();
        GetAllSubCategory();
        GetAllStore();
    }

    $("#txtFromDate").datepicker({
        dateFormat: "M dd, yy"
    });

    $scope.FormDateChange = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }

    $("#txtToDate").datepicker({
        dateFormat: "M dd, yy"
    });

    $scope.ToDateChange = function () {
        $("#txtToDate").focus();
        $("#txtToDate").trigger("click");
     }

     $scope.aSOnDate = function () {
         $("#txtasOnDate").focus();
         $("#txtasOnDate").trigger("click");
     }

     $("#txtasOnDate").datepicker({
         dateFormat: "M dd, yy",
         changeMonth: true,
         changeYear: true
     });
     function GetAllCategory() {
         $http({
             url: "/Category/GetAllCategory",
             method: "GET",
             headers: { 'Content-Type': "application/json" }
         }).success(function (data) {
             $scope.CategoryList = data;
         });
     }
     function GetAllSubCategory() {
         $http({
             url: "/Subcategory/GetAllSubategory",
             method: "GET",
             headers: { 'Content-Type': "application/json" }
         }).success(function (data) {
             $scope.SubcategoryList = data;
         });
     }
     function GetAllStore() {
         $http({
             url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
             method: 'GET',
             headers: { 'Content-Type': 'application/json' }
         }).success(function (userOutletList) {
             $scope.StoreList = userOutletList;
         });
     }
    $scope.InventoryReportButton = function () {

        //var isValid = true;
        //var isValid1 = true;

        //if ($scope.FromDate == "" || $scope.FromDate == undefined) {
        //    isValid = false;
        //    alertify.log('Please Select from Date', 'error', '3000');
        //}

        //if ($scope.ToDate == "" || $scope.ToDate == undefined) {
        //    isValid1 = false;
        //    alertify.log('Please Select to Date', 'error', '3000');
        //}

        //if (isValid && isValid1) {

        $scope.StockIssue = {};
        $scope.StockIssue.FromDate = $scope.FromDate;
        $scope.StockIssue.ToDate = $scope.ToDate;
     
        if ($scope.StatusDate == '' || $scope.StatusDate == undefined) {
            $scope.StockIssue.StatusDate = '';
        } else {
            $scope.StockIssue.StatusDate = $scope.StatusDate;
        }
     //   $scope.StockIssue.CategoryId = $scope.ddlCategory.CategoryId;

        if ($scope.ddlSubCategory == null) {
            $scope.ddlSubCategory = {}
            $scope.ddlSubCategory.SubCategoryId = null;
        }
        if ($scope.ddlSubCategory == null || $scope.ddlSubCategory == undefined) {
            $scope.StockIssue.SubCategoryId = 0;
        } else {
            $scope.StockIssue.SubCategoryId = $scope.ddlSubCategory.SubCategoryId;
        }
        if ($scope.ddlStore == null || $scope.ddlStore == undefined) {
            $scope.StockIssue.DepartmentId = 0;
        } else {
            $scope.StockIssue.DepartmentId = $scope.ddlStore.DepartmentId;
        }
    
       

        if ($scope.salesReport == 'StockIssueReport') {
            $window.open("#/StockIssueHistory", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("StockIssueHistory", $scope.StockIssue);
            event.stopPropagation();

        }

        if ($scope.salesReport == 'DeliveryReport') {
            $window.open("#/DeliveryHistory", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("DeliveryHistory", $scope.StockIssue);
            event.stopPropagation();
        }
        if ($scope.salesReport == 'StockStatusReport') {
            $window.open("#/StockStatusReport", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("StockStatusReport", $scope.StockIssue);
            event.stopPropagation();
        }

        //}


    }


    $scope.ResetButton = function () {
        $scope.FromDate = "";
        $scope.ToDate = "";
    }


    function GetUsersPermissionDetails() {

        $scope.StockIssue = false;
        $scope.DeliveryReport = false;
        $scope.StockStatusReport = false;
        //$scope.salesReport = true;


        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {

                if (aPermissionDetails.FunctionName == 'Stock Issue History') {
                    $scope.StockIssue = true;
                }
                else if (aPermissionDetails.FunctionName == 'Delivery History') {
                    $scope.DeliveryReport = true;

                }
                else if (aPermissionDetails.FunctionName == 'Stock Status Report') {
                    $scope.StockStatusReport = true;

                }
              
            });
        });
    }


});