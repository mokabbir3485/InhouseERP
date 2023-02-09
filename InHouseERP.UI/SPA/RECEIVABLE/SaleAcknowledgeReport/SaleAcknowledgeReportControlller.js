
app.controller('SaleAcknowledgeReportControlller', function ($http, $scope, $cookieStore, $cookies, $filter) {
    $scope.CompanyAdvanceObj = {};
    //var CompanyAdvance = sessionStorage.getItem("CompanyAdvanceObj");
    //if (CompanyAdvance != null) {
    //    $scope.CompanyAdvanceObj = JSON.parse(sessionStorage.CompanyAdvanceObj);
    //}
    $scope.SaleAcknowlwdge = $cookieStore.get('SaleAcknowlwdge');
    Clear();
    function Clear() {

        $scope.AcknowlwdgeMentList = [];
    }

    $http({
        url: '/SalesInvoice/GetReportForCreditAcknoledge?SaleAcknowledgementId=' + $scope.SaleAcknowlwdge,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).success(function (data) {
        $scope.AcknowlwdgeMentList = data;

        angular.forEach(data,function (aData) {
            var res1 = aData.AcknowledgementDate.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate1 = new Date(parseInt(aData.AcknowledgementDate.substr(6)));
                var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                aData.AcknowledgementDate = date1;
            }
        });

    });

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
       // $scope.currentDatetimeFormated = formatDate(currentDatetime);

    }

});