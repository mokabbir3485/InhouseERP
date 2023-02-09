
app.controller('CompanyOpeningReportController', function ($http, $scope, $cookieStore, $cookies) {
    $scope.CompanyOpeningBalanceObj = {};
    $scope.CompanyOpeningBalanceObj = $cookieStore.get("CompanyOpeningBalanceObj");
    
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