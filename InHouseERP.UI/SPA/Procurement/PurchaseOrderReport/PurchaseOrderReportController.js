
app.controller("PurchaseOrderReportController", function ($rootScope, $scope, $window, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.POId = $cookieStore.get("POId");

    Clear();

    function Clear() {

        $scope.PurchaseOrderDetailList = [];
        PurchaseOrderReportGetByPOId();
    }

    function PurchaseOrderReportGetByPOId() {
        $http({
            url: '/PurchaseOrder/GetPurchaseOrderReport?POId=' + $scope.POId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.PurchaseOrderDetailList = data;
            //$window.document.title = 'PurchaseOrder ' + '- ' + $scope.SalesOrderDetailList[0].SalesOrderNo.replaceAll("/", "-");
            if (data.length > 0) {
                $("#htmlTermsAndCondition").html($scope.PurchaseOrderDetailList[0].TermsAndCondition);
                $("#AdditionalInfo").html($scope.PurchaseOrderDetailList[0].AdditionalInfo);
                $scope.SubTotalAmount = 0;
                $scope.TotalAmount = 0;
                angular.forEach($scope.PurchaseOrderDetailList, function (aSd) {

                    var res1 = aSd.PODate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PODate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.PODate = date1;
                    }
                    if (aSd.DeliveryDate) {
                        var res1 = aSd.DeliveryDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.DeliveryDate = date1;
                        }
                    }
                    if (aSd.DemandDate) {
                        var res1 = aSd.DemandDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.DemandDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.DemandDate = date1;
                        }
                    }
                    

                    //aSd.OrderQty = parseFloat(aSd.OrderQty);
                    aSd.UnitPrice = parseFloat(aSd.UnitPrice).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

                    $scope.SubTotalAmount += parseFloat(aSd.Amount);
                    //aSd.AmountExVat = parseFloat(aSd.AmountExVat).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    //aSd.VatAmount = parseFloat(aSd.VatAmount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.Amount = parseFloat(aSd.Amount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    //CPTCost = aSd.CPTCost;
                    //aSd.CPTCost = parseFloat(aSd.CPTCost).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    //aSd.TotalAmt = parseFloat(aSd.TotalAmt).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    //aSd.CPTCost = parseFloat(aSd.CPTCost).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    //aSd.OrderQty = parseFloat(aSd.OrderQty).toLocaleString('en', { minimumFractionDigits: 0 });
                })
                //TotalAmountTemp = TotalAmountTemp + CPTCost;
                $scope.TotalAmount = $scope.SubTotalAmount - $scope.PurchaseOrderDetailList[0].AdditionalDiscount;
                $scope.TotalAmount += $scope.PurchaseOrderDetailList[0].TotalVAT;
                $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                $scope.SubTotalAmount = $scope.SubTotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                $scope.PurchaseOrderDetailList[0].AdditionalDiscount = $scope.PurchaseOrderDetailList[0].AdditionalDiscount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                $scope.PurchaseOrderDetailList[0].TotalVAT = $scope.PurchaseOrderDetailList[0].TotalVAT.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            }
            //$scope.Word =  AmountToWords($scope.SalesOrderDetailList[0].TotalAmt);
            //$scope.Word =  AmountToWords(10.5);
        });
    }




});