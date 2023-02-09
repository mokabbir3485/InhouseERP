
app.controller("SupplierPaymentHistoryReportController", function ($scope, $filter, $http, $cookieStore, $window) {
    $scope.SupplierPaymentHistoryReportData = $cookieStore.get('SupplierPaymentHistoryReportData');

    Clear();

    function Clear() {
        $scope.ReportName = "Supplier Payment Status";
        $scope.isSupplierPayment = false;
        GetAllSupplierPaymentHistory();

    }
    //var date = new Date();
    //$scope.toDate = $filter('date')(date.toJSON().slice(0, 10), 'MMM dd, yyyy');




    function GetAllSupplierPaymentHistory() {
        $http({
            //url: '/SupplierPaymentAndAdjustment/SupplierIdsAndPaymentIds?supplierIds=' + $scope.SupplierPaymentHistoryReportData.supplierIds + '&paymentIds=' + $scope.SupplierPaymentHistoryReportData.paymentIds + '&FromDate=' + $scope.SupplierPaymentHistoryReportData.FromDate + '&ToDate=' + $scope.SupplierPaymentHistoryReportData.ToDate,
            url: '/SupplierPaymentAndAdjustment/SupplierIdsAndPaymentIds?supplierIds=' + $scope.SupplierPaymentHistoryReportData.supplierIds + '&FromDate=' + $scope.SupplierPaymentHistoryReportData.FromDate + '&ToDate=' + $scope.SupplierPaymentHistoryReportData.ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierPaymentHistory = data;
            $scope.totalAIT = 0;
            $scope.totalVAT = 0;
            $scope.totalAITCal = 0;
            $scope.totalPayableAmount = 0;
            $scope.totalPaid = 0;
            $scope.totalActualAmount = 0;
            $scope.totalAdjustedAmount = 0;
            $scope.Total = 0;
            if ($scope.SupplierPaymentHistory.length != 0) {
                if ($scope.SupplierPaymentHistory.length > 0) {
                    angular.forEach($scope.SupplierPaymentHistory, function (aSd) {

                        $scope.totalAIT += aSd.TotalAIT;
                        $scope.totalVAT += aSd.TotalVAT;
                        $scope.totalActualAmount += aSd.ActualAmount;
                        $scope.totalPayableAmount += aSd.PayableAmount;
                        $scope.totalPaid += aSd.PaidAmount;
                        $scope.totalAdjustedAmount += aSd.AdjustedAmount;

                        $scope.Total += aSd.TotalPaidAmount;
                        var res1 = aSd.PBDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.PBDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.PBDate = date1;
                        }

                    })
                }
            }
            setTimeout(function () {
                $('#MainTable thead tr th:eq(0)').html("S/N");

                $("#MainTable").tablesorter({
                    widgets: ["zebra", "stickyHeaders"],
                    widgetOptions: {},
                    headers: {
                        '#disSort': {
                            sorter: false
                        },
                    }
                });
            }, 1000)
        });
    }

})