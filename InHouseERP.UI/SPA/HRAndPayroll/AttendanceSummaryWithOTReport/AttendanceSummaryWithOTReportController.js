
app.controller("AttendanceSummaryWithOTReportController", function ($scope, $window, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.AttendanceSummaryWithOTObj = $cookieStore.get('AttendanceSummaryWithOT');
    //if ($scope.AttendanceSummaryWithOTObj.BranchId == 3) {
    //    $scope.AttendanceSummaryWithOTObj.BranchNameBangla = 'ইপিজেড';
    //    $scope.AttendanceSummaryWithOTObj.WagesSlipNumber = 'RTL-HRD-02';

    //} else if ($scope.AttendanceSummaryWithOTObj.BranchId == 2) {
    //    $scope.AttendanceSummaryWithOTObj.BranchNameBangla = 'শ্রীপুর';
    //    $scope.AttendanceSummaryWithOTObj.WagesSlipNumber = 'RTL-HRD-01';
    //}
    var currentDate = new Date();
    $scope.PrintDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
    GetAttendanceSummaryWithOTForHrByBranchAndGrade();


    $scope.AttendanceSummaryWithOTList = [];
    function GetAttendanceSummaryWithOTForHrByBranchAndGrade() {
        $http({
            url: '/Report/GetAttendanceSummary/' + $scope.AttendanceSummaryWithOTObj.FromDate + '/' + $scope.AttendanceSummaryWithOTObj.ToDate + '/' + $scope.AttendanceSummaryWithOTObj.BranchId + '/' + $scope.AttendanceSummaryWithOTObj.GradeId + '/' + $scope.AttendanceSummaryWithOTObj.EmployeeId + '/' + $scope.AttendanceSummaryWithOTObj.DepartmentId + '/' + $scope.AttendanceSummaryWithOTObj.SectionId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AttendanceSummaryWithOTList = data;
            console.log(data);
        });
    }





});