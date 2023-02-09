app.controller("PaySlipReportController", function ($scope, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //var PaySlip = sessionStorage.getItem("PaySlipReport");
    //if (PaySlip != null) {
    //    $scope.PaySlipReportObj = JSON.parse(sessionStorage.PaySlipReport);
    //}
    $scope.PaySlipReportObj = $cookieStore.get('PaySlipReport');
    $scope.PaySlipReportObj.YearIdBangla = $scope.PaySlipReportObj.YearId.toString().getDigitBanglaFromEnglish();
    $scope.PaySlipReportObj.MonthName = $scope.PaySlipReportObj.MonthName.toString().getMonthBanglaFromEnglish();

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
            return date.getDate() + "." + (date.getMonth() + 1)  + "." + date.getFullYear() + "  " + strTime;
        }
        var currentDatetime = new Date();
        $scope.currentDatetimeFormated = formatDate(currentDatetime);
        $scope.currentDatetimeFormated = $scope.currentDatetimeFormated.getDigitBanglaFromEnglish();

    }
    GetPaySlipForHrByBranchAndGrade();


    $scope.PaySliplist = [];
    function GetPaySlipForHrByBranchAndGrade() {
        $http({
            url: '/PaySlip/PaySlipForHr/' + $scope.PaySlipReportObj.MonthId + '/' + $scope.PaySlipReportObj.YearId + '/' + $scope.PaySlipReportObj.GradeId + '/' + $scope.PaySlipReportObj.BranchName + '/' + $scope.PaySlipReportObj.DepartmentIds + '/' + $scope.PaySlipReportObj.SectionIds,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaySliplist = data;
            
            angular.forEach($scope.PaySliplist, function (PaySlip) {
                PaySlip.TotalDeduction = PaySlip.DeductionProvFund + PaySlip.DeductionAdvanceSalary + PaySlip.DeductionRevenueStamp + PaySlip.DeductionAbsent;
                PaySlip.TotalDeduction = PaySlip.TotalDeduction.toLocaleString('en').getDigitBanglaFromEnglish();


                Object.keys(PaySlip).forEach(key => {
                    if (!isNaN(Number(PaySlip[key]))) {
                        if (PaySlip[key] != '' && PaySlip[key] != null) {
                            PaySlip[key] = Number(PaySlip[key]).toLocaleString('en').getDigitBanglaFromEnglish();
                        }

                    }

                });
            })
        });
    }

    


})