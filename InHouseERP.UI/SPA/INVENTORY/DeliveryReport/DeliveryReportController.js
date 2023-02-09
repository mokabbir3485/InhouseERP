
app.controller("DeliveryReportController", function ($scope, $cookieStore, $http, $filter) {
   // $scope.LoginUser = $cookieStore.get('UserData');

   

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.deliveryReport = parseInt(sessionStorage.getItem("DeliveryId"));
    $scope.deliveryReport = $cookieStore.get('DeliveryId');
    Clear();

    function Clear() {

        $scope.deliveryReportName = "DELIVERY CHALLAN";
        $scope.DeliveryReportList = [];
        if ($scope.deliveryReport.IsManual == false) {
            GetAllDeliveryReportdata();
        }
        else {
            GetAllManualDeliveryReportDate()
        }
      
    }


    function GetAllDeliveryReportdata() {
        $scope.TotalQty = 0;
        $scope.TotalUnitPrice = 0;
        $scope.TotalAmount = 0;

        $http({
            url: '/Delivery/GetAllDeliveryReport?DeliveryId=' + $scope.deliveryReport.DeliveryId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
         
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.DeliveryDate = date1;
                    };

                    var res2 = aSd.SalesOrderDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aSd.SalesOrderDate = date2;
                    }

                    var TempDeliveryNo = aSd.DeliveryNo.split('/');
                    var AutoNumber = TempDeliveryNo[2];
                    var YearNumber = TempDeliveryNo[1].split('-');
                    aSd.DeliveryNo = YearNumber[0] + '/' + AutoNumber;

                    $scope.TotalQty += aSd.DeliveryQuantity;
                    $scope.TotalUnitPrice += aSd.DeliveryUnitPrice;
                    $scope.TotalAmount += aSd.Amount;
                    aSd.DeliveryQuantity = aSd.DeliveryQuantity.toLocaleString('en');
                    $scope.DeliveryReportList.push(aSd);
                })

            }
            //if (data.length > 0) {
            //    angular.forEach(data, function (aSd) {
                   
            //    })

            //}


        });  
       
    }
   

    function GetAllManualDeliveryReportDate() {
        $scope.TotalQty = 0;
        $scope.TotalUnitPrice = 0;
        $scope.TotalAmount = 0;

        $http({
            url: '/Delivery/GetManualStockDeliveryReport?DeliveryId=' + $scope.deliveryReport.DeliveryId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.DeliveryDate = date1;
                    };

                    var res2 = aSd.SalesOrderDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aSd.SalesOrderDate = date2;
                    }

                    //var TempDeliveryNo = aSd.DeliveryNo.split('-');
                    //var AutoNumber = TempDeliveryNo[1];
                    //var YearNumber = TempDeliveryNo[1].split('-');
                   // aSd.DeliveryNo ='MD'+ '/' + AutoNumber;

                    $scope.TotalQty += aSd.DeliveryQuantity;
                    $scope.TotalUnitPrice += aSd.DeliveryUnitPrice;
                    $scope.TotalAmount += aSd.Amount;
                    aSd.DeliveryQuantity = aSd.DeliveryQuantity.toLocaleString('en');
                    $scope.DeliveryReportList.push(aSd);
                })

            }
            //if (data.length > 0) {
            //    angular.forEach(data, function (aSd) {

            //    })

            //}


        });
    }


});