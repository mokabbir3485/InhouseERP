app.controller("CompanyLedgerReportController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    var CompanyLedger = sessionStorage.getItem("CompanyLedgerReportData");
    if (CompanyLedger != null) {
        $scope.CompanyLedgerList = JSON.parse(sessionStorage.CompanyLedgerReportData);
        $scope.GrandTotalDues = 0;
        $scope.GrandNetReceivable = 0;
        $scope.GrandRealizedAmount = 0;
        $scope.GrandClosing = 0;
        $scope.TotalCash = 0;
        $scope.TotalBank = 0;
        $scope.TotalOthers = 0;
        $scope.TotalVat = 0;
        $scope.TotalAit = 0;

        $scope.TotalAdvance = 0;
        $scope.TotalAdvanceRefund = 0;
        $scope.TotalAdvanceBalance = 0;
        $scope.TotalAdjusted = 0;
        $scope.TotalOpening = 0;
        $scope.TotalDues = 0;


        angular.forEach($scope.CompanyLedgerList, function (aDate) {
            $scope.GrandTotalDues += aDate.TotalDues;
            $scope.GrandNetReceivable += aDate.NetReceivable;
            $scope.GrandRealizedAmount += aDate.RealizedAmount;
            $scope.GrandClosing += aDate.Closing;

            $scope.TotalCash += aDate.cash;
            $scope.TotalBank += aDate.bank;
            $scope.TotalOthers += aDate.others;
            $scope.TotalVat += aDate.vat;
            $scope.TotalAit += aDate.ait;

            $scope.TotalAdvance += aDate.AdvanceAmount;
            $scope.TotalAdvanceRefund += aDate.RefundAmount;
            $scope.TotalAdvanceBalance += aDate.AdvanceBalance;

            $scope.TotalAdjusted += aDate.Adjustment;

            $scope.TotalOpening += aDate.OpeningBalance;
            $scope.TotalDues += aDate.Dues;

            Object.keys(aDate).forEach(key => {
                if (!isNaN(Number(aDate[key]))) {
                    if (aDate[key] !== '' && aDate[key] != null) {
                       
                        aDate[key] = Number(aDate[key]).toLocaleString('en', { minimumFractionDigits: 2 });
                       
                    }
                }
            });

            
        })

        $scope.GrandTotalDues = $scope.GrandTotalDues.toLocaleString('en', { minimumFractionDigits: 2 });
        $scope.GrandNetReceivable = $scope.GrandNetReceivable.toLocaleString('en', { minimumFractionDigits: 2 });
        $scope.GrandRealizedAmount = $scope.GrandRealizedAmount.toLocaleString('en', { minimumFractionDigits: 2 });
        $scope.GrandClosing = $scope.GrandClosing.toLocaleString('en', { minimumFractionDigits: 2 });
    }
    Clear();

    function Clear() {

        GetDateTimeFormat();
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