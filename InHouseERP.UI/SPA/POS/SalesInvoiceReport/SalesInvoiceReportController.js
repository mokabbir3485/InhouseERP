
app.controller("SalesInvoiceReportController", function ($rootScope,$scope, $cookieStore, $http, $filter) {

    //$scope.SalesInvoiceId = parseInt(sessionStorage.getItem("SalesInvoiceId"));
    $scope.aCompanySalesInvoice = $cookieStore.get("aCompanySalesInvoice");
    Clear();
    $scope.Clear = function (ddlCurrency) {
        if (ddlCurrency == undefined) {
            ddlCurrency.CurrencyId = null;
        }
        Clear(ddlCurrency.CurrencyId);
    }
    $scope.count = 0;
    $scope.CurrencyList = [];
    GetAllCurrency();
    function Clear(CurrencyId) {
        $scope.SalesInvoiceReportList = [];
        $scope.ItemMergeChecked = true;
        
        if ($scope.aCompanySalesInvoice.IsManualInvoice) {
            GetAllManualInvoiceReportdata(CurrencyId);
        } else {
            GetAllSalesInvoiceReportdata(CurrencyId);
        }
    }

    $scope.ChangeItemMerge = function () {
        if ($scope.ddlCurrency == undefined) {
            $scope.ddlCurrency = {};
            $scope.ddlCurrency.CurrencyId = null;
        }
        GetAllSalesInvoiceReportdata($scope.ddlCurrency.CurrencyId);
    }
    function GetAllCurrency() {

        $http({
            url: "/SalesOrder/GetAllCurrency",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.CurrencyList = data;
        })
    }

    function GetAllSalesInvoiceReportdata(CurrencyId) {
        $http({
            url: '/SalesInvoice/GetBySalesInvoiceId?SalesInvoiceId=' + $scope.aCompanySalesInvoice.SalesInvoiceId + '&CurrencyId=' + CurrencyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aSd) {
                var TempSalesInvoiceNo = aSd.SalesInvoiceNo.split('/');
                var AutoNumber = TempSalesInvoiceNo[2];
                var YearNumber = TempSalesInvoiceNo[1].split('-');
                aSd.SalesInvoiceNo = YearNumber[0] + '/' + AutoNumber;
            })

            var DeliveryNoArray = data[0].DeliveryNo.split(' & ');
            $scope.DeliveryNoList = [];
            angular.forEach(DeliveryNoArray, function (DeliveryNo) {
                var TempDeliveryNo = DeliveryNo.split('/');
                var AutoNumber = TempDeliveryNo[2];
                var YearNumber = TempDeliveryNo[1].split('-');
                DeliveryNo = YearNumber[0] + '/' + AutoNumber;
                $scope.DeliveryNoList.push(DeliveryNo);
            })
            $scope.DeliveryNo = $scope.DeliveryNoList.join(' & ');

            if ($scope.ItemMergeChecked) {
                data = data.reduce((r, { SalesInvoiceNo, SalesInvoiceDate, ItemId, PcPerRoll, PaperTypeId, LabelBrandId, DeliveryUnitPrice, SalesInvoiceDetailId, CategoryId, SubCategoryId, ItemName, MaterialTypeId, MaterialTypeName, MaterialTypeCode, ItemDescription, LabelBrandName, SalesOrderNo, SalesOrderDate, DeliveryNo, DeliveryDates, PORefNo, PORefDate, SerialNo, DeliveryUnitId, UnitName, DeliveryQuantity, Amount, AmountExVat, AmountInWords, VatAmount, CurrencyShortName, IsOnCredit, CurrencyId, CurrencyShort, ConversionRate, IsVat, VatPercentage, IsCPT, CPTCost, PaymentType, Remarks, CompanyName, CompanyAddress, AddressDelivery, VatChallanNo }) => {
                    var temp = r.find(o => o.ItemId === ItemId && o.MaterialTypeId === MaterialTypeId && o.LabelBrandId === LabelBrandId && o.PcPerRoll === PcPerRoll && o.DeliveryUnitPrice === DeliveryUnitPrice);
                    if (!temp) {
                        r.push({ SalesInvoiceNo, SalesInvoiceDate, ItemId, PcPerRoll, PaperTypeId, LabelBrandId, DeliveryUnitPrice, SalesInvoiceDetailId, CategoryId, SubCategoryId, ItemName, MaterialTypeId, MaterialTypeName, MaterialTypeCode, ItemDescription, LabelBrandName, SalesOrderNo, SalesOrderDate, DeliveryNo, DeliveryDates, PORefNo, PORefDate, SerialNo, DeliveryUnitId, UnitName, DeliveryQuantity, Amount, AmountExVat, AmountInWords, VatAmount, CurrencyShortName, IsOnCredit, CurrencyId, CurrencyShort, ConversionRate, IsVat, VatPercentage, IsCPT, CPTCost, PaymentType, Remarks, CompanyName, CompanyAddress, AddressDelivery, VatChallanNo });
                    } else {
                        temp.DeliveryQuantity += DeliveryQuantity;
                        //temp.VatPercentage += VatPercentage;
                        temp.AmountExVat += AmountExVat;
                        temp.VatAmount += VatAmount;
                        temp.Amount += Amount;
                    }
                    return r;
                }, []);
            }
            

            Calculation(data);
            //$scope.totalPrice = 0;
            //$scope.TotalInWordsAmount = 0;
            //$scope.TotalAmount = 0;
            //$scope.TotalAmountExVat = 0;
            //$scope.TotalVatAmount = 0;
            //var CPTCost = 0;
            //$scope.TotalAmountWithCPT = 0;
            //$scope.SalesInvoiceReportList = data;

            
            //if ($scope.count == 0) {
            //    if ($scope.SalesInvoiceReportList[0].CurrencyId == 2) {
            //        $scope.IsUSD = true;
            //    } else {
            //        $scope.IsUSD = false;
            //    }
                
            //    $scope.count++;
            //}
                
            //if ($scope.SalesInvoiceReportList.length > 0) {
            //    $scope.ddlCurrency = { CurrencyId: $scope.SalesInvoiceReportList[0].CurrencyId }
            //    angular.forEach($scope.SalesInvoiceReportList, function (aSd) {
            //        if (aSd.SalesInvoiceDate) {
            //            var res1 = aSd.SalesInvoiceDate.substring(0, 5);
            //            if (res1 == "/Date") {
            //                var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
            //                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
            //                aSd.SalesInvoiceDate = date1;
            //            }
            //        }
            //        if (aSd.SalesOrderDate) {
            //            var res2 = aSd.SalesOrderDate.substring(0, 5);
            //            if (res2 == "/Date") {
            //                var parsedDate2 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
            //                var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
            //                aSd.SalesOrderDate = date2;
            //            }
                            
            //        }
                        
            //        var TempSalesInvoiceNo = aSd.SalesInvoiceNo.split('/');
            //        var AutoNumber = TempSalesInvoiceNo[2];
            //        var YearNumber = TempSalesInvoiceNo[1].split('-');
            //        aSd.SalesInvoiceNo = YearNumber[0] + '/' + AutoNumber;

            //        $scope.TotalAmount += aSd.Amount;
            //        $scope.TotalAmountExVat += aSd.AmountExVat;
            //        $scope.TotalVatAmount += aSd.VatAmount;
            //        $scope.totalPrice += aSd.DeliveryUnitPrice;
            //        aSd.DeliveryUnitPrice = aSd.DeliveryUnitPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //        aSd.Amount = aSd.Amount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //        CPTCost = aSd.CPTCost;
            //        aSd.CPTCost = aSd.CPTCost.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //    })
            //    $scope.TotalAmountWithCPT = $scope.TotalAmount + CPTCost;
            //    $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //    $scope.TotalAmountExVat = $scope.TotalAmountExVat.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //    $scope.TotalVatAmount = $scope.TotalVatAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //    $scope.TotalAmountWithCPT = $scope.TotalAmountWithCPT.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //}
            


        });

        }
    function GetAllManualInvoiceReportdata() {
        $http({
            url: '/SalesInvoice/GetByManualInvoiceId?ManualInvoiceId=' + $scope.aCompanySalesInvoice.ManualInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            Calculation(data);
            //$scope.totalPrice = 0;
            //$scope.TotalInWordsAmount = 0;
            //$scope.TotalAmount = 0;
            //$scope.TotalAmountExVat = 0;
            //$scope.TotalVatAmount = 0;
            //$scope.SalesInvoiceReportList = data;

            //if ($scope.SalesInvoiceReportList.length > 0) {
            //    $scope.ddlCurrency = { CurrencyId: $scope.SalesInvoiceReportList[0].CurrencyId }

            //    angular.forEach($scope.SalesInvoiceReportList, function (aSd) {
            //        if (aSd.SalesInvoiceDate) {
            //            var res1 = aSd.SalesInvoiceDate.substring(0, 5);
            //            if (res1 == "/Date") {
            //                var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
            //                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
            //                aSd.SalesInvoiceDate = date1;
            //            }
            //        }
            //        if (aSd.SalesOrderDate) {
            //            var res2 = aSd.SalesOrderDate.substring(0, 5);
            //            if (res2 == "/Date") {
            //                var parsedDate2 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
            //                var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
            //                aSd.SalesOrderDate = date2;
            //            }
                            
            //        }

            //        $scope.TotalAmount += aSd.Amount;
            //        $scope.TotalAmountExVat += aSd.AmountExVat;
            //        $scope.TotalVatAmount += aSd.VatAmount;
            //        $scope.totalPrice += aSd.DeliveryUnitPrice;
            //        aSd.DeliveryUnitPrice = aSd.DeliveryUnitPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //        aSd.Amount = aSd.Amount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                        
            //    })
            //    $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //    $scope.TotalAmountExVat = $scope.TotalAmountExVat.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //    $scope.TotalVatAmount = $scope.TotalVatAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            //}
            

            //$scope.TotalInWordsAmount = AmountToWords($scope.TotalAmount);


        });

        

    }
    function Calculation(data) {

        $scope.totalPrice = 0;
        $scope.TotalInWordsAmount = 0;
        $scope.TotalAmount = 0;
        $scope.TotalAmountExVat = 0;
        $scope.TotalVatAmount = 0;
        var CPTCost = 0;
        $scope.TotalAmountWithCPT = 0;
        $scope.SalesInvoiceReportList = data;


        if ($scope.count == 0) {
            if ($scope.SalesInvoiceReportList[0].CurrencyId == 2) {
                $scope.IsUSD = true;
            } else {
                $scope.IsUSD = false;
            }

            $scope.count++;
        }

        if ($scope.SalesInvoiceReportList.length > 0) {
            $scope.ddlCurrency = { CurrencyId: $scope.SalesInvoiceReportList[0].CurrencyId }
            angular.forEach($scope.SalesInvoiceReportList, function (aSd) {
                if (aSd.SalesInvoiceDate) {
                    var res1 = aSd.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesInvoiceDate = date1;
                    }
                }
                if (aSd.SalesOrderDate) {
                    var res2 = aSd.SalesOrderDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aSd.SalesOrderDate = date2;
                    }

                }

                

                $scope.TotalAmount += aSd.Amount;
                $scope.TotalAmountExVat += aSd.AmountExVat;
                $scope.TotalVatAmount += aSd.VatAmount;
                $scope.totalPrice += aSd.DeliveryUnitPrice;
                aSd.DeliveryUnitPrice = aSd.DeliveryUnitPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                aSd.Amount = aSd.Amount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                CPTCost = aSd.CPTCost;
                aSd.CPTCost = aSd.CPTCost.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            })
            $scope.TotalAmountWithCPT = $scope.TotalAmount + CPTCost;
            $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            $scope.TotalAmountExVat = $scope.TotalAmountExVat.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            $scope.TotalVatAmount = $scope.TotalVatAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            $scope.TotalAmountWithCPT = $scope.TotalAmountWithCPT.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
        }
    }
    


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

  
});




