app.controller("SalesProductivityReportController", function ($scope, $cookieStore, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.SalesProductivityReportData = $cookieStore.get("SalesProductivityReportDate");


    Clear();

    function Clear() {
        SalesProductivityReport();
        $scope.SalesProductivityList = [];
    }


    

    function SalesProductivityReport() {

        $http({
            url: '/SalesOrder/SalesProductivityReport',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesProductivityList = data;

            $scope.DataList = [];
            $scope.Header = [];

            angular.forEach($scope.SalesProductivityList, function (item, idx) {
                $scope.ItemRow = Object.keys(item).map(e => item[e]);
                $scope.DataList.push($scope.ItemRow);
                $scope.Header = Object.getOwnPropertyNames(item);
            });

        });
    }
});