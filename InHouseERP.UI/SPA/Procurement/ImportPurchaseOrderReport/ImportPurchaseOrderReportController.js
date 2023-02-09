
app.controller("ImportPurchaseOrderReportController", function ($rootScope, $scope, $window, $cookieStore, $http, $filter) {
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
            $scope.ShowCase = [];
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
                    var res1 = aSd.DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.DeliveryDate = date1;
                    }
                    var res1 = aSd.DemandDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DemandDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.DemandDate = date1;
                    }

                    aSd.UnitPrice = parseFloat(aSd.UnitPrice).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

                    $scope.SubTotalAmount += parseFloat(aSd.Amount);
                    aSd.Amount = parseFloat(aSd.Amount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

                })
                $scope.TotalAmount = $scope.SubTotalAmount - $scope.PurchaseOrderDetailList[0].AdditionalDiscount;
                $scope.TotalAmount += $scope.PurchaseOrderDetailList[0].TotalVAT;
                $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                $scope.SubTotalAmount = $scope.SubTotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                $scope.PurchaseOrderDetailList[0].AdditionalDiscount = $scope.PurchaseOrderDetailList[0].AdditionalDiscount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                $scope.PurchaseOrderDetailList[0].TotalVAT = $scope.PurchaseOrderDetailList[0].TotalVAT.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });


                //$scope.PartCodeNo = $scope.PurchaseOrderDetailList.find(item => item.PartCodeNo === '').PartCodeNo;
                //$scope.ItemName = $scope.PurchaseOrderDetailList.find(item => item.ItemName === '').ItemName;
                //$scope.ItemDescriptionTwo = $scope.PurchaseOrderDetailList.find(item => item.ItemDescriptionTwo === '').ItemDescriptionTwo;
                //$scope.ItemCode = $scope.PurchaseOrderDetailList.find(item => item.ItemCode === '').ItemCode;
                //$scope.MaterialTypeCode = $scope.PurchaseOrderDetailList.find(item => item.MaterialTypeCode === null).MaterialTypeCode;
                //$scope.SquareMeter = $scope.PurchaseOrderDetailList.find(item => item.SquareMeter === 0).SquareMeter;
                //$scope.SquareMeterPrice = $scope.PurchaseOrderDetailList.find(item => item.SquareMeterPrice === 0).SquareMeterPrice;
                //$scope.RollDirection = $scope.PurchaseOrderDetailList.find(item => item.RollDirection === '').RollDirection;
                //$scope.TotalReels = $scope.PurchaseOrderDetailList.find(item => item.TotalReels === 0).TotalReels;
                //$scope.CuttingSize = $scope.PurchaseOrderDetailList.find(item => item.CuttingSize === '').TotalReels;
                //$scope.CuttingQuantity = $scope.PurchaseOrderDetailList.find(item => item.CuttingQuantity === 0).CuttingQuantity;

                $scope.PartCodeNo = $scope.PurchaseOrderDetailList.find(item => item.PartCodeNo !== '');
                $scope.ItemName = $scope.PurchaseOrderDetailList.find(item => item.ItemName !== '');
                $scope.ItemDescriptionTwo = $scope.PurchaseOrderDetailList.find(item => item.ItemDescriptionTwo !== '');
                $scope.ItemCode = $scope.PurchaseOrderDetailList.find(item => item.ItemCode !== '');
                $scope.MaterialTypeCode = $scope.PurchaseOrderDetailList.find(item => item.MaterialTypeCode !== null);
                $scope.SquareMeter = $scope.PurchaseOrderDetailList.find(item => item.SquareMeter !== 0);
                $scope.SquareMeterPrice = $scope.PurchaseOrderDetailList.find(item => item.SquareMeterPrice !== 0);
                $scope.RollDirection = $scope.PurchaseOrderDetailList.find(item => item.RollDirection !== '');
                $scope.TotalReels = $scope.PurchaseOrderDetailList.find(item => item.TotalReels !== 0);
                $scope.CuttingSize = $scope.PurchaseOrderDetailList.find(item => item.CuttingSize !== '');
                $scope.CuttingQuantity = $scope.PurchaseOrderDetailList.find(item => item.CuttingQuantity !== 0);


            }
        });
    }




});