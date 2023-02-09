
app.controller("ReceiptVoucherReportController", function ($scope, $cookieStore, $http, $filter) {

    //$scope.SalesInvoiceId = parseInt(sessionStorage.getItem("SalesInvoiceId"));
    $scope.CompanyPaymentId = $cookieStore.get("CompanyPaymentId");
    Clear();

    function Clear() {

        $scope.SalesInvoiceReportName = "SALES INVOICE";
        $scope.SalesInvoiceReportList = [];
        GetAllSalesInvoiceReportdata();
        $scope.DeliveryIdsList = [];
    }


    function GetAllSalesInvoiceReportdata() {
        $http({
            url: '/SalesInvoice/GetBySalesInvoiceId?SalesInvoiceId=' + $scope.SalesInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.totalPrice = 0;
            $scope.totalQty = 0;
            $scope.TotalInWordsAmount = 0;
            $scope.TotalAmount = 0;
            $scope.SalesInvoiceReportList = data;

            if ($scope.SalesInvoiceReportList.length > 0) {
                angular.forEach($scope.SalesInvoiceReportList, function (aSd) {
                    var res1 = aSd.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesInvoiceDate = date1;
                    }
                })

            }

            if ($scope.SalesInvoiceReportList.length > 0) {
                angular.forEach($scope.SalesInvoiceReportList, function (aSd) {
                    var res2 = aSd.SalesOrderDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aSd.SalesOrderDate = date2;
                    }
                    $scope.TotalAmount += aSd.Amount;
                })

            }

            if ($scope.SalesInvoiceReportList.length > 0) {
                angular.forEach($scope.SalesInvoiceReportList, function (aSd) {
                    var res3 = aSd.DeliveryDate.substring(0, 5);
                    if (res3 == "/Date") {
                        var parsedDate3 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                        var date3 = ($filter('date')(parsedDate3, 'MMM dd, yyyy')).toString();
                        aSd.DeliveryDate = date3;
                    }
                })

            }
            angular.forEach(data, function (adata) {
                $scope.totalPrice += adata.DeliveryUnitPrice;

                $scope.totalQty += adata.DeliveryQuantity;

            })
            $scope.TotalInWordsAmount = AmountToWords($scope.TotalAmount);
            var arrPI = $scope.SalesInvoiceReportList[0].DeliveryNo.split(" & ");
            var arrDate = $scope.SalesInvoiceReportList[0].DeliveryDates.split(" & ");
            var dateTime = [];
            $scope.DeliveryList = [];
            for (var i in arrPI) {

                var timeIndex = i;
                var startTime = arrDate[timeIndex]
                dateTime.push([arrPI[i], startTime].join(' , '))
            }

            var res = dateTime.join(" & ");

            $scope.DeliveryNos = res.replaceAll(",", ", Dt: ");
            $scope.DeliveryList = $scope.DeliveryNos.split(" & ");

        });

    }


    var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function AmountToWords(s) {
        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s)) return 'not a number';
        var x = s.indexOf('.');
        if (x == -1) x = s.length;
        if (x > 15) return 'too big';
        var n = s.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                }
                else if (n[i] != 0) {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            }
            else if (n[i] != 0) {
                str += dg[n[i]] + ' ';
                if ((x - i) % 3 == 0) str += 'hundred ';
                sk = 1;
            }

            if ((x - i) % 3 == 1) {
                if (sk) str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }
        if (x != s.length) {
            var y = s.length;
            str += 'point ';
            for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
        }
        return str.replace(/\s+/g, ' ');
    }


});




