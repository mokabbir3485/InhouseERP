
app.controller('PaymentOnAccountReportController', function ($http, $scope, $cookieStore, $cookies) {
    $scope.PaymentOnAccountObj = {};
    //var SupplierAdvance = sessionStorage.getItem("PaymentOnAccountObj");
    //if (SupplierAdvance != null) {
    //    $scope.PaymentOnAccountObj = JSON.parse(sessionStorage.PaymentOnAccountObj);
    //}
    $scope.PaymentOnAccountObj = $cookieStore.get('PaymentOnAccountObj');
    Clear();
    function Clear() {
        GetDateTimeFormat();

        if ($scope.PaymentOnAccountObj.ChequeTypeId == 1) {
            $scope.PaymentOnAccountObj.ChequeTypeName = 'Cash Cheque';
        } else if ($scope.PaymentOnAccountObj.ChequeTypeId == 2) {
            $scope.PaymentOnAccountObj.ChequeTypeName = 'Account Payable Cheque';
        }

        if ($scope.PaymentOnAccountObj.MobileBankingServiceId == 1) {
            $scope.PaymentOnAccountObj.MobileBankingServiceName = 'Bkash';
        } else if ($scope.PaymentOnAccountObj.MobileBankingServiceId == 2) {
            $scope.PaymentOnAccountObj.MobileBankingServiceName = 'Nagad';
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