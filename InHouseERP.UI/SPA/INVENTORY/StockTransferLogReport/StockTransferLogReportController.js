
app.controller("StockTransferLogReportController", function ($scope, $cookieStore, $http, $filter, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.SubCategoryList = [];
    $scope.DropdowanObj = $cookieStore.get("GetDropdowanValue");

    var stockTransferReportList = sessionStorage.getItem("GetByStockTransferLogReport");
    if (stockTransferReportList != null) {




        $scope.StockStatusListForReport = JSON.parse(stockTransferReportList);

       /* $scope.SubCategoryList = $scope.StockStatusListForReport.filter((Sup, aData, index) => index.findIndex(v => v.SubCategoryName === Sup.SubCategoryName) === aData);*/


        $scope.$StockStatusListForReport = $scope.StockStatusListForReport.reverse();

        $scope.StockStatusListForReport = Array.from(
            $scope.StockStatusListForReport.reduce((m, o) => m.set(o.MaterialTypeName, (m.get(o.MaterialTypeName) || []).concat(o)), new Map),
            ([MaterialTypeName, DataList]) => ({ MaterialTypeName, DataList })
        );






        console.log($scope.StockStatusListForReport);

    }


    


});