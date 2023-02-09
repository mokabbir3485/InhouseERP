app.controller("WagesSlipReportController", function ($scope, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //var WagesSlip = sessionStorage.getItem("WagesSlipReport");
    //if (WagesSlip != null) {
    //    $scope.WagesSlipReportObj = JSON.parse(sessionStorage.WagesSlipReport);
    //}
    $scope.WagesSlipReportObj = $cookieStore.get('WagesSlipReport');
    $scope.WagesSlipReportObj.YearIdBangla = $scope.WagesSlipReportObj.YearId.toString().getDigitBanglaFromEnglish();
    $scope.WagesSlipReportObj.MonthName = $scope.WagesSlipReportObj.MonthName.toString().getMonthBanglaFromEnglish();
    if ($scope.WagesSlipReportObj.BranchId == 3) {
        $scope.WagesSlipReportObj.BranchNameBangla = 'ইপিজেড';
        $scope.WagesSlipReportObj.WagesSlipNumber = 'RTL-HRD-02';

    } else if ($scope.WagesSlipReportObj.BranchId == 2) {
        $scope.WagesSlipReportObj.BranchNameBangla = 'শ্রীপুর';
        $scope.WagesSlipReportObj.WagesSlipNumber = 'RTL-HRD-01';
    }
    $scope.dontGroup = false;
    GetDateTimeFormat();
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
    GetWagesSlipForHrByBranchAndGrade();

    //function groupArrayOfObjects(list, key) {
    //    return list.reduce(function (rv, x) {
    //        (rv[x[key]] = rv[x[key]] || []).push(x);
    //        return rv;
    //    }, {});
    //};

    $scope.WagesSliplist = [];
    function GetWagesSlipForHrByBranchAndGrade() {
        $http({
            url: '/WagesSlip/WagesSlipForHr/' + $scope.WagesSlipReportObj.MonthId + '/' + $scope.WagesSlipReportObj.YearId + '/' + $scope.WagesSlipReportObj.GradeId + '/' + $scope.WagesSlipReportObj.BranchName + '/' + $scope.WagesSlipReportObj.DepartmentIds + '/' + $scope.WagesSlipReportObj.SectionIds,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.WagesSliplist = data;
            //var num = 0;
            angular.forEach($scope.WagesSliplist, function (aWagesSlip) {
                //num = ++num;
                //aWagesSlip.SN = num.toString().getDigitBanglaFromEnglish();
                aWagesSlip.DepartmentAndSectionName = aWagesSlip.DepartmentName + ' - ' + aWagesSlip.SectionName;
                aWagesSlip.JoiningDate = aWagesSlip.JoiningDate.getDigitBanglaFromEnglish();
                if (aWagesSlip.FinishDate != null) { aWagesSlip.FinishDate = aWagesSlip.FinishDate.getDigitBanglaFromEnglish(); }

                Object.keys(aWagesSlip).forEach(key => {
                    if (!isNaN(Number(aWagesSlip[key]))) {
                        if (aWagesSlip[key] != '' && aWagesSlip[key] != null) {
                            aWagesSlip[key] = Number(aWagesSlip[key]).toLocaleString('en').getDigitBanglaFromEnglish();
                        }
                        
                    }
                    
                });
                //aWagesSlip.GrossSalary = aWagesSlip.GrossSalary.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.TotalDays = aWagesSlip.TotalDays.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.WorkingDays = aWagesSlip.WorkingDays.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.Attendance = aWagesSlip.Attendance.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.WeeklyHolidays = aWagesSlip.WeeklyHolidays.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.CasualLeave = aWagesSlip.CasualLeave.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.FestivalHolidays = aWagesSlip.FestivalHolidays.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.SickLeave = aWagesSlip.SickLeave.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.EarnLeave = aWagesSlip.EarnLeave.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.CompensatoryLeave = aWagesSlip.CompensatoryLeave.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.TotalPaidAttendence = aWagesSlip.TotalPaidAttendence.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.AbsentDays = aWagesSlip.AbsentDays.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.BasicSalary = aWagesSlip.BasicSalary.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.HouseRent = aWagesSlip.HouseRent.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.MedicalAllowance = aWagesSlip.MedicalAllowance.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.ConveyanceAllowance = aWagesSlip.ConveyanceAllowance.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.DeductionAbsent = aWagesSlip.DeductionAbsent.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.ReceivableSalary = aWagesSlip.ReceivableSalary.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.OtHrs = aWagesSlip.OtHrs.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.OtRate = aWagesSlip.OtRate.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.OtAmount = aWagesSlip.OtAmount.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.AttendanceBonus = aWagesSlip.AttendanceBonus.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.TotalWages = aWagesSlip.TotalWages.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.DeductionAdvanceSalary = aWagesSlip.DeductionAdvanceSalary.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.DeductionProvFund = aWagesSlip.DeductionProvFund.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.TotalPayableSalary = aWagesSlip.TotalPayableSalary.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.SumOfTotalPayableSalary = aWagesSlip.SumOfTotalPayableSalary.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.GrandTotalPayableSalary = aWagesSlip.GrandTotalPayableSalary.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.DeductionTDS = aWagesSlip.DeductionTDS.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.NetPaymentBDT = aWagesSlip.NetPaymentBDT.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.SumOfNetPaymentBDT = aWagesSlip.SumOfNetPaymentBDT.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.GrandNetPaymentBDT = aWagesSlip.GrandNetPaymentBDT.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.GrandDeductionProvFund = aWagesSlip.GrandDeductionProvFund.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.GrandDeductionAbsent = aWagesSlip.GrandDeductionAbsent.toLocaleString('en').getDigitBanglaFromEnglish();
                //aWagesSlip.GrandGrossSalary = aWagesSlip.GrandGrossSalary.toLocaleString('en').getDigitBanglaFromEnglish();

            })
            $scope.$WagesSliplist = $scope.WagesSliplist;
            $scope.WagesSliplist = Array.from(
                $scope.WagesSliplist.reduce((m, o) => m.set(o.DepartmentAndSectionName, (m.get(o.DepartmentAndSectionName) || []).concat(o)), new Map),
                ([SectionName, events]) => ({ SectionName, events })
            );


            var num = 0;
            angular.forEach($scope.WagesSliplist, function (WagesSlip) {
                angular.forEach(WagesSlip.events, function (aWagesSlip) {

                    num = ++num;
                    aWagesSlip.SN = num.toString().getDigitBanglaFromEnglish();;
                })

            })

        });
    }

    //$scope.WagesSlipFullList = [
    //    { Section: 1, List: [{ GrossSalary: 1234 , NetPaymentBDT: 5678 }]},
    //    { Section: 2, List: [{ GrossSalary: 1234, NetPaymentBDT: 5678 }, { GrossSalary: 1234, NetPaymentBDT: 5678 }] },
    //    { Section: 3, List: [{ GrossSalary: 1234, NetPaymentBDT: 5678 }, { GrossSalary: 1234, NetPaymentBDT: 5678 }, { GrossSalary: 1234, NetPaymentBDT: 5678 }] },
    //    { Section: 4, List: [{ GrossSalary: 1234, NetPaymentBDT: 5678 },{ GrossSalary: 1234, NetPaymentBDT: 5678 },{ GrossSalary: 1234, NetPaymentBDT: 5678 },{ GrossSalary: 1234, NetPaymentBDT: 5678 },] }
    //]


    //var num = 1234;
    //var str =  num.toString().getDigitBanglaFromEnglish();
    //console.log(str);
    //String.prototype.getDigitBanglaFromEnglish = function () {
    //    var finalEnlishToBanglaNumber = {

    //        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    //        'Jan':'জানুয়ারী', 'Feb' : 'ফেব্রুয়ারি','Mar':'মার্চ', 'Apr':'এপ্রিল','May':'মে','Jun':'জুন','Jul':'জুলাই','Aug':'আগস্ট','Sep':'সেপ্টেম্বর','Oct':'অক্টোবর','Nov':'নভেম্বর','Dec':'ডিসেম্বর'
    //    };
    //    var retStr = this;
    //    for (var x in finalEnlishToBanglaNumber) {
    //        retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
    //    }
    //    return retStr;
    //};


   

    //var itemDigit = "100000023";
    //$scope.BillOfMaterialObj.HsCode = $scope.BillOfMaterialObj.HsCode.getDigitBanglaFromEnglish();
    //$scope.BillOfMaterialObj.SubmitDate = $scope.BillOfMaterialObj.SubmitDate.getDigitBanglaFromEnglish();
    //$scope.BillOfMaterialObj.DeliveryDate = $scope.BillOfMaterialObj.DeliveryDate.getDigitBanglaFromEnglish();
    //console.log(item1);




})