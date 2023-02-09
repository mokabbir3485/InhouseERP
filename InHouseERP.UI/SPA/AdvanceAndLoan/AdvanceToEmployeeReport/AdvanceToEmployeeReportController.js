
app.controller("AdvanceToEmployeeReportController", function ($scope, $filter, $http, $cookieStore, $window) {
    var AdvanceToEmployeeObject = $cookieStore.get('AdvanceToEmployeeObject');
    if (AdvanceToEmployeeObject != null || AdvanceToEmployeeObject != undefined) {
        $scope.AdvanceToEmployee = JSON.parse(AdvanceToEmployeeObject);
    }

    Clear();

    function Clear() {
        $scope.ReportName = "Advance To Employee Report";
    }
    var date = new Date();
    $scope.toDate = $filter('date')(date.toJSON().slice(0, 10), 'MMM dd, yyyy');



})