
app.controller("StoreAndItemTransferController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.StoreAndItemTransfer = $cookieStore.get("StoreAndItemTransferReport");
    $scope.StockTransferId = $scope.StoreAndItemTransfer.StockTransferId;
    $scope.StockTransferTypeId = $scope.StoreAndItemTransfer.StockTransferTypeId;

    if ($scope.StoreAndItemTransfer.StockTransferTypeId == 3) {
        $scope.ReportName = "Store To Store Transfer";
    } else if ($scope.StoreAndItemTransfer.StockTransferTypeId == 4) {
        $scope.ReportName = "Item To Item Transfer";
    }

    Clear();

    function Clear() {
        $scope.StoreAndItemTransfer = [];
        GetStoreAndItemTransferReport();
     //   GetDateTimeFormat();

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

    function GetStoreAndItemTransferReport() {
       
        $http({
            url: '/IssueWithoutRequisition/StoreAndItemTransferReport?StockTransferId=' +  $scope.StockTransferId + "&StockTransferTypeId=" + $scope.StockTransferTypeId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
         
            $scope.StoreAndItemTransfer = data;
            angular.forEach(data,function (aData) {

                if (aData.StockTransferDate) {
                    var res2 = aData.StockTransferDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aData.StockTransferDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aData.StockTransferDate = date2;
                    }
                }

            })
        });
    }

});