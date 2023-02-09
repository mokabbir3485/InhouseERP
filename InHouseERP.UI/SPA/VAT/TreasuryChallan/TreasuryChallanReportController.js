app.controller("TreasuryChallanReportController", function ($scope, $cookieStore, $http, $filter) {
    //$scope.LoginUser = $cookieStore.get('UserData');

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.TDSIssue = $cookieStore.get("TDSIssue");

   

    if ($scope.TDSIssue.IsVdsFlag == false) {
        GetVat_TDS_GetByTDSIssueId();
        function GetVat_TDS_GetByTDSIssueId() {
            $http({
                url: '/PurchaseAcknowledgement/GetVat_TDS_GetByTDSIssueId?TDSIssueId=' + $scope.TDSIssue.TDSIssueId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.Vat_TDSList = data;
                angular.forEach($scope.Vat_TDSList, function (aSd) {
                    aSd.CodeNo = aSd.CodeNo.split("");
                    aSd.AITAmount = aSd.AITAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.TotalAITAmount = aSd.TotalAITAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.VatTaxAmount = aSd.AITAmount;
                    aSd.TotalAmount = aSd.TotalAITAmount;
                    aSd.TotalAmountInWords = aSd.TotalAITAmountInWords;
                    if (aSd.ChallanDate) {
                        var res1 = aSd.ChallanDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.ChallanDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.ChallanDate = date1;
                        }
                    }
                    if (aSd.TDSIssueDate) {
                        var res1 = aSd.TDSIssueDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.TDSIssueDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.TDSIssueDate = date1;
                        }
                    }
                    if (aSd.PaymentDate) {
                        var res1 = aSd.PaymentDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.PaymentDate = date1;
                        }
                    }


                })

            });

        }
    } else {
        GetVat_VDS_GetByTDSIssueId();
        function GetVat_VDS_GetByTDSIssueId() {
            $http({
                url: '/VAT/GetVat_TDS_GetByTDSIssueId?VDSIssueId=' + $scope.TDSIssue.VDSIssueId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.Vat_TDSList = data;
                angular.forEach($scope.Vat_TDSList, function (aSd) {
                    aSd.CodeNo = aSd.CodeNo.split("");
                    aSd.VDSAmount = aSd.VDSAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.TotalVDSAmount = aSd.TotalVDSAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.VatTaxAmount = aSd.VDSAmount;
                    aSd.TotalAmount = aSd.TotalVDSAmount;
                  
                    aSd.TotalAmountInWords = aSd.TotalVDSAmountInWords;
                    if (aSd.ChallanDate) {
                        var res1 = aSd.ChallanDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.ChallanDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.ChallanDate = date1;
                        }
                    }
                    if (aSd.TDSIssueDate) {
                        var res1 = aSd.VDSIssueDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.VDSIssueDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.VDSIssueDate = date1;
                        }
                    }
                    if (aSd.PaymentDate) {
                        var res1 = aSd.PaymentDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.PaymentDate = date1;
                        }
                    }


                })

            });

        }
    }
    if ($scope.TDSIssue.IsCompanyVAT) {
        GetCompanyVAT_GetByTrChallanId();
        function GetCompanyVAT_GetByTrChallanId() {
            $http({
                url: '/CompanyVatAit/GetCompanyVAT_GetByTrChallanId?TrChallanId=' + $scope.TDSIssue.TrChallanId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.Vat_TDSList = data;
                angular.forEach($scope.Vat_TDSList, function (aSd) {
                    aSd.CodeNo = aSd.CodeNo.split("");
                    aSd.VDSAmount = aSd.VATAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.TotalVDSAmount = aSd.TotalVATAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    aSd.VatTaxAmount = aSd.VATAmount;
                    aSd.TotalAmount = aSd.TotalVDSAmount;

                    aSd.TotalAmountInWords = aSd.TotalVATAmountInWords;
                    if (aSd.ChallanDate) {
                        var res1 = aSd.ChallanDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.ChallanDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.ChallanDate = date1;
                        }
                    }
                    if (aSd.TDSIssueDate) {
                        var res1 = aSd.VDSIssueDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.VDSIssueDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.VDSIssueDate = date1;
                        }
                    }
                    if (aSd.PaymentDate) {
                        var res1 = aSd.PaymentDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.PaymentDate = date1;
                        }
                    }


                })

            });

        }
    }
    
})