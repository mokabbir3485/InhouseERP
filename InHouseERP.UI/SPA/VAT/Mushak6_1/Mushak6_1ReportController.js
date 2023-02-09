app.controller("Mushak6_1ReportController", function ($scope, $cookieStore, $http, $filter) {

    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.PBId = parseInt(sessionStorage.getItem("PBId"));
    $scope.PBId = $cookieStore.get('PBId');
    $scope.IsLocal = $cookieStore.get('IsLocal');

    $scope.Mushak6_1ReportList = [];
    Get_Mushak6_1Report();
    function Get_Mushak6_1Report() {
        $http({
            url: '/PurchaseBill/Get_Mushak6_1?PBId=' + $scope.PBId + '&IsLocal=' +  $scope.IsLocal,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Mushak6_1ReportList = data;
            angular.forEach(data,function (aData) {
                var res = aData.PBDate.substring(0, 5);
                if (res == "/Date") {
                    var parsedDate = new Date(parseInt(aData.PBDate.substr(6)));
                    aData.PBDate = $filter('date')(parsedDate, 'MMM dd, yyyy');
                }
            })
        });
    }

});