app.controller("CompanyWiseTotalSalesReportController", function ($rootScope,$scope, $cookieStore, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.ScreenId = parseInt(sessionStorage.getItem("CompanyWiseTotalSalesScreenId"));
    $scope.CompanyWiseTotalSalesReportDate = $cookieStore.get("CompanyWiseTotalSalesReportDate");

    if ($scope.CompanyWiseTotalSalesReportDate == null || $scope.CompanyWiseTotalSalesReportDate == undefined) {
        $scope.SalesOrderType = null;
        $scope.SectionId = null;
        $scope.EmployeeId = null;
        $scope.CompanyId = null;
        $scope.FromDate = null;
        $scope.ToDate = null;
    } else {
        $scope.SalesOrderType = $scope.CompanyWiseTotalSalesReportDate.SalesOrderType;
        $scope.SectionId = $scope.CompanyWiseTotalSalesReportDate.SectionId;
        $scope.EmployeeId = $scope.CompanyWiseTotalSalesReportDate.EmployeeId;
        $scope.IndividualOrTeam = $scope.CompanyWiseTotalSalesReportDate.IndividualOrTeam;
        $scope.CompanyId = $scope.CompanyWiseTotalSalesReportDate.CompanyId;
        $scope.FromDate = $scope.CompanyWiseTotalSalesReportDate.FromDate;
        $scope.ToDate = $scope.CompanyWiseTotalSalesReportDate.ToDate;
    }


    Clear();

    function Clear() {
        CompanyWiseTotalSalesReport();
        //SalesTestReport();
        //$scope.SalesProductivityList = [];
        $scope.CompanyWiseTotalSalesList = [];
    }


    function CompanyWiseTotalSalesReport() {
        var url = '';
        if ($scope.IndividualOrTeam == 'Individual') {
            url = '/SalesOrder/SalesRegisterReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&SalesOrderType=' + $scope.SalesOrderType + '&EmployeeId=' + $scope.EmployeeId + '&companyId=' + $scope.CompanyId;
        } else if ($scope.IndividualOrTeam == 'Team') {
            url = '/SalesOrder/SalesRegisterReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&SalesOrderType=' + $scope.SalesOrderType + '&sectionId=' + $scope.SectionId + '&companyId=' + $scope.CompanyId;
        }
        $http({
            url: url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyWiseTotalSalesList = data;

            $scope.TotalAmount = 0;
            angular.forEach($scope.CompanyWiseTotalSalesList, function (aData) {
                $scope.TotalAmount += aData.Amount;
                //aData.CompanySubTotal = 1000.00;
                //aData.TotalAmount = Number((aData.TotalAmount).toFixed(3));
                var res1 = aData.SalesOrderDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.SalesOrderDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.SalesOrderDate = date1;
                };

                aData.Amount = aData.Amount.toLocaleString('en');
                aData.CompanySubTotal = aData.CompanySubTotal.toLocaleString('en');

            });
            $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en');

            $scope.$CompanyWiseTotalSalesList = $scope.CompanyWiseTotalSalesList;
            $scope.CompanyWiseTotalSalesList = Array.from(
                $scope.CompanyWiseTotalSalesList.reduce((m, o) => m.set(o.CompanyId, (m.get(o.CompanyId) || []).concat(o)), new Map),
                ([CompanyId, events]) => ({ CompanyId, events })
            );

            
        });
    }

});