
app.controller('SupplierRefundReportController', function ($http, $scope, $cookieStore, $cookies) {
    $scope.SupplierRefundObj = $cookieStore.get("SupplierRefundObj");
    Clear();
    function Clear() {
        GetDateTimeFormat();
        if ($scope.SupplierRefundObj.ChequeTypeId == 1) {
            $scope.SupplierRefundObj.ChequeTypeName = 'Cash Cheque';
        } else if ($scope.SupplierRefundObj.ChequeTypeId == 2) {
            $scope.SupplierRefundObj.ChequeTypeName = 'Account Payable Cheque';
        }

        if ($scope.SupplierRefundObj.MobileBankingServiceId == 1) {
            $scope.SupplierRefundObj.MobileBankingServiceName = 'Bkash';
        } else if ($scope.SupplierRefundObj.MobileBankingServiceId == 2) {
            $scope.SupplierRefundObj.MobileBankingServiceName = 'Nagad';
        }


    }
    function GetDateTimeFormat() {
        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
        }
        var currentDatetime = new Date();
        $scope.currentDatetimeFormated = formatDate(currentDatetime);

    }

});