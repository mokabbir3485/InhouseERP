app.controller("ISTMReportController", function ($scope, $cookieStore, $http, $filter, $window) {
   // $scope.LoginUser = $cookieStore.get('UserData');
   // $scope.ISTMReport = $cookieStore.get('ISTMReport');
    //var SupplierLedger = sessionStorage.getItem("SupplierLedgerReportData");
    //if (SupplierLedger != null) {
    //    $scope.SupplierLedgerList = JSON.parse(sessionStorage.SupplierLedgerReportData);
    //}

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.ISTMReport = $cookieStore.get("ISTMReport");

    Clear();

    function Clear() {
        $scope.ISTMList = [];
        GetISTMForReport();
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

    function GetISTMForReport() {
        $http({
            url: '/IssueWithoutRequisition/GetMaterialReturnAndISTMForReport?StockTransferId=' + $scope.ISTMReport.StockTransferId + "&StockTransferTypeId=" + $scope.ISTMReport.StockTransferTypeId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {
                $scope.ISTMList = data;


                //angular.forEach($scope.MaterialDemandedIssuedList, function (aMaterialDemandedIssued) {
                //    if (aMaterialDemandedIssued.DemandedDate) {
                //        var res1 = aMaterialDemandedIssued.DemandedDate.substring(0, 5);
                //        if (res1 == "/Date") {
                //            var parsedDate1 = new Date(parseInt(aMaterialDemandedIssued.DemandedDate.substr(6)));
                //            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                //            aMaterialDemandedIssued.DemandedDate = date1;
                //        }
                //    }

                //    if (aMaterialDemandedIssued.IssuedDate) {
                //        var res2 = aMaterialDemandedIssued.IssuedDate.substring(0, 5);
                //        if (res2 == "/Date") {
                //            var parsedDate2 = new Date(parseInt(aMaterialDemandedIssued.IssuedDate.substr(6)));
                //            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                //            aMaterialDemandedIssued.IssuedDate = date2;
                //        }
                //    }


                //})

            }

        });
    }

});