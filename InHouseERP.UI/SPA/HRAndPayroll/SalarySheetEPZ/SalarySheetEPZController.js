app.controller("SalarySheetEPZController", function ($scope, $cookieStore, $http, $filter, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    var HrSalarySheet = {};
    HrSalarySheet = $cookieStore.get("HrSalarySheetEPZ");
    $scope.HrSalarySheet = $cookieStore.get("HrSalarySheetEPZ");

    Clear();
    function Clear() {

        $scope.SalarySheet = [];
        SalarySheetGetAll();

        var currentDate = new Date();
        $scope.PrintDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
    }



    function SalarySheetGetAll() {
        if (HrSalarySheet.sectionName == null || HrSalarySheet.sectionName == undefined) {

            HrSalarySheet.sectionName = "0";
        }
        $http({
            url: '/SalaryDetail/GetAllSalaryDetail?MonthId=' + HrSalarySheet.MonthId + '&YearId=' + HrSalarySheet.YearId + '&GradeId=' + HrSalarySheet.GradeId + '&BranchName=' + HrSalarySheet.branchName + '&UnitName=' + HrSalarySheet.sectionName + '&DepartmentName=' + HrSalarySheet.departmentName + '&Header1=' + HrSalarySheet.SalarySheetHeader1 + '&Header2=' + HrSalarySheet.SalarySheetHeader2 + '&Header3=' + HrSalarySheet.SalarySheetHeader3,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalarySheet = data;
            $scope.TotalBasicSalary = 0;
            $scope.TotalHouseRent = 0;
            $scope.TotalMedicalAllowance = 0;
            $scope.TotalConveyanceAllowance = 0;
            $scope.TotalLunchAllowance = 0;
            $scope.TotalGrossSalary = 0;

            $scope.TotalWorkingDays = 0;
            $scope.TotalAbsentDays = 0;
            $scope.TotalAttendance = 0;

            $scope.TotalOtAmount = 0;
            $scope.TotalDeductionAdvanceSalary = 0;
            $scope.TotalDeductionProvFund = 0;

            $scope.TotalDeductionTDS = 0;
            $scope.TotalDeductionAbsent = 0;
            $scope.TotalOtherAddition = 0;

            $scope.TotalOtherDeduction = 0;
            $scope.TotalCashPayment = 0;
            $scope.TotalBankPayment = 0;
            $scope.TotalNetPaymentBDT = 0;
            $scope.TotalNetPaymentUSD = 0;

            angular.forEach($scope.SalarySheet, function (aData) {

                $scope.TotalBasicSalary += aData.BasicSalary;
                $scope.TotalHouseRent += aData.HouseRent;
                $scope.TotalMedicalAllowance += aData.MedicalAllowance;
                $scope.TotalConveyanceAllowance += aData.ConveyanceAllowance;
                $scope.TotalLunchAllowance += aData.LunchAllowance;
                aData.GrossSalary = aData.GrossSalary - aData.LunchAllowance - aData.ConveyanceAllowance;
                $scope.TotalGrossSalary += aData.GrossSalary;
                


                $scope.TotalOtAmount += aData.OtAmount;
                $scope.TotalDeductionAdvanceSalary += aData.DeductionAdvanceSalary;
                $scope.TotalDeductionProvFund += aData.DeductionProvFund;

                $scope.TotalDeductionAbsent += aData.DeductionAbsent;
                $scope.TotalOtherAddition += aData.OtherAddition;

                $scope.TotalOtherDeduction += aData.OtherDeduction;
                $scope.TotalCashPayment += aData.CashPayment;
                $scope.TotalBankPayment += aData.BankPayment;
                $scope.TotalNetPaymentBDT += aData.NetPaymentBDT;
                $scope.TotalNetPaymentUSD += aData.NetPaymentUSD;

            })



            angular.forEach($scope.SalarySheet, function (aSalarySheet) {
                Object.keys(aSalarySheet).forEach(key => {
                    if (!isNaN(Number(aSalarySheet[key]))) {
                        if (aSalarySheet[key] !== '' && aSalarySheet[key] != null) {
                            if (key != 'EmployeeCode' && key != 'TotalDays' && key != 'CasualLeave' && key != 'SickLeave' && key != 'EarnLeave') {
                                aSalarySheet[key] = Number(aSalarySheet[key]).toLocaleString('en', { minimumFractionDigits: 2 });
                            }
                        }
                    }
                });
            })

            $scope.TotalBasicSalary = $scope.TotalBasicSalary.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalHouseRent = $scope.TotalHouseRent.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalMedicalAllowance = $scope.TotalMedicalAllowance.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalConveyanceAllowance = $scope.TotalConveyanceAllowance.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalLunchAllowance = $scope.TotalLunchAllowance.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalGrossSalary = $scope.TotalGrossSalary.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalOtAmount = $scope.TotalOtAmount.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalDeductionAdvanceSalary = $scope.TotalDeductionAdvanceSalary.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalDeductionProvFund = $scope.TotalDeductionProvFund.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalDeductionAbsent = $scope.TotalDeductionAbsent.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalOtherAddition = $scope.TotalOtherAddition.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalOtherDeduction = $scope.TotalOtherDeduction.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalCashPayment = $scope.TotalCashPayment.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalBankPayment = $scope.TotalBankPayment.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalNetPaymentBDT = $scope.TotalNetPaymentBDT.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalNetPaymentUSD = $scope.TotalNetPaymentUSD.toLocaleString('en', { minimumFractionDigits: 2 });

        });
    }




});