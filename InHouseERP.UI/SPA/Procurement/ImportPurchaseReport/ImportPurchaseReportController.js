
app.controller("ImportPurchaseReportController", function ($scope, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.PBId = $cookieStore.get("PBId");


    Clear();

    function Clear() {
        $scope.localPBList = [];
        GetLocalPurchaseBill($scope.localPB);
    }

    function GetLocalPurchaseBill() {
        $http({
            url: '/PurchaseBill/ImportPurchaseBillReport?PBId=' + $scope.PBId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.localPBList = data;

            $scope.TotalAmmount = 0;
            $scope.TotalCostAmount = 0;
            $scope.TotalPbQty = 0;
            $scope.TotalDiscount = 0;
            $scope.TotalAfterDiscount = 0;
            $scope.TotalPbPrice = 0;
            $scope.TotalUnitPrice = 0;
          
            angular.forEach($scope.localPBList, function (aData) {
                $scope.TotalAmmount =aData.BillTotal;
                $scope.TotalCostAmount += aData.Amount;
                $scope.TotalPbQty += aData.Qty;
                $scope.TotalDiscount += aData.DiscountAmount;
                $scope.TotalAfterDiscount += aData.TotalCostAfterDiscount;
                $scope.TotalPbPrice += aData.Amount;
                $scope.TotalUnitPrice += aData.UnitPrice;
               
            })

            if (data.length > 0) {
                angular.forEach(data, function (aSd) {

                    var res1 = aSd.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.PBDate = date1;
                    }
                })

            }

        });
    }
    $scope.AmountInBDT=false;
    $scope.ConvertAmount = function () {
        $scope.convertAmoun = $scope.localPBList[0].TotalAditionalAmountAfterDiscount * $scope.localPBList[0].ConversionRate;
       // $scope.AmountInBDT =true;

    }

    ///Amount In Word Number Convert To English

    //var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    //var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    //var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    //var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    //function AmountToWords(s) {
    //    s = s.toString();
    //    s = s.replace(/[\, ]/g, '');
    //    if (s != parseFloat(s)) return 'not a number';
    //    var x = s.indexOf('.');
    //    if (x == -1) x = s.length;
    //    if (x > 15) return 'too big';
    //    var n = s.split('');
    //    var str = '';
    //    var sk = 0;
    //    for (var i = 0; i < x; i++) {
    //        if ((x - i) % 3 == 2) {
    //            if (n[i] == '1') {
    //                str += tn[Number(n[i + 1])] + ' ';
    //                i++;
    //                sk = 1;
    //            }
    //            else if (n[i] != 0) {
    //                str += tw[n[i] - 2] + ' ';
    //                sk = 1;
    //            }
    //        }
    //        else if (n[i] != 0) {
    //            str += dg[n[i]] + ' ';
    //            if ((x - i) % 3 == 0) str += 'hundred ';
    //            sk = 1;
    //        }

    //        if ((x - i) % 3 == 1) {
    //            if (sk) str += th[(x - i - 1) / 3] + ' ';
    //            sk = 0;
    //        }
    //    }
    //    if (x != s.length) {
    //        var y = s.length;
    //        str += 'point ';
    //        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    //    }
    //    return str.replace(/\s+/g, ' ');
    //}

    //var finalEnlishToBanglaNumber1 = [{ id: 1, Taka: 1000000 }, { id: 2, Taka: 1230 }, { id: 3, Taka: 12000 }, { id: 4, Taka: 120.00 }, { id: 5, Taka: 1200.012 }];

    //angular.forEach(finalEnlishToBanglaNumber1, function (adata) {

    //    var item = adata.Taka;
    //    var item12 = AmountToWords(item);
    //    console.log('Test', item12);
    //})



});