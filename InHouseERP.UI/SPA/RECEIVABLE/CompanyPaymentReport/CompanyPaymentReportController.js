
app.controller("CompanyPaymentReportController", function ($scope, $filter, $http, $cookieStore, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.CompanyPayment = {};
    var CompanyPaymentStr = $cookieStore.get("CompanyPayment");
    if (CompanyPaymentStr != null || CompanyPaymentStr != undefined) {
        $scope.CompanyPayment = JSON.parse(CompanyPaymentStr);
    }

    Clear();

    function Clear() {

        $scope.companyPaymentlistFilterData = [];
 

        $scope.ReportName = "Customer Payment Receive";
    
        CompanyPaymentReport();

        var date = new Date();
        $scope.toDate = $filter('date')(date.toJSON().slice(0, 10), 'MMM dd, yyyy');
   
    }





   

    function CompanyPaymentReport() {

        $http({
            url: '/CompanyPayment/CompanyPaymentReport?CompanyPaymentId=' + $scope.CompanyPayment.CompanyPaymentId + '&SalesInvoiceId=' + $scope.CompanyPayment.InvoiceId + '&IsOpeningPayment=' + $scope.CompanyPayment.IsOpeningPayment,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companyPaymentlistFilterData = data;
            $scope.TotalVAT = 0;
            $scope.TotalAIT = 0;
            $scope.TotalActualAmount = 0;
            $scope.TotalReceivableAmount = 0;
            $scope.TotalPaidAmount = 0;
            $scope.TotalAdditionalCost = 0;

            if ($scope.companyPaymentlistFilterData.length != 0) {
                if (data.length > 0) {
                    angular.forEach($scope.companyPaymentlistFilterData, function (aSd) {
                        $scope.TotalVAT += aSd.VAT;
                        $scope.TotalAIT += aSd.AIT;
                        $scope.TotalActualAmount += aSd.ActualAmount;
                        $scope.TotalReceivableAmount += aSd.ReceivableAmount;
                        $scope.TotalPaidAmount += aSd.PaidAmount;
                        $scope.TotalAdditionalCost += aSd.AdditionalCost;
                        if (aSd.PaymentDate) {
                            var res1 = aSd.PaymentDate.substring(0, 5);
                            if (res1 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aSd.PaymentDate = date1;
                            }
                        }
                        
                        if (aSd.InvoiceDate) {
                            var res1 = aSd.InvoiceDate.substring(0, 5);
                            if (res1 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aSd.InvoiceDate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aSd.InvoiceDate = date1;
                            }
                        }
                        
                        if (aSd.ChequeDate) {
                            var res1 = aSd.ChequeDate.substring(0, 5);
                            if (res1 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aSd.ChequeDate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aSd.ChequeDate = date1;
                            }
                        }
                        

                        //if (aSd.ChequeNo == "" || aSd.ChequeNo == undefined) {
                        //    aSd.ChequeNo="N/A"
                        //}
                        //if (aSd.ChequeType == "" || aSd.ChequeType == undefined) {
                        //    aSd.ChequeType = "N/A"
                        //}
                        //if (aSd.Remarks == "" || aSd.Remarks == undefined) {
                        //    aSd.Remarks = "N/A"
                        //}
                    })
                }
            }



        });

    }





      
   



})