app.controller("SalaryHistoryController", function ($scope, $cookieStore, $http, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    var SalaryHistory = {};
    SalaryHistory = $cookieStore.get("SalaryHistory");

    Clear();
    function Clear() {
        $scope.ReportName = "Salary History";

        $scope.SalaryHistory = [];
        SalarySheetGetAll();
    }

   
  

    function SalarySheetGetAll() {
        if (SalaryHistory.employeeId == null || SalaryHistory.employeeId == undefined) {
            SalaryHistory.employeeId = 0;
        }
        if (SalaryHistory.sectionId == null || SalaryHistory.sectionId == undefined) {
            SalaryHistory.sectionId = 0;
        }

        if (SalaryHistory.gradeId == null || SalaryHistory.gradeId == undefined) {
            SalaryHistory.gradeId = 0;
        }
        $http({
            url: '/Employee/GetAllSalaryHistory?FromMonthYearId=' + SalaryHistory.FromMonthYearId + '&ToMonthYearId=' + SalaryHistory.ToMonthYearId + '&BranchId=' + SalaryHistory.branchId + '&GradeId=' + SalaryHistory.gradeId + '&DepartmentId=' + SalaryHistory.departmentId + '&SectionId=' + SalaryHistory.sectionId + '&EmployeeId=' + SalaryHistory.employeeId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalaryHistory = data;
            $scope.TotalNetPaymentBDT = 0;
            angular.forEach(data,function (aData) {
                $scope.TotalNetPaymentBDT += aData.NetPaymentBDT;
            })
        });
    }




});