
app.controller("SupplierPaymentReportController", function ($scope, $filter, $http, $cookieStore, $window) {
    var SupplierPaymentStr = $cookieStore.get('SupplierPaymentObject');
    if (SupplierPaymentStr != null || SupplierPaymentStr != undefined) {
        $scope.SupplierPayment = JSON.parse(SupplierPaymentStr);
    }

    Clear();

    function Clear() {
        $scope.paymentTypelistFilterData = [];
        $scope.ReportName = "Supplier Payment Report";
        $scope.isSupplierPayment = true;
        SupplierPaymentReport();
    }
    var date = new Date();
    $scope.toDate = $filter('date')(date.toJSON().slice(0, 10), 'MMM dd, yyyy');


    function SupplierPaymentReport() {
        
        $http({
            url: '/SupplierPaymentAndAdjustment/SupplierPaymentReport?SupplierPaymentId=' + $scope.SupplierPayment.SupplierPaymentId + '&IsOpeningPayment=' + $scope.SupplierPayment.IsOpeningPayment,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.paymentTypelistFilterData = data;
            $scope.totalAIT = 0;
            $scope.totalVAT = 0;
            $scope.totalAITCal = 0;
            $scope.totalPayableAmount = 0;
            $scope.totalPaid = 0;
            $scope.Total = 0;
            $scope.totalActualAmount = 0;
            $scope.totalAdditionalCost = 0;

            if ($scope.paymentTypelistFilterData.length !=0) {
                if (data.length > 0) {
                    angular.forEach($scope.paymentTypelistFilterData, function (aSd) {


                        $scope.totalAIT += aSd.TotalAIT;
                        $scope.totalVAT += aSd.TotalVAT;
                        $scope.totalAdditionalCost += aSd.AdditionalCost;
                       // $scope.totalPayableAmount += aSd.PayableAmount;
                        $scope.totalPayableAmount += aSd.ActualAmount - aSd.PaidAmount;
                        $scope.totalAdditionalCost += aSd.AdditionalCost;
                        $scope.totalPaid += aSd.PaidAmount;

                        var total = aSd.PaidAmount + aSd.TotalAIT + aSd.TotalVAT;
                        $scope.Total += total;
                        $scope.totalAITCal = ($scope.totalAIT).toFixed(3)
                        var res1 = aSd.PaymentDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.PaymentDate = date1;
                        }

                    })
                }
            }
          


        });

    }
  
})