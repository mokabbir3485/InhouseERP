
app.controller("InternalStockIssueReportController", function ($scope, $cookieStore, $http, $filter) {
    // $scope.LoginUser = $cookieStore.get('UserData');
    // $scope.StockRecive = $cookieStore.get('StockRecive');

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.StockIssueId = $cookieStore.get("InternalStockIssue");


    Clear();

    function Clear() {
        $scope.name = "Internal Stock Issue Report";
        $scope.IssueReportList = [];
        GetAllIssue();
    }


    function GetAllIssue() {


        $http({
            url: '/Issue/InternalStockIssueIssuedForReport?StockIssueId=' + $scope.StockIssueId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.IssueReportList = data;
            if ($scope.IssueReportList.length > 0) {
                angular.forEach($scope.IssueReportList, function (sR) {
                    if (sR.IssueDate) {
                        var res1 = sR.IssueDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(sR.IssueDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            sR.IssueDate = date1;
                        }
                    }
                })

            }

        })

    }

});