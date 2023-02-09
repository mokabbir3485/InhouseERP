
app.controller('SupplierAdvanceReportController', function ($http, $scope, $cookieStore, $cookies) {
    $scope.SupplierAdvanceObj = {};
    //var SupplierAdvance = sessionStorage.getItem("SupplierAdvanceObj");
    //if (SupplierAdvance != null) {
    //    $scope.SupplierAdvanceObj = JSON.parse(sessionStorage.SupplierAdvanceObj);
    //}
    $scope.SupplierAdvanceObj = $cookieStore.get('SupplierAdvanceObj');
    Clear();
    function Clear() {
        GetDateTimeFormat();

        if ($scope.SupplierAdvanceObj.ChequeTypeId == 1) {
            $scope.SupplierAdvanceObj.ChequeTypeName = 'Cash Cheque';
        } else if ($scope.SupplierAdvanceObj.ChequeTypeId == 2) {
            $scope.SupplierAdvanceObj.ChequeTypeName = 'Account Payable Cheque';
        }

        if ($scope.SupplierAdvanceObj.MobileBankingServiceId == 1) {
            $scope.SupplierAdvanceObj.MobileBankingServiceName = 'Bkash';
        } else if ($scope.SupplierAdvanceObj.MobileBankingServiceId == 2) {
            $scope.SupplierAdvanceObj.MobileBankingServiceName = 'Nagad';
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