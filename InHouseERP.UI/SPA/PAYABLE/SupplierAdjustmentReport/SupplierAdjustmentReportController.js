
app.controller('SupplierAdjustmentReportController', function ($http, $scope, $cookieStore, $filter, $cookies) {
    $scope.SPAObj = $cookieStore.get('SPAObj');
    Clear();
    function Clear() {
        $scope.SupplierPaymentAdjustmentDetail = [];
        GetDateTimeFormat();
        GetSupplierAdjustmentDetailBySPAId();

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
    function GetSupplierAdjustmentDetailBySPAId() {
        $http({
            url: '/SupplierPaymentAndAdjustment/SupplierAdjustmentDetailGetById?SPAId=' + $scope.SPAObj.SPAId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.SupplierPaymentAdjustmentDetail = data;

            if ($scope.SupplierPaymentAdjustmentDetail.length > 0) {
                angular.forEach($scope.SupplierPaymentAdjustmentDetail, function (aData) {
                    var res1 = aData.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.PBDate = date1;
                    }

                    aData.AfterAdjust = aData.ActualAmount - aData.AdjustedAmount;
                })

            }

        });
    }

});