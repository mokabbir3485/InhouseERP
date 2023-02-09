
app.controller('BankStatementReportController', function ($http, $scope, $cookieStore, $filter, $cookies) {
    //  $scope.CompanyAdjustmentObj = {};
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.BankStatementReportDate = $cookieStore.get("BankStatementReportDate");

    if ($scope.BankStatementReportDate == null || $scope.BankStatementReportDate == undefined) {
        $scope.FromDate = null;
        $scope.ToDate = null;
    } else {
        $scope.FromDate = $scope.BankStatementReportDate.FromDate;
        $scope.ToDate = $scope.BankStatementReportDate.ToDate;
        $scope.BankAccountId = $scope.BankStatementReportDate.BankAccountId;
    }
    Clear();
    function Clear() {
        $scope.BankStatementList = [];

        GetCompanyBankStatementReport();
        $scope.PrintDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    }

    function GetCompanyBankStatementReport() {
        $http({
            url: '/CompanyPayment/GetCompanyBankStatementReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&BankAccountId=' + $scope.BankAccountId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.BankStatementList = data;
            $scope.TotalPaidAmount = 0;
            $scope.TotalConversionAmount = 0;

            if ($scope.BankStatementList.length > 0) {
                angular.forEach($scope.BankStatementList, function (aData) {
                    var res1 = aData.PaymentDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.PaymentDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.PaymentDate = date1;
                    }

                    $scope.TotalPaidAmount += aData.PaidAmount;
                    $scope.TotalConversionAmount += aData.ConversionAmount;

                    aData.PaidAmount = aData.PaidAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aData.ConversionAmount = aData.ConversionAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                })
                $scope.TotalPaidAmount = $scope.TotalPaidAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                $scope.TotalConversionAmount = $scope.TotalConversionAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            }

        });
    }

});