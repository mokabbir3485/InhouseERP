
app.controller('CompanyAdjustmentReportController', function ($http, $scope, $cookieStore, $filter, $cookies) {
  //  $scope.CompanyAdjustmentObj = {};
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.CompanyAdjustmentObj = $cookieStore.get("CompanyAdjustmentObj");
    Clear();
    function Clear() {
        $scope.CompanyPaymentAdjustmentDetail = [];
        GetDateTimeFormat();
        GetCompanyAdjustmentDetailBySPAId();

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
    function GetCompanyAdjustmentDetailBySPAId() {
        $http({
            url: '/CompanyPaymentAdjustment/GetByCompanyPaymentAdjustmentReport?CPAId=' + $scope.CompanyAdjustmentObj,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

           

            if (data.length > 0) {
                angular.forEach(data, function (aData) {
                    var res1 = aData.CPADate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.CPADate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aData.CPADate = date1;
                    }

                    if (aData.ReceivableAmount != 0) {
                        aData.AfterAdjust = aData.ActualAmount - aData.AdjustedAmount;
                    } else {
                        aData.AfterAdjust = 0;
                    }
                   
                   // aData.AfterAdjust =aData.AdjustedAmount;

                    $scope.CompanyPaymentAdjustmentDetail.push(aData);
                })

            }

        });
    }

});