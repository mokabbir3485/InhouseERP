app.controller("ReportsController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.ScreenId = parseInt(sessionStorage.getItem("ReportsScreenId"));
    load();

    //Functions
    function load() {

        GetUsersPermissionDetails();
        $scope.PermissionDetails = [];

        $scope.ReportType = 'Ledger';

    }


    $scope.TypesOfReport = function () {


        if ($scope.ReportType == 'LedgerTypeReport') {

        } else if ($scope.ReportType == 'ChartOfAccount') {

        }
    }

    //$scope.ChartOfAccountTypeReport = function () {

    //    if ($scope.importReportType == 'balance') {

    //        //$scope.balanceReportType = 'balance';
    //        $scope.balanceReportflageHideAndShow = false;
    //    }
    //}


    function GetUsersPermissionDetails() {

        $scope.importReport = false;
        $scope.exportReport = true;
        $scope.balance = true;



        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                if (aPermissionDetails.FunctionName == 'Export Report UI') {

                    $scope.importReport = aPermissionDetails.CanExecute;
                }
            });
        });
    }








    $scope.reportBtn = function () {


        $scope.ImportReportObj.FromDate = $scope.FromDate;
        $scope.ImportReportObj.ToDate = $scope.ToDate;

        $scope.ImportReportObj.Name = $scope.ImportAndExportReportModel.Name;
        $scope.ImportReportObj.Id = $scope.ImportAndExportReportModel.Id;

        $scope.ImportReportObj.FromMonth = $scope.FromMonth;
        $scope.ImportReportObj.ToMonth = $scope.ToMonth;

        $scope.ImportReportObj.PascalToDate = $scope.PascalToDate;
        $scope.ImportReportObj.PascalFromDate = $scope.PascalFromDate;


        if ($scope.importReportType == "exportReport") {

            $window.open("#/LabelRibbonExportReport", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("LabelRibbonExportReport", $scope.ImportReportObj);
            //sessionStorage.setItem("LabelRibbonExportReport", JSON.stringify($scope.ImportReportObj));

        }

        if ($scope.importReportType == 'balance') {

            $window.open("#/BondImportExportBalanceReport", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("BondImportExportBalanceReport", $scope.ImportReportObj);
            //sessionStorage.setItem("BondImportExportBalanceReport", JSON.stringify($scope.ImportReportObj));
        }

    }



    $("#textToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',


        onClose: function () {
            var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
        },

        beforeShow: function () {
            if ((selDate = $(this).val()).length > 0) {
                iYear = selDate.substring(selDate.length - 4, selDate.length);
                iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5),
                    $(this).datepicker('option', 'monthNames'));
                $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
            }
        }
    });

    $("#textFormDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',

        onClose: function () {
            var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
        },

        beforeShow: function () {
            if ((selDate = $(this).val()).length > 0) {
                iYear = selDate.substring(selDate.length - 4, selDate.length);
                iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5),
                    $(this).datepicker('option', 'monthNames'));
                $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
            }
        }
    });



});
