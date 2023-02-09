
app.controller("StockStatusReportController", function ($scope, $cookieStore, $http, $filter, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.SubCategoryList = [];
    $scope.DropdowanObj = $cookieStore.get("GetDropdowanValue");

    var SupplierLedgerList = sessionStorage.getItem("StockStatusReport");
    if (SupplierLedgerList != null) {

       
      

        $scope.StockStatusListForReport = JSON.parse(SupplierLedgerList);

        $scope.SubCategoryList = $scope.StockStatusListForReport.filter((Sup, aData, index) => index.findIndex(v => v.SubCategoryName === Sup.SubCategoryName) === aData);
     

        $scope.$StockStatusListForReport = $scope.StockStatusListForReport;

        $scope.StockStatusListForReport = Array.from(
            $scope.StockStatusListForReport.reduce((m, o) => m.set(o.MaterialTypeName, (m.get(o.MaterialTypeName) || []).concat(o)), new Map),
            ([MaterialTypeName, DataList]) => ({ MaterialTypeName, DataList })
        );


     

      

        console.log($scope.StockStatusListForReport);
      
    }


    function Clear() {
      //  GetStockStatus();
      
    }


    //function GetStockStatus() {

    //    $http({
    //        url: '/Receive/GetStockStatus?StatusDate=' + $scope.FromDate + "&DepartmentId=" + $scope.ddlStore.DepartmentId + "&SubCategoryIds=" + $scope.SubCategoryIds,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        $scope.StockStatusList = data;
    //        angular.forEach($scope.StockStatusList, function (aData) {
    //            var res1 = aData.LedgerDate.substring(0, 5);
    //            if (res1 == "/Date") {
    //                var parsedDate1 = new Date(parseInt(aData.LedgerDate.substr(6)));
    //                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
    //                aData.LedgerDate = date1;
    //            }
    //        })

    //        $scope.$StockStatusList = $scope.StockStatusList;

    //        $scope.StockStatusList = Array.from(
    //            $scope.StockStatusList.reduce((m, o) => m.set(o.SubCategoryName, (m.get(o.SubCategoryName) || []).concat(o)), new Map),
    //            ([SubCategoryName, DataList]) => ({ SubCategoryName, DataList })
    //        );


    //    });


    //}


});