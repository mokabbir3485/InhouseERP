app.controller("Mushak6_2ReportController", function ($scope, $cookieStore, $http, $filter) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    $scope.PBId = $cookieStore.get('PBId');


    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    Clear();

    function Clear() {
        $scope.Mushak6_2ReportList = [];
        Get_Mushak6_2Report();
    }

    function Get_Mushak6_2Report() {
        $http({
            url: '/PurchaseBill/Get_Mushak6_2?PBId=' + $scope.PBId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Mushak6_2ReportList = data;
            angular.forEach(data, function (aData) {
                var res = aData.PBDate.substring(0, 5);
                if (res == "/Date") {
                    var parsedDate = new Date(parseInt(aData.PBDate.substr(6)));
                    aData.PBDate = $filter('date')(parsedDate, 'MMM dd, yyyy');
                }
            });
        });
    }



});
