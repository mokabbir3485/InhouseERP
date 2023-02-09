
app.controller("ProductionReportController", function ($scope, $cookieStore, $http, $window, $filter) {
   
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.BranchAddress = $scope.LoginUser.Address;
   // $scope.productionId = JSON.parse(sessionStorage.getItem("productionId"));
    $scope.productionId = $cookieStore.get("productionId");

    Clear();
    function Clear() {
        $scope.name = "Production Report";

        $scope.ProductionList = [];
     
        GetAllProductionreportData();
       
    }



    function GetAllProductionreportData() {
        $http({
            url: '/Production/ProductionReport?ProductionId=' + $scope.productionId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           
            $scope.ProductionList = data;
            $scope.WastageQtyPercent= 0;
            if (data.length > 0) {
                angular.forEach(data, function (aIssue) {
                    var res1 = aIssue.ProductionDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aIssue.ProductionDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aIssue.ProductionDate = date1;
                    }

                   // aIssue.WastageQtyParcentage = Number(((aIssue.WastageQty * 100) / aIssue.AttainableQantity).toFixed(4));
                  //  aIssue.WastageQtyParcentage = Number((aIssue.WastageQty * 100).toFixed(4));
                    aIssue.WastageQtyParcentage = Number(((aIssue.WastageQty * 100) / (aIssue.AttainableQty)).toFixed(3))

                  
                })

            }

        });
    }

});
