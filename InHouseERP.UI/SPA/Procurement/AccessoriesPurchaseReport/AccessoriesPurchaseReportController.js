
app.controller("AccessoriesPurchaseReportController", function ($scope, $cookieStore, $http, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.PurchaseId = $cookieStore.get("PurchaseId");

    Clear();

    function Clear() {
        $scope.AccessoriesPurchaseDetailList = [];
        GetAccessoriesPurchaseDetailForReportByPurchaseId();
    }

    function GetAccessoriesPurchaseDetailForReportByPurchaseId() {
        $http({
            url: '/AccessoriesPurchase/GetAccessoriesPurchaseDetailForReportByPurchaseId?PurchaseId=' + $scope.PurchaseId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.AccessoriesPurchaseDetailList = data;

            $scope.TotalAmount = 0;
            $scope.TotalAmountEx = 0;
            $scope.TotalQuantity = 0;
            $scope.TotalDiscountAmount = 0;
            $scope.TotalVatAmount = 0;
            angular.forEach($scope.AccessoriesPurchaseDetailList, function (aData) {
                $scope.TotalAmount += aData.TotalAmount;
                $scope.TotalQuantity += aData.Quantity;
                $scope.TotalVatAmount += aData.VatAmount;
                $scope.TotalDiscountAmount += aData.DiscountAmount;
                $scope.TotalAmountEx += aData.AmountEx;

                var res1 = aData.PurchaseDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.PurchaseDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.PurchaseDate = date1;
                }
            })


        });
    }

});