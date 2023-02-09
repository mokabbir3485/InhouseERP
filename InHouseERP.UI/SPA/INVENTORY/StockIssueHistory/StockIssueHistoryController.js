
app.controller("StockIssueHistoryController", function ($scope, $cookieStore, $http, $filter, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.StockIssue = $cookieStore.get("StockIssueHistory");

    Clear();

    function Clear() {
        $scope.StockIssueHistoryList = [];
        $scope.StockIssueFilterList = [];
        GetStockIssueHistory();
        $scope.Totalissue = 0;
    }


    function GetStockIssueHistory() {

        $http({
            url: '/Issue/GetByIssueHistory?FromDate=' + $scope.StockIssue.FromDate + "&ToDate=" + $scope.StockIssue.ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.StockIssueHistoryList = data;
            angular.forEach(data, function (aData) {
                $scope.Totalissue += aData.IssueQuantity;
                var res1 = aData.IssueDate.substring(0, 5);
              
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.IssueDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.IssueDate = date1;
                }

               
            })

            angular.forEach(data, function (aData) {
              
                var res2 = aData.RequisitionDate.substring(0, 5);

                if (res2 =="/Date") {
                    var parsedDate2 = new Date(parseInt(aData.RequisitionDate.substr(6)));
                    var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                    aData.RequisitionDate = date2;

                }


            })

           

            $scope.$StockIssueHistoryList = $scope.StockIssueHistoryList;

            $scope.StockIssueHistoryList = Array.from(
                $scope.StockIssueHistoryList.reduce((m, o) => m.set(o.IssueNo,(m.get(o.IssueNo) || []).concat(o)), new Map),
                ([IssueNo,  DataList]) => ({ IssueNo, DataList })
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