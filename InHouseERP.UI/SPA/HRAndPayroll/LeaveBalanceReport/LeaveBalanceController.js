app.controller("LeaveBalanceController", function ($scope, $cookieStore, $http, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    var  LeaveBalance = {};
     LeaveBalance = $cookieStore.get("LeaveBalance");

    Clear();
    function Clear() {
        $scope.ReportName = "Leave Balance";
        GetAllLeaveBalance();
        $scope.LeaveBalanceList = [];
    }



    function GetAllLeaveBalance() {
        if (LeaveBalance.sectionId == null || LeaveBalance.sectionId == undefined) {
            LeaveBalance.sectionId = 0;
        }
        if (LeaveBalance.employeeId == null || LeaveBalance.employeeId == undefined) {
            LeaveBalance.employeeId = 0;
        }
        $http({
            url: '/Employee/GetLeaveBalance?YearId=' + LeaveBalance.YearId + '&BranchId=' + LeaveBalance.branchId + '&GradeId=' + LeaveBalance.gradeId + '&DepartmentId=' + LeaveBalance.departmentId + '&SectionId=' + LeaveBalance.sectionId + '&EmployeeId=' + LeaveBalance.employeeId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.LeaveBalanceList = data;
        });
    }




});