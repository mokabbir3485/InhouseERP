
app.controller('JumboStockIssueReportController', function ($http, $scope, $cookieStore, $cookies) {
   // $scope.JumboStockIssueObj = {};
 

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    /* $scope.JumboStockIssueObj = JSON.parse(sessionStorage.getItem("JumboStockIssueObj"));*/
    $scope.JumboStockIssueObj = $cookies.getObject('JumboStockIssueObj');

    Clear();
    function Clear() {
        $scope.JumboStockIssueDetailList = [];
        GetDateTimeFormat();
        GetJumboStockIssueByJIssueId();
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

    function GetJumboStockIssueByJIssueId() {
        $http({
            url: "/JumboStockIssue/JumboStockIssueDetailGetByJIssueId?JIssueId=" + $scope.JumboStockIssueObj.JIssueId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.JumboStockIssueDetailList = data;
        });
    }

});