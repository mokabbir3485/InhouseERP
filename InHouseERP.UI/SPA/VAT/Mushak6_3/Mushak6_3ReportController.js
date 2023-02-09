app.controller("Mushak6_3ReportController", function ($scope, $cookieStore, $http, $filter) {
    //$scope.LoginUser = $cookieStore.get('UserData');

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    
    $scope.SalesInvoiceId = $cookieStore.get("Mushak6_3SalesInvoiceId");
    //$scope.SalesInvoiceId = $scope.Mushak6_3Obj.SalesInvoiceId;
    //console.log("$scope.BillOfMaterialId ", $scope.BillOfMaterialId);
    $scope.Mushak_6_3DataList = [];
    GetAllMushak_6_3Reportdata();


    //if ($scope.BillOfMaterialObj.HsCode != undefined && $scope.BillOfMaterialObj.SubmitDate != undefined && $scope.BillOfMaterialObj.DeliveryDate != undefined) {
    //    $scope.BillOfMaterialObj.HsCode = $scope.BillOfMaterialObj.HsCode.getDigitBanglaFromEnglish();
    //    $scope.BillOfMaterialObj.SubmitDate = $scope.BillOfMaterialObj.SubmitDate.getDigitBanglaFromEnglish();
    //    $scope.BillOfMaterialObj.DeliveryDate = $scope.BillOfMaterialObj.DeliveryDate.getDigitBanglaFromEnglish();
    //}


    function GetAllMushak_6_3Reportdata() {
        $http({
            url: '/SalesInvoice/GetMushak_6_3BySalesInvoiceId?SalesInvoiceId=' + $scope.SalesInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Mushak_6_3DataList = data;
            $scope.TotalAmount = 0;
            $scope.TotalSDAmount = 0;
            $scope.TotalVatAmount = 0;
            $scope.TotalAmountWithVATAndSD = 0;
            angular.forEach($scope.Mushak_6_3DataList, function (aSd) {
                if (aSd.SalesInvoiceDate) {
                    var res1 = aSd.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesInvoiceDate = date1;
                    }
                }

                $scope.TotalAmount += aSd.Amount;
                $scope.TotalSDAmount += aSd.SDAmount;
                $scope.TotalVatAmount += aSd.VatAmount;
                $scope.TotalAmountWithVATAndSD += aSd.AmountWithVATAndSD;
                aSd.Amount = aSd.Amount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                aSd.SDAmount = aSd.SDAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                aSd.VatAmount = aSd.VatAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                aSd.AmountWithVATAndSD = aSd.AmountWithVATAndSD.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            })
            $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            $scope.TotalSDAmount = $scope.TotalSDAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            $scope.TotalVatAmount = $scope.TotalVatAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            $scope.TotalAmountWithVATAndSD = $scope.TotalAmountWithVATAndSD.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
        });

    }


})