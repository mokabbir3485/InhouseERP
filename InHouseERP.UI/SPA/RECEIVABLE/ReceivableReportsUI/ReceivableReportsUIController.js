
app.controller("ReceivableReportsUIController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {

   
    Clear();

    function Clear() {


        //  document.getElementById("btnAdd").disabled = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Receivable Reports UI').ScreenId;
        GetUsersPermissionDetails();

        
        $scope.BankStatementName = "Bank Statement Report";
        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.ReceiverBankAccountList = [];
        GetAllBankAccount();
        $scope.BankStatementReportDate = {};
        $scope.ReceivableReportsUI = "BankStatementReport";

       // GetUsersPermissionDetails();

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

    function GetAllBankAccount() {

        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankAccountList = data;
            $scope.ReceiverBankAccountList = [];

            angular.forEach($scope.BankAccountList, function (aData) {
                if (aData.AccountFor == 'Exporter') {
                    if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found";
                    } else {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo;
                    }
                    $scope.ReceiverBankAccountList.push(aData);
                }

            })
        });
    }

    $scope.ReceivableReportsUIButton = function () {
        if ($scope.ReceivableReportsUI == 'BankStatementReport') {
            $window.open("#/BankStatementReport", "popup", "width=850,height=550,left=280,top=80");


            $scope.BankStatementReportDate.FromDate = $scope.FromDate;
            $scope.BankStatementReportDate.ToDate = $scope.ToDate;
            $cookieStore.put("BankStatementReportDate", $scope.BankStatementReportDate);
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
        //$scope.ReceivableReportsUI = true;


        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {

                if (aPermissionDetails.FunctionName == 'Bank Statement Report') {
                    $scope.BankStatement = true;
                }
            });
        });
    }


});