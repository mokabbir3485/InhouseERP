app.controller("SupplierLedgerReportController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    var SupplierLedger = sessionStorage.getItem("SupplierLedgerReportData");
    if (SupplierLedger != null) {
        $scope.SupplierLedgerList = JSON.parse(sessionStorage.SupplierLedgerReportData);

        $scope.GrandTotalDues = 0;
        $scope.GrandNetPayable = 0;
        $scope.GrandPaidAmount = 0;
        $scope.GrandClosing = 0;
        angular.forEach($scope.SupplierLedgerList, function (aDate) {
            $scope.GrandTotalDues += aDate.TotalDues;
            $scope.GrandNetPayable += aDate.NetPayable;
            $scope.GrandPaidAmount += aDate.PaidAmount;
            $scope.GrandClosing += aDate.Closing;

            Object.keys(aDate).forEach(key => {
                if (!isNaN(Number(aDate[key]))) {
                    if (aDate[key] !== '' && aDate[key] != null) {

                        aDate[key] = Number(aDate[key]).toLocaleString('en', { minimumFractionDigits: 2 });

                    }
                }
            });


        })

        $scope.GrandTotalDues = $scope.GrandTotalDues.toLocaleString('en', { minimumFractionDigits: 2 });
        $scope.GrandNetPayable = $scope.GrandNetPayable.toLocaleString('en', { minimumFractionDigits: 2 });
        $scope.GrandPaidAmount = $scope.GrandPaidAmount.toLocaleString('en', { minimumFractionDigits: 2 });
        $scope.GrandClosing = $scope.GrandClosing.toLocaleString('en', { minimumFractionDigits: 2 });
    }
    //sessionStorage.removeItem("SupplierLedgerReportData");
    Clear();

    function Clear() {
        
        GetDateTimeFormat();
       // $scope.name = "Hello";
       // var fromDate = '01/05/2021';
        //var toDate = '30/10/2021';

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