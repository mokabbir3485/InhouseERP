app.controller("HRReportsController", function ($scope, $cookieStore, $rootScope, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.ScreenId = parseInt(sessionStorage.getItem("HRReportsScreenId"));
    load();

    //Functions
    function load() {
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'HR Reports').ScreenId;
        GetUsersPermissionDetails();

        $scope.company = {};
        $(document).ready(function () {
            $('.basic-select2').select2({ placeholder: "Select Employee" });
        });

        //$scope.IsMultiSelect = false;
        $scope.CategoriesSelected = [];
        $scope.Categories = [];
        //$scope.dropdownSetting = {
        //    scrollable: true,
        //    scrollableHeight: '200px'
        //}
        $scope.ddlGrade = {};
        $scope.ShowReportDetailsGrid = false;
        $scope.ReportHeader = [];
        $scope.ReportDetailList = [];
        $scope.ViewReportDetails = null;
        $scope.Branchlist = [];
        $scope.deptlist = [];
        $scope.sectionList = [];
        $scope.ddlDepartment = null;
        $scope.departmentlist = [];
        $scope.MonthYearList = [];
        $scope.rbReport = 'AttSum';
        $scope.rbReturnType = 'NonReturnable';
        $scope.ReportTableHeader = " ";
        GetAllBranch();
        //GetUsersPermissionDetails();
        $scope.CompanyList = []
        GetAllEmployee('');
        //setTodayToDateRange();
        $scope.GradeList = [];
        $scope.MonthList = [
            { MonthId: 1, MonthName: 'January' },
            { MonthId: 2, MonthName: 'Februray' },
            { MonthId: 3, MonthName: 'March' },
            { MonthId: 4, MonthName: 'April' },
            { MonthId: 5, MonthName: 'May' },
            { MonthId: 6, MonthName: 'June' },
            { MonthId: 7, MonthName: 'July' },
            { MonthId: 8, MonthName: 'August' },
            { MonthId: 9, MonthName: 'September' },
            { MonthId: 10, MonthName: 'October' },
            { MonthId: 11, MonthName: 'November' },
            { MonthId: 12, MonthName: 'December' }
        ];
        getYearList();
        GetMonthYear();
        $scope.example8data = [];
        $scope.departmentIdList = [];
        $scope.example8settings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
            //selectionLimit: 1,
            //smartButtonMaxItems: 1,
            //dynamicTitle: true,
            //smartButtonTextConverter: function (itemText) { return itemText; }
        };
        //$scope.selectJumbo = document.getElementById("selectJumbo").getElementsByTagName('button')[0];
        //$scope.selectJumboMenu = document.getElementById("selectJumbo").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectJumbo.setAttribute("disabled", "disabled");
        //$scope.selectJumbo.style.width = "100%";
        //$scope.selectJumboMenu.style.width = "100%";

        //$scope.selectRaw = document.getElementById("selectRaw").getElementsByTagName('button')[0];
        //$scope.selectRawMenu = document.getElementById("selectRaw").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectRaw.style.width = "100%";
        //$scope.selectRawMenu.style.width = "100%";
        //$scope.selectJumbo.style.width = "100%";

        $scope.departmentPlaceholder = {
            buttonDefaultText: "Select Department",
            searchPlaceholder: "Search Department"
        };
        $scope.example8dataSection = [];
        $scope.sectionIdList = [];
        $scope.example8settings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
            //selectionLimit: 1,
            //smartButtonMaxItems: 1,
            //dynamicTitle: true,
            //smartButtonTextConverter: function (itemText) { return itemText; }
        };
        $scope.sectionPlaceholder = {
            buttonDefaultText: "Select Section",
            searchPlaceholder: "Search Section"
        };

        var currentDate = new Date();
        $scope.FromDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.ToDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
    }
    $("#txtToDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.ToDateChangeForHRReport = function () {
        $("#txtToDate").focus();

    }

    $("#txtFromDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.FromDateChangeForHRReport = function () {
        $("#txtFromDate").focus();

    }
    function GetMonthYear() {
        $http({
            url: '/Rpt_MonthYear/Get',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MonthYearList = data;
            console.log($scope.MonthYearList);
        });
    }

    function getYearList() {
        var today = new Date();
        var thisMonth = today.getMonth();

        var currentYear = new Date().getFullYear(), years = [];
        var startYear = 2018;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        var yearRange = years;

        $scope.YearList = [];
        var YearObj = {};
        angular.forEach(yearRange, function (aData) {
            YearObj.YearId = aData;
            YearObj.YearName = ('' + aData);
            $scope.YearList.push(YearObj);
            YearObj = {}
        })
        
        $scope.ddlYear = { YearId: currentYear, YearName: ('' + currentYear) };
        $scope.ddlMonth = Enumerable.From($scope.MonthList).Where("$.MonthId ===" + thisMonth).FirstOrDefault();
    }

    function setTodayToDateRange() {
        var today = new Date();
        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        var date = (yesterday.getDate()) < 10 ? ('0' + yesterday.getDate()) : ('' + yesterday.getDate());
        var monInt = (yesterday.getMonth() + 1);
        var mon = monInt < 10 ? ('0' + monInt) : ('' + monInt);
        var todayFormat = date + '/' + mon + '/' + yesterday.getFullYear();
        $scope.FromDate = todayFormat;
        $scope.ToDate = todayFormat;
    }


    function GetAllEmployee(criteria2) {
        var criteria = "E.IsActive=1" + criteria2;
        $http({
            url: '/Employee/GetUserDynamic?searchCriteria=' + criteria + "&orderBy=FullName",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
        });
    }

    $scope.GetAllBranch = function () {
        GetAllBranch();
    }
    function GetAllBranch() {
        $http({
            //url: '/Branch/GetAllBranchByUserID?userId=' + $scope.LoginUser.UserId,
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if ($scope.LoginUser.RoleName === "Admin" || $scope.LoginUser.RoleName === "HR User" || $scope.LoginUser.RoleName === "Developer") {
                $scope.Branchlist = data;
            } else {
                var branchForUser = Enumerable.From(data).Where("$.BranchId==" + $scope.LoginUser.BranchId).ToArray();
                $scope.Branchlist = branchForUser;
            }
            if ($scope.rbReport == 'WagesSlip') {
                $scope.Branchlist = Enumerable.From(data).Where(function (x) {
                    return (x.BranchId == 2 || x.BranchId == 3);
                }).ToArray();
            }

            angular.forEach(data, function (aBrnch) {
                $scope.Categories.push({ id: aBrnch.BranchId, label: aBrnch.BranchName });
            })
        });

        $http({
            url: '/Grade/GetAllGrade',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //if ($scope.LoginUser.RoleName === "Admin" || $scope.LoginUser.RoleName === "HR User" || $scope.LoginUser.RoleName === "Developer") {
            $scope.GradeList = data;
            //}

            if ($scope.rbReport == 'WagesSlip') {
                $scope.GradeList = Enumerable.From(data).Where(function (x) {
                    return (x.GradeId == 2 || x.GradeId == 3);
                }).ToArray();
            }

        });

    }


    function GetUsersPermissionDetails() {
        
        $scope.AttSum = false;
        $scope.AttSumWithOT = false;
        $scope.AttDtl = false;
        $scope.SalSheet = false;
        $scope.WagesSlip = false;
        $scope.LeaveBalance = false;
        $scope.SalaryHistory = false;
        $scope.PaySlip = false;

        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                
                if (aPermissionDetails.FunctionName == 'Attendance Summary') {
                    $scope.AttSum = aPermissionDetails.CanExecute;
                }

                else if (aPermissionDetails.FunctionName == 'Attendance Summary With OT') {
                    $scope.AttSumWithOT = aPermissionDetails.CanExecute;
                }

                else if (aPermissionDetails.FunctionName == 'Attendance Detail') {
                    $scope.AttDtl = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Salary Sheet') {
                    $scope.SalSheet = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Wages Slip') {
                    $scope.WagesSlip = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Leave Balance') {
                    $scope.LeaveBalance = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Salary History') {
                    $scope.SalaryHistory = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Pay Slip') {
                    $scope.PaySlip = aPermissionDetails.CanExecute;
                }
            });
        });
    }

    $scope.GetHeaders = function () {
        if (angular.isUndefined($scope.ddlGrade)) {
            return;
        }

        var month = angular.isUndefined($scope.ddlMonth) ? "" : $scope.ddlMonth.MonthName;
        var year = angular.isUndefined($scope.ddlYear) ? "" : $scope.ddlYear.YearName;
        //console.log('$scope.Branchlist',$scope.Branchlist);

        $scope.SalarySheetHeader1 = (Enumerable.From($scope.Branchlist).Where("$.BranchId === " + $scope.ddlBrunch.BranchId).FirstOrDefault()).Address;

        //$scope.SalarySheetHeader1 = $scope.Branchlist[$scope.ddlBrunch.BranchId].Address;

        if ($scope.ddlGrade.GradeName === 'Staff') {
            //$scope.SalarySheetHeader1 = 'B/142, Road-22, New DOHS, Mohakhali, Dhaka-1206';
            //$scope.SalarySheetHeader1 = $scope.Branchlist[0].Address;
            $scope.SalarySheetHeader2 = 'PAY SHEET';
            $scope.SalarySheetHeader3 = 'For the Month of ' + month + ', ' + year;
        }
        else if ($scope.ddlGrade.GradeName === 'Labour') {
            //$scope.SalarySheetHeader1 = 'Durlovpur, Satkhamir; Sreepur PS; Gazipur-1744; Bangladesh.';
            //$scope.SalarySheetHeader1 = $scope.Branchlist[1].ExporterAddress;
            $scope.SalarySheetHeader2 = "Monthly Salary and Wages Sheet Workers";
            $scope.SalarySheetHeader3 = 'For the Month of ' + month + ', ' + year;
        }
        else {
            //$scope.SalarySheetHeader1 = 'FSSFB-7, (Ground Floor East Wing) Dhaka Extension area-Bangladesh';
            //$scope.SalarySheetHeader1 = $scope.Branchlist[2].ExporterAddress;
            $scope.SalarySheetHeader2 = 'Salary and Wages Sheet Worker';
            $scope.SalarySheetHeader3 = 'For the Month of ' + month + ', ' + year;
        }


    }


    $scope.GetDepartmentByBranch = function () {
        if ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) {
            $scope.departmentlist = [];
            $scope.employeeByBranchList = [];
            $scope.UnitList = [];
        }
        else {
            $http({
                url: '/Department/GetAllActiveByBranchId?branchId=' + $scope.ddlBrunch.BranchId + '&departmentId=' + null,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.departmentlist = data;
                angular.forEach(data, function (adept) {
                    $scope.example8data.push({ id: adept.DepartmentId, label: adept.DepartmentName });
                })
            });

            $http({
                url: '/Employee/GetUserDynamic?searchCriteria=D.BranchId=' + $scope.ddlBrunch.BranchId + "&orderBy=FullName",
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.employeeByBranchList = data;
            });

        }
    }
    $scope.resetGrade = function (BranchId) {
        if (BranchId == 3) {
            $scope.WagesSlipNumber = 'RTL-HRD-02';

        } else if (BranchId == 2) {
            $scope.WagesSlipNumber = 'RTL-HRD-01';
        }
        $scope.ddlGrade.GradeId = '';
    }
    $scope.GetDepartmentByBranchAndGrade = function () {
        if ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) {
            $scope.departmentlist = [];
            $scope.employeeByBranchList = [];
            $scope.UnitList = [];
        }
        else {
            $http({
                url: '/Department/GetByBranchAndGrade?branchId=' + $scope.ddlBrunch.BranchId + '&gradeId=' + $scope.ddlGrade.GradeId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.departmentlist = [];
                $scope.example8data = [];
                $scope.departmentlist = data;
                angular.forEach(data,
                    function (adept) {
                        $scope.example8data.push({ id: adept.DepartmentId, label: adept.DepartmentName });
                    });
            });

            $http({
                url: '/Employee/GetUserDynamic?searchCriteria=D.BranchId=' + $scope.ddlBrunch.BranchId + "&orderBy=FullName",
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.employeeByBranchList = data;
            });

        }
    }


    $scope.SelSingleReport = function (details) {
        $scope.ViewReportDetails = {};
        $scope.ViewReportDetails = details;
    }

    $scope.BindEmployeeByCompanyType = function (companyTypeId) {
        var criteria = "";
        if (!angular.isUndefined(companyTypeId) && companyTypeId != null)
            criteria += " AND EmployeeId IN (SELECT DISTINCT RefEmployeeId FROM ad_Company WHERE CompanyTypeId=" + companyTypeId + ")";
        GetAllEmployee(criteria);
    }

    $scope.ReportViewButton = function () {
        var outletList = '';
        $scope.departmentIds = '';
        angular.forEach($scope.departmentIdList, function (data) {
            $scope.departmentIds += $scope.departmentIds == '' ? data.id : (',' + data.id)

        });
        if ($scope.rbReport == 'PaymentReport' || $scope.rbReport == 'PaymentReport' || $scope.rbReport == 'BalanceReport' || $scope.rbReport == 'SaleByOutlet' || $scope.rbReport == 'SaleByFarmer' || $scope.rbReport == 'VarietywiseSalesReport' || $scope.rbReport == 'VarietyWiseCustomerSalesReport') {
            $scope.ActiveCustomerList = [];
            if ($scope.CategoriesSelected.length == 0) {
                alertify.log('Select minimum One Outlet!', 'error', '5000');
                return
            }
            angular.forEach($scope.CategoriesSelected, function (aOutletList) {
                outletList += outletList == '' ? aOutletList.id : (',' + aOutletList.id);
            })
        }

        var fromDate = $('#txtFromDate').val();
        var toDate = $('#txtToDate').val();
        if (fromDate == "" || undefined || null) {
            fromDate = '01/01/2017';
        }
        if (toDate == "" || undefined || null) {
            toDate = $filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy');
        }

        
        if ($scope.rbReport == 'AttDtl') {
            if ($scope.ddlEmployeeByBranch === undefined || $scope.ddlEmployeeByBranch == null) {
                alertify.log('Please select Employee!', 'error', '5000');
                return;
            }

            if (angular.isUndefined($scope.FromDate) || $scope.FromDate == null || angular.isUndefined($scope.ToDate) || $scope.ToDate == null) {
                alertify.log('From Date & To Date Both are Required.', 'error', '5000');
            } else {
                //var dateParts = $scope.FromDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                //var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

                //var dateParts2 = $scope.ToDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                //var to = dateParts2[3] + "-" + dateParts2[2] + "-" + dateParts2[1];

                //$window.open("/ErpReports/RV_hr_AttendanceDetail.aspx?EmployeeId=" + $scope.ddlEmployeeByBranch.EmployeeId + "&FromDate=" + $scope.FromDate + "&ToDate=" + $scope.ToDate, "_blank", "width=790,height=630,left=340,top=25");

                var AttendanceDetailObj = {};
                AttendanceDetailObj.FromDate = $scope.FromDate;
                AttendanceDetailObj.ToDate = $scope.ToDate;
                AttendanceDetailObj.EmployeeId = $scope.ddlEmployeeByBranch.EmployeeId;
                
                $cookieStore.put('AttendanceDetail', AttendanceDetailObj);
                $window.open("#/AttendanceDetailReport", "popup", "width=800,height=550,left=280,top=80");
                event.stopPropagation();
            }
        }
        else if ($scope.rbReport == 'AttSum') {
            if ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) {
                alertify.log('Please select Branch!', 'error', '5000');
                return;
            }
            if (angular.isUndefined($scope.FromDate) || $scope.FromDate == null || angular.isUndefined($scope.ToDate) || $scope.ToDate == null) {
                alertify.log('From Date & To Date Both are Required.', 'error', '5000');
            } else {

                var branchId = ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) ? 0 : $scope.ddlBrunch.BranchId;
                var gradeId = ($scope.ddlGrade === undefined || $scope.ddlGrade == null) ? 0 : $scope.ddlGrade.GradeId;
                var departmentId = ($scope.departmentIdList === undefined || $scope.departmentIdList == null) ? 0 : $scope.departmentIds;
                var sectionId = ($scope.ddlSection === undefined || $scope.ddlSection == null) ? 0 : $scope.ddlSection.SectionId;

                //$window.open("/ErpReports/RV_hr_AttendanceSummary.aspx?BranchId=" + branchId + "&GradeId=" + gradeId + "&fdt=" + from + "&tdt=" + to + "&EmployeeId=" + 0 + "&DepartmentId=" + departmentId + "&SectionId=" + sectionId, "_blank", "width=1115,height=630,left=125,top=25");

                var AttendanceSummaryWithOTObj = {};
                AttendanceSummaryWithOTObj.FromDate = $scope.FromDate;
                AttendanceSummaryWithOTObj.ToDate = $scope.ToDate;
                AttendanceSummaryWithOTObj.BranchId = branchId;
                AttendanceSummaryWithOTObj.GradeId = gradeId;
                AttendanceSummaryWithOTObj.EmployeeId = 0;
                AttendanceSummaryWithOTObj.BranchName = $scope.ddlBrunch.BranchName;
                AttendanceSummaryWithOTObj.DepartmentId = departmentId;
                AttendanceSummaryWithOTObj.SectionId = sectionId;
                AttendanceSummaryWithOTObj.IsWithOT = false;
                $cookieStore.put('AttendanceSummaryWithOT', AttendanceSummaryWithOTObj);
                $window.open("#/AttendanceSummaryWithOTReport", "popup", "width=800,height=550,left=280,top=80");
                event.stopPropagation();

            }
        }

        else if ($scope.rbReport == 'AttSumWithOT') {
            if ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) {
                alertify.log('Please select Branch!', 'error', '5000');
                return;
            }

            if (angular.isUndefined($scope.FromDate) || $scope.FromDate == null || angular.isUndefined($scope.ToDate) || $scope.ToDate == null) {
                alertify.log('From Date & To Date Both are Required.', 'error', '5000');
            }
            else {
                //var dateParts = $scope.FromDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                //var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

                //var dateParts2 = $scope.ToDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                //var to = dateParts2[3] + "-" + dateParts2[2] + "-" + dateParts2[1];



                var branchId = ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) ? null : $scope.ddlBrunch.BranchId;

                //$window.open("/ErpReports/RV_hr_AttendanceSummaryWithOT.aspx?BranchId=" + branchId + "&GradeId=" + 0 + "&FromDate=" + from + "&ToDate=" + to + "&EmployeeId=" + 0 + "&DepartmentId=" + 0 + "&SectionId=" + 0, "_blank", "width=1115,height=630,left=125,top=25");


                var AttendanceSummaryWithOTObj = {};
                AttendanceSummaryWithOTObj.FromDate = $scope.FromDate;
                AttendanceSummaryWithOTObj.ToDate = $scope.ToDate;
                AttendanceSummaryWithOTObj.BranchId = branchId;
                AttendanceSummaryWithOTObj.GradeId = 0;
                AttendanceSummaryWithOTObj.EmployeeId = 0;
                AttendanceSummaryWithOTObj.BranchName = $scope.ddlBrunch.BranchName;
                AttendanceSummaryWithOTObj.DepartmentId = 0;
                AttendanceSummaryWithOTObj.SectionId = 0;
                AttendanceSummaryWithOTObj.IsWithOT = true;
                $cookieStore.put('AttendanceSummaryWithOT', AttendanceSummaryWithOTObj);
                $window.open("#/AttendanceSummaryWithOTReport", "popup", "width=800,height=550,left=280,top=80");
                event.stopPropagation();

            }
        }
        
        else if ($scope.rbReport == 'SalSheet') {
            if ($scope.ddlYear === undefined || $scope.ddlYear == null) {
                alertify.log('Please select Year!', 'error', '5000');
                return;
            }
            if ($scope.ddlMonth === undefined || $scope.ddlMonth == null) {
                alertify.log('Please select Month!', 'error', '5000');
                return;
            }
            if ($scope.ddlGrade === undefined || $scope.ddlGrade == null) {
                alertify.log('Please select Grade!', 'error', '5000');
                return;
            }
            var branchName = ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) ? null : $scope.ddlBrunch.BranchName;
            var departmentName = ($scope.departmentIdList === undefined || $scope.departmentIdList == null) ? null : $scope.departmentIds;
            var sectionName = ($scope.ddlSection === undefined || $scope.ddlSection == null) ? null : $scope.ddlSection.SectionName;

            var hr_SalarySheet = {};
            hr_SalarySheet.MonthId = $scope.ddlMonth.MonthId;
            hr_SalarySheet.YearId = $scope.ddlYear.YearId;
            hr_SalarySheet.GradeId = $scope.ddlGrade.GradeId;
            hr_SalarySheet.branchName = branchName;
            hr_SalarySheet.sectionName = sectionName;
            hr_SalarySheet.departmentName = departmentName;
            hr_SalarySheet.SalarySheetHeader1 = $scope.SalarySheetHeader1;
            hr_SalarySheet.SalarySheetHeader2 = $scope.SalarySheetHeader2;
            hr_SalarySheet.SalarySheetHeader3 = $scope.SalarySheetHeader3;


            if ($scope.ddlBrunch.BranchName == 'Savar EPZ' && ($scope.ddlGrade.GradeName == 'Staff' || $scope.ddlGrade.GradeName == 'Labour EPZ')) {
                //$window.open("/ErpReports/RV_hr_SalarySheetEPZ.aspx?MonthId=" + $scope.ddlMonth.MonthId +
                //    "&YearId=" + $scope.ddlYear.YearId +
                //    "&GradeId=" + $scope.ddlGrade.GradeId +
                //    "&BranchName=" + branchName +
                //    "&UnitName=" + sectionName +
                //    "&DepartmentName=" + departmentName +
                //    "&Header1=" + $scope.SalarySheetHeader1 +
                //    "&Header2=" + $scope.SalarySheetHeader2 +
                //    "&Header3=" + $scope.SalarySheetHeader3, "_blank", "width=1200,height=630,left=125,top=25");

                $cookieStore.put("HrSalarySheetEPZ", hr_SalarySheet);
                $window.open("#/SalarySheetEPZ", "popup", "width=850,height=550,left=280,top=80");
            }
            else if ($scope.ddlGrade.GradeName == 'Staff') {
                //$window.open("/ErpReports/RV_hr_SalarySheet.aspx?MonthId=" + $scope.ddlMonth.MonthId +
                //    "&YearId=" + $scope.ddlYear.YearId +
                //    "&GradeId=" + $scope.ddlGrade.GradeId +
                //    "&BranchName=" + branchName +
                //    "&UnitName=" + sectionName +
                //    "&DepartmentName=" + departmentName +
                //    "&Header1=" + $scope.SalarySheetHeader1 +
                //    "&Header2=" + $scope.SalarySheetHeader2 +
                //    "&Header3=" + $scope.SalarySheetHeader3, "_blank", "width=1200,height=630,left=125,top=25");

                $cookieStore.put("HrSalarySheet", hr_SalarySheet);
                $window.open("#/SalarySheet", "popup", "width=850,height=550,left=280,top=80");
            }
            else if ($scope.ddlGrade.GradeName == 'Labour') {
                //$window.open("/ErpReports/RV_hr_SalarySheetNonEPZ.aspx?MonthId=" +
                //    $scope.ddlMonth.MonthId +
                //    "&YearId=" + $scope.ddlYear.YearId +
                //    "&GradeId=" + $scope.ddlGrade.GradeId +
                //    "&BranchName=" + branchName +
                //    "&UnitName=" + sectionName +
                //    "&DepartmentName=" + departmentName +
                //    "&Header1=" + $scope.SalarySheetHeader1 +
                //    "&Header2=" + $scope.SalarySheetHeader2 +
                //    "&Header3=" + $scope.SalarySheetHeader3, "_blank", "width=1200,height=630,left=125,top=25");

                $cookieStore.put("HrSalarySheetSreepur", hr_SalarySheet);
                $window.open("#/SalarySheetSreepur", "popup", "width=850,height=550,left=280,top=80");
            } else {
                alertify.log('Please select Branch and Grade Correctly !', 'error', '5000');
                return;
            }
        }
        else if ($scope.rbReport == 'WagesSlip') {
            $window.open("#/WagesSlipReport", "popup", "width=850,height=550,left=280,top=80");
            var WagesSlipReportObj = {};
            WagesSlipReportObj.MonthId = $scope.ddlMonth.MonthId;
            WagesSlipReportObj.MonthName = $scope.ddlMonth.MonthName;
            WagesSlipReportObj.YearId = $scope.ddlYear.YearId;
            WagesSlipReportObj.GradeId = $scope.ddlGrade.GradeId;
            WagesSlipReportObj.BranchId = $scope.ddlBrunch.BranchId;
            WagesSlipReportObj.BranchName = $scope.ddlBrunch.BranchName;
            //WagesSlipReportObj.UnitName = sectionName;
            WagesSlipReportObj.DepartmentIds = $scope.departmentIds;
            if ($scope.SectionIds != '' && $scope.SectionIds != undefined) {
                WagesSlipReportObj.SectionIds = $scope.SectionIds;
            } else {
                WagesSlipReportObj.SectionIds = '0';
            }

            //sessionStorage.setItem("WagesSlipReport", JSON.stringify(WagesSlipReportObj));
            $cookieStore.put('WagesSlipReport', WagesSlipReportObj)
            event.stopPropagation();


        }
        else if ($scope.rbReport == 'PaySlip') {
            $window.open("#/PaySlipReport", "popup", "width=850,height=550,left=280,top=80");
            var PaySlipReportObj = {};
            PaySlipReportObj.MonthId = $scope.ddlMonth.MonthId;
            PaySlipReportObj.MonthName = $scope.ddlMonth.MonthName;
            PaySlipReportObj.YearId = $scope.ddlYear.YearId;
            PaySlipReportObj.GradeId = $scope.ddlGrade.GradeId;
            PaySlipReportObj.BranchId = $scope.ddlBrunch.BranchId;
            PaySlipReportObj.BranchName = $scope.ddlBrunch.BranchName;
            //PaySlipReportObj.UnitName = sectionName;
            PaySlipReportObj.DepartmentIds = $scope.departmentIds;
            if ($scope.SectionIds != '' && $scope.SectionIds != undefined) {
                PaySlipReportObj.SectionIds = $scope.SectionIds;
            } else {
                PaySlipReportObj.SectionIds = '0';
            }

            //sessionStorage.setItem("PaySlipReport", JSON.stringify(PaySlipReportObj));
            $cookieStore.put('PaySlipReport', PaySlipReportObj)
            event.stopPropagation();


        }
        else if ($scope.rbReport == 'LeaveBalance') {
            if ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) {
                alertify.log('Please select Branch!', 'error', '5000');
                return;
            }

            var branchId = ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) ? null : $scope.ddlBrunch.BranchId;
            var gradeId = ($scope.ddlGrade === undefined || $scope.ddlGrade == null) ? null : $scope.ddlGrade.GradeId;
            var departmentId = ($scope.ddlDepartment === undefined || $scope.ddlDepartment == null) ? null : $scope.ddlDepartment.DepartmentId;
            var sectionId = ($scope.ddlSection === undefined || $scope.ddlSection == null) ? null : $scope.ddlSection.SectionId;
            var employeeId = ($scope.ddlEmployeeByBranch === undefined || $scope.ddlEmployeeByBranch == null) ? null : $scope.ddlEmployeeByBranch.EmployeeId;


            //$window.open("/ErpReports/RV_hr_LeaveBalance.aspx?YearId=" + $scope.ddlYear.YearId +
            //    "&BranchId=" + branchId +
            //    "&GradeId=" + gradeId +
            //    "&DepartmentId=" + departmentId +
            //    "&SectionId=" + sectionId +
            //    "&EmployeeId=" + employeeId, "_blank", "width=1200,height=630,left=125,top=25");

            var LeaveBalance = {};
            LeaveBalance.YearId = $scope.ddlYear.YearId;
            LeaveBalance.branchId = branchId;
            LeaveBalance.gradeId = gradeId;
            LeaveBalance.departmentId = departmentId;
            LeaveBalance.sectionId = sectionId;
            LeaveBalance.employeeId = employeeId;


            $cookieStore.put("LeaveBalance", LeaveBalance);
            $window.open("#/LeaveBalanceReport", "popup", "width=850,height=550,left=280,top=80");
        }
        else if ($scope.rbReport == 'SalaryHistory') {
            if ($scope.ddlFromMonthYear === undefined || $scope.ddlFromMonthYear == null) {
                alertify.log('Please select Month Year From!', 'error', '5000');
                return;
            }
            if ($scope.ddlToMonthYear === undefined || $scope.ddlToMonthYear == null) {
                alertify.log('Please select Month Year To!', 'error', '5000');
                return;
            }

            var branchId = ($scope.ddlBrunch === undefined || $scope.ddlBrunch == null) ? null : $scope.ddlBrunch.BranchId;
            var gradeId = ($scope.ddlGrade === undefined || $scope.ddlGrade == null) ? null : $scope.ddlGrade.GradeId;
            var departmentId = ($scope.ddlDepartment === undefined || $scope.ddlDepartment == null) ? null : $scope.ddlDepartment.DepartmentId;
            var sectionId = ($scope.ddlSection === undefined || $scope.ddlSection == null) ? null : $scope.ddlSection.SectionId;
            var employeeId = ($scope.ddlEmployeeByBranch === undefined || $scope.ddlEmployeeByBranch == null) ? null : $scope.ddlEmployeeByBranch.EmployeeId;


            //$window.open("/ErpReports/RV_hr_SalaryHistory.aspx?FromMonthYear=" + $scope.ddlFromMonthYear.MonthYearId +
            //    "&ToMonthYear=" + $scope.ddlToMonthYear.MonthYearId +
            //    "&BranchId=" + branchId +
            //    "&GradeId=" + gradeId +
            //    "&DepartmentId=" + departmentId +
            //    "&SectionId=" + sectionId +
            //    "&EmployeeId=" + employeeId, "_blank", "width=1200,height=630,left=125,top=25");
            var SalaryHistory = {};
            SalaryHistory.FromMonthYearId = $scope.ddlFromMonthYear.MonthYearId;
            SalaryHistory.ToMonthYearId = $scope.ddlToMonthYear.MonthYearId ;
            SalaryHistory.branchId = branchId;
            SalaryHistory.gradeId = gradeId;
            SalaryHistory.departmentId = departmentId;
            SalaryHistory.sectionId = sectionId;
            SalaryHistory.employeeId = employeeId;
            $cookieStore.put("SalaryHistory", SalaryHistory);
            $window.open("#/SalaryHistory", "popup", "width=850,height=550,left=280,top=80");
        }
    }

    $scope.GetSectionByDepartment = function () {
        $('#selectDepartment > div > ul > li:nth-child(4) > div > input').focus();
        if ($scope.ddlDepartment === undefined || $scope.ddlDepartment == null) {
            $scope.sectionList = [];
        }
        else {
            $http({
                url: '/Employee/GetSectionByDepartmentId?departmentId=' + $scope.ddlDepartment.DepartmentId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.sectionList = data;
            });
        }

        $scope.departmentIds = '';
        angular.forEach($scope.departmentIdList, function (data) {
            $scope.departmentIds += $scope.departmentIds == '' ? data.id : (',' + data.id)

        });

        if ($scope.departmentIds === undefined || $scope.departmentIds == null || $scope.departmentIds == '') {
            $scope.sectionList = [];
        }
        else {
            $http({
                url: '/Employee/GetSectionByDepartmentIds?departmentIds=' + $scope.departmentIds,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.sectionList = data;
                angular.forEach(data, function (aSec) {
                    $scope.example8dataSection.push({ id: aSec.SectionId, label: aSec.SectionName });
                })
            });
        }

    }
    $scope.SelectSection = function () {
        $('#selectSection > div > ul > li:nth-child(4) > div > input').focus();
        $scope.SectionIds = '';
        angular.forEach($scope.sectionIdList, function (data) {
            $scope.SectionIds += $scope.SectionIds == '' ? data.id : (',' + data.id)

        });
    }
});