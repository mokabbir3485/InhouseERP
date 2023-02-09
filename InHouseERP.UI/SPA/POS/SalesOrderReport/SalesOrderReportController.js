
app.controller("SalesOrderReportController", function ($rootScope,$scope, $window, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.SalesOrderId = parseInt(sessionStorage.getItem("SalesOrderId"));
    $scope.SalesOrderId = $cookieStore.get("SalesOrderId");

    Clear();

    function Clear() {

        $scope.SalesOrderDetailList = [];
        SalesOrderReportGetBySalesOrderId();
    }

    function SalesOrderReportGetBySalesOrderId() {
        $http({
            url: '/SalesOrder/SalesOrderReportGetBySalesOrderId?SalesOrderId=' + $scope.SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.SalesOrderDetailList = data;
            $window.document.title = 'SalesOrder ' + '- ' + $scope.SalesOrderDetailList[0].SalesOrderNo.replaceAll("/", "-");
            if (data.length > 0) {
                var TotalAmountTemp = 0;
                var CPTCost = 0;
                angular.forEach($scope.SalesOrderDetailList, function (aSd) {
                    aSd.ErrorColor = '';
                    if (aSd.OrderQty <= 999 && aSd.OrderUnitId == 1) {
                        aSd.ErrorColor = 'ColorRed';
                    }

                    if (aSd.OrderQty > 999 && aSd.OrderUnitId == 2) {
                        aSd.ErrorColor = 'ColorRed';
                    } 


                    var res1 = aSd.SalesOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesOrderDate = date1;
                    }

                    aSd.OrderQty = parseFloat(aSd.OrderQty);
                    aSd.OrderPrice = parseFloat(aSd.OrderPrice).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

                    TotalAmountTemp += parseFloat(aSd.Amount);
                    aSd.AmountExVat = parseFloat(aSd.AmountExVat).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.VatAmount = parseFloat(aSd.VatAmount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.Amount = parseFloat(aSd.Amount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    CPTCost = aSd.CPTCost;
                    aSd.CPTCost = parseFloat(aSd.CPTCost).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.TotalAmt = parseFloat(aSd.TotalAmt).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.CPTCost = parseFloat(aSd.CPTCost).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.OrderQty = parseFloat(aSd.OrderQty).toLocaleString('en', { minimumFractionDigits: 0 });
                })
                TotalAmountTemp = TotalAmountTemp + CPTCost;
                $scope.TotalAmount = TotalAmountTemp.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

                //var num = 20000000;
                //$scope.TotalAmount = num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            }
            //$scope.Word =  AmountToWords($scope.SalesOrderDetailList[0].TotalAmt);
            //$scope.Word =  AmountToWords(10.5);
        });
    }

    ///Amount In Word Number Convert To English

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