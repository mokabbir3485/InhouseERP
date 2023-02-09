
app.controller("AttendanceDetailReportController", function ($scope, $window, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.AttendanceDetailObj = $cookieStore.get('AttendanceDetail');
    //if ($scope.AttendanceDetailObj.BranchId == 3) {
    //    $scope.AttendanceDetailObj.BranchNameBangla = 'ইপিজেড';
    //    $scope.AttendanceDetailObj.WagesSlipNumber = 'RTL-HRD-02';

    //} else if ($scope.AttendanceDetailObj.BranchId == 2) {
    //    $scope.AttendanceDetailObj.BranchNameBangla = 'শ্রীপুর';
    //    $scope.AttendanceDetailObj.WagesSlipNumber = 'RTL-HRD-01';
    //}
    var currentDate = new Date();
    $scope.PrintDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
    GetAttendanceDetailForHrByEmployeeId();


    $scope.AttendanceDetailList = [];
    function GetAttendanceDetailForHrByEmployeeId() {
        $http({
            url: '/Report/GetAttendanceDetail/' + $scope.AttendanceDetailObj.FromDate + '/' + $scope.AttendanceDetailObj.ToDate + '/' + $scope.AttendanceDetailObj.EmployeeId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AttendanceDetailList = data;
            console.log(data);
        });
    }





});