
app.controller("SalesProductivtyController", function ($scope, $cookieStore, $window, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    Clear();

    function Clear() {
    

    }

  
});