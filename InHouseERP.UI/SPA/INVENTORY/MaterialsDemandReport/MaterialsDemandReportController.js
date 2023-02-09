app.controller("MaterialsDemandReportController", function ($scope, $cookieStore, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    $scope.MaterialsDemandData = $cookieStore.get('MaterialsDemandData');

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    

    var res1 = $scope.MaterialsDemandData.DemandDate.substring(0, 5);
    if (res1 == "/Date") {
        var parsedDate1 = new Date(parseInt($scope.MaterialsDemandData.DemandDate.substr(6)));
        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
        $scope.MaterialsDemandData.DemandDate = date1;
    }

    var res2 = $scope.MaterialsDemandData.DeliveryDate.substring(0, 5);
    if (res2 == "/Date") {
        var parsedDate2 = new Date(parseInt($scope.MaterialsDemandData.DeliveryDate.substr(6)));
        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
        $scope.MaterialsDemandData.DeliveryDate = date2;
    }

    //var SupplierLedger = sessionStorage.getItem("SupplierLedgerReportData");
    //if (SupplierLedger != null) {
    //    $scope.SupplierLedgerList = JSON.parse(sessionStorage.SupplierLedgerReportData);
    //}
    Clear();

    function Clear() {
        $scope.MaterialsDemandDetailList = [];
        GetMaterialsDemandDetailByMaterialsDemandId();
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

    function GetMaterialsDemandDetailByMaterialsDemandId() {
        $http({
            url: '/MaterialsDemand/GetMaterialsDemandDetailByMaterialsDemandId?MaterialsDemandId=' + $scope.MaterialsDemandData.MaterialsDemandId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {
                $scope.MaterialsDemandDetailList = data;
                
            }

        });
    }

});