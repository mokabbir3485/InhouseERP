app.controller("StockReciveReportController", function ($scope, $cookieStore, $http, $filter) {
   // $scope.LoginUser = $cookieStore.get('UserData');
   // $scope.StockRecive = $cookieStore.get('StockRecive');

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.StockRecive = $cookieStore.get("StockRecive");
  

    Clear();

    function Clear() {
        $scope.name = "Stock Receive Report";
        $scope.StockReciveList = [];
        GetAllStockRecived();
    }


    function GetAllStockRecived() {
        

        $http({
            url: '/Receive/GetByStockRecivedId?SRId=' + $scope.StockRecive.SRId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.StockReciveList = data;



            if ($scope.StockReciveList.length > 0) {
                angular.forEach($scope.StockReciveList, function (sR) {
                    if (sR.ReceiveDate) {
                        var res1 = sR.ReceiveDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(sR.ReceiveDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            sR.ReceiveDate = date1;
                        }
                    }
                    

                    if (sR.PBDate) {
                        var res2 = sR.PBDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate2 = new Date(parseInt(sR.PBDate.substr(6)));
                            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                            sR.PBDate = date2;
                        }
                    }
                })

            }
          
        })

    }

});