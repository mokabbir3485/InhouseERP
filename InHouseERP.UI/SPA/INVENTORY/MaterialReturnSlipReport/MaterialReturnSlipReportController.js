app.controller("MaterialReturnSlipReportController", function ($scope, $cookieStore, $http, $filter, $window) {
   // $scope.LoginUser = $cookieStore.get('UserData');
  
    //var SupplierLedger = sessionStorage.getItem("SupplierLedgerReportData");
    //if (SupplierLedger != null) {
    //    $scope.SupplierLedgerList = JSON.parse(sessionStorage.SupplierLedgerReportData);
    //}

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
     $scope.MaterialReturnReport = $cookieStore.get('MaterialReturnReport');
   // $scope.MaterialReturnReport = JSON.parse(sessionStorage.getItem("MaterialReturnReport"));

    Clear();

    function Clear() {
        $scope.MaterialReturnSlipList = [];
        GetMaterialReturnForReport();
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

    function GetMaterialReturnForReport() {
        $http({
            url: '/IssueWithoutRequisition/GetMaterialReturnAndISTMForReport?StockTransferId=' + $scope.MaterialReturnReport.StockTransferId + "&StockTransferTypeId=" + $scope.MaterialReturnReport.StockTransferTypeId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {
                $scope.MaterialReturnSlipList = data;
                angular.forEach($scope.MaterialReturnSlipList, function (aMaterialReturnSlip) {
                    if (aMaterialReturnSlip.DemandedDate) {
                        var res1 = aMaterialReturnSlip.DemandedDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aMaterialReturnSlip.DemandedDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aMaterialReturnSlip.DemandedDate = date1;
                        }
                    }

                    if (aMaterialReturnSlip.IssuedDate) {
                        var res2 = aMaterialReturnSlip.IssuedDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate2 = new Date(parseInt(aMaterialReturnSlip.IssuedDate.substr(6)));
                            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                            aMaterialReturnSlip.IssuedDate = date2;
                        }
                    }


                })
            }

        });
    }

});