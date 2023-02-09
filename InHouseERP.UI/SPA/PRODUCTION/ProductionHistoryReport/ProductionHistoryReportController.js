app.controller("ProductionHistoryReportController", function ($scope, $cookieStore, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.ScreenId = parseInt(sessionStorage.getItem("ProductionHistoryReportScreenId"));
    $scope.ProductionHistoryReportDate = $cookieStore.get("ProductionHistoryReportDate");

    if ($scope.ProductionHistoryReportDate == null || $scope.ProductionHistoryReportDate == undefined) {
        $scope.FromDate = null;
        $scope.ToDate = null;
    } else {
        $scope.FromDate = $scope.ProductionHistoryReportDate.FromDate;
        $scope.ToDate = $scope.ProductionHistoryReportDate.ToDate;
    }


    Clear();

    function Clear() {
        ProductionHistoryReport();
        $scope.ProductionHistoryList = [];
    }


    function ProductionHistoryReport() {
        $scope.TotalProductionQuantity = 0;
        $scope.TotalUsedMaterialQtyInRoll = 0;
        $scope.TotalWastageQty = 0;
        $http({
            url: '/Production/ProductionHistoryReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ProductionHistoryList = data;
            angular.forEach($scope.ProductionHistoryList, function (aData) {
                var res1 = aData.ProductionDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.ProductionDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.ProductionDate = date1;
                };

                var res2 = aData.InternalWorkOrderDate.substring(0, 5);
                if (res2 == "/Date") {
                    var parsedDate2 = new Date(parseInt(aData.InternalWorkOrderDate.substr(6)));
                    var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                    aData.InternalWorkOrderDate = date2;
                };

                $scope.TotalProductionQuantity += aData.ProductionQuantity;
                $scope.TotalUsedMaterialQtyInRoll += aData.UsedMaterialQtyInRoll;
                $scope.TotalWastageQty += aData.WastageQty;

            });

            $scope.ProductionHistoryList = Array.from(
                $scope.ProductionHistoryList.reduce((m, o) => m.set(o.ProductionNo, (m.get(o.ProductionNo) || []).concat(o)), new Map),
                ([ProductionNo, events]) => ({ ProductionNo, events })
            );
        });
    }
});