app.controller("StockDeclarationReportController", function ($scope, $cookieStore, $http, $filter) {
    // $scope.LoginUser = $cookieStore.get('UserData');
    // $scope.StockRecive = $cookieStore.get('StockRecive');

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.DeclarationId = $cookieStore.get("StockDeclaration");


    Clear();

    function Clear() {
        $scope.name = "Stock Declaration Report";
        $scope.StockDeclarationList = [];
        StockDeclaration();
    }


    function StockDeclaration() {


        $http({
            url: '/StockDeclaration/StockDeclarationDetailGetById?DeclarationId=' + $scope.DeclarationId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            

            $scope.TotalQty = 0;
            $scope.TotalUnitPrice = 0;
            $scope.TotalAmount = 0;

            if (data.length > 0) {
                angular.forEach(data, function (sDecl) {
                   
                    var res1 = sDecl.DeclarationDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(sDecl.DeclarationDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        sDecl.DeclarationDate = date1;
                        $scope.TotalQty += sDecl.DeclarationQuantity;
                        $scope.TotalUnitPrice += sDecl.DeclarationUnitPrice;
                        $scope.TotalAmount += sDecl.Amount;
                    }
                    $scope.StockDeclarationList.push(sDecl);
                })

            }

        })

    }

});