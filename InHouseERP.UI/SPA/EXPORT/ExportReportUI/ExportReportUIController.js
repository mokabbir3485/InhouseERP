app.controller("ExportReportUIController", function ($scope, $cookieStore, $rootScope, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    load();

    //Functions
    function load() {
        $scope.name = "Export And Emport Report";

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Export Report UI').ScreenId;
        GetUsersPermissionDetails();
        
        $scope.PermissionDetails = [];
        $scope.importReportList = [];
        $scope.ExportEmportReport = {};
        $scope.ImportReportObj = {};
        $scope.ImportAndExportReportModel = {};

        //$scope.ExportEmportReportToDate.FormDate = $filter('date')(new Date().toJSON().slice(0, 10), 'M yyyy');

        $scope.exportReportType = false;
        $scope.importReportType = false;
        $scope.ImportReportRecorType = [];
        $scope.ExportRecorTypeList = [];
        $scope.importReportType = 'exportReport';
        $scope.importReportShowDdl = true;
        $scope.balanceReportflageHideAndShow = true;
        $scope.exporterType = '';
        //$scope.importReportType = '';
        $scope.balanceReportType = '';
        $scope.ImportReportRecorType = [
            { Id: 1, Name: "Label" },
            { Id: 2, Name: "Ribon" },
            { Id: 3, Name: "ALL" }
        ];

        $scope.FromDate = "";
        $scope.ToDate = "";

        var lastday = function (y, m) {
            return new Date(y, m + 1, 0).getDate();
        }

        var start = "01 March " + (new Date()).getFullYear();
        var end = lastday((new Date()).getFullYear(), 1) + " February " + ((new Date()).getFullYear() + 1);
        $scope.ExportEmportReport.FromDate = start;
        $scope.ExportEmportReport.ToDate = end;

        var arr = [];
        arr = start.split(' ');

        $scope.FromMonth = arr[1] + '-' + arr[2];

        var month1 = arr[1];
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        month1 = months.indexOf(month1) + 1;
        var d = '';
        d = arr[2] + '-0' + month1 + '-' + arr[0];



        //End Date===>

        var arr2 = [];
        arr2 = end.split(' ');
        $scope.ToMonth = arr2[1] + '-' + arr2[2];
        var monthsEnd = arr2[1];
        monthsEnd = months.indexOf(monthsEnd) + 1;

        var d2 = '';
        d2 = arr2[2] + '-0' + monthsEnd + '-' + arr2[0];

        $scope.FromDate = d;
        $scope.ToDate = d2;

        console.log('Start Date', $scope.FromDate);
        console.log('End Date', $scope.ToDate);

        $scope.ddlImport = null;
        $scope.ddlExport = null;

        $scope.PascalFromDate = d;
        $scope.PascalToDate = d2;


    }


    $scope.exportTypeReport = function () {


        if ($scope.importReportType == 'exportReport') {


            $scope.balanceReportflageHideAndShow = true;
            $scope.ImportReportRecorType = [
                { Id: 1, Name: "Label" },
                { Id: 2, Name: "Ribon" },
                { Id: 3, Name: "ALL" }
            ];


        }
    }

    $scope.blanceTypeReport = function () {

        if ($scope.importReportType == 'balance') {

            //$scope.balanceReportType = 'balance';
            $scope.balanceReportflageHideAndShow = false;
        }
    }


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
