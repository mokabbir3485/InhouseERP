
app.controller("DeliveryHistoryReportController", function ($scope, $cookieStore, $http, $filter, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.StockIssue = $cookieStore.get("DeliveryHistory");

    Clear();

    function Clear() {
        $scope.DeliveryHistoryList = [];
        $scope.DeliveryHistoryFilterList = [];
        GetDeliveryHistory();
        $scope.Totalissue = 0;
    }


    function GetDeliveryHistory() {

        $http({
            url: '/Delivery/GetByDeliveryHistory?FromDate=' + $scope.StockIssue.FromDate + "&ToDate=" + $scope.StockIssue.ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.DeliveryHistoryList = data;
            angular.forEach(data, function (aData) {
                $scope.Totalissue += aData.DeliveryQuantity;
                var res1 = aData.DeliveryDate.substring(0, 5);

                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.DeliveryDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.DeliveryDate = date1;
                }


            })

           



            $scope.$DeliveryHistoryList = $scope.DeliveryHistoryList;

            $scope.DeliveryHistoryList = Array.from(
                $scope.DeliveryHistoryList.reduce((m, o) => m.set(o.DeliveryNo, (m.get(o.DeliveryNo) || []).concat(o)), new Map),
                ([DeliveryNo, DataList]) => ({ DeliveryNo, DataList })
            );


            //angular.forEach($scope.$StockIssueHistoryList, function (aItem) {




            //    angular.forEach($scope.StockIssueHistoryList,function (aData) {
            //        aData.InternalWorkOrderNo = aItem.InternalWorkOrderNo;
            //    })
            //})

            console.log('$scope.StockIssueHistoryList', $scope.StockIssueHistoryList);

        });


    }


});