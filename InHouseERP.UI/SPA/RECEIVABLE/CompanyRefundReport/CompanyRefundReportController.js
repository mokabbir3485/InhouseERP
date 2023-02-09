
app.controller("CompanyRefundReportController", function ($scope, $filter, $http, $cookieStore, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.RefundId = $cookieStore.get("CompanyRefundId");

    Clear();

    function Clear() {

        $scope.companyRefundlistFilterData = [];


        $scope.ReportName = "Customer Refund Report";

        CompanyPaymentReport();

        var date = new Date();
        $scope.toDate = $filter('date')(date.toJSON().slice(0, 10), 'dd/MM/yyyy');

    }







    function CompanyPaymentReport() {

        $http({
            url: '/CompanyAdvanceRefund/GetCompanyRefundReport?RefundId=' + $scope.RefundId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companyRefundlistFilterData = data;
            $scope.totalAIT = 0;
            $scope.totalAITCal = 0;

            if ($scope.companyRefundlistFilterData.length != 0) {
                if (data.length > 0) {
                    angular.forEach($scope.companyRefundlistFilterData, function (aSd) {

                        //$scope.totalAIT += (aSd.TotalAIT + aSd.PaidAmount + aSd.TotalVAT);
                        //$scope.totalAITCal = ($scope.totalAIT).toFixed(3)
                        var res1 = aSd.RefundDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.RefundDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                            aSd.RefundDate = date1;
                        }

                        if (aSd.ChequeNo == "" || aSd.ChequeNo == undefined) {
                            aSd.ChequeNo = "N/A"
                        }
                        if (aSd.ChequeType == "" || aSd.ChequeType == undefined) {
                            aSd.ChequeType = "N/A"
                        }
                        if (aSd.Remarks == "" || aSd.Remarks == undefined) {
                            aSd.Remarks = "N/A"
                        }
                    })
                }
            }



        });

    }

})