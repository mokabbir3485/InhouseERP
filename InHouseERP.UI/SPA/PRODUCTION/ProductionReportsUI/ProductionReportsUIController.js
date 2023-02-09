
app.controller("ProductionReportsUIController", function ($scope, $cookieStore, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.ScreenId = parseInt(sessionStorage.getItem("ProductionReportsUIScreenId"));
    Clear();

    function Clear() {
        $scope.ProductionHistoryName = "Production History Report";
        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.ProductionHistoryReportDate = {};
        $scope.ProductionReportsUI = "ProductionHistoryReport";
       
        GetUsersPermissionDetails();

    }

    $("#txtFromDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChange = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }

    $("#txtToDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChange = function () {
        $("#txtToDate").focus();
        $("#txtToDate").trigger("click");
    }



    $scope.ProductionReportsUIButton = function () {
        if ($scope.ProductionReportsUI == 'ProductionHistoryReport') {
            $window.open("#/ProductionHistoryReport", "popup", "width=850,height=550,left=280,top=80");


            $scope.ProductionHistoryReportDate.FromDate = $scope.FromDate;
            $scope.ProductionHistoryReportDate.ToDate = $scope.ToDate;
            $cookieStore.put("ProductionHistoryReportDate", $scope.ProductionHistoryReportDate);
            event.stopPropagation();
        }
    }


    $scope.ResetButton = function () {
        $scope.FromDate = null;
        $scope.ToDate = null;
    }

    ////Permision======>>>

    function GetUsersPermissionDetails() {


        //$scope.SalesRegister = false;
        //$scope.SalesProductivity = false;
        //$scope.ProductionReportsUI = true;


        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {

                if (aPermissionDetails.FunctionName == 'Production History Report') {
                    $scope.ProductionHistory = true;
                }
            });
        });
    }


});