
app.controller('CompanyAdvanceReportController', function ($http, $scope, $cookieStore, $cookies) {
    $scope.CompanyAdvanceObj = {};
    //var CompanyAdvance = sessionStorage.getItem("CompanyAdvanceObj");
    //if (CompanyAdvance != null) {
    //    $scope.CompanyAdvanceObj = JSON.parse(sessionStorage.CompanyAdvanceObj);
    //}
    $scope.CompanyAdvanceObj = $cookieStore.get('CompanyAdvanceObj');
    Clear();
    function Clear() {
        GetDateTimeFormat();

        if ($scope.CompanyAdvanceObj.ChequeTypeId == 1) {
            $scope.CompanyAdvanceObj.ChequeTypeName = 'Cash Cheque';
        } else if ($scope.CompanyAdvanceObj.ChequeTypeId == 2) {
            $scope.CompanyAdvanceObj.ChequeTypeName = 'Account Payable Cheque';
        }

        if ($scope.CompanyAdvanceObj.MobileBankingServiceId == 1) {
            $scope.CompanyAdvanceObj.MobileBankingServiceName = 'Bkash';
        } else if ($scope.CompanyAdvanceObj.MobileBankingServiceId == 2) {
            $scope.CompanyAdvanceObj.MobileBankingServiceName = 'Nagad';
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